// D3 (fix round 1): every band of repeating words ([data-marquee], kit/marquee.ts) on every page:
//   moves when in view (> 20 px/s), loop time (copy width / speed, target ~40 s), eases to a stop on hover (desktop),
//   never shows a gap (the two copies cover the band at every sample) at 360, 390, 1440 and 1920, a scroll boost that
//   eases back, and is static under reduced motion. Run after `npm run build`: node scripts/check-marquees.mjs
// Exit code 1 on any failure.
import { createRequire } from 'node:module';
import { serveDist, PAGES } from './serve-dist.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const WIDTHS = [360, 390, 1440, 1920];

const state = (i) => {
  const band = document.querySelectorAll('[data-marquee]')[i];
  const tr = [...band.querySelectorAll(':scope > [data-marquee-track]')];
  const x = (t) => new DOMMatrixReadOnly(getComputedStyle(t).transform).m41;
  const W = band.clientWidth;
  // Coverage in the band's own (unrotated) coordinates: each track spans offsetLeft + x .. + offsetWidth.
  const spans = tr.map((t) => [t.offsetLeft + x(t), t.offsetLeft + x(t) + t.offsetWidth]).sort((a, b) => a[0] - b[0]);
  let reach = 0, gap = 0;
  for (const [a, b] of spans) { if (a > reach + 0.5) gap = Math.max(gap, a - reach); reach = Math.max(reach, b); }
  if (reach < W - 0.5) gap = Math.max(gap, W - reach);
  if (spans[0][0] > 0.5) gap = Math.max(gap, spans[0][0]);
  // Structure: each copy at least as wide as the band, copy 2 starts exactly where copy 1 ends, copy 1 starts at the band's
  // left edge: then no x in the loop can show a gap (the samples above confirm it in motion).
  const seamless = tr[0].offsetWidth >= W && Math.abs(tr[1].offsetLeft - tr[0].offsetLeft - tr[0].offsetWidth) < 1 && tr[0].offsetLeft < 0.5;
  return { x: x(tr[0]), period: tr[0].offsetWidth, gap: Math.round(gap), W, seamless };
};

const speedOf = async (p, i, ms = 1000) => {
  const a = await p.evaluate(state, i); const t0 = Date.now();
  let gap = a.gap;
  for (let k = 0; k < 5; k++) { await p.waitForTimeout(ms / 5); gap = Math.max(gap, (await p.evaluate(state, i)).gap); }
  const b = await p.evaluate(state, i);
  let dx = b.x - a.x; if (Math.abs(dx) > b.period / 2) dx -= Math.sign(dx) * b.period; // one wrap
  return { v: Math.abs(dx) / ((Date.now() - t0) / 1000), gap, period: b.period, seamless: b.seamless };
};

const srv = await serveDist();
const browser = await chromium.launch();
let fails = 0, total = 0;
const rows = [];
for (const w of WIDTHS) {
  for (const reduce of [false, true]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
    await ctx.addInitScript(() => { try { sessionStorage.setItem('mps-intro', '1'); } catch (e) { /* */ } });
    const p = await ctx.newPage();
    for (const pg of PAGES) {
      await p.goto(srv.url + pg, { waitUntil: 'networkidle' });
      const n = await p.evaluate(() => document.querySelectorAll('[data-marquee]').length);
      if (!n) continue;
      await p.waitForTimeout(1500);
      for (let i = 0; i < n; i++) {
        total++;
        const y = await p.evaluate((i) => { const r = document.querySelectorAll('[data-marquee]')[i].getBoundingClientRect(); return r.top + scrollY - innerHeight / 2; }, i);
        await p.evaluate((y) => { (window.__pbpLenis ? window.__pbpLenis.scrollTo(y, { immediate: true }) : scrollTo(0, y)); }, y);
        await p.waitForTimeout(900);
        const run = await speedOf(p, i);
        const row = { page: pg, w, band: i, reduce, speed: +run.v.toFixed(1), loopS: run.v ? +(run.period / run.v).toFixed(1) : null, gap: run.gap };
        const bad = [];
        if (reduce) { row.gap = null; if (run.v > 0.5) bad.push('moves under reduced motion'); }
        else {
          if (run.v <= 20) bad.push('slower than 20 px/s');
          if (run.gap > 0) bad.push(`gap ${run.gap}px`);
          if (!run.seamless) bad.push('copies not seamless');
          if (w >= 1024) {
            const c = await p.evaluate((i) => { const r = document.querySelectorAll('[data-marquee]')[i].getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, i);
            await p.mouse.move(Math.min(c[0], w - 20), c[1]); await p.waitForTimeout(700);
            const h = await speedOf(p, i, 600); row.hoverSpeed = +h.v.toFixed(1);
            if (h.v > 2) bad.push('does not pause on hover');
            await p.mouse.move(5, 5); await p.waitForTimeout(800);
            // scroll boost: a burst of wheel steps, speed right after vs 1.5 s later
            await p.mouse.wheel(0, 260); await p.waitForTimeout(60); await p.mouse.wheel(0, -260); await p.waitForTimeout(60);
            const fast = await speedOf(p, i, 300); await p.waitForTimeout(1500); const rest = await speedOf(p, i, 600);
            row.boostSpeed = +fast.v.toFixed(1); row.afterBoost = +rest.v.toFixed(1);
          }
        }
        row.ok = !bad.length; row.issues = bad.join('; ');
        if (bad.length) fails++;
        rows.push(row);
      }
    }
    await ctx.close();
  }
}
await browser.close(); srv.close();
console.table(rows);
console.log(`check-marquees: ${total - fails}/${total} band checks pass`);
process.exit(fails ? 1 : 0);

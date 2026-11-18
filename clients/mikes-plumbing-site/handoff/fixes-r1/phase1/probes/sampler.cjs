// Scrubbed-path sampler: for every scrubbed SVG path on a page, find where it goes from empty to full while scrolling, then
// take 10 evenly spaced samples strictly inside that range. Pass = all 10 strictly between 0 and 1 and monotonic.
const { chromium } = require('playwright');
const U = process.env.U || 'http://localhost:4602';
const W = +(process.env.W || 1440);
const pages = (process.env.P || '/').split(',');
const SEL = '[data-scrub-path], .pw-water, [data-route-scrub], [data-pipe-water], [data-b3-path], path[data-scrub-fill], [data-sv-draw]';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: W > 800 ? 900 : 844 } });
  await p.addInitScript(() => { try { sessionStorage.setItem('mps-intro', '1'); } catch (e) {} });
  const out = [];
  for (const pg of pages) {
    await p.goto(U + pg, { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
    const info = await p.evaluate((SEL) => {
      const els = [...document.querySelectorAll(SEL)];
      window.__sp = els;
      return els.map((e, i) => { const svg = e.ownerSVGElement; const r = svg.getBoundingClientRect(); return { i, cls: e.getAttribute('class') || e.parentElement.getAttribute('id') || '', vis: r.width > 0 && r.height > 0 && getComputedStyle(svg).display !== 'none', top: r.top + scrollY, bot: r.bottom + scrollY }; });
    }, SEL);
    const vis = info.filter((x) => x.vis);
    const val = () => p.evaluate(() => window.__sp.map((e) => {
      const cs = getComputedStyle(e); const L = e.getAttribute('pathLength') ? +e.getAttribute('pathLength') : e.getTotalLength();
      const da = cs.strokeDasharray.split(/[ ,]+/).map(parseFloat); const off = parseFloat(cs.strokeDashoffset) || 0;
      if (cs.strokeDasharray === 'none') return 1;
      return da.length >= 2 && Math.abs(da[0] + da[1] - L) > 1e-3 && da[0] < L ? da[0] / L : Math.max(0, Math.min(1, 1 - off / L));
    }));
    const go = async (y) => { await p.evaluate((y) => window.__pbpLenis ? window.__pbpLenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y), y); await p.waitForTimeout(+(process.env.WT || 1300)); return val(); };
    const vh = W > 800 ? 900 : 844;
    for (const v of vis) {
      // coarse scan over the svg's pass
      let y0 = null, y1 = null; let prev = null;
      const lo = Math.max(0, Math.round(v.top - vh)), hi = Math.round(v.bot + 200);
      for (let y = lo; y <= hi; y += 100) {
        const f = (await go(y))[v.i];
        if (f <= 0.001) y0 = y;
        if (f >= 0.999 && y0 !== null) { y1 = y; break; }
      }
      if (y0 === null || y1 === null) { out.push({ pg, path: v.cls, i: v.i, note: `no 0->1 range found (y0 ${y0}, y1 ${y1})` }); continue; }
      // refine both ends to 10 px so no sample sits on an endpoint
      for (let y = y0 + 10; y < y1; y += 10) { if ((await go(y))[v.i] > 0.001) break; y0 = y; }
      for (let y = y1 - 10; y > y0; y -= 10) { if ((await go(y))[v.i] < 0.999) break; y1 = y; }
      const s = [];
      for (let k = 1; k <= 10; k++) { const y = Math.round(y0 + ((y1 - y0) * k) / 11); s.push(+(await go(y))[v.i].toFixed(3)); }
      const inside = s.every((x) => x > 0 && x < 1); const mono = s.every((x, k) => k === 0 || x >= s[k - 1]);
      out.push({ pg, path: v.cls, i: v.i, range: [y0, y1], samples: s, pass: inside && mono });
    }
  }
  console.log(JSON.stringify(out));
  await b.close();
})();

// D2 (fix round 1, B6): nothing touches a wave. Run after `npm run build`:
//   node scripts/check-seams.mjs [--pages /,/services] [--widths 1440,390] [--json out.json]
// For every visible kit Wave (`.wave`, data-wave) the actual curve is sampled every 8 px (the boundary of its filled path,
// found with isPointInFill per column). Content must keep 24 px (desktop) / 16 px (< 768 px) from the curve at every x:
//   text (tight line boxes), images, video, iframes, form fields, buttons, inline SVG shapes, and any box that paints
//   (background, border edges, shadow: cards, bubbles, frame lines).
// Bands of repeating words ([data-marquee], kit/marquee.ts) are named seam objects: they may cross a section boundary, but
//   the wave curve must clear the band by 12 px, and content must clear the band by 16 px.
// A card that crosses a seam in front of the wave (the curve runs through it with full clearance above and below) does not
//   touch it and passes; it is listed as "crosses in front".
// Allowed to cross: named seam objects only, marked `data-seam` (pipes, tape, valve, the flyer, stamps) and the bands.
// Pages are measured under reduced motion (every element in its final place), at scroll 0. Exit 1 on any hit.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { serveDist, PAGES } from './serve-dist.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const pages = arg('--pages', PAGES.join(',')).split(',');
const widths = arg('--widths', '1440,390').split(',').map(Number);
const out = arg('--json', null);

// Named seam objects (Nick, B6: "only pipes, bands, tape, valve, the flyer, stamps may cross a seam"). Pipes carry their nuts,
// stubs and drips. Anything else that must cross gets `data-seam` in its component and a line in README's deviation log.
const SEAM_OBJECTS = [
  '[data-seam]', '[data-marquee]',
  // pipes (+ their nuts, stubs, highlights and drips)
  'svg.pipe', 'svg.pipe-m', 'svg.vs-pipe', 'svg.hs-pipe', 'svg.rp-pipe', '.dial-pipe', '.ri-pipe', '.ri-hi', '.st-pipe', '.st-hi',
  '.st-seam', '.stub', 'svg.nut', '.nut-d', '.nut-m', 'svg.drip', 'svg.fh-drip', 'svg.sc-drip', 'svg.wt',
  // tape, valve, the flyer, stamps
  '.hh-tape', '.wheel', '.hh-flyer', '.stamp', '.seal',
  // the FAQ hero's dripping "?" (a decorative glyph: its line box, not its ink, reaches the wave)
  '.fh-q',
].join(', ');

function measure(SEAM_OBJECTS) {
  const W = innerWidth, mob = W < 768, CLEAR = mob ? 16 : 24, BAND_WAVE = 12, BAND_CLEAR = 16, STEP = 8;
  const sy = scrollY;
  const vis = (el) => {
    const d = el.closest('details'); if (d && !d.open && !el.closest('summary')) return false; // closed accordion body: not rendered
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.1 || e.hidden) return false;
      if (cs.position === 'fixed' || cs.position === 'sticky') return false;
    }
    return true;
  };
  // Clip a rect by every overflow-clipping ancestor; null when nothing is left.
  const clipRect = (el, r) => {
    let { left, top, right, bottom } = r;
    for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (/hidden|clip/.test(cs.overflowX + cs.overflowY)) {
        const q = e.getBoundingClientRect();
        if (/hidden|clip/.test(cs.overflowX)) { left = Math.max(left, q.left); right = Math.min(right, q.right); }
        if (/hidden|clip/.test(cs.overflowY)) { top = Math.max(top, q.top); bottom = Math.min(bottom, q.bottom); }
      }
    }
    return right - left > 0.5 && bottom - top > 0.5 ? { left, top: top + sy, right, bottom: bottom + sy } : null;
  };
  const desc = (el) => {
    const c = typeof el.className === 'string' ? el.className.split(' ').filter((x) => x && !x.startsWith('astro-')).slice(0, 2).join('.') : (el.className?.baseVal || '');
    const sec = el.closest('section, footer, header')?.id || el.closest('section')?.className?.split?.(' ')[0] || '';
    const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    const sv = el.tagName.toLowerCase() !== 'svg' && el.closest('svg');
    const svc = sv ? `svg.${(sv.getAttribute('class') || '').split(' ').filter((x) => x && !x.startsWith('astro-')).slice(0, 2).join('.')} ` : '';
    return `${sec ? sec + ' > ' : ''}${svc}${el.tagName.toLowerCase()}${c ? '.' + c : ''}${t ? ` "${t}"` : ''}`;
  };
  const allowed = (el) => !!el.closest(`${SEAM_OBJECTS}, .wave, header, [data-loader], [data-pt], .mnav, .mega, .mbar, .skip, .sr-only`);

  // 1. Wave curves.
  const curves = [];
  document.querySelectorAll('.wave').forEach((wv, wi) => {
    if (!vis(wv)) return;
    wv.querySelectorAll('svg.wave-s').forEach((svg) => {
      if (getComputedStyle(svg).display === 'none') return;
      const paths = [...svg.querySelectorAll('path')].filter((p) => { const f = p.getAttribute('fill'); return f && f !== 'transparent' && f !== 'none'; });
      const main = paths[paths.length - 1]; if (!main) return;
      const r = svg.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return;
      const inv = main.getScreenCTM().inverse();
      const inFill = (x, y) => { const pt = new DOMPoint(x, y).matrixTransform(inv); return main.isPointInFill(pt); };
      const pts = [];
      for (let x = Math.max(0, r.left) + 0.5; x < Math.min(W, r.right); x += STEP) {
        let prev = inFill(x, r.top + 0.5);
        for (let y = r.top + 1.5; y < r.bottom - 0.5; y += 1) {
          const cur = inFill(x, y);
          if (cur !== prev) pts.push([x, y + sy]);
          prev = cur;
        }
      }
      if (pts.length) curves.push({ id: `${wv.closest('section, footer')?.id || wv.closest('section')?.className.split(' ')[0] || 'wave'}#${wi}`, pts, kind: wv.dataset.wave });
    });
  });

  // 2. Bands (rotated): corners from four 1 px probes, edge samples every 8 px.
  const bands = [];
  document.querySelectorAll('[data-marquee]').forEach((b) => {
    if (!vis(b)) return;
    const mk = (l, t) => { const s = document.createElement('i'); s.style.cssText = `position:absolute;width:0;height:0;left:${l};top:${t};`; b.appendChild(s); const r = s.getBoundingClientRect(); s.remove(); return [r.left, r.top + sy]; };
    const pos = getComputedStyle(b).position; if (pos === 'static') b.style.position = 'relative';
    const c = [mk('0', '0'), mk('100%', '0'), mk('100%', '100%'), mk('0', '100%')];
    if (pos === 'static') b.style.position = '';
    const edge = [];
    for (let k = 0; k < 4; k++) {
      const [a, z] = [c[k], c[(k + 1) % 4]]; const n = Math.max(1, Math.ceil(Math.hypot(z[0] - a[0], z[1] - a[1]) / STEP));
      for (let i = 0; i <= n; i++) edge.push([a[0] + ((z[0] - a[0]) * i) / n, a[1] + ((z[1] - a[1]) * i) / n]);
    }
    bands.push({ el: b, id: desc(b).slice(0, 60), poly: c, edge });
  });
  const inPoly = (poly, x, y) => { let ins = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) ins = !ins; } return ins; };

  // 3. Content boxes.
  const boxes = [];
  const add = (el, r, what) => { const q = clipRect(el, r); if (q && q.right > 0 && q.left < W) boxes.push({ el, r: q, what }); };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement; if (!el || allowed(el) || el.closest('svg, script, style, noscript, template') || !vis(el)) continue;
    const rg = document.createRange(); rg.selectNodeContents(n);
    [...rg.getClientRects()].forEach((r) => { if (r.width > 1 && r.height > 1) add(el, r, 'text'); });
  }
  document.querySelectorAll('body *').forEach((el) => {
    if (allowed(el) || !vis(el)) return;
    const tag = el.tagName.toLowerCase();
    if (['script', 'style', 'noscript', 'template', 'main', 'section', 'footer', 'body', 'html', 'source', 'br', 'picture'].includes(tag)) return;
    if (el.closest('svg') && tag !== 'svg') {
      if (['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'image', 'text', 'use'].includes(tag) && !el.closest('defs, clipPath, mask')) {
        const f = getComputedStyle(el); if ((f.fill === 'none' || f.fillOpacity === '0') && (f.stroke === 'none' || f.strokeOpacity === '0')) return;
        add(el, el.getBoundingClientRect(), 'shape');
      }
      return;
    }
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return;
    // A full-bleed photo or map is the section's own background: the wave is cut out of it (B7), it may run under the curve.
    if (['img', 'video'].includes(tag) && r.width >= W * 0.92) return;
    if (['img', 'video', 'iframe', 'canvas', 'input', 'textarea', 'select', 'button'].includes(tag)) { add(el, r, tag); return; }
    if (tag === 'svg') return; // its shapes are measured one by one
    const cs = getComputedStyle(el);
    const wide = r.width >= W * 0.92; // a section-wide background is the section itself (its border edges still count)
    const alpha = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return 0; const p = m[1].split(/[ ,/]+/).filter(Boolean); return p.length > 3 ? +p[3] : 1; };
    // A decorative texture (dot grid, grain: a gradient pattern on an empty aria-hidden box) is part of the surface, not content.
    const texture = alpha(cs.backgroundColor) <= 0.1 && /gradient/.test(cs.backgroundImage) && !el.textContent.trim() && el.closest('[aria-hidden="true"]');
    if (texture) return;
    const bg = alpha(cs.backgroundColor) > 0.1 || cs.backgroundImage !== 'none';
    const sh = cs.boxShadow !== 'none';
    if ((bg || sh) && !wide) { add(el, r, 'box'); return; }
    if (bg && wide) return;
    // Border edges only (rules, frame lines): each painted side as a thin rect.
    ['Top', 'Right', 'Bottom', 'Left'].forEach((s) => {
      const w = parseFloat(cs[`border${s}Width`]); if (!w || cs[`border${s}Style`] === 'none' || alpha(cs[`border${s}Color`]) < 0.1) return;
      const e = s === 'Top' ? { left: r.left, right: r.right, top: r.top, bottom: r.top + w } : s === 'Bottom' ? { left: r.left, right: r.right, top: r.bottom - w, bottom: r.bottom }
        : s === 'Left' ? { left: r.left, right: r.left + w, top: r.top, bottom: r.bottom } : { left: r.right - w, right: r.right, top: r.top, bottom: r.bottom };
      add(el, e, 'border-' + s.toLowerCase());
    });
  });

  // A card that CROSSES a seam in front of the wave (opaque, the curve runs through it with the full clearance above and
  // below at every x it covers: the about polaroid, the contact form) does not touch the wave: it and its content pass.
  // A card whose edge sits near the curve (the leaks DM bubble) still fails.
  const crossers = new Set(); const crossInfo = [];
  for (const b of boxes) {
    if (!['box', 'img'].includes(b.what)) continue;
    for (const cv of curves) {
      const pts = cv.pts.filter((p) => p[0] >= b.r.left && p[0] <= b.r.right);
      if (pts.length < 2) continue;
      if (pts.every((p) => p[1] >= b.r.top + CLEAR && p[1] <= b.r.bottom - CLEAR)) { crossers.add(b.el); crossInfo.push(`${desc(b.el)} crosses ${cv.id}`); }
    }
  }
  const crossed = (el) => [...crossers].some((c) => c.contains(el));
  for (let i = boxes.length - 1; i >= 0; i--) if (crossed(boxes[i].el)) boxes.splice(i, 1);

  const dist = (p, r) => Math.hypot(Math.max(r.left - p[0], 0, p[0] - r.right), Math.max(r.top - p[1], 0, p[1] - r.bottom));
  const hits = [];
  const seen = new Set();
  // Content vs wave curves.
  for (const cv of curves) {
    const xs = cv.pts.map((p) => p[0]), ys = cv.pts.map((p) => p[1]);
    const box = { left: Math.min(...xs) - CLEAR, right: Math.max(...xs) + CLEAR, top: Math.min(...ys) - CLEAR, bottom: Math.max(...ys) + CLEAR };
    for (const b of boxes) {
      if (b.r.right < box.left || b.r.left > box.right || b.r.bottom < box.top || b.r.top > box.bottom) continue;
      let best = Infinity, at = null;
      for (const p of cv.pts) { const d = dist(p, b.r); if (d < best) { best = d; at = p; } }
      if (best < CLEAR) {
        const key = `${cv.id}|${desc(b.el)}`; if (seen.has(key)) continue; seen.add(key);
        hits.push({ kind: 'content-wave', wave: cv.id, el: desc(b.el), what: b.what, d: +best.toFixed(1), need: CLEAR, x: Math.round(at[0]), y: Math.round(at[1]) });
      }
    }
  }
  // Bands vs wave curves, content vs bands.
  for (const bd of bands) {
    for (const cv of curves) {
      let best = Infinity, at = null;
      for (const p of cv.pts) {
        const d = inPoly(bd.poly, p[0], p[1]) ? 0 : Math.min(...bd.edge.map((e) => Math.hypot(e[0] - p[0], e[1] - p[1])));
        if (d < best) { best = d; at = p; }
        if (best === 0) break;
      }
      if (best < BAND_WAVE) hits.push({ kind: 'band-wave', wave: cv.id, el: bd.id, d: +best.toFixed(1), need: BAND_WAVE, x: Math.round(at[0]), y: Math.round(at[1]) });
    }
    const ys = bd.edge.map((e) => e[1]);
    const top = Math.min(...ys) - BAND_CLEAR, bot = Math.max(...ys) + BAND_CLEAR;
    for (const b of boxes) {
      if (b.r.bottom < top || b.r.top > bot || bd.el.contains(b.el)) continue;
      const corners = [[b.r.left, b.r.top], [b.r.right, b.r.top], [b.r.right, b.r.bottom], [b.r.left, b.r.bottom]];
      let best = corners.some((c) => inPoly(bd.poly, c[0], c[1])) ? 0 : Math.min(...bd.edge.map((e) => dist(e, b.r)));
      if (best < BAND_CLEAR) {
        const key = `${bd.id}|${desc(b.el)}`; if (seen.has(key)) continue; seen.add(key);
        hits.push({ kind: 'content-band', band: bd.id, el: desc(b.el), what: b.what, d: +best.toFixed(1), need: BAND_CLEAR, x: Math.round(b.r.left), y: Math.round(b.r.top) });
      }
    }
  }
  return { waves: curves.length, bands: bands.length, samples: curves.reduce((a, c) => a + c.pts.length, 0), hits, crossers: [...new Set(crossInfo)] };
}

const srv = await serveDist();
const browser = await chromium.launch();
const report = [];
let total = 0;
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  for (const pg of pages) {
    await p.goto(srv.url + pg, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(250);
    const r = await p.evaluate(measure, SEAM_OBJECTS);
    total += r.hits.length;
    report.push({ page: pg, w, ...r });
    console.log(`${pg} @${w}: ${r.waves} wave curves (${r.samples} samples), ${r.bands} bands -> ${r.hits.length} hits`);
    r.crossers.forEach((c) => console.log(`   (ok, crosses in front) ${c}`));
    r.hits.forEach((h) => console.log(`   ${h.kind} ${h.wave || h.band} | ${h.el} (${h.what || ''}) d=${h.d} < ${h.need} at x${h.x} y${h.y}`));
  }
  await ctx.close();
}
await browser.close(); srv.close();
if (out) fs.writeFileSync(out, JSON.stringify(report, null, 1));
console.log(`check-seams: ${total} hits`);
process.exit(total ? 1 : 0);

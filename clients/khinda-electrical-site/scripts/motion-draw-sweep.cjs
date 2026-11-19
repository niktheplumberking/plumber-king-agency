// One sweep down the page; at each step read every scrubbed path's drawn fraction. Pass per path: starts ~0, ends ~1,
// never goes backwards, and passes through >= 3 in-between values (a real scrub, not a jump).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const U = process.env.U, W = +process.env.W, STEP = +(process.env.S || 60);
(async () => {
  const b = await chromium.launch(); const vh = W > 800 ? 900 : 844;
  const p = await b.newPage({ viewport: { width: W, height: vh } });
  await p.addInitScript(() => { try { sessionStorage.setItem('ke-intro', '1'); } catch (e) {} });
  await p.goto(U + (process.env.P || '/'), { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const rows = [];
  const read = () => p.evaluate(() => [...document.querySelectorAll('.cd, .cur')].filter((e) => e instanceof SVGGeometryElement && e.ownerSVGElement.getBoundingClientRect().width > 0).map((e) => {
    const cs = getComputedStyle(e); const L = e.getTotalLength();
    if (cs.strokeDasharray === 'none') return 1;
    const da = cs.strokeDasharray.split(/[ ,]+/).map(parseFloat); const off = parseFloat(cs.strokeDashoffset) || 0;
    return da.length >= 2 && Math.abs(da[0] + da[1] - L) > 1e-3 && da[0] < L ? da[0] / L : Math.max(0, Math.min(1, 1 - off / L));
  }));
  for (let y = 0; y <= H; y += STEP) { await p.evaluate((y) => window.__pbpLenis ? window.__pbpLenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y), y); await p.waitForTimeout(+(process.env.WT || 250)); rows.push(await read()); }
  const names = await p.evaluate(() => [...document.querySelectorAll('.cd, .cur')].filter((e) => e instanceof SVGGeometryElement && e.ownerSVGElement.getBoundingClientRect().width > 0).map((e) => (e.closest('section,footer')?.className.split(' ')[0] || '?') + ':' + e.getAttribute('class')));
  const res = names.map((n, i) => {
    const s = rows.map((r) => +r[i].toFixed(3)); const mid = s.filter((x) => x > 0.02 && x < 0.98);
    let back = 0; s.forEach((x, k) => { if (k && x < s[k - 1] - 0.02) back++; });
    return { n, start: s[0], end: s[s.length - 1], mids: mid.length, back, pass: s[0] < 0.02 && s[s.length - 1] > 0.98 && mid.length >= 3 && back === 0 };
  });
  console.log(JSON.stringify(res)); await b.close();
})();

// Motion probes: (1) reading pace, 250 px every 450 ms: any [data-t]/[data-fx]/.l1/.l2 element inside the viewport for
// > 0.3 s with opacity < 0.5; (2) fast scroll to the bottom then 1.5 s: any such element above the fold still hidden.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const U = process.env.U, W = +process.env.W;
(async () => {
  const b = await chromium.launch(); const vh = W > 800 ? 900 : 844;
  const p = await b.newPage({ viewport: { width: W, height: vh } });
  await p.addInitScript(() => { try { sessionStorage.setItem('ke-intro', '1'); } catch (e) {} });
  await p.goto(U + (process.env.P || '/'), { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
  const probe = () => p.evaluate(() => {
    const op = (e) => { let o = 1; for (let x = e; x && x !== document.body; x = x.parentElement) o *= +getComputedStyle(x).opacity; return o; };
    return [...document.querySelectorAll('[data-t], [data-fx], [data-stagger] > *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && r.top > 0 && r.bottom < innerHeight && getComputedStyle(e).visibility !== 'hidden' && op(e) < 0.5; }).map((e) => (e.closest('section,footer')?.className.split(' ')[0] || '?') + ' ' + e.tagName + '.' + (e.className.baseVal ?? e.className).split(' ')[0]);
  });
  const H = await p.evaluate(() => document.documentElement.scrollHeight); const slow = new Set();
  for (let y = 0; y < H; y += 250) {
    await p.evaluate((y) => window.__pbpLenis ? window.__pbpLenis.scrollTo(y, { immediate: true }) : scrollTo(0, y), y);
    await p.waitForTimeout(350); const a = await probe(); await p.waitForTimeout(100); const c = await probe();
    a.filter((x) => c.includes(x)).forEach((x) => slow.add(`${y}: ${x}`));
  }
  await p.goto(U + (process.env.P || '/'), { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  for (let y = 0; y < H; y += 1500) await p.evaluate((y) => window.__pbpLenis ? window.__pbpLenis.scrollTo(y, { immediate: true }) : scrollTo(0, y), y);
  await p.evaluate(() => window.__pbpLenis ? window.__pbpLenis.scrollTo(document.documentElement.scrollHeight, { immediate: true }) : scrollTo(0, 1e6));
  await p.waitForTimeout(1500);
  const fast = await p.evaluate(() => [...document.querySelectorAll('[data-t], [data-fx]')].filter((e) => { const r = e.getBoundingClientRect(); let o = 1; for (let x = e; x && x !== document.body; x = x.parentElement) o *= +getComputedStyle(x).opacity; return r.width && r.bottom < innerHeight && o < 0.5 && getComputedStyle(e).visibility !== 'hidden'; }).map((e) => (e.closest('section,footer')?.className.split(' ')[0] || '?') + ' ' + e.tagName + '.' + (e.className.baseVal ?? e.className).split(' ')[0]));
  console.log(JSON.stringify({ W, slow: [...slow], fastLeftHidden: fast })); await b.close();
})();

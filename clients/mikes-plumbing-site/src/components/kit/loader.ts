// Loader (fix round 1, B3): the slat counter + 8 blinds of global/Loader.astro. Ported from 21st.dev "Swiss Poster Counter
// Preloader" (id 35248): every digit is a 3 x 7 grid of 2:1 slats, each row always owns three of them; a number is drawn by
// sliding the bars sideways onto the lit cells (spares hide behind them), so the count shunts and never fades a glyph.
//   runLoader({ onCover, onDone })  onCover: the page may take its pre-states (still fully covered).
//                                   onDone: the blinds are ~75 % off-screen: header + hero timeline + Lenis start here.
// Timing: slats grow in (0.3 s), count 000 -> 100 over ~1.2 s while the page loads (100 is forced at 1.8 s), the last shunt
// lands (0.52 s), then the exit (~0.85 s): the stage fades and the blinds slide off alternately left / right, a tan / bone
// band on each moving edge; onDone fires 0.6 s into the exit (blinds ~75 % across). Max 3.4 s.
// Skip: a click, tap or key goes straight to 100 and exits. One writer: GSAP xPercent on .ld-blind,
// opacity on .ld-stage;
// the slats move only through their CSS custom properties (CSS transition).
import { gsap } from 'gsap';

const FONT: Record<string, string[]> = {
  '0': ['111', '101', '101', '101', '101', '101', '111'], '1': ['010', '110', '010', '010', '010', '010', '111'],
  '2': ['111', '001', '001', '111', '100', '100', '111'], '3': ['111', '001', '001', '111', '001', '001', '111'],
  '4': ['101', '101', '101', '111', '001', '001', '001'], '5': ['111', '100', '100', '111', '001', '001', '111'],
  '6': ['111', '100', '100', '111', '101', '101', '111'], '7': ['111', '001', '001', '010', '010', '010', '010'],
  '8': ['111', '101', '101', '111', '101', '101', '111'], '9': ['111', '101', '101', '111', '001', '001', '111'],
  '-': ['000', '000', '000', '111', '000', '000', '000'],
};
const ROWS = 7;

function rowTargets(row: string, r: number): number[] | null {
  const lit = [0, 1, 2].filter((c) => row[c] === '1');
  if (!lit.length) return null;
  return [0, 1, 2].map((c) => {
    if (lit.includes(c)) return c;
    let best = lit[0];
    for (const l of lit) { const d = Math.abs(l - c), bd = Math.abs(best - c); if (d < bd || (d === bd && l !== best && (r % 2 === 0 ? l > best : l < best))) best = l; }
    return best;
  });
}
/** Every bar of one slot, row-major: target column, rows it drops, flat (scaleX 0). ' ' folds all bars flat. */
function layout(ch: string) {
  const bars: { col: number; dy: number; flat: boolean }[] = [];
  if (ch === ' ') { for (let r = 0; r < ROWS; r++) for (let c = 0; c < 3; c++) bars.push({ col: c, dy: 3 - r, flat: true }); return bars; }
  const t = (FONT[ch] || FONT['-']).map(rowTargets);
  for (let r = 0; r < ROWS; r++) {
    let src = r;
    if (!t[r]) for (let d = 1; d < ROWS; d++) { if (r + d < ROWS && t[r + d]) { src = r + d; break; } if (r - d >= 0 && t[r - d]) { src = r - d; break; } }
    const tt = t[src] || [0, 1, 2];
    for (let c = 0; c < 3; c++) bars.push({ col: tt[c], dy: src - r, flat: !t[src] });
  }
  return bars;
}
/** Uneven per-bar delays (ms) so neighbours never move in lockstep: the shunt reads as mechanical. */
function delay(n: number) { let d = 0; if (n % 2 === 1) d = 123; if (n >= 3 && n % 2 === 1) d = 222; if ((n - 1) % 5 === 0) d = 69; if ((n - 2) % 3 === 0) d = 99; return d; }
// Surges and stalls like a real load (time, progress knots).
const KNOTS = [[0, 0], [0.18, 0.22], [0.3, 0.27], [0.55, 0.61], [0.68, 0.66], [0.86, 0.93], [1, 1]];
function simulated(t: number) {
  if (t >= 1) return 1;
  for (let i = 0; i < KNOTS.length - 1; i++) { const [a0, a1] = KNOTS[i], [b0, b1] = KNOTS[i + 1]; if (t <= b0) { const l = (t - a0) / (b0 - a0); return a1 + (b1 - a1) * (1 - (1 - l) * (1 - l)); } }
  return 1;
}

export function runLoader({ onCover = () => {}, onDone }: { onCover?: () => void; onDone: () => void }) {
  const html = document.documentElement;
  const ld = document.querySelector<HTMLElement>('[data-loader]');
  if (!ld || !html.classList.contains('intro')) { html.classList.remove('cv'); onDone(); return; }
  const slots = Array.from(ld.querySelectorAll<HTMLElement>('.ld-slot'));
  const num = ld.querySelector<HTMLElement>('.ld-num');
  const draw = (txt: string) => slots.forEach((s, k) => {
    const bars = layout(txt[k] ?? ' ');
    Array.from(s.children as HTMLCollectionOf<HTMLElement>).forEach((el, i) => {
      const b = bars[i];
      el.style.setProperty('--x', String(b.col - (i % 3)));
      el.style.setProperty('--y', String(b.dy));
      el.style.setProperty('--s', b.flat ? '0' : '1');
      el.style.transitionDelay = `${delay(i + 1) + k * 45}ms`;
    });
  });
  (window as any).__pbpLenis?.stop();
  // Base.astro .cv: the sections below the hero skipped layout for the first paint. Once the page has loaded they are let
  // back in one at a time (small tasks, no long main-thread block), all under the cover.
  const cvList = Array.from(document.querySelectorAll<HTMLElement>('main > :not([data-m-hero]), body > footer'));
  let cvTimer = 0;
  const releaseCv = (all = false) => {
    clearTimeout(cvTimer);
    if (all) { html.classList.remove('cv'); return; }
    const el = cvList.shift();
    if (!el) { html.classList.remove('cv'); return; }
    el.style.contentVisibility = 'visible';
    cvTimer = window.setTimeout(() => releaseCv(), 40);
  };
  const cvStart = () => { cvTimer = window.setTimeout(() => releaseCv(), 60); };
  if (document.readyState === 'complete') cvStart(); else window.addEventListener('load', cvStart, { once: true });
  const t0 = performance.now();
  const INTRO = 300, COUNT = 1200, FORCE = 1800, STEP = 240, HOLD = 520;
  // The slats take ~0.42 s (+ up to ~0.31 s of per-bar delay) to land on a new number: the HUD shows the number the slats
  // have landed on, never the one they are still moving to (fix round 2, review 14).
  const LAND = 520;
  const hud = (s: string) => window.setTimeout(() => { if (num) num.textContent = `${s} / 100`; }, LAND);
  let loaded = document.readyState === 'complete';
  if (!loaded) window.addEventListener('load', () => { loaded = true; }, { once: true });
  let shown = -1, timer = 0, leaving = false;
  draw('   ');
  requestAnimationFrame(() => requestAnimationFrame(() => draw('---')));
  const tick = () => {
    const el = performance.now() - t0;
    let p = Math.floor(simulated((el - INTRO) / COUNT) * 100);
    if (p >= 100 && !loaded && el < FORCE) p = 99; // hold at 99 while the page is still loading, up to the cap
    if (el >= FORCE) p = 100;
    if (p > shown) { shown = p; const s = String(p).padStart(3, '0'); draw(s); hud(s); }
    if (shown >= 100) { leave(HOLD); return; }
    timer = window.setTimeout(tick, STEP);
  };
  timer = window.setTimeout(tick, INTRO);

  const leave = (hold: number) => {
    if (leaving) return; leaving = true; clearTimeout(timer);
    releaseCv(true); // whatever is still skipped lays out now, under the cover (Base.astro .cv)
    if (shown < 100) { shown = 100; draw('100'); hud('100'); }
    onCover(); // fully covered: the hero takes its start states unseen
    const blinds = Array.from(ld.querySelectorAll<HTMLElement>('.ld-blind'));
    // Exit (fix round 2, review 3): the stage fades, then the blinds slide off alternately; each blind's moving edge carries a
    // tan / bone band (the slats' colours, Loader.astro) so the exit reads on an ink hero too. The handoff (hero, header, Lenis) fires while the last blinds
    // are still leaving, so there is no dead time between the cover clearing and the H1; the loader is removed at the end.
    let handed = false;
    const hand = () => {
      if (handed) return; handed = true;
      (window as any).__pbpLenis?.start();
      onDone();
    };
    gsap.timeline({ delay: hold / 1000, onComplete: () => {
      html.classList.remove('intro'); ld.style.display = 'none';
      document.querySelectorAll<HTMLElement>('[style*="content-visibility"]').forEach((el) => { el.style.contentVisibility = ''; });
      try { sessionStorage.setItem('mps-intro', '1'); } catch (e) { /* storage blocked: the loader may show again */ }
      hand();
    } })
      .to(ld.querySelectorAll('.ld-stage, .ld-skip'), { autoAlpha: 0, duration: 0.2, ease: 'sine.inOut' }, 0)
      .to(blinds, { xPercent: (i: number) => (i % 2 ? 101 : -101), duration: 0.6, ease: 'power2.inOut', stagger: 0.012 }, 0.15)
      .add(hand, 0.15 + 0.6 * 0.75);
  };
  const skip = () => leave(240);
  ld.addEventListener('pointerdown', skip, { once: true });
  window.addEventListener('keydown', skip, { once: true });
}

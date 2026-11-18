// Loader (fix round 1, B3): the slat counter + 8 blinds of global/Loader.astro. Ported from 21st.dev "Swiss Poster Counter
// Preloader" (id 35248): every digit is a 3 x 7 grid of 2:1 slats, each row always owns three of them; a number is drawn by
// sliding the bars sideways onto the lit cells (spares hide behind them), so the count shunts and never fades a glyph.
//   runLoader({ onCover, onDone })  onCover: the page may take its pre-states (still fully covered).
//                                   onDone: the last blind is fully off-screen: header + hero timeline + Lenis start here.
// Timing: slats grow in (0.3 s), count 000 -> 100 over ~1.3 s while the page loads (100 is forced at 1.8 s), the last shunt
// lands (0.46 s), then the exit (~0.7 s): the stage fades and the 8 blinds slide off alternately left / right. Max 3.4 s.
// Skip: a click, tap or key goes straight to 100 and exits. One writer: GSAP xPercent on .ld-blind, opacity on .ld-stage;
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
  if (!ld || !html.classList.contains('intro')) { onDone(); return; }
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
  const t0 = performance.now();
  const INTRO = 300, COUNT = 1300, FORCE = 1800, STEP = 240, HOLD = 460;
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
    if (p > shown) { shown = p; const s = String(p).padStart(3, '0'); draw(s); if (num) num.textContent = `${s} / 100`; }
    if (shown >= 100) { leave(HOLD); return; }
    timer = window.setTimeout(tick, STEP);
  };
  timer = window.setTimeout(tick, INTRO);

  const leave = (hold: number) => {
    if (leaving) return; leaving = true; clearTimeout(timer);
    if (shown < 100) { draw('100'); if (num) num.textContent = '100 / 100'; }
    onCover(); // fully covered: the hero takes its start states unseen
    const blinds = Array.from(ld.querySelectorAll<HTMLElement>('.ld-blind'));
    gsap.timeline({ delay: hold / 1000, onComplete: () => {
      html.classList.remove('intro'); ld.style.display = 'none';
      try { sessionStorage.setItem('mps-intro', '1'); } catch (e) { /* storage blocked: the loader may show again */ }
      (window as any).__pbpLenis?.start();
      onDone();
    } })
      .to(ld.querySelectorAll('.ld-stage, .ld-skip'), { autoAlpha: 0, duration: 0.25, ease: 'sine.inOut' }, 0)
      .to(blinds, { xPercent: (i: number) => (i % 2 ? 101 : -101), duration: 0.6, ease: 'power2.inOut', stagger: 0.012 }, 0.05);
  };
  const skip = () => leave(240);
  ld.addEventListener('pointerdown', skip, { once: true });
  window.addEventListener('keydown', skip, { once: true });
}

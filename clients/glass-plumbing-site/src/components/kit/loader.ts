// Loader (global/Loader.astro), Glass look: a frost poster with the logo, one big housing that fills with water while the
// page loads, and a mono "000 / 100" gauge. Same API and handoff as before (motion.ts relies on it):
//   runLoader({ onCover, onDone })  onCover: the page may take its pre-states (still fully covered).
//                                   onDone: the blinds are ~75 % off-screen: header + hero timeline + Lenis start here.
// Timing: the count runs 0 -> 100 over ~1.2 s with surges and stalls (holds at 99 until `load`, 100 forced at 1.8 s); the
// water level follows the count (CSS transition on --p, so it moves smoothly between steps); a 0.45 s hold at 100; then
// the exit (~0.85 s): the stage fades and the 8 blinds slide off alternately left / right (0.6 s power2.inOut, stagger
// 0.012 s), each with a powder band on its moving edge. onDone fires 0.6 s into the exit (blinds ~75 % across). Max ~3.2 s.
// Skip: a click, tap or key goes straight to 100 and exits. One writer per property: GSAP xPercent on .ld-blind, opacity on
// .ld-stage / .ld-skip; the water moves only through the --p custom property.
// html.cv (Base.astro): sections below the hero skip layout under the loader; they are let back in after `load`.
import { gsap } from 'gsap';

// Surges and stalls like a real load (time, progress knots).
const KNOTS = [[0, 0], [0.18, 0.22], [0.3, 0.27], [0.55, 0.61], [0.68, 0.66], [0.86, 0.93], [1, 1]];
function simulated(t: number) {
  if (t >= 1) return 1;
  if (t <= 0) return 0;
  for (let i = 0; i < KNOTS.length - 1; i++) { const [a0, a1] = KNOTS[i], [b0, b1] = KNOTS[i + 1]; if (t <= b0) { const l = (t - a0) / (b0 - a0); return a1 + (b1 - a1) * (1 - (1 - l) * (1 - l)); } }
  return 1;
}

export function runLoader({ onCover = () => {}, onDone }: { onCover?: () => void; onDone: () => void }) {
  const html = document.documentElement;
  const ld = document.querySelector<HTMLElement>('[data-loader]');
  if (!ld || !html.classList.contains('intro')) { html.classList.remove('cv'); onDone(); return; }
  const num = ld.querySelector<HTMLElement>('[data-ld-num]');
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
  const INTRO = 250, COUNT = 1200, FORCE = 1800, STEP = 90, HOLD = 450;
  let loaded = document.readyState === 'complete';
  if (!loaded) window.addEventListener('load', () => { loaded = true; }, { once: true });
  let shown = -1, timer = 0, leaving = false;
  const show = (p: number) => {
    shown = p;
    ld.style.setProperty('--p', String(p / 100));
    if (num) num.textContent = String(p).padStart(3, '0');
  };
  const tick = () => {
    const el = performance.now() - t0;
    let p = Math.floor(simulated((el - INTRO) / COUNT) * 100);
    if (p >= 100 && !loaded && el < FORCE) p = 99; // hold at 99 while the page is still loading, up to the cap
    if (el >= FORCE) p = 100;
    if (p > shown) show(p);
    if (shown >= 100) { leave(HOLD); return; }
    timer = window.setTimeout(tick, STEP);
  };
  timer = window.setTimeout(tick, INTRO);

  const leave = (hold: number) => {
    if (leaving) return; leaving = true; clearTimeout(timer);
    releaseCv(true); // whatever is still skipped lays out now, under the cover (Base.astro .cv)
    if (shown < 100) show(100);
    onCover(); // fully covered: the hero takes its start states unseen
    const blinds = Array.from(ld.querySelectorAll<HTMLElement>('.ld-blind'));
    let handed = false;
    const hand = () => {
      if (handed) return; handed = true;
      (window as any).__pbpLenis?.start();
      onDone();
    };
    gsap.timeline({ delay: hold / 1000, onComplete: () => {
      html.classList.remove('intro'); ld.style.display = 'none';
      document.querySelectorAll<HTMLElement>('[style*="content-visibility"]').forEach((el) => { el.style.contentVisibility = ''; });
      try { sessionStorage.setItem('gps-intro', '1'); } catch (e) { /* storage blocked: the loader may show again */ }
      hand();
    } })
      .to(ld.querySelectorAll('.ld-stage, .ld-skip'), { autoAlpha: 0, duration: 0.2, ease: 'sine.inOut' }, 0)
      .to(blinds, { xPercent: (i: number) => (i % 2 ? 101 : -101), duration: 0.6, ease: 'power2.inOut', stagger: 0.012 }, 0.15)
      .add(hand, 0.15 + 0.6 * 0.75);
  };
  const skip = () => leave(200);
  ld.addEventListener('pointerdown', skip, { once: true });
  window.addEventListener('keydown', skip, { once: true });
}

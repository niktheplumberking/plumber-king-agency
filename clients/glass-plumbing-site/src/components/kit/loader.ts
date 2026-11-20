// Loader (global/Loader.astro), "Clear Water" (revision round 2: the same family as the page curtain, kit/water.ts). The
// screen is the housing: while the page loads, powder water, then deep water, then the clear frost layer rise from the
// bottom with the count (meniscus surfaces, a slow swell while they wait); Kody's logo and a mono "042 / 100" gauge sit on a
// spec plate that floats on top. At 100 the screen is full; the plate sinks and the water drains down and away exactly
// like the curtain's reveal (front layer first), and the page appears from the top. Same API and handoff as before:
//   runLoader({ onCover, onDone })  onCover: the page may take its pre-states (still fully covered).
//                                   onDone: at 55 % of the drain (the H1 clears): header + hero timeline + Lenis start.
// Timing: count 0 -> 100 over ~1.2 s with surges and stalls (holds at 99 until `load`, 100 forced at 1.8 s); the water
// follows the count (smoothed); at 100 it tops up (0.35 s), holds 0.15 s, then drains (1.05 s). Max ~3.35 s.
// Skip: a click, tap or key goes straight to the top-up and drain. One writer per property: path `d` via draw(), --p not
// used any more; .ld-plate opacity/transform and .ld-hud opacity by GSAP here.
// html.cv (Base.astro): sections below the hero skip layout under the loader; they are let back in after `load`.
import { gsap } from 'gsap';
import { draw, sheetOf } from './water';
import { drain } from './curtain';

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
  const sheet = sheetOf(ld);
  (window as any).__glassLenis?.stop();
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
  const INTRO = 250, COUNT = 1200, FORCE = 1800, STEP = 90;
  let loaded = document.readyState === 'complete';
  if (!loaded) window.addEventListener('load', () => { loaded = true; }, { once: true });
  let shown = -1, timer = 0, leaving = false;
  // The water follows the count, smoothed, with a slow swell on its surfaces while it waits (gsap ticker, loader only).
  const w = { v: 0, target: 0, ph: 0, follow: true };
  draw(sheet, 0);
  const swell = () => {
    if (w.follow) w.v += (w.target - w.v) * 0.08;
    w.ph += 0.05;
    draw(sheet, w.v, false, 1.4, w.ph);
  };
  gsap.ticker.add(swell);
  const show = (p: number) => {
    shown = p;
    w.target = (p / 100) * 0.92; // the last 8 % is the top-up at the end
    if (num) num.textContent = String(p).padStart(3, '0');
  };
  const tick = () => {
    const el = performance.now() - t0;
    let p = Math.floor(simulated((el - INTRO) / COUNT) * 100);
    if (p >= 100 && !loaded && el < FORCE) p = 99; // hold at 99 while the page is still loading, up to the cap
    if (el >= FORCE) p = 100;
    if (p > shown) show(p);
    if (shown >= 100) { leave(); return; }
    timer = window.setTimeout(tick, STEP);
  };
  timer = window.setTimeout(tick, INTRO);

  const leave = () => {
    if (leaving) return; leaving = true; clearTimeout(timer);
    releaseCv(true); // whatever is still skipped lays out now, under the cover (Base.astro .cv)
    if (shown < 100) show(100);
    let handed = false;
    const hand = () => {
      if (handed) return; handed = true;
      (window as any).__glassLenis?.start();
      onDone();
    };
    // Top up to full (0.35 s), then the screen is the clear front layer: the page takes its pre-states unseen, the
    // backdrop goes, and the water drains like the curtain's reveal.
    w.follow = false;
    gsap.timeline()
      .to(w, { v: 1, duration: 0.35, ease: 'sine.inOut' })
      .to(ld.querySelectorAll('.ld-hud, .ld-skip'), { autoAlpha: 0, duration: 0.25, ease: 'sine.inOut' }, 0)
      .add(() => {
        gsap.ticker.remove(swell);
        onCover(); // fully covered: the hero takes its start states unseen
        ld.classList.add('is-open'); // backdrop off (under the full front layer, so nothing shows)
        drain(ld, hand, () => {
          html.classList.remove('intro'); ld.style.display = 'none';
          document.querySelectorAll<HTMLElement>('[style*="content-visibility"]').forEach((el) => { el.style.contentVisibility = ''; });
          try { sessionStorage.setItem('gps-intro', '1'); } catch (e) { /* storage blocked: the loader may show again */ }
          hand();
        }, ld.querySelector<HTMLElement>('.ld-plate'), 0.15);
      }, 0.36);
  };
  const skip = () => leave();
  ld.addEventListener('pointerdown', skip, { once: true });
  window.addEventListener('keydown', skip, { once: true });
}

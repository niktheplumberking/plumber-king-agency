// Settle + refresh: the ONE place that re-measures ScrollTrigger (kit/README.md, fix round 1 A-2).
// - settled(): resolves once fonts are in, the window has loaded (images) and the wide-screen zoom on <html> has held still
//   for two frames. Start/end points measured before that are wrong by the font swap or the zoom.
// - requestRefresh(): debounced Lenis resize + ScrollTrigger.refresh(). Never during a scroll: while Lenis (or the native
//   scroll) is moving, the refresh waits for the scroll to stop, so no trigger jumps under the reader's eyes.
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type LenisLike = { velocity: number; isScrolling?: boolean | string; resize: () => void };
const lenis = () => (window as unknown as { __pbpLenis?: LenisLike }).__pbpLenis;

let settledP: Promise<void> | null = null;
export function settled(): Promise<void> {
  if (settledP) return settledP;
  const fonts = document.fonts ? Promise.race([document.fonts.ready.then(() => undefined), new Promise<void>((r) => setTimeout(r, 2500))]) : Promise.resolve();
  const load = document.readyState === 'complete' ? Promise.resolve() : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true }));
  const frames = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  const zoomStill = async () => {
    const html = document.documentElement;
    for (let i = 0; i < 10; i++) { const z = html.style.zoom; await frames(); if (html.style.zoom === z) return; }
  };
  settledP = Promise.all([fonts, load]).then(zoomStill);
  return settledP;
}

const scrolling = () => {
  const l = lenis();
  return !!l && (Math.abs(l.velocity) > 0.05 || (l.isScrolling !== undefined && l.isScrolling !== false));
};
let timer = 0;
let waiting = false;
/** Ask for one re-measure. Bursts collapse into one; a request made while scrolling runs when the scroll has stopped. */
export function requestRefresh(delay = 150) {
  clearTimeout(timer);
  timer = window.setTimeout(function run() {
    if (scrolling()) {
      if (!waiting) { waiting = true; ScrollTrigger.addEventListener('scrollEnd', function once() { ScrollTrigger.removeEventListener('scrollEnd', once); waiting = false; requestRefresh(60); }); }
      return;
    }
    lenis()?.resize();
    ScrollTrigger.refresh();
  }, delay);
}

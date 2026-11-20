// Scroll progress for the services / water-heaters / our-work / faq R2 sections (services-work-faq builder).
// Writes ONE custom property (--p, 0..1) on the element as it passes through the viewport. Lenis drives the native window
// scroll, so the scroll event follows the smoothed position. Without motion (reduced motion, no JS) callers keep the CSS
// end state: this only runs under html.motion and sets --p:1 otherwise.
export const hasMotion = () =>
  document.documentElement.classList.contains('motion') && !matchMedia('(prefers-reduced-motion: reduce)').matches;

/** start / end: viewport fractions where the box top reaches (start) and where progress reaches 1 (box top at end). */
export function scrollProgress(el: HTMLElement, opts: { start?: number; end?: number; onP?: (p: number) => void; prop?: string } = {}) {
  const { start = 0.85, end = 0.3, onP, prop = '--p' } = opts;
  if (!hasMotion()) { el.style.setProperty(prop, '1'); onP?.(1); return; }
  let raf = 0;
  const run = () => {
    raf = 0;
    const r = el.getBoundingClientRect(), vh = innerHeight;
    const p = Math.min(1, Math.max(0, (vh * start - r.top) / (vh * (start - end))));
    el.style.setProperty(prop, p.toFixed(4));
    onP?.(p);
  };
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(run); }, { passive: true });
  addEventListener('resize', () => { if (!raf) raf = requestAnimationFrame(run); }, { passive: true });
  run();
}

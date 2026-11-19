// One-shot "it entered the viewport" helper for the areas / town / about interactions (water fills, text thread,
// house rules, outline draw). Line at 96 % of the viewport like the motion engine's single elements (MOTION.md 1b).
// Under reduced motion (html.no-motion) or without motion the callback runs at once, so the end state shows.
export function onEnter(el: Element, cb: () => void, line = '0px 0px -4% 0px') {
  const d = document.documentElement;
  if (!d.classList.contains('motion') || !('IntersectionObserver' in window)) { cb(); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      // Already above the viewport (anchor jump, reload mid-page): end state at once, like motion.ts.
      if (e.isIntersecting || e.boundingClientRect.bottom < 0) { io.disconnect(); cb(); return; }
    }
  }, { rootMargin: line });
  io.observe(el);
}

/** Motion is on (html.motion, not reduced). */
export const motionOn = () => document.documentElement.classList.contains('motion');

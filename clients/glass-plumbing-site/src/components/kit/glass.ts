// Glass signature moments for the kit objects (BUILD-BRIEF section 4; MOTION.md section 4):
//   [data-fill]  (Housing.astro)  the water rises to its level as the housing enters        -> .is-filled
//   [data-plate] (Plate.astro)    the four rivets pop once the plate is in view            -> .is-in
//   [data-seam]  (Seam.astro)     the meniscus curve settles from flat as the join enters    -> .is-in
// The start states live in CSS under html.motion only, so reduced motion and no-JS show the end state. Nothing starts
// while the loader or the curtain covers the page (html.intro / html.pt-in): the observers attach after the handoff, so a
// hero housing fills in front of the reader, not under the cover. Each element plays once.
const html = document.documentElement;
const SEL: [string, string][] = [['[data-fill]', 'is-filled'], ['[data-plate]', 'is-in'], ['[data-seam]', 'is-in']];

function start() {
  const els = SEL.flatMap(([s, c]) => Array.from(document.querySelectorAll<HTMLElement>(s)).map((el) => [el, c] as const));
  if (!html.classList.contains('motion') || !('IntersectionObserver' in window)) {
    els.forEach(([el, c]) => el.classList.add(c));
    return;
  }
  const cls = new Map(els);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const el = e.target as HTMLElement;
      // Already scrolled past (above the viewport): end state at once, no animation behind the reader's back.
      if (e.isIntersecting || e.boundingClientRect.bottom < 0) { el.classList.add(cls.get(el)!); io.unobserve(el); }
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  els.forEach(([el]) => io.observe(el));
}

const covered = () => html.classList.contains('intro') || html.classList.contains('pt-in');
function boot() {
  if (!covered()) { start(); return; }
  const mo = new MutationObserver(() => { if (!covered()) { mo.disconnect(); setTimeout(start, 150); } });
  mo.observe(html, { attributes: true, attributeFilter: ['class'] });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true }); else boot();

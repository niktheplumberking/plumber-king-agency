// Scroll-controlled moments for the service pages (Nick, 17 Nov: "water travels along a pipe as you scroll, reaching
// numbered stops in order; each stop lights up, grows ~1.08 and turns a little as the water reaches it").
// Same GSAP + ScrollTrigger instance as motion.ts (one bundle), so Lenis drives it through ScrollTrigger.update.
// Markup API (page-local; motion.ts is untouched):
//   [data-sv-scrub]                      the track. data-start / data-end = ScrollTrigger start/end (defaults below)
//     [data-sv-fill]                     scaled 0 -> 1 with the scroll (axis from CSS transform-origin; data-axis="x|y"
//                                        or data-axis-m for < 768 px). data-rev: 1 -> 0 instead (a shade that drains away,
//                                        so the final state is the bare Figma piece)
//     [data-sv-stop][data-at="0.4"]      gets .is-lit once the progress passes `at` (CSS: grow 1.08 + turn), and loses it
//                                        on the way back
//     [data-sv-turn][data-from][data-to] rotates from -> to degrees with the progress (a valve handle)
//     [data-sv-draw]                     SVG stroke drawn 0 -> 100 % with the progress (stroke-dashoffset)
// Only transform / opacity / stroke-dashoffset. Without motion (reduced motion, no JS) CSS shows the final state.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const html = document.documentElement;

function init() {
  const mm = gsap.matchMedia();
  document.querySelectorAll<HTMLElement>('[data-sv-scrub]').forEach((track) => {
    const build = (mobile: boolean) => {
      const fills = Array.from(track.querySelectorAll<HTMLElement>('[data-sv-fill]'));
      const stops = Array.from(track.querySelectorAll<HTMLElement>('[data-sv-stop]'));
      const turns = Array.from(track.querySelectorAll<HTMLElement>('[data-sv-turn]'));
      const draws = Array.from(track.querySelectorAll<SVGGeometryElement>('[data-sv-draw]'));
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: track, scrub: 0.6,
          start: (mobile && track.dataset.startM) || track.dataset.start || 'top 75%',
          end: (mobile && track.dataset.endM) || track.dataset.end || 'bottom 45%',
          onUpdate: (st) => stops.forEach((s) => s.classList.toggle('is-lit', st.progress >= parseFloat(s.dataset.at || '0') - 0.001)),
          onRefresh: (st) => stops.forEach((s) => s.classList.toggle('is-lit', st.progress >= parseFloat(s.dataset.at || '0') - 0.001)),
        },
      });
      fills.forEach((f) => {
        const axis = (mobile && f.dataset.axisM) || f.dataset.axis || 'x';
        const a = 'rev' in f.dataset ? 1 : 0, b = 1 - a;
        tl.fromTo(f, axis === 'y' ? { scaleY: a, scaleX: 1 } : { scaleX: a, scaleY: 1 }, axis === 'y' ? { scaleY: b, duration: 1 } : { scaleX: b, duration: 1 }, 0);
      });
      turns.forEach((t) => tl.fromTo(t, { rotation: parseFloat(t.dataset.from || '0') }, { rotation: parseFloat(t.dataset.to || '0'), duration: 1 }, 0));
      draws.forEach((p) => {
        const len = p.getTotalLength();
        tl.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1 }, 0);
      });
      track.classList.add('sv-scrub-on');
      return () => { track.classList.remove('sv-scrub-on'); stops.forEach((s) => s.classList.remove('is-lit')); };
    };
    mm.add('(min-width: 768px)', () => build(false));
    mm.add('(max-width: 767px)', () => build(true));
  });
}

if (html.classList.contains('motion')) {
  // Build after the hero handoff (motion.ts fires pbp:handoff), so the first paint is not slowed down.
  let done = false;
  const go = () => { if (done) return; done = true; init(); ScrollTrigger.refresh(); };
  window.addEventListener('pbp:handoff', () => setTimeout(go, 50), { once: true });
  window.addEventListener('load', () => setTimeout(go, 1200), { once: true });
}

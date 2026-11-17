// Scroll-controlled moments for builder 3's pages (town pages, service areas, about, our work). Nick, 17 Nov: water runs
// along a pipe as you scroll and reaches numbered stops in order; each stop lights up, grows to 1.08 and turns a little.
// Markup API (kept local so motion.ts stays untouched):
//   [data-b3-scrub]            the container whose pass through the viewport drives the progress (0 -> 1)
//     data-b3-start / -end     optional ScrollTrigger start / end (default 'top 85%' / 'bottom 55%')
//   [data-b3-path]             an SVG path with pathLength="1": drawn by stroke-dashoffset 1 -> 0
//     data-b3-from / -to       optional window of the progress (0-1) in which it draws, for paths in sequence
//   [data-b3-fill="x|y"]       an element filled by scaleX / scaleY 0 -> 1 (transform-origin set in CSS)
//   [data-b3-tw='{"rotate":8}'] an element tweened FROM these transform/opacity vars TO its CSS state over the pass
//     data-b3-tw-at="0,0.8"    optional window of the progress
//   [data-b3-stop="0.4"]       gets .is-on once the progress passes its value (CSS: scale 1.08, small turn, lit colour)
// Only transform / opacity / stroke-dashoffset change. Reduced motion or no motion: the static Figma state (paths drawn, fills full, no stop highlighted).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const html = document.documentElement;
const boxes = Array.from(document.querySelectorAll<HTMLElement>('[data-b3-scrub]'));

function finalState(box: HTMLElement) {
  box.querySelectorAll<SVGPathElement>('[data-b3-path]').forEach((p) => { p.style.strokeDashoffset = '0'; });
  box.querySelectorAll<HTMLElement>('[data-b3-fill]').forEach((f) => { f.style.transform = 'none'; });
}

function init() {
  if (!html.classList.contains('motion')) { boxes.forEach(finalState); return; }
  gsap.registerPlugin(ScrollTrigger);
  boxes.forEach((box) => {
    const paths = Array.from(box.querySelectorAll<SVGPathElement>('[data-b3-path]'));
    const fills = Array.from(box.querySelectorAll<HTMLElement>('[data-b3-fill]'));
    const tws = Array.from(box.querySelectorAll<HTMLElement>('[data-b3-tw]'));
    const stops = Array.from(box.querySelectorAll<HTMLElement>('[data-b3-stop]')).map((el) => ({ el, at: parseFloat(el.dataset.b3Stop || '1') }));
    const tl = gsap.timeline({ defaults: { ease: 'none' } });
    // optional data-b3-from / data-b3-to (0-1): the part of the progress in which this path draws (paths in sequence)
    paths.forEach((p) => {
      const a = parseFloat(p.dataset.b3From || '0'), b = parseFloat(p.dataset.b3To || '1');
      tl.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: Math.max(0.01, b - a) }, a);
    });
    fills.forEach((f) => tl.fromTo(f, f.dataset.b3Fill === 'y' ? { scaleY: 0 } : { scaleX: 0 }, f.dataset.b3Fill === 'y' ? { scaleY: 1, duration: 1 } : { scaleX: 1, duration: 1 }, 0));
    tws.forEach((el) => {
      const [a, b] = (el.dataset.b3TwAt || '0,1').split(',').map(Number);
      tl.from(el, { ...JSON.parse(el.dataset.b3Tw || '{}'), duration: Math.max(0.01, b - a) }, a);
    });
    if (tl.duration() < 1) tl.to({}, { duration: 1 - tl.duration() }, tl.duration()); // progress 0-1 = the whole pass
    // stops follow the smoothed (scrubbed) timeline, so a number lights exactly when the water reaches it
    const set = () => { const p = tl.progress(); stops.forEach((s) => s.el.classList.toggle('is-on', p >= s.at - 0.001)); };
    tl.eventCallback('onUpdate', set);
    ScrollTrigger.create({ trigger: box, start: box.dataset.b3Start || 'top 85%', end: box.dataset.b3End || 'bottom 55%', animation: tl, scrub: 0.6 });
  });
}

if (boxes.length) {
  if (document.readyState === 'complete') init(); else window.addEventListener('load', init, { once: true });
}

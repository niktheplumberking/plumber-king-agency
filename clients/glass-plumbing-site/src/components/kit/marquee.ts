// Marquee: the ONE engine for bands of repeating words (kit/README.md; fix round 1 B8). Markup:
//   <div data-marquee [data-speed="px/s"] [data-dir="-1|1"]>  the clipping band (display: flex)
//     <div data-marquee-track> one copy </div><div data-marquee-track aria-hidden="true"> the same copy </div>
//   </div>
// Behaviour: ~40 s per loop at rest (data-speed overrides), seamless with two copies at any width (if a copy is narrower
// than the band, the engine repeats its children inside both copies until it is wider, so there is never a gap from 360 to
// 1920 px), scroll velocity boosts the speed and it eases back over ~1.2 s, it eases to a stop on hover and on focus inside
// (0.4 s) and back on leave, runs only while in view, static under reduced motion (no html.motion: nothing runs).
// One writer: the engine owns the tracks' `transform` (translate3d x); nothing else may animate them.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const LOOP_S = 40;

function fill(band: HTMLElement, tracks: HTMLElement[]) {
  const unit = Array.from(tracks[0].children).map((c) => c.cloneNode(true) as HTMLElement);
  let guard = 0;
  while (tracks[0].offsetWidth < band.offsetWidth + 2 && unit.length && guard++ < 12) {
    tracks.forEach((t) => unit.forEach((u) => t.appendChild(u.cloneNode(true))));
  }
}

export function marquee(band: HTMLElement) {
  const tracks = Array.from(band.querySelectorAll<HTMLElement>(':scope > [data-marquee-track]'));
  if (tracks.length < 2 || !document.documentElement.classList.contains('motion')) return () => {};
  fill(band, tracks);
  const dir = band.dataset.dir === '1' ? 1 : -1;
  let period = tracks[0].offsetWidth; let x = 0; let boost = 0; let on = false; let run = 1; let target = 1;
  const speed = () => parseFloat(band.dataset.speed || '') || period / LOOP_S;
  const ro = new ResizeObserver(() => { fill(band, tracks); period = tracks[0].offsetWidth; });
  ro.observe(band); ro.observe(tracks[0]);
  const hold = (v: boolean) => () => { target = v ? 0 : 1; };
  band.addEventListener('pointerenter', hold(true)); band.addEventListener('pointerleave', hold(false));
  band.addEventListener('focusin', hold(true)); band.addEventListener('focusout', hold(false));
  const st = ScrollTrigger.create({ trigger: band, start: 'top bottom', end: 'bottom top', onToggle: (s) => { on = s.isActive; },
    onUpdate: (s) => { boost = Math.max(boost, Math.min(3, Math.abs(s.getVelocity()) / 500)); } });
  const tick = (_: number, dt: number) => {
    if (!on || !period) return;
    boost *= Math.pow(0.02, dt / 1200);            // eases back to rest over ~1.2 s
    run += (target - run) * (1 - Math.pow(0.001, dt / 400)); // eases to a stop / back in ~0.4 s
    x += (dir * speed() * run * (1 + boost) * dt) / 1000;
    if (x <= -period) x += period; else if (x > 0) x -= period;
    const v = `translate3d(${x.toFixed(2)}px,0,0)`;
    tracks.forEach((t) => { t.style.transform = v; });
  };
  gsap.ticker.add(tick);
  return () => { gsap.ticker.remove(tick); st.kill(); ro.disconnect(); tracks.forEach((t) => { t.style.transform = ''; }); };
}

export function initMarquees(root: ParentNode = document) {
  return Array.from(root.querySelectorAll<HTMLElement>('[data-marquee]')).map(marquee);
}

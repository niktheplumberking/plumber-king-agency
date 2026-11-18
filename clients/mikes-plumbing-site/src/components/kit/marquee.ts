// Marquee: the ONE engine for bands of repeating words (kit/README.md). Fix round 1 B8 (Phase 2) wires every band and tape to
// it; Phase 1 ships the API. Markup:
//   <div data-marquee [data-speed="px/s"] [data-dir="-1|1"]>  the clipping band
//     <div data-marquee-track> one copy </div><div data-marquee-track aria-hidden="true"> the same copy </div>
//   </div>
// Behaviour: ~40 s per loop at rest (data-speed overrides; default = copy width / 40 s), seamless with two copies at any
// width (each copy must be at least as wide as the band: repeat the words inside a copy), scroll velocity boosts the speed
// and it eases back over ~1.2 s, pauses on hover and on focus inside, runs only while in view, static under reduced motion.
// One writer: the engine owns the tracks' `transform` (translate3d x); nothing else may animate them.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function marquee(band: HTMLElement) {
  const tracks = Array.from(band.querySelectorAll<HTMLElement>('[data-marquee-track]'));
  if (tracks.length < 2 || !document.documentElement.classList.contains('motion')) return () => {};
  const dir = band.dataset.dir === '1' ? 1 : -1;
  let period = tracks[0].offsetWidth; let x = 0; let boost = 0; let on = false; let paused = false;
  const speed = () => parseFloat(band.dataset.speed || '') || period / 40;
  const ro = new ResizeObserver(() => { period = tracks[0].offsetWidth; });
  ro.observe(tracks[0]);
  const pause = (v: boolean) => () => { paused = v; };
  band.addEventListener('pointerenter', pause(true)); band.addEventListener('pointerleave', pause(false));
  band.addEventListener('focusin', pause(true)); band.addEventListener('focusout', pause(false));
  const st = ScrollTrigger.create({ trigger: band, start: 'top bottom', end: 'bottom top', onToggle: (s) => { on = s.isActive; }, onUpdate: (s) => { boost = Math.max(boost, Math.min(4, Math.abs(s.getVelocity()) / 400)); } });
  const tick = (_: number, dt: number) => {
    if (!on || !period) return;
    boost *= Math.pow(0.05, dt / 1200); // eases back to rest over ~1.2 s
    if (paused) return;
    x += (dir * speed() * (1 + boost) * dt) / 1000;
    if (x <= -period) x += period; else if (x > 0) x -= period;
    tracks.forEach((t) => { t.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`; });
  };
  gsap.ticker.add(tick);
  return () => { gsap.ticker.remove(tick); st.kill(); ro.disconnect(); tracks.forEach((t) => { t.style.transform = ''; }); };
}

export function initMarquees(root: ParentNode = document) {
  return Array.from(root.querySelectorAll<HTMLElement>('[data-marquee]')).map(marquee);
}

// RouteMap: dashed driving routes out of Riverside, drawn with the scroll (fix round 1 B13 Home map, B33 town maps).
// One timeline per VISIBLE map svg (desktop and phone each get their own through gsap.matchMedia; a hidden svg builds
// nothing). Sequence on one scrubbed timeline (0 -> 1):
//   the Riverside base pulses -> route 1 draws from Riverside to its town -> its town dot pops and its tag slides out ->
//   route 2 ... (routes in the order of their data-rm-route index: by distance).
// The map unfolds from the Riverside pin first (a time-based entrance, a circle clip opening from the pin, 0.7 s
// power2.inOut, once, from the moment its top enters the screen); the routes are held at the end of the pulse until it is
// 60 % open, so route 1 always draws inside the opened map.
//
// Markup (RouteMap.astro holds the CSS start states, which equal frame 0 here):
//   [data-routemap]                      the trigger box. data-start (center 75%), data-end (center 35%: the routes draw while the map's centre crosses 75% -> 35% of the viewport), data-lag (0.8 s)
//     [data-rm-unfold]                   optional: the element that unfolds (CSS vars --rm-ox / --rm-oy = the pin, in %)
//     svg[data-rm-svg]                   one per layout (desktop / phone); only visible ones build
//       [data-rm-route="i"]              a pathLength=1 path (the route itself, or the mask path that reveals a dashed one)
//     [data-rm-dot="i"]                  the town dot: scale 0 -> 1 (back.out). Inside an svg it belongs to that svg only.
//     [data-rm-tag="i"]                  the town tag: slides from translate -14 px (data-rm-from="14" = from the right)
//     [data-rm-base]                     the Riverside dot: pulses 1 -> 1.5 -> 1; [data-rm-ripple]: a ring 1 -> 3.6, fades
// Writers (one per property): stroke-dashoffset = drawTo (kit/scrub.ts); dots/base/ripple `scale` + `opacity`, tags
// `translate` + `opacity`, the unfold `clip-path`: this module, through inline styles (no GSAP CSS rounding).
// Without html.motion nothing runs: routes, dots and tags show complete.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { drawTo } from './scrub';
import { settled, requestRefresh } from './settle';

gsap.registerPlugin(ScrollTrigger);
const html = document.documentElement;
const PULSE = 0.08;
const UNFOLD = 0.7; // s: the map opens from the pin as soon as its top enters the screen
const vis = (el: Element) => el.getClientRects().length > 0;
const num = (v: string | undefined, d: number) => { const n = parseFloat(v ?? ''); return Number.isFinite(n) ? n : d; };

type Rec = { st: ScrollTrigger; tl: gsap.core.Timeline };
/** Samples for QA: window.__rm = [{ svg, tl, st }] */
const debug: { svg: Element; tl: gsap.core.Timeline; st: ScrollTrigger }[] = ((window as any).__rm = []);

function unfold(map: HTMLElement, done: () => void) {
  const el = map.matches('[data-rm-unfold]') ? map : map.querySelector<HTMLElement>('[data-rm-unfold]');
  if (!el) { done(); return; }
  if (el.dataset.rmOpen) { done(); return; }
  const set = (r: number) => { el.style.clipPath = r >= 150 ? 'none' : `circle(${r}% at var(--rm-ox, 50%) var(--rm-oy, 50%))`; };
  const open = () => {
    if (el.dataset.rmOpen) return; el.dataset.rmOpen = '1';
    const o = { r: 0 };
    gsap.to(o, { r: 150, duration: UNFOLD, ease: 'power2.inOut', onUpdate: () => set(o.r), onComplete: () => set(150) });
    // The hold lets go on a timer, never on a scroll event (round 2 re-look): at 60 % of the unfold the circle is already
    // ~100 % wide round the pin, past the nearest towns, so route 1 (the shortest) draws inside the opened map.
    gsap.delayedCall(UNFOLD * 0.6, done);
  };
  if (el.getBoundingClientRect().bottom < 0) { el.dataset.rmOpen = '1'; set(150); done(); return; }
  ScrollTrigger.create({ trigger: map, start: 'top bottom', once: true, onEnter: open });
  ScrollTrigger.addEventListener('scrollEnd', function c() { const r = map.getBoundingClientRect(); if (r.top < innerHeight * 0.95 && r.bottom > 0) { ScrollTrigger.removeEventListener('scrollEnd', c); open(); } });
}

function build(map: HTMLElement, svg: SVGSVGElement): Rec {
  const mine = <T extends Element>(sel: string) => Array.from(map.querySelectorAll<T>(sel)).filter((e) => { const s = e.closest('[data-rm-svg]'); return s === svg || (!s && vis(e)); });
  const routes = Array.from(svg.querySelectorAll<SVGGeometryElement>('[data-rm-route]')).sort((a, b) => num(a.dataset.rmRoute, 0) - num(b.dataset.rmRoute, 0));
  const dots = mine<HTMLElement>('[data-rm-dot]');
  const tags = mine<HTMLElement>('[data-rm-tag]');
  const base = mine<HTMLElement>('[data-rm-base]');
  const ripple = mine<HTMLElement>('[data-rm-ripple]');
  const n = routes.length; const slot = (1 - PULSE) / Math.max(1, n);
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });

  // the Riverside pulse
  const pb = { s: 1 }; const pr = { s: 1, o: 0 };
  const wb = () => base.forEach((b) => { b.style.scale = String(pb.s); });
  const wr = () => ripple.forEach((r) => { r.style.scale = String(pr.s); r.style.opacity = String(pr.o); });
  tl.to(pb, { s: 1.5, duration: PULSE * 0.45, ease: 'sine.inOut', onUpdate: wb }, 0)
    .to(pb, { s: 1, duration: PULSE * 0.55, ease: 'sine.inOut', onUpdate: wb }, PULSE * 0.45)
    .fromTo(pr, { s: 1, o: 0.7 }, { s: 3.6, o: 0, duration: PULSE, ease: 'sine.out', onUpdate: wr, immediateRender: false }, 0);

  routes.forEach((p, k) => {
    const i = p.dataset.rmRoute!;
    const t0 = PULSE + k * slot; const draw = slot * 0.7;
    const o = { v: 0 }; drawTo(p, 0);
    tl.to(o, { v: 1, duration: draw, ease: 'sine.inOut', onUpdate: () => drawTo(p, o.v) }, t0);
    dots.filter((d) => d.dataset.rmDot === i).forEach((d) => {
      const q = { s: 0 }; const w = () => { d.style.scale = String(q.s); d.style.opacity = String(Math.min(1, q.s * 2)); };
      tl.to(q, { s: 1, duration: slot * 0.16, ease: 'back.out(2)', onUpdate: w }, t0 + draw - slot * 0.02);
    });
    tags.filter((g) => g.dataset.rmTag === i).forEach((g) => {
      const from = num(g.dataset.rmFrom, -14); const q = { x: from, o: 0 };
      const w = () => { g.style.translate = `${q.x.toFixed(2)}px 0`; g.style.opacity = q.o.toFixed(3); };
      tl.to(q, { x: 0, o: 1, duration: slot * 0.26, ease: 'power2.inOut', onUpdate: w }, t0 + draw + slot * 0.02);
    });
  });
  tl.to({}, { duration: 0.001 }, 1);

  // Scrub by hand, so the routes can wait for the unfold: target = scroll progress, capped at the pulse until unfolded.
  // Round 2 re-look: one follower on the ticker instead of a new tween per scroll update. The old release tween was
  // restarted (from rest, sine.inOut) on every wheel tick, so at a slow paused wheel the routes crept 0.06 -> 0.07 while
  // the whole map was on screen. The follower closes ~95 % of the gap in `lag` seconds and never draws faster than one
  // full map per MIN_FULL seconds (no jumps after the hold lets go or after a fast scroll; < 2 % per frame at 60 fps).
  const lag = num(map.dataset.lag, 0.8);
  const MIN_FULL = 0.9;
  let target = 0; let open = false; let cur = 0;
  const goal = () => Math.min(target, open ? 1 : PULSE);
  const follow = (_t: number, dtMs: number) => {
    const g = goal(); const gap = g - cur;
    if (Math.abs(gap) < 0.0005) { if (cur !== g) { cur = g; tl.progress(cur); } return; }
    const dt = Math.min(dtMs, 100) / 1000;
    const step = gap * (1 - Math.exp(-dt * 3 / lag));
    const cap = dt / MIN_FULL;
    cur += Math.max(-cap, Math.min(cap, step));
    tl.progress(cur);
  };
  const st = ScrollTrigger.create({
    trigger: map, start: map.dataset.start || 'center 75%', end: map.dataset.end || 'center 35%',
    onUpdate: (self) => { target = self.progress; },
  });
  target = st.progress;
  // the unfold (UNFOLD s) starts as the map's top enters, ahead of this window; the hold lets go on its own timer when it completes
  unfold(map, () => { open = true; });
  cur = goal(); tl.progress(cur);
  gsap.ticker.add(follow);
  (tl as any).__rmFollow = follow;
  debug.push({ svg, tl, st });
  return { st, tl };
}

function clear(map: HTMLElement, recs: Rec[]) {
  recs.forEach(({ st, tl }) => { gsap.ticker.remove((tl as any).__rmFollow); st.kill(); tl.kill(); });
  map.querySelectorAll<HTMLElement>('[data-rm-dot], [data-rm-tag], [data-rm-base], [data-rm-ripple]').forEach((e) => { e.style.scale = ''; e.style.opacity = ''; e.style.translate = ''; });
  map.querySelectorAll<SVGElement>('[data-rm-route]').forEach((p) => { p.style.strokeDashoffset = ''; });
  debug.length = 0;
}

let started = false;
export function initRouteMaps() {
  if (started || !html.classList.contains('motion')) return;
  started = true;
  const maps = Array.from(document.querySelectorAll<HTMLElement>('[data-routemap]'));
  if (!maps.length) return;
  const mm = gsap.matchMedia();
  mm.add({ phone: '(max-width: 767px)', wide: '(min-width: 768px)' }, () => {
    const recs = maps.map((m) => ({ m, r: Array.from(m.querySelectorAll<SVGSVGElement>('svg[data-rm-svg]')).filter(vis).map((s) => build(m, s)) }));
    requestRefresh();
    return () => recs.forEach(({ m, r }) => clear(m, r));
  });
  settled().then(() => requestRefresh(0));
}

/* Tag fit (round 2 re-look, with or without motion): a tag marked [data-rm-fit] that would cross its map frame (6 px
   inset) is nudged back inside through --fit (the component adds it to the tag's left offset). Measured without the tag's
   own entrance `translate`; re-run on resize and when fonts swap in. */
const FIT_PAD = 6;
function fitTags() {
  const jobs: [HTMLElement, number][] = [];
  document.querySelectorAll<HTMLElement>('[data-routemap]').forEach((m) => {
    if (!m.getClientRects().length) return;
    const fr = m.getBoundingClientRect();
    m.querySelectorAll<HTMLElement>('[data-rm-fit]').forEach((t) => {
      if (!t.getClientRects().length) return;
      const cur = parseFloat(t.style.getPropertyValue('--fit')) || 0;
      const tx = parseFloat(getComputedStyle(t).translate) || 0;
      const q = t.getBoundingClientRect(); const l = q.left - tx - cur, r = q.right - tx - cur;
      let f = 0;
      if (r > fr.right - FIT_PAD) f = fr.right - FIT_PAD - r;
      if (l + f < fr.left + FIT_PAD) f = fr.left + FIT_PAD - l;
      jobs.push([t, Math.round(f)]);
    });
  });
  jobs.forEach(([t, f]) => { if (f) t.style.setProperty('--fit', `${f}px`); else t.style.removeProperty('--fit'); });
}
if (document.querySelector('[data-rm-fit]')) {
  let raf = 0; const again = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fitTags); };
  again();
  document.fonts?.addEventListener?.('loadingdone', again);
  document.fonts?.ready.then(again);
  window.addEventListener('load', again, { once: true });
  if ('ResizeObserver' in window) { const ro = new ResizeObserver(again); document.querySelectorAll('[data-routemap]').forEach((m) => ro.observe(m)); }
}

if (html.classList.contains('motion')) {
  window.addEventListener('pbp:handoff', () => requestAnimationFrame(initRouteMaps), { once: true });
  window.setTimeout(initRouteMaps, 4500);
}

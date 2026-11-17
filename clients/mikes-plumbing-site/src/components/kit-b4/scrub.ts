// Scroll-scrubbed "water in the pipe" moments for builder 4's pages (Nick, 17 Nov: 1-2 per page, Paul's feel).
// Markup API (no other code needed on a page):
//   [data-scrub]                       the moment (trigger = [data-scrub-track] inside it, else itself)
//     data-start / data-end            ScrollTrigger start/end (defaults 'top 78%' / 'bottom 50%'), data-start-m/-end-m on phones
//     [data-scrub-fill]                the water: scales 0 -> 1 along data-axis="x|y" (data-axis-m on phones), CSS sets its origin
//     [data-stop]                      a numbered stop: when the water reaches it, it grows to 1.08 and turns a little
//                                      (data-rot, default +-3 deg), then settles back; data-at = 0..1 overrides the measured position
//       data-scale = peak scale (default 1.08); data-at-el = selector: fire when that element reaches the trigger line
//     [data-scrub-y="px"]               drifts down by that many px over the scrub (drips; rest state = the frame)
//       [data-lit]                     inside a stop: a highlight layer that flashes on as the water reaches the stop and
//                                      fades as it settles (CSS keeps it at opacity 0, so the end state = the Figma frame)
// Only transform and opacity are animated; Lenis drives ScrollTrigger (motion.ts), so this rides the same smooth scroll.
// Without motion (no JS, reduced motion) nothing here runs and the CSS shows the final state: full pipe, stops at rest.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const html = document.documentElement;
const vis = (el: Element) => el.getClientRects().length > 0;

function build(root: HTMLElement, phone: boolean) {
  const track = root.querySelector<HTMLElement>('[data-scrub-track]') ?? root;
  const fills = Array.from(root.querySelectorAll<HTMLElement>('[data-scrub-fill]')).filter(vis);
  const stops = Array.from(root.querySelectorAll<HTMLElement>('[data-stop]')).filter(vis);
  const drift = Array.from(root.querySelectorAll<HTMLElement>('[data-scrub-y]')).filter(vis);
  const axisOf = (f: HTMLElement) => ((phone && f.dataset.axisM) || f.dataset.axis || 'x') as 'x' | 'y';
  const start = (phone && root.dataset.startM) || root.dataset.start || 'top 78%';
  const end = (phone && root.dataset.endM) || root.dataset.end || 'bottom 50%';
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: track, start, end, scrub: 0.6 } });
  const isPath = (f: Element): f is SVGPathElement => f instanceof SVGPathElement;
  // Where along the water each stop sits (0..1), measured once per breakpoint: the nearest point on a path fill
  // (sampled in screen space), else the position inside the first fill's box.
  const f0 = fills[0];
  const r0 = f0?.getBoundingClientRect();
  const ax0 = f0 && !isPath(f0) ? axisOf(f0) : 'x';
  const along = (cx: number, cy: number) => {
    const p = f0 as SVGPathElement; const m = p.getScreenCTM(); if (!m) return NaN;
    const L = p.getTotalLength(); let best = Infinity, at = 0;
    for (let k = 0; k <= 240; k++) {
      const q = p.getPointAtLength((L * k) / 240).matrixTransform(m);
      const d = (q.x - cx) ** 2 + (q.y - cy) ** 2; if (d < best) { best = d; at = k / 240; }
    }
    return at;
  };
  // data-at-el: the stop fires when that element reaches the trigger line (start/end must use the same viewport line,
  // e.g. 'top 45%' / 'bottom 45%'); the water then moves piecewise so it meets each stop exactly when it fires.
  const tr = track.getBoundingClientRect();
  const marks: { s: HTMLElement; geo: number; at: number }[] = stops.map((s, i) => {
    let geo = NaN;
    const r = s.getBoundingClientRect();
    if (f0 && isPath(f0)) geo = along(r.left + r.width / 2, r.top + r.height / 2);
    else if (r0) geo = ax0 === 'x' ? (r.left + r.width / 2 - r0.left) / r0.width : (r.top + r.height / 2 - r0.top) / r0.height;
    if (Number.isNaN(geo)) geo = (i + 1) / (stops.length + 1);
    let at = parseFloat((phone && s.dataset.atM) || s.dataset.at || 'NaN');
    const el = s.dataset.atEl ? document.querySelector(s.dataset.atEl) : null;
    if (el) at = (el.getBoundingClientRect().top - tr.top) / tr.height;
    if (Number.isNaN(at)) at = geo;
    return { s, geo: Math.min(1, Math.max(0, geo)), at: Math.min(0.97, Math.max(0.02, at)) };
  });
  const piecewise = stops.some((s) => s.dataset.atEl);
  fills.forEach((f) => {
    if (isPath(f)) { tl.fromTo(f, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0); return; }
    const ax = axisOf(f); const k = ax === 'x' ? 'scaleX' : 'scaleY';
    const svg = f instanceof SVGElement ? { transformOrigin: ax === 'x' ? '0% 50%' : '50% 0%' } : {};
    if (!piecewise) { tl.fromTo(f, { [k]: 0, ...svg }, { [k]: 1, duration: 1 }, 0); return; }
    gsap.set(f, { [k]: 0, ...svg });
    const pts = [{ at: 0, geo: 0 }, ...marks.slice().sort((a, b) => a.at - b.at), { at: 1, geo: 1 }];
    for (let j = 1; j < pts.length; j++) tl.to(f, { [k]: pts[j].geo, duration: Math.max(0.001, pts[j].at - pts[j - 1].at) }, pts[j - 1].at);
  });
  drift.forEach((d) => tl.fromTo(d, { y: 0 }, { y: parseFloat(d.dataset.scrubY || '0'), duration: 1 }, 0));
  marks.forEach(({ s, at }, i) => {
    const rot = parseFloat(s.dataset.rot ?? (i % 2 ? '-3' : '3'));
    const sc = parseFloat(s.dataset.scale ?? '1.08');
    const t0 = Math.max(0, at - 0.03);
    const org = s instanceof SVGElement ? { transformOrigin: '50% 50%' } : {};
    tl.fromTo(s, { scale: 1, rotate: 0, ...org }, { scale: sc, rotate: rot, duration: 0.07, ease: 'power2.out', immediateRender: false }, t0)
      .to(s, { scale: 1, rotate: 0, duration: 0.12, ease: 'power2.inOut' }, t0 + 0.09);
    const lit = s.querySelector<HTMLElement>('[data-lit]');
    if (lit) tl.fromTo(lit, { opacity: 0 }, { opacity: 1, duration: 0.05, immediateRender: true }, t0).to(lit, { opacity: 0, duration: 0.14 }, t0 + 0.1);
  });
  tl.to({}, { duration: 0.001 }, 1); // the timeline always spans 0..1, so positions are fractions of the scrub
  return () => { tl.scrollTrigger?.kill(); tl.kill(); gsap.set([...fills, ...stops, ...drift], { clearProps: 'transform' }); };
}

function init() {
  if (!html.classList.contains('motion')) return;
  const roots = Array.from(document.querySelectorAll<HTMLElement>('[data-scrub]'));
  if (!roots.length) return;
  const mm = gsap.matchMedia();
  mm.add({ phone: '(max-width: 767px)', wide: '(min-width: 768px)' }, (ctx) => {
    const phone = !!ctx.conditions?.phone;
    const undo = roots.map((r) => build(r, phone));
    return () => undo.forEach((u) => u());
  });
  // Fonts and late layout move the stops: re-measure triggers once fonts are in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();

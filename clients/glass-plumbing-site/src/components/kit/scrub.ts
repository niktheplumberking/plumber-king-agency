// Scrub: the ONE engine for scroll-scrubbed moments (water in a pipe, a route drawing, a needle sweeping, stops lighting up).
// Progress follows the scroll (ScrollTrigger scrub on the Lenis scroll that motion.ts drives), never a clock. Markup API
// (kit/README.md has the full table):
//   [data-scrub]                  a moment. Its pass through the viewport drives progress 0 -> 1.
//     data-start / data-end       ScrollTrigger start / end (default 'top 80%' / 'bottom 50%'); data-start-m / data-end-m on
//                                 phones (< 768 px). data-lag = scrub smoothing in s (default 0.6).
//     data-stop-mode="pop"        stops swell (scrubbed) instead of toggling .is-on (see [data-stop]).
//     [data-scrub-track]          optional: the element whose box is the trigger (else the [data-scrub] itself)
//     [data-scrub-path]           an SVG path with pathLength="1": drawn 0 -> 100 %. data-win="0.2,0.6" = the part of the
//                                 progress in which it draws (default the whole pass)
//     [data-scrub-fill]           an element scaled 0 -> 1 along data-axis="x|y" (data-axis-m on phones; CSS sets the origin).
//                                 data-rev = 1 -> 0 (a shade that drains away). data-win as above.
//     [data-scrub-turn="a,b"]     rotation a -> b degrees (data-origin="x y" = SVG origin). data-win as above.
//     [data-scrub-tw='{json}']    tweened FROM these vars TO its CSS state. data-win as above.
//     [data-scrub-ft='{"from":{..},"to":{..}}']  tweened from `from` to `to` (both explicit, so the CSS can hold the start
//                                 state under html.motion while the static CSS holds the end state; R4). data-win as above.
//     [data-scrub-y="px"]         drifts down by px over the pass
//     [data-stop]                 a numbered stop at data-at (0-1; data-at-m on phones; else measured along the first path
//                                 or fill; data-at-el="#id" = when that element reaches the trigger line). Class mode: gets
//                                 .is-on while the progress is past it. Pop mode: swells to data-scale (1.08) and turns
//                                 data-rot (+-3 deg), then settles; a [data-lit] layer inside flashes.
// Rules (MOTION.md, fix round 1 A-2): the CSS start state equals the JS start state (kit/scrub.css: under html.motion
// paths start empty, fills at 0, turns at their first angle), so nothing flashes before the build. Paths are written as a
// unitless strokeDashoffset through one proxy (GSAP's CSS rounding snapped 1 -> 0 on pathLength=1 paths). Layout is read
// only when a timeline is built or re-measured, never during the scroll. One refresh, once fonts, images and the zoom have
// settled (kit/settle.ts). Without html.motion nothing runs and the markup's final state shows.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { settled, requestRefresh } from './settle';

gsap.registerPlugin(ScrollTrigger);
const html = document.documentElement;
const vis = (el: Element) => el.getClientRects().length > 0;
const num = (v: string | undefined, d: number) => { const n = parseFloat(v ?? ''); return Number.isFinite(n) ? n : d; };
const win = (el: HTMLElement | SVGElement) => { const [a, b] = ((el as HTMLElement).dataset.win || '0,1').split(',').map(Number); return { a, d: Math.max(0.001, b - a) }; };
const all = <T extends Element>(root: Element, sel: string) => Array.from(root.querySelectorAll<T>(sel));

/** Draw a pathLength=1 path to `p` (0-1). The one writer of its stroke-dashoffset. */
export function drawTo(path: SVGGeometryElement, p: number) { path.style.strokeDashoffset = String(1 - Math.min(1, Math.max(0, p))); }

/** Distance (0-1) along a path closest to a screen point. Build-time only (layout read). */
function along(path: SVGGeometryElement, cx: number, cy: number) {
  const m = path.getScreenCTM(); if (!m) return NaN;
  // Coarse to fine (round 2, TBT): 48 samples, then 24 around the best one (72 geometry calls instead of 240, finer result).
  const L = path.getTotalLength(); let best = Infinity, at = 0;
  const test = (t: number) => { const q = path.getPointAtLength(L * t).matrixTransform(m); const d = (q.x - cx) ** 2 + (q.y - cy) ** 2; if (d < best) { best = d; at = t; } };
  for (let k = 0; k <= 48; k++) test(k / 48);
  const c = at; for (let k = -12; k <= 12; k++) if (k) test(Math.min(1, Math.max(0, c + k / (48 * 12))));
  return at;
}

function build(root: HTMLElement, phone: boolean) {
  const track = root.querySelector<HTMLElement>('[data-scrub-track]') ?? root;
  const own = (el: Element) => el.closest('[data-scrub]') === root; // nested moments run on their own
  const paths = all<SVGGeometryElement>(root, '[data-scrub-path]').filter(own);
  const fills = all<HTMLElement>(root, '[data-scrub-fill]').filter((f) => own(f) && vis(f));
  const turns = all<HTMLElement>(root, '[data-scrub-turn]').filter(own);
  const tws = all<HTMLElement>(root, '[data-scrub-tw]').filter(own);
  const fts = all<HTMLElement>(root, '[data-scrub-ft]').filter(own);
  const drift = all<HTMLElement>(root, '[data-scrub-y]').filter((d) => own(d) && vis(d));
  const stops = all<HTMLElement>(root, '[data-stop]').filter((s) => own(s) && vis(s));
  const pop = root.dataset.stopMode === 'pop';
  const axisOf = (f: HTMLElement) => ((phone && f.dataset.axisM) || f.dataset.axis || 'x') as 'x' | 'y';
  const start = (phone && root.dataset.startM) || root.dataset.start || 'top 80%';
  const end = (phone && root.dataset.endM) || root.dataset.end || 'bottom 50%';
  const tl = gsap.timeline({ defaults: { ease: 'none' }, paused: true });

  // Where each stop sits (0-1), measured once per build: data-at, else along the first visible path / fill.
  const p0 = paths.find(vis); const f0 = fills[0];
  const r0 = f0?.getBoundingClientRect(); const ax0 = f0 ? axisOf(f0) : 'x';
  const tr = track.getBoundingClientRect();
  const given = (s: HTMLElement) => !Number.isNaN(num((phone && s.dataset.atM) || s.dataset.at, NaN)) && !s.dataset.atEl;
  const needGeo = stops.some((s) => s.dataset.atEl); // geo only feeds the piecewise water; a stop with its own data-at skips the search
  const marks = stops.map((s, i) => {
    const r = s.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    let geo = !needGeo && given(s) ? 0 : p0 ? along(p0, cx, cy) : r0 && r0.width ? (ax0 === 'x' ? (cx - r0.left) / r0.width : (cy - r0.top) / r0.height) : NaN;
    if (Number.isNaN(geo)) geo = (i + 1) / (stops.length + 1);
    let at = num((phone && s.dataset.atM) || s.dataset.at, NaN);
    const el = s.dataset.atEl ? document.querySelector(s.dataset.atEl) : null;
    if (el && tr.height) at = (el.getBoundingClientRect().top - tr.top) / tr.height;
    if (Number.isNaN(at)) at = geo;
    return { s, geo: Math.min(1, Math.max(0, geo)), at: pop ? Math.min(0.97, Math.max(0.02, at)) : at };
  });
  const piecewise = stops.some((s) => s.dataset.atEl);

  // Paths: one proxy per path, written unitless (no CSS rounding), so every scroll position gives an in-between value.
  paths.forEach((p) => {
    const { a, d } = win(p); const o = { v: 0 };
    drawTo(p, 0);
    tl.to(o, { v: 1, duration: d, onUpdate: () => drawTo(p, o.v) }, a);
  });
  fills.forEach((f) => {
    const ax = axisOf(f); const k = ax === 'x' ? 'scaleX' : 'scaleY';
    const svg = f instanceof SVGElement ? { transformOrigin: ax === 'x' ? '0% 50%' : '50% 0%' } : {};
    const rev = 'rev' in f.dataset; const { a, d } = win(f);
    if (!piecewise || rev) { tl.fromTo(f, { [k]: rev ? 1 : 0, ...svg }, { [k]: rev ? 0 : 1, duration: d }, a); return; }
    // Stops tied to elements (data-at-el): the water moves piecewise so it meets each stop exactly when it fires.
    gsap.set(f, { [k]: 0, ...svg });
    const pts = [{ at: 0, geo: 0 }, ...marks.slice().sort((x, y) => x.at - y.at), { at: 1, geo: 1 }];
    for (let j = 1; j < pts.length; j++) tl.to(f, { [k]: pts[j].geo, duration: Math.max(0.001, pts[j].at - pts[j - 1].at) }, pts[j - 1].at);
  });
  turns.forEach((t) => {
    const [from, to] = (t.dataset.scrubTurn || '0,0').split(',').map(Number); const { a, d } = win(t);
    const org = t.dataset.origin ? { svgOrigin: t.dataset.origin } : {};
    tl.fromTo(t, { rotation: from, ...org }, { rotation: to, ...org, duration: d }, a);
  });
  tws.forEach((el) => { const { a, d } = win(el); tl.from(el, { ...JSON.parse(el.dataset.scrubTw || '{}'), duration: d }, a); });
  fts.forEach((el) => { const { a, d } = win(el); const v = JSON.parse(el.dataset.scrubFt || '{}'); tl.fromTo(el, v.from || {}, { ...(v.to || {}), duration: d }, a); });
  drift.forEach((d) => tl.fromTo(d, { y: 0 }, { y: num(d.dataset.scrubY, 0), duration: 1 }, 0));
  if (pop) marks.forEach(({ s, at }, i) => {
    const rot = num(s.dataset.rot, i % 2 ? -3 : 3); const sc = num(s.dataset.scale, 1.08);
    const t0 = Math.max(0, at - 0.03);
    const org = s instanceof SVGElement ? { transformOrigin: '50% 50%' } : {};
    tl.fromTo(s, { scale: 1, rotate: 0, ...org }, { scale: sc, rotate: rot, duration: 0.07, ease: 'sine.inOut', immediateRender: false }, t0)
      .to(s, { scale: 1, rotate: 0, duration: 0.12, ease: 'sine.inOut' }, t0 + 0.09);
    const lit = s.querySelector<HTMLElement>('[data-lit]');
    if (lit) tl.fromTo(lit, { opacity: 0 }, { opacity: 1, duration: 0.05, immediateRender: true }, t0).to(lit, { opacity: 0, duration: 0.14 }, t0 + 0.1);
  });
  tl.to({}, { duration: 0.001 }, 1); // the timeline always spans 0..1, so windows and stop positions are fractions of the pass
  // Class-mode stops follow the smoothed timeline, so a stop lights exactly when the water reaches it.
  const lit = marks.map(() => false);
  const sync = () => { if (pop) return; const p = tl.progress(); marks.forEach((m, i) => { const on = p >= m.at - 0.001; if (on !== lit[i]) { lit[i] = on; m.s.classList.toggle('is-on', on); } }); };
  tl.eventCallback('onUpdate', sync);
  root.classList.add('is-scrub');
  const st = ScrollTrigger.create({ trigger: track, start, end, animation: tl, scrub: num(root.dataset.lag, 0.6) });
  sync();
  return () => {
    st.kill(); tl.kill();
    root.classList.remove('is-scrub');
    marks.forEach((m) => m.s.classList.remove('is-on'));
    paths.forEach((p) => { p.style.strokeDashoffset = ''; });
    gsap.set([...fills, ...turns, ...tws, ...fts, ...drift, ...stops], { clearProps: 'transform' });
  };
}

let started = false;
/** Build every [data-scrub] on the page (once). Rebuilt per layout band, since boxes and their parts show or hide there. */
export function initScrub() {
  if (started || !html.classList.contains('motion')) return;
  started = true;
  const roots = Array.from(document.querySelectorAll<HTMLElement>('[data-scrub]'));
  if (!roots.length) return;
  const mm = gsap.matchMedia();
  mm.add({ phone: '(max-width: 767px)', tab: '(min-width: 768px) and (max-width: 1023px)', lap: '(min-width: 1024px) and (max-width: 1279px)', wide: '(min-width: 1280px)' }, (ctx) => {
    const phone = !!ctx.conditions?.phone;
    // R3 (TBT): each moment is built lazily, when it comes within ~1.5 viewports (or is already above the viewport, so it
    // shows its scrolled-past state), one per task, instead of all of them in one frame after the handoff.
    const undo: (() => void)[] = [];
    let alive = true;
    const make = (r: HTMLElement) => { if (alive) ctx.add(() => { if (vis(r)) undo.push(build(r, phone)); }); };
    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting && e.boundingClientRect.bottom >= 0) return;
        io!.unobserve(e.target);
        const r = e.target as HTMLElement;
        const run = () => make(r);
        if ('requestIdleCallback' in window) (window as any).requestIdleCallback(run, { timeout: 200 }); else setTimeout(run, 30);
      }), { rootMargin: '0px 0px 150% 0px' });
      roots.forEach((r) => io!.observe(r));
    } else roots.forEach(make);
    return () => { alive = false; io?.disconnect(); undo.forEach((u) => u()); };
  });
  settled().then(() => requestRefresh(0));
}

// Built after the hero handoff (motion.ts fires glass:handoff), so the first paint is not slowed down; 4.5 s safety.
// Turns have no CSS start state (their angles live in the markup), so they take their first angle as soon as this module
// runs, before the handoff, with no timeline yet: the same value the timeline starts from.
if (html.classList.contains('motion')) {
  document.querySelectorAll<HTMLElement>('[data-scrub] [data-scrub-turn]').forEach((t) => {
    const from = Number((t.dataset.scrubTurn || '0').split(',')[0]);
    gsap.set(t, { rotation: from, ...(t.dataset.origin ? { svgOrigin: t.dataset.origin } : {}) });
  });
  window.addEventListener('glass:handoff', () => requestAnimationFrame(initScrub), { once: true });
  window.setTimeout(initScrub, 4500);
}

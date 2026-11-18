// Object entrances (fix round 1, B12): the few entrances that belong to one object and that the generic engine in
// motion.ts (data-t / data-fx) does not have: tags that drop and swing from their pipe, review stubs that tear in, a
// nameplate whose bolts pop, index rows whose rule draws before the text rises. Map of which section uses which entrance:
// MOTION.md "Entrance map".
//
// Rules (MOTION.md B1): the CSS start state under html.motion equals frame 0 of the timeline (each component writes it),
// every move is an ease-in-out (or a gentle out-settle) tween, one writer per property (these entrances own `transform`
// and `opacity` of the elements they are given; component hover uses `translate`, idle uses `rotate` / `scale` on an inner
// child). Built after the hero handoff (pbp:handoff, 4.5 s fallback), like the rest of the motion. An element already above
// the viewport when built is put in its end state; one on screen or below plays once when it reaches `start`. The first Tab
// finishes them all. Without html.motion nothing runs and the CSS shows the final state.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const html = document.documentElement;
export const MOTION = () => html.classList.contains('motion');

type Job = { el: Element; make: () => gsap.core.Timeline; start: string };
const jobs: Job[] = [];
const built: gsap.core.Timeline[] = [];
let ready = false;

function build(j: Job) {
  const tl = j.make();
  built.push(tl);
  const r = j.el.getBoundingClientRect();
  if (r.bottom < 0) { tl.progress(1); return; }
  tl.pause();
  let done = false;
  // The scroll stopped with the object on screen but above the bottom of its trigger line: play it anyway.
  const catchUp = () => { if (done) return; const b = j.el.getBoundingClientRect(); if (b.top < innerHeight * 0.97 && b.bottom > 0 && b.height > 0) go(); };
  const go = () => { if (done) return; done = true; st?.kill(); ScrollTrigger.removeEventListener('scrollEnd', catchUp); tl.play(); };
  let st: ScrollTrigger | undefined;
  st = ScrollTrigger.create({ trigger: j.el, start: j.start, once: true, onEnter: go });
  if (done) st.kill(); else ScrollTrigger.addEventListener('scrollEnd', catchUp);
}

/** Register an object entrance. `make` returns a timeline whose frame 0 equals the component's CSS start state. */
export function enter(el: Element | null, make: () => gsap.core.Timeline, start = 'top 85%') {
  if (!el || !MOTION()) return;
  const j = { el, make, start };
  if (ready) build(j); else jobs.push(j);
}

/** Run `fn` once the hero has handed off (or after 4.5 s), so first paint is never slowed down. */
export function afterHandoff(fn: () => void) {
  let ran = false;
  const run = () => { if (ran) return; ran = true; requestAnimationFrame(fn); };
  window.addEventListener('pbp:handoff', run, { once: true });
  window.setTimeout(run, 4500);
}

if (MOTION()) {
  afterHandoff(() => { ready = true; jobs.splice(0).forEach(build); });
  window.addEventListener('keydown', function tab(e) {
    if (e.key !== 'Tab') return;
    window.removeEventListener('keydown', tab);
    ready = true; jobs.splice(0).forEach(build);
    built.forEach((tl) => tl.progress(1));
  });
}

/* ------------------------------------------------------------------ the object entrances */

/** Tags: drop from the pipe, then swing on their string and settle (~1.2 s). Pivot = the string's top (CSS origin). */
export function swing(tags: HTMLElement[], stagger = 0.12) {
  const tl = gsap.timeline();
  tags.forEach((t, i) => {
    const s = i % 2 ? -1 : 1;
    tl.fromTo(t, { y: -36, autoAlpha: 0, rotation: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power2.inOut' }, i * stagger)
      .to(t, { keyframes: [{ rotation: 7 * s, duration: 0.3 }, { rotation: -4.5 * s, duration: 0.3 }, { rotation: 2 * s, duration: 0.25 }, { rotation: 0, duration: 0.25 }], ease: 'sine.inOut' }, i * stagger + 0.1);
  });
  return tl;
}

/** Review stubs: each slip tears in along its top edge (a clip opens down while it settles from a small tilt). */
export function tearIn(slips: HTMLElement[], stagger = 0.1) {
  const tl = gsap.timeline();
  slips.forEach((s, i) => {
    tl.fromTo(s, { autoAlpha: 0, y: -18, rotation: i % 2 ? 2.5 : -2.5, clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
      { autoAlpha: 1, y: 0, rotation: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.75, ease: 'power2.inOut', clearProps: 'clipPath' }, i * stagger);
  });
  return tl;
}

/** Index rows: the rule draws left to right, then the row's text rises. Rules = [data-rule] (scaleX), text = the rest. */
export function ruleRise(rows: HTMLElement[], stagger = 0.08) {
  const tl = gsap.timeline();
  rows.forEach((r, i) => {
    const rule = r.querySelector<HTMLElement>('[data-rule]');
    const txt = Array.from(r.children).filter((c) => c !== rule) as HTMLElement[];
    if (rule) tl.fromTo(rule, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, i * stagger);
    tl.fromTo(txt, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.inOut' }, i * stagger + 0.25);
  });
  return tl;
}

/** Nameplate: the plate slides in from the side, then its bolts pop (a small turn as they seat). */
export function plate(el: HTMLElement, bolts: Element[], from = -60) {
  return gsap.timeline()
    .fromTo(el, { x: from, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.75, ease: 'power2.inOut' })
    .fromTo(bolts, { scale: 0, rotation: -90, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(1.6)', stagger: 0.08 }, 0.55);
}

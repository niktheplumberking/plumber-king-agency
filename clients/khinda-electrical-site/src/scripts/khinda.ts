// Khinda signature moments (BUILD-BRIEF section 4). kSignatures() is called by motion.ts once the page is handed over;
// kTowns() runs with or without motion (hover tag + the towns' start position).
//   [data-draw] .cd                cables DRAW across the section joins as you scroll (DrawSVG scrub; data-draw="rev" =
//                                  drawn from the path's end, i.e. from the breaker side)
//   [data-flips] [data-flip]       breakers flip ON as their row enters (.is-on, 0.08 s apart)
//   [data-current]                 process: the current runs along the wire (.cur), boxes [data-step] light in turn, the
//                                  bulb [data-bulb] fills at 05 (no glow: the glass fills warm)
//   [data-g5]                      towns printed along the cable: marquee along the path, pauses on hover / focus
//   [data-wordmark] / [data-band]  footer KHINDA rises through the floor line; the status band switches on after it
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll(s)) as T[];
const MOTION = () => document.documentElement.classList.contains('motion');

export function kTowns() {
  $$('[data-g5]').forEach((sec) => {
    const tp = sec.querySelector<SVGTextPathElement>('[data-g5-tp]');
    const path = sec.querySelector<SVGPathElement>('#g5-path');
    const tag = sec.querySelector<HTMLElement>('[data-g5-tag]');
    const tagT = sec.querySelector<HTMLElement>('[data-g5-tagt]');
    if (!tp || !path || !tp.getClientRects().length) return;
    const total = path.getTotalLength();
    // Start: NEWTON where Figma prints it (x 228 at 1440 = 78.2 export units).
    let s0 = 0;
    for (let l = 0; l < total; l += 0.5) { if (path.getPointAtLength(l).x >= 78.2) { s0 = l; break; } }
    const text = tp.parentElement as unknown as SVGTextContentElement;
    const runLen = text.getComputedTextLength() / 2;
    const st = { o: s0 };
    const set = () => tp.setAttribute('startOffset', String(st.o));
    set();
    let tw: gsap.core.Tween | null = null;
    if (MOTION() && runLen > 0) {
      // the print travels along the jacket; after one full run it wraps (two runs are printed, so no gap shows)
      tw = gsap.to(st, { o: s0 - runLen, duration: 70, ease: 'none', repeat: -1, onUpdate: set, paused: true });
      ScrollTrigger.create({ trigger: sec, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? tw!.play() : tw!.pause()) });
    }
    let hot = false;
    const show = (a: SVGAElement) => {
      hot = true; tw?.pause();
      if (!tag || !tagT) return;
      tagT.textContent = a.dataset.town || '';
      const r = a.getBoundingClientRect(), q = sec.getBoundingClientRect();
      const z = parseFloat(document.documentElement.style.zoom) || 1;
      tag.hidden = false;
      tag.style.left = `${(r.left - q.left) / z + 20}px`;
      tag.style.top = `${(r.bottom - q.top) / z + 26}px`;
      $$('a', tp).forEach((x) => x.classList.toggle('is-hot', x === a));
    };
    const hide = () => { hot = false; tw?.play(); if (tag) tag.hidden = true; $$('a', tp).forEach((x) => x.classList.remove('is-hot')); };
    $$<SVGAElement>('a', tp).forEach((a) => {
      a.addEventListener('pointerenter', () => show(a));
      a.addEventListener('focus', () => show(a));
      a.addEventListener('pointerleave', () => hot && hide());
      a.addEventListener('blur', () => hot && hide());
    });
  });
}

export function kSignatures() {
  // cables across the joins
  $$('[data-draw]').forEach((host) => {
    const rev = host.dataset.draw === 'rev';
    const paths = $$<SVGPathElement>('.cd', host);
    if (!paths.length || !host.getClientRects().length) return;
    gsap.fromTo(paths, { drawSVG: rev ? '100% 100%' : '0% 0%' }, {
      drawSVG: '0% 100%', ease: 'none',
      scrollTrigger: { trigger: host.closest('section, footer') || host, start: host.dataset.start || 'top 92%', end: host.dataset.end || 'top 30%', scrub: 0.6 },
    });
  });
  // breakers flip ON as their row enters
  $$('[data-flips]').forEach((g) => {
    const items = $$('[data-flip]', g);
    items.forEach((el) => el.classList.remove('is-on'));
    ScrollTrigger.create({
      trigger: g, start: 'top 85%', once: true,
      onEnter: () => items.forEach((el, i) => gsap.delayedCall(0.15 + i * 0.08, () => el.classList.add('is-on'))),
    });
  });
  // process: current along the wire, boxes light, bulb fills at 05
  $$('[data-current]').forEach((sec) => {
    const wire = $$<SVGPathElement>('.cur', sec);
    const boxes = $$('[data-step]', sec);
    const bulbs = Array.from(sec.querySelectorAll<HTMLElement>('[data-bulb]'));
    const sync = (p: number) => {
      boxes.forEach((b, i) => b.classList.toggle('is-on', p >= (i + 0.7) / (boxes.length + 0.4)));
      bulbs.forEach((b) => b.classList.toggle('is-on', p >= 0.97));
    };
    sync(0);
    const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 65%', end: 'bottom 85%', scrub: 0.8 }, onUpdate: () => sync(tl.progress()) });
    if (wire.length) tl.fromTo(wire, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: 'none', duration: 1 }, 0);
    else tl.to({}, { duration: 1 });
  });
  // footer wordmark rises through the floor line, then the status band switches on
  $$('[data-wordmark]').forEach((w) => {
    const band = document.querySelector<HTMLElement>('[data-band]');
    band?.classList.remove('is-on');
    gsap.fromTo(w, { yPercent: 46 }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: {
        trigger: w.parentElement, start: 'top 98%', end: 'bottom 75%', scrub: 0.6,
        onLeave: () => band?.classList.add('is-on'),
      },
    });
    ScrollTrigger.create({ trigger: band || w, start: 'top 92%', once: true, onEnter: () => gsap.delayedCall(0.6, () => band?.classList.add('is-on')) });
  });
}

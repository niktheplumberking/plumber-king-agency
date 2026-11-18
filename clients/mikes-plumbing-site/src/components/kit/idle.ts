// Idle life (fix round 1 B11, Phase 2 fills the gestures). API only in Phase 1:
//   registerIdle(el, gesture, priority)  gesture = () => gsap timeline of 0.4-0.8 s on `el`; lower priority number = first.
//   startIdle()                          every 5-7 s (random) play ONE gesture on ONE registered element that is in view,
//                                        never the same element twice in a row; paused while scrolling, on hover, on form
//                                        focus, when the tab is hidden and under reduced motion. Never on text.
// One writer: a gesture may only animate properties its element's row in kit/README.md ("one writer per property") gives
// to idle (rotate / scale on the element itself, never transform when an entrance or parallax owns it).
import { gsap } from 'gsap';

type Gesture = { el: HTMLElement; play: () => gsap.core.Animation; priority: number };
const list: Gesture[] = [];
let last: HTMLElement | null = null;
let timer = 0;
let busy = false;

export function registerIdle(el: HTMLElement, play: () => gsap.core.Animation, priority = 5) { list.push({ el, play, priority }); }

const inView = (el: HTMLElement) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 0; };
const blocked = () => document.hidden || !document.documentElement.classList.contains('motion') || busy
  || !!document.querySelector('input:focus, textarea:focus, select:focus') || Math.abs((window as any).__pbpLenis?.velocity ?? 0) > 0.05;

export function startIdle() {
  if (!document.documentElement.classList.contains('motion')) return;
  const next = () => { timer = window.setTimeout(step, 5000 + Math.random() * 2000); };
  const step = () => {
    if (!blocked()) {
      const g = list.filter((x) => x.el !== last && inView(x.el) && !x.el.matches(':hover')).sort((a, b) => a.priority - b.priority)[0];
      if (g) { busy = true; last = g.el; g.play().eventCallback('onComplete', () => { busy = false; }); }
    }
    next();
  };
  clearTimeout(timer); next();
}

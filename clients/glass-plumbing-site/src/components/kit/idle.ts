// Idle life (fix round 1, B11). Every 5-7 s (random) ONE gesture of 0.4-0.8 s plays on ONE object that is at least half in
// view: lowest priority number first, never the same element twice in a row, never text. Paused while scrolling (and
// 0.8 s after), while the pointer is over a clickable or the object, while a form field has focus, while the tab is
// hidden and under reduced motion (html.motion absent).
//   startIdle()                          collects every [data-idle] (see kit/README.md for the gestures and priorities).
//   registerIdle(el, play, priority)     adds a custom gesture: play() returns an Animation (WAAPI) or a gsap animation.
// One writer: the built-in gestures run on WAAPI with composite 'add' on the individual `rotate` / `translate` properties,
// so they add to whatever `transform` (entrance, parallax, scrub) or `rotate` (stamp tilt) the object already has and end
// exactly where they started. `thump` writes `scale` relative to the current computed scale; `drip` also writes opacity.
type Play = () => any; // an Animation (WAAPI) or a gsap animation
type Gesture = { el: Element; play: Play; priority: number };
const list: Gesture[] = [];
let last: Element | null = null;
let timer = 0, busy = false, lastScroll = 0, started = false;

const IO = 'cubic-bezier(.45, 0, .55, 1)';
const PRIO: Record<string, number> = { shake: 1, thump: 2, nut: 3, valve: 4, drip: 5, twitch: 6, sway: 7 };

function anim(el: Element, frames: Keyframe[], ms: number, composite: CompositeOperation = 'add', easing = IO) {
  return el.animate(frames, { duration: ms, easing, composite });
}
const deg = (v: number[]) => v.map((d) => ({ rotate: `${d}deg` }));
function builtIn(el: Element, kind: string): Play | null {
  switch (kind) {
    case 'shake': return () => anim(el, [0, 4, -4, 4, -4, 2, 0].map((d, i) => ({ rotate: `${d}deg`, translate: `${[0, 2, -2, 2, -2, 1, 0][i]}px 0` })), 600, 'add', 'ease-in-out');
    case 'thump': return () => {
      const s = getComputedStyle(el).scale; const b = s === 'none' ? [1, 1] : s.split(' ').map(Number); const by = b[1] ?? b[0];
      return anim(el, [1, 1.1, 0.97, 1].map((k) => ({ scale: `${b[0] * k} ${by * k}` })), 500, 'replace');
    };
    case 'nut': return () => anim(el, deg([0, 60]), 700);
    case 'valve': return () => anim(el, deg([0, 90]), 800);
    case 'twitch': return () => anim(el, deg([0, 6, -3, 0]), 500, 'add', 'ease-in-out');
    case 'sway': return () => anim(el, deg([0, 3, -2, 0]), 800, 'add', 'ease-in-out');
    case 'drip': return () => {
      const o = getComputedStyle(el).opacity; // relative to its own opacity (some drips are faded on purpose)
      el.animate([{ opacity: o }, { opacity: 0, offset: 0.6 }, { opacity: 0, offset: 0.75 }, { opacity: o }], { duration: 700, composite: 'replace' });
      return el.animate([{ translate: '0 0' }, { translate: '0 16px', offset: 0.6, easing: 'steps(1, end)' }, { translate: '0 -6px', offset: 0.75 }, { translate: '0 0' }],
        { duration: 700, easing: 'ease-in', composite: 'add' });
    };
  }
  return null;
}

export function registerIdle(el: Element, play: Play, priority = 5) { if (!list.some((g) => g.el === el)) list.push({ el, play, priority }); }

function collect() {
  document.querySelectorAll<HTMLElement | SVGElement>('[data-idle]').forEach((el) => {
    const kind = el.getAttribute('data-idle') || '';
    const play = builtIn(el, kind);
    if (!play || list.some((g) => g.el === el) || el.parentElement?.closest('[data-idle]')) return; // a wrapper already owns it
    const st = (el as HTMLElement).style;
    const origin = el.getAttribute('data-idle-origin') || (kind === 'sway' ? '50% 0%' : '');
    if (origin) st.transformOrigin = origin;
    // SVG children: a % / keyword origin means the shape's own box; a px origin is in the svg's user units (the pivot).
    if (el instanceof SVGElement && !(el instanceof SVGSVGElement) && !/px/.test(origin) && (origin || !st.transformOrigin)) {
      st.transformBox = 'fill-box'; if (!st.transformOrigin) st.transformOrigin = 'center';
    }
    registerIdle(el, play, Number(el.getAttribute('data-idle-priority')) || PRIO[kind] || 5);
  });
}

const halfIn = (el: Element) => {
  const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false;
  const vis = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
  if (vis < r.height / 2 || r.right < 0 || r.left > innerWidth) return false;
  const cs = getComputedStyle(el); return cs.visibility !== 'hidden' && !el.closest('[hidden], [aria-hidden="true"][inert]');
};
const blocked = () => document.hidden || busy || !document.documentElement.classList.contains('motion')
  || document.documentElement.classList.contains('intro') || performance.now() - lastScroll < 800
  || Math.abs((window as any).__glassLenis?.velocity ?? 0) > 0.05
  || !!document.querySelector('input:focus, textarea:focus, select:focus, a:hover, button:hover, summary:hover, [role="button"]:hover, label:hover');

export function startIdle() {
  if (started || !document.documentElement.classList.contains('motion')) return;
  started = true;
  collect();
  addEventListener('scroll', () => { lastScroll = performance.now(); }, { passive: true });
  addEventListener('wheel', () => { lastScroll = performance.now(); }, { passive: true });
  addEventListener('touchmove', () => { lastScroll = performance.now(); }, { passive: true });
  const next = () => { timer = window.setTimeout(step, 5000 + Math.random() * 2000); };
  const step = () => {
    if (!blocked()) {
      const g = list.filter((x) => x.el !== last && x.el.isConnected && !x.el.matches(':hover') && halfIn(x.el))
        .map((x) => ({ x, k: x.priority + Math.random() * 0.5 })).sort((a, b) => a.k - b.k)[0]?.x; // ties: random
      if (g) {
        busy = true; last = g.el;
        const done = () => { busy = false; };
        try {
          const a: any = g.play();
          if (a && a.finished) a.finished.then(done, done);
          else if (a && a.eventCallback) a.eventCallback('onComplete', done);
          else done();
          setTimeout(done, 1500); // never stay busy
        } catch (e) { done(); }
      }
    }
    next();
  };
  clearTimeout(timer); next();
}

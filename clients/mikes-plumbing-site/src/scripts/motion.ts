// Motion system (read MOTION.md first). One grammar for every page:
//   loader -> hero handoff, page curtain, United-style per-element scroll reveals with Nick's 3 group delays (round 4),
//   parallax depth, signature moments, Lenis smooth scroll.
// Everything here is progressive: without JS, or with prefers-reduced-motion, the page is complete and static.
// <html> classes are decided before first paint in Base.astro: .motion (animate) | .no-motion, .intro (loader this visit),
// .pt-in (curtain is covering the page after an in-site click).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';
import { park, reveal, interceptLinks } from '../components/kit/curtain';
import { settled, requestRefresh } from '../components/kit/settle';

declare global { interface Window { __pbpMotion?: boolean; __pbpLenis?: Lenis } }

const html = document.documentElement;
const MOTION = html.classList.contains('motion');
const FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
/* Round 4 (MOTION.md section 2): United Plumbing's scroll UX on Paul's UI. Every element reveals on its OWN trigger as it
 * comes into view (United's per-element model), with United's effects, durations and easing. Nick's three priority groups
 * are small delays on top of that trigger, so when several things enter together the message leads:
 *   G1 headline, lead/body, main photo, big cards        +0
 *   G2 eyebrow, pills, buttons, chips, captions, patches  +0.15 s
 *   G3 seals, stamps, underlines, swooshes, counters      +0.3 s
 * A section head (eyebrow + headline + lead + buttons) shares ONE trigger and is ordered inside by its groups; photos,
 * rails, grids and cards keep their own triggers. No fast-scroll speed-ups, no instant finishes: an element only skips
 * its entrance when it is already above the viewport when its tween is built (anchor jump, reload mid-page). */
const EASE = 'power3.out';          // loader, curtain mark, header bits
const SOFT = 'power2.out';          // header top-bar fade
const ACCENT = 'back.out(1.3)';     // loader seal
const G_DELAY = [0, 0.15, 0.3];     // G1 / G2 / G3
const HEAD_STEP = 0.1;              // items of one group inside a section head, DOM order
const START = { one: 'top 88%', group: 'top 85%', draw: 'top 92%', count: 'top 90%' }; // United's trigger points
const KID_GAP = 0.09;               // children of a data-stagger group (United)
const LINE_GAP = 0.1;               // headline lines on scroll (United data-split); hero 0.12
const HERO_STEP = 0.12;             // hero items (United heroTimeline)
type Fx = 'up' | 'left' | 'right' | 'scale' | 'fade' | 'clip' | 'pop' | 'lines' | 'toss' | 'spin' | 'write' | 'nudge';
/** United's effect table. `d` = duration on scroll, `h` = duration in the hero. */
const FX: Record<string, { d: number; h: number; ease: string }> = {
  up: { d: 1, h: 0.9, ease: 'power3.out' }, left: { d: 1, h: 0.9, ease: 'power3.out' }, right: { d: 1, h: 0.9, ease: 'power3.out' },
  scale: { d: 1, h: 0.9, ease: 'power3.out' }, fade: { d: 1, h: 0.9, ease: 'power3.out' }, nudge: { d: 0.9, h: 0.9, ease: 'power3.out' },
  clip: { d: 1.2, h: 1.1, ease: 'power3.inOut' }, pop: { d: 0.6, h: 0.6, ease: 'back.out(2.2)' },
  lines: { d: 0.9, h: 0.85, ease: 'back.out(1.4)' }, toss: { d: 1, h: 0.9, ease: 'power3.out' },
  spin: { d: 0.9, h: 0.9, ease: 'power3.out' }, write: { d: 0.9, h: 0.9, ease: 'power2.inOut' },
};
const KID_DUR = 0.9;                // United stagger children
const DRAW_DUR = 1.2;               // underlines (United 1.6 for long drawings; ours are short)

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel) as NodeListOf<any>) as T[];
const shown = (el: Element) => el.getClientRects().length > 0 || getComputedStyle(el).display === 'contents';
const phone = () => window.innerWidth < 640;

/* ------------------------------------------------------------------ entrances */

/** True on a plain load (no loader, no curtain): the hero paints uncovered, so its photo must not be hidden (LCP). */
let heroUncovered = false;

/** Everything built, so the first Tab can finish it all (QA round 2): timelines and their triggers. */
const built: gsap.core.Timeline[] = [];
const triggers: ScrollTrigger[] = [];

/** Resting state after an entrance: inline values removed, so hover transitions and CSS transforms are untouched.
 *  An element that drifts with the parallax ([data-px], GSAP yPercent on itself) keeps its transform. */
function settle(els: Element[]) {
  els.forEach((e) => gsap.set(e, { clearProps: e.hasAttribute('data-px') ? 'opacity,visibility,clipPath,transition' : 'transform,opacity,visibility,clipPath,transition' }));
}

/** One effect on one target, as fromTo with explicit end values and immediateRender, so the start state is applied the
 *  moment it is built (United). Effects write transform (x/y/scale/rotation, never yPercent: that is the parallax's),
 *  opacity and clip-path only; photos are never transformed (a frame is clipped as a whole, ring and shadow included). */
function effect(t: HTMLElement, fx: Fx, hero: boolean, i = 0, dur?: number): gsap.core.Timeline {
  const tl = gsap.timeline();
  const spec = FX[fx] ?? FX.up;
  const d = dur ?? (hero ? spec.h : spec.d);
  const ease = spec.ease;
  const x = phone() ? 40 : 80;
  const go = (from: gsap.TweenVars, to: gsap.TweenVars) => tl.fromTo(t, from, { ...to, duration: d, ease, immediateRender: true }, 0);
  switch (fx) {
    case 'lines': {
      const hl = $$('.hl', t);
      const gap = hero ? 0.12 : LINE_GAP;
      if (hl.length) {
        // The hero headline has explicit line spans: mask each, then unwrap so underlines and descenders are free.
        const inner = hl.map((line) => {
          line.classList.add('m-line');
          const s = document.createElement('span');
          while (line.firstChild) s.appendChild(line.firstChild);
          line.appendChild(s);
          return s;
        });
        tl.set(t, { autoAlpha: 1 });
        tl.fromTo(inner, { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: d, ease, stagger: gap, immediateRender: true }, 0);
        tl.add(() => hl.forEach((line, k) => { line.classList.remove('m-line'); while (inner[k].firstChild) line.insertBefore(inner[k].firstChild!, inner[k]); inner[k].remove(); }));
      } else {
        // QA 18 Nov: SplitText turns every <br> into a line break, even one hidden by CSS at this width (`br { display: none }`
        // on phones), so the split headline had one line more than the real one and the page jumped (CLS) on revert. Hidden
        // <br>s are parked as empty placeholders during the split and put back after the revert.
        // A block that holds more than text (a card with a logo, a button, other [data-t] items) is not split: splitting and
        // reverting it rebuilds its children, so their own entrances would point at detached nodes. It rises whole.
        if (t.querySelector('img, picture, svg, a, button, input, [data-t]')) { go({ y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }); break; }
        const parked: string[] = [];
        $$('br', t).forEach((br) => { if (getComputedStyle(br).display !== 'none') return; const s = document.createElement('span'); s.setAttribute('data-m-br', String(parked.length)); parked.push(br.outerHTML); br.replaceWith(s); });
        // The split must not resize the headline (a shrink-wrapped or centred H1 narrows to its widest line, and the line
        // masks can be shorter than the real line boxes): its box is held at its real size until the revert.
        const keep = { w: t.style.width, h: t.style.minHeight };
        const box = { w: t.offsetWidth, h: t.offsetHeight };
        const unpark = () => $$('[data-m-br]', t).forEach((s) => { const tpl = document.createElement('template'); tpl.innerHTML = parked[Number(s.getAttribute('data-m-br'))] ?? '<br>'; s.replaceWith(tpl.content); });
        // Real line count (rows of text) before the split. SplitText cannot break after a hyphen ("Backed-up"), so its lines
        // can differ from the browser's; then the headline would re-wrap (and the page jump) on revert, so it rises whole.
        const rg = document.createRange(); rg.selectNodeContents(t);
        const tops = Array.from(rg.getClientRects()).filter((r) => r.width > 1).map((r) => r.top).sort((a, b) => a - b);
        const rows = tops.filter((v, k) => k === 0 || v - tops[k - 1] > (parseFloat(getComputedStyle(t).fontSize) || 16) * 0.5).length;
        const split = SplitText.create(t, { type: 'lines', mask: 'lines', linesClass: 'm-l' });
        if (rows && split.lines.length !== rows) { split.revert(); unpark(); go({ y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }); break; }
        if (box.w) { t.style.width = box.w + 'px'; t.style.minHeight = box.h + 'px'; }
        tl.set(t, { autoAlpha: 1 });
        tl.fromTo(split.lines, { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: d, ease, stagger: gap, immediateRender: true }, 0);
        tl.add(() => {
          split.revert();
          t.style.width = keep.w; t.style.minHeight = keep.h;
          unpark();
        });
      }
      break;
    }
    case 'left': go({ x: -x, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }); break;
    case 'right': go({ x, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }); break;
    case 'scale': go({ scale: 0.92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1 }); break;
    case 'fade': go({ autoAlpha: 0 }, { autoAlpha: 1 }); break;
    case 'pop': go({ scale: 0.6, y: 20, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1 }); break;
    // LCP-safe on a plain load: moves but never hides (the hero's biggest text block must paint early). Under the loader or
    // the curtain it has already painted (LCP is taken), so it fades in on its turn.
    case 'nudge': go({ y: 24, autoAlpha: heroUncovered ? 1 : 0 }, { y: 0, autoAlpha: 1 }); break;
    case 'clip': {
      // United's clip (opens top to bottom), with negative insets so the frame's white ring and shadow (drawn outside the
      // box) are inside the clip at the end; the clip is removed afterwards. A quick fade hides the -5 % sliver at the start.
      if (hero && heroUncovered) { tl.set(t, { autoAlpha: 1 }); break; } // plain load: the LCP photo stays put
      tl.fromTo(t, { clipPath: 'inset(-5% -5% 100% -5%)' }, { clipPath: 'inset(-5% -5% -5% -5%)', duration: d, ease, immediateRender: true }, 0);
      tl.fromTo(t, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out', immediateRender: true }, 0);
      break;
    }
    case 'toss': {
      // Tilted snapshots: rise and settle into their CSS tilt from 4 degrees off, alternating sides. No overshoot.
      const r = Number(gsap.getProperty(t, 'rotation')) || 0;
      go({ y: 60, rotation: r + (i % 2 ? -4 : 4), autoAlpha: 0 }, { y: 0, rotation: r, autoAlpha: 1 });
      break;
    }
    case 'spin': { const r = Number(gsap.getProperty(t, 'rotation')) || 0; go({ scale: 0.6, rotation: r - 60, autoAlpha: 0 }, { scale: 1, rotation: r, autoAlpha: 1 }); break; }
    case 'write': go({ clipPath: 'inset(-20% 100% -20% -5%)', autoAlpha: 1 }, { clipPath: 'inset(-20% -5% -20% -5%)' }); break;
    case 'up':
    default: go({ y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1 });
  }
  return tl;
}

/* ------------------------------------------------------------------ mapping: markup -> United effect + Nick's group */

/** Seals, stamps, medals, number stickers: decorative accents (G3). */
const ACCENT_SEL = '.seal, .stamp, .medal, .nst';
/** Empty decorative shapes (a colour block behind a photo): no text, no media. */
const isShape = (el: HTMLElement) => !el.textContent?.trim() && !el.querySelector('img, svg, video, iframe, picture, input, select, textarea');
/** A caption / footnote block (small print under a photo or a grid), not body copy. */
const isCaption = (el: HTMLElement) => el.matches('.caption, .label, figcaption') || (!!el.querySelector(':scope > .caption') && !el.querySelector('p.body, p.lead, h2, h3'));
const isCta = (el: HTMLElement) => el.classList.contains('btn') || (!!el.querySelector('.btn') && !el.matches('p, h1, h2, h3, h4'));
const kidsOf = (el: HTMLElement) => (Array.from(el.children) as HTMLElement[]).filter((c) => !c.hasAttribute('data-t') && shown(c));

/** Which priority group an element belongs to (1, 2 or 3). `data-g="1|2|3"` on the element overrides the mapping. */
function groupOf(el: HTMLElement): 1 | 2 | 3 {
  const g = el.dataset.g;
  if (g === '1' || g === '2' || g === '3') return Number(g) as 1 | 2 | 3;
  const t = el.dataset.t || '3';
  const fx = el.dataset.fx;
  const stagger = el.hasAttribute('data-stagger');
  if (fx === 'spin' || fx === 'write' || el.matches(ACCENT_SEL) || isShape(el)) return 3;
  if (t === '5') return el.matches('.script') && !stagger ? 3 : 2;   // script flourish = G3; chips, captions, patches, pills = G2
  if (t === '1') return 2;                                          // eyebrow, rating pill, breadcrumbs
  if (t === '2') return 1;                                          // headline
  if (t === '3') return stagger || isCta(el) || isCaption(el) ? 2 : 1; // lead/body = G1; buttons, lists, captions = G2
  // Tier 4: the main photo / main card is G1; secondary snapshots and small cards/rows are G2.
  if (fx === 'toss') return 2;
  if (stagger) {
    const kids = kidsOf(el);
    const avg = kids.reduce((s, c) => s + c.getBoundingClientRect().height, 0) / Math.max(1, kids.length);
    return avg >= 160 || kids.some((c) => c.dataset.fx === 'frame') ? 1 : 2;
  }
  return el.getBoundingClientRect().height >= 120 ? 1 : 2;
}

/** A side column (a card or panel in the left or right part of its section): United's left/right slide. */
function sideOf(el: HTMLElement, sec: HTMLElement): 'left' | 'right' | null {
  const r = el.getBoundingClientRect(), s = sec.getBoundingClientRect();
  if (!s.width || r.width > s.width * 0.6) return null;
  const c = (r.left + r.width / 2 - s.left) / s.width;
  return c < 0.45 ? 'left' : c > 0.55 ? 'right' : null;
}

/** The United effect for an existing `data-t` / `data-fx` (MOTION.md section 2, mapping table). `kid` = inside a stagger. */
function fxOf(el: HTMLElement, sec: HTMLElement, hero: boolean, kid = false): Fx {
  const t = el.dataset.t || '3';
  const f = el.dataset.fx;
  if (f === 'frame') return kid ? 'scale' : 'clip';                 // photos: the frame clips open (in a grid: scales in)
  if (f === 'nudge') return hero ? 'nudge' : 'up';
  if (f === 'lines' || (!f && t === '2')) return 'lines';           // headlines: masked lines, back.out(1.4)
  if (f === 'toss' || f === 'spin' || f === 'write' || f === 'pop' || f === 'fade') return f;
  if (f === 'slide') return 'left';
  if (t === '5') return 'pop';                                      // chips, patches, pills, seals
  if (t === '4' && !hero && !kid && !el.hasAttribute('data-stagger')) {
    const s = sideOf(el, sec);
    if (s) return s;                                                // side columns slide in from their side
    return el.getBoundingClientRect().height >= 200 ? 'scale' : 'up'; // big centred cards/maps settle in scale
  }
  return 'up';                                                      // eyebrows, leads, body, buttons, lists, small cards
}

/** The entrance of one [data-t] element (or of its children, with data-stagger), positioned at 0. */
function entrance(el: HTMLElement, sec: HTMLElement, hero = false, pre?: Fx | null): gsap.core.Timeline {
  const tl = gsap.timeline();
  const stagger = el.hasAttribute('data-stagger');
  const kids = stagger ? kidsOf(el) : [el];
  if (stagger) gsap.set(el, { autoAlpha: 1 });
  // A CSS `transition: transform` (buttons, patches, chips, cards) fights GSAP's per-frame writes: off while it runs.
  const moved = Array.from(new Set<Element>([el, ...kids]));
  gsap.set(moved, { transition: 'none' });
  const own = stagger ? fxOf(el, sec, hero) : null;
  kids.forEach((k, i) => {
    const fx = stagger ? (k.dataset.fx ? fxOf(k, sec, hero, true) : own!) : (pre ?? fxOf(el, sec, hero));
    tl.add(effect(k, fx, hero, i, stagger && fx !== 'lines' ? KID_DUR : undefined), i * (stagger ? KID_GAP : 0));
  });
  tl.add(() => settle(moved));
  return tl;
}

/* Keyboard users get the finished page (QA round 2). Pre-hidden content is opacity 0 but focusable: the first Tab, or focus
 * landing on content that is not revealed yet, ends every entrance at once and stops the rest. */
let kbd = false;
function keyboardRelease() {
  if (kbd) return; kbd = true;
  triggers.forEach((st) => st.kill());
  built.forEach((tl) => tl.progress(1));
  $$('[data-m-section] [data-t]').forEach((el) => el.classList.add('m-built'));
  settle($$('[data-m-section] [data-t], [data-m-section] [data-stagger] > *').filter((e) => parseFloat(getComputedStyle(e).opacity) < 1 || getComputedStyle(e).visibility === 'hidden'));
}

const fontsIn = () => (document.fonts && document.fonts.status !== 'loaded'
  ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 700))]) : Promise.resolve());

/** A built entrance on its own scroll trigger. An element whose box is already ABOVE the viewport when it is built is set
 *  to its end state; anything on screen or below plays when its trigger point is reached (United). */
function onScroll(tl: gsap.core.Timeline, trigger: Element, start: string, above: boolean) {
  built.push(tl);
  if (above) { tl.progress(1); return; }
  tl.pause();
  // An element nested inside another animated element (a patch on a review card) is measured while its host still sits at
  // its start offset (y 60), which would push its trigger point down and leave it waiting while visible. The hosts' current
  // y is subtracted at every refresh (0 once they have played).
  const [edge, at] = start.split(' ');
  const hostY = () => { let d = 0; for (let a = trigger.parentElement; a && a !== document.body; a = a.parentElement) d += Number(gsap.getProperty(a, 'y')) || 0; return d; };
  let fired = false; // onEnter can run inside create() (already past the start): `st` is not assigned yet then
  const st = ScrollTrigger.create({ trigger, start: () => { const d = Math.round(hostY()); return d ? `${edge}${d > 0 ? '-=' : '+='}${Math.abs(d)} ${at}` : start; }, once: true, onEnter: (self) => { fired = true; pending.delete(self); tl.play(); } });
  triggers.push(st);
  if (!fired) pending.set(st, { tl, trigger });
}

/* QA 18 Nov (frame sampler): when the scroll STOPS with an element already on screen but still below its trigger line (the
 * bottom 12 % band under `top 88%`), it would sit invisible in view until the next scroll. On scroll end, any such entrance
 * plays normally (same tween, no instant finish). Elements only peeking in (less than half shown, top in the last 3 %) wait. */
const pending = new Map<ScrollTrigger, { tl: gsap.core.Timeline; trigger: Element }>();
let lastCatch = 0;
function catchUp() {
  if (!MOTION || kbd || !pending.size) return;
  const now = performance.now(); if (now - lastCatch < 100) return; lastCatch = now;
  const vh = window.innerHeight;
  pending.forEach(({ tl, trigger }, st) => {
    const r = trigger.getBoundingClientRect();
    if ((r.top < vh * 0.97 || r.top + r.height / 2 < vh) && r.bottom > 0 && r.height > 0) { pending.delete(st); st.kill(); tl.play(); }
  });
}
// Lenis' lerp tail is long (the last few px take ~0.6 s), so "stopped" = Lenis below 1 px/frame (see boot), with
// ScrollTrigger's scrollEnd as the fallback.
ScrollTrigger.addEventListener('scrollEnd', catchUp);

/** Plan one section: the head block (one trigger), and every other element on its own trigger. Read phase only. */
function planSection(sec: HTMLElement) {
  const vh = window.innerHeight;
  const els = $$('[data-t]', sec).filter(shown);
  const draws = $$<SVGPathElement>('[data-draw]', sec);
  // Frames are not pre-hidden by CSS (LCP rule): one already on screen when we build is left exactly as it is.
  const isFrameLike = (el: HTMLElement) => el.dataset.fx === 'frame' || el.dataset.fx === 'nudge' || (el.hasAttribute('data-stagger') && !!el.querySelector(':scope > [data-fx="frame"]'));
  const still = new Set(els.filter((el) => { if (!isFrameLike(el)) return false; const r = el.getBoundingClientRect(); return r.top < vh && r.bottom > 0; }));
  // The section head: the headline's text block (its .shead, else its parent) = eyebrow, headline, and the lead/buttons
  // that start within half a viewport of the headline. One trigger for all of them.
  const head = new Set<HTMLElement>();
  const h = els.find((el) => (el.dataset.t === '2'));
  if (h) {
    const box = h.closest<HTMLElement>('.shead') ?? h.parentElement!;
    const hTop = h.getBoundingClientRect().top;
    els.forEach((el) => {
      const t = el.dataset.t;
      if (still.has(el) || !box.contains(el) || !(t === '1' || t === '2' || t === '3')) return;
      if (t === '3' && el.getBoundingClientRect().top - hTop > vh * 0.5) return;
      head.add(el);
    });
  }
  const groups = new Map(els.map((el) => [el, groupOf(el)]));
  const fxs = new Map(els.map((el) => [el, el.hasAttribute('data-stagger') ? null : fxOf(el, sec, false)]));
  const above = new Set<Element>([...els, ...draws.map((d) => d.closest('svg') ?? d)].filter((el) => el.getBoundingClientRect().bottom < 0));
  const headFirst = [...head].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
  return { sec, els, draws, still, head: [...head].sort((a, b) => groups.get(a)! - groups.get(b)!), headFirst, groups, fxs, above };
}

/** Build one planned section (write phase): tweens with their start states, then .m-built in the same task (no flash). */
function buildSection(p: ReturnType<typeof planSection>) {
  const { sec, els, draws, still, head, headFirst, groups, fxs, above } = p;
  $$('[data-t]', sec).forEach((el) => { if (!els.includes(el)) el.classList.add('m-built'); }); // other breakpoint
  still.forEach((el) => el.classList.add('m-built'));
  if (kbd) { els.forEach((el) => el.classList.add('m-built')); return; }
  if (head.length) {
    const tl = gsap.timeline();
    const count = [0, 0, 0];
    head.forEach((el) => {
      const g = groups.get(el)! - 1;
      tl.add(entrance(el, sec, false, fxs.get(el)), G_DELAY[g] + Math.min(0.2, HEAD_STEP * count[g]++));
      el.classList.add('m-built');
    });
    onScroll(tl, headFirst!, START.one, head.every((el) => above.has(el)));
  }
  els.forEach((el) => {
    if (still.has(el) || head.includes(el)) return;
    const tl = gsap.timeline();
    tl.add(entrance(el, sec, false, fxs.get(el)), G_DELAY[groups.get(el)! - 1]);
    el.classList.add('m-built');
    onScroll(tl, el, el.hasAttribute('data-stagger') ? START.group : START.one, above.has(el));
  });
  // Underlines draw on their own trigger (G3 delay).
  draws.forEach((pth) => {
    const tl = gsap.timeline();
    tl.fromTo(pth, { drawSVG: '0%' }, { drawSVG: '100%', duration: DRAW_DUR, ease: 'power2.inOut', immediateRender: true }, G_DELAY[2]);
    onScroll(tl, pth.closest('svg') ?? pth, START.draw, above.has(pth.closest('svg') ?? pth));
  });
}

/** Build every section below the hero in idle slices (United builds all tweens and splits up front, so no layout work
 *  happens mid-scroll; slicing keeps each task short for TBT). `done` runs after the last one. */
function buildRest(done: () => void) {
  const secs = $$('[data-m-section]').filter((s) => !s.hasAttribute('data-m-hero'));
  const idle = (f: (d?: IdleDeadline) => void) => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(f, { timeout: 300 }) : setTimeout(f, 50));
  const step = (dl?: IdleDeadline) => {
    const t0 = performance.now();
    while (secs.length && (performance.now() - t0 < 12 || (dl && dl.timeRemaining() > 8))) {
      const batch = secs.splice(0, 3).map(planSection); // read phase for a few sections, then their writes
      batch.forEach(buildSection);
    }
    if (secs.length) idle(step); else done();
  };
  idle(step);
}

/** The hero: one ordered timeline played at the handoff (United heroTimeline). Items in group order (G1, G2, G3), DOM
 *  order inside a group, HERO_STEP apart; a split headline holds the next item until its lines have started; each new
 *  group adds a 0.15 s beat. The stripe underline and the swoosh ribbons run with G3. */
function buildHeroTl(): gsap.core.Timeline | null {
  const sec = document.querySelector<HTMLElement>('[data-m-section][data-m-hero]');
  if (!sec) return null;
  const els = $$('[data-t]', sec).filter(shown);
  $$('[data-t]', sec).forEach((el) => el.classList.add('m-built'));
  const draws = $$<SVGPathElement>('[data-draw]', sec);
  const sw = $$<SVGElement>('svg[data-swoosh]', sec);
  const order = els.map((el) => ({ el, g: groupOf(el) })).sort((a, b) => a.g - b.g); // stable: DOM order inside a group
  const tl = gsap.timeline({ paused: true });
  built.push(tl);
  let t = 0, last = 1;
  order.forEach(({ el, g }) => {
    if (g !== last) { t += G_DELAY[1]; last = g; }
    const e = entrance(el, sec, true);
    tl.add(e, t);
    const n = el.dataset.t === '2' && !el.dataset.fx ? Math.max(1, $$('.hl', el).length || 2) : 0;
    t += n ? HERO_STEP * n + 0.08 : HERO_STEP;
  });
  if (last !== 3) t += G_DELAY[1];
  if (draws.length) tl.fromTo(draws, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, ease: 'power2.inOut', stagger: 0.06, immediateRender: true }, t);
  sw.forEach((svg) => { svg.dataset.mDone = '1'; tl.add(swooshIn(svg, 0.9), t + 0.05); });
  return tl;
}


/** Swoosh edge: the three ribbons run in from the leading side, one after another. */
function swooshIn(svg: SVGElement, dur = 0.9): gsap.core.Timeline {
  const flip = svg.getAttribute('class')?.includes('flip');
  const tl = gsap.timeline();
  tl.fromTo($$('.sw-b', svg), { clipPath: flip ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0%)', duration: dur, ease: 'power3.inOut', stagger: 0.08, immediateRender: true });
  return tl;
}

/* ------------------------------------------------------------------ parallax (depth, round 3) */

/* United-style depth (MOTION.md section 4b). Parallax writes ONLY the individual CSS `translate` property, on wrappers:
 * entrances write `transform`/opacity/clip, the frame photo's reveal writes the img's own `scale`/`clip-path`, so no
 * property ever has two writers (round 2's glitch was three writers on one img transform). Photos never move inside their
 * frame: the whole media column (frame + its caption/stickers) drifts as one, snapped to whole device pixels so the photo
 * stays crisp. Ranges are capped by the free space around each target so nothing drifts into its neighbours. */
type PxItem = { el: HTMLElement; a: number; b: number; out: boolean; paint?: () => void; clear?: () => void };
const pxItems: PxItem[] = [];
const devPx = () => (window.devicePixelRatio || 1) * (parseFloat(html.style.zoom) || 1);
const TEXTY = 'h1, h2, h3, [data-t="2"], p.body, p.lead, .shead, [data-t="3"]:not([data-stagger])';

/** The highest ancestor of a photo frame that still holds only media (the frame, its caption, stickers, snapshots). */
function mediaWrap(f: HTMLElement, sec: HTMLElement): HTMLElement {
  let w = f;
  for (let p = f.parentElement; p && p !== sec; p = p.parentElement) {
    if (p.matches('[data-stagger], [data-carousel], [data-track], .wrap, .container') || p.querySelector(TEXTY)) break;
    if ($$('[data-fx="frame"]', p).length > 1) break;
    if (p.getBoundingClientRect().height > window.innerHeight * 1.3) break;
    w = p;
  }
  return w;
}

/** Free vertical space above and below `el` (to content that overlaps it horizontally, and to its section's edges when the
 *  section does not clip), so a drift of +-room never touches anything. */
const obstacleCache = new Map<HTMLElement, { o: HTMLElement; q: DOMRect }[]>();
/** The content a drift must not touch, measured once per section per setup (cleared after each parallax() setup). */
function obstacles(sec: HTMLElement) {
  let list = obstacleCache.get(sec);
  if (!list) { list = $$(`${TEXTY}, [data-t], .btn`, sec).map((o) => ({ o, q: o.getBoundingClientRect() })).filter(({ q }) => q.width > 0 && q.height > 0); obstacleCache.set(sec, list); }
  return list;
}
function roomAround(el: HTMLElement, sec: HTMLElement): number {
  const r = el.getBoundingClientRect();
  let up = Infinity, down = Infinity;
  const cs = getComputedStyle(sec);
  if (!/hidden|clip/.test(cs.overflow + cs.overflowY)) {
    const s = sec.getBoundingClientRect();
    up = r.top - s.top; down = s.bottom - r.bottom;
  }
  obstacles(sec).forEach(({ o, q }) => {
    if (o === el || o.contains(el) || el.contains(o)) return;
    if (q.right <= r.left || q.left >= r.right || q.height === 0) return;
    if (q.bottom <= r.top + 1) up = Math.min(up, r.top - q.bottom);
    else if (q.top >= r.bottom - 1) down = Math.min(down, q.top - r.bottom);
    else { up = 0; down = 0; } // overlaps already (an overlay): do not move it against that content
  });
  return Math.max(0, Math.min(up, down) - 8);
}

function parallax() {
  const mm = gsap.matchMedia();
  mm.add({ desk: '(min-width: 1024px)', tab: '(min-width: 640px) and (max-width: 1023px)', mob: '(max-width: 639px)' }, (ctx) => {
    const c = ctx.conditions as Record<string, boolean>;
    const k = c.desk ? 1 : c.tab ? 0.6 : 0.45;
    const items: PxItem[] = [];
    const used = new Set<Element>();
    const add = (el: HTMLElement, a: number, b: number, room: number, out = false) => {
      if (used.has(el)) return;
      const cap = out ? Infinity : room;
      const lim = (v: number) => Math.sign(v) * Math.min(Math.abs(v) * k, cap);
      const it = { el, a: lim(a), b: lim(b), out };
      if (Math.max(Math.abs(it.a), Math.abs(it.b)) < 8) return; // too little room to read as depth: leave it still
      used.add(el); items.push(it);
    };
    $$('[data-m-section]').forEach((sec) => {
      const hero = sec.hasAttribute('data-m-hero');
      // 1. Media columns (a frame plus its caption and stickers): lag behind the page, +-36 px (hero: drifts 0 -> 64 px
      //    as it scrolls away, so nothing moves at load and LCP/CLS are untouched).
      const wraps = new Set<HTMLElement>();
      $$('[data-fx="frame"]', sec).filter(shown).forEach((f) => { if (!f.closest('[data-carousel], [data-track], [data-no-px]')) wraps.add(mediaWrap(f, sec)); });
      wraps.forEach((w) => {
        if (hero) {
          const s = sec.getBoundingClientRect(), r = w.getBoundingClientRect();
          const cs = getComputedStyle(sec);
          const room = /hidden|clip/.test(cs.overflow + cs.overflowY) ? 64 : Math.max(0, s.bottom - r.bottom - 8);
          add(w, 0, Math.min(64, room / k), Infinity, true);
        } else add(w, -36, 36, roomAround(w, sec));
        // Accents riding on the photo (seals, snapshots, chips) drift a little against it: depth inside the column.
        $$<HTMLElement>(`${ACCENT_SEL}, [data-fx="toss"], [data-fx="pop"]`, w).filter(shown).forEach((a) => add(a, hero ? 0 : 14, hero ? -28 : -14, 40, hero));
      });
      if (hero) return;
      // 2. Section heads (eyebrow + headline + lead as one block): lead the page, +24 -> -24 px (United: h2 +40 -> -20).
      $$('.shead', sec).filter(shown).forEach((h) => { if (!h.closest('[data-carousel], [data-track]')) add(h, 24, -24, roomAround(h, sec)); });
      // 3. Seals, stamps and stickers that sit on their own (not on a photo): lead, +-28 px.
      $$<HTMLElement>(ACCENT_SEL, sec).filter((a) => shown(a) && ![...wraps].some((w) => w.contains(a))).forEach((a) => add(a, 28, -28, roomAround(a, sec)));
      // 4. Decorative flow lines and empty colour blocks behind photos: lag the most, +-48 px.
      $$<HTMLElement>('img[data-flow]', sec).filter(shown).forEach((d) => add(d, -48, 48, roomAround(d, sec) + 40));
      $$<HTMLElement>('[data-t]', sec).filter((d) => shown(d) && isShape(d) && !d.closest('[data-stagger]')).forEach((d) => add(d, -30, 30, 60));
    });
    obstacleCache.clear();
    items.forEach((it) => {
      const { el, a, b, out } = it;
      // Two channels, so no property ever has two writers: an element GSAP never animates (a wrapper, a section head, a
      // flow line) drifts through the CSS `translate` property; an element that also has an entrance (a seal, a snapshot)
      // drifts through GSAP's own `yPercent` component, which its entrance (y, rotation, scale) never touches.
      const gs = el.matches('[data-t], [data-stagger] > *');
      if (gs) el.setAttribute('data-px', '');
      const setPct = gs ? gsap.quickSetter(el, 'yPercent') as (v: number) => void : null;
      const o = { v: a };
      const paint = () => {
        const d = devPx(); const px = Math.round(o.v * d) / d; // whole device pixels: the photo never resamples, so it stays crisp
        if (setPct) setPct(el.offsetHeight ? (px / el.offsetHeight) * 100 : 0); else el.style.translate = `0 ${px}px`;
      };
      it.paint = paint;
      it.clear = () => { if (setPct) setPct(0); else el.style.translate = ''; };
      paint();
      gsap.fromTo(o, { v: a }, { v: b, ease: 'none', onUpdate: paint, scrollTrigger: {
        trigger: out ? el.closest('[data-m-section]') ?? el : el, start: out ? 'top top' : 'top bottom', end: 'bottom top', scrub: 0.5,
      } });
    });
    pxItems.push(...items);
    return () => { items.forEach((it) => { it.clear?.(); it.el.removeAttribute('data-px'); pxItems.splice(pxItems.indexOf(it), 1); }); };
  });
  // Triggers are measured without the drift (it would shift every start point by up to the range), then repainted.
  ScrollTrigger.addEventListener('refreshInit', () => pxItems.forEach((it) => it.clear?.()));
  ScrollTrigger.addEventListener('refresh', () => pxItems.forEach((it) => it.paint?.()));
}

/* ------------------------------------------------------------------ signature moments */

function signatures() {
  // Counters (G3): count up from zero once, as they enter (United: top 90 %, 1.8 s power2.out). One already above the
  // viewport when wired keeps its value.
  $$('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count || '0');
    const dec = parseInt(el.dataset.decimals || '0', 10);
    if (el.getBoundingClientRect().bottom < 0) return;
    const o = { v: 0 };
    el.textContent = (0).toFixed(dec);
    const tl = gsap.timeline().to(o, { v: end, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = o.v.toFixed(dec); } }, G_DELAY[2]);
    onScroll(tl, el, START.count, false);
  });
  // Water meter (G3): each drum rolls up to its digit, last drum longest (it spins past 9 once).
  $$('[data-meter]').forEach((m) => {
    const reels = $$('.reel', m);
    reels.forEach((r) => r.style.setProperty('--n', '0'));
    ScrollTrigger.create({ trigger: m, start: START.count, once: true, onEnter: () => reels.forEach((r, i) => {
      const o = { n: 0 }; const d = parseInt(r.dataset.digit || '0', 10);
      gsap.to(o, { n: d, duration: 1.2 + i * 0.15, ease: 'power3.out', delay: G_DELAY[2], onUpdate: () => r.style.setProperty('--n', String(o.n)) });
    }) });
  });
  // Swoosh edges (outside the hero, which runs its own as G3): ribbons run in once, as they enter.
  $$<SVGElement>('svg[data-swoosh]').forEach((svg) => {
    if (svg.dataset.mDone) return;
    const tl = gsap.timeline().add(swooshIn(svg), G_DELAY[2]);
    onScroll(tl, svg, START.draw, svg.getBoundingClientRect().bottom < 0);
  });
  // Flow lines stay static in themselves (the old endless dash drift was retired); they take part in the parallax.
  // Map: the county outline draws, the truck route flows.
  $$('[data-draw-map]').forEach((p) => gsap.fromTo(p, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.4, ease: 'power2.inOut', scrollTrigger: { trigger: p.closest('svg'), start: 'top 95%', once: true } }));
  // The dashed truck route flows once after the outline has drawn, then rests (no endless loop).
  $$('[data-route]').forEach((p) => gsap.to(p, { strokeDashoffset: -112, duration: 2, ease: 'power1.inOut', delay: 1.1, scrollTrigger: { trigger: p.closest('svg'), start: 'top 95%', once: true } }));
  // Pipes and other scrubbed fills: kit/scrub.ts. Marquees: kit/marquee.ts.
}

/* ------------------------------------------------------------------ pointer: magnetic + fill origin */

function pointer() {
  if (!FINE) return;
  $$('.btn').forEach((b) => {
    b.addEventListener('pointerenter', (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--fx', `${e.clientX - r.left}px`);
      b.style.setProperty('--fy', `${e.clientY - r.top}px`);
      b.style.setProperty('--fs', String(Math.ceil((Math.hypot(r.width, r.height) * 2) / 12) + 2));
    });
  });
  $$('[data-magnetic]').forEach((b) => {
    const xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3.out' });
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      xTo(gsap.utils.clamp(-8, 8, (e.clientX - (r.left + r.width / 2)) * 0.22));
      yTo(gsap.utils.clamp(-6, 6, (e.clientY - (r.top + r.height / 2)) * 0.3));
    });
    b.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}

/* ------------------------------------------------------------------ loader, curtain, handoff */

/** The header settles first (United heroTimeline): top bar fades in, the logo tab, nav items and header buttons drop in
 *  (y -24, 0.6 s, 0.05 s apart). Only built when a cover (loader or curtain) hides the page, so nothing flashes. */
function introChrome(tl: gsap.core.Timeline) {
  const bar = document.querySelector('[data-intro="topbar"]');
  const bits = $$('[data-intro="brand"], .hdr .nav-list > li, .hdr .cta > *').filter(shown);
  if (bar) tl.fromTo(bar, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: SOFT, immediateRender: true, clearProps: 'opacity,visibility' }, 0);
  if (bits.length) {
    gsap.set(bits, { transition: 'none' });
    tl.fromTo(bits, { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: EASE, stagger: 0.05, immediateRender: true }, 0.08);
    tl.add(() => settle(bits));
  }
}

function runLoader(onHandoff: () => void, onLift: () => void = () => {}) {
  const ld = document.querySelector<HTMLElement>('[data-loader]');
  if (!ld || !html.classList.contains('intro')) { onHandoff(); return; }
  const panel = ld.querySelector<HTMLElement>('.ld-panel')!;
  const edge = ld.querySelector<SVGElement>('.ld-edge');
  const water = ld.querySelector<HTMLElement>('.ld-water');
  const t0 = performance.now();
  const MIN = 1800, MAX = 3400;
  window.__pbpLenis?.stop();
  // One beat at a time, each starting when the previous is ~70 % done: ring, seal, stripes, words, pipe.
  const build = gsap.timeline();
  build
    .to(ld.querySelector('.ld-ring circle'), { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0)
    .to(ld.querySelector('.ld-seal'), { scale: 1, duration: 0.6, ease: ACCENT }, 0.56)
    .to($$('.ld-stripes path', ld), { x: 0, xPercent: 0, autoAlpha: 1, duration: 0.5, ease: EASE, stagger: 0.1 }, 0.98)
    .to(ld.querySelector('.ld-word'), { autoAlpha: 1, duration: 0.45, ease: SOFT }, 1.38)
    .to(ld.querySelector('.ld-pipe'), { autoAlpha: 1, duration: 0.4, ease: SOFT }, 1.66);
  // Water fills toward 85 % while the page loads, then to full.
  const fill = water ? gsap.to(water, { scaleX: 0.85, duration: 1.6, ease: 'power2.out', delay: 1.75 }) : null;

  let lifted = false;
  const lift = () => {
    if (lifted) return; lifted = true;
    fill?.kill(); build.progress(1);
    onLift(); // the panel still covers the page: the hero takes its pre-states now, unseen
    const skipBtn = ld.querySelector('.ld-skip'); if (skipBtn) gsap.to(skipBtn, { autoAlpha: 0, duration: 0.2 }); // it sits outside the panel
    // Layout px (offsetHeight), not getBoundingClientRect: under the wide-screen zoom a rect is in zoomed px.
    const h = panel.offsetHeight + ((edge as any)?.clientHeight || 120) + 8;
    const out = gsap.timeline({ onComplete: () => {
      html.classList.remove('intro'); ld.style.display = 'none';
      try { sessionStorage.setItem('mps-intro', '1'); } catch (e) { /* storage blocked: loader may show again next visit */ }
      window.__pbpLenis?.start();
    } });
    if (water) out.to(water, { scaleX: 1, duration: 0.3, ease: 'power2.out' });
    out.to(ld.querySelector('.ld-core'), { y: -40, autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, '>-0.05');
    out.to(panel, { y: -h, duration: 1.05, ease: 'power3.inOut' }, '<0.1');
    // The panel rises from the bottom, so the hero (top of the page) is uncovered last: hand off just past mid-lift.
    out.add(onHandoff, '<0.45');
  };
  const ready = () => { const wait = Math.max(0, MIN - (performance.now() - t0)); gsap.delayedCall(wait / 1000, lift); };
  if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready, { once: true });
  gsap.delayedCall(MAX / 1000, lift);
  const skip = () => lift();
  ld.addEventListener('pointerdown', skip, { once: true });
  window.addEventListener('keydown', skip, { once: true });
}

/* ------------------------------------------------------------------ boot */

function boot() {
  if (!MOTION) return;
  window.__pbpMotion = true;
  window.addEventListener('keydown', (e) => { if (e.key === 'Tab') keyboardRelease(); }, true);
  document.addEventListener('focusin', (e) => {
    const host = (e.target as Element).closest?.('[data-m-section] [data-t]');
    if (host && (!host.classList.contains('m-built') || parseFloat(getComputedStyle(host).opacity) < 0.5)) keyboardRelease();
  });

  // Lenis = United's settings exactly (lerp 0.1, wheelMultiplier 1, smooth wheel, native touch). Lenis lerp is frame-rate
  // independent (damp), so it feels the same at 60 and 120 Hz. One clock: Lenis is driven by the GSAP ticker and
  // ScrollTrigger updates on every Lenis scroll, so no scrollerProxy is needed (Lenis scrolls the real window).
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, anchors: { offset: -96 * (parseFloat(document.documentElement.style.zoom) || 1) }, autoRaf: false });
  window.__pbpLenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  lenis.on('scroll', (l: Lenis) => { if (Math.abs(l.velocity) < 1) catchUp(); });
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // Re-measure when the page geometry changes without a window resize: the wide-screen zoom on <html> (Base.astro sets
  // style.zoom, also from a ResizeObserver when the scrollbar comes or goes) and content height changes (accordions,
  // late images, the mobile menu). Debounced so a burst of changes costs one refresh.
  // kit/settle.ts requestRefresh(): debounced, and never during a scroll (fix round 1, A-2: a body resize mid-scroll used
  // to re-measure every trigger under the reader's eyes; now it waits for the scroll to stop).
  let lastZoom = html.style.zoom, lastH = 0;
  new MutationObserver(() => { if (html.style.zoom !== lastZoom) { lastZoom = html.style.zoom; requestRefresh(180); } }).observe(html, { attributes: true, attributeFilter: ['style'] });
  if ('ResizeObserver' in window) new ResizeObserver(() => { const h = document.body.scrollHeight; if (Math.abs(h - lastH) > 2) { lastH = h; requestRefresh(180); } }).observe(document.body);
  // ScrollTrigger's own refresh on window 'load' could land mid-scroll; the kit refreshes once everything has settled.
  ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,resize' });

  let heroTl: gsap.core.Timeline | null = null;
  const intro = html.classList.contains('intro');
  const ptIn = html.classList.contains('pt-in');
  heroUncovered = !intro && !ptIn;
  // The header beat only runs under a cover (loader or curtain): built now, while the cover hides it.
  const chrome = gsap.timeline({ paused: true });
  if (intro || ptIn) introChrome(chrome);

  // Under the loader or the curtain the hero stays painted (CSS) so its photo and text count for LCP; its start states are
  // applied when the cover starts to lift, while the panel still hides the page.
  let heroBuilt = false;
  const buildHero = () => { if (heroBuilt) return; heroBuilt = true; heroTl = buildHeroTl(); };
  // Curtain: hide the hero at once, under the cover (the panel lifts without waiting for fonts); the timeline is built at the handoff.
  const hideHero = () => {
    const sec = document.querySelector('[data-m-section][data-m-hero]');
    if (sec) gsap.set($$('[data-t]', sec).filter(shown), { autoAlpha: 0 });
  };
  park();
  interceptLinks();

  let handed = false;
  const handoff = () => {
    if (handed) return; handed = true;
    if (!heroBuilt) { fontsIn().then(play); return; }
    play();
  };
  const play = () => {
    buildHero();
    // In-site navigation plays the header and hero 1.5x (United).
    if (ptIn) { chrome.timeScale(1.5); heroTl?.timeScale(1.5); }
    chrome.play();
    const hero = heroTl;
    // The header leads; the hero starts 0.25 s in (United: hero items from 0.25 s).
    if (hero) { if (chrome.duration() > 0.02) gsap.delayedCall(ptIn ? 0.17 : 0.25, () => { hero.play(); }); else hero.play(); }
    window.dispatchEvent(new CustomEvent('pbp:handoff'));
    // Everything below the hero is built right after the handoff, in idle slices (tweens and line splits up front, as
    // United does, so no layout work happens mid-scroll); then signatures, pointer, and the parallax in its own slice.
    const idle = (f: () => void, timeout: number) => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(f, { timeout }) : setTimeout(f, 200));
    buildRest(() => { signatures(); pointer(); requestRefresh(0); idle(() => { parallax(); requestRefresh(0); }, 600); });
  };
  // Arrived through an in-site link: the page starts covered and at the top (kit/curtain.ts reveal), the hero is hidden
  // under the cover, then the panel lifts. Otherwise the loader (first visit) or a plain start.
  if (html.classList.contains('pt-in') && document.querySelector('[data-pt]')) { hideHero(); reveal(handoff); }
  else runLoader(handoff, buildHero);
  // Fonts, images and the zoom change line breaks and positions: re-measure once they have all settled.
  settled().then(() => requestRefresh(0));
}

boot();

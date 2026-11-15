// Motion system (read MOTION.md first). One grammar for every page:
//   loader -> hero handoff, page curtain, 3-group section entrances, parallax depth, signature moments, Lenis smooth scroll.
// Everything here is progressive: without JS, or with prefers-reduced-motion, the page is complete and static.
// <html> classes are decided before first paint in Base.astro: .motion (animate) | .no-motion, .intro (loader this visit),
// .pt-in (curtain is covering the page after an in-site click).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

declare global { interface Window { __pbpMotion?: boolean; __pbpLenis?: Lenis } }

const html = document.documentElement;
const MOTION = html.classList.contains('motion');
const FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
/* Timing grammar, round 3 (MOTION.md section 2). A section is revealed in THREE PRIORITY GROUPS, not one thing at a time:
 *   G1 headline + lead/body + main photo / main card      (starts at 0)
 *   G2 eyebrow, pills, buttons, chips, captions, patches, small cards, list rows, snapshots   (starts GROUP_GAP later)
 *   G3 seals, stamps, script flourishes, underlines, swooshes, counters, decorative shapes   (GROUP_GAP after G2)
 * Items of one group move together (DOM order, ITEM_GAP apart, capped); lists/grids inside a group stagger by at most
 * SIB_GAP. A band is fully revealed ~0.9-1.1 s after it triggers, and it triggers as it ENTERS the viewport. */
const EASE = 'power3.out';          // every entrance
const SOFT = 'power2.out';          // opacity-only fades
const ACCENT = 'back.out(1.3)';     // G3 seals/stamps only: a small settle, never a bounce
const GROUP_GAP = 0.18;             // G1 -> G2 -> G3 start offsets (hero: HERO_GAP)
const HERO_GAP = 0.24;
const ITEM_GAP = 0.05;              // items of one group, DOM order
const ITEM_SPAN = 0.15;             // ...never more than this in total
const LINE_GAP = 0.06;              // headline lines
const SIB_GAP = 0.05;               // children of one data-stagger group (cards, chips, rows)
const SIB_SPAN = 0.25;              // a group's whole stagger never spans longer than this
const DUR = { slide: 0.55, lines: 0.7, rise: 0.6, media: 0.75, nudge: 0.7, fade: 0.6, frame: 0.85, toss: 0.65, pop: 0.5, spin: 0.6, write: 0.6 };
const DEFAULT_FX: Record<string, string> = { '1': 'slide', '2': 'lines', '3': 'rise', '4': 'rise', '5': 'pop' };
const START = 'top 105%';           // a band plays as its first element reaches the viewport edge (5 % early: MOTION.md 2)

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel) as NodeListOf<any>) as T[];
const shown = (el: Element) => el.getClientRects().length > 0 || getComputedStyle(el).display === 'contents';

/* ------------------------------------------------------------------ entrances */

/** True on a plain load (no loader, no curtain): the hero paints uncovered, so its photo must not be hidden (LCP). */
let heroUncovered = false;

/** One effect on one target. Every tween is a from()/immediateRender so the start state is applied the moment it is built.
 *  Effects write transform/opacity/clip-path only (never the CSS `translate` property: that one belongs to parallax) and
 *  always end exactly on the element's resting CSS state, so clearing the inline values afterwards changes nothing. */
function effect(t: HTMLElement, fx: string, tier: string, i = 0): gsap.core.Timeline {
  const tl = gsap.timeline();
  switch (fx) {
    case 'lines': {
      const hl = $$('.hl', t);
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
        tl.from(inner, { yPercent: 105, duration: DUR.lines, ease: EASE, stagger: LINE_GAP, immediateRender: true }, 0);
        tl.add(() => hl.forEach((line, k) => { line.classList.remove('m-line'); while (inner[k].firstChild) line.insertBefore(inner[k].firstChild!, inner[k]); inner[k].remove(); }));
      } else {
        // Split now (fonts are in before a band builds, so these are the real lines); revert when done.
        const split = SplitText.create(t, { type: 'lines', mask: 'lines', linesClass: 'm-l' });
        tl.set(t, { autoAlpha: 1 });
        tl.from(split.lines, { yPercent: 105, duration: DUR.lines, ease: EASE, stagger: LINE_GAP, immediateRender: true }, 0);
        tl.add(() => split.revert());
      }
      break;
    }
    case 'slide': tl.from(t, { x: -16, autoAlpha: 0, duration: DUR.slide, ease: EASE, immediateRender: true }); break;
    // LCP-safe on a plain load: moves but never hides (the hero's biggest text block must paint early). Under the loader or
    // the curtain it has already painted (LCP is taken), so it fades in with its group.
    case 'nudge': tl.from(t, { y: 16, ...(heroUncovered ? {} : { autoAlpha: 0 }), duration: DUR.nudge, ease: EASE, immediateRender: true }); break;
    case 'fade': tl.from(t, { autoAlpha: 0, duration: DUR.fade, ease: SOFT, immediateRender: true }); break;
    case 'frame': {
      // The frame (border ring, shadow, tint) rises in while its photo opens from a rounded inset and settles from 1.04.
      // The photo is written through the individual CSS `scale` property (by hand: GSAP's `scale` would rewrite `transform`
      // and wipe a CSS transform on the img), so it multiplies with, never replaces, the img's own CSS. It ends at scale 1
      // and clip inset(0) on the img itself, both "no change", so removing them afterwards moves nothing.
      const img = t.querySelector('img');
      if (heroUncovered && t.closest('[data-m-hero]')) { tl.set(t, { autoAlpha: 1 }); break; } // plain load: the LCP photo stays put
      // fromTo: a below-the-fold frame is pre-hidden inline (sections()), so a from() would tween 0 -> 0.
      tl.fromTo(t, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: DUR.media * 0.8, ease: EASE, immediateRender: true, clearProps: t.hasAttribute('data-px') ? 'opacity,visibility' : 'transform,opacity,visibility' }, 0);
      if (img) {
        const p = { k: 0 };
        const paint = () => {
          const k = p.k, i = 6 * (1 - k), r = 20 * (1 - k);
          img.style.clipPath = `inset(${i.toFixed(3)}% round ${r.toFixed(2)}px)`;
          img.style.scale = String(1 + 0.04 * (1 - k));
        };
        paint();
        tl.to(p, { k: 1, duration: DUR.frame, ease: EASE, onUpdate: paint, onComplete: () => { img.style.clipPath = ''; img.style.scale = ''; } }, 0);
      }
      break;
    }
    case 'toss': {
      // Tilted snapshots: settle into their CSS tilt from a few degrees off, alternating sides. No overshoot.
      tl.from(t, { y: 24, rotation: i % 2 ? '-=4' : '+=4', autoAlpha: 0, duration: DUR.toss, ease: EASE, immediateRender: true });
      break;
    }
    case 'pop': tl.from(t, { scale: 0.75, rotation: '-=6', autoAlpha: 0, duration: DUR.pop, ease: ACCENT, immediateRender: true }); break;
    case 'spin': tl.from(t, { scale: 0.8, rotation: '-=60', autoAlpha: 0, duration: DUR.spin, ease: EASE, immediateRender: true }); break;
    case 'write': tl.fromTo(t, { clipPath: 'inset(-20% 100% -20% -5%)', autoAlpha: 1 }, { clipPath: 'inset(-20% -5% -20% -5%)', duration: DUR.write, ease: 'power2.inOut', immediateRender: true, clearProps: 'clipPath' }); break;
    case 'float': // retired: no loops in the eye line. Behaves like rise.
    case 'rise':
    default: {
      const media = tier === '4';
      tl.from(t, { y: media ? 28 : 20, autoAlpha: 0, duration: media ? DUR.media : DUR.rise, ease: EASE, immediateRender: true });
    }
  }
  return tl;
}

/** Build the entrance of one [data-t] element (or of its children, with data-stagger). Returns a timeline positioned at 0. */
function entrance(el: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();
  const tier = el.dataset.t || '3';
  const fx = el.dataset.fx || DEFAULT_FX[tier];
  const stagger = el.hasAttribute('data-stagger');
  // Staggered groups animate their rendered children; a child with its own data-t keeps its own tier (skipped here),
  // a child with its own data-fx (a frame photo in a bento) uses that effect inside the group's stagger.
  const kids = stagger ? (Array.from(el.children) as HTMLElement[]).filter((c) => !c.hasAttribute('data-t') && shown(c)) : [el];
  if (stagger) gsap.set(el, { autoAlpha: 1 });
  // A CSS `transition: transform` (buttons, patches, cards) fights GSAP's per-frame writes: off while the entrance runs.
  const moved = Array.from(new Set<Element>([el, ...kids]));
  gsap.set(moved, { transition: 'none' });
  const gap = kids.length > 1 ? Math.min(SIB_GAP, SIB_SPAN / (kids.length - 1)) : 0;
  kids.forEach((k, i) => tl.add(effect(k, (stagger && k.dataset.fx) || fx, tier, i), i * gap));
  tl.add(() => { gsap.set(moved, { clearProps: 'transition' }); });
  return tl;
}

/* ------------------------------------------------------------------ the three priority groups */

/** Seals, stamps, medals, number stickers: decorative accents (G3). */
const ACCENT_SEL = '.seal, .stamp, .medal, .nst';
/** Empty decorative shapes (a colour block behind a photo): no text, no media. */
const isShape = (el: HTMLElement) => !el.textContent?.trim() && !el.querySelector('img, svg, video, iframe, picture, input, select, textarea');
/** A caption / footnote block (small print under a photo or a grid), not body copy. */
const isCaption = (el: HTMLElement) => el.matches('.caption, .label, figcaption') || (!!el.querySelector(':scope > .caption') && !el.querySelector('p.body, p.lead, h2, h3'));
const isCta = (el: HTMLElement) => el.classList.contains('btn') || (!!el.querySelector('.btn') && !el.matches('p, h1, h2, h3, h4'));

/** Which priority group an element belongs to (1, 2 or 3). `data-g="1|2|3"` on the element overrides the mapping. */
function groupOf(el: HTMLElement): 1 | 2 | 3 {
  const g = el.dataset.g;
  if (g === '1' || g === '2' || g === '3') return Number(g) as 1 | 2 | 3;
  const t = el.dataset.t || '3';
  const fx = el.dataset.fx || DEFAULT_FX[t];
  const stagger = el.hasAttribute('data-stagger');
  if (fx === 'spin' || fx === 'write' || el.matches(ACCENT_SEL) || isShape(el)) return 3;
  if (t === '5') return el.matches('.script') && !stagger ? 3 : 2;   // script flourish = G3; chips, captions, patches, pills = G2
  if (t === '1') return 2;                                          // eyebrow, rating pill, breadcrumbs
  if (t === '2') return 1;                                          // headline
  if (t === '3') return stagger || isCta(el) || isCaption(el) ? 2 : 1; // lead/body = G1; buttons, lists, captions = G2
  // Tier 4: the main photo / main card is G1; secondary snapshots and small cards/rows are G2.
  if (fx === 'toss') return 2;
  if (stagger) {
    const kids = (Array.from(el.children) as HTMLElement[]).filter((c) => !c.hasAttribute('data-t') && shown(c));
    const avg = kids.reduce((s, c) => s + c.getBoundingClientRect().height, 0) / Math.max(1, kids.length);
    return avg >= 160 || kids.some((c) => c.dataset.fx === 'frame') ? 1 : 2;
  }
  return el.getBoundingClientRect().height >= 120 ? 1 : 2;
}

/** A band's elements as one timeline: three groups, each starting `gap` after the previous non-empty group started.
 *  Inside a group items start ITEM_GAP apart in DOM order (capped at ITEM_SPAN). `extra` adds G3 tweens (underlines). */
function choreograph(els: HTMLElement[], gap = GROUP_GAP, extra: (tl: gsap.core.Timeline, at: number) => void = () => {}): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });
  built.push(tl);
  const groups: HTMLElement[][] = [[], [], []];
  els.forEach((el) => groups[groupOf(el) - 1].push(el));
  let at = 0, started = false;
  groups.forEach((g, gi) => {
    const hasExtra = gi === 2;
    if (!g.length && !hasExtra) return;
    if (started) at += gap;
    started = started || g.length > 0;
    const step = g.length > 1 ? Math.min(ITEM_GAP, ITEM_SPAN / (g.length - 1)) : 0;
    g.forEach((el, k) => tl.add(entrance(el), at + k * step));
    if (hasExtra) extra(tl, at);
  });
  return tl;
}

/* Keyboard users get the finished page (QA round 2). Pre-hidden content is opacity 0 but focusable: Tab focused an
 * invisible link, the scroll fired its band, the entrance set visibility: hidden and focus fell to <body>. The first Tab,
 * or focus landing on content that is not revealed yet, ends every entrance at once and stops the rest. */
const built: gsap.core.Timeline[] = [];
const bandSTs: ScrollTrigger[] = [];
let kbd = false;
function keyboardRelease() {
  if (kbd) return; kbd = true;
  bandSTs.forEach((st) => st.kill());
  built.forEach((tl) => tl.progress(1));
  $$('[data-m-section] [data-t]').forEach((el) => el.classList.add('m-built'));
  gsap.set($$('[data-m-section] [data-fx="frame"]'), { autoAlpha: 1 });
}

/* Fast scrolling never shows empty space (round 3). Three guards:
 * 1. a band plays the moment it enters (START), never waits for another band, never waits for photos to decode;
 * 2. a band that only triggers when it is already well up the screen or past it (anchor jump, fling, a reload mid-page)
 *    plays 2.5-5x faster, or is set to its end state at once if it has already left the viewport;
 * 3. while bands are playing, a fast scroll (Lenis velocity) speeds every running band up to 5x; a fling (>= FLING px per
 *    frame) finishes them at once, and a band that triggers during a fling appears finished. */
const playing = new Set<gsap.core.Timeline>();
let scrollV = 0; // |Lenis velocity| in px per frame, updated on every Lenis scroll
const FLING = 45; // px per frame (~2700 px/s at 60 Hz): a fling, not reading
const boostFor = (v: number) => (v > 20 ? Math.min(5, v / 10) : 1);
function playBand(tl: gsap.core.Timeline, first: Element, last: Element) {
  const vh = window.innerHeight;
  const top = first.getBoundingClientRect().top;
  if (last.getBoundingClientRect().bottom < 0) { tl.progress(1); return; } // already passed: show it finished
  if (scrollV >= FLING) { tl.progress(1); return; }                     // a fling: no animation, just the content
  let speed = boostFor(scrollV);
  if (top < vh * 0.55) speed = Math.max(speed, 2.5);
  tl.timeScale(speed);
  playing.add(tl);
  tl.eventCallback('onComplete', () => { playing.delete(tl); });
  tl.play();
}
function onScrollVelocity(v: number) {
  scrollV = Math.abs(v);
  const b = boostFor(scrollV);
  if (scrollV >= FLING) { playing.forEach((tl) => tl.progress(1)); return; }
  if (b > 1) playing.forEach((tl) => { if (tl.timeScale() < b) tl.timeScale(b); });
}

const pageTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY;
const fontsIn = () => (document.fonts && document.fonts.status !== 'loaded'
  ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 700))]) : Promise.resolve());

/** Build section entrances. `only` = 'hero' (the handoff section, built at once) or 'rest' (wired when the main thread is idle).
 *  Elements stay pre-hidden by CSS until they get .m-built; a band's tweens are built only when it scrolls in (cheap setup),
 *  and .m-built is added in the same task as the tweens, so nothing flashes. */
function sections(only: 'hero' | 'rest', heroPlay: (tl: gsap.core.Timeline) => void = () => {}) {
  const vh = window.innerHeight;
  // Read phase first (all measurements), then the write phase: no layout thrash on slow phones.
  const plans = $$('[data-m-section]').filter((sec) => sec.hasAttribute('data-m-hero') === (only === 'hero')).map((sec) => {
    const els = $$('[data-t]', sec).filter(shown);
    const tops = new Map<HTMLElement, number>(els.map((el) => [el, pageTop(el)]));
    const frames = els.filter((el) => el.dataset.fx === 'frame' || (el.hasAttribute('data-stagger') && el.querySelector(':scope > [data-fx="frame"]')));
    const inView = new Set(frames.filter((el) => el.getBoundingClientRect().top < vh));
    return { sec, els, tops, top: pageTop(sec), draws: $$<SVGPathElement>('[data-draw]', sec), frames, inView };
  });
  plans.forEach(({ sec, els, tops, top, draws, frames, inView }) => {
    // Elements not rendered right now (other breakpoint) are released at once: they never animate.
    $$('[data-t]', sec).forEach((el) => { if (!tops.has(el)) el.classList.add('m-built'); });
    if (draws.length) gsap.set(draws, { drawSVG: '0%' });
    if (sec.hasAttribute('data-m-hero')) {
      els.forEach((el) => el.classList.add('m-built'));
      // G3 of the hero: the stripe underline draws and the swoosh ribbons run along the bottom edge, with the seals.
      const sw = $$<SVGElement>('svg[data-swoosh]', sec);
      const tl = choreograph(els, HERO_GAP, (t, at) => {
        if (draws.length) t.to(draws, { drawSVG: '100%', duration: 0.7, ease: 'power2.inOut', stagger: 0.06 }, at);
        sw.forEach((svg) => { svg.dataset.mDone = '1'; t.add(swooshIn(svg, 0.8), at + 0.05); });
      });
      heroPlay(tl);
      return;
    }
    // Frames are not pre-hidden by CSS (LCP rule). One already on screen when we wire (a reload mid-page) is left as it is;
    // the rest take their start state now, while they are still below the fold, so nothing flashes when they play.
    frames.forEach((f) => { if (inView.has(f)) f.dataset.mStatic = '1'; });
    // Long sections: elements more than ~0.7 viewport below the section top get their own band and trigger, so a photo at
    // the bottom of a tall section reveals as IT enters, not while it is still off screen.
    const bands = new Map<number, HTMLElement[]>();
    els.forEach((el) => {
      const b = Math.max(0, Math.floor((tops.get(el)! - top) / (vh * 0.7)));
      if (!bands.has(b)) bands.set(b, []);
      bands.get(b)!.push(el);
    });
    const bandList = [...bands.entries()].sort((a, b) => a[0] - b[0]);
    bandList.forEach(([, group], bi) => {
      const live = group.filter((el) => !el.dataset.mStatic);
      group.forEach((el) => { if (el.dataset.mStatic) el.classList.add('m-built'); });
      if (!live.length) return;
      // Hide this band's frames now (they are below the fold): built tweens re-apply the same start state.
      live.filter((el) => frames.includes(el)).forEach((f) => gsap.set(f.dataset.fx === 'frame' ? f : f.querySelectorAll(':scope > [data-fx="frame"]'), { autoAlpha: 0 }));
      const first = live.reduce((a, b) => (tops.get(a)! <= tops.get(b)! ? a : b));
      const last = live.reduce((a, b) => (tops.get(a)! + a.offsetHeight >= tops.get(b)! + b.offsetHeight ? a : b));
      // The section's underlines draw with the first band's G3.
      const bandDraws = bi === 0 ? draws : [];
      bandSTs.push(ScrollTrigger.create({ trigger: first, start: START, once: true, onEnter: () => {
        const go = () => {
          if (kbd) return; // released for the keyboard meanwhile
          live.forEach((el) => el.classList.add('m-built'));
          const tl = choreograph(live, GROUP_GAP, (t, at) => { if (bandDraws.length) t.to(bandDraws, { drawSVG: '100%', duration: 0.7, ease: 'power2.inOut', stagger: 0.06 }, at); });
          playBand(tl, first, last);
        };
        // Fonts are virtually always in by now; if not, wait for them (max 0.7 s) so a split headline gets its real lines.
        if (!document.fonts || document.fonts.status === 'loaded') go(); else fontsIn().then(go);
      } }));
    });
    // Underlines outside the first band of their section draw on their own as they enter.
    draws.forEach((p) => {
      const svg = p.closest('svg') ?? p;
      if (pageTop(svg) - top < vh * 0.7) return;
      ScrollTrigger.create({ trigger: svg, start: START, once: true, onEnter: () => gsap.to(p, { drawSVG: '100%', duration: 0.7, delay: 0.3, ease: 'power2.inOut' }) });
    });
  });
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
        onToggle: (st) => { el.style.willChange = st.isActive ? 'transform' : ''; },
      } });
    });
    pxItems.push(...items);
    return () => { items.forEach((it) => { it.clear?.(); it.el.style.willChange = ''; it.el.removeAttribute('data-px'); pxItems.splice(pxItems.indexOf(it), 1); }); };
  });
  // Triggers are measured without the drift (it would shift every start point by up to the range), then repainted.
  ScrollTrigger.addEventListener('refreshInit', () => pxItems.forEach((it) => it.clear?.()));
  ScrollTrigger.addEventListener('refresh', () => pxItems.forEach((it) => it.paint?.()));
}

/* ------------------------------------------------------------------ signature moments */

function signatures() {
  // Counters (G3): count up from zero once, as they enter. A counter already past (fast scroll) shows its value at once.
  $$('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count || '0');
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const o = { v: 0 };
    el.textContent = (0).toFixed(dec);
    ScrollTrigger.create({ trigger: el, start: START, once: true, onEnter: () => {
      if (el.getBoundingClientRect().bottom < 0) { el.textContent = end.toFixed(dec); return; }
      const tw = gsap.to(o, { v: end, duration: 1.2, delay: 0.35, ease: 'expo.out', onUpdate: () => { el.textContent = o.v.toFixed(dec); } });
      if (boostFor(scrollV) > 1) tw.timeScale(boostFor(scrollV));
    } });
  });
  // Water meter (G3): each drum rolls up to its digit, last drum longest (it spins past 9 once).
  $$('[data-meter]').forEach((m) => {
    const reels = $$('.reel', m);
    reels.forEach((r) => r.style.setProperty('--n', '0'));
    ScrollTrigger.create({ trigger: m, start: START, once: true, onEnter: () => reels.forEach((r, i) => {
      const o = { n: 0 }; const d = parseInt(r.dataset.digit || '0', 10);
      gsap.to(o, { n: d, duration: 0.9 + i * 0.15, ease: 'power3.out', delay: 0.3, onUpdate: () => r.style.setProperty('--n', String(o.n)) });
    }) });
  });
  // Swoosh edges (outside the hero, which runs its own as G3): ribbons run in once, as they enter.
  $$<SVGElement>('svg[data-swoosh]').forEach((svg) => {
    if (svg.dataset.mDone) return;
    const tl = swooshIn(svg).pause();
    ScrollTrigger.create({ trigger: svg, start: START, once: true, onEnter: () => { if (svg.getBoundingClientRect().bottom < 0) tl.progress(1); else tl.play(); } });
  });
  // Flow lines stay static in themselves (the old endless dash drift was retired); they take part in the parallax.
  // Map: the county outline draws, the truck route flows.
  $$('[data-draw-map]').forEach((p) => gsap.fromTo(p, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.4, ease: 'power2.inOut', scrollTrigger: { trigger: p.closest('svg'), start: 'top 95%', once: true } }));
  // The dashed truck route flows once after the outline has drawn, then rests (no endless loop).
  $$('[data-route]').forEach((p) => gsap.to(p, { strokeDashoffset: -112, duration: 2, ease: 'power1.inOut', delay: 1.1, scrollTrigger: { trigger: p.closest('svg'), start: 'top 95%', once: true } }));
  // Process pipe: the water follows the scroll. Horizontal on desktop, down the left on mobile.
  const mm = gsap.matchMedia();
  $$('[data-pipe]').forEach((pipe) => {
    const sec = pipe.closest('section') ?? pipe;
    const run = pipe.querySelector('[data-pipe-fill]'); const v = pipe.querySelector('[data-pipe-fill-v]');
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 70%', end: 'bottom 75%', scrub: 0.6 } });
      if (run) tl.fromTo(run, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 0.85 });
      if (v) tl.fromTo(v, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 0.15 });
    });
    mm.add('(max-width: 1023px)', () => {
      if (run) gsap.fromTo(run, { scaleY: 0, scaleX: 1 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 60%', end: 'bottom 70%', scrub: 0.6 } });
    });
  });
  // Marquee: the second track trails the first; period = one copy. Scroll velocity nudges the speed, then it eases back.
  $$('[data-marquee]').forEach((clip) => {
    const tracks = $$('.tb-track, [data-marquee-track]', clip);
    if (tracks.length < 2) return;
    let period = tracks[1].offsetWidth; let x = 0; let boost = 0; let on = false;
    const speed = 38; // px per second at rest
    window.addEventListener('resize', () => { period = tracks[1].offsetWidth; });
    ScrollTrigger.create({ trigger: clip, start: 'top bottom', end: 'bottom top', onToggle: (s) => { on = s.isActive; }, onUpdate: (s) => { boost = Math.min(6, Math.abs(s.getVelocity()) / 300); } });
    gsap.ticker.add((_, dt) => {
      if (!on || !period) return;
      boost *= 0.94;
      x -= (speed * (1 + boost) * dt) / 1000;
      if (-x >= period) x += period;
      tracks.forEach((t) => { t.style.transform = `translate3d(${x}px,0,0)`; });
    });
  });
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

function introChrome(tl: gsap.core.Timeline) {
  const bar = document.querySelector('[data-intro="topbar"]');
  const brand = document.querySelector('[data-intro="brand"]');
  if (bar) tl.from(bar, { autoAlpha: 0, duration: 0.5, ease: SOFT }, 0);
  if (brand) tl.from(brand, { yPercent: -100, duration: 0.7, ease: EASE }, 0.1);
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
      try { sessionStorage.setItem('pbp-intro', '1'); } catch (e) { /* storage blocked: loader may show again next visit */ }
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

function runCurtainIn(onHandoff: () => void, onLift: () => void = () => {}) {
  const pt = document.querySelector<HTMLElement>('[data-pt]');
  if (!pt || !html.classList.contains('pt-in')) return false;
  const panel = pt.querySelector<HTMLElement>('.pt-panel')!;
  const edge = pt.querySelector<SVGElement>('.pt-edge');
  // The fonts are cached from the previous page; wait for them (max 0.7 s) so the hero headline splits on its real lines.
  fontsIn().then(() => {
    onLift();
    const h = panel.offsetHeight + ((edge as any)?.clientHeight || 120) + 8; // layout px (see runLoader)
    gsap.timeline({ delay: 0.05, onComplete: () => { html.classList.remove('pt-in'); gsap.set(panel, { clearProps: 'transform' }); } })
      .to(pt.querySelector('.pt-mark'), { autoAlpha: 0, y: 20, duration: 0.3, ease: 'power2.in' })
      .to(panel, { y: h, duration: 0.9, ease: 'power3.inOut' }, 0.1)
      .add(onHandoff, 0.38);
  });
  return true;
}

function curtainOut() {
  const pt = document.querySelector<HTMLElement>('[data-pt]');
  if (!pt) return;
  const panel = pt.querySelector<HTMLElement>('.pt-panel')!;
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download') || a.dataset.noCurtain !== undefined) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // same page / hash
    e.preventDefault();
    try { sessionStorage.setItem('pbp-nav', '1'); } catch (err) { /* no storage: the next page simply shows without the lift */ }
    pt.classList.add('is-on');
    const markEl = pt.querySelector('.pt-mark');
    gsap.timeline({ onComplete: () => { location.href = url.href; } })
      .fromTo(panel, { yPercent: 105 }, { yPercent: 0, duration: 0.65, ease: 'power3.inOut' })
      .fromTo(markEl, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: EASE }, 0.4);
  });
  // Back/forward cache restore: never leave the curtain down.
  window.addEventListener('pageshow', (ev) => { if (ev.persisted) { pt.classList.remove('is-on'); gsap.set(panel, { clearProps: 'all' }); } });
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

  // Lenis = United's settings with a slightly softer glide (lerp 0.085 vs United's 0.1, Nick round 3: "softer scroll"),
  // wheelMultiplier 1, smooth wheel, native touch. Lenis lerp is frame-rate independent (damp), so it feels the same at
  // 60 and 120 Hz. One clock: Lenis is driven by the GSAP ticker and
  // ScrollTrigger updates on every Lenis scroll, so no scrollerProxy is needed (Lenis scrolls the real window).
  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, anchors: { offset: -96 * (parseFloat(document.documentElement.style.zoom) || 1) }, autoRaf: false });
  window.__pbpLenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  lenis.on('scroll', (l: Lenis) => onScrollVelocity(l.velocity));
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // Re-measure when the page geometry changes without a window resize: the wide-screen zoom on <html> (Base.astro sets
  // style.zoom, also from a ResizeObserver when the scrollbar comes or goes) and content height changes (accordions,
  // late images, the mobile menu). Debounced so a burst of changes costs one refresh.
  let rt = 0, lastZoom = html.style.zoom, lastH = 0;
  const remeasure = () => { clearTimeout(rt); rt = window.setTimeout(() => { lenis.resize(); ScrollTrigger.refresh(); }, 180); };
  new MutationObserver(() => { if (html.style.zoom !== lastZoom) { lastZoom = html.style.zoom; remeasure(); } }).observe(html, { attributes: true, attributeFilter: ['style'] });
  if ('ResizeObserver' in window) new ResizeObserver(() => { const h = document.body.scrollHeight; if (Math.abs(h - lastH) > 2) { lastH = h; remeasure(); } }).observe(document.body);

  let heroTl: gsap.core.Timeline | null = null;
  const chrome = gsap.timeline({ paused: true });
  const intro = html.classList.contains('intro');
  if (intro) introChrome(chrome);
  heroUncovered = !intro && !html.classList.contains('pt-in');

  // Under the loader or the curtain the hero stays visible (CSS) so its photo and text paint early for LCP;
  // its pre-states are applied only when the cover starts to lift, while the panel still hides the page.
  let heroBuilt = false;
  const buildHero = () => { if (heroBuilt) return; heroBuilt = true; sections('hero', (tl) => { heroTl = tl; }); };
  curtainOut();
  // Everything below the fold is wired when the main thread is free, so it does not compete with the first paint.
  // Parallax is wired in its own idle slice after that, so neither setup is one long task (Lighthouse TBT).
  const idle = (f: () => void, timeout: number) => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(f, { timeout }) : setTimeout(f, 200));
  const rest = () => { sections('rest'); signatures(); pointer(); ScrollTrigger.refresh(); idle(() => { parallax(); ScrollTrigger.refresh(); }, 600); };
  idle(rest, 600);

  let handed = false;
  // A plain load builds the hero here, once the fonts are in (max 0.7 s), so a split headline gets its real lines.
  const handoff = () => {
    if (handed) return; handed = true;
    if (!heroBuilt) { fontsIn().then(play); return; }
    play();
  };
  const play = () => {
    buildHero();
    chrome.play();
    // The header settles first; the hero groups start as it is ~40 % done (whole hero ~1.5 s after the handoff).
    const hero = heroTl;
    if (hero) { const d = chrome.duration() * 0.4; if (d > 0.02) gsap.delayedCall(d, () => { hero.play(); }); else hero.play(); }
    window.dispatchEvent(new CustomEvent('pbp:handoff'));
  };
  if (!runCurtainIn(handoff, buildHero)) runLoader(handoff, buildHero);
  // Fonts change line breaks: re-measure triggers once they are in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

boot();

// Motion system (read MOTION.md first). One grammar for every page:
//   loader -> hero handoff, page curtain, 5-tier section entrances, signature moments, Lenis smooth scroll.
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
/* Timing grammar (MOTION.md section 0 has the measurements it comes from). ONE THING AT A TIME: a section is a sequence of
 * steps (eyebrow -> headline -> body -> CTAs -> media -> accents). A step starts when the previous one is 70 % through its
 * duration (OVERLAP 0.3); with power3.out that is ~97 % of the way there visually, so the eye has already left it. */
const EASE = 'power3.out';          // every entrance
const SOFT = 'power2.out';          // opacity-only fades
const ACCENT = 'back.out(1.3)';     // tier-5 accents only: a small settle, never a bounce
const OVERLAP = 0.3;                // max share of a step that the next step may overlap
const LINE_GAP = 0.12;              // headline lines (two26: 0.12)
const SIB_GAP = 0.12;               // children of one data-stagger group (cards, chips)
const SIB_SPAN = 0.84;              // a group's whole stagger never spans longer than this
const DUR = { slide: 0.6, lines: 0.8, rise: 0.7, media: 0.9, nudge: 0.8, fade: 0.8, frame: 1.1, toss: 0.8, pop: 0.55, spin: 0.8, write: 0.9 };
const DEFAULT_FX: Record<string, string> = { '1': 'slide', '2': 'lines', '3': 'rise', '4': 'rise', '5': 'pop' };

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel) as NodeListOf<any>) as T[];
const shown = (el: Element) => el.getClientRects().length > 0 || getComputedStyle(el).display === 'contents';

/* ------------------------------------------------------------------ entrances */

/** True on a plain load (no loader, no curtain): the hero paints uncovered, so its photo must not be hidden (LCP). */
let heroUncovered = false;

/** One effect on one target. Every tween is a from()/immediateRender so the start state is applied the moment it is built.
 *  Effects animate transform/opacity/clip-path only and always end exactly on the element's resting CSS state, so clearing
 *  the inline values afterwards changes nothing on screen (the round-1 glitch was a clear that did). */
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
        // Split now (the band waits for fonts before building, so these are the real lines); revert when done.
        const split = SplitText.create(t, { type: 'lines', mask: 'lines', linesClass: 'm-l' });
        tl.set(t, { autoAlpha: 1 });
        tl.from(split.lines, { yPercent: 105, duration: DUR.lines, ease: EASE, stagger: LINE_GAP, immediateRender: true }, 0);
        tl.add(() => split.revert());
      }
      break;
    }
    case 'slide': tl.from(t, { x: -16, autoAlpha: 0, duration: DUR.slide, ease: EASE, immediateRender: true }); break;
    // LCP-safe on a plain load: moves but never hides (the hero's biggest text block must paint early). Under the loader or
    // the curtain it has already painted (LCP is taken), so it fades in on its turn instead of sitting there before the headline.
    case 'nudge': tl.from(t, { y: 16, ...(heroUncovered ? {} : { autoAlpha: 0 }), duration: DUR.nudge, ease: EASE, immediateRender: true }); break;
    case 'fade': tl.from(t, { autoAlpha: 0, duration: DUR.fade, ease: SOFT, immediateRender: true }); break;
    case 'frame': {
      // The frame (border ring, shadow, tint) rises in while its photo opens from a rounded inset and settles from 1.06.
      // The photo is written through the individual CSS `scale` property (by hand: GSAP's `scale` would rewrite `transform`
      // and wipe a CSS transform on the img), so it multiplies with, never replaces, the img's own CSS. It ends at scale 1
      // and clip inset(0) on the img itself, both "no change", so removing them afterwards moves nothing.
      const img = t.querySelector('img');
      if (heroUncovered && t.closest('[data-m-hero]')) { tl.set(t, { autoAlpha: 1 }); break; } // plain load: the LCP photo stays put
      // fromTo: a below-the-fold frame is pre-hidden inline (sections()), so a from() would tween 0 -> 0.
      tl.fromTo(t, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: DUR.media * 0.8, ease: EASE, immediateRender: true, clearProps: 'transform,opacity,visibility' }, 0);
      if (img) {
        const p = { k: 0 };
        const paint = () => {
          const k = p.k, i = 9 * (1 - k), r = 24 * (1 - k);
          img.style.clipPath = `inset(${i.toFixed(3)}% round ${r.toFixed(2)}px)`;
          img.style.scale = String(1 + 0.06 * (1 - k));
        };
        paint();
        tl.to(p, { k: 1, duration: DUR.frame, ease: EASE, onUpdate: paint, onComplete: () => { img.style.clipPath = ''; img.style.scale = ''; } }, 0.05);
      }
      break;
    }
    case 'toss': {
      // Tilted snapshots: settle into their CSS tilt from a few degrees off, alternating sides. No overshoot.
      tl.from(t, { y: 36, rotation: i % 2 ? '-=5' : '+=5', autoAlpha: 0, duration: DUR.toss, ease: EASE, immediateRender: true });
      break;
    }
    case 'pop': tl.from(t, { scale: 0.72, rotation: '-=8', autoAlpha: 0, duration: DUR.pop, ease: ACCENT, immediateRender: true }); break;
    case 'spin': tl.from(t, { scale: 0.8, rotation: '-=90', autoAlpha: 0, duration: DUR.spin, ease: EASE, immediateRender: true }); break;
    case 'write': tl.fromTo(t, { clipPath: 'inset(-20% 100% -20% -5%)', autoAlpha: 1 }, { clipPath: 'inset(-20% -5% -20% -5%)', duration: DUR.write, ease: 'power2.inOut', immediateRender: true, clearProps: 'clipPath' }); break;
    case 'float': // retired: no loops in the eye line. Behaves like rise.
    case 'rise':
    default: {
      const media = tier === '4';
      tl.from(t, { y: media ? 40 : 24, autoAlpha: 0, duration: media ? DUR.media : DUR.rise, ease: EASE, immediateRender: true });
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

/** What "one step" is: the tier, with CTAs (anything holding a .btn) split from body text so they get their own beat. */
const stepOf = (el: HTMLElement) => {
  const t = el.dataset.t || '3';
  const cta = t === '3' && (el.classList.contains('btn') || (!!el.querySelector('.btn') && !el.matches('p, h1, h2, h3, h4')));
  return cta ? '3c' : t;
};
const STEP_ORDER = ['1', '2', '3', '3c', '4', '5'];

/** A section's elements as one sequence: tier order (CTAs after body), DOM order inside a tier. Different steps run one
 *  after another (overlap <= OVERLAP); siblings of the same step follow at a gap that scales with their size. */
function choreograph(els: HTMLElement[]): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });
  const ordered = els.map((el, i) => ({ el, i, s: STEP_ORDER.indexOf(stepOf(el)) })).sort((a, b) => a.s - b.s || a.i - b.i);
  let step = -1, stepEnd = 0, prevStart = 0, prevDur = 0, prevGroup = false;
  ordered.forEach(({ el, s }) => {
    const e = entrance(el);
    const d = e.duration();
    let at: number;
    if (s !== step) { at = stepEnd; step = s; }
    // After a whole staggered group (a chip row, a card grid) the next sibling waits for the group, like a new step.
    else at = prevGroup ? prevStart + prevDur * (1 - OVERLAP) : prevStart + Math.min(0.4, Math.max(SIB_GAP, prevDur * 0.45));
    tl.add(e, at);
    prevStart = at; prevDur = d; prevGroup = el.hasAttribute('data-stagger');
    stepEnd = Math.max(stepEnd, at + d * (1 - OVERLAP));
  });
  return tl;
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
      const tl = choreograph(els);
      // Accents last: the stripe underline draws, then the swoosh ribbons run along the hero's bottom edge.
      if (draws.length) tl.to(draws, { drawSVG: '100%', duration: 0.8, ease: 'power2.inOut', stagger: 0.12 }, '>-0.25');
      const sw = $$<SVGElement>('svg[data-swoosh]', sec);
      sw.forEach((svg) => { svg.dataset.mDone = '1'; tl.add(swooshIn(svg), '>-0.3'); });
      // The hero carries the most steps of any section; it runs 1.2x so the whole sequence lands in ~3.8 s (ratios kept).
      tl.timeScale(1.2);
      heroPlay(tl);
      return;
    }
    // Frames are not pre-hidden by CSS (LCP rule). One already on screen when we wire (a reload mid-page) is left as it is;
    // the rest take their start state now, while they are still below the fold, so nothing flashes when they play.
    frames.forEach((f) => { if (inView.has(f)) f.dataset.mStatic = '1'; });
    // Long sections: elements more than ~0.8 viewport below the section top get their own band and trigger,
    // so a tier-4 photo at the bottom of a tall section does not animate while it is still off screen.
    const bands = new Map<number, HTMLElement[]>();
    els.forEach((el) => {
      const b = Math.max(0, Math.floor((tops.get(el)! - top) / (vh * 0.8)));
      if (!bands.has(b)) bands.set(b, []);
      bands.get(b)!.push(el);
    });
    bands.forEach((group) => {
      const live = group.filter((el) => !el.dataset.mStatic);
      group.forEach((el) => { if (el.dataset.mStatic) el.classList.add('m-built'); });
      if (!live.length) return;
      // Hide this band's frames now (they are below the fold): built tweens re-apply the same start state.
      live.filter((el) => frames.includes(el)).forEach((f) => gsap.set(f.dataset.fx === 'frame' ? f : f.querySelectorAll(':scope > [data-fx="frame"]'), { autoAlpha: 0 }));
      const first = live.reduce((a, b) => (tops.get(a)! <= tops.get(b)! ? a : b));
      ScrollTrigger.create({ trigger: first, start: 'top 88%', once: true, onEnter: () => {
        // Wait (briefly) for fonts and for this band's lazy photos to decode, so a photo never pops in mid-reveal.
        const imgs = live.flatMap((el) => $$<HTMLImageElement>('img', el)).filter((im) => !im.complete);
        const decoded = Promise.all(imgs.map((im) => im.decode().catch(() => {})));
        Promise.all([fontsIn(), Promise.race([decoded, new Promise((r) => setTimeout(r, 450))])]).then(() => {
          live.forEach((el) => el.classList.add('m-built'));
          const tl = choreograph(live);
          // Arrived late (an anchor jump or a fast fling put the band well up the screen): play it quicker, not slower.
          if (first.getBoundingClientRect().top < window.innerHeight * 0.35) tl.timeScale(2.2);
          tl.play();
        });
      } });
    });
    draws.forEach((p) => ScrollTrigger.create({ trigger: p.closest('svg') ?? p, start: 'top 85%', once: true, onEnter: () => gsap.to(p, { drawSVG: '100%', duration: 0.8, delay: 0.6, ease: 'power2.inOut' }) }));
  });
}

/** Swoosh edge: the three ribbons run in from the leading side, one after another. */
function swooshIn(svg: SVGElement): gsap.core.Timeline {
  const flip = svg.getAttribute('class')?.includes('flip');
  const tl = gsap.timeline();
  tl.fromTo($$('.sw-b', svg), { clipPath: flip ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0%)', duration: 1.1, ease: 'power3.inOut', stagger: 0.14, immediateRender: true });
  return tl;
}

/* ------------------------------------------------------------------ signature moments */

function signatures() {
  // Counters: count up from zero once, keeping the decimals the markup asks for.
  $$('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count || '0');
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const o = { v: 0 };
    el.textContent = (0).toFixed(dec);
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 1.8, ease: 'expo.out', onUpdate: () => { el.textContent = o.v.toFixed(dec); } }) });
  });
  // Water meter: each drum rolls up to its digit, last drum longest (it spins past 9 once).
  $$('[data-meter]').forEach((m) => {
    const reels = $$('.reel', m);
    reels.forEach((r) => r.style.setProperty('--n', '0'));
    ScrollTrigger.create({ trigger: m, start: 'top 95%', once: true, onEnter: () => reels.forEach((r, i) => {
      const o = { n: 0 }; const d = parseInt(r.dataset.digit || '0', 10);
      gsap.to(o, { n: d, duration: 1.4 + i * 0.35, ease: 'power3.out', delay: 0.2, onUpdate: () => r.style.setProperty('--n', String(o.n)) });
    }) });
  });
  // Parallax (data-parallax, data-parallax-wrap) is retired: photos sit still and crisp once revealed (round-2 brief).
  // The attributes are ignored, so markup that still carries them is harmless.
  // Swoosh edges (outside the hero, which runs its own as the last accent): ribbons run in once, when they scroll in.
  $$<SVGElement>('svg[data-swoosh]').forEach((svg) => {
    if (svg.dataset.mDone) return;
    const tl = swooshIn(svg).pause();
    ScrollTrigger.create({ trigger: svg, start: 'top 92%', once: true, onEnter: () => { tl.play(); } });
  });
  // Flow lines stay static: the old endless dash drift repainted large SVGs behind the photos every frame (a loop in the
  // eye line and a scroll-jank source). data-flow is kept as a hook but does nothing.
  // Map: the county outline draws, the truck route flows.
  $$('[data-draw-map]').forEach((p) => gsap.fromTo(p, { drawSVG: '0%' }, { drawSVG: '100%', duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: p.closest('svg'), start: 'top 80%', once: true } }));
  // The dashed truck route flows once after the outline has drawn, then rests (no endless loop).
  $$('[data-route]').forEach((p) => gsap.to(p, { strokeDashoffset: -112, duration: 2.4, ease: 'power1.inOut', delay: 1.6, scrollTrigger: { trigger: p.closest('svg'), start: 'top 80%', once: true } }));
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

  // Lenis = United's live settings (lerp 0.1, wheelMultiplier 1, smooth wheel, native touch). Lenis lerp is frame-rate
  // independent (damp), so it feels the same at 60 and 120 Hz. One clock: Lenis is driven by the GSAP ticker and
  // ScrollTrigger updates on every Lenis scroll, so no scrollerProxy is needed (Lenis scrolls the real window).
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, anchors: { offset: -96 * (parseFloat(document.documentElement.style.zoom) || 1) }, autoRaf: false });
  window.__pbpLenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
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
  const rest = () => { sections('rest'); signatures(); pointer(); ScrollTrigger.refresh(); };
  if ('requestIdleCallback' in window) (window as any).requestIdleCallback(rest, { timeout: 900 }); else setTimeout(rest, 200);

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
    // The header settles first; the hero sequence starts as it is ~40 % done (one thing at a time).
    if (heroTl) chrome.duration() ? gsap.delayedCall(chrome.duration() * 0.4, () => heroTl!.play()) : heroTl.play();
    window.dispatchEvent(new CustomEvent('pbp:handoff'));
  };
  if (!runCurtainIn(handoff, buildHero)) runLoader(handoff, buildHero);
  // Fonts change line breaks: re-measure triggers once they are in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

boot();

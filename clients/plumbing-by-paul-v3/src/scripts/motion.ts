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
const EASE = 'expo.out';
const BACK = 'back.out(1.7)';
/** Tier start offsets (s) inside one section timeline. T1 eyebrow, T2 headline, T3 body/CTA, T4 media, T5 accents. */
const TIER_AT: Record<string, number> = { '1': 0, '2': 0.12, '3': 0.42, '4': 0.55, '5': 0.9 };
const SAME_TIER_GAP = 0.08;

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel) as NodeListOf<any>) as T[];

/* ------------------------------------------------------------------ entrances */

/** Build the tween for one element according to its tier and data-fx. Returns a timeline positioned at 0. */
function entrance(el: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();
  const tier = el.dataset.t || '3';
  const fx = el.dataset.fx || ({ '1': 'slide', '2': 'lines', '3': 'rise', '4': 'rise', '5': 'pop' } as Record<string, string>)[tier];
  const stagger = el.hasAttribute('data-stagger');
  // Staggered groups animate their children; a child with its own data-t keeps its own tier and effect.
  const targets: Element[] = stagger ? Array.from(el.children).filter((c) => !c.hasAttribute('data-t')) : [el];
  if (stagger) gsap.set(el, { autoAlpha: 1 });
  const each = stagger ? 0.07 : 0;
  // A CSS `transition: transform` (buttons, patches, cards) fights GSAP's per-frame writes and freezes the element
  // part-way. Switch transitions off while the entrance runs; hand them back afterwards (float keeps it off).
  const moved = Array.from(new Set<Element>([el, ...targets]));
  gsap.set(moved, { transition: 'none' });

  switch (fx) {
    case 'lines': {
      const hl = $$('.hl', el);
      if (hl.length) {
        gsap.set(el, { autoAlpha: 1 });
        // The hero headline has explicit line spans: mask each, then unwrap so underlines and descenders are free.
        const inner = hl.map((line) => {
          line.classList.add('m-line');
          const s = document.createElement('span');
          while (line.firstChild) s.appendChild(line.firstChild);
          line.appendChild(s);
          return s;
        });
        tl.from(inner, { yPercent: 108, duration: 1, ease: EASE, stagger: 0.09 });
        tl.add(() => hl.forEach((line, i) => { line.classList.remove('m-line'); while (inner[i].firstChild) line.insertBefore(inner[i].firstChild!, inner[i]); inner[i].remove(); }));
      } else {
        // Split at play time (fonts are in by then, so the lines are the real lines), revert when done.
        gsap.set(el, { autoAlpha: 0 });
        const play = () => {
          gsap.set(el, { autoAlpha: 1 });
          const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'm-l' });
          gsap.from(split.lines, { yPercent: 108, duration: 1, ease: EASE, stagger: 0.09, onComplete: () => split.revert() });
        };
        tl.add(() => (document.fonts && document.fonts.status !== 'loaded' ? document.fonts.ready.then(play) : play()), 0.001);
      }
      break;
    }
    case 'slide': tl.from(targets, { x: -18, autoAlpha: 0, duration: 0.7, ease: EASE, stagger: each }); break;
    // LCP-safe: moves but never hides (the hero's biggest text block must paint under the loader, or LCP waits for the handoff).
    case 'nudge': tl.from(targets, { y: 22, duration: 0.9, ease: EASE, stagger: each }); break;
    case 'fade': tl.from(targets, { autoAlpha: 0, duration: 0.9, ease: 'power1.out', stagger: each }); break;
    case 'frame': {
      // Media reveal: the frame opens from a rounded inset while the photo settles from 1.14. Never fully hidden (LCP).
      const img = el.querySelector('img');
      gsap.set(el, { autoAlpha: 1 });
      tl.fromTo(el, { clipPath: 'inset(7% 9% 7% 9% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.3, ease: EASE, clearProps: 'clipPath' });
      if (img) tl.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.6, ease: EASE, clearProps: 'transform' }, 0);
      break;
    }
    case 'toss': tl.from(targets, { y: 50, rotation: () => gsap.utils.random(-12, 12), scale: 0.88, autoAlpha: 0, duration: 1, ease: BACK, stagger: each }); break;
    case 'pop': tl.from(targets, { scale: 0.4, rotation: -18, autoAlpha: 0, duration: 0.75, ease: BACK, stagger: each || 0.06 }); break;
    case 'spin': tl.from(targets, { scale: 0.6, rotation: -160, autoAlpha: 0, duration: 1.1, ease: EASE, stagger: each }); break;
    case 'write': tl.fromTo(targets, { clipPath: 'inset(-20% 100% -20% -5%)', autoAlpha: 1 }, { clipPath: 'inset(-20% -5% -20% -5%)', duration: 1, ease: 'power2.inOut', stagger: each, clearProps: 'clipPath' }); break;
    case 'float':
      tl.from(targets, { y: 30, autoAlpha: 0, duration: 0.9, ease: EASE, stagger: each });
      tl.add(() => targets.forEach((t, i) => gsap.to(t, { y: -8, duration: 2.4 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1 })));
      break;
    case 'rise':
    default: {
      const y = tier === '4' ? 56 : 26;
      tl.from(targets, { y, autoAlpha: 0, duration: tier === '4' ? 1.1 : 0.85, ease: EASE, stagger: each });
    }
  }
  if (fx !== 'float') tl.add(() => gsap.set(moved, { clearProps: 'transition' }));
  return tl;
}

/** Elements of a section in tier order (then DOM order), with their start time. */
function choreograph(els: HTMLElement[]): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });
  const count: Record<string, number> = {};
  els.forEach((el) => {
    const t = el.dataset.t || '3';
    const n = (count[t] = (count[t] ?? -1) + 1);
    tl.add(entrance(el), (TIER_AT[t] ?? 0.4) + n * SAME_TIER_GAP);
  });
  // Stripe underlines / hand-drawn strokes inside this group draw after the accents land.
  return tl;
}

const pageTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

/** Build section entrances. `only` = 'hero' (the handoff sections, built at once) or 'rest' (built when the main thread is idle).
 *  Elements stay pre-hidden by CSS until they get .m-built; a band's tweens are built only when it scrolls in (cheap setup),
 *  and .m-built is added in the same task as the tweens, so nothing flashes. */
function sections(only: 'hero' | 'rest', heroPlay: (tl: gsap.core.Timeline) => void = () => {}) {
  const vh = window.innerHeight;
  // Read phase first (all measurements), then the write phase (tweens): no layout thrash on slow phones.
  const plans = $$('[data-m-section]').filter((sec) => sec.hasAttribute('data-m-hero') === (only === 'hero')).map((sec) => {
    const els = $$('[data-t]', sec).filter((el) => el.getClientRects().length > 0 || getComputedStyle(el).display === 'contents');
    const tops = new Map<HTMLElement, number>(els.map((el) => [el, pageTop(el)]));
    return { sec, els, tops, top: pageTop(sec), draws: $$<SVGPathElement>('[data-draw]', sec) };
  });
  plans.forEach(({ sec, els, tops, top, draws }) => {
    // Elements not rendered right now (other breakpoint) are released at once: they never animate.
    $$('[data-t]', sec).forEach((el) => { if (!tops.has(el)) el.classList.add('m-built'); });
    if (draws.length) gsap.set(draws, { drawSVG: '0%' });
    if (sec.hasAttribute('data-m-hero')) {
      els.forEach((el) => el.classList.add('m-built'));
      const tl = choreograph(els);
      if (draws.length) tl.to(draws, { drawSVG: '100%', duration: 0.9, ease: 'power2.inOut', stagger: 0.12 }, 1.05);
      heroPlay(tl);
      return;
    }
    // Long sections: elements more than ~0.8 viewport below the section top get their own band and trigger,
    // so a tier-4 photo at the bottom of a tall section does not animate while it is still off screen.
    const bands = new Map<number, HTMLElement[]>();
    els.forEach((el) => {
      const b = Math.max(0, Math.floor((tops.get(el)! - top) / (vh * 0.8)));
      if (!bands.has(b)) bands.set(b, []);
      bands.get(b)!.push(el);
    });
    bands.forEach((group) => {
      const first = group.reduce((a, b) => (tops.get(a)! <= tops.get(b)! ? a : b));
      ScrollTrigger.create({ trigger: first, start: 'top 88%', once: true, onEnter: () => {
        group.forEach((el) => el.classList.add('m-built'));
        choreograph(group).play();
      } });
    });
    draws.forEach((p) => ScrollTrigger.create({ trigger: p.closest('svg') ?? p, start: 'top 85%', once: true, onEnter: () => gsap.to(p, { drawSVG: '100%', duration: 0.9, delay: 0.5, ease: 'power2.inOut' }) }));
  });
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
  // Parallax: data-parallax="0.08" = travel as a fraction of the element height. The image is scaled to hide edges.
  $$('[data-parallax]').forEach((el) => {
    const p = parseFloat(el.dataset.parallax || '0.08');
    const img = el.tagName === 'PICTURE' || el.tagName === 'IMG' ? el : el.querySelector('img') ?? el;
    gsap.set(img, { scale: 1 + p * 2 });
    gsap.fromTo(img, { yPercent: -p * 100 }, { yPercent: p * 100, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  $$('[data-parallax-wrap]').forEach((wrap) => {
    const pic = wrap.querySelector('picture') ?? wrap.querySelector('img');
    if (pic) gsap.fromTo(pic, { yPercent: -3 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top top+=80', end: 'bottom top', scrub: true } });
  });
  // Swoosh edges: the three ribbons run in from the leading side.
  $$('svg[data-swoosh]').forEach((svg) => {
    const flip = svg.getAttribute('class')?.includes('flip');
    gsap.fromTo($$('.sw-b', svg), { clipPath: flip ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0%)', duration: 1.4, ease: 'power3.inOut', stagger: 0.12, scrollTrigger: { trigger: svg, start: 'top 95%', once: true } });
  });
  // Flow lines: a slow current along each line (dash offset), only while on screen, and only on desktop pointers
  // (it repaints large SVGs; phones keep the static lines and the battery).
  if (FINE) $$('svg[data-flow]').forEach((svg) => {
    const paths = $$<SVGPathElement>('path', svg);
    paths.forEach((p) => { p.style.strokeDasharray = '140 60'; });
    const tw = gsap.to(paths, { strokeDashoffset: -400, duration: 14, ease: 'none', repeat: -1, stagger: { each: 0.8 }, paused: true });
    ScrollTrigger.create({ trigger: svg, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? tw.play() : tw.pause()) });
  });
  // Map: the county outline draws, the truck route flows.
  $$('[data-draw-map]').forEach((p) => gsap.fromTo(p, { drawSVG: '0%' }, { drawSVG: '100%', duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: p.closest('svg'), start: 'top 80%', once: true } }));
  $$('[data-route]').forEach((p) => gsap.to(p, { strokeDashoffset: -112, duration: 3, ease: 'none', repeat: -1 }));
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
  if (bar) tl.from(bar, { autoAlpha: 0, duration: 0.6, ease: 'power1.out' }, 0);
  if (brand) tl.from(brand, { yPercent: -110, duration: 0.9, ease: BACK }, 0.15);
}

function runLoader(onHandoff: () => void) {
  const ld = document.querySelector<HTMLElement>('[data-loader]');
  if (!ld || !html.classList.contains('intro')) { onHandoff(); return; }
  const panel = ld.querySelector<HTMLElement>('.ld-panel')!;
  const edge = ld.querySelector<SVGElement>('.ld-edge');
  const water = ld.querySelector<HTMLElement>('.ld-water');
  const t0 = performance.now();
  const MIN = 1500, MAX = 3200;
  window.__pbpLenis?.stop();
  const build = gsap.timeline();
  build
    .to(ld.querySelector('.ld-ring circle'), { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0)
    .to(ld.querySelector('.ld-seal'), { scale: 1, duration: 0.7, ease: BACK }, 0.45)
    .to($$('.ld-stripes path', ld), { x: 0, xPercent: 0, autoAlpha: 1, duration: 0.6, ease: EASE, stagger: 0.08 }, 0.7)
    .to([ld.querySelector('.ld-word'), ld.querySelector('.ld-pipe')], { autoAlpha: 1, duration: 0.5, ease: 'power1.out', stagger: 0.1 }, 0.9);
  // Water fills toward 85 % while the page loads, then to full.
  const fill = water ? gsap.to(water, { scaleX: 0.85, duration: 2.2, ease: 'power2.out', delay: 0.9 }) : null;

  let lifted = false;
  const lift = () => {
    if (lifted) return; lifted = true;
    fill?.kill(); build.progress(1);
    const h = window.innerHeight + (edge?.getBoundingClientRect().height ?? 120) + 8;
    const out = gsap.timeline({ onComplete: () => {
      html.classList.remove('intro'); ld.style.display = 'none';
      try { sessionStorage.setItem('pbp-intro', '1'); } catch (e) { /* storage blocked: loader may show again next visit */ }
      window.__pbpLenis?.start();
    } });
    if (water) out.to(water, { scaleX: 1, duration: 0.3, ease: 'power2.out' });
    out.to(ld.querySelector('.ld-core'), { y: -40, autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, '>-0.05');
    out.to(panel, { y: -h, duration: 1.05, ease: 'power3.inOut' }, '<0.1');
    out.add(onHandoff, '<0.42');
  };
  const ready = () => { const wait = Math.max(0, MIN - (performance.now() - t0)); gsap.delayedCall(wait / 1000, lift); };
  if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready, { once: true });
  gsap.delayedCall(MAX / 1000, lift);
  const skip = () => lift();
  ld.addEventListener('pointerdown', skip, { once: true });
  window.addEventListener('keydown', skip, { once: true });
}

function runCurtainIn(onHandoff: () => void) {
  const pt = document.querySelector<HTMLElement>('[data-pt]');
  if (!pt || !html.classList.contains('pt-in')) return false;
  const panel = pt.querySelector<HTMLElement>('.pt-panel')!;
  const edge = pt.querySelector<SVGElement>('.pt-edge');
  const h = window.innerHeight + (edge?.getBoundingClientRect().height ?? 120) + 8;
  gsap.timeline({ delay: 0.05, onComplete: () => { html.classList.remove('pt-in'); gsap.set(panel, { clearProps: 'transform' }); } })
    .to(pt.querySelector('.pt-mark'), { autoAlpha: 0, y: 20, duration: 0.3, ease: 'power2.in' })
    .to(panel, { y: h, duration: 0.9, ease: 'power3.inOut' }, 0.1)
    .add(onHandoff, 0.38);
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

  const lenis = new Lenis({ duration: 1.1, anchors: { offset: -96 }, autoRaf: false });
  window.__pbpLenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  let heroTl: gsap.core.Timeline | null = null;
  const chrome = gsap.timeline({ paused: true });
  const intro = html.classList.contains('intro');
  if (intro) introChrome(chrome);

  sections('hero', (tl) => { heroTl = tl; });
  curtainOut();
  // Everything below the fold is wired when the main thread is free, so it does not compete with the first paint.
  const rest = () => { sections('rest'); signatures(); pointer(); ScrollTrigger.refresh(); };
  if ('requestIdleCallback' in window) (window as any).requestIdleCallback(rest, { timeout: 900 }); else setTimeout(rest, 200);

  let handed = false;
  const handoff = () => {
    if (handed) return; handed = true;
    chrome.play();
    heroTl?.play();
    window.dispatchEvent(new CustomEvent('pbp:handoff'));
  };
  if (!runCurtainIn(handoff)) runLoader(handoff);
  // Fonts change line breaks: re-measure triggers once they are in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

boot();

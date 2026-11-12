/*
 * Plumbing By Paul motion system ("Sunshine City").
 * Same engine idea as the agency's best build (GSAP + ScrollTrigger + SplitText + DrawSVG + Lenis, a once-per-session
 * intro, masked line reveals, pointer-fill buttons) with this brand's own ideas: a sunrise intro whose sun opens into the
 * page, a coral sun page transition, half-suns that rise on section edges, a sun that travels an arc through the process.
 *
 * Markup API (use these attributes on any page):
 *   data-hero="<order>"  data-hero-fx="lines|up|left|right|pop|scale|clip|fade"  (+ data-hero-children)  -> first-paint entrance, in order
 *   data-reveal="up|left|right|scale|fade|clip|clipx|pop"  (+ data-delay="0.1")   -> scroll reveal
 *   data-stagger="up|pop|left|…"  (on a parent; children reveal one after another)
 *   data-split        (heading: lines rise out of masks on scroll)
 *   data-parallax="0.15"  (element drifts against the scroll; put it inside an overflow-hidden frame)
 *   data-draw         (SVG path/line draws itself when scrolled into view)
 *   data-count="2500" (number counts up; data-suffix="+" optional)
 *   data-sunrise      (a half-sun on a section edge rises as it scrolls into view)
 *   data-arc          (process arc: .arc-sun travels the arc, [data-arc-step] light up)
 *   data-marquee      (endless band that speeds up with scroll; data-dir="1" reverses)
 *   data-swap         (hover list: [data-swap-item="key"] shows [data-swap-pane="key"])
 *   data-tabs         ([role=tab][data-tab="key"] + [data-tab-pane="key"])
 *   data-btn          (pointer-fill + magnetic hover; <Btn> adds it)
 *   data-tilt         (soft 3D tilt on hover)
 *   details[data-acc] inside [data-acc-group]  (smooth accordion)
 *   form[data-estimate]  (validates, then goes to /thank-you/)
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const html = document.documentElement;
const motion = html.classList.contains('motion');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
(window as any).__pbpMotion = true;

let lenis: Lenis | null = null;

/* ---------- in-site navigation: skip the intro on the next page and run the sun transition ---------- */
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('sms:') || href.startsWith('mailto:') || a.target === '_blank') return;
  if (a.origin !== location.origin) return;
  try { sessionStorage.setItem('pbp-nav', '1'); } catch (_) {}
  const me = e as MouseEvent;
  if (!motion || me.defaultPrevented || me.button !== 0 || me.metaKey || me.ctrlKey || me.shiftKey || me.altKey || a.hasAttribute('download')) return;
  if (a.pathname === location.pathname && a.search === location.search) return;
  const pt = document.querySelector<HTMLElement>('[data-pt]');
  if (!pt) return;
  e.preventDefault();
  lenis?.stop();
  pt.classList.add('is-on');
  gsap.fromTo(pt.querySelector('.pt-panel'), { clipPath: 'circle(0% at 50% 100%)' }, { clipPath: 'circle(150% at 50% 100%)', duration: 0.6, ease: 'power3.inOut', onComplete: () => { location.href = a.href; } });
  gsap.fromTo(pt.querySelector('.pt-mark'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, delay: 0.28, ease: 'power2.out' });
});

/* Page arrives from an in-site link: the coral sun sets at the top edge, then the hero plays. */
function liftCurtain(onDone: () => void) {
  const pt = document.querySelector<HTMLElement>('[data-pt]');
  if (!pt || !html.classList.contains('pt-in')) { onDone(); return; }
  const panel = pt.querySelector('.pt-panel');
  gsap.set(pt.querySelector('.pt-mark'), { opacity: 1 });
  const tl = gsap.timeline({ onComplete: () => { html.classList.remove('pt-in'); pt.classList.remove('is-on'); gsap.set(panel, { clearProps: 'clipPath' }); } });
  tl.to(pt.querySelector('.pt-mark'), { opacity: 0, y: -16, duration: 0.25, ease: 'power2.in' }, 0.05)
    .fromTo(panel, { clipPath: 'circle(150% at 50% 0%)' }, { clipPath: 'circle(0% at 50% 0%)', duration: 0.8, ease: 'power3.inOut' }, 0.1)
    .add(() => onDone(), 0.35);
}
// Back/forward cache: a page restored from history must not keep a raised curtain.
window.addEventListener('pageshow', (ev) => {
  if (!(ev as PageTransitionEvent).persisted) return;
  const pt = document.querySelector<HTMLElement>('[data-pt]');
  if (pt) { pt.classList.remove('is-on'); gsap.set(pt.querySelector('.pt-panel'), { clearProps: 'clipPath' }); gsap.set(pt.querySelector('.pt-mark'), { opacity: 0 }); }
  html.classList.remove('pt-in'); lenis?.start();
});

/* ---------- smooth scroll ---------- */
function initLenis() {
  if (!motion) return;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!;
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis!.scrollTo(el as HTMLElement, { offset: -100, duration: 1.2 });
    });
  });
}

/* ---------- header: compact on scroll, hide going down, show going up; mobile bar appears after the hero ---------- */
function initHeader() {
  const hdr = document.querySelector<HTMLElement>('[data-header]');
  const bar = document.querySelector<HTMLElement>('[data-mbar]');
  if (!hdr) return;
  let last = 0, dir = 0, anchor = 0;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = Math.min(Math.max(window.scrollY, 0), Math.max(max, 0));
    if (y > last && dir !== 1) { dir = 1; anchor = last; }
    else if (y < last && dir !== -1) { dir = -1; anchor = last; }
    hdr.classList.toggle('is-scrolled', y > 60);
    if (y < 200) hdr.classList.remove('is-hidden');
    else if (dir === 1 && y - anchor > 48 && !document.querySelector('.has-mega:hover, .has-mega:focus-within')) hdr.classList.add('is-hidden');
    else if (dir === -1 && anchor - y > 48) hdr.classList.remove('is-hidden');
    bar?.classList.toggle('is-on', y > 520);
    last = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- mobile menu ---------- */
function initMenu() {
  const menu = document.querySelector<HTMLElement>('[data-mnav]');
  const open = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const close = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!menu || !open || !close) return;
  const items = () => menu.querySelectorAll('.mnav-list li, .mnav-svc, .mnav-cta');
  const show = () => {
    menu.hidden = false; open.setAttribute('aria-expanded', 'true'); lenis?.stop(); document.body.style.overflow = 'hidden';
    if (motion) {
      gsap.fromTo(menu, { clipPath: 'circle(0% at 92% 4%)' }, { clipPath: 'circle(150% at 92% 4%)', duration: 0.7, ease: 'power3.inOut' });
      gsap.fromTo(items(), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, delay: 0.2, ease: 'back.out(1.4)' });
    }
    close.focus();
  };
  const hide = () => {
    const done = () => { menu.hidden = true; open.setAttribute('aria-expanded', 'false'); lenis?.start(); document.body.style.overflow = ''; open.focus(); };
    if (motion) gsap.to(menu, { clipPath: 'circle(0% at 92% 4%)', duration: 0.5, ease: 'power3.inOut', onComplete: done });
    else done();
  };
  open.addEventListener('click', show);
  close.addEventListener('click', hide);
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { hide(); return; }
    if (e.key !== 'Tab') return;
    // keep focus inside the open menu
    const f = Array.from(menu.querySelectorAll<HTMLElement>('a[href], button')).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], lastEl = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
    else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
  });
}

/* ---------- buttons: fill grows from the pointer + magnetic pull ---------- */
function initButtons() {
  if (!motion) return;
  document.querySelectorAll<HTMLElement>('[data-btn]').forEach((btn) => {
    const fill = btn.querySelector<HTMLElement>('.btn-fill');
    btn.addEventListener('pointerenter', (e) => {
      if (!fill) return;
      const r = btn.getBoundingClientRect();
      gsap.set(fill, { left: e.clientX - r.left, top: e.clientY - r.top });
      gsap.to(fill, { scale: Math.max(r.width, r.height) / 14, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
    });
    btn.addEventListener('pointerleave', (e) => {
      if (fill) {
        const r = btn.getBoundingClientRect();
        gsap.set(fill, { left: e.clientX - r.left, top: e.clientY - r.top });
        gsap.to(fill, { scale: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      }
      if (finePointer) gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1.1, 0.4)' });
    });
    if (finePointer) {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, { x: dx * 0.12, y: dy * 0.22, duration: 0.3, ease: 'power2.out' });
      });
    }
  });
}

/* ---------- soft tilt on cards ---------- */
function initTilt() {
  if (!motion || !finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * 6, rotateX: -py * 6, y: -6, duration: 0.5, ease: 'power2.out', transformPerspective: 900 });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { rotateY: 0, rotateX: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' }));
  });
}

/* ---------- helpers ---------- */
const FROM: Record<string, gsap.TweenVars> = {
  up: { y: 60, opacity: 0 },
  down: { y: -40, opacity: 0 },
  left: { x: -80, opacity: 0 },
  right: { x: 80, opacity: 0 },
  pop: { scale: 0.6, opacity: 0, y: 20 },
  scale: { scale: 0.92, opacity: 0 },
  fade: { opacity: 0 },
  clip: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 },
  clipx: { clipPath: 'inset(0% 100% 0% 0%)', opacity: 1 },
};
const EASE: Record<string, string> = { pop: 'back.out(2.2)', up: 'power3.out', left: 'power3.out', right: 'power3.out', clip: 'power3.inOut', clipx: 'power3.inOut' };

function toState(from: gsap.TweenVars): gsap.TweenVars {
  const end: gsap.TweenVars = {};
  for (const k of Object.keys(from)) {
    if (k === 'x' || k === 'y') end[k] = 0;
    else if (k === 'scale' || k === 'opacity') end[k] = 1;
    else if (k === 'clipPath') end.clipPath = 'inset(0% 0% 0% 0%)';
  }
  return end;
}

function splitLines(el: HTMLElement) {
  const split = SplitText.create(el, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
  el.style.visibility = 'visible';
  return split.lines;
}

/* ---------- hero entrance, ordered (runs after the intro, or at once on in-site navigation) ---------- */
let heroDone = false;
function heroTimeline(fast: boolean) {
  if (heroDone) return;
  heroDone = true;
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-hero]'));
  els.sort((a, b) => Number(a.dataset.hero) - Number(b.dataset.hero));
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  const hdrBits = document.querySelectorAll('[data-intro="brand"], [data-intro="nav"]');
  if (document.querySelector('[data-intro="topbar"]')) tl.fromTo('[data-intro="topbar"]', { yPercent: -100 }, { yPercent: 0, duration: 0.5, immediateRender: true }, 0);
  if (hdrBits.length) tl.fromTo(hdrBits, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, immediateRender: true }, 0.08);
  let t = 0.25;
  els.forEach((el) => {
    const fx = el.dataset.heroFx || 'up';
    const at = el.dataset.heroAt !== undefined ? Number(el.dataset.heroAt) : t;
    if (fx === 'lines') {
      const lines = splitLines(el);
      tl.fromTo(lines, { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.12, ease: 'back.out(1.5)', immediateRender: true }, at);
      t = at + 0.12 * lines.length + 0.2;
    } else if (fx === 'draw') {
      gsap.set(el, { opacity: 1 });
      tl.fromTo(el.querySelectorAll('line, path, circle'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, stagger: 0.035, ease: 'power2.out', immediateRender: true }, at);
      t = at + 0.1;
    } else {
      gsap.set(el, { opacity: 1 });
      const dur = fx === 'clip' || fx === 'clipx' ? 1.1 : fx === 'pop' ? 0.7 : 0.9;
      // fromTo with explicit end values, so elements with CSS hover transitions never end up stuck mid-way.
      const to = toState(FROM[fx]);
      if (el.hasAttribute('data-hero-children')) {
        tl.fromTo(el.children, { ...FROM[fx] }, { ...to, duration: dur, stagger: 0.07, ease: EASE[fx] || 'power3.out', immediateRender: true }, at);
      } else {
        tl.fromTo(el, { ...FROM[fx] }, { ...to, duration: dur, ease: EASE[fx] || 'power3.out', immediateRender: true }, at);
      }
      t = at + 0.12;
    }
  });
  if (fast) tl.timeScale(1.5);
  return tl;
}

/* ---------- intro (first load of the session): sunrise over the Gulf, then the sun opens into the page ---------- */
function playIntro(onDone: () => void) {
  const root = document.querySelector<HTMLElement>('[data-intro-root]');
  if (!root || !html.classList.contains('intro')) { onDone(); return; }
  lenis?.stop();
  const sky = root.querySelector<HTMLElement>('.intro-sky')!;
  const full = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight));
  const tl = gsap.timeline();
  tl.fromTo('.intro-horizon', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 0.05)
    .fromTo('.intro-sun', { yPercent: 100, y: 0 }, { yPercent: 0, y: 0, duration: 0.95, ease: 'power3.out' }, 0.35)
    .fromTo('.intro-rays line', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, stagger: 0.04, ease: 'power2.out' }, 0.85)
    .fromTo('.intro-word span', { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: 0.7, stagger: 0.09, ease: 'back.out(1.6)' }, 0.75)
    .fromTo('.intro-tag', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.25)
    .add('exit', 2.05)
    .to('.intro-below', { y: 40, opacity: 0, duration: 0.4, ease: 'power2.in' }, 'exit')
    .to('.intro-rays', { scale: 1.5, opacity: 0, duration: 0.5, ease: 'power2.in', transformOrigin: '50% 100%' }, 'exit')
    .fromTo(sky, { '--hole': '0px' }, { '--hole': full + 'px', duration: 1.15, ease: 'power3.inOut' }, 'exit+=0.05')
    .add(() => { onDone(); }, 'exit+=0.5')
    .add(() => { html.classList.remove('intro'); lenis?.start(); ScrollTrigger.refresh(); }, 'exit+=1.25');
  // Hard safety: never hold the visitor longer than 4.5 s.
  setTimeout(() => { if (html.classList.contains('intro')) { tl.progress(1); } }, 4500);
}

function initAutoParallax() {
  // Every cover-fit photo inside a clipped frame drifts slightly slower than the page. Skips hero, carousels and cut-outs.
  gsap.utils.toArray<HTMLImageElement>('main img').forEach((img) => {
    if (img.closest('[data-parallax], [data-no-parallax], .hero, [data-hero], [data-swap], dialog')) return;
    const cs = getComputedStyle(img);
    const frame = img.parentElement;
    if (!frame || cs.objectFit !== 'cover') return;
    const fs = getComputedStyle(frame);
    if (fs.overflow !== 'hidden' && fs.overflow !== 'clip') {
      const up = frame.parentElement; if (!up || !/hidden|clip/.test(getComputedStyle(up).overflow)) return;
    }
    const r = img.getBoundingClientRect();
    if (r.height < 120 || r.width < 120) return;
    // Uses the separate CSS 'scale' and 'translate' properties, so hover zooms done with 'transform' still work on top.
    img.style.scale = '1.14';
    const drift = { v: -5 };
    gsap.to(drift, { v: 5, ease: 'none', onUpdate: () => { img.style.translate = `0 ${drift.v.toFixed(2)}%`; },
      scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
  });
}

/* ---------- scroll reveals ---------- */
function initReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.parentElement?.hasAttribute('data-stagger')) return;
    const fx = el.dataset.reveal || 'up';
    gsap.set(el, { opacity: 1 });
    gsap.fromTo(el, { ...FROM[fx] }, { ...toState(FROM[fx]), duration: fx.startsWith('clip') ? 1.2 : 1, delay: Number(el.dataset.delay || 0), ease: EASE[fx] || 'power3.out',
      immediateRender: true, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((wrap) => {
    const kids = Array.from(wrap.children) as HTMLElement[];
    const fx = wrap.dataset.stagger || 'up';
    kids.forEach((k) => gsap.set(k, { opacity: 1 }));
    gsap.fromTo(kids, { ...FROM[fx] }, { ...toState(FROM[fx]), duration: 0.9, stagger: 0.08, ease: EASE[fx] || 'power3.out', immediateRender: true, scrollTrigger: { trigger: wrap, start: 'top 85%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const lines = splitLines(el);
    gsap.fromTo(lines, { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.1, ease: 'back.out(1.5)', immediateRender: true, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  gsap.utils.toArray<SVGElement>('[data-draw]').forEach((p) => {
    const kids = p.matches('path, line, circle, polyline') ? [p] : Array.from(p.querySelectorAll('path, line, circle, polyline'));
    gsap.fromTo(kids, { drawSVG: '0%' }, { drawSVG: '100%', duration: kids.length > 1 ? 0.7 : 1.6, stagger: 0.04, ease: 'power2.inOut', scrollTrigger: { trigger: p.closest('svg') || p, start: 'top 92%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amt = Number(el.dataset.parallax || 0.12) * 100;
    gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  // Half-suns on section edges rise out of the horizon while they scroll into view.
  gsap.utils.toArray<HTMLElement>('[data-sunrise]').forEach((el) => {
    gsap.fromTo(el, { yPercent: 70 }, { yPercent: 0, duration: 1.3, ease: 'back.out(1.6)', scrollTrigger: { trigger: el.parentElement || el, start: 'top 92%', once: true } });
  });
  const idle = (window as any).requestIdleCallback || ((f: () => void) => setTimeout(f, 400));
  idle(() => { initAutoParallax(); ScrollTrigger.refresh(); }, { timeout: 2000 });
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    const fmt = (n: number) => Math.round(n).toLocaleString('en-US') + suffix;
    el.textContent = fmt(0);
    gsap.to(obj, { v: end, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(obj.v); }, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
}

/* ---------- process arc: the sun travels from first call to finished job ---------- */
function setArc(wrap: HTMLElement, p: number) {
  const x = (1 - Math.cos(Math.PI * p)) / 2, y = Math.sin(Math.PI * p);
  wrap.style.setProperty('--ax', x.toFixed(4)); wrap.style.setProperty('--ay', y.toFixed(4));
  const steps = wrap.closest('section')?.querySelectorAll<HTMLElement>('[data-arc-step]') || [];
  steps.forEach((s, i) => s.classList.toggle('is-on', p >= (i + 0.35) / steps.length));
}
function initArc() {
  document.querySelectorAll<HTMLElement>('[data-arc]').forEach((wrap) => {
    if (!motion) { setArc(wrap, 0.5); wrap.closest('section')?.querySelectorAll('[data-arc-step]').forEach((s) => s.classList.add('is-on')); return; }
    const o = { p: 0.04 };
    setArc(wrap, o.p);
    gsap.to(o, { p: 0.96, ease: 'none', onUpdate: () => setArc(wrap, o.p), scrollTrigger: { trigger: wrap.closest('section') || wrap, start: 'top 65%', end: 'bottom 75%', scrub: 0.7 } });
  });
}

/* ---------- marquee bands: endless loop, scroll velocity pushes them ---------- */
function initMarquees() {
  if (!motion) return;
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((mq) => {
    const track = mq.querySelector<HTMLElement>('.marquee-track');
    if (!track) return;
    const dir = Number(mq.dataset.dir || -1);
    const loop = gsap.fromTo(track, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: Number(mq.dataset.speed || 46), ease: 'none', repeat: -1 });
    if (lenis) {
      lenis.on('scroll', ({ velocity }: { velocity: number }) => {
        const boost = 1 + Math.min(Math.abs(velocity) / 6, 5);
        gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true, onComplete: () => { gsap.to(loop, { timeScale: 1, duration: 1.2 }); } });
      });
    }
  });
}

/* ---------- hover list that swaps a preview pane (services index) ---------- */
function initSwap() {
  document.querySelectorAll<HTMLElement>('[data-swap]').forEach((wrap) => {
    const items = Array.from(wrap.querySelectorAll<HTMLElement>('[data-swap-item]'));
    const panes = Array.from(wrap.querySelectorAll<HTMLElement>('[data-swap-pane]'));
    const show = (key: string) => {
      items.forEach((i) => i.classList.toggle('is-on', i.dataset.swapItem === key));
      panes.forEach((p) => p.classList.toggle('is-on', p.dataset.swapPane === key));
    };
    items.forEach((i) => {
      i.addEventListener('pointerenter', () => show(i.dataset.swapItem!));
      i.addEventListener('focusin', () => show(i.dataset.swapItem!));
    });
  });
}

/* ---------- tabs ---------- */
function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((wrap) => {
    const tabs = Array.from(wrap.querySelectorAll<HTMLElement>('[data-tab]'));
    const panes = Array.from(wrap.querySelectorAll<HTMLElement>('[data-tab-pane]'));
    const show = (key: string, focus = false) => {
      tabs.forEach((t) => { const on = t.dataset.tab === key; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
      panes.forEach((p) => {
        const on = p.dataset.tabPane === key; p.hidden = !on;
        if (on && motion) gsap.fromTo(p, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(t.dataset.tab!));
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();
        const n = tabs[(i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + tabs.length) % tabs.length];
        show(n.dataset.tab!, true);
      });
    });
  });
}

/* ---------- accordions (<details> with smooth height) ---------- */
function initAccordions() {
  const closeAcc = (d: HTMLDetailsElement) => {
    const body = d.querySelector<HTMLElement>('.acc-body')!;
    gsap.to(body, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut', onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'all' }); ScrollTrigger.refresh(); } });
  };
  document.querySelectorAll<HTMLDetailsElement>('details[data-acc]').forEach((d) => {
    const sum = d.querySelector('summary')!;
    const body = d.querySelector<HTMLElement>('.acc-body')!;
    sum.addEventListener('click', (e) => {
      if (!motion) return;
      e.preventDefault();
      const group = d.closest('[data-acc-group]');
      if (!d.open) {
        group?.querySelectorAll<HTMLDetailsElement>('details[data-acc][open]').forEach((o) => { if (o !== d) closeAcc(o); });
        d.open = true;
        gsap.fromTo(body, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out', onComplete: () => ScrollTrigger.refresh() });
      } else closeAcc(d);
    });
  });
}

/* ---------- estimate forms: no back-end yet. Validate, then show the thank-you page. ---------- */
function initForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-estimate]').forEach((f) => {
    f.addEventListener('submit', (e) => {
      // When a real endpoint is wired (FORM_LIVE in site.ts) this handler only validates and lets the POST go through.
      const live = f.dataset.live === 'true';
      const data = new FormData(f);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const err = f.querySelector<HTMLElement>('[data-form-msg]');
      if (!name || phone.replace(/\D/g, '').length < 10) {
        e.preventDefault();
        if (err) { err.hidden = false; err.textContent = 'Please add your name and a 10-digit phone number.'; }
        (f.querySelector<HTMLInputElement>(!name ? '[name="name"]' : '[name="phone"]'))?.focus();
        return;
      }
      if (live) return;
      e.preventDefault();
      try { sessionStorage.setItem('pbp-nav', '1'); } catch (_) {}
      location.href = f.getAttribute('action') || '/thank-you/';
    });
  });
}

/* ---------- boot ---------- */
function boot() {
  initLenis();
  initHeader();
  initMenu();
  initButtons();
  initTilt();
  initAccordions();
  initSwap();
  initTabs();
  initForms();
  initMarquees();
  initArc();
  if (!motion) {
    document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => (el.style.visibility = 'visible'));
    return;
  }
  const firstVisit = html.classList.contains('intro');
  // The intro starts at once; the hero waits for fonts so its line split measures right.
  const fontsReady = Promise.race([(document as any).fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 1200))]);
  const start = () => { fontsReady.then(() => { heroTimeline(!firstVisit); initReveals(); ScrollTrigger.refresh(); }); };
  if (html.classList.contains('pt-in')) liftCurtain(start); else playIntro(start);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

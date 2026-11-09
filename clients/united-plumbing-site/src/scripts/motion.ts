/*
 * United Plumbing motion system.
 * Reverse-engineered from two26.studio's approach (GSAP + ScrollTrigger + SplitText + DrawSVG + Lenis,
 * a once-per-session loader, masked line reveals with back.out easing, pointer-fill buttons),
 * rebuilt with our own brand ideas: pipe + water drop intro, wave panels draining away, LED tickers.
 *
 * Markup API (use these attributes on any page):
 *   data-hero="<order>"  data-hero-fx="lines|up|left|right|pop|scale|clip|fade"   -> first-paint entrance, in order
 *   data-reveal="up|left|right|scale|fade|clip"  (+ data-delay="0.1")             -> scroll reveal
 *   data-stagger  (on a parent; children reveal one after another)
 *   data-split   (heading: lines rise out of masks on scroll)
 *   data-parallax="0.15"  (image moves slower/faster than the page)
 *   data-draw    (SVG path draws itself when scrolled into view)
 *   data-count="1156"  (number counts up)
 *   data-ticker  (endless LED marquee that speeds up with scroll)
 *   data-btn     (pointer-fill + magnetic hover)
 *   data-tilt    (soft 3D tilt on hover)
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
(window as any).__upMotion = true;

let lenis: Lenis | null = null;

/* ---------- mark in-site navigation so the next page skips the intro (two26 pattern) ---------- */
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('sms:') || href.startsWith('mailto:') || a.target === '_blank') return;
  if (a.origin === location.origin) { try { sessionStorage.setItem('up-nav', '1'); } catch (_) {} }
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

/* ---------- header: compact on scroll, hide going down, show going up ---------- */
function initHeader() {
  const hdr = document.querySelector<HTMLElement>('[data-header]');
  const bar = document.querySelector<HTMLElement>('[data-mbar]');
  if (!hdr) return;
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    hdr.classList.toggle('is-scrolled', y > 60);
    hdr.classList.toggle('is-hidden', y > 400 && y > last + 2 && !document.querySelector('.has-mega:hover'));
    if (y < last - 2) hdr.classList.remove('is-hidden');
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
  menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { if (a.getAttribute('href')?.startsWith('tel:') || a.getAttribute('href')?.startsWith('sms:')) return; }));
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
    el.style.transformPerspective = '900px';
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
  clip: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 1 },
  clipx: { clipPath: 'inset(0% 100% 0% 0%)', opacity: 1 },
};
const EASE: Record<string, string> = { pop: 'back.out(2.2)', up: 'power3.out', left: 'power3.out', right: 'power3.out', clip: 'power3.inOut', clipx: 'power3.inOut' };

function splitLines(el: HTMLElement) {
  const split = SplitText.create(el, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
  el.style.visibility = 'visible';
  return split.lines;
}

/* ---------- hero entrance, ordered (runs after the intro, or at once on in-site navigation) ---------- */
function heroTimeline(fast: boolean) {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-hero]'));
  els.sort((a, b) => Number(a.dataset.hero) - Number(b.dataset.hero));
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  const hdrBits = document.querySelectorAll('[data-intro="brand"], [data-intro="nav"]');
  tl.from('[data-intro="topbar"]', { yPercent: -100, duration: 0.5 }, 0);
  tl.from(hdrBits, { y: -24, opacity: 0, duration: 0.6, stagger: 0.05 }, 0.08);
  let t = 0.25;
  els.forEach((el) => {
    const fx = el.dataset.heroFx || 'up';
    const at = el.dataset.heroAt !== undefined ? Number(el.dataset.heroAt) : t;
    if (fx === 'lines') {
      const lines = splitLines(el);
      tl.from(lines, { yPercent: 110, rotate: 2, duration: 0.85, stagger: 0.12, ease: 'back.out(1.4)' }, at);
      t = at + 0.12 * lines.length + 0.2;
    } else {
      gsap.set(el, { opacity: 1 });
      const dur = fx === 'clip' || fx === 'clipx' ? 1.1 : fx === 'pop' ? 0.6 : 0.9;
      if (el.hasAttribute('data-hero-children')) {
        tl.from(el.children, { ...FROM[fx], duration: dur, stagger: 0.07, ease: EASE[fx] || 'power3.out' }, at);
      } else {
        tl.from(el, { ...FROM[fx], duration: dur, ease: EASE[fx] || 'power3.out' }, at);
      }
      t = at + 0.12;
    }
  });
  if (fast) tl.timeScale(1.5);
  return tl;
}

/* ---------- intro (first load of the session) ---------- */
function playIntro(onDone: () => void) {
  const root = document.querySelector<HTMLElement>('[data-intro-root]');
  if (!root || !html.classList.contains('intro')) { onDone(); return; }
  lenis?.stop();
  const night = root.querySelector('.intro-night')!;
  const yellow = root.querySelector('.intro-yellow')!;
  const drop = root.querySelector('.intro-drop')!;
  const tl = gsap.timeline();
  tl.from(root.querySelectorAll('.intro-pipe-line, .intro-pipe-line2'), { drawSVG: '0%', duration: 0.7, ease: 'power2.inOut' }, 0.1)
    .from('.intro-joint', { scale: 0, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)' }, 0.65)
    .fromTo(drop, { y: -16, opacity: 0, scaleY: 0.6 }, { y: 70, opacity: 1, scaleY: 1.1, duration: 0.45, ease: 'power2.in' }, 0.75)
    .to(drop, { scale: 0, opacity: 0, duration: 0.15 }, 1.18)
    .to('.intro-logo', { scale: 1, duration: 0.6, ease: 'back.out(2)' }, 1.12)
    .from('.intro-led span', { y: 20, opacity: 0, stagger: 0.08, duration: 0.4, ease: 'back.out(2)' }, 1.3)
    .add('exit', 1.95)
    .to(root.querySelector('.intro-core'), { y: -60, opacity: 0, duration: 0.5, ease: 'power2.in' }, 'exit')
    .to(night, { yPercent: -125, duration: 1.0, ease: 'power3.inOut' }, 'exit')
    .to(yellow, { yPercent: -125, duration: 1.0, ease: 'power3.inOut' }, 'exit+=0.14')
    .add(() => { onDone(); }, 'exit+=0.45')
    .add(() => { html.classList.remove('intro'); lenis?.start(); ScrollTrigger.refresh(); }, 'exit+=1.2');
  // Hard safety: never hold the visitor longer than 4.5 s.
  setTimeout(() => { if (html.classList.contains('intro')) { tl.progress(1); } }, 4500);
}

/* ---------- scroll reveals ---------- */
function initReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.closest('[data-stagger]') && el.parentElement?.hasAttribute('data-stagger')) return;
    const fx = el.dataset.reveal || 'up';
    gsap.set(el, { opacity: 1 });
    gsap.from(el, { ...FROM[fx], duration: fx.startsWith('clip') ? 1.2 : 1, delay: Number(el.dataset.delay || 0), ease: EASE[fx] || 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((wrap) => {
    const kids = Array.from(wrap.children) as HTMLElement[];
    const fx = wrap.dataset.stagger || 'up';
    kids.forEach((k) => gsap.set(k, { opacity: 1 }));
    gsap.from(kids, { ...FROM[fx], duration: 0.9, stagger: 0.09, ease: EASE[fx] || 'power3.out', scrollTrigger: { trigger: wrap, start: 'top 85%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const lines = splitLines(el);
    gsap.from(lines, { yPercent: 110, rotate: 2, duration: 0.9, stagger: 0.1, ease: 'back.out(1.4)', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  gsap.utils.toArray<SVGPathElement>('[data-draw]').forEach((p) => {
    gsap.from(p, { drawSVG: '0%', duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: p.closest('svg') || p, start: 'top 92%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amt = Number(el.dataset.parallax || 0.12) * 100;
    gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
    el.textContent = fmt(0);
    gsap.to(obj, { v: end, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(obj.v); }, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-progress]').forEach((el) => {
    gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top 70%', end: 'center 45%', scrub: 0.6 } });
  });
  gsap.utils.toArray<HTMLElement>('[data-progress-y]').forEach((el) => {
    gsap.fromTo(el, { scaleY: 0 }, { scaleY: 1, transformOrigin: 'center top', ease: 'none', scrollTrigger: { trigger: el.parentElement || el, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
  });
}

/* ---------- LED tickers: endless loop, scroll velocity pushes them ---------- */
function initTickers() {
  document.querySelectorAll<HTMLElement>('[data-ticker]').forEach((tk) => {
    const track = tk.querySelector<HTMLElement>('.ticker-track')!;
    const dir = Number(tk.dataset.dir || -1);
    if (!motion) return;
    const loop = gsap.fromTo(track, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: 40, ease: 'none', repeat: -1 });
    if (lenis) {
      lenis.on('scroll', ({ velocity }: { velocity: number }) => {
        const boost = 1 + Math.min(Math.abs(velocity) / 6, 5);
        gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true, onComplete: () => { gsap.to(loop, { timeScale: 1, duration: 1.2 }); } });
      });
    }
  });
}

/* ---------- accordions (<details> with smooth height) ---------- */
function initAccordions() {
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
  function closeAcc(d: HTMLDetailsElement) {
    const body = d.querySelector<HTMLElement>('.acc-body')!;
    gsap.to(body, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut', onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'all' }); ScrollTrigger.refresh(); } });
  }
}

/* ---------- carousels (scroll-snap track + arrows + dots) ---------- */
function initCarousels() {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((c) => {
    const track = c.querySelector<HTMLElement>('[data-track]')!;
    const prev = c.querySelector<HTMLButtonElement>('[data-prev]');
    const next = c.querySelector<HTMLButtonElement>('[data-next]');
    const dots = Array.from(c.querySelectorAll<HTMLElement>('[data-dot]'));
    const step = () => (track.firstElementChild as HTMLElement)?.getBoundingClientRect().width + 24 || 300;
    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', () => {
      const max = track.scrollWidth - track.clientWidth || 1;
      const i = Math.round((track.scrollLeft / max) * (dots.length - 1));
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
    }, { passive: true });
  });
}

/* ---------- forms: no back-end yet, so hand the request to the phone's SMS app ---------- */
function initForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-callback]').forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(f);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const err = f.querySelector<HTMLElement>('[data-form-msg]');
      if (!name || phone.replace(/\D/g, '').length < 10) {
        if (err) { err.hidden = false; err.textContent = 'Please add your name and a 10-digit phone number.'; }
        return;
      }
      const parts = [`Hi Jim, please call me back.`, `Name: ${name}`, `Phone: ${phone}`];
      const zip = String(data.get('zip') || '').trim(); if (zip) parts.push(`ZIP: ${zip}`);
      const prob = String(data.get('problem') || '').trim(); if (prob) parts.push(`Problem: ${prob}`);
      const msg = String(data.get('message') || '').trim(); if (msg) parts.push(msg);
      const body = encodeURIComponent(parts.join('\n'));
      const touch = window.matchMedia('(pointer: coarse)').matches;
      if (touch) {
        location.href = `sms:+19095870711?&body=${body}`;
      } else if (err) {
        err.hidden = false;
        err.innerHTML = 'Thanks! The online form connects to Jim at launch. Right now the fastest way is to call or text <a href="tel:+19095870711"><strong>909-587-0711</strong></a>.';
      }
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
  initCarousels();
  initForms();
  initTickers();
  if (!motion) {
    document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => (el.style.visibility = 'visible'));
    return;
  }
  const firstVisit = html.classList.contains('intro');
  const start = () => { heroTimeline(!firstVisit); initReveals(); ScrollTrigger.refresh(); };
  const ready = (document as any).fonts?.ready ?? Promise.resolve();
  Promise.race([ready, new Promise((r) => setTimeout(r, 1200))]).then(() => playIntro(start));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

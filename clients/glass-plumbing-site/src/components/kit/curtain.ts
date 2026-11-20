// Page curtain, "Clear Water" (kit/Curtain.astro, kit/water.ts; revision round 2: replaces the 8 blinds Mike and Khinda
// also use). API unchanged:
//   park()            boot, every page: the water is drained (hidden), unless this page arrived under the curtain.
//   cover(url)        an in-site link: the water fills the screen (0.6 s, back layer first, the frost front last, logo
//                     floats up into it), and only once it covers 100 % does the browser navigate.
//   reveal(onHandoff) the page we arrived at (html.pt-in): it starts covered (resting markup), the page is put at the top
//                     under the cover, then the water drains down and away (0.6 s, front layer first; the page appears
//                     from the top). onHandoff fires at 55 % of the drain, as the hero's H1 clears.
// Navigation rule (B4): a page reached through an in-site link always opens at the top. history.scrollRestoration is
// 'manual' only while we arrive and back to 'auto' after the reveal, so back/forward keep the browser's native restore.
// Same-page # links are not ours (Lenis scrolls them). One writer: the path `d` (draw) and .pt-mark opacity/transform.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { draw, sheetOf } from './water';

const html = document.documentElement;
// Fix round A (20 Nov): total ~1.2 s (was ~1.7 s): cover 0.6 s, drain 0.6 s, same look.
const FILL = 0.6;
const DRAIN = 0.6;

const root = () => document.querySelector<HTMLElement>('[data-pt]');
const markOf = (pt: HTMLElement) => pt.querySelector<HTMLElement>('.pt-mark');

export function park() {
  const pt = root(); if (!pt) return;
  const s = sheetOf(pt);
  if (!html.classList.contains('pt-in')) draw(s, 0);
  // Back/forward cache restore: never leave the curtain down.
  window.addEventListener('pageshow', (ev) => {
    if (!ev.persisted) return;
    gsap.killTweensOf(pt); gsap.killTweensOf(markOf(pt));
    pt.classList.remove('is-on'); html.classList.remove('pt-in');
    draw(s, 0); gsap.set(markOf(pt), { autoAlpha: 0, y: 0 });
  });
}

/** Cover the page, then go to `href`. Returns false when there is no curtain (the caller navigates itself). */
export function cover(href: string): boolean {
  const pt = root(); if (!pt) return false;
  const s = sheetOf(pt);
  try { sessionStorage.setItem('gps-nav', '1'); } catch (err) { /* no storage: the next page simply shows without the reveal */ }
  const o = { t: 0 };
  draw(s, 0);
  pt.classList.add('is-on');
  gsap.killTweensOf(o);
  gsap.timeline({ onComplete: () => { draw(s, 1); location.href = href; } })
    .to(o, { t: 1, duration: FILL, ease: 'none', onUpdate: () => draw(s, o.t) }, 0)
    .fromTo(markOf(pt), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'sine.inOut' }, FILL * 0.45);
  return true;
}

/** Top of the page, immediately, under the cover (window + Lenis). */
export function toTop() {
  window.scrollTo(0, 0);
  (window as any).__glassLenis?.scrollTo(0, { immediate: true, force: true });
}

/** Arrived under the curtain: start covered, put the page at the top, then drain. False when this page did not arrive so. */
export function reveal(onHandoff: () => void, onDone: () => void = () => {}): boolean {
  const pt = root();
  if (!pt || !html.classList.contains('pt-in')) return false;
  try { history.scrollRestoration = 'manual'; } catch (e) { /* old browsers */ }
  toTop();
  drain(pt, onHandoff, () => {
    html.classList.remove('pt-in');
    // ScrollTrigger remembers the value it saw at registration ('manual' while arriving) and re-applies it after every
    // refresh; hand it 'auto' too, or back/forward would lose the native restore after the first refresh (R2 fix).
    try { history.scrollRestoration = 'auto'; ScrollTrigger.clearScrollMemory('auto'); } catch (e) { /* old browsers */ }
    onDone();
  });
  return true;
}

/** The drain, shared with the loader's exit: the logo sinks and fades, the water runs out front layer first. */
export function drain(host: HTMLElement, onHandoff: () => void, onDone: () => void, mark = markOf(host), delay = 0.05) {
  const s = sheetOf(host);
  const o = { t: 0 };
  draw(s, 0, true);
  return gsap.timeline({ delay, onComplete: () => { draw(s, 1, true); onDone(); } })
    .to(mark, { autoAlpha: 0, y: 22, duration: 0.22, ease: 'sine.inOut' }, 0)
    .to(o, { t: 1, duration: DRAIN, ease: 'none', onUpdate: () => draw(s, o.t, true) }, 0.05)
    .add(onHandoff, 0.05 + DRAIN * 0.55);
}

/** In-site links: same-origin, plain left click, another page (not a # on this page) -> cover, then navigate. */
export function interceptLinks() {
  if (!root()) return;
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download') || a.dataset.noCurtain !== undefined) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // same page / hash: Lenis scrolls it
    e.preventDefault();
    // Cross-page links open at the top (B4): a stray #hash is dropped, so nothing can land mid-page.
    url.hash = '';
    cover(url.href);
  });
}

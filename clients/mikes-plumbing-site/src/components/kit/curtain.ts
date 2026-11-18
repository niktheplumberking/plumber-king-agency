// Curtain hooks (kit/Curtain.astro; MOTION.md section 3; fix round 1 A-3, B2, B4). 8 blinds, one channel per blind: GSAP
// `xPercent` on .pt-blind (odd rows park left, even rows park right, like the loader's exit).
//   park()            boot, every page: blinds off-screen, unless this page arrived under the curtain.
//   cover(url)        an in-site link: the blinds close in from both sides in one ease-in-out move (full coverage), THEN
//                     navigate.
//   reveal(onHandoff) the page we arrived at (html.pt-in): it starts covered (CSS, no transform), the page is put at the top
//                     under the cover, then the blinds slide off. onHandoff fires in the reveal's onComplete, once the last
//                     blind is fully off-screen (B3 handoff rule: header + hero start only then).
// Navigation rule (B4): a page reached through an in-site link always opens at the top. history.scrollRestoration is
// 'manual' only while we arrive (so the browser cannot restore a stale position under the cover), and back to 'auto' after
// the reveal, so back/forward keep the browser's native restore. Same-page # links are not ours (Lenis scrolls them).
import { gsap } from 'gsap';

const html = document.documentElement;
const DUR = 0.6;
const STAGGER = 0.012;
const EASE = 'power2.inOut';

const root = () => document.querySelector<HTMLElement>('[data-pt]');
const blindsOf = (pt: HTMLElement) => Array.from(pt.querySelectorAll<HTMLElement>('.pt-blind'));
const off = (i: number) => (i % 2 ? 101 : -101);

export function park() {
  const pt = root(); if (!pt) return;
  if (!html.classList.contains('pt-in')) gsap.set(blindsOf(pt), { xPercent: off });
  // Back/forward cache restore: never leave the curtain down.
  window.addEventListener('pageshow', (ev) => {
    if (!ev.persisted) return;
    const b = blindsOf(pt); gsap.killTweensOf(b); pt.classList.remove('is-on'); html.classList.remove('pt-in');
    gsap.set(b, { xPercent: off }); gsap.set(pt.querySelector('.pt-mark'), { autoAlpha: 0 });
  });
}

/** Cover the page, then go to `href`. Returns false when there is no curtain (the caller navigates itself). */
export function cover(href: string): boolean {
  const pt = root(); if (!pt) return false;
  const blinds = blindsOf(pt);
  try { sessionStorage.setItem('mps-nav', '1'); } catch (err) { /* no storage: the next page simply shows without the reveal */ }
  pt.classList.add('is-on');
  gsap.killTweensOf(blinds);
  gsap.timeline({ onComplete: () => { location.href = href; } })
    .to(blinds, { xPercent: 0, duration: DUR, ease: EASE, stagger: STAGGER }, 0)
    .fromTo(pt.querySelector('.pt-mark'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'sine.inOut' }, DUR * 0.6);
  return true;
}

/** Top of the page, immediately, under the cover (window + Lenis). */
export function toTop() {
  window.scrollTo(0, 0);
  (window as any).__pbpLenis?.scrollTo(0, { immediate: true, force: true });
}

/** Arrived under the curtain: start covered, put the page at the top, then reveal. False when this page did not arrive so. */
export function reveal(onHandoff: () => void, onDone: () => void = () => {}): boolean {
  const pt = root();
  if (!pt || !html.classList.contains('pt-in')) return false;
  const blinds = blindsOf(pt);
  try { history.scrollRestoration = 'manual'; } catch (e) { /* old browsers */ }
  toTop();
  gsap.set(blinds, { xPercent: 0 });
  gsap.timeline({
    delay: 0.05,
    onComplete: () => {
      html.classList.remove('pt-in');
      try { history.scrollRestoration = 'auto'; } catch (e) { /* old browsers */ }
      onHandoff(); onDone();
    },
  })
    .fromTo(pt.querySelector('.pt-mark'), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25, ease: 'sine.inOut' }, 0)
    .to(blinds, { xPercent: off, duration: DUR, ease: EASE, stagger: STAGGER }, 0.1);
  return true;
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

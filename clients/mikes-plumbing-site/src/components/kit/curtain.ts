// Curtain hooks (kit/Curtain.astro; MOTION.md section 3; fix round 1 A-3 + B4). One channel: GSAP `yPercent` on .pt-panel.
//   park()            boot, every page: yPercent 100 (below the screen), unless this page arrived under the curtain.
//   cover(url)        an in-site link: one continuous ease-in-out cover to yPercent 0 (full coverage), THEN navigate.
//   reveal(onHandoff) the page we arrived at (html.pt-in): it starts covered (CSS, no transform), the page is put at the top
//                     under the cover, then one continuous ease-in-out lift to yPercent -100. onHandoff fires once the panel
//                     has cleared the header (the hero then plays); onDone once it is fully off-screen.
// Navigation rule (B4): a page reached through an in-site link always opens at the top. history.scrollRestoration is
// 'manual' only while we arrive (so the browser cannot restore a stale position under the cover), and back to 'auto' after
// the lift, so back/forward keep the browser's native restore. Same-page # links are not ours (Lenis scrolls them smoothly).
// Phase 2 swaps the visual (8 blinds) but keeps these three hooks and the single yPercent channel.
import { gsap } from 'gsap';

const html = document.documentElement;
const DUR_COVER = 0.6;
const DUR_REVEAL = 0.75;
const EASE = 'power2.inOut';

const root = () => document.querySelector<HTMLElement>('[data-pt]');
const panelOf = (pt: HTMLElement) => pt.querySelector<HTMLElement>('.pt-panel')!;

export function park() {
  const pt = root(); if (!pt) return;
  if (!html.classList.contains('pt-in')) gsap.set(panelOf(pt), { yPercent: 100 });
  // Back/forward cache restore: never leave the curtain down.
  window.addEventListener('pageshow', (ev) => {
    if (!ev.persisted) return;
    gsap.killTweensOf(panelOf(pt)); pt.classList.remove('is-on'); html.classList.remove('pt-in');
    gsap.set(panelOf(pt), { yPercent: 100 });
  });
}

/** Cover the page, then go to `href`. Returns false when there is no curtain (the caller navigates itself). */
export function cover(href: string): boolean {
  const pt = root(); if (!pt) return false;
  const panel = panelOf(pt);
  try { sessionStorage.setItem('mps-nav', '1'); } catch (err) { /* no storage: the next page simply shows without the lift */ }
  pt.classList.add('is-on');
  const mark = pt.querySelector('.pt-mark');
  gsap.killTweensOf(panel);
  gsap.timeline({ onComplete: () => { location.href = href; } })
    .fromTo(panel, { yPercent: Number(gsap.getProperty(panel, 'yPercent')) || 100 }, { yPercent: 0, duration: DUR_COVER, ease: EASE })
    .fromTo(mark, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'sine.inOut' }, DUR_COVER * 0.55);
  return true;
}

/** Top of the page, immediately, under the cover (window + Lenis). */
export function toTop() {
  window.scrollTo(0, 0);
  (window as any).__pbpLenis?.scrollTo(0, { immediate: true, force: true });
}

/** Arrived under the curtain: start covered, put the page at the top, then lift. False when this page did not arrive so. */
export function reveal(onHandoff: () => void, onDone: () => void = () => {}): boolean {
  const pt = root();
  if (!pt || !html.classList.contains('pt-in')) return false;
  const panel = panelOf(pt);
  try { history.scrollRestoration = 'manual'; } catch (e) { /* old browsers */ }
  toTop();
  gsap.set(panel, { yPercent: 0 });
  const mark = pt.querySelector('.pt-mark');
  gsap.timeline({
    delay: 0.05,
    onComplete: () => {
      html.classList.remove('pt-in');
      gsap.set(panel, { yPercent: 100 });
      try { history.scrollRestoration = 'auto'; } catch (e) { /* old browsers */ }
      onDone();
    },
  })
    .to(mark, { autoAlpha: 0, duration: 0.25, ease: 'sine.inOut' }, 0)
    .to(panel, { yPercent: -100, duration: DUR_REVEAL, ease: EASE }, 0.1)
    .add(onHandoff, 0.1 + DUR_REVEAL * 0.45);
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

// Loader: Khinda's panel powers up (global/Loader.astro). Six breakers flip ON one by one while the page loads (the readout
// counts "CCT n / 6 ON"), MAIN flips last, then the panel fades and 8 blinds slide off alternately left / right (an amber /
// panel-grey band on each moving edge). Max 3.4 s: breakers 0.25-1.75 s (held at 5 / 6 while the page still loads, forced
// at 2.0 s), MAIN +0.3 s, exit 0.75 s. Any click, tap or key skips. One writer: GSAP xPercent on .ld-blind.
//   runLoader({ onCover, onDone })  onCover: fully covered, the hero may take its start states. onDone: blinds ~75 % off.
import { gsap } from 'gsap';

export function runLoader({ onCover = () => {}, onDone }: { onCover?: () => void; onDone: () => void }) {
  const html = document.documentElement;
  const ld = document.querySelector<HTMLElement>('[data-loader]');
  if (!ld || !html.classList.contains('intro')) { html.classList.remove('cv'); onDone(); return; }
  const ccts = Array.from(ld.querySelectorAll<HTMLElement>('.ld-cct:not(.ld-main)'));
  const main = ld.querySelector<HTMLElement>('.ld-main');
  const num = ld.querySelector<HTMLElement>('.ld-n');
  (window as any).__pbpLenis?.stop();
  // Base.astro .cv: sections below the hero skipped layout for the first paint; let them back in one at a time.
  const cvList = Array.from(document.querySelectorAll<HTMLElement>('main > :not([data-m-hero]), body > footer'));
  let cvTimer = 0;
  const releaseCv = (all = false) => {
    clearTimeout(cvTimer);
    if (all) { html.classList.remove('cv'); return; }
    const el = cvList.shift();
    if (!el) { html.classList.remove('cv'); return; }
    el.style.contentVisibility = 'visible';
    cvTimer = window.setTimeout(() => releaseCv(), 40);
  };
  const cvStart = () => { cvTimer = window.setTimeout(() => releaseCv(), 60); };
  if (document.readyState === 'complete') cvStart(); else window.addEventListener('load', cvStart, { once: true });
  let loaded = document.readyState === 'complete';
  if (!loaded) window.addEventListener('load', () => { loaded = true; }, { once: true });

  const t0 = performance.now();
  const START = 250, STEP = 250, FORCE = 2000;
  let n = 0, timer = 0, leaving = false;
  const flip = (k: number) => { ccts[k - 1]?.classList.add('on'); if (num) num.textContent = `CCT ${k} / 6 ON`; };
  const tick = () => {
    const el = performance.now() - t0;
    if (n < 6 && (n < 5 || loaded || el >= FORCE)) { n++; flip(n); }
    if (n >= 6) { leave(300); return; }
    timer = window.setTimeout(tick, STEP);
  };
  timer = window.setTimeout(tick, START);

  const leave = (hold: number) => {
    if (leaving) return; leaving = true; clearTimeout(timer);
    releaseCv(true);
    while (n < 6) { n++; flip(n); }
    onCover();
    const blinds = Array.from(ld.querySelectorAll<HTMLElement>('.ld-blind'));
    let handed = false;
    const hand = () => { if (handed) return; handed = true; (window as any).__pbpLenis?.start(); onDone(); };
    gsap.timeline({ delay: hold / 1000, onComplete: () => {
      html.classList.remove('intro'); ld.style.display = 'none';
      document.querySelectorAll<HTMLElement>('[style*="content-visibility"]').forEach((el) => { el.style.contentVisibility = ''; });
      try { sessionStorage.setItem('ke-intro', '1'); } catch (e) { /* storage blocked: the loader may show again */ }
      hand();
    } })
      .add(() => { main?.classList.add('on'); if (num) num.textContent = 'MAIN · ON'; }, 0)
      .to(ld.querySelectorAll('.ld-stage, .ld-skip'), { autoAlpha: 0, duration: 0.2, ease: 'sine.inOut' }, 0.3)
      .to(blinds, { xPercent: (i: number) => (i % 2 ? 101 : -101), duration: 0.6, ease: 'power2.inOut', stagger: 0.012 }, 0.4)
      .add(hand, 0.4 + 0.6 * 0.75);
  };
  const skip = () => leave(120);
  ld.addEventListener('pointerdown', skip, { once: true });
  window.addEventListener('keydown', skip, { once: true });
}

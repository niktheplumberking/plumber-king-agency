// Accordion: the ONE controller for every <details data-acc> (kit/README.md; fix round 1 A-4 / B9).
// Markup: <details data-acc [name="group"]><summary>...</summary> ...body... </details>. Rows sharing a `name` are one group:
// never two open (native `name` exclusivity is also the no-JS fallback). The body is every child after the summary.
//   data-acc="row"  (default) the row itself grows / shrinks (FLIP: measure, then animate the height).
//   data-acc="pop"  a dropdown whose list floats (absolute): the list fades and slides in / out, the row does not resize.
// A switch (e.g. 1 -> 4) is ONE timeline, 0.7 s ease-in-out: the old row shrinks while its colours ease back to the closed
// look (CSS transitions, class .acc-off = "styled closed, still rendered"), the new row grows into the open look, its answer
// fades in after 0.15 s. A click mid-animation re-targets from the current heights (latest click wins, nothing jumps).
// The open look stays styled on [open] in each component, so the page is right before this script runs and without JS;
// components only add `:not(.acc-off)` to their [open] rules. aria-expanded on the summary mirrors the state.
// Reduced motion (no html.motion): instant, native toggle.
// Title layers (fix round 2, review 11): a title whose open look is another face / colour (e.g. Home FAQ: sans ink on bone ->
// serif bone on ink) carries `data-acc-title`; its row then switches as a "swap" (.acc-swap, review 11 re-look):
//   0    -> 0.15 s  the summary's text fades out on the OLD background (the title as a snapshot of its old look, absolute
//                   at its old place); a closing row's answer is hidden at once (its summary changes size under it)
//   0.15 -> 0.35 s  the background / band switches (CSS, 0.2 s) with NO text on it; text colours step at 0.25 s
//   0.35 -> 0.6 s   the summary's text (title in its new look) fades in on the NEW background; an opening answer 0.35 -> 0.7 s
// So two title layers are never visible together, and no text ever sits on the mid-grey of the background tween.
// The height tween stays one 0.7 s ease-in-out timeline; the latest click still wins.
import { gsap } from 'gsap';

const html = document.documentElement;
const DUR = 0.7;
const EASE = 'power2.inOut';
const MOTION = () => html.classList.contains('motion');

type Row = HTMLDetailsElement;
const sumOf = (d: Row) => d.querySelector<HTMLElement>(':scope > summary')!;
const bodyOf = (d: Row) => (Array.from(d.children) as HTMLElement[]).filter((c) => c.tagName !== 'SUMMARY');
const groupOf = (d: Row): Row[] => {
  const n = d.dataset.accName; // the group name, kept here because `name` is held off while a timeline runs
  return n ? Array.from(document.querySelectorAll<Row>('details[data-acc]')).filter((x) => x.dataset.accName === n) : [d];
};
const isOpen = (d: Row) => d.open && !d.classList.contains('acc-off');
const aria = (d: Row) => sumOf(d)?.setAttribute('aria-expanded', String(isOpen(d)));

const running = new Map<Row[], gsap.core.Timeline>();
const ghosts = new Map<Row, HTMLElement>();
const titleOf = (d: Row) => sumOf(d)?.querySelector<HTMLElement>('[data-acc-title]') ?? null;
/** The summary's own children (number, title, toggle), the ghost excluded: what a swap fades out and in. */
const textOf = (d: Row) => (Array.from(sumOf(d)?.children ?? []) as HTMLElement[]).filter((c) => !c.classList.contains('acc-ghost'));
const SNAP = ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing', 'textTransform', 'color', 'textAlign'] as const;
/** The title as it looks now: a fixed copy of its old look, laid exactly over its old place in the summary. */
function snapshot(d: Row): { el: HTMLElement; css: Partial<CSSStyleDeclaration>; box: DOMRect; host: DOMRect } | null {
  const t = titleOf(d); if (!t) return null;
  const cs = getComputedStyle(t); const css: Partial<CSSStyleDeclaration> = {};
  SNAP.forEach((k) => { (css as any)[k] = cs[k]; });
  (css as any).opacity = cs.opacity;
  return { el: t, css, box: t.getBoundingClientRect(), host: sumOf(d).getBoundingClientRect() };
}
function dropGhost(d: Row) { ghosts.get(d)?.remove(); ghosts.delete(d); const t = titleOf(d); if (t) gsap.set(t, { clearProps: 'transition,clipPath' }); }

/** Open `target` (or close it when it is open) inside its group, as one continuous timeline. */
function toggleRow(target: Row) {
  const group = groupOf(target);
  const key = [...running.keys()].find((k) => k.includes(target)) ?? group;
  running.get(key)?.kill();
  const want = new Map(group.map((d) => [d, d === target ? !isOpen(target) : false]));
  if (!MOTION()) { group.forEach((d) => { d.open = want.get(d)!; d.classList.remove('acc-off'); aria(d); }); return; }

  // Native exclusivity would close rows the moment another opens: hold the names off until the timeline ends.
  group.forEach((d) => d.removeAttribute('name'));
  const moving = group.filter((d) => want.get(d) !== isOpen(d) || d.style.height);
  // 1. start heights (current, mid-animation included), and the titles' old look
  const h0 = new Map(moving.map((d) => [d, d.offsetHeight]));
  const snaps = new Map(moving.map((d) => [d, snapshot(d)]));
  moving.forEach(dropGhost);
  // 2. end heights: apply the end state with transitions off, measure, then go back to the start state
  const startState = new Map(moving.map((d) => [d, { open: d.open, off: d.classList.contains('acc-off') }]));
  const endState = (d: Row) => { if (want.get(d)) { d.open = true; d.classList.remove('acc-off'); } else { d.open = false; d.classList.remove('acc-off'); } };
  moving.forEach((d) => { d.classList.remove('acc-anim'); d.style.height = ''; endState(d); });
  const h1 = new Map(moving.map((d) => [d, d.offsetHeight]));
  moving.forEach((d) => { const s = startState.get(d)!; d.open = s.open; d.classList.toggle('acc-off', s.off); d.style.height = `${h0.get(d)}px`; });
  void html.offsetHeight; // commit the start state so the CSS colour transitions run from it
  // 3. the visual end state, with colour / size transitions on (closing rows stay rendered as .acc-off until the end)
  moving.forEach((d) => {
    d.classList.add('acc-anim');
    d.classList.toggle('acc-swap', !!snaps.get(d));
    if (want.get(d)) { d.open = true; d.classList.remove('acc-off'); } else if (d.open) d.classList.add('acc-off');
    aria(d);
  });
  const tl = gsap.timeline({
    onComplete: () => {
      moving.forEach((d) => {
        if (!want.get(d)) { d.open = false; d.classList.remove('acc-off'); }
        d.classList.remove('acc-anim', 'acc-swap'); gsap.set([d, ...bodyOf(d), ...textOf(d)], { clearProps: 'height,opacity,overflow' }); dropGhost(d); aria(d);
      });
      group.forEach((d) => { if (d.dataset.accName) d.setAttribute('name', d.dataset.accName); });
      running.delete(key);
    },
  });
  moving.forEach((d) => {
    tl.fromTo(d, { height: h0.get(d), overflow: 'clip' }, { height: h1.get(d), duration: DUR, ease: EASE, immediateRender: true }, 0);
    const body = bodyOf(d);
    // An opening answer starts from its current opacity when it was already mid-animation, else from 0 (a closed row's
    // body computes opacity 1, which would make the fade a no-op).
    const s0 = startState.get(d)!; const inline = body[0]?.style.opacity;
    const from = inline ? parseFloat(inline) : s0.open && !s0.off ? 1 : 0;
    const s = snaps.get(d);
    if (!s) {
      if (want.get(d)) tl.fromTo(body, { opacity: from }, { opacity: 1, duration: DUR - 0.15, ease: 'sine.inOut', immediateRender: true }, 0.15);
      else tl.to(body, { opacity: 0, duration: 0.3, ease: 'sine.inOut' }, 0);
    } else {
      // Swap (see the header): out on the old background, the background alone, in on the new one.
      if (want.get(d)) {
        tl.fromTo(body, { opacity: from }, { opacity: 0, duration: from ? 0.15 : 0.001, ease: 'sine.out', immediateRender: true }, 0)
          .fromTo(body, { opacity: 0 }, { opacity: 1, duration: DUR - 0.35, ease: 'sine.inOut', immediateRender: false }, 0.35);
      }
      else tl.set(body, { opacity: 0 }, 0);
      const kids = textOf(d).filter((k) => k !== s.el);
      const g = s.el.cloneNode(true) as HTMLElement;
      g.removeAttribute('data-acc-title'); g.removeAttribute('id'); g.setAttribute('aria-hidden', 'true'); g.classList.add('acc-ghost');
      Object.assign(g.style, s.css, { position: 'absolute', margin: '0', left: `${s.box.left - s.host.left}px`, top: `${s.box.top - s.host.top}px`, width: `${s.box.width}px`, transition: 'none', pointerEvents: 'none', textDecoration: 'none' });
      sumOf(d).append(g); ghosts.set(d, g);
      gsap.set(s.el, { transition: 'none' });
      tl.fromTo(g, { opacity: parseFloat(s.css.opacity as string) || 0 }, { opacity: 0, duration: 0.15, ease: 'sine.out', immediateRender: true }, 0)
        .fromTo(s.el, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'sine.inOut', immediateRender: true }, 0.35);
      if (kids.length) tl.to(kids, { opacity: 0, duration: 0.15, ease: 'sine.out' }, 0).to(kids, { opacity: 1, duration: 0.25, ease: 'sine.inOut' }, 0.35);
    }
  });
  tl.eventCallback('onInterrupt', () => moving.forEach(dropGhost));
  running.set(group, tl);
}

/** A dropdown <details data-acc="pop">: the floating list fades / slides; closing waits for the fade. */
function togglePop(d: Row) {
  const list = bodyOf(d);
  gsap.killTweensOf(list);
  if (!MOTION()) { d.open = !d.open; aria(d); return; }
  if (!d.open) {
    d.open = true; aria(d);
    gsap.fromTo(list, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'sine.inOut', clearProps: 'opacity,visibility,transform' });
  } else {
    d.classList.add('acc-off'); aria(d);
    gsap.to(list, { autoAlpha: 0, y: -8, duration: 0.5, ease: 'sine.inOut', onComplete: () => { d.open = false; d.classList.remove('acc-off'); gsap.set(list, { clearProps: 'opacity,visibility,transform' }); aria(d); } });
  }
}

/** Open or close a row from code (a link inside it, the FAQ search): same timeline as a click. */
export function setOpen(d: Row, open: boolean) { if (isOpen(d) !== open) (d.dataset.acc === 'pop' ? togglePop : toggleRow)(d); }

export function initAccordions(root: ParentNode = document) {
  root.querySelectorAll<Row>('details[data-acc]').forEach((d) => {
    if (d.dataset.accOn) return; d.dataset.accOn = '1';
    const name = d.getAttribute('name'); if (name) d.dataset.accName = name;
    const sum = sumOf(d); if (!sum) return;
    aria(d);
    sum.addEventListener('click', (e) => {
      if (!MOTION()) { requestAnimationFrame(() => groupOf(d).forEach(aria)); return; } // native toggle (+ name exclusivity)
      e.preventDefault();
      (d.dataset.acc === 'pop' ? togglePop : toggleRow)(d);
    });
    if (d.dataset.acc === 'pop') {
      d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen(d)) { e.stopPropagation(); togglePop(d); sum.focus(); } });
      document.addEventListener('click', (e) => { if (isOpen(d) && !d.contains(e.target as Node)) togglePop(d); });
    }
  });
}

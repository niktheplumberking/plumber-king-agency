// Service template interactions (Figma 03 STATE boards). Every widget works without motion; motion only adds the scroll
// scrub (process cable) and the hero breaker flip. No JS = the drawn / finished state.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll(s)) as T[];
const html = document.documentElement;
const MOTION = () => html.classList.contains('motion');
const zoom = () => parseFloat(html.style.zoom) || 1;
const desk = window.matchMedia('(min-width: 1024px)');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
const pad = (n: number) => String(n).padStart(2, '0');
const afterHandoff = (f: () => void) => {
  if (!MOTION()) { f(); return; }
  let done = false;
  const go = () => { if (!done) { done = true; f(); } };
  window.addEventListener('pbp:handoff', go, { once: true });
  setTimeout(go, 4000);
};

/** One-of-many selector with roving focus (arrow keys) for role=tab buttons. */
function tabs(btns: HTMLElement[], pick: (i: number) => void) {
  btns.forEach((b, i) => b.addEventListener('keydown', (e) => {
    const k = e.key; let j = -1;
    if (k === 'ArrowRight' || k === 'ArrowDown') j = (i + 1) % btns.length;
    if (k === 'ArrowLeft' || k === 'ArrowUp') j = (i - 1 + btns.length) % btns.length;
    if (k === 'Home') j = 0; if (k === 'End') j = btns.length - 1;
    if (j < 0) return;
    e.preventDefault(); pick(j); btns[j].focus();
  }));
}

/* 3.1 hero: the new 200A main flips ON as the hero plays */
$$('[data-bk-h="new"]').forEach((k) => {
  if (!MOTION()) return;
  k.classList.add('is-off');
  afterHandoff(() => setTimeout(() => k.classList.remove('is-off'), 900));
});

/* 3.2 spec rows open in place, one at a time */
$$('[data-spec]').forEach((lbl) => {
  const rows = $$('.svq-r', lbl);
  rows.forEach((r) => r.querySelector('.svq-b')?.addEventListener('click', () => {
    const open = !r.classList.contains('open');
    rows.forEach((x) => { const on = x === r && open; x.classList.toggle('open', on); x.querySelector('.svq-b')?.setAttribute('aria-expanded', String(on)); });
  }));
});

/* 3.3 magnified bento: one lit card, the loupe magnifies its plate */
$$('[data-signs]').forEach((g) => {
  const cards = $$('[data-sign]', g);
  const rest = (c: HTMLElement) => {
    const pl = c.querySelector<HTMLElement>('[data-plate] svg');
    const lp = c.querySelector<HTMLElement>('.svs-lp');
    const inner = c.querySelector<HTMLElement>('.svs-lpi');
    if (!pl || !lp || !inner) return;
    const w = pl.getBoundingClientRect().width / zoom(), h = pl.getBoundingClientRect().height / zoom();
    aim(c, w / 2, h * 0.27);
  };
  const aim = (c: HTMLElement, x: number, y: number) => {
    const lp = c.querySelector<HTMLElement>('.svs-lp');
    const inner = c.querySelector<HTMLElement>('.svs-lpi');
    if (!lp || !inner) return;
    const r = lp.offsetWidth / 2;
    const left = parseFloat(getComputedStyle(lp).left) || 0, top = parseFloat(getComputedStyle(lp).top) || 0;
    // the lens is fixed on the plate; the magnified copy moves so the point (x, y) of the plate sits in its centre
    void left; void top;
    inner.style.setProperty('--lx', `${r - 2 * x}px`);
    inner.style.setProperty('--ly', `${r - 2 * y}px`);
  };
  const light = (c: HTMLElement) => { cards.forEach((x) => x.classList.toggle('on', x === c)); };
  cards.forEach((c) => {
    rest(c);
    c.addEventListener('pointerenter', () => { if (fine.matches) light(c); });
    c.addEventListener('click', () => light(c));
    c.addEventListener('focusin', () => light(c));
    const pl = c.querySelector<HTMLElement>('[data-plate]');
    pl?.addEventListener('pointermove', (e) => {
      if (!fine.matches) return;
      const q = pl.getBoundingClientRect(), z = zoom();
      aim(c, (e.clientX / z - q.left / z), (e.clientY / z - q.top / z));
    });
    pl?.addEventListener('pointerleave', () => rest(c));
  });
  window.addEventListener('resize', () => cards.forEach(rest));
});

/* 3.4 torch reveal */
$$('[data-torch]').forEach((bh) => {
  const ph = bh.querySelector<HTMLElement>('.svd-ph');
  const ring = bh.querySelector<HTMLElement>('.svd-ring');
  const set = (x: number, y: number) => { [ph, ring].forEach((el) => { el?.style.setProperty('--tx', `${x}px`); el?.style.setProperty('--ty', `${y}px`); }); };
  bh.addEventListener('pointermove', (e) => {
    if (!desk.matches || !fine.matches) return;
    const q = bh.getBoundingClientRect(), z = zoom();
    set(e.clientX / z - q.left / z, e.clientY / z - q.top / z);
  });
  const toggle = () => {
    if (desk.matches && fine.matches) return;
    const on = !bh.classList.contains('lit');
    bh.classList.toggle('lit', on); bh.setAttribute('aria-pressed', String(on));
    set(bh.offsetWidth * 0.62, bh.offsetHeight * 0.52);
  };
  bh.addEventListener('click', toggle);
  bh.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    if (desk.matches && fine.matches) { set(bh.offsetWidth * (Math.random() * 0.4 + 0.45), bh.offsetHeight * (Math.random() * 0.4 + 0.3)); return; }
    toggle();
  });
});

/* 3.5 process: scroll pulls the cable through the studs (desktop pins the section) */
$$('[data-process]').forEach((sec) => {
  const steps = $$('[data-step-i]', sec);
  const ro = sec.querySelector<HTMLElement>('[data-ro]');
  const cab = sec.querySelector<HTMLElement>('.svp-cab');
  const n = steps.length;
  let last = -1;
  const paint = (p: number) => {
    const k = Math.max(1, Math.min(n, Math.floor(p * n * 1.08) + 1));
    const isDesk = desk.matches;
    if (isDesk) {
      const end = p >= 0.98 ? 1440 : 220 + 244 * (k - 1) + Math.min(1, (p * n * 1.08) % 1) * 0;
      sec.style.setProperty('--cw', `${end}px`);
    } else {
      sec.style.setProperty('--cl', `${80 + 160 * (k - 1)}px`);
    }
    if (k !== last) {
      steps.forEach((s, i) => { s.classList.toggle('off', i >= k); s.classList.toggle('now', i === k - 1 && last >= 0); });
      if (ro) ro.textContent = pad(k);
      last = k;
    }
  };
  if (!MOTION() || !cab) return; // static: the finished run (CSS default)
  afterHandoff(() => {
    paint(0);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const st = ScrollTrigger.create({ trigger: sec, start: 'top top', end: '+=1100', pin: sec.querySelector('.svp-pin') ? sec : true, pinSpacing: true, scrub: true, onUpdate: (s) => paint(s.progress) });
      return () => st.kill();
    });
    mm.add('(max-width: 1023px)', () => {
      const st = ScrollTrigger.create({ trigger: sec.querySelector('[data-rig]') || sec, start: 'top 75%', end: 'bottom 55%', onUpdate: (s) => paint(s.progress) });
      return () => st.kill();
    });
  });
});

/* 3.6 before / after drag */
$$('[data-compare]').forEach((w) => {
  const h = w.querySelector<HTMLElement>('[data-handle]');
  let v = 50;
  const set = (p: number) => {
    v = Math.max(4, Math.min(96, p));
    w.style.setProperty('--p', `${v}%`);
    h?.setAttribute('aria-valuenow', String(Math.round(v)));
    h?.setAttribute('aria-valuetext', `${Math.round(v)} % before, ${100 - Math.round(v)} % after`);
  };
  const at = (e: PointerEvent) => {
    const q = w.getBoundingClientRect();
    set(desk.matches ? ((e.clientX - q.left) / q.width) * 100 : ((e.clientY - q.top) / q.height) * 100);
  };
  let drag = false;
  w.addEventListener('pointerdown', (e) => { drag = true; w.setPointerCapture(e.pointerId); at(e); });
  w.addEventListener('pointermove', (e) => { if (drag) at(e); });
  w.addEventListener('pointerup', () => { drag = false; });
  w.addEventListener('pointercancel', () => { drag = false; });
  h?.addEventListener('keydown', (e) => {
    const d = { ArrowLeft: -5, ArrowDown: 5, ArrowRight: 5, ArrowUp: -5, Home: -100, End: 100 }[e.key];
    if (d == null) return;
    e.preventDefault(); set(e.key === 'Home' ? 0 : e.key === 'End' ? 100 : v + (desk.matches ? d : (e.key === 'ArrowDown' ? 5 : e.key === 'ArrowUp' ? -5 : d)));
  });
});

/* 3.7 panel-size slider ticks the load-calculation rows */
$$('[data-slider]').forEach((sl) => {
  const range = sl.querySelector<HTMLInputElement>('[data-range]');
  const tr = sl.querySelector<HTMLElement>('.svr-tr');
  const ro = sl.querySelector<HTMLElement>('[data-ro]');
  const rows = $$('[data-row]', sl.closest('section')!);
  const STOPS: [string, number][] = [['100A', 3], ['125A', 3], ['200A', 4], ['Full panel', 5]];
  const sync = () => {
    const i = Number(range?.value ?? 2);
    const [s, n] = STOPS[i];
    tr?.style.setProperty('--v', String(i));
    const txt = `${s} · he checks ${n} of 5 things`;
    if (ro) ro.textContent = txt;
    range?.setAttribute('aria-valuetext', txt);
    $$('[data-stop]', sl).forEach((x, j) => x.classList.toggle('on', j === i));
    rows.forEach((r, j) => {
      r.classList.toggle('off', j >= n);
      const sr = r.querySelector('[data-sr]'); if (sr) sr.textContent = j < n ? 'Checked' : 'Not needed at this size';
    });
  };
  range?.addEventListener('input', sync);
  sync();
});

/* 3.8 flick through the sign-off pile */
$$('[data-pile]').forEach((pile) => {
  const n = Number(pile.dataset.n || 1);
  const top = pile.querySelector<HTMLElement>('[data-sheet]');
  let cur = 0, busy = false;
  const show = (i: number) => {
    $$('[data-job]', pile).forEach((x, j) => (x.hidden = j !== i));
    $$('[data-jph]', pile).forEach((x, j) => (x.hidden = j !== i));
    $$('[data-jcap]', pile).forEach((x, j) => (x.hidden = j !== i));
    $$('[data-cur]', pile).forEach((x) => (x.textContent = String(i + 1)));
    $$('[data-next]', pile).forEach((b) => b.setAttribute('aria-label', `Sheet ${i + 1} of ${n}. Show the next job.`));
  };
  const next = () => {
    if (busy || n < 2 || !top) return;
    busy = true;
    const fast = !MOTION();
    top.classList.add('out');
    setTimeout(() => {
      cur = (cur + 1) % n; show(cur);
      top.classList.remove('out'); top.classList.add('in');
      requestAnimationFrame(() => requestAnimationFrame(() => { top.classList.remove('in'); busy = false; }));
    }, fast ? 0 : 380);
  };
  $$('[data-next]', pile).forEach((b) => b.addEventListener('click', next));
  let x0: number | null = null;
  top?.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  top?.addEventListener('pointerup', (e) => { if (x0 != null && Math.abs(e.clientX - x0) > 40) next(); x0 = null; });
  top?.addEventListener('pointercancel', () => { x0 = null; });
});

/* 3.9 wire-nut selector */
$$('[data-nuts]').forEach((g) => {
  const btns = $$('[data-nut]', g);
  const wires = g.querySelector<HTMLElement>('.svw-wires');
  const plate = g.querySelector<HTMLElement>('#svw-plate');
  const pick = (i: number) => {
    btns.forEach((b, j) => { b.classList.toggle('on', j === i); b.setAttribute('aria-selected', String(j === i)); b.tabIndex = j === i ? 0 : -1; });
    $$('[data-pc]', g).forEach((c, j) => (c.hidden = j !== i));
    plate?.setAttribute('aria-labelledby', btns[i].id);
    if (wires) { wires.style.setProperty('--r', String(i)); $$('i', wires).forEach((w) => { w.style.animation = 'none'; void w.offsetWidth; w.style.animation = ''; }); }
  };
  btns.forEach((b, i) => b.addEventListener('click', () => pick(i)));
  tabs(btns, pick);
});

/* 3.10 the plug is the tab indicator */
$$('[data-tabs]').forEach((g) => {
  const cards = $$('[data-tip]', g);
  const btns = cards.map((c) => c.querySelector<HTMLElement>('.svv-b')!);
  const cord = g.querySelector<SVGPathElement>('[data-cord]');
  const pick = (i: number) => {
    g.style.setProperty('--t', String(i));
    cards.forEach((c, j) => c.classList.toggle('on', j === i));
    btns.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    if (cord) {
      const x = 380 + i * 340;
      const st = { x: parseFloat(cord.dataset.x || '380') };
      gsap.to(st, { x, duration: MOTION() ? 0.35 : 0, ease: 'back.out(1.4)', onUpdate: () => cord.setAttribute('d', `M0 146 H${st.x - 130} C${st.x - 30} 146 ${st.x} 130 ${st.x} 84`) });
      cord.dataset.x = String(x);
    }
  };
  btns.forEach((b, i) => b.addEventListener('click', () => pick(i)));
  tabs(btns, pick);
});

/* 3.11 FAQ tags pull out */
$$('[data-tags]').forEach((g) => {
  const tags = $$('[data-tag]', g);
  tags.forEach((t) => t.querySelector('.svf-b')?.addEventListener('click', () => {
    const isOpen = t.classList.contains('open');
    if (isOpen && desk.matches) return; // desktop: one tag is always out
    tags.forEach((x) => { const on = x === t && !isOpen; x.classList.toggle('open', on); x.querySelector('.svf-b')?.setAttribute('aria-expanded', String(on)); });
  }));
});

/* 3.12 ceiling cutouts switch on */
$$('[data-cutouts]').forEach((g) => {
  const items = $$('[data-cut]', g);
  const all = () => { g.classList.remove('hovering'); items.forEach((x) => x.classList.add('on')); };
  const one = (it: HTMLElement) => { g.classList.add('hovering'); items.forEach((x) => x.classList.toggle('on', x === it)); };
  items.forEach((it) => {
    it.addEventListener('pointerenter', () => { if (desk.matches && fine.matches) one(it); });
    it.addEventListener('focusin', () => { if (desk.matches) one(it); });
  });
  g.addEventListener('pointerleave', () => { if (desk.matches) all(); });
  g.addEventListener('focusout', (e) => { if (desk.matches && !g.contains(e.relatedTarget as Node)) all(); });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => {
      if (desk.matches) return;
      es.forEach((e) => (e.target as HTMLElement).classList.toggle('on', e.isIntersecting));
    }, { rootMargin: '-35% 0px -35% 0px' });
    items.forEach((it) => io.observe(it));
    desk.addEventListener?.('change', () => { if (desk.matches) all(); });
  }
});

// Services hub interactions (Figma 02 STATE boards). Every widget works without motion; motion only adds the scroll
// steps (stickers ticking, job cards stacking, chat bubbles). No JS = the Figma frame / finished state.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll(s)) as T[];
const html = document.documentElement;
const MOTION = () => html.classList.contains('motion');
const desk = window.matchMedia('(min-width: 1024px)');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
const pad = (n: number) => String(n).padStart(2, '0');
const digits = (v: string) => v.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');

/* 2.1 rocker plate: each field done flips its rocker ON; "Switch it on" lights at 3/3 */
$$<HTMLFormElement>('form[data-rockers]').forEach((form) => {
  const rows = $$('[data-rk]', form);
  const bars = $$('.hp-bars i', form);
  const n = $('[data-hp-n]', form)!;
  const go = $('[data-hp-go]', form)!;
  const sub = $('[data-hp-sub]', form)!;
  const ok = (i: number) => {
    const v = $<HTMLInputElement>('input', rows[i])!.value;
    return i === 1 ? digits(v).length === 10 : v.trim().length > 1;
  };
  const paint = () => {
    const on = rows.map((_, i) => ok(i));
    const c = on.filter(Boolean).length;
    const next = on.indexOf(false);
    rows.forEach((r, i) => {
      r.classList.toggle('on', on[i]); r.classList.toggle('next', i === next);
      $('[data-st]', r)!.textContent = on[i] ? 'On' : i === next ? 'Next' : 'Off';
    });
    bars.forEach((b, i) => b.classList.toggle('on', i < c));
    n.textContent = `${c} / 3 on`;
    go.classList.toggle('lit', c === 3);
    go.querySelector('.tg')?.classList.toggle('is-on', c === 3);
    const left = 3 - c;
    sub.textContent = c === 3 ? 'Lit. Goes straight to Khinda.' : `Flip ${left} more switch${left > 1 ? 'es' : ''} to send.`;
  };
  rows.forEach((r) => {
    const inp = $<HTMLInputElement>('input', r)!;
    inp.addEventListener('input', paint);
    r.addEventListener('click', () => inp.focus());
    inp.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const i = rows.indexOf(r);
      if (i < rows.length - 1) { e.preventDefault(); $<HTMLInputElement>('input', rows[i + 1])!.focus(); }
    });
  });
  paint();
});

/* 2.1 jump chips: open that family box, then scroll to it */
$$<HTMLAnchorElement>('[data-jump]').forEach((a) => a.addEventListener('click', () => openFamily(+a.dataset.jump! - 1)));

/* 2.3 rotary dial */
const dial = $('[data-dial]');
if (dial) {
  const data = JSON.parse($('[data-dial-json]', dial)!.textContent || '[]') as { svc: string; href: string; title: string; body: string; call: string; pic: string }[];
  const btns = $$<HTMLButtonElement>('[data-sym]', dial);
  const ticks = $$('[data-tick]', dial);
  const nums = $$('.hd-mn', dial);
  const face = $('.hd-dial', dial)!;
  const knob = $('[data-knob]', dial)!;
  const cb = $('.hd-cb', dial)!;
  const wire = $<SVGPathElement>('[data-wire]', dial);
  const end = $<SVGCircleElement>('[data-wire-end]', dial);
  // wire starts (section coords, desktop): beside each label, or the tick for the labels left of the dial
  const START: [number, number][] = [[546, 422], [812, 488], [885, 650], [745, 822], [574, 886], [384, 766], [336, 650], [384, 534]];
  let cur = +dial.dataset.dial!, turns = cur * 45;
  const pick = (i: number, focus = false) => {
    i = (i + 8) % 8;
    if (i !== cur) {
      // shortest way round
      let d = (i - cur) * 45; if (d > 180) d -= 360; if (d < -180) d += 360;
      turns += d;
    }
    cur = i;
    face.style.setProperty('--a', `${turns}deg`);
    btns.forEach((b, j) => { b.setAttribute('aria-checked', String(j === i)); b.tabIndex = j === i ? 0 : -1; });
    ticks.forEach((t, j) => t.classList.toggle('on', j === i));
    nums.forEach((t, j) => t.classList.toggle('on', j === i));
    if (focus) btns[i].focus();
    const c = data[i];
    $('[data-c-n]', dial)!.textContent = pad(i + 1);
    $('[data-c-title]', dial)!.textContent = c.title;
    $<HTMLAnchorElement>('[data-c-link]', dial)!.href = c.href;
    $('[data-c-body]', dial)!.textContent = c.body;
    const b1 = $('[data-c-call] .b1', dial); if (b1) b1.textContent = c.call;
    $$<HTMLImageElement>('[data-pic]', dial).forEach((im) => { im.hidden = im.dataset.pic !== c.pic; });
    cb.classList.remove('swap'); void cb.offsetWidth; if (MOTION()) cb.classList.add('swap');
    const [sx, sy] = START[i];
    wire?.setAttribute('d', `M${sx} ${sy}C${(sx + 914) / 2} ${sy} ${(sx + 914) / 2} 560 914 560`);
    end?.setAttribute('cx', '920');
  };
  btns.forEach((b, i) => {
    b.addEventListener('click', () => pick(i));
    b.addEventListener('keydown', (e) => {
      const k = e.key; let j: number | null = null;
      if (k === 'ArrowRight' || k === 'ArrowDown') j = cur + 1;
      if (k === 'ArrowLeft' || k === 'ArrowUp') j = cur - 1;
      if (k === 'Home') j = 0; if (k === 'End') j = 7;
      if (j === null) return;
      e.preventDefault(); pick(j, true);
    });
  });
  // drag the knob: the nearest of the 8 positions wins
  const at = (e: PointerEvent) => {
    const r = knob.getBoundingClientRect();
    const a = Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI;
    return Math.round(((a + 360) % 360) / 45) % 8;
  };
  knob.addEventListener('pointerdown', (e) => {
    knob.setPointerCapture(e.pointerId);
    const mv = (ev: PointerEvent) => { const i = at(ev); if (i !== cur) pick(i); };
    const up = () => { knob.removeEventListener('pointermove', mv); knob.removeEventListener('pointerup', up); knob.removeEventListener('pointercancel', up); };
    knob.addEventListener('pointermove', mv); knob.addEventListener('pointerup', up); knob.addEventListener('pointercancel', up);
    pick(at(e));
  });
}

/* 2.4 families: hover / focus / tap opens one box, the rest fold to rails */
const fams = $$('[data-fam]');
function openFamily(i: number) {
  fams.forEach((f, j) => {
    f.classList.toggle('open', j === i);
    $('[data-fam-btn]', f)?.setAttribute('aria-expanded', String(j === i));
  });
}
fams.forEach((f, i) => {
  const b = $<HTMLButtonElement>('[data-fam-btn]', f)!;
  let t = 0;
  b.addEventListener('click', () => { openFamily(i); $<HTMLAnchorElement>('.hf-w a', f)?.focus({ preventScroll: true }); });
  b.addEventListener('mouseenter', () => { if (!desk.matches || !fine.matches) return; clearTimeout(t); t = window.setTimeout(() => openFamily(i), 120); });
  b.addEventListener('mouseleave', () => clearTimeout(t));
});

/* 2.5 label strips: hover / focus lifts one, the rest drop to 40 %; touch: first tap lifts, second opens */
const strips = $('[data-strips]');
if (strips) {
  const items = $$('.hl-s', strips);
  const lift = (el: Element | null) => {
    items.forEach((s) => s.classList.toggle('lift', s === el));
    strips.classList.toggle('hovering', !!el);
  };
  items.forEach((li) => {
    const a = $<HTMLAnchorElement>('a', li)!;
    li.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') lift(li); });
    a.addEventListener('focus', () => lift(li));
    a.addEventListener('click', (e) => {
      if ((e as PointerEvent).pointerType === 'mouse' || fine.matches) return;
      if (!li.classList.contains('lift') || !strips.classList.contains('hovering')) { e.preventDefault(); lift(li); }
    });
  });
  strips.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') lift(null); });
  strips.addEventListener('focusout', (e) => { if (!strips.contains(e.relatedTarget as Node)) lift(null); });
}

/* 2.6 stickers tick one by one as the section scrolls in; at 4/4 the tape lands */
const stk = $('[data-stickers]');
if (stk) {
  const ps = $$('[data-sticker]', stk);
  const tn = $('[data-tick-n]', stk)!;
  const bars = $$('.hpr-bars i', stk);
  const set = (c: number) => {
    ps.forEach((p, i) => { p.classList.toggle('on', i < c); p.classList.toggle('next', i === c); });
    bars.forEach((b, i) => b.classList.toggle('off', i >= c));
    tn.textContent = String(c);
    stk.classList.toggle('done', c === 4);
  };
  if (MOTION() && 'IntersectionObserver' in window) {
    set(0);
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      [1, 2, 3, 4].forEach((c, k) => setTimeout(() => set(c), 350 + k * 520));
    }, { rootMargin: '0px 0px -35% 0px' });
    io.observe($('.hpr-list', stk)!);
  } else set(4);
}

/* 2.7 job cards stack under the centre head as you scroll */
const tr = $('[data-track]');
if (tr) {
  const cards = $$('[data-card]', tr);
  const rows = $$<HTMLButtonElement>('[data-row]', tr);
  const tns = $$('[data-tn]', tr);
  const ST = ['Landed', 'Arriving', 'Next'];
  // per card: where it waits, where it arrives (tilted), where it lands (desktop / mobile)
  const W = () => (desk.matches ? { x: 426, y: 2, r: -4, o: 1, d: 0.7 } : { x: 0, y: 60, r: 0, o: 0, d: 0 });
  const A = () => (desk.matches ? { x: 35, y: -66, r: 5 } : { x: 22, y: -40, r: 4 });
  const label = (n: number) => {
    tr.dataset.n = String(n);
    tns.forEach((t) => (t.textContent = String(n)));
    rows.forEach((r, i) => {
      const s = i < n - 1 ? 0 : i === n - 1 ? 1 : 2;
      r.className = `ht-row ${['landed', 'arriving', 'next'][s]}`;
      if (s === 1) r.setAttribute('aria-current', 'step'); else r.removeAttribute('aria-current');
      $('[data-rs]', r)!.textContent = n === 3 && i === 2 ? 'Landed' : ST[s];
    });
  };
  // f in [0, 2]: 0 = job 1 landed, 1 = job 2 landed, 2 = job 3 landed
  const paint = (f: number) => {
    const w = W(), a = A();
    cards.forEach((c, i) => {
      let x = 0, y = 0, r = 0, o = 1, d = 0, z = i + 1;
      const t = f - (i - 1); // 0 -> 1 while this card travels
      if (i > 0) {
        if (t <= 0) {
          const nextUp = f > i - 2; // the card right after the travelling one waits in the slot
          x = w.x; y = w.y; r = w.r; o = nextUp ? w.o : 0; d = w.d;
        } else if (t < 1) {
          // wait -> arrive (tilted, above) -> land
          const p = gsap.parseEase('power2.inOut')(t);
          if (p < 0.6) { const q = p / 0.6; x = w.x + (a.x - w.x) * q; y = w.y + (a.y - w.y) * q; r = w.r + (a.r - w.r) * q; o = w.o + (1 - w.o) * Math.min(1, q * 2); d = w.d * Math.max(0, 1 - q * 2); }
          else { const q = (p - 0.6) / 0.4; x = a.x * (1 - q); y = a.y * (1 - q); r = a.r * (1 - q); }
        }
      }
      // cards under the pile sit a touch lower so the stack edge shows
      const under = Math.max(0, Math.floor(f) - i);
      if (under > 0 && t >= 1) y += under * 8;
      gsap.set(c, { x, y, rotation: r, opacity: o, zIndex: z, transformOrigin: '0 0', '--dim': d });
    });
    label(Math.min(3, Math.floor(f + 0.5) + 1));
  };
  const clearCss = () => cards.forEach((c) => c.classList.remove('c2', 'c3'));
  rows.forEach((r, i) => r.addEventListener('click', () => { clearCss(); paint(i); }));
  if (MOTION()) {
    clearCss(); paint(0);
    ScrollTrigger.create({ trigger: $('[data-stage]', tr) || tr, start: 'top 80%', end: 'bottom 45%', scrub: 0.6, onUpdate: (s) => paint(s.progress * 2) });
    desk.addEventListener('change', () => ScrollTrigger.refresh());
  }
}

/* 2.8 fuse block: label-maker search, sleeves, pull to open */
const fz = $('[data-fuses]');
if (fz) {
  const q = $<HTMLInputElement>('[data-q]', fz)!;
  const mn = $('[data-mn]', fz)!;
  const fs = $$('[data-fuse]', fz);
  const sl = $$<HTMLButtonElement>('[data-sleeve]', fz);
  const open = (i: number) => fs.forEach((f, j) => {
    const on = j === i && !f.classList.contains('open');
    f.classList.toggle('open', on);
    $('.hq-b', f)!.setAttribute('aria-expanded', String(on));
    $<HTMLElement>('.hq-a', f)!.hidden = !on;
    $('[data-fs]', f)!.textContent = on ? 'Open' : '250V';
  });
  const filter = () => {
    const words = q.value.toLowerCase().trim().split(/\s+/).filter((w) => w.length > 1);
    let c = 0;
    fs.forEach((f) => {
      const keys = (f.dataset.keys || '') + ' ' + ($('.hq-qt', f)?.textContent || '').toLowerCase();
      const m = words.length > 0 && words.some((w) => keys.split(/\s+/).some((k) => k.startsWith(w)));
      if (m) c++;
      f.classList.toggle('match', m);
      f.classList.toggle('dim', words.length > 0 && !m);
      $('[data-mt]', f)!.textContent = m ? ' · Match' : '';
    });
    mn.textContent = words.length ? `${c} match${c === 1 ? '' : 'es'}` : '';
    sl.forEach((s) => { const on = words.length === 1 && words[0] === s.dataset.sleeve; s.classList.toggle('on', on); s.setAttribute('aria-pressed', String(on)); });
  };
  q.addEventListener('input', filter);
  q.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const m = fs.findIndex((f) => f.classList.contains('match'));
    if (m >= 0 && !fs[m].classList.contains('open')) open(m);
  });
  sl.forEach((s) => s.addEventListener('click', () => {
    q.value = s.classList.contains('on') ? '' : s.dataset.sleeve!;
    filter();
  }));
  fs.forEach((f, i) => $('.hq-b', f)!.addEventListener('click', () => open(i)));
  filter();
}

/* 2.9 chat bubbles come in when the phone is in view */
const chat = $('[data-chat]');
if (chat) {
  if (MOTION() && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { chat.classList.add('in'); io.disconnect(); } }, { rootMargin: '0px 0px -20% 0px' });
    io.observe(chat);
  } else chat.classList.add('in');
}

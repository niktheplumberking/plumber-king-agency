// Interface behaviour (runs with or without motion): header states, mega menus, mobile menu, footer accordions,
// FAQ accordions, carousels, crew patches, mobile call bar, form niceties. Motion-only polish is gated on html.motion.
const html = document.documentElement;
const MOTION = () => html.classList.contains('motion');
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll(s)) as T[];
const desktop = window.matchMedia('(min-width: 1200px)');
const mobile = window.matchMedia('(max-width: 1023px)');

/* ---------- header: compact after 40 px, hides on the way down, returns on the way up ---------- */
function header() {
  const hdr = $('[data-header]');
  if (!hdr) return;
  let last = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    hdr.classList.toggle('is-scrolled', y > 40);
    const menuOpen = !!$('[data-mega]:not([hidden])');
    if (y > 600 && y > last + 4 && !menuOpen) hdr.classList.add('is-hidden');
    else if (y < last - 4 || y <= 600) hdr.classList.remove('is-hidden');
    last = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  hdr.addEventListener('focusin', () => hdr.classList.remove('is-hidden'));
  onScroll();
}

/* ---------- mega menus: hover intent on fine pointers, click/Enter everywhere, Escape closes, focus stays sane ---------- */
function mega() {
  const btns = $$<HTMLButtonElement>('[data-mega-btn]');
  if (!btns.length) return;
  let openKey: string | null = null;
  let timer = 0;
  const panel = (k: string) => $(`[data-mega="${k}"]`);
  const btn = (k: string) => $<HTMLButtonElement>(`[data-mega-btn="${k}"]`);
  const close = (k = openKey, focus = false) => {
    if (!k) return;
    const p = panel(k); const b = btn(k);
    if (p) p.hidden = true;
    b?.setAttribute('aria-expanded', 'false');
    if (focus) b?.focus();
    if (openKey === k) openKey = null;
  };
  const open = (k: string) => {
    if (openKey && openKey !== k) close(openKey);
    const p = panel(k); if (!p) return;
    p.hidden = false; btn(k)?.setAttribute('aria-expanded', 'true'); openKey = k;
    if (MOTION()) {
      p.animate([{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)' });
      $$('[data-mg-col]', p).forEach((c, i) => c.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 480, delay: 60 + i * 55, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }));
    }
  };
  btns.forEach((b) => {
    const k = b.dataset.megaBtn!;
    const li = b.closest('[data-mega-item]') as HTMLElement;
    b.addEventListener('click', () => (openKey === k ? close(k) : open(k)));
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine) {
      li.addEventListener('pointerenter', () => { clearTimeout(timer); timer = window.setTimeout(() => open(k), 90); });
      li.addEventListener('pointerleave', () => { clearTimeout(timer); timer = window.setTimeout(() => { if (!panel(k)?.matches(':hover')) close(k); }, 220); });
      panel(k)?.addEventListener('pointerenter', () => clearTimeout(timer));
      panel(k)?.addEventListener('pointerleave', () => { clearTimeout(timer); timer = window.setTimeout(() => close(k), 220); });
    }
    b.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); open(k); $<HTMLElement>('a', panel(k)!)?.focus(); }
    });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openKey) close(openKey, true); });
  document.addEventListener('click', (e) => {
    if (!openKey) return;
    const t = e.target as Node;
    if (!panel(openKey)?.contains(t) && !btn(openKey)?.contains(t)) close(openKey);
  });
  document.addEventListener('focusin', (e) => {
    if (!openKey) return;
    const t = e.target as Node;
    const li = btn(openKey)?.closest('[data-mega-item]');
    if (!panel(openKey)?.contains(t) && !li?.contains(t)) close(openKey);
  });
  desktop.addEventListener('change', () => close());
}

/* ---------- mobile menu: dialog with focus trap, Escape, scroll lock; reveals from the menu button ---------- */
function mobileMenu() {
  const menu = $<HTMLElement>('[data-mnav]');
  const openBtn = $<HTMLButtonElement>('[data-menu-open]');
  if (!menu || !openBtn) return;
  const closeBtn = $<HTMLButtonElement>('[data-menu-close]', menu);
  const focusables = () => $$<HTMLElement>('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])', menu).filter((el) => el.offsetParent !== null);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables(); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  const open = () => {
    menu.hidden = false; openBtn.setAttribute('aria-expanded', 'true');
    html.style.overflow = 'hidden'; (window as any).__pbpLenis?.stop();
    document.addEventListener('keydown', onKey);
    if (MOTION()) {
      const r = openBtn.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      menu.animate([{ clipPath: `circle(0px at ${cx}px ${cy}px)` }, { clipPath: `circle(${Math.hypot(innerWidth, innerHeight) * 1.05}px at ${cx}px ${cy}px)` }], { duration: 620, easing: 'cubic-bezier(.65,0,.35,1)' });
      $$('[data-mn-item]', menu).forEach((li, i) => li.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 160 + i * 45, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }));
    }
    closeBtn?.focus();
  };
  const close = (restore = true) => {
    if (menu.hidden) return;
    const done = () => {
      menu.hidden = true; openBtn.setAttribute('aria-expanded', 'false');
      html.style.overflow = ''; (window as any).__pbpLenis?.start();
      document.removeEventListener('keydown', onKey);
      if (restore) openBtn.focus();
    };
    if (MOTION()) menu.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-out' }).onfinish = done; else done();
  };
  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', () => close());
  // Any link inside closes the menu (hash links like #estimate need it; page links navigate anyway).
  menu.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) close(false); });
  desktop.addEventListener('change', (e) => { if (e.matches) close(false); });
}

/* ---------- footer columns: accordions on mobile only ("Find us" starts open) ---------- */
function footer() {
  const cols = $$('[data-fcol]');
  const set = (c: HTMLElement, on: boolean) => { c.classList.toggle('is-closed', !on); $('.fh-b', c)?.setAttribute('aria-expanded', String(on)); };
  const apply = () => cols.forEach((c) => set(c, mobile.matches ? c.hasAttribute('data-fcol-open') : true));
  cols.forEach((c) => $('.fh-b', c)?.addEventListener('click', () => { if (mobile.matches) set(c, c.classList.contains('is-closed')); }));
  mobile.addEventListener('change', apply);
  apply();
}

/* ---------- details accordions: smooth height, one open per group (native name= is the no-JS fallback) ---------- */
function accordions() {
  $$<HTMLDetailsElement>('details[data-acc]').forEach((d) => {
    const sum = $('summary', d); const body = $<HTMLElement>('.acc-body', d);
    if (!sum || !body) return;
    let anim: Animation | null = null;
    const shut = (x: HTMLDetailsElement) => {
      const b = $<HTMLElement>('.acc-body', x); if (!b || !x.open) return;
      if (!MOTION()) { x.open = false; return; }
      const h = b.offsetHeight;
      b.animate([{ height: `${h}px`, opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = () => { x.open = false; };
    };
    sum.addEventListener('click', (e) => {
      if (!MOTION()) return; // native toggle
      e.preventDefault();
      anim?.cancel();
      if (d.open) { shut(d); return; }
      const group = d.getAttribute('name');
      if (group) $$<HTMLDetailsElement>(`details[data-acc][name="${group}"]`).forEach((o) => { if (o !== d) shut(o); });
      // Open without the native exclusivity closing others abruptly: drop the name for the moment we set open.
      // Drop the name while the others animate shut: native exclusivity would otherwise close this one again
      // the moment the name returns while a sibling is still open. It comes back once they have closed.
      if (group) d.removeAttribute('name');
      d.open = true;
      if (group) window.setTimeout(() => d.setAttribute('name', group), 420);
      const h = body.offsetHeight;
      anim = body.animate([{ height: '0px', opacity: 0 }, { height: `${h}px`, opacity: 1 }], { duration: 480, easing: 'cubic-bezier(.16,1,.3,1)' });
    });
  });
}

/* ---------- carousels (mobile rails): dots + "n of 6" follow the scroll position ---------- */
function carousels() {
  $$('[data-carousel]').forEach((c) => {
    const track = $('[data-track]', c); if (!track) return;
    const slides = $$('[data-slide]', track);
    const dots = $$('[data-dot]', c);
    const now = $('[data-count-now]', c);
    let raf = 0;
    const update = () => {
      raf = 0;
      const x = track.getBoundingClientRect().left;
      let best = 0, bestD = Infinity;
      slides.forEach((s, i) => { const d = Math.abs(s.getBoundingClientRect().left - x - parseFloat(getComputedStyle(track).paddingLeft || '0')); if (d < bestD) { bestD = d; best = i; } });
      // A track scrolled to its end shows the last slide as current.
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) best = slides.length - 1;
      const di = dots.length && slides.length !== dots.length ? Math.round((best / Math.max(1, slides.length - 1)) * (dots.length - 1)) : best;
      dots.forEach((d, i) => d.classList.toggle('on', i === di));
      if (now) now.textContent = String(best + 1);
    };
    track.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  });
}

/* ---------- crew patches: swap the review bubble; Noah has no pulled review yet -> labelled stand-in ---------- */
function crew() {
  $$('[data-crew]').forEach((root) => {
    const btns = $$<HTMLButtonElement>('[data-crew-btn]', root);
    const card = $('[data-crew-card]', root);
    const real = $('[data-crew-real]', root); const stand = $('[data-crew-stand]', root);
    const q = $('[data-crew-q]', root), by = $('[data-crew-by]', root), meta = $('[data-crew-meta]', root), av = $('[data-crew-av]', root);
    btns.forEach((b) => b.addEventListener('click', () => {
      btns.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
      const has = !!b.dataset.q;
      const swap = () => {
        if (real) real.hidden = !has; if (stand) stand.hidden = has;
        if (has) { if (q) q.textContent = b.dataset.q!; if (by) by.textContent = b.dataset.by!; if (meta) meta.textContent = b.dataset.meta!; if (av) av.textContent = (b.dataset.by || '?')[0]; }
      };
      if (MOTION() && card) {
        card.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(8px) rotate(-.6deg)' }], { duration: 160, easing: 'ease-in' }).onfinish = () => {
          swap();
          card.animate([{ opacity: 0, transform: 'translateY(-8px) rotate(.6deg)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.34,1.56,.64,1)' });
        };
      } else swap();
    }));
  });
}

/* ---------- mobile call bar: appears once the hero has scrolled away, steps aside over the waterline CTA ---------- */
function callBar() {
  const bar = $('[data-mbar]'); if (!bar) return;
  const first = $('main section'); const cta = $('#estimate');
  let pastHero = false, atCta = false;
  const sync = () => bar.classList.toggle('is-on', pastHero && !atCta);
  if (first) new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(first);
  else { pastHero = true; sync(); }
  if (cta) new IntersectionObserver(([e]) => { atCta = e.isIntersecting; sync(); }, { threshold: 0.25 }).observe(cta);
}

/* ---------- form niceties: select placeholder colour, chosen photo file name ---------- */
function formBits() {
  $$<HTMLSelectElement>('select[data-placeholder]').forEach((s) => {
    const set = () => s.classList.toggle('is-empty', !s.value);
    s.addEventListener('change', set); set();
  });
  $$<HTMLInputElement>('input[data-photo]').forEach((inp) => {
    const label = inp.parentElement?.querySelector('[data-photo-label]');
    const orig = label?.textContent ?? '';
    inp.addEventListener('change', () => { if (label) label.textContent = inp.files?.[0] ? `Photo added: ${inp.files[0].name}` : orig; });
  });
}

header(); mega(); mobileMenu(); footer(); accordions(); carousels(); crew(); callBar(); formBits();

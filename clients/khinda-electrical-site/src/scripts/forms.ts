// Forms. Every form[data-estimate-form]: name + a 10-digit phone, said in plain words, then
//  - PUBLIC_FORM_ENDPOINT set: POST multipart (photo included), then /thank-you/; on failure say so and give the number.
//  - not set (preview): straight to /thank-you/ (the data never leaves the browser). README: no backend yet.
// form[data-schedule] (the F panel schedule) is also a one-row-at-a-time stepper: Next validates the row, flips its breaker
// ON and opens the next; the readout counts "0n / 06 ON"; Send flips MAIN, shows the tape, then goes to /thank-you/.
// [data-picker] (Home 1.2): chips are breaker toggles; the readout counts what is picked; "Text a photo" opens an SMS
// (WhatsApp on desktop) to Khinda with the picks typed in.
import { FORM_ENDPOINT, THANK_YOU } from '../lib/form';
import { SITE } from '../data/site';

const digits = (v: string) => v.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
const pad = (n: number) => String(n).padStart(2, '0');
const MOTION = () => document.documentElement.classList.contains('motion');
function mark(input: HTMLInputElement | null, bad: boolean) {
  if (!input) return;
  if (bad) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
}

function schedule(form: HTMLFormElement) {
  const rows = Array.from(form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-row]'));
  const sec = form.closest('section');
  const ro = sec?.querySelector<HTMLElement>('[data-ro]');
  const now = sec?.querySelector<HTMLElement>('[data-ro-now]');
  const msg = form.querySelector<HTMLElement>('[data-form-msg]');
  let cur = 0;
  form.classList.add('js-steps');
  const key = (r: HTMLElement) => r.querySelector('.rk')?.textContent ?? '';
  const paint = () => {
    const done = rows.filter((r) => r.classList.contains('done')).length;
    rows.forEach((r, i) => {
      const st = r.classList.contains('done') ? 'done' : i === cur ? 'active' : 'pending';
      r.classList.remove('active', 'pending'); if (st !== 'done') r.classList.add(st);
      (r as any).inert = st === 'pending';
      r.querySelector('.rbk')?.classList.toggle('is-on', st === 'done');
      const rs = r.querySelector<HTMLElement>('[data-rs]');
      if (rs) rs.textContent = st === 'done' ? 'Added' : st === 'pending' && i === cur + 1 ? 'NEXT' : '';
    });
    if (ro) ro.textContent = `${pad(done)} / 06 ON`;
    sec?.querySelectorAll('.ro-bk i').forEach((b, i) => b.classList.toggle('on', i < done));
    if (now) now.textContent = cur < rows.length ? `NOW · CCT ${pad(cur + 1)} ${key(rows[cur])}` : 'READY · SEND IT';
  };
  const check = (i: number): boolean => {
    const r = rows[i];
    const name = r.querySelector<HTMLInputElement>('input[name="name"]');
    const phone = r.querySelector<HTMLInputElement>('input[name="phone"]');
    let bad = false;
    if (name) { bad = !name.value.trim(); mark(name, bad); if (bad && msg) msg.textContent = 'Please add your name.'; if (bad) name.focus(); }
    if (phone) { bad = digits(phone.value).length !== 10; mark(phone, bad); if (bad && msg) msg.textContent = 'Please add a 10-digit phone number.'; if (bad) phone.focus(); }
    if (!bad && msg) msg.textContent = '';
    return !bad;
  };
  const go = (i: number) => {
    cur = i; paint();
    const r = rows[i];
    const f = r?.querySelector<HTMLElement>('input:not([type="checkbox"]):not([type="radio"]), input');
    if (f) f.focus({ preventScroll: true });
    else form.querySelector<HTMLElement>('[data-send]')?.focus({ preventScroll: true });
  };
  rows.forEach((r, i) => {
    r.querySelector('[data-next]')?.addEventListener('click', () => { if (!check(i)) return; r.classList.add('done'); go(Math.min(i + 1, rows.length)); });
    r.querySelectorAll<HTMLInputElement>('input.fld').forEach((inp) => inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); r.querySelector<HTMLButtonElement>('[data-next]')?.click(); }
    }));
    // A done row reopens on click (edit it); the rows after it keep their state.
    // (The Next click that just finished this row bubbles up here too: ignore it.)
    r.addEventListener('click', (e) => { if ((e.target as Element).closest('[data-next]')) return; if (r.classList.contains('done') && cur !== i) { r.classList.remove('done'); go(i); } });
    // Choosing a time is the last row: it counts as done straight away.
    if (i === rows.length - 1) r.querySelectorAll('input').forEach((inp) => inp.addEventListener('change', () => { r.classList.add('done'); cur = rows.length; paint(); }));
  });
  paint();
  return {
    // Before sending: everything still open counts (name/phone checked by the submit handler), MAIN flips, tape shows.
    sent: () => new Promise<void>((res) => {
      rows.forEach((r) => r.classList.add('done')); cur = rows.length; paint();
      const main = sec?.querySelector<HTMLElement>('[data-main]');
      main?.classList.add('is-on');
      const mt = sec?.querySelector<HTMLElement>('[data-main-t]'); if (mt) mt.textContent = 'MAIN · ON';
      if (now) now.textContent = 'MAIN · ON · SENT';
      const b1 = form.querySelector<HTMLElement>('[data-send] .b1'); if (b1) b1.textContent = 'Sent · MAIN ON';
      const tape = form.querySelector<HTMLElement>('[data-sent-tape]'); if (tape) tape.hidden = false;
      setTimeout(res, MOTION() ? 1100 : 300);
    }),
  };
}

document.querySelectorAll<HTMLFormElement>('form[data-estimate-form]').forEach((form) => {
  const msg = form.querySelector<HTMLElement>('[data-form-msg]');
  const name = form.querySelector<HTMLInputElement>('input[name="name"]');
  const phone = form.querySelector<HTMLInputElement>('input[name="phone"]');
  if (msg && !msg.id) msg.id = `fm-${Math.random().toString(36).slice(2, 8)}`;
  [name, phone].forEach((i) => i?.addEventListener('input', () => mark(i, false)));
  const steps = form.hasAttribute('data-schedule') ? schedule(form) : null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const problems: string[] = [];
    const nameBad = !name?.value.trim();
    const phoneBad = digits(phone?.value ?? '').length !== 10;
    if (nameBad) problems.push('your name');
    if (phoneBad) problems.push('a 10-digit phone number');
    mark(name, nameBad); mark(phone, phoneBad);
    [name, phone].forEach((i) => i && msg && i.setAttribute('aria-describedby', msg.id));
    if (problems.length) {
      if (msg) msg.textContent = `Please add ${problems.join(' and ')}, so Khinda knows who to reach.`;
      const bad = (nameBad ? name : phone)!;
      const row = bad?.closest<HTMLElement>('fieldset[data-row]');
      if (row && steps) { row.classList.remove('done'); row.click(); }
      bad?.focus();
      return;
    }
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
    try {
      if (FORM_ENDPOINT) {
        if (msg) msg.textContent = 'Sending...';
        const fd = new FormData(form);
        fd.append('page', location.pathname);
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`The form service answered ${res.status}.`);
        if (msg) msg.textContent = '';
      }
      if (steps) await steps.sent();
      location.href = THANK_YOU;
    } catch (err) {
      const why = err instanceof Error ? err.message : 'The form could not be sent.';
      if (msg) msg.textContent = `Sorry, that didn't send (${why}) Please call or text ${SITE.phone}.`;
      if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); }
    }
  });
});

/* ---------- Home 1.2 breaker picker ---------- */
document.querySelectorAll<HTMLElement>('[data-picker]').forEach((p) => {
  const boxes = Array.from(p.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));
  const ro = p.querySelector<HTMLElement>('[data-pk-ro]');
  const forTxt = p.querySelector<HTMLElement>('[data-pk-for]');
  const send = p.querySelector<HTMLAnchorElement>('[data-pk-send]');
  const desk = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
  const sync = () => {
    const on = boxes.filter((b) => b.checked);
    const short = on.map((b) => b.dataset.short || b.value);
    if (ro) ro.textContent = on.length ? `${on.length} CIRCUIT${on.length > 1 ? 'S' : ''} OFF` : '0 PICKED';
    if (forTxt) { forTxt.textContent = on.length ? `for: ${short.join(' + ')}` : ''; forTxt.hidden = !on.length; }
    const body = on.length ? `Hi Khinda, ${on.map((b) => b.value.toLowerCase()).join(', ')}. Photo attached.` : 'Hi Khinda, photo attached.';
    if (send) send.href = desk.matches ? `${SITE.whatsapp}?text=${encodeURIComponent(body)}` : `${SITE.sms}?&body=${encodeURIComponent(body)}`;
  };
  boxes.forEach((b) => b.addEventListener('change', sync));
  desk.addEventListener?.('change', sync);
  sync();
});

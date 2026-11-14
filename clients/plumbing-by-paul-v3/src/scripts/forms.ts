// Estimate forms ([data-estimate-form]). Validate name + a 10-digit US phone in plain words, then:
//  - PUBLIC_FORM_ENDPOINT set: POST multipart (photo included) to it, then go to /thank-you; on failure say so plainly
//    and offer the phone number. Nothing is swallowed.
//  - not set (preview): go straight to /thank-you without sending anything (the form data never leaves the browser).
import { FORM_ENDPOINT, THANK_YOU } from '../lib/form';
import { SITE } from '../data/site';

const digits = (v: string) => v.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');

function mark(input: HTMLInputElement | null, bad: boolean) {
  if (!input) return;
  if (bad) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
}

document.querySelectorAll<HTMLFormElement>('form[data-estimate-form]').forEach((form) => {
  const msg = form.querySelector<HTMLElement>('[data-form-msg]');
  const name = form.querySelector<HTMLInputElement>('input[name="name"]');
  const phone = form.querySelector<HTMLInputElement>('input[name="phone"]');
  if (msg && !msg.id) msg.id = `fm-${Math.random().toString(36).slice(2, 8)}`;
  [name, phone].forEach((i) => i?.addEventListener('input', () => mark(i, false)));

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
      if (msg) msg.textContent = `Please add ${problems.join(' and ')} so we can call you back.`;
      (nameBad ? name : phone)?.focus();
      return;
    }
    if (!FORM_ENDPOINT) { location.href = THANK_YOU; return; }
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
    if (msg) msg.textContent = 'Sending...';
    try {
      const fd = new FormData(form);
      fd.append('page', location.pathname);
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`The form service answered ${res.status}.`);
      location.href = THANK_YOU;
    } catch (err) {
      const why = err instanceof Error ? err.message : 'The form could not be sent.';
      if (msg) msg.textContent = `Sorry, that didn't send (${why}) Please call ${SITE.phone} and we'll sort it out.`;
      if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); }
    }
  });
});

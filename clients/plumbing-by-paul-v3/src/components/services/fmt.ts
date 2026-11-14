// Text helpers for the service template. `rich` escapes, turns **x** into <strong> and the office number into a tel link.
import { SITE } from '../../data/site';

export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function rich(s: string, linkPhone = true): string {
  let h = esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  if (linkPhone) h = h.split(esc(SITE.phone)).join(`<a href="${SITE.tel}" class="tel">${esc(SITE.phone)}</a>`);
  return h;
}

/** Strip the markers for plain-text uses (JSON-LD descriptions). */
export const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1');

/** A short, unique id prefix per section so labels never collide on a page. */
export const sid = (slug: string, part: string) => `${slug.replace(/[^a-z0-9]+/g, '-')}-${part}`;

// Review helpers for the areas / town / about pages. Every quote shown is checked at build time against reviews.ts
// (word for word): an excerpt must occur in that person's review text, or the build fails. "…" splits an excerpt into
// parts that must each occur, in order.
import { REVIEWS } from '../../data/reviews';

const norm = (s: string) => s.replace(/[“”"]/g, '"').replace(/[‘’']/g, "'").replace(/\s+/g, ' ').trim();

export function quote(name: string, excerpt: string): string {
  const r = REVIEWS.find((x) => x.name === name);
  if (!r) throw new Error(`reviews: no review by "${name}" in reviews.ts`);
  const text = norm(r.text);
  let from = 0;
  for (const part of excerpt.split(/\s*(?:…|\.\.\.)\s*/).map(norm).filter(Boolean)) {
    const p = part.replace(/^"|"$/g, '');
    const at = text.toLowerCase().indexOf(p.toLowerCase(), from);
    if (at < 0) throw new Error(`reviews: "${p}" is not in ${name}'s review (word for word)`);
    from = at + p.length;
  }
  return excerpt;
}

/** How many of the 16 reviews name a person (any spelling given), counted from reviews.ts. */
export function namedIn(spellings: RegExp): number {
  return REVIEWS.filter((r) => spellings.test(r.text)).length;
}
export const REVIEW_TOTAL = REVIEWS.length;

export const STARS = '<path d="M6.5 0l1.72 4.13 4.46.36-3.4 2.91 1.04 4.36L6.5 9.43l-3.82 2.33 1.04-4.36-3.4-2.91 4.46-.36z"/><path d="M22.5 0l1.72 4.13 4.46.36-3.4 2.91 1.04 4.36-3.82-2.33-3.82 2.33 1.04-4.36-3.4-2.91 4.46-.36z"/><path d="M38.5 0l1.72 4.13 4.46.36-3.4 2.91 1.04 4.36-3.82-2.33-3.82 2.33 1.04-4.36-3.4-2.91 4.46-.36z"/><path d="M54.5 0l1.72 4.13 4.46.36-3.4 2.91 1.04 4.36-3.82-2.33-3.82 2.33 1.04-4.36-3.4-2.91 4.46-.36z"/><path d="M70.5 0l1.72 4.13 4.46.36-3.4 2.91 1.04 4.36-3.82-2.33-3.82 2.33 1.04-4.36-3.4-2.91 4.46-.36z"/>';

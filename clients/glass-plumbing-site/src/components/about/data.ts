// /about counts, all computed from the data files (never typed in): names counted in the 16 reviews of reviews.ts,
// Google counts from site.ts (two separate profiles, never added together).
import { REVIEWS } from '../../data/reviews';
import { namedIn, REVIEW_TOTAL } from '../areas/reviews';
export const KODY = namedIn(/\bKody\b/);
export const ZAK = namedIn(/\bZa(?:k|c|ch)\b/);           // reviewers spell him Zak, Zac and Zach
export const CHASE_BY = REVIEWS.filter((r) => /\bChase\b/.test(r.text)).map((r) => r.name);
export const CHASE = CHASE_BY.length;
export { REVIEW_TOTAL };
export const IG_POSTS = 34; // Figma copy: Instagram @glassplumbingservices post count, read 17 Nov 2026

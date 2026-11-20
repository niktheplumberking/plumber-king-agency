import { SITE } from '../../data/site';
// /about counts, all computed from the data files (never typed in): names counted in the 16 reviews of reviews.ts,
// Google counts from site.ts (two separate profiles, never added together).
import { REVIEWS } from '../../data/reviews';
import { namedIn, REVIEW_TOTAL } from '../areas/reviews';
export const KODY = namedIn(/\bKody\b/);
export const ZAK = namedIn(/\bZa(?:k|c|ch)\b/);           // reviewers spell him Zak, Zac and Zach
export const CHASE_BY = REVIEWS.filter((r) => /\bChase\b/.test(r.text)).map((r) => r.name);
export const CHASE = CHASE_BY.length;
export { REVIEW_TOTAL };
// Instagram @glassplumbingservices, read 17 Nov 2026 in Nick's browser (Nick, R2 20 Nov): verified tick, 653 followers, 34 posts.
export const IG_POSTS = SITE.social.instagramStats.posts;
export const IG_FOLLOWERS = SITE.social.instagramStats.followers;
export const IG_READ = '17 Nov 2026';

// Town pages (PAGES-COPY section 5 + 5.9). One entry per town in TOWN_PAGES (src/data/towns.ts). Corona is the approved
// Figma copy word for word; the other towns swap exactly what 5.9 lists (URL, title, meta, H1, eyebrows, the 5.2 geography
// line, the local Yelp review and the FAQ). Reviews come from REVIEWS (never retyped): `review` = the reviewer's name.
// Geography lines = one plain sentence (county + direction from Riverside). [CONFIRM] Nick checks each before launch.
// No invented landmarks, neighborhoods, ZIPs, drive times or "local water" claims.
import { REVIEWS, type Review } from './reviews';
import { TOWNS, TOWN_PAGES, type Town } from './towns';

type Job = {
  review: string;            // reviewer name in REVIEWS
  townLabel: string;         // the work order's "Town" field
  pronoun: 'his' | 'her';    // "One Corona customer, in his own words."
  h1: string; h2: string;    // section 5.3 headline, two tones
  items: string[];           // work done, check marks (only what the review says)
};
type Faq = { q: string; a: string };
export type TownPage = Town & {
  path: string; title: string; description: string; county: string; regionArea: string;
  geo: string;               // 5.2 first sentence
  sameCounty: boolean;       // 5.2 headline: "Same county, same plumber." only when it is true
  job: Job & { r: Review };
  faq3: Faq;                 // the town's own FAQ (5.7 question 3)
  nearby: Town[];
  map: { s: number; ox: number; oy: number };   // OSM crop for 5.2 (map px -> box px), desktop box 672 x 480
  mapM: { s: number; ox: number; oy: number };  // mobile crop (670:8484 zooms in closer), box 350 x 256
};

// Points on src/assets/photos/map-inland-empire-orange-county-los-angeles.jpg (1129 x 701), measured from the Figma maps.
export const MAP_PTS: Record<string, [number, number]> = {
  riverside: [817, 243], corona: [681, 330], 'moreno-valley': [904, 274], murrieta: [985, 600],
  'buena-park': [394, 352], 'los-angeles': [170, 171], 'west-hollywood': [76, 138],
};
// Corona = the Figma crops exactly; other towns: the same zoom where Riverside and the town both fit, else zoomed out.
function mapFor(slug: string, BOX: { w: number; h: number }, cap: number, corona: { s: number; ox: number; oy: number }) {
  if (slug === 'corona') return corona;
  const [ax, ay] = MAP_PTS.riverside, [bx, by] = MAP_PTS[slug];
  const dx = Math.abs(ax - bx) || 1, dy = Math.abs(ay - by) || 1;
  const s = Math.max(BOX.w / 1129, BOX.h / 701, Math.min(cap, (BOX.w * 0.6) / dx, (BOX.h * 0.56) / dy)); // never smaller than the box
  const cx = (ax + bx) / 2, cy = (ay + by) / 2;
  let ox = BOX.w / 2 - cx * s, oy = BOX.h / 2 + BOX.h * 0.04 - cy * s;
  ox = Math.min(0, Math.max(BOX.w - 1129 * s, ox)); oy = Math.min(0, Math.max(BOX.h - 701 * s, oy));
  return { s: Math.round(s * 1000) / 1000, ox: Math.round(ox), oy: Math.round(oy) };
}

const rev = (name: string) => {
  const r = REVIEWS.find((x) => x.name === name);
  if (!r) throw new Error(`town-pages: no review by ${name}`);
  return r;
};
const town = (slug: string) => TOWNS.find((t) => t.slug === slug)!;

type Entry = Omit<TownPage, keyof Town | 'path' | 'job' | 'nearby' | 'map' | 'mapM' | 'regionArea'> & { job: Job; nearby: string[] };
const DATA: Record<string, Entry> = {
  corona: {
    title: "Plumber in Corona, CA | Mike's Plumbing Services",
    description: 'Plumber serving Corona, CA from our base in Riverside. Leaks, slab leaks, drains, water heaters. Family owned. Free estimate: (951) 809-9533.',
    county: 'Riverside County',
    geo: 'Corona is our neighbor to the southwest along the 91, both in Riverside County.',
    sameCounty: true,
    job: { review: 'Sal C.', townLabel: 'Corona, CA', pronoun: 'his', h1: 'Slab leak.', h2: 'Short notice.', items: ['Slab leak', 'Rerouted water lines', 'New shower valves'] },
    faq3: { q: 'Do you do slab leaks in Corona?', a: 'Yes. Sal C. in Corona hired us for a slab leak, rerouted water lines and new shower valves.' },
    nearby: ['riverside', 'moreno-valley', 'murrieta'],
  },
  'moreno-valley': {
    title: "Plumber in Moreno Valley, CA | Mike's Plumbing Services",
    description: 'Plumber serving Moreno Valley, CA from our base in Riverside. Pressure regulators, shut-off valves, leaks. Family owned. Free estimate: (951) 809-9533.',
    county: 'Riverside County',
    geo: 'Moreno Valley is our neighbor to the east, both in Riverside County.',
    sameCounty: true,
    job: { review: 'Tewolde T.', townLabel: 'Moreno Valley, CA', pronoun: 'his', h1: 'Pressure regulator.', h2: 'Shut-off valves.', items: ['Water pressure regulator', 'Shut-off valve', 'Automatic water shut-off (Wi-Fi)'] },
    faq3: { q: 'Do you install pressure regulators in Moreno Valley?', a: 'Yes. Tewolde T. in Moreno Valley hired us for a water pressure regulator, a shut-off valve and an automatic water shut-off.' },
    nearby: ['riverside', 'corona', 'murrieta'],
  },
  murrieta: {
    title: "Plumber in Murrieta, CA | Mike's Plumbing Services",
    description: 'Plumber serving Murrieta, CA from our base in Riverside. Garbage disposals, leaks, drains, water heaters. Family owned. Free estimate: (951) 809-9533.',
    county: 'Riverside County',
    geo: 'Murrieta is to the south of Riverside, both in Riverside County.',
    sameCounty: true,
    job: { review: 'Jack D.', townLabel: 'Murrieta, CA', pronoun: 'his', h1: 'Garbage disposal.', h2: 'Installed quickly.', items: ['Garbage disposal', 'New disposal installed'] },
    faq3: { q: 'Do you install garbage disposals in Murrieta?', a: 'Yes. Jack D. called us when his garbage disposal began to malfunction after his move to Murrieta, and we installed a new one.' },
    nearby: ['riverside', 'corona', 'moreno-valley'],
  },
  'buena-park': {
    title: "Plumber in Buena Park, CA | Mike's Plumbing Services",
    description: 'Plumber serving Buena Park, CA from our base in Riverside. Leaks, drains, water heaters, toilets. Family owned. Free estimate: (951) 809-9533.',
    county: 'Orange County',
    geo: 'Buena Park is to the west of Riverside, in Orange County.',
    sameCounty: false,
    job: { review: 'Erik N.', townLabel: 'Buena Park, CA', pronoun: 'his', h1: 'Great service.', h2: 'Will use again.', items: ['Plumbing service', 'Work done the same day'] },
    faq3: { q: 'Have you worked in Buena Park?', a: 'Yes. Erik N. in Buena Park hired us and wrote on Yelp that he would recommend us and will use us again.' },
    nearby: ['los-angeles', 'corona', 'riverside'],
  },
  'los-angeles': {
    title: "Plumber in Los Angeles, CA | Mike's Plumbing Services",
    description: 'Plumber serving Los Angeles, CA from our base in Riverside. Toilets, pressure regulators, leaks, drains. Family owned. Free estimate: (951) 809-9533.',
    county: 'Los Angeles County',
    geo: 'Los Angeles is to the west of Riverside, in Los Angeles County.',
    sameCounty: false,
    job: { review: 'Eleanor M.', townLabel: 'Los Angeles, CA', pronoun: 'her', h1: 'Three toilets.', h2: 'One regulator.', items: ['3 toilets replaced', 'Pressure regulator', 'Worked around other repairs'] },
    faq3: { q: 'Do you replace toilets in Los Angeles?', a: 'Yes. Eleanor M. in Los Angeles had us replace 3 toilets and a pressure regulator.' },
    nearby: ['west-hollywood', 'buena-park', 'riverside'],
  },
  'west-hollywood': {
    title: "Plumber in West Hollywood, CA | Mike's Plumbing Services",
    description: 'Plumber serving West Hollywood, CA from our base in Riverside. Toilets, leaks, drains, water heaters. Family owned. Free estimate: (951) 809-9533.',
    county: 'Los Angeles County',
    geo: 'West Hollywood is to the west of Riverside, in Los Angeles County.',
    sameCounty: false,
    job: { review: 'Bruce H.', townLabel: 'West Hollywood, CA', pronoun: 'his', h1: 'New toilet.', h2: 'Upstairs.', items: ['Old toilet replaced', 'New upstairs toilet installed'] },
    faq3: { q: 'Do you install toilets in West Hollywood?', a: 'Yes. Bruce H. in West Hollywood had us replace and install a new upstairs toilet.' },
    nearby: ['los-angeles', 'buena-park', 'riverside'],
  },
};

const AREA: Record<Town['region'], string> = { 'Inland Empire': 'Inland Empire', 'Orange County': 'Orange County', 'Los Angeles': 'Los Angeles' };

export const TOWN_PAGE_DATA: TownPage[] = TOWN_PAGES.map((t) => {
  const e = DATA[t.slug];
  if (!e) throw new Error(`town-pages: no data for ${t.slug}`);
  return {
    ...t, ...e, path: t.href, regionArea: AREA[t.region],
    job: { ...e.job, r: rev(e.job.review) },
    nearby: e.nearby.map(town),
    map: mapFor(t.slug, { w: 672, h: 480 }, 1.59, { s: 1.59, ox: -888, oy: -238 }),
    mapM: mapFor(t.slug, { w: 350, h: 256 }, 1.157, { s: 1.157, ox: -691, oy: -207 }),
  };
});

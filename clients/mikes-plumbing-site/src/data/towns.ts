// Towns from his Yelp reviewers + Riverside (PAGES-COPY section 6.2). Mike to confirm the list.
// Riverside links to the home page (its H1 is "Plumber in Riverside, CA"); every other town has a page /plumber-<slug>-ca.
export type Town = { name: string; slug: string; region: 'Inland Empire' | 'Orange County' | 'Los Angeles'; href: string };
const t = (name: string, slug: string, region: Town['region']): Town => ({ name, slug, region, href: slug === 'riverside' ? '/' : `/plumber-${slug}-ca` });
export const TOWNS: Town[] = [
  t('Riverside', 'riverside', 'Inland Empire'),
  t('Corona', 'corona', 'Inland Empire'),
  t('Moreno Valley', 'moreno-valley', 'Inland Empire'),
  t('Murrieta', 'murrieta', 'Inland Empire'),
  t('Buena Park', 'buena-park', 'Orange County'),
  t('Los Angeles', 'los-angeles', 'Los Angeles'),
  t('West Hollywood', 'west-hollywood', 'Los Angeles'),
];
export const TOWN_PAGES = TOWNS.filter((x) => x.slug !== 'riverside');

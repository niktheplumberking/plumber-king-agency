// Towns. `page` = has its own town page (built in phase 2/3). Others are "on our route" chips, never links (STICKY 8).
export interface Town { name: string; slug?: string; page?: string; }
export const TOWNS_LINKED: Town[] = [
  { name: 'St. Petersburg', page: '/service-areas' }, // home base: the hub page covers St. Pete
  { name: 'Clearwater', slug: 'clearwater-fl', page: '/service-areas/clearwater-fl' },
  { name: 'Seminole', slug: 'seminole-fl', page: '/service-areas/seminole-fl' },
];
export const TOWNS_ROUTE: Town[] = [
  'Largo', 'Pinellas Park', 'Gulfport', 'St. Pete Beach', 'Treasure Island', 'Madeira Beach',
  'Dunedin', 'Palm Harbor', 'Safety Harbor', 'Kenneth City',
].map((name) => ({ name }));
/** Town band marquee order (PAGES.md G2). */
export const TOWN_BAND = [
  'St. Petersburg', 'Clearwater', 'Seminole', 'Largo', 'Pinellas Park', 'Gulfport', 'St. Pete Beach',
  'Treasure Island', 'Madeira Beach', 'Dunedin', 'Palm Harbor', 'Safety Harbor', 'Kenneth City',
];

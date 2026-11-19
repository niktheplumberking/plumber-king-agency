// Towns served (LOCAL-FACTS.md section 1: Census 2024 Gazetteer points, straight-line miles from Largo base, NOT driving).
export type Town = { name: string; slug: string; group: 'Central' | 'North' | 'South' | 'Beaches'; mi: number; page?: string };
export const TOWNS: Town[] = [
  { name: 'Largo', slug: 'largo', group: 'Central', mi: 1.3 },
  { name: 'Belleair', slug: 'belleair', group: 'Central', mi: 2.3 },
  { name: 'Belleair Bluffs', slug: 'belleair-bluffs', group: 'Central', mi: 2.7 },
  { name: 'Clearwater', slug: 'clearwater', group: 'Central', mi: 3.6 },
  { name: 'Seminole', slug: 'seminole', group: 'Central', mi: 5.9, page: '/areas/seminole' },
  { name: 'Pinellas Park', slug: 'pinellas-park', group: 'Central', mi: 6.3 },
  { name: 'Kenneth City', slug: 'kenneth-city', group: 'Central', mi: 8.6 },
  { name: 'Safety Harbor', slug: 'safety-harbor', group: 'North', mi: 7.3 },
  { name: 'Dunedin', slug: 'dunedin', group: 'North', mi: 7.7 },
  { name: 'Oldsmar', slug: 'oldsmar', group: 'North', mi: 10.5 },
  { name: 'Palm Harbor', slug: 'palm-harbor', group: 'North', mi: 10.9 },
  { name: 'Tarpon Springs', slug: 'tarpon-springs', group: 'North', mi: 15.3 },
  { name: 'Gulfport', slug: 'gulfport', group: 'South', mi: 13.1 },
  { name: 'St. Petersburg', slug: 'st-petersburg', group: 'South', mi: 13.9 },
  { name: 'Belleair Beach', slug: 'belleair-beach', group: 'Beaches', mi: 3.7 },
  { name: 'Indian Rocks Beach', slug: 'indian-rocks-beach', group: 'Beaches', mi: 4.8 },
  { name: 'Redington Shores', slug: 'redington-shores', group: 'Beaches', mi: 7.5 },
  { name: 'Madeira Beach', slug: 'madeira-beach', group: 'Beaches', mi: 9.1 },
  { name: 'Treasure Island', slug: 'treasure-island', group: 'Beaches', mi: 11.2 },
  { name: 'St. Pete Beach', slug: 'st-pete-beach', group: 'Beaches', mi: 14.7 },
];

// St. Petersburg (base) + 15 Pinellas County towns. Coordinates from OpenStreetMap (Nominatim, 12 Nov 2026).
// "side" tells the map which side of the pin the label sits on. Neighbours drive the internal links on town pages.
// Only St. Petersburg, Clearwater and Seminole are named on Paul's current site; the rest follow from "all of Pinellas County".
import { SITE } from './site';

export interface Town { slug: string; name: string; lat: number; lng: number; side: 'l' | 'r'; neighbours: string[]; named?: boolean }

export const BASE: Town = { slug: '', name: 'St. Petersburg', lat: 27.77123, lng: -82.63403, side: 'r', neighbours: ['Gulfport', 'Kenneth City', 'Pinellas Park', 'Treasure Island'], named: true };

export const TOWNS: Town[] = [
  { slug: 'plumber-clearwater-fl', name: 'Clearwater', lat: 27.96585, lng: -82.8001, side: 'l', neighbours: ['Largo', 'Belleair', 'Dunedin', 'Safety Harbor'], named: true },
  { slug: 'plumber-seminole-fl', name: 'Seminole', lat: 27.84009, lng: -82.79112, side: 'l', neighbours: ['Largo', 'Madeira Beach', 'Pinellas Park', 'Kenneth City'], named: true },
  { slug: 'plumber-largo-fl', name: 'Largo', lat: 27.90947, lng: -82.78732, side: 'r', neighbours: ['Clearwater', 'Belleair', 'Seminole', 'Pinellas Park'] },
  { slug: 'plumber-pinellas-park-fl', name: 'Pinellas Park', lat: 27.8428, lng: -82.69954, side: 'r', neighbours: ['Kenneth City', 'Seminole', 'Largo', 'St. Petersburg'] },
  { slug: 'plumber-dunedin-fl', name: 'Dunedin', lat: 28.01166, lng: -82.78938, side: 'l', neighbours: ['Clearwater', 'Palm Harbor', 'Safety Harbor'] },
  { slug: 'plumber-palm-harbor-fl', name: 'Palm Harbor', lat: 28.07807, lng: -82.76371, side: 'l', neighbours: ['Dunedin', 'Tarpon Springs', 'Oldsmar'] },
  { slug: 'plumber-tarpon-springs-fl', name: 'Tarpon Springs', lat: 28.1471, lng: -82.75637, side: 'l', neighbours: ['Palm Harbor', 'Oldsmar', 'Dunedin'] },
  { slug: 'plumber-safety-harbor-fl', name: 'Safety Harbor', lat: 27.99085, lng: -82.69316, side: 'r', neighbours: ['Clearwater', 'Oldsmar', 'Dunedin'] },
  { slug: 'plumber-oldsmar-fl', name: 'Oldsmar', lat: 28.03418, lng: -82.6651, side: 'r', neighbours: ['Safety Harbor', 'Palm Harbor', 'Tarpon Springs'] },
  { slug: 'plumber-gulfport-fl', name: 'Gulfport', lat: 27.74836, lng: -82.70343, side: 'r', neighbours: ['St. Petersburg', 'St. Pete Beach', 'Treasure Island', 'Kenneth City'] },
  { slug: 'plumber-treasure-island-fl', name: 'Treasure Island', lat: 27.76919, lng: -82.76899, side: 'l', neighbours: ['Madeira Beach', 'St. Pete Beach', 'Gulfport', 'St. Petersburg'] },
  { slug: 'plumber-st-pete-beach-fl', name: 'St. Pete Beach', lat: 27.72531, lng: -82.74121, side: 'l', neighbours: ['Treasure Island', 'Gulfport', 'St. Petersburg'] },
  { slug: 'plumber-madeira-beach-fl', name: 'Madeira Beach', lat: 27.79808, lng: -82.79732, side: 'l', neighbours: ['Seminole', 'Treasure Island', 'Kenneth City'] },
  { slug: 'plumber-kenneth-city-fl', name: 'Kenneth City', lat: 27.81558, lng: -82.7201, side: 'r', neighbours: ['Pinellas Park', 'St. Petersburg', 'Seminole', 'Gulfport'] },
  { slug: 'plumber-belleair-fl', name: 'Belleair', lat: 27.93585, lng: -82.80621, side: 'l', neighbours: ['Clearwater', 'Largo', 'Seminole'] },
];

export const townBySlug = (slug: string) => TOWNS.find((t) => t.slug === slug);
export const townByName = (name: string) => (name === BASE.name ? BASE : TOWNS.find((t) => t.name === name));
// Town pages that exist today (others are still to be built: see AGENT-BRIEF.md). Links only point at built pages.
export const BUILT_TOWNS = ['plumber-clearwater-fl', 'plumber-largo-fl'];
export const townHref = (t: Town) => (t.slug === '' ? '/' : BUILT_TOWNS.includes(t.slug) ? `/${t.slug}/` : null);

// Straight-line miles from the shop (measured from coordinates, not a drive time).
export function milesFromShop(t: Town): number {
  const R = 3958.8, rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(t.lat - SITE.geo.lat), dLng = rad(t.lng - SITE.geo.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(SITE.geo.lat)) * Math.cos(rad(t.lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
}

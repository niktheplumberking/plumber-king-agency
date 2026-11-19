// Site navigation for the global chrome (header, mobile menu, footer). Every href is a built route (BUILD-BRIEF section 2):
// services without their own page go to their family card on /services, towns without a page to their row on /areas.
import { SITE } from '../../data/site';

/** Header nav. `w` = the Figma text box width at 1440 (items sit at Figma x with 30 px gaps whatever the font rasteriser does). */
export const MAIN: { label: string; href: string; w: number }[] = [
  { label: 'Services', href: '/services', w: 62 },
  { label: 'Areas', href: '/areas', w: 42 },
  { label: 'Our work', href: '/our-work', w: 65 },
  { label: 'Reviews', href: '/reviews', w: 58 },
  { label: 'About', href: '/about', w: 44 },
  { label: 'Contact', href: '/contact', w: 57 },
];

/** Footer "Services" column (Figma footer, all pages). */
export const SERVICES = [
  { label: 'Water heaters', href: '/services/water-heaters' },
  { label: 'Tankless water heaters', href: '/services#hot-water' },
  { label: 'Softeners & filters', href: '/services#hot-water' },
  { label: 'Drain cleaning', href: '/services#drains-fixtures' },
  { label: 'Leak repair', href: '/services#leaks-lines' },
  { label: 'Water line repair', href: '/services#leaks-lines' },
  { label: 'Repiping', href: '/services#leaks-lines' },
  { label: 'Emergency plumber', href: '/services#leaks-lines' },
];

/** Footer "Areas" column. */
export const AREAS = [
  { label: 'Largo', href: '/areas#town-largo' },
  { label: 'Seminole', href: '/areas/seminole' },
  { label: 'Clearwater', href: '/areas#town-clearwater' },
  { label: 'St. Petersburg', href: '/areas#town-st-petersburg' },
  { label: 'Belleair Bluffs', href: '/areas#town-belleair-bluffs' },
  { label: 'Pinellas Park', href: '/areas#town-pinellas-park' },
  { label: 'All areas →', href: '/areas' },
];

/** Footer "Company" column. Figma also lists Facebook: there is no Facebook URL in site.ts, so it is left out (Kody to confirm). */
export const COMPANY: { label: string; href: string; external?: boolean }[] = [
  { label: 'About', href: '/about' },
  { label: 'Our work', href: '/our-work' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Instagram', href: SITE.social.instagram, external: true },
];

/** Is `href` the current section? (Header active bar: Services also on /services/*, Areas also on /areas/*.) */
export const isCurrent = (path: string, href: string) => path === href || path.startsWith(href + '/');

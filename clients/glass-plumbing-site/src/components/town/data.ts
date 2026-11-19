// /areas/seminole shared copy. Facts only from towns.ts (miles), site.ts and the Figma frames 723:437 / 723:1034.
import { TOWNS } from '../../data/towns';
export const TOWN = TOWNS.find((t) => t.slug === 'seminole')!;
export const MI = `${TOWN.mi} mi`;
export const QUICK = `Glass Plumbing Services fixes leaks, drains, water heaters and showers in Seminole, a short drive from our Largo base. Licensed CFC1432488. Call or text a photo.`;
// City FAQ (visible text = FAQPage JSON-LD).
export const FAQ = [
  { q: 'Which office issues my permit?', a: 'Your city’s building office, or Pinellas County if your home is in an unincorporated area. We check your address and file it.', word: 'City or County', tone: 'ink', w: 639, s: 91, sm: 49 },
  { q: 'Is Seminole water hard?', a: 'Yes. Seminole is on Pinellas County water, which averages 217 ppm hardness, or 11.1 to 14.3 grains per gallon.', word: '217 ppm', tone: 'pdeep', w: 440, s: 110, sm: 60 },
  { q: 'How fast can you get here?', a: `We are based ${TOWN.mi} miles away in Largo. Call and we will tell you when we can come.`, word: MI, tone: 'ink', w: 323, s: 110, sm: 60 },
];

// /areas/seminole shared copy. Facts only from towns.ts (miles), site.ts, research LOCAL-FACTS.md and the Figma frames.
// Fix round B: no Seminole-specific water or housing claim (research has none); permits hedged per LOCAL-FACTS section 3.
import { TOWNS } from '../../data/towns';
export const TOWN = TOWNS.find((t) => t.slug === 'seminole')!;
export const MI = `${TOWN.mi} mi`;
export const QUICK = `Glass Plumbing Services fixes leaks, drains, water heaters and showers in Seminole, a short drive from our Largo base. Licensed CFC1432488. Call or text a photo.`;
// City FAQ (visible text = FAQPage JSON-LD).
export const FAQ = [
  { q: 'Which office issues my permit?', a: 'Inside the City of Seminole, ask the city’s building department. In unincorporated Pinellas, it is Pinellas County. Not sure which you are? Ask us on the call.', word: 'City or County', tone: 'ink', w: 639, s: 91, sm: 49 },
  { q: 'Is the water hard here?', a: 'Pinellas County Utilities water averages 217 ppm hardness, or 11.1 to 14.3 grains per gallon (2025 report). Your water bill shows which utility serves your home.', word: '217 ppm', tone: 'pdeep', w: 440, s: 110, sm: 60 },
  { q: 'How fast can you get here?', a: `We are based ${TOWN.mi} miles away in Largo. Call and we will tell you when we can come.`, word: MI, tone: 'ink', w: 323, s: 110, sm: 60 },
];

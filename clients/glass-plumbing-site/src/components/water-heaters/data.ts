// /services/water-heaters FAQ: question 01 and its answer are the Figma's (719:437 FAQ); 02-04 answers are the Figma copy of
// the FAQ page (730:437), word for word. Each row's preview photo is used nowhere else on this page.
import { SITE } from '../../data/site';
export const WH_FAQ: { q: string; a: string; photo: string; alt: string }[] = [
  { q: 'Tank or tankless for a Florida home?', a: 'It depends on how much hot water you use at once and whether you have gas. Tankless heats on demand and hangs on the wall. A tank stores hot water and usually costs less to fit.', photo: 'crew-crawlspace', alt: 'A Glass plumber working in a crawlspace' },
  { q: 'How hard is our water?', a: 'Very hard. It averages 217 ppm, which is 11.1 to 14.3 grains per gallon. That builds scale inside tanks and tankless units.', photo: 'water-softener', alt: 'A water softener installed by Glass Plumbing' },
  { q: 'Do you need a permit?', a: 'Usually, yes. Pinellas County lists a “Water Heater Equal Change Out, Tank or Tankless” express permit for unincorporated areas, and Clearwater requires permits for water heaters. Largo and other cities: check with the city’s permit office.', photo: 'water-heater-expansion-tank', alt: 'A new water heater being installed in a closet, its expansion tank on the floor beside it, with the words “Floor Drain Built In” on the photo' },
  { q: 'Can you install the same day?', a: 'Not promised for every job, but 3 of the 16 reviews we hold mention the next day. One customer wrote: “called and had one installed the next day”.', photo: 'hero-crew-job', alt: 'A Glass plumber on a job beside the Glass van' },
];
export const WH_SMS = SITE.sms;

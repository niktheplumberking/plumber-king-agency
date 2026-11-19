// Copy for /services, word for word from the Figma frames (services 718:522 / 718:1276). Service pages that are not built
// in this preview link to their family card on /services (BUILD-BRIEF section 2); water heaters has its own page.
export const WH = '/services/water-heaters';

export type Family = {
  id: string; n: string; name: string; nameM?: string; chip: string; chipM: string; photo: string; alt: string; focus?: string;
  services: { name: string; href: string }[];
};
const fam = (id: string) => `/services#${id}`;
export const FAMILIES: Family[] = [
  { id: 'hot-water', n: '01', name: 'Hot water', chip: 'Hot water', chipM: 'Hot water', photo: 'tankless-pair',
    alt: 'Two tankless water heaters mounted on a brick wall', focus: '50% 40%',
    services: [{ name: 'Water heaters', href: WH }, { name: 'Tankless water heaters', href: fam('hot-water') }, { name: 'Water softeners & filtration', href: fam('hot-water') }] },
  { id: 'leaks-lines', n: '02', name: 'Leaks, lines & repipes', chip: 'Leaks, lines & repipes', chipM: 'Leaks & lines', photo: 'water-line-excavator',
    alt: 'A Glass plumber on a mini excavator digging for a water line', focus: '50% 50%',
    services: [{ name: 'Leak repair', href: fam('leaks-lines') }, { name: 'Water line repair', href: fam('leaks-lines') }, { name: 'Repiping', href: fam('leaks-lines') }, { name: '24/7 emergency plumber', href: fam('leaks-lines') }] },
  { id: 'drains-fixtures', n: '03', name: 'Drains, toilets & fixtures', chip: 'Drains, toilets & fixtures', chipM: 'Drains & fixtures', photo: 'kitchen-faucet',
    alt: 'A new kitchen faucet over a granite counter', focus: '50% 40%',
    services: [{ name: 'Drain cleaning', href: fam('drains-fixtures') }, { name: 'Toilets & faucets', href: fam('drains-fixtures') }, { name: 'Shower & tub valves', href: fam('drains-fixtures') }] },
  { id: 'remodel-commercial', n: '04', name: 'Remodel, new build & commercial', chip: 'Remodel & commercial', chipM: 'Remodel & commercial', photo: 'shower-remodel',
    alt: 'A finished walk-in shower with white tile and a pebble floor', focus: '50% 50%',
    services: [{ name: 'Remodel & new construction', href: fam('remodel-commercial') }, { name: 'Commercial plumbing', href: fam('remodel-commercial') }] },
];

/** The full list (Figma "parts list"): 15 jobs; the last three are "call" items (no page yet). */
export const JOBS: { name: string; covers: string; href?: string }[] = [
  { name: 'Water heaters', covers: 'Tank repair and replacement', href: WH },
  { name: 'Tankless water heaters', covers: 'Single units and pairs', href: fam('hot-water') },
  { name: 'Water softeners & filtration', covers: 'Softeners, whole-house filters', href: fam('hot-water') },
  { name: 'Drain cleaning', covers: 'Sinks, showers, sewer lines', href: fam('drains-fixtures') },
  { name: 'Leak repair', covers: 'Pipes, fittings, slab and wall', href: fam('leaks-lines') },
  { name: 'Water line repair', covers: 'Main to the house', href: fam('leaks-lines') },
  { name: 'Repiping', covers: 'Whole-house and partial', href: fam('leaks-lines') },
  { name: 'Shower & tub valves', covers: 'Valve upgrades and trims', href: fam('drains-fixtures') },
  { name: 'Toilets & faucets', covers: 'Repair and replace', href: fam('drains-fixtures') },
  { name: 'Remodel & new construction', covers: 'Rough-in to finish', href: fam('remodel-commercial') },
  { name: 'Commercial plumbing', covers: 'Repairs and build-outs', href: fam('remodel-commercial') },
  { name: '24/7 emergency plumber', covers: 'Burst pipes, flooding', href: fam('leaks-lines') },
  { name: 'Washer hookups', covers: 'New lines, better layout' },
  { name: 'Pipe relocation', covers: 'Move lines for a remodel' },
  { name: 'Floor drains', covers: 'Install and clear' },
];

/** Symptom picker: water level in each sight glass is the Figma's (water height / glass height). */
export const SYMPTOMS: { name: string; nameM?: string; job: string; jobM?: string; href: string; fill: number; fillM: number }[] = [
  { name: 'No hot water', job: 'Water heaters', href: WH, fill: 0.05, fillM: 0.05 },
  { name: 'Water on the floor', job: 'Leak repair', href: fam('leaks-lines'), fill: 0.285, fillM: 0.28 },
  { name: 'Drain slow or backing up', job: 'Drain cleaning', href: fam('drains-fixtures'), fill: 0.57, fillM: 0.56 },
  { name: 'Low water pressure', job: 'Water line repair', href: fam('leaks-lines'), fill: 0.14, fillM: 0.14 },
  { name: 'Shower drips or won’t shut off', nameM: 'Shower drips', job: 'Shower & tub valves', href: fam('drains-fixtures'), fill: 0.43, fillM: 0.43 },
  { name: 'White crust on fixtures', job: 'Softeners & filtration', jobM: 'Softeners & filters', href: fam('hot-water'), fill: 0.76, fillM: 0.76 },
  { name: 'Toilet keeps running', job: 'Toilets & faucets', href: fam('drains-fixtures'), fill: 0.475, fillM: 0.47 },
  { name: 'Water bill jumped', job: 'Leak repair', href: fam('leaks-lines'), fill: 0.855, fillM: 0.85 },
];

/** FAQ explorer tabs. Only the Remodel tab's first answer is drawn in the Figma (718:522 FAQ); every other answer is the
 *  Figma copy of the FAQ page (730:437), Home or a review, word for word (see handoff/qa/services/REPORT.md). */
export type Faq = { q: string; a: string; chip?: { label: string; href: string } };
export const FAQ_TABS: { id: string; name: string; items: Faq[] }[] = [
  { id: 'hot', name: 'Hot water', items: [
    { q: 'Tank or tankless for a Florida home?', a: 'It depends on how much hot water you use at once and whether you have gas. Tankless heats on demand and hangs on the wall. A tank stores hot water and costs less to fit.', chip: { label: 'See water heaters →', href: WH } },
    { q: 'How fast can you put in a new one?', a: 'Often the next day. One customer wrote: “called and had one installed the next day”.' },
    { q: 'My water heater sat in storm flood water. Can I use it?', a: 'Don’t turn it on. A heater that sat in flood water, salt water above all, usually needs replacing. Call and we check it first.' },
  ] },
  { id: 'leaks', name: 'Leaks & lines', items: [
    { q: 'A pipe burst. What do I do first?', a: 'Close your main shut-off valve to stop the water, then call (727) 512-0673.' },
    { q: 'Where is my main shut-off valve?', a: 'Usually where the water line enters the house, or at the meter near the street. Find it and label it before you need it, as Pinellas County advises.' },
    { q: 'Do you really answer 24/7?', a: 'Yes. For emergencies, call (727) 512-0673 any hour, day or night.' },
  ] },
  { id: 'drains', name: 'Drains & fixtures', items: [
    { q: 'What drains do you clear?', a: 'Showers that will not drain, clogged sewer lines, floor drains.' },
    { q: 'How hard is Pinellas County water?', a: 'Very hard. It averages 217 ppm, which is 11.1 to 14.3 grains per gallon. That builds scale inside tanks and tankless units.' },
    { q: 'Do I get the price before you start?', a: 'Yes. You get the price first, then you decide.' },
  ] },
  { id: 'remodel', name: 'Remodel & commercial', items: [
    { q: 'Can you do the whole bathroom?', a: 'Yes. Remodels and new builds, from rough-in to the finished shower.', chip: { label: 'See remodel & new construction →', href: fam('remodel-commercial') } },
    { q: 'Do you do commercial build-outs?', a: 'Yes. One customer wrote: “These guys can handle anything from a residential bathroom remodel to a high end commercial build-out.”' },
    { q: 'Do you pull the permit?', a: 'It depends on your address. Largo homes go to the Largo Building Division, Clearwater files online, and unincorporated areas go to Pinellas County. We check and file it.' },
  ] },
  { id: 'photos', name: 'Photos & permits', items: [
    { q: 'Can I send a photo first?', a: 'Yes. Text it to (727) 512-0673 with your town and what is going on.' },
    { q: 'Do I need a permit to replace a water heater?', a: 'Usually, yes. Pinellas County lists a “Water Heater Equal Change Out, Tank or Tankless” permit, and Clearwater requires permits for water heaters. We file it for you.' },
    { q: 'Does a repipe need a permit?', a: 'Yes. Pinellas County lists a “Re-pipe Water Distribution Interior Only” permit. We pull it before work starts.' },
  ] },
];

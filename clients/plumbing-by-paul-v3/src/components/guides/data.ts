// Guide data (PAGES.md 12 / U1-U7, Figma 439:2340). Built guides link; every other title in the rail is a non-link
// "Coming soon" card so nothing points at a 404. When a guide is built, give it an href here and it becomes a link everywhere.
export interface GuideCard { title: string; cat: string; icon: string; href?: string; blurb?: string; minutes?: number }

export const BUILT: GuideCard[] = [
  { title: 'Repair or replace your water heater?', cat: 'Water heaters', icon: 'heater', href: '/guides/water-heater-repair-or-replace',
    blurb: 'The honest answer from people who do both every week in Pinellas County.', minutes: 5 },
];

/** The "More guides" rail on a guide page (U5): seven titles, none built yet. */
export const MORE: GuideCard[] = [
  { title: 'Tank or tankless in Florida?', cat: 'Water heaters', icon: 'heater' },
  { title: 'What does a plumber cost in St. Petersburg?', cat: 'Pricing', icon: 'clipboard' },
  { title: 'Repiping and the 4-point inspection', cat: 'Repiping', icon: 'pipe' },
  { title: "St. Pete's sewer lateral rebate, explained", cat: 'Sewer', icon: 'waves' },
  { title: 'How hard is Pinellas water?', cat: 'Water quality', icon: 'droplets' },
  { title: 'Cast iron pipes in old St. Pete homes', cat: 'Pipes', icon: 'wrench' },
  { title: 'Plumbing emergency: what to do first', cat: 'Emergency', icon: 'siren' },
];

export const WH_CONTENTS = [
  ['questions', 'The three questions'],
  ['lifespan', 'How long they last'],
  ['signs', "Signs it's nearly done"],
  ['repairs', 'What usually can be repaired'],
  ['water', 'What our water does to a tank'],
  ['permits', 'Permits in Pinellas'],
  ['types', 'If you replace: tank, tankless or hybrid'],
  ['replacement', 'What a replacement involves'],
] as const;

/** U4 FAQ. 05 carries a placeholder for Paul's starting prices, so it is shown (as designed) but kept out of FAQPage. */
export const WH_FAQ = [
  { idx: '01', q: 'Is a 10-year-old water heater worth repairing?', a1: 'Sometimes.', a2: "If it's an electric tank with no leak and a simple fault, a repair can buy you a few more years. If it's a gas tank at 10 years, or it has needed several repairs, replacing it is usually the better spend." },
  { idx: '02', q: 'Can a leaking water heater be repaired?', a1: 'Only if the leak is from a valve or a connection.', a2: 'If the tank itself is leaking, it has to be replaced.' },
  { idx: '03', q: 'How long do water heaters last in Florida?', a1: 'On average 8 to 12 years for gas tanks and 10 to 15 for electric, with tankless units lasting 20 years or more.', a2: 'Our hard water shortens that if the tank is never flushed.' },
  { idx: '04', q: 'Do I need a permit to replace my water heater in St. Petersburg?', a1: 'Yes.', a2: 'A permit is required in Pinellas County, including St. Petersburg. We handle it.' },
  { idx: '05', q: 'How much does a new water heater cost?', a1: 'It depends on the type, the size and where it sits in the house.', a2: 'We give you one clear price before we start. [Paul to supply starting prices.]' },
];

// Local content for each town page. A town only gets a page once it has an entry here AND its slug is in BUILT_TOWNS (towns.ts).
// Rule: a town page must not pass the "swap test" (swap the town name and it still reads fine = doorway page).
// Business facts come from FACTS.md. Neighborhood names and ZIP codes are public geography: double-check before launch.
export interface TownContent {
  lead: string;
  introTitle: [string, string]; intro: string[];
  neighborhoods: string[]; zips: string[];
  localTitle: [string, string];
  local: { icon: string; title: string; text: string }[];
  topServices: string[]; // service slugs, most relevant first
  faqs: { q: string; a: string }[];
}

export const TOWN_CONTENT: Record<string, TownContent> = {
  'plumber-clearwater-fl': {
    lead: 'Family-owned Plumbing By Paul serves Clearwater from Countryside to Clearwater Beach: drains, leaks, water heaters and sewer lines, 7 days a week, with a 24/7 emergency line.',
    introTitle: ['Your Clearwater plumber,', 'one call away.'],
    intro: [
      'Our shop is on 64th Way N in St. Petersburg, and Clearwater is a straight run up the county from there. It is one of the towns our service list names first, next to St. Petersburg and Seminole.',
      'You get the same crew and the same promise here as anywhere in Pinellas: a free estimate before work starts, a truck that arrives prepared so there is no second trip, and a 1-year workmanship warranty on what we fix.',
    ],
    neighborhoods: ['Clearwater Beach', 'Island Estates', 'Sand Key', 'Downtown Clearwater', 'Harbor Oaks', 'Skycrest', 'Morningside', 'Countryside'],
    zips: ['33755', '33756', '33759', '33761', '33763', '33764', '33765', '33767'],
    localTitle: ['Plumbing in Clearwater', 'has its own problems.'],
    local: [
      { icon: 'filter', title: 'Hard water, every tap', text: 'Pinellas County water comes from the Floridan Aquifer and it is hard. The calcium and magnesium build up as scale inside pipes, water heaters and fixtures. We deal with the scale, the corrosion and the pressure problems it causes, and we fit softeners and filters that stop it coming back.' },
      { icon: 'water', title: 'Beach and island homes', text: 'Clearwater Beach, Island Estates and Sand Key sit out on the water, a causeway away from the mainland. We cover them like any other street in town, so a slow drain out there gets fixed before it becomes a flood.' },
      { icon: 'building', title: 'Shops, restaurants and rentals', text: 'A blocked drain or a dead water heater costs a business money by the hour. We do commercial plumbing as well as homes, and the emergency line is answered 24/7.' },
    ],
    topServices: ['drain-cleaning-st-petersburg-fl', 'water-heater-repair-st-petersburg-fl', 'leak-detection-st-petersburg-fl', 'sewer-line-service-st-petersburg-fl', 'water-softeners-filtration-st-petersburg-fl', 'emergency-plumber-st-petersburg-fl'],
    faqs: [
      { q: 'Do you serve Clearwater Beach and Island Estates?', a: 'Yes. We serve all of Pinellas County, and that includes Clearwater Beach, Island Estates, Sand Key and the rest of Clearwater.' },
      { q: 'Do you offer emergency plumbing in Clearwater?', a: 'Yes. Our emergency line is answered 24/7 for burst pipes, sewer backups and water heater failures. Call (727) 709-2552.' },
      { q: 'Are estimates free in Clearwater?', a: 'Yes. Our services start with a free estimate wherever you are in Pinellas County. For non-emergency work we assess the job in full before starting.' },
      { q: 'Is Clearwater water hard on plumbing?', a: 'Yes. Pinellas County pulls from the Floridan Aquifer, one of the hardest water sources in Florida. Scale builds up in pipes and appliances over time. A water softener protects them and helps your water pressure.' },
      { q: 'Where is Plumbing By Paul based?', a: 'Our shop is at 5565 64th Way N Suite A, St. Petersburg, FL 33709. From there we cover every town in Pinellas County, Clearwater included.' },
    ],
  },
};

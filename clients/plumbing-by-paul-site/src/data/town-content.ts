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
  // Largo: neighborhood names, ZIP codes, the city sewer system and the manufactured-home communities are public
  // geography, not jobs. Paul to confirm he serves all of them (AGENT-BRIEF.md "Paul to confirm").
  'plumber-largo-fl': {
    lead: 'Family-owned Plumbing By Paul serves Largo from Harbor Bluffs to East Bay Drive: drains, leaks, water heaters and sewer lines, 7 days a week, with a 24/7 emergency line.',
    introTitle: ['Middle of the county,', 'middle of our map.'],
    intro: [
      'Largo sits in the middle of Pinellas County, between Clearwater, Seminole and Pinellas Park. Our shop on 64th Way N is about 7 miles away in a straight line, so Largo is a short run up the middle of the county, not a trip across it.',
      'The deal is the one we offer everywhere in Pinellas: a free estimate before any work starts, no hidden fees, a truck stocked for the job, and a 1-year workmanship warranty on the repair.',
    ],
    neighborhoods: ['Downtown Largo', 'West Bay Drive', 'Harbor Bluffs', 'Ridgecrest', 'Bardmoor', 'East Bay Drive', 'Ulmerton Road', 'Largo Central Park area'],
    zips: ['33770', '33771', '33773', '33774', '33778'],
    localTitle: ['What Largo homes', 'ask of a plumber.'],
    local: [
      { icon: 'water', title: 'Manufactured-home communities', text: 'Largo has a lot of manufactured-home parks. In those homes the water and drain lines run under the floor, behind the skirting, so a small leak can run for weeks before anyone sees it. Tell us when you call and we come ready to find the leak and fix the line.' },
      { icon: 'sewer', title: 'The pipe between you and the city', text: 'The City of Largo runs its own sewer system. The pipe from your house out to the city line is usually the owner\'s to look after, and roots or an old pipe there cause slow drains and backups. A camera inspection shows what is going on before anyone digs.' },
      { icon: 'building', title: 'Shops along East Bay and Ulmerton', text: 'East Bay Drive, West Bay Drive and Ulmerton Road are lined with shops, offices and restaurants. A blocked drain or a dead water heater costs a business by the hour, so we do commercial plumbing as well as homes, and the emergency line is answered 24/7.' },
    ],
    topServices: ['leak-detection-st-petersburg-fl', 'sewer-line-service-st-petersburg-fl', 'drain-camera-inspection-st-petersburg-fl', 'water-heater-repair-st-petersburg-fl', 'drain-cleaning-st-petersburg-fl', 'emergency-plumber-st-petersburg-fl'],
    faqs: [
      { q: 'Do you serve all of Largo, including Ridgecrest and Bardmoor?', a: 'Yes. We serve all of Pinellas County, and that includes the city of Largo and the areas around it, such as Ridgecrest, Bardmoor and Harbor Bluffs.' },
      { q: 'Do you work on manufactured homes in Largo?', a: 'Call and tell us about the home. Leaks under the floor and drain problems are plumbing like any other, and we tell you before we start what the job needs and what it costs.' },
      { q: 'Who looks after the sewer line at my Largo home?', a: 'The City of Largo runs the sewer main. The pipe from your house to the city connection is usually the owner\'s responsibility. If drains are slow or backing up, we can inspect that line with a camera and tell you what we find.' },
      { q: 'Do you offer emergency plumbing in Largo?', a: 'Yes. Our emergency line is answered 24/7 for burst pipes, sewer backups and water heater failures. Call (727) 709-2552.' },
      { q: 'Are estimates free in Largo?', a: 'Yes. Our services start with a free estimate wherever you are in Pinellas County. For non-emergency work we assess the job in full before starting.' },
    ],
  },
};

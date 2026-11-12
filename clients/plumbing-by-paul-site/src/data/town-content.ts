// Local content for each town page. A town only gets a page once it has an entry here AND its slug is in BUILT_TOWNS (towns.ts).
//
// Rules (an outside reviewer checks these):
// 1. Swap test: after swapping the town name, at least 60% of the page text must still be different from every other town
//    page. So each town has its own section order, headings, intro, service notes and FAQ. Do not copy an entry and rename it.
// 2. Business facts come from site-facts.md only (serves all of Pinellas County, free estimates, 24/7 emergency line ...).
// 3. Geography (neighborhood names, ZIP codes, roads, who runs the sewer) is public information, shown as such on the page,
//    never as "we work here every week". It is on the "Paul to confirm" list in AGENT-BRIEF.md.
// 4. Distances are straight-line from the shop and always say so. Use {miles} in any text and the template fills it in.
export interface TownContent {
  /** Section order. 'local-first': intro, local, services, process, reviews, map, FAQ. 'services-first': intro, services, local, map, reviews, call band, FAQ (no process section). */
  layout: 'local-first' | 'services-first';
  heroPhoto: 'trucks' | 'families';
  heroTag: [string, string];
  lead: string;
  introTitle: [string, string]; intro: string[];
  hoodsTitle: string; hoodsNote: string;
  neighborhoods: string[]; zips: string[];
  localEyebrow: string; localTitle: [string, string]; localPhoto: 'event' | 'gifts';
  local: { icon: string; title: string; text: string }[];
  servicesTitle: [string, string]; servicesLead: string;
  topServices: string[]; // service slugs, in the order that fits this town
  /** One line per top service, written for this town (general plumbing knowledge and public geography only). */
  serviceNotes: Record<string, string>;
  reviewsTitle: [string, string];
  areasTitle: [string, string]; areasLead: string; // {miles} and {near} are filled in
  ctaTitle: string;
  faqTitle: [string, string]; faqLead: string;
  faqs: { q: string; a: string }[];
  contact: [string, string]; contactLead: string; formTitle: string;
}

export const TOWN_CONTENT: Record<string, TownContent> = {
  'plumber-clearwater-fl': {
    layout: 'local-first',
    heroPhoto: 'trucks',
    heroTag: ['About {miles} miles', 'north of our shop, in a straight line'],
    lead: 'Family-owned Plumbing By Paul serves Clearwater along with the rest of Pinellas County: drains, leaks, water heaters and sewer lines, 7 days a week, with a 24/7 emergency line.',
    introTitle: ['Your Clearwater plumber,', 'one call away.'],
    intro: [
      'Our shop is on 64th Way N in St. Petersburg. Clearwater is about {miles} miles north of it in a straight line, and a bit more by road. It is one of the towns our own service list names, next to St. Petersburg and Seminole.',
      'What you get in Clearwater is what Paul promises everywhere in Pinellas: a free estimate before work starts, a truck that shows up prepared so there is no second trip, and a 1-year workmanship warranty on what we fix.',
    ],
    hoodsTitle: 'Clearwater on the map',
    hoodsNote: 'Names and ZIP codes come from public maps. Plumbing By Paul serves all of Pinellas County, Clearwater included.',
    neighborhoods: ['Clearwater Beach', 'Island Estates', 'Sand Key', 'Downtown Clearwater', 'Harbor Oaks', 'Skycrest', 'Morningside', 'Countryside'],
    zips: ['33755', '33756', '33759', '33761', '33763', '33764', '33765', '33767'],
    localEyebrow: 'Local know-how', localTitle: ['Hard water, salt air', 'and older pipes.'], localPhoto: 'event',
    local: [
      { icon: 'filter', title: 'Hard water, every tap', text: 'Pinellas County water comes from the Floridan Aquifer and it is hard. The calcium and magnesium build up as scale inside pipes, water heaters and fixtures. We deal with the scale, the corrosion and the pressure problems it causes, and we fit softeners and filters that stop it coming back.' },
      { icon: 'water', title: 'Out by the Gulf', text: 'Clearwater Beach, Island Estates and Sand Key sit out on the water, across the causeway from the mainland. Salt air is hard on exposed metal, so outdoor pipes, hose connections and water heater fittings near the Gulf are worth a look once they start to rust. The beaches are part of Pinellas County, which is the area we serve.' },
      { icon: 'pipe', title: 'Original pipes in an older house', text: 'If a house still has its first galvanized or cast iron pipes, low pressure, rusty water and repeat leaks are the usual signs that they are wearing out. Repiping replaces them, one section or the whole house, and we tell you which one you need.' },
      { icon: 'building', title: 'Shops, restaurants and rentals', text: 'A blocked drain or a dead water heater costs a business money by the hour. We do commercial plumbing as well as homes, and the emergency line is answered 24/7.' },
    ],
    servicesTitle: ['Every plumbing job,', 'one crew.'],
    servicesLead: 'Six services to start with in Clearwater, then everything else on the truck.',
    topServices: ['drain-cleaning-st-petersburg-fl', 'water-heater-repair-st-petersburg-fl', 'leak-detection-st-petersburg-fl', 'sewer-line-service-st-petersburg-fl', 'water-softeners-filtration-st-petersburg-fl', 'emergency-plumber-st-petersburg-fl'],
    serviceNotes: {
      'drain-cleaning-st-petersburg-fl': 'Sand, hair and soap end up in shower and tub drains. We clear the line itself, not only the top of it.',
      'water-heater-repair-st-petersburg-fl': 'Hard water leaves scale in the tank, one reason a heater gets noisy or runs out early.',
      'leak-detection-st-petersburg-fl': 'A water bill that jumps or a damp patch with no clear cause is worth a call before it spreads.',
      'sewer-line-service-st-petersburg-fl': 'Backups and slow main lines, checked with a camera when that is needed.',
      'water-softeners-filtration-st-petersburg-fl': 'A softener or filter protects pipes, fixtures and the water heater from scale.',
      'emergency-plumber-st-petersburg-fl': 'Burst pipe or sewer backup at night in Clearwater: the emergency line is answered 24/7.',
    },
    reviewsTitle: ['Pinellas has spoken.', '941 times.'],
    areasTitle: ['Clearwater,', 'and the towns around it.'],
    areasLead: 'Clearwater is about {miles} miles from our St. Petersburg shop in a straight line. Next to it on the map are {near}, all in Pinellas County.',
    ctaTitle: 'Plumbing problem in Clearwater?',
    faqTitle: ['Clearwater questions,', 'straight answers.'],
    faqLead: 'What people in Clearwater tend to ask before they book. Anything else, just call.',
    faqs: [
      { q: 'Do you serve Clearwater Beach and Island Estates?', a: 'We serve all of Pinellas County, and Clearwater Beach, Island Estates and Sand Key are part of it. If you are not sure about your address, call and ask.' },
      { q: 'Is Clearwater water hard on plumbing?', a: 'Yes. Pinellas County pulls from the Floridan Aquifer, one of the hardest water sources in Florida. Scale builds up in pipes and appliances over time. A water softener protects them and helps your water pressure.' },
      { q: 'How far is your shop from Clearwater?', a: 'About {miles} miles in a straight line. The shop is at 5565 64th Way N Suite A, St. Petersburg, FL 33709, and the drive is a little longer than the straight line.' },
      { q: 'Can I get a plumber in Clearwater at night or on a Sunday?', a: 'We are open 7 days a week, and the emergency line is answered 24/7 for burst pipes, sewer backups and water heater failures. Call (727) 709-2552.' },
      { q: 'What does an estimate cost in Clearwater?', a: 'Nothing. Our services start with a free estimate anywhere in Pinellas County, and you know the price before work begins.' },
    ],
    contact: ['Need a plumber in Clearwater?', 'Call Paul.'],
    contactLead: 'Burst pipe, backed-up drain or no hot water in Clearwater: call now, the line is answered 24/7 for emergencies. Not urgent? Send the form and we call you back.',
    formTitle: 'Free estimate in Clearwater',
  },

  'plumber-largo-fl': {
    layout: 'services-first',
    heroPhoto: 'families',
    heroTag: ['About {miles} miles', 'from the shop, as the crow flies'],
    lead: 'Leaks, sewer lines, water heaters and drains in Largo, from family-owned Plumbing By Paul. Open 7 days a week, with an emergency line that is answered 24/7.',
    introTitle: ['Middle of the county,', 'middle of our map.'],
    intro: [
      'Largo sits in the middle of Pinellas County, between Clearwater, Seminole and Pinellas Park. Our shop on 64th Way N is about {miles} miles away in a straight line, so on the map Largo is a neighbor, not the far end of the county.',
      'Before any work starts you get a free estimate, with no hidden fees. The repair itself carries our 1-year workmanship warranty.',
    ],
    hoodsTitle: 'Largo areas and main roads',
    hoodsNote: 'Taken from public maps, not from a job list. We serve all of Pinellas County, so if your home or business is in Largo, call.',
    neighborhoods: ['Downtown Largo', 'West Bay Drive', 'Harbor Bluffs', 'Ridgecrest', 'Bardmoor', 'East Bay Drive', 'Ulmerton Road', 'Largo Central Park area'],
    zips: ['33770', '33771', '33773', '33774', '33778'],
    localEyebrow: 'Good to know in Largo', localTitle: ['Four things worth', 'telling us on the phone.'], localPhoto: 'gifts',
    local: [
      { icon: 'alert', title: 'Can it wait?', text: 'Water on the floor, sewage coming up or no water at all: say that first, because the emergency line is answered 24/7. If it can wait a day, we book a visit and you get the estimate before anything is touched.' },
      { icon: 'water', title: 'Is it a manufactured home?', text: 'In a manufactured home the water and drain lines usually run under the floor, behind the skirting, so a small leak can go on for a while before anyone sees it. If that is your home, say so when you call and we will know what to bring.' },
      { icon: 'sewer', title: 'Where does your pipe meet the city\'s?', text: 'In most places the pipe from the house to the public sewer connection is the owner\'s to look after, and the main beyond it is the city\'s. The City of Largo can tell you where that point is for your address. Roots or an old pipe on your side cause slow drains and backups, and a camera inspection shows what is going on before anyone digs.' },
      { icon: 'building', title: 'Is it a business?', text: 'Roads such as East Bay Drive, West Bay Drive and Ulmerton Road carry a lot of Largo\'s shops, offices and restaurants. We do commercial plumbing as well as homes. Tell us your opening hours and what cannot be shut off.' },
    ],
    servicesTitle: ['Start with', 'what is wrong.'],
    servicesLead: 'Pick the problem you have in Largo. Every one of these starts with a free estimate.',
    topServices: ['leak-detection-st-petersburg-fl', 'sewer-line-service-st-petersburg-fl', 'drain-camera-inspection-st-petersburg-fl', 'water-heater-repair-st-petersburg-fl', 'drain-cleaning-st-petersburg-fl', 'emergency-plumber-st-petersburg-fl'],
    serviceNotes: {
      'leak-detection-st-petersburg-fl': 'Under a floor or behind a wall, a leak can run a long time unseen. We find it first, then fix the line.',
      'sewer-line-service-st-petersburg-fl': 'For the pipe between the house and the public sewer connection: backups, roots and old pipe.',
      'drain-camera-inspection-st-petersburg-fl': 'A camera down the line shows the real cause before anyone guesses, or digs up a yard.',
      'water-heater-repair-st-petersburg-fl': 'Tank or tankless, repaired or replaced, and you hear the price before we begin.',
      'drain-cleaning-st-petersburg-fl': 'One slow sink or a whole house that drains slowly: we clear it and look at why it happened.',
      'emergency-plumber-st-petersburg-fl': 'For a burst pipe or a backup in Largo that cannot wait until morning.',
    },
    reviewsTitle: ['Read it in', 'their own words.'],
    areasTitle: ['Largo and', 'its neighbors.'],
    areasLead: 'Around Largo on the map: {near}. The shop is about {miles} miles off in a straight line, and all of these towns are in Pinellas County, the area we serve.',
    ctaTitle: 'A leak or a backup in Largo?',
    faqTitle: ['Before you call', 'from Largo.'],
    faqLead: 'Short answers to the questions that come up first.',
    faqs: [
      { q: 'Do you come to Ridgecrest, Bardmoor and Harbor Bluffs?', a: 'We serve all of Pinellas County, so Largo and the areas around it are covered. If you are unsure about your address, call (727) 709-2552 and ask.' },
      { q: 'Do you work on manufactured homes in Largo?', a: 'Call and tell us about the home. Leaks under the floor and drain problems are plumbing like any other, and we tell you before we start what the job needs and what it costs.' },
      { q: 'Who looks after the sewer line at my Largo home?', a: 'It depends where the public sewer connection is. In most places the pipe from the house to that connection belongs to the owner and the main belongs to the city. The City of Largo can confirm it for your address. If your drains are slow or backing up, we can run a camera down the line and tell you what we find.' },
      { q: 'What if a pipe bursts in the middle of the night?', a: 'Shut off the water at the main valve if you can, then call (727) 709-2552. The emergency line is answered 24/7.' },
      { q: 'Do I pay for someone to come and look?', a: 'No. Our services start with a free estimate, and for non-emergency work we assess the job in full before starting.' },
    ],
    contact: ['Plumbing trouble in Largo?', 'Call Paul.'],
    contactLead: 'Tell us what is leaking, backing up or not heating, and where in Largo you are. For an emergency, phone: that line is answered day and night. For everything else the form is fine.',
    formTitle: 'Tell us about the job',
  },
};

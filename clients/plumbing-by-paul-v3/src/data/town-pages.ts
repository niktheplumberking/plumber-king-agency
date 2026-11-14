// Town pages (PAGES.md 06, Figma 439:4006 / 440:3439). One data object per town feeds the same template
// (src/components/towns/TownPage.astro). Doorway rule: every sentence here is written for that town; nothing is copied
// between towns. Stand-ins (`standIn`) render as labelled slots, exactly like the Figma's dashed slots, and never enter JSON-LD.
// Clearwater copy = Figma word for word. Seminole copy = written for Seminole from checked sources (see README "Paul to confirm").
export interface TownProblem { t: string; d: string; photo?: string; alt?: string; tag?: string; focus?: string; icon?: string }
export interface TownCall { href: string; name: string; line: string; icon: string }
export interface TownFaq { q: string; a1: string; a2?: string; standIn?: boolean }
export interface TownJobPhoto { photo: string; alt: string; cap: string; focus?: string }
export interface TownPageData {
  slug: string; name: string; path: string;
  title: string; description: string; ogAlt: string;
  hero: { eyebrow: string; l1: string; l2: string; lead: string; photo: string; alt: string; cap: string; focus?: string };
  route: { path: string; vb: [number, number, number, number]; dest: [number, number]; destLabel: string };
  quick: string; // HTML allowed for <strong>
  problems: { eyebrow: string; l1: string; l2: string; lead: string; items: TownProblem[]; link: string };
  calls: { eyebrow: string; l1: string; l2: string; items: TownCall[] };
  review: { eyebrow: string; l1: string; l2: string; quote?: { paras: string[]; hl: string; name: string; age: string; service: string; place: string }; slots: string[]; slotNote?: string };
  jobs: { eyebrow: string; l1: string; l2: string; lead: string; slotTitle: string; slotBody: string; photos: [TownJobPhoto, TownJobPhoto, TownJobPhoto] };
  permits: { eyebrow: string; q: string; a: string; strong: string };
  hoods: { eyebrow: string; l1: string; l2: string; chips: string[]; line: string; photo: string; alt: string; cap: string; focus?: string };
  faq: { eyebrow: string; l1: string; l2: string; items: TownFaq[] };
  nearby: { name: string; href?: string }[];
  cta: { l1: string; l2: string };
}

const ROUTE_CLW = 'M300 412 C 336 350, 262 300, 252 190';

export const TOWN_PAGES: Record<string, TownPageData> = {
  'clearwater-fl': {
    slug: 'clearwater-fl', name: 'Clearwater', path: '/service-areas/clearwater-fl',
    title: 'Plumber in Clearwater, FL · Plumbing By Paul',
    description: 'Licensed, family-owned plumber serving Clearwater from our St. Pete shop. Water heaters, drains, leaks, repiping. 4.9 from 947 Google reviews.',
    ogAlt: 'A Plumbing By Paul van at a raised coastal home in Pinellas County',
    hero: {
      eyebrow: 'Plumber · Clearwater, FL', l1: 'Your plumber', l2: 'in Clearwater',
      lead: "Same family crew, same blue shirts, a short drive up from our shop in St. Petersburg. If it leaks, clogs or won't heat in Clearwater, call us.",
      photo: 'fleet-van-at-coastal-stilt-house', alt: 'A Plumbing By Paul van parked at a raised coastal home', cap: 'One of our vans on a coastal Pinellas job.', focus: '45% 60%',
    },
    route: { path: ROUTE_CLW, vb: [110, 162, 420, 262], dest: [252, 190], destLabel: 'Clearwater' },
    quick: 'Plumbing By Paul is a <strong>licensed, family-owned plumbing company serving Clearwater</strong> from its shop in St. Petersburg. The crew repairs and replaces water heaters, clears drains and sewer lines, finds and fixes leaks and repipes older homes. Rated <strong>4.9 from 947 Google reviews</strong>. Call <strong>(727) 709-2552</strong> for a free estimate.',
    problems: {
      eyebrow: 'Local plumbing, local problems', l1: 'What Clearwater homes', l2: 'throw at us',
      lead: 'Every town has its habits. These are the ones we plan for here.',
      items: [
        { t: 'Raised and rebuilt homes.', d: 'After the storms, a lot of coastal houses went up on pilings. That means new supply and drain runs under the house, done to current code.', photo: 'service-tech-ladder-under-raised-house', alt: 'A Plumbing By Paul tech on a ladder plumbing under a raised house', tag: 'Under a raised home', focus: '50% 50%' },
        { t: 'Remodels and new construction.', d: 'We rough in the plumbing while the walls are open, then come back to set the fixtures.', photo: 'service-tech-logo-shirt-framing', alt: 'A Plumbing By Paul tech drilling through open wall framing', tag: 'Rough-in', focus: '50% 40%' },
        { t: 'Hard water.', d: 'Pinellas water comes from the Floridan Aquifer. The minerals are rough on water heaters, faucets and valves. A softener earns its keep here.', icon: 'droplets' },
        { t: 'Older pipes and insurance inspections.', d: 'Galvanized, cast iron and polybutylene pipes come up on 4-point inspections. We can tell you what you have and what an insurer is likely to ask about.', icon: 'clipboard' },
      ],
      link: "Tell us what you're dealing with:",
    },
    calls: {
      eyebrow: 'In Clearwater we mostly do', l1: 'The six calls', l2: 'we get most',
      items: [
        { href: '/water-heaters', name: 'Water heaters', line: "Repair first, replace when it's time.", icon: 'heater' },
        { href: '/drain-cleaning', name: 'Drain cleaning', line: 'Sinks, showers, main lines.', icon: 'waves' },
        { href: '/leak-detection', name: 'Leak detection', line: 'Found before we open a wall.', icon: 'droplets' },
        { href: '/repiping', name: 'Repiping', line: 'New pipes for older homes.', icon: 'pipe' },
        { href: '/sewer-service', name: 'Sewer service', line: 'Backups and broken lines.', icon: 'filter' },
        { href: '/emergency-plumbing', name: 'Emergency plumbing', line: 'Shut the water off, then call.', icon: 'siren' },
      ],
    },
    review: {
      eyebrow: 'Clearwater reviews', l1: 'In their words,', l2: 'not ours',
      quote: {
        paras: ['Thank you so much for a quick response. Our water heater hose busted on a Monday morning and had no idea what to do.', 'Someone made it very quick, and it was affordable. They were very nice and respectful of our home- made sure to clean up. Highly recommend to anyone in need of a plumber in St.Pete / Clearwater'],
        hl: 'anyone in need of a plumber in St.Pete / Clearwater', name: 'Alix McKeel', age: '2 months ago', service: 'Water heater installation', place: 'St. Pete / Clearwater',
      },
      slots: ['Slot · one more Clearwater review, from Google'],
    },
    jobs: {
      eyebrow: 'On the job', l1: 'Real jobs,', l2: 'real photos', lead: 'Our own crew on our own jobs. No stock photos.',
      slotTitle: 'Paul to supply Clearwater jobs', slotBody: '2 or 3 real ones. Each needs a photo, the neighborhood, the problem, the fix and who did it.',
      photos: [
        { photo: 'hero-05-tech-toilet-repair-pro', alt: 'A Plumbing By Paul tech in gloves repairing a toilet', cap: 'Toilet repair, gloves on.', focus: '74% 50%' },
        { photo: 'service-tech-threading-pipe-truck', alt: 'A tech threading pipe on a vise beside the truck', cap: 'Threading pipe beside the truck.', focus: '50% 42%' },
        { photo: 'service-sewer-line-trench-pvc', alt: 'A new white PVC sewer line in an open trench', cap: 'New PVC line in an open trench.', focus: '50% 45%' },
      ],
    },
    permits: {
      eyebrow: 'Permits · Clearwater', q: 'Who handles plumbing permits in Clearwater?',
      a: "Inside the city limits, permits go through the City of Clearwater. In unincorporated areas with a Clearwater address, they go through Pinellas County. You don't have to work out which:",
      strong: 'when a job needs a permit, we pull it.',
    },
    hoods: {
      eyebrow: 'Around Clearwater', l1: 'From the beach', l2: 'to Countryside',
      chips: ['Clearwater Beach', 'Island Estates', 'Downtown Clearwater', 'Skycrest', 'Morningside', 'Countryside'],
      line: 'Not on the list? We probably still come. Call',
      photo: 'fleet-aerial-van-jobsite', alt: 'Drone view of a Plumbing By Paul van at a waterfront home under construction', cap: 'From above: one of our vans at a waterfront job.', focus: '50% 55%',
    },
    faq: {
      eyebrow: 'Clearwater questions', l1: 'Asked by', l2: 'Clearwater neighbors',
      items: [
        { q: 'Do you serve Clearwater?', a1: 'Yes.', a2: 'Clearwater is part of our regular Pinellas County service area, covered from our shop in St. Petersburg.' },
        { q: 'Do you charge extra to come to Clearwater?', a1: 'Stand-in: Paul to confirm.', a2: 'The answer will start with yes or no. Until then, ask when you call (727) 709-2552.', standIn: true },
        { q: 'Are you licensed to work in Clearwater?', a1: 'Yes.', a2: 'Plumbing By Paul LLC holds Florida certified plumbing contractor licence CFC1430367, which is valid statewide.' },
        { q: 'Can you help after storm or flood damage?', a1: 'Yes.', a2: "We've worked on raised and rebuilt homes along the coast. Call us before turning the water heater or gas back on after a flood." },
      ],
    },
    nearby: [{ name: 'St. Petersburg', href: '/service-areas' }, { name: 'Seminole', href: '/service-areas/seminole-fl' }, { name: 'Largo' }, { name: 'Dunedin' }, { name: 'Safety Harbor' }],
    cta: { l1: 'Need a plumber in Clearwater?', l2: "We're on the way up." },
  },

  'seminole-fl': {
    slug: 'seminole-fl', name: 'Seminole', path: '/service-areas/seminole-fl',
    title: 'Plumber in Seminole, FL · Plumbing By Paul',
    description: 'Family-owned, licensed plumber right next door to Seminole, from our shop on 64th Way N. Leaks, drains, water heaters. 4.9 from 947 Google reviews.',
    ogAlt: 'The Plumbing By Paul crew and their families in front of two wrapped trucks',
    hero: {
      eyebrow: 'Plumber · Seminole, FL', l1: 'Your plumber', l2: 'in Seminole',
      lead: 'Seminole is right next door to our shop on 64th Way North. When a pipe leaks, a drain backs up or the water heater quits, the family crew in the blue shirts is close by.',
      photo: 'crew-families-two-trucks', alt: 'The Plumbing By Paul crew and their families in front of two wrapped trucks', cap: 'The crew and their families.', focus: '50% 55%',
    },
    route: { path: 'M300 412 C 292 386, 266 350, 238 330', vb: [110, 268, 336, 210], dest: [238, 330], destLabel: 'Seminole' },
    quick: 'Plumbing By Paul is a <strong>licensed, family-owned plumbing company working in Seminole</strong> from its shop at 5565 64th Way N, next door in St. Petersburg. The crew fixes leaks, clears drains, repairs and replaces water heaters, checks lines with a camera and repipes older homes. Rated <strong>4.9 from 947 Google reviews</strong>. Free estimates on <strong>(727) 709-2552</strong>.',
    problems: {
      eyebrow: 'Seminole plumbing, up close', l1: 'What Seminole homes', l2: 'ask of us',
      lead: 'A lake, a bayou and streets of every age. This is what we keep an eye on here.',
      items: [
        { t: 'Low ground near the water.', d: 'Streets close to Lake Seminole and Long Bayou sit lower than most of town. If heavy rain reached your water heater or a gas appliance, have it checked before you use it again.', photo: 'service-tech-at-cleanout', alt: 'A Plumbing By Paul tech working at a yard cleanout', tag: 'At the cleanout', focus: '50% 45%' },
        { t: 'Drain lines with decades behind them.', d: 'Plenty of homes here have stood a long time, and so have their drains. Roots and buildup creep in slowly. A camera shows what is inside before anyone digs.', photo: 'service-tech-digging-with-van', alt: 'A Plumbing By Paul tech digging in a yard with the van behind', tag: 'Digging for a line', focus: '50% 40%' },
        { t: 'Water heaters that work hard.', d: 'Most Seminole homes get their water from Pinellas County Utilities. Whatever the supply, a tank that is never flushed wears out sooner. We tell you plainly if yours is worth repairing.', icon: 'heater' },
        { t: 'Insurance and the 4-point.', d: "If your insurer wants a 4-point inspection, the plumbing part comes down to what your pipes are made of and how old the water heater is. We'll look and tell you straight.", icon: 'shield' },
      ],
      link: "Tell us what's going on at your place:",
    },
    calls: {
      eyebrow: 'What we do in Seminole', l1: 'Six common calls,', l2: 'one phone number',
      items: [
        { href: '/drain-cleaning', name: 'Drain cleaning', line: 'Kitchen, bath and main lines.', icon: 'waves' },
        { href: '/water-heaters', name: 'Water heaters', line: 'Repair or replace, honestly.', icon: 'heater' },
        { href: '/drain-camera', name: 'Drain camera', line: 'See inside before anyone digs.', icon: 'camera' },
        { href: '/leak-detection', name: 'Leak detection', line: 'Find it before the drywall comes out.', icon: 'droplets' },
        { href: '/toilet-repair', name: 'Toilet repair', line: 'Running, rocking or clogged.', icon: 'toilet' },
        { href: '/emergency-plumbing', name: 'Emergency plumbing', line: 'Main valve off, then call us.', icon: 'siren' },
      ],
    },
    review: {
      eyebrow: 'Seminole reviews', l1: 'Neighbors say it', l2: 'better than we do',
      slots: ['Slot · a review from a Seminole customer, from Google', 'Slot · a second Seminole review, from Google'],
      slotNote: 'None of the Google reviews we have collected so far names Seminole. Paul or the office to point to two before launch; they go here word for word.',
    },
    jobs: {
      eyebrow: 'Out on jobs', l1: 'Our crew,', l2: 'our photos', lead: 'Taken by the crew on real jobs around Pinellas. None of them are stock.',
      slotTitle: 'Paul to supply Seminole jobs', slotBody: 'Two or three from Seminole, each with a photo, the street or neighborhood, what was wrong, what we did and who did it.',
      photos: [
        { photo: 'service-tech-under-sink-smiling', alt: 'A Plumbing By Paul tech smiling under a vintage bathroom sink', cap: 'Under a vintage bathroom sink.', focus: '50% 45%' },
        { photo: 'service-tankless-water-heater-install', alt: 'A finished tankless water heater install with copper lines', cap: 'A finished tankless install.', focus: '50% 50%' },
        { photo: 'service-tech-under-bath-vanity', alt: 'A tech lying under a bathroom vanity with a tool bag', cap: 'Under a bathroom vanity.', focus: '50% 55%' },
      ],
    },
    permits: {
      eyebrow: 'Permits · Seminole', q: 'Who handles plumbing permits in Seminole?',
      a: "Homes inside Seminole's city limits get permits from the City of Seminole building department on 113th Street. Many homes with a Seminole mailing address sit in unincorporated Pinellas County, and those go through the county. Not sure which you are? You don't need to be:",
      strong: 'if the job needs a permit, we pull it.',
    },
    hoods: {
      eyebrow: 'Around Seminole', l1: 'From Lake Seminole', l2: 'to Bay Pines',
      chips: ['Around Lake Seminole', 'Oakhurst', 'Bay Pines', 'Long Bayou', 'Seminole City Center area', 'Along Park Boulevard'],
      line: "Don't see your street? We very likely still come. Call",
      photo: 'fleet-van-side-waterfront-1080', alt: 'Side view of a wrapped Plumbing By Paul van by the water', cap: 'One of our vans, parked by the water.', focus: '50% 55%',
    },
    faq: {
      eyebrow: 'Seminole questions', l1: 'Questions from', l2: 'Seminole neighbors',
      items: [
        { q: 'Do you serve Seminole?', a1: 'Yes.', a2: 'Seminole is next door to our shop at 5565 64th Way N in St. Petersburg, and it is part of our everyday Pinellas County area.' },
        { q: 'Do you charge extra to come to Seminole?', a1: 'Stand-in: Paul to confirm.', a2: 'The answer will start with yes or no. Until then, ask when you call (727) 709-2552.', standIn: true },
        { q: 'Do I need a permit for plumbing work in Seminole?', a1: 'Some jobs do, a repipe for example.', a2: 'Who issues it depends on whether the home is inside city limits (City of Seminole) or in unincorporated Pinellas County. When a permit is needed, we pull it.' },
        { q: 'Are you licensed for work in Seminole?', a1: 'Yes.', a2: 'Plumbing By Paul LLC holds Florida certified plumbing contractor licence CFC1430367. A certified licence covers the whole state.' },
      ],
    },
    nearby: [{ name: 'St. Petersburg', href: '/service-areas' }, { name: 'Clearwater', href: '/service-areas/clearwater-fl' }, { name: 'Largo' }, { name: 'Pinellas Park' }, { name: 'Madeira Beach' }],
    cta: { l1: 'Need a plumber in Seminole?', l2: "We're right next door." },
  },
};

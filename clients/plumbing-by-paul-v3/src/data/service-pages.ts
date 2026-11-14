// Service pages (template A = Figma 03 water heaters, template B = Figma 04 drain cleaning). One data object per page;
// src/components/services/ServicePage.astro renders it. Sections are optional: a page shows only what it has real content for.
// Sources: Figma 03/04 + PAGES.md W1-W12 / D1-D11 (exact copy), Paul's own site text (source-site-text/), facts in
// research/brand/FACTS-CHECK.md. No prices, times or warranties beyond what Figma shows; price slots stay labelled stand-ins.
// Reviews: word for word from research/reviews/REVIEWS.md (n = item number), or from the untouched Google scrape
// research/reviews/raw/google-reviews-part1.txt (raw = item § number) where REVIEWS.md has none for that service.
import { SITE } from './site';
import { REVIEWS, type Review } from './reviews';
import type { FaqEntry } from '../components/ui/Faq.astro';

const P = SITE.phone;
export interface Photo { name: string; alt: string; focus?: string; }
export interface Card { t: string; d: string; icon: string; }
export interface SvcPage {
  path: string; name: string; serviceType?: string; title: string; meta: string; og: string; ogAlt: string;
  layout: 'a' | 'b'; crumb: string;
  hero: {
    eyebrow: string; h1a: string; h1b: string; lead: string; rows?: string[]; chips?: { icon: string; label: string }[];
    photos: Photo[]; tag?: string; caption?: string; mini?: { quote: string; name: string; patches: string[] };
  };
  answer: { text: string; ticket: string; rows: { k: string; v: string; standIn?: boolean }[] };
  signs?: { eyebrow: string; l1: string; l2: string; items: Card[] };
  compare?: { eyebrow: string; l1: string; l2: string; left: { t: string; icon: string; items: string[] }; right: { t: string; icon: string; items: string[] };
    strip?: { text: string; link: string; href: string } };
  types?: { eyebrow: string; l1: string; l2: string; lead?: string; cards: { num: string; sub: string; t: string; d: string; best: string; icon: string }[]; link: string };
  tabs?: { eyebrow: string; l1: string; l2: string; items: { label: string; icon: string; text: string; href?: string; hrefText?: string }[]; foot: string; photo: Photo; caption: string };
  versus?: { eyebrow: string; l1: string; l2: string; left: { t: string; items: string[] }; right: { t: string; items: string[] }; call: string; photo: Photo; caption: string };
  steps: { eyebrow: string; l1: string; l2: string; items: Card[]; photo?: Photo; caption?: string; patches?: string[] };
  feature?: { eyebrow: string; l1: string; l2: string; p: string; links: { t: string; href: string }[]; placeholder?: string; photo: Photo; tag: string;
    review: { r: Review; patch?: string } };
  price: { eyebrow?: string; l1: string; l2: string; p?: string; rows: string[] };
  reviews?: { eyebrow: string; l1: string; l2: string; list: Review[]; chip?: { n: string; text: string }; link?: string };
  local?: { eyebrow: string; l1: string; l2: string; cards: { label: string; icon: string; q: string; a1: string; a2: string; link?: { t: string; href: string } }[] };
  tips?: { eyebrow: string; l1: string; l2: string; items: { b: string; t: string }[]; warn: { b: string; t: string }; photo: Photo; caption: string };
  faq: { eyebrow: string; l1: string; l2: string; items: FaqEntry[] };
  related?: { eyebrow: string; l1: string; l2: string; cards: { t: string; href: string; icon: string }[]; line: string };
  cta: { l1: string; l2: string; lead?: string };
}

const EST = { k: 'Estimate', v: 'Free, before any work starts.' };
const WAR = { k: 'Workmanship warranty', v: '1 year.' };
const LIC = { k: 'Licence', v: `Florida ${SITE.licence}.` };
const STAND = 'Paul to supply. No numbers are published until he does.';

/* ---- extra reviews (word for word; partial quotes are a contiguous run of the reviewer's own sentences) ---- */
const R = {
  patty: { n: 18, name: 'Patty Przywara', age: '3 months ago', full: true, tags: ['Water heater installation'], hl: ['left installation immaculate'],
    quote: 'Plumbing by Paul replaced our hot water heater today. Outstanding service and professionally installed. Removed old unit and left installation immaculate. Thanks to the excellent customer service and crew!' },
  gambill: { n: 15, name: 'Michael Gambill', age: '2 months ago', full: true, tags: ['Water heater installation'], hl: ['got me in a day earlier'], fixedBy: ['CJ', 'Phil'],
    quote: 'I just moved to St. Pete and new that I needed a water heater. I scheduled with Plumbing by Paul and they had an opening and got me in a day earlier. Phil and CJ were courteous and got to work right away. They even explained to me how to fix my low water pressure on my bathroom sink at no charge. I highly recommend Plumbing by Paul.' },
  doriana: { n: 5, name: 'Doriana Atchley', age: 'Edited 4 weeks ago', full: false, tags: ['Water heater installation'], hl: ['everything was perfect'], fixedBy: ['Alex', 'Chris'],
    quote: 'From calling in to schedule the appointment to them cleaning up - everything was perfect! My only regret was not getting this water tank installed sooner, yes, I was dreading it 😫' },
  dorianaMain: { n: 5, name: 'Doriana Atchley', age: 'Edited 4 weeks ago', full: false, tags: ['Main line clog'], hl: ['clear our main pipe clog'], fixedBy: ['Brian'],
    quote: "So after we had them install the water heater, we had Brian come out and clear our main pipe clog! Again we received incredible service, fast, knowledgeable, Brian was amazing! Thank you!" },
  stephane: { n: 14, name: 'Stephane Davis', age: 'a month ago', full: false, tags: ['Drain cleaning'], hl: ['Tried to DIY it myself with no luck'], fixedBy: ['Brian'],
    quote: "Had a stoppage occur at our home a few days ago. Tried to DIY it myself with no luck. Called and they said they'd be out the next day. Brian came out and cleared out the blockage along with noting come other things of concern. Very professional, awesome job. Second job we have used them for along with a water heater install a few months ago." },
  peterson: { n: 16, name: 'Brian Peterson', age: 'a month ago', full: false, tags: ['Drain cleaning'], fixedBy: ['Phil'],
    quote: 'We have been having problems with the water slowly draining and backing up. Phil came out found the issue and gave a clear directions on how to keep things flowing.' },
  bob: { n: 20, name: 'Bob Gregovich', age: '2 months ago', full: true, tags: ['Toilet repair', 'Drain cleaning'], fixedBy: ['Phil', 'Tim'],
    quote: 'Phil and Tim rebuilt both of our toilets and cleaned a nasty drain. Both Phil and Tim were professional and courteous. They did very good work. This was the 2nd time I used this company and was happy both times.' },
  sam: { n: 8, name: 'sam pastorella', age: 'a month ago', full: false, hl: ['pinpoint the problem'], fixedBy: ['Jacob'],
    quote: 'Jacob used cutting-edge technology to diagnose an issue with our drain lines and was able to map out the entire system and pinpoint the problem.' },
  samFull: { n: 8, name: 'sam pastorella', age: 'a month ago', full: true, tags: ['Water softener and filters'], hl: ['installed a water softener system with filters'], fixedBy: ['Brian', 'Jacob'],
    quote: "These guys are truly outstanding, not your average plumbers. Brian installed a water softener system with filters and he's very knowledgeable about all plumbing topics. Jacob used cutting-edge technology to diagnose an issue with our drain lines and was able to map out the entire system and pinpoint the problem. Plumbing repairs can be stressful, but I have high confidence that you're in good hands with PBP!" },
  mancuso: { n: 24, name: 'Anthony Mancuso', age: '4 months ago', full: true, tags: ['Drain clearing'], hl: ['clearing my drains'], fixedBy: ['Chris', 'Marcus'],
    quote: 'Chris and Marcus delivered excellent service today clearing my drains. They were highly professional, friendly, and knowledgeable. Their efficient work is greatly appreciated, and I highly recommend them.' },
  brooks: { n: 21, name: 'Robert Brooks', age: '5 months ago', full: true, tags: ['Toilet clog'], hl: ['toilet water was rising'], fixedBy: ['JR'],
    quote: 'Last min call, Sun going down and toilet water was rising, and to the rescue came Plumbing By Paul, and Mr JR. You guys are so awesome!! Thank you for saving the night!!' },
  herzog: { n: 27, name: 'Daniel Herzog', age: '8 months ago', full: true, tags: ['Toilet installation'], hl: ['he explained the process'],
    quote: 'Needed a new toilet installed. Office Staff were extremely pleasant and helpful when scheduling an appointment. We got a text the morning of install keeping us informed of the Techs arrival. When Joshua arrived he explained the process. He was extremely professional and hard working. We definitely recommend Plumbing by Paul!!' },
  cher: { n: 4, name: 'Cher R', age: '2 weeks ago', full: true, tags: ['Garbage disposal installation'], hl: ['they knew immediately what needed to happen'], fixedBy: ['Steven'],
    quote: 'I called Plumbing by Paul because a friend of mine highly recommended them. Kris & Steven showed up at my home, ON TIME, they were very professional and polite. We discussed what was going on with my disposal and dishwasher & they knew immediately what needed to happen. They were very clean, knowledgeable, and fixed the issues without breaking the bank! I would highly recommend this company for any and all of your plumbing needs! Thanks, guys, for a job well done.' },
  brendan: { n: 1, name: 'Brendan Berry', age: 'a month ago', full: true, tags: ['Water softener replacement'], hl: ['explained how everything worked'], fixedBy: ['Brian'],
    quote: 'Plumbing by Paul is an exceptional company and Brian went above and beyond when replacing my water softer system! Not only did they accommodate coming out on a Saturday that worked with my schedule but they got the job done in a very efficient and timely fashion as well. Brian was very educational and explained how everything worked, how filters get replaced and when to put more salt in the system. I highly recommend plumbing by Paul you won’t be disappointed in their services or team!' },
  luke: { n: 25, name: 'Luke Utting', age: '10 months ago', full: true, tags: ['Leak repair'], hl: ['fixed the leak at my meter box'], fixedBy: ['Phil'],
    quote: 'Plumbing by Paul Came to my home in St. Petersburg same day and fixed the leak at my meter box in just a few short hours. Very happy with service provided by Alycia & Phil' },
  jamesFull: { n: 7, name: 'James Douglas', age: '5 months ago', full: false, tags: ['Plumbing leak detection', 'Plumbing leak repair'], hl: ['answered on the first ring'], fixedBy: ['Phil'],
    quote: 'I had a leak in copper pipe on a very tricky area. I called Paul and they answered on the first ring. Great attitude on the phone and very helpful. Phil was here within the hour and fixed it in under an hour. Phil let me know if there were any issues to just give them a call back.' },
  stefan: { n: 6, name: 'Stefan Despotovic', age: '4 weeks ago', full: true, tags: ['Plumbing pipe repair'], hl: ['worked with us around our schedule'], fixedBy: ['Elvis', 'JR'],
    quote: "JR and his assistance Elvis did a phenomenal job repairing the plumbing at my Church's hall. JR was committed to resolve our plumbing issue. When the job proved to be tougher than he thought, he wasn't discouraged. JR and Elvis kept everything clean throughout the project and worked with us around our schedule. The entire parish is thankful for their work!" },
  mark: { n: 9, name: 'Mark Smith', age: 'a month ago', full: true, tags: ['Water heater repair', 'Shower repair'], hl: ['I own a small business'], fixedBy: ['Brian'],
    quote: 'So, I figure replacing a shower cartridge is pretty straight forward right? Not when is an old system and impossible to find. Thank you Brian and Plumbing by Paul for getting a temporary fix in place super fast. They will be installing our new shower valve shortly! I own a small business, and I recommend them for all of my clients!' },
  jamie: { n: 2, name: 'Jamie Horn', age: '3 weeks ago', full: true, tags: ['Shower installation'], hl: ['clearly took pride in his work'], fixedBy: ['Chris'],
    quote: 'Chris did an excellent job installing our freestanding tub. He was professional, courteous, and clearly took pride in his work. The installation looks fantastic, and we’re thrilled with how it turned out. I’d gladly recommend Chris to anyone looking for a skilled, dependable plumber!' },
  melissa: { n: 12, name: 'Melissa Robinson', age: 'a month ago', full: true, hl: ['neat, clean and professional in every manner'], fixedBy: ['Phil'],
    quote: 'We contacted a couple different plumbing companies and got the run around but not with you guys. Phil came out and done an awesome job, neat, clean and professional in every manner. We recommend Phil and will request him for future work!' },
  // raw scrape (§ numbers): REVIEWS.md has no sewer or camera-specific review
  pete: { n: 51, name: 'Pete Downing', age: '7 years ago', full: false, tags: ['Sewer line replacement'], hl: ['video the sewer pipe and clean it'],
    quote: 'I had multiple clogs in the span of 6 months. I finally had Paul and team out to video the sewer pipe and clean it. In the process, it was noticed the sewer pipe was cracked and had a sag in a section, so sewage was settling in the pipe. It was determined we needed to place the sewer line from the house to the city service.' },
  vicdian: { n: 16, name: 'Vicdian Vazquez', age: 'a month ago', full: true, tags: ['Sewer repair'], hl: ['honesty, thoroughness and professionalism'], fixedBy: ['Alex'],
    quote: 'Thank you so much Bryan and Alex for the tremendous work you and the crew put in fixing our sewer. We really appreciate the honesty, thoroughness and professionalism. Thank you to Elvis, Troy and Phil as well.' },
  jordan: { n: 17, name: 'Jordan Kerrigan', age: '4 months ago', full: false, tags: ['Kitchen drain, camera inspection'], hl: ['run a camera inspection'], fixedBy: ['Brian'],
    quote: 'After multiple unsuccessful attempts by both myself and others to resolve the issue, Brian was able to successfully clear the drain, run a camera inspection, and provide valuable insight into what may have caused the backup and how to prevent future problems.' },
} satisfies Record<string, Review>;

/* ================================================================================================================ */
export const SERVICE_PAGES: Record<string, SvcPage> = {
  /* ---------- 03 Water heaters (template A, Figma 436:2340 / 439:8691) ---------- */
  'water-heaters': {
    path: '/water-heaters', name: 'Water heater repair and replacement', title: 'Water Heater Repair & Replacement St. Pete FL',
    meta: `No hot water in St. Petersburg? Plumbing By Paul repairs and replaces tank, tankless and hybrid water heaters. Licensed ${SITE.licence}, 4.9 on Google.`,
    og: 'service-tankless-water-heater-install', ogAlt: 'A tankless water heater installed by Plumbing By Paul', layout: 'a', crumb: 'Water heaters',
    hero: {
      eyebrow: 'Water heaters · St. Petersburg, FL', h1a: 'Water heater repair and replacement', h1b: 'in St. Pete',
      lead: "Cold shower this morning? We fix what can be fixed and replace what can't, and we tell you which one it is before you spend a dollar.",
      rows: ['No hot water, or not enough', 'Rusty or smelly hot water', 'Water pooling under the tank'],
      photos: [
        { name: 'service-tankless-water-heater-install', alt: 'A tankless water heater installed on a wall with new copper and gas lines', focus: '42% 50%' },
        { name: 'service-trutankless-unit', alt: 'A Trutankless electric water heater mounted on a block wall', focus: '50% 40%' },
        { name: 'crew-six-at-truck', alt: 'Six of the Plumbing By Paul crew in front of a wrapped truck', focus: '50% 42%' },
      ],
      tag: 'Tankless install', caption: 'Six of the crew.',
    },
    answer: {
      text: `Plumbing By Paul repairs and replaces tank, tankless and hybrid water heaters in St. Petersburg and across Pinellas County. **We try the repair first.** If the tank is leaking or past its normal life, we replace it, usually in 2 to 3 hours for a standard tank, and handle the permit. Call ${P}.`,
      ticket: 'Job ticket: water heater',
      rows: [
        { k: 'Typical time on site', v: '2 to 3 hours for a standard tank swap. Tankless can take longer.' },
        { k: 'Permit in Pinellas County', v: 'Yes, for a replacement. We handle it.' },
        { k: 'Usual causes', v: 'Sediment build-up, a failed thermostat or heating element, pilot or ignition trouble, an old tank.' },
        { k: 'Types we work on', v: 'Tank, tankless and hybrid, all major brands.' }, EST, WAR, LIC,
      ],
    },
    signs: { eyebrow: 'Four signs', l1: 'Your water heater is', l2: 'trying to tell you something', items: [
      { t: "It's getting old.", d: 'The serial number on the label tells you the age. Past its expected life, start planning before it picks the day for you.', icon: 'calendar' },
      { t: 'Rusty, discolored or smelly hot water.', d: 'Usually a sign the tank is corroding from the inside.', icon: 'droplets' },
      { t: 'Popping, rumbling or banging.', d: "That's sediment cooking at the bottom of the tank. Common with our hard water.", icon: 'zap' },
      { t: 'Water pooling at the base.', d: "Don't wait on this one. Turn off the supply to the heater and call.", icon: 'alert' },
    ] },
    compare: { eyebrow: 'The honest answer', l1: 'Repair it or replace it?', l2: 'We try the repair first.',
      left: { t: 'Usually a repair', icon: 'wrench', items: ['Younger than its expected life', 'First or second problem', 'No hot water but no leak', 'Thermostat, element, pilot or valve at fault'] },
      right: { t: 'Usually time to replace', icon: 'heater', items: ['Past its expected life', 'The tank itself is leaking', 'Repairs are becoming regular', 'The fix would cost more than the heater is worth'] },
      strip: { text: 'Want the long version? Read', link: 'Repair or replace your water heater?', href: '/guides/water-heater-repair-or-replace' } },
    types: { eyebrow: 'Which one is right for you?', l1: 'Tank, tankless', l2: 'or hybrid', lead: "We install all three and we'll tell you which fits your house, your household and your budget.", link: 'Ask which one fits your home', cards: [
      { num: '10 to 15', sub: 'years, electric tank (gas: 8 to 12)', t: 'Tank', d: 'The most common type. Lower cost up front, simple to replace.', best: 'a straightforward swap', icon: 'heater' },
      { num: '20+', sub: 'years', t: 'Tankless', d: 'Heats water as you use it. Costs more up front, takes less space and lasts longer.', best: 'the long run', icon: 'flame' },
      { num: 'HP', sub: 'heat pump + tank', t: 'Hybrid', d: 'A heat pump on top of a tank. The most efficient of the three.', best: 'lower electric bills', icon: 'zap' },
    ] },
    steps: { eyebrow: 'What to expect', l1: 'Hot water back', l2: 'in four steps', items: [
      { t: 'Call or send the form.', d: "Tell us what it's doing and how old it is, if you know.", icon: 'phone' },
      { t: 'Free look and a clear price.', d: "We check the unit and tell you what's wrong and what it costs.", icon: 'clipboard' },
      { t: 'Repair or install.', d: 'Repair first. If it needs replacing, we help you choose, pull the permit, fit the new one and haul the old one away.', icon: 'wrench' },
      { t: 'We show you how it works.', d: 'A walkthrough of your new system before we leave, and a 1-year workmanship warranty after.', icon: 'check' },
    ], photo: { name: 'crew-three-techs-at-van', alt: 'Three Plumbing By Paul technicians at the open side door of a work van', focus: '50% 40%' }, caption: 'Three of the crew, loading up.', patches: ['JR', 'Elvis'] },
    price: { l1: 'The price depends on the heater.', l2: "You'll know it before we start.",
      p: 'A repair and a full replacement are very different jobs, and tank size, fuel and where the heater sits all change the number. So we look first, then give you one clear price. No surprises on the invoice.',
      rows: ['Repair', 'Standard tank replacement', 'Tankless'] },
    reviews: { eyebrow: 'Water heater reviews', l1: 'Hot water,', l2: 'happy neighbors', list: [R.patty, R.gambill, R.doriana], chip: { n: '35', text: 'water heater replacement' }, link: 'All water heater reviews' },
    local: { eyebrow: 'Local knowledge', l1: 'Two things every', l2: 'Pinellas homeowner should know', cards: [
      { label: 'Permits', icon: 'clipboard', q: 'Do I need a permit to replace a water heater in Pinellas County?', a1: 'Yes.', a2: 'A water heater replacement needs a permit here. We pull it for you and the work is done to code, which matters when you sell the house or file an insurance claim.' },
      { label: 'Pinellas water', icon: 'droplets', q: 'Why do water heaters work harder here?', a1: "Pinellas water comes from the Floridan Aquifer and it's hard.", a2: "The minerals settle in the tank as sediment, which is what makes the popping noise and shortens the heater's life. A yearly flush helps. So does a softener.", link: { t: 'Water softeners and filtration', href: '/water-softeners' } },
    ] },
    faq: { eyebrow: 'Water heater questions', l1: 'Asked on', l2: 'almost every visit', items: [
      { q: 'Should I repair or replace my water heater?', a1: "Repair it if it's within its expected life and this is the first real problem.", a2: "Replace it if the tank is leaking, it's past its expected life, or repairs are becoming regular. We always try the repair first and explain why if we recommend a new one.", link: { text: 'Read the repair or replace guide', href: '/guides/water-heater-repair-or-replace' } },
      { q: 'How long does a water heater last?', a1: 'On average, 8 to 12 years for a gas tank, 10 to 15 for an electric tank and 20 years or more for a tankless unit.', a2: 'Hard water and skipped maintenance shorten that.' },
      { q: 'How long does a replacement take?', a1: 'Most standard tank replacements take 2 to 3 hours.', a2: 'A tankless installation can take longer, depending on the gas or electrical work. We give you a time before we begin.' },
      { q: 'How do I find out how old mine is?', a1: 'The age is coded in the serial number on the label.', a2: "Call us with the brand and serial number, or we'll read it during a free look." },
      { q: 'What brands do you install?', a1: 'We work with all the major brands.', a2: 'During your estimate we recommend one for your budget, household size and energy goals.' },
      { q: 'My water heater is leaking. What do I do right now?', a1: `Turn off the water supply to the heater and the power or gas to it, then call ${P}.`, a2: 'A leaking tank does not fix itself.' },
    ] },
    related: { eyebrow: "While we're there", l1: 'Often booked', l2: 'with a water heater', cards: [
      { t: 'Tankless water heaters', href: '/water-heaters#types', icon: 'flame' }, { t: 'Water softeners and filtration', href: '/water-softeners', icon: 'drop' },
      { t: 'Leak detection', href: '/leak-detection', icon: 'droplets' }, { t: 'Repiping', href: '/repiping', icon: 'ruler' },
    ], line: 'Water heater service in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: 'No hot water?', l2: "Let's fix that today.", lead: "Call and tell us what the heater is doing. We'll tell you when we can be there." },
  },

  /* ---------- 04 Drain cleaning (template B, Figma 441:2340 / 443:4704) ---------- */
  'drain-cleaning': {
    path: '/drain-cleaning', name: 'Drain cleaning', title: 'Drain Cleaning St. Petersburg FL · Plumbing By Paul',
    meta: 'Slow or clogged drain in St. Petersburg? Plumbing By Paul clears sinks, showers, toilets and main lines and checks with a camera. 4.9 on Google.',
    og: 'service-tech-at-cleanout', ogAlt: 'A Plumbing By Paul technician running a drain line through a yard cleanout', layout: 'b', crumb: 'Drain cleaning',
    hero: {
      eyebrow: 'Drain cleaning · St. Petersburg, FL', h1a: 'Drain cleaning', h1b: 'in St. Petersburg',
      lead: "When the plunger gives up, we don't. We clear the clog, check why it happened and tell you how to keep it from coming back.",
      chips: [{ icon: 'badge', label: `Lic. ${SITE.licence}` }, { icon: 'building', label: 'Homes and businesses' }, { icon: 'camera', label: 'Camera inspection when needed' }],
      photos: [{ name: 'service-tech-at-cleanout', alt: 'A technician feeding a drain line into an open yard cleanout', focus: '50% 30%' }],
      tag: 'At the cleanout', mini: { quote: 'Chris and Marcus delivered excellent service today clearing my drains.', name: 'Anthony Mancuso', patches: ['Chris', 'Marcus'] },
    },
    answer: {
      text: `Plumbing By Paul clears clogged and slow drains in St. Petersburg and across Pinellas County: kitchen sinks, showers, tubs, toilets, floor drains and main sewer lines. We clear the blockage, look inside with a camera when it's needed, and **tell you the price before we start**. Call ${P}.`,
      ticket: 'Job ticket: drain cleaning',
      rows: [
        { k: 'Drains we clear', v: 'Toilets, kitchen sinks, bathroom sinks, showers and tubs, floor drains, sewer lines.' },
        { k: 'Usual causes', v: 'Grease and food, hair and soap, wipes, roots in older lines.' },
        { k: 'Camera inspection', v: "When the clog keeps coming back or the cause isn't clear." },
        { k: 'Estimate', v: 'Free for non-emergency jobs, before work starts.' }, { k: 'Homes and businesses', v: 'Both.' }, LIC,
      ],
    },
    tabs: { eyebrow: 'Every drain in the building', l1: 'Which drain', l2: 'is giving you trouble?', foot: 'Call about this drain', caption: 'One of the crew, under a kitchen sink.',
      photo: { name: 'service-tech-kitchen-sink-smiling', alt: 'A Plumbing By Paul technician smiling while working under a kitchen sink', focus: '60% 50%' }, items: [
      { label: 'Kitchen sinks', icon: 'droplets', text: 'Grease goes down warm and sets in the pipe. Food sticks to it. We cut through the build-up and flush the line so it drains like it should.' },
      { label: 'Toilets', icon: 'toilet', text: "If it clogs every week, there's usually something lodged further down, or a venting problem. We clear it and find the cause." },
      { label: 'Bathroom sinks', icon: 'drop', text: 'Hair, soap and toothpaste. Slow at first, then standing water.' },
      { label: 'Showers and tubs', icon: 'shower', text: "Hair and soap again. If the water is at your ankles by the end of a shower, it's time." },
      { label: 'Floor drains', icon: 'waves', text: 'Laundry lint, dirt and debris. Out of sight until the floor is wet.' },
      { label: 'Sewer lines', icon: 'pipe', text: 'Every drain in the building meets in one main line to the city sewer. When that clogs, everything backs up.', href: '/sewer-service', hrefText: 'See sewer service' },
    ] },
    versus: { eyebrow: 'Be honest with yourself', l1: 'Plunger', l2: 'or plumber?', call: "It's a plumber one", caption: 'Yes, we really are this happy under a sink.',
      photo: { name: 'service-tech-under-sink-smiling', alt: 'A smiling technician in a cap working under a pink-tiled bathroom sink', focus: '50% 40%' },
      left: { t: 'Try the plunger', items: ['One drain is slow, the rest are fine', 'It happened once', 'A plunger or a hair catcher clears it', 'No smell, no gurgle'] },
      right: { t: 'Call the plumber', items: ['More than one drain is slow', 'Water comes up in the shower when you flush', 'Gurgling or a sewer smell', 'It keeps coming back', "You tried, and it's still stuck"] } },
    steps: { eyebrow: 'How we clear a drain', l1: 'Estimate, inspect,', l2: 'clean, prevent', items: [
      { t: 'Estimate.', d: 'We look at the problem and give you a price before we start.', icon: 'clipboard' },
      { t: 'Inspect.', d: "If the cause isn't obvious, the camera goes in so we can both see it.", icon: 'camera' },
      { t: 'Clean.', d: 'We clear the blockage and run water through every drain we touched.', icon: 'waves' },
      { t: 'Prevent.', d: 'We tell you what we found and what will keep it from happening again.', icon: 'shield' },
    ] },
    feature: { eyebrow: 'See it for yourself', l1: "We don't guess.", l2: 'We send a camera.',
      p: "A drain camera shows exactly what's in the line: grease, roots, a sag or a break. You see the same screen we do, so you never pay for a repair on our say-so alone.",
      links: [{ t: 'Drain camera inspection', href: '/drain-camera' }, { t: 'Sewer service', href: '/sewer-service' }],
      placeholder: 'Photo from Paul: camera screen showing the inside of a line', tag: 'Digging for a line repair',
      photo: { name: 'service-tech-digging-with-van', alt: 'A technician digging in a front yard with the Plumbing By Paul van behind him', focus: '50% 30%' }, review: { r: R.sam, patch: 'Jacob' } },
    reviews: { eyebrow: 'Drain reviews', l1: 'Cleared, explained,', l2: 'recommended', list: [R.stephane, R.peterson, R.bob] },
    price: { l1: 'Drain cleaning is priced by the drain and how far down the clog is.', l2: "You'll know the number before we start.", rows: ['Single drain', 'Main line', 'Camera inspection'] },
    tips: { eyebrow: 'Free advice', l1: 'How to see less', l2: 'of us', caption: 'A new sewer line going in. The job a clear drain helps you avoid.',
      photo: { name: 'service-sewer-line-trench-pvc', alt: 'A new white PVC sewer line in an open trench beside a house', focus: '50% 55%' }, items: [
      { b: 'Only flush toilet paper.', t: 'Wipes belong in the trash, even the ones that say flushable.' },
      { b: 'Catch the hair.', t: 'A drain guard in the shower costs a few dollars.' },
      { b: 'Grease goes in a can,', t: 'not down the sink.' },
      { b: 'Know your shut-off valve.', t: "It's outside, near the water meter." },
    ], warn: { b: 'Slow is a warning.', t: "Call while it's slow. It's an easier job than stopped." } },
    faq: { eyebrow: 'Drain questions', l1: 'Quick answers', l2: 'about clogs', items: [
      { tag: 'Emergency', q: 'Do you offer emergency drain cleaning?', a1: 'Yes.', a2: `If a drain is backing up into the house, call ${P} right away and stop running water.`, link: { text: `Call ${P}`, href: SITE.tel } },
      { tag: 'Pricing', q: 'Do you give free estimates for drain cleaning?', a1: 'Yes.', a2: 'For non-emergency jobs we look at the problem and give you a price before we start. For an emergency we can often give an estimate over the phone.' },
      { tag: 'Service', q: 'Can you clean sewer lines?', a1: 'Yes.', a2: 'We clear sewer lines as well as floor drains, toilets, kitchen and bathroom sinks, showers and tubs.' },
      { tag: 'Camera', q: 'Do you use a camera?', a1: "Yes, when it's needed.", a2: "If a clog keeps coming back or the cause isn't clear, a camera shows us and you what's inside the line." },
      { tag: 'Toilets', q: 'Why does my toilet clog so easily?', a1: "Usually there's a partial blockage in the drain that grows with each flush.", a2: 'Too much paper and "flushable" wipes are common causes. It can also be a venting problem. We find out which.' },
      { tag: 'Main line', q: 'Several drains are slow at once. What does that mean?', a1: 'It usually means the main line is blocked, not one drain.', a2: 'Stop running water and call us.' },
      { tag: 'Pricing', q: 'How much does drain cleaning cost in St. Petersburg?', a1: 'It depends on which drain and how far down the clog is.', a2: 'We give you the price before any work starts.' },
    ] },
    cta: { l1: 'Still not draining?', l2: 'Put the plunger down.' },
  },

  /* ---------- Clogged drain (template B) ---------- */
  'clogged-drain': {
    path: '/clogged-drain', name: 'Clogged drain repair', title: 'Clogged Drain Repair St. Petersburg FL · Plumbing By Paul',
    meta: 'Sink, tub or toilet that won’t drain in St. Petersburg? Plumbing By Paul clears the blockage, finds the cause and tells you the price first. Free estimate.',
    og: 'service-tech-under-bath-vanity', ogAlt: 'A Plumbing By Paul technician working on the drain under a bathroom vanity', layout: 'b', crumb: 'Clogged drain',
    hero: {
      eyebrow: 'Clogged drain · St. Petersburg, FL', h1a: 'Clogged drain?', h1b: "We'll clear it properly",
      lead: "One drain that won't behave is usually a local clog. We clear it all the way down the line, not just the top of it, and tell you what caused it.",
      chips: [{ icon: 'badge', label: `Lic. ${SITE.licence}` }, { icon: 'clipboard', label: 'Price before we start' }, { icon: 'camera', label: 'Camera when it keeps coming back' }],
      photos: [{ name: 'service-tech-under-bath-vanity', alt: 'A technician lying on a bathroom floor working on the pipes under a vanity', focus: '50% 55%' }],
      tag: 'Under the vanity', mini: { quote: 'Brian was able to successfully clear the drain, run a camera inspection, and provide valuable insight', name: 'Jordan Kerrigan', patches: ['Brian'] },
    },
    answer: {
      text: `Plumbing By Paul clears clogged sinks, tubs, showers, toilets and floor drains in St. Petersburg and across Pinellas County. If water still sits in the sink or tub several minutes after you use it, the clog is only getting worse. **We clear the whole line and tell you the price first.** Call ${P}.`,
      ticket: 'Job ticket: clogged drain',
      rows: [
        { k: 'When to call', v: 'Water drains slowly, sits for minutes, smells or backs up regularly.' },
        { k: 'Usual causes', v: 'Food, grease and soap scum in kitchens; hair, soap and floss in bathrooms.' },
        { k: 'Chemical cleaners', v: 'Often fail on deeper clogs and can damage pipes over time.' },
        { k: 'Camera inspection', v: 'When the clog keeps coming back.' }, EST, WAR, LIC,
      ],
    },
    tabs: { eyebrow: "What's it doing?", l1: 'Pick the one', l2: "that sounds like yours", foot: 'Call about this clog', caption: 'Under a kitchen sink, mid-job.',
      photo: { name: 'service-tech-kitchen-sink-smiling', alt: 'A Plumbing By Paul technician working under a kitchen sink', focus: '60% 50%' }, items: [
      { label: 'Slow drain', icon: 'waves', text: 'Build-up is forming inside the pipe. Hair, soap, grease or food debris slow the water down, and in the end they stop it completely.' },
      { label: 'Standing water', icon: 'drop', text: "The water is sitting in the sink or tub and not going anywhere. The blockage is solid now. Stop using that fixture and call, before it overflows." },
      { label: 'Bad smell', icon: 'alert', text: 'Food and grease rotting in the trap or the line will smell long before the drain stops. A smell from more than one drain can point to the sewer line.', href: '/sewer-service', hrefText: 'See sewer service' },
      { label: 'Gurgling', icon: 'droplets', text: 'Bubbles and gurgling when water goes down mean air is fighting its way past a blockage, or the vent is not doing its job. Both are worth a look.' },
      { label: 'It came back', icon: 'camera', text: "A clog that keeps returning has a cause further down. That's when a camera goes in, so we fix the reason and not just the symptom.", href: '/drain-camera', hrefText: 'See drain camera inspection' },
    ] },
    versus: { eyebrow: 'Before you buy a bottle', l1: 'Chemicals', l2: 'or a plumber?', call: 'Call before you pour', caption: 'Two of the crew, working under a vanity.',
      photo: { name: 'service-two-techs-vanity-install', alt: 'Two Plumbing By Paul technicians working together under a bathroom vanity', focus: '50% 50%' },
      left: { t: 'Worth a try yourself', items: ['A plunger on one slow sink or tub', 'Pulling hair out of the stopper', 'A hair catcher in the shower', 'Hot water and a little patience'] },
      right: { t: 'Call the plumber', items: ['The bottle of drain cleaner did nothing', 'Water sits for several minutes', 'It smells, even after cleaning', 'More than one drain is slow', 'It keeps coming back'] } },
    steps: { eyebrow: 'How we clear a clog', l1: 'Find it, clear it,', l2: 'check it, explain it', items: [
      { t: 'Find it.', d: 'We work out where the blockage sits and give you the price before we start.', icon: 'search' },
      { t: 'Clear it.', d: 'We clear the full drain line, not just the surface blockage.', icon: 'waves' },
      { t: 'Check it.', d: 'We run water through and make sure it drains the way it should.', icon: 'check' },
      { t: 'Explain it.', d: 'You hear what caused it and what keeps it from coming back.', icon: 'help' },
    ] },
    feature: { eyebrow: 'When it keeps coming back', l1: 'The cause is', l2: 'further down.',
      p: 'A clog that returns every few weeks is telling you something. Sending a camera into the line shows the exact source of the blockage, so the repair is done once and done right.',
      links: [{ t: 'Drain camera inspection', href: '/drain-camera' }, { t: 'Drain cleaning', href: '/drain-cleaning' }],
      placeholder: 'Photo from Paul: a cleared drain line on the camera screen', tag: 'At the cleanout',
      photo: { name: 'service-tech-at-cleanout', alt: 'A technician feeding a drain line into an open yard cleanout', focus: '50% 30%' }, review: { r: R.jordan, patch: 'Brian' } },
    reviews: { eyebrow: 'Clog reviews', l1: 'Stuck, then', l2: 'flowing again', list: [R.mancuso, R.dorianaMain, R.brooks] },
    price: { l1: 'A clog is priced by where it is and how stubborn it is.', l2: "You'll know the number before we start.", rows: ['Sink or tub', 'Toilet', 'Main line'] },
    tips: { eyebrow: 'Free advice', l1: 'Keep it', l2: 'flowing', caption: 'The van that turns up when it stops.',
      photo: { name: 'fleet-van-street-4284px', alt: 'The wrapped Plumbing By Paul van parked on a residential street', focus: '50% 55%' }, items: [
      { b: 'Scrape plates into the trash.', t: 'Food and grease are what stop kitchen drains.' },
      { b: 'Use a hair catcher.', t: 'Showers, tubs and bathroom sinks clog on hair first.' },
      { b: 'Skip the bottle.', t: 'Chemical cleaners rarely reach a deep clog and are hard on pipes.' },
      { b: 'Only toilet paper in the toilet.', t: 'Wipes belong in the trash, even the flushable ones.' },
    ], warn: { b: 'Five minutes is the line.', t: "If water still sits in the sink or tub after five minutes, call while it's slow." } },
    faq: { eyebrow: 'Clogged drain questions', l1: 'Straight answers', l2: 'about clogs', items: [
      { tag: 'When', q: 'When should I call a plumber for a clogged drain?', a1: 'When water drains slowly, sits for several minutes, smells bad or backs up regularly.', a2: 'Calling early keeps a small clog from turning into a bigger repair.' },
      { tag: 'DIY', q: 'Are chemical drain cleaners safe to use?', a1: 'We do not recommend them.', a2: 'They often fail against deeper blockages and can damage your pipes over time. For a clog that keeps coming back, a professional look is safer.' },
      { tag: 'Main line', q: 'Can you help with sewer backups?', a1: 'Yes.', a2: 'When several drains back up at once the problem is usually the main line, and we clear and inspect sewer lines too.', link: { text: 'Sewer service', href: '/sewer-service' } },
      { tag: 'Emergency', q: 'Do you offer emergency drain service?', a1: `Yes. If a drain is backing up into the house, call ${P} right away.`, a2: 'Stop running water in the house until we get there.' },
      { tag: 'Camera', q: 'Why does my drain keep clogging?', a1: 'Something further down the line is catching debris.', a2: 'It can be build-up, roots in an older line or a damaged pipe. A camera inspection finds the exact source.' },
      { tag: 'Pricing', q: 'How much does it cost to clear a clogged drain?', a1: 'It depends on which drain and where the clog sits.', a2: 'Estimates are free, and you hear the price before any work starts.' },
    ] },
    related: { eyebrow: 'Related services', l1: 'When it is more', l2: 'than one drain', cards: [
      { t: 'Drain cleaning', href: '/drain-cleaning', icon: 'waves' }, { t: 'Drain camera inspection', href: '/drain-camera', icon: 'camera' },
      { t: 'Sewer service', href: '/sewer-service', icon: 'pipe' }, { t: 'Toilet repair', href: '/toilet-repair', icon: 'toilet' },
    ], line: 'Clogged drains cleared in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: 'Water not going down?', l2: "We'll get it moving." },
  },

  /* ---------- Drain camera (template A) ---------- */
  'drain-camera': {
    path: '/drain-camera', name: 'Drain camera inspection', title: 'Drain Camera Inspection St. Petersburg FL · Plumbing By Paul',
    meta: 'Recurring clogs or a suspected sewer problem in St. Petersburg? Plumbing By Paul sends a camera down the line so you see the cause before you pay.',
    og: 'service-tech-digging-with-van', ogAlt: 'A Plumbing By Paul technician digging to reach a drain line', layout: 'a', crumb: 'Drain camera inspection',
    hero: {
      eyebrow: 'Drain camera · St. Petersburg, FL', h1a: 'Drain camera inspection', h1b: 'in St. Pete',
      lead: 'See the problem before you dig. A small waterproof camera goes down the line and shows us, and you, exactly what is going on inside your pipes.',
      rows: ['Clogs that keep coming back', 'Slow drains all over the house', 'An older line you want checked'],
      photos: [
        { name: 'service-tech-at-cleanout', alt: 'A technician feeding a line into an open yard cleanout', focus: '50% 30%' },
        { name: 'service-tech-digging-with-van', alt: 'A technician digging in a front yard with the van behind him', focus: '50% 35%' },
        { name: 'service-sewer-line-trench-pvc', alt: 'A new PVC sewer line in an open trench', focus: '50% 60%' },
      ],
      tag: 'At the cleanout', caption: 'A new line going in.',
    },
    answer: {
      text: `Plumbing By Paul runs drain camera inspections in St. Petersburg and across Pinellas County. We lower a waterproof camera on a cable into the line and **find the exact cause of the problem without guesswork or unneeded digging**. You see what we see before you decide on a repair. Call ${P}.`,
      ticket: 'Job ticket: drain camera',
      rows: [
        { k: 'What it finds', v: 'Blockages and build-up, tree roots, cracks and pipe damage, sags in the line.' },
        { k: 'When it helps', v: 'Recurring clogs, slow drains, suspected sewer trouble, older plumbing, before a major repair.' },
        { k: 'Digging', v: 'None to look. We dig only if a repair needs it.' },
        { k: 'Homes and businesses', v: 'Both.' }, EST, LIC,
      ],
    },
    signs: { eyebrow: 'Four good reasons', l1: 'When a camera', l2: 'is worth sending in', items: [
      { t: 'The clog came back.', d: 'If a drain clears and then stops again, something further down is catching debris.', icon: 'waves' },
      { t: 'Several drains are slow.', d: 'More than one fixture backing up points to the main line, not the sink.', icon: 'droplets' },
      { t: 'Smell or gurgle.', d: 'A sewer smell or gurgling drains can mean a crack, a sag or roots in the line.', icon: 'alert' },
      { t: 'Before a big repair.', d: 'Seeing the line first means you never pay for a repair on a guess.', icon: 'search' },
    ] },
    compare: { eyebrow: 'Why look first', l1: 'Guessing costs money.', l2: 'Looking saves it.',
      left: { t: 'What the camera shows', icon: 'camera', items: ['Clogs, build-up and obstructions', 'Tree roots inside the line', 'Cracks, breaks and corrosion', 'Sags where waste settles'] },
      right: { t: 'What you get from it', icon: 'clipboard', items: ['The exact spot of the problem', 'The right repair, not a guess', 'No digging just to look', 'A plain explanation of what we found'] } },
    steps: { eyebrow: 'Our inspection process', l1: 'Fast, clean', l2: 'and accurate', items: [
      { t: 'Access.', d: 'We open up the line at a cleanout or a drain and set up the camera.', icon: 'wrench' },
      { t: 'Inspect.', d: 'The waterproof camera goes down the line to view the inside of the pipe.', icon: 'camera' },
      { t: 'Diagnose.', d: 'We find blockages, build-up, damage or anything else that will cause trouble.', icon: 'search' },
      { t: 'Recommend.', d: 'You get a clear explanation and the next step, repair or prevention, with the price first.', icon: 'clipboard' },
    ], photo: { name: 'fleet-aerial-van-jobsite', alt: 'An aerial view of the Plumbing By Paul van at a waterfront job site', focus: '45% 50%' }, caption: 'On site, from above.' },
    price: { l1: 'An inspection costs less than a wrong repair.', l2: "You'll know the price before we start.",
      p: 'A camera inspection gives you a clear picture of the line for a fair price, and it can save a lot of money compared with a repair made on a guess. We tell you the number up front.',
      rows: ['Camera inspection', 'Inspection with drain cleaning', 'Sewer line inspection'] },
    reviews: { eyebrow: 'Camera reviews', l1: 'Seen, found,', l2: 'fixed', list: [R.samFull, R.jordan, R.pete] },
    faq: { eyebrow: 'Drain camera questions', l1: 'What people ask', l2: 'about the camera', items: [
      { q: 'Is a drain camera inspection invasive?', a1: 'No.', a2: 'The camera goes into the plumbing through an opening that is already there, so we can see inside the pipes without digging or taking the system apart.' },
      { q: 'When should I schedule a camera inspection?', a1: 'When clogs keep coming back, drains are slow or you suspect a sewer problem.', a2: 'It is also worth doing on older plumbing and before any major repair.' },
      { q: 'Can it prevent future plumbing problems?', a1: 'Yes.', a2: 'Seeing what is happening deep in the pipes catches issues early, before they turn into expensive emergencies.' },
      { q: 'Can I see what the camera sees?', a1: 'Yes.', a2: 'You see the same screen we do, so you know why we recommend a repair before you agree to it.' },
      { q: 'Do you clean the drain as well?', a1: 'Yes.', a2: 'If the camera finds a blockage we can clear it on the same visit, and you get the price before we start.', link: { text: 'Drain cleaning', href: '/drain-cleaning' } },
    ] },
    related: { eyebrow: 'What usually comes next', l1: 'After the', l2: 'camera', cards: [
      { t: 'Drain cleaning', href: '/drain-cleaning', icon: 'waves' }, { t: 'Sewer service', href: '/sewer-service', icon: 'pipe' },
      { t: 'Clogged drain', href: '/clogged-drain', icon: 'alert' }, { t: 'Repiping', href: '/repiping', icon: 'ruler' },
    ], line: 'Drain camera inspections in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: 'Want to see inside the pipe?', l2: "We'll show you." },
  },

  /* ---------- Sewer service (template B) ---------- */
  'sewer-service': {
    path: '/sewer-service', name: 'Sewer line repair and replacement', title: 'Sewer Line Repair St. Petersburg FL · Plumbing By Paul',
    meta: 'Sewer backup, roots or a broken line in St. Petersburg? Plumbing By Paul assesses, repairs and replaces sewer lines, with a camera to show you the cause.',
    og: 'service-sewer-line-trench-pvc', ogAlt: 'A new PVC sewer line in an open trench beside a house', layout: 'b', crumb: 'Sewer service',
    hero: {
      eyebrow: 'Sewer service · St. Petersburg, FL', h1a: 'Sewer line repair', h1b: 'and replacement',
      lead: 'Every drain in the house runs to one sewer line under your property. When it backs up, cracks or fills with roots, we find out why and fix it properly.',
      chips: [{ icon: 'badge', label: `Lic. ${SITE.licence}` }, { icon: 'camera', label: 'Camera to show the cause' }, { icon: 'clipboard', label: 'Free assessment' }],
      photos: [{ name: 'service-sewer-line-trench-pvc', alt: 'A new white PVC sewer line laid in an open trench beside a house', focus: '50% 50%' }],
      tag: 'New sewer line', mini: { quote: 'Thank you so much Bryan and Alex for the tremendous work you and the crew put in fixing our sewer.', name: 'Vicdian Vazquez', patches: ['Alex'] },
    },
    answer: {
      text: `Plumbing By Paul repairs, clears and replaces sewer lines in St. Petersburg and across Pinellas County. Your property has one main line that connects to the city sewer, and **the part on your property is yours to fix**. We assess it, show you the cause on camera and give you the price before any work. Call ${P}.`,
      ticket: 'Job ticket: sewer service',
      rows: [
        { k: 'What we handle', v: 'Blockages, root removal, broken and corroded pipe, sagging (bellied) lines, full replacement.' },
        { k: 'Warning signs', v: 'Several drains backing up, gurgling, a sewer smell, water coming up in the shower.' },
        { k: 'Camera inspection', v: 'Yes, to see the cause before we dig.' },
        { k: 'Assessment', v: 'Free, before any work starts.' }, { k: 'Homes and businesses', v: 'Both.' }, LIC,
      ],
    },
    tabs: { eyebrow: 'What is going on down there?', l1: 'Which sewer problem', l2: 'do you have?', foot: 'Call about your sewer line', caption: 'Digging down to the line.',
      photo: { name: 'service-tech-digging-with-van', alt: 'A technician digging in a front yard with the Plumbing By Paul van behind him', focus: '50% 30%' }, items: [
      { label: 'Blockage', icon: 'waves', text: 'Grease, wipes and debris collect in the main line until every drain in the house slows down. We clear it and check the line on camera.' },
      { label: 'Tree roots', icon: 'filter', text: 'Roots find their way into older sewer lines through joints and cracks, then grow into a stubborn blockage. They need professional removal.' },
      { label: 'Broken pipe', icon: 'alert', text: 'A broken sewer pipe causes backups and can damage the property. We inspect it and recommend the right repair.' },
      { label: 'Corrosion', icon: 'droplets', text: 'Older pipe corrodes from the inside, narrows and eventually fails. The camera shows how far along it is.' },
      { label: 'Bellied pipe', icon: 'pipe', text: 'A sag in the line lets waste settle and keeps causing clogs. The fix is usually to replace that section.' },
      { label: 'Replacement', icon: 'wrench', text: 'When the line is old, damaged or beyond repair, we replace it from the house to the city connection.' },
    ] },
    versus: { eyebrow: 'Know the difference', l1: 'One drain', l2: 'or the whole line?', call: 'It sounds like the line', caption: 'At the yard cleanout.',
      photo: { name: 'service-tech-at-cleanout', alt: 'A technician feeding a line into an open yard cleanout', focus: '50% 30%' },
      left: { t: 'Probably one drain', items: ['Only one sink or tub is slow', 'The rest of the house is fine', 'No smell outside the bathroom', 'It cleared with a plunger'] },
      right: { t: 'Probably the sewer line', items: ['Several drains back up together', 'Water comes up in the shower when you flush', 'Gurgling from more than one drain', 'A sewer smell in the yard or house', 'Clogs keep coming back'] } },
    steps: { eyebrow: 'Full-service sewer repair', l1: 'Assess, recommend,', l2: 'repair, support', items: [
      { t: 'Assess.', d: 'We evaluate the sewer problem and find the cause, on camera when it helps.', icon: 'search' },
      { t: 'Recommend.', d: 'We explain whether cleaning, root removal, repair or replacement is the right option.', icon: 'clipboard' },
      { t: 'Repair.', d: 'We do the work with care and leave the yard as tidy as we can.', icon: 'wrench' },
      { t: 'Support.', d: 'If the line needs replacing, we walk you through the options and the price first.', icon: 'shield' },
    ] },
    feature: { eyebrow: 'See it for yourself', l1: 'Camera first,', l2: 'shovel second.',
      p: 'Before anyone digs up your yard, a camera goes down the line. You see the crack, the roots or the sag on the same screen we do, and you decide on the repair knowing what it fixes.',
      links: [{ t: 'Drain camera inspection', href: '/drain-camera' }, { t: 'Drain cleaning', href: '/drain-cleaning' }],
      placeholder: 'Photo from Paul: camera view inside a sewer line', tag: 'On a job site',
      photo: { name: 'fleet-aerial-van-jobsite', alt: 'An aerial view of the Plumbing By Paul van parked at a job site', focus: '45% 50%' }, review: { r: R.pete } },
    reviews: { eyebrow: 'Sewer reviews', l1: 'Found it,', l2: 'fixed it', list: [R.vicdian, R.dorianaMain, R.stephane] },
    price: { l1: 'Sewer work is priced by what the camera finds and how deep the line runs.', l2: "You'll know the number before we start.", rows: ['Main line clearing', 'Camera inspection', 'Section repair'] },
    tips: { eyebrow: 'Free advice', l1: 'Look after', l2: 'the main line', caption: 'The box truck, ready for the big jobs.',
      photo: { name: 'fleet-box-truck-rear-three-quarter', alt: 'The Plumbing By Paul box truck with the mascot wrap', focus: '50% 35%' }, items: [
      { b: 'Wipes go in the trash.', t: 'Even the flushable ones end up in the main line.' },
      { b: 'Grease goes in a can,', t: 'not down the sink, where it hardens in the pipe.' },
      { b: 'Watch for gurgles.', t: 'Gurgling from several drains is an early warning.' },
      { b: 'Know your cleanout.', t: 'It is the capped pipe in the yard that gives access to the line.' },
    ], warn: { b: 'Sewage coming up?', t: 'Stop running water in the house and call straight away.' } },
    faq: { eyebrow: 'Sewer questions', l1: 'Straight answers', l2: 'about sewer lines', items: [
      { tag: 'Ownership', q: 'Am I responsible for the sewer line on my property?', a1: 'In most cases, yes.', a2: 'The main line runs from the house to the city sewer, and if something goes wrong on your side of the property line the repair usually falls to the owner.' },
      { tag: 'Emergency', q: 'Do you offer emergency sewer service?', a1: `Yes. If sewage is backing up into the house, call ${P}.`, a2: 'Stop running water and keep away from the backed-up fixture until we get there.', link: { text: 'Emergency plumbing', href: '/emergency-plumbing' } },
      { tag: 'Service', q: 'Can you repair and replace sewer lines?', a1: 'Yes.', a2: 'We handle blockage removal, root removal, corrosion and broken pipe repair, bellied pipe replacement and full sewer line replacement.' },
      { tag: 'Assessment', q: 'Do you provide assessments?', a1: 'Yes, and the assessment is free.', a2: 'If you are not sure what the sewer line needs, we look and explain your options.' },
      { tag: 'Camera', q: 'Do you have to dig to find the problem?', a1: 'No.', a2: 'A camera inspection shows the problem first. We only dig if the repair needs it.' },
      { tag: 'Pricing', q: 'How much does sewer line repair cost?', a1: 'It depends on what is wrong and where.', a2: 'We give you the price before any work starts.' },
    ] },
    related: { eyebrow: 'Related services', l1: 'Drains and', l2: 'the line beneath them', cards: [
      { t: 'Drain camera inspection', href: '/drain-camera', icon: 'camera' }, { t: 'Drain cleaning', href: '/drain-cleaning', icon: 'waves' },
      { t: 'Clogged drain', href: '/clogged-drain', icon: 'alert' }, { t: 'Emergency plumbing', href: '/emergency-plumbing', icon: 'siren' },
    ], line: 'Sewer service in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: 'Trouble with the sewer line?', l2: "Let's find out why." },
  },

  /* ---------- Repiping (template A) ---------- */
  repiping: {
    path: '/repiping', name: 'Repiping and plumbing design', title: 'Repiping in St. Petersburg FL · Plumbing By Paul',
    meta: 'Low pressure, frequent leaks or rusty water in St. Petersburg? Plumbing By Paul inspects, quotes and repipes homes and businesses. Free estimates.',
    og: 'service-tech-ladder-under-raised-house', ogAlt: 'A Plumbing By Paul technician on a ladder running pipe under a raised house', layout: 'a', crumb: 'Repiping',
    hero: {
      eyebrow: 'Repiping · St. Petersburg, FL', h1a: 'Repiping and new plumbing', h1b: 'in St. Pete',
      lead: 'When the pipes themselves are the problem, patching them again only buys time. We inspect the system, quote it clearly and repipe it properly.',
      rows: ['Water pressure that keeps dropping', 'Leak after leak', 'Rusty or odd-tasting water'],
      photos: [
        { name: 'service-tech-logo-shirt-framing', alt: 'A Plumbing By Paul technician drilling through wall framing on a new build', focus: '50% 40%' },
        { name: 'service-tech-ladder-under-raised-house', alt: 'A technician on a ladder running pipe under a raised house', focus: '55% 50%' },
        { name: 'service-tech-threading-pipe-truck', alt: 'A technician threading pipe on a tripod vise beside the truck', focus: '50% 40%' },
      ],
      tag: 'New pipe going in', caption: 'Threading pipe at the truck.',
    },
    answer: {
      text: `Plumbing By Paul repipes homes and businesses in St. Petersburg and across Pinellas County, and designs plumbing for new builds and remodels. **We inspect first, then give you a clear quote and timeline before any work begins.** Call ${P}.`,
      ticket: 'Job ticket: repiping',
      rows: [
        { k: 'Signs it is time', v: 'Falling water pressure, frequent leaks, changes in water colour or taste, an older system that keeps needing repairs.' },
        { k: 'Before we start', v: 'An inspection, then a quote and project timeline.' },
        { k: 'Properties', v: 'Homes and businesses, existing and new construction.' },
        { k: 'Design', v: 'Plumbing systems designed around the building, its use and your budget.' }, EST, WAR, LIC,
      ],
    },
    signs: { eyebrow: 'Four signs', l1: 'Your pipes are', l2: 'running out of road', items: [
      { t: 'Pressure keeps dropping.', d: 'If pressure varies or has slowly fallen, the pipes may be corroded or narrowing inside.', icon: 'droplets' },
      { t: 'Leaks keep happening.', d: 'One leak is a repair. Leak after leak usually means the pipe itself is wearing out.', icon: 'alert' },
      { t: 'The water looks or tastes off.', d: 'Rusty, discoloured or metallic-tasting water can come from old pipe.', icon: 'drop' },
      { t: 'The system is old.', d: 'An older plumbing system that keeps needing repairs is often cheaper to replace than to keep fixing.', icon: 'calendar' },
    ] },
    compare: { eyebrow: 'The honest answer', l1: 'Repair a section', l2: 'or repipe the house?',
      left: { t: 'Usually a repair', icon: 'wrench', items: ['One leak in one place', 'The rest of the pipe looks sound', 'Pressure is fine everywhere else', 'The system is not that old'] },
      right: { t: 'Usually time to repipe', icon: 'ruler', items: ['Leaks keep turning up in new places', 'Pressure is poor across the house', 'Rusty or discoloured water', 'Repairs are adding up'] } },
    steps: { eyebrow: 'Our repiping process', l1: 'Simple, clear', l2: 'and professional', items: [
      { t: 'Inspect.', d: 'We look at the current system for pressure, leak, corrosion and performance problems.', icon: 'search' },
      { t: 'Recommend.', d: 'We explain what needs repairing or replacing and the best option for the property.', icon: 'help' },
      { t: 'Quote.', d: 'You get a clear quote and a realistic timeline before any work begins.', icon: 'clipboard' },
      { t: 'Complete.', d: 'Our team does the work with care and cleans up as we go.', icon: 'check' },
    ], photo: { name: 'crew-three-techs-at-van', alt: 'Three Plumbing By Paul technicians at the open side door of a work van', focus: '50% 40%' }, caption: 'Three of the crew, loading up.' },
    price: { l1: 'A repipe is priced by the size of the house and the pipe run.', l2: "You'll have the quote before we start.",
      p: 'Every house is different: how many bathrooms, how the pipe runs, what has to be opened up and closed again. We inspect first and give you one clear quote and a timeline.', rows: ['Section repair', 'Whole-house repipe', 'New construction'] },
    reviews: { eyebrow: 'Repipe reviews', l1: 'New pipes,', l2: 'no drama', list: [REVIEWS.sheila, R.jamesFull, R.melissa] },
    faq: { eyebrow: 'Repiping questions', l1: 'Before you', l2: 'replace the pipes', items: [
      { q: 'How do I know if my pipes need replacing?', a1: 'Common signs are falling water pressure, frequent leaks, changes in water colour or taste, and an older system that keeps needing repairs.', a2: 'We inspect it and tell you plainly whether a repair or a repipe makes sense.' },
      { q: 'Do you repipe both homes and businesses?', a1: 'Yes.', a2: 'We repipe and design plumbing for residential and commercial properties.', link: { text: 'Commercial plumbing', href: '/commercial-plumbing' } },
      { q: 'Will I get a quote before the work starts?', a1: 'Yes.', a2: 'After the inspection you get a quote and a timeline, so you know what to expect before the project begins.' },
      { q: 'Can you design plumbing for a new property?', a1: 'Yes.', a2: 'We design plumbing systems around the building, how it will be used and your budget.' },
      { noSchema: true, q: 'Is repiping covered by a warranty?', a1: 'Our work comes with a 1-year workmanship warranty.', a2: 'If something we did is not right, call the office and we come back.' },
    ] },
    related: { eyebrow: 'Often part of the same job', l1: 'Pipes, pressure', l2: 'and leaks', cards: [
      { t: 'Leak detection', href: '/leak-detection', icon: 'droplets' }, { t: 'Water softeners and filtration', href: '/water-softeners', icon: 'drop' },
      { t: 'Gas lines', href: '/gas-lines', icon: 'zap' }, { t: 'Water heaters', href: '/water-heaters', icon: 'heater' },
    ], line: 'Repiping in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: 'Tired of patching old pipes?', l2: "Let's look at the whole system." },
  },

  /* ---------- Toilet repair (template B) ---------- */
  'toilet-repair': {
    path: '/toilet-repair', name: 'Toilet repair and replacement', title: 'Toilet Repair St. Petersburg FL · Plumbing By Paul',
    meta: 'Running, leaking or clogged toilet in St. Petersburg? Plumbing By Paul repairs and replaces toilets and checks for bigger problems. Free estimates.',
    og: 'hero-05-tech-toilet-repair-pro', ogAlt: 'A Plumbing By Paul technician repairing a toilet', layout: 'b', crumb: 'Toilet repair',
    hero: {
      eyebrow: 'Toilet repair · St. Petersburg, FL', h1a: 'Toilet repair', h1b: 'in St. Petersburg',
      lead: 'Running, rocking, leaking or clogging. Most toilet problems are a quick repair, and when one has earned retirement, we fit the new one and haul the old one away.',
      chips: [{ icon: 'badge', label: `Lic. ${SITE.licence}` }, { icon: 'toilet', label: 'Repairs and new toilets' }, { icon: 'clipboard', label: 'Free estimates' }],
      photos: [{ name: 'hero-05-tech-toilet-repair-pro', alt: 'A Plumbing By Paul technician kneeling beside a toilet, working on the supply line', focus: '65% 45%' }],
      tag: 'On the job', mini: { quote: 'Wow! JR did a fantastic job switching out my ancient toilet.', name: 'Ava Andiego', patches: ['JR'] },
    },
    answer: {
      text: `Plumbing By Paul repairs and replaces toilets in St. Petersburg and across Pinellas County: clogs, leaks, running tanks, rocking bowls and overflows. **Many leaking tank problems are fixed in one visit**, and when a clog keeps coming back we check the line behind it. Call ${P}.`,
      ticket: 'Job ticket: toilet repair',
      rows: [
        { k: 'What we fix', v: 'Clogs, leaking tanks and bases, running toilets, rocking bowls, overflows.' },
        { k: 'Replacements', v: 'New toilets fitted, old one hauled away.' },
        { k: 'Bigger problems', v: 'Clogs that keep returning can point to the main line. We check.' },
        EST, WAR, LIC,
      ],
    },
    tabs: { eyebrow: 'What is your toilet doing?', l1: 'Pick the one', l2: 'that sounds like yours', foot: 'Call about your toilet', caption: 'Yes, that is a toilet tank. He is still smiling.',
      photo: { name: 'service-tech-under-sink-smiling', alt: 'A smiling technician working beside a toilet tank in a pink-tiled bathroom', focus: '50% 40%' }, items: [
      { label: 'Clogged', icon: 'waves', text: 'A clog that will not clear makes the toilet unusable and can overflow. We clear the blockage and check whether something deeper is causing it.' },
      { label: 'Running', icon: 'droplets', text: 'A toilet that runs nonstop wastes water and raises the bill. It is usually a worn part inside the tank, and usually a quick fix.' },
      { label: 'Leaking', icon: 'drop', text: 'Water around the base or under the tank damages floors fast. We find whether it is the seal, a connection or the tank and repair it.' },
      { label: 'Rocking', icon: 'alert', text: 'A loose toilet breaks its seal over time and starts to leak underneath. We reset and secure it.' },
      { label: 'Overflowing', icon: 'siren', text: 'Turn the valve behind the toilet clockwise to stop the water, then call. We clear it and find out why it happened.' },
      { label: 'Time for a new one', icon: 'toilet', text: 'Cracked, ancient or constantly needing repairs. We help you pick a replacement, fit it and take the old one away.' },
    ] },
    versus: { eyebrow: 'Be honest with yourself', l1: 'Plunger', l2: 'or plumber?', call: "It's a plumber one", caption: 'Two of the crew, working in a bathroom.',
      photo: { name: 'service-two-techs-vanity-install', alt: 'Two Plumbing By Paul technicians working together under a bathroom vanity', focus: '50% 50%' },
      left: { t: 'Try it yourself', items: ['It clogged once and the plunger cleared it', 'The handle needs a jiggle', 'The rest of the house drains fine', 'No water on the floor'] },
      right: { t: 'Call the plumber', items: ['It clogs again and again', 'It runs nonstop', 'Water around the base', 'It rocks when you sit', 'Other drains gurgle when you flush'] } },
    steps: { eyebrow: 'Our repair process', l1: 'Repair first,', l2: 'prevent the next one', items: [
      { t: 'Assess.', d: 'We find out whether the problem is the toilet itself or part of something bigger.', icon: 'search' },
      { t: 'Repair.', d: 'We fix the clog, the leak or the running tank, with the price agreed first.', icon: 'wrench' },
      { t: 'Inspect.', d: 'When a clog keeps returning, a camera checks the pipe further down.', icon: 'camera' },
      { t: 'Prevent.', d: 'We tell you what caused it and how to keep it from happening again.', icon: 'shield' },
    ] },
    feature: { eyebrow: 'When it keeps clogging', l1: 'Sometimes it is', l2: 'not the toilet.',
      p: 'A toilet that clogs every week can be telling you about the line behind it. A camera inspection shows whether the trouble is in the toilet, the branch line or the main sewer line, so you fix the right thing.',
      links: [{ t: 'Drain camera inspection', href: '/drain-camera' }, { t: 'Sewer service', href: '/sewer-service' }],
      placeholder: 'Photo from Paul: a toilet replacement, before and after', tag: 'At the cleanout',
      photo: { name: 'service-tech-at-cleanout', alt: 'A technician feeding a line into an open yard cleanout', focus: '50% 30%' }, review: { r: R.brooks, patch: 'JR' } },
    reviews: { eyebrow: 'Toilet reviews', l1: 'Fixed, fitted,', l2: 'cleaned up', list: [REVIEWS.ava, R.bob, R.herzog] },
    price: { l1: 'A repair costs less than a new toilet, and we always try it first.', l2: "You'll know the number before we start.", rows: ['Running or leaking repair', 'Clog clearing', 'New toilet fitted'] },
    tips: { eyebrow: 'Free advice', l1: 'Keep it', l2: 'flushing', caption: 'The blue roll we leave as a thank-you.',
      photo: { name: 'brand-gift-roll-closeup', alt: 'A roll of Plumbing By Paul branded blue toilet paper', focus: '50% 50%' }, items: [
      { b: 'Only flush toilet paper.', t: 'Wipes belong in the trash, even the flushable ones.' },
      { b: 'Know the shut-off.', t: 'The small valve behind the toilet stops the water. Clockwise to close.' },
      { b: 'Listen for it running.', t: 'A toilet that refills on its own is leaking inside the tank.' },
      { b: 'Check the base.', t: 'A wobble or a damp floor is a seal that needs attention.' },
    ], warn: { b: 'Water rising?', t: 'Close the valve behind the toilet, then call.' } },
    faq: { eyebrow: 'Toilet questions', l1: 'Quick answers', l2: 'about toilets', items: [
      { tag: 'When', q: 'When should I call a plumber for a toilet problem?', a1: 'When it will not stop running, keeps clogging, leaks, overflows or cannot be fixed with a plunger.', a2: 'Calling early protects the floor around it.' },
      { tag: 'Bigger issue', q: 'Can a toilet problem mean a bigger plumbing issue?', a1: 'Yes.', a2: 'Clogs that keep coming back can be connected to the drain line or the main sewer line. We check when the pattern points that way.' },
      { tag: 'Leaks', q: 'Do you fix leaking toilet tanks?', a1: 'Yes.', a2: 'We find the faulty connection, seal or part and repair it. Many tank leaks are fixed in one visit.' },
      { tag: 'Emergency', q: 'My toilet is overflowing. What do I do?', a1: 'Turn the valve behind the toilet clockwise to stop the water.', a2: `Then call ${P}. Do not flush again until it is cleared.` },
      { tag: 'Replacement', q: 'Do you install new toilets?', a1: 'Yes.', a2: 'We help you choose, fit the new toilet and haul the old one away.' },
      { tag: 'Pricing', q: 'How much does toilet repair cost?', a1: 'It depends on what is wrong.', a2: 'Estimates are free, and you hear the price before any work starts.' },
    ] },
    related: { eyebrow: 'While we are in the bathroom', l1: 'Often booked', l2: 'with a toilet', cards: [
      { t: 'Clogged drain', href: '/clogged-drain', icon: 'alert' }, { t: 'Leak detection', href: '/leak-detection', icon: 'droplets' },
      { t: 'General plumbing', href: '/plumbing', icon: 'wrench' }, { t: 'Sewer service', href: '/sewer-service', icon: 'pipe' },
    ], line: 'Toilet repair in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: 'Toilet acting up?', l2: "We'll sort it out." },
  },

  /* ---------- Garbage disposal (template A) ---------- */
  'garbage-disposal': {
    path: '/garbage-disposal', name: 'Garbage disposal repair and installation', title: 'Garbage Disposal Repair St. Petersburg FL · Plumbing By Paul',
    meta: 'Jammed, leaking or humming garbage disposal in St. Petersburg? Plumbing By Paul repairs, replaces and installs disposals. Free estimates, licensed.',
    og: 'service-tech-kitchen-sink-smiling', ogAlt: 'A Plumbing By Paul technician working under a kitchen sink', layout: 'a', crumb: 'Garbage disposal',
    hero: {
      eyebrow: 'Garbage disposal · St. Petersburg, FL', h1a: 'Garbage disposal repair', h1b: 'and installation',
      lead: 'Humming, jammed, leaking or just old. We repair the disposal you have when it is worth it, and fit a new one when it is not.',
      rows: ['It hums but will not spin', 'Water under the sink', 'It clogs the kitchen drain'],
      photos: [
        { name: 'service-tech-kitchen-sink-smiling', alt: 'A Plumbing By Paul technician smiling while working under a kitchen sink', focus: '60% 50%' },
        { name: 'service-two-techs-vanity-install', alt: 'Two technicians working together under a sink cabinet', focus: '50% 50%' },
        { name: 'hero-04-crew-new-jerseys-box-truck', alt: 'The Plumbing By Paul crew in blue jerseys in front of the box truck', focus: '50% 45%' },
      ],
      tag: 'Under the sink', caption: 'The crew, in the new jerseys.',
    },
    answer: {
      text: `Plumbing By Paul repairs, replaces and installs garbage disposals in St. Petersburg and across Pinellas County. **We check whether a repair makes sense before we sell you a new unit**, then fit it safely and test it with the drain. Call ${P}.`,
      ticket: 'Job ticket: garbage disposal',
      rows: [
        { k: 'What we do', v: 'Installation, repair, maintenance and troubleshooting.' },
        { k: 'Common problems', v: 'Jams, leaks, strange noises, clogs, a unit that will not turn on.' },
        { k: 'Typical lifespan', v: 'Around 5 to 10 years with care, per Paul.', standIn: true },
        { k: 'Advice', v: 'Which unit suits your kitchen and budget.' }, EST, WAR, LIC,
      ],
    },
    signs: { eyebrow: 'Four signs', l1: 'Your disposal', l2: 'needs a look', items: [
      { t: 'It hums but will not spin.', d: 'Something is jammed or the motor is struggling. Switch it off before you reach for anything.', icon: 'zap' },
      { t: 'Water under the sink.', d: 'A leak from the unit or its connections soaks the cabinet floor fast.', icon: 'droplets' },
      { t: 'Strange grinding or rattling.', d: 'Something hard is inside, or parts are wearing out.', icon: 'alert' },
      { t: 'The sink drains slowly.', d: 'Food waste is building up in the unit or the drain after it.', icon: 'waves' },
    ] },
    compare: { eyebrow: 'The honest answer', l1: 'Repair it or replace it?', l2: 'We check first.',
      left: { t: 'Usually a repair', icon: 'wrench', items: ['A jam or a clog', 'A loose connection leaking', 'A fairly new unit', 'It still turns on'] },
      right: { t: 'Usually time to replace', icon: 'filter', items: ['The unit itself is leaking', 'It is near the end of its life', 'The motor is burned out', 'Repairs keep coming back'] } },
    steps: { eyebrow: 'Our service process', l1: 'Install, repair', l2: 'and maintain', items: [
      { t: 'Assess.', d: 'We check the sink setup or the unit you have and find out what is needed.', icon: 'search' },
      { t: 'Recommend.', d: 'We advise on the best repair or unit for your kitchen and budget, with the price first.', icon: 'clipboard' },
      { t: 'Service.', d: 'We install, repair or maintain the disposal safely.', icon: 'wrench' },
      { t: 'Protect.', d: 'We test it with the drain and tell you how to keep it running.', icon: 'shield' },
    ], photo: { name: 'crew-three-techs-at-van', alt: 'Three Plumbing By Paul technicians at the open side door of a work van', focus: '50% 40%' }, caption: 'Three of the crew, loading up.' },
    price: { l1: 'The price depends on the repair or the unit you choose.', l2: "You'll know it before we start.",
      p: 'A jam is a small job; a new unit depends on the size and model that suits your kitchen. We look first and give you one clear price.', rows: ['Repair', 'Replacement unit fitted', 'New installation'] },
    reviews: { eyebrow: 'Disposal reviews', l1: 'Back to', l2: 'grinding', list: [R.cher, REVIEWS.phil, REVIEWS.dean], chip: { n: '15', text: 'garbage disposal replacement' } },
    faq: { eyebrow: 'Garbage disposal questions', l1: 'Asked at', l2: 'the kitchen sink', items: [
      { q: 'Can you install a new garbage disposal?', a1: 'Yes.', a2: 'We install disposals and advise you on the best unit for your kitchen.' },
      { q: 'Can you repair a clogged or leaking disposal?', a1: 'Yes.', a2: 'We repair clogged, leaking, noisy and malfunctioning units, and tell you honestly when a new one makes more sense.' },
      { q: 'Should I try to fix it myself?', a1: 'It is safer to call a professional.', a2: 'A disposal can be dangerous to open or handle. Never put your hand inside it, even when it is switched off.' },
      { q: 'How long does a garbage disposal last?', a1: 'Around 5 to 10 years with proper care and repair.', a2: 'How you use it makes a big difference.' },
      { q: 'What should not go down a disposal?', a1: 'Grease, fibrous peels, bones and anything that is not food.', a2: 'Run cold water while it grinds and for a few seconds after.' },
    ] },
    related: { eyebrow: 'Kitchen work', l1: 'Often booked', l2: 'with a disposal', cards: [
      { t: 'Clogged drain', href: '/clogged-drain', icon: 'alert' }, { t: 'Drain cleaning', href: '/drain-cleaning', icon: 'waves' },
      { t: 'General plumbing', href: '/plumbing', icon: 'wrench' }, { t: 'Water softeners and filtration', href: '/water-softeners', icon: 'drop' },
    ], line: 'Garbage disposal service in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: 'Disposal humming?', l2: 'Switch it off and call.' },
  },

  /* ---------- General plumbing (template A) ---------- */
  plumbing: {
    path: '/plumbing', name: 'General plumbing repairs and installations', title: 'Plumber for Repairs St. Petersburg FL · Plumbing By Paul',
    meta: 'Faucets, valves, low pressure and everyday repairs in St. Petersburg. Plumbing By Paul handles small jobs and big ones, price first. Free estimates.',
    og: 'service-tech-logo-shirt-back-tile', ogAlt: 'A Plumbing By Paul technician working at a tiled shower wall', layout: 'a', crumb: 'General plumbing',
    hero: {
      eyebrow: 'General plumbing · St. Petersburg, FL', h1a: 'Everyday plumbing repairs', h1b: 'in St. Pete',
      lead: 'The drip that keeps you up, the valve that will not close, the shower that will not get hot. Small jobs get the same crew and the same care as big ones.',
      rows: ['Faucets, valves and fixtures', 'Low water pressure', 'New installations'],
      photos: [
        { name: 'service-tech-logo-shirt-back-tile', alt: 'A technician in a Plumbing By Paul shirt working at a tiled shower wall', focus: '50% 40%' },
        { name: 'service-tech-under-bath-vanity', alt: 'A technician lying on a bathroom floor working under a vanity', focus: '50% 55%' },
        { name: 'hero-02-crew-16-two-trucks', alt: 'Sixteen of the Plumbing By Paul crew in front of two wrapped trucks', focus: '50% 45%' },
      ],
      tag: 'Shower valve', caption: 'The crew, with two of the trucks.',
    },
    answer: {
      text: `Plumbing By Paul handles everyday plumbing in St. Petersburg and across Pinellas County: faucets, valves, fixtures, pressure problems and new installations. **You hear the price before any work starts**, and we arrive in uniform and clean up before we leave. Call ${P}.`,
      ticket: 'Job ticket: general plumbing',
      rows: [
        { k: 'Small jobs', v: 'Faucets, shut-off valves, hose bibs, shower valves, supply lines.' },
        { k: 'Bigger jobs', v: 'New fixtures, toilets, water heaters, repiping.' },
        { k: 'Pressure problems', v: 'One weak tap or the whole house: we find the cause.' },
        { k: 'Homes and businesses', v: 'Both.' }, EST, WAR, LIC,
      ],
    },
    signs: { eyebrow: 'Small now, big later', l1: 'Four things', l2: 'worth fixing this week', items: [
      { t: 'A dripping faucet.', d: 'It wastes water every hour and usually needs a cartridge or a washer.', icon: 'drop' },
      { t: 'A valve that will not close.', d: 'You need your shut-off valves working before the day you need them.', icon: 'wrench' },
      { t: 'Weak pressure.', d: 'Often a clogged aerator, sometimes scale or a problem in the line.', icon: 'droplets' },
      { t: 'A shower that runs cold.', d: 'A worn mixing valve or cartridge, or the water heater itself.', icon: 'shower' },
    ] },
    compare: { eyebrow: 'What we handle', l1: 'Repairs and', l2: 'installations', left: { t: 'Repairs', icon: 'wrench', items: ['Leaking faucets and fixtures', 'Shower valves and cartridges', 'Shut-off and stop valves', 'Low water pressure'] },
      right: { t: 'Installations', icon: 'check', items: ['New faucets and sinks', 'Toilets and tubs', 'Water heaters', 'Washer and appliance hookups'] } },
    steps: { eyebrow: 'How we help', l1: 'Listen, inspect,', l2: 'repair, support', items: [
      { t: 'Listen.', d: 'Tell us what is happening. A real person at the shop picks up.', icon: 'phone' },
      { t: 'Inspect.', d: 'We check the system and find the cause, then give you the price.', icon: 'search' },
      { t: 'Repair.', d: 'We do the work properly and clean up behind ourselves.', icon: 'wrench' },
      { t: 'Support.', d: 'Honest advice on what to keep an eye on, and a 1-year workmanship warranty.', icon: 'shield' },
    ], photo: { name: 'fleet-van-street-4284px', alt: 'The wrapped Plumbing By Paul van parked on a residential street', focus: '50% 55%' }, caption: 'On its way to the next job.' },
    price: { l1: 'Every job is priced on its own.', l2: "You'll know the number before we start.",
      p: 'A faucet cartridge and a new shower valve are very different jobs. We look, explain what is wrong in plain words and give you one clear price.', rows: ['Faucet repair', 'Valve replacement', 'Fixture installation'] },
    reviews: { eyebrow: 'Repair reviews', l1: 'Small jobs,', l2: 'big thanks', list: [REVIEWS.dean, R.jamie, REVIEWS.kelly], chip: { n: '18', text: 'faucet replacement' } },
    faq: { eyebrow: 'Plumbing questions', l1: 'The everyday', l2: 'questions', items: [
      { q: 'Do you handle small plumbing jobs?', a1: 'Yes.', a2: 'Faucets, valves, supply lines and fixtures get the same care as a repipe. No job is too small to call about.' },
      { q: 'Why is the pressure low at one faucet?', a1: 'Often the aerator at the tip of the faucet is clogged with mineral deposits.', a2: 'Unscrew it, rinse it and refit it. If that does not help, there may be a problem in the line, and we can find it.' },
      { q: 'Are you licensed?', a1: `Yes. Plumbing By Paul LLC is a Florida certified plumbing contractor, licence ${SITE.licence}.`, a2: 'You can check it yourself at myfloridalicense.com.' },
      { q: 'Can you install fixtures I bought myself?', a1: 'Usually, yes.', a2: 'Tell us the make and model when you call so we bring the right parts.' },
      { q: 'Do you work on businesses too?', a1: 'Yes.', a2: 'Offices, shops and rentals get the same crew.', link: { text: 'Commercial plumbing', href: '/commercial-plumbing' } },
    ] },
    related: { eyebrow: 'More we do', l1: 'The rest of', l2: 'the house', cards: [
      { t: 'Toilet repair', href: '/toilet-repair', icon: 'toilet' }, { t: 'Leak detection', href: '/leak-detection', icon: 'droplets' },
      { t: 'Water heaters', href: '/water-heaters', icon: 'heater' }, { t: 'Garbage disposal', href: '/garbage-disposal', icon: 'filter' },
    ], line: 'Plumbing repairs in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: 'Something dripping?', l2: "Let's fix it this week." },
  },

  /* ---------- Leak detection (template B) ---------- */
  'leak-detection': {
    path: '/leak-detection', name: 'Leak detection and repair', title: 'Leak Detection & Repair St. Petersburg FL · Plumbing By Paul',
    meta: 'Hidden leak, high water bill or a wet ceiling in St. Petersburg? Plumbing By Paul finds the leak before opening a wall, then repairs it. Free estimates.',
    og: 'service-tech-under-bath-vanity', ogAlt: 'A Plumbing By Paul technician finding a leak under a bathroom vanity', layout: 'b', crumb: 'Leak detection',
    hero: {
      eyebrow: 'Leak detection · St. Petersburg, FL', h1a: 'Leak detection', h1b: 'and repair',
      lead: 'A stain on the ceiling, a wet cabinet, a meter that spins when everything is off. We find the leak before we open a wall, then fix it once.',
      chips: [{ icon: 'badge', label: `Lic. ${SITE.licence}` }, { icon: 'search', label: 'Found before we open up' }, { icon: 'clipboard', label: 'Price before we start' }],
      photos: [{ name: 'service-tech-under-bath-vanity', alt: 'A technician lying on a bathroom floor, working on the pipes under a vanity', focus: '50% 55%' }],
      tag: 'Under the vanity', mini: { quote: 'Thank you both for fixing my leak so quickly and thoroughly.', name: 'Michele Mary', patches: ['Marcus', 'Troy'] },
    },
    answer: {
      text: `Plumbing By Paul finds and repairs leaks in St. Petersburg and across Pinellas County: pipes, fixtures, water heaters and the water line at the meter. **We find the leak before we open a wall**, then make the repair in the right place, with the price first. Call ${P}.`,
      ticket: 'Job ticket: leak detection',
      rows: [
        { k: 'Signs of a leak', v: 'A jump in the water bill, a meter that moves with everything off, stains, damp, a musty smell.' },
        { k: 'Where we find them', v: 'Supply pipes, fixtures, water heaters, the line at the meter box.' },
        { k: 'Burst pipe', v: 'Shut the water off at the main valve near the meter, then call.' },
        EST, WAR, LIC,
      ],
    },
    tabs: { eyebrow: 'What are you noticing?', l1: 'Leaks show up', l2: 'in different ways', foot: 'Call about a leak', caption: 'Working at a tiled wall.',
      photo: { name: 'service-tech-logo-shirt-back-tile', alt: 'A technician in a Plumbing By Paul shirt working at a tiled wall', focus: '50% 40%' }, items: [
      { label: 'High water bill', icon: 'clipboard', text: 'A bill that jumps when nothing about how you use water changed often means a hidden leak somewhere in the system.' },
      { label: 'Stain or damp', icon: 'droplets', text: 'A ceiling stain, bubbling paint or a wet cabinet means water is getting where it should not. The source is not always right above the stain.' },
      { label: 'Meter moving', icon: 'search', text: 'If the meter moves while every tap and appliance is off, water is going somewhere. That is a leak until proven otherwise.' },
      { label: 'Burst pipe', icon: 'alert', text: 'Water coming through fast needs action now. Shut off the main valve outside near the meter and call.', href: '/emergency-plumbing', hrefText: 'See emergency plumbing' },
      { label: 'Low pressure', icon: 'waves', text: 'Pressure that drops for no reason can be a leak along the line, scale inside the pipe or a partly closed valve. We find which.' },
    ] },
    versus: { eyebrow: 'How urgent is it?', l1: 'Book it', l2: 'or call now?', call: 'It needs someone now', caption: 'Smiling under a sink, as usual.',
      photo: { name: 'service-tech-under-sink-smiling', alt: 'A smiling technician working under a bathroom sink', focus: '50% 40%' },
      left: { t: 'Book a visit', items: ['A slow drip under a sink', 'A water bill that crept up', 'A small old stain that is not growing', 'Pressure a little lower than it was'] },
      right: { t: 'Call now', items: ['Water coming through a ceiling or wall', 'A pipe that has burst', 'Water near outlets or the panel', 'The meter spinning fast', 'Water pooling on the floor'] } },
    steps: { eyebrow: 'How we handle a leak', l1: 'Stop it, find it,', l2: 'fix it, check it', items: [
      { t: 'Stop the damage.', d: 'For a burst pipe, we talk you through shutting off the water while we are on the way.', icon: 'phone' },
      { t: 'Find the leak.', d: 'We trace where the water is really coming from before we open anything up.', icon: 'search' },
      { t: 'Repair.', d: 'We fix the leak or replace the damaged section, with the price agreed first.', icon: 'wrench' },
      { t: 'Check.', d: 'We run the water and check the repair and the pressure before we leave.', icon: 'check' },
    ] },
    feature: { eyebrow: 'Check it yourself first', l1: 'The meter', l2: 'never lies.',
      p: 'Turn off every tap and every appliance that uses water. Read the meter, wait an hour without using any water, then read it again. If the number moved, water is leaking somewhere, and it is time to call us.',
      links: [{ t: 'Repiping', href: '/repiping' }, { t: 'Emergency plumbing', href: '/emergency-plumbing' }],
      tag: 'Digging to the line', photo: { name: 'service-tech-digging-with-van', alt: 'A technician digging in a front yard with the van behind him', focus: '50% 30%' }, review: { r: R.luke, patch: 'Phil' } },
    reviews: { eyebrow: 'Leak reviews', l1: 'Found fast,', l2: 'fixed right', list: [R.jamesFull, REVIEWS.michele, REVIEWS.sheila] },
    price: { l1: 'A leak is priced by where it is and what it takes to reach it.', l2: "You'll know the number before we start.", rows: ['Leak found and repaired', 'Pipe section replaced', 'Meter box leak'] },
    tips: { eyebrow: 'Free advice', l1: 'Catch it', l2: 'early', caption: 'The whole crew, two trucks.',
      photo: { name: 'hero-02-crew-16-two-trucks', alt: 'Sixteen of the Plumbing By Paul crew in front of two wrapped trucks', focus: '50% 45%' }, items: [
      { b: 'Know your main valve.', t: "It's outside, near the water meter. Clockwise closes it." },
      { b: 'Read your bill.', t: 'A sudden jump with no change at home is a leak until proven otherwise.' },
      { b: 'Look under sinks.', t: 'Open the cabinets now and then. A damp base is an early warning.' },
      { b: 'Watch the water heater.', t: 'A puddle at the base means the tank or a fitting is leaking.' },
    ], warn: { b: 'Water near electrics?', t: 'Keep away, shut off the main valve if you safely can, and call.' } },
    faq: { eyebrow: 'Leak questions', l1: 'Straight answers', l2: 'about leaks', items: [
      { tag: 'Signs', q: 'How do I know if I have a hidden leak?', a1: 'A higher water bill, a meter that moves when nothing is running, damp or stained walls and ceilings, a musty smell or the sound of running water.', a2: 'If you notice any of them, call us for a look.' },
      { tag: 'Emergency', q: 'What should I do if a pipe bursts?', a1: 'Shut off the main water valve outside, near the water meter, by turning it clockwise.', a2: `Keep away from water near outlets or the electrical panel, then call ${P}.`, link: { text: 'Emergency plumbing', href: '/emergency-plumbing' } },
      { tag: 'Method', q: 'Do you have to open the wall to find a leak?', a1: 'Not to find it.', a2: 'We trace where the water is coming from first, so if anything has to be opened, it is only where the repair is.' },
      { tag: 'Meter', q: 'Can you fix a leak at the water meter?', a1: 'Yes.', a2: 'Leaks at the meter box and on the line into the house are jobs we do.' },
      { tag: 'Pressure', q: 'Why is my water pressure low?', a1: 'It can be a clogged aerator, scale inside the pipes, a partly closed valve or a leak along the line.', a2: 'We test and find which one it is.' },
      { tag: 'Pricing', q: 'How much does leak repair cost?', a1: 'It depends on where the leak is and what it takes to reach it.', a2: 'Estimates are free, and you hear the price before any work starts.' },
    ] },
    related: { eyebrow: 'Related services', l1: 'Pipes', l2: 'and pressure', cards: [
      { t: 'Repiping', href: '/repiping', icon: 'ruler' }, { t: 'Water heaters', href: '/water-heaters', icon: 'heater' },
      { t: 'Emergency plumbing', href: '/emergency-plumbing', icon: 'siren' }, { t: 'General plumbing', href: '/plumbing', icon: 'wrench' },
    ], line: 'Leak detection in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: "Water where it shouldn't be?", l2: "We'll find it." },
  },

  /* ---------- Gas lines (template A, no reviews section: none of the quoted reviews is about gas work) ---------- */
  'gas-lines': {
    path: '/gas-lines', name: 'Gas line installation and repair', title: 'Gas Line Installation & Repair St. Pete · Plumbing By Paul',
    meta: 'New gas line, appliance hookup or a leak check in St. Petersburg? Plumbing By Paul installs and repairs gas lines and tests each connection.',
    og: 'service-tech-threading-pipe-truck', ogAlt: 'A Plumbing By Paul technician threading pipe at the truck', layout: 'a', crumb: 'Gas lines',
    hero: {
      eyebrow: 'Gas lines · St. Petersburg, FL', h1a: 'Gas lines and', h1b: 'appliance hookups',
      lead: 'New lines, appliance hookups and leak checks for homes and businesses. Done carefully, and every connection tested before we leave.',
      rows: ['A new gas range, dryer or water heater', 'A new line for a remodel', 'A line you want checked'],
      photos: [
        { name: 'service-tech-threading-pipe-truck', alt: 'A technician threading pipe on a tripod vise beside the truck', focus: '50% 40%' },
        { name: 'service-tech-logo-shirt-framing', alt: 'A technician drilling through wall framing on a new build', focus: '50% 35%' },
        { name: 'fleet-van-at-coastal-stilt-house', alt: 'The Plumbing By Paul van parked at a raised coastal house job', focus: '50% 55%' },
      ],
      tag: 'Threading pipe', caption: 'At a raised coastal house.',
    },
    answer: {
      text: `Plumbing By Paul installs and repairs gas lines in St. Petersburg and across Pinellas County: new lines, appliance hookups and leak checks for homes and businesses. **Every connection is tested for leaks before we leave.** If you smell gas right now, get everyone outside first and call your gas company or 911 from there. Call ${P}.`,
      ticket: 'Job ticket: gas lines',
      rows: [
        { k: 'What we do', v: 'New gas lines, appliance hookups, leak checks and repairs.' },
        { k: 'Appliances', v: 'Ranges, dryers, water heaters and other gas appliances.' },
        { k: 'Testing', v: 'Every connection checked for leaks before we leave.' },
        { k: 'Homes and businesses', v: 'Both.' }, EST, LIC,
      ],
    },
    signs: { eyebrow: 'Four reasons people call', l1: 'What brings us', l2: 'to a gas line', items: [
      { t: 'A new gas appliance.', d: 'A range, dryer or water heater needs a correct, tight connection.', icon: 'flame' },
      { t: 'A remodel.', d: 'New kitchens and additions often need the line moved or a new one run.', icon: 'ruler' },
      { t: 'A smell of gas.', d: 'Get everyone out first. Once it is safe, we find and repair the leak.', icon: 'alert' },
      { t: 'Old or rusty piping.', d: 'A line you are not sure about, or a house you just bought.', icon: 'search' },
    ] },
    compare: { eyebrow: 'Safety first', l1: 'What to do', l2: 'if you smell gas', left: { t: 'Do this', icon: 'check', items: ['Get everyone out of the building', 'Leave the door open behind you', 'Call the gas company or 911 from outside', 'Call us once it is safe'] },
      right: { t: 'Never do this', icon: 'x', items: ['Switch lights or appliances on or off', 'Use a lighter or a match', 'Look for the leak yourself', 'Go back inside before it is cleared'] } },
    steps: { eyebrow: 'How we do gas work', l1: 'Assess, make safe,', l2: 'install, test', items: [
      { t: 'Assess.', d: 'We look at the line or the appliance and give you the price before we start.', icon: 'search' },
      { t: 'Make safe.', d: 'The gas is shut off at the right point before any work begins.', icon: 'shield' },
      { t: 'Install or repair.', d: 'We repair the line, run the new pipe or connect the appliance.', icon: 'wrench' },
      { t: 'Test.', d: 'Every connection is checked for leaks before the gas goes back on.', icon: 'check' },
    ], photo: { name: 'crew-six-at-truck', alt: 'Six of the Plumbing By Paul crew in front of a wrapped truck', focus: '50% 42%' }, caption: 'Six of the crew, at the truck.' },
    price: { l1: 'Gas work is priced by the length of the run and the appliance.', l2: "You'll know the number before we start.",
      p: 'A hookup next to an existing line and a new line across the house are very different jobs. We look first and give you one clear price.', rows: ['Appliance hookup', 'New gas line', 'Leak check and repair'] },
    faq: { eyebrow: 'Gas line questions', l1: 'Asked before', l2: 'the gas goes on', items: [
      { q: 'What should I do if I smell gas?', a1: 'Leave the building with everyone in it.', a2: 'Do not switch anything on or off and do not light anything. From outside, call your gas company or 911. Once it is safe, call us to find and repair the leak.' },
      { q: 'Can you hook up a new gas stove or dryer?', a1: 'Yes.', a2: 'We connect gas ranges, dryers, water heaters and other gas appliances, and test the connection before we leave.' },
      { q: 'Do you install new gas lines?', a1: 'Yes.', a2: 'For homes and businesses, for example for a remodel or a new appliance.' },
      { q: 'Can I do gas work myself?', a1: 'We do not recommend it.', a2: 'Gas work needs the right fittings and testing, and a small mistake can be dangerous.' },
      { q: 'Do you install gas water heaters?', a1: 'Yes.', a2: 'Tank and tankless, with the gas connection done and tested.', link: { text: 'Water heaters', href: '/water-heaters' } },
    ] },
    related: { eyebrow: 'Related services', l1: 'Often booked', l2: 'with gas work', cards: [
      { t: 'Water heaters', href: '/water-heaters', icon: 'heater' }, { t: 'Repiping', href: '/repiping', icon: 'ruler' },
      { t: 'Commercial plumbing', href: '/commercial-plumbing', icon: 'building' }, { t: 'Leak detection', href: '/leak-detection', icon: 'droplets' },
    ], line: 'Gas line work in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: 'Adding a gas appliance?', l2: "We'll hook it up safely." },
  },

  /* ---------- Water softeners and filtration (template A) ---------- */
  'water-softeners': {
    path: '/water-softeners', name: 'Water softener and filtration installation', title: 'Water Softeners & Filtration St. Pete FL · Plumbing By Paul',
    meta: 'Hard water in St. Petersburg? Plumbing By Paul installs and services water softeners, whole-home filters and drinking water filters. Free estimates.',
    og: 'service-tech-kitchen-sink-smiling', ogAlt: 'A Plumbing By Paul technician working under a kitchen sink', layout: 'a', crumb: 'Water softeners',
    hero: {
      eyebrow: 'Water softeners · St. Petersburg, FL', h1a: 'Water softeners and filtration', h1b: 'for Pinellas water',
      lead: 'Pinellas water is hard. It leaves crust on faucets, spots on glasses and sediment in the water heater. A softener or the right filter stops it at the source.',
      rows: ['White crust on faucets and shower heads', 'Spots on glasses and dishes', 'A noisy water heater'],
      photos: [
        { name: 'service-tech-kitchen-sink-smiling', alt: 'A Plumbing By Paul technician smiling while working under a kitchen sink', focus: '60% 50%' },
        { name: 'service-tankless-water-heater-install', alt: 'A tankless water heater with new copper lines', focus: '42% 50%' },
        { name: 'hero-04-crew-new-jerseys-box-truck', alt: 'The Plumbing By Paul crew in blue jerseys in front of the box truck', focus: '50% 45%' },
      ],
      tag: 'Under the kitchen sink', caption: 'The crew, in the new jerseys.',
    },
    answer: {
      text: `Plumbing By Paul installs and services water softeners, whole-home filtration and drinking water filters in St. Petersburg and across Pinellas County. **Pinellas water comes from the Floridan Aquifer and it is hard**, and a softener protects pipes, fixtures and the water heater from scale. Call ${P}.`,
      ticket: 'Job ticket: water softeners',
      rows: [
        { k: 'Systems', v: 'Water softeners, whole-home filters, under-sink drinking water filters.' },
        { k: 'Service', v: 'Installation, replacement, filter changes and maintenance.' },
        { k: 'Why here', v: 'Hard water from the Floridan Aquifer leaves scale in pipes and appliances.' },
        EST, WAR, LIC,
      ],
    },
    signs: { eyebrow: 'Four signs', l1: 'Your water is', l2: 'harder than it should be', items: [
      { t: 'Crust on faucets.', d: 'White build-up on faucets and shower heads is mineral scale.', icon: 'drop' },
      { t: 'Spots on glasses.', d: 'Dishes come out of the dishwasher cloudy or spotted.', icon: 'search' },
      { t: 'Soap that will not lather.', d: 'Hard water fights soap, so you use more of it.', icon: 'droplets' },
      { t: 'A rumbling water heater.', d: 'Minerals settle in the tank as sediment and shorten its life.', icon: 'heater' },
    ] },
    compare: { eyebrow: 'Which one you need', l1: 'Softener', l2: 'or filter?', left: { t: 'A water softener', icon: 'filter', items: ['Removes the minerals that cause scale', 'Protects pipes and the water heater', 'Stops crust on faucets and glass', 'Needs salt topped up'] },
      right: { t: 'A water filter', icon: 'drop', items: ['Improves taste and smell', 'Whole-home or under one sink', 'Catches sediment', 'Filters changed on a schedule'] } },
    types: { eyebrow: 'Three ways to treat it', l1: 'Softener, whole-home', l2: 'or drinking water', link: 'Ask which one fits your home', cards: [
      { num: '1', sub: 'whole house', t: 'Water softener', d: 'Takes out the hardness before the water reaches your pipes, fixtures and appliances.', best: 'scale and spots', icon: 'filter' },
      { num: '2', sub: 'whole house', t: 'Whole-home filter', d: 'Filters all the water coming into the house, for every tap and shower.', best: 'taste and smell everywhere', icon: 'droplets' },
      { num: '3', sub: 'one sink', t: 'Drinking water filter', d: 'A compact filter under the kitchen sink for water you drink and cook with.', best: 'the kitchen tap', icon: 'drop' },
    ] },
    steps: { eyebrow: 'How it works', l1: 'Softer water', l2: 'in four steps', items: [
      { t: 'Talk it through.', d: 'Tell us what bothers you: spots, scale, taste, smell or pressure.', icon: 'phone' },
      { t: 'Recommend.', d: 'We suggest the right system for the house and the budget, with the price first.', icon: 'clipboard' },
      { t: 'Install.', d: 'We fit the softener or filter and connect it to your plumbing.', icon: 'wrench' },
      { t: 'Show you how.', d: 'We explain how it works, how filters get replaced and when to add salt.', icon: 'check' },
    ], photo: { name: 'crew-families-two-trucks', alt: 'The Plumbing By Paul crew and their families in front of two trucks', focus: '50% 45%' }, caption: 'The crew and their families.' },
    price: { l1: 'The price depends on the system and the house.', l2: "You'll know it before we start.",
      p: 'A drinking water filter under one sink and a whole-house softener are very different jobs. We recommend what you actually need and give you one clear price.', rows: ['Water softener', 'Whole-home filter', 'Drinking water filter'] },
    reviews: { eyebrow: 'Softener reviews', l1: 'Softer water,', l2: 'happy customers', list: [R.brendan, R.samFull], chip: { n: '14', text: 'water softener installation' } },
    local: { eyebrow: 'Local knowledge', l1: 'Why Pinellas', l2: 'water is hard', cards: [
      { label: 'The source', icon: 'droplets', q: 'Where does the hardness come from?', a1: "Pinellas water comes from the Floridan Aquifer and it's hard.", a2: 'The aquifer runs through limestone, so the water picks up calcium and magnesium on the way. Those minerals are what leave scale behind.' },
      { label: 'Your water heater', icon: 'heater', q: 'What does hard water do to a water heater?', a1: 'The minerals settle in the tank as sediment.', a2: 'That makes the popping noise and shortens the heater’s life. A yearly flush helps, and so does a softener.', link: { t: 'Water heaters', href: '/water-heaters' } },
    ] },
    faq: { eyebrow: 'Hard water questions', l1: 'What people ask', l2: 'about softeners', items: [
      { q: 'Is the water hard in St. Petersburg?', a1: 'Yes.', a2: 'Water across Pinellas County is hard, because much of the supply comes from the Floridan Aquifer, which runs through limestone.' },
      { q: 'What does a water softener do?', a1: 'It removes the minerals that make water hard before the water reaches your pipes and fixtures.', a2: 'That stops new scale forming in pipes, the water heater and appliances.' },
      { q: 'What is the difference between a softener and a filter?', a1: 'A softener removes the hardness minerals that cause scale; a filter removes what affects taste, smell or clarity.', a2: 'Some homes want one, some want both, and we help you decide.' },
      { q: 'Do you replace old softeners?', a1: 'Yes.', a2: 'We replace and service existing systems, and explain how the new one works and when to add salt.' },
      { q: 'Do you install drinking water filters?', a1: 'Yes.', a2: 'Under-sink drinking water filters as well as whole-home systems.' },
    ] },
    related: { eyebrow: 'Often booked together', l1: 'Protect the', l2: 'rest of the system', cards: [
      { t: 'Water heaters', href: '/water-heaters', icon: 'heater' }, { t: 'Repiping', href: '/repiping', icon: 'ruler' },
      { t: 'Leak detection', href: '/leak-detection', icon: 'droplets' }, { t: 'General plumbing', href: '/plumbing', icon: 'wrench' },
    ], line: 'Water softeners and filtration in St. Petersburg, Clearwater, Seminole and across Pinellas County.' },
    cta: { l1: 'Tired of scale and spots?', l2: "Let's soften it." },
  },

  /* ---------- Commercial plumbing (template B) ---------- */
  'commercial-plumbing': {
    path: '/commercial-plumbing', name: 'Commercial plumbing', title: 'Commercial Plumber St. Petersburg FL · Plumbing By Paul',
    meta: 'Plumbing for offices, shops, church halls, rentals and new builds in St. Petersburg. Plumbing By Paul works around your hours and cleans up after.',
    og: 'crew-three-techs-at-van', ogAlt: 'Three Plumbing By Paul technicians at the work van', layout: 'b', crumb: 'Commercial plumbing',
    hero: {
      eyebrow: 'Commercial plumbing · St. Petersburg, FL', h1a: 'Commercial plumbing', h1b: 'in St. Petersburg',
      lead: 'Offices, church halls, rentals and new builds get the same crew and the same manners as a family kitchen. We work around your opening hours and keep the place clean.',
      chips: [{ icon: 'badge', label: `Lic. ${SITE.licence}` }, { icon: 'building', label: 'Businesses and property managers' }, { icon: 'clock', label: 'Around your hours' }],
      photos: [{ name: 'crew-three-techs-at-van', alt: 'Three Plumbing By Paul technicians at the open side door of a work van', focus: '50% 40%' }],
      tag: 'Commercial and residential', mini: { quote: 'JR and Elvis kept everything clean throughout the project and worked with us around our schedule.', name: 'Stefan Despotovic', patches: ['JR', 'Elvis'] },
    },
    answer: {
      text: `Plumbing By Paul handles commercial plumbing in St. Petersburg and across Pinellas County: offices, shops, restaurants, church halls, rentals and new construction. **One number and one crew that already knows your building**, working around your hours, with the price before any work starts. Call ${P}.`,
      ticket: 'Job ticket: commercial',
      rows: [
        { k: 'Properties', v: 'Offices, shops, restaurants, church halls, rentals, new builds.' },
        { k: 'Work', v: 'Repairs, drains and grease lines, restrooms, water heaters, repiping, gas lines.' },
        { k: 'Scheduling', v: 'Around your opening hours where we can.' },
        { k: 'Who calls us', v: 'Owners, property managers, builders and contractors.' }, EST, LIC,
      ],
    },
    tabs: { eyebrow: 'What does the building need?', l1: 'Small fixes,', l2: 'big projects', foot: 'Ask for a commercial estimate', caption: 'A new build, from above.',
      photo: { name: 'fleet-aerial-van-jobsite', alt: 'An aerial view of the Plumbing By Paul van at a waterfront construction site', focus: '45% 50%' }, items: [
      { label: 'Repairs', icon: 'wrench', text: 'Leaks, broken fixtures, restroom trouble and water heater problems. Small jobs and big ones.' },
      { label: 'Drains and grease', icon: 'waves', text: 'Restaurant grease lines, commercial restrooms, floor and utility drains. Cleared, and checked on camera when a line keeps blocking.', href: '/drain-cleaning', hrefText: 'See drain cleaning' },
      { label: 'Repiping', icon: 'ruler', text: 'Plumbing designed around the building and its daily demand, and repiping when the pipes are wearing out.', href: '/repiping', hrefText: 'See repiping' },
      { label: 'New construction', icon: 'building', text: 'Plumbing for new builds and renovations, for owners, builders and contractors.' },
      { label: 'Gas lines', icon: 'zap', text: 'New lines, appliance hookups and leak checks, tested before the gas goes back on.', href: '/gas-lines', hrefText: 'See gas lines' },
    ] },
    versus: { eyebrow: 'Plan it or call now', l1: 'Book it', l2: 'or call now?', call: 'It cannot wait', caption: 'Framing a new build.',
      photo: { name: 'service-tech-logo-shirt-framing', alt: 'A Plumbing By Paul technician drilling through wall framing on a new build', focus: '50% 35%' },
      left: { t: 'Plan it with us', items: ['A new restroom or kitchen', 'Repiping an older building', 'A tenant fit-out', 'A water heater near the end of its life'] },
      right: { t: 'Call now', items: ['A backup in the restrooms', 'Water coming through a ceiling', 'No hot water for the kitchen', 'A burst pipe', 'A smell of gas, after you get everyone out'] } },
    steps: { eyebrow: 'How we work with businesses', l1: 'Plan, quote,', l2: 'work, stay on call', items: [
      { t: 'Tell us about the site.', d: 'What is wrong, how urgent it is, and when work disrupts you least.', icon: 'phone' },
      { t: 'Assess and quote.', d: 'We look at the job and give you a clear price before work begins.', icon: 'clipboard' },
      { t: 'Do the work.', d: 'Our crew works around your schedule and keeps the place clean.', icon: 'wrench' },
      { t: 'Stay on call.', d: 'One number for the next job, from a crew that knows your building.', icon: 'building' },
    ] },
    feature: { eyebrow: 'Proof from a real job', l1: 'A church hall,', l2: 'a tough job.',
      p: 'When the plumbing at a parish hall turned out to be harder than it looked, the crew kept going, kept it clean and worked around the parish schedule. That is how we work in every building.',
      links: [{ t: 'Repiping', href: '/repiping' }, { t: 'Gas lines', href: '/gas-lines' }],
      tag: 'The crew, two trucks', photo: { name: 'hero-02-crew-16-two-trucks', alt: 'Sixteen of the Plumbing By Paul crew in front of two wrapped trucks', focus: '50% 45%' }, review: { r: R.stefan } },
    reviews: { eyebrow: 'Business reviews', l1: 'Offices, halls', l2: 'and small businesses', list: [R.mark, REVIEWS.kelly, R.melissa] },
    price: { l1: 'Commercial work is quoted job by job.', l2: "You'll have the number before we start.", rows: ['Service call', 'Drain and grease line', 'Project quote'] },
    tips: { eyebrow: 'Free advice', l1: 'Keep the', l2: 'business flowing', caption: 'The box truck, for the bigger jobs.',
      photo: { name: 'fleet-box-truck-rear-three-quarter', alt: 'The Plumbing By Paul box truck with the mascot wrap', focus: '50% 35%' }, items: [
      { b: 'Scrape plates into the trash.', t: 'Grease poured down a sink hardens in the line.' },
      { b: 'Label the shut-offs.', t: 'Staff should know where the main valve is before they need it.' },
      { b: 'Sign the restrooms.', t: 'A small "only toilet paper" sign saves a big call.' },
      { b: 'Plan the old water heater.', t: 'Replace it on your schedule, not on a busy morning.' },
    ], warn: { b: 'Backup during opening hours?', t: 'Close the restroom and call us straight away.' } },
    faq: { eyebrow: 'Commercial questions', l1: 'What businesses', l2: 'ask us', items: [
      { tag: 'Service', q: 'Do you work on commercial properties?', a1: 'Yes.', a2: 'Offices, shops, restaurants, church halls, rentals and job sites across Pinellas County. The trucks say "Commercial and Residential" for a reason.' },
      { tag: 'Drains', q: 'Can you clear restaurant grease lines?', a1: 'Yes.', a2: 'We clear grease lines and commercial kitchen drains, and run a camera down a line that keeps blocking.' },
      { tag: 'Hours', q: 'Can you work around our opening hours?', a1: 'Yes, where the job allows it.', a2: 'Tell us when work disrupts you least and we plan around it.' },
      { tag: 'New builds', q: 'Do you take on new construction?', a1: 'Yes.', a2: 'Plumbing for new builds and renovations, for owners, builders and contractors.' },
      { tag: 'Licence', q: 'Are you licensed?', a1: `Yes. Plumbing By Paul LLC is a Florida certified plumbing contractor, licence ${SITE.licence}.`, a2: 'You can check it yourself at myfloridalicense.com.' },
      { tag: 'Area', q: 'Which areas do you cover?', a1: 'All of Pinellas County, from our shop in St. Petersburg.', a2: 'Including Clearwater and Seminole.', link: { text: 'Service areas', href: '/service-areas' } },
    ] },
    cta: { l1: 'Plumbing holding up business?', l2: "Let's get you open." },
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES);

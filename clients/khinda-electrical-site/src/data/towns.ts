// Town pages (Figma 05 Newton = the template). Newton copy is the Figma copy word for word; the other eight towns swap the
// town name into the same lines and use only facts from plan/PAGE-SHEET.md + SEO-PLAN.md + research/FACTS-CHECK-web.md
// (5.1: Technical Safety BC issues electrical permits everywhere in BC except Burnaby, Maple Ridge, North Vancouver,
// Surrey, Victoria, Vancouver and West Vancouver -> Delta, Langley and White Rock permits come from TSBC).
// No landmarks, jobs, drive times or reviews are invented. Every new line is listed in handoff-copy-areas.md.
// Which towns he covers is a "Khinda to confirm" item (README).
import { SITE, TOWNS } from './site';

export type Town = (typeof TOWNS)[number];
export const PHOTO: Record<string, { name: string; alt: string; cap: string }> = {
  ig01: { name: 'commercial-electrical-control-panel-surrey', alt: 'Commercial electrical control panel wired by Khinda Electrical', cap: 'Control panel' },
  ig03: { name: 'fire-alarm-panels-commercial-surrey', alt: 'Fire alarm panels in a commercial building, from Khinda Electrical’s Instagram', cap: 'Fire alarm panels' },
  ig09: { name: 'house-exterior-soffit-lights-surrey', alt: 'House exterior with soffit lights on, wired by Khinda Electrical', cap: 'Soffit lights' },
  ig11: { name: 'new-build-electrical-rough-in-surrey', alt: 'New build electrical rough-in by Khinda Electrical', cap: 'New build, rough-in' },
  ig12: { name: 'living-room-pot-lights-feature-wall-surrey', alt: 'Living room with pot lights and a lit feature wall, from Khinda Electrical’s Instagram', cap: 'Pot lights' },
  ig17: { name: 'pendant-lights-installed-surrey', alt: 'Pendant lights installed by Khinda Electrical', cap: 'Pendant lights' },
  ig20: { name: 'barbershop-commercial-lighting-surrey', alt: 'Barbershop lighting fit-out by Khinda Electrical', cap: 'Barbershop lights' },
  ig21: { name: 'shop-reception-lighting-surrey', alt: 'Shop reception lighting installed by Khinda Electrical', cap: 'Shop reception' },
  ig23: { name: 'crystal-chandelier-installed-surrey', alt: 'Crystal chandelier installed by Khinda Electrical', cap: 'Crystal chandelier' },
  ig39: { name: 'residential-electrical-panel-rough-in-surrey', alt: 'Residential electrical panel rough-in by Khinda Electrical', cap: 'Panel rough-in' },
  ig40: { name: 'modern-chandelier-installed-surrey', alt: 'Modern chandelier installed by Khinda Electrical', cap: 'Modern chandelier' },
  ig43: { name: 'ring-chandelier-installed-surrey', alt: 'Ring chandelier installed by Khinda Electrical', cap: 'Ring chandelier' },
  ig45: { name: 'spiral-wall-sconce-surrey', alt: 'Spiral wall sconce installed by Khinda Electrical', cap: 'Spiral sconce' },
  ig46: { name: 'starry-sky-ceiling-lights-surrey', alt: 'Starry sky ceiling lights installed by Khinda Electrical', cap: 'Starry ceiling' },
  ig49: { name: 'garden-light-wiring-surrey', alt: 'Garden light wiring by Khinda Electrical', cap: 'Garden lights' },
  ig57: { name: 'condo-hallway-lights-surrey', alt: 'Condo hallway lights installed by Khinda Electrical', cap: 'Condo hallway' },
  ig61: { name: 'residential-electrical-panel-finished-labelled-surrey', alt: 'Finished, labelled residential electrical panel by Khinda Electrical', cap: 'Finished panel' },
};

// Map points on the 5.2 map frame (700x520; % of the full screenshot as on Home's areas map).
const PCT: Record<string, [number, number]> = {
  newton: [47.5, 58.0], fleetwood: [55.9, 40.9], guildford: [58.5, 27.0], cloverdale: [60.6, 59.3], 'south-surrey': [55.5, 80.5],
  'city-centre': [44.3, 34.1], delta: [27.5, 67.3], langley: [72.7, 63.9], 'white-rock': [55.1, 93.4],
};
const NEAR: Record<string, string[]> = {
  newton: ['fleetwood', 'cloverdale', 'delta'], fleetwood: ['guildford', 'newton', 'cloverdale'], guildford: ['city-centre', 'fleetwood', 'newton'],
  cloverdale: ['fleetwood', 'south-surrey', 'langley'], 'south-surrey': ['white-rock', 'cloverdale', 'newton'], 'city-centre': ['guildford', 'newton', 'delta'],
  delta: ['newton', 'city-centre', 'south-surrey'], langley: ['cloverdale', 'fleetwood', 'south-surrey'], 'white-rock': ['south-surrey', 'cloverdale', 'langley'],
};
// photos per page, never repeated on a page: enclosure (5.6), wall (5.7 + its marker note), 4 cutouts (5.8), owner band (5.9)
const SET: Record<string, { encl: string; wall: string; note: [string, string]; cut: string[]; band: string }> = {
  newton: { encl: 'ig39', wall: 'ig12', note: ['Pot lights +\nfeature wall', 'Living room job'], cut: ['ig45', 'ig17', 'ig09', 'ig21'], band: 'ig11' },
  fleetwood: { encl: 'ig61', wall: 'ig23', note: ['Crystal\nchandelier', 'From his Instagram'], cut: ['ig40', 'ig46', 'ig57', 'ig20'], band: 'ig09' },
  guildford: { encl: 'ig01', wall: 'ig20', note: ['Barbershop\nlighting', 'Commercial job'], cut: ['ig43', 'ig49', 'ig17', 'ig21'], band: 'ig39' },
  cloverdale: { encl: 'ig39', wall: 'ig46', note: ['Starry sky\nceiling', 'From his Instagram'], cut: ['ig23', 'ig09', 'ig45', 'ig57'], band: 'ig11' },
  'south-surrey': { encl: 'ig61', wall: 'ig40', note: ['Modern\nchandelier', 'From his Instagram'], cut: ['ig43', 'ig09', 'ig49', 'ig17'], band: 'ig12' },
  'city-centre': { encl: 'ig03', wall: 'ig21', note: ['Shop\nreception', 'Commercial job'], cut: ['ig20', 'ig46', 'ig45', 'ig40'], band: 'ig01' },
  delta: { encl: 'ig39', wall: 'ig43', note: ['Ring\nchandelier', 'From his Instagram'], cut: ['ig12', 'ig57', 'ig23', 'ig09'], band: 'ig11' },
  langley: { encl: 'ig61', wall: 'ig57', note: ['Condo\nhallway', 'From his Instagram'], cut: ['ig40', 'ig49', 'ig21', 'ig17'], band: 'ig23' },
  'white-rock': { encl: 'ig39', wall: 'ig49', note: ['Garden light\nwiring', 'From his Instagram'], cut: ['ig45', 'ig43', 'ig09', 'ig46'], band: 'ig61' },
};
const BAND_TAPE: Record<string, string> = { ig11: 'New build, rough-in', ig39: 'Panel rough-in' };

// Review M7 (less sameness): each town gets its own three of these, all lines already on the approved service pages or
// in research/FACTS-CHECK-web.md (cited per item). No local landmarks, drive times or jobs per town are claimed.
type Card = [string, (surrey: boolean) => string];
const PROB: Record<string, Card> = {
  suite: ['The suite needs its own circuits', (s) => `A basement suite gets its own circuits for the kitchen and laundry. That is regulated work: permit from ${s ? 'the City of Surrey' : 'Technical Safety BC'}.`],
  ev: ['No room in the panel for an EV charger', () => 'He checks the panel first. If it is full, the panel or the load gets sorted before the charger goes in.'],
  pot: ['Old lights to pot lights', () => 'Dated fixtures swapped for pot lights, like the living room on his Instagram.'],
  trip: ['Breakers keep tripping', () => 'The same breaker goes off when the kettle and the heater run together. A photo of the panel helps him find the circuit.'],
  fuse: ['Old fuse panel', () => 'Screw-in fuses instead of breakers, common in older homes. A photo of the panel shows him what is there.'],
  insurer: ['Insurer asked for an update', () => 'Your insurance wants the old panel looked at or replaced. Text a photo of the panel and the label inside the door.'],
  outdoor: ['Soffit and garden lights', () => 'Soffit lights on a house front and a cable run along the fence line for garden lights: both are jobs on his Instagram.'],
  flicker: ['Lights flicker', () => 'They dim when the dryer, oven or AC kicks on. Text a photo of the panel and say what was running.'],
  shop: ['A shop or office fit-out', () => 'Shop fit-outs, a barbershop and fire alarm panels are on his Instagram: “All domestic, commercial work and renovations.”'],
};
const PROBS: Record<string, string[]> = {
  newton: ['suite', 'ev', 'pot'], fleetwood: ['trip', 'suite', 'outdoor'], guildford: ['fuse', 'ev', 'shop'],
  cloverdale: ['suite', 'flicker', 'outdoor'], 'south-surrey': ['outdoor', 'ev', 'insurer'], 'city-centre': ['shop', 'trip', 'pot'],
  delta: ['fuse', 'suite', 'ev'], langley: ['suite', 'insurer', 'pot'], 'white-rock': ['outdoor', 'ev', 'fuse'],
};
// FAQ gang 1 is always the permit question; gangs 2 and 3 come from this list per town.
const FAQS: Record<string, string[]> = {
  newton: ['rebate', 'suites'], fleetwood: ['load', 'code'], guildford: ['own', 'rebate180'], cloverdale: ['suites', 'load'],
  'south-surrey': ['code', 'own'], 'city-centre': ['commercial', 'code'], delta: ['rebate', 'code'], langley: ['suites', 'rebate180'],
  'white-rock': ['topup', 'code'],
};

// Review M7: the five Surrey-neighbourhood pages with no town-specific sourced fact (permit office = Surrey, same as Newton)
// stay noindex even after launch, and out of the sitemap, until Khinda gives real jobs per town (README).
export const NOINDEX = ['fleetwood', 'guildford', 'cloverdale', 'south-surrey', 'city-centre'];

export function townData(slug: string) {
  const t = TOWNS.find((x) => x.slug === slug)!;
  const N = t.name;
  const surrey = t.city === 'Surrey';
  const newton = slug === 'newton';
  const issuer = surrey ? 'City of Surrey' : 'Technical Safety BC';
  const place = surrey ? `${N}, Surrey` : `${N}, BC`;
  const set = SET[slug];
  const [px, py] = PCT[slug];
  const pt = { x: Math.round(-170 + px * 10.4 + 15), y: Math.round(py * 5.2) };
  const langley = slug === 'langley';
  // Review M5: Langley is two municipalities (City of Langley, Township of Langley); TSBC issues permits in both (FACTS-CHECK 5.1).
  const own = langley ? 'Langley is two municipalities, the City of Langley and the Township of Langley; in both' : `${N} is its own city, so`;
  const quick = surrey
    ? `Khinda Electrical works in ${N} for panels, lights, EV chargers and basement suites. ${N} is part of Surrey, so the City of Surrey issues the electrical permit and a licensed contractor applies. Call ${SITE.phone} or text a photo of the job.`
    : `Khinda Electrical comes to ${N} from Surrey for panels, lights, EV chargers and basement suites. ${own} Technical Safety BC issues the electrical permit and a licensed contractor applies. Call ${SITE.phone} or text a photo of the job.`;
  const permitQ = {
    key: 'Permit', q: `Who takes out the permit for an electrical job in ${N}?`,
    a: surrey
      ? [`${N} is part of Surrey, so the City of Surrey issues the electrical permit (Bylaw 15596). The contractor applies for it before the work starts.`, 'In a strata unit you can’t get a homeowner permit, so an electrician has to take it out.']
      : [langley
          ? 'The City of Langley and the Township of Langley are both outside Surrey, and in both Technical Safety BC issues the electrical permit. The contractor applies for it before the work starts.'
          : `${N} is its own city, outside Surrey, so Technical Safety BC issues the electrical permit. The contractor applies for it before the work starts.`, 'In a strata unit you can’t get a homeowner permit, so an electrician has to take it out.'],
    src: surrey ? 'Source · City of Surrey · Technical Safety BC' : 'Source · Technical Safety BC',
  };
  const POOL: Record<string, { key: string; q: string; a: string[]; src: string }> = {
    rebate: {
      key: 'EV rebate', q: `Can I get the BC Hydro EV charger rebate in ${N}?`,
      a: ['It may apply: the BC Hydro home charger rebate covers up to 50% of the cost, to a maximum of $350.', 'It needs a licensed electrician and an electrical permit (BC Hydro guide, 15 Jul 2026).'],
      src: 'Source · BC Hydro home charger rebate guide, 15 Jul 2026',
    },
    rebate180: {
      key: 'EV rebate', q: `How long do I have to claim the EV charger rebate in ${N}?`,
      a: ['Apply within 6 months (180 days) of the charger invoice date. The rebate covers up to 50% of the cost, to a maximum of $350.', 'You need the installation invoice and the electrical permit. Tesla-made chargers are not eligible at this time (BC Hydro guide, 15 Jul 2026).'],
      src: 'Source · BC Hydro home charger rebate guide, 15 Jul 2026',
    },
    suites: {
      key: 'Suites', q: `What does a basement suite need in ${N}?`,
      a: ['A suite gets its own circuits for the kitchen and laundry.', `That is regulated work, so it needs an electrical permit from ${surrey ? 'the City of Surrey' : 'Technical Safety BC'}. Text a photo of the space to start.`],
      src: surrey ? 'Source · City of Surrey' : 'Source · Technical Safety BC',
    },
    code: {
      key: 'Code', q: `Which electrical code applies in ${N}?`,
      a: ['The BC Electrical Code: the Canadian Electrical Code, Part I, 26th edition, in force in BC since 4 March 2025.', `It is the same code across BC; ${surrey ? 'in Surrey the City inspects the work' : 'Technical Safety BC issues the permit here'}.`],
      src: 'Source · Technical Safety BC bulletin, BC Electrical Code 2024 edition',
    },
    load: {
      key: 'EV load', q: `Does an EV charger in ${N} need a load calculation?`,
      a: ['Yes. For a detached house, multiplex or townhouse, the City of Surrey says a licensed electrical contractor must assess the service capacity and do a load calculation.', 'Then the contractor applies for the electrical installation permit.'],
      src: 'Source · City of Surrey, EV charger installation',
    },
    own: {
      key: 'Own permit', q: `Can I take out the electrical permit myself in ${N}?`,
      a: ['The City of Surrey has a homeowner route (a Homeowner Authorization Form) for your own house.', 'Not in a strata unit: there an electrician has to take it out. For a contractor, inspections can be delayed if the contractor is not in good standing with Technical Safety BC.'],
      src: 'Source · City of Surrey, Electrical Safety Bylaw 15596',
    },
    commercial: {
      key: 'Commercial', q: `Do you do commercial electrical work in ${N}?`,
      a: ['Yes: “All domestic, commercial work and renovations” is his own line.', 'Shop fit-outs, a barbershop, a shop reception and fire alarm panels are on his Instagram. Text a photo of the space.'],
      src: 'Source · @khinda__electrical',
    },
    topup: {
      key: 'Top-up', q: 'Is there an extra EV charger rebate in White Rock?',
      a: ['White Rock is on BC Hydro’s list for a time-limited community top-up: up to $2,350 in all ($350 rebate + $1,750 top-up + $250 Peak Saver bonus).', 'It is for applications from 4 August to 31 December 2026, with conditions (Peak Saver, a qualifying feeder). Check your address with BC Hydro.'],
      src: 'Source · BC Hydro community-based offers, 2026',
    },
  };
  const faq = [permitQ, ...FAQS[slug].map((k) => POOL[k])];
  const problems = PROBS[slug].map((k) => [PROB[k][0], PROB[k][1](surrey)] as [string, string]);
  const permitLede = surrey
    ? `Yes, for regulated electrical work. ${N} is in Surrey, and the City of Surrey issues its own electrical permits (Bylaw 15596). A licensed contractor applies for it.`
    : langley
      ? 'Yes, for regulated electrical work. The City of Langley and the Township of Langley are outside Surrey, and Technical Safety BC issues the electrical permits in both. A licensed contractor applies for it.'
      : `Yes, for regulated electrical work. ${N} is its own city, and Technical Safety BC issues the electrical permits there. A licensed contractor applies for it.`;
  const distLede = surrey
    ? `${N} sits inside Surrey, the same city he works out of. Same permit office, same code, no crossing into another town.`
    : langley
      ? 'The City of Langley and the Township of Langley are next to his Surrey base. Same code across BC; the electrical permit in both comes from Technical Safety BC.'
      : `${N} is the next city over from his Surrey base. Same code across BC; the electrical permit there comes from Technical Safety BC.`;
  const near = NEAR[slug].map((s) => {
    const o = TOWNS.find((x) => x.slug === s)!;
    return { ...o, label: newton && s === 'delta' ? 'Next city west · page →' : o.city === 'Surrey' ? 'Surrey · page →' : 'Nearby city · page →' };
  });
  return {
    t, N, slug, surrey, newton, issuer, place, quick, faq, near, pt, set, bandTape: BAND_TAPE[set.band] ?? PHOTO[set.band].cap,
    problems, permitLede, distLede, noindex: NOINDEX.includes(slug),
    where: newton ? 'South-central Surrey' : surrey ? 'Part of Surrey' : langley ? 'City + Township, next to Surrey' : 'Its own city, next to Surrey',
    title: surrey ? `Electrician in ${N}, Surrey · Khinda` : `Electrician in ${N}, BC · Khinda`,
    h1: surrey ? ['Electrician in', `${N}, Surrey`] : ['Electrician in', N],
    description: surrey
      ? `Electrician in ${N}, Surrey: panels, pot lights, EV chargers and basement suites. City of Surrey permits. Call or text 236-818-2664.`
      : `Electrician in ${N}, BC, from Surrey: panels, pot lights, EV chargers and basement suites. TSBC permits. Call or text 236-818-2664.`,
    hoods: newton ? ['West Newton', 'East Newton', 'South Newton', 'Sullivan Heights', 'Panorama Ridge', 'Strawberry Hill', 'Bear Creek'] : null,
  };
}
export type TownData = ReturnType<typeof townData>;

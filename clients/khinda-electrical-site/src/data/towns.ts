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
  fleetwood: { encl: 'ig61', wall: 'ig23', note: ['Crystal\nchandelier', 'From his Instagram'], cut: ['ig40', 'ig46', 'ig57', 'ig20'], band: 'ig11' },
  guildford: { encl: 'ig01', wall: 'ig12', note: ['Pot lights +\nfeature wall', 'Living room job'], cut: ['ig43', 'ig49', 'ig17', 'ig21'], band: 'ig39' },
  cloverdale: { encl: 'ig39', wall: 'ig46', note: ['Starry sky\nceiling', 'From his Instagram'], cut: ['ig23', 'ig09', 'ig45', 'ig57'], band: 'ig11' },
  'south-surrey': { encl: 'ig61', wall: 'ig40', note: ['Modern\nchandelier', 'From his Instagram'], cut: ['ig43', 'ig09', 'ig49', 'ig17'], band: 'ig11' },
  'city-centre': { encl: 'ig03', wall: 'ig21', note: ['Shop\nreception', 'Commercial job'], cut: ['ig20', 'ig46', 'ig45', 'ig40'], band: 'ig11' },
  delta: { encl: 'ig39', wall: 'ig43', note: ['Ring\nchandelier', 'From his Instagram'], cut: ['ig12', 'ig57', 'ig23', 'ig09'], band: 'ig11' },
  langley: { encl: 'ig61', wall: 'ig12', note: ['Pot lights +\nfeature wall', 'Living room job'], cut: ['ig40', 'ig49', 'ig21', 'ig17'], band: 'ig11' },
  'white-rock': { encl: 'ig39', wall: 'ig49', note: ['Garden light\nwiring', 'From his Instagram'], cut: ['ig45', 'ig43', 'ig09', 'ig46'], band: 'ig11' },
};
const BAND_TAPE: Record<string, string> = { ig11: 'New build, rough-in', ig39: 'Panel rough-in' };

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
  const quick = surrey
    ? `Khinda Electrical works in ${N} for panels, lights, EV chargers and basement suites. ${N} is part of Surrey, so the City of Surrey issues the electrical permit and a licensed contractor applies. Call ${SITE.phone} or text a photo of the job.`
    : `Khinda Electrical comes to ${N} from Surrey for panels, lights, EV chargers and basement suites. ${N} is its own city, so Technical Safety BC issues the electrical permit and a licensed contractor applies. Call ${SITE.phone} or text a photo of the job.`;
  const faq = [
    {
      key: 'Permit', q: newton ? 'Who takes out the permit for an electrical job in Newton?' : `Who takes out the permit for an electrical job in ${N}?`,
      a: surrey
        ? [`${N} is part of Surrey, so the City of Surrey issues the electrical permit (Bylaw 15596). The contractor applies for it before the work starts.`, 'In a strata unit you can’t get a homeowner permit, so an electrician has to take it out.']
        : [`${N} is its own city, outside Surrey, so Technical Safety BC issues the electrical permit. The contractor applies for it before the work starts.`, 'In a strata unit you can’t get a homeowner permit, so an electrician has to take it out.'],
      src: surrey ? 'Source · City of Surrey · Technical Safety BC' : 'Source · Technical Safety BC',
    },
    {
      key: 'EV rebate', q: `Can I get the BC Hydro EV charger rebate in ${N}?`,
      a: ['It may apply: the BC Hydro home charger rebate covers up to 50% of the cost, to a maximum of $350.', 'It needs a licensed electrician and an electrical permit (BC Hydro guide, 15 Jul 2026).'],
      src: 'Source · BC Hydro home charger rebate guide, 15 Jul 2026',
    },
    {
      key: 'Suites', q: `What does a basement suite need in ${N}?`,
      a: ['A suite gets its own circuits for the kitchen and laundry.', `That is regulated work, so it needs an electrical permit from ${issuer === 'City of Surrey' ? 'the City of Surrey' : 'Technical Safety BC'}. Text a photo of the space to start.`],
      src: surrey ? 'Source · City of Surrey' : 'Source · Technical Safety BC',
    },
  ];
  const near = NEAR[slug].map((s) => {
    const o = TOWNS.find((x) => x.slug === s)!;
    return { ...o, label: newton && s === 'delta' ? 'Next city west · page →' : o.city === 'Surrey' ? 'Surrey · page →' : 'Nearby city · page →' };
  });
  return {
    t, N, slug, surrey, newton, issuer, place, quick, faq, near, pt, set, bandTape: BAND_TAPE[set.band],
    where: newton ? 'South-central Surrey' : surrey ? 'Part of Surrey' : 'Its own city, next to Surrey',
    title: surrey ? `Electrician in ${N}, Surrey · Khinda` : `Electrician in ${N}, BC · Khinda`,
    h1: surrey ? ['Electrician in', `${N}, Surrey`] : ['Electrician in', N],
    description: surrey
      ? `Electrician in ${N}, Surrey: panels, pot lights, EV chargers and basement suites. City of Surrey permits. Call or text 236-818-2664.`
      : `Electrician in ${N}, BC, from Surrey: panels, pot lights, EV chargers and basement suites. TSBC permits. Call or text 236-818-2664.`,
    hoods: newton ? ['West Newton', 'East Newton', 'South Newton', 'Sullivan Heights', 'Panorama Ridge', 'Strawberry Hill', 'Bear Creek'] : null,
  };
}
export type TownData = ReturnType<typeof townData>;

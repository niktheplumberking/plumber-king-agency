// Services hub (Figma 02) copy. Figma lines are kept as drawn; lines Figma does not show (the other 7 dial cards, families
// 2-4, the FAQ answers 1, 2 and 4) are written from PAGE-SHEET "Facts copy may use" only and listed in
// handoff-copy-services.md. No reviews, prices, times, years, licence or insurance claims.
import { SITE } from '../../data/site';

const S = (slug: string) => `/services/${slug}/`;
export type Pic = { name: string; alt: string; focus?: string };
const P = {
  ig01: { name: 'commercial-electrical-control-panel-surrey', alt: 'Commercial electrical control panel wired by Khinda Electrical' },
  ig03: { name: 'fire-alarm-panels-commercial-surrey', alt: 'Fire alarm panels finished and closed up in a commercial building', focus: '0% 50%' },
  ig09: { name: 'house-exterior-soffit-lights-surrey', alt: 'House front in Surrey with soffit lights wired by Khinda Electrical' },
  ig11: { name: 'new-build-electrical-rough-in-surrey', alt: 'New-build house in Surrey at the framing and rough-in stage' },
  ig12: { name: 'living-room-pot-lights-feature-wall-surrey', alt: 'Living room with pot lights and a lit feature wall, from Khinda Electrical’s Instagram', focus: '50% 30%' },
  ig17: { name: 'pendant-lights-installed-surrey', alt: 'Two round pendant lights installed by Khinda Electrical' },
  ig20: { name: 'barbershop-commercial-lighting-surrey', alt: 'Barbershop lighting, commercial electrical work by Khinda Electrical' },
  ig21: { name: 'shop-reception-lighting-surrey', alt: 'Shop reception with new lighting by Khinda Electrical' },
  ig39: { name: 'residential-electrical-panel-rough-in-surrey', alt: 'Residential electrical panel at rough-in, wires run into the panel' },
  ig40: { name: 'modern-chandelier-installed-surrey', alt: 'Sputnik-style modern chandelier hung and wired by Khinda Electrical' },
  ig45: { name: 'spiral-wall-sconce-surrey', alt: 'Spiral LED wall sconce installed by Khinda Electrical' },
  ig46: { name: 'starry-sky-ceiling-lights-surrey', alt: 'Starry-sky ceiling with lights from a renovation by Khinda Electrical' },
  ig49: { name: 'garden-light-wiring-surrey', alt: 'Garden light cable run along a fence line' },
  ig57: { name: 'condo-hallway-lights-surrey', alt: 'Condo hallway with new ceiling lights during a commercial job', focus: '50% 70%' },
  ig61: { name: 'residential-electrical-panel-finished-labelled-surrey', alt: 'Finished residential electrical panel, every breaker labelled' },
} satisfies Record<string, Pic>;
export const PICS = P;

/* 2.1 jump chips -> families (wire colour on the chip) */
export const JUMPS = [
  { label: 'Panels & power', fam: 1, c: '#EDEDED' },
  { label: 'Lighting', fam: 2, c: '#F2C230' },
  { label: 'EV & circuits', fam: 3, c: '#2C5FB8' },
  { label: 'Renos & commercial', fam: 4, c: '#C8362F' },
];

/* 2.3 dial: 8 symptoms clockwise from the top; each points at one service card */
type Card = { svc: string; href: string; title: string; body: string; call: string; pic: Pic };
const CARD = {
  repairs: (body: string): Card => ({ svc: 'repairs', href: S('repairs-troubleshooting'), title: 'Repairs & troubleshooting', body, call: 'Call about a repair', pic: P.ig45 }),
  lighting: { svc: 'lighting', href: S('lighting-pot-lights'), title: 'Pot lights & lighting', body: 'Flicker or dimming usually comes down to a dimmer, a fixture or the circuit behind it. A photo of the fixture helps him tell which.', call: 'Call about lighting', pic: P.ig12 },
  panel: { svc: 'panel', href: S('panel-upgrades'), title: 'Panel upgrades', body: 'No space for another breaker usually means a bigger panel or a service upgrade. A photo of the open panel shows what is there now.', call: 'Call about a panel', pic: P.ig39 },
  ev: { svc: 'ev', href: S('ev-charger-installation'), title: 'EV charger installation', body: 'A home charger needs its own circuit and room in the panel. BC Hydro’s home charger rebate asks for a licensed electrician and a permit.', call: 'Call about a charger', pic: P.ig09 },
  reno: { svc: 'reno', href: S('renovations-basement-suites'), title: 'Renos & basement suites', body: 'New rooms and suites mean new circuits, lights and plugs, and regulated work in Surrey needs a permit. Send the plan or a photo of the space.', call: 'Call about a reno', pic: P.ig46 },
  fire: { svc: 'fire', href: S('fire-alarm-systems'), title: 'Fire alarm systems', body: 'Fire alarm panels for commercial buildings are on his Instagram. Text a photo of the space or the panel that is there now.', call: 'Call about fire alarms', pic: P.ig21 },
};
export const SYMPTOMS: { label: string; card: Card }[] = [
  { label: 'Breaker trips', card: CARD.repairs('A breaker that keeps tripping is the circuit telling you something: too much on it, or a fault. Text a photo of the panel and say which one.') },
  { label: 'Lights flicker or dim', card: CARD.lighting },
  { label: 'Outlet warm or buzzing', card: CARD.repairs('A warm or buzzing outlet needs a look. Stop using it, then text a photo of the outlet and what is plugged in.') },
  { label: 'Dead outlets', card: CARD.repairs('Dead outlets often trace back to a tripped breaker, a GFCI further along the line or a loose connection. A photo helps.') },
  { label: 'No room in the panel', card: CARD.panel },
  { label: 'Want an EV charger', card: CARD.ev },
  { label: 'Planning a reno or suite', card: CARD.reno },
  { label: 'Fire alarm for a business', card: CARD.fire },
];
export const DIAL_START = 1; // 0-based: 02 Lights flicker (Figma frame)

/* 2.4 families */
export const FAMILIES = [
  { name: 'Panels & power', desc: 'Panel work, faults and dead circuits. Each wire runs to its own page.', pic: P.ig61,
    links: [{ t: 'Panel upgrades', h: S('panel-upgrades') }, { t: 'Repairs & troubleshooting', h: S('repairs-troubleshooting') }, { t: 'No-power calls', h: '/contact/' }] },
  { name: 'Lighting & fixtures', desc: 'Pot lights, chandeliers, pendants and soffit lights, all from his own posts.', pic: P.ig17,
    links: [{ t: 'Pot lights & lighting', h: S('lighting-pot-lights') }, { t: 'Chandeliers & pendants', h: S('lighting-pot-lights') }, { t: 'His lighting jobs', h: '/our-work/' }] },
  { name: 'EV & new circuits', desc: 'Home chargers, new builds and the new circuits that come with them.', pic: P.ig11,
    links: [{ t: 'EV charger installation', h: S('ev-charger-installation') }, { t: 'New construction wiring', h: S('new-construction-wiring') }, { t: 'Plugs, switches & fans', h: S('repairs-troubleshooting') }] },
  { name: 'Renos, suites & commercial', desc: 'All domestic, commercial work and renovations, in his own words.', pic: P.ig20,
    links: [{ t: 'Renos & basement suites', h: S('renovations-basement-suites') }, { t: 'Commercial electrical', h: S('commercial-electrical') }, { t: 'Fire alarm systems', h: S('fire-alarm-systems') }] },
];

/* 2.5 full list: Figma positions (x, y, w, rot) desktop / (x, y, w, rot) mobile */
export const STRIPS = [
  { t: 'Panel upgrades', h: S('panel-upgrades'), d: [571, 169, 301, -0.8], m: [20, 336, 244, -0.6] },
  { t: 'EV chargers', h: S('ev-charger-installation'), d: [1020, 171, 312, 1], m: [40, 408, 268, 0.6] },
  { t: 'Pot lights & lighting', h: S('lighting-pot-lights'), d: [596, 275, 352, 0.8], m: [20, 476, 287, 0.5] },
  { t: 'New construction wiring', h: S('new-construction-wiring'), d: [996, 275, 412, -1.2], m: [20, 544, 337, -0.5] },
  { t: 'Renos & basement suites', h: S('renovations-basement-suites'), d: [572, 379, 404, 1.4], m: [20, 612, 330, 0.6] },
  { t: 'Commercial electrical', h: S('commercial-electrical'), d: [1020, 379, 380, -0.6], m: [40, 680, 310, -0.5] },
  { t: 'Fire alarm systems', h: S('fire-alarm-systems'), d: [596, 483, 343, -1], m: [20, 748, 279, -0.6] },
  { t: 'Repairs & troubleshooting', h: S('repairs-troubleshooting'), d: [996, 483, 426, 1.2], m: [20, 816, 349, 0.6] },
  { t: 'Emergency electrician', h: '/contact/', d: [1010, 587, 380, 0.5], m: [20, 884, 310, 0.4], tape: true },
];

/* 2.6 promises (Figma copy; PAGE-SHEET lists price-before-work, permit-on-every-job and clean-up as Khinda-to-confirm) */
export const PROMISES = [
  { t: ['Price before', 'work starts'], d: 'You hear the price before anything is opened up.', m: 'You hear the price before anything is opened up.', rot: -8 },
  { t: ['Permit on', 'regulated work'], d: 'Surrey issues its own electrical permits. A licensed contractor applies.', m: 'Surrey issues its own permits. A licensed contractor applies.', rot: 6 },
  { t: ['Every circuit', 'labelled'], d: 'Like the panels on his Instagram: each breaker named by hand.', m: 'Each breaker named by hand, like his panels on Instagram.', rot: 4 },
  { t: ['Tidy site', 'at the end'], d: 'Dust and offcuts leave with him.', m: 'Dust and offcuts leave with him.', rot: -5 },
];

/* 2.7 job cards (his Instagram) */
export const JOBS = [
  { k: 'Lighting · Home', t: 'Modern chandelier', d: 'A sputnik-style chandelier hung and wired.', pic: P.ig40 },
  { k: 'Fire alarm · Commercial', t: 'Fire alarm panels', d: 'Panels finished and closed up, ready for the fire alarm tech.', pic: P.ig03 },
  { k: 'Outdoor · Home', t: 'Garden light wiring', d: 'Cable run along the fence line for garden lights.', pic: P.ig49 },
];

/* 2.8 FAQ fuses */
export const FUSES = [
  { q: 'Can you do the whole reno?', keys: 'reno renovation renos suite basement whole job jobs kitchen',
    a: 'Yes. Renovations sit on his own list: “All domestic / commercial work / Renovations”. Text a photo or the plan of the space with your town, and regulated work gets its permit from the City of Surrey.',
    link: { t: 'Text the plan: ' + SITE.phone, m: 'Text the plan' } },
  { q: 'Do you do commercial units?', keys: 'commercial unit units shop store business office salon fit-out job jobs',
    a: 'Yes. Commercial work is on his Instagram: shop and salon lighting, control panels and fire alarm panels. Text a photo of the unit and what it needs.',
    link: { t: 'Text a photo of the unit →', m: 'Text a photo →' } },
  { q: 'Can I send a photo first?', keys: 'photo photos picture pictures text whatsapp send image',
    a: 'Yes. Text a photo of the panel, outlet or fixture to 236-818-2664, with your town. A photo shows the job faster than words, and the call that follows is shorter.',
    am: 'Yes. Text a photo of the panel, outlet or fixture to 236-818-2664, with your town. A photo shows the job faster than words.',
    link: { t: 'Text the photo: ' + SITE.phone, m: 'Text the photo' } },
  { q: 'Do you take out the permit?', keys: 'permit permits bylaw inspection regulated tsbc strata',
    a: 'Surrey issues its own electrical permits, and a licensed contractor applies for them on regulated work. Strata owners can’t get a homeowner permit (Technical Safety BC). Ask about the permit side when you call.',
    link: { t: 'Call ' + SITE.phone, m: 'Call', tel: true } },
];
export const FUSE_START = 2; // Q3 open (Figma frame)
export const SLEEVES = [{ t: 'Jobs', q: 'job' }, { t: 'Photos', q: 'photo' }, { t: 'Permits', q: 'permit' }, { t: 'Commercial', q: 'commercial' }];

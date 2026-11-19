// Service pages (Figma 03 Panel upgrades = the template). Panel upgrades = the Figma copy word for word. The other seven
// reuse the 03 layout; their copy comes only from plan/PAGE-SHEET.md "Facts", SEO-PLAN.md, research/FACTS-CHECK-web.md
// (official sources) and lines that already appear in the Figma. Every new line is listed in handoff-copy-services.md.
// A section a service cannot source is left out (undefined). A string pair [desktop, mobile] = Figma's two wordings.
// Photos: his own (src/assets/photos), never one photo twice on a page.
export type DM = string | [string, string];
export interface Photo { name: string; alt: string }
export interface SvcPage {
  slug: string; name: string; title: string; description: string; h1: [string, string]; eyebrow: string; lead: DM;
  facts: { k: string; v: string }[];
  hero: { bg: Photo; plate?: Photo & { cap: string }; breaker?: true };
  form: { title: string; g1: { label: string; opts: string[] }; g2: { label: string; opts: string[] }; photo: string };
  quick: { h2: [string, string]; answer: string; ask: DM; label: string; rows: { k: string; v: DM; src: string }[]; sources: string };
  signs?: { lead: string; items: { t: string; b: string; more?: string; plate: number; tag?: boolean }[] };
  diy?: { photo: Photo };
  process: { h2: [string, string]; lead: string; steps: { t: string; b: string }[]; foot: string };
  compare?: { before: Photo; after: Photo };
  pricing?: { lead: string; rows: { t: string; b: string }[]; slider: boolean };
  signoff?: { jobs: { photo: Photo; cap: DM; job: string; type: string; work: string }[] };
  why: { h2: [string, string]; lead: string; items: { k: string; t: string; b: string; src: string }[] };
  prevent?: true;
  faq: { eyebrow: string; h2: [string, string]; items: { q: string; a: string; link?: { t: DM; href: string } }[] };
  related: { h2: [string, string]; items: { slug: string; t: string; b: string; photo: Photo }[]; towns: boolean };
  cta: { eyebrow: string; h2: [string, string]; lead: string; frame: DM; btn: string };
}

const P = (name: string, alt: string): Photo => ({ name, alt });
const PH = {
  ig01: P('commercial-electrical-control-panel-surrey', 'Commercial electrical control panel wired by Khinda Electrical in Surrey'),
  ig03: P('fire-alarm-panels-commercial-surrey', 'Fire alarm panels finished by Khinda Electrical in a Surrey commercial space'),
  ig09: P('house-exterior-soffit-lights-surrey', 'House exterior with soffit lights at night, wired by Khinda Electrical in Surrey'),
  ig11: P('new-build-electrical-rough-in-surrey', 'New build electrical rough-in by Khinda Electrical in Surrey'),
  ig12: P('living-room-pot-lights-feature-wall-surrey', 'Living room pot lights and feature wall lighting by Khinda Electrical'),
  ig17: P('pendant-lights-installed-surrey', 'Pendant lights installed by Khinda Electrical'),
  ig20: P('barbershop-commercial-lighting-surrey', 'Barbershop lighting fit-out by Khinda Electrical in Surrey'),
  ig21: P('shop-reception-lighting-surrey', 'Shop reception lighting by Khinda Electrical in Surrey'),
  ig23: P('crystal-chandelier-installed-surrey', 'Crystal chandelier installed by Khinda Electrical in a Surrey home'),
  ig39: P('residential-electrical-panel-rough-in-surrey', 'Residential electrical panel rough-in by Khinda Electrical in Surrey'),
  ig40: P('modern-chandelier-installed-surrey', 'Modern chandelier installed by Khinda Electrical'),
  ig43: P('ring-chandelier-installed-surrey', 'Ring chandelier installed by Khinda Electrical'),
  ig45: P('spiral-wall-sconce-surrey', 'Spiral wall sconce installed by Khinda Electrical'),
  ig46: P('starry-sky-ceiling-lights-surrey', 'Starry-sky feature ceiling lights wired by Khinda Electrical'),
  ig49: P('garden-light-wiring-surrey', 'Garden light wiring by Khinda Electrical in Surrey'),
  ig57: P('condo-hallway-lights-surrey', 'Condo hallway lighting by Khinda Electrical in Surrey'),
  ig61: P('residential-electrical-panel-finished-labelled-surrey', "Khinda Electrical's finished residential panel in Surrey, every circuit labelled"),
};

// Sourced lines shared by several pages (Figma 03 / Home / FACTS-CHECK 5.1-5.5).
const ROW = {
  permit: { k: 'Permit', v: 'Yes. City of Surrey issues it (Bylaw 15596).', src: 'City of Surrey Electrical Bylaw 15596. Surrey issues its own electrical permits.' },
  who: { k: 'Who applies', v: 'A licensed contractor.', src: 'City of Surrey: the contractor applies for an Electrical Contractor Installation Permit.' },
  code: { k: 'Electrical code', v: 'CEC 26th ed., in force 4 Mar 2025.', src: 'BC Electrical Code: the Canadian Electrical Code, 26th edition, effective 4 March 2025.' },
  strata: { k: 'Strata', v: ['No homeowner permit in strata.', 'Owners can’t get a homeowner permit.'] as [string, string], src: 'Technical Safety BC: owners of a strata can’t obtain homeowner permits.' },
};
const SOURCES = 'Sources · City of Surrey · TSBC · CEC';
const STEP = {
  price: { t: 'The price', b: 'Given after he sees the panel, before any work starts.' },
  permit: { t: 'The permit', b: 'A licensed contractor applies to the City of Surrey.' },
  label: { t: 'Labelled + inspected', b: 'Every circuit named on the door. Inspection where required.' },
};
const WHY_GENERIC = {
  h2: ['Why Khinda', 'for the job.'] as [string, string],
  lead: 'Four connections he twists tight on every job, one reason each.',
  items: [
    { k: 'Built to today’s code', t: 'Built to today’s code', b: 'The work goes in to the BC Electrical Code in force now: the CEC 26th edition, in force since 4 March 2025.', src: 'BC Electrical Code · CEC 26th ed., in force 4 Mar 2025.' },
    { k: 'Permit on regulated work', t: 'Permit on regulated work', b: 'Surrey issues its own electrical permits. A licensed contractor applies.', src: 'City of Surrey Electrical Bylaw 15596.' },
    { k: 'Every circuit labelled', t: 'Every circuit labelled', b: 'Like the panels on his Instagram: each breaker named by hand.', src: '@khinda__electrical · his panel posts.' },
    { k: 'A photo before the visit', t: 'A photo before the visit', b: 'Text a photo of the job to 236-818-2664. A photo shows the job faster than words.', src: 'Calls and WhatsApp texts: 236-818-2664.' },
  ],
};
const ASK_PHOTO = 'Yes. Text a photo of the panel, outlet or fixture to 236-818-2664, with your town. A photo shows the job faster than words, and the call that follows is shorter.';
const REL = {
  panel: { slug: 'panel-upgrades', t: 'Panel upgrades', b: '100A to 200A, full panels, and adding space for an EV charger or a heat pump.' },
  ev: { slug: 'ev-charger-installation', t: 'EV chargers', b: 'BC Hydro home charger rebate: up to 50%, max $350, with a licensed electrician and a permit.' },
  lighting: { slug: 'lighting-pot-lights', t: 'Pot lights & lighting', b: 'Pot lights, chandeliers, soffit lights.' },
  newc: { slug: 'new-construction-wiring', t: 'New construction wiring', b: 'Rough-in to finish, new builds too.' },
  renos: { slug: 'renovations-basement-suites', t: 'Renos & basement suites', b: 'Rough-in to finish, with the panel sized for the new space.' },
  comm: { slug: 'commercial-electrical', t: 'Commercial electrical', b: 'Shop fit-outs, barbershops, fire alarm.' },
  fire: { slug: 'fire-alarm-systems', t: 'Fire alarm systems', b: 'Panels finished and closed up, ready for the fire alarm tech.' },
  repairs: { slug: 'repairs-troubleshooting', t: 'Repairs & troubleshooting', b: 'Tripping breakers, flicker and dead outlets, traced to the circuit.' },
};
const FORM_GENERIC = (title: string, g1: string, o1: string[], g2: string, o2: string[], photo: string) => ({ title, g1: { label: g1, opts: o1 }, g2: { label: g2, opts: o2 }, photo });
const CTA_JOB = { eyebrow: 'Not sure what the job needs', h2: ['Send a photo', 'of the job.'] as [string, string], lead: 'Frame the fixture, the room or your panel and the label inside the door. He looks at the photo and tells you what the job needs.', frame: ['Frame the job + the panel', 'Job + panel'] as [string, string], btn: 'Text a photo of the job' };

export const SERVICE_PAGES: SvcPage[] = [
  {
    slug: 'panel-upgrades', name: 'Panel upgrades', title: 'Panel & 200A Service Upgrades in Surrey · Khinda',
    description: '100A to 200A panel upgrades in Surrey, BC, on a City of Surrey permit, every circuit labelled. Text a photo of your panel to 236-818-2664.',
    h1: ['Panel Upgrades in', 'Surrey, BC'], eyebrow: 'Panel upgrades · Surrey, BC',
    lead: ['100A to 200A, full panels, and adding space for an EV charger or a heat pump. Done on a permit, with every circuit labelled on the door.', '100A to 200A, full panels, and adding space for an EV charger or a heat pump. Done on a permit, with every circuit labelled.'],
    facts: [{ k: 'Permit', v: 'City of Surrey' }, { k: 'Code', v: 'CEC 26th ed.' }, { k: 'Door', v: 'Every circuit labelled' }],
    hero: { bg: PH.ig01, breaker: true },
    form: FORM_GENERIC('Price your upgrade', 'Panel today', ['100A', '125A', 'Fuses', 'Not sure'], 'Why', ['EV charger', 'Heat pump', 'Reno', 'Full panel'], '+ Add a photo of the panel'),
    quick: {
      h2: ['Do you need a', 'bigger panel?'],
      answer: 'Many homes adding an EV charger or heat pump need 200A. It needs a permit: in Surrey the City issues electrical permits and a licensed contractor applies. Khinda gives the price after seeing your panel.',
      ask: ['Ask about your panel: 236-818-2664 →', 'Ask about your panel →'], label: 'Job facts · Panel upgrade',
      rows: [ROW.permit, { ...ROW.who, src: 'City of Surrey: have your contractor apply for an Electrical Contractor Installation Permit.' }, ROW.code,
        { k: 'Time on site', v: 'He tells you after seeing the panel.', src: 'Every panel is different: he looks first.' },
        { k: 'Power off', v: 'He tells you before the day.', src: 'Power goes off while the new panel goes in.' }, ROW.strata],
      sources: SOURCES,
    },
    signs: {
      lead: 'Each one ends the same way: call, or text a photo of your panel and the label inside the door.',
      items: [
        { t: 'Breakers keep tripping', b: 'The same breaker goes off when the kettle and the heater run together.', more: 'If it trips again, leave it off and call. Note what was running when it went.', plate: 1 },
        { t: 'No free spaces', b: 'Every slot in the panel is full, so nothing new can go in.', plate: 2 },
        { t: 'Old fuse panel', b: 'Screw-in fuses instead of breakers, common in older homes.', plate: 3 },
        { t: 'Lights flicker', b: 'They dim when the dryer, oven or AC kicks on.', plate: 4 },
        { t: 'Adding EV, heat pump or hot tub', b: 'A big new load usually means checking the panel size first.', plate: 5 },
        { t: 'Insurer asked for an update', b: 'Your insurance wants the old panel looked at or replaced.', plate: 6, tag: true },
      ],
    },
    diy: { photo: PH.ig03 },
    process: {
      h2: ['From a photo', 'to a labelled panel.'], lead: 'One cable, pulled through five studs the way he does it on a rough-in. Each hole is one step.',
      steps: [{ t: 'Photo or visit', b: 'Text a photo of the panel and the meter, or he comes to look.' }, STEP.price, STEP.permit,
        { t: 'Upgrade day', b: 'Power goes off while the new panel goes in.' }, STEP.label],
      foot: 'Step 5 is where the label goes on.',
    },
    compare: { before: PH.ig39, after: PH.ig61 },
    pricing: {
      lead: 'Every panel is different, so there is no price list here. These five things decide it, and you hear the number before any work starts.',
      rows: [
        { t: 'Panel size', b: '100A to 200A, or a full new panel with more spaces.' },
        { t: 'Distance to the meter', b: 'How far the new panel sits from the meter base.' },
        { t: 'The permit', b: 'The City of Surrey permit for regulated work.' },
        { t: 'Extra circuits', b: 'An EV charger, heat pump or hot tub added at the same time.' },
        { t: 'Wall repair', b: 'Drywall opened around the panel, then patched.' },
      ], slider: true,
    },
    signoff: { jobs: [
      { photo: PH.ig57, cap: ['Condo hallway · commercial', 'Condo hallway'], job: 'Condo hallway lights', type: 'Commercial', work: 'Ceiling fixtures wired and installed along the hallway.' },
      { photo: PH.ig40, cap: ['Modern chandelier · home', 'Modern chandelier'], job: 'Modern chandelier', type: 'Lighting · home', work: 'A sputnik-style chandelier hung and wired.' },
      { photo: PH.ig23, cap: ['Crystal chandelier · home', 'Crystal chandelier'], job: 'Crystal chandelier', type: 'Lighting · home', work: 'Crystal chandelier installed in a Surrey home.' },
    ] },
    why: {
      h2: ['Why Khinda', 'for your panel.'], lead: 'Four connections he twists tight on a panel swap, one reason each.',
      items: [
        { k: 'Sized to your load', t: 'Sized to your load', b: 'Before he picks 100A, 125A or 200A, he looks at what you run now and what you plan to add: an EV charger, a heat pump, a hot tub.', src: 'From the load calculation on this page.' },
        { k: 'Built to today’s code', t: 'Built to today’s code', b: 'New panels go in to the BC Electrical Code in force now: the CEC 26th edition, in force since 4 March 2025.', src: 'BC Electrical Code · CEC 26th ed., in force 4 Mar 2025.' },
        { k: 'Tidy behind the door', t: 'Tidy behind the door', b: 'Conductors bundled and run square, the way his finished panels look in his Instagram posts.', src: '@khinda__electrical · his panel posts.' },
        { k: 'Room for the next circuit', t: 'Room for the next circuit', b: 'A new panel with free spaces, so an EV charger, a heat pump or a hot tub can go in later.', src: 'Signs 02 and 05 on this page.' },
      ],
    },
    prevent: true,
    faq: {
      eyebrow: 'Questions · Panel upgrades', h2: ['Questions people ask', 'before an upgrade.'],
      items: [
        { q: '100A or 200A?', a: 'Many homes adding an EV charger or a heat pump need 200A. A load calculation on your panel decides it, and he walks you through the result before any work starts.', link: { t: ['Ask about your panel: 236-818-2664 →', 'Ask about your panel: 236-818-2664 →'], href: 'tel:+12368182664' } },
        { q: 'Do I need BC Hydro for this?', a: 'Your meter and service are BC Hydro’s. Text a photo of the panel and the meter: he tells you what the upgrade needs before the day.', link: { t: 'Text a photo of the panel →', href: 'sms:+12368182664' } },
        { q: 'How long does an upgrade take?', a: 'He tells you after seeing the panel. Every panel is different: a photo of the panel and the label inside the door helps.', link: { t: 'Text a photo of the panel →', href: 'sms:+12368182664' } },
        { q: 'Will I lose power all day?', a: 'Power goes off while the new panel goes in. He tells you before the day.', link: { t: 'Ask about your panel: 236-818-2664 →', href: 'tel:+12368182664' } },
      ],
    },
    related: { h2: ['Planning more', 'than the panel?'], items: [{ ...REL.ev, photo: PH.ig49 }, { ...REL.repairs, photo: PH.ig17 }, { ...REL.renos, photo: PH.ig12 }], towns: false },
    cta: { eyebrow: 'Not sure what size you need', h2: ['Send a photo', 'of your panel.'], lead: 'Frame the whole panel and the label inside the door. He reads the size and the spaces from the photo and tells you what the upgrade needs.', frame: ['Frame the panel + door label', 'Panel + door label'], btn: 'Text a photo of your panel' },
  },
  {
    slug: 'ev-charger-installation', name: 'EV charger installation', title: 'EV Charger Installation in Surrey, BC · Khinda',
    description: 'EV charger installation in Surrey, BC, on a City of Surrey permit. BC Hydro rebate up to 50%, max $350. Text a photo of your panel to 236-818-2664.',
    h1: ['EV Charger Installation', 'in Surrey'], eyebrow: 'EV chargers · Surrey, BC',
    lead: 'Home EV chargers in Surrey need a permit, and a licensed contractor applies. The BC Hydro rebate (up to 50%, max $350) asks for a licensed electrician and that permit. Panel space comes first.',
    facts: [{ k: 'Permit', v: 'City of Surrey' }, { k: 'Rebate', v: 'BC Hydro, max $350' }, { k: 'Code', v: 'CEC 26th ed.' }],
    hero: { bg: PH.ig01, plate: { ...PH.ig49, cap: 'Outdoor cable run · Surrey area' } },
    form: FORM_GENERIC('Price your charger', 'Panel today', ['100A', '125A', '200A', 'Not sure'], 'Home', ['House', 'Townhouse', 'Strata', 'Not sure'], '+ Add a photo of the panel'),
    quick: {
      h2: ['Do you need a permit', 'for an EV charger?'],
      answer: 'Yes. In Surrey the City issues electrical permits and a licensed contractor applies, after a load calculation on your panel. The BC Hydro home charger rebate, up to 50% and max $350, needs a licensed electrician and the permit. Khinda gives the price after seeing your panel.',
      ask: ['Ask about your charger: 236-818-2664 →', 'Ask about your charger →'], label: 'Job facts · EV charger',
      rows: [ROW.permit, ROW.who,
        { k: 'Load check', v: 'Service capacity + load calculation.', src: 'City of Surrey: a Licensed Electrical Contractor must assess service capacity and load calculation.' },
        { k: 'Rebate', v: 'Up to 50%, max $350.', src: 'BC Hydro home charger rebate, program guide dated 15 Jul 2026. Apply within 180 days of the charger invoice.' },
        { k: 'Tesla chargers', v: 'Not eligible for the rebate now.', src: 'BC Hydro guide, 15 Jul 2026: Tesla-manufactured EV chargers are not eligible at this time.' },
        ROW.code],
      sources: 'Sources · City of Surrey · BC Hydro · CEC',
    },
    diy: { photo: PH.ig39 },
    process: {
      h2: ['From a photo', 'to a charger on the wall.'], lead: 'One cable, pulled through five studs the way he does it on a rough-in. Each hole is one step.',
      steps: [{ t: 'Photo or visit', b: 'Text a photo of the panel and where the charger goes, or he comes to look.' },
        STEP.price, STEP.permit,
        { t: 'Install day', b: 'The charger goes in to the BC Electrical Code.' },
        { t: 'Papers for the rebate', b: 'BC Hydro asks for the installation invoice and the electrical permit.' }],
      foot: 'Step 5 is what the rebate asks for.',
    },
    pricing: {
      lead: 'Every home is different, so there is no price list here. These things decide it, and you hear the number before any work starts.',
      rows: [
        { t: 'Panel space', b: 'A big new load usually means checking the panel size first.' },
        { t: 'Distance to the panel', b: 'How far the charger sits from the panel.' },
        { t: 'The permit', b: 'The City of Surrey permit for regulated work.' },
        { t: 'Panel upgrade', b: '100A to 200A, if the load calculation asks for it.' },
      ], slider: false,
    },
    why: WHY_GENERIC,
    faq: {
      eyebrow: 'Questions · EV chargers', h2: ['Questions people ask', 'before a charger.'],
      items: [
        { q: 'Is there a rebate for a home EV charger?', a: 'BC Hydro home charger rebate: up to 50%, max $350, with a licensed electrician and a permit. Apply within 6 months of the charger invoice (BC Hydro guide, 15 Jul 2026).' },
        { q: 'Do I need a permit for an EV charger?', a: 'Yes. In Surrey the City issues electrical permits (Bylaw 15596) and a licensed contractor applies, after a load calculation on your panel.' },
        { q: 'Will my panel take a charger?', a: 'A big new load usually means checking the panel size first. Text a photo of your panel and the label inside the door to 236-818-2664.', link: { t: 'Text a photo of the panel →', href: 'sms:+12368182664' } },
        { q: 'Are Tesla chargers covered by the rebate?', a: 'Not at this time: BC Hydro’s guide of 15 Jul 2026 says Tesla-manufactured EV chargers are not eligible.' },
      ],
    },
    related: { h2: ['Planning more', 'than the charger?'], items: [{ ...REL.panel, photo: PH.ig61 }, { ...REL.newc, photo: PH.ig11 }, { ...REL.repairs, photo: PH.ig45 }], towns: true },
    cta: { eyebrow: 'Not sure your panel can take it', h2: ['Send a photo', 'of your panel.'], lead: 'Frame the whole panel and the label inside the door. He reads the size and the spaces from the photo and tells you what the charger needs.', frame: ['Frame the panel + door label', 'Panel + door label'], btn: 'Text a photo of your panel' },
  },
  {
    slug: 'lighting-pot-lights', name: 'Lighting and pot lights', title: 'Pot Lights & Lighting Installation Surrey · Khinda',
    description: 'Pot lights, chandeliers, pendants and soffit lights in Surrey, BC, from his own jobs. Text a photo of the room to 236-818-2664.',
    h1: ['Pot Lights & Lighting', 'in Surrey'], eyebrow: 'Lighting · Surrey, BC',
    lead: 'Pot lights, chandeliers, pendants and soffit lights in Surrey, all from his own jobs. Regulated electrical work runs on a City of Surrey permit. Text a photo of the room to start.',
    facts: [{ k: 'Inside', v: 'Pot lights, chandeliers' }, { k: 'Outside', v: 'Soffit + garden lights' }, { k: 'Permit', v: 'City of Surrey' }],
    hero: { bg: PH.ig46, plate: { ...PH.ig43, cap: 'Ring chandelier · home' } },
    form: FORM_GENERIC('Price your lights', 'The job', ['Pot lights', 'Chandelier', 'Pendants', 'Outdoor'], 'Where', ['Home', 'Suite', 'Shop', 'Not sure'], '+ Add a photo of the room'),
    quick: {
      h2: ['Do new lights', 'need a permit?'],
      answer: 'For regulated electrical work, yes: in Surrey the City issues electrical permits and a licensed contractor applies. Pot lights, chandeliers, pendants and soffit lights are all on his Instagram. A photo of the room and the switch helps. Khinda gives the price after seeing the job.',
      ask: ['Ask about your lights: 236-818-2664 →', 'Ask about your lights →'], label: 'Job facts · Lighting',
      rows: [ROW.permit, ROW.who, ROW.code, ROW.strata,
        { k: 'His jobs', v: 'Pot lights, chandeliers, soffits.', src: '@khinda__electrical: pot lights, chandeliers, pendants, soffit and garden lights.' }],
      sources: SOURCES,
    },
    diy: { photo: PH.ig21 },
    process: {
      h2: ['From a photo', 'to the lights on.'], lead: 'One cable, pulled through five studs the way he does it on a rough-in. Each hole is one step.',
      steps: [{ t: 'Photo or visit', b: 'Text a photo of the room or the fixture, or he comes to look.' },
        { t: 'The price', b: 'Given after he sees the job, before any work starts.' }, STEP.permit,
        { t: 'Install day', b: 'The lights go in, wired to the BC Electrical Code.' }, STEP.label],
      foot: 'Step 5 is where the label goes on.',
    },
    signoff: { jobs: [
      { photo: PH.ig40, cap: ['Modern chandelier · home', 'Modern chandelier'], job: 'Modern chandelier', type: 'Lighting · home', work: 'A sputnik-style chandelier hung and wired.' },
      { photo: PH.ig23, cap: ['Crystal chandelier · home', 'Crystal chandelier'], job: 'Crystal chandelier', type: 'Lighting · home', work: 'Crystal chandelier installed in a Surrey home.' },
      { photo: PH.ig09, cap: ['Soffit lights · home', 'Soffit lights'], job: 'Soffit lights', type: 'Outdoor · home', work: 'Soffit lights on the house exterior, wired and on.' },
    ] },
    why: WHY_GENERIC,
    faq: {
      eyebrow: 'Questions · Lighting', h2: ['Questions people ask', 'before new lights.'],
      items: [
        { q: 'Do you install pot lights?', a: 'Yes. Pot lights, chandeliers, pendants and soffit lights are all on his Instagram, @khinda__electrical. Text a photo of the room to 236-818-2664.' },
        { q: 'Do new lights need a permit in Surrey?', a: 'For regulated electrical work, yes. The City of Surrey issues electrical permits (Bylaw 15596) and a licensed contractor applies.' },
        { q: 'Do you do outdoor lights?', a: 'Yes: soffit lights on a house exterior and a cable run along the fence line for garden lights are both jobs from his Instagram.' },
        { q: 'Do you do lighting for shops?', a: 'Yes. Barbershop and shop reception lighting are on his Instagram: all domestic, commercial work and renovations.' },
      ],
    },
    related: { h2: ['Planning more', 'than the lights?'], items: [{ ...REL.ev, photo: PH.ig49 }, { ...REL.renos, photo: PH.ig12 }, { ...REL.comm, photo: PH.ig20 }], towns: true },
    cta: CTA_JOB,
  },
  {
    slug: 'new-construction-wiring', name: 'New construction wiring', title: 'New Home & Suite Wiring in Surrey · Khinda',
    description: 'New construction wiring in Surrey, BC: rough-in to finish, built to the CEC 26th edition, every circuit labelled. Call or text 236-818-2664.',
    h1: ['New Construction Wiring', 'in Surrey'], eyebrow: 'New construction · Surrey, BC',
    lead: 'New homes and suites in Surrey, wired rough-in to finish to the BC Electrical Code, with every circuit labelled on the panel door. A licensed contractor applies for the City of Surrey permit.',
    facts: [{ k: 'Scope', v: 'Rough-in to finish' }, { k: 'Code', v: 'CEC 26th ed.' }, { k: 'Door', v: 'Every circuit labelled' }],
    hero: { bg: PH.ig11, plate: { ...PH.ig57, cap: 'Condo hallway · commercial' } },
    form: FORM_GENERIC('Price your build', 'The build', ['New home', 'Suite', 'Addition', 'Commercial'], 'Stage', ['Plans', 'Framing', 'Rough-in', 'Not sure'], '+ Add a photo of the site'),
    quick: {
      h2: ['Wiring a new home', 'or suite?'],
      answer: 'New wiring needs a permit: in Surrey the City issues electrical permits and a licensed contractor applies. It goes in to the BC Electrical Code, the CEC 26th edition, in force since 4 March 2025. Khinda wires rough-in to finish, labels every circuit on the door and gives the price after seeing the site.',
      ask: ['Ask about your build: 236-818-2664 →', 'Ask about your build →'], label: 'Job facts · New construction',
      rows: [ROW.permit, ROW.who, ROW.code, { k: 'Panel door', v: 'Every circuit labelled.', src: '@khinda__electrical: rough-in and finished panel posts.' }],
      sources: SOURCES,
    },
    process: {
      h2: ['From a photo', 'to a labelled panel.'], lead: 'One cable, pulled through five studs the way he does it on a rough-in. Each hole is one step.',
      steps: [{ t: 'Photo or visit', b: 'Text photos of the site, or he comes to look.' },
        { t: 'The price', b: 'Given after he sees the site, before any work starts.' }, STEP.permit,
        { t: 'Rough-in', b: 'Cable pulled through the studs before the drywall goes up.' }, STEP.label],
      foot: 'Step 5 is where the label goes on.',
    },
    compare: { before: PH.ig39, after: PH.ig61 },
    why: WHY_GENERIC,
    faq: {
      eyebrow: 'Questions · New construction', h2: ['Questions people ask', 'before a new build.'],
      items: [
        { q: 'Do you wire new builds?', a: 'Yes: rough-in to finish, new builds too. His rough-in and finished panels are on his Instagram, @khinda__electrical.' },
        { q: 'Does new wiring need a permit in Surrey?', a: 'Yes. The City of Surrey issues electrical permits (Bylaw 15596) and a licensed contractor applies.' },
        { q: 'Which code does new wiring follow?', a: 'The BC Electrical Code: the Canadian Electrical Code, 26th edition, in force since 4 March 2025.' },
        { q: 'Is the panel labelled?', a: 'Yes: every circuit named on the door, like the panels on his Instagram.' },
      ],
    },
    related: { h2: ['Planning more', 'than the wiring?'], items: [{ ...REL.panel, photo: PH.ig01 }, { ...REL.renos, photo: PH.ig12 }, { ...REL.lighting, photo: PH.ig40 }], towns: true },
    cta: CTA_JOB,
  },
  {
    slug: 'renovations-basement-suites', name: 'Renovations and basement suites', title: 'Renovation & Basement Suite Wiring Surrey',
    description: 'Renovation and basement suite wiring in Surrey, BC: rough-in to finish, panel sized for the new space, City of Surrey permit. Call or text 236-818-2664.',
    h1: ['Renovation Electrical', 'in Surrey'], eyebrow: 'Renos + suites · Surrey, BC',
    lead: 'Renos and basement suites in Surrey, rough-in to finish, with the panel sized for the new space. A licensed contractor applies for the permit; strata owners can’t get a homeowner permit.',
    facts: [{ k: 'Permit', v: 'City of Surrey' }, { k: 'Panel', v: 'Sized for the space' }, { k: 'Door', v: 'Every circuit labelled' }],
    hero: { bg: PH.ig46, plate: { ...PH.ig12, cap: 'Pot lights, feature wall' } },
    form: FORM_GENERIC('Price your reno', 'The space', ['Basement', 'Suite', 'Kitchen', 'Whole home'], 'Panel today', ['100A', '125A', '200A', 'Not sure'], '+ Add a photo of the space'),
    quick: {
      h2: ['Wiring a reno', 'or a suite?'],
      answer: 'It needs a permit: in Surrey the City issues electrical permits and a licensed contractor applies. Strata owners can’t get a homeowner permit. New rooms add load, so a load calculation on your panel decides what it needs. Khinda gives the price after seeing the space and the panel.',
      ask: ['Ask about your reno: 236-818-2664 →', 'Ask about your reno →'], label: 'Job facts · Renos + suites',
      rows: [ROW.permit, ROW.who, ROW.code, ROW.strata,
        { k: 'Panel', v: 'Sized for the new space.', src: 'A load calculation on your panel decides it.' }],
      sources: SOURCES,
    },
    diy: { photo: PH.ig39 },
    process: {
      h2: ['From a photo', 'to a finished space.'], lead: 'One cable, pulled through five studs the way he does it on a rough-in. Each hole is one step.',
      steps: [{ t: 'Photo or visit', b: 'Text a photo of the space and the panel, or he comes to look.' },
        { t: 'The price', b: 'Given after he sees the space, before any work starts.' }, STEP.permit,
        { t: 'Rough-in', b: 'Cable pulled through the studs before the drywall goes up.' }, STEP.label],
      foot: 'Step 5 is where the label goes on.',
    },
    why: WHY_GENERIC,
    faq: {
      eyebrow: 'Questions · Renos + suites', h2: ['Questions people ask', 'before a reno.'],
      items: [
        { q: 'Can you do the whole reno?', a: 'Yes. All domestic, commercial work and renovations: rough-in to finish, with the panel sized for the new space. Text a photo of the space to 236-818-2664.' },
        { q: 'Do I need a permit for a basement suite?', a: 'For the electrical work, yes. The City of Surrey issues electrical permits (Bylaw 15596) and a licensed contractor applies.' },
        { q: 'Will my panel handle the new space?', a: 'A load calculation on your panel decides it. Many homes adding an EV charger or a heat pump need 200A; a photo of the panel helps.', link: { t: 'Text a photo of the panel →', href: 'sms:+12368182664' } },
        { q: 'Can a strata owner get a homeowner permit?', a: 'No. Technical Safety BC: strata owners can’t get homeowner permits, so a licensed contractor applies.' },
      ],
    },
    related: { h2: ['Planning more', 'than the reno?'], items: [{ ...REL.panel, photo: PH.ig61 }, { ...REL.lighting, photo: PH.ig43 }, { ...REL.newc, photo: PH.ig11 }], towns: true },
    cta: CTA_JOB,
  },
  {
    slug: 'commercial-electrical', name: 'Commercial electrical', title: 'Commercial Electrician in Surrey, BC · Khinda',
    description: 'Commercial electrical work in Surrey, BC: shop fit-outs, barbershops, condo hallways and fire alarm panels. Call or text 236-818-2664.',
    h1: ['Commercial Electrical', 'in Surrey'], eyebrow: 'Commercial · Surrey, BC',
    lead: 'Shop fit-outs, barbershops, condo hallways and fire alarm panels in Surrey. All domestic, commercial work and renovations. In Surrey the City issues the permit and a licensed contractor applies.',
    facts: [{ k: 'Shops', v: 'Fit-outs + lighting' }, { k: 'Fire alarm', v: 'Panels' }, { k: 'Permit', v: 'City of Surrey' }],
    hero: { bg: PH.ig21, plate: { ...PH.ig20, cap: 'Barbershop lights · commercial' } },
    form: FORM_GENERIC('Price your job', 'The space', ['Shop', 'Office', 'Strata', 'Other'], 'The job', ['Lighting', 'Fit-out', 'Fire alarm', 'Repair'], '+ Add a photo of the space'),
    quick: {
      h2: ['Fitting out', 'a shop or unit?'],
      answer: 'Khinda does commercial work in Surrey: barbershop and shop lighting, condo hallways and fire alarm panels are all on his Instagram. Regulated work needs a permit: the City of Surrey issues it and a licensed contractor applies. A photo of the space helps, and he gives the price after seeing it.',
      ask: ['Ask about your job: 236-818-2664 →', 'Ask about your job →'], label: 'Job facts · Commercial',
      rows: [ROW.permit, ROW.who, ROW.code,
        { k: 'Home business', v: 'No homeowner permit.', src: 'Technical Safety BC: those operating a business from their home cannot obtain homeowner permits.' },
        { k: 'His jobs', v: 'Shops, barbershops, condo halls.', src: '@khinda__electrical: “All domestic, commercial work, Renovations”.' }],
      sources: SOURCES,
    },
    process: {
      h2: ['From a photo', 'to the lights on.'], lead: 'One cable, pulled through five studs the way he does it on a rough-in. Each hole is one step.',
      steps: [{ t: 'Photo or visit', b: 'Text a photo of the space, or he comes to look.' },
        { t: 'The price', b: 'Given after he sees the space, before any work starts.' }, STEP.permit,
        { t: 'Fit-out', b: 'The work goes in to the BC Electrical Code.' }, STEP.label],
      foot: 'Step 5 is where the label goes on.',
    },
    signoff: { jobs: [
      { photo: PH.ig57, cap: ['Condo hallway · commercial', 'Condo hallway'], job: 'Condo hallway lights', type: 'Commercial', work: 'Ceiling fixtures wired and installed along the hallway.' },
      { photo: PH.ig03, cap: ['Fire alarm · commercial', 'Fire alarm panels'], job: 'Fire alarm panels', type: 'Commercial', work: 'Panels finished and closed up, ready for the fire alarm tech.' },
    ] },
    why: WHY_GENERIC,
    faq: {
      eyebrow: 'Questions · Commercial', h2: ['Questions people ask', 'before a fit-out.'],
      items: [
        { q: 'Do you do commercial units?', a: 'Yes. Shop fit-outs, barbershops, condo hallways and fire alarm panels: all domestic, commercial work and renovations. Send a photo of the job to 236-818-2664.' },
        { q: 'Do you do fire alarm work?', a: 'Yes: fire alarm panels finished and closed up, ready for the fire alarm tech, are on his Instagram.' },
        { q: 'Who takes out the permit for a shop?', a: 'In Surrey the City issues electrical permits (Bylaw 15596) and a licensed contractor applies.' },
        { q: 'Can I send a photo first?', a: ASK_PHOTO },
      ],
    },
    related: { h2: ['Planning more', 'than the fit-out?'], items: [{ ...REL.fire, photo: PH.ig01 }, { ...REL.lighting, photo: PH.ig17 }, { ...REL.repairs, photo: PH.ig45 }], towns: true },
    cta: CTA_JOB,
  },
  {
    slug: 'fire-alarm-systems', name: 'Fire alarm systems', title: 'Fire Alarm Electrical Work in Surrey · Khinda',
    description: 'Fire alarm electrical work for shops and commercial spaces in Surrey, BC: panels finished and closed up for the fire alarm tech. Call 236-818-2664.',
    h1: ['Fire Alarm', 'Systems'], eyebrow: 'Fire alarm · Surrey, BC',
    lead: 'Fire alarm panels for shops and commercial spaces in Surrey: panels finished and closed up, ready for the fire alarm tech. In Surrey the City issues electrical permits and a licensed contractor applies.',
    facts: [{ k: 'Work', v: 'Fire alarm panels' }, { k: 'For', v: 'Shops + commercial' }, { k: 'Permit', v: 'City of Surrey' }],
    hero: { bg: PH.ig01, plate: { ...PH.ig03, cap: 'Fire alarm panels · commercial' } },
    form: FORM_GENERIC('Price your job', 'The space', ['Shop', 'Office', 'Strata', 'Other'], 'The job', ['New panel', 'Add-on', 'Repair', 'Not sure'], '+ Add a photo of the panel'),
    quick: {
      h2: ['Fire alarm wiring', 'for a business?'],
      answer: 'Khinda Electrical does the electrical side of fire alarm panels for shops and commercial spaces in Surrey: panels finished and closed up, ready for the fire alarm tech. The City of Surrey issues electrical permits and a licensed contractor applies. Text a photo of the panel for the price.',
      ask: ['Ask about your panel: 236-818-2664 →', 'Ask about your panel →'], label: 'Job facts · Fire alarm',
      rows: [ROW.permit, ROW.who, ROW.code, { k: 'His jobs', v: 'Panels finished + closed up.', src: '@khinda__electrical: fire alarm panels, ready for the fire alarm tech.' }],
      sources: SOURCES,
    },
    process: {
      h2: ['From a photo', 'to a finished panel.'], lead: 'One cable, pulled through five studs the way he does it on a rough-in. Each hole is one step.',
      steps: [{ t: 'Photo or visit', b: 'Text a photo of the panel, or he comes to look.' },
        { t: 'The price', b: 'Given after he sees the job, before any work starts.' }, STEP.permit,
        { t: 'Install day', b: 'Panels finished and closed up, ready for the fire alarm tech.' }, STEP.label],
      foot: 'Step 5 is where the label goes on.',
    },
    why: WHY_GENERIC,
    faq: {
      eyebrow: 'Questions · Fire alarm', h2: ['Questions people ask', 'about fire alarm work.'],
      items: [
        { q: 'Do you do fire alarm panels?', a: 'Yes: fire alarm panels for shops and commercial spaces, finished and closed up, ready for the fire alarm tech. The job is on his Instagram.' },
        { q: 'Do you do commercial units?', a: 'Yes. Shop fit-outs, barbershops, condo hallways and fire alarm panels: all domestic, commercial work and renovations.' },
        { q: 'Who takes out the permit?', a: 'In Surrey the City issues electrical permits (Bylaw 15596) and a licensed contractor applies.' },
      ],
    },
    related: { h2: ['Planning more', 'than the alarm?'], items: [{ ...REL.comm, photo: PH.ig20 }, { ...REL.repairs, photo: PH.ig45 }, { ...REL.newc, photo: PH.ig11 }], towns: true },
    cta: CTA_JOB,
  },
  {
    slug: 'repairs-troubleshooting', name: 'Repairs and troubleshooting', title: 'Electrical Repairs in Surrey, BC · Khinda',
    description: 'Electrical repairs in Surrey, BC: tripping breakers, flicker and dead outlets, traced to the circuit. Call or text a photo to 236-818-2664.',
    h1: ['Electrical Repairs', '& Troubleshooting'], eyebrow: 'Repairs · Surrey, BC',
    lead: 'Tripping breakers, flicker and dead outlets in Surrey, traced to the circuit. Reset a breaker once; if it trips again, leave it off and call 236-818-2664.',
    facts: [{ k: 'Traced', v: 'To the circuit' }, { k: 'Permit', v: 'City of Surrey' }, { k: 'Code', v: 'CEC 26th ed.' }],
    hero: { bg: PH.ig39, plate: { ...PH.ig45, cap: 'Wall sconce · home' } },
    form: FORM_GENERIC('Describe the problem', 'What’s off', ['Breaker trips', 'Flicker', 'Dead outlet', 'Warm outlet'], 'Where', ['Home', 'Suite', 'Shop', 'Not sure'], '+ Add a photo of the problem'),
    quick: {
      h2: ['Breaker keeps', 'tripping?'],
      answer: 'Reset it once. If it trips again, leave it off and call, and note what was running when it went: the kettle, the dryer, the heater. Flicker when big appliances kick on, or a warm, buzzing outlet, are reasons to call too. Khinda traces it to the circuit and gives the price before work starts.',
      ask: ['Ask about the problem: 236-818-2664 →', 'Ask about the problem →'], label: 'Job facts · Repairs',
      rows: [ROW.permit, ROW.who, ROW.code, ROW.strata],
      sources: SOURCES,
    },
    signs: {
      lead: 'Each one ends the same way: call, or text a photo of your panel and the label inside the door.',
      items: [
        { t: 'Breakers keep tripping', b: 'The same breaker goes off when the kettle and the heater run together.', more: 'If it trips again, leave it off and call. Note what was running when it went.', plate: 1 },
        { t: 'No free spaces', b: 'Every slot in the panel is full, so nothing new can go in.', plate: 2 },
        { t: 'Old fuse panel', b: 'Screw-in fuses instead of breakers, common in older homes.', plate: 3 },
        { t: 'Lights flicker', b: 'They dim when the dryer, oven or AC kicks on.', plate: 4 },
        { t: 'A warm outlet', b: 'Warm, buzzing or brown around the slots: unplug what is in it and call.', plate: 5 },
        { t: 'Dead outlets', b: 'Outlets with no power. Reset the breaker once; if they stay dead, call.', plate: 6 },
      ],
    },
    diy: { photo: PH.ig01 },
    process: {
      h2: ['From a photo', 'to the power back on.'], lead: 'One cable, pulled through five studs the way he does it on a rough-in. Each hole is one step.',
      steps: [{ t: 'Photo or visit', b: 'Text a photo of the panel and the problem, or he comes to look.' },
        { t: 'The price', b: 'Given after he sees the job, before any work starts.' }, STEP.permit,
        { t: 'Repair day', b: 'Traced to the circuit and fixed to the BC Electrical Code.' }, STEP.label],
      foot: 'Step 3 only where the repair needs a permit.',
    },
    why: WHY_GENERIC,
    prevent: true,
    faq: {
      eyebrow: 'Questions · Repairs', h2: ['Questions people ask', 'when the power acts up.'],
      items: [
        { q: 'My breaker keeps tripping. What do I do?', a: 'Reset it once. If it trips again, leave it off and call, and note what was running when it went: the kettle, the dryer, the heater. It helps him find the circuit.' },
        { q: 'Is a warm outlet a problem?', a: 'Warm, buzzing or brown around the slots: unplug what is in it and call 236-818-2664.' },
        { q: 'Can I send a photo first?', a: ASK_PHOTO, link: { t: 'Text the photo: 236-818-2664 →', href: 'sms:+12368182664' } },
      ],
    },
    related: { h2: ['Planning more', 'than the repair?'], items: [{ ...REL.panel, photo: PH.ig61 }, { ...REL.lighting, photo: PH.ig17 }, { ...REL.ev, photo: PH.ig49 }], towns: true },
    cta: { ...CTA_JOB, h2: ['Send a photo', 'of the problem.'], lead: 'Frame the outlet, the switch or your panel and the label inside the door. He looks at the photo and tells you what the job is.', btn: 'Text a photo of the problem' },
  },
];

// Per-service page text for the 13 service pages + the emergency page (owned by the services builder).
// Source: site-copy 03, 04 and 13. Anything Jim still has to confirm is wrapped in <em class="ph">…</em>
// so it stays visible as a placeholder until he answers. No prices, no ratings, no licence words.
import drainBg from '../assets/img/standin-drain.jpg';
import whBg from '../assets/img/standin-water-heater.jpg';
import rooterBg from '../assets/img/standin-rooter.png';
import gasBg from '../assets/img/standin-gas.jpg';
import hydroBg from '../assets/img/standin-hydro.jpg';
import camBg from '../assets/img/standin-sewer-camera.jpg';
import dusk from '../assets/img/dusk-street.jpg';
import nightPipes from '../assets/img/night-pipes.jpg';
import snake from '../assets/img/job-drain-snake.jpg';
import crawl from '../assets/img/job-crawlspace.jpg';
import whJob from '../assets/img/job-water-heater.jpg';
import roof from '../assets/img/job-roof.jpg';
import van from '../assets/img/jim-van.jpg';

const ph = (s: string) => `<em class="ph">${s}</em>`;
const PRICE = `It depends on the job. ${ph('Starting price: Jim to confirm')} You get the price before we start.`;

export interface Photo { src: ImageMetadata; alt: string; standIn?: boolean; real?: boolean; pos?: string }
export type Block =
  | { type: 'p'; html: string }
  | { type: 'steps'; items: { b: string; t: string }[] }
  | { type: 'numbered'; items: string[] }
  | { type: 'alert'; title: string; items: string[]; note?: string }
  | { type: 'checks'; items: string[] }
  | { type: 'tip'; title: string; html: string; icon?: string }
  | { type: 'cards'; items: { t: string; d: string; icon: string }[] }
  | { type: 'wait'; title: string; items: { k: string; t: string }[] }
  | { type: 'towns'; html: string };
export interface GuideSection { id: string; title: string; toc: string; blocks: Block[] }
export interface ClearCard { title: string; icon: string; notice: string[]; fix: string }
export interface CompareSide { title: string; sub: string; icon: string; rows: string[] }
export interface Faq { q: string; a: string }

export interface ServiceContent {
  slug: string;
  name: string;            // breadcrumb name
  eyebrow: string;
  h1: [string, string];    // white line(s) ('|' forces a line break), yellow line
  sub: string;
  problemsLabel: string;
  problems: string[];
  safety?: string;         // red bar above the hero (gas)
  hero: { bg: Photo; photo?: Photo };
  form: { title: string; sub: string; label: string; options: string[]; chips?: boolean };
  doNow?: { title: string; steps: string[] };
  clear: { eyebrow: string; h: [string, string]; lead?: string; cards: ClearCard[]; foot: string };
  status?: { label?: string; title: string; rows: { t: string; v: 'new' | 'check' | 'repair' }[]; legend: string; foot: string };
  why: { h: [string, string]; tag?: string; body: string; bullets: { b: string; t: string }[]; stat: { big: string; small: string }; photo: Photo };
  guide: { eyebrow: string; h: [string, string]; intro: string; sections: GuideSection[] };
  aside: { title: string; sub: string; slotHint?: string; tip: { title: string; text: string; href: string; label: string; icon: string } };
  compare?: { eyebrow: string; h: [string, string]; labels: string[]; left: CompareSide; right: CompareSide; note: string };
  crew: 'why' | 'family';
  crewLine?: string;
  cta: { eyebrow: string; h: [string, string]; sub: string };
  faqIntro: string;
  faqs: Faq[];
  related: string[];
  relatedLine: string;
  relatedEyebrow: string;
  contact: { line1: string; line2: string; text: string };
  hubLine: string;         // one line on the /services/ hub
}

const T = (slug: string, name: string) => `<a href="/${slug}/">${name}</a>`;
const towns = (list: [string, string][], lead: string) =>
  `${lead} ${list.map(([s, n]) => T(s, n)).slice(0, -1).join(', ')} and ${T(list[list.length - 1][0], list[list.length - 1][1])}. See <a href="/areas/">all areas</a>.`;
const CLA: [string, string] = ['plumber-claremont', 'Claremont'];
const LAV: [string, string] = ['plumber-la-verne', 'La Verne'];
const MON: [string, string] = ['plumber-montclair', 'Montclair'];
const UPL: [string, string] = ['plumber-upland', 'Upland'];
const ONT: [string, string] = ['plumber-ontario', 'Ontario'];
const CHI: [string, string] = ['plumber-chino', 'Chino'];
const CHH: [string, string] = ['plumber-chino-hills', 'Chino Hills'];
const DIA: [string, string] = ['plumber-diamond-bar', 'Diamond Bar'];
const SAN: [string, string] = ['plumber-san-dimas', 'San Dimas'];
const WAL: [string, string] = ['plumber-walnut', 'Walnut'];
const RAN: [string, string] = ['plumber-rancho-cucamonga', 'Rancho Cucamonga'];

const P = {
  snake: { src: snake, alt: 'Jim feeding a drain machine cable into a clogged line on a real job', real: true },
  crawl: { src: crawl, alt: 'A Galvez brother working on drain pipes in a crawl space', real: true },
  wh: { src: whJob, alt: 'Installing a new water heater outside a Pomona home', real: true },
  roof: { src: roof, alt: 'The United Plumbing crew carrying equipment up a ladder to a roof', real: true },
  van: { src: van, alt: 'Jaime “Jim” Galvez standing next to the United Plumbing work truck', real: true, pos: '30% 40%' },
  dusk: { src: dusk, alt: '' },
  night: { src: nightPipes, alt: '' },
} satisfies Record<string, Photo>;

export const CONTENT: Record<string, ServiceContent> = {
  /* ------------------------------------------------------------------ DRAIN CLEANING (Figma template) */
  'drain-cleaning-pomona': {
    slug: 'drain-cleaning-pomona', name: 'Drain cleaning', eyebrow: 'Drain cleaning · Pomona, CA',
    h1: ['Drain cleaning', 'in Pomona, CA'],
    sub: 'Clogged sink, slow shower or backed-up drain? We clear it fast. Family owned since 2018, open 24/7.',
    problemsLabel: '3 common problems we clear',
    problems: ['Kitchen sink full of greasy water', 'Shower or tub draining slow', 'Toilet or floor drain backing up'],
    hero: { bg: { src: drainBg, alt: 'A plumber clearing a kitchen sink drain with a hand auger (stand-in photo)', standIn: true, pos: '70% 50%' } },
    form: { title: 'Clogged? Get a call back', sub: 'Leave your number. We call you back.', label: "What's clogged?", options: ['Kitchen sink', 'Bathroom sink', 'Shower or tub', 'Toilet', 'Floor drain', 'More than one drain', 'Not sure'] },
    clear: {
      eyebrow: 'What we clear', h: ['Drain cleaning in Pomona for', 'sinks, tubs and toilets'],
      cards: [
        { title: 'Greasy|kitchen sink', icon: 'drop', notice: ['Water sits in the sink after dinner', 'It drains slower every week', 'Rice and food scraps come back up'], fix: `We run a drain machine down the line, cut through the grease and test it with hot water. If it keeps clogging, hydro jetting washes the pipe walls clean. ${ph('Jetter on the truck: Jim to confirm')}` },
        { title: 'Slow shower|or tub', icon: 'drop', notice: ['You stand in water while you shower', 'Hair and soap scum at the drain', 'A crusty ring from hard water'], fix: "We clear the hair and soap out of the trap and the line, not just the stopper. Then we run water to prove it's clear." },
        { title: 'Backed-up toilet|or floor drain', icon: 'alert', notice: ['Water comes up in the shower when you flush', 'Gurgling from the toilet or drains', 'Water at a floor drain or yard cleanout'], fix: 'That often means the main sewer line. We find where the clog is, clear it, and suggest a camera look if it keeps coming back.' },
      ],
      foot: `More than one drain slow? That's a main line sign. <a href="tel:+19095870711">Call 909-587-0711.</a>`,
    },
    why: {
      h: ['Why choose us for', 'drain cleaning in Pomona'], tag: "Clogs come back. Ours don't come back as often.",
      body: 'Anyone can poke a hole in a clog. We find what caused it, clear the whole line, and tell you how to keep it clear.',
      bullets: [
        { b: 'We clear the line, not just the drain.', t: 'The clog is often farther down than you think.' },
        { b: 'We tell you what we found.', t: "Grease, hair, wipes or roots. You'll know." },
        { b: 'More than one drain slow?', t: "That's a main line sign. We check it." },
        { b: 'Clean work.', t: `Shoe covers on, mess cleaned up. ${ph('Jim to confirm')}` },
      ],
      stat: { big: '24/7', small: 'A real person picks up, day or night.' }, photo: P.snake,
    },
    guide: {
      eyebrow: 'The full guide', h: ['Drain cleaning in', 'Pomona, CA'],
      intro: 'A clogged drain never picks a good time. The sink fills up right after dinner. The shower turns into a bath on a work morning. United Plumbing clears clogged drains in homes across Pomona, from Phillips Ranch to Lincoln Park and the streets around Cal Poly Pomona and the Fairplex. We are a family-owned company, built by brothers in 2018, and we pick up the phone 24/7.',
      sections: [
        { id: 'clogs', toc: 'The clogs we see most', title: 'The clogs we see most in Pomona homes', blocks: [
          { type: 'p', html: '<strong>Kitchen sinks.</strong> Grease is the number one cause. Cooking oil and fat go down the drain warm and liquid. In the pipe they cool, harden and stick to the walls. Rice, coffee grounds and food scraps get caught in that layer. Over time the pipe gets smaller until water stops.' },
          { type: 'p', html: "<strong>Bathroom sinks, showers and tubs.</strong> Hair and soap. Hair wraps around the stopper and soap scum glues it together. Pomona's hard water makes it worse: minerals leave a crust inside the pipe that catches even more hair." },
          { type: 'p', html: '<strong>Toilets.</strong> Too much paper, "flushable" wipes (they don\'t break down like paper), kids\' toys and paper towels.' },
          { type: 'p', html: '<strong>Floor drains and laundry drains.</strong> Lint from washing machines, dirt and sediment. In older homes, these drains often tie into old cast-iron pipe that is rough inside and catches everything.' },
        ] },
        { id: 'older-homes', toc: 'Older homes, older pipes', title: 'Older homes, older pipes', blocks: [
          { type: 'p', html: 'Many Pomona homes were built before 1970. Some in the historic districts go back more than 100 years. Under those homes, drain pipes are often cast iron, and the sewer line out to the street is often clay. Cast iron rusts and scales on the inside. Clay pipe has joints every few feet, and tree roots grow into those joints looking for water. When we clear a drain in an older home and it comes right back, roots or a broken pipe are usually the reason. That\'s when we suggest a <a href="/sewer-camera-inspection-pomona/">sewer camera inspection</a> so you can see the problem yourself before you spend money on a bigger fix.' },
        ] },
        { id: 'how', toc: 'How we clear a drain', title: 'How we clear a drain', blocks: [
          { type: 'steps', items: [
            { b: 'We ask questions first.', t: 'Which drains are slow? Did it happen fast or over weeks? Any gurgling? The answers tell us where the clog probably is.' },
            { b: 'We pick the right tool.', t: 'A hand auger works for a toilet or a single sink. A drain machine (a motor-driven cable, often called a snake) reaches farther and cuts through hair, grease and small roots.' },
            { b: 'For lines that keep clogging,', t: `<a href="/hydro-jetting-pomona/">hydro jetting</a> uses high-pressure water to wash the pipe walls clean, not just punch a hole through the clog. ${ph('Jetter on the truck: Jim to confirm')}` },
            { b: 'We test it.', t: 'We run water through every drain we worked on before we leave.' },
            { b: 'We tell you what we found', t: 'and what you can do to keep it from coming back.' },
          ] },
        ] },
        { id: 'signs', toc: 'Signs you need a plumber', title: '', blocks: [
          { type: 'alert', title: 'Signs you need a plumber, not a plunger', items: ['Water backs up in the shower when you flush the toilet', 'More than one drain is slow at the same time', 'Gurgling sounds from drains or the toilet', 'A sewer smell inside or in the yard', 'Water coming up from a floor drain or the cleanout in the yard'], note: 'Any of these can mean the main sewer line is blocked. Stop running water and call (909) 587-0711.' },
        ] },
        { id: 'keep-clear', toc: 'How to keep drains clear', title: 'How to keep drains clear', blocks: [
          { type: 'checks', items: ['Pour grease into a can, let it cool, throw it in the trash.', 'Use a strainer in the kitchen sink and a hair catcher in the shower.', 'Don\'t flush wipes, even ones that say "flushable."', 'Run hot water for a minute after using the kitchen sink.', "If a drain is getting slow, call before it stops. It's an easier job."] },
        ] },
        { id: 'near', toc: 'Drain cleaning near Pomona', title: 'Drain cleaning near Pomona', blocks: [
          { type: 'towns', html: towns([CLA, LAV, MON, UPL, ONT, CHI, DIA, SAN], 'We clear drains in Pomona (91766, 91767, 91768) and nearby towns including') },
        ] },
        { id: 'call', toc: 'Call United Plumbing', title: 'Call United Plumbing', blocks: [
          { type: 'p', html: "Day or night, call (909) 587-0711. A real person answers. Tell us what's clogged and where you are, and we'll tell you when we can be there." },
        ] },
      ],
    },
    aside: { title: 'Clogged right now?', sub: 'A real person picks up, day or night.', slotHint: 'Best: a cleared drain line or the drain machine on a real Pomona job', tip: { title: 'Drain keeps coming back?', text: "A sewer camera inspection shows you what's in the pipe before you spend money on a bigger fix.", href: '/sewer-camera-inspection-pomona/', label: 'See sewer camera inspection', icon: 'video' } },
    crew: 'why',
    cta: { eyebrow: 'Need a drain cleared?', h: ['Need a drain', 'cleared in Pomona?'], sub: 'Call now. A real person picks up, day or night.' },
    faqIntro: 'What Pomona homeowners ask us most about clogged drains. Anything else, just call.',
    faqs: [
      { q: 'Should I use drain cleaner from the store?', a: "We don't recommend it. Strong drain cleaners can hurt old pipes and burn skin. And if it doesn't work, the plumber has to work in that chemical water." },
      { q: 'Why does my kitchen sink keep clogging?', a: 'Usually grease. It goes down warm, cools in the pipe and sticks. Food scraps stick to it. Over months the pipe gets smaller.' },
      { q: 'More than one drain is slow. What does that mean?', a: "It often means the main sewer line is blocked, not one drain. Call us. Don't keep flushing." },
      { q: 'Can you clean my drain the same day?', a: `Most of the time, yes. ${ph('Same-day: Jim to confirm')}` },
      { q: 'How much does drain cleaning cost?', a: `It depends on which drain and how far the clog is. ${ph('Starting price: Jim to confirm')} We tell you the price before we start.` },
      { q: 'Do you clean drains for businesses?', a: `Yes. Call and tell us about the job. ${ph('Commercial work: Jim to confirm')}` },
    ],
    related: ['hydro-jetting-pomona', 'rooter-service-pomona', 'sewer-camera-inspection-pomona'], relatedEyebrow: 'More drain & sewer help', relatedLine: 'Drain keeps coming back? One of these is usually the next step.',
    contact: { line1: "Tell us what's", line2: 'clogged.', text: "Kitchen sink, shower, toilet or more than one drain? Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: 'Slow or stopped sinks, tubs and showers.',
  },

  /* ------------------------------------------------------------------ WATER HEATERS (Figma variant) */
  'water-heater-pomona': {
    slug: 'water-heater-pomona', name: 'Water heaters', eyebrow: 'Water heaters · Pomona, CA',
    h1: ['Water heater|repair & replacement', 'in Pomona'],
    sub: 'Hot water back, fast. Tank or tankless, all brands.',
    problemsLabel: 'Sounds like yours?',
    problems: ['No hot water, or it runs out fast', 'Leaking from the bottom', 'Popping or rumbling noise'],
    hero: { bg: P.dusk, photo: P.wh },
    form: { title: 'Get your hot water back', sub: "Leave your number. Jim's team calls you back.", label: "What's going on?", options: ['No hot water', 'Leaking', 'Noisy', 'Want a new one', 'Tankless', 'Not sure'], chips: true },
    clear: {
      eyebrow: 'Water heater service', h: ['Water heater repair|in Pomona for cold', 'showers, leaks & noise'],
      lead: 'Nobody notices a water heater until the shower turns cold. We repair and replace tank and tankless water heaters in homes across Pomona and the towns around it.',
      cards: [
        { title: 'No hot water, or it runs out fast', icon: 'drop', notice: [], fix: 'Often a pilot, thermostat, element or valve. We check the cheap fixes first.' },
        { title: 'Leaking from the bottom', icon: 'alert', notice: [], fix: 'Shut the cold water valve on top of the tank. Then call us.' },
        { title: 'Popping or rumbling noise', icon: 'zap', notice: [], fix: 'Sediment from hard water. A flush can help if it is caught early.' },
      ],
      foot: '',
    },
    status: {
      label: 'Water heater',
      title: 'Signs your water heater is failing',
      rows: [
        { t: 'Water leaking from the tank itself', v: 'new' }, { t: 'Rusty water from the hot side', v: 'new' },
        { t: 'Tank is 10+ years old and acting up', v: 'check' }, { t: 'Loud rumbling even after a flush', v: 'check' },
        { t: "Pilot won't stay lit", v: 'repair' }, { t: 'Water not hot enough, or runs out fast', v: 'repair' },
      ],
      legend: 'Red: usually time for a new one. Yellow: worth a check. Cyan: usually a repair.',
      foot: "Not sure which side you're on? We'll tell you straight.",
    },
    why: {
      h: ['Repair first.', 'Replace only if|it makes sense.'],
      body: "A lot of water heaters just need a part. We check that first. If yours is done, we tell you straight and help you pick the right new one.",
      bullets: [
        { b: 'All brands.', t: 'Tank and tankless.' },
        { b: 'We check the cheap fixes first.', t: 'Pilot, thermostat, element, valve.' },
        { b: 'Hard-water know-how.', t: 'Pomona water is hard. We flush and check the anode rod.' },
        { b: 'Old one hauled away', t: `when we replace it. ${ph('Jim to confirm')}` },
      ],
      stat: { big: '8-12 yrs', small: 'Typical tank life. Hard water can make it shorter.' },
      photo: { src: whBg, alt: 'A tall water heater tank installed in a utility closet (stand-in photo)', standIn: true },
    },
    guide: {
      eyebrow: 'The hot water guide', h: ['Why water heaters wear', 'out faster in Pomona'],
      intro: 'Pomona Valley water is hard. It carries a lot of dissolved minerals, mostly calcium and magnesium. When the water heats up, those minerals drop out and settle at the bottom of the tank as sediment. The sediment does three things:',
      sections: [
        { id: 'sediment', toc: 'What hard water does', title: '', blocks: [
          { type: 'numbered', items: ['It sits between the burner and the water, so the heater works harder and your gas or power bill goes up.', 'It makes the popping and rumbling sound many people hear.', 'It traps heat against the bottom of the tank, which wears the steel out faster.'] },
          { type: 'p', html: 'In tankless units, the same minerals coat the heat exchanger. The unit throws error codes or the water swings hot and cold.' },
          { type: 'tip', title: 'The cheap fix most people miss', icon: 'wrench', html: "Inside every tank there is an anode rod. It corrodes on purpose so the tank doesn't. Once the rod is used up, the tank starts to rust from the inside. Checking and replacing it is one of the cheapest ways to make a tank last longer." },
        ] },
        { id: 'fix', toc: 'What we fix', title: 'What we fix', blocks: [
          { type: 'cards', items: [
            { t: 'Gas tank heaters', d: "Pilot lights that won't stay lit, thermocouples, gas valves, burners, venting.", icon: 'flame' },
            { t: 'Electric tank heaters', d: 'Heating elements, thermostats, breakers that trip.', icon: 'zap' },
            { t: 'Leaks', d: 'Relief valves, drain valves, water connections. A leaking tank body means replace.', icon: 'drop' },
            { t: 'Tankless heaters', d: 'Flushing and descaling, error codes, ignition problems.', icon: 'jet' },
            { t: 'Flush & anode rod', d: 'Sediment flush for tanks and anode rod replacement.', icon: 'wrench' },
            { t: 'New installs', d: `Tank or tankless, sized for your home. ${ph('Permits: Jim to confirm who pulls them')}`, icon: 'home' },
          ] },
        ] },
        { id: 'replace', toc: "When it's time to replace", title: "When it's time to replace", blocks: [
          { type: 'p', html: "If the tank is leaking from the body, if the hot water is rusty, or if it's past 10 to 12 years old and acting up, a new heater is usually the smarter money. We talk through size, gas or electric, tank or tankless, and code items: California requires water heaters to be strapped for earthquakes, and many older installs also need a new expansion tank, venting or drain pan." },
          { type: 'wait', title: 'While you wait for us', items: [
            { k: 'Leaking?', t: 'Shut the cold water valve on top of the tank. Turn gas to "pilot" or "off," or turn off the breaker for electric.' },
            { k: 'Smell gas?', t: "Leave the house and call SoCalGas from outside. Don't flip switches." },
            { k: 'No hot water?', t: "For gas, check if the pilot is out. For electric, check the breaker. If that's not it, call us." },
          ] },
        ] },
        { id: 'near', toc: 'Water heaters near Pomona', title: 'Water heater service near Pomona', blocks: [
          { type: 'towns', html: towns([CLA, LAV, MON, UPL, ONT, CHI, CHH, DIA, RAN], 'We work in Pomona (91766, 91767, 91768) and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Cold shower?', sub: 'Call now, day or night. Tell us the brand and age of your heater if you can see the label.', tip: { title: 'Puddle near the heater?', text: 'It could be a valve, or a slab leak nearby. We find where the water is really coming from.', href: '/leak-detection-pomona/', label: 'See leak detection', icon: 'search' } },
    compare: {
      eyebrow: 'Tank or tankless?', h: ['Which one fits', 'your home?'],
      labels: ['Up-front cost', 'Hot water', 'Space', 'How long it lasts', 'Gas line & venting'],
      left: { title: 'Tank', sub: 'The classic. Usually we match what you have', icon: 'flame', rows: ['Lower', 'Can run out', 'Takes floor space', 'About 8 to 12 years', 'Usually fine as is'] },
      right: { title: 'Tankless', sub: 'Endless hot water, more up front', icon: 'zap', rows: ['Higher', "Doesn't run out", 'Saves space', 'Usually longer, with yearly care', 'May need a bigger gas line and new venting'] },
      note: "Not sure? We'll tell you if your home is a good fit for tankless.",
    },
    crew: 'family', crewLine: 'Same family, same way of working, on every water heater job.',
    cta: { eyebrow: 'Hot water emergency?', h: ['Need a plumber', 'in Pomona?'], sub: 'No hot water? Call now. Day or night.' },
    faqIntro: 'The water heater questions Pomona homeowners ask us most. Anything else, just call.',
    faqs: [
      { q: 'How long do water heaters last?', a: 'Most tank heaters last about 8 to 12 years. Hard water like ours can make that shorter. Tankless units usually last longer with yearly care.' },
      { q: 'My water heater is leaking. What do I do?', a: 'Turn the cold water valve on top of the tank to off. For gas, turn the gas knob to "off" or "pilot." For electric, flip the breaker. Then call us.' },
      { q: 'Should I go tankless?', a: "It saves space and you don't run out of hot water. It costs more up front and may need a bigger gas line. We'll tell you if your home is a good fit." },
      { q: "What's that popping noise?", a: 'Sediment. Minerals from hard water settle at the bottom and the water bubbles through them. A flush can help if it\'s caught early.' },
      { q: 'How much is a new water heater?', a: `It depends on size, gas or electric, and tank or tankless. ${ph('Starting price: Jim to confirm')} You get the price before we start.` },
      { q: 'Do I need a permit?', a: `In most cities, replacing a water heater needs a permit and a seismic strap check. ${ph('Permits: Jim to confirm who pulls them')}` },
    ],
    related: ['leak-detection-pomona', 'gas-line-repair-pomona', 'repiping-pomona', 'plumbing-repair-pomona'], relatedEyebrow: 'More ways we help', relatedLine: 'Hot water problems often sit next to these.',
    contact: { line1: 'Get your hot', line2: 'water back.', text: "Cold shower? Call (909) 587-0711, day or night. Backup line (909) 667-6555. Or leave your number and Jim's team calls you back." },
    hubLine: 'Tank or tankless. Repair or replace.',
  },

  /* ------------------------------------------------------------------ ROOTER */
  'rooter-service-pomona': {
    slug: 'rooter-service-pomona', name: 'Rooter service', eyebrow: 'Rooter service · Pomona, CA',
    h1: ['Roots? Rooter service', 'in Pomona'],
    sub: 'Tree roots in the sewer line cut out, and the line flowing again. Open 24/7.',
    problemsLabel: 'Sounds like yours?',
    problems: ['Toilet gurgles when the washer drains', 'Sewer backs up every few months', 'Big tree near the sewer line'],
    hero: { bg: { src: rooterBg, alt: 'Plumbers working on an uncovered sewer line in a front yard (stand-in photo)', standIn: true, pos: '60% 50%' } },
    form: { title: 'Roots? Get a call back', sub: 'Leave your number. We call you back.', label: "What's happening?", options: ['Sewer backing up', 'Gurgling drains', 'Slow drains all over', 'Tree near the line', 'Not sure'] },
    clear: {
      eyebrow: 'What we cut out', h: ['Rooter service in Pomona for', 'roots in the sewer line'],
      cards: [
        { title: 'Gurgling toilet', icon: 'drop', notice: ['Toilet bubbles when the washer drains', 'Tub drains slow after a big load', 'A sewer smell now and then'], fix: 'Air is being pushed back up because the line is partly blocked. We open the main line from the cleanout and clear it.' },
        { title: 'Backups that come back', icon: 'alert', notice: ['Sewer backs up every few months', 'Water rises in the shower or floor drain', 'Clears for a while, then returns'], fix: 'That pattern usually means roots growing back in the same joint. We cut them out and tell you what you are dealing with.' },
        { title: 'Tree near the sewer line', icon: 'home', notice: ['Big tree between the house and street', 'Older home with a clay sewer line', 'Lifted concrete or a soft spot in the yard'], fix: 'Roots go where the water is. If the line keeps getting roots, a camera look shows where they get in.' },
      ],
      foot: `Water coming up from a floor drain right now? Stop running water and <a href="tel:+19095870711">call 909-587-0711.</a>`,
    },
    why: {
      h: ['Why choose us for', 'rooter service in Pomona'], tag: 'We cut the roots and tell you why they got in.',
      body: 'Roots in a sewer line are a sign, not just a clog. We clear the line, then explain what we saw so you can decide what comes next.',
      bullets: [
        { b: 'Full line, not a hole.', t: 'We cut roots from the main line out toward the street.' },
        { b: 'Straight talk.', t: 'If the pipe is cracked, roots will likely come back. We say so.' },
        { b: 'From the cleanout.', t: 'We work through the cleanout when there is one, not through your toilet.' },
        { b: 'Next steps explained.', t: 'Camera, spot repair or regular clearing. Your call.' },
      ],
      stat: { big: '24/7', small: 'Sewer backups do not wait for Monday.' }, photo: P.crawl,
    },
    guide: {
      eyebrow: 'The root guide', h: ['Tree roots in sewer', 'lines in Pomona'],
      intro: 'Pomona has a lot of older homes with big, old trees in the yard and parkway. Under many of those yards runs a clay sewer line. Clay pipe comes in short sections with a joint every few feet. As the joints age they open up a little, and tree roots find the water and grow inside. Once a root is in, it keeps growing and catches paper and grease until the line backs up.',
      sections: [
        { id: 'signs', toc: 'Signs of roots', title: 'Signs roots are in your line', blocks: [
          { type: 'alert', title: 'Roots usually show up like this', items: ['More than one drain is slow at the same time', 'The toilet gurgles when the washer or tub drains', 'Backups that clear and then return every few months', 'Water at the yard cleanout or a floor drain', 'A sewer smell in the yard near a big tree'], note: 'If water is coming up inside, stop running water and call (909) 587-0711.' },
        ] },
        { id: 'how', toc: 'How rootering works', title: 'How we clear roots', blocks: [
          { type: 'steps', items: [
            { b: 'We find a way in.', t: 'Most homes have a sewer cleanout outside. We open the line from there.' },
            { b: 'We run a cutting head.', t: 'A drain machine spins a cutting blade through the pipe and cuts the roots off at the wall.' },
            { b: 'We flush and test.', t: 'We run water through the line to make sure it drains well.' },
            { b: 'We tell you what came out.', t: 'Fine hair roots or thick ones tell us a lot about the pipe.' },
          ] },
        ] },
        { id: 'come-back', toc: 'Will they come back?', title: 'Will the roots come back?', blocks: [
          { type: 'p', html: 'Often, yes, if the joint or crack they came through is still open. Cutting roots clears the line, but it does not seal the pipe. Some homeowners have the line cleared on a schedule. Others want to see the pipe first and fix the bad spot. A <a href="/sewer-camera-inspection-pomona/">sewer camera inspection</a> shows where the roots get in, and <a href="/hydro-jetting-pomona/">hydro jetting</a> can scrub the fine roots and grease off the walls after cutting.' },
          { type: 'tip', title: 'Planting a tree?', icon: 'pin', html: 'Keep new trees away from the line between the house and the street. If you are not sure where it runs, ask us when we are out.' },
        ] },
        { id: 'near', toc: 'Rooter service near Pomona', title: 'Rooter service near Pomona', blocks: [
          { type: 'towns', html: towns([CLA, LAV, UPL, MON, SAN, DIA], 'We cut roots out of sewer lines in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Sewer backing up?', sub: 'Stop running water. A real person picks up, day or night.', tip: { title: 'Roots keep coming back?', text: 'A camera inspection shows where they get in, so you fix the spot, not the symptom.', href: '/sewer-camera-inspection-pomona/', label: 'See sewer camera inspection', icon: 'video' } },
    crew: 'why',
    cta: { eyebrow: 'Roots in the line?', h: ['Need rooter service', 'in Pomona?'], sub: 'Call now. A real person picks up, day or night.' },
    faqIntro: 'What Pomona homeowners ask us most about roots in sewer lines.',
    faqs: [
      { q: 'Why do roots get in my pipe?', a: 'Old clay pipe has joints. Roots find water there and grow inside.' },
      { q: 'Will the roots come back?', a: "Often, yes, if the pipe stays cracked. We'll tell you what you're dealing with." },
      { q: 'Do I need a camera inspection too?', a: `If it keeps coming back, it's worth seeing. ${ph('Camera on the truck: Jim to confirm')}` },
      { q: 'How much does rooter service cost?', a: PRICE },
    ],
    related: ['sewer-camera-inspection-pomona', 'hydro-jetting-pomona', 'main-line-repair-pomona'], relatedEyebrow: 'More drain & sewer help', relatedLine: 'Roots are often the start. These are the usual next steps.',
    contact: { line1: 'Roots in your', line2: 'sewer line?', text: "Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: 'Tree roots cut out of your sewer line.',
  },

  /* ------------------------------------------------------------------ GAS LINE REPAIR */
  'gas-line-repair-pomona': {
    slug: 'gas-line-repair-pomona', name: 'Gas line repair', eyebrow: 'Gas line repair · Pomona, CA',
    h1: ['Gas leak? Gas line', 'repair in Pomona'],
    sub: 'Leaks, bad connectors and shutoff valves found and fixed. Safety first, every time.',
    safety: 'Smell gas? Leave the house first, then call SoCalGas from outside.',
    problemsLabel: 'Sounds like yours?',
    problems: ['Gas smell near the stove or heater', 'Hissing sound near a gas line', "Appliance won't light after a shutoff"],
    hero: { bg: { src: gasBg, alt: 'A plumber checking a gas pipe manifold with a gas detector (stand-in photo)', standIn: true, pos: '65% 40%' } },
    form: { title: 'Gas line? Get a call back', sub: 'If you smell gas now, leave first and call SoCalGas from outside.', label: "What's going on?", options: ['Faint gas smell', 'Appliance connector', 'Shutoff valve', 'Appliance won\'t light', 'Not sure'] },
    clear: {
      eyebrow: 'What we fix', h: ['Gas line repair in Pomona for', 'leaks and bad fittings'],
      cards: [
        { title: 'Old appliance connectors', icon: 'fuel', notice: ['Stove or dryer that was moved a lot', 'Kinked or old-style flex line', 'Faint smell behind the appliance'], fix: 'Old flex connectors are a common leak spot. We replace the connector and check the joint.' },
        { title: 'Leaky shutoff valves', icon: 'wrench', notice: ['Valve is stiff or will not turn', 'Smell near the valve handle', 'Valve shows rust or damage'], fix: 'We replace worn shutoff valves so each appliance can be turned off safely on its own.' },
        { title: 'After a gas shutoff', icon: 'alert', notice: ["Appliance won't light", 'Pilot keeps going out', 'Gas was turned off for work or an emergency'], fix: `We find out why, check the line for leaks, and get the appliance going again. ${ph('Pressure testing: Jim to confirm')}` },
      ],
      foot: `Strong smell, hissing or someone feels sick? Leave now and call SoCalGas or 911 from outside.`,
    },
    why: {
      h: ['Why choose us for', 'gas line repair in Pomona'], tag: 'Calm, careful, and clear about what we find.',
      body: 'Gas work is not a place for guessing. We find the leak, fix the part that failed, and check the rest of the line near it before we call it done.',
      bullets: [
        { b: 'Safety first.', t: 'If it is not safe to work, we say so and tell you who to call.' },
        { b: 'We find the leak.', t: 'Connectors, valves and joints are checked one by one.' },
        { b: 'Right parts.', t: 'Gas-rated connectors and valves, sized for the appliance.' },
        { b: 'Permits.', t: `Gas work often needs one. ${ph('Who pulls permits: Jim to confirm')}` },
      ],
      stat: { big: '24/7', small: 'Leave first, call SoCalGas, then call us.' }, photo: P.van,
    },
    guide: {
      eyebrow: 'The gas safety guide', h: ['Gas line repair', 'in Pomona, CA'],
      intro: 'Most gas problems in a home start small: an old connector behind the stove, a valve that has been bumped for years, a joint that loosened when an appliance was moved. United Plumbing repairs gas leaks and bad connections in homes across Pomona and the towns around it. If you smell gas right now, stop reading and leave the house first.',
      sections: [
        { id: 'first', toc: 'If you smell gas', title: 'If you smell gas', blocks: [
          { type: 'wait', title: 'Do this, in this order', items: [
            { k: 'Leave.', t: 'Get everyone out of the house, pets too. Leave the door open behind you.' },
            { k: "Don't spark.", t: "Don't flip light switches, use the garage door opener, or light anything on the way out." },
            { k: 'Call.', t: 'From outside, call SoCalGas or 911. Then call us at (909) 587-0711.' },
          ] },
        ] },
        { id: 'where', toc: 'Where leaks happen', title: 'Where gas leaks usually happen', blocks: [
          { type: 'p', html: '<strong>Appliance connectors.</strong> The flexible line behind a stove, dryer or water heater. Older ones were not made to be bent again and again, and they wear out.' },
          { type: 'p', html: '<strong>Shutoff valves.</strong> Each appliance should have its own valve. Old valves get stiff and can weep gas at the stem.' },
          { type: 'p', html: '<strong>Threaded joints.</strong> Where two pieces of pipe screw together. Moving an appliance or settling of the house can loosen them.' },
          { type: 'p', html: '<strong>Outdoor lines.</strong> Lines to a pool heater, grill or fire pit can be hit while digging or damaged by sun and weather.' },
        ] },
        { id: 'how', toc: 'How we repair', title: 'How we repair a gas line', blocks: [
          { type: 'steps', items: [
            { b: 'Make it safe.', t: 'We shut off gas to the area we are working on.' },
            { b: 'Find the leak.', t: 'We check connectors, valves and joints near the smell.' },
            { b: 'Replace the bad part.', t: 'A new connector, valve or fitting, rated for gas.' },
            { b: 'Check our work.', t: 'We check the repair for leaks before turning things back on.' },
            { b: 'Relight and explain.', t: 'We relight pilots and tell you what failed.' },
          ] },
        ] },
        { id: 'near', toc: 'Gas line repair near Pomona', title: 'Gas line repair near Pomona', blocks: [
          { type: 'towns', html: towns([CLA, LAV, DIA, WAL, CHI, ONT], 'We repair gas lines in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Gas question?', sub: 'If you smell gas now: leave the house, then call SoCalGas from outside.', tip: { title: 'Adding a gas appliance?', text: 'New stoves, dryers, grills and fire pits need the right size line.', href: '/gas-line-installation-pomona/', label: 'See gas line installation', icon: 'fuel' } },
    crew: 'family', crewLine: 'Careful work by the same family, on every gas job.',
    cta: { eyebrow: 'Gas line problem?', h: ['Need gas line repair', 'in Pomona?'], sub: 'Smell gas? Leave first, call SoCalGas from outside, then call us.' },
    faqIntro: 'What Pomona homeowners ask us most about gas lines. If you smell gas now, leave the house first.',
    faqs: [
      { q: 'What do I do if I smell gas?', a: "Leave. Don't flip switches or light anything. Call SoCalGas or 911 from outside." },
      { q: 'Can you test my gas line?', a: `Yes, we pressure test lines to find leaks. ${ph('Jim to confirm')}` },
      { q: 'Do you fix flex connectors and valves?', a: 'Yes. Old connectors and shutoff valves are a common leak spot.' },
      { q: 'How much does gas line repair cost?', a: PRICE },
    ],
    related: ['gas-line-installation-pomona', 'water-heater-pomona', 'plumbing-repair-pomona'], relatedEyebrow: 'More gas & home help', relatedLine: 'Gas lines feed your water heater and stove too.',
    contact: { line1: 'Gas line', line2: 'problem?', text: 'Smell gas now? Leave the house, call SoCalGas from outside, then call us. Otherwise call or text any hour, or send the form.' },
    hubLine: 'Gas leaks and bad fittings fixed.',
  },

  /* ------------------------------------------------------------------ HYDRO JETTING */
  'hydro-jetting-pomona': {
    slug: 'hydro-jetting-pomona', name: 'Hydro jetting', eyebrow: 'Hydro jetting · Pomona, CA',
    h1: ['Blast it clean: hydro', 'jetting in Pomona'],
    sub: 'For drains that keep clogging. High-pressure water scrubs grease, scale and roots off the pipe walls.',
    problemsLabel: 'Sounds like yours?',
    problems: ['Kitchen line clogs again and again', 'Grease buildup in the main line', 'Roots after rootering'],
    hero: { bg: { src: hydroBg, alt: 'A plumber running a hydro jetting hose into a floor drain (stand-in photo)', standIn: true, pos: '40% 50%' } },
    form: { title: 'Repeat clogs? Get a call back', sub: 'Leave your number. We call you back.', label: 'Which line?', options: ['Kitchen line', 'Main sewer line', 'After rootering', 'More than one drain', 'Not sure'] },
    clear: {
      eyebrow: 'What jetting clears', h: ['Hydro jetting in Pomona for', 'grease, scale and roots'],
      cards: [
        { title: 'Kitchen line that keeps clogging', icon: 'drop', notice: ['Cleared it, then slow again in weeks', 'Greasy water backs up in the sink', 'Smell from the kitchen drain'], fix: 'Grease coats the whole pipe wall. Jetting washes it out so the line is open edge to edge.' },
        { title: 'Grease in the main line', icon: 'alert', notice: ['Several drains slow at once', 'Gurgling after big meals or parties', 'Backups at the cleanout'], fix: 'We jet from the cleanout toward the street to flush built-up grease out of the main.' },
        { title: 'Fine roots after rootering', icon: 'jet', notice: ['Roots were cut, but it slows again', 'Thin hair roots left on the walls', 'Older clay sewer line'], fix: 'Jetting after a root cut scrubs off the fine roots a cutting head can leave behind.' },
      ],
      foot: `Not sure if you need jetting or a snake? <a href="tel:+19095870711">Call 909-587-0711</a> and tell us how often it clogs.`,
    },
    why: {
      h: ['Why choose us for', 'hydro jetting in Pomona'], tag: 'Clean pipe, not just an open hole.',
      body: `A snake opens a path through a clog. Jetting cleans the whole pipe. For drains that keep coming back, that is the difference. ${ph('Jetter on the truck: Jim to confirm before this page goes live')}`,
      bullets: [
        { b: 'We check the pipe first.', t: 'Old or broken pipe gets looked at before high pressure.' },
        { b: 'Right nozzle, right line.', t: 'Different heads for grease, scale and roots.' },
        { b: 'Whole line.', t: 'From the cleanout to the street, not just the first few feet.' },
        { b: 'Plain report.', t: 'We tell you what came out and how to slow it down.' },
      ],
      stat: { big: 'Wall to wall', small: 'Jetting cleans the whole pipe, not a hole.' }, photo: P.snake,
    },
    guide: {
      eyebrow: 'The jetting guide', h: ['Hydro jetting', 'in Pomona, CA'],
      intro: 'Some drains clog once. Others clog every few weeks no matter how many times they get snaked. That usually means the pipe walls are coated: grease in kitchen lines, mineral scale from hard water, or fine roots in an old clay sewer line. Hydro jetting uses a hose with a special nozzle that sprays water at high pressure, forward and backward, and scrubs the inside of the pipe clean.',
      sections: [
        { id: 'when', toc: 'When jetting makes sense', title: 'When jetting makes sense', blocks: [
          { type: 'checks', items: ['The same drain clogs again within weeks of being cleared.', 'Kitchen lines in homes that cook a lot.', 'Main lines with grease buildup.', 'After cutting roots, to clean off what is left.', 'Before or after a camera inspection, to see the pipe clearly.'] },
        ] },
        { id: 'safe', toc: 'Is it safe for my pipes?', title: 'Is it safe for my pipes?', blocks: [
          { type: 'p', html: 'For most pipes in good shape, yes. Very old pipe, cracked pipe or pipe that has shifted needs a look first, because high pressure can make a weak spot worse. When we are not sure about a line, we suggest a <a href="/sewer-camera-inspection-pomona/">sewer camera inspection</a> before we jet.' },
          { type: 'tip', title: 'Jetting is not a cure for a broken pipe', icon: 'alert', html: 'If the pipe is broken or sagging, it will keep catching debris. Jetting clears it; a <a href="/main-line-repair-pomona/">main line repair</a> fixes it.' },
        ] },
        { id: 'how', toc: 'How we jet a line', title: 'How we jet a line', blocks: [
          { type: 'steps', items: [
            { b: 'Find the access point.', t: 'Usually the outside cleanout.' },
            { b: 'Check the pipe.', t: 'We ask about the home\'s age and past problems, and look before we jet older lines.' },
            { b: 'Jet in passes.', t: 'The nozzle pulls itself down the line and scrubs on the way back.' },
            { b: 'Flush and test.', t: 'We run water through the fixtures to make sure it all drains.' },
          ] },
        ] },
        { id: 'near', toc: 'Hydro jetting near Pomona', title: 'Hydro jetting near Pomona', blocks: [
          { type: 'towns', html: towns([CLA, MON, UPL, ONT, LAV, CHH], 'We jet drain and sewer lines in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Drain clogged again?', sub: 'Tell us how often it happens. A real person picks up, day or night.', tip: { title: 'Roots in the line?', text: 'Rooter service cuts the thick roots first. Jetting cleans up after.', href: '/rooter-service-pomona/', label: 'See rooter service', icon: 'wrench' } },
    compare: {
      eyebrow: 'Snake or jetting?', h: ['Which one does', 'your drain need?'],
      labels: ['What it does', 'Best for', 'Grease on the walls', 'Fine roots', 'Repeat clogs'],
      left: { title: 'Drain snake', sub: 'A spinning cable that opens the clog.', icon: 'wrench', rows: ['Punches a path through', 'One-time clogs, toilets, single sinks', 'Mostly stays', 'Thick roots cut, fine ones stay', 'Can come back sooner'] },
      right: { title: 'Hydro jetting', sub: 'High-pressure water that cleans the pipe.', icon: 'jet', rows: ['Scrubs the whole pipe wall', 'Lines that keep clogging, main lines', 'Washed out', 'Scrubbed off', 'Usually stay away longer'] },
      note: "Not sure which you need? Tell us how often it clogs and we'll say.",
    },
    crew: 'why',
    cta: { eyebrow: 'Drain keeps clogging?', h: ['Need hydro jetting', 'in Pomona?'], sub: 'Call now. A real person picks up, day or night.' },
    faqIntro: 'What Pomona homeowners ask us most about hydro jetting.',
    faqs: [
      { q: 'What is hydro jetting?', a: 'A hose with a special nozzle sprays water at high pressure and scrubs the whole pipe wall clean.' },
      { q: 'Is it safe for my pipes?', a: 'For most pipes in good shape, yes. We check old or broken pipe first.' },
      { q: 'Jetting or snaking?', a: 'A snake opens a hole. Jetting cleans the whole pipe. Repeat clogs usually need jetting.' },
      { q: 'How much does hydro jetting cost?', a: PRICE },
    ],
    related: ['drain-cleaning-pomona', 'rooter-service-pomona', 'sewer-camera-inspection-pomona'], relatedEyebrow: 'More drain & sewer help', relatedLine: 'Jetting works best alongside these.',
    contact: { line1: 'Drain clogging', line2: 'again?', text: "Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: 'Water blast for grease, scale and roots.',
  },

  /* ------------------------------------------------------------------ SEWER CAMERA */
  'sewer-camera-inspection-pomona': {
    slug: 'sewer-camera-inspection-pomona', name: 'Sewer camera inspection', eyebrow: 'Sewer camera · Pomona, CA',
    h1: ['See inside your sewer', 'line in Pomona'],
    sub: "We run a camera down the line and show you what's wrong before anyone digs.",
    problemsLabel: 'Good time for a camera look',
    problems: ['Same clog keeps coming back', 'Buying an older home', 'Wet or sunken spot in the yard'],
    hero: { bg: { src: camBg, alt: 'A plumber watching a sewer camera monitor next to the camera reel (stand-in photo)', standIn: true, pos: '60% 40%' } },
    form: { title: 'See the problem. Get a call back', sub: 'Leave your number. We call you back.', label: 'Why a camera?', options: ['Clog keeps coming back', 'Buying a home', 'Wet spot in the yard', 'Roots', 'Not sure'] },
    clear: {
      eyebrow: 'What the camera finds', h: ['Sewer camera inspection in', 'Pomona, before you dig'],
      cards: [
        { title: 'Clog that keeps coming back', icon: 'drop', notice: ['Cleared more than once this year', 'Backs up at the same spot', 'Slow drains all over the house'], fix: 'The camera shows if it is roots, a sag holding water, grease or a break, and how far from the cleanout.' },
        { title: 'Buying an older home', icon: 'home', notice: ['Home built before 1970', 'Big trees in the front yard', 'Seller does not know the line\'s history'], fix: 'Sewer problems are not always part of a normal home inspection. A camera look shows you the line before you buy.' },
        { title: 'Wet or sunken yard', icon: 'alert', notice: ['A green, soggy strip in the lawn', 'Ground sinking over the line', 'Sewer smell outside'], fix: 'That can mean a broken pipe leaking into the soil. The camera finds the spot so only that spot gets opened.' },
      ],
      foot: `${ph('Camera on the truck: Jim to confirm before this page goes live')}`,
    },
    why: {
      h: ['Why choose us for a', 'sewer camera in Pomona'], tag: 'See it yourself, then decide.',
      body: 'Nobody likes paying for a big fix they cannot see. With a camera, you watch the screen with us and see what is in the pipe and where.',
      bullets: [
        { b: 'You see what we see.', t: 'We walk you through the picture on screen.' },
        { b: 'We find the spot.', t: 'Where the problem is, and about how deep.' },
        { b: 'Options, not pressure.', t: 'Clean it, cut it, or fix one section. You choose.' },
        { b: 'Your copy.', t: `Recording for you to keep. ${ph('Jim to confirm')}` },
      ],
      stat: { big: 'See it', small: 'Know what is wrong before anyone digs.' }, photo: P.crawl,
    },
    guide: {
      eyebrow: 'The camera guide', h: ['Sewer camera inspection', 'in Pomona, CA'],
      intro: 'Your sewer line runs from the house, under the yard, to the city main in the street. You never see it until it fails. A sewer camera inspection puts a small waterproof camera on a flexible cable into the line through a cleanout, so you can see roots, cracks, sags and grease, and where each one is.',
      sections: [
        { id: 'shows', toc: 'What the camera shows', title: 'What the camera shows', blocks: [
          { type: 'cards', items: [
            { t: 'Roots', d: 'Hair roots or thick ones growing in at a joint.', icon: 'wrench' },
            { t: 'Cracks & breaks', d: 'Clay and cast iron crack with age.', icon: 'alert' },
            { t: 'Sags (bellies)', d: 'A low spot that holds water and catches waste.', icon: 'drop' },
            { t: 'Grease & scale', d: 'Buildup that narrows the pipe.', icon: 'jet' },
          ] },
        ] },
        { id: 'when', toc: 'When to get one', title: 'When to get one', blocks: [
          { type: 'checks', items: ['A drain or sewer backup has happened more than once.', 'You are buying a home built before 1970, or one with big trees in front.', 'There is a wet, green or sinking spot in the yard over the line.', 'Before a big repair, so the work goes in the right spot.', 'After clearing roots, to see if the pipe is cracked.'] },
        ] },
        { id: 'how', toc: 'How it works', title: 'How an inspection works', blocks: [
          { type: 'steps', items: [
            { b: 'We open the cleanout.', t: 'Usually outside, near the house.' },
            { b: 'We feed the camera in.', t: 'It travels down the line toward the street.' },
            { b: 'We watch together.', t: 'We stop at anything that matters and explain it.' },
            { b: 'We tell you the options.', t: 'Clear it, cut roots, or repair one section.' },
          ] },
          { type: 'p', html: 'If the line is fully blocked, we may need to clear it first with <a href="/drain-cleaning-pomona/">drain cleaning</a> or <a href="/hydro-jetting-pomona/">hydro jetting</a> so the camera can get through.' },
        ] },
        { id: 'near', toc: 'Sewer camera near Pomona', title: 'Sewer camera inspection near Pomona', blocks: [
          { type: 'towns', html: towns([CLA, LAV, SAN, UPL, ONT, DIA], 'We run camera inspections in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Want to see the line?', sub: 'Call or text. A real person picks up, day or night.', tip: { title: 'Line is broken?', text: 'If the camera finds a break, we talk through main line repair options.', href: '/main-line-repair-pomona/', label: 'See main line repair', icon: 'arrow' } },
    crew: 'why',
    cta: { eyebrow: 'See the problem first', h: ['Need a sewer camera', 'in Pomona?'], sub: 'Call now. A real person picks up, day or night.' },
    faqIntro: 'What Pomona homeowners ask us most about sewer camera inspections.',
    faqs: [
      { q: 'What will the camera show?', a: "Roots, cracks, sags, grease and broken pipe, with the spot it's at." },
      { q: 'Do I get the video?', a: `${ph('Recording given to the customer: Jim to confirm')}` },
      { q: 'Should I get one before buying a house?', a: "For older homes, it's a smart move. Sewer problems aren't always in a normal home inspection." },
      { q: 'How much is a camera inspection?', a: PRICE },
    ],
    related: ['main-line-repair-pomona', 'rooter-service-pomona', 'hydro-jetting-pomona'], relatedEyebrow: 'More drain & sewer help', relatedLine: 'What the camera finds decides which of these comes next.',
    contact: { line1: 'See what is in', line2: 'your line.', text: "Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: "We show you what's in the pipe.",
  },

  /* ------------------------------------------------------------------ LEAK DETECTION */
  'leak-detection-pomona': {
    slug: 'leak-detection-pomona', name: 'Leak detection', eyebrow: 'Leak detection · Pomona, CA',
    h1: ['Hidden leak detection', 'in Pomona'],
    sub: 'Slab leaks and leaks inside walls, found first, so only the spot that needs it gets opened.',
    problemsLabel: 'Sounds like yours?',
    problems: ['Water bill jumped for no reason', 'Warm spot on the floor', "Sound of running water when it's all off"],
    hero: { bg: P.night },
    form: { title: 'Hidden leak? Get a call back', sub: 'Leave your number. We call you back.', label: 'What do you notice?', options: ['High water bill', 'Warm or wet floor', 'Running water sound', 'Stain on wall or ceiling', 'Not sure'] },
    clear: {
      eyebrow: 'What we find', h: ['Leak detection in Pomona for', 'slab and hidden leaks'],
      cards: [
        { title: 'Water bill jumped', icon: 'tag', notice: ['Bill is up and habits are the same', 'Meter moves with every tap off', 'No drip you can see'], fix: 'We start at the meter, then narrow it down: toilets, outside lines, the slab, the walls.' },
        { title: 'Warm or damp floor', icon: 'flame', notice: ['A warm spot on tile or wood', 'Damp carpet with no spill', 'New cracks in the floor'], fix: 'A warm spot often means a hot water line leaking under the slab. We find where before anything is opened.' },
        { title: 'Water you can hear', icon: 'alert', notice: ['Running water sound at night', 'Hissing inside a wall', 'Stains on a wall or ceiling'], fix: 'We trace the sound and the stain back to the pipe that is leaking.' },
      ],
      foot: `A leak you can see spraying? Shut off the main water valve and <a href="tel:+19095870711">call 909-587-0711.</a>`,
    },
    why: {
      h: ['Why choose us for', 'leak detection in Pomona'], tag: 'Find it first. Open only what we have to.',
      body: `Guessing at a leak means opening a lot of floor or wall. We find it first, then show you where it is and what it takes to fix. ${ph('Leak-finding tools: Jim to confirm')}`,
      bullets: [
        { b: 'Meter first.', t: 'We confirm there is a leak before anything else.' },
        { b: 'Narrow it down.', t: 'Hot side or cold side, inside or outside.' },
        { b: 'Small openings.', t: 'We open only where the leak is.' },
        { b: 'Fix it too.', t: 'A spot repair, or a reroute if the pipe is worn out.' },
      ],
      stat: { big: '24/7', small: 'Leaks do not wait. Neither do we.' }, photo: P.crawl,
    },
    guide: {
      eyebrow: 'The leak guide', h: ['Slab and hidden leaks', 'in Pomona homes'],
      intro: 'Many homes around Pomona sit on a concrete slab, with copper water lines running under or inside it. Pomona Valley water is hard, and over the years copper can wear thin and develop small pinhole leaks. When that happens under the slab, the water has nowhere to go. You may not see it for weeks, but you can feel it, hear it, or see it on the water bill.',
      sections: [
        { id: 'check', toc: 'Check your meter', title: 'Check for a leak yourself', blocks: [
          { type: 'steps', items: [
            { b: 'Turn everything off.', t: 'Every tap, the washer, the dishwasher and the sprinklers.' },
            { b: 'Find the meter.', t: 'Usually in a box near the street.' },
            { b: 'Watch the small dial.', t: 'If it moves with everything off, water is leaking somewhere.' },
            { b: 'Call us.', t: 'Tell us what you saw and we will take it from there.' },
          ] },
        ] },
        { id: 'signs', toc: 'Signs of a slab leak', title: 'Signs of a slab leak', blocks: [
          { type: 'alert', title: 'Call if you notice any of these', items: ['A warm spot on the floor', 'Damp carpet or warped wood floor with no spill', 'Sound of running water when nothing is on', 'New cracks in the floor or walls', 'A water bill that jumped for no reason'], note: 'A hot water slab leak also makes your water heater run more. Call (909) 587-0711.' },
        ] },
        { id: 'fix', toc: 'Fixing it', title: 'Once we find it', blocks: [
          { type: 'p', html: 'There are two usual ways to fix a slab leak. A <strong>spot repair</strong> opens the floor at the leak and replaces the bad section of pipe. A <strong>reroute</strong> leaves the old pipe in the slab and runs a new line through the walls or attic instead. If the copper is worn out in more than one place, a reroute or a <a href="/repiping-pomona/">repipe</a> usually makes more sense than chasing leak after leak.' },
          { type: 'tip', title: 'Insurance questions', icon: 'help', html: 'Some homeowners ask their insurance about water damage from a slab leak. We can tell you what we found and where, in plain words.' },
        ] },
        { id: 'near', toc: 'Leak detection near Pomona', title: 'Leak detection near Pomona', blocks: [
          { type: 'towns', html: towns([DIA, CHH, WAL, CLA, LAV, ONT], 'We find hidden leaks in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Leak right now?', sub: 'Shut off the main water valve, then call. A real person picks up.', tip: { title: 'Leak after leak?', text: 'When copper keeps leaking, a repipe often costs less in the end.', href: '/repiping-pomona/', label: 'See repiping', icon: 'wrench' } },
    crew: 'family', crewLine: 'Same family, same careful way of working, on every leak.',
    cta: { eyebrow: 'Hidden leak?', h: ['Need leak detection', 'in Pomona?'], sub: 'Call now. A real person picks up, day or night.' },
    faqIntro: 'What Pomona homeowners ask us most about hidden and slab leaks.',
    faqs: [
      { q: 'How do I know I have a slab leak?', a: 'Warm floor spots, damp carpet, cracks, a meter that spins with every tap off.' },
      { q: 'Do you have to break up my floor?', a: `We find the leak first so we only open what we have to. ${ph('Leak-finding tools: Jim to confirm')}` },
      { q: 'Can you fix it once you find it?', a: 'Yes. A spot repair, or a reroute through the walls or attic if the pipe is worn out.' },
      { q: 'How much does leak detection cost?', a: PRICE },
    ],
    related: ['repiping-pomona', 'water-heater-pomona', 'main-line-repair-pomona'], relatedEyebrow: 'More water & pipe help', relatedLine: 'Leaks are often a sign of something bigger. These can help.',
    contact: { line1: 'Think you have', line2: 'a leak?', text: "Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: 'Hidden leaks and slab leaks, found fast.',
  },

  /* ------------------------------------------------------------------ MAIN LINE */
  'main-line-repair-pomona': {
    slug: 'main-line-repair-pomona', name: 'Main line repair', eyebrow: 'Main line repair · Pomona, CA',
    h1: ['Main line', 'repair in Pomona'],
    sub: 'Main sewer and main water lines repaired or replaced by a family-owned crew.',
    problemsLabel: 'Sounds like yours?',
    problems: ['Every drain in the house is slow', 'Low water pressure everywhere', "Wet patch in the yard that won't dry"],
    hero: { bg: P.dusk },
    form: { title: 'Main line? Get a call back', sub: 'Leave your number. We call you back.', label: 'Which line?', options: ['Sewer line', 'Water line', 'Wet spot in yard', 'Not sure'] },
    clear: {
      eyebrow: 'What we repair', h: ['Main line repair in Pomona for', 'sewer and water lines'],
      cards: [
        { title: 'Main sewer line', icon: 'drop', notice: ['Every drain in the house is slow', 'Toilets gurgle together', 'Backups at the lowest drain'], fix: 'We clear it first, then find out why it blocked: roots, a break or a sag, and fix that section.' },
        { title: 'Main water line', icon: 'zap', notice: ['Low pressure at every tap', 'Meter moves with all taps off', 'Hissing near the meter or valve'], fix: 'The line from the meter to the house can crack or corrode. We repair or replace it.' },
        { title: 'Wet spot in the yard', icon: 'alert', notice: ["A patch that won't dry", 'Greener grass in a strip', 'Ground sinking over the line'], fix: 'A clean-water wet spot points to the water line. A smelly one points to the sewer. We find which.' },
      ],
      foot: `Sewer coming up inside? Stop running water and <a href="tel:+19095870711">call 909-587-0711.</a>`,
    },
    why: {
      h: ['Why choose us for', 'main line repair in Pomona'], tag: 'Find the bad section. Fix that section.',
      body: 'A main line problem can sound like a huge job. Often it is one bad section. We find it first and lay out your options in plain words.',
      bullets: [
        { b: 'Diagnose first.', t: 'Camera or pressure check before any digging.' },
        { b: 'Options explained.', t: `Spot repair or full replacement. ${ph('Trenchless offered: Jim to confirm')}` },
        { b: 'Sewer and water.', t: 'Both mains, from the house to the city connection.' },
        { b: 'Clear price first.', t: 'You say yes before we start.' },
      ],
      stat: { big: '24/7', small: 'Main line backups do not wait.' }, photo: P.snake,
    },
    guide: {
      eyebrow: 'The main line guide', h: ['Main sewer and water', 'lines in Pomona'],
      intro: 'Your home has two main lines. The main water line brings water in from the meter at the street. The main sewer line carries everything out to the city sewer. When one of them fails, it affects the whole house, not just one fixture. In older Pomona neighborhoods, both lines are often decades old: clay or cast-iron sewer pipe and galvanized or copper water pipe.',
      sections: [
        { id: 'which', toc: 'Sewer or water?', title: 'Is it the sewer or the water line?', blocks: [
          { type: 'p', html: '<strong>Sewer main signs.</strong> More than one drain is slow, toilets gurgle when other fixtures drain, water comes up in the tub or shower when you flush, or there is a sewer smell in the yard.' },
          { type: 'p', html: '<strong>Water main signs.</strong> Low pressure at every tap at once, a meter that moves when everything is off, a hissing sound near the meter, or a wet patch between the street and the house that never dries.' },
        ] },
        { id: 'causes', toc: 'What breaks a main', title: 'What breaks a main line', blocks: [
          { type: 'cards', items: [
            { t: 'Tree roots', d: 'They grow into joints of clay sewer pipe.', icon: 'wrench' },
            { t: 'Age', d: 'Cast iron rusts and scales; galvanized pipe corrodes.', icon: 'clock' },
            { t: 'Ground movement', d: 'Settling can crack pipe or create sags.', icon: 'alert' },
            { t: 'Digging', d: 'Fence posts and landscaping can hit a line.', icon: 'home' },
          ] },
        ] },
        { id: 'how', toc: 'How we repair', title: 'How we repair a main line', blocks: [
          { type: 'steps', items: [
            { b: 'Clear and look.', t: 'For sewer lines, we clear it and use a camera to find the problem.' },
            { b: 'Mark the spot.', t: 'We find where the bad section is and about how deep.' },
            { b: 'Talk options.', t: 'Fix one section or replace the line. You decide.' },
            { b: 'Repair and test.', t: 'We run water and check the repair before we close up.' },
          ] },
          { type: 'tip', title: 'Who owns the line?', icon: 'help', html: 'Usually the homeowner owns the line from the house to the city connection. Ask your city to be sure where their part starts.' },
        ] },
        { id: 'near', toc: 'Main line repair near Pomona', title: 'Main line repair near Pomona', blocks: [
          { type: 'towns', html: towns([CLA, UPL, MON, LAV, SAN, CHI], 'We repair main lines in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Every drain slow?', sub: 'Stop running water. A real person picks up, day or night.', tip: { title: 'Not sure where the break is?', text: 'A camera inspection finds the spot so only that section gets opened.', href: '/sewer-camera-inspection-pomona/', label: 'See sewer camera inspection', icon: 'video' } },
    crew: 'why',
    cta: { eyebrow: 'Main line trouble?', h: ['Need main line repair', 'in Pomona?'], sub: 'Call now. A real person picks up, day or night.' },
    faqIntro: 'What Pomona homeowners ask us most about main sewer and water lines.',
    faqs: [
      { q: "How do I know it's the main line?", a: 'More than one fixture acting up at once is the big sign.' },
      { q: 'Do you have to dig up my yard?', a: `It depends on the problem. We'll tell you your options. ${ph('Trenchless offered: Jim to confirm')}` },
      { q: 'Who owns the line to the street?', a: 'Usually the homeowner, from the house to the city connection. Ask your city to be sure.' },
      { q: 'How much does main line repair cost?', a: PRICE },
    ],
    related: ['sewer-camera-inspection-pomona', 'rooter-service-pomona', 'leak-detection-pomona'], relatedEyebrow: 'More drain & sewer help', relatedLine: 'These help find or prevent main line problems.',
    contact: { line1: 'Main line', line2: 'trouble?', text: "Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: 'Main sewer and water line fixes.',
  },

  /* ------------------------------------------------------------------ REPIPING */
  'repiping-pomona': {
    slug: 'repiping-pomona', name: 'Repiping', eyebrow: 'Copper pipe & repiping · Pomona, CA',
    h1: ['Pinhole? Repiping', 'in Pomona'],
    sub: 'Copper pipe repair for one leak. A whole-house repipe when the leaks keep coming.',
    problemsLabel: 'Sounds like yours?',
    problems: ['Pinhole leaks in copper', 'Brown water from old galvanized pipe', 'Low pressure all over the house'],
    hero: { bg: P.night },
    form: { title: 'Old pipes? Get a call back', sub: 'Leave your number. We call you back.', label: "What's going on?", options: ['Pinhole leak', 'Brown or rusty water', 'Low pressure', 'Thinking about a repipe', 'Not sure'] },
    clear: {
      eyebrow: 'What we fix', h: ['Repiping in Pomona for', 'pinholes, rust and low pressure'],
      cards: [
        { title: 'Pinhole leaks in copper', icon: 'drop', notice: ['A tiny spray or drip from a pipe', 'Green spots on copper', 'Second or third leak this year'], fix: 'One leak: we cut out the bad section and replace it. Leak after leak: we talk about a repipe.' },
        { title: 'Brown water from galvanized', icon: 'alert', notice: ['Brown or rusty water at first', 'Stained sinks and tubs', 'Older home with grey steel pipe'], fix: 'Old galvanized pipe rusts from the inside. Replacing it fixes the water and the pressure.' },
        { title: 'Low pressure everywhere', icon: 'zap', notice: ['Weak shower and slow sink fills', 'Worse when two things run', 'Same at every tap'], fix: 'Scale and rust narrow old pipe. New pipe brings the pressure back.' },
      ],
      foot: `Pipe spraying now? Shut off the main water valve and <a href="tel:+19095870711">call 909-587-0711.</a>`,
    },
    why: {
      h: ['Why choose us for', 'repiping in Pomona'], tag: 'Repair when it makes sense. Repipe when it saves you money.',
      body: 'A repipe is a big decision. We look at how many leaks you have had, the pipe and the home, and tell you straight which way makes sense.',
      bullets: [
        { b: 'Honest call.', t: 'One leak is a repair, not a repipe.' },
        { b: 'Copper or PEX.', t: 'We explain both and you choose.' },
        { b: 'Neat work.', t: 'We plan the route to open as little wall as we can.' },
        { b: 'Clear price first.', t: 'You know the cost before we start.' },
      ],
      stat: { big: '24/7', small: 'Pipe burst? A real person picks up.' }, photo: P.roof,
    },
    guide: {
      eyebrow: 'The pipe guide', h: ['Copper pipe and', 'repiping in Pomona'],
      intro: 'Most Pomona homes have copper water pipe, and many older ones still have galvanized steel. Hard water is tough on both. In copper, it can lead to small pinhole leaks over the years. In galvanized pipe, rust builds up inside until the water turns brown and the pressure drops. At some point, fixing one more leak stops making sense.',
      sections: [
        { id: 'repair-or-repipe', toc: 'Repair or repipe?', title: 'Repair or repipe?', blocks: [
          { type: 'p', html: '<strong>Repair</strong> when you have one leak and the rest of the pipe looks good. We cut out the bad section and put in new pipe.' },
          { type: 'p', html: '<strong>Repipe</strong> when leaks keep coming, when the pipe is galvanized and rusty, or when the pressure is low everywhere. A repipe replaces the water lines in the house with new pipe, so you stop paying for leak after leak and the water damage that comes with them.' },
        ] },
        { id: 'how', toc: 'How a repipe works', title: 'How a repipe works', blocks: [
          { type: 'steps', items: [
            { b: 'Walk through.', t: 'We look at the pipe, the fixtures and how the lines run.' },
            { b: 'Plan the route.', t: 'Through the attic, crawl space or walls, opening as little as we can.' },
            { b: 'Run new lines.', t: 'New supply lines to each fixture, then connect them.' },
            { b: 'Test and turn on.', t: 'We check for leaks and pressure before we close up.' },
            { b: 'Patch openings.', t: `${ph('Who patches drywall: Jim to confirm')}` },
          ] },
          { type: 'tip', title: 'How long does it take?', icon: 'clock', html: `It depends on the size of the house and how the pipe runs. ${ph('Typical number of days: Jim to confirm')}` },
        ] },
        { id: 'signs', toc: 'Signs it is time', title: 'Signs it is time to repipe', blocks: [
          { type: 'checks', items: ['More than one pinhole leak in a year or two.', 'Brown or rusty water, mostly first thing in the morning.', 'Low pressure at every tap.', 'Galvanized pipe that is decades old.', 'A slab leak, and the copper looks worn elsewhere.'] },
        ] },
        { id: 'near', toc: 'Repiping near Pomona', title: 'Repiping near Pomona', blocks: [
          { type: 'towns', html: towns([DIA, CHH, CLA, UPL, ONT, WAL], 'We repair copper pipe and repipe homes in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Leak right now?', sub: 'Shut off the main water valve, then call. A real person picks up.', tip: { title: 'Leak you can\'t see?', text: 'Warm floor or high bill? We find hidden and slab leaks.', href: '/leak-detection-pomona/', label: 'See leak detection', icon: 'search' } },
    compare: {
      eyebrow: 'Copper or PEX?', h: ['Which pipe fits', 'your home?'],
      labels: ['What it is', 'Install', 'Freeze & bend', 'Hard water', 'Best for'],
      left: { title: 'Copper', sub: 'The classic metal pipe.', icon: 'wrench', rows: ['Rigid metal pipe', 'More cutting and soldering', 'Rigid, needs fittings at turns', 'Can wear thin over many years', 'Repairs that match existing pipe'] },
      right: { title: 'PEX', sub: 'Flexible plastic water pipe.', icon: 'zap', rows: ['Flexible plastic tubing', 'Often faster to run', 'Bends around corners', 'Does not corrode like metal', 'Whole-house repipes'] },
      note: "Both work. We'll explain both and you choose.",
    },
    crew: 'family', crewLine: 'The same family crew, on every pipe in your home.',
    cta: { eyebrow: 'Old pipes?', h: ['Need repiping', 'in Pomona?'], sub: 'Call now. A real person picks up, day or night.' },
    faqIntro: 'What Pomona homeowners ask us most about copper pipe and repiping.',
    faqs: [
      { q: 'Repair or repipe?', a: 'One leak: repair. Leak after leak: a repipe usually costs less in the end.' },
      { q: 'Copper or PEX?', a: "Both work. PEX is flexible and often faster to install. We'll explain both." },
      { q: 'How long does a repipe take?', a: `Depends on the house size. ${ph('Typical number of days: Jim to confirm')}` },
      { q: 'How much does a repipe cost?', a: PRICE },
    ],
    related: ['leak-detection-pomona', 'water-heater-pomona', 'plumbing-repair-pomona'], relatedEyebrow: 'More water & pipe help', relatedLine: 'Pipes, leaks and hot water go together.',
    contact: { line1: 'Tired of', line2: 'leaks?', text: "Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: 'Copper pipe repair and full repipes.',
  },

  /* ------------------------------------------------------------------ GAS INSTALL */
  'gas-line-installation-pomona': {
    slug: 'gas-line-installation-pomona', name: 'Gas line installation', eyebrow: 'Gas line installation · Pomona, CA',
    h1: ['New gas line', 'installation in Pomona'],
    sub: 'Gas lines for stoves, dryers, grills, fire pits and pool heaters, sized right for your home.',
    safety: 'Smell gas? Leave the house first, then call SoCalGas from outside.',
    problemsLabel: 'What are you adding?',
    problems: ['Switching to a gas stove or dryer', 'Gas line for the BBQ or fire pit', 'Pool heater needs gas'],
    hero: { bg: { src: gasBg, alt: 'A plumber working on yellow gas pipes (stand-in photo)', standIn: true, pos: '65% 40%' } },
    form: { title: 'New gas line? Get a call back', sub: 'Tell us what you are adding. We call you back.', label: 'What for?', options: ['Stove or range', 'Dryer', 'BBQ or grill', 'Fire pit', 'Pool heater', 'Water heater', 'Something else'] },
    clear: {
      eyebrow: 'What we run lines to', h: ['Gas line installation in Pomona', 'inside and out'],
      cards: [
        { title: 'Kitchen & laundry', icon: 'home', notice: ['Switching from electric to a gas stove', 'New gas dryer', 'Moving an appliance across the room'], fix: 'We run a new line and shutoff valve to the spot, and connect the appliance.' },
        { title: 'Backyard', icon: 'flame', notice: ['Built-in BBQ or grill', 'Fire pit or fire table', 'Outdoor kitchen plans'], fix: 'We plan the route from the house to the yard and run a line sized for what you are adding.' },
        { title: 'Pool & water heaters', icon: 'fuel', notice: ['New pool or spa heater', 'Switching to tankless', 'Bigger appliance than before'], fix: 'Big burners need more gas. We check the line size so everything gets enough at once.' },
      ],
      foot: `Planning a project? <a href="tel:+19095870711">Call 909-587-0711</a> and tell us everything that will run on gas.`,
    },
    why: {
      h: ['Why choose us for', 'gas line installation'], tag: 'Sized right, so every appliance gets enough gas.',
      body: 'Adding appliances can be more than the old line can feed. We check what you have and what you are adding before we run anything new.',
      bullets: [
        { b: 'We check the size.', t: 'Total gas demand, length of run and the meter.' },
        { b: 'Shutoff at each appliance.', t: 'So each one can be turned off on its own.' },
        { b: 'Clean routes.', t: 'Planned through the attic, crawl space or yard.' },
        { b: 'Permits.', t: `Usually needed for new lines. ${ph('Who pulls permits: Jim to confirm')}` },
      ],
      stat: { big: '1 plan', small: 'Every gas appliance, sized together.' }, photo: P.van,
    },
    guide: {
      eyebrow: 'The gas line guide', h: ['Gas line installation', 'in Pomona, CA'],
      intro: 'More Pomona homeowners are adding outdoor kitchens, fire pits and pool heaters, or switching to gas stoves and dryers. Each new appliance needs a gas line, a shutoff valve and enough gas to run alongside everything else in the house. United Plumbing plans and runs new gas lines for homes in Pomona and the towns around it.',
      sections: [
        { id: 'size', toc: 'Is my line big enough?', title: 'Is my gas line big enough?', blocks: [
          { type: 'p', html: 'Every gas appliance uses a certain amount of gas when it runs. Add them together, look at how far the gas has to travel, and you get the size of pipe you need. A line that was fine for a stove and a water heater may be too small once you add a pool heater or a tankless water heater. When that happens, burners run weak or appliances shut off. We check before we install.' },
        ] },
        { id: 'what', toc: 'What we connect', title: 'What we can run a gas line to', blocks: [
          { type: 'cards', items: [
            { t: 'Stoves & ranges', d: 'Including moving a kitchen layout.', icon: 'flame' },
            { t: 'Dryers', d: 'New laundry rooms or switching from electric.', icon: 'home' },
            { t: 'Grills & fire pits', d: 'Built-in BBQs, fire tables and outdoor kitchens.', icon: 'fuel' },
            { t: 'Pool & water heaters', d: 'Including tankless water heaters.', icon: 'drop' },
          ] },
        ] },
        { id: 'how', toc: 'How we install', title: 'How we install a gas line', blocks: [
          { type: 'steps', items: [
            { b: 'List everything.', t: 'What you have now and what you are adding.' },
            { b: 'Plan the route.', t: 'From the meter or existing line to the new spot.' },
            { b: 'Run the line.', t: 'With a shutoff valve at each appliance.' },
            { b: 'Test before gas on.', t: 'We check for leaks before connecting.' },
            { b: 'Connect and light.', t: 'We hook up the appliance and make sure it runs right.' },
          ] },
        ] },
        { id: 'near', toc: 'Gas lines near Pomona', title: 'Gas line installation near Pomona', blocks: [
          { type: 'towns', html: towns([DIA, WAL, CHH, CLA, LAV, RAN], 'We install gas lines in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Planning a project?', sub: 'Tell us everything that will run on gas. A real person picks up.', tip: { title: 'Gas smell or bad valve?', text: 'Leaks and worn connectors are a repair job.', href: '/gas-line-repair-pomona/', label: 'See gas line repair', icon: 'alert' } },
    crew: 'family', crewLine: 'One family crew plans and runs every gas line.',
    cta: { eyebrow: 'Adding a gas appliance?', h: ['Need a new gas line', 'in Pomona?'], sub: 'Call now. Tell us what you are adding.' },
    faqIntro: 'What Pomona homeowners ask us most about new gas lines.',
    faqs: [
      { q: 'What can you run a gas line to?', a: 'Stoves, dryers, water heaters, grills, fire pits and pool heaters.' },
      { q: 'Is my gas line big enough?', a: 'Adding appliances can need a bigger line. We check before we install.' },
      { q: 'Do I need a permit?', a: `Usually yes. ${ph('Who pulls permits: Jim to confirm')}` },
      { q: 'How much does a new gas line cost?', a: PRICE },
    ],
    related: ['gas-line-repair-pomona', 'water-heater-pomona', 'adu-plumbing-pomona'], relatedEyebrow: 'More gas & home help', relatedLine: 'Often part of the same project.',
    contact: { line1: 'Adding', line2: 'gas?', text: "Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: 'Lines for stoves, dryers, grills, fire pits.',
  },

  /* ------------------------------------------------------------------ HOME PLUMBING */
  'residential-plumbing-pomona': {
    slug: 'residential-plumbing-pomona', name: 'Home plumbing', eyebrow: 'Home plumbing · Pomona, CA',
    h1: ['Fixed. Toilets, faucets', '& disposals in Pomona'],
    sub: 'The everyday plumbing jobs around the house, done right and explained in plain words.',
    problemsLabel: 'Sounds like yours?',
    problems: ['Toilet runs all night', 'Faucet drips or leaks under the sink', 'Garbage disposal hums but won\'t spin'],
    hero: { bg: P.dusk },
    form: { title: 'Need a fix? Get a call back', sub: 'Leave your number. We call you back.', label: 'What needs fixing?', options: ['Toilet', 'Faucet', 'Garbage disposal', 'Laundry hookup', 'More than one thing', 'Not sure'] },
    clear: {
      eyebrow: 'What we fix', h: ['Home plumbing in Pomona for', 'toilets, faucets and disposals'],
      cards: [
        { title: 'Running toilet', icon: 'drop', notice: ['You hear it refill at night', 'Handle has to be jiggled', 'Water trickles into the bowl'], fix: 'Most running toilets just need new parts inside the tank. We swap them and set the water level.' },
        { title: 'Dripping faucet', icon: 'wrench', notice: ['Drip that will not stop', 'Water under the sink cabinet', 'Handle is loose or stiff'], fix: 'We fix the cartridge or washer, or replace the faucet if it is worn out. Then we check under the sink.' },
        { title: 'Stuck disposal', icon: 'zap', notice: ['Hums but will not spin', 'Leaks from the bottom', 'Trips the reset button'], fix: 'A hum usually means it is jammed. A leak from the body usually means a new unit.' },
      ],
      foot: `Have a list? <a href="tel:+19095870711">Call 909-587-0711</a> and we'll go through it in one visit.`,
    },
    why: {
      h: ['Why choose us for', 'home plumbing in Pomona'], tag: 'No job too small. Really.',
      body: 'A dripping faucet is a real job to us. We show up, fix it right, and tell you what we did.',
      bullets: [
        { b: 'Small jobs welcome.', t: 'One faucet or a whole list.' },
        { b: 'Repair first.', t: 'Parts before a whole new fixture, when that makes sense.' },
        { b: 'Your fixtures.', t: `We can install ones you bought. ${ph('Jim to confirm')}` },
        { b: 'Clean up after.', t: 'We leave the space the way we found it.' },
      ],
      stat: { big: 'ES · EN', small: 'Hablamos español. Ask for Jim.' }, photo: P.van,
    },
    guide: {
      eyebrow: 'The home guide', h: ['Everyday plumbing', 'in Pomona homes'],
      intro: 'Most plumbing calls are not emergencies. They are the toilet that runs all night, the faucet that will not stop dripping, the disposal that jammed on a peach pit. Small problems like these waste water and get worse over time. United Plumbing fixes them in homes across Pomona and the towns around it.',
      sections: [
        { id: 'toilets', toc: 'Toilets', title: 'Toilets', blocks: [
          { type: 'p', html: 'A running toilet can waste a lot of water without you noticing. The usual cause is a worn flapper or fill valve inside the tank, and both are simple to replace. A toilet that rocks, leaks at the base or keeps clogging may need a new wax seal, a new flange or, sometimes, a new toilet. If it keeps clogging, see <a href="/drain-cleaning-pomona/">drain cleaning</a>.' },
        ] },
        { id: 'faucets', toc: 'Faucets & sinks', title: 'Faucets and sinks', blocks: [
          { type: 'p', html: 'Drips usually come from a worn cartridge or washer. Water under the sink can come from the supply lines, the shutoff valves or the drain trap. Pomona\'s hard water leaves mineral crust on aerators and inside cartridges, so faucets here can wear faster.' },
          { type: 'tip', title: 'Know your shutoffs', icon: 'wrench', html: 'Every sink and toilet should have its own small shutoff valve. If yours are stiff or leak when turned, ask us to replace them while we are there.' },
        ] },
        { id: 'disposals', toc: 'Disposals & laundry', title: 'Garbage disposals and laundry', blocks: [
          { type: 'cards', items: [
            { t: 'Jammed disposal', d: 'Hums but will not spin. Often cleared without a new unit.', icon: 'zap' },
            { t: 'Leaking disposal', d: 'A leak from the body usually means replace.', icon: 'drop' },
            { t: 'Washer boxes & valves', d: 'Hookups for a new washer, or worn valves replaced.', icon: 'home' },
            { t: 'Laundry drains', d: 'Slow laundry drains and lint clogs cleared.', icon: 'wrench' },
          ] },
        ] },
        { id: 'near', toc: 'Home plumbing near Pomona', title: 'Home plumbing near Pomona', blocks: [
          { type: 'towns', html: towns([CLA, LAV, MON, SAN, CHI, ONT], 'We fix toilets, faucets and disposals in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Got a list?', sub: 'Call or text it to us. A real person picks up.', tip: { title: 'Drain slow, too?', text: 'Slow sinks and tubs are a quick fix while we are there.', href: '/drain-cleaning-pomona/', label: 'See drain cleaning', icon: 'drop' } },
    crew: 'family', crewLine: 'Same family, same care, on the small jobs too.',
    cta: { eyebrow: 'Something to fix?', h: ['Need a plumber', 'at home in Pomona?'], sub: 'Call now. A real person picks up, day or night.' },
    faqIntro: 'What Pomona homeowners ask us most about everyday plumbing.',
    faqs: [
      { q: 'Do you install fixtures I bought myself?', a: `Yes. Tell us the model when you call. ${ph('Jim to confirm')}` },
      { q: 'Repair or replace my toilet?', a: 'Most running toilets just need new parts inside the tank.' },
      { q: 'Do you do laundry hookups?', a: 'Yes. Washer boxes, valves and drain lines.' },
      { q: 'How much does it cost?', a: PRICE },
    ],
    related: ['plumbing-repair-pomona', 'drain-cleaning-pomona', 'water-heater-pomona'], relatedEyebrow: 'More home help', relatedLine: 'Other jobs we often do on the same visit.',
    contact: { line1: 'What needs', line2: 'fixing?', text: "Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: 'Toilets, faucets, disposals, laundry.',
  },

  /* ------------------------------------------------------------------ ADU */
  'adu-plumbing-pomona': {
    slug: 'adu-plumbing-pomona', name: 'ADU plumbing', eyebrow: 'ADU plumbing · Pomona, CA',
    h1: ['Building? ADU plumbing', 'in Pomona'],
    sub: 'Water, sewer and fixture plumbing for your backyard unit, with you or your builder.',
    problemsLabel: 'Where are you in the project?',
    problems: ['Need water and sewer run to the backyard', 'Bathroom and kitchen rough-in', 'Tying the ADU into the main sewer'],
    hero: { bg: P.dusk },
    form: { title: 'Building an ADU? Get a call back', sub: 'Tell us where the project is. We call you back.', label: 'Project stage', options: ['Planning', 'Water & sewer lines', 'Rough-in', 'Fixtures / finish', 'Not sure'] },
    clear: {
      eyebrow: 'What we plumb', h: ['ADU plumbing in Pomona from', 'lines to fixtures'],
      cards: [
        { title: 'Water & sewer lines', icon: 'drop', notice: ['ADU is far from the house', 'Need a new water line out back', 'Sewer has to reach the main'], fix: 'We run water and sewer from the house to the unit, with the slope and size the job needs.' },
        { title: 'Rough-in', icon: 'wrench', notice: ['Walls are framed', 'Bathroom and kitchen layout set', 'Inspection coming up'], fix: 'We run the supply and drain lines inside the walls and floor before they close up.' },
        { title: 'Fixtures & finish', icon: 'home', notice: ['Walls are done', 'Toilet, sink and shower to set', 'Water heater to install'], fix: 'We set and connect fixtures and the water heater, then test everything.' },
      ],
      foot: `Still planning? <a href="tel:+19095870711">Call 909-587-0711</a> early. Sewer routes are easier to plan before the slab is poured.`,
    },
    why: {
      h: ['Why choose us for', 'ADU plumbing in Pomona'], tag: 'One family crew, from the main line to the faucet.',
      body: 'An ADU ties into almost every system in your home. We plan the lines with you or your builder so the unit works and the main house keeps working too.',
      bullets: [
        { b: 'Work with your builder.', t: 'Or with you directly.' },
        { b: 'Sewer checked first.', t: 'Size, slope and condition of the line you tie into.' },
        { b: 'Every stage.', t: 'Lines, rough-in and finish.' },
        { b: 'Permits & inspections.', t: `${ph('Who pulls permits: Jim to confirm')}` },
      ],
      stat: { big: 'Lines to fixtures', small: 'Water, sewer and gas planned together.' }, photo: P.roof,
    },
    guide: {
      eyebrow: 'The ADU guide', h: ['ADU plumbing', 'in Pomona, CA'],
      intro: 'Accessory dwelling units, the backyard homes and garage conversions many people call ADUs, are going up all over Pomona and the Inland Empire. Every one needs water, a sewer connection and usually a water heater. Plumbing is one of the parts of an ADU that is hardest to change later, so it pays to plan it early.',
      sections: [
        { id: 'sewer', toc: 'Can it share my sewer?', title: 'Can the ADU share my sewer line?', blocks: [
          { type: 'p', html: 'Often, yes. It depends on the size, slope and condition of your existing line. An old clay line full of roots is a poor thing to tie a new unit into. That is why we often suggest a <a href="/sewer-camera-inspection-pomona/">sewer camera inspection</a> before the ADU sewer is designed. If the ADU sits lower than the main line, it may need a pump.' },
        ] },
        { id: 'stages', toc: 'Plumbing stages', title: 'The plumbing stages of an ADU', blocks: [
          { type: 'steps', items: [
            { b: 'Plan.', t: 'Where water, sewer and gas will come from, and the route to the unit.' },
            { b: 'Underground.', t: 'Lines in the trench and under the slab before concrete.' },
            { b: 'Rough-in.', t: 'Supply and drain lines inside walls before drywall.' },
            { b: 'Finish.', t: 'Toilet, sinks, shower, kitchen and water heater set and tested.' },
          ] },
        ] },
        { id: 'water', toc: 'Water & gas', title: 'Water and gas for the unit', blocks: [
          { type: 'p', html: 'The ADU needs enough water pressure for its own shower and kitchen while the main house is using water too. If the unit will have gas appliances, the gas line has to be sized for both homes together. See <a href="/gas-line-installation-pomona/">gas line installation</a>.' },
          { type: 'tip', title: 'Talk to us before the slab', icon: 'calendar', html: 'Underground plumbing is set before concrete is poured. Changes after that are much harder. Call early.' },
        ] },
        { id: 'near', toc: 'ADU plumbing near Pomona', title: 'ADU plumbing near Pomona', blocks: [
          { type: 'towns', html: towns([CLA, LAV, ONT, UPL, CHI, RAN], 'We plumb ADUs in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Planning an ADU?', sub: 'Call early. A real person picks up.', tip: { title: 'Gas in the ADU?', text: 'Stoves, dryers and water heaters need the line sized for both homes.', href: '/gas-line-installation-pomona/', label: 'See gas line installation', icon: 'fuel' } },
    crew: 'family', crewLine: 'One family crew, from the main line to the last faucet.',
    cta: { eyebrow: 'Building an ADU?', h: ['Need ADU plumbing', 'in Pomona?'], sub: 'Call now. Tell us where the project is.' },
    faqIntro: 'What Pomona homeowners and builders ask us most about ADU plumbing.',
    faqs: [
      { q: 'Do you work with my contractor?', a: 'Yes. We can work with your builder or with you directly.' },
      { q: 'Can the ADU share my sewer line?', a: "Often, yes. It depends on the line's size, slope and condition." },
      { q: 'Who handles permits and inspections?', a: `${ph('Who pulls permits: Jim to confirm')}` },
      { q: 'How much does ADU plumbing cost?', a: PRICE },
    ],
    related: ['sewer-camera-inspection-pomona', 'gas-line-installation-pomona', 'water-heater-pomona'], relatedEyebrow: 'More home project help', relatedLine: 'ADU projects usually touch these too.',
    contact: { line1: 'Building', line2: 'an ADU?', text: "Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: 'Plumbing for your backyard unit.',
  },

  /* ------------------------------------------------------------------ GENERAL REPAIR */
  'plumbing-repair-pomona': {
    slug: 'plumbing-repair-pomona', name: 'Plumbing repair', eyebrow: 'Plumbing repair · Pomona, CA',
    h1: ['Any job. Plumbing', 'repair in Pomona'],
    sub: 'If water runs through it, we fix it. Big jobs, small jobs and the ones you can\'t name.',
    problemsLabel: 'Sounds like yours?',
    problems: ['Leaking valve or shutoff', 'Low water pressure', "Something's wrong and you're not sure what"],
    hero: { bg: P.night },
    form: { title: 'Something wrong? Get a call back', sub: 'Tell us what you see or hear. We call you back.', label: "What's going on?", options: ['Leak', 'Low pressure', 'Noise in the pipes', 'A few small things', 'Not sure'] },
    clear: {
      eyebrow: 'What we fix', h: ['Plumbing repair in Pomona for', 'the everyday and the odd'],
      cards: [
        { title: 'Leaking valves', icon: 'wrench', notice: ['Drip at the main shutoff', 'Hose bib that will not close', 'Valve that will not turn'], fix: 'We replace worn valves and hose bibs so you can shut water off when you need to.' },
        { title: 'Low pressure', icon: 'zap', notice: ['One tap is weak', 'Whole house is weak', 'Pressure dropped suddenly'], fix: 'One tap: often a clogged aerator or valve. Whole house: the regulator, the main, or old pipe.' },
        { title: 'Not sure what it is', icon: 'help', notice: ['Banging pipes', 'A smell you can\'t place', 'Water where it shouldn\'t be'], fix: 'Tell us what you see and hear. We find it, and explain it in plain words.' },
      ],
      foot: `Have a list? <a href="tel:+19095870711">Call 909-587-0711</a> and we'll go through it in one visit.`,
    },
    why: {
      h: ['Why choose us for', 'plumbing repair in Pomona'], tag: 'Small jobs welcome. Odd ones too.',
      body: 'You don\'t need to know what it is called. Tell us what is happening and we will figure it out.',
      bullets: [
        { b: 'Any size.', t: 'A dripping hose bib is a real job to us.' },
        { b: 'A few things at once.', t: 'Make a list and we will go through it.' },
        { b: 'Plain words.', t: 'In English or Spanish.' },
        { b: 'Clear price first.', t: 'You say yes before we start.' },
      ],
      stat: { big: '24/7', small: 'A real person picks up, any hour.' }, photo: P.roof,
    },
    guide: {
      eyebrow: 'The repair guide', h: ['Plumbing repair', 'in Pomona, CA'],
      intro: 'Not every plumbing problem has a neat name. Sometimes it is a valve that drips, a pipe that bangs when the washer shuts off, or a little water under the house you can\'t explain. United Plumbing handles general plumbing repair in homes across Pomona and nearby towns. If water runs through it, we work on it.',
      sections: [
        { id: 'common', toc: 'Common repairs', title: 'Repairs we do every week', blocks: [
          { type: 'cards', items: [
            { t: 'Valves & hose bibs', d: 'Main shutoffs, fixture valves, outdoor spigots.', icon: 'wrench' },
            { t: 'Pressure regulators', d: 'Too high or too low pressure at every tap.', icon: 'zap' },
            { t: 'Noisy pipes', d: 'Banging, hammering or whistling lines.', icon: 'alert' },
            { t: 'Small leaks', d: 'Under sinks, at fittings, under the house.', icon: 'drop' },
          ] },
        ] },
        { id: 'pressure', toc: 'Low water pressure', title: 'Low water pressure', blocks: [
          { type: 'p', html: 'If only one tap is weak, the problem is usually at that fixture: a clogged aerator, a worn cartridge or a half-closed valve. If the whole house is weak, look at the pressure regulator near where the water comes in, the main water line, or old galvanized pipe that has rusted inside. See <a href="/repiping-pomona/">repiping</a> and <a href="/main-line-repair-pomona/">main line repair</a>.' },
          { type: 'tip', title: 'Hard water hint', icon: 'drop', html: 'Pomona water is hard. Mineral crust on aerators and shower heads is common and easy to clean or replace.' },
        ] },
        { id: 'visit', toc: 'Make the most of a visit', title: 'Make the most of one visit', blocks: [
          { type: 'checks', items: ['Walk the house and list every drip, slow drain and loose handle.', 'Find your main water shutoff so we can show you how it works.', 'Take photos of anything odd and text them to (909) 587-0711.', 'Tell us the age of your water heater if you can see the label.'] },
        ] },
        { id: 'near', toc: 'Plumbing repair near Pomona', title: 'Plumbing repair near Pomona', blocks: [
          { type: 'towns', html: towns([CLA, LAV, MON, UPL, DIA, WAL], 'We do plumbing repairs in Pomona and nearby towns including') },
        ] },
      ],
    },
    aside: { title: 'Not sure what it is?', sub: 'Text us a photo. A real person picks up, day or night.', tip: { title: 'Leak you can\'t find?', text: 'Hidden leaks and slab leaks need a different approach.', href: '/leak-detection-pomona/', label: 'See leak detection', icon: 'search' } },
    crew: 'why',
    cta: { eyebrow: 'Something to fix?', h: ['Need plumbing repair', 'in Pomona?'], sub: 'Call now. A real person picks up, day or night.' },
    faqIntro: 'What Pomona homeowners ask us most about general plumbing repair.',
    faqs: [
      { q: 'Is my job too small?', a: 'No. Small jobs are welcome.' },
      { q: 'Can you look at a few things in one visit?', a: "Yes. Make a list and we'll go through it." },
      { q: "What if I don't know what's wrong?", a: "Tell us what you see and hear. We'll find it." },
      { q: 'How much does a repair cost?', a: PRICE },
    ],
    related: ['residential-plumbing-pomona', 'leak-detection-pomona', 'repiping-pomona'], relatedEyebrow: 'More home help', relatedLine: 'If it turns out to be one of these, we handle that too.',
    contact: { line1: 'Something', line2: 'not right?', text: "Call or text any hour, or send the form and we'll call you back. Backup line (909) 667-6555." },
    hubLine: 'If water runs through it, we fix it.',
  },
};

/* ------------------------------------------------------------------ EMERGENCY (location-type page, no Figma frame) */
export const EMERGENCY: ServiceContent & { title: string; description: string } = {
  slug: 'emergency-plumber-pomona', name: 'Emergency plumber', eyebrow: 'Emergency plumber · Pomona, CA',
  title: 'Emergency Plumber Pomona | Open 24/7 | Family Owned',
  description: 'Burst pipe, backed-up sewer or no hot water in Pomona? A real person picks up 24/7. Call United Plumbing now at (909) 587-0711.',
  h1: ['24/7 emergency plumber', 'in Pomona'],
  sub: 'Burst pipe, sewer backup or no hot water? Call any hour. A real person picks up and tells you what to do right now.',
  problemsLabel: 'Happening right now?',
  problems: ['Burst pipe spraying water', 'Sewer backing up into the tub', 'No hot water at night'],
  hero: { bg: P.night },
  form: { title: 'Emergency? Call first', sub: 'Calling is fastest. Or leave your number and we call you right back.', label: "What's happening?", options: ['Burst pipe', 'Sewer backup', 'No hot water', 'Leak', 'Gas smell (leave first)', 'Something else'] },
  doNow: { title: 'Do this now', steps: ['Shut off the main water valve.', 'Turn off the water heater.', 'Call (909) 587-0711.'] },
  clear: {
    eyebrow: 'Emergencies we handle', h: ['Emergency plumbing in Pomona', 'day or night'],
    cards: [
      { title: 'Burst or leaking pipe', icon: 'drop', notice: ['Water spraying or pouring', 'Ceiling stain growing fast', 'Water on the floor'], fix: 'Shut off the main valve. We find the break, stop the leak and fix the pipe.' },
      { title: 'Sewer backup', icon: 'alert', notice: ['Water coming up in the tub or shower', 'Toilets overflowing', 'Sewer smell inside'], fix: 'Stop using water. We clear the main line and tell you why it backed up.' },
      { title: 'No hot water', icon: 'flame', notice: ['Cold water only', 'Water heater leaking', 'Pilot out and will not relight'], fix: 'We check the cheap fixes first and tell you straight if it needs replacing.' },
    ],
    foot: `Smell gas? Leave the house first, then call SoCalGas from outside.`,
  },
  why: {
    h: ['Why Pomona calls us', 'when it can\'t wait'], tag: 'A real person picks up. Any hour.',
    body: 'In an emergency, you want someone who answers, tells you what to do right now, and shows up. That is how the Galvez brothers work.',
    bullets: [
      { b: 'We pick up.', t: 'Nights, weekends and holidays. Backup line (909) 667-6555.' },
      { b: 'We talk you through it.', t: 'Where to shut off water while we are on the way.' },
      { b: 'Fast in Pomona.', t: 'About an hour in most of Pomona.' },
      { b: 'Clear price first.', t: 'Even at night, you say yes before we start.' },
    ],
    stat: { big: '24/7', small: 'A real person picks up, day or night.' }, photo: P.snake,
  },
  guide: {
    eyebrow: 'The emergency guide', h: ['Emergency plumbing', 'in Pomona, CA'],
    intro: 'Plumbing emergencies happen at the worst times: a pipe bursts during a cold snap, the sewer backs up during a family party, the water heater gives out at night. United Plumbing is a family-owned plumber based in Pomona (91766, 91767, 91768), and we answer the phone 24/7. Here is what to do while we are on the way.',
    sections: [
      { id: 'first', toc: 'First 5 minutes', title: 'The first five minutes', blocks: [
        { type: 'wait', title: 'While you wait for us', items: [
          { k: 'Water spraying?', t: 'Shut off the main water valve. It is usually where the water line enters the house, or at the meter box by the street.' },
          { k: 'Sewer backing up?', t: 'Stop running water and stop flushing. Every gallon you use comes up at the lowest drain.' },
          { k: 'Water heater leaking?', t: 'Shut the cold water valve on top of the tank. Turn gas to "pilot" or "off," or turn off the breaker for electric.' },
          { k: 'Smell gas?', t: "Leave the house. Don't flip switches. Call SoCalGas or 911 from outside." },
        ] },
      ] },
      { id: 'homes', toc: 'Pomona homes', title: 'Why Pomona homes have the emergencies they do', blocks: [
        { type: 'p', html: `Many homes in neighborhoods like Lincoln Park, Westmont and the historic districts near downtown were built before 1970, with clay sewer lines and cast-iron drains. Tree roots in those old lines are one of the most common causes of sewer backups. Homes from the 1960s and 70s, in areas like Phillips Ranch, often sit on slabs with copper water lines, and hard water can lead to pinhole and slab leaks over time. ${ph('Local details: verify before launch')}` },
        { type: 'p', html: 'See <a href="/rooter-service-pomona/">rooter service</a>, <a href="/leak-detection-pomona/">leak detection</a> and <a href="/water-heater-pomona/">water heater repair</a> for more on each.' },
      ] },
      { id: 'how', toc: 'What happens when you call', title: 'What happens when you call', blocks: [
        { type: 'steps', items: [
          { b: 'A real person answers.', t: 'Tell us what is happening and where you are.' },
          { b: 'We tell you what to do now.', t: 'Usually where to shut off the water.' },
          { b: 'We tell you when we can be there.', t: 'About an hour in most of Pomona.' },
          { b: 'We give you a price.', t: 'Before any work starts.' },
          { b: 'We fix it and explain.', t: 'What broke, what we did, and how to keep it from happening again.' },
        ] },
      ] },
      { id: 'signs', toc: 'Is it an emergency?', title: 'Is it an emergency?', blocks: [
        { type: 'alert', title: 'Call right away if', items: ['Water is spraying, pouring or coming through a ceiling', 'Sewage is coming up inside the house', 'You have no water at all, or no way to shut it off', 'You smell gas (leave first, then call SoCalGas)', 'Water is near outlets, panels or appliances'], note: 'Anything else can usually wait for a regular visit. Not sure? Call (909) 587-0711 and ask.' },
      ] },
      { id: 'near', toc: 'Emergency plumber near Pomona', title: 'Emergency plumbing near Pomona', blocks: [
        { type: 'towns', html: towns([CLA, LAV, MON, UPL, ONT, CHI, DIA, SAN], 'We take emergency calls in Pomona and nearby towns including') },
      ] },
    ],
  },
  aside: { title: 'Emergency right now?', sub: 'Shut off the main water valve. Then call. A real person picks up.', tip: { title: 'Sewer coming up?', text: 'Stop running water. Roots are the usual cause in older Pomona homes.', href: '/rooter-service-pomona/', label: 'See rooter service', icon: 'wrench' } },
  crew: 'family', crewLine: 'The same family answers at 3 a.m. as at noon.',
  cta: { eyebrow: 'Plumbing emergency?', h: ['Need a plumber', 'right now?'], sub: 'Call now. A real person picks up, day or night.' },
  faqIntro: 'What people ask us most when something goes wrong at night.',
  faqs: [
    { q: 'Do you really answer at 3 a.m.?', a: 'Yes. A real person picks up 24/7. If the line is busy, call our backup line, (909) 667-6555.' },
    { q: 'How fast can you get here?', a: 'In Pomona, usually about an hour.' },
    { q: 'Does it cost more at night?', a: `${ph('After-hours pricing: Jim to confirm')} You always get the price before we start.` },
    { q: 'Where is my main water shutoff?', a: 'Usually where the water line enters the house, often near the front hose bib, or in the meter box by the street. Call and we will help you find it.' },
    { q: '¿Hablan español?', a: 'Sí. Hablamos español. Pregunte por Jim.' },
  ],
  related: ['drain-cleaning-pomona', 'water-heater-pomona', 'leak-detection-pomona'], relatedEyebrow: 'Emergency services', relatedLine: 'The emergencies we see most, and how we fix each one.',
  contact: { line1: 'Emergency?', line2: 'Call now.', text: 'Call (909) 587-0711 any hour. Backup line (909) 667-6555. Or leave your number and we call you right back.' },
  hubLine: 'Burst pipes, backups and no hot water, 24/7.',
};

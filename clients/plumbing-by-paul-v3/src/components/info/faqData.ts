// FAQ hub content (PAGES.md 13a F2/F3, Figma 441:3483). Every answer starts with the answer (AEO). FAQPage schema covers
// exactly these 13. STICKY 1 (hours, 10) and STICKY 3 (free estimates, 12): Paul to confirm.
// Paul's tips: 01, 02, 04, 07, 08, 09 (shown inside the open answer).
import { SITE } from '../../data/site';

export interface HubFaq { idx: string; q: string; a1: string; a2?: string; tip?: string; open?: boolean }
export interface HubGroup { id: string; cat: string; icon: string; items: HubFaq[] }

export const GROUPS: HubGroup[] = [
  { id: 'drains', cat: 'Drains and clogs', icon: 'waves', items: [
    { idx: '01', open: true, q: 'What should I do about a clogged toilet or drain?', a1: 'Try a plunger first.', a2: "If that doesn't clear it, or it clogs again within days, call a plumber, because something is lodged further down the line. We clear it and find out why it happened.", tip: 'Only flush toilet paper. Everything else goes in the trash.' },
    { idx: '02', q: 'How do I unclog my toilet?', a1: 'Use a flange plunger and firm, steady pressure.', a2: "If the bowl is filling, lift the tank lid and push the flapper closed to stop the water. If plunging doesn't work, the blockage is deeper and needs a plumber.", tip: 'A flange plunger seals better on a toilet than a cup plunger.' },
    { idx: '03', q: 'Several drains are slow at the same time. What does that mean?', a1: 'It usually means the main line is blocked, not one drain.', a2: `Stop running water and call us at ${SITE.phone}.` },
  ] },
  { id: 'toilets', cat: 'Toilets', icon: 'toilet', items: [
    { idx: '04', open: true, q: "Why won't my toilet stop running?", a1: 'Usually the float or the fill valve in the tank needs adjusting or replacing.', a2: "It's a quick repair.", tip: "A running toilet can waste a lot of water in a day. Don't ignore it." },
    { idx: '05', q: 'Why does my toilet clog so easily?', a1: "Most often there's a partial blockage in the drain that grows with each flush.", a2: 'Too much paper and wipes are common causes. It can also be a venting or water flow problem, which we can check.' },
    { idx: '06', q: 'Is a low-flush toilet worth it?', a1: 'Yes, for most homes.', a2: 'It uses less water per flush, which lowers your water bill, and modern ones work as well as older models. We can help you choose one and install it.' },
  ] },
  { id: 'pressure', cat: 'Water pressure', icon: 'shower', items: [
    { idx: '07', q: 'Why is my shower pressure so weak?', a1: 'The usual causes are hard-water build-up in the pipes or shower head, sediment in the water heater, or a partly blocked water line.', a2: 'A plumber can tell you which.', tip: 'Pinellas has hard water. A softener helps over time.' },
    { idx: '08', q: "One tap has very low flow. What's wrong?", a1: 'Usually the aerator, the small screen at the tip of the faucet, is clogged with minerals.', a2: "Unscrew it, rinse it and put it back. If that doesn't fix it, there may be a leak or blockage in the line.", tip: 'Soak the aerator in white vinegar overnight.' },
  ] },
  { id: 'emergencies', cat: 'Emergencies', icon: 'siren', items: [
    { idx: '09', open: true, q: 'How do I shut off the water to the whole house?', a1: 'Turn the main shut-off valve clockwise until it stops.', a2: "It's usually outside, near your water meter.", tip: 'Show everyone in the house where it is today, not during a flood.' },
    { idx: '10', q: 'What should I do in a plumbing emergency?', a1: 'Shut off the water at the main valve, stay away from anything electrical near the water, and call ' + SITE.phone + '.', a2: "We'll talk you through the next steps." },
  ] },
  { id: 'working', cat: 'Working with us', icon: 'users', items: [
    { idx: '11', open: true, q: 'Are you licensed?', a1: 'Yes.', a2: `${SITE.legalName} is a ${SITE.licenceLabel}, licence ${SITE.licence}. You can verify it at myfloridalicense.com.` },
    { idx: '12', q: 'Do you give free estimates?', a1: 'Yes.', a2: 'Estimates are free and you hear the price before work starts.' },
    { idx: '13', q: 'What areas do you serve?', a1: 'All of Pinellas County from our shop in St. Petersburg, including Clearwater and Seminole.' },
  ] },
];

export const TIPS = [
  { t: 'Get it checked once a year.', d: 'Small problems are cheap.', i: 'calendar' },
  { t: 'Only flush toilet paper.', d: 'No wipes, ever.', i: 'toilet' },
  { t: 'Use drain guards.', d: 'Hair stays out of the pipe.', i: 'filter' },
  { t: 'Know your shut-off valve.', d: 'Before you need it.', i: 'pipe' },
  { t: 'Fix leaks early.', d: 'Drips get worse, never better.', i: 'droplets' },
  { t: 'Think about a softener.', d: 'Our water is hard on pipes and appliances.', i: 'drop' },
];

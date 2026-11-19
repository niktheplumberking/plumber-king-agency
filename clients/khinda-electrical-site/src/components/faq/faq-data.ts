// FAQ page (Figma 10). Topic 01 (Permits & law, 4 questions) is Figma's copy; Figma draws only Q01's answer, so Q02-Q04 and
// topics 02-05 (2 answers each, 12 in all as the hero says) reuse lines already on the site (src/data/faq.ts,
// src/data/service-pages.ts): no new facts. Every answer ends in a call or a text. Sources as the site cites them.
import { SITE } from '../../data/site';
export type FaqQ = { q: string; a: string; src?: string; link?: { t: string; tm?: string; href: string } };
export type FaqTopic = { key: string; tab: string; gauge: string; title: [string, string?]; cable: string; ask: string; qs: FaqQ[] };
const CALL = { t: `Not sure your job counts? Call ${SITE.phone} →`, tm: `Not sure? Call ${SITE.phone} →`, href: SITE.tel };
const PHOTO = { t: 'Text a photo of the panel →', href: SITE.sms };
export const TOPICS: FaqTopic[] = [
  {
    key: 'permits', tab: 'Permits & law', gauge: '14/2', title: ['Permits', '& law'], cable: '14/2 NMD90 · Permits', ask: 'Ask about a permit',
    qs: [
      { q: 'Do I need an electrical permit in Surrey?', a: 'For regulated work, yes. The City of Surrey issues its own electrical permits (Bylaw 15596), and a licensed contractor takes the permit out for you.', src: 'City of Surrey, Bylaw 15596', link: CALL },
      { q: 'Can a strata owner get a homeowner permit?', a: 'No. Technical Safety BC says strata owners can’t get homeowner permits, so a licensed contractor applies for the permit.', src: 'Technical Safety BC', link: CALL },
      { q: 'Which electrical code applies in BC?', a: 'The BC Electrical Code: the Canadian Electrical Code, 26th edition, in force since 4 March 2025.', src: 'Technical Safety BC', link: CALL },
      { q: 'Does the electrician need a TSBC licence?', a: 'For regulated electrical work, the permit is taken out by a licensed electrical contractor, and Technical Safety BC issues those licences.', src: 'Technical Safety BC', link: CALL },
    ],
  },
  {
    key: 'panels', tab: 'Panels', gauge: '12/2', title: ['Panels'], cable: '12/2 NMD90 · Panels', ask: 'Ask about your panel',
    qs: [
      { q: '100A or 200A?', a: 'Many homes adding an EV charger or a heat pump need 200A. A load calculation on your panel decides it, and he walks you through the result before any work starts.', link: { t: `Ask about your panel: ${SITE.phone} →`, href: SITE.tel } },
      { q: 'How long does a panel upgrade take?', a: 'It depends on your panel, the permit and the inspection. He looks first, then prices it: you hear the price before any work starts. A photo of the panel helps.', link: PHOTO },
    ],
  },
  {
    key: 'ev', tab: 'EV chargers', gauge: '10/3', title: ['EV', 'chargers'], cable: '10/3 NMD90 · EV chargers', ask: 'Ask about a charger',
    qs: [
      { q: 'Is there a rebate for a home EV charger?', a: 'BC Hydro’s home charger rebate: up to 50%, max $350, with a licensed electrician and a permit. Apply within 6 months of the charger invoice.', src: 'BC Hydro home charger rebate guide, 15 Jul 2026', link: { t: `Ask about your charger: ${SITE.phone} →`, href: SITE.tel } },
      { q: 'Are Tesla chargers covered by the rebate?', a: 'Not at this time: BC Hydro’s guide of 15 Jul 2026 says Tesla-manufactured EV chargers are not eligible.', src: 'BC Hydro home charger rebate guide, 15 Jul 2026', link: { t: `Ask about your charger: ${SITE.phone} →`, href: SITE.tel } },
    ],
  },
  {
    key: 'lighting', tab: 'Lighting', gauge: '14/3', title: ['Lighting'], cable: '14/3 NMD90 · Lighting', ask: 'Ask about your lights',
    qs: [
      { q: 'Do you install pot lights?', a: `Yes. Pot lights, chandeliers, pendants and soffit lights are all on his Instagram, ${SITE.igHandle}. Text a photo of the room to ${SITE.phone}.`, link: { t: 'Text a photo of the room →', href: SITE.sms } },
      { q: 'Do new lights need a permit in Surrey?', a: 'For regulated electrical work, yes. The City of Surrey issues electrical permits (Bylaw 15596) and a licensed contractor applies.', src: 'City of Surrey, Bylaw 15596', link: CALL },
    ],
  },
  {
    key: 'booking', tab: 'Booking & price', gauge: '6/3', title: ['Booking', '& price'], cable: '6/3 NMD90 · Booking', ask: 'Ask for a price',
    qs: [
      { q: 'How do I get a price?', a: `Call or text ${SITE.phone}. He looks at the job first, then prices it: you hear the price before any work starts.`, link: { t: `Call ${SITE.phone} →`, href: SITE.tel } },
      { q: 'Can I send a photo first?', a: `Yes. Text a photo of the panel, outlet or fixture to ${SITE.phone}, with your town. A photo shows the job faster than words, and the call that follows is shorter.`, link: { t: 'Text the photo →', href: SITE.sms } },
    ],
  },
];
export const FAQ_ALL = TOPICS.flatMap((t) => t.qs.map((q) => ({ q: q.q, a: q.a })));

// FAQ copy, word for word from the Figma frames (670:3208 / 670:5203) = PAGES-COPY 11.2, questions 1-9 (10 stays off the page).
// `a` is the answer as HTML for the page; FAQPage JSON-LD uses the same text with the tags stripped, so the two never drift.
import { SITE } from '../../data/site';
export interface Faq { id: string; topic: string; q: string; a: string; photo?: 'valve' | 'copper'; dm?: boolean }
const tel = `<a href="${SITE.tel}">${SITE.phone}</a>`;
export const FAQS: Faq[] = [
  { id: 'estimate', topic: 'Estimate', q: 'Is the estimate free?', a: `Yes. Call today for a free estimate: ${tel}.` },
  { id: 'hours', topic: 'Hours', q: 'Are you open 24 hours?', a: `Yelp lists us as <b>open 24 hours</b>, and we offer emergency services. Call ${tel}.` },
  { id: 'areas', topic: 'Areas', q: 'Where do you work?', a: `We're based in Riverside, CA and serve the Inland Empire, Orange County and Los Angeles. <a class="u" href="/service-areas">See the service areas page.</a>` },
  { id: 'commercial', topic: 'Commercial', q: 'Do you do commercial work?', a: "Yes. Residential and commercial. Commercial jobs on Mike's Instagram include a 100-gallon water heater at a restaurant and a grease interceptor baffle tee." },
  { id: 'services', topic: 'Services', q: 'What services do you offer?', a: 'Drain cleaning, repair &amp; new installation, sewer lines, hydro jetting, leak detection, leak repair, water heater install and repair, toilets, sinks &amp; faucets, garbage disposals, water filtration, emergency services, and more.' },
  { id: 'water-heaters', topic: 'Water heaters', q: 'My water heater stopped working. Do I need a new one?', a: 'Not always. Diagnosis matters. On one 75-gallon gas heater the owner was told to replace, the problem was simply the gas control valve. Let us look first.', photo: 'valve' },
  { id: 'photos', topic: 'Photos', q: 'Can I send you a photo of the problem?', a: `Yes. Mike's own words: <i>"If your house has any leaks and you see green buildup or a wet spot by the wall - DM me a picture"</i>. Instagram: <a href="${SITE.social.instagram}" target="_blank" rel="noopener">${SITE.social.instagramHandle}</a>.`, photo: 'copper', dm: true },
  { id: 'cost', topic: 'Cost', q: 'How much will it cost?', a: 'It depends on the job, so we start with a free estimate. Customers on Yelp have called our prices <b>"fair and competitive"</b> and <b>"quite reasonable"</b>.' },
  { id: 'who-comes', topic: 'Who comes', q: 'Who will come out?', a: `Mike's Plumbing Services is family owned and operated by ${SITE.owner}.` },
];
export const plain = (h: string) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
export const faqSchema = () => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
});

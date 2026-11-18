// Home FAQ ("Ask Mike."): the six Figma questions. Q1's answer is the Figma text; the others come from PAGES-COPY
// section 11.2 (sourced from Yelp, Mike's Instagram and his flyer). Rendered by Faq.astro and as FAQPage JSON-LD.
import { SITE } from '../../data/site';
export type Qa = { q: string; a: string; link?: { href: string; label: string } };
export const FAQ: Qa[] = [
  { q: 'Do you give free estimates?', a: `Yes. Call or text ${SITE.phone} and Mike will give you a free estimate before any work starts.`, link: { href: SITE.tel, label: 'Call for a free estimate' } },
  { q: 'Are you really open 24 hours?', a: `Yelp lists Mike as open 24 hours, and he offers emergency services. Call ${SITE.phone}.`, link: { href: '/emergency-plumber', label: 'What to do in an emergency' } },
  { q: 'Should I repair or replace my water heater?', a: 'Not always a new one. Diagnosis matters. On one 75-gallon gas heater the owner was told to replace, the problem was simply the gas control valve. Let Mike look first.', link: { href: '/water-heaters', label: 'Water heater repair and install' } },
  { q: 'Do you work on restaurants and businesses?', a: 'Yes. Residential and commercial. Commercial jobs on Mike\'s Instagram include a 100-gallon water heater at a restaurant and a grease interceptor baffle tee.', link: { href: '/services', label: 'Commercial plumbing' } },
  { q: 'How do I know if I have a hidden leak?', a: 'Look for green buildup on the pipes or a wet spot by the wall. In Mike\'s own words: "If your house has any leaks and you see green buildup or a wet spot by the wall - DM me a picture."', link: { href: SITE.sms, label: 'Text Mike a photo' } },
  { q: 'Which areas do you serve?', a: 'Mike is based in Riverside, CA and serves the Inland Empire, Orange County and Los Angeles.', link: { href: '/service-areas', label: 'See the service areas' } },
];
export const faqSchema = () => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: FAQ.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
});

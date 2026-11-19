// Home FAQ ("Ask the plumber."): the six Figma questions (712:448 FAQ rows Q01-Q06). Q02's answer is the Figma text; the
// other answers are the Glass FAQ page's own Figma copy (730:437) or facts from site.ts, nothing new. Rendered by Faq.astro
// and as FAQPage JSON-LD (the same visible text).
import { SITE } from '../../data/site';
export type Qa = {
  id: string; q: string; a: string; topic: string; chip: string; photo: string; alt: string; focus?: string;
  plate?: [string, string][]; link?: { href: string; label: string; m?: string };
};
export const TOPICS = ['Emergency', 'Water heaters', 'Water', 'Money', 'Photos'];
export const FAQ: Qa[] = [
  { id: 'q01', q: 'Do you really answer 24/7?', a: `Yes. For emergencies, call ${SITE.phone} any hour, day or night.`, topic: 'Emergency', chip: 'Emergency',
    photo: 'van-night', alt: 'The white Glass Plumbing van parked at night', focus: '50% 50%', link: { href: SITE.tel, label: `Call ${SITE.phone} →` } },
  { id: 'q02', q: 'Do I need a permit to replace a water heater in Pinellas?', a: 'Usually, yes. Pinellas County lists a “Water Heater Equal Change Out” permit, and Clearwater requires permits for water heaters. We handle it for you.',
    topic: 'Water heaters', chip: 'Water heaters', photo: 'water-heater-expansion-tank', alt: 'A new water heater being installed in a closet, its expansion tank on the floor beside it, with the words “Floor Drain Built In” on the photo', focus: '50% 40%',
    plate: [['Source', 'Pinellas County permits'], ['Also', 'City of Clearwater']], link: { href: '/services/water-heaters', label: 'See the water heater page →', m: 'Water heater page →' } },
  { id: 'q03', q: 'How hard is Pinellas County water?', a: 'Very hard. It averages 217 ppm, which is 11.1 to 14.3 grains per gallon. That builds scale inside tanks and tankless units.',
    topic: 'Water', chip: 'Water', photo: 'kitchen-faucet', alt: 'A new kitchen faucet over a granite counter', focus: '50% 40%',
    plate: [['Source', 'Pinellas County Utilities'], ['Report', '2025 water quality']], link: { href: '/services#hot-water', label: 'Softeners and filters →' } },
  { id: 'q04', q: 'Do you do commercial plumbing?', a: 'Yes. Commercial and residential: repipes, rough-in, remodels and commercial build-outs, for homes, shops and builders.',
    topic: 'Commercial', chip: '', photo: 'rough-in-plywood', alt: 'Rough-in plumbing marked out on plywood with a tape measure', focus: '50% 50%',
    link: { href: '/services#remodel-commercial', label: 'Remodels and commercial →' } },
  { id: 'q05', q: 'Do you offer any discounts?', a: `Yes. ${SITE.offer}.`, topic: 'Money', chip: 'Money',
    photo: 'tub-job', alt: 'A bathtub job finished by the crew', focus: '50% 50%' },
  { id: 'q06', q: 'Can I send a photo first?', a: `Yes. Text it to ${SITE.phone} with your town and what is going on.`, topic: 'Photos', chip: 'Photos',
    photo: 'corroded-pipe', alt: 'A corroded pipe and valve, the kind of photo that helps us bring the right part', focus: '50% 50%',
    link: { href: SITE.sms, label: 'Text us a photo →' } },
];
export const faqSchema = () => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: FAQ.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
});

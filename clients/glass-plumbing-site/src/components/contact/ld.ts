// JSON-LD helpers for /contact, /reviews, /our-work, /faq (BreadcrumbList, FAQPage).
import { abs } from '../../lib/schema';
export const crumbsLd = (label: string, path: string) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
    { '@type': 'ListItem', position: 2, name: label, item: abs(path) },
  ],
});
export const faqLd = (qa: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: qa.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

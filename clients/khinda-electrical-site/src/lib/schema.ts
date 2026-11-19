// JSON-LD builders (SEO-PLAN section 2). Site-wide `Electrician` (LocalBusiness subtype) on every page via Base.astro.
// Service-area business: no street address, no hours, no licence number, no AggregateRating until Khinda confirms.
import { SITE, TOWNS } from '../data/site';

export const siteUrl = () => ((import.meta.env.SITE as string) || 'https://khinda-electrical-surrey.vercel.app').replace(/\/$/, '');
export const abs = (path: string) => siteUrl() + path;
export const BUSINESS_ID = () => `${siteUrl()}/#business`;
export const WEBSITE_ID = () => `${siteUrl()}/#website`;
const area = () => [{ '@type': 'City', name: 'Surrey, BC' }, ...TOWNS.map((t) => ({ '@type': t.city === 'Surrey' ? 'Place' : 'City', name: `${t.name}${t.city === 'Surrey' ? ', Surrey' : ''}, BC` }))];

export function businessSchema(logoUrl: string, imageUrl: string) {
  return {
    '@context': 'https://schema.org', '@type': 'Electrician', '@id': BUSINESS_ID(),
    name: SITE.name, url: siteUrl() + '/', logo: logoUrl, image: imageUrl, telephone: SITE.phoneE164,
    address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: SITE.country },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: area(),
    sameAs: [SITE.social.instagram, SITE.social.youtube],
  };
}

export const serviceSchema = (o: { name: string; path: string; description: string }) => ({
  '@context': 'https://schema.org', '@type': 'Service', name: o.name, serviceType: o.name, url: abs(o.path),
  description: o.description, provider: { '@id': BUSINESS_ID() }, areaServed: area(),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path) })),
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org', '@type': 'WebSite', '@id': WEBSITE_ID(), url: siteUrl() + '/', name: SITE.name,
  publisher: { '@id': BUSINESS_ID() }, inLanguage: 'en-CA',
});

const PAGE_TYPES = ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'];
export const isPageNode = (o: any) => PAGE_TYPES.includes(o?.['@type']);
export const webPageSchema = (o: { path: string; title: string; description: string; image: string; existing?: object }) => ({
  '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${abs(o.path)}#webpage`, url: abs(o.path), name: o.title,
  description: o.description, inLanguage: 'en-CA', isPartOf: { '@id': WEBSITE_ID() }, about: { '@id': BUSINESS_ID() },
  primaryImageOfPage: { '@type': 'ImageObject', url: o.image }, ...(o.existing ?? {}),
});

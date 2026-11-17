// JSON-LD builders. Site-wide `Plumber` (LocalBusiness) goes on every page via Base.astro.
// Rules (SEO plan section 6): no AggregateRating on the own site; employee/member only when confirmed (not yet).
import { SITE } from '../data/site';
import { TOWNS } from '../data/towns';

export const siteUrl = () => ((import.meta.env.SITE as string) || 'https://mikes-plumbing-riverside.vercel.app').replace(/\/$/, '');
export const abs = (path: string) => siteUrl() + (path === '/' ? '' : path);
export const BUSINESS_ID = () => `${siteUrl()}/#business`;
export const WEBSITE_ID = () => `${siteUrl()}/#website`;

// Service-area business: no street address, no opening hours, no licence, no AggregateRating until Mike confirms.
export function plumberSchema(logoUrl: string, imageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': BUSINESS_ID(),
    name: SITE.name,
    url: siteUrl(),
    logo: logoUrl,
    image: imageUrl,
    telephone: SITE.phoneE164,
    email: SITE.email,
    foundingDate: String(SITE.founded),
    founder: { '@type': 'Person', name: SITE.owner },
    slogan: SITE.tagline,
    address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: 'US' },
    paymentAccepted: SITE.payments.join(', '),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Inland Empire, CA' },
      { '@type': 'AdministrativeArea', name: 'Orange County, CA' },
      { '@type': 'AdministrativeArea', name: 'Los Angeles County, CA' },
      ...TOWNS.map((t) => ({ '@type': 'City', name: `${t.name}, CA` })),
    ],
    sameAs: [SITE.social.yelp, SITE.social.instagram],
  };
}

export const serviceSchema = (o: { name: string; path: string; description: string; serviceType?: string }) => ({
  '@context': 'https://schema.org', '@type': 'Service', name: o.name, serviceType: o.serviceType ?? o.name, url: abs(o.path),
  description: o.description, provider: { '@id': BUSINESS_ID() }, areaServed: TOWNS.map((t) => ({ '@type': 'City', name: `${t.name}, CA` })),
});

export const articleSchema = (o: { headline: string; path: string; description: string; datePublished: string; dateModified?: string; image?: string }) => ({
  '@context': 'https://schema.org', '@type': 'Article', headline: o.headline, description: o.description, mainEntityOfPage: abs(o.path),
  datePublished: o.datePublished, dateModified: o.dateModified ?? o.datePublished, image: o.image,
    author: { '@type': 'Organization', '@id': BUSINESS_ID(), name: SITE.name, url: siteUrl() }, publisher: { '@id': BUSINESS_ID() },
  isPartOf: { '@id': WEBSITE_ID() }, inLanguage: 'en-US',
});

export const contactPageSchema = (path: string) => ({ '@context': 'https://schema.org', '@type': 'ContactPage', url: abs(path), about: { '@id': BUSINESS_ID() } });

/** Site-wide WebSite node: the site, published by the business. */
export const websiteSchema = () => ({
  '@context': 'https://schema.org', '@type': 'WebSite', '@id': WEBSITE_ID(), url: siteUrl(), name: SITE.name,
  publisher: { '@id': BUSINESS_ID() }, inLanguage: 'en-US',
});

// Page types that describe the page itself. When a page already sends one (AboutPage, ContactPage...), Base.astro links it
// into the graph instead of adding a second page node.
const PAGE_TYPES = ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage', 'ItemPage', 'ProfilePage'];
export const isPageNode = (o: any) => PAGE_TYPES.includes(o?.['@type']);

/** The page node: what this URL is, which site it belongs to and what it is about. Fields the page already set win. */
export const webPageSchema = (o: { path: string; title: string; description: string; image: string; existing?: object }) => ({
  '@context': 'https://schema.org', '@type': 'WebPage',
  '@id': `${abs(o.path)}#webpage`, url: abs(o.path), name: o.title, description: o.description, inLanguage: 'en-US',
  isPartOf: { '@id': WEBSITE_ID() }, about: { '@id': BUSINESS_ID() },
  primaryImageOfPage: { '@type': 'ImageObject', url: o.image },
  ...(o.existing ?? {}),
});

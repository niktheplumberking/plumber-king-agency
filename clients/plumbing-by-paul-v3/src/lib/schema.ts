// JSON-LD builders. Site-wide `Plumber` (LocalBusiness) goes on every page via Base.astro.
// Rules (SEO plan section 6): no AggregateRating on the own site; employee/member only when confirmed (not yet).
import { SITE } from '../data/site';
import { TOWNS_LINKED, TOWNS_ROUTE } from '../data/towns';

export const siteUrl = () => ((import.meta.env.SITE as string) || 'https://plumbingbypaulllc.com').replace(/\/$/, '');
export const abs = (path: string) => siteUrl() + (path === '/' ? '' : path);
export const BUSINESS_ID = () => `${siteUrl()}/#business`;
export const WEBSITE_ID = () => `${siteUrl()}/#website`;

export function plumberSchema(logoUrl: string, imageUrl: string) {
  const a = SITE.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': BUSINESS_ID(),
    name: SITE.name,
    legalName: SITE.legalName,
    url: siteUrl(),
    logo: logoUrl,
    image: imageUrl,
    telephone: SITE.phoneE164,
    email: SITE.email,
    foundingDate: String(SITE.founded),
    founder: { '@type': 'Person', name: SITE.founder },
    slogan: SITE.tagline,
    address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.city, addressRegion: a.region, postalCode: a.zip, addressCountry: a.country },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.google.mapsUrl,
    openingHoursSpecification: SITE.hours.schema.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: `${SITE.licenceLabel} ${SITE.licence}`,
      identifier: SITE.licence,
      recognizedBy: { '@type': 'GovernmentOrganization', name: 'Florida Department of Business and Professional Regulation' },
    },
    award: SITE.awards.years.map((y) => `${SITE.awards.name}, ${SITE.awards.title} ${y} (${SITE.awards.by})`),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Pinellas County, FL' },
      ...[...TOWNS_LINKED, ...TOWNS_ROUTE].map((t) => ({ '@type': 'City', name: `${t.name}, FL` })),
    ],
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.google.mapsUrl, SITE.social.bbb, SITE.social.yelp],
  };
}

export const serviceSchema = (o: { name: string; path: string; description: string; serviceType?: string }) => ({
  '@context': 'https://schema.org', '@type': 'Service', name: o.name, serviceType: o.serviceType ?? o.name, url: abs(o.path),
  description: o.description, provider: { '@id': BUSINESS_ID() }, areaServed: { '@type': 'AdministrativeArea', name: 'Pinellas County, FL' },
});

export const articleSchema = (o: { headline: string; path: string; description: string; datePublished: string; dateModified?: string; image?: string }) => ({
  '@context': 'https://schema.org', '@type': 'Article', headline: o.headline, description: o.description, mainEntityOfPage: abs(o.path),
  datePublished: o.datePublished, dateModified: o.dateModified ?? o.datePublished, image: o.image,
  // The visible byline is the crew ("By the Plumbing By Paul crew"), so the author is the business, named inline as Google asks.
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

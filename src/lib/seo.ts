import type { Metadata } from "next";
import { founderFull } from "@/content/about";
import { site } from "@/content/site";

export const abs = (path: string) => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Per-page metadata: unique title and description, canonical, Open Graph and Twitter cards. */
export function pageMeta(opts: { title: string; description: string; path: string; type?: "website" | "article"; noTitleSuffix?: boolean }): Metadata {
  const url = abs(opts.path);
  return {
    title: opts.noTitleSuffix ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: opts.type ?? "website",
      url,
      title: opts.title,
      description: opts.description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: abs("/og-image.png"), width: 1200, height: 630, alt: `${site.name}: websites and SEO for plumbers` }],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [abs("/og-image.png")] },
  };
}

const orgId = abs("/#organization");
const personId = abs("/about/#nick");

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    slogan: "We build websites that get plumbers booked.",
    ...(site.assets.logo ? { logo: abs("/brand/bobo-logo-512.png"), image: abs("/brand/bobo-logo-512.png") } : {}),
    parentOrganization: { "@type": "Organization", name: site.legalEntity, legalName: site.legalEntity },
    founder: { "@id": personId },
    areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
    knowsAbout: ["Plumber website design", "Local SEO for plumbers", "Google Business Profile optimization", "Generative engine optimization", "Lead generation for plumbing companies"],
    audience: { "@type": "BusinessAudience", audienceType: "Plumbing companies" },
    sameAs: Object.values(site.social).filter(Boolean),
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: site.email, areaServed: ["US", "CA"], availableLanguage: "English" },
  };
}

export function websiteLd() {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": abs("/#website"), url: site.url, name: site.name, publisher: { "@id": orgId }, inLanguage: "en-US" };
}

export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: founderFull,
    givenName: "Nick",
    familyName: "Bennett",
    jobTitle: "Founder and web designer",
    worksFor: { "@id": orgId },
    url: abs("/about/nick-bennett/"),
    knowsAbout: ["Plumber website design", "Web design", "E-commerce websites", "Branding", "Local SEO for plumbers"],
    sameAs: Object.values(site.social).filter(Boolean),
    ...(site.assets.founderPhoto ? { image: abs(site.assets.founderPhoto) } : {}),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.name, item: abs(i.path) })),
  };
}

export function serviceLd(s: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: abs(s.path),
    provider: { "@id": orgId },
    areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
    audience: { "@type": "BusinessAudience", audienceType: "Plumbing companies" },
  };
}

export function articleLd(g: { title: string; description: string; path: string; published: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    url: abs(g.path),
    mainEntityOfPage: abs(g.path),
    datePublished: g.published,
    dateModified: g.published,
    author: { "@id": personId, "@type": "Person", name: founderFull },
    publisher: { "@id": orgId, "@type": "Organization", name: site.name },
    inLanguage: "en-US",
  };
}

/**
 * Business facts. Everything here is either from Nick (thread of 2026-10-14) or from his old site
 * (plumber-king-agency.lovable.app, read 2026-10-14). Nothing here is invented: if a value is not known,
 * it is left out rather than guessed. Items still to confirm are marked TO-CONFIRM.
 */

const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export const site = {
  name: "Plumber King Agency",
  shortName: "Plumber King",
  /**
   * Legal owner. Name, state and address as published on Nick's registered company site
   * (bennettndco.com/terms and /privacy, last updated July 4, 2026; read 2026-10-14, Nick pointed us there).
   */
  legalEntity: "Bennett & Co LLC",
  legalState: "Wyoming",
  legalAddress: "30 N Gould St Ste R, Sheridan, WY 82801, USA",
  /**
   * TO-CONFIRM: Nick bought a domain on 2026-10-14 but has not said which one yet.
   * Set NEXT_PUBLIC_SITE_URL to it before the live build; sitemap, canonicals and schema use it.
   */
  url: envUrl || "https://plumberkingagency.com",
  /**
   * Public trade line, worded as Bennett & Co LLC's accountant advised (2026-10-16): there is no DBA yet,
   * so the brand is always shown as owned by the LLC. Invoices and contracts stay in the LLC's name.
   */
  ownership: "Plumber King Agency - Owned by Bennett & Co LLC",
  /** Business email: public contact and lead inbox. Source: Nick, 2026-10-16. */
  email: "nick@plumberkingagency.com",
  founder: "Nick",
  areaServed: ["United States", "Canada"],
  tagline: "Websites, SEO and AI-search visibility for plumbing companies.",
  description:
    "Plumber King Agency builds fast, conversion-focused websites, local SEO and AI-search visibility for plumbing companies in the USA and Canada, so homeowners find you, trust you and call you.",
  founderQuote: "If your phone ain't ringing, I haven't done my job.",
  /** Source: Nick, 2026-10-16. LinkedIn: Nick sends the link within 7 days; an empty value hides its icon. */
  social: {
    instagram: "https://www.instagram.com/nick.bennettx/",
    facebook: "https://www.facebook.com/profile.php?id=61595692701094",
    linkedin: "",
  } as Record<"instagram" | "facebook" | "linkedin", string>,
  /** Strategy-call booking page. Source: Nick, 2026-10-14. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com/plumber-king-agency/30-minutes-detailed-call",
  /** Lead form target. Default: public/lead.php, which emails each lead to `email` from Hostinger (PHP mail). */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/lead.php",
  /** Brand files supplied by Nick on 2026-10-14 (logo, his photo, the crew banner), resized into public/brand/. */
  assets: {
    logo: "/brand/logo-160.webp" as string | null,
    founderPhoto: "/brand/nick-founder.webp" as string | null,
    banner: "/brand/banner.webp" as string | null,
  },
  /** The one primary action, labelled the same everywhere (factory rule DQ-CONTENT-HIERARCHY). */
  primaryCta: "Book your free strategy call",
  secondaryCta: "Get a free website audit",
} as const;

export const ctaHref = site.bookingUrl || "/contact/";

/** Placeholder proof (reviews, stats, portfolio) is shown only on preview builds. Never on the live site. */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "1";

export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/process/", label: "Process" },
  { href: "/about/", label: "About Nick" },
  { href: "/resources/", label: "Guides" },
  { href: "/faq/", label: "FAQ" },
] as const;

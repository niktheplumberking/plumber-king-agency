/**
 * Business facts. Everything here is either from Nick (thread of 2026-10-14) or from his old site
 * (plumber-king-agency.lovable.app, read 2026-10-14). Nothing here is invented: if a value is not known,
 * it is left out rather than guessed. Items still to confirm are marked TO-CONFIRM.
 */

const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export const site = {
  name: "Plumber King Agency",
  shortName: "Plumber King",
  /** Legal owner. Source: Nick, 2026-10-14 ("the holding company of Plumber King Agency is Bennett Co. LLC"). */
  legalEntity: "Bennett Co. LLC",
  /**
   * TO-CONFIRM: Nick does not own plumberkingagency.com yet (Nick, 2026-10-14: "I have to buy it").
   * Set NEXT_PUBLIC_SITE_URL to the domain he buys before the live build; sitemap, canonicals and schema use it.
   */
  url: envUrl || "https://plumberkingagency.com",
  /** Where leads and enquiries go. Source: Nick, 2026-10-14. */
  email: "support@bennettndco.com",
  founder: "Nick",
  areaServed: ["United States", "Canada"],
  tagline: "Websites, SEO and AI-search visibility for plumbing companies.",
  description:
    "Plumber King Agency builds fast, conversion-focused websites, local SEO and AI-search visibility for plumbing companies in the USA and Canada, so homeowners find you, trust you and call you.",
  founderQuote: "If your phone ain't ringing, I haven't done my job.",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61585878251720",
    instagram: "https://www.instagram.com/plumberkingagency/",
    threads: "https://www.threads.com/@plumberkingagency",
  },
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
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

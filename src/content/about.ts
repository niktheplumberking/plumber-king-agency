/**
 * Nick Bennett's three "about" folders (home page) and the three pages they open (Nick, 2026-10-18).
 * Facts come from Nick's own words (2026-10-14 to 2026-10-18) and from the project repos on his GitHub.
 * Client results we cannot back with a source are left out on purpose: the site must not mislead (US law).
 * 2026-10-18 Nick confirmed he can back up: MindXBridge ~$150,000, Health Steps' company is multi-billion-dollar, and that
 * MindXBridge, Health Steps, RIZM and CourtHub are our projects where we helped their growth. SmartThings and Gray Berlin
 * stay unnamed for now. "Multi-billion-dollar" describes the company, never a result we produced.
 */

export const founderFull = "Nick Bennett";

/** Slots for Nick's photos. Only the first is a real photo today; the rest wait for his shoot. */
export const nickPhotos: { src: string | null; alt: string }[] = [
  { src: "/brand/nick-founder.webp", alt: "Nick Bennett, founder of Plumber King Agency, at his desk" },
  { src: null, alt: "Photo of Nick Bennett coming soon" },
  { src: null, alt: "Photo of Nick Bennett coming soon" },
  { src: null, alt: "Photo of Nick Bennett coming soon" },
  { src: null, alt: "Photo of Nick Bennett coming soon" },
];

export type Project = {
  id: string;
  name: string;
  kind: string;
  where?: string;
  what: string;
  did: string[];
  image?: { src: string; small: string; alt: string; h: number };
  url?: string;
};

/** Portfolio, in the order Nick listed it. */
export const projects: Project[] = [
  {
    id: "mindxbridge",
    name: "MindXBridge",
    kind: "Research incubator · brand and website",
    where: "Ireland and Saudi Arabia",
    what: "A research incubator and publication pipeline for students, clinicians and early-career researchers, run with universities in Ireland and Saudi Arabia. The business has brought in around $150,000 so far.",
    did: ["Built the complete brand", "Designed and built the website", "Helped grow the business"],
    image: { src: "/work/portfolio/mindxbridge-1200.webp", small: "/work/portfolio/mindxbridge-600.webp", alt: "The MindXBridge homepage: Your Complete Research Incubator and Publication Pipeline, with a glowing blue brain", h: 675 },
  },
  {
    id: "courthub",
    name: "CourtHub",
    kind: "Padel e-commerce · Dubai, UAE",
    where: "United Arab Emirates",
    what: "Court Hub Group builds padel courts and sells rackets and gear in the UAE. Their online store runs in English and Arabic and takes card payments in dirhams. We helped them grow their online sales.",
    image: { src: "/work/portfolio/courthub-1200.webp", small: "/work/portfolio/courthub-600.webp", alt: "The CourtHub homepage: Experience Padel Elevated, with a featured NOX padel racket", h: 750 },
    did: ["Designed and built the online store", "English and Arabic versions", "Online checkout, product admin and Instagram product import"],
  },
  {
    id: "rizm",
    name: "RIZM Technologies",
    kind: "App development partner · website",
    what: "RIZM builds mobile apps and software. They are our partner for app development, and we helped grow their presence online.",
    image: { src: "/work/portfolio/rizm-1200.webp", small: "/work/portfolio/rizm-600.webp", alt: "The RIZM homepage: Your digital transformation partner, with a glass cube graphic", h: 750 },
    did: ["Built their website and digital presence"],
  },
  {
    id: "health-steps",
    name: "Health Steps",
    kind: "Gym membership app · with RIZM",
    where: "Saudi Arabia",
    what: "A gym membership app used across Saudi Arabia, from a multi-billion-dollar company.",
    did: ["Worked on the app together with RIZM", "Helped with its growth"],
  },
  {
    id: "ecommerce",
    name: "E-commerce and clothing brands",
    kind: "Online stores · fashion and retail",
    what: "Before plumbing, I spent years building online stores for clothing brands and e-commerce companies.",
    did: ["Store design and build", "Product pages that sell", "Brand look and feel"],
  },
];

export type Folder = {
  id: "me" | "work" | "story";
  label: string;
  meta: string;
  href: string;
  linkText: string;
  blurb: string;
  image?: string;
  files: { name: string; meta?: string; href: string; image?: string }[];
};

export const folders: Folder[] = [
  {
    id: "me",
    label: "About me",
    meta: "Who I am",
    href: "/about/nick-bennett/",
    linkText: "Meet Nick Bennett",
    blurb: "The face of the brand, and the person you talk to.",
    image: "/brand/nick-founder-480.webp",
    files: [
      { name: "Who I am", href: "/about/nick-bennett/#who" },
      { name: "What I do", href: "/about/nick-bennett/#what" },
      { name: "Photos", meta: "Nick", href: "/about/nick-bennett/#photos", image: "/brand/nick-founder-480.webp" },
    ],
  },
  {
    id: "work",
    label: "Portfolio",
    meta: "5 projects",
    href: "/about/portfolio/",
    linkText: "See my portfolio",
    blurb: "Brands, websites and apps I have built.",
    image: "/work/portfolio/mindxbridge-600.webp",
    files: [
      { name: "E-commerce", meta: "Stores", href: "/about/portfolio/#ecommerce" },
      { name: "CourtHub", meta: "Dubai", href: "/about/portfolio/#courthub", image: "/work/portfolio/courthub-600.webp" },
      { name: "RIZM", meta: "Partner", href: "/about/portfolio/#rizm", image: "/work/portfolio/rizm-600.webp" },
      { name: "MindXBridge", meta: "Brand + site", href: "/about/portfolio/#mindxbridge", image: "/work/portfolio/mindxbridge-600.webp" },
    ],
  },
  {
    id: "story",
    label: "My story",
    meta: "Where I'm going",
    href: "/about/story/",
    linkText: "Read my story",
    blurb: "How I got into web design, and what I want for plumbers.",
    files: [
      { name: "How I started", href: "/about/story/#start" },
      { name: "The next 5 years", href: "/about/story/#next" },
      { name: "For plumbers", href: "/about/story/#plumbers" },
    ],
  },
];

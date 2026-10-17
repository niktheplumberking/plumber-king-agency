/**
 * Services. Source: the "Plumber King System" section of Nick's old site (websites, plumber SEO, lead systems,
 * conversion optimization, dedicated support, speed, reputation management, reporting).
 * AI-search visibility (GEO/AEO) is written as part of how sites are built and optimised: TO-CONFIRM with Nick
 * that he sells it as part of SEO.
 */

export interface Service {
  slug: string;
  name: string;
  short: string;
  outcome: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  includes: { title: string; body: string }[];
  forWho: string[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "plumber-website-design",
    name: "Plumber Website Design",
    short: "Custom sites built to turn a homeowner's search into a phone call.",
    outcome: "A site that makes you look like the obvious choice and makes calling you the easiest thing on the page.",
    metaTitle: "Plumber Website Design That Gets Calls",
    metaDescription:
      "Custom plumber websites built to convert: click-to-call on every screen, service and city pages, fast load times and SEO built in. USA and Canada.",
    intro:
      "Most plumbing websites are brochures. Yours should work like your sharpest dispatcher: answer the homeowner's question in seconds, prove you're the real deal, and put the call button under their thumb. We design and build every site for plumbing companies only, so the structure, the copy and the calls to action are made for how people actually hire a plumber.",
    includes: [
      { title: "Click-to-call everywhere", body: "A sticky call button on phones, your number in the header, and a short quote form for people who would rather text or type." },
      { title: "Service pages that rank", body: "One page per job you want more of: water heaters, drain cleaning, repiping, leak detection, emergency calls. Each one answers the questions homeowners search for." },
      { title: "City and service-area pages", body: "Pages for the towns you serve, written for the people who live there, not copy-pasted with the city name swapped." },
      { title: "Trust built in", body: "License and insurance, real reviews, real photos of your trucks and your team, your service promises and financing options: the things that decide who gets the call." },
      { title: "Fast on any phone", body: "Lightweight pages that load quickly on a cell signal, because a homeowner with water on the floor will not wait." },
      { title: "You own it", body: "Once it is paid for, the site and the content are yours." },
    ],
    forWho: ["Plumbers with no website or a template site that never brings in calls", "Shops ready to move off word-of-mouth alone", "Owners who want a site that looks as good as their work"],
    faqs: [
      { q: "Do I need to write the content?", a: "No. We gather what we need on the strategy call and write the copy for you, focused on the jobs you actually want. You review and approve it." },
      { q: "Can you redesign my existing site?", a: "Yes. We start with a free audit of what you have. Sometimes a rebuild is the right call, sometimes we can improve what is there. You get an honest recommendation either way." },
    ],
  },
  {
    slug: "plumber-seo",
    name: "Plumber SEO & AI Search",
    short: "Show up when homeowners search Google, Maps, and ask AI assistants for a plumber.",
    outcome: "Be the plumber Google shows and the one ChatGPT, Gemini and Google's AI answers recommend in your area.",
    metaTitle: "Plumber SEO & AI Search Visibility",
    metaDescription:
      "Local SEO for plumbers: Google Business Profile, service and city pages, reviews, technical SEO and AI-search (GEO/AEO) so assistants like ChatGPT recommend you.",
    intro:
      "When a pipe bursts, nobody scrolls to page two. They tap the first plumbers in the map pack, or they ask their phone. We build and tune your site and your Google presence so that you are one of the names that comes up, on Google, on Maps and in AI answers.",
    includes: [
      { title: "Google Business Profile", body: "Categories, services, service area, photos and posts set up properly, because your profile is often the first thing a homeowner sees." },
      { title: "Local pages and keywords", body: "Pages built around the searches that turn into jobs in your area: 'emergency plumber near me', 'water heater replacement in [city]', and the rest." },
      { title: "Technical SEO", body: "Fast pages, clean structure, a sitemap submitted to Google and Bing Search Console, and schema markup so search engines know exactly who you are and where you work." },
      { title: "AI search (GEO and AEO)", body: "Clear, quotable answers and structured data so AI assistants and Google's AI Overviews can understand your business and cite it." },
      { title: "Reviews and reputation", body: "A simple system to ask happy customers for Google reviews, so your star rating keeps working for you." },
      { title: "Plain-English reporting", body: "Calls, form leads, rankings and traffic, at launch and every month on an ongoing SEO plan, so you know what is working." },
    ],
    forWho: ["Plumbers stuck below competitors on Google", "Shops paying for ads and wanting free organic calls too", "Owners who want to show up in AI search before their competitors do"],
    faqs: [
      { q: "How long until SEO works?", a: "SEO is a slow build. You can often see movement in the first months, but it depends on your market and how strong your competitors are. Anyone who promises you a top ranking by a set date is not being straight with you." },
      { q: "What is GEO or AEO?", a: "Generative Engine Optimization and Answer Engine Optimization: making your business easy for AI assistants (ChatGPT, Gemini, Perplexity, Google AI Overviews) to understand, trust and recommend. It builds on good SEO: clear answers, consistent business details and structured data." },
    ],
  },
  {
    slug: "plumber-lead-generation",
    name: "Lead Capture & Follow-up",
    short: "Never miss a job: every call, form and text captured and sent to your phone.",
    outcome: "Every lead lands on your phone in seconds, so you call back before the homeowner calls the next plumber.",
    metaTitle: "Lead Capture for Plumbers: Never Miss a Job",
    metaDescription:
      "Lead capture and follow-up for plumbing companies: quote forms, instant lead alerts to your phone, and conversion testing so more visitors become booked jobs.",
    intro:
      "A homeowner with a leak usually contacts more than one plumber. The one who answers first tends to win. We set up your website so that every inquiry is captured and sent straight to you, and we keep improving the page so more visitors reach out.",
    includes: [
      { title: "Short quote forms", body: "Two or three fields, not ten. Asking less gets you more inquiries." },
      { title: "Instant alerts", body: "New leads sent to your phone and email the moment they come in." },
      { title: "Conversion testing", body: "We test headlines, buttons and layouts to squeeze more calls out of the visitors you already get." },
      { title: "Tracking that tells the truth", body: "Calls and forms tracked so you know which pages and searches bring in work." },
    ],
    forWho: ["Plumbers getting traffic but not enough calls", "Busy owners who miss calls while on a job", "Shops that want to know where their jobs come from"],
    faqs: [
      { q: "Will this work with how I take bookings today?", a: "Usually yes. On the strategy call we look at how you take calls and bookings now and connect the site to it." },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

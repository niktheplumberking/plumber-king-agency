/**
 * Guides: answer-first articles for plumbing business owners (SEO, GEO and AEO). General, checkable advice only;
 * no invented statistics. Each opens with a short direct answer so search engines and AI assistants can quote it.
 */
export interface Guide {
  slug: string;
  title: string;
  /** Shorter <title> for search results (the H1 keeps the full title). */
  metaTitle: string;
  description: string;
  published: string; // ISO date
  readMinutes: number;
  answer: string;
  sections: { heading: string; body: string[]; list?: string[] }[];
}

export const guides: Guide[] = [
  {
    slug: "plumber-website-checklist",
    title: "The Plumber Website Checklist: 15 Things That Decide Whether Homeowners Call",
    metaTitle: "15-Point Plumber Website Checklist",
    description: "A practical checklist for plumbing company websites: what has to be on the page for a homeowner to trust you and call, and what to fix first.",
    published: "2026-10-14",
    readMinutes: 6,
    answer:
      "A plumber website gets calls when a homeowner can see, within a few seconds on a phone, what you fix, where you work, why they can trust you, and how to call you right now. Put a tap-to-call button on every screen, give each main service and city its own page, show real reviews and real photos, and make the site load fast on a cell signal.",
    sections: [
      {
        heading: "The first screen",
        body: ["Most visitors decide in the first screen whether to stay. On a phone, that screen has to do four jobs at once."],
        list: [
          "Say what you do and where: 'Family-run plumber serving Raleigh and Cary', not 'Welcome to our website'.",
          "Put your phone number in the header and a tap-to-call button that stays on screen as people scroll.",
          "Show one trust signal straight away, such as your Google star rating with the review count.",
          "Offer one clear next step. If you offer emergency service, say so here.",
        ],
      },
      {
        heading: "Pages that bring in the jobs you want",
        body: [
          "Google ranks pages, not websites. A single 'Services' page listing ten services will struggle to rank for any of them. Give each money-making job its own page: water heater repair and replacement, drain cleaning, sewer line repair, repiping, leak detection, emergency plumbing.",
          "Do the same for the towns you serve, but write something real for each one: the neighborhoods, the typical housing stock, the problems you see there. Thin pages with only the city name swapped help nobody.",
        ],
      },
      {
        heading: "Trust: why they pick you over the next plumber",
        body: ["Homeowners are letting a stranger into their house. Show them who is coming."],
        list: [
          "Your state credentials and coverage, stated plainly, exactly as your paperwork says.",
          "Real photos of you, your team and your trucks. Stock photos of smiling models are easy to spot.",
          "Recent Google reviews, linked to the source. Never write your own.",
          "What you promise on your work, in plain words, and financing if you offer it.",
          "Your business name, address and phone number exactly as they appear on your Google Business Profile.",
        ],
      },
      {
        heading: "Speed and the technical basics",
        body: [
          "A slow site loses calls, especially on mobile. Compress images, avoid heavy page builders where you can, and test your pages with Google's PageSpeed Insights.",
          "Behind the scenes, make sure you have a sitemap submitted to Google Search Console and Bing Webmaster Tools, a page title and description written for each page, and LocalBusiness or Plumber schema markup describing your business and service area.",
        ],
      },
      {
        heading: "What to fix first",
        body: [
          "If you can only do three things this week: add a sticky tap-to-call button for mobile, rewrite your homepage headline to say what you do and where, and put your Google rating near the top. Then build out service pages one at a time, starting with the job that makes you the most money.",
        ],
      },
    ],
  },
  {
    slug: "how-plumbers-show-up-in-ai-search",
    title: "How Plumbers Show Up in ChatGPT, Gemini and Google AI Overviews",
    metaTitle: "How Plumbers Show Up in AI Search",
    description: "What GEO and AEO mean for a local plumbing company, and the concrete steps that make your business easier for AI assistants to recommend.",
    published: "2026-10-14",
    readMinutes: 5,
    answer:
      "AI assistants recommend plumbers they can clearly identify and trust from what is published about them. To improve your chances, keep your business name, address and phone identical everywhere, answer common plumbing questions plainly on your own site, collect genuine reviews, and add structured data (schema) that spells out your services and service area. Nobody can promise an AI will name you, but these steps make you a much easier business to recommend.",
    sections: [
      {
        heading: "What changed",
        body: [
          "More homeowners now ask an assistant instead of typing keywords: 'Who's a good emergency plumber near me that's open now?' Tools like ChatGPT search, Gemini, Perplexity and Google's AI Overviews pull together an answer from websites, business profiles and reviews. Optimizing for that is called GEO (Generative Engine Optimization) or AEO (Answer Engine Optimization).",
          "The good news: it rewards the same things good local SEO always did, done more carefully.",
        ],
      },
      {
        heading: "Five steps that help",
        body: [],
        list: [
          "Consistency: the same business name, address, phone number and hours on your website, Google Business Profile, Bing Places, Yelp, Facebook and directories.",
          "Answer-first content: put short, direct answers to real customer questions on your site, such as 'How much does it cost to replace a water heater in Phoenix?' with honest ranges and what changes the price.",
          "Structured data: Plumber or LocalBusiness schema with your services, service area and contact details, and FAQPage markup on question-and-answer content.",
          "Reviews: a steady flow of genuine reviews that mention the job and the town. Never buy or write them.",
          "Crawlability: a fast site, a sitemap, and no important text hidden inside images.",
        ],
      },
      {
        heading: "What does not work",
        body: [
          "Stuffing pages with 'plumber near me' over and over, publishing hundreds of near-identical AI-written pages, or fake reviews. These can hurt you with search engines, and fake reviews can bring fines from the FTC.",
        ],
      },
    ],
  },
  {
    slug: "google-business-profile-for-plumbers",
    title: "Google Business Profile for Plumbers: The Setup That Gets You Into the Map Pack",
    metaTitle: "Google Business Profile for Plumbers",
    description: "How a plumbing company should set up and maintain its Google Business Profile: categories, service area, services, photos, reviews and posts.",
    published: "2026-10-14",
    readMinutes: 5,
    answer:
      "Choose 'Plumber' as your primary category, set your real service area, list each service you offer, upload genuine photos of your team, trucks and work, and keep a steady flow of honest reviews that you reply to. Keep your name, address and phone identical to your website. Google weighs relevance, distance and prominence, so a complete, active profile backed by a strong website gives you a real shot at the map pack.",
    sections: [
      {
        heading: "The basics that most plumbers get wrong",
        body: [],
        list: [
          "Business name: your real business name only. Adding keywords ('Bob's Plumbing Emergency Plumber Dallas Cheap') is against Google's guidelines and can get the profile suspended.",
          "Primary category: Plumber. Add secondary categories only if they truly apply, such as Water heater installation service or Drainage service.",
          "Service area: if you go to customers, set the areas you actually serve and hide your home address.",
          "Hours: keep them accurate, including emergency availability if you offer it.",
        ],
      },
      {
        heading: "Make the profile work for you",
        body: [
          "List each service with a short description. Upload real photos regularly: before and after shots, your van, your team on the job. Use posts to share offers or recent jobs.",
          "Ask every happy customer for a review, and make it easy with a direct link or QR code on your invoice. Reply to every review, good or bad, politely and briefly.",
        ],
      },
      {
        heading: "Connect it to your website",
        body: [
          "Link the profile to your homepage or a location page, and make sure that page repeats the same name, address and phone number. A strong website with service and city pages helps Google trust the profile, and the profile sends calls straight to you.",
        ],
      },
    ],
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);

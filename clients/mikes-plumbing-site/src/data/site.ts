// Site facts. One source for every page. Facts only, each with its source (handoff/research/BRAND-AUDIT.md and
// clients/mikes-plumbing/research/FACTS-CHECK.md, both read 17 Nov 2026). Never add licence, insured, warranty, prices,
// response times or years until Mike confirms them (README "Mike to confirm").
export const SITE = {
  name: "Mike's Plumbing Services",
  owner: 'Mike Navarro',               // his flyer
  founded: 2025,                       // logo "EST 2025"
  phone: '(951) 809-9533',             // flyer + Yelp
  tel: 'tel:+19518099533',
  sms: 'sms:+19518099533',             // Mike to confirm the number takes texts
  phoneE164: '+19518099533',
  email: 'mikesplumbingco25@gmail.com',// Nextdoor page
  city: 'Riverside', region: 'CA', regionName: 'California',
  geo: { lat: 33.9806, lng: -117.3755 }, // Riverside city centre (service-area business, no street address)
  areaLine: 'IE | OC | LA',            // IG bio
  tagline: 'Friendly. Transparent. Proficient.', // IG bio
  hoursYelp: 'Open 24 hours (Yelp)',   // Yelp; Nextdoor says 7 AM-11 PM: Mike to confirm
  days: 'Open 7 days',                 // Yelp + Nextdoor agree
  payments: ['Cash', 'Zelle', 'Cash App'], // Yelp amenities
  offer: '15% off for new customers',  // Nextdoor + IG flyer highlight
  rating: { value: '5.0', count: 20, source: 'Yelp', checked: '17 Nov 2026' },
  social: {
    yelp: 'https://www.yelp.com/biz/mike-s-plumbing-services-riverside',
    instagram: 'https://www.instagram.com/mikesplumbingservices/',
    instagramHandle: '@mikesplumbingservices',
  },
  footerLine: "Mike's Plumbing Services · Riverside, CA · Serving IE | OC | LA · (951) 809-9533 · Family Owned & Operated · EST 2025",
} as const;

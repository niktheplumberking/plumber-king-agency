// Every business fact on the site comes from here. Source: FACTS.md (checked 12 Nov 2026).
// Anything marked "Paul to confirm" is Paul's own claim from his current site, or a gap. See the list in AGENT-BRIEF.md.
export const NOINDEX = (import.meta.env.PUBLIC_NOINDEX ?? 'true') !== 'false';
// The estimate form has no back-end yet. Flip to true once a real endpoint is wired (see README).
export const FORM_LIVE = false;

export const SITE = {
  name: 'Plumbing By Paul',
  legalName: 'Plumbing By Paul LLC',
  owner: 'Paul Alves',
  tagline: 'Plumbing Pinellas with heart',
  phone: '(727) 709-2552',
  phoneHref: 'tel:+17277092552',
  phoneE164: '+1-727-709-2552',
  email: 'info@plumbingbypaulllc.com',
  street: '5565 64th Way N Suite A',
  city: 'St. Petersburg',
  region: 'FL',
  zip: '33709',
  county: 'Pinellas County',
  // Approximate pin for the shop (64th Way N at the 5500 block). Confirm against the Google Business Profile pin before launch.
  geo: { lat: 27.8225, lng: -82.7247 },
  hoursShort: 'Open 7 days · 24/7 emergency',
  hoursNote: 'Paul to confirm hours', // his own site shows two different sets of hours
  facebook: 'https://www.facebook.com/plumbingbypaulllc',
  instagram: 'https://www.instagram.com/plumbingbypaulllc',
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ__-LnAz8wogRZE-DlVtycL8',
  googleMapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ__-LnAz8wogRZE-DlVtycL8',
  placeId: 'ChIJ__-LnAz8wogRZE-DlVtycL8',
  // Real Google numbers, read 26 Oct 2026. Re-check before launch.
  rating: '4.9',
  reviewCount: 941,
  ratingLine: '4.9 · 941 Google reviews',
  license: 'Lic. # [Paul to confirm]',
  // Paul's own claims (shown as his claims; all on the "Paul to confirm" list)
  claims: { years: 10, customers: 2500, warrantyYears: 1 },
} as const;

// The three real Google reviews, word for word (shortened with … exactly as in FACTS.md). Never edit the wording.
export const REVIEWS = [
  { name: 'James D.', initial: 'J', topic: 'Copper pipe leak',
    text: 'Paul (Phil) to the rescue!! I had a leak in copper pipe on a very tricky area. I called Paul and they answered on the first ring. … Phil was here within the hour and fixed it in under an hour. … Repair was way cheaper than I thought it was going to be. Incredible experience.' },
  { name: 'Doriana A.', initial: 'D', topic: 'Pipe work',
    text: 'Chris & Alex did absolutely incredible job, look at the welding! … From calling in to schedule the appointment to them cleaning up - everything was perfect! … they were incredible n would recommend them to anyone!' },
  { name: 'Phil E.', initial: 'P', topic: 'Toilets and garbage disposal',
    text: 'Plumbing By Paul did a fantastic job replacing my two toilets and garbage disposal today. Chris and Steven did an excellent job! Not only did they haul away the old ones, they cleaned up behind themselves! Would definitely recommend!' },
] as const;

// Main navigation. Pages not built yet are listed in AGENT-BRIEF.md.
export const NAV = [
  { href: '/services/', label: 'Services' },
  { href: '/about/', label: 'About' },
  { href: '/service-areas/', label: 'Areas' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/contact/', label: 'Contact' },
] as const;

// Default four-step process (from Paul's own drain cleaning page: Estimate, Inspect, Clean, Prevent; worded for any job).
export const PROCESS = [
  { title: 'Call or send the form', text: 'Tell us what is going on. No phone tree. We are open 7 days a week and the emergency line is answered 24/7.' },
  { title: 'Free estimate', text: 'We look at the job and give you the price before any work starts. No hidden fees.' },
  { title: 'We fix it', text: 'The truck arrives stocked for the job, so the repair gets done without a second trip.' },
  { title: 'Backed for a year', text: 'We clean up, walk you through what we did, and our 1-year workmanship warranty covers it.' },
] as const;

export const FAQS = [
  { q: 'Do you offer free estimates?', a: 'Yes. Our services start with a free estimate. For non-emergency work we assess the job in full before starting. For an emergency we can often give you an estimate over the phone.' },
  { q: 'Are you open on weekends?', a: 'Yes. We are open 7 days a week, and our emergency line is answered 24/7 for burst pipes, sewer backups and water heater failures.' },
  { q: 'Which areas do you cover?', a: 'All of Pinellas County. Our shop is in St. Petersburg and we serve Clearwater, Seminole and the rest of the county, from Tarpon Springs down to St. Pete Beach.' },
  { q: 'Are you licensed and insured?', a: 'Yes. Plumbing By Paul LLC is fully licensed, bonded and insured, and we take on both homes and businesses.' },
  { q: 'Is your work covered by a warranty?', a: 'Yes. Our work carries a 1-year workmanship warranty. If something we fixed goes wrong, we come back and put it right.' },
  { q: 'What should I do in a plumbing emergency?', a: 'Shut off the main water valve (it is outside, near your water meter, and turns clockwise), stay away from any water near outlets or the electrical panel, then call us. We talk you through the first steps while the team is on the way.' },
  { q: 'Why is my water pressure so weak?', a: 'Often it is hard-water scale inside the pipes, sediment in the water heater, or a pinched or partly blocked water line. Pinellas County has very hard water, so scale is common here. We find the cause and fix it, and a water softener can help over time.' },
] as const;

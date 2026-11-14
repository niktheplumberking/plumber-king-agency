// Site facts / NAP. One source for every page. Facts only: see PAGES.md "Facts used in copy".
// Anything marked confirm: true is Paul's own claim and sits on the README "Paul to confirm" list.
export const SITE = {
  name: 'Plumbing By Paul',
  legalName: 'Plumbing By Paul LLC',
  tagline: 'Plumbing Pinellas with Heart',
  founded: 2015,
  founder: 'Paul Alves',
  coOwner: 'Alycia', // co-owner first name as Paul uses it; surname not used in copy
  phone: '(727) 709-2552',
  tel: 'tel:+17277092552',
  phoneE164: '+17277092552',
  email: 'info@plumbingbypaulllc.com',
  address: {
    street: '5565 64th Way N Suite A',
    city: 'St. Petersburg',
    region: 'FL',
    zip: '33709',
    country: 'US',
  },
  // Geo from the v2 build (approximate; confirm against the Google Business Profile pin before launch).
  geo: { lat: 27.8225, lng: -82.7247 },
  licence: 'CFC1430367',
  licenceLabel: 'Florida Certified Plumbing Contractor',
  licenceLookup: 'https://www.myfloridalicense.com/wl11.asp',
  rating: { value: '4.9', count: 947, checked: '13 Nov 2026', checkedIso: '2026-11-13' },
  hours: {
    short: 'Open 7 days',
    line: 'Open 7 days, 8 AM to 5 PM',
    office: 'Open every day, 8 AM to 5 PM',
    emergency: '24/7 emergency line', // STICKY 1: Paul to confirm
    schema: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '08:00', closes: '17:00' }],
  },
  awards: {
    name: 'Best of the Bay',
    title: 'Best Plumbing Company',
    by: 'Creative Loafing Tampa Bay readers',
    years: ['2022', '2023', '2024', '2026'],
  },
  warranty: '1-year workmanship warranty', // STICKY 2: Paul to confirm
  social: {
    facebook: 'https://www.facebook.com/plumbingbypaulllc',
    instagram: 'https://www.instagram.com/plumbingbypaulllc',
    instagramHandle: '@plumbingbypaulllc',
    instagramPosts: 740, // read 13 Nov 2026; refresh at build (STICKY 9 note)
  },
  google: {
    placeId: 'ChIJ__-LnAz8wogRZE-DlVtycL8',
    reviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJ__-LnAz8wogRZE-DlVtycL8',
    writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ__-LnAz8wogRZE-DlVtycL8',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plumbing+By+Paul+LLC&query_place_id=ChIJ__-LnAz8wogRZE-DlVtycL8',
  },
  // Paul's current payment link was not found in source-site-text. Until he supplies it, "Make a payment" goes to /contact.
  paymentUrl: '/contact',
  bbb: 'A+ rating with the BBB', // text only, not accredited: never the seal
} as const;

export const PROOF = [
  { label: `Lic. ${SITE.licence}`, icon: 'badge' },
  { label: 'Family-owned since 2015', icon: 'house' },
  { label: 'Best of the Bay 2026', icon: 'award' },
  { label: 'Open 7 days', icon: 'clock' },
  { label: 'Free estimates', icon: 'clipboard' },
] as const;

/** Problems offered in every estimate form (PAGES.md G3). */
export const PROBLEMS = ['Leak', 'No hot water', 'Clog or backup', 'Planning a project', 'Something else'] as const;

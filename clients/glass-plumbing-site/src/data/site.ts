// Site facts. One source for every page. Facts only, each with its source:
// /mnt/project-files/plumber-king-agency/clients/glass-plumbing/research/FACTS-CHECK.md + LOCAL-FACTS.md (read 17 Nov 2026).
// Never add years, prices, response times or warranties until Kody confirms them (README "Kody to confirm").
export const SITE = {
  name: 'Glass Plumbing Services',
  owner: 'Kody Glass',                  // business card "Kody Glass, OWNER"
  phone: '(727) 512-0673',              // everywhere
  tel: 'tel:+17275120673',
  sms: 'sms:+17275120673',              // Kody to confirm the number takes texts
  phoneE164: '+17275120673',
  email: 'kodyglassplumbing@gmail.com', // site + card
  city: 'Largo', region: 'FL', regionName: 'Florida', county: 'Pinellas County',
  // Street address on DBPR: 1180 Woodbrook Dr, Largo FL 33770. Kody to confirm it may be public; until then the site
  // shows "Largo, FL" only and the schema has no street.
  geo: { lat: 27.9095, lng: -82.7873 }, // Largo city centre (service-area business)
  licence: { number: 'CFC1432488', kind: 'Certified Plumbing Contractor', state: 'Florida', expires: '08/31/2028',
    url: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=0&typ=N' },
  hours: '24/7 emergency calls',        // his site + card ("24/7 Emergency"), Kody to confirm
  scope: 'Commercial & residential',    // logo bars + site
  offer: '10% off for veterans, first responders, teachers & seniors (up to $100)', // site + card
  google: {
    checked: '17 Nov 2026',
    a: { count: 104, value: '5.0', url: 'https://www.google.com/maps/place/?q=place_id:ChIJBWIE7QvvAGoRPypbnUfgkgk' },
    b: { count: 77, value: '5.0', url: 'https://www.google.com/maps/place/?q=place_id:ChIJD2Yl6ZyYtqoRdK3jLzULhyQ' },
  },
  social: {
    instagram: 'https://www.instagram.com/glassplumbingservices/',
    instagramHandle: '@glassplumbingservices',
  },
} as const;

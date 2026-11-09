// Single source of truth for business facts. Anything Jim still has to confirm is listed in PLACEHOLDERS.md.
export const SITE = {
  name: 'United Plumbing',
  owner: 'Jaime "Jim" Galvez',
  phone: '909-587-0711',
  phoneDisplay: '(909) 587-0711',
  phoneHref: 'tel:+19095870711',
  smsHref: 'sms:+19095870711',
  backupPhone: '909-667-6555',
  backupHref: 'tel:+19096676555',
  email: 'Plumblord1@gmail.com',
  instagram: 'https://www.instagram.com/plumblord1/',
  instagramHandle: '@plumblord1',
  instagramFollowers: '1,156',
  facebook: 'https://www.facebook.com/search/top?q=Jim%20United%20Plumbing%20Official',
  facebookFollowers: '1.7K',
  city: 'Pomona',
  region: 'CA',
  zip: '91767',
  since: '2018',
  geo: { lat: 34.0551, lng: -117.7500 },
};

// The site is a preview until Jim approves: keep it out of Google until the real domain is live.
export const NOINDEX = (import.meta.env.PUBLIC_NOINDEX ?? 'true') !== 'false';

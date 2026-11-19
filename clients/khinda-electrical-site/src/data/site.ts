// Khinda Electrical facts. Source: plan/PAGE-SHEET.md "Facts copy may use" (17 Nov 2026). Anything not here is a
// "Khinda to confirm" item (README). No licence number, hours, owner name, reviews or years.
export const SITE = {
  name: 'Khinda Electrical',
  city: 'Surrey',
  region: 'BC',
  country: 'CA',
  phone: '236-818-2664',
  phoneE164: '+12368182664',
  tel: 'tel:+12368182664',
  sms: 'sms:+12368182664',
  whatsapp: 'https://wa.me/12368182664',
  igHandle: '@khinda__electrical',
  igFollowers: '1,521',
  igPosts: 66,
  igDate: '17 Nov 2026',
  social: {
    instagram: 'https://www.instagram.com/khinda__electrical/',
    youtube: 'https://www.youtube.com/@Khindaelectrical',
  },
  geo: { lat: 49.1913, lng: -122.849 },
} as const;

export const SERVICES = [
  { slug: 'panel-upgrades', name: 'Panel upgrades', short: 'Panels', href: '/services/panel-upgrades/' },
  { slug: 'ev-charger-installation', name: 'EV charger installation', short: 'EV chargers', href: '/services/ev-charger-installation/' },
  { slug: 'lighting-pot-lights', name: 'Lighting and pot lights', short: 'Lighting', href: '/services/lighting-pot-lights/' },
  { slug: 'new-construction-wiring', name: 'New construction wiring', short: 'New builds', href: '/services/new-construction-wiring/' },
  { slug: 'renovations-basement-suites', name: 'Renovations and basement suites', short: 'Renos and suites', href: '/services/renovations-basement-suites/' },
  { slug: 'commercial-electrical', name: 'Commercial electrical', short: 'Commercial', href: '/services/commercial-electrical/' },
  { slug: 'fire-alarm-systems', name: 'Fire alarm systems', short: 'Fire alarm', href: '/services/fire-alarm-systems/' },
  { slug: 'repairs-troubleshooting', name: 'Repairs and troubleshooting', short: 'Repairs', href: '/services/repairs-troubleshooting/' },
] as const;

// Towns: not confirmed by Khinda yet (README "Khinda to confirm").
export const TOWNS = [
  { slug: 'newton', name: 'Newton', href: '/areas/newton/', city: 'Surrey' },
  { slug: 'fleetwood', name: 'Fleetwood', href: '/areas/fleetwood/', city: 'Surrey' },
  { slug: 'guildford', name: 'Guildford', href: '/areas/guildford/', city: 'Surrey' },
  { slug: 'cloverdale', name: 'Cloverdale', href: '/areas/cloverdale/', city: 'Surrey' },
  { slug: 'south-surrey', name: 'South Surrey', href: '/areas/south-surrey/', city: 'Surrey' },
  { slug: 'city-centre', name: 'City Centre', href: '/areas/city-centre/', city: 'Surrey' },
  { slug: 'delta', name: 'Delta', href: '/areas/delta/', city: 'Nearby' },
  { slug: 'langley', name: 'Langley', href: '/areas/langley/', city: 'Nearby' },
  { slug: 'white-rock', name: 'White Rock', href: '/areas/white-rock/', city: 'Nearby' },
] as const;

export const NAV = [
  { label: 'Services', href: '/services/', menu: 'services' },
  { label: 'Areas', href: '/areas/', menu: 'areas' },
  { label: 'Our work', href: '/our-work/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

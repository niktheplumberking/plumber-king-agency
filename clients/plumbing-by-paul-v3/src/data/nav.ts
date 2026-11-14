// Header + footer navigation. Every href here must be a built page before launch (see BUILDERS.md "Pages still to build").
import { SERVICES, EMERGENCY } from './services';
import { SITE } from './site';

export const NAV = [
  { label: 'Services', href: '/services', menu: 'services' as const },
  { label: 'Service areas', href: '/service-areas', menu: 'areas' as const },
  { label: 'Our work', href: '/our-work' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const s = (href: string) => ({ label: SERVICES.find((x) => x.href === href)!.name, href });
export const FOOTER = {
  services: [
    [s('/water-heaters'), s('/drain-cleaning'), s('/clogged-drain'), s('/drain-camera'), s('/sewer-service'), s('/repiping')],
    [s('/toilet-repair'), s('/garbage-disposal'), s('/plumbing'), { label: EMERGENCY.name, href: EMERGENCY.href }],
  ],
  areas: [
    { label: 'St. Petersburg', href: '/service-areas' },
    { label: 'Clearwater', href: '/service-areas/clearwater-fl' },
    { label: 'Seminole', href: '/service-areas/seminole-fl' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Our work', href: '/our-work' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Guides', href: '/guides' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Make a payment', href: SITE.paymentUrl },
    { label: 'Leave us a Google review', href: SITE.google.writeReviewUrl, external: true },
  ],
  legal: [
    { label: 'Privacy policy', href: '/privacy-policy' },
    { label: 'Terms and conditions', href: '/terms-and-conditions' },
  ],
};

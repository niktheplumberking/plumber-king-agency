// Every service URL in the build (BUILD-BRIEF "URLs"). Paths keep Paul's current site paths, no trailing slash.
// `group` drives the mega menu; `footer` the footer Services column order. No tankless page (brief).
export interface Service { name: string; short?: string; href: string; group: 'drains' | 'hot' | 'pipes' | 'fixtures'; isNew?: boolean; }
export const SERVICES: Service[] = [
  { name: 'Drain cleaning', href: '/drain-cleaning', group: 'drains' },
  { name: 'Clogged drain', href: '/clogged-drain', group: 'drains' },
  { name: 'Drain camera inspection', href: '/drain-camera', group: 'drains' },
  { name: 'Sewer service', href: '/sewer-service', group: 'drains' },
  { name: 'Water heaters', href: '/water-heaters', group: 'hot' },
  { name: 'Repiping', href: '/repiping', group: 'pipes' },
  { name: 'Leak detection', href: '/leak-detection', group: 'pipes', isNew: true },
  { name: 'Gas lines', href: '/gas-lines', group: 'pipes', isNew: true },
  { name: 'Toilet repair', href: '/toilet-repair', group: 'fixtures' },
  { name: 'Garbage disposal', href: '/garbage-disposal', group: 'fixtures' },
  { name: 'General plumbing', href: '/plumbing', group: 'fixtures' },
  { name: 'Water softeners and filtration', href: '/water-softeners', group: 'fixtures', isNew: true },
  { name: 'Commercial plumbing', href: '/commercial-plumbing', group: 'fixtures', isNew: true },
];
export const EMERGENCY = { name: 'Emergency plumbing', href: '/emergency-plumbing' };
export const SERVICE_GROUPS: { key: Service['group']; label: string }[] = [
  { key: 'drains', label: 'Drains and sewer' },
  { key: 'hot', label: 'Hot water' },
  { key: 'pipes', label: 'Pipes and leaks' },
  { key: 'fixtures', label: 'Fixtures and more' },
];
export const byHref = (href: string) => SERVICES.find((s) => s.href === href) ?? (href === EMERGENCY.href ? EMERGENCY : undefined);

// Services, word for word from his flyer (PAGES-COPY 1.2). Pages exist only for the ones with written copy;
// the rest link to their family on /services.
export const FLYER_LIST = [
  'Drain Cleaning, Repair & New Installation', 'Pressure washing', 'Sewer Lines', 'Hydro Jetting', 'Leak Detection',
  'Leak Repair', 'Water Heater Install', 'Water Heater Repair', 'Toilets, Sinks & Faucets', 'Garbage Disposal',
  'Water Filtration', 'Emergency Services',
] as const;
export const SERVICE_PAGES = [
  { name: 'Drain cleaning & hydro jetting', href: '/drain-cleaning' },
  { name: 'Water heaters', href: '/water-heaters' },
  { name: 'Emergency plumbing', href: '/emergency-plumber' },
] as const;
export const FAMILIES = [
  { name: 'Drains & sewer lines', href: '/services#drains' },
  { name: 'Leaks & water lines', href: '/services#leaks' },
  { name: 'Water heaters', href: '/services#water-heaters' },
  { name: 'Around the house', href: '/services#around-the-house' },
  { name: 'Commercial', href: '/services#commercial' },
] as const;

// /services hub copy (Figma 02 = PAGES.md 02 S1-S10, exact copy; build-kit s02data.js). One link per service.
// There is no tankless page: "Tankless water heaters" points at the types section of /water-heaters (STICKY 10).
import { SITE } from '../../../data/site';
import type { Review } from '../../../data/reviews';

export const HREF: Record<string, string> = {
  'Water heaters': '/water-heaters', 'Tankless water heaters': '/water-heaters#types', 'Drain cleaning': '/drain-cleaning',
  'Clogged drain': '/clogged-drain', 'Drain camera inspection': '/drain-camera', 'Sewer service': '/sewer-service',
  Repiping: '/repiping', 'Leak detection': '/leak-detection', 'Gas lines': '/gas-lines', 'Toilet repair': '/toilet-repair',
  'Garbage disposal': '/garbage-disposal', 'Water softeners and filtration': '/water-softeners', 'General plumbing': '/plumbing',
  'Commercial plumbing': '/commercial-plumbing', 'Emergency plumbing': '/emergency-plumbing',
  'Repair or replace? (guide)': '/guides/water-heater-repair-or-replace',
};

export const SYMPTOMS: { label: string; icon: string; lines: string[]; links: string[] }[] = [
  { label: "Water won't go down", icon: 'waves', lines: ['One slow drain is usually a local clog: hair, soap, grease.', 'Several slow drains at once usually means the main line.'], links: ['Drain cleaning', 'Clogged drain'] },
  { label: 'No hot water', icon: 'heater', lines: ['Could be a thermostat, a heating element or the pilot.', "Could be the tank telling you it's done.", 'We check before we sell you anything.'], links: ['Water heaters', 'Repair or replace? (guide)'] },
  { label: "Water where it shouldn't be", icon: 'droplets', lines: ['A stain on the ceiling, a wet cabinet, a meter that spins when everything is off.', 'We find the leak before we open a wall.'], links: ['Leak detection', 'Emergency plumbing'] },
  { label: 'Toilet trouble', icon: 'toilet', lines: ['Running, rocking, clogging or sweating.', 'Most are a quick repair.', 'Some toilets have earned retirement.'], links: ['Toilet repair'] },
  { label: 'Smell or gurgle', icon: 'alert', lines: ['Sewer smell, gurgling drains or water coming up in the shower when you flush point to the sewer line.', 'A camera shows us why.'], links: ['Sewer service', 'Drain camera inspection'] },
  { label: 'Old pipes, new plans', icon: 'ruler', lines: ['Low pressure, rusty water, an insurance inspection or a remodel on the way.', 'Time to talk about the pipes themselves.'], links: ['Repiping', 'General plumbing'] },
];

export const FAMILIES = [
  { t: 'Drains and sewer', d: 'Water going out. Clogs, slow drains, main lines and the sewer line to the street.', links: ['Drain cleaning', 'Clogged drain', 'Drain camera inspection', 'Sewer service'], call: 'Call about a drain', icon: 'waves',
    photo: { name: 'service-tech-at-cleanout', alt: 'A technician feeding a drain line into an open yard cleanout', focus: '50% 22%' } },
  { t: 'Hot water', d: 'Tank, tankless and hybrid water heaters. Maintenance, repair and replacement.', links: ['Water heaters', 'Tankless water heaters'], call: 'Call about hot water', icon: 'heater',
    photo: { name: 'service-trutankless-unit', alt: 'A Trutankless electric water heater mounted on a block wall', focus: '0% 50%' } },
  { t: 'Pipes and leaks', d: 'Water coming in. Leaks, burst pipes, low pressure, whole-house repipes and gas lines.', links: ['Repiping', 'Leak detection', 'Gas lines'], call: 'Call about a leak', icon: 'droplets',
    photo: { name: 'service-tech-ladder-under-raised-house', alt: 'A technician on a ladder working on pipes under a raised house', focus: '53% 50%' } },
  { t: 'Fixtures and more', d: 'Toilets, faucets, disposals, softeners and filters.', links: ['Toilet repair', 'Garbage disposal', 'Water softeners and filtration', 'General plumbing'], call: 'Call about a fixture', icon: 'toilet',
    photo: { name: 'service-tech-under-sink-smiling', alt: 'A smiling technician in a cap working under a pink-tiled bathroom sink', focus: '65% 30%' } },
];

export const LIST: [string, string, string][] = [
  ['Water heaters', 'Repair, maintenance and replacement.', 'heater'], ['Tankless water heaters', 'Sized for your home, installed and serviced.', 'flame'],
  ['Drain cleaning', 'Sinks, tubs, toilets, floor drains and main lines.', 'waves'], ['Clogged drain', "The one drain that won't behave.", 'alert'],
  ['Drain camera inspection', 'See inside the pipe before you spend money.', 'camera'], ['Sewer service', 'Backups, repairs and replacement.', 'pipe'],
  ['Repiping', 'New pipes for older Pinellas homes.', 'ruler'], ['Leak detection', 'Find it first, then fix it.', 'droplets'],
  ['Gas lines', 'New lines, appliance hookups and leak checks.', 'zap'], ['Toilet repair', 'Running, leaking, clogging, or a new one.', 'toilet'],
  ['Garbage disposal', 'Repair and replacement.', 'filter'], ['Water softeners and filtration', "For Pinellas County's hard water.", 'drop'],
  ['General plumbing', 'Faucets, valves, pressure and everyday repairs.', 'wrench'], ['Commercial plumbing', 'Offices, shops and properties.', 'building'],
];

export const PROMISE = [
  { t: 'Price first', d: 'You approve the cost before we start.', icon: 'clipboard' }, { t: 'Licensed', d: `Florida ${SITE.licence}.`, icon: 'badge' },
  { t: 'Guaranteed', d: '1-year workmanship warranty.', icon: 'shield' }, { t: 'Cleaned up', d: 'We leave it tidier than we found it.', icon: 'check' },
];

/** REVIEWS.md n6 (full) and n23 (a contiguous run of the reviewer's own sentences; the last sentence is left off). */
export const STEFAN: Review = { n: 6, name: 'Stefan Despotovic', age: '4 weeks ago', full: true, tags: ['Plumbing pipe repair'], fixedBy: ['Elvis', 'JR'],
  quote: "JR and his assistance Elvis did a phenomenal job repairing the plumbing at my Church's hall. JR was committed to resolve our plumbing issue. When the job proved to be tougher than he thought, he wasn't discouraged. JR and Elvis kept everything clean throughout the project and worked with us around our schedule. The entire parish is thankful for their work!" };
export const RENEE: Review = { n: 23, name: 'Renee Frias', age: '7 months ago', full: false, fixedBy: ['Brian'], hl: ['our go-to plumbers for the past three years'],
  quote: 'These guys have been our go-to plumbers for the past three years. We bought a flip house. We’ve had issue after issue with our plumbing, and they’ve always been able to help. Brian is incredibly knowledgeable, personable, and straightforward. It really felt like he did everything he could to resolve the problems we were having.' };

export const FAQ = {
  eyebrow: 'Before you book', l1: 'Service questions,', l2: 'answered straight',
  items: [
    { q: 'Do you give free estimates?', a1: 'Yes.', a2: 'Estimates are free, and you hear the price before any work starts. For an emergency we can often give you an idea over the phone.', link: { text: `Call ${SITE.phone}`, href: SITE.tel } },
    { q: 'Do I need to know which service I need?', a1: 'No.', a2: "Tell us what you see, hear or smell. We'll work out whether it's a drain, a pipe, the water heater or a fixture and send the right person." },
    { q: 'Do you pull permits?', a1: 'Yes, when a job needs one.', a2: 'Some work in Pinellas County, such as replacing a water heater, requires a permit, and we handle it as part of the job.' },
    { q: 'Can I ask for the same plumber again?', a1: 'Yes.', a2: 'Plenty of our customers ask for their technician by name, and we do our best to send them.' },
  ],
};

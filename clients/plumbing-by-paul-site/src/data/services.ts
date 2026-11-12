// The 13 services. Slugs are final URLs (keyword + St. Petersburg). SEO titles are under 60 characters, metas 140-160.
// Source for what each service covers: Paul's current site (service pages + About page). No prices, no invented claims.
export type FamilyKey = 'drains' | 'pipes' | 'water' | 'urgent';

export const FAMILIES: Record<FamilyKey, { name: string; line: string }> = {
  drains: { name: 'Drains & sewer', line: 'Clogs, slow drains and sewer lines' },
  pipes: { name: 'Pipes, leaks & gas', line: 'Supply lines, repipes and gas work' },
  water: { name: 'Hot water & fixtures', line: 'Heaters, toilets, disposals, soft water' },
  urgent: { name: 'Emergency & commercial', line: 'After-hours calls and business plumbing' },
};

export interface Service {
  slug: string; name: string; nav: string; family: FamilyKey; icon: string;
  title: string; description: string; blurb: string;
}

export const SERVICES: Service[] = [
  { slug: 'clogged-drain-repair-st-petersburg-fl', name: 'Clogged Drains', nav: 'Clogged drains', family: 'drains', icon: 'drain',
    title: 'Clogged Drain Repair St. Petersburg FL | Plumbing By Paul',
    description: 'Clogged sink, tub, toilet or floor drain in St. Petersburg? Plumbing By Paul clears it fast, 7 days a week, with a free estimate. Call (727) 709-2552.',
    blurb: 'Sinks, tubs, toilets and floor drains that will not clear with a plunger.' },
  { slug: 'drain-cleaning-st-petersburg-fl', name: 'Drain Cleaning', nav: 'Drain cleaning', family: 'drains', icon: 'water',
    title: 'Drain Cleaning St. Petersburg FL | Plumbing By Paul',
    description: 'Drain cleaning in St. Petersburg and all of Pinellas County. Kitchen, bath, floor drains and main lines cleared, 24/7 emergency calls. Free estimates.',
    blurb: 'Kitchen, bathroom and floor drains cleaned out, from one slow sink to the main line.' },
  { slug: 'drain-camera-inspection-st-petersburg-fl', name: 'Drain Camera Inspection', nav: 'Camera inspection', family: 'drains', icon: 'camera',
    title: 'Drain Camera Inspection St. Petersburg | Plumbing By Paul',
    description: 'Drain camera inspection in St. Petersburg, FL. We see inside the line, find the real cause and catch problems early. Free estimates. Call (727) 709-2552.',
    blurb: 'A camera down the line shows the real problem before anyone guesses or digs.' },
  { slug: 'sewer-line-service-st-petersburg-fl', name: 'Sewer Line Service', nav: 'Sewer lines', family: 'drains', icon: 'sewer',
    title: 'Sewer Line Service St. Petersburg FL | Plumbing By Paul',
    description: 'Sewer line service in St. Petersburg and Pinellas County. Backups cleared, lines inspected and repaired by a licensed, insured team. Call (727) 709-2552.',
    blurb: 'Backups, slow main lines and sewer repairs, handled before they flood the house.' },
  { slug: 'repiping-st-petersburg-fl', name: 'Repiping', nav: 'Repiping', family: 'pipes', icon: 'pipe',
    title: 'Repiping St. Petersburg FL | Plumbing By Paul',
    description: 'Whole-home and partial repiping in St. Petersburg, FL. Old, corroded or leaking pipes replaced by a licensed team, with a 1-year workmanship warranty.',
    blurb: 'Old, corroded or leaking pipes replaced, one section or the whole house.' },
  { slug: 'leak-detection-st-petersburg-fl', name: 'Leak Detection & Burst Pipes', nav: 'Leaks & burst pipes', family: 'pipes', icon: 'drop',
    title: 'Leak Detection St. Petersburg FL | Plumbing By Paul',
    description: 'Leak detection and burst pipe repair in St. Petersburg, FL. We find the leak, fix it and sort out pressure problems. 24/7 emergency line: (727) 709-2552.',
    blurb: 'Hidden leaks found, burst pipes repaired and water pressure problems solved.' },
  { slug: 'gas-line-services-st-petersburg-fl', name: 'Gas Lines', nav: 'Gas lines', family: 'pipes', icon: 'flame',
    title: 'Gas Line Services St. Petersburg FL | Plumbing By Paul',
    description: 'Gas line repair, leak detection, new lines and appliance hookups in St. Petersburg and Pinellas County. Licensed and insured. Call (727) 709-2552.',
    blurb: 'Gas leak detection, new gas lines and appliance hookups, done safely.' },
  { slug: 'water-heater-repair-st-petersburg-fl', name: 'Water Heaters', nav: 'Water heaters', family: 'water', icon: 'heater',
    title: 'Water Heater Repair St. Petersburg FL | Plumbing By Paul',
    description: 'Water heater repair and installation in St. Petersburg, FL. Tank and tankless, repaired, replaced and maintained. Free estimates. Call (727) 709-2552.',
    blurb: 'Tank and tankless water heaters repaired, replaced and maintained.' },
  { slug: 'toilet-repair-st-petersburg-fl', name: 'Toilet Repair', nav: 'Toilet repair', family: 'water', icon: 'toilet',
    title: 'Toilet Repair St. Petersburg FL | Plumbing By Paul',
    description: 'Toilet repair and installation in St. Petersburg, FL. Leaks, clogs, running toilets and full replacements, with a free estimate. Call (727) 709-2552.',
    blurb: 'Running, leaking or clogged toilets fixed, and new toilets installed.' },
  { slug: 'garbage-disposal-repair-st-petersburg-fl', name: 'Garbage Disposals', nav: 'Garbage disposals', family: 'water', icon: 'disposal',
    title: 'Garbage Disposal Repair St. Petersburg | Plumbing By Paul',
    description: 'Garbage disposal repair and installation in St. Petersburg, FL. Jammed, leaking or dead units fixed or replaced. Free estimates. Call (727) 709-2552.',
    blurb: 'Jammed, leaking or dead disposals repaired or swapped for a new one.' },
  { slug: 'water-softeners-filtration-st-petersburg-fl', name: 'Water Softeners & Filtration', nav: 'Softeners & filtration', family: 'water', icon: 'filter',
    title: 'Water Softeners St. Petersburg FL | Plumbing By Paul',
    description: 'Water softeners and whole-home filtration in St. Petersburg, FL. Pinellas water is hard. We install and maintain systems that protect pipes and appliances.',
    blurb: 'Softeners and filters for hard Pinellas water, installed and maintained.' },
  { slug: 'emergency-plumber-st-petersburg-fl', name: '24/7 Emergency Plumbing', nav: '24/7 emergency', family: 'urgent', icon: 'alert',
    title: 'Emergency Plumber St. Petersburg FL | Plumbing By Paul',
    description: '24/7 emergency plumber in St. Petersburg and Pinellas County. Burst pipes, sewer backups and water heater failures. Call (727) 709-2552 any hour.',
    blurb: 'Burst pipes, sewer backups and failed water heaters, any hour of the day.' },
  { slug: 'commercial-plumbing-st-petersburg-fl', name: 'Commercial Plumbing', nav: 'Commercial plumbing', family: 'urgent', icon: 'building',
    title: 'Commercial Plumbing St. Petersburg FL | Plumbing By Paul',
    description: 'Commercial plumbing in St. Petersburg and Pinellas County. Repairs, drains and installations for businesses, builders and contractors. (727) 709-2552.',
    blurb: 'Repairs and installations that keep shops, offices and job sites running.' },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const servicesByFamily = (f: FamilyKey) => SERVICES.filter((s) => s.family === f);

/** Closing headline and form title for each service page, written by hand so each one reads like a person said it. */
export const SERVICE_CONTACT: Record<string, { need: string; form: string }> = {
  'clogged-drain-repair-st-petersburg-fl': { need: 'Drain clogged?', form: 'Free clogged drain estimate' },
  'drain-cleaning-st-petersburg-fl': { need: 'Need drain cleaning?', form: 'Free drain cleaning estimate' },
  'drain-camera-inspection-st-petersburg-fl': { need: 'Need a camera inspection?', form: 'Free camera inspection estimate' },
  'sewer-line-service-st-petersburg-fl': { need: 'Sewer line trouble?', form: 'Free sewer line estimate' },
  'repiping-st-petersburg-fl': { need: 'Need a repipe?', form: 'Free repiping estimate' },
  'leak-detection-st-petersburg-fl': { need: 'Got a leak?', form: 'Free leak repair estimate' },
  'gas-line-services-st-petersburg-fl': { need: 'Need gas line work?', form: 'Free gas line estimate' },
  'water-heater-repair-st-petersburg-fl': { need: 'No hot water?', form: 'Free water heater estimate' },
  'toilet-repair-st-petersburg-fl': { need: 'Toilet trouble?', form: 'Free toilet repair estimate' },
  'garbage-disposal-repair-st-petersburg-fl': { need: 'Disposal jammed?', form: 'Free garbage disposal estimate' },
  'water-softeners-filtration-st-petersburg-fl': { need: 'Hard water?', form: 'Free water softener estimate' },
  'emergency-plumber-st-petersburg-fl': { need: 'Plumbing emergency?', form: 'Not urgent? Get a free estimate' },
  'commercial-plumbing-st-petersburg-fl': { need: 'Need a commercial plumber?', form: 'Free commercial plumbing estimate' },
};

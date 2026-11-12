// Long-form content for each service page. A service only gets a page once it has an entry here.
// Source: Paul's current service pages (text in source-site-text/) rewritten in plain words. No prices, no invented facts.
export interface ServiceContent {
  /** H1 is "<h1a> <h1b>", h1b is the coral half. Keep the keyword + town in it. */
  h1a: string; h1b: string; eyebrow: string; lead: string;
  introTitle: [string, string]; intro: string[]; includes: string[];
  /** Optional tabbed guide (e.g. which drain / which heater). */
  guide?: { title: [string, string]; lead: string; tabs: { key: string; label: string; icon: string; text: string; tip?: string }[] };
  why: { icon: string; title: string; text: string }[];
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  related: string[]; // service slugs
  ctaTitle: string;
  /** true = auto-built starter page (no entry below yet). Builders: add a full entry and this goes away. */
  basic?: boolean;
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'drain-cleaning-st-petersburg-fl': {
    h1a: 'Drain cleaning in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Drains & sewer',
    lead: 'A slow sink, a shower that will not empty or a main line that keeps backing up: we clear it and check why it happened. Book a visit, or call the 24/7 line when it cannot wait.',
    introTitle: ['Fast drain cleaning,', 'when you need it.'],
    intro: [
      'When a drain stops, you want it fixed now. That can mean a next-day appointment or an emergency call in the middle of the night. We do both, for homes and businesses across Pinellas County.',
      'Nobody wants to pay an arm and a leg to get a drain cleaned. We keep our drain rates competitive and start with a free estimate, so you know the price before we begin.',
    ],
    includes: ['Scheduled appointments', 'Emergency after-hours calls, 24/7', 'Competitive drain cleaning rates', 'Homes and businesses'],
    guide: {
      title: ['Which drain', 'needs cleaning?'],
      lead: 'Every drain in the building runs to one main line that connects to the city sewer. Pick the one giving you trouble.',
      tabs: [
        { key: 'toilets', label: 'Toilets', icon: 'toilet', text: 'A toilet can clog or overflow in seconds. We clear the blockage and look for the cause, so it does not come straight back.', tip: 'Only flush toilet paper. Wipes belong in the trash, even the ones labelled flushable.' },
        { key: 'kitchen', label: 'Kitchen sinks', icon: 'water', text: 'Grease, food and buildup are what stop a kitchen drain. We clean the line out so the sink empties the way it should.' },
        { key: 'bath', label: 'Bathroom sinks', icon: 'drop', text: 'A bathroom sink that drains slowly usually has a blockage building in the trap or the line behind it. We clear it before it stops completely.', tip: 'A hair trap over the drain catches most of it before it reaches the pipe.' },
        { key: 'shower', label: 'Showers & tubs', icon: 'drain', text: 'Hair, soap and residue are the usual causes of shower and tub clogs. We remove the blockage and get the water moving again.', tip: 'Drain covers in showers and tubs stop debris before it gets into the pipes.' },
        { key: 'floor', label: 'Floor drains', icon: 'pipe', text: 'Floor drains collect dirt and debris until they stop taking water. We clean them out and check that the line below is clear.', tip: 'Keeping the floor around the drain clean prevents most of the buildup.' },
        { key: 'sewer', label: 'Sewer lines', icon: 'sewer', text: 'When several drains back up together, the blockage is usually in the main line. We clean sewer lines too, and can put a camera down the pipe to see exactly what is in there.' },
      ],
    },
    why: [
      { icon: 'users', title: 'A professional team', text: 'Friendly plumbers with years of experience behind them. Every member of the team is licensed, bonded and insured.' },
      { icon: 'tag', title: 'Free estimates', text: 'A free, no-obligation estimate before work starts. For an emergency we can often estimate over the phone.' },
      { icon: 'camera', title: 'Camera inspection', text: 'When it is needed, a drain camera shows how serious the problem is and helps catch the next one early.' },
    ],
    process: [
      { title: 'Estimate', text: 'For non-emergency work we assess the job in full before we start, and you get the price up front.' },
      { title: 'Inspect', text: 'When it is needed we run a drain camera down the line to see the real problem.' },
      { title: 'Clean', text: 'We clear the blockage and get the drain flowing properly again.' },
      { title: 'Prevent', text: 'We point out anything likely to cause trouble later, before it costs you real money.' },
    ],
    faqs: [
      { q: 'Do you offer emergency drain cleaning?', a: 'Yes. Plumbing By Paul offers emergency after-hours service 24 hours a day, 7 days a week.' },
      { q: 'Do you provide free estimates?', a: 'Yes. For non-emergency drain cleaning, we provide a full assessment before starting work. Emergency estimates may be provided over the phone.' },
      { q: 'Can you clean sewer lines?', a: 'Yes. We handle sewer lines, floor drains, toilets, kitchen sinks, bathroom sinks, showers, and tubs.' },
      { q: 'Do you use drain camera inspections?', a: 'Yes. When needed, we use drain cameras to better understand the blockage and help prevent future issues.' },
      { q: 'What should I do about a clogged toilet or drain before you arrive?', a: 'A plunger is the safe first step. If that does not clear it, stop there and call us: we unclog it and make sure the same thing does not happen again any time soon.' },
    ],
    related: ['clogged-drain-repair-st-petersburg-fl', 'drain-camera-inspection-st-petersburg-fl', 'sewer-line-service-st-petersburg-fl'],
    ctaTitle: 'Drain backed up right now?',
  },
};

export const hasServicePage = (slug: string) => slug in SERVICE_CONTENT;

// Starter content for a service that has no full entry yet, built only from facts already in services.ts and site.ts.
// It keeps every service URL alive on the preview. Replace it by adding a real entry above (see AGENT-BRIEF.md).
import { SERVICES, FAMILIES, type Service } from './services';
import { PROCESS, FAQS } from './site';
export function contentFor(s: Service): ServiceContent {
  const full = SERVICE_CONTENT[s.slug];
  if (full) return full;
  const lower = s.name.charAt(0) === '2' ? 'emergency plumbing' : s.name.toLowerCase();
  return {
    basic: true,
    h1a: `${s.name} in`, h1b: 'St. Petersburg, FL',
    eyebrow: FAMILIES[s.family].name,
    lead: `${s.blurb} Family-owned Plumbing By Paul covers St. Petersburg and all of Pinellas County, 7 days a week, with a 24/7 emergency line.`,
    introTitle: ['Done right,', 'the first trip.'],
    intro: [
      `${s.blurb} We work on homes and businesses across Pinellas County.`,
      'Our services start with a free estimate, so you know the price before any work begins. The truck arrives prepared for the job: no second trips, no excuses.',
    ],
    includes: ['Free estimate before work starts', 'Open 7 days, 24/7 emergency line', 'Licensed, bonded and insured team', '1-year workmanship warranty'],
    why: [
      { icon: 'phone', title: 'Direct line to the owner', text: 'No middlemen and no phone trees. You get Paul\'s personal commitment to the job, start to finish.' },
      { icon: 'truck', title: 'Prepared for the job', text: 'We show up with the tools and parts loaded, every time, so the work gets done in one visit.' },
      { icon: 'shield', title: 'Backed for a year', text: `Our ${lower} work carries a 1-year workmanship warranty. If something goes wrong, we come back and fix it.` },
    ],
    process: [...PROCESS],
    faqs: FAQS.slice(0, 5).map((f) => ({ ...f })),
    related: SERVICES.filter((x) => x.family === s.family && x.slug !== s.slug).slice(0, 3).map((x) => x.slug),
    ctaTitle: 'Need it fixed today?',
  };
}

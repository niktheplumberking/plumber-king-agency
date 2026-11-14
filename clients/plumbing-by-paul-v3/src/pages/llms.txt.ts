// llms.txt: a plain summary for AI assistants, built from the same site facts as the pages (no extra claims).
import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { SERVICES } from '../data/services';
import { TOWNS_LINKED, TOWNS_ROUTE } from '../data/towns';
export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? 'https://plumbingbypaulllc.com/').replace(/\/$/, '');
  const a = SITE.address;
  const lines = [
    `# ${SITE.name}`,
    '',
    `> Family-owned plumbing company in St. Petersburg, Florida, serving Pinellas County since ${SITE.founded}. ${SITE.licenceLabel}, licence ${SITE.licence}.`,
    '',
    `- Phone: ${SITE.phone}`,
    `- Address: ${a.street}, ${a.city}, ${a.region} ${a.zip}`,
    `- Hours: ${SITE.hours.office}`,
    `- Google rating: ${SITE.rating.value} from ${SITE.rating.count} reviews (checked ${SITE.rating.checked})`,
    '',
    '## Services',
    ...SERVICES.map((s) => `- [${s.name}](${base}${s.href})`),
    '',
    '## Areas',
    ...TOWNS_LINKED.map((t) => `- [${t.name}](${base}${t.page})`),
    `- Also: ${TOWNS_ROUTE.map((t) => t.name).join(', ')}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

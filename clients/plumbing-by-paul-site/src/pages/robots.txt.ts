import type { APIRoute } from 'astro';
// No Disallow lines on purpose: /thank-you/, /privacy/ and /terms/ carry a noindex tag, and a crawler must be able to
// fetch a page to see that tag.
// Built from the site URL so the sitemap line follows the real domain at launch.
export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() ?? '').replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap-index.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

import type { APIRoute } from 'astro';
// Built from the site URL so the sitemap line follows the real domain at launch.
export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() ?? '').replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${base}/sitemap-index.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

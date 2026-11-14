// robots.txt: preview builds (PUBLIC_NOINDEX not "false") disallow everything; the launch build allows all + sitemap.
import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const noindex = String(import.meta.env.PUBLIC_NOINDEX ?? 'true').toLowerCase() !== 'false';
  const base = (site?.href ?? 'https://plumbingbypaulllc.com/').replace(/\/$/, '');
  const body = noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /thank-you\n\nSitemap: ${base}/sitemap-index.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

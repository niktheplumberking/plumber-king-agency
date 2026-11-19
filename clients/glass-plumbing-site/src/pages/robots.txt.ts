import type { APIRoute } from 'astro';
// Preview builds block crawlers (PUBLIC_NOINDEX unset or not "false"); the launch build allows all and lists the sitemap.
export const GET: APIRoute = ({ site }) => {
  const noindex = String(import.meta.env.PUBLIC_NOINDEX ?? 'true').toLowerCase() !== 'false';
  const body = noindex ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

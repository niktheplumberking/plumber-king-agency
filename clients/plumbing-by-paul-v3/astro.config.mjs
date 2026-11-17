// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL: the canonical origin. Canonicals always point at the live domain unless SITE_URL overrides it
// (Vercel previews keep the live canonical on purpose: previews are noindex).
const SITE = (process.env.SITE_URL || 'https://plumbingbypaulllc.com').replace(/\/$/, '');

export default defineConfig({
  site: SITE,
  // URLs have no trailing slash, matching the canonicals and Paul's current site paths.
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(thank-you|404)$/.test(page.replace(/\/$/, '')),
      // lastmod = the content date of this build: SITEMAP_LASTMOD (YYYY-MM-DD) when set, else the build day. At launch every
      // page is new, so the build day is true; later, set SITEMAP_LASTMOD only when page content really changed.
      lastmod: new Date(process.env.SITEMAP_LASTMOD || new Date().toISOString().slice(0, 10)),
    }),
  ],
  image: { responsiveStyles: false },
  vite: { build: { assetsInlineLimit: 2048 } },
});

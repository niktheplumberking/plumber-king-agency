import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// Preview URL until Paul's own domain is connected. At launch: PUBLIC_SITE_URL=https://<domain> PUBLIC_NOINDEX=false
const site = process.env.PUBLIC_SITE_URL || 'https://plumbing-by-paul.vercel.app';
export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always', format: 'directory' },
  integrations: [sitemap({ filter: (p) => !/\/(thank-you|privacy|terms|404)\/?$/.test(p) })],
  image: { responsiveStyles: false },
  compressHTML: true,
  // Every internal link must point at a built page: hovering a missing one logs a 404 in the console.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});

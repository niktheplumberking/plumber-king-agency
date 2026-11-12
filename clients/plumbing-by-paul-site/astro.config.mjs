import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// Preview URL until Paul's own domain is connected. At launch: PUBLIC_SITE_URL=https://<domain> PUBLIC_NOINDEX=false
const site = process.env.PUBLIC_SITE_URL || 'https://plumbing-by-paul.vercel.app';
export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always', format: 'directory' },
  integrations: [sitemap({ filter: (p) => !/\/thank-you\/|\/404/.test(p) })],
  image: { responsiveStyles: false },
  compressHTML: true,
  // prefetchAll is off while nav pages (/services/, /about/ ...) are still unbuilt: hovering them logged a 404.
  // Turn it back to true once every linked page exists.
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});

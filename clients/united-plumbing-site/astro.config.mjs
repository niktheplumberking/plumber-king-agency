import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
const site = process.env.PUBLIC_SITE_URL || 'https://united-plumbing-pomona.vercel.app';
export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always', format: 'directory' },
  integrations: [sitemap({ filter: (p) => !/\/thank-you\/|\/404/.test(p) && !(/\/plumber-[a-z-]+\/$/.test(p) && !/\/plumber-claremont\/$/.test(p)) })],
  image: { responsiveStyles: false },
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});

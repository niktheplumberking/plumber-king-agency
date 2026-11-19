// Khinda Electrical site. Static Astro build, trailing-slash URLs (BUILD-BRIEF section 2: /services/ ...).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://khinda-electrical-surrey.vercel.app',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  integrations: [sitemap({ filter: (p) => !/\/(thank-you|404)\/?$/.test(p) })],
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});

// Khinda Electrical site. Static Astro build, trailing-slash URLs (BUILD-BRIEF section 2: /services/ ...).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://khinda-electrical-surrey.vercel.app',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  // Town pages kept noindex after launch (review M7, src/data/towns.ts NOINDEX) stay out of the sitemap too.
  integrations: [sitemap({ filter: (p) => !/\/(thank-you|404|areas\/(fleetwood|guildford|cloverdale|south-surrey|city-centre))\/?$/.test(p) })],
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});

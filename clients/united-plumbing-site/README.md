# United Plumbing site (Jim Galvez, Pomona CA)

Astro 5 static site. Separate from the Plumber King Agency site in this repo; it is not built by the agency's Next.js app.

- Dev: `npm install && npx astro dev`
- Build: `npx astro build` (output in `dist/`)
- Preview deploy (Vercel project `united-plumbing-pomona`): copy `dist/` into a folder with the `vercel.json` below, then `vercel deploy --prod --yes`.

## Preview vs launch
The preview is kept out of Google on purpose:
1. `PUBLIC_NOINDEX` defaults to `true`, so every page has `noindex, nofollow`.
2. The preview `vercel.json` adds an `X-Robots-Tag: noindex` header.

At launch on Jim's own domain: build with `PUBLIC_SITE_URL=https://<domain> PUBLIC_NOINDEX=false`, and drop the X-Robots-Tag header.

## Town pages
Only towns listed in `INDEXED_TOWNS` (`src/pages/[...town].astro`) are indexed and in the sitemap (Claremont today). The other 26 are live for visitors but `noindex, follow` until they get real local content (Jim's jobs/photos in that town), to avoid doorway-page penalties. To promote a town: add its slug there and remove it from the sitemap filter in `astro.config.mjs`.

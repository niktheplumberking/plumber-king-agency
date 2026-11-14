# Building a page on the v3 foundation

Read first: `/mnt/project-files/plumber-king-agency/designs/plumbing-by-paul/BUILD-BRIEF.md` (the rules),
`PAGES.md` in `clients/plumbing-by-paul/plan/` (copy, section by section) and `MOTION.md` (the motion grammar).
Home (`src/pages/index.astro` + `src/components/home/`) is the worked example of everything below.

## 1. File map

```
astro.config.mjs        site URL from SITE_URL, sitemap (thank-you and 404 excluded), trailingSlash: never, build.format: file
vercel.json             cleanUrls, no trailing slash, 301 /home -> /, /team -> /about, noindex header on *.vercel.app
public/fonts/           Montserrat (variable, normal + italic), Russo One, Yellowtail: latin woff2, self-hosted
src/styles/tokens.css   @font-face, colours, fluid type scale, spacing, radii, shadows, eases, z-layers
src/styles/global.css   reset, .wrap, type classes, buttons, chips, cards, forms, frames, motion pre-states
src/layouts/Base.astro  the only layout: SEO head, JSON-LD, loader, curtain, header, footer, call bar, scripts
src/data/               site.ts (NAP and facts), nav.ts, services.ts, towns.ts, reviews.ts (word for word)
src/lib/schema.ts       JSON-LD builders: plumberSchema (site-wide, automatic), serviceSchema, articleSchema, contactPageSchema
src/lib/form.ts         PUBLIC_FORM_ENDPOINT and the /thank-you path
src/components/ui/      small parts (buttons, chips, seal, swoosh, review card, FAQ, breadcrumbs, quick answer, job ticket ...)
src/components/global/  site chrome and shared sections (header, menus, footer, town band, waterline CTA, estimate forms)
src/components/home/    Home sections only (copy them as a starting point, do not import them on other pages)
src/scripts/            motion.ts, ui.ts, forms.ts (loaded once by Base.astro; you never import them)
src/assets/photos/      real photos only, original names kept (from research/photos/best/)
src/assets/brand/       the real logo and the seal (mascot roundel) cut from it
scripts/check-links.mjs npm run check:links: every internal href in dist must resolve
```

## 2. A new page in six steps

1. **Route.** `src/pages/<url>.astro`. URLs come from the brief / PAGES.md (for example `water-heaters.astro`,
   `service-areas/clearwater-fl.astro`). No trailing slash anywhere, in links or canonicals.
2. **Layout.**
   ```astro
   ---
   import Base from '../layouts/Base.astro';
   import { serviceSchema } from '../lib/schema';
   ---
   <Base title="Water Heater Repair in St. Petersburg FL · Plumbing By Paul"
         description="(from PAGES.md, under 160 characters)"
         path="/water-heaters" og="service-tankless-water-heater-install" ogAlt="..."
         jsonld={[serviceSchema({ name: 'Water heater repair and installation', path: '/water-heaters', description: '...' })]}>
     ...sections...
     <WaterlineCTA />   <!-- last section of every page (variant="phone" where PAGES.md says phone-first) -->
   </Base>
   ```
   `title`, `description` and `path` are required. The site-wide Plumber JSON-LD is added for you; pass only
   page-level objects (Service, Article, ContactPage). `Faq` and `Breadcrumbs` emit their own JSON-LD.
   `noindex` forces noindex on one page (thank-you); `loader={false}` for 404 and thank-you.
3. **Sections.** `<section class="..." aria-labelledby="..." data-m-section>` with `<div class="wrap">` inside.
   First section: add `data-m-hero` and use one `<h1>` (`SectionHead level="h1"` or your own `h1.display`).
   Backgrounds alternate as PAGES.md lists them (`--white`, `--mist`, `--tint`, `--navy`, `--sky`).
   Navy sections get `class="on-navy"` so headings, leads and links switch colour.
4. **Headings.** `SectionHead eyebrow="..." l1="..." l2="..." lead="..."` (l2 is the blue second line;
   `script="word"` sets one word of l2 in Yellowtail; `inline` keeps both lines on one row on desktop;
   `size="h1|cta|sm"`, `center`, `dark`).
5. **Data, never typed twice.** Phone, licence, rating, hours, address: `SITE` from `src/data/site.ts`.
   Service names/URLs: `SERVICES`/`EMERGENCY`. Towns: `TOWNS_LINKED` (only these get links) and `TOWNS_ROUTE`
   (chips, never links). Reviews: `REVIEWS` (quotes are word for word, never edit them; `hl` marks phrases to
   underline, `fixedBy` the crew patches).
6. **Motion.** Tiers and effects only through attributes (`MOTION.md`).

## 3. Components you will reuse

| Component | Use |
|---|---|
| `Button` | `v="pri|sec|priN|secN|navy|white"`, `href` makes a link, `arrow`, `icon`, `block`, `h64` |
| `CallButton` | the two-line tel: button (`v="priN"` on navy/sky, `l1`, `l2`, `size="lg"`) |
| `TextLink` | underlined link with arrow; `lead="phone"` icon before, `icon={false}`, `external`, `dark` |
| `Img` | every photo: `name` (file name without .jpg), `alt`, `sizes`, `focus`, `widths`, `priority` (the LCP photo only). Size the parent, the image fills it |
| `Caption`, `PhotoTag` | white caption plate; navy tag on a photo |
| `Eyebrow`, `SectionHead`, `Tick` | the heading pattern and the stripe tick |
| `Chip`, `ProofChips`, `RatingPill`, `TownChip`, `Stars`, `GoogleG` | proof bits |
| `Seal`, `Stamp`, `Patch`, `Medal`, `ArrowDot` | stickers and accents (tier 5) |
| `Swoosh` | van-stripe edge between sections: `below` = next section colour, `above`, `flip`, `h`, `w` |
| `Underline`, `FlowLines`, `Water`, `Meter` | signature details (one or two per page) |
| `ReviewCard` | a review with marks, tags, patches (`v="white|navy|tint"`) |
| `Faq` | accordion + FAQPage JSON-LD for exactly those items (`items`, `group`) |
| `Breadcrumbs` | inner pages, with BreadcrumbList JSON-LD (`items=[{label, href}]`, `dark`) |
| `QuickAnswer`, `JobTicket` | service-page answer box and the job ticket (rows can be `standIn`) |
| `Section` | optional wrapper: `bg`, `pad`, `label` |
| `PinellasMap` | county map (`mini` for small) |
| `TownBand`, `WaterlineCTA`, `EstimateCard`, `EstimateBar` | shared sections and forms |

Icons: `Icon name="..."`, names in `src/components/ui/icons.ts` (Lucide paths from the Figma kit).

## 4. Pages linked from the header and footer that do not exist yet

`npm run check:links` lists them from the build. Today (26, plus `/thank-you`, the form target):

- Services: `/services`, `/water-heaters`, `/drain-cleaning`, `/clogged-drain`, `/drain-camera`, `/sewer-service`,
  `/leak-detection`, `/repiping`, `/toilet-repair`, `/garbage-disposal`, `/water-softeners`, `/gas-lines`,
  `/commercial-plumbing`, `/plumbing`, `/emergency-plumbing`
- Areas: `/service-areas`, `/service-areas/clearwater-fl`, `/service-areas/seminole-fl`
- Company: `/about`, `/our-work`, `/reviews`, `/contact`, `/guides`, `/faq`
- Legal and flow: `/privacy-policy`, `/terms-and-conditions`, `/thank-you`

## 5. Checklist before you hand a page back

- [ ] Copy is PAGES.md word for word; no invented facts, prices, numbers or quotes. Stand-ins are labelled as stand-ins.
- [ ] Reviews come from `REVIEWS` unchanged. Crew names only as they appear in reviews.
- [ ] Real photos only, and no photo twice on the page (a mobile-only duplicate with `alt=""` hidden on desktop is the one exception).
- [ ] Brand colours only: navy, blues, sky, soft, tint, mist, slate. No orange, red, coral or teal. Amber only for stars. Never white text on sky.
- [ ] One `h1`. Title and meta from PAGES.md. `path` correct (no trailing slash).
- [ ] `data-m-section` on every section, `data-m-hero` on the first; the biggest first-screen item is `frame` or `nudge`.
- [ ] `npm run build` clean; `npm run check:links` lists only pages still to be built.
- [ ] At 1440 and 390: matches the Figma frame, no horizontal scroll at 390, 44 px tap targets, console clean.
- [ ] axe: 0 violations (run with reduced motion so nothing is mid-animation).
- [ ] Reduced motion: the page is complete and static. Keyboard: skip link, menus, accordions, focus visible.
- [ ] Do not edit shared components for one page. If a shared component needs a change, say so in your hand-back.

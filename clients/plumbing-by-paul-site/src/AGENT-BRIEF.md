# Builder brief: Plumbing By Paul site

Read `../BRAND.md` first. This file tells you how to build more pages so they match the home page, the drain
cleaning page and the Clearwater page. Look at those three in a browser before you write anything.

## 1. Content rules (break one and the page fails)

1. Facts come only from `FACTS.md` / `site-facts.md` and the `source-site-text/` folder of the client project
   folder, and from `src/data/site.ts`. Never invent names, numbers, quotes, prices, awards or guarantees.
2. Reviews: only the 3 real Google quotes in `REVIEWS` (`site.ts`), word for word. Use `<ReviewsSection />`.
   The rating line is "4.9 · 941 Google reviews" (read 26 Oct 2026). Never "A+ rated".
3. No `aggregateRating` in schema. No `openingHours` in schema until Paul confirms hours.
4. `stock-*` photos illustrate a job type. Never caption them as Paul's work. Alt text describes what is shown.
5. Never the same photo twice on one page.
6. No em dashes in on-screen copy. Plain, short sentences. No hype.
7. One `<h1>` per page, with the keyword and the town in it.
8. Anything Paul has claimed but not proven goes on the "Paul to confirm" list at the bottom, not in a new claim.

## 2. Page skeleton

```astro
---
import Base from '../layouts/Base.astro';
import PageHero from '../components/PageHero.astro';
---
<Base title="Under 60 characters" description="140 to 160 characters"
      crumbs={[{ name: 'About', href: '/about/' }]} schema={[/* extra JSON-LD objects */]}>
  <PageHero crumbs={...} eyebrow="..." line1="..." line2="..." lead="..." image={img} alt="..." />
  ...sections...
  <ContactSection />   <!-- always last: holds id="estimate" -->
</Base>
```

`Base.astro` gives every page: canonical, Open Graph, Twitter card, the Plumber JSON-LD (`@id /#business`),
BreadcrumbList from `crumbs`, header, footer, mobile call bar, intro and the motion engine. Props:
`title, description, noindex, crumbs, schema, ogImage, ogAlt, bodyClass, estimateHref`.

All internal links end with a slash (`trailingSlash: 'always'`).

## 3. Components

| Component | What it is |
|---|---|
| `Btn` | Pill button. `variant` coral, ink, shell, outline-light, outline-dark. `size` sm or lg. `icon`, `arrow`, `sub`, `full`. One coral button per view. |
| `Eyebrow` | Small capitals line with the heart. Goes above every H2. |
| `Sunline` | The brand divider. `from` and `to` are the two background colours, `at` left, center or right. Use between a light and a dark section. |
| `PageHero` | Hero for inner pages: crumbs, H1 (`line1` + coral `line2`), lead, buttons, arch photo on the sun. Optional `chips`, `tagTitle`, `tagText`. |
| `Stars`, `GoogleG`, `RingBadge`, `Marquee`, `Icon`, `Logo`, `Crumbs` | Small parts. Icon names are in `Icon.astro`. |
| `sections/ReviewsSection` | Score plus the three real quotes. `bg` shell or sand. |
| `sections/ProcessSection` | Four steps with the travelling sun. Pass `steps` to override. |
| `sections/FaqSection` | Accordion plus FAQPage schema. Pass `faqs`. Only one FAQ section with `schema` per page. |
| `sections/AreasSection` + `AreaMap` | Real Pinellas map with town pins. `focus` = town slug to highlight. |
| `sections/EstimateForm` | `variant` card or bar. `preselect` = service name, `town` = town name. |
| `sections/ContactSection` | The coral ending with phone and form. |
| `sections/CtaBand` | Short mid-page call band. `title`, `text`. |
| `services/ServicePage`, `towns/TownPage` | Full templates driven by data. Do not copy them, feed them. |

Section rhythm: alternate light (shell, sand) and dark (deep). Each section has its own layout idea. Do not stack
three sections of identical cards. End every page with `ContactSection`.

## 4. Motion (attributes only, no new JS needed)

| Attribute | Effect |
|---|---|
| `data-reveal` = up, left, right, scale, fade, clip, clipx or pop (+ `data-delay="0.1"`) | Comes in on scroll |
| `data-stagger="up"` (or pop, left) on a parent | Children come in one after another |
| `data-split` on a heading | Lines rise from a mask |
| `data-parallax="0.15"` on an image inside an overflow-hidden frame | Slow drift on scroll |
| `data-count="941"` (+ `data-suffix`) | Number counts up |
| `data-draw` on an SVG path or line | Line draws itself |
| `data-sunrise` | Sun disc pops up once (used by Sunline) |
| `data-btn` | Magnetic pull (Btn adds it itself) |
| `data-tilt` | Slight card tilt on hover |
| `data-marquee` | Endless band |
| `data-tabs` / `data-tab` / `data-tab-pane` | Tabs |
| `data-swap` / `data-swap-item` / `data-swap-pane` | Hover list that swaps a picture |
| `details[data-acc]` inside `[data-acc-group]` | Accordion, one open at a time |
| `data-hero="<order>"` + `data-hero-fx` (lines, up, left, right, pop, scale, clip, fade) | Hero entrance, only inside a hero |

The full list is in the comment at the top of `src/scripts/motion.ts`.

Everything is visible without JavaScript and with reduced motion. Do not hide content with your own CSS and wait
for a script. Do not add a second animation library.

## 5. Adding a service page

All 13 services already have a URL (`src/pages/[service].astro`). Drain cleaning has full content. The other 12
show a starter page built from `services.ts` and are flagged `basic: true`, which keeps them `noindex`.

To finish one: add an entry to `SERVICE_CONTENT` in `src/data/service-content.ts` keyed by the slug, following
the `ServiceContent` type and the drain cleaning entry (H1 halves, lead, intro, includes, optional tabbed guide,
why, process, 5 to 7 FAQs, related slugs, CTA title). Add or check its photo in `src/data/images.ts`.
Write from the matching file in `source-site-text/`. Titles under 60 characters and metas of 140 to 160 live
in `services.ts` and are already written.

## 6. Adding a town page

Only Clearwater is built. A town page is generated only when its slug is in `BUILT_TOWNS` (`towns.ts`) **and** it
has an entry in `src/data/town-content.ts`. Until then the town shows as a plain chip, not a link.

A town page must have real local substance (neighbourhoods, ZIP codes, what is different about plumbing there,
distance from the shop via `milesFromShop`), or it is a doorway page and must not be built. Use public geography
only. Do not claim jobs, customers or reviews in a town unless the facts files say so. Do not swap the town name
into Clearwater's text.

## 7. SEO checklist per page

- Title under 60, meta 140 to 160, one H1, crumbs passed to `Base`.
- Images through `astro:assets` (`<Image>`). The first big image: `loading="eager" fetchpriority="high"`.
  Everything else lazy. Always width, height and real alt text.
- Service pages add `Service` schema, FAQ sections add `FAQPage`. Reference the business by `@id`, do not
  repeat NAP.
- NAP must match `SITE` in `site.ts` exactly, everywhere.
- Buttons and links at least 44 px tall. Text contrast from the table in `BRAND.md` only.

## 8. Pages still to build (linked in the nav, 404 today)

`/services/`, `/about/`, `/service-areas/`, `/reviews/`, `/contact/`, `/privacy/`, `/terms/`.
When they all exist, set `prefetchAll: true` again in `astro.config.mjs` (it is off so hovering a missing page
does not log a 404).

## 9. Verify before you say done

`npx astro build` with 0 errors. Then look at the page in a browser at 1440 and 390 wide, with motion and with
reduced motion: nothing hidden, no sideways scroll, console clean, axe 0 violations.

## 10. Paul to confirm (do not remove these flags yourself)

- Opening hours. The old site says different things in different places. The site says "Open 7 days · 24/7
  emergency" and schema has no hours.
- Licence number. Footer shows "Lic. # [Paul to confirm]". A truck photo shows a number ending C1430367.
- "Licensed, bonded and insured", "10+ years", "2,500+ customers", "1-year workmanship warranty",
  "free estimates, no hidden fees", "family owned", "direct line to the owner", "no second trips".
  All are from his old site and are shown as his claims.
- Alycia Hernandez's role and that her photo may be used. Crew first names appear only inside the review quotes.
- Google review count (941 on 26 Oct 2026): re-read on launch day.
- Map pin for the shop is approximate. Take the exact pin from the Google Business Profile.
- Clearwater neighbourhoods and ZIP codes are public geography: Paul should confirm he serves all of them.
- Mascot artwork: ownership, and a vector file if one exists.
- Form: no back end yet (`FORM_LIVE = false`). Needs a real endpoint and a test send before launch.

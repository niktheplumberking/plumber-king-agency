# Brief for page builders (United Plumbing site)

You are building pages of a real client website: United Plumbing, Jaime "Jim" Galvez, Pomona CA.
Owner of the agency (Nick) judges hard. The goal: match the approved Figma design one-to-one, with premium
motion, perfect on desktop (1440) and phone (375/390). It must look finished: a rival agency will inspect it.

## Project
- Astro 5 static site at `/home/user/united-plumbing-site`. Read these first (do not edit them):
  `src/layouts/Base.astro` (SEO head + JSON-LD + intro), `src/styles/global.css` (tokens, buttons, chips, forms, utilities),
  `src/scripts/motion.ts` (motion API in the header comment), `src/components/*.astro`, `src/components/sections/*.astro`,
  `src/pages/index.astro` (the finished homepage: copy its patterns, quality and section styling).
- Data: `src/data/site.ts`, `src/data/services.ts` (13 services, slugs, SEO titles/descriptions, families), `src/data/towns.ts` (27 towns).
- Images: `src/assets/img/` (real: jim-cutout.png, jim-van.jpg, job-*.jpg, logo-united.jpg, map-service-area.jpg, dusk-street.jpg (AI mood),
  night-pipes.jpg (AI mood); AI stand-ins: standin-*.{jpg,png} must always carry `<span class="standin">Stand-in photo</span>`).
  Always use `import { Image } from 'astro:assets'` with good `alt`, `widths` + `sizes`.
- **Do NOT edit shared files** (Base.astro, Header, Footer, global.css, motion.ts, components/*.astro, components/sections/*.astro,
  index.astro, data/*.ts). Other builders work in parallel. Put page-only styles in the page's `<style>`; put new reusable pieces
  in `src/components/<your-area>/`. If you truly need a shared change, describe it in your final report instead.
- Run your own dev server for checks: `cd /home/user/united-plumbing-site && npx astro dev --port <your port> --host 127.0.0.1`
  (in background). Never run `astro build` (it would clash with others) except at the very end with `--outDir /tmp/<you>-dist`
  if the CLI accepts it; if not, skip it.
- Screenshot with Playwright (preinstalled: `require('playwright')`, `chromium.launch()`), viewport 1440x900 and 390x844
  (isMobile, hasTouch), `reducedMotion: 'reduce'` for static checks, scroll the page through before a fullPage shot so lazy
  images load. Look at the shots in parts (crop with Python PIL) and compare with the Figma screenshots. Fix everything that
  differs: spacing, sizes, colours, alignment, clipped text, overlaps, broken mobile layout. Also check the browser console is clean.

## Design source (Figma)
- File key `QbPRX8MU5AA6peTerdP5gg`. You can call Figma tools: `create_session` (fileKey + short description) first, then
  `get_screenshot` (maxDimension up to 8000) or `get_design_context` on a frame/section id for exact sizes, colours and text.
  Load `skill://figma/figma-design-to-code/SKILL.md` via `get_figma_skill` before `get_design_context`. Read-only: never edit Figma.
- Desktop screenshots already cut into parts (1000 px wide, from the 1440 frames) are in
  `/tmp/claude-0/-home-user/cf29b17e-d3ee-5b4f-be9c-a5966b09f4a5/scratchpad/fig/` (`services-*.png`, `drain-*.png`, `wh-*.png`,
  `claremont-*.png`, `areas-*.png`, `about-*.png`, `work-*.png`, `reviews-*.png`, `contact-*.png`, `legal-*.png`, `thanks-*.png`).
- Frame ids (desktop / mobile): Services 305:437 / 312:703 · Drain cleaning template 316:987 / 322:437 · Water heaters 306:1039 / 316:437 ·
  Claremont town template 321:437 / 331:437 · Areas 337:437 / 339:437 · About 323:437 / 332:437 · Our work 315:437 / 318:437 ·
  Reviews 316:766 / 319:475 (quote wall section 343:441 / 344:441) · Contact 298:577 / 312:529 · Privacy & Terms 303:441 / 306:685 ·
  Thank you 293:437 / 301:437. Homepage (already built) 225:437 / 234:437.
- Yellow sticky notes in Figma are designer notes: do NOT put them on the site.
- The Figma pages end with blocks that the site already has as shared sections: use `ContactSection`, `Ticker` (cyan, second ticker),
  `AreasSection`, `FaqSection`, `ProcessSection`, `ReviewSlots`, `CallbackForm` (variant "card" or "bar"), `Wave` (between light and dark
  sections, `flip` alternates the curve). Header/footer come from Base.

## Copy (use it; shorten only when the design is shorter)
`/mnt/project-files/plumber-king-agency/designs/united-plumbing/site-copy/` (00-sitemap.md has every URL, SEO title and meta).
When Figma and the copy file differ, Figma wins for what is on screen; the copy file fills gaps (FAQ answers, page text).
Never write em dashes in on-screen copy. No AI-slop wording.

## Hard content rules (legal + Nick's rules)
- Never on screen: licensed, insured, bonded, certified, star ratings, review counts, prices, guarantees, warranties, awards.
- Reviews are never labelled Google. Instagram video reviews say "Video review · Instagram". Google review cards are placeholders.
- Do not invent facts, names, quotes, numbers. Where Figma shows `[CONFIRM]` or a missing fact, show a short visible placeholder
  styled with `<em class="ph">…</em>` only when the fact would otherwise be false; otherwise keep Jim's own claim text as in Figma
  (24/7, Hablamos Español, family owned since 2018, built by brothers, 1 hr arrival) and list it in your report as "Jim to confirm".
- Empty photo slots: `<div class="slot"><Icon name="instagram"/>Job photo from @plumblord1 goes here</div>`.
- Business name "United Plumbing" (never "Inc").

## Motion (premium, like two26.studio, already built: just use the attributes)
- Page hero: put `data-hero="1..n"` + `data-hero-fx` on hero elements in the order they should appear (H1 = `lines`, pills/chips =
  `pop` with `data-hero-children`, photos = `right`/`clip`, form card = `up`). This plays after the first-visit intro or right away.
- Below the hero: headings `data-split`, blocks `data-reveal="up|left|right|clip|clipx|pop|scale"`, lists/grids `data-stagger="up"`,
  photos inside an overflow-hidden frame `data-parallax="0.1"` (give the img ~115% height), counters `data-count`, cards `data-tilt`,
  all buttons via `<Btn>` (pointer-fill + magnetic). Hover states on every clickable card (lift, image zoom, arrow nudge).
- Everything must still look right with `reducedMotion: 'reduce'` (no motion, all visible).

## SEO (each page)
- `<Base title=… description=… crumbs=[{name, href}] schema=[…]>` using the exact title/meta from 00-sitemap.md / data files.
- One H1 per page with the main keyword (trade + town). Logical H2/H3. Descriptive alt text. Internal links: service pages link to
  related services + the 6 nearest towns; town pages link to the top services + neighbour towns; every page links to /contact/.
- Add page schema where it fits: `Service` (provider = {'@id': site + '/#business'}, areaServed), `FAQPage` when the page has an FAQ,
  `ContactPage`, `AboutPage`.
- Accessibility: WCAG 2.2 AA, 44 px targets, labelled form fields, visible focus, never black text on cobalt.

## Report back (short)
Pages + URLs built, what you checked (screenshots at 1440 and 390, console), every placeholder you used, anything not done, and
any shared-file change you need.

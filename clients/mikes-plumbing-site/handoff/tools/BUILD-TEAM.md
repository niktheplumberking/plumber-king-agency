# Builder brief: Mike's Plumbing site, 1:1 from the approved VFACT Figma

Site root: `/home/user/plumber-king-agency/clients/mikes-plumbing-site` (Astro 5, already scaffolded, `npm ci` done).
Nick approved the Figma as "literally perfect": the job is to reproduce it exactly, not to improve it. Several builders
work in this folder at the same time; stay inside the files you own.

## Read first (in this order)
1. `handoff/BUILD-BRIEF.md`: the rules (1:1 full grid, breakpoints, seams, motion, buttons, SEO, facts, QA). It wins.
2. `MOTION.md` sections 1b, 2, 4, 4b, 6 (the attribute API: `data-m-section`, `data-m-hero`, `data-t`, `data-fx`,
   `data-stagger`, `data-draw`, `data-pipe`, `data-route`, parallax). `src/scripts/motion.ts` and `ui.ts` are shared:
   use their attributes, never edit them (tell the lead if one needs a change).
3. `handoff/plan/PAGES-COPY.md` (your pages' sections, word for word) and `handoff/plan/DESIGN-SYSTEM-AND-HOME-SHEET.md`.
4. `handoff/figma-cache/INDEX-A.md`, `INDEX-B.md`, `IMAGE-HASHES.md`.

## The spec = the cache (NEVER call Figma tools)
For each of your frames: `handoff/figma-cache/<page>/<desktop|mobile>-<id>.png` (1x screenshot, full frame) and
`.json` (node tree: x/y relative to the parent, w/h, fills, strokes, radius, effects, text with every style run
(font family + style, size, line height, letter spacing, colour, case), `svg` = exact vector markup, `clipPath` for
image shapes, `img` = sha1 of the photo file -> `IMAGE-HASHES.md` gives the site asset). Use the numbers, never eyeball.
Slice the PNG with python PIL to look at one section at a time.
- Vectors: copy the `svg` strings into inline SVG or files in `src/assets/svg/<page>/` (strip width/height if you scale
  with CSS). Never redraw a shape by eye. Text inside the design stays real HTML text, never baked into SVG.
- Photos: `<Img name="<asset name without .jpg>" alt="what it shows + where" sizes=... />` from `src/components/ui/Img.astro`
  (`priority` only for the page's LCP photo). Photo shapes (chamfered hex frames) = `clip-path: path(...)` from `clipPath`
  or an SVG mask. Logos in `src/assets/brand/`.
- Map photo is OpenStreetMap: show "© OpenStreetMap contributors" small on it.

## If a JSON file is not there yet
The Figma call quota interrupted the tree dumps; one agent is still producing them in priority order and logs each finished
frame in `handoff/figma-cache/DUMPS-DONE.md`. Check that file before each section. Until your frame's JSON lands, build from
the 1x PNG (it is pixel-exact at 1x: measure x/y/size/colours with python PIL, e.g. column/row scans for edges and
sampling pixel colours) + PAGES-COPY.md + the tokens. When the JSON lands, re-check every built section against it
(font sizes, line heights, letter spacing, exact positions) and swap any traced shape for the exact `svg`.

## Layout rules (from BUILD-BRIEF section 2)
- Desktop CSS in Figma px at 1440: `.wrap` = content x 120 -> 1320 (`--gutter`). Full-bleed sections span the page.
  Base.astro zooms the whole page by width/1440 at >= 1280 px, so write desktop once in px.
- 768-1279 px: same desktop layout made fluid (grid/flex with fr and %, `--gutter` 48-80, clamp() type down to ~80%).
  Check 1024 and 820: nothing overflows, nothing overlaps.
- < 768 px: the 390 mobile frame 1:1 (mobile JSON numbers), fluid from 360 to 767. `--gutter` is 20 there; use the
  mobile frame's own x offsets if different.
- Seam pieces (wave seams, pipes, valve, drips, tags, bands, tickers that cross section boundaries): absolutely
  positioned layers (`.seam`) above both sections, exactly at the Figma y. Waves are the exact `svg` path.
- Use Figma's font sizes, line heights, letter spacing, weights, colours exactly. Fonts and colour tokens are in
  `src/styles/tokens.css` (`--f-display` Abril Fatface, `--f-label` Oswald, `--f-sans` Archivo, `--f-script` Yesteryear).
- No horizontal scroll at any width (`overflow-x: clip` on sections whose seams bleed past 1440).

## Function rules
- Phone: `SITE.tel`, text: `SITE.sms` (from `src/data/site.ts`). Never type the number by hand in markup.
- Forms: `<form data-estimate-form>` with `input[name=name]`, `input[name=phone]`, a `[data-form-msg]` live region
  (`role="status"`), labelled fields, chips as real checkboxes, optional `input[type=file][data-photo]`. `src/scripts/forms.ts`
  validates and goes to `/thank-you`. `submit` button type.
- FAQ: native `<details data-acc name="<group>">` (ui.ts animates it) + FAQPage JSON-LD for exactly the visible items.
- Breadcrumbs on inner pages: `src/components/ui/Breadcrumbs.astro` (restyle via its `class` prop if the frame differs).
- Links: every card/row that looks clickable is a real link with hover + focus states. Only link to pages that exist:
  `/`, `/services`, `/water-heaters`, `/drain-cleaning`, `/emergency-plumber`, `/service-areas`, `/plumber-<town>-ca`
  (towns in `src/data/towns.ts`), `/about`, `/our-work`, `/reviews`, `/contact`, `/faq`, `/privacy`, `/terms`.
  Yelp/Instagram: `SITE.social.*`, `target="_blank" rel="noopener"`.
- Reviews: only from `src/data/reviews.ts` (20, word for word), labelled Yelp. Never retype a quote.

## Facts (hard rules)
Never on screen: licence, insured, bonded, certified, warranty, guarantee, awards, prices, arrival/response times,
"years of experience", "24/7". "24 hours" only as "Open 24 hours (Yelp)" or next to "on Yelp". Allowed extras with a
source: email `SITE.email`, payments `SITE.payments` (Cash, Zelle, Cash App), `SITE.offer` ("15% off for new customers"),
"Open 7 days", the photo `mike-drain-camera-inspection-restaurant` (Mike at work, real). The mascot is captioned as his
3D mascot, never as Mike. Yellow "MIKE TO CONFIRM" notes in Figma are NOT site content: skip them, list them in your
hand-back. Copy = Figma text first (it is the approved final), PAGES-COPY.md where Figma is silent (SEO title/meta).

## SEO per page
`<Base title description path og ogAlt jsonld>`: title <= 60 chars and meta <= 155 from PAGES-COPY.md; one H1;
logical H2/H3; `og` = a real photo name; JSON-LD from `src/lib/schema.ts` (`serviceSchema` on service pages,
`contactPageSchema` on contact, AboutPage on about); alt text that says what and where; internal links with keyword
anchor text; quick-answer box (first 50 words answer the page's question) where the frame has one.

## Your loop (per section, never per page)
1. Build the section from the JSON numbers (desktop + mobile).
2. Run your own dev server on YOUR port (`npx astro dev --port <port> --host 127.0.0.1`, Bash `run_in_background`),
   screenshot with Playwright (`require('playwright')`, chromium.launch(), viewport 1440 and 390, deviceScaleFactor 1,
   `reducedMotion: 'reduce'` so everything is visible) and compare against the same slice of the Figma PNG side by side
   (python PIL: paste both into one image and look at it). Fix until type, positions, sizes and crops match within a
   few px. Then the next section.
3. When your pages are done: check 1920, 1280, 1024, 820, 360 for overflow/overlap (`document.documentElement.scrollWidth`
   must equal `clientWidth`), console errors = 0, and `npx astro check` / `npx astro build --outDir /tmp/<your-name>-dist`
   passes (never build into the shared `dist`).
Keep screenshots in your scratch folder, not in the repo. Do not git commit; the lead commits.

## Hand-back (your final message, short)
Pages done (route + frame ids), what still differs from Figma and why, every MIKE TO CONFIRM note you skipped, any change
you need in a shared file (with the exact diff), and anything you were unsure about (fact / inferring / don't know).

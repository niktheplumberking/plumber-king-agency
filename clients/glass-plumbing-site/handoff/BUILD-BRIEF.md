# Glass Plumbing Services: build brief (Figma cache -> live preview)

Prospect: Kody Glass, Glass Plumbing Services, Largo FL, (727) 512-0673, FL Certified Plumbing Contractor CFC1432488.
Spec = Figma page 506:437 ("Clear Water", round 7), read ONCE into `handoff/figma-cache/` by the extraction agent.
**Builders never call Figma.** Work only from the cache: `figma-cache/<slug>/*.json` (node tree with x/y/w/h, fills,
strokes, radius, effects, text + font + size + line height + tracking) and `figma-cache/<slug>/*.png` (1x frame screenshots),
plus `figma-cache/<slug>/NOTES.md` (the blue "INTERACTION (build note)" cards and the yellow "Kody to confirm" notes).
Photo map: `figma-cache/IMAGE-HASHES.md` (Figma image key -> `src/assets/photos/<name>.jpg`).
Quality bar: Mike's preview (branch `origin/claude/project-thread-59bfrz`, `clients/mikes-plumbing-site/`). Read his
components for HOW things are built (Btn, accordion, scrub, loader, curtain, motion attributes). Never copy his LOOK.

## 1. What is already set up (do not redo)
- Astro 5 + GSAP 3.13 (ScrollTrigger, SplitText, DrawSVG) + Lenis 1.3, sitemap, sharp. `npm ci` done.
- `src/layouts/Base.astro` (SEO head, JSON-LD, noindex switch, zoom >= 1280 = width/1440, motion pre-paint classes,
  loader/curtain/header/footer/call bar slots), `src/scripts/motion.ts` (Paul/United motion; attributes in `MOTION.md`),
  `ui.ts`, `forms.ts`, `src/components/kit/*` (Btn, Eyebrow, Logo, Curtain, accordion, scrub, settle, loader, curtain, idle),
  `src/components/ui/Img.astro` (AVIF+JPEG `<picture>`), `Icon.astro`, `Breadcrumbs.astro`.
- Tokens `src/styles/tokens.css`: colours `--ink --ink2 --ink3 --frost --frost2 --frost3 --powder --pdeep --red --cream
  --gold --steel --steel2 --muted --muted2 --white`; fonts `--f-h` Schibsted Grotesk, `--f-b` Public Sans, `--f-m` JetBrains Mono.
  Fonts self-hosted in `public/fonts/` (all weights). Page base is white; frost = alternate sections; ink = dark sections.
- Data: `src/data/site.ts` (facts), `reviews.ts` (16 reviews word for word), `towns.ts` (20 towns, straight-line miles).
- Logo `src/assets/brand/logo-glass.png` (transparent). Photos `src/assets/photos/` (23 + `map-pinellas.png`).
- Kit pieces still carry Mike's look (Btn, Eyebrow, Curtain, loader): restyle them to the Glass Figma, keep their API.

## 2. Routes (no trailing slash)
| Route | Figma desktop / mobile | Folder |
|---|---|---|
| `/` | 712:448 / 715:560 | home |
| `/services` | 718:522 / 718:1276 | services |
| `/services/water-heaters` | 719:437 / 720:566 | water-heaters |
| `/areas` | 721:525 / 722:445 | service-areas |
| `/areas/seminole` | 723:437 / 723:1034 | town-seminole |
| `/about` | 724:746 / 725:439 | about |
| `/contact` | 724:1091 / 725:701 | contact |
| `/reviews` | 727:437 / 729:539 | reviews |
| `/our-work` | 727:993 / 729:1033 | our-work |
| `/faq` | 730:437 / 730:766 | faq |
| `/thank-you` (noindex) | 731:437 / 731:637 | thank-you |
| `/privacy`, `/terms` | 743:492 / 743:658 (one legal template) | privacy |
Links to pages not built in this preview (other service pages, other towns): service rows -> `/services#<family>`,
towns -> `/areas#town-<slug>`. Every internal link must hit a built page (`npm run check:links` = 0 broken).

## 3. One-to-one, full grid
- At 1440: content x 120 -> 1320, full-bleed 1440, same sizes, line breaks, gaps, crops as the frame JSON. `.wrap` only.
- >= 1280 zoom (Base.astro). 768-1279: tablet pass of desktop (fluid gutter, check 1024 + 820). < 768: the 390 frames,
  fluid 360-767. No horizontal scroll.
- Drawn shapes (housings, spec plates, rivets, seams, wrench, glyphs, gauges, icons): use the SVGs the extractor exported
  into `figma-cache/<slug>/svg/`; never redraw by eye. Meniscus seams sit over the section join (absolute layer).
- Offset shadow = hard powder 10/10 (`box-shadow: 10px 10px 0 var(--powder)`), as in the frame JSON.

## 4. Motion (Nick asked: smooth scroll Lenis + GSAP, parallax)
Use `MOTION.md` attributes only: `data-m-section`, `data-m-hero`, `data-t` + `data-fx` (up/left/right/scale/fade/clip/pop/
lines/frame/nudge), `data-stagger`, groups G1/G2/G3, parallax on media wrappers (never on the `<img>`), scrub moments via
`data-scrub`. Lenis lerp 0.1. Reduced motion = static and complete; no JS = all visible.
Glass signature moments (one or two per page, from the INTERACTION notes): housings fill with water as they enter
(gauges count up), the offset shadow slides in from 0 to 10/10, spec plates' rivets pop, meniscus seams draw.
Interactive pieces from round 7 (see each NOTES.md): searchable FAQ with topic chips (home), 3-step job form with
live work-order plate (home), sticky stacking service cards (services; swipe carousel on mobile), bento promises, job
filter tabs on reviews, tabbed FAQ rail, auto-advancing reason list with pause (WH), tickable care tag (WH), FAQ with
cursor-follow photo preview (WH, desktop only), text-thread FAQ + live town checker (areas), flip cards (contact),
audience switch (contact), "Who picks up" switchboard (about), polaroid slot (our work), ask box (FAQ page).
Anything that moves on its own for more than 5 s gets a pause control.

## 5. Buttons, forms, links
- Call: `tel:+17275120673`. Text: `sms:+17275120673` (Kody to confirm texts). RED only on call buttons and "Call me back".
- Forms (`data-estimate-form`): labelled fields, chips/tiles = real radio/checkbox inputs, photo field; no endpoint ->
  `/thank-you`. Multi-step form: each step reachable by keyboard; Back works; the plate updates live.
- Instagram opens @glassplumbingservices; the two Google counts link to their profiles (site.ts). New tab.
- Licence CFC1432488 links to the DBPR lookup (site.ts). It appears in the header/utility bar and footer (FS 489.119).

## 6. SEO per page
- Titles/H1 from `/mnt/project-files/plumber-king-agency/clients/glass-plumbing/SEO-PLAN.md` table; H1 = the Figma H1 text.
  One H1. Meta description <= 155 chars from the page's own lead copy.
- JSON-LD: site-wide Plumber (Base). `Service` on /services/water-heaters, `FAQPage` where an FAQ is visible,
  `BreadcrumbList` on inner pages, `AboutPage`, `ContactPage`. No AggregateRating, no Review markup.
- Alt text = what the photo shows (+ town only if known). Photos lazy below the fold; hero `priority`.

## 7. Facts (never invent)
- Google: two profiles, 5.0 / 104 and 5.0 / 77, "read 17 Nov 2026". NEVER summed into one number.
- Reviews word for word from `reviews.ts`; names as written. No names on faces (we cannot tell Kody from Zak).
- Offer: "10% off for veterans, first responders, teachers & seniors (up to $100)". Never "15% off for a review", never "$1,340".
- No years in business, prices, response times, warranties. "24/7" only as the site/card says it.
- Yellow notes are never on the site: collect them in `README.md` "Kody to confirm".
- Never the same photo (or near-duplicate: water-heater-tank vs water-heater-tank-2) twice on one page.

## 8. Decisions taken (19 Nov, noted for Nick)
- Meniscus seams KEPT (Glass's own motif, not waves).
- Footer "Rather we call you?" call-back bar REMOVED on every page (it made three phone asks at each page end). The giant
  outlined number + red call circle stay.

## 9. Builder loop (per section)
1. Read the section's JSON + PNG crop + NOTES. 2. Build it. 3. Own dev port; Playwright at 1440 and 390 with
`reducedMotion: 'reduce'`, screenshot the section, compare side by side with the Figma crop; fix until within a few px.
4. Then check with motion on (nothing invisible in view, nothing flashing). Keep components in
`src/components/<page>/`. Never edit another builder's folder; shared changes go through the lead.

## 10. Shared contract (owned by the SHARED builder; page builders use it, never edit it)
- `src/components/kit/Btn.astro` props: `look`: 'call' (red fill, white text, wrench icon, default href tel:) | 'ink'
  (ink fill, white text) | 'line' (1.5 px ink outline) | 'light' (white fill on ink) | 'powder' (frost/powder variant as in
  Figma) ; `label`, `sub?` (second small mono line), `href?`, `icon?` (Icon.astro name), `size?` 'l' | 'm' | 's',
  `w?` (px width), `block?`, `class?`, `t?` (passes data-t/data-fx), `external?`. Always a real `<a>` (or `<button>` when
  `type` is given). Match the Figma button families exactly (sizes, radius, offset shadow where the frame has one).
- `src/components/kit/Eyebrow.astro`: mono caps label with the small housing tick. Props `text`, `tone` 'dark'|'light'|'pdeep',
  `t?`, `as?`.
- `src/components/kit/Housing.astro`: the rounded-top canister (cap band + water fill + optional photo/number window).
  Props `w`, `h`, `fill` (0-1), `tone`, slot. `data-fill` animates the water to `fill` on enter (motion.ts / small script).
- `src/components/kit/Plate.astro`: steel spec plate with 4 rivets and mono rows. Props `rows` [[k,v]], `title?`, `w?`.
- `src/components/kit/Seam.astro`: meniscus seam over a section join. Props `from`, `to` colours, `flip?`, `only?` 'd'|'m'.
- Two-tone heading: `<h2 class="h2">Line one <span class="tone">line two</span></h2>`; `.tone` = pdeep on light,
  powder on ink (`.on-ink .tone`). Type classes `.h1 .h2 .h3 .lead .mono` live in global.css (SHARED builder).
Page builders may need the contract before it is final: use it anyway; the SHARED builder lands it first.

## 11. Extraction findings and the call taken (lead, 19 Nov)
- Contact "We call you back" body text is "." in Figma -> use "Leave your name and number. We call you back on it." 
- Reviews "Review profile 1/2" labels -> "Google profile · 104 reviews" / "Google profile · 77 reviews" (links in site.ts).
- Contact mobile flip card 01 has no question -> use the desktop card 01 question.
- Privacy "Draft, 18 Nov 2026" stays (legal text is a draft for Kody). /terms = same template, terms copy adapted from
  Mike's `/terms` (generic, no invented promises), also marked draft.
- "floordrain" image = water heater with expansion tank (`water-heater-expansion-tank.jpg`); caption it that way.
- Our-work mobile "crew_crawl" = same image as desktop "wh_tank2": map by hash (IMAGE-HASHES.md), not by layer name.
- Mobile rows wider than 390 (carousels, photo rows, chip rows) = horizontal scrollers inside a clipped container
  (scroll-snap, no page overflow).
- Text exported as outline SVGs (Phone labels, "Checked"): build as real text. Outline-only numerals (footer phone, FAQ
  numbers) = real text with `-webkit-text-stroke` and transparent fill; footer phone fills red on hover.
- Icons missing from the export (rivets 715:887/889, services mobile carousel icons): reuse the same icon from another
  frame or the desktop twin.
- Copy differs desktop vs mobile (utility bar, footer bumper): follow each frame at its width.

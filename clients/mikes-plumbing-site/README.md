# Mike's Plumbing Services website

Astro 5 static site, built 1:1 from the approved VFACT Figma (file QbPRX8MU5AA6peTerdP5gg, page 626:1943; frame map
`handoff/FIGMA-FRAMES.md`). Spec and rules: `handoff/BUILD-BRIEF.md`. Motion: `MOTION.md` (entrances, United/Paul model)
plus the shared motion kit (`src/components/kit/`, API in its README: scrubbed moments, accordion, curtain, waves). Off-page plan: `SEO-OFFPAGE.md`.

```bash
npm ci               # node 22
npm run dev          # http://localhost:4321
npm run build        # static output in dist/
npm run check:links  # every internal link in dist must resolve
```

Preview (noindex): https://mikes-plumbing-riverside.vercel.app (Vercel project `mikes-plumbing-riverside`).
Deploy a preview: `npx vercel build --prod` then `npx vercel deploy --prebuilt --prod`.

## Environment variables

| Variable | Default | Meaning |
|---|---|---|
| `SITE_URL` | `https://mikes-plumbing-riverside.vercel.app` | canonical origin (set to the real domain at launch) |
| `PUBLIC_NOINDEX` | `true` | noindex + robots disallow unless exactly `false` (launch build only, Nick's go) |
| `PUBLIC_FORM_ENDPOINT` | empty | where the forms POST. Empty = preview: forms validate, then go to /thank-you and send nothing. **No backend is connected yet.** |
| `PUBLIC_GTM_ID` / `PUBLIC_GA_ID` | empty | analytics (none chosen yet; the privacy page must then list them) |

`*.vercel.app` also sends `X-Robots-Tag: noindex, nofollow`. Live hosting = Hostinger (or Mike's host) with `public/.htaccess`.

## Pages (21)
`/`, `/services`, `/water-heaters`, `/drain-cleaning`, `/emergency-plumber`, `/service-areas`, six town pages
`/plumber-{corona,moreno-valley,murrieta,buena-park,los-angeles,west-hollywood}-ca` (Riverside = home), `/about`,
`/our-work`, `/reviews`, `/contact`, `/faq`, `/privacy`, `/terms`, `/thank-you` (noindex), `/404`.

## Facts on the site and their sources
All in `src/data/site.ts` and `src/data/reviews.ts` (each line names its source). 20 Yelp reviews word for word (read
17 Nov 2026). Email (Nextdoor), payments Cash/Zelle/Cash App (Yelp), "15% off for new customers" (Nextdoor + his flyer),
"Open 7 days" (Yelp + Nextdoor), "Open 24 hours (Yelp)", photo of Mike on a drain camera job (his Instagram).
Never on the site until Mike confirms: licence, insured, warranty, prices, response times, years, "24/7".

## Mike to confirm (all must be closed before launch)
1. **CSLB licence number.** None found (Yelp: "License not provided"). If licensed, the number must show on the site and ads
   (B&P 7030.5). If not, jobs under $1,000 only and ads must say so (B&P 7027.2). Blocks launch.
2. **Real hours.** Yelp says open 24 hours, Nextdoor 7 AM-11 PM. Emergency / night / weekend hours.
3. **Texts on (951) 809-9533.** The "Text Mike a photo" buttons use `sms:`; confirm the number takes texts.
4. **A real photo of Mike** (face) and a family photo. Today: back view at the van, side view on a camera job, 3D mascot.
5. **Insured** (IG bio says "Insured"; no certificate seen). Off the site until confirmed.
6. **Towns he serves** (site uses his Yelp reviewers' towns + Riverside) and each town page's geography line.
7. **Town page wording** written from each town's Yelp review (headlines, checklist lines, FAQ Q3, "Same van, same plumber.").
8. **Where form leads go** (email / SMS / CRM) and the business email to show.
9. **Google Business Profile** (none found; #1 local factor, see SEO-OFFPAGE.md).
10. **Services:** pressure washing on a plumbing site? tank/tankless, gas/electric heaters, haul-away, permits, sewer camera,
    gas line work, "most asked" service.
11. **15% off terms** (who qualifies, any limits).
12. **Privacy and terms:** legal review, effective date, privacy request email, analytics/cookies used.
13. **Instagram clip file for the 'Around the house' phone** (we only embed the official post until he sends the file). Today we
    also lack the post's link, so the play button opens his Instagram; set `CLIP.file` (or `CLIP.post`) in
    `src/components/services/House.astro` when either arrives.
14. **Map:** OpenStreetMap image today; swap for a Google Maps screenshot if wanted.

## Fix round 1: where the site differs from Figma (builder S: site-wide items)
What Figma shows / what the site does now / why.

| Item | Figma shows | Site does now | Why |
|---|---|---|---|
| Loader (B3) | Seal, livery stripes and a water pipe on navy | Ink poster with a 000 -> 100 slat counter and 8 blinds that slide off | Nick's brief: 21st.dev Swiss Poster Counter Preloader, translated to Mike |
| Curtain (B2) | One panel with a wave edge | The loader's 8 blinds, alternating sides | Nick: curtain and loader are one family |
| Footer wordmark (B10/B31) | Home frame 595:438 has no legible giant "MIKE'S" at the cached render size | Abril "MIKE'S" in tan on coal, cut by the bottom edge, built from the brief's spec | Figma render not legible (cache: `handoff/figma-cache/footer-mikes/NOTE.md`) |
| Footer (B10/B23) | Two tones, less room above the wavy rule | One colour (#151410), 64 px / 40 px above the rule, Privacy · Terms right-aligned to x 1320 | Nick's brief |
| Services "Residential & commercial" (B7) | The photo stops above an ink wave | The photo runs up under an inverse tan wave filled above the curve, with an ink fade at the top | The photo and the wave now meet with no sliver |
| Wave clearance (B6) | Some objects sit on or near the wave lines | 24 px desktop / 16 px mobile from every wave: Services `#leaks` DM bubble section +32 px, Services hero +28 px (mobile frame lines moved), Home "What Mike fixes" band lowered 16 px (desktop) / 29 px (mobile), FAQ band tick moved 48 px, Diagnosis +6 px, Areas credit/board/ticket a few px, RootsProof Polaroid -40 px, our-work DM +14 px, smaller nudges on SAProof, Tickets, AQuote, FaqAsk, ConOther | `scripts/check-seams.mjs` (D2) |
| Named seam object: Contact form card (`form.ch-form`, /contact hero) | The estimate form card drawn across the hero's bottom seam, over the wave | Same: the card sits in front of the wave (z above it), the curve runs through it with 24 / 16 px clear above and below | Designed overlap (Figma); the card is the hero's main object. `check-seams` SEAM_CROSSERS (fix round 2, review 13) |
| Named seam object: About photo card (`figure.ah-card`, /about hero) | The tilted "On a commercial job" photo card drawn across the hero's seam | Same, in front of the wave; only its painted area counts (a tilted card's empty bounding-box corner is skipped) | Designed overlap (Figma). `check-seams` SEAM_CROSSERS |
| Named seam object: FAQ "Ask Mike" plate (`.fa-plate`, /faq) | The nameplate drawn over the tan / ink waves | Same, in front of the wave (crosses on phones; clears it at 1440) | Designed overlap (Figma). `check-seams` SEAM_CROSSERS |
| Seam check rules (fix round 2, reviews 4 + 13) | | `scripts/check-seams.mjs` exempts ONLY the three named cards above, and only when (a) the curve runs through them with full clearance on both sides and (b) they paint above the wave there (paint order read with `elementsFromPoint` at the curve points inside the card). Any other box the curve runs through (e.g. a strip behind the wave, as `.ft-torn` was at 390) is a hit, and a named card found behind the wave is a `crosser-behind` hit. `.fh-q` question marks stay seam objects | The old generic "crosses in front" pass also let a strip that sat behind the wave through |
| Marquees (B8) | Bands as static strips | Every band and the Services tape run on one GSAP engine (~40 s loop) | Nick's brief |
| Photos (B5) | Static | Cover photos drift inside their frames (scale 1.14, -5 % -> 5 %), headings +-10 px, columns +-16 px | United's parallax |
| `--tan-dark` | #6B5C3E | #5F5137 | 3.8:1 on tan; 4.5:1 now (axe) |
| Red small text | #D9412B on bone / paper / sand | `--red-text` #C33722 on bone / paper, `--red-deep` #992B1B on tan / sand | The brand red is 4.2:1 on bone; the nearest shade that passes AA |
| White on red (buttons, Process "Price" flag, Home "View" disc, estimate submit) | #D9412B fill, paper or pink second line | `--red-btn` #D53C26 fill, white text, second line at full opacity | White on #D9412B is 4.4:1 |
| Reviews red cards, red on ink | #D9412B | `--red-hi` #DC4A34, meta line #230C07 | Ink on #D9412B is 4.4:1 |
| Meta text on light (`--mute` #A79D88) | FAQ numbers, Home review counts, legal contents numbers, DM placeholder, Family swipe hint | `--mute-lt` #746A56 | #A79D88 is 2.3:1 on paper |
| Small greys | Final CTA "Customer copy" ink 50 %, contact caption 70 %, our-work edge text tan 45 % | 58 %, 80 %, 60 % | AA |
| Service areas map credit | Ink-2 text over the plate's shadow | Same text on a small paper chip | 1.5:1 over the shadow |
| Call buttons' accessible name | aria-label "Call (951) 809-9533, ..." | Visible text + a screen-reader-only "Call " | WCAG 2.5.3 (label in name) |

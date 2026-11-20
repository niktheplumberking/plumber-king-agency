# Component map, revision round 2 (each builder appends its own block)

## REVIEWS + CONTACT builder (20 Nov)
Layouts claimed (please do not reuse on other pages):
- /reviews hero: a hand-dealt STACK of real review slips (tap/drag/arrow to deal the next one to the back) beside two Google profile meters. Ref: 21st.dev Card Stack (manuarora700) + Hero Section with Cards (scrollxui).
- /reviews "What people mention": a RACK of six filter housings, water level = count/16; picking a housing filters the review slips below and sweeps a highlight over the exact words. Ref: 21st.dev Review Filter Bars (ruixen.ui) + Highlight Testimonial Section (dhxwhy).
- /reviews "All reviews": scroll-scrubbed three-column WALL (outer columns down, middle up). Ref: 21st.dev Testimonials Vertical Marquee (scrollxui) / Scroll Reel Testimonials (smammar).
- /contact hero: SWITCHBOARD: steel console with a display + five housing keys (Call, Text, Form, Email, Instagram), the picked key fills with water. Ref: 21st.dev Contact Card (aadixc0de) + Contact Cards (serafimcloud).
Home "why us" builder: the rack-of-housings filter and the slip stack are taken; please pick another idea.
Final (built, evidence in handoff/qa/r2/reviews-contact/):
| Page / section | Verdict | 21st.dev source | Adaptation |
|---|---|---|---|
| /reviews hero (RevHero) | REBUILD | @manuarora700/card-stack + @scrollxui/hero-with-cards | 5 real slips word for word, deal by button / arrow keys / drag; two steel Google meters (104, 77, never summed); crew photo behind; no crumbs |
| /reviews What people mention (RevMention) | REBUILD | @ruixen.ui/review-filter-bars + @dhxwhy/highlight-testimonial-section | 6 kit Housings on a steel shelf, fill = n/16, tablist filters verbatim sentences (build-time substring check), powder highlight sweep |
| /reviews All reviews (RevList) | REBUILD | @scrollxui/testimonials-with-verticalmarquee + @smammar/scroll-reel-testimonials | kit/scrub data-scrub-y: outer columns +320 px, middle -320 px over the pass; phones one column with CSS view() sideways drift; data-no-px |
| /reviews Owner + platforms (RevOwner) | REBUILD | magicui-style scroll text reveal + logo-cloud tags | Kody's IG line, words light up with scroll (kit scrub tw), seal over the quote mark, platform tags (IG verified 34/653, FB no link, Angi/Nextdoor/Yelp empty) |
| /reviews Leave a review (RevLeave) | REBUILD | @ham7a311/star-rate + @vovalopuh13/photo-review-form | two blank review slips (one per profile), empty stars fill gold one by one on hover/focus, CSS only |
| /contact hero + 5 ways (ConHero; ConWays deleted) | REBUILD | @aadixc0de/contact-card + @serafimcloud/contact-cards | steel switchboard: ink display + 5 housing keys (real links), hover/focus previews, copy number/email |
| /contact form (ConForm) | POLISH | (kept layout) | steps light up as the form fills (water to the top + READY tag + live status) |
| /contact shop + map (ConShop) | REBUILD | @Mazyar kawa/location-map + @dev.shejanmahamud/expanded-map | uncropped county map centred, plate bolted over its left edge, 24/7 card over the right, pin on Largo drops and rings 3x |
| /contact Other tasks (ConOther) | KEEP | - | - |
| /contact Contact questions (ConFaq) | KEEP + centred title | - | - |


## HOME builder (20 Nov)
Layouts claimed (please do not reuse): Home "Why us" = a proof BOARD (rating line, a TEST STRIP of six pads as tabs with
16-cell bars that fill on scroll, a ROLL of the 16 reviewers that lights who said it, verbatim slips with a powder waterline
drawn under the said words). Home "Process" = a PINNED stage: one pipe through five housings, each fills as the water
reaches it, the work-order panel swaps per step, housings are buttons that jump to their step.
| Section | Verdict | 21st.dev source | Adaptation |
|---|---|---|---|
| Hero | KEEP | - | three photo housings + plate + seal + proof row (stars, both profiles, licence): already proof and depth, parallax |
| Reviews (two profiles + call-back bar) | KEEP | - | housing gauges count up, slips swipe on phones, real form; proof with stars |
| Services | KEEP (links fixed) | - | six photo cards with spec plates, hover lift; links now /services (no #hash) |
| Crew | POLISH | - (own CSS 3D card flip) | business card: each face crops exactly one side of the stacked front/back photo (nothing clipped), tilted over the housing corner in its own place, tap/click flips (aria-pressed + live line); names are a kit accordion, each opens the verbatim review that names them |
| Real work | KEEP | - | four staggered real photos with spec plates; in-frame scroll drift; Instagram link |
| Why us | REBUILD | @uilayout.contact/advanced-stats (board) + @dhxwhy/highlight-testimonial-section (phrase emphasis, re-done as an underline, not the /reviews highlighter); shortlist also @uilayout.contact/stats-bold, @uilayout.contact/testimonial-1 | tablist (click, arrows, Home/End, mouse dwell), counts = recount of reviews.ts (5/2/6/4/6/2), every excerpt and mark checked at build time; kit scrub fills the bars; no-JS: all readings listed |
| Process | REBUILD | @hyperiux/timeline (pinned scroll timeline); shortlist also @manuarora700/timeline (scroll beam), @shadcnspace/stepper-03 (travelling dot) | sticky stage + kit scrub (pipe fill 0-0.8, housing i fills at 0.2 i, data-stop swaps panels); reviews word for word per step (Jen James, John Rooney, Parker L, Jacob Gars; step 4 a permits plate from the step copy); not pinned under reduced motion or short screens; ends ink, Emergency seam untouched |
| Emergency | KEEP (Nick) | - | untouched |
| Areas | POLISH | - | per-town distance line (miles / 15.3) draws in with the scroll, darkens on hover; town links now /areas or /areas/seminole |
| FAQ | KEEP (Nick) | - | faq.ts links /services#... -> /services |
| Estimate | KEEP (Nick) | - | untouched |
Evidence: handoff/qa/r2/home/ (before-* = live, after-* = local build reduced motion, after-process-pinned-* = motion on,
after-crew-flipped-*, after-why-tab-professional-*).

## ABOUT + AREAS + SEMINOLE (areas-about builder, 20 Nov) — evidence in handoff/qa/r2/about-areas/
| Page / section | Verdict | 21st.dev source | Adaptation |
|---|---|---|---|
| /about hero (AboutHero) | POLISH (Nick fix) | @skyleen77/flip-card | Photo ends on the grid edge, focus 52% 80% (face centred); business card = real two-sided card: each face a 1341:765 window on business-card.jpg (front y 30-795, back y 847-1612, x 22-1363), whole logo, tap flips to "Kody Glass, Owner"; overlaps photo corner; crumbs hidden |
| /about On the record (AboutRecord; replaces AboutStory + AboutNumbers) | REBUILD (Nick fix) | @educalvolpz/wallet-card + @shadcnstore/team-1 | Ink bento: licence wallet (steel licence card / DBPR record, tabs + tap swap, DBPR link), Instagram profile card (verified tick, 653 followers, 34 posts, read 17 Nov 2026, 3x2 crew job photos, opens profile), two Google tiles 104 / 77 (never summed, count-up) |
| /about Who is who (AboutCrew) | REBUILD | @vaib215/expanding-cards | Three steel plates, hover/focus/click opens one: word-for-word review naming that person; lying water tube fills to "named in X of 16" |
| /about How we work (AboutRules) | KEEP (Nick: "great job") | - | - |
| /about See it for yourself (AboutProof) | KEEP (Nick: "decent") | - | - |
| /about Giving back (AboutGiving) | REBUILD | @balick/segmented-control + @diarmuradi/pricing-5 | Centred; group picker (real radios, sliding pill) prints the "For" line on a steel work-order plate, 10 % stamp presses; licence plate moved to the record |
| /about Talk to a brother (AboutCall) | KEEP | - | Final CTA (allowed repeat), switchboard with Pause |
| /areas hero (AreasHero) | KEEP | - | Form + lying housing + plate; crumbs hidden |
| /areas One base + Towns (AreasBase; AreasTowns deleted) | REBUILD | @support_596fe4b8/interactive-globe-explorer | Uncropped portrait Pinellas map with 20 town dots on their screenshot labels + Largo pin; region filter (radios) dims; town index lights its pin on hover/focus/tap; #town-<slug> lights on arrival; Find-us plate over map corner |
| /areas As the crow flies (AreasDistance) | REBUILD | @halaska-studio/slider | One lying tube with a tick per town (towns.ts miles), range input runs the water; towns inside light up, count readout; auto-runs to 8 mi once on enter |
| /areas Local facts (AreasFacts) | KEEP | - | 2x2 grid with filling housings (scroll interaction), not left/right |
| /areas Reviews by town (AreasReviews) | POLISH | - | Centred head, two Google badges (104 / 77, separate links), pin chips, card hover lift, each card links its own profile |
| /areas Area questions (AreasFaq) | KEEP | - | Text-thread object with typing (FAQ sections praised) |
| /areas Town checker (AreasCheck) | KEEP | - | Live town checker = interaction |
| /areas/seminole hero, distance map, homes, family, emergency, FAQ, CTA form | KEEP | - | Objects + interaction already (plate overlap, route line, housings, outlined answers, form); crumbs hidden |
| /areas/seminole Six jobs (TownServices) | POLISH | - | Hash links -> /services (and /services/water-heaters) |
| /areas/seminole Neighbourhoods (TownHoods) | REBUILD | @cnippet-dev/scroll-velocity-text (opposing rows) | Two rows of steel/ink street plates sliding opposite ways with scroll position only (no pause needed), data-marquee; static wrap under reduced motion |
| /areas/seminole Permits (TownPermits) | REBUILD | @sean0205/c-questionnaire-2 | Centred; ink "permit finder": job + address-type radios print a steel permit slip (permit needed, who issues, Glass files) with stamp |
| /areas/seminole Nearby (TownNearby) | POLISH | - | Hash links -> /areas |

## SERVICES + WATER HEATERS + OUR WORK + FAQ + THANK-YOU (services-work-faq builder, 20 Nov) — evidence in handoff/qa/r2/services-work-faq/
Breadcrumbs: JSON-LD only on all five pages (services/Crumbs.astro = BreadcrumbList script; OwHero/FaqHero use crumbsLd), hero top spacing reset.
| Page / section | Verdict | 21st.dev source | Adaptation |
|---|---|---|---|
| /services hero (SvHero) | POLISH | - | Crumbs gone, spacing fixed, family chips 44 px |
| /services Symptoms (SvSymptoms) | POLISH | - | Centred head; housing water rises on card hover/focus; Call/Text links 44 px |
| /services Families (SvFamilies) | KEEP | - | - |
| /services Full list (SvFullList) | REBUILD | @hyperiux interactive-list-preview (26256) + @ddoemonn segmented-control (23552) | "Parts catalogue": family switch (aria-pressed, sliding pill) marks matching rows, two-column job list with a gliding frost bar and a pointer-following steel spec tag; no-JS = plain list with covers lines |
| /services Promises (SvPromises) | POLISH | - | Centred head, links 44 px |
| /services Reviews (SvReviews) | POLISH | - | Centred head + two Google profile pills (104 / 77, separate links), tabs 44 px |
| /services FAQ (SvFaq) | KEEP | - | Chip 44 px |
| /services CTA (SvCta) | POLISH | - | Phone mock: photo, then text bubble, then "Example" arrive in sequence on enter |
| /water-heaters hero (WhHero) | POLISH | - | Crumbs gone, spacing fixed |
| /water-heaters Quick answer (WhQuick) | REBUILD | @ddoemonn segmented-control (23552) + @dhxwhy two-plan-diff (37513) | "Repair or replace": one radio switch over an SVG tank (dry / leaking: water drains, crack, puddle) flips REPAIR vs REPLACE verdict cards; job-facts plate pinned |
| /water-heaters Problems (WhProblems) | KEEP | - | Links 44 px |
| /water-heaters DIY (WhDiy) | REBUILD | @aloksivastava1025 stacked-deck-scroll-reveal (45444) | "Licence line": scroll turns a valve on a pipe between "You can" rows and a pdeep-filled "Needs a licensed plumber + permit" block; stamp lands at the end |
| /water-heaters Process (WhProcess) | KEEP | - | - |
| /water-heaters Types (WhTypes) | REBUILD | @rmahammad compare-reveal (23419) + @diceui compare-slider (20283) | Tank vs tankless photo compare slider; housing-shaped role=slider handle (drag, arrows, Home/End), scroll intro sweep until touched |
| /water-heaters Pricing (WhPricing) | REBUILD | @cnippet-dev plan-add-on-selector (24942) | Steel switch panel: six price factors as toggle switches; a housing gauge fills to "N of 6 apply"; call button. (Not a slip printer: About Giving owns that.) |
| /water-heaters Reviews (WhReviews) | POLISH | - | Google record pills; two tilted review slips drift with scroll, straighten on hover |
| /water-heaters Why (WhWhy) | KEEP | - | Business card cropped to the front face only (lead note) |
| /water-heaters Care, FAQ, CTA | KEEP | - | - |
| /water-heaters Related (WhRelated) | REBUILD | @youcefbnm reveal-on-hover (1816) | "Manifold": supply pipe fills with scroll, valve drops into three cards; hover/focus turns the valve and floods the card; links -> /services |
| /our-work hero (OwHero) | POLISH | - | Crumbs import removed, spacing fixed |
| /our-work Gallery (OwGallery) | KEEP | - | - |
| /our-work Stories (OwStories) | REBUILD | @hyperiux cards-rotate-slider (27161) | "Job reel": pinned horizontal track (1024+, motion) with 3D card tilt, pipe progress + 01/03 counter; fallback = focusable scroll-snap row |
| /our-work Feed (OwFeed) | REBUILD | @isaiahbjork profile-hover-card (29440) + @ncdai glow-card-grid (25283) | Instagram profile plate (logo ring, handle + tick, 34 posts / 653 followers counting up, Follow button) + 2x2 photo grid with pointer glow and captions |
| /our-work Quotes (OwQuotes) | REBUILD | @solaceui testimonial-section-4 (19874) + @anurag-mishra22 testimonial (32) | Three-slip carousel on ink: big centre slip, tilted side slips; arrows, keys, click, swipe, dots, aria-live; no autoplay; Google record pills |
| /our-work CTA (OwCta) | KEEP | - | - |
| /faq hero (FaqHero) | POLISH | - | Crumbs import removed, spacing fixed |
| /faq List (FaqList) | KEEP (Nick: keep the idea) | - | - |
| /faq Healthy (FaqHealthy) | REBUILD | @educalvolpz hover-expand (28111) + collapsing-cards-accordion (45440) | Three vertical columns; hover/focus/click opens one (title rotates upright, glyph draws, question + call); phones stack |
| /faq Ask (FaqAsk) | POLISH | - | Centred head; live SMS bubble mirrors the typed question |
| /thank-you | POLISH | - | Centred heads, housings lift and fill, IG panel with counts + read date, photo hover |
Layouts claimed: parts catalogue list with gliding bar, repair/replace verdict switch, licence line valve, photo compare slider,
factor switch panel with gauge, manifold cards, pinned horizontal job reel, IG profile plate, three-slip centre carousel, vertical hover-expand columns.

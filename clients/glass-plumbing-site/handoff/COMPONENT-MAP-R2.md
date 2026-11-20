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
| /reviews All reviews (RevList) | REBUILD (+ fix A) | @scrollxui/testimonials-with-verticalmarquee + @smammar/scroll-reel-testimonials | kit/scrub data-scrub-y; fix A: travel left +560 / middle -620 / right +440 px; outer columns = paper slips (powder band, perforation, powder offset, tilt), middle = steel plates with rivets (ink offset); gold stars, Google "G" profile mark + name on every card; phones one column with CSS view() sideways drift; data-no-px |
| /reviews Owner + platforms (RevOwner) | REBUILD (+ fix A) | magicui-style scroll text reveal + logo-cloud tags | Kody's IG line, words light up with scroll (kit scrub tw), seal over the quote mark; fix A: only real linked platforms: IG (verified 34/653) + Google profile 1 (5.0 · 104) + Google profile 2 (5.0 · 77), placeholders removed |
| /reviews Leave a review (RevLeave) | REBUILD | @ham7a311/star-rate + @vovalopuh13/photo-review-form | two blank review slips (one per profile), empty stars fill gold one by one on hover/focus, CSS only |
| /contact hero + 5 ways (ConHero; ConWays deleted) | REBUILD | @aadixc0de/contact-card + @serafimcloud/contact-cards | steel switchboard: ink display + 5 housing keys (real links), hover/focus previews, copy number/email |
| /contact form (ConForm) | POLISH | (kept layout) | steps light up as the form fills (water to the top + READY tag + live status) |
| /contact shop + map (ConShop) | REBUILD | @Mazyar kawa/location-map + @dev.shejanmahamud/expanded-map | uncropped county map centred, plate bolted over its left edge, 24/7 card over the right, pin on Largo drops and rings 3x |
| /contact Other tasks (ConOther) | KEEP | - | - |
| /contact Contact questions (ConFaq) | KEEP + centred title | - | - |


## HOME builder (20 Nov)
Layouts claimed (please do not reuse): Home "Why us" = THE FRIDGE DOOR (fix round A, replaces the test-strip board that
repeated /reviews "What people mention"). Home "Areas" = a SPLIT-FLAP DISPATCH BOARD (fix round A, replaces map + plate).
Home "Process" = a PINNED stage: one pipe through five housings, each fills as the water
reaches it, the work-order panel swaps per step, housings are buttons that jump to their step.
| Section | Verdict | 21st.dev source | Adaptation |
|---|---|---|---|
| Hero | KEEP | - | three photo housings + plate + seal + proof row (stars, both profiles, licence): already proof and depth, parallax |
| Reviews (two profiles + call-back bar) | KEEP | - | housing gauges count up, slips swipe on phones, real form; proof with stars |
| Services | KEEP (links fixed) | - | six photo cards with spec plates, hover lift; links now /services (no #hash) |
| Crew | POLISH (fix A) | - (own CSS 3D card flip) | business card: each face crops exactly one side of the stacked front/back photo (nothing clipped), tilted over the housing corner, tap/click flips; names are a kit accordion, each opens the verbatim review that names them. Fix A: housing photo is now the Glass van (no face under the "Kody Glass, OWNER" card; crawl-space photo moved to the home FAQ emergency row); "Named in N of 16" tallies removed |
| Real work | KEEP | - | four staggered real photos with spec plates; in-frame scroll drift; Instagram link |
| Why us | REBUILD (fix A) | @manuarora700/draggable-card (id 3107) + @minhxthanh/drag-cards (id 4311, scatter/tidy); shortlist also @laziekiki/draggable-photo-stack (27354) | "The number on the fridge": brushed-steel fridge door (rivets, handle, powder offset) holding 6 verbatim repeat-customer review notes (David Peek, Jen James, Peter Van Buskirk, Parker L, John Rooney, Eduardo; quote() build check), 2 job prints (kitchen-faucet-2, water-heater-tank-2) and the phone number plate, each on a powder magnet. Drag (mouse/pen anywhere, touch by the magnet), arrow keys move a focused note, picked note comes front and straightens, "Straighten up" / "Scatter again" toggle (aria-pressed); snap-on entrance armed by the script (no-JS never hidden); both Google profiles shown separately with stars. No tallies, no tabs |
| Process | REBUILD (+ fix A) | @hyperiux/timeline (pinned scroll timeline); shortlist also @manuarora700/timeline (scroll beam), @shadcnspace/stepper-03 (travelling dot) | sticky stage + kit scrub (pipe fill 0-0.8, housing i fills at 0.2 i, data-stop swaps panels); reviews word for word per step (Jen James, John Rooney, Parker L, Jacob Gars; step 4 a permits plate from the step copy); not pinned under reduced motion or short screens; ends ink, Emergency seam untouched. Fix A: step 4 hedged ("usually"; Largo and Clearwater issue their own, the county covers unincorporated Pinellas; plate "Issued by: Your city or county"); panel swap sequenced (old out 0.25 s, new in from 0.28 s: never two legible) |
| Emergency | KEEP (Nick) | - | untouched |
| Areas | REBUILD (fix A) | @harshjadhavconnect/split-flap-display (19241) + @manuarora700/text-flipping-board (18574); shortlist also @ridemountainpig/departures-board (29827) | "Leaving Largo for": ink split-flap board in a steel frame, rows = town + straight-line miles (towns.ts, nearest first) + Seminole page link; four region keys (real radios: Central 7 / North 5 / South 2 / Beaches 6) flip the board letter by letter; flips in once on first view (no loop); base plate bolted over the frame corner; "Every town on the map" -> /areas (the map lives there only). No-JS: radios switch via CSS :has; reduced motion: instant |
| FAQ | KEEP (Nick) | - | faq.ts links /services#... -> /services. Fix A: emergency row photo van-night -> crew-crawlspace (no name in that answer) so the van can carry Crew |
| Estimate | KEEP (Nick) | - | untouched |
Fix round A evidence: handoff/qa/r2/fixA/ (home-whyus-*, home-areas-*, home-crew-*, home-process-*, reviews-wall-*, reviews-platforms-*).
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

## FIX ROUND C (services / water heaters / our work / faq / contact / thank-you, 20 Nov) — evidence in handoff/qa/r2/fixC/
Source: handoff/qa/r2/independent/REVIEW.md + REVISION-R2 "Fix round". Layouts claimed (do not reuse): Largo street day/night
scene with a when-switch, film-rail contact sheet hero, print tray with photo picker, practice bench with three part bays,
search sight-glass with topic tubes, label viewfinder with a shutter scan, under-sink cabinet with part tags.
| Page / section | Verdict | 21st.dev source | Adaptation |
|---|---|---|---|
| /contact Largo base (ConShop) | REBUILD (map repeat; /areas owns the map) | @dhxwhy/sun-moon-theme-toggle (36079) + @ravikatiyar162/sky-toggle (5254) | "Any hour, same number": 4-way when-switch (radios, CSS :has without JS) re-lights a drawn Largo street (sky, sun/moon, stars, lit windows, van headlights); starts on the real Largo time; ink answer card bolted over the scene corner; steel base rail with 44 px links (tel link 118x44, was 108x20) |
| /our-work hero (OwHero) | REBUILD (plain, rule 11) | @crafterui/hero-carousel (24752) + @ibrandify/thumbnail-image-viewer (37501) | Film rail contact sheet: picked frame unrolls to full size, others half height; click / arrows / Home / End / swipe; tone glow behind; steel tag; "34 posts on Instagram · read 17 Nov 2026" from SITE.social.instagramStats; no autoplay |
| /our-work CTA (OwCta) | REBUILD (text left / polaroid right) | @abushaidislam7/photo-box (46671) + @uilayout.contact/imgpreview-dropzone (18045) | Centred print tray: crew polaroid + an empty frame that is a real file picker; the picked photo develops in the frame (local object URL, nothing uploaded) and the Text button lights; "we post the finished job" promise removed |
| /our-work Feed (OwFeed) | POLISH | - | IG counts no longer count up through wrong values (static 34 / 653, read date kept) |
| /water-heaters Care (WhCare) | REBUILD (slop) | @starc007/hold-action-button (29383) + @aadilghani1/stamping-press (43184) | Practice bench: three bays with the real part (drain valve + hose turning clear, relief lever + puff, cold shut-off quarter turn); the button fills like a housing, a Done stamp with today's date, pipe tally "n of 3 done this year" (localStorage, try/catch) |
| /water-heaters CTA (WhCta) | REBUILD (text left / plate right) | @aadilghani1/stamping-press (43184) + @ibrandify/thumbnail-image-viewer tags (37501) | Label viewfinder, centred: rating plate in camera brackets; shutter runs a scan line, fields tick "Found", frame flashes, Text button lights; hover/focus a field explains it |
| /water-heaters Types (WhTypes) | FIX (crop) | - | Tank layer photo scaled 152 % (168 % phones) and shifted so the tank (54 % across the photo) sits mid tank-half; top of tank + labels in view |
| /faq hero (FaqHero) | REBUILD (text left / tiles right) | @cnippet-dev/v-accordion-11 (24932) + @felipemenezes098/hero-09 (19080) | Centred search sight-glass: water rises with matches, result tray (combobox/listbox, arrows/Enter/Esc) opens the answer below (FaqList rows now have ids q-<group>-<n>); try-chips; five topic tubes filled to each group's share |
| /water-heaters Hero, Quick, Pricing, Process, Problems, DIY, Why; FAQ data (wh, services, /faq, /contact) | FACTS | - | Permit claims hedged per LOCAL-FACTS 3 (county express permits for unincorporated Pinellas; Clearwater online; Largo/other cities: check with the city); "we file/pull it", "we haul the old one", price-first promises removed (Parker L's review line used instead, word for word); price factors and diagnoses hedged ("usually", no numbers) |
| /services Promises (SvPromises) | FACTS | - | "Five things you can check"; card 02 now Parker L's estimate line (was the unconfirmed price-first promise) |
| /services CTA (SvCta) | REBUILD (text left / phone mock right) | @hello_54e122be/hairline-exploded (36593) + @adrielzimbril/doodle-callout (32677) | "Tag the part", centred: drawn under-sink cabinet (shut-off valves, supply lines, disposal, P-trap, drain arm); pick a part (chips or its pulsing ring; radios + CSS :has, works with no JS, arrows native): it lights, the rest dim, a string draws down to a steel tag with its name, what it does, how to photograph it and an example text; buttons centred under the tag; "We'll tell you what it is" promise dropped |
| WH Why, WH FAQ, Services Families/Full list/Reviews/FAQ, FAQ List/Healthy/Ask, Contact Hero/Form/Other/FAQ, thank-you | KEEP (re-audited) | - | Not text-only; each has its interaction (tabs, accordion with preview, live steps, flip cards, phone sequence) |

## FIX ROUND B: ABOUT + AREAS + SEMINOLE (fixer B, 20 Nov) — evidence in handoff/qa/r2/fixB/
Supersedes the areas-about rows above where they differ. Layouts claimed (please do not reuse): Seminole local-facts
CLIPBOARD with divider tabs + per-tab instrument; PARTS CABINET of pull-out drawers; scattered JOB BOARD around a centred
review slip; DROP-IN-STILL-WATER POND with mileage ripples and a fill meniscus (Seminole nearby); PRACTICE PIPE with a ball-valve lever; /areas phone thread with ASK chips;
/areas COVERAGE TICKET console.
| Page / section | Verdict | 21st.dev source | Adaptation |
|---|---|---|---|
| /about hero (AboutHero) | FIX (blocker) | (kept) @skyleen77/flip-card | H1 "Meet the crew behind the van." (no "Glass Brothers" beside one face); lead "contractor and his crew"; business card moved beside the call button, never on the photo |
| /about Who is who (AboutCrew) | FIX | (kept) @vaib215/expanding-cards | Head "The names in the reviews."; Zak "On the crew / Named next to Kody in reviews" (no unsourced role); phones: each plate is a disclosure, tap toggles open/closed, aria-expanded follows, grid-rows height tween; closed quotes visibility:hidden |
| /about Call (AboutCall), Rules (AboutRules), Proof (AboutProof) | FACT/SRC FIX | - | "Talk to the crew." (not "a Glass brother"); rule "Fair prices" (no unconfirmed "before work"); reel frame overflow:clip (360 px overflow) |
| /areas/seminole hero (TownHero) | SRC FIX | - | media overflow:clip (drift-scaled img made scrollWidth 385 at 360) |
| /areas/seminole Local facts (TownFacts; replaces TownDistance map+plate and TownProblems cards) | REBUILD | @wensity/animated-tabs (27845) + @shadcn/tabs (1589) | Ink clipboard, steel clip, white sheet, 4 divider tabs (ARIA tablist, arrows/Home/End): 01 distance (route drawn + odometer 0→5.9), 02 PCU 217 ppm on the USGS scale (county utility, not claimed for Seminole), 03 hurricane season month strip, 04 polybutylene 1978-1995 (labelled third-party, hedged). "1970s and 80s homes" and "Seminole is on Pinellas County water" removed |
| /areas/seminole Permits (TownPermits) | FIX (blocker) | (kept) @sean0205/c-questionnaire-2 | City of Seminole → "ask the city's building department, we don't have its wording; Glass can tell you on the call"; unincorporated → "Likely: the county lists an Express Permit '<exact name>'", county office + phone; not sure → both. No "we file it" |
| /areas/seminole Six jobs (TownServices) | REBUILD | @hello_54e122be/hairline-drawer (36592) + @hyperiux/interactive-list-preview (26256) | Steel parts cabinet, 6 drawers; hover/focus pulls the drawer and his own job photo rises out with caption; phones photo in the drawer window |
| /areas/seminole Reviews (TownReview; TownFamily merged + deleted) | REBUILD | @sajad/scattered-about (46741) | Centred Cody Weaver slip, David Peek's "The Glass brothers…" only as his quote on a cream note, 4 photos pinned around drifting via kit scrub data-scrub-y (display:contents on phones, so a swipe strip), Google pills 104 / 77 separate |
| /areas/seminole Nearby (TownNearby) | REBUILD (3rd pass: split-flap = Home Areas, tear-off flyer = Mike's TearOff) | @felix-au/ripple-wave-cursor (46137) + @ruixen.ui/ripple-circles (8290) | Clear Water motif: top-down still-water pond, Largo base = the drop; dashed ripple rings at 2/4/6/8/10 straight-line mi; 6 town chips sit on their ring (miles from towns.ts, directions not to scale, said in the foot line); the water fill with a white meniscus edge grows to the hovered/focused town's ring and a steel spec plate reads Town / From base / Covered; Seminole = 'you are here', resting state; 3 ripples run once on enter (2.4 s one-shot, none under reduced motion); links to /areas. Checked: no ripple/pond in Mike's ls-tree (origin/claude/project-thread-59bfrz) or elsewhere in this map |
| /areas/seminole Emergency (TownEmergency) | REBUILD | @theutkarshmail/lever-switch (5210) + @daiwiikharihar/industrial-switch (24092) | Practice pipe: ball-valve lever = button (aria-pressed), quarter turn across the pipe stops the spray (4 x 1.1 s max), line drains, step 2 + call lights |
| /areas/seminole FAQ (TownFaq) | FACT FIX | - | Permit + water answers hedged (data.ts) |
| /areas Area questions (AreasFaq) | REBUILD | @elements-/suggested-actions (20074) + @support_596fe4b8/suggestions (26546) | Centred phone thread + ASK chips (tap → question, typing dots, answer); trip-fee Q replaced by commercial/residential (site.ts) |
| /areas Town checker (AreasCheck) | REBUILD | @educalvolpz/rolling-text (28108) + original combobox | Centred console: combobox, Try chips, steel coverage ticket (town, COVERED / CALL AND ASK stamp, miles from base, 24/7), live status, buttons centred |
| /areas map (AreasBase) | KEEP | - | the one map on areas pages |
Seminole flow now: hero (quick answer) → local facts → permits → neighbourhoods → services → reviews → nearby → emergency → FAQ → CTA.

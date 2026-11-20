# Fix round 3 · fixer E · notes

Pages: /services, /services/water-heaters, /areas, /areas/seminole, plus the shared motion files and the footer.
Nothing is committed or deployed. Screenshots are in this folder. The name pattern is `<section>-<width>[-rm].png`, where `-rm` means reduced motion.
Facts come only from research/ (reviews-0/1.json, FACTS-CHECK, LOCAL-FACTS) and src/data.

## 1. BLOCKER · Seminole TownNearby rings (≈ Khinda Rings)
- **What I did.** I replaced the section with a **sheet of postage stamps** (`town/TownNearby.astro`).
  - There are six perforated stamps, one per nearby town. Seminole itself is left out.
  - Each stamp has a line glyph, and its "value" is the straight-line miles from Largo (towns.ts).
  - Hovering, focusing or the first tap lifts a stamp. The other stamps dim and blur, and a Largo postmark with wavy cancel lines draws over the lifted stamp.
  - Every stamp links to /areas.
- **Nearest match.**
  - Khinda /areas Rings places towns on distance rings. Mine has no rings, no map and no positions by distance.
  - Mike uses rubber-ink stamps on photos and logs (DIAGNOSED, RECEIVED, the hex badge). Mine are paper postage stamps with a postmark that draws on hover, so it is a different object and a different interaction.
- **21st.dev.** lavikatiyar "Cards" (hover-reveal grid, id 7840) and ham7a311 "Ticket Card" (perforated edge, id 44106).
- **Shots.** sem-nearby-1440.png, sem-nearby-390.png (plus the -rm versions).

## 2. BLOCKER · WhPricing "N OF 6 APPLY" (≈ Khinda SvPricing)
- **What I did.** I replaced the section with **The job, taken apart** (`water-heaters/WhPricing.astro`).
  - It is an exploded view: six isometric slabs (unit, gas or electric, size, venting, where it sits, permit) lie stacked, then lift apart as the visitor scrolls (kit scrub `data-scrub-tw`).
  - Each slab's label and leader line slide out, alternating left and right, so the stack stays centred.
  - There is no counter, no checkboxes and no "no price list" sentence.
  - The section closes with "Text a photo of your heater label. We tell you the price for your layers on the call." and the call button.
- **Nearest match.** Khinda SvPricing is a checklist with a running count. Mine is a scroll-scrubbed object with nothing to pick and nothing to count.
- **21st.dev.** hello_54e122be "Hairline Exploded" (id 36593).
- **Shots.** wh-pricing-1440.png, wh-pricing-390.png (scrubbing), wh-pricing-1440-rm.png and wh-pricing-390-rm.png (fully open).

## 3. MAJOR · WH compare slider (≈ Khinda SvCompare) and "Repair or replace?" (≈ Mike RepairInstall)
- **Compare slider.** I replaced it with **What runs at once** (`WhTypes.astro`).
  - Five real toggle buttons (shower, second shower, kitchen sink, dishwasher, washer) drive two stations.
  - The tank's stored water drops one step per fixture.
  - The tankless "heating now" meter lights one segment per fixture, with a marker where a single unit usually tops out.
  - The readouts use words only ("usually"), with no numbers.
  - 21st.dev: kuratlielia "Usage Meter" (35046) and aadilghani1 "Usage Meter" (40321).
  - Nearest match: Khinda SvCompare is a drag before/after slider. Mine has no slider, no before/after, and the input is the visitor's own house.
- **Repair or replace.** I replaced it with **Sort your symptom** (`WhQuick.astro`).
  - Six symptom chips sit on a bench. A tap slides a chip (FLIP) into one of three steel trays: Usually a repair / It depends / Usually a replacement. The chip then shows why.
  - A reset button puts the chips back on the bench.
  - The quick-answer paragraph and its sources stay (AEO).
  - 21st.dev: diceui "Kanban" (29222) and ddoemonn "Reorder List" (23550).
  - Nearest match: Mike RepairInstall is a two-way switch with two verdicts. Mine is a sort into three piles, and the honest "It depends" pile sits in the middle.
- **"$489".** `src/assets/photos/water-heater-softener-nolabel.jpg` is a copy with the EnergyGuide figure blurred (feathered Gaussian blur). This page uses that copy; the original is untouched because other pages use it.
- **Shots.** wh-types-1440.png, wh-types-4on-1440.png, wh-types-390.png, wh-quick-1440(-rm).png, wh-quick-sorted-1440.png, wh-quick-sorted-390.png.

## 4. MAJOR · /areas listed the 20 towns with miles twice
- **What I did.** I removed `AreasDistance` from `pages/areas/index.astro`. The map list is now the only list of towns with miles.
- The component file `src/components/areas/AreasDistance.astro` is now unused. The lead can delete it.

## 5. MAJOR · Seminole showed 5.9 mi four times
- 5.9 mi now shows twice: the hero eyebrow and the Local facts odometer.
- The hero plate's Base row reads "Largo, FL".
- The FAQ "how fast" answer reads "We are based in Largo, a short drive away".
- Seminole is not on the stamp sheet.

## 6. MAJOR · Seminole review board repeated the pinned-notes idea
- **What I did.** I replaced the board with **The review, seen through the job** (`town/TownReview.astro`).
  - Cody Weaver's words ("fixed my shower … that refused to drain", word for word, checked by `quote()` at build) are set at 118 px.
  - The letters are windows onto a job photo (background-clip: text).
  - Four chips (a radiogroup) cross-fade the photo, and the scroll slides the photo inside the letters.
  - The full review, David Peek's line and the two Google profiles (104 and 77, never summed) sit underneath.
  - The section has no pinned notes and no pinned photos.
- **Nearest match.** Home's pinned notes and Khinda's review cards are both cards. Mine is type used as a mask, which neither of them has.
- **21st.dev.** daiwiikharihar "Reveal Image Mask" (10905) and soralabs "Text Reveal (Mask)" (19257).
- **Shots.** sem-review-1440.png, sem-review-390.png.

## 7. MAJOR · Unbacked claims
- **Seminole permits.** I looked this up live on **https://www.myseminole.com/187/Building** (City of Seminole Building Division, 9199 113th St N, (727) 391-0204, takes building permit applications), read 20 Nov 2026.
  - `TownPermits.astro` cites it in the "City of Seminole" option and in the sources line.
  - The lead stays general: "your city or the county … we tell you on the call".
  - The FAQ answer says the city has its own Building Division and that unincorporated areas go to the county.
- **/areas "often original" supply lines.** Removed. The Homes reading now says only: "Largo's median home was built in 1978, by a third-party summary of Census figures."

## 8. MAJOR · Rebuilt sections

**WhProcess → The pipe run**
- Five valves sit on one pipe, and the pipe fills as the visitor scrolls (`data-scrub-fill`).
- Each valve is a tab (arrows, Home, End, plus Prev and Next buttons). It morphs one central line drawing and updates the steel caption plate.
- Step 04 keeps its label: "3 of the 16 reviews we hold mention the next day".
- 21st.dev: shadcnspace "stepper-03" (28558).
- Nearest match: Mike's laminated safety card lights its steps with the scroll. Mine is a tabbed stage that morphs one drawing, with the pipe as the progress line.
- Shots: wh-process-1440.png, wh-process-step4-1440.png, wh-process-390.png.

**WhWhy → The leaflet**
- The four reasons are the panels of one folded leaflet. The leaflet arrives zig-zag folded and opens with the scroll (one scrubbed `--f` custom property; rotateY on desktop, rotateX on phones).
- The autoplay is gone.
- "Clean up after" is now "Cleaning up is named in 2 of the 16 reviews we hold", with Jacob Gars quoted word for word.
- "Next day" is now "Not promised for every job: 3 of the 16 reviews we hold mention the next day", with Kevin Kelleman quoted.
- 21st.dev: shadcnspace "Origami Fold" (29810) and kedhareswer "3D fold" (44651).
- Nearest match: the old Glass reason tabs with a proof panel. Neither Mike nor Khinda has a folding object.
- Shots: wh-why-1440.png (mid-unfold), wh-why-1440-rm.png (open), wh-why-390-rm.png.

**AreasReviews → Zoom to the words**
- Each chapter's place word (Seminole / St. Pete / Rentals) starts huge and faint and zooms down with the scroll into an outlined title over its quote card.
- 21st.dev: reuno-ui "Text Scroll animation" (7281).
- Nearest match: Khinda's review rail and Glass home review cards. This section has no rail and no carousel.
- Shots: areas-reviews-1440.png, areas-reviews-390.png.

**AreasFacts → The test strip**
- Four pads (Permits, Water, Homes, Storms) take their colour one after another as the strip scrolls in (`data-stop` class mode).
- Each pad is a tab that opens its reading, with its source, in the steel key card. A pointer slides to the picked pad.
- 21st.dev: thegridcn "Energy Meter" (24473) plus a balick segmented control.
- Nearest match: the old 2x2 text cards. No other site has a strip.
- Shots: areas-facts-1440.png, areas-facts-390.png.

## 9. MAJOR · "Often the next day" in the WH hero
- The research holds 16 reviews, and 3 of them say "next day" (Kevin Kelleman, Parker L, and one about a valve visit).
- **Hero lead:** "Repair or replace, tank or tankless. 3 of the 16 reviews we hold mention the next day."
- **Meta description:** the next-day phrase is removed.
- **FAQ:** "Not promised for every job, but 3 of the 16 reviews we hold mention the next day. One customer wrote: …"
- **Process step 04 and the Why panel:** labelled the same way.

## 10. MAJOR · Seminole permit panel ran into the dark section
- `.tperm` bottom padding went from 110 to 130.
- Shot: sem-permits-1440.png shows the gap above the ink band.

## 11. MAJOR · axe at 390: footer town links too small, call bar overlap
- **Footer.astro, under 768 px:** each footer list link is now itself a 44 px row (flex, min-height 44). It no longer relies on a pseudo box that the next link overlapped.
- **Footer.astro, under 1024 px:** the bottom bar's padding that clears the fixed call bar went from 76 to 92 px.
- The footer design is otherwise unchanged.
- axe results are below.

## 12. MAJOR · Performance (Home, Lighthouse mobile)
**Changes**
- `scripts/motion.ts`
  - Sections below the fold are built lazily. An IntersectionObserver (150 % margin ahead) queues them, and each one is built in its own idle task (slice < 8 ms) instead of all at boot.
  - Parallax and photo drift are set up per section as each one becomes ready.
  - Parallax caches element heights instead of reading layout every frame.
  - Photo drift reads all values first, then writes.
  - Two forced refreshes at boot are removed.
- `kit/scrub.ts`: scrub moments are built lazily the same way, in idle tasks.
- `scripts/ui.ts`: the horizontal-scroll measurement is deferred to `load`.
- Smooth scroll, parallax and the page transition are kept.

**Lighthouse.** See the table below.

## Extra (coordinator, 20 Nov)
- `town/TownCta.astro`: "Kody or the crew will call you back." is now "We call you back.", and the button "Send to Kody" is now "Send the job".
- Flag: `faq/FaqAsk.astro` still has "To Kody · phone" and "Send to Kody". That is the question-to-Kody design, which I did not change.

## Lighthouse results (mobile, Home, Lighthouse 12.2.1, simulated throttling, 3 runs each, median shown)

| Server | Before (score / TBT / LCP / SI) | After (score / TBT / LCP / SI) |
|---|---|---|
| `npm run preview` (HTTP/1.1) | 75 / 294 ms / 3.7 s / 6.6 s (runs: 75, 75, 85) | **83 / 88 ms / 3.66 s / 6.1 s** (runs: 82, 83, 86; TBT 123, 88, 64 ms) |
| HTTP/2 + brotli static server (like Vercel) | 86 / 310 ms / 1.8 s / 6.7 s (runs: 80, 86, 92) | **90 / 241 ms / 1.35 s / 6.4 s** (runs: 88, 92, 90; TBT 304, 157, 241 ms) |

- **TBT target (under 200 ms on the local preview): met.** The median is 88 ms.
- **Score target (90 or above on the local preview): not met.** The median is 83.
  - The gap is LCP and SI. `astro preview` serves over HTTP/1.1 and uncompressed, and Lantern's simulation turns that into a 3.6 s LCP whatever the page does.
  - The same build served over HTTP/2 + brotli gets an LCP of 1.35 s and a median score of 90.
- **TBT on HTTP/2 stays around 240 ms.** The tasks left are boot work that cannot be split into idle tasks:
  - initial layout, about 100 ms;
  - module evaluation, including the loader and intro class changes, about 120–280 ms.
- The next step would be to defer the loader's `.cv` release and intro style changes past first paint. That touches the loader and intro, which Nick praised, so I left it.

## Checks (build in scratchpad dist3, HTTP/2 server)
- **Horizontal scroll** (390 / 768 / 1024 / 1440 × motion on and reduced, after walking the whole page): none on /services, /services/water-heaters, /areas or /areas/seminole.
- **Console errors:** 0 on those four pages.
- **axe** (wcag2a/aa, 21aa, 22aa) at 390 and 1440, with the footer lists opened:
  - /services: 0 violations at 390, so the footer target-size finding is cleared.
  - Two colour-contrast fails were found (pdeep text on steel, in `.ps-cn` and `.ts-n`). Both are now fixed to ink.
- **`npm run check:links`:** OK, every internal link in 14 pages resolves.

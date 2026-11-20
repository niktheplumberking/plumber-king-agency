# Glass Plumbing R2: independent review (20 Nov 2026)

Live: https://glass-plumbing-largo.vercel.app (checked live, Playwright Chromium, headless). Evidence PNGs are in this folder.
I am the reviewer, not a builder. Nothing was fixed.

## Verdict
**Not ready to show Nick yet.** Round 2 fixes his 11 named points (see the table below). Several problems remain:
- 2 fact blockers: a name sits on a face, and the permit answers state as certain what the research only infers.
- 1 clear repeat: home "Why us" and /reviews "What people mention".
- 5 to 7 sections that still use the left/right pattern he called slop.

The new work holds up: the transition and loader, the pinned Process, the switchboard, the reviews hero and the About record.
The weak spots are /areas/seminole and the bottom halves of /areas and /services/water-heaters. Most of those sections were
marked KEEP or POLISH, so no builder looked at them again.

**Sections Nick would likely still call slop or plain:**
1. /areas/seminole "Burst pipe in Seminole?": a white band with text on the left and a button on the right. This is the
   textbook "text left, text right" case.
2. /areas/seminole "The Glass brothers, Largo.": an ink band with a photo, one heading and one line.
3. /areas/seminole Cody Weaver review: the quote is on the left, three photos on the right, and there is empty space under
   the quote.
4. /areas/seminole "What we see in Seminole homes" (three plain icon cards), "Six jobs we do in Seminole" (a plain list
   of links) and "Nearby towns" (three plain cards).
5. /areas "Before you ask. We already got this text.": the heading is on the left, the chat is on the right and the left
   column is empty below the heading. "Type your town" has the same problem.
6. /services/water-heaters "Three things to do once a year": the text is on the left, the checklist tag on the right.
7. /our-work hero (three equal photo cards under a heading). It reads plain next to the reviews and contact heroes, and
   rule 11 asks for a unique hero.
8. Repeat: home "Why us" and /reviews "What people mention" (see MAJOR 1).

## Nick's points 1-11
| # | Point | Verdict | Evidence |
|---|---|---|---|
| 1 | Business card logo cut in half | FIXED on home Crew and /about, front and back, at 1440 and 390. Both faces show whole. | card-home-1440-front/back.png, card-about-390-front/back.png |
| 2 | Home "What 16 reviews say" was text only | FIXED as a section. It now has stars, "16 of 16 five stars", 6 test-strip tabs, a roll of reviewers and verbatim slips with underlines. But it repeats /reviews (MAJOR 1). | p2-home-whyus-1440/390.png |
| 3 | Home "Five steps": layout weak, nothing interactive | FIXED. The section pins, water fills each housing in turn, the panel swaps per step and it releases cleanly into Emergency. One crossfade frame shows two panels' text overlapping. | motion-home-process-pinned-1440.png |
| 4 | Contact hero empty and bold | FIXED. The switchboard has a display and 5 housing keys, a copy-number button and a stacked version on phones. | p4-contact-hero-1440/390.png |
| 5 | Reviews hero empty; breadcrumbs everywhere | FIXED. The hero has a 5-slip deck (button, arrow keys and drag all work) and two meters (104 / 77, never summed). No visible breadcrumbs on any of the 13 pages. BreadcrumbList JSON-LD is on 11 pages (not on home or thank-you, which is correct). | p5-reviews-hero-1440/390.png |
| 6 | Reviews "What people mention" was slop | FIXED as a layout: a centred rack of 6 housings, a filter and highlighted slips. It duplicates home Why us (MAJOR 1). | p6-reviews-mention-1440/390.png |
| 7 | Scroll-driven review wall | PRESENT. The outer columns move down and the middle column up, scrubbed by scroll, at 1440. The offset is subtle (320 px) and the wall is still plain white cards. At 390 it is one column with sideways drift. | motion-reviews-wall-1440.png |
| 8 | About hero photo centring; licence and Instagram promoted | FIXED. The face is centred. "On the record" shows a licence card / DBPR tabs, an Instagram card (verified, 34 posts, 653 followers, "Read 17 Nov 2026", 6 photos) and the two Google tiles. | p8-about-hero-1440.png, p8-about-record-1440/390.png |
| 9 | No text-left/text-right sections anywhere | PARTLY. The rebuilt sections pass. The KEEP and POLISH sections listed above still fail. | slop-*.png, plain-*.png |
| 10 | Lenis + GSAP smooth scroll, image and text parallax | PRESENT. Lenis is active (`html.lenis`). On home 9 of 10 h2s drift, on seminole 11 of 12; images drift (9 of 24 on home at 1440). Nothing stayed invisible at reading pace or in fast scrolls at 1440 and 390. | read-/fast- frames (scratch) |
| 11 | Transition must not look like Mike's or Khinda's | FIXED. Three water tones with a curved meniscus rise from the bottom, the logo sits on frost, then the water drains and the page appears from the top. Mike's (recorded the same way) is 8 horizontal blinds. The loader matches the water family. Total transition is about 1.7 s, a bit long. | motion-transition-1440-strip.png, motion-transition-390-strip.png, compare-mike-transition-1440.png, compare-khinda-transition-1440.png, motion-loader-1440-strip.png |
| - | No cross-page hash links | FIXED. There are 0 `/x#y` hrefs on all 13 pages. | - |

## BLOCKERS
1. **A name on a face (facts rule: "never put a name on a face we can't confirm"; FACTS-CHECK: DON'T KNOW which brother is the mustache man).**
   - /areas/seminole, 1440 and 390: the band "The Glass brothers, Largo." sits beside ONE crew face (the crawl-space photo).
     Evidence: face-name-seminole-brothers-1440.png, face-name-seminole-brothers-390.png. Likely file: `src/components/town/TownFamily.astro`.
   - Home Crew and /about hero: the "Kody Glass, OWNER" business card overlaps a face photo (home: the crawl-space man;
     about: the sunglasses and mustache man). The button reads "Flip Kody's card", and the about hero headline is
     "Meet the Glass Brothers" beside one face. /about itself says "We don't put names on photos", which this contradicts.
     Evidence: card-home-1440-back.png, card-about-1440-back.png, p8-about-hero-1440.png.
     Likely files: `home/Crew.astro`, `about/AboutHero.astro`. (The layout existed in round 1. It is still a rule breach.)
   - /reviews hero: the top slip "Zach was very professional…" lies under the same sunglasses face. This is less direct,
     because the slips rotate. Evidence: p5-reviews-hero-1440.png.
2. **Permit answers stated as certain when the research says "inferred".**
   - /areas/seminole permit finder, 1440 and 390: every combination prints "PERMIT: Needed". That includes "Inside city
     limits" for all three jobs, with the source "pinellas.gov/express-permits". That page covers unincorporated Pinellas
     (and unnamed contracting cities). LOCAL-FACTS marks "each needs a permit" as INFERRING and has nothing at all on
     Seminole city. Evidence: facts-seminole-permit-1440.png. File: `town/TownPermits.astro` (the `Needed` dd is hard-coded).
   - /services/water-heaters: the hero plate says "PERMIT Yes, in Pinellas". Quick answer: "In Pinellas County a
     replacement needs a permit". Job facts: "Yes (Pinellas express permit)". Pricing: "Needed for a replacement in
     Pinellas". None of these is hedged. (The FAQ wording "Usually, yes" is fine.) Evidence: facts-wh-verdict-1440.png.
     Files: `water-heaters/WhHero` (or `services/...`), `WhQuick`, `WhPricing`.
   - Home Process step 4 says "Water heater swaps and repipes in Pinellas need one", and its plate says "WHERE Pinellas
     County". For Largo and Clearwater addresses the city issues the permit. File: `home/Process.astro`.

## MAJOR
1. **Repeat layout and idea: home "Why us" and /reviews "What people mention".** They have the same six themes with the
   same counts (Fair price 6, Professional 6, On time 5, Same/next day 4, Explains 2, Clean up 2). The default tab is the
   same (Fair price), the same six slips appear (Kevin, Parker, Seth, Emily, David, Cary) and the same words are
   underlined or highlighted. Only the skin differs (test strip vs housing rack). A visitor going from home to /reviews
   sees the same section twice.
   - The "N of 16" tally also appears on home Crew, /about "Who is who", /about Talk to a brother, /services Promises
     ("Named in 5 of 16") and Water heaters Why ("Named in 2 of 16").
   - /about "Four house rules" again uses the same four themes.
   - Mike's home already has this device ("What reviews mention: 6/9 fair price, 4/9 communication…").
   - Fix suggestion: give /reviews a different idea, or turn home Why us into something that is not a theme tally (for
     example, proof by job photo + review).
   - Evidence: p2-home-whyus-1440.png and p6-reviews-mention-1440.png side by side.
2. **Slop and plain sections that were kept** (listed in the Verdict).
   - /areas/seminole: slop-seminole-burst-1440/390.png, slop-seminole-review-1440.png, plain-seminole-homes-1440.png
     (TownEmergency, TownReview, TownProblems, TownServices, TownNearby, TownFamily).
   - /areas: slop-areas-questions-1440.png (AreasFaq), slop-areas-checker-1440.png (AreasCheck).
   - /services/water-heaters: slop-wh-care-1440.png (WhCare).
   - /our-work: plain-ourwork-hero-1440.png (OwHero). The "Want your job on this page?" CTA is also text left / polaroid right.
3. **The map device is used three times.**
   - Home Areas: a Google map with a plate over it and a miles list.
   - /areas "Everything leaves from Largo": the same map, plate and miles list, plus filters.
   - /contact: the same map with a plate and a 24/7 card.
   - /areas/seminole: the map again, with a route.
   - Home Areas and /areas Base read as the same section.
4. **Unbacked or over-stated claims (not in site.ts, towns.ts, FACTS-CHECK or LOCAL-FACTS):**
   - /services/water-heaters "What it costs" factors:
     - "Tankless units cost more to fit"
     - "Gas adds venting and gas-line work"
     - "More bathrooms, bigger unit"
     - FAQ: "A tank … costs less to fit"
     These are general trade knowledge, not sourced. Evidence: facts-wh-pricing-1440.png.
   - Repair-or-replace verdict, "Replace it if the tank itself leaks" and the six symptom diagnoses: also general knowledge, not in research.
   - /areas/seminole "1970s and 80s homes. Many homes here are that age": the label says "inferred from county housing
     age". LOCAL-FACTS has only a third-party Largo median (1978) and says it does NOT KNOW the Pinellas median. Seminole has no data.
   - /areas/seminole "Seminole is on Pinellas County water": LOCAL-FACTS has this for Largo only.
   - These are promises Kody has not confirmed:
     - /areas "We tell you about any trip charge before we come out"
     - Water heater process "We haul the old one"
     - "Price before any work" (repeated site-wide)
     - "We answer 24/7" (site.ts says "Kody to confirm")
5. **Instagram count without its date:** /our-work hero says "34 posts and counting." with no "read 17 Nov 2026" nearby
   (the Feed further down has it). The OwFeed counter also animates through other values (19 / 368 → 32 / 615) before
   settling on 34 / 653, so screenshots mid-count show wrong numbers. File: `our-work/OwHero.astro`, `OwFeed.astro`.

## MINOR
- **"104 + 77 reviews"** in the utility bar on every page: the plus sign invites a sum. Prefer "104 · 77 reviews" or "two profiles: 104 and 77". File: `global/UtilityBar.astro`.
- **/reviews "Other places to find us"** shows "Facebook · link coming" and "Angi · Nextdoor · Yelp: added once we can read them". These are visible placeholders and read unfinished. (Yelp here is a legitimate platform mention.) File: `reviews/RevOwner.astro`.
- **/services/water-heaters compare slider:**
  - The tank side is cropped to blank wall and the edge of the tank, so the subject is not centred (rule 18). Evidence: crop-wh-compare-1440.png. File: `WhTypes.astro`.
  - At 1440, a headless mouse drag from the handle did not move it (value stayed 49). Click-to-position, the arrow keys, Home/End and the 390 drag all worked. Check by hand.
- **/about "Who is who" at 390:** all plates show expanded, but `aria-expanded` stays false on Zak and Chase, and a tap on their buttons does nothing (the `li` intercepts the tap). The content is visible, so this only matters for screen readers. File: `about/AboutCrew.astro`.
- **Horizontal overflow:** at 360 with motion on, /areas/seminole has scrollWidth 385 and /about has 362. This comes from a scaled img; the page cannot actually scroll sideways (scrollX stays 0). There is no horizontal scroll at 1920, 1440, 1280, 1024, 820, 390 or 360 under reduced motion.
- **Accessibility:**
  - axe at 1440: /contact has a tel link 108 × 19.7 px in the Largo base plate (target-size, `ConShop`).
  - With motion on, /about has a transient contrast hit on the switchboard "Ringing" chip while it animates.
  - Lighthouse flags btn-lab contrast during the hero entrance.
  - At 390 axe was clean with motion both reduced and on.
- **Home Process:** one mid-swap frame shows two step panels' text overlapping (ghosting). Also, while pinned, the lower third of the viewport is empty ink.
- **Loader:** for the first ~0.4 s the spec plate is empty until the logo image loads.
- **Transition:** the cover phase (frost and logo hold) is about 0.7 s, for about 1.7 s in total.
- **Code leftovers from Paul's build:** `window.__pbpMotion` and `window.__pbpLenis` in every page. They are not visible, but they are leftovers.

## Function (all OK unless listed above)
- **Smoke test.** Every button, tab, radio, checkbox, slider and `aria-pressed` control in `main` was clicked or keyed on
  11 pages at 1440 and 390 (touch emulation), and each produced a DOM change.
  - The exceptions were expected: the hero quick-form chips (styled with CSS :checked) and the FAQ "Send to Kody" button
    (`aria-disabled` until the question is filled).
  - Spot checks: the reviews deck (button, ArrowRight and drag go 1 → 2 → 3), both business-card flips (`aria-pressed`
    true), and the Why-us, Seminole permit, region filter, distance range, pricing toggles and care checkboxes all changed state.
- **Forms.** All 8 forms (home call-back, home 3-step estimate, services, water heaters, areas, seminole, contact, faq)
  reject an empty submit (2 aria-invalid fields) and go to /thank-you when filled. They are preview forms with no
  endpoint, so nothing is sent.
- **Console errors:** 0 on all 13 pages, at 1440 and 390, with motion on and off.
- **Back/forward after an internal link.** The new page lands at scrollY 0.
  - Back returns to 2000 (expected 2000; 2015 at 1440).
  - Forward returns to 3000.
  - No elements were left hidden and the cover was gone.
- **Red #B6353A** appears only on call / tel / "Call me back" elements on 11 pages, at 1440 and 390.
- **Photos:** no photo appears twice on any page. The business card appears twice only as its two faces.
- **Leftovers:** no rendered Mike, Riverside, Paul, United, Khinda, Surrey or (951). No "181".
- **Reviews:** every quoted review fragment on the site matches reviews.ts word for word. The IG quotes ("Officially up
  and running…", "No need to cut open the wall…") and the brands (Rheem 40 gal / Holdrite / RE199E / Moen / Gerber /
  Kohler / Northstar) are backed by photos/ig/meta.json and BRAND-AUDIT.md.

## Performance (Lighthouse mobile, Home, 2 runs)
| | Round 1 | Round 2 |
|---|---|---|
| Performance | 96 | 96 / 96 |
| LCP | 2.4 s | 2.3 s |
| CLS | 0.003 | 0 |
| TBT | - | 30 / 70 ms |

Other scores: Accessibility 97, Best Practices 100, SEO 69 (expected: noindex on the preview).

## Not checked or not fully checked
- A real iOS or Android device or Safari: the touch tests used Chromium emulation. Headless back/forward behaved, but the
  shared builder saw a restore mismatch on /services that I did not reproduce.
- Khinda's transition: I recorded the strip (compare-khinda-transition-1440.png) but looked closely only at Mike's.
  The shared builder's strips also show blinds for both.
- Motion frame sampling at reading pace covered Home only (1440 and 390). The pinned pieces (home Process, our-work
  Stories, reviews wall) were recorded only at 1440. Other pages were checked for drift numbers, not frame by frame.
- The keyboard path was checked for focus rings on 10 pages. A full manual tab-order walk through every new widget was
  not done. Spot checks: the deck, the compare slider keys, and Enter on the crew plates all work.
- No Figma (not allowed). No npm install.

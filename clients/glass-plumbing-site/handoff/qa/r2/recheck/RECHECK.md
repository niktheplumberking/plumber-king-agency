# Glass Plumbing R2: independent re-check after the fix round (20 Nov 2026)

Live: https://glass-plumbing-largo.vercel.app , all 13 routes, Playwright Chromium headless, on the live URL only.
I re-checked; I did not build or fix anything. Evidence is in this folder:
- `sections/`: every section at 1440 and 390, motion on. `sections/INDEX.txt` lists the valid files.
- `sheets/`: contact sheets of the sections.
- `widgets/`: before/after widget states, transition frames, back/forward.
- `compare-*`: Mike and Khinda sections used for the repeat check.
- `text/`: the rendered text of every page.
- `lh1.json`, `lh2.json`, `axe.json`: raw tool output.

## Verdict: not ready to show Nick
The fix round worked for most of the first review. Three things stop it:
1. A name still sits next to a single face.
2. Two of the new sections copy Mike's site.
3. Two sections copy Khinda's.

The permit claims are now hedged. Nothing overflows sideways, there are no console errors, the forms work and axe is
almost clean. Lighthouse mobile performance fell from 96 to about 80.

## Previous findings: status

| Previous finding | Status | Evidence |
|---|---|---|
| B1a Seminole "The Glass brothers" next to one face | FIXED. TownFamily is gone. David Peek's line is now only a quote on a cream note among job photos. | sections/areas_seminole-1440-05-trev.png |
| B1b Home Crew "Kody Glass, OWNER" card over a face | FIXED. The housing photo is now the van. | sections/home-1440-03-crew.png |
| B1b /about hero "Meet the Glass Brothers" + card on the face | PARTLY FIXED. At 1440 the H1 is "Meet the crew behind the van." and the card sits beside the button. At 390 the card (its back reads "Kody Glass, Owner"; the button says "Flip the card") is stacked directly above the single sunglasses face. | sections/about-1440-00-bhero.png, sections/about-390-00-bhero.png |
| B1c /reviews hero slip under the sunglasses face | **NOT FIXED.** Not in any fix block. The deck still lies under the same single face. Slip 3/5 reads "**Kody** came out and fixed my shower…" in large type. Other slips name Zach. | widgets/reviews-hero-after-1440.png |
| B2 Seminole permit finder "PERMIT: Needed" | FIXED and hedged ("Depends on who has jurisdiction…", "Ask us on the call"). See MAJOR 4 for one new local claim. | sections/areas_seminole-1440-02-tperm.png |
| B2 Water heaters permit (hero, quick, facts, pricing) | FIXED: "Usually · by address", "Usually; office depends on address", with the county/Clearwater/Largo wording and sources. | text/services_water-heaters-1440.txt l.35-97 |
| B2 Home Process step 4 permit | FIXED: hedged ("usually"; city or county). | text/home-1440.txt, home FAQ l.588-594 |
| M1 Home Why us repeats /reviews Mention | FIXED as a repeat between those two. Home is now a fridge door of notes, but that copies Mike (BLOCKER 2). /reviews still has the 6-theme "N/16" tally, the same device as Mike's home "what the reviews mention 6/9". "Named in N of 16" also remains on /about twice, /services and Water heaters. | sections/reviews-1440-01-cx-sec.png |
| M2 Slop sections kept (Seminole, /areas, WH care, Our-work hero/CTA) | FIXED as sections: all rebuilt with an interaction. But the new our-work hero copies Mike (BLOCKER 2) and the new Seminole Nearby copies Khinda (BLOCKER 3). | sheets/*.png |
| M3 Map device 3-4 times | FIXED. The map is only on /areas. Contact is now a street day/night scene; home is a split-flap board. | sections/contact-1440-02-cx-sec.png, sections/home-1440-08-ar.png |
| M4 Unbacked claims: trip charge, "we haul the old one", 1970s homes, Seminole water, price factors | FIXED: removed or hedged. The trip-fee question is replaced; the price factors use "usually" and no numbers. Leftovers are in MAJOR 4 and MINOR. | text/*.txt |
| M4 "Price before any work" | Still on home Process ("PRICE FIRST", step 03). This is the known open item for Kody to confirm, listed only. | text/home-1440.txt l.364 |
| M5 Instagram count without a date / count-up | FIXED. Every 34 / 653 has "read 17 Nov 2026" (about, our-work hero + feed, reviews, thank-you), and the counts are static. | text/*-1440.txt |
| m "104 + 77" in the utility bar | FIXED ("5.0 · 104 reviews \| 5.0 · 77 reviews"). No "181" anywhere. | text/home-1440.txt l.3-7 |
| m Reviews "link coming" placeholders | FIXED (only real platforms). | sections/reviews-1440-03-cx-sec.png |
| m WH compare crop / mouse drag | Crop FIXED (tank centred). Keys work. Mouse drag was not re-tested. | sections/services_water-heaters-1440-05-ty.png |
| m /about Who-is-who aria-expanded at 390 | Not re-tested in depth. The plates render open at 390. | sections/about-390-03-bcrew.png |
| m Overflow at 360 (Seminole 385, About 362) | FIXED. No overflow at any of the 7 widths, motion on or reduced, on any of the 13 routes (scrollWidth and scrollX checked down each page). | overflow run: empty result |
| m axe ConShop tel target | FIXED: tel link 118x44. | axe.json |
| m Process ghosting, loader, transition length | The transition is now about 1.4 s, water rises, then the page reveals; the page lands at scrollY 0. Ghosting was not re-measured frame by frame. | transition-1440-strip.png, transition-390-strip.png |
| m `__pbpMotion` leftovers | Not re-checked. | - |

## BLOCKERS
1. **Name next to a single face (fact rule, REVISION-R2 fix round: "No names next to a single face").**
   - /reviews hero, 1440 and 390. The 5-slip deck sits directly under one face photo (the sunglasses man). The slips
     name "Kody" (Cody Weaver) and "Zach" in large type. FACTS-CHECK says it is not known which brother this is.
     - Evidence: widgets/reviews-hero-after-1440.png.
     - File: `src/components/reviews/RevHero.astro`.
     - Fix: swap the photo for a job or van photo, or move the face away from the named slips.
   - /about hero at 390. The flip card (back: "Kody Glass, Owner") is stacked right above the same single face.
     - Evidence: sections/about-390-00-bhero.png.
     - File: `about/AboutHero.astro` (mobile order).
2. **Copies of Mike's site (rule: never repeat Mike's layouts; heroes included, rule 11).**
   - /our-work hero (OwHero) is a centred heading on ink plus a full-width film strip with sprocket holes and photo frames.
     Mike's /our-work hero (`our-work/OHero.astro`) is a "contact sheet: … a strip of 35 mm film runs edge to edge …
     with sprocket holes". The page, idea and composition are the same; even the Glass COMPONENT-MAP calls it a "film rail
     contact sheet".
     - Evidence: sections/our-work-1440-00-cx-sec.png vs compare-mike-ourwork-hero-1440.png.
   - Home "Why us" (WhyUs, "The number on the fridge") is a door with photos and notes held by magnets. Mike's /about
     Family (`about/AFamily.astro`) is "snapshots on a fridge door (… hex magnets …)". The skin differs; the object and
     idea are the same.
     - Evidence: sections/home-1440-05-why.png vs compare-mike-about-family-fridge-1440.png.
3. **Copies of Khinda's site.**
   - /areas/seminole "One drop in Largo" (TownNearby) uses concentric distance rings around the base, with towns placed on
     their ring, a point-to-light interaction and a "not to scale" foot line. Khinda /areas "Closer to Surrey" (`areas/Rings.astro`)
     has concentric rings around the base, towns on rings, tap a ring to light it, and "NOT TO SCALE · RINGS SHOW DRIVE
     ORDER". Fixer B checked Mike's tree only, not Khinda's.
     - Evidence: sections/areas_seminole-1440-06-tnear.png vs compare-khinda-areas-rings-1440.png.
   - /services/water-heaters "No price list. Here's what changes it." (WhPricing) lists the price factors as rows that
     tick on, with an "N OF 6 APPLY" readout and "Every house is different, so there is no price list here. Call or text a
     photo of the label". Khinda's service pricing (`service-template/SvPricing.astro`) lists factor rows ticked by a
     control, with "HE CHECKS 4 OF 5 THINGS" and "Every panel is different, so there is no price list here … Text a photo
     of the panel". The idea, the readout and almost the same sentence are copied.
     - Evidence: sections/services_water-heaters-1440-06-pc.png vs compare-khinda-sv-pricing-1440.png.

## MAJOR
1. **The same idea twice inside the site.**
   - /areas runs the same content twice in a row: "Everything leaves from Largo" (map + region chips + all 20 towns with
     miles) is directly followed by "Largo sits in the middle of Pinellas" (a slider + the same 20 towns with miles).
     Home Areas (region keys → towns + miles) is a third version.
     - Evidence: sections/areas-1440-01-abase.png, areas-1440-02-adist.png, home-1440-08-ar.png.
     - Files: AreasBase, AreasDistance, home/Areas.
   - /areas/seminole shows the 5.9 mi distance four times: hero plate, Local facts tab 01 (odometer), the Nearby pond
     reading, and the FAQ "How fast can you get here? 5.9 mi".
   - /about has the same crew list twice: "The names in the reviews" (Kody / Zak / Chase + "Named in 8/6/2 of 16") and
     "Talk to the crew" (Kody / Zak / Chase + "named in 8/6/2 of 16 reviews"). Home Crew is a third Kody / Zak / Chase list.
     - Evidence: sections/about-1440-03-bcrew.png, about-1440-07-bcall.png.
   - Pinned notes and photos twice: the home fridge door and the Seminole review "job board".
   - A review-slip carousel or deck twice: /reviews hero deck and /our-work "What customers say".
2. **Close to the Khinda/Mike service template.** WhTypes is a drag compare slider, like Khinda SvCompare.
   WhQuick "Repair or replace?" with a two-way switch is like Mike water-heaters RepairInstall ("repair" vs "install"
   valve). The topics come from the page template, but the interaction is the same.
   - Evidence: compare-khinda-sv-compare-1440.png, compare-mike-wh-repair-install-1440.png.
3. **Lighthouse mobile Home regressed from 96 to 78 / 81.**
   - Measured in 2 runs: TBT 560 / 420 ms (was 30-70), Speed Index 6.5 / 6.4 s, LCP 2.3 s, CLS 0.
   - The cost is in `Base.astro…index_0_lang.*.js` (motion / parallax: 3.7 s main thread, 14 long tasks) and the WhyUs
     script. This may be partly the sandbox CPU, but it is a big drop against the R2 baseline in the same kind of run.
   - Other scores: Accessibility 100, Best Practices 100, SEO 69 (noindex, expected).
4. **Local facts and promises that are not backed.**
   - /areas/seminole permits: "inside the City of Seminole, the city's building department" decides, and the slip says
     "WHO DECIDES: City of Seminole inside city limits".
     - LOCAL-FACTS has nothing on Seminole's permit office. It says the county also serves "some cities that contract
       the county".
     - Fix: hedge it ("ask the City of Seminole whether it or the county issues it") or remove it.
     - Files: `town/TownPermits.astro`, `town/data.ts` (also the FAQ "Which office issues my permit?").
   - /areas "Older homes": "Largo's median home was built in 1978, so supply lines and drains are often original." The
     second half is not in research (LOCAL-FACTS has only the third-party median).
     - File: `areas/AreasFacts.astro` l.11.
   - "Kody, on @glassplumbingservices" (home Crew) and "Kody, on Instagram" (/our-work) attribute the IG posts to Kody.
     FACTS-CHECK: "DON'T KNOW which brother runs the IG". Also in /reviews RevOwner ("Kody's IG line").
   - /about "Talk to the crew: When you call, one of these picks up" (Kody / Zak / Chase). Who answers the phone is not
     confirmed, and Chase is only known as a tech from one review.
5. **Remaining text-left / object-right or thin sections (rule 14). Lighter than round 1, but Nick will see them.**
   - /about "Talk to the crew" (heading + buttons left, panel right, empty around it).
   - /services/water-heaters "From a photo to hot water" (heading left, 5 small tiles, a lot of empty space).
   - WH "Four reasons people call back" (tab list left, card right).
   - /areas "From Seminole to St. Pete" (three plain white review cards).
   - /areas "Four local facts" (2x2 text cards).
   - Evidence: sheets/wh-a.png, wh-b.png, areas.png, sections/about-1440-07-bcall.png.

## MINOR
- **Response-time wording.**
  - "Often the next day" / "Next-day installs" appears on WH hero, Process, Job facts, Why, FAQ and home Services
    ("often next day").
  - It is backed by 2 reviews and mostly labelled "(from reviews)". The WH hero line and home Services card are not labelled.
  - Kody to confirm, or label it everywhere.
- **"We leave it clean" / "Clean up after"** (services, WH, home Process) is a promise built from 2 reviews.
- **/services/water-heaters compare photo:** the EnergyGuide label reads "$489" (yearly energy cost) in large type. It can be
  read as a price.
- **/reviews:** "Counted from the 16 reviews we read" next to 104 and 77 profiles. It is accurate but invites questions.
- **axe at 390, /services (motion on):** target-size on footer area links ("areas", "seminole") partly covered while the
  mobile call bar overlaps. All other routes are clean at 1440 and 390, with motion on and reduced.
- **/areas/seminole permit panel:** the ink panel's bottom edge meets the ink section below with no gap.
  (sections/areas_seminole-1440-02-tperm.png)
- **Programmatic `scrollIntoView` does not move the page under Lenis** (seen in tests). In-page jumps that the site
  itself triggers do work (the FAQ search scrolls to the answer).

## Facts sweep (rendered text vs data and research): clean items
- No "181" and no "104 + 77" anywhere.
- No trip charge, "we haul", "we file/pull the permit", prices, warranties or "since 20xx".
- "24/7" is used and allowed.
- Permit lines are hedged everywhere except the Seminole city item in MAJOR 4.
- The licence expiry 08/31/2028 matches FACTS-CHECK DBPR. The water numbers (217 ppm, 11.1-14.3 gpg, chloramine switch)
  match LOCAL-FACTS 4.
- Miles match towns.ts.

## Function and robustness
- **Horizontal scroll:** none on all 13 routes at 1920/1440/1280/1024/820/390/360, motion on and reduced.
- **Console errors:** 0 on all 13 routes at 1440 and 390.
- **Forms:**
  - 7 of 8 forms reject an empty submit (2 aria-invalid) and go to /thank-you when filled, at 1440 and 390: home
    call-back, services, water heaters, /areas, seminole, contact and faq.
  - The home 3-step estimate did not reach /thank-you with a direct requestSubmit. That is probably my test skipping its
    steps; it was not walked through by hand.
- **Widgets.** Each changed state on click/tap and on keys where it has them, at 1440 and 390 (touch emulation):
  - home fridge: drag with the mouse, touch drag by the magnet (not by the note body), arrow keys, the Straighten toggle
  - home split-flap regions; Seminole clipboard tabs (tap + ArrowDown), pond focus, lever, drawers (hover)
  - /areas thread chips and town checker (chips + typing "Dunedin")
  - contact day/night switch; our-work film rail (tap + ArrowRight); WH care bench, label shutter, price toggles,
    compare slider keys
  - FAQ search (type + Enter jumps to the answer) and chips; services "point to it" cabinet; reviews deck (button)
  - Evidence: widgets/.
- **Page transition:** the water rises, the logo shows, then the page reveals; the new page lands at scrollY 0. Back
  returns to 1806 (left at 1800); Forward returns to 1493 (left at 1493). At 390, Back returns to 7201 (7200). No cover
  is left on screen.
  - Evidence: transition-1440-strip.png, transition-390-strip.png, widgets/back-1440.png, widgets/forward-1440.png.

## Could not check / not fully checked
- Real iOS/Android/Safari (Chromium emulation only).
- A by-hand walk of the home 3-step estimate.
- A full keyboard tab-order walk of every widget.
- Frame-by-frame motion at reading pace on pages other than the transition.
- Whether the Lighthouse drop is partly sandbox CPU. I ran 2 runs only, and the benchmarkIndex was 2178.
- Whether City of Seminole really issues its own permits (not in research, and I did not look it up).
- No Figma, no npm install. axe-core and lighthouse were used from the existing npx cache.
- The sections/ folder holds some stale duplicate files from a first pass; INDEX.txt lists the valid ones.

# Verdict: NOT READY (no blockers; 4 majors, each a small, targeted fix)

Glass Plumbing R3 independent re-check, 20 Nov 2026. Live https://glass-plumbing-largo.vercel.app (serves commit 0639635:
"Five stars. Open each one.", turntable, stamps, leaflet all live). I changed no code. Playwright Chromium headless on the
live URL, 1440 and 390 (plus 768 / 1024 for overflow), motion on and reduced.

All 3 blockers and all 5 majors from the R2 re-check are fixed. Nothing overflows, the console is clean, axe is clean
except one old scroll-lit text, all forms work (the home 3-step estimate was walked by hand), and Lighthouse mobile is back
to a median of 91. It is not ready because this round's own rule ("a new section idea must not match another Glass
section") is broken three times, and the /about hero is still text-left / photo-right. Each needs one section changed.

Evidence in this folder:
- `sections/`: every section at 1440 and 390, motion on.
- `reduced/`: every section with reduced motion.
- `sheets/*-390.png`: contact sheets at 390.
- `widgets/`: widget states, the estimate walk and the leaflet frames.
- `text/`: rendered text of all 13 routes.
- `crawl.json`, `crawl-rm.json`: per route status, console errors and overflow.
- `axe-overflow.json`: axe results plus the 768 / 1024 overflow walk.
- `lh1-3.json`: Lighthouse runs.

Note: element screenshots of tall sections sometimes show "Skip to content" over the header. This is a Playwright capture
artefact: the link sits at y = -80 and is not visible at any real scroll position (checked with `getBoundingClientRect`).
The pinned home Process also renders oddly in element shots for the same reason.

## Previous findings (R2 RECHECK): status

| R2 finding | Status | Evidence |
|---|---|---|
| B1 /reviews hero: slips naming Kody/Zach under a single face | FIXED. The photo is now the finished shower, with no face. | sections/reviews-1440-00-cx-sec.png |
| B1 /about 390: "Kody Glass, Owner" card above the face | FIXED. The card moved to the last section (AboutCall). | sheets/about-390.png |
| B2 our-work hero = Mike OHero film strip | FIXED. It is now a 3D turntable of tiles on a steel base. Mike/Khinda have no 3D ring. | sections/our-work-1440-00-cx-sec.png, widgets/ourwork-turn-*.png |
| B2 home WhyUs fridge door = Mike AFamily | FIXED. Five big stars act as tabs and each opens one whole review. | sections/home-1440-05-why.png, widgets/home-stars-*.png |
| B3 Seminole rings = Khinda Rings | FIXED. It is now a sheet of postage stamps (see MINOR for the interaction). | sections/areas_seminole-1440-06-tnear.png |
| B3 WhPricing = Khinda SvPricing | FIXED. It is now an exploded stack of layers on scroll, with no counter and no "no price list" line. | sections/services_water-heaters-1440-s06-pc.png |
| M1 /areas 20 towns twice | FIXED. AreasDistance is removed. | sections/areas-1440-0*.png |
| M1 Seminole 5.9 mi four times | FIXED. It now shows twice: the hero eyebrow and Local facts. | text/areas_seminole-1440.txt |
| M1 /about crew list twice | FIXED | sections/about-1440-02-bcrew.png, about-1440-06-bcall.png |
| M1 pinned notes twice; slip deck twice | FIXED. TownReview is now type-as-window. OwQuotes is now a checkerboard. | sections/areas_seminole-1440-05-trev.png, our-work-1440-04-cx-sec.png |
| M2 WhTypes slider ≈ Khinda; WhQuick switch ≈ Mike | FIXED. WhTypes is now "What runs at once" (toggles drive two meters). WhQuick is now "Sort your symptom" (chips into 3 trays). | sections/services_water-heaters-1440-s05-ty.png, -s01-qa.png |
| M3 Lighthouse 78-81 | FIXED. See Function. | lh1-3.json |
| M4 Seminole city permit unbacked | FIXED and verified (see Facts). | text/areas_seminole-1440.txt |
| M4 "often original" 1978 line | FIXED. It now says only "median built 1978, third-party figure". | text/areas-1440.txt |
| M4 IG credited to Kody | FIXED. No "Kody, on" anywhere. It is "Posted on @glassplumbingservices". | text/*-1440.txt |
| M4 "one of these picks up" | FIXED. The phrase is gone everywhere. The /contact and /faq "A real plumber picks up" lines are gone too. | text/*-1440.txt |
| M5 slop: about Talk to the crew, WH process, WH why, areas reviews, areas facts | Rebuilt. But WhProcess and AreasFacts now repeat other Glass sections (MAJOR 1, 3). | below |
| m next-day wording | FIXED. Every mention is labelled "3 of the 16 reviews we hold". | text/services_water-heaters-1440.txt |
| m "$489" label | FIXED. The page uses a blurred copy of the photo. | sections/services_water-heaters-1440-s05-ty.png |
| m axe footer target size at 390 | FIXED. 0 target-size violations. | axe-overflow.json |
| m "We leave it clean" | PARTLY. Fixed on home. Still on /services ("We leave it clean." under "named in 2 of 16"). | text/services-1440.txt l.324 |

## BLOCKERS
None.

## MAJOR

1. **WhProcess repeats home Process (FIX-R3: "must not match another Glass section").**
   - Both are a 5-step process drawn as a pipe that fills with water as you scroll (`data-scrub-fill`, the only two users
     of it). Both have five stops on the pipe and a panel underneath that swaps to the picked step.
     - Home: five filter housings, "Five steps. No surprises."
     - WH: five valves, "From a photo to hot water."
   - The fixer's nearest-match line names only Mike's laminated card and misses the home section.
   - Context: home Process (R2) is itself the device of Mike home `Process.astro` ("scrub.ts runs the water along the pipe
     and lights each stop as the water reaches it"), and Khinda home Process (current runs box by box). Two reviews
     passed it, but WhProcess makes the device appear twice on Glass.
   - Files: `src/components/water-heaters/WhProcess.astro` vs `src/components/home/Process.astro`.
   - Evidence: sections/services_water-heaters-1440-s04-ps.png vs sections/home-1440-06-pr.png.
   - Fix: give WhProcess a non-pipe idea.

2. **Kody's business card flip twice.**
   - Home Crew and /about AboutCall both show the same two-sided card photo, and both turn over on tap
     ("FLIP KODY'S CARD" / "Tap the card to turn it over").
   - The fixer acknowledged this in D/NOTES, MAJOR 5.
   - It is the same object and the same interaction on two pages, the kind of repeat the R2 re-check rated MAJOR
     (the slip deck twice).
   - Files: `src/components/home/Crew.astro`, `src/components/about/AboutCall.astro`.
   - Evidence: sections/home-1440-03-crew.png, sections/about-1440-06-bcall.png, widgets/about-card-back-*.png.

3. **"Four local facts" twice, as the same tab + reading card.**
   - /areas AreasFacts ("Four readings that change the job": Permits / Water / Homes / Storms) and /areas/seminole
     TownFacts ("Four things to know before you call": Distance / Water 217 ppm / Storm season / Older pipes) are the same
     structure:
     - four tabs;
     - "READING 0N · X";
     - a big value and a source line.
   - They share the same 217 ppm and storm facts.
   - The "test strip" is four flat colour blocks above a tab panel, so the object is thin.
   - Both are also close to Khinda /areas `Rules.astro` (four index tabs, "one fact and its source").
   - Files: `src/components/areas/AreasFacts.astro`, `src/components/town/TownFacts.astro`.
   - Evidence: sections/areas-1440-02-afacts.png, sections/areas_seminole-1440-01-tfacts.png.

4. **/about hero is still text-left / photo-right (rule 14).**
   - It holds eyebrow, H1, lead, button and a licence line on the left, and one portrait on the right, with nothing to
     touch. It is the only hero on the site without an interaction.
   - Fixer D flagged it ("close to the text-left / photo-right shape Nick dislikes"). Nick's R2 point 8 asked only to
     centre this photo, but rules 14 and 15 apply to every section.
   - File: `src/components/about/AboutHero.astro`.
   - Evidence: sections/about-1440-00-bhero.png.

## MINOR
- **/about at 390.**
  - The single-face hero photo ends at the hero's bottom edge. The next (dark) section's lead is "Kody holds Florida
    licence CFC1432488…", so both can be on one phone screen.
  - They are separate sections, not one group, so this is not a rule break. Still, "Glass Plumbing Services holds…"
    would remove the doubt.
  - Evidence: sheets/about-390.png.
- **AboutCall card.** The "TAP THE CARD TO TURN IT OVER" pill covers part of the card's own "24/7 EMERGENCY SERVICE" strip
  (rule 18).
  - Evidence: sections/about-1440-06-bcall.png.
- **WhWhy leaflet at 390.**
  - While the leaflet unfolds, the panels run past the left and right edges of the screen and the text is squashed.
  - When the section top reaches the screen, `--f` = 0.56 and panel 2 is unreadable. It reads fine once open, and at
    1440 it is open by the time the section is centred.
  - Evidence: sections/services_water-heaters-390-s08-wy.png, widgets/wh-leaflet-390-*.png, wh-leaflet-1440-1.png.
- **TownNearby stamps.** The object is new, but the interaction is Khinda city `Nearby.astro`'s, on the same kind of
  section (the nearby towns on a town page): hover or first tap lifts one, the others dim, and every item is a link.
- **OwQuotes.** The six "job" tiles are ink squares with a label only, with no photo (rule 16: proof shows real photos).
- **AboutCrew.**
  - "Named in 8 / 6 / 2 of 16 reviews" is drawn as fill bars. That is the N/16 tally device the fixers removed from
    /reviews because it matched Mike.
  - Not new, and the counts are correct (Kody 8, Zak 6, Chase 2).
  - Evidence: sections/about-1440-02-bcrew.png.
- **Unconfirmed promises still visible.**
  - WhPricing: "We tell you the price for your layers on the call."
  - WhTypes: "we tell you which fits on the call".
  - /services: "We leave it clean."
  - /contact form message: "All set. Send it to Kody." (`contact/ConForm.astro` l.77). This implies Kody receives it.
- **axe /reviews, motion on (1440 + 390): color-contrast, 10 nodes.** These are the RevOwner scroll-lit words (`.ro-w`,
  opacity 0.16, 1.4:1) before they are scrolled into view. They pass under reduced motion. The feature is old.
- **Home Process ghosting.** The previous step's text shows faintly under the active one while the stage is pinned.
  - Evidence: sections/home-1440-06-pr.png.
  - Not measured frame by frame; it may be partly the capture.

## Names next to a single face (all pages, 1440 + 390): clean
- Single-face photos remain in these places, and none has a name in its section or card:
  - home hero (two housings);
  - /about hero;
  - /about Proof reel (its quotes are "He showed up…" and "These guys…");
  - /our-work feed (selfie and crawlspace);
  - /our-work CTA polaroid.
- Home Crew holds the van, with no face.
- The /reviews hero holds the shower photo.
- TownReview and the Seminole stamps have no faces.
- The /reviews OG image is the selfie (`pages/reviews.astro` l.15). It carries no name, so this is noted only.

## Repeat check (code read, not names)
Mike: 89 components and Khinda: 103 components, compared by reading their header comments and code.
- WhyUs stars: nearest are Mike home Reviews (spotlight carousel) and Khinda Thermo (snap ring). Different.
- OwHero turntable: neither site has CSS 3D / preserve-3d. Different.
- OwQuotes checkerboard: nearest are Mike OWall (masonry with tickets) and Khinda OurWork (grid). Different.
- RevMention marker pens: Mike AWork draws marker underlines on scroll, and RevSpotlight is ruled sheets with
  underlined words. Here the skin is related, but the pick-a-theme interaction is not. OK.
- AboutCall card: Khinda city Plate tilts toward the pointer. The tilt is generic. The in-site repeat is MAJOR 2.
- TownNearby stamps: see MINOR. Mike's stamps are rubber ink. OK.
- TownReview photo-filled type: no `background-clip: text` in Mike or Khinda. OK.
- WhPricing layers: nothing exploded or isometric in either. OK.
- WhTypes "What runs at once": no match. WhQuick sort: no match.
- WhProcess: MAJOR 1.
- WhWhy leaflet: no fold or origami in either. OK.
- AreasReviews zoom words: Mike TWhy stacks words upright, which differs. OK.
- AreasFacts test strip: MAJOR 3.

## Facts sweep (rendered text of 13 routes vs research/ + src/data)
- **Seminole permit (myseminole.com/187/Building).** Fetched 20 Nov 2026.
  - "City of Seminole Building Division", 9199 113th Street, 727-391-0204, "processing of applications, permits, and
    inspections". This matches TownPermits and the FAQ.
  - The lead stays hedged ("Often, yes … your city or the county").
- **Google counts.** 104 and 77 are always shown separately. There is no 181 and no "+".
- **Review quotes.** The ones spot-checked match reviews-0/1.json word for word. The RevMention pen counts check out:
  fair price 6, same or next day 4, next day 3, cleaned up 2.
- **Who answers the phone.** No claim remains. What is left: "We answer 24/7" (24/7 is allowed) and "We call you back".
  See MINOR for ConForm.
- **Instagram.** Every credit is to the account. 34 / 653 is always dated "read 17 Nov 2026".
- **Prices, years, warranties, trip charge, "we haul", "we pull the permit".** None found. The veterans offer matches
  site.ts.
- **Zak.** "On the crew · commercial and new builds" (home Crew) is an inference from Peter Van Buskirk (commercial
  build-out) and Nelson Whitesell (new home). It is acceptable.

## Function
- **13 routes.** All return 200. 0 console errors and 0 page errors, at 1440 and 390, motion on and reduced.
  - Evidence: crawl.json, crawl-rm.json.
- **Horizontal scroll.** None at 390 / 768 / 1024 / 1440, motion on and reduced, checked while walking each page.
  - Evidence: axe-overflow.json.
- **axe (wcag2a/aa/21aa/22aa).** Clean on 12 routes at 1440 and 390, motion on and reduced. /reviews has the one MINOR
  above.
- **Home 3-step estimate, walked by hand (click at 1440, tap at 390).**
  - Next with nothing picked stays on step 1 with "Pick the closest one to go on."
  - Problem → step 2. Town + when → step 3.
  - An empty submit gives 2 aria-invalid and the message.
  - Name + phone → /thank-you.
  - Evidence: widgets/est-*.png.
- **New widgets.** All change state at 1440, at 390 touch, and at 390 with reduced motion:
  - stars (click + ArrowRight);
  - turntable step;
  - quilt focus;
  - pens;
  - card flip;
  - stamps;
  - TownReview chips;
  - WhTypes toggles;
  - symptom sort (with reset);
  - valve tabs;
  - test-strip tabs.
  - Evidence: widgets/.
- **Lighthouse mobile, live home** (Lighthouse 12, Chromium /opt/pw-browsers/chromium, headless, no sandbox), 3 runs:

  | Run | Performance | TBT | LCP | Speed Index |
  |---|---|---|---|---|
  | 1 | 91 | 90 ms | 2.4 s | 6.1 s |
  | 2 | 96 | 60 ms | 2.3 s | 4.2 s |
  | 3 | 90 | 80 ms | 2.6 s | 6.1 s |

  - **Median 91** (R2: 78 / 81).
  - CLS 0. Accessibility 100, Best Practices 100, SEO 69 (noindex, expected).

## Could not check
- Real iOS/Android Safari (Chromium emulation only).
- A full keyboard tab-order walk of every widget.
- Frame-by-frame motion at reading pace beyond the leaflet. Page transitions were not re-filmed this round.
- /services, /contact and /faq sections that this round did not touch were only looked at in contact sheets, not
  re-judged one by one.
- No Figma, no npm install. axe-core and lighthouse came from the existing npx cache.

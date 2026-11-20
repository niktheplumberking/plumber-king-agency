# Verdict: SHIP TO NICK (no blockers, no majors; 9 minors, polish only)

Glass Plumbing R4 independent re-check, 20 Nov 2026. Live https://glass-plumbing-largo.vercel.app serves commit 397cfed. I
checked the live HTML: "Keep the number", "The owner holds", "Wipe all four", the tape measure, "Send the job" and "Named in 2
of 16 reviews" are all there. I changed no code. Tools: Playwright Chromium headless on the live URL at 1440 and 390 (plus 768
and 1024 for overflow), motion on and reduced; axe-core from the npx cache; Lighthouse 12 (12.8.2).

All 4 majors from the R3 re-check are fixed, and so are 8 of its 9 minors. The R3 stamps-interaction minor is still open.
- All 13 routes return 200. Console errors: 0. Horizontal scroll: none. axe violations: 0. That holds on every route, at all
  four widths, with motion on and reduced (104 page runs).
- The keep list still works: the Emergency wheel turns with the scroll, the meniscus seam is intact, and the home estimate
  reaches /thank-you in all four runs.
- Lighthouse mobile median is 96.
- What is left is polish. The minor most worth fixing before Nick looks closely is minor 1: the new /about keypad shares its
  skin with the /contact hero switchboard.

Evidence in this folder:
- `sections/`, `reduced/`: the changed sections and keep-list sections at 1440 and 390, motion on and reduced.
- `widgets/`: the pad, keypad, fog, tape, estimate and quilt states, plus `log.json` with every measured value.
- `crawl-axe-overflow.json`: 13 routes × (1440, 390, 1024, 768) × (motion, reduced). It records status, console and page
  errors, maximum horizontal overflow, and axe at 1440 and 390 after the walk down and back.
- `lh1-3.json`: the Lighthouse runs.

## R3 findings: status

| R3 finding | Status | Evidence |
|---|---|---|
| M1 WhProcess repeated home Process (pipe + fill) | FIXED. Both sections changed. Details below. | sections/home-process-*.png, sections/wh-process-*.png |
| M2 Kody's card flipped on home Crew and /about | FIXED. The card is on home Crew only. /about now ends on a keypad. | sections/about-keypad-*.png |
| M3 AreasFacts = TownFacts (tabs + reading card, shared 217 ppm/storm) | FIXED. /areas uses fogged panes you wipe. Seminole uses two tapes. They share no facts. The Seminole FAQ still says 217 ppm, as noted by the fixer; it is on another page in another form, so OK. | sections/areas-facts-*.png, sections/seminole-tape-*.png |
| M4 /about hero text-left / photo-right | FIXED. One centred column; the photo opens from an arched window as you scroll. | sections/about-hero-top/open-*.png; log: `--o` 1 → 0.63 → 0.30 (1440), 0.65 → 0.12 (390); window centred (460/460 px, 35/35 px) |
| m /about 390 "Kody holds…" under the face | FIXED. The text now reads "The owner holds Florida licence…". | sections/about-hero-to-next-390.png |
| m AboutCall pill over the 24/7 strip | FIXED (card removed from /about) | n/a |
| m WhWhy leaflet past the screen edges at 390 | FIXED. Panels stay 20 px inside both edges at every fold state (f 1 → 0.32) and are readable. | widgets/wh-leaflet-390-1..4.png |
| m TownNearby stamps use Khinda Nearby's interaction | OPEN. Not touched this round. | n/a |
| m OwQuotes job tiles had no photos | FIXED. Four real job photos with no faces, each used once on /our-work. | widgets/owquotes-job-photos.jpg |
| m AboutCrew N/16 fill bars | FIXED. Plain "Named in N of 16 reviews". | widgets/about-crew-390.png |
| m Unconfirmed promises (WhPricing, WhTypes, /services clean, ConForm "Send it to Kody") | FIXED (checked on the live HTML) | n/a |
| m axe /reviews RevOwner contrast | FIXED. 0 violations at 1440 and 390, motion on. | crawl-axe-overflow.json |
| m Home Process ghosting | FIXED. Pages that are not on top have their text at opacity 0. | log.json `home-pad-ghost-*` |

## BLOCKERS
None.

## MAJOR
None.

## MINOR
1. **/about keypad looks like the /contact hero switchboard.**
   - Both are a steel plate with rivets, an ink display headed "● … LINE OPEN · 24/7", the number in the display, a grid of
     keys under it and the red call button.
   - The ideas differ: the keypad dials digits, while ConHero picks a contact channel. At 390 the keys look different too:
     a 3×4 digit pad on /about, a list of housings on /contact.
   - Not a rule break by my reading. Still, reskinning the keypad (or changing its display label) would avoid Nick seeing
     "the contact console again".
   - Files: `about/AboutCall.astro`, `contact/ConHero.astro`.
   - Evidence: widgets/contact-hero-vs-about-keypad-390.png.
2. **Seminole distance tape: same scroll interaction as Mike and Khinda town pages.**
   - The tape running out from the LARGO case to the Seminole hook is new as an object.
   - The interaction is the same one Mike town `TClose` and Khinda city `Distance` use for the same content: a line from
     base to town that draws with the scroll, with the town marker appearing on arrival.
   - This is the same class of finding as R3's stamps minor. The build-year tape below it is new.
   - File: `town/TownFacts.astro`.
3. **Seminole tape label clipped at 1440.** The "SEMINOLE" tag above the hook is cut at the top by `.tm-run { overflow: hidden }`.
   - The hook also covers the "6" mark, and the year thumb sits over "POLYBUTYLENE YEARS" at 1985.
   - Evidence: widgets/seminole-label-clipped-1440.png, sections/seminole-tape-1440.png.
4. **Job pad swipe does not work on touch.** NOTES and the header promise a horizontal swipe.
   - On a 390 touch run the browser fires `pointercancel` straight after `pointerdown`, because `.jp` has
     `touch-action: auto`. The page never turns.
   - Next/Back, the tick row and the arrow keys all work, at 1440 and 390, motion on and reduced.
   - `touch-action: pan-y` on the pad would fix it.
   - Evidence: widgets/pad-swipe-390.txt.
5. **AreasFacts with reduced motion still draws the fog.** The header says "No JS / reduced motion: no fog".
   - Under reduced motion each figure stays fogged until tapped (the tap clears it at once).
   - The same facts are always readable in the text under each pane, so nothing is lost. Still, FIX-R3 asks for "reduced
     motion static and complete".
   - Evidence: reduced/areas-facts-fogged-*-rm.png.
6. **WhProcess storyboard at 1440.**
   - With the whole strip on screen (strip bottom at about 94 % of the viewport), panels 03–04 are still half or not drawn,
     and their captions are blank.
   - They complete only when the strip bottom reaches 80 %. A reader who stops there sees two empty panels.
   - An earlier `data-end` would help.
   - Evidence: sections/wh-process-mid-1440.png.
7. **OwQuotes "New construction" photo is motion-blurred** (`job-rough-in.jpg`, an IG video frame). It is real and has no face,
   but it is the weakest image on the page.
   - The header comment still says "six jobs" (code only).
8. **Lighthouse Accessibility is 96 (R3: 100).** This is not a new defect:
   - Home WhyUs has `<article role="tabpanel">`, flagged by `aria-allowed-role`. The R3 runs failed it too, but Lighthouse
     12.8 now weights it. A `<div>` fixes it.
   - The hero proof row and plate contrast failures change from run to run (2.9 / 3.0 / 3.4:1), which means they are
     captured mid-fade. axe after settling is clean.
9. **Open item for Kody (carried over).** Home Process "Price before any work / You hear the price and the plan first" is
   still unconfirmed, as the fixer notes.
   - Reviews support it loosely (Parker L: estimate the same day; Cary Cannon: "explained everything clearly… without
     overcharging").

## Changed sections vs Mike, Khinda and other Glass sections (code read)
I compared against Mike (origin/claude/project-thread-59bfrz, 125 component files) and Khinda (origin/claude/project-thread-me9wb4,
99 files). I read their headers and grepped for the mechanisms: keypad, `<canvas>`/destination-out, `type="range"`, rotateX
page flips, scroll clip-path windows, `data-scrub-path` and pathLength drawings, checkerboards.

- **Home Process, job pad** (click/tick/keys turn top-bound pages; CSS 3D rotateX). No match.
  - Mike `ANext` is one calendar page swinging on scroll, with nothing to touch.
  - Mike `TearOff` tears strips off a flyer. Mike `Tickets` and `FinalCta` are work orders and a form.
  - Khinda `Process` is current along a wire; Khinda `SvProcess` is a cable through studs.
  - Glass `WhWhy` is a scroll-unfolding leaflet and Glass `Crew` is a single card flip. Both are related paper/3D skins but
    different interactions. OK.
- **WhProcess, storyboard** (4 panels whose line drawings draw on scroll). No match.
  - Mike and Khinda draw strokes on scroll in many places, but always as a pipe, cable or leader line running between
    things: Mike `Process`, `Jet`, `OCase`, `AWork`; Khinda `Distance`, `Work`, `Proof`.
  - No panel strip anywhere. The Glass home Process no longer uses a pipe. OK.
- **/about hero, arched window**. No match.
  - Mike `AHero` is a logo in hex halos; Mike `AVan` is van doors; Khinda city `Owner` is pointer parallax.
  - Mike `RouteMap` uses a clip-path circle on a map, not a photo window. OK.
- **/about keypad**. No keypad in Mike or Khinda (grep "keypad|number pad" empty; Khinda `HubDial` is a rotary symptom
  dial). The in-site likeness to ConHero is minor 1.
- **AreasFacts, fogged panes** (canvas wipe). Neither Mike nor Khinda has a `<canvas>`.
  - Khinda `Rules` is a tablist with a clip-path page wipe; there are no tabs here now.
  - Glass `home Areas` is a split-flap board. OK.
- **TownFacts, tapes**. The year range is new: the only other range input is Khinda `SvPricing`, which prices a job.
  - The distance tape's scroll behaviour is minor 2.
- **OwQuotes quilt**: job photo + review checkerboard. Nearest are Mike `OWall` and Khinda `Work` (photo walls). Different,
  as R3 found. OK.

## Faces, names and claims in the changed text
- **Faces and names.**
  - The only single face among the changed sections is the /about hero selfie. The section carries no name: the lead says
    "A Florida-licensed plumbing contractor and his crew".
  - The next section opens with "The owner holds…". The name "Glass, Dakota K" appears only on the DBPR licence card,
    further down and off the same phone screen.
  - The OwQuotes photos (state heater, rough-in, vanity, supply lines) show no faces: a hand at most (widgets/owquotes-job-photos.jpg).
  - Each photo appears once on /our-work and nowhere else in `src/` (grep). The selfie is also used on /our-work `OwCta`,
    which is a different page and is fine.
- **Claims, checked against research/ and src/data.**
  - 217 ppm and chloramine: PCU CCR, LOCAL-FACTS 4.
  - 1978 median: third party, labelled.
  - Helene 6.5 ft at Clearwater Beach: axios, LOCAL-FACTS 5.
  - Permits city or county: LOCAL-FACTS 3.
  - 5.9 mi: Gazetteer, towns.ts.
  - Polybutylene 1978–1995 and "many insurers limit it": third party, labelled "Florida-wide", "no count for Seminole".
  - "Active on DBPR": FACTS-CHECK 6.
  - "Number on the van": BRAND-AUDIT.
  - "3 of the 16 reviews … next day": as before.
  - OwQuotes quotes are checked as substrings at build time; I also spot-checked Kevin Kelleman, Parker L, Seth Nye and Cary
    Cannon by hand.
  - No prices, years in business, response times or phone-answerer claims were added.

## Keep list
- **Home Emergency wheel**: turns with the scroll. The valve group transform goes from 0° to about 40° to about 75° at 1440,
  and from 0° to about 52° to about 96° at 390. It is static under reduced motion.
  - Evidence: log.json `home-wheel-*`, sections/home-emergency-*.png.
- **Seam "How a job goes" → Emergency**: the ink band still ends in the meniscus wave into the white Emergency section.
  - Evidence: sections/home-seam-1440.png, -390.png and the reduced versions.
- **Home estimate, walked by click (1440) and tap (390), motion on and reduced.**
  - Next with nothing picked stays on step 1 ("Pick the closest one").
  - Picking a problem → step 2. Town + when → step 3.
  - An empty submit marks 2 fields aria-invalid.
  - Name + phone → https://glass-plumbing-largo.vercel.app/thank-you (4 of 4 runs).
  - Evidence: widgets/est-*.png.

## New widgets (1440 click, 390 tap, both reduced)
- **Job pad.**
  - Next turns one page and ticks one box, and the live region says "Step 2 of 5: We come out".
  - Tick 04 jumps there. Only the top page is not inert.
  - ArrowRight goes to 05 and Home goes back to 01. Swipe fails (minor 4).
- **Storyboard.** 0 → 2 → 4 panels turn on with the scroll and all captions end at opacity 1. Reduced motion: drawn and
  shown at once.
- **Keypad.**
  - The display types the number with the scroll.
  - Dialling 7275120673 gives "That's us. Tap Call."; another number gives "Not our number. Ours is (727) 512-0673."
  - Clear works. The call link is `tel:+17275120673`.
- **Fog.** The pointer wipe clears a pane at 1440. A tap clears one at 390. The keyboard "Wipe" button works, and "Wipe all
  four" clears 4 of 4.
- **Tape.** The tape transform goes from −794 px to −643 px to 0 at 1440. End sets 2020 ("Outside…"), and 1990 gives
  "Inside the 1978–1995 window…".
- **Quilt.** Hover lifts the matching review. Every tile links to a service page.

## Function
- **13 routes × 4 widths × motion and reduced = 104 runs.** Every run: status 200, 0 console errors, 0 page errors and 0 px
  horizontal overflow (checked while walking each page). axe (wcag2a, aa, 21aa, 22aa) was run at 1440 and 390 after a slow
  walk down and back and a 2.5 s settle: 0 violations everywhere.
  - Evidence: crawl-axe-overflow.json.
- **Lighthouse mobile, live home** (`npx -y lighthouse@12` → 12.8.2, Chromium /opt/pw-browsers, `--headless --no-sandbox`):

  | Run | Performance | TBT | LCP | Speed Index | FCP | CLS |
  |---|---|---|---|---|---|---|
  | 1 | 96 | 40 ms | 2.3 s | 4.2 s | 1.4 s | 0 |
  | 2 | 96 | 40 ms | 2.3 s | 4.1 s | 1.4 s | 0 |
  | 3 | 96 | 60 ms | 2.3 s | 4.3 s | 1.4 s | 0 |

  - **Median 96** (R3: 91).
  - Accessibility 96 (see minor 8), Best Practices 100, SEO 69 (noindex, expected).

## Could not check
- Real iOS and Android Safari: Chromium emulation only. The touch-swipe result comes from CDP touch events.
- A full keyboard tab-order walk of every page.
- Sections this round did not touch were judged only through the axe, overflow and console crawl, not re-reviewed one by one.
- No Figma, no npm install. axe-core and Lighthouse came from the npx cache and npx.

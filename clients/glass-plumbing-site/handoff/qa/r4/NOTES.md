# R4 fix notes (FIX-R3 majors + minors)

Not committed, not deployed. Screenshots in this folder: `NN-<item>-1440.png`, `-390.png`, and `-rm` (reduced motion) for each.
The full nearest-match reasoning is written in each component's header comment.

## Majors

### 1a. Home Process: THE JOB PAD (`src/components/home/Process.astro`)
- **What changed.** The section is now a steel binding bar over five top-bound ruled pages, one per step.
  - Turn pages with Next/Back, the "No surprises" tick row (5 buttons, `aria-current="step"`), arrow keys, Home/End, or a horizontal swipe.
  - Turned pages flip up over the binding. Inactive pages are `inert`, and a live region announces the step.
  - Without JS, all five pages are shown as a plain list.
  - Texts are unchanged, including the permit hedge and "Price before any work" (still for Kody to confirm).
  - The section is still ink with the same bottom padding, so the seam into Emergency works.
- **Nearest match.** Mike about ANext (a wall calendar where one page swings on scroll, with nothing to touch) and Mike FinalCta/Tickets. Neither is a pad you turn page by page with a tick row. Nothing in Khinda or Glass is close.
- **Source.** 21st.dev "3D Journal Page Carousel" (id 44662) + "Photo Deck" (id 46730).
- **Shots.** 01-home-process-1440 / -390 / -1440-turned / -390-turned / -rm.

### 1b. WhProcess: THE STORYBOARD (`src/components/water-heaters/WhProcess.astro`)
- **What changed.** Four comic panels in an ink frame: Photo of the label → The visit → Swap or repair → Test.
  - Each line drawing draws itself as the strip scrolls (kit scrub `data-scrub-path`, one window per panel). Its caption lifts in when the drawing completes.
  - The permit hedge, "3 of the 16 reviews we hold mention the next day" and Parker L's estimate line are kept.
- **Nearest match.** The home Process (now a pad you turn), Glass pipes (WhRelated, WhDiy), Mike's pipe Process and CaseFile, and Khinda SvProcess. None is a strip of panels that draw themselves.
- **Source.** 21st.dev "Line Draw SVG" (id 18352) + "Sketchbook Reveal Card" (id 7217).
- **Shots.** 02-wh-process-*.

### 2. Kody's card flips only on home Crew; /about's final section is THE KEYPAD (`src/components/about/AboutCall.astro`)
- **What changed.** The business card was removed from /about.
  - The new close is a steel phone keypad. Its ink display ("Line open · 24/7") types our number as you scroll.
  - Its 12 keys let the visitor type a number. At 10 digits it answers "That's us. Tap Call." or "Not our number. Ours is (727) 512-0673."
  - Below the keypad: the red Call button, Clear, and a "Text a photo" link.
  - The "tap the card" pill that covered the 24/7 strip was on the /about card, so it is gone with the card. Home Crew's hint sits below the card and covers nothing.
- **Nearest match.** Glass /contact ConHero (a switchboard for choosing a channel, not a keypad). No keypad in Mike or Khinda.
- **Source.** 21st.dev "Number Pad" (id 3711) + "PIN Keypad Unlock" (id 22111).
- **Shots.** 03-about-call-*.

### 3. /areas AreasFacts vs Seminole TownFacts: two devices, no shared facts
- **AreasFacts: FOGGED GLASS** (`src/components/areas/AreasFacts.astro`).
  - Four fogged panes you wipe with the pointer (tap or the "Wipe" button on touch and keyboard), plus "Wipe all four".
  - The facts are City or county / 217 ppm / 1978 / 6.5 ft. Each one's sentence and source show under its pane at all times.
  - The canvas is built only when IntersectionObserver fires.
  - Source: 21st.dev "Scratch To Reveal" (id 1508) + "Scratch Card" (id 29938).
- **TownFacts: THE TAPE MEASURE** (`src/components/town/TownFacts.astro`).
  - A tape runs out from the LARGO case to the "Seminole" hook as you scroll (5.9 mi).
  - A build-year tape (1950–2020) hatches the polybutylene years 1978–1995. A native range input sets "Built in" and the verdict, both announced through aria-live.
  - 217 ppm and the storm fact were removed from TownFacts. 217 ppm still appears in the Seminole FAQ, which is unchanged; flag it if that also counts as a repeat.
  - Source: 21st.dev "Marks Slider" (id 29217) + "Time Ruler" (id 40126).
- **Nearest match.** Glass home Areas (a split-flap board), ConHero keys, and each other. Neither one repeats the other's device.
- **Shots.** 04-areas-facts-*, 05-seminole-facts-*.

### 4. /about hero: THE WINDOW OPENS (`src/components/about/AboutHero.astro`)
- **What changed.**
  - The eyebrow, H1, lead, call button and licence line CFC1432488 are all centred.
  - The crew selfie sits centred below them, inside an arched window that opens to the full photo as you scroll (clip-path driven by a scrub `data-scrub-ft`).
  - No name sits beside the photo. Reduced motion or no JS shows the photo fully open.
- **Nearest match.** Glass AboutRecord and the home Hero (static photo housings). Nothing in Mike or Khinda uses a scroll-opened window.
- **Source.** 21st.dev "Scroll media expansion hero" (id 1932) + "Video Scroll Hero" (id 7512).
- **Shots.** 06-about-hero-*.
- **Related text change.** AboutRecord now reads "The owner holds Florida licence…" so no name sits beside the single face.

## Minors
- **WhWhy at 390.** On mobile the leaflet panels now tip away from the viewer (rotateX) instead of swinging sideways, so they stay inside the screen edges. Shots: 07-wh-why-390, 07-wh-why-390-mid.
- **Unconfirmed lines removed.**
  - WhPricing "price for your layers" is now "Every layer changes the job. Text a photo of your heater label, or call to ask about yours." The WhTypes foot was changed the same way.
  - /services "We leave it clean." is now "Named in 2 of 16 reviews." with "Reviews mention the clean-up afterwards."
  - ConForm "Send it to Kody" is now "All set. Send the job."
  - Shots: 11-, 12-, 13-.
- **OwQuotes job tiles.** Four real job photos, cropped from crew IG posts below the burnt-in captions:
  - state-heater, rough-in, vanity, supply-lines
  - Files are in `src/assets/photos/job-*.jpg`. None is used elsewhere on the site, and none shows a face.
  - The section is now 4 pairs (it was 6), because only four unused, faceless job photos exist.
  - A note says the photos show the same kind of job, not the reviewer's home.
  - Shots: 08-ow-quotes-*.
- **AboutCrew.** The fill bars were removed. It now reads plain "Named in N of 16 reviews". Shots: 09-about-crew-*.
- **RevOwner.** Dimmed words are now #686C6F (about 4.6:1 on frost) instead of opacity .16. Shots: 10-rev-owner-*.

## Kit change
`kit/scrub.ts` gained `data-scrub-ft` (a JSON `{from,to}` fromTo tween in its window). It is documented in `kit/README.md`.

## Checks (preview build)
- `npm run build`: passes. `npm run check:links`: passes.
- axe (wcag2a/aa, 21aa, 22aa):
  - 0 violations on /, /services/water-heaters, /about, /areas, /areas/seminole, /our-work, /reviews, /services and /contact, at 1440 and 390, with motion and with reduced motion.
  - Two fixes in this pass: the hidden tick labels (now visually hidden, not display:none) and the polybutylene label colour (now ink).
  - AboutRules `.br-n` flagged only mid colour-transition. It passes once the fill finishes. That section is unchanged.
- Horizontal overflow: 0 at 390, 768, 1024 and 1440 on all nine pages.
- Console errors: 0 on all runs.
- Small JS (AreasFacts canvas, the keypad, Process) starts behind IntersectionObserver or on first use.
- Lighthouse: not re-run in this pass.

## Open for the lead
- "Price before any work" (home Process) still needs Kody to confirm.
- The Seminole FAQ still mentions 217 ppm, which is also on /areas.
- OwQuotes is 4 pairs. More job photos would let it go back to 6.

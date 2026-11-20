# R5 fix notes (re-check R4 minors 1-8)

Base: commit 397cfed. Not committed, not deployed. Minor 9 (Home Process "Price before any work") still waits on Kody and was
not touched. Screenshots are in this folder: `NN-<item>-<width>[-rm][-state].png`. Measured values are in `log.json`, and
the crawl is in `crawl-axe-overflow.json`.

## 1. /about ending: THE POOL FLOOR (`src/components/about/AboutCall.astro`)
- **What changed.** The keypad is gone. The number is now laid in mosaic tile on the floor of a wide, shallow pool, like a
  pool's depth marks, with a "24/7" tile under it.
  - **Material and layout.** Water over white floor tile inside a frost stone coping. There is no steel, no rivets, no
    offset plate, no screen, no status label and no keys.
  - **Scroll.** The water is choppy as the pool comes up the screen (the number wobbles) and settles flat by mid-screen.
    The scroll drives this through a kit scrub `data-scrub-ft` on the SVG feDisplacementMap scale.
  - **Touch.** Moving the pointer through the water, or tapping it, drops rings at that point and bends the number for
    about a second. The rAF loop runs only while a ripple is fading.
  - **On the edge.** The red Call button, "Save to contacts" (a real vCard download with name, number and email) and "Text
    a photo".
  - **No JS / reduced motion.** Still water, a sharp number, no ripples and no hint. The three buttons still work.
- **Nearest match and why it differs.**
  - Glass /contact ConHero: a steel switchboard with a display and channel keys. This has no device at all.
  - Glass AreasFacts: a canvas you wipe clear. Here nothing is cleared; the water only moves.
  - Mike kit Wave and the Glass meniscus seam: section edges, not a surface you touch.
  - Mike RouteMap / TClose "ripple": a pin pulse on a map.
  - Mike drain PhoneCta: a giant static number.
  - Khinda contact: a bell and drawers.
  - Checked by grep in Mike's and Khinda's component code for ripple, pool, mosaic, feTurbulence, feDisplacement,
    vcard and pendulum/hanging tags. There is no water surface or tiled number on either site.
  - I dropped the hanging-tag idea first because Mike (Family, ConHours) and Khinda (lockout tags) have swinging tags.
- **21st.dev.** "Ripple Distortion" (id 7753) + "Ripple Buttons" (id 26809), rebuilt without WebGL.
- **Shots.** `01-about-pool-{1440,390}[-rm]`, `-choppy` (mid-scroll) and `-ripple` (after a touch).

## 2 + 3. Seminole distance tape (`src/components/town/TownFacts.astro`)
- **Minor 2: the scroll no longer drives the tape.** You pull it.
  - Dragging the hook (pointer events, `touch-action: pan-y`) pulls the blade out of the LARGO case, and the case window
    counts the miles.
  - Let go past 85 % and the hook catches at SEMINOLE (5.9 mi). Let go earlier and the tape winds back into the case.
  - A click, tap, Enter or Space on the hook (a real button with `aria-pressed`) pulls it out or lets it wind back.
  - The blade is marked like a real tape: 0 at the hook, the miles counting back to the case.
  - When the bench first comes into view the hook gives one short tug as a hint. It is time-based, under 1 s.
  - Reduced motion and no JS: the tape is out and caught.
  - **Nearest match.** Mike TClose and Khinda Distance draw a line with the scroll. Glass's own year tape is a range
    input, but this one is a pull with spring-back.
  - **21st.dev.** "Slide Action Button" (id 29304).
- **Minor 3: nothing cut or covered.**
  - The run now clips only on the left (`clip-path: inset(-80px -120px -80px 0)` instead of `overflow: hidden`), so the
    SEMINOLE tag shows in full.
  - The blade ends at 5.9 at the hook, with no "6" mark, so the hook covers no number. Log: `hookCoversMark: []`, tag
    hit-tested on top.
  - The "Polybutylene years" label sits 16 px above the track (label bottom 669 px, thumb top 677 px at 1440).
  - The year numbers moved under the tape, out of the thumb's reach, so the thumb at 1985 no longer covers "1980" at 390.
- **Shots.** `02-seminole-tape-{1440,390}-start` (wound in), `-pulling` (2.9 / 3.2 mi), `-caught`, `-keyboard`, and
  `-rm-start`.
- **Measured.**
  - At 1440 (mouse) and 390 (CDP touch): a pull to 45 % reads 2.9–3.2 mi.
  - Release winds the tape back to 0. A pull to 95 % catches (p 1, 5.9 mi, tag opacity 1).
  - Enter toggles it.

## 4. Job pad swipe (`src/components/home/Process.astro`)
- **Fix.** `.jp-on .jp { touch-action: pan-y }`. Horizontal strokes are handled with pointer events: a 40 px sideways
  stroke, left = next, right = back. pointerup is heard on the window. Vertical strokes still scroll the page.
- **Header.** The comment now says a sideways swipe; it no longer says up / left.
- **Measured.** 390 CDP touch: swipe left → "Step 2 of 5", left again → step 3, right → step 2. Shot `03-pad-swipe-390-left`.

## 5. /areas fog under reduced motion (`src/components/areas/AreasFacts.astro`)
- **Fix.** Without `html.motion`, nothing is built: no canvas, no wipe buttons, no "fogged" lead and no "Wipe all four".
  The panes are clear glass.
- **Shots.** `04-areas-facts-*-rm` (clear) and `04-areas-facts-*` (fogged with motion).

## 6. Water heaters storyboard (`src/components/water-heaters/WhProcess.astro`)
- **Fix.** The scrub now runs from "top 98%" to "bottom 97%" (phone "top 92%" → "bottom 96%") with lag 0.35. Every panel
  finishes by 90 % of the pass, so all four panels are drawn while the strip is entering.
- **Measured at 1440.**
  - With the strip bottom at 94 % of the viewport, and again at 99 %: all 4 panels `is-on`, stroke offset 0, caption
    opacity 1.
  - At 390, with the bottom at 96 %: all 4 drawn.
  - Reduced motion: all drawn.
- **Shots.** `05-wh-storyboard-*-bottom94/99`.

## 7. /our-work blurred photo (`src/components/our-work/OwQuotes.astro`)
- **Fix.** No sharp, faceless job photo is left that is unused on /our-work. The only candidate,
  water-heater-softener-nolabel, is the same shot as a gallery photo. So the "New construction" tile (job-rough-in) is
  dropped.
- **Result.** The quilt is now three jobs: "Three jobs. Three customers' words."
  - Desktop: three columns, job over review / review over job / job over review.
  - Tablet and phone: alternating rows.
  - The header comment no longer says "six jobs".
- **Shots.** `06-ow-quilt-*`.

## 8. Lighthouse accessibility (`src/components/home/WhyUs.astro`)
- **Fix.** The tab panels are `<div role="tabpanel">`; they were `<article role="tabpanel">`, which `aria-allowed-role`
  flagged. The proper tablist pattern stays: tabs with aria-selected, aria-controls and roving tabindex.
- **Shots.** `07-home-why-*` (star 3 picked).

## Verification
- `npm run build`: OK, 14 pages. `npm run check:links`: OK.
- Crawl (`crawl-axe-overflow.json`): 6 changed routes (/, /about, /areas, /areas/seminole, /services/water-heaters,
  /our-work) × 1440 / 1024 / 768 / 390 × motion on / reduced = 48 runs, each walked down and back.
  - Every run: status 200, 0 console or page errors, 0 px horizontal overflow.
  - axe (wcag2a, aa, 21aa, 22aa) at 1440 and 390 after a 2.5 s settle: 0 violations.
- I looked at every screenshot in this folder myself.
- **Test artifacts, not bugs.**
  - The scripted `page.click` on the tape hook in the 390 touch context does not toggle it (`tape-click-windback` in
    log.json). A real tap does: a separate CDP tap run went 0 → 1 → 0.
  - The 390 element shots of tall sections show the sticky header / skip link where Playwright scrolled.
- **Not checked.** Real iOS and Android devices (Chromium emulation only), and Lighthouse (not re-run).

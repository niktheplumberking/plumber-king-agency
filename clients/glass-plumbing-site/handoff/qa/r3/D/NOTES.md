# Fix round 3, fixer D (home, reviews, about, our-work, contact, faq), 20 Nov 2026

Checked with my own build (`astro build --outDir <scratch>`) served on port 4391, Playwright Chromium at 1440 and 390,
motion on and reduced motion. `npm run build` and `npm run check:links` both pass (14 pages, 0 missing links).
No horizontal scroll at 390 / 768 / 1024 / 1440 on index, reviews, about or our-work, with motion on or reduced.
No console errors.
axe (wcag2a/aa/22aa) is clean on index, reviews, about and our-work at 1440 and 390, with motion on and reduced, once
transitions settle. While a transition is still running, axe reports colour contrast on the fading review panel; this is
transient.
Not committed, not deployed.

Screenshots in this folder:
- `<page>-<width>-<nn>-<class>.png`: every section, motion on.
- `reduced/`: the changed sections with reduced motion.
- `w-*.png`: widget states (picked star, uncapped pen, card back, table turned, quilt hover) at 1440 and 390, motion on
  and reduced (`-rm`).

## BLOCKER 1. /reviews hero: name next to a single face
- **What I did:**
  - Replaced the face photo (crew-selfie) behind the slip deck with the finished-shower job photo (shower-remodel). No
    face appears anywhere in the hero now, so the slips that name Kody or Zach no longer sit under a face.
  - Swept every page I own for a name (Kody, Zak, Chase, "owner") in the same visual group as a single face. That
    found and fixed:
    - /about Proof: the reel shows one crew member, and the cards next to it quoted "Kody is one of those guys" and
      "Kody and Zak". Both quotes are swapped for review lines that name nobody (Cary Cannon, Michael Marks).
    - /about On the record: the Instagram grid had the crawlspace face next to the lead "Kody holds…". That tile is now
      the whole-house filters photo.
    - Home hero: the lead "Kody, Zak and the crew fix…" sat beside two single-face photos. It now reads "From Largo, the
      Glass crew fixes…" (the meta description is unchanged).
- **Nearest match:** none. This finding is a removal.
- **21st.dev:** not used.
- **Screenshots:**
  - reviews-1440-00-cx-sec.png, reviews-390-00-cx-sec.png
  - about-1440-04-bproof.png, about-1440-01-brec.png
  - index-1440-00-hero.png

## BLOCKER 2. /about at 390: the "Kody Glass, Owner" card above the face
- **What I did:**
  - Moved the business card out of the hero into the last section of the page (BLOCKER 2 and MAJOR 5 share one fix).
    At every width the card and the face are now several sections apart.
  - Kept Nick's fixes: the hero photo is still centred (focus 52% 80%), and the card still shows its whole logo (the
    same two-window crop of the photo).
  - Beside the call button, the hero now shows "Florida licence CFC1432488 · active on DBPR".
- **Nearest match:** see MAJOR 5.
- **Screenshots:**
  - about-1440-00-bhero.png, about-390-00-bhero.png
  - about-1440-06-bcall.png, about-390-06-bcall.png

## BLOCKER 3. /our-work hero copied Mike's film strip
- **What I did:** built the Turntable (our-work/OwHero.astro):
  - Ten tiles stand in a 3D ring on a steel base. Five are job photos with no faces (manifold, water heater with
    expansion tank, the van, a tank heater, the rough-in tape). Five are ink spec tiles holding facts that are on
    record: based in Largo FL, licence CFC1432488, 34 posts read 17 Nov 2026, Pinellas County, the handle.
  - Scrolling turns the ring while the hero is on screen. A drag or swipe spins it and it settles on the nearest tile.
    The arrow buttons and arrow keys step it, and the readout names the tile in front.
- **JS:**
  - One passive scroll listener, gated by an IntersectionObserver, writes one CSS variable per frame. It does no layout
    reads.
  - The drag reads the pointer only.
- **Reduced motion:** no scroll turn, and steps are instant.
- **No JS:** the ring stands still and all captions are in an sr list.
- **Other change:** removed the old LCP preload from pages/our-work.astro. It pointed at the film-strip size, and Base's
  preload does not handle box crops.
- **Nearest match:** Mike OHero is a flat 35 mm strip with sprockets. Mike OWall and Khinda Work are photo walls or
  trays. Glass home RealWork is a horizontal rail, and Glass home Emergency is a valve wheel that turns on scroll. Mine
  is a 3D ring of tiles on a base, which none of them uses.
- **21st.dev:** "Tweenly Curved Carousel" (@mirukullacode, id 39852: posters on a cylinder turned by scroll and drag)
  and "3D Carousel" (@cult-ui, id 1529). Adapted to CSS 3D and vanilla TS, and re-skinned with steel, rivets and ink
  spec tiles.
- **Screenshots:**
  - our-work-1440-00-cx-sec.png, our-work-390-00-cx-sec.png
  - w-ourwork-turn2-1440.png, w-ourwork-turn2-390.png (and the `-rm` versions)

## BLOCKER 4. Home "Why us" fridge door copied Mike's AFamily
- **What I did:** built "Five stars. Open each one." (home/WhyUs.astro):
  - The 5.0 rating is drawn as five large stars, and each star is a tab holding one whole Google review, word for word
    (Kevin Kelleman, Michael Marks, Cody Weaver, Seth Nye, Peter Van Buskirk; quote() checks the full text at build).
  - The picked star lifts and is full of gold. The others hold a little less, like glasses filling. A notch on the
    paper card points at the picked star, and the card shows that review's own stars, date and profile.
  - On first view the five stars fill one after another.
  - The head shows both Google profiles (5.0 · 104 and 5.0 · 77), never added together.
- **JS:** about 1 KB: a click and key handler, plus one IntersectionObserver that disconnects after the first fill. The
  fridge's drag code, which was part of the Lighthouse blocking time, is gone.
- **Nearest match:**
  - Home Reviews: two housings and three cards.
  - /reviews hero: a dealt deck.
  - Mike home Reviews: a spotlight carousel.
  - Khinda Thermo: a ring that snaps to answers.
  - None of these uses the rating stars themselves as the control.
- **21st.dev:** "Star Rate" (@ham7a311, id 43963) and "Star Rating" (@arihantcodes, id 29301).
- **Screenshots:**
  - index-1440-05-why.png, index-390-05-why.png
  - w-home-why-star4-1440.png, w-home-why-star4-390.png

## MAJOR 5. /about: the crew list twice, and "one of these picks up"
- **What I did:**
  - Kept "The names in the reviews" (AboutCrew) as the one crew list. Its lead no longer says "who you'll talk to"; it
    now reads "Here are the names customers use in their reviews, and what they say."
  - Rebuilt AboutCall as "Keep the card. One number, any hour." Kody's real two-sided card is large and centred. It
    tilts toward the pointer with a soft light that follows (fine pointers with motion only) and turns over on a tap. A
    pill on its lower edge says what to do. Below it are "Line open · 24/7" and the call and text buttons.
  - The second Kody / Zak / Chase list, "Named in N of 16", the "Ringing" switchboard and "one of these picks up" are
    all gone.
- **Nearest match:**
  - Glass home Crew also flips this card, but there it sits over the van photo inside the crew section. Here it is the
    whole centred CTA, with tilt.
  - Mike's CTAs are a tear-off flyer, a hex swell, a road sign and a wall calendar. Khinda's are a wall switch and a
    viewfinder.
  - I dropped a steel tray under the card because /our-work's CTA already has a shelf.
- **21st.dev:** "Holographic Business Card" (@aakashmehra, id 44447: tilt, lift, flip on click).
- **Screenshots:**
  - about-1440-06-bcall.png, about-390-06-bcall.png
  - w-about-card-back-1440.png, w-about-card-back-390.png

## MAJOR 6. The review-slip deck twice
- **What I did:**
  - The deck stays only in the /reviews hero.
  - /our-work "What customers say" is now the Job Quilt: six jobs, each next to what its customer wrote, set as a
    checkerboard of ink job tiles and paper review tiles. The rows run J Q J Q, then Q J Q J.
  - Pointing at or focusing a job lifts its review on a powder offset and fills its stars. The other reviews' stars
    fade, but their text keeps full contrast.
  - Each job tile links to its service page.
  - This section runs no JS: the interaction is CSS `:has()`. Every quote is checked word for word at build.
- **Nearest match:** /reviews RevList is a moving three-column wall, home Reviews is three cards, and Mike OWall and
  Khinda Work are photo walls. None pairs jobs with reviews on a checkerboard.
- **21st.dev:** "Checker Quilt Testimonials" (@kedhareswer, id 38036). I used it without portraits, so no face sits
  next to a name.
- **Screenshots:**
  - our-work-1440-04-cx-sec.png, our-work-390-04-cx-sec.png
  - w-ourwork-quilt-hover-1440.png

## MAJOR 7. /reviews theme tally matched Mike's
- **What I did:** built "Their words, marked up" (reviews/RevMention.astro):
  - Every sentence people wrote about these themes is set as one run-on page of ruled paper, word for word, each
    followed by its reviewer.
  - Six marker pens lie across the top edge of the page. Each pen's cap carries its real count: fair price 6,
    professional 6, on time 5, same or next day 4, explained 2, cleaned up 2.
  - Uncapping a pen sweeps its marks into the page, and the sentences that do not say it step back to the muted grey,
    which still gives about 6:1 contrast.
  - The count is never drawn as a bar, a fill or "N/16": you see the marks themselves.
  - The build fails if a sentence is not word for word or if two marks overlap.
- **Nearest match:** Mike home Reviews is a tally list, Mike RevPattern is tapes on a pipe, and Glass RevOwner is one
  line lit on scroll. None marks a page of text with pens.
- **21st.dev:** "Text Highlighter" (@danielpetho, id 18773) and "Marker Highlight" (@kapishdima, id 12045).
- **Screenshots:**
  - reviews-1440-01-cx-sec.png, reviews-390-01-cx-sec.png
  - w-reviews-pen-ontime-1440.png, w-reviews-pen-ontime-390.png

## MAJOR 8. Instagram posts credited to Kody
Each credit now names the account only:

| Where | Before | After |
|---|---|---|
| Home Crew | "Kody, on @glassplumbingservices" | "Posted on @glassplumbingservices" |
| /reviews RevOwner eyebrow | "Owner's words" | "From our Instagram" |
| /reviews RevOwner caption | "Kody, on Instagram" | "Posted on @glassplumbingservices" |
| /about record quote | "Kody, on Instagram" | "Posted on @glassplumbingservices" |
| /our-work Stories (shower valve) | "Kody, on Instagram" | "Posted on @glassplumbingservices" |

A sweep of the built HTML of all 6 pages now finds no "Kody, on" and no "Owner's words".

## MINOR 9. "We leave it clean" and "often next day"
- **Home Services:**
  - The water heater card used to say "often next day". The desktop text now reads: Tank and tankless. Repairs, swaps
    and new installs. One review: “called and had one installed the next day”.
  - The mobile text is now "Tank and tankless, repairs to new installs."
- **Home Process:**
  - Step 5 was "Fixed, tested, cleaned up / We test it with you and leave it clean". It is now "Fixed and tested / We
    test it with you before we go".
  - Jacob Gars' "clean the bathroom spotless" stays as the step's review quote.
  - The lead "to a clean floor" is now "to the finished job".
- **FAQ data:** "Often the next day" for a new water heater is now "It depends on the job and the unit", followed by the
  same review quote.
- **Found during the sweep:** "A real plumber picks up" (the /contact hero eyebrow and the /faq list side) claimed who
  answers the phone. They now read "Call or text · 24/7" and "Not here? Call or text us, any hour."

## Kept untouched
The sections Nick praised (keep list) are untouched, apart from the text fixes listed above:
- home Emergency and its wheel
- the seam between How a job goes and Emergency
- About How we work
- the FAQ sections
- home Estimate
- the footer
- the Contact questions flip cards

## Open / could not do
- **/about hero:** without the card it is copy plus button plus licence line on the left, and the centred photo on the
  right. That is close to the text-left / photo-right shape Nick dislikes. He never called this hero slop, but the
  re-check may.
- **Turntable at rest:** after a scroll the ring can rest between two tiles, because the scroll turn is continuous. Steps
  and drags snap to a tile.
- **Not re-measured:** Lighthouse mobile. Removing the fridge's drag code should cut the WhyUs share of blocking time.
  The Base/motion share belongs to fixer E.
- **Out of scope:** "Kody or the crew calls you back" and "Send to Kody" on home Estimate and the /contact form. These
  are keep-list sections and are not about a face. Fixer E or the lead should decide if they count as "who answers the
  phone".

MIKE'S PLUMBING (Riverside): FIX ROUND 1, FULL PLAN. This replaces any earlier version.

This is our hottest prospect. The site is already strong. This round is about making it controlled, full of proof, and bug-free on every page, on desktop and on mobile.

Nick reviewed the preview himself. A second project then checked every point live on https://mikes-plumbing-riverside.vercel.app and in your code (branch `claude/project-thread-59bfrz`, folder `clients/mikes-plumbing-site/`).
Labels used below: FACT = measured or read in the code. INFERRING = the likely cause, which you verify before fixing.

EVIDENCE: fetch `claude/project-thread-qxh25n` and read `clients/mikes-plumbing-site/handoff/fixes-r1/evidence/`. It has screenshots and the Playwright probes `route3.cjs`, `ld.cjs`, `nav2.cjs` and `curt.cjs`. Rerun them after your fixes as proof.

======================================================================
PART 0. WHAT NICK IS REALLY ASKING FOR
======================================================================
Read this first. It is the "why" behind every fix, and it goes into your skills (Part F).

1. CONTROLLED MOTION, ALWAYS. Every change of state is a continuous move from 0 to 100% and back: page curtain, accordion, colour change, pipe fill, loader, slider. Nothing pops, jumps, appears out of nowhere, swaps in one frame, or stops halfway.
   When Nick says "linear", he means smooth ease-in-out (it speeds up gently, then slows down gently), not a mechanical constant speed.
   A layer that suddenly shows up (the beige "water" in pipes) or a colour that flips in one click reads to him as a bug.
2. SHOW THE PROOF, DON'T LINK TO IT. A section about trust shows the real reviews on the page. "Read them on Yelp" alone is empty. Empty space next to a claim is wasted proof: the water heaters reviews, the reviews hero, and the emergency Yelp badge.
3. OBJECTS MUST MAKE PHYSICAL SENSE. A sign hangs from 2 straight cables. Tags hang from the pipe, not from above it. Pipes don't belong on a road map. Icons without labels mean nothing. A tear-off strip should tear. A phone showing a video should play it.
4. CLEAN SEAMS AND EDGES. Nothing touches a wave. Colours meet cleanly where sections meet (photo vs wave). The footer is one colour, aligned to the grid, with breathing room above it.
5. INTERACTION AND LIFE. Hover states everywhere, a few playful interactions (tear-offs, video play), small idle gestures. The visitor plays with the site, but every motion stays calm and in a clear order.
6. EVERY PAGE IS A SHOWCASE. Our Work and Reviews are what Mike will look at most. Their heroes must not look like every other page. Use 21st.dev or Pinterest for ideas, translated into Mike's brand (ink, tan, Abril/Oswald/Archivo/Yesteryear, hex nut, stamp, pipe).

======================================================================
GROUND RULES
======================================================================
- Nick's rules here win over Figma where they clash. Log every deviation in the README: what Figma shows, what the site does now, and why.
- Keep the preview noindex. Launch nothing, post nothing, sign up for nothing.
- No claims without a source:
  - Never "24/7": write "Open 24 hours (Yelp)", including on the tear-off strips.
  - Reviews word for word.
  - No licence, no prices.
- Figma: one agent at most, about 3 calls in total, everything cached.
- Agents: at most 2 builders at once, plus 1 independent reviewer who did not build.
- Nothing counts as done until Part D passes and the reviewer agrees.

======================================================================
PART A. ROOT CAUSES (fix these first, then most bugs disappear together)
======================================================================
A-1 FOUR KITS (FACT). Parallel builders each wrote their own copy of the same parts:
- Wave: `home/`, `b3kit/`, `kit-b4/`, `services/kit/` (plus `global/WaveRule.astro`)
- scrub: `home/scrub.ts`, `b3kit/scrub.ts`, `kit-b4/scrub.ts`, `services/kit/scrub.ts`
- 2 to 3 copies each of Btn and Eyebrow

So one bug lives in 4 places. Merge into ONE shared kit in `src/components/kit/`: Wave (with clearance), Marquee, Accordion, Scrub (pipe/route fills), Curtain/Loader, Hover and Idle. Leave the other components alone and list them under "noticed, not done". After merging, take before/after screenshots of every page at 1440 and 390, diff them, and fix anything you did not intend to change.

A-2 PIPE AND ROUTE FILLS JUMP (FACT on the Home map, INFERRING for the rest).
- On the Home route map, `route3.cjs` shows each route's `strokeDashoffset` jumping 1 -> 0 with no in-between values: nothing at scrollY 7300, 2 routes at 7400, all 6 at 7500.
- The same pattern (`pathLength=1` + a `strokeDashoffset` tween with scrub) drives:
  - the Reviews "pattern" pipe (`RevPattern.astro`);
  - the Contact pipe (`ConHours.astro .hs-water`, whose CSS also starts it FULL: `stroke-dashoffset: 0`);
  - the Home seam pipes.
- Nick sees "a beige layer appears in the pipe out of nowhere" on Reviews and Contact. That is this bug.
- Fix once, in the shared Scrub:
  - use DrawSVG (as Paul does), or verify the interpolation;
  - the CSS start state must equal the JS start state (empty), so nothing flashes;
  - read no layout during scroll;
  - compute start/end only after fonts, images and zoom have settled (refresh once).
- Test: sample 10 scroll positions on every scrubbed path and require values strictly between 0 and 1 in the middle of the range.

A-3 PAGE CURTAIN GLITCH (FACT, `curt.cjs`).
- `.pt-panel` has a CSS `transform: translateY(105%)`. `curtainOut()` then tweens GSAP `yPercent` 105 -> 0 on top of it. GSAP reads the CSS transform as `y: 945px` and adds the `yPercent`, so the panel starts at 1890 px and ends at about 945 px, which is still below the viewport.
- What Nick sees:
  - the wave edge peeks up and stops ("coming up slightly, then it stops");
  - the next page then shows the panel already full (`html.pt-in`, `transform:none`), which is the "boom, it's all over my screen";
  - then the panel lifts.
- Fix: one channel only. No CSS transform on the panel; GSAP sets `yPercent: 100` at boot and animates only `yPercent`. The close must reach 100% coverage before navigating, and the next page starts from exactly that covered state. One continuous ease-in-out cover, then one continuous reveal.
- Test: sample the panel's top edge every frame. It must be monotonic from 900 to 0 (with no stall over 50 ms), and on the new page monotonic from 0 to -height.

A-4 ACCORDIONS SNAP (FACT, `ui.ts accordions()` + `home/Faq.astro`).
- The open look (ink background, 200 px tall, big title) is styled on `[open]`. The new row gets `[open]` instantly. The old row only animates its `.acc-body` height for 380 ms, stays black, then snaps shut. So two rows are black at once, then one jumps.
- Nick sees this on the Home FAQ and on the Corona town FAQ.

A-5 HASH LINKS LAND MID-PAGE (FACT, `nav2.cjs`).
- Plain links already land at y=0.
- More than 30 links like `/services#drains`, `#leaks` and `#commercial` (rows, footer, FAQ, the "Related" band) jump into the middle of the page. "Services from Home" landed at y=1544.

======================================================================
PART B. EVERY FIX, PAGE BY PAGE
======================================================================

--- SITE-WIDE ---
B1. MOTION SYSTEM (Nick's #1 point). Every animated change is a tween with ease-in-out (`sine.inOut` or `power2.inOut`, 0.5 to 0.9 s). That covers background and text colour, height, position and opacity, all in the same timeline. Banned:
- `display` toggles mid-animation;
- class swaps that change colour with no transition;
- `.set()` jumps that can be seen;
- CSS defaults that differ from the JS start state.
Write this rule at the top of MOTION.md.

B2. PAGE TRANSITIONS: fix A-3. Make the curtain the same family as the new loader (B3).

B3. LOADER: NEW, NOT PAUL'S.
- FACT: `global/Loader.astro` describes itself as "Mike's version of Paul's beats", and Mike has seen Paul's site.
- Use 21st.dev "Swiss Poster Counter Preloader" (id 35248, `slat-count-preloader` by kedhareswer) as the base, adapted to Mike:
  - ink background, tan and bone slats (they read as pipe sections);
  - the slats count 000 -> 100 while the page loads;
  - Mike's hex badge small, top-left;
  - "Friendly · Transparent · Proficient" in Oswald;
  - at 100, 8 horizontal blinds slide off, alternating left and right.
- Backup: "Stack Loader" (id 27426), with his real job photos.
- Port it to vanilla TypeScript + GSAP (no React, no WebGL, under 8 KB of JS). Once per session, skippable, max 3.4 s, none under reduced motion.
- The in-site curtain becomes the same 8 blinds: close in from both sides, then open.
- HANDOFF (FACT, `ld.cjs`): today the hero starts 0.45 s into a 1.05 s lift, while about half the screen is still covered. Change it so the header and hero timeline start only in the exit's `onComplete`, once the last blind is fully off-screen. Shorten the exit to about 0.7 s. Lenis starts at that same moment.

B4. A NEW PAGE ALWAYS OPENS AT THE TOP (fix A-5).
- Link to the real pages where they exist: `/drain-cleaning`, `/water-heaters`, `/emergency-plumber`.
- Drop the other cross-page hashes.
- Set `history.scrollRestoration = 'manual'` and call `lenis.scrollTo(0,{immediate:true})` under the curtain. Back and forward stay native.
- Same-page `#` links keep a smooth Lenis scroll.

B5. PARALLAX ON PICTURES, NOT HEADINGS.
- FACT: you copied Paul's round-3 `parallax()`. It moves whole media columns, capped by the room around them, moves `.shead` ±24 px, and never moves a photo inside its frame.
- United does (FACT, `initAutoParallax`): every cover photo in a clipped frame drifts inside it. The img gets `scale: 1.14` and `translate` 0 -5% -> 0 5%, with scrub 0.6.
- Paul skipped this only because of his round-2 bug of three writers on one transform. United avoids that by using the separate CSS `scale` and `translate` properties, one writer each.
- Do United's in-frame drift on every cover photo except the hero at load, carousels and cut-outs. Entrances never touch the img; the clip reveal goes on the frame wrapper. Media columns move ±16 px. Headings move ±10 px max, or not at all. Stamps on photos lead by ±14 px.
- INFERRING: this is most of the "less smooth than Paul and United" feeling. Headless sampling showed 0 dropped frames on Mike's Home. Also check that no `ScrollTrigger.refresh` fires during a scroll (the body `ResizeObserver` calls it).

B6. SEAMS: NOTHING TOUCHES A WAVE.
- The shared Wave gets a clearance zone. Content (text, buttons, cards, photos, bubbles, frame lines) stays at least 24 px (desktop) or 16 px (mobile) from the wave's actual curve at every x.
- Only named seam objects may cross a seam: pipes, bands, tape, valve, the flyer, stamps.
- Fix it with padding or by moving the item, never by flattening the wave.
- FACT cases, all fixed and then checked everywhere:
  - Services `#leaks`: the DM bubble sits on the next black wave.
  - Services hero: its double frame lines are cut by the paper wave.
  - Home Reviews -> "What Mike fixes": the word band's upper-left touches the dark wave. Lower ONLY the band until it clears by 12 px or more at every x.
  - Home FAQ -> "Free estimate": the band sits on question 06's bottom rule. Move ONLY the band down until it clears row 06 by 16 px or more at its highest point (the left end, because it is tilted).

B7. PHOTO MEETS WAVE (Services "Residential & commercial", Nick's screenshot).
- The black wave fill does not match the photo under it, so a hard band shows.
- Fix: run the photo UP behind the wave, so the wave is cut out of the tan section and shows the photo itself. Give the top of the photo a short ink gradient (`#0E0D0B` -> transparent) so the edge reads cleanly.
- If that cannot look clean, remove that wave (Nick allowed either).
- Check every place where a photo section meets a wave, on every page.

B8. EVERY BAND OF REPEATING WORDS MOVES.
- FACT: the Services tape in `Callout.astro` (`.ec-tape`, "Residential & commercial" -> "Emergency services") is static text, which reads as a stuck slider. The Home bands run on CSS keyframes, and nothing uses the `data-marquee` engine in `motion.ts`.
- Build one shared GSAP Marquee, like United's `initTickers`:
  - about a 40 s loop;
  - scroll velocity boosts it, then it eases back over 1.2 s;
  - pauses on hover and focus;
  - static under reduced motion;
  - seamless with 2 copies, no gap from 360 to 1920 px.
- Replace every band and tape on every page with it.

B9. ACCORDIONS (fix A-4). One controller.
- A switch (e.g. 1 -> 3) is ONE timeline of about 0.7 s, ease-in-out:
  - the old row shrinks its height and fades its background from the open colour back to the closed colour while its title scales down;
  - at the same time, the new row grows (FLIP: measure, then animate) and fades to the open colour;
  - the answer text fades in after 0.15 s.
- Never two open at once. A click mid-animation goes to the latest choice. `aria-expanded` stays correct, the keyboard works, reduced motion is instant, and native `<details>` works without JS.
- Apply it everywhere:
  - `home/Faq.astro`, `faq/FaqList.astro`, `town/TFaq.astro`, `legal/Legal.astro`;
  - the mobile footer columns, mobile menu `details`, mobile services rows and mega menus.
- Inventory first: `grep -rn "<details\|aria-expanded\|data-acc" src`.

B10. FOOTER, every page.
- (a) The wavy rule with the hex sits only 8 px under the section above (FACT, `.ft-in padding-top: 8px`). Give it real room (about 64 px desktop, 40 px mobile of ink above the rule) and check every page's last section.
- (b) The bottom bar is darker (`#0E0D0B`) than the footer (`#151410`) (FACT). Use one colour.
- (c) Privacy · Terms ends at x 1294; the grid ends at 1320 (FACT). Right-align it to 1320.
- (d) Add the giant "MIKE'S", cut in half by the bottom edge, from YOUR earlier design (Figma page `481:437`, footer of home `595:438`; one screenshot + one design-context call, cached). Full-bleed, Abril Fatface, tan on coal, aria-hidden. At 390 it is full width with no horizontal scroll.

B11. HOVER AND IDLE LIFE.
- Every card, row, tag, stamp and strip responds to hover on fine pointers.
- One `idle.ts` scheduler: every 5 to 7 s (random), play ONE small gesture (0.4 to 0.8 s) on ONE element that is in view, in order of importance:
  - the black "5.0 · 20 reviews on Yelp" badge shakes;
  - a stamp re-thumps;
  - a hex nut turns 60°;
  - the valve gets a quarter turn;
  - a drip falls;
  - the dial needle twitches;
  - a tag sways.
- Never on text, never the same element twice in a row.
- Pause while scrolling, on hover, on form focus, when the tab is hidden, and under reduced motion.

B12. ENTRANCES: MORE VARIETY.
- Keep Paul's engine, the 3 groups (G1 +0, G2 +0.15 s, G3 +0.3 s) and the no-flash rules.
- Give each section the entrance of its object:
  - ticket: drops in with a slight rotation;
  - nameplate: slides in, then its bolts pop;
  - tags: swing;
  - polaroids: tossed in;
  - map: unfolds from the Riverside pin;
  - dial: the needle sweeps;
  - index rows: a rule draws, then the text rises;
  - review stubs: tear in;
  - bands: slide in from the side.
- At most 2 types per section, and neighbouring sections differ. Record the map in MOTION.md.

--- HOME ---
B13. ROUTE MAP (fix A-2).
- One timeline per visible map: desktop and mobile each get their own via `gsap.matchMedia`. Today the hidden mobile SVG's 6 routes run in the same loop, which gives 12 paths.
- Scrub 0.8 from about `top 75%` to `center 40%`.
- Sequence: the Riverside dot pulses, then route 1 draws from Riverside to its town. When it arrives, the town dot pops and its black tag slides out. Then the next route.
- Order the routes by distance: Corona, Moreno Valley, Murrieta, Buena Park, Los Angeles, West Hollywood.
- The map fade-in finishes before route 1 starts.
- Lines are 3 px, ink, dash 10/8.

B14. "HOW A JOB GOES": when the water passes stop 02 going forward, the red valve plays one spin of about 2 s: it speeds up (+180°, about 0.6 s), then slows to a stop (+360°, about 1.4 s, `power3.out`). It may replay on the next forward pass. FACT: the wheel is hidden under 1024 px, so on mobile the stop-02 hex nut turns instead.

B15. FAMILY TAGS.
- FACT: the strings start about 15 px above the pipe centreline. Start them at the centreline, behind the pipe, with a small ring.
- Make the numbers 01/02/03 big enough to fill the tag's empty space (about 96 to 140 px desktop, outlined or tan-dark). They must not overlap the text, and they scale down on mobile.
- Entrance: the tags drop and swing, settling in about 1.2 s.

--- SERVICES HUB ---
B16. B6 (leaks bubble, hero frame), B7 (photo vs wave), B8 (the tape).

B17. "04 AROUND THE HOUSE" PHONE.
- Add a big play button. Clicking it plays the video inside the phone frame; ended or clicked again, it replays.
- FACT: there is NO video file in the repo, only a still from his IG post. Do NOT rip the video from Instagram. Build the player, load the official Instagram embed of that post on click (lazy, nothing loads before the click), and put "send us the clip file" on the Mike-to-confirm list. When the file arrives, it plays natively.

--- WATER HEATERS (template for every service page) ---
B18. REVIEWS SECTION (FACT, `Slips.astro`): 2 quotes, with the left column under the heading empty. Rebuild it with many more of the 20 Yelp reviews, word for word, the ones matching water heaters or general quality first.
- Idea from 21st.dev: "Testimonials Vertical Marquee" (32621) or "Infinite Testimonials Scroller" (22106).
- Translated to Mike: two or three columns of his paper slips drifting slowly in opposite directions, pausing on hover, with the heading and the 5.0 badge pinned on the left.
- Mobile: one slow column, or swipeable slips.

B19. "RELATED" BAND (FACT, `RelatedFit.astro`): three black pipe fittings (elbow, tee, coupling) used as icons with no meaning, and "Leak detection" goes to a hash. Make it readable:
- a short label ("More from Mike");
- each link is a clear card or row with a one-line description of the service (from PAGES-COPY) and a hover;
- fittings only as small decoration, if at all;
- real page links.
- Same component on every service page.

--- EMERGENCY PLUMBER ---
B20. Left Yelp block ("When it couldn't wait until morning"): the "5.0 · stars · checked 17 Nov 2026" badge sits awkwardly. Redesign the left column so the badge is part of the composition and interactive (hover, the idle shake from B11), and show 1 to 2 real emergency-type reviews word for word.

B21. "What counts as an emergency?": add a hover on each of the 5 items (lift, icon or nut turn, underline).

B22. TEAR-OFF STRIPS (mini-game).
- All 10 strips show a clear dotted tear line. The one on the right keeps "Take one".
- Clicking or tapping a strip tears it: it bends at the dotted line, comes off with a small rotation and drop, and fades over about 0.6 s, as if pulled by hand. Gone strips stay gone.
- When all 9 are torn, they come back gently, one by one: fade plus a slight zoom-in (0.95 -> 1), staggered.
- The strip text says "Call now · (951) 809-9533" or "Open 24 hours (Yelp) · Free estimate". NOT "24/7".
- Keyboard: Enter tears. Reduced motion: no tearing animation, the strips stay.
- The phone link still works with a long press or the visible call button.

B23. The line between the last section and the footer is too close (B10a).

--- REVIEWS PAGE ---
B24. HERO: show proof in the hero. Today it is a heading plus "Read them on Yelp".
- Put real reviews into the hero (word for word): a stack or a slowly drifting wall of Mike's paper slips with name, initial and town.
- The 5.0 / 20 Yelp badge stays.
- Idea: "Hero Preview Walls" (9228, a rotating card stack) in Mike's slips.

B25. "THE PATTERN" (Communication / Fair price / Clean work):
- the hex nut on the right pipe is out of place: align it to the pipe's turn as in Figma;
- the beige layer that pops in the pipe at about halfway is A-2: fix it in the shared Scrub so the water fills continuously with the scroll.

B26. SPOTLIGHT: make it a carousel of review notes. Every 5 s, the current paper (with the review and the "Mike's Plumbing Services · Est 2025" stamp) slides out to the left while the next paper slides in from the right, ease-in-out, about 0.9 s. It pauses on hover and focus. Add arrows and dots for control, and swipe on mobile. Reduced motion: no auto-advance.

B27. ALL 20 REVIEWS LIST: guide the eye while reading.
- As each review crosses the reading line (about 40% of the viewport), it brightens to full, its key phrase gets a tan underline that draws in, and the others ease back to about 70%.
- Hover lifts the card slightly and draws the underline.
- Keep everything readable at 100% under reduced motion.

--- OUR WORK ---
B28. HERO: redesign. Today it looks like the other heroes, and the white paper with the black logo on the right does not fit.
- Find a stronger layout (21st.dev, Pinterest) in Mike's language, e.g. a contact sheet or film strip of his real job photos with the stamp landing on it, or a big "every job gets the stamp" with photos fanning out.
- Check that it repeats no other hero on the site.

B29. "EVERY JOB GETS THE STAMP" WALL (FACT: 4 masonry columns on desktop, 2 on mobile).
- On scroll, columns 1 and 3 drift up and columns 2 and 4 drift down, gently (about ±40 to 60 px over the section's pass, scrub 0.6), so no photo is hidden or cut.
- Reference: 21st.dev "Parallax Grid Scroll" (id 1224) and "Testimonials Vertical Marquee" (32621).
- Mobile (2 columns): ±20 px.
- Filter chips keep working (refresh after a filter).

--- CONTACT ---
B30. HANGING "OPEN 24 HOURS" SIGN (Riverside block):
- (a) 2 cables, not 4, going straight up from the sign to the pipe.
- (b) It "glitches with left and right movement at certain moments". Find the second writer (pointer sway plus scroll swing on the same property is the likely cause) and keep ONE motion: a gentle pendulum that settles.
- (c) The beige pipe layer that appears as the sign moves is A-2: `.hs-water` starts full in CSS. Fix it in the shared Scrub.
- (d) The steps read "1 01 02 03" all at once. Tidy the layout: one clear numbered list, aligned, with real spacing.

B31. FOOTER SPACING on this page (B10a).

--- CORONA (template for every town page) ---
B32. FAQ: B9.

B33. MAP: the pipes drawn from Riverside to Corona make no sense on a map. Replace them with dashed driving-route lines drawn on scroll (the same component as B13), with the Corona pin popping.

======================================================================
PART C. WHAT IS MOST LIKELY TO FAIL (and the guard for each)
======================================================================
1. HIGHEST RISK: merging the 4 kits breaks pages in small ways. Guard: per-page before/after screenshot diffs at 1440 and 390, fixed before moving on.
2. New interactions fight the scroll: carousel, tear-offs, review highlighting, the column drift on the wall. Guard: one writer per CSS property per element. Document who owns `transform`, `translate`, `scale` and `opacity` on each animated element.
3. Scrubbed pipes and routes still jump at some widths (zoom 1280 to 1439, tablet). Guard: the A-2 sampler at 1440, 1280, 1024, 820 and 390.
4. The curtain, loader and hero order regresses on slow networks. Guard: run `ld.cjs` and `curt.cjs` with throttled CPU (4x) and network (Fast 3G).
5. The accordion FLIP breaks FAQ text layout or the FAQPage schema. Guard: answers stay in the DOM, JSON-LD unchanged, and the Rich Results test is clean.
6. The idle scheduler feels busy, or fires on mobile while someone reads. Guard: in view only, paused while scrolling and on focus, one at a time.
7. The loader port hurts LCP. Guard: the hero stays painted underneath, and Lighthouse mobile LCP is 2.5 s or less with CLS 0.
8. Mobile falls apart (bands, carousels, tear-offs, wall columns, the footer "MIKE'S"). Guard: a full pass at 390 and 360, not just desktop.
9. A fact slips in during the review rebuilds (a "24/7" or a paraphrased review). Guard: a build-time check that every displayed quote is a substring of `src/data/reviews.ts`, plus a grep for "24/7", "licensed" and "$".

======================================================================
PART D. WHOLE-SITE QA
======================================================================
Cover every page in the sitemap (incl. every town page and the 404) at 1440 and 390, plus 1920, 1280, 1024, 820 and 360 for layout.
D1. A clean build, `check:links` 0 broken, console clean, axe 0 violations (reduced motion), and a keyboard path through every menu, accordion, carousel, tear-off and form.
D2. `scripts/check-seams.mjs`: sample every wave curve every 8 px. Report content within 24 px (desktop) or 16 px (mobile), and bands against their neighbours. Target 0 on every page.
D3. `scripts/check-marquees.mjs`: every band moves when in view (x changes by more than 20 px per second), pauses on hover, shows no gap at 360, 390, 1440 and 1920, and is static under reduced motion.
D4. Navigation: from every page to every main nav target, after scrolling 2500 px, the new page shows scrollY 0. The curtain edge moves monotonically, with no stall over 50 ms. Back and forward are native.
D5. Loader: the first hero tween starts only after the cover has fully left the viewport. Max 3.4 s. Skip works.
D6. Motion: Paul's sampler (MOTION.md section 0). Nothing is invisible in view for more than 0.3 s, and nothing is left hidden after a fast scroll. No property changes in one frame by more than 30% of its range, except on purpose (a sampler at 60 fps).
D7. Scrubbed paths: values strictly between 0 and 1 in the middle of the range on every page. The valve spins once per forward pass. The dial sweeps.
D8. Accordions: on every instance, click 1 -> 4 while sampling every 50 ms: never two open, colours tween continuously, and a double click ends on the latest choice.
D9. Interactions: the tear-off cycle (tear 9, all 9 come back), carousel auto-advance plus pause plus swipe, the play button on the phone, and the wall columns drifting without cutting photos.
D10. Parallax: list the drifting photos per page. No edge gaps at either end. Headings ±10 px max.
D11. Footer: same colour, aligned to the grid, room above the rule, "MIKE'S" present. Checked on every page at 1440 and 390.
D12. Lighthouse mobile on Home, a service page, a town page and Reviews: LCP 2.5 s or less, CLS 0, SEO 100.
D13. Fix every failure, rerun only what failed, then hand the result to the independent reviewer. That agent did not build, checks every page against this prompt, Figma and the facts files, and records each finding with a screenshot. Fix those findings, then redeploy the same preview URL (noindex).

======================================================================
PART E. SEND NICK
======================================================================
- The preview link (same URL).
- A before/after pair for each fix B1 to B33, at 1440 and 390.
- The QA table D1 to D13 with numbers.
- The reviewer's verdict.
- The skills diff (Part F).
- A "Mike to confirm" update: the video clip for B17, plus the existing items.
- Anything NOT done, and why, in plain words.

======================================================================
PART F. LEARN IT (pk-brain: `pka-site-craft` + `pka-client-site`)
======================================================================
Merge these into the existing sections, delete what they replace, and add no duplicates or clashing rules. Show Nick the diff in one message before you commit.

1. CONTROLLED MOTION: every state change is one continuous ease-in-out tween from 0 to 100%. Nothing pops or snaps, no layer appears unannounced, no colour flips in one frame. "Linear" from Nick = smooth ease-in-out. Prove it with a frame sampler, not by eye.
2. PROOF ON THE PAGE: any trust section shows real reviews word for word. No empty columns beside claims. Links to Yelp are extra, never the proof itself.
3. PHYSICAL LOGIC: objects behave like the real thing (hanging = 2 straight cables from the pipe; tags hang from the pipe's centre; tear-offs tear; phones play). No decoration that means nothing (unlabelled icons, pipes on maps).
4. SEAMS: nothing within 24/16 px of a wave curve. Photo sections meet waves with a matched edge. Footer: one colour, on the grid, room above. `check-seams` runs in every QA.
5. ONE KIT BEFORE PARALLEL BUILDERS: Wave, Marquee, Accordion, Scrub, Curtain, Hover/Idle. Builders never write their own copies.
6. MOVING BANDS: every band of repeating words is a moving GSAP marquee with a velocity boost and a hover pause.
7. PICTURES CARRY PARALLAX (United's in-frame drift with separate `scale`/`translate`). Headings ±10 px max. One writer per property.
8. LOADER AND CURTAIN: new for each client, from that client's motif, sourced on 21st.dev. One transform channel. The page starts only once the cover is fully gone.
9. NAVIGATION: a new page always opens at the top. No cross-page hash links.
10. INTERACTION AND LIFE: hover on everything interactive; one or two playful interactions per site (tear-off, play, carousel); idle gestures every 5 to 7 s, in view only, paused while reading.
11. SHOWCASE PAGES (Our Work, Reviews) get their own hero idea; the site-wide repeat check covers heroes too.
12. Verify scrubbed SVG and pipe fills by sampling values in the middle of the scroll.

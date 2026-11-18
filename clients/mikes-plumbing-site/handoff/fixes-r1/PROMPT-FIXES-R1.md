Mike's Plumbing (Riverside): fix round 1 on the built preview, a whole-site QA for the same bug classes, and the lessons written into your skills. I checked two pages. Every point below was checked live on https://mikes-plumbing-riverside.vercel.app and in your code on branch `claude/project-thread-59bfrz`, `clients/mikes-plumbing-site/`, by a second project. Labels: FACT = measured or read in code; INFERRING = the likely cause.

EVIDENCE: fetch `claude/project-thread-qxh25n` and read `clients/mikes-plumbing-site/handoff/fixes-r1/evidence/`. It holds screenshots at 1440 and the Playwright probes `route3.cjs`, `ld.cjs` and `nav2.cjs`. Rerun those probes after your fixes as proof.

GROUND RULES
- These fixes win over Figma where they clash. Log every deviation in the README (Figma vs now, and why).
- Keep the preview noindex. Launch nothing, post nothing, sign up nothing.
- Figma: at most 1 agent and about 3 calls in total, and cache what you fetch.
- Agents: max 2 builders at once, plus 1 independent reviewer at the end who did not build.
- Nothing is "done" until the QA in part C passed and the reviewer agrees.

ROOT CAUSE FIRST (FACT, from your file tree)
The site was built by parallel builders. Each one wrote its own kit:
- Wave: `home/Wave.astro`, `b3kit/Wave.astro`, `kit-b4/Wave.astro`, `services/kit/Wave.astro`, plus `global/WaveRule.astro`
- scrub: `home/scrub.ts`, `b3kit/scrub.ts`, `kit-b4/scrub.ts`, `services/kit/scrub.ts`
- Btn and Eyebrow: 2 to 3 copies each

So the same bug lives in 4 places, and a fix in one never reaches the others. Before you fix anything, merge only these pieces into ONE shared kit in `src/components/kit/`:
- `Wave` (with a built-in clearance, see A6)
- `Marquee` (A7)
- `Accordion` (A13)
- one `scrub.ts` (map routes, pipe, dial, valve)

Leave the rest alone. List it under "noticed, not done".

PART A: THE FIXES (Nick's list, with what is really wrong)

A1. Parallax: put it on pictures, not headings, and make it feel like United.
- FACT: your `parallax()` is Paul's round-3 version. It drifts whole media columns by up to ±36 px, but caps each one by the free room around it. Section heads (`.shead`) drift +24 to -24 px. Photos never move inside their frame.
- United does the opposite (FACT, `clients/united-plumbing-site/src/scripts/motion.ts`, `initAutoParallax`). Every cover photo in a clipped frame drifts INSIDE the frame: the img gets `scale: 1.14`, `translate` goes from 0 -5% to 0 5%, with scrub 0.6. That is the "alive pictures" feel Nick means.
- Paul skipped this only because of his round-2 glitch: three writers on one img `transform`. United never had that glitch, because it uses the separate CSS `scale` and `translate` properties.
- Do:
  1. Use United's in-frame drift on every cover photo, except the hero at load, carousels and cut-outs. Write it through the img's own `scale` and `translate` properties, with one writer each.
  2. Entrances must never touch the img. The clip reveal goes on the frame wrapper.
  3. Keep the media-column drift, but small (±16 px).
  4. Cut heading drift to ±10 px max, or none.
  5. Stamps and hex nuts that sit on photos may lead by ±14 px.
- Prove it: zero photos with a visible edge gap at the extremes (screenshot each at top and bottom of its pass).

A2. Smoothness compared with Paul and United.
- FACT: headless frame sampling on Home 1440 found 0 frames over 33 ms on Mike, and 26 on United. So Mike does not drop frames in headless.
- INFERRING: the "less smooth" feeling comes from A1 (photos that don't move) and from entrances that all look the same (A11), not from Lenis. Your Lenis settings already equal United's.
- Check on a real GPU run, if you have one:
  - no `ScrollTrigger.refresh` fires during a scroll (your `ResizeObserver` on body calls refresh when the height changes);
  - no layout reads in scroll callbacks;
  - `scrub.ts` `flow()` calls `getPointAtLength` every frame: cache 600 points once and use those.

A3. Route map on Home ("Service ticket" map): draw from the red dot, in order, on scroll.
- FACT: `route3.cjs` shows every route's mask `strokeDashoffset` jumping 1 -> 0 with no in-between values. At scrollY 7300 none of the routes show; by 7400 two show and by 7500 all six. The map itself is still fading in (`data-fx="fade"`) at the same time.
- You also run the hidden mobile SVG's 6 routes through the same loop: 12 paths, and the start offsets are indexed across both.
- Do:
  1. Build ONE timeline per visible map, using `gsap.matchMedia` so desktop and mobile each get their own, scrubbed (scrub 0.8) over the map's pass, from about `top 75%` to `center 40%`.
  2. Order: the Riverside dot pulses, then route 1 draws from Riverside to its town. When the route arrives, the town dot pops (back.out) and its black tag slides out. Then route 2, and so on.
  3. Order the routes by distance: Corona, Moreno Valley, Murrieta, Buena Park, Los Angeles, West Hollywood.
  4. The map fade must finish before route 1 starts.
  5. Use DrawSVG on the solid mask path, or check that `pathLength=1` and the mask actually interpolate. Sample 10 scroll positions and assert values strictly between 0 and 1.
  6. Lines must be readable: 3 px desktop, dash 10/8, ink.

A4. Footer: the giant "MIKE'S" cut in half, on every page.
- FACT: `Footer.astro` has no big wordmark (see evidence).
- Take it from YOUR earlier Mike design: Figma page `481:437`, footer of home `595:438`. That is one `get_screenshot` plus one `get_design_context`, cached.
- Full-bleed, cut by the bottom edge, in the site fonts and colours (Abril Fatface, tan on coal), aria-hidden.
- At 390 it must also be full-width with no horizontal scroll.
- It is one global component, so it lands on every page at once. Check every page anyway.

A5. Band between the Home FAQ and "Free estimate / Got plumbing problems?"
- FACT (evidence): the tilted band's top edge sits on the bottom rule of question 06.
- Move ONLY the band down on Y (Nick's words), until it clears row 06 by 16 px or more at its highest point. Remember it is tilted, so measure the left end. Change nothing else.

A6. NOTHING may touch a wave seam, anywhere (Nick's rule). Two cases are already FACT:
- services `#leaks`: the white DM bubble (Mike's IG text) sits on the black wave of the next section;
- services hero: the hero's double frame lines are cut by the paper wave under them.
- Do: give the shared `Wave` a clearance zone. Content (text, buttons, cards, photos, bubbles, frame lines) must stay 24 px or more (desktop) and 16 px or more (mobile) away from the wave's actual curve at every x. Measure against the curve, not the SVG box.
- Only designed seam objects may cross: pipes, bands, tape, ticker, valve, the flyer, stamps. They sit above both sections and are listed by name.
- Fix by adding section padding or moving the item. Never by flattening the wave.

A7. Every band of repeating words must MOVE, the same way everywhere.
- FACT: the services tape between "Residential & commercial" and "Emergency services" (`services/Callout.astro`, `.ec-tape`) is static text with no animation, so it reads as a stuck marquee.
- FACT: the Home bands use a CSS keyframe (80 s), while `motion.ts` has a `data-marquee` engine that nothing uses.
- Do: one shared `Marquee` driven by GSAP, the way United's `initTickers` works:
  - a loop of about 40 s;
  - scroll velocity boosts it, then it eases back over 1.2 s;
  - pause on hover and focus;
  - static under reduced motion;
  - a seamless loop with 2 copies, so there is no gap at any width from 360 to 1920.
- Replace every band and tape with it, on all pages.

A8. Band between Reviews and "What Mike fixes" ("Same day / Very clean / Upfront and honest…").
- FACT (evidence): its upper-left edge touches the dark wave above.
- Lower it a few px until it clears the wave by 12 px or more at every x. Change nothing else.

A9. "How a job goes": the red valve wheel spins when the water passes stop 02.
- When the scrubbed fill crosses stop 02 going forward, play a one-shot spin of about 2 s: speed up linearly (about 0.6 s, `none` ease, +180°), then slow to a stop (about 1.4 s, `power3.out`, +360°).
- It may replay on the next forward crossing. Scrolling back does not spin it backwards.
- FACT: the wheel is `display:none` under 1024 px. On mobile, spin the stop-02 hex nut instead.

A10. Family tags: really hang from the pipe, with huge numbers.
- FACT (evidence): the strings start about 15 px ABOVE the pipe centreline, so they poke out over the pipe.
- Do:
  1. Each string starts at the pipe's centre, behind the pipe (z-index under it), with a small ring or clamp where it meets the pipe.
  2. Make the tag numbers 01/02/03 big, so they fill the empty space in each tag (about 96 to 140 px desktop, Abril or Oswald, outline or tan-dark). They must not overlap the tag text, and scale down on mobile.
  3. Entrance: tags drop and swing on their strings (a pendulum that settles over about 1.2 s).

A11. Entrances: more variety, the same quality.
- Keep Paul's engine, the 3 groups (G1 +0, G2 +0.15 s, G3 +0.3 s), and the no-flash rules.
- Give each section an entrance that suits its object, not the slide-up every time:
  - job ticket / CTA: drops in with a slight rotation and settles;
  - nameplate: slides in, then its bolts pop;
  - tags: swing (A10);
  - polaroids: tossed in with rotation;
  - map: unfolds with a clip from the Riverside pin;
  - dial: the needle sweeps;
  - services index rows: a rule draws left to right, then the row text rises;
  - reviews: ticket stubs tear in;
  - bands: slide in from the side.
- Rules: at most 2 entrance types per section, and no two neighbouring sections use the same main type. Write the map in `MOTION.md`.

A12. Idle life (new; neither Paul nor United has it).
- One scheduler, `idle.ts`. Every 5 to 7 s (random), pick ONE eligible element that is in view and play one small gesture of 0.4 to 0.8 s:
  - the black "5.0 · 20 reviews on Yelp" badge does a short shake;
  - a stamp re-thumps;
  - a hex nut turns 60°;
  - the valve wheel gets a quarter turn;
  - a drip falls;
  - the 24h dial needle twitches;
  - one family tag sways.
- Hierarchy: badges and stamps first, decoration second, never body text or headlines. Never the same element twice in a row.
- Pause while scrolling, on hover, while a form field has focus, when the tab is hidden, and under reduced motion.
- Add hover states where they are missing: every card, row, tag and stamp responds to hover on fine pointers.

A13. FAQ (Nick, just now): the double black row.
- FACT (`ui.ts accordions()` + `home/Faq.astro`): the black open state is styled on `[open]`. A click opens the new row instantly (black at once), but the old row only animates its `.acc-body` height for 380 ms. It stays `[open]` (black, 200 px tall, big title) until then, and only then snaps shut. So for a moment two rows are black, and then one jumps.
- Do: one `Accordion` controller in which the switch is ONE timeline of about 0.5 s (`power3.inOut`):
  - the old row collapses its height and fades ink back to paper while the new row expands and fades paper to ink;
  - the title size and layout change is animated FLIP-style (measure, then animate);
  - the answer text fades in after 0.15 s.
  - Never two black rows at once.
  - A new click mid-animation goes straight to the latest choice.
  - `aria-expanded` stays right.
  - Keyboard works.
  - Reduced motion = instant.
- Apply it to every click-to-open UX on the site:
  - `home/Faq.astro`, `faq/FaqList.astro`, `town/TFaq.astro`, `legal/Legal.astro` (`.lb-pill`);
  - the mobile footer columns, the mobile menu `details`, the mobile services rows that expand, and the mega menus.
- Inventory them first with `grep -rn "<details\|aria-expanded\|data-acc" src`.

A14. Loader: NEW, not Paul's, from 21st.dev, and gone before anything starts.
- FACT: `global/Loader.astro` says in its own header that it is "Mike's version of Paul's beats": ring, seal, stripes, words, pipe, then an ink panel lifts with a wave edge. Mike has seen Paul's site.
- FACT: the curtain on in-site links (`Curtain.astro`) is Paul's too.
- Use 21st.dev "Swiss Poster Counter Preloader" (id 35248, @kedhareswer, `slat-count-preloader`) as the base, translated into Mike's world:
  - ink background, tan and bone slats (the slats read as pipe sections);
  - the slats shunt into place to count 000 -> 100 while the page loads, with Mike's hex badge small top-left and "Friendly · Transparent · Proficient" in Oswald;
  - at 100, the screen splits into 8 horizontal blinds that slide off alternately left and right.
  - This is clearly not Paul's vertical lift.
  - Backup if it does not translate well: "Stack Loader" (id 27426), with Mike's real job photos stacking and spreading.
- Port it to vanilla TS + GSAP. No React on the page.
- Keep: once per session, skippable, max 3.4 s, reduced motion = none.
- Make the in-site curtain the same family: 8 blinds close in from both sides, the badge, then they open.
- HANDOFF (Nick: "the loader must fully leave the viewport before anything on the homepage starts"):
  - FACT: today the hero plays 0.45 s into a 1.05 s lift (`out.add(onHandoff, '<0.45')`). United does the same.
  - FACT (`ld.cjs`): the panel still covers about half the screen when the hero starts.
  - Change: the header + hero timeline starts only in the exit's `onComplete`, once the last blind is fully off-screen.
  - Shorten the exit to about 0.7 s so the total wait does not grow.
  - Lenis starts at the same moment. Nothing on the page moves before it.
- PROOF: `ld.cjs` must show the hero's first tween starting at or after the frame where the loader bounds leave the viewport.

A15. A new page always opens at the top.
- FACT (`nav2.cjs`): plain links already land at y=0. The jump is the HASH links: Home has 30 or more links like `/services#drains`, `#leaks` and `#commercial` (rows, footer, FAQ). Services from Home landed at y=1544 because of `#drains`.
- Do:
  1. Link to the real pages where they exist (`/drain-cleaning`, `/water-heaters`, `/emergency-plumber`). That is better SEO too.
  2. Remove the other cross-page hashes, so they land at the top of `/services`.
  3. Set `history.scrollRestoration = 'manual'` and `lenis.scrollTo(0, {immediate:true})` before the curtain lifts, on every navigation except browser back/forward (that stays native).
  4. Same-page `#` links keep a smooth Lenis scroll.
- Recheck with `check:links` and update the README.

PART B: WHAT COULD GO WRONG (and the guard for each)
1. Merging the 4 kits breaks pages that relied on one kit's quirks. Guard: per page, take before/after screenshots at 1440 and 390 and diff them. Any change you did not intend gets fixed before moving on.
2. In-frame drift shows photo edges, or fights the reveal. Guard: CSS `scale` 1.14 or more on the img only, the reveal clip on the frame only, and an edge-gap check at both ends of the drift.
3. Idle animations feel busy, or move while someone reads. Guard: one gesture at a time, in view only, paused while scrolling and on focus, and nothing on text.
4. The loader port adds weight or delays LCP. Guard: no React or WebGL, under 8 KB of JS. The hero stays painted under the loader for LCP. Lighthouse mobile LCP 2.5 s or less and CLS 0 after the change.
5. Moving the bands "a few px" pushes them into the next section's content. Guard: the seam checker (C2) runs on both sides of every band.
6. The accordion rewrite breaks the FAQ schema or no-JS use. Guard: the answers stay in the DOM, native `<details>` works without JS, and the FAQPage JSON-LD is unchanged.
7. Hash removal breaks internal links or anchors that other pages use. Guard: `check:links` shows 0 broken, and every `id` is still reachable on its own page.

PART C: WHOLE-SITE QA (every page in the sitemap incl. every town page and the 404, at 1440 and 390, plus 1920 / 1280 / 1024 / 820 / 360 for layout)
C1. Build a clean `npm run build`, `check:links` 0, console clean, axe 0 (reduced motion), and a keyboard path through every menu, accordion and form.
C2. Write `scripts/check-seams.mjs` (Playwright). For every wave seam, sample its curve at every 8 px of x. For every visible content box nearby, report any distance under 24 px (desktop) or 16 px (mobile). Do the same check for bands against their neighbours. It must report 0 on every page at 1440 and 390. Save the report.
C3. Write `scripts/check-marquees.mjs`. Every band or tape moves when in view (its x changes by more than 20 px in 1 s), pauses on hover, shows no gap at 360, 390, 1440 and 1920, and stays static under reduced motion.
C4. Navigation: from every page to every main nav target, after scrolling 2500 px, the new page has scrollY 0 after the curtain. Back/forward restores natively. Run it as a script and save its output.
C5. Loader and curtain: on Home and on one inner page, the first hero tween starts after the cover has left the viewport. Hidden time max 3.4 s. Skip works. With motion on, nothing is invisible in view for more than 0.3 s (Paul's sampler, MOTION.md section 0), and nothing is left hidden after a fast scroll.
C6. Scrubbed moments: route map values strictly between 0 and 1 at mid-scroll; the pipe fill is monotonic; the valve spins once per forward crossing; the dial needle sweeps.
C7. Accordions: on every instance, clicking 1 -> 4 never shows two open rows (sample every 50 ms), and a fast double click ends on the latest choice.
C8. Parallax: list the photos that drift, per page (target: every cover photo outside the hero, carousels and cut-outs). No edge gaps. Headings drift ±10 px max.
C9. Lighthouse mobile on Home, a service page and a town page: LCP 2.5 s or less, CLS 0, SEO 100.
C10. Fix every failure, rerun only what failed, then hand off to an independent reviewer agent. That agent did not build, checks every page against this list and the evidence, and reports its findings to you. Fix those, then redeploy the same preview URL (noindex).

PART D: LEARN IT (pk-brain skills, one merge, no duplicates)
Add these as short rules to `pka-site-craft` (motion and QA) and `pka-client-site` (process). Merge them into the existing sections and remove anything they replace, so there are no clashing rules. Show Nick the diff in one message before you commit:
1. One shared kit per site (Wave, Marquee, Accordion, scrub) BEFORE builders split pages. Parallel builders never write their own copies.
2. Seams: nothing touches a wave (24/16 px clearance from the curve). Only named seam objects cross. `check-seams` runs in every QA.
3. Every band of repeating words moves (one GSAP marquee with velocity boost, hover pause). A static tape reads as broken.
4. Parallax lives in pictures: United's in-frame drift via CSS `scale` + `translate` with one writer each. Headings ±10 px max.
5. A loader or curtain is new per client, built from that client's motif and sourced on 21st.dev. Never reuse another client's loader. The page starts only when the cover has fully left the viewport.
6. A new page always opens at the top. No cross-page hash links. Link to the real page.
7. Click-to-open UX switches in one timeline, never two open at once. One controller for every accordion on the site.
8. Entrances vary by object (max 2 types per section, neighbours differ). Idle life: one gesture every 5 to 7 s, in view only, paused while reading or scrolling.
9. Scrubbed SVG draws are verified by sampling values mid-scroll, not by eye.

SEND NICK
- the preview link (same URL);
- a before/after pair for each fix A1 to A15 at 1440 and 390;
- the QA table C1 to C10 with numbers;
- the reviewer's verdict;
- the skills diff;
- anything NOT done, and why, in plain words.

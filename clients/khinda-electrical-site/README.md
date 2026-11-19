# Khinda Electrical site (Surrey, BC)

Astro 5 static site built 1:1 from the approved Figma (file QbPRX8MU5AA6peTerdP5gg). Spec and rules:
`/mnt/project-files/plumber-king-agency/clients/khinda-electrical/handoff/BUILD-BRIEF.md`. Figma cache (no build part
opens Figma): `.../handoff/build-cache/INDEX.md`. Builders 2 and 3: read `BUILDERS.md`.

Preview: https://khinda-electrical-surrey.vercel.app (noindex: `X-Robots-Tag` in vercel.json + robots meta while
`PUBLIC_NOINDEX` is not `false`; robots.txt disallows all on preview builds).

## Run

```
npm install
npm run build          # dist/
npm run check:links    # every internal link resolves (0 missing)
node scripts/axe.mjs <path to axe.min.js> / /services/ ...         # axe-core A/AA + best practice, 1440 and 390
node scripts/qa-compare.mjs / 1440 <figma png> <outDir> name:y:h ...  # Figma | build side by side, reduced motion
node scripts/qa-tops.mjs 390                                        # built section tops / heights (compare with _index.json)
python3 scripts/qa-sbs.py <figma png> <build png> <out> <figY> <figH> <buildY> <buildH>
U=http://localhost:4611 W=1440 node scripts/motion-draw-sweep.cjs   # every drawn cable scrubs 0 -> 1, never backwards
U=http://localhost:4611 W=390 node scripts/motion-hidden-probe.cjs  # nothing hidden in view > 0.3 s; nothing left hidden after a fast scroll
```

Deploy (from the cloud, auth is injected by the proxy; the CLI gets a dummy token):
`npx vercel build --prod` then `npx vercel deploy --prebuilt --prod` in this folder (project `khinda-electrical-surrey`).

## Layout system

- Desktop sections are `.sec` with `--h` = the Figma section height; children `.ab` take `--x/--y/--w` in Figma px.
  From 1024 px up the page is the 1440 frame scaled with `html { zoom: width / 1440 }` (Base.astro).
- Below 1024: the 390 frames in flow. 360-390 fluid.
- Tablet 431-1023 (fix round 2, review M3): the 390 layout with `zoom = min(width / 390, 1.35)` (type stays at phone to
  small-tablet size, never the old 2x), in a centred column of at most 480 css px (648 px on screen). Each band paints its
  own background colour out to the screen edges (`--band` set by Base.astro + a border-image outset in global.css), so the
  page reads full width. `--vw100` = the column width (used by the mobile rules that size art to the frame: About pile, G5,
  footer wordmark). 391-430 is the 390 layout scaled to the width, as before. Checked at 600, 768, 820, 1000.
- `dn-m` hides on mobile, `dn-d` hides on desktop.
- Drawn objects (cables, power strip, panels, bulb, cable tray, G5 jacket...) are layers cut from the Figma page SVG with
  `build-cache/tools/art.py` into `src/art/*.svg`, placed by `kit/Art.astro`.
- Interactive parts (switches, legend breakers, map pins, testers) are HTML/CSS drawn to the Figma sizes, because their
  states move.

## Motion

Mike's `motion.ts` (Lenis + GSAP, `data-m-section`, `data-t`, `data-fx`, `data-stagger`, `data-count`, parallax,
loader once per session `ke-intro`, curtain `ke-nav`).

Khinda signatures are in `src/scripts/khinda.ts`:

- `[data-draw]` cables draw across the joins: Proof, Work to Why (join A), FAQ to the F MAIN breaker (join B).
- `[data-flips]` breakers flip ON.
- `[data-current]` process current, boxes and bulb.
- `[data-g5]` towns along the cable.
- `[data-wordmark]` footer KHINDA.

Section scripts:

- Services: tape bar and photo swap.
- About: draggable photo pile.
- Why: flex-grow outlet testers.
- Areas: a legend row pops its pin, cable and tag.
- FAQ: the wall plate is a tablist; arrow keys move between switches.
- F: panel schedule form.

Reduced motion shows everything static and complete, and the page works with no JS.

## Khinda to confirm (from the yellow Figma notes; none of this text is on the site)

Launch blockers:
1. TSBC licence number (utility bar + footer show only "TSBC LICENCE #" as in Figma; mobile shows no label). FSR class +
   number and insurer + cover for About. Nothing on the site says he is licensed or insured.
2. Is his Google Business Profile live? Real reviews (word for word, first name, town, date) replace the job slips / cards
   on Home 1.3, Services hub, Panel upgrades, Areas, Newton, Reviews. No stars or ratings until then.

Phone and contact:
3. 236-818-2664 takes calls and he answers himself ("Tap to call · he picks up" on call buttons), and it takes texts /
   WhatsApp.
4. Photos by WhatsApp to that number: OK to promise? (incl. the footer band "Text a photo any time").
5. How fast he replies to the form, how soon he calls back.
6. Hours, and whether there is a public street address. Base: Surrey Metro Centre?
7. Facebook and YouTube (@Khindaelectrical): are these his accounts? (footer links, and YouTube in the JSON-LD `sameAs`)

Service promises:
8. Urgent calls (no power, sparks): does he take them? (Home 1.9 emergency band, town 5.10, G3 strip "Sparks, a burning
   smell or no power? ... call".) If not, G3 becomes "Same-week visits" and Home 1.9 becomes "What
   to do until he gets there"; the Services hub 9th strip comes out. /services/emergency-electrician/ is not built and
   redirects to /contact/.
9. "Permit on regulated work" badge: does he take out the permit on every job that needs one?
10. "Price before work starts" (process step 2 on Home 1.8 and every service page, promise 01, About rule 03) and /contact/
    7.6 "Yes. You get the price before any work. Then you decide." "Site left tidy" / "Inspection + clean-up" (step 5,
    promise 04, About rule 04).
11. Weekend work (Contact tag 02).
12. Which job he gets most (Panel upgrades is tagged "Most asked").

Towns and jobs:
13. The towns he covers: the 6 Surrey towns + Delta, Langley, White Rock (and any travel fee), including the lines "comes to
    Delta / Langley / White Rock from Surrey" and the G5 towns strip. Each town page goes live only if he says yes.
    Newton neighbourhood tags (5.5: West Newton ... Bear Creek) and Newton jobs.
    SEO (review M7): Fleetwood, Guildford, Cloverdale, South Surrey and City Centre stay **noindex after launch too** and
    are left out of the sitemap (`NOINDEX` in src/data/towns.ts, filter in astro.config.mjs): their only local fact is the
    Surrey permit office, the same as Newton, so they read as near-copies (about 0.80 text match after the name swap).
    Index them once Khinda gives real jobs per town; then remove them from `NOINDEX` and the sitemap filter.
14. Town of each job slip / work photo / IG job (shown as job type or "Surrey area" until then). The rough-in and
    finished panel photos are the same job; the chandelier was a home job.
15. Real arrival times per ring (Areas hub). None shown.

Him:
16. Owner first name + a real photo of him (About hero / pegboard, Home 1.5 H2 becomes "Meet <name>"). Solo or crew;
    community work.
17. "15+ years, Canada and India", rough job count: only if he confirms. About 6.2 timeline shows "Canada + India".
18. A line in his own words (About, Reviews).
19. OK to use his Instagram photos on the site. Customer video reviews on WhatsApp, OK to post?
20. Instagram counts dated 17 Nov 2026 (1,521 followers, 66 posts): update at launch.

Answers and content:
21. Panel upgrade: time on site, how long the power is off, factors per panel size, insurance-requested panel letters.
22. Home FAQ Q02 to Q04 have no drawn answer in Figma. The build answers them only with lines that appear elsewhere in
    the Figma (see `src/data/faq.ts`):
    - Q02 (panel upgrade time): no time given.
    - Q03: the BC Hydro rebate line, sourced to the BC Hydro guide of 15 Jul 2026. Recheck at launch.
    - Q04: his "All domestic, commercial work and renovations" line.
    Replace them with his answers.
23. The EV tile on Home and the EV service stub say only "Rebates may apply"; the dollar figure is added only after
    checking it against the current BC Hydro guide.
24. A real EV charger install photo (the Panel upgrades EV cutout uses the garden wiring photo; the EV service hero plate
    uses his finished panel, captioned "Finished panel · Surrey area", until then).
25. FAQ page: OK with the three GFCI safety checks; the 3 guides are Phase 2 content (who writes them).

## Deviations from the brief / Figma (part 1)

- Entrance start points kept at Mike's 96 / 95 / 97 / 96 % (`motion.ts` START), not the brief's 88 / 85 / 92 / 90 %:
  with the later starts the hidden-in-view probe fails on short screens.
- Below 1024 the build uses the 390 frames; 431-1023 is the 390 layout at zoom <= 1.35 in a 480 px column with full-width
  bands, rather than the zoomed desktop (at 768 the desktop zoom would be 0.53: 17 px body type at 9 px, under the 13 px
  floor). The brief asks for 768-1279 as a tablet pass of the desktop; 1024-1279 is that pass.
- Interactive drawn parts are HTML/CSS at Figma sizes, not exported SVG, so their states can move:
  - FAQ toggle switches
  - Areas map pins, cable and tag
  - legend breakers
- Static default states: the hero picker starts with 0 picked, and the F form starts at CCT 01. Figma draws a mid-use
  example: 2 picked, CCT 03.
- Areas map on mobile:
  - The screenshot uses Figma's mobile zoom.
  - Pins sit on the same map spots as on desktop, so they are geographically consistent; Figma's mobile pins were placed
    by hand at other spots.
  - Towns outside the mobile crop (Langley, White Rock) have no visible pin on mobile.
- Figma's SVG export leaves corner radii and drop-shadow offsets / blurs in px inside a scaled drawing. `tools/fixrx.py`
  scales them; art.py applies it automatically.
- The shared endings cable (F -> G5 -> G6) draws in as it enters, like the join cables (`data-draw` with
  `data-start` / `data-end` on each Art). The Home hero underline is the marker line's own `write` effect (the duplicate
  art copy was removed).
- 360-389 px: pages reflow, except the service template (`<Base fit390>`), whose mobile drawing is fixed at 390 and is
  scaled down with zoom = width / 390 like 391-1023.
- Mobile buttons are 66 px high (Figma 02-07, 10); Home draws them 61 px and Our work / FAQ 62 px (`--btn-mh` per page).
- Small stand-alone links on mobile get a 44 px hit area with a `::before` halo (global.css); the footer and G5 lists keep
  Figma's row pitch.
- Seven Instagram photos had reel text burned in (barbershop, condo hallway, crystal chandelier, fire alarm, garden,
  shop reception, spiral sconce): the source files in `src/assets/photos/` are cropped to drop the text bands.
- `build-cache/tools/art.py` reads each page's own export scale from `sec/bbox-<page>.json` (it used Home's 0.291676 for
  every page; the 02 / 03 art already in `src/art` was cut at the right scale).

## Fix round 2 (independent review, 19 Nov 2026: handoff/build-qa/REVIEW-site.md, proof in handoff/build-qa/fix2/)

- M1 Home 1.5 pile: three real prints (ig11 new build, ig03 fire alarm panels, ig49 garden lights), no blank back card.
  Drag or swipe the top print (pointer events, mouse + touch) or press "Photo n / 3 · Next" (now on mobile too); the
  caption under the pile follows the top print.
- M2 3.6 before / after from 1024 up: each photo sits in its own side of the handle (whole panel at rest, as in Figma).
- M3 / M4 tablet: see Layout system. The footer wordmark sizes to the column (`--vw100`), never clipped.
- M5 Langley: City of Langley + Township of Langley in the 4 lines. M7: per-town problems, FAQ gangs and photos, 5 towns noindex.
- Minors: 3.7 off rows at 6:1, more 44 px halos (chips, form chips, footer rows, FAQ tabs, inline arrow links), metas
  <= 155, /our-work/ title per SEO-PLAN, tester lamps keep dim amber filaments, fuse search closes a non-matching open
  fuse, a skipped schedule row says "Skipped", 4.6 feed line ends above the tabs, barbershop crop keeps the ceiling
  panels, footer divider + Figma row pitch, 1.2 placeholder "WhatsApp or text · 236-818-2664", Home 390 section rows within
  5 px of Figma, EV hero plate = his finished panel.
- Not changed on purpose: the M6 claims (approved Figma copy, launch gate, all in the list above); hq-sv / ow2-chip keep
  35-40 px targets (both pseudo-elements are drawn), >= 24 px.

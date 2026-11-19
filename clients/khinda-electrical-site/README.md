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
- Below 1024: the 390 frames in flow. 360-390 fluid; 391-1023 is the 390 layout scaled up (`zoom = width / 390`).
  Reason: the mobile art layers are cut to the 390 frame and drift from reflowed copy on a wider column.
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
4. Photos by WhatsApp to that number: OK to promise?
5. How fast he replies to the form, how soon he calls back.
6. Hours, and whether there is a public street address. Base: Surrey Metro Centre?
7. Facebook and YouTube (@Khindaelectrical): are these his accounts? (footer links)

Service promises:
8. Urgent calls (no power, sparks): does he take them? If not, G3 becomes "Same-week visits" and Home 1.9 becomes "What
   to do until he gets there"; the Services hub 9th strip comes out. /services/emergency-electrician/ is not built and
   redirects to /contact/.
9. "Permit on regulated work" badge: does he take out the permit on every job that needs one?
10. "Price before work starts" (process step 2, promise 01) and "Site left tidy" / clean-up (step 5, promise 04).
11. Weekend work (Contact tag 02).
12. Which job he gets most (Panel upgrades is tagged "Most asked").

Towns and jobs:
13. The towns he covers: the 6 Surrey towns + Delta, Langley, White Rock (and any travel fee). Each town page goes live
    only if he says yes. Newton neighbourhoods and Newton jobs.
14. Town of each job slip / work photo / IG job (shown as job type or "Surrey area" until then). The rough-in and
    finished panel photos are the same job; the chandelier was a home job.
15. Real arrival times per ring (Areas hub). None shown.

Him:
16. Owner first name + a real photo of him (About hero / pegboard, Home 1.5 H2 becomes "Meet <name>"). Solo or crew;
    community work.
17. "15+ years, Canada and India", rough job count: only if he confirms.
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
24. A real EV charger install photo (the Panel upgrades EV cutout uses the garden wiring photo).
25. FAQ page: OK with the three GFCI safety checks; the 3 guides are Phase 2 content (who writes them).

## Deviations from the brief / Figma (part 1)

- Entrance start points kept at Mike's 96 / 95 / 97 / 96 % (`motion.ts` START), not the brief's 88 / 85 / 92 / 90 %:
  with the later starts the hidden-in-view probe fails on short screens.
- Below 1024 the build uses the 390 frames; widths 391-1023 scale that layout up, rather than a separate tablet layout.
  The brief asks for 768-1279 as a tablet pass of the desktop.
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
- The static cables in Hero, F, G5 and G6 are not scroll-drawn. Only the join cables are.

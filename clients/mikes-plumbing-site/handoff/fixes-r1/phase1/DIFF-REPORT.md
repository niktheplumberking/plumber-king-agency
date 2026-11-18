# Phase 1 diff report (fix round 1, Part A + B1)

## How the screenshots were taken
- **Before:** a copy of the build at commit 1044e67, before any Phase 1 change.
- **After:** the build at the final Phase 1 commit.
- **Pages:** all 21 pages at 1440x900 and 390x844, full page, Chromium (Playwright), `reducedMotion: reduce`, so every
  animation shows its final state. Images are forced to eager.
- **Diff:** pixel by pixel with sharp. "% changed" counts pixels whose RGB differs by more than 8.
- **Files:** `before/`, `after/`, `diff/`. They are gitignored because they total about 86 MB; `probes/` holds the
  probe scripts.

## Result
41 of 42 shots: **0.000 %**. One shot changed:

- **contact at 390: 0.017 %.** The old sine wave on Contact was clamped by the global `svg { max-width: 100% }`, which
  left a 40 px ink notch at the right edge of one seam. The merged kit `Wave` draws the full width the way its CSS always
  meant to. This is the only visible change, and it fixes a defect. Page heights are identical on every page.

| Page (width) | % pixels changed | Size before | Size after |
|---|---|---|---|
| 404-1440 | 0.000 | 1440x1437 | 1440x1437 |
| 404-390 | 0.000 | 390x1528 | 390x1528 |
| about-1440 | 0.000 | 1440x5600 | 1440x5600 |
| about-390 | 0.000 | 390x5682 | 390x5682 |
| contact-1440 | 0.000 | 1440x3594 | 1440x3594 |
| contact-390 | 0.017 | 390x4349 | 390x4349 |
| drain-cleaning-1440 | 0.000 | 1440x5422 | 1440x5422 |
| drain-cleaning-390 | 0.000 | 390x5928 | 390x5928 |
| emergency-plumber-1440 | 0.000 | 1440x4340 | 1440x4340 |
| emergency-plumber-390 | 0.000 | 390x4447 | 390x4447 |
| faq-1440 | 0.000 | 1440x3939 | 1440x3939 |
| faq-390 | 0.000 | 390x4096 | 390x4096 |
| home-1440 | 0.000 | 1440x11160 | 1440x11160 |
| home-390 | 0.000 | 390x14438 | 390x14438 |
| our-work-1440 | 0.000 | 1440x5026 | 1440x5026 |
| our-work-390 | 0.000 | 390x5400 | 390x5400 |
| plumber-buena-park-ca-1440 | 0.000 | 1440x5760 | 1440x5760 |
| plumber-buena-park-ca-390 | 0.000 | 390x7098 | 390x7098 |
| plumber-corona-ca-1440 | 0.000 | 1440x5760 | 1440x5760 |
| plumber-corona-ca-390 | 0.000 | 390x7051 | 390x7051 |
| plumber-los-angeles-ca-1440 | 0.000 | 1440x5760 | 1440x5760 |
| plumber-los-angeles-ca-390 | 0.000 | 390x7098 | 390x7098 |
| plumber-moreno-valley-ca-1440 | 0.000 | 1440x5760 | 1440x5760 |
| plumber-moreno-valley-ca-390 | 0.000 | 390x7196 | 390x7196 |
| plumber-murrieta-ca-1440 | 0.000 | 1440x5760 | 1440x5760 |
| plumber-murrieta-ca-390 | 0.000 | 390x7051 | 390x7051 |
| plumber-west-hollywood-ca-1440 | 0.000 | 1440x5760 | 1440x5760 |
| plumber-west-hollywood-ca-390 | 0.000 | 390x7148 | 390x7148 |
| privacy-1440 | 0.000 | 1440x2726 | 1440x2726 |
| privacy-390 | 0.000 | 390x2807 | 390x2807 |
| reviews-1440 | 0.000 | 1440x8297 | 1440x8297 |
| reviews-390 | 0.000 | 390x10201 | 390x10201 |
| service-areas-1440 | 0.000 | 1440x4090 | 1440x4090 |
| service-areas-390 | 0.000 | 390x4468 | 390x4468 |
| services-1440 | 0.000 | 1440x7050 | 1440x7050 |
| services-390 | 0.000 | 390x8528 | 390x8528 |
| terms-1440 | 0.000 | 1440x2836 | 1440x2836 |
| terms-390 | 0.000 | 390x2901 | 390x2901 |
| thank-you-1440 | 0.000 | 1440x2131 | 1440x2131 |
| thank-you-390 | 0.000 | 390x2810 | 390x2810 |
| water-heaters-1440 | 0.000 | 1440x5532 | 1440x5532 |
| water-heaters-390 | 0.000 | 390x6221 | 390x6221 |

## Probes: before (original build) vs after (final build), 1440x900 unless noted

**route3 (Home map routes; `svg.rts-d [data-scrub-path]`, stroke-dashoffset of routes 1-6 per 100 px of scroll)**
- Before: 1.00 everywhere up to 7300; at 7400 `0.00,0.00,1.00,1.00,1.00,1.00`; 0.00 from 7500. Every route snapped
  1 -> 0 with no in-between value.
- After: they interpolate. For example, 7200 `0.63,0.71,0.80,0.88,0.97,1.00`, 7300 `0.47,0.55,0.64,0.72,0.81,0.89`,
  7400 `0.31,0.39,0.48,0.56,0.65,0.74`. The routes are staggered by `data-win`.

**Sampler (10 samples inside each path's 0 -> 1 range; pass = all strictly between 0 and 1 and monotonic)**
- Before, Home: 0 of 11 paths pass. All snap except the Process pipe, which was already a JS writer and had an edge
  sample of 0.
- After, 1440: Home 11 of 11; /reviews RevPattern 1 of 1; /contact ConHours 1 of 1; /about 3 of 3; /our-work 3 of 3;
  /plumber-corona-ca 1 of 1; /services 1 of 1; /drain-cleaning 1 of 1; /thank-you 1 of 1 (after the trigger fix below);
  /service-areas 5 of 5 plus the hero hex (see below).
- After, 390: Home 10 of 10.
- Two runs had no clean 0 -> 1 range, so they were traced directly instead:
  - /drain-cleaning jets 2-7: the sampler re-scans the same svg and missed them. A direct trace shows all seven jets
    1 -> 0.889 -> 0.571 -> 0.253 -> 0 together.
  - /service-areas hero hex: at load it was already a third drawn, because its `top 60%` start had passed. Fixed with
    a desktop start of `top 260px`; it now draws 1.000 -> 0.798 -> 0.559 -> 0.354 -> 0.150 -> 0 from scroll 0.
- /thank-you pipe: before, it went 0 -> 1 within 10 px, because the 22 px pipe was the trigger and the end came before
  the start. The section is now the trigger: range 480-860 px, samples 0.071 ... 0.918.

**curt (our-work -> contact; panel edge per frame)**
- Before: the cover top went 1890 -> 945 and stopped at about mid-screen, so it never covered. The reveal was not
  monotonic, with a 17 ms stall, and ended with the panel lowered instead of lifted.
- After:
  - Cover: top 960 -> -60 (fully covered), monotonic, longest frame gap 18 ms, no mid stall.
  - Reveal: bottom 960 -> -60 (fully gone), monotonic, longest frame gap 20 ms, no mid stall.
  - The panel holds fully covered for about 150 ms before the lift starts: the 0.05 s delay plus the panel starting at
    0.1 s while the logo mark fades.
  - Landed at scrollY 0.

**nav2 (scroll 2500 px, click, read scrollY on the new page, then Back)**
- Before: `/ -> /services#drains` landed at y 1544. The other four landed at 0.
- After: all five land at y 0. `/services#drains` is now `/drain-cleaning`, and no cross-page hash is left in the site.
  Back restores natively: y 2484, 2484, 2484, 2500, 2505.
- `npm run check:links`: OK, 21 pages.

**Accordion 1 -> 4 switch (Home FAQ, sampled every 50 ms)**
- Before:
  - Rows 1 and 4 were both open, at 201 px, for 350 ms; then row 1 jumped 201 -> 72 in one frame.
  - The answer faded in from 0.37.
  - aria-expanded was missing.
- After:
  - One timeline: row 1 shrinks 201 -> 72 monotonically while row 4 grows 72 -> 201 monotonically, settling at about
    650 ms.
  - The answer holds at 0 until 0.15 s, then fades in (0.02 at 200 ms, 0.43 at 400 ms, 1 at 700 ms).
  - Never more than 1 row open. Latest click wins: click 2, then 3 after 150 ms, leaves only row 3 open.
  - aria-expanded is true/false correctly.
  - The same holds on Corona TFaq (230 -> 78 / 78 -> 202) and at 390.
  - Reduced motion: instant (settled at the first sample).
  - JavaScript off: native `name` exclusivity, one row open.
  - FAQPage JSON-LD is byte-identical to the original build.

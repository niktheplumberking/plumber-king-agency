# Phase 2 builder S (site-wide) report, fix round 1

Final commit a03b808. Build green, check:links OK, no new deps. Proof shots in this folder (<item>-before/after-<w>.jpg; before = 1d4e9a3).

| Item | Status | Numbers |
|---|---|---|
| B2 curtain (8 blinds, xPercent) | done | cover 0->1 one direction ~483 ms, reveal ~500 ms; hero starts 932 ms after blinds clear 849 ms; lands scrollY 0; back restores |
| B3 loader (21st.dev 35248) | done | 000->100; last blind off 3.05-3.10 s; removed 3.13-3.19 s (max 3.4); hero 3.275 s after exit; skip 1.93 s; loader.ts 3125 B min; once per session; none under reduced motion |
| B4 nav | verified | 10/10 header links from 5 pages land scrollY 0 at 1440 + 390 |
| B5 photo parallax | done | scale 1.14 + translate 0 -5%..5%, scrub 0.6; media +-16, headings +-10, stamps +-14; edge gaps 0 |
| B6/B7/B16 seams | done in S areas | 9 hits left in P areas (Slips, tear-offs) at hand-off; bands clear wave >=12 / row 06 >=16 |
| B8 marquee engine | done | check-marquees 24/24 at 360/390/1440/1920; loop 37.7-38.5 s; gap 0; hover 0; boost ~260 px/s eases back |
| B9 menus | done | mega open 560 ms / close 500 ms, cubic-bezier(.65,0,.35,1) |
| B10/B23/B31 footer | done | one colour #151410; 64/40 px above rule; Privacy . Terms right edge x 1320; "MIKE'S" Abril tan on coal, aria-hidden |
| B11 hover + idle | done | gestures every 5-7 s (5.5, 11.0, 17.1, 22.5 s measured); 0 under reduced motion |
| Contrast | 249 -> 8 at hand-off | tan-dark #5F5137, new red/mute text tokens; logged in README deviation log |
| D2/D3 checkers | done | scripts/check-seams.mjs, scripts/check-marquees.mjs |

Loader on 4x CPU + Fast 3G: script arrives after the 3.5 s safety, so content shows without the loader (never blocks content).
Footer "MIKE'S" built from the brief; the Figma render was not legible (2 of 3 Figma calls used).

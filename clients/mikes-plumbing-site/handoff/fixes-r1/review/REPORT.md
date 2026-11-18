# Independent review, fix round 1 (at 06f77da)

Reviewer: a separate Claude agent that did not build (same vendor, so not truly independent). Own build, motion on, real wheel scrolling.
Verdict: NEEDS FIXES before the owner. Clean: no 24/7, no licence, no prices, reviews word for word, no other-client names,
no horizontal scroll 1440/390/360, console clean, no cross-page hashes, check-seams 0, check-marquees 24/24.

## Blockers
1. B24 Reviews hero: 5.0 badge covers review text (1440 + 390; slip runs off right edge at 390). RevHero.astro. Shots: reviews-1440-00, revhero-390-crop.
2. Home FAQ: "Not on the list?" note covers open answers and the close button of rows 02-06 at 1440. home/Faq.astro. Shot: acc-home-1440-08.
3. B2/B3: ink blinds on ink hero are invisible; after they clear a bone bar (body background behind the hidden utility bar) flashes 0.3-0.6 s; hero text 0.6-0.9 s later. Shots: curt-1440-b3, sheet-curt-*, sheet-lx-1440.

## Fix before owner
4. B22 at 390: torn strip "Take one" cut by the bone wave (checker misclassified front/behind). tear-390-a0-crop2.
5. B25: right pipe runs through the wave and stops flat inside Spotlight. rev-pattern-full.
6. B11: no hover on Our Work wall photos/tickets; kit [data-hover] unused.
7. Showcase heroes: Reviews and Our Work reuse the Home/Corona split layout; Our Work film strip's first frame = Home hero van photo.
8. B17: bare play triangle opens IG profile; label it "Watch on Instagram" until Mike sends the clip/link.
9. B15: tag hole sits on the numerals; string ends at tag top, not the hole. fam-1440.
10. B29 drift (reviewer measured +-28/+-12; P reported +-40/+-20 in 06f77da: recheck).
11. B9: accordion title font swaps sans->serif at frame 0; mid-switch titles invisible (bone on grey). sheet-acc-home.
12. B13: route timeline jumps 0.08->0.35 in ~100 ms after the unfold.
13. Seam exemptions (contact form card, About photo card, FAQ plate) not in the brief's named list: pad clear or log as deviation.
14. Loader: top-right counter says 100/100 while slats read ~08x. loader-1440-18.

Pass: B4, B5, B7, B8, B10, B14, B16, B18, B19, B20, B21, B23, B26, B30, B31, B32, B33. Not fully verified: B12 map, B27 40% line.

## Re-look at d2c3b0b
10 of 14 pass. Item 12 route map regressed (map sat empty in view); item 11 accordion text-on-text during cross-wipe; minor emergency 390 call-log spacing.
Fixed in 38ad2f1 (accordion out/background/in swap), b40506e (route map follower + timer hold), 80b113b (all map tags inside frame).

## Final check at 80b113b: SHIP TO OWNER
- Route map draws while in view: home 1440 0.14 -> 0.98 over scrollY 7617-7978; 390 0.04 -> 0.94; Corona 0.09 -> 0.95; all tags inside the frame.
- Accordion: out, background, in; never two layers, no text on mid-grey; ~0.85 s; aria correct.
- Emergency 390 call log: gap above first slip, badge clear.
- B29 drift measured exactly +-40 px (1440) / +-20 px (390); filters work; no photo cut.
- Quick pass Home, Reviews, Our Work, Contact, Corona, Emergency at 1440/390: nothing new; no h-scroll at 360 on 17 pages.

# Home page QA (HOME builder, 19 Nov)

Built `src/pages/index.astro` and `src/components/home/*` (Hero, Reviews, Services, Crew, RealWork, WhyUs, Process,
Emergency, Areas, Faq + faq.ts, Estimate, fig.ts helpers). Compared section by section with the Figma cache
(`desktop-712-448` / `mobile-715-560` PNGs). Screenshots taken with Playwright, reducedMotion "reduce", the real global
chrome, and fixed or sticky bars hidden. Each `cmp-<section>-<width>.png` here shows Figma on the left and the build on the right.

## Section by section

| # | Section | 1440 (Figma h / build h) | 390 (Figma h / build h) | Verdict |
|---|---|---|---|---|
| 3 | Hero | 680 / 680 | 936 / 936 | Matched. |
| 4 | Reviews + call-back strip | 880 / 879 | 1474 / 1489 | Matched at 1440. At 390 it is 15 px taller: the profile-housing numbers sit about 10 px lower. |
| 5 | Services | 1388 / 1388 | 1106 / 1105 | Matched. The photo crops (focus) are set by eye. |
| 6 | Crew | 974 / 974 | 1265 / 1265 | Matched. The business-card photo crop differs a little (Figma shows less of the card's bottom edge). |
| 7 | Real work | 1003 / 1005 | 822 / 818 | Matched. |
| 8 | Why us | 926 / 920 | 1040 / 1034 | Matched within 6 px. |
| 9 | Process | 1010 / 1010 | 1080 / 1081 | Matched. |
| 10 | Emergency | 866 / 866 | 1019 / 1020 | Matched. The valve is absolute at 1440, as in the frame. |
| 11 | Areas | 840 / 862 | 970 / 997 | Not exact, on purpose. The Figma lists 19 towns, but `towns.ts` has 20 (Redington Shores), and the data wins. The 390 map crop is also slightly wider than the Figma's. |
| 12 | FAQ | 1117 / 1111 | 1724 / 1733 | Matched. |
| 13 | Final estimate | 974 / 974 | 1481 / 1482 | Matched (with tile 1 picked, as in the frame). |

Notes:
- The Figma "TO CONFIRM (Kody)" yellow notes are NOT on the site, and none of their claims were added.
- The Figma frame shows the estimate with "No hot water" already picked. The live form starts with nothing picked: the work
  order reads "—" and the gauge is empty (0 / 3). It fills a third per answered step.
- Phone placeholder in the FAQ search is "Try “permit”" under 768 (as in the 390 frame) and the full text above.

## Interactions (checked in Playwright)
- Estimate:
  - Next with nothing picked does not advance. It says "Pick the closest one to go on." in the live region and focuses the tiles.
  - Tiles are real radios: arrow keys move between them and Enter goes on. Each step's heading gets focus, and "Step n of 3" is announced.
  - Back works.
  - The work order fills live (problem, town, when, photo, call back) and the gauge fills 1/3, 2/3, 3/3.
  - The peek cards slide forward.
  - A submit before step 3 is caught (capture phase) and turned into Next. In step 3, forms.ts validates the name and phone ("Please add your name and a 10-digit phone number…"), then goes to /thank-you.
  - Without JS, all three steps show with only the submit button.
  - Steps 2 and 3 are hidden from first paint when html.js is set, so nothing jumps.
  - "Water running right now?" with the red call button is on every step.
- FAQ: live search marks matches and updates the count. The topic chips filter; Escape clears. The accordion (kit) keeps one row open,
  with the ink flood and the photo rising on open.
- Motion on (1440, 1280, 1024, 820, 768, 390, 360): after scrolling through, no element in a home section is left invisible,
  and there are no page errors.
- No horizontal page scroll at any of those widths. The FAQ at 768-1279 used to overflow by 50 px (grid `1fr` min-content). It is fixed with `minmax(0,1fr)`.

## SEO / facts
- Title "24/7 Plumber in Largo, FL · Glass Plumbing Services". The meta description (149 chars) is the hero lead.
- One H1 ("24/7 Plumber in Largo, FL").
- JSON-LD: FAQPage for the 6 visible Q&As (same text), along with the Base Plumber, WebSite and WebPage.
- LCP: the hero image is `priority`, with a Base `preload` whose sizes and widths are identical.
- Photos: 21 different photos, each used once (the logo appears twice as a brand mark). `shower-valve` (hero) and `valve` (services)
  are different shots, not near-duplicates. `water-heater-tank-2` is not used.
- Review quotes go through `fig.ts quote()`, which fails the build if the text is not word for word in reviews.ts. The Google counts 104 and 77 are never summed.
- Internal links all go to built routes: /reviews, /faq, /services/water-heaters, /services#family, /areas/seminole, and /areas#town-slug.
- Red appears only on call buttons and "Call me back".

## Not verified / known gaps
- Tablet (768-1279) is fluid and checked for overflow only, not designed against a frame. The hero cluster there is large.
- Checked only on the Astro dev server in a mirror copy (my scratchpad), with the real `src`. A production `astro build` was not run by me.

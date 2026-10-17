# Design decisions

Decisions that close audit items, with who made them and when.

## Light theme only (no dark mode)

- **Decision:** the site is light-only by brand choice. There is no dark theme and none will be built.
- **Who and when:** Nick, 2026-10-14 (palette H, Charcoal & Hot Pink, light treatment; "prefers light designs, not dark").
- **Closes:** audit item C-33 (Dark mode), report of 2026-10-17.
- **What this means in code:** no `prefers-color-scheme` rules. Pages set an explicit white background and dark text, so a
  browser in dark mode still shows the light site with full contrast.

## Phone screens in section 3 are pictures

- **Decision:** the three phone screens in the home page's "From invisible to booked" section are images
  (`public/media/screen-*.webp`), each with a full text alternative.
- **Why:** the screens show a phone at small scale. As live text they needed sizes below the site's 3 text sizes
  (Nick's rule, 2026-10-15). As pictures the page keeps exactly 3 sizes.

## Links inside sentences keep text height on touch screens

- Stand-alone links and buttons are at least 44 x 44 px on touch screens. Links inside a sentence (for example
  "Privacy Policy" under the forms) stay at text height. WCAG 2.5.8 exempts inline links; padding them to 44 px
  would break the line spacing.

## Home page may go over the factory's 700 KB JavaScript budget (Lenis stays)

- **Decision:** keep Lenis smooth scrolling and the round 6 sections even though the home page now measures about
  712 KB of JavaScript against the WFACT factory's 700 KB "Track B" budget (`packages/rendered-qa`, `TRACK_B_BUDGET`).
- **Who and when:** Nick, 2026-10-17 17:37 ("I don't want to drop smooth scroll ... we can just skip that").
- **What it means:** the factory QA reports `render.js-budget` as FAIL on the home page; that failure is accepted, not a
  bug. The budget counts only JavaScript (it drives load speed on phones). Images and the VSL video do not count toward
  it; they are judged by the load-speed checks (LCP) instead, so the video must still load only when played.

## Repeating attention motion (button shakes, ringing card)

- **Decision:** about 65% of buttons shake briefly every 6.5 s and the Plumber King comparison card "rings" every 5 s,
  for as long as the page is open.
- **Who and when:** Nick, 2026-10-17 17:05 (explicit request).
- **What it means:** the factory design rule DR-GRATUITOUS-MOTION (at most one endless loop per page) reports FAIL;
  accepted as Nick's design call. Safeguards kept: everything stops under reduced motion, a hovered or focused button
  stops shaking, and the "Pause motion" button stops all of it (WCAG 2.2.2).

## Extra type sizes Nick asked for

- The site keeps 3 text sizes, with these agreed exceptions, each sized to fill its space: the hero headline, the
  comparison card titles, "Five steps." and the giant slanted "0 GUESSWORK", the step titles in the process
  timeline, the footer name, and big numbers. Source: Nick 2026-10-17 ("much bigger", "stretch it", "increase the titles").

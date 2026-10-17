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

# Builders 2 and 3: how to continue the Khinda build

Part 1 (done) covers:

- scaffold, tokens, fonts, photos
- the shared parts:
  - G1 utility bar, G2 header + mega menu + mobile menu, G3 emergency strip
  - mobile call bar, loader, curtain
  - F panel-schedule form, G5 towns strip, G6 footer
- Home, 1:1 at 1440 and 390
- every other route as a stub, with title, meta, one H1, breadcrumb and endings

Each stub uses `src/components/stub/Stub.astro`. You replace its body with the Figma sections. Keep the route, title,
meta and H1.

Read first: `README.md` (layout system, motion, Khinda to confirm, deviations), the BUILD-BRIEF, and
`handoff/build-cache/INDEX.md`. Never open Figma: everything is in the cache. Never touch another branch.

## Split

| Part | Pages (Figma page in the cache) | Template for |
|---|---|---|
| 2 | `/services/` (02-services-hub), `/services/panel-upgrades/` (03-panel-upgrades), `/about/` (06-about), `/contact/` (07-contact) | the 7 other service pages = the 03 layout with their own copy (`src/pages/services/[slug].astro`, META table) |
| 3 | `/areas/` (04-areas-hub), `/areas/newton/` (05-newton), `/reviews/` (08-reviews), `/our-work/` (09-our-work), `/faq/` (10-faq) | the 8 other town pages = the 05 layout (`src/pages/areas/[slug].astro`, `Endings town=` already wired) |

Template pages use only PAGE-SHEET facts + SEO-PLAN copy, every claim sourced, his own photos, never one photo twice on
a page. Town pages go live only for towns he confirms (README item 13).

## Recipe per section

1. Look at it.
   - `python3 build-cache/tools/show.py 03-panel-upgrades desktop "3.2" 5` prints the tree with coordinates relative to
     the section, text styles and the exact copy. Do the same for `mobile`.
   - The PNG is in `figma/v5/<page>-desktop.png` / `-mobile.png`.
   - The section's STATES board is in `build-cache/states/<page>/`.
2. Make a component in `src/components/<page>/`, using one `<section class="... sec" style="--h:<Figma h>px"
   data-m-section aria-labelledby=...>`.
   - Desktop children are `.ab` with `style="--x:..px;--y:..px;--w:..px"` straight from show.py.
   - Mobile goes in `@media (max-width: 1023px)` as flow: padding, flex column, margins equal to the Figma gaps.
3. Drawn objects are art layers:
   - Cut them with `python3 build-cache/tools/art.py <page> d "<section name>" <secTop> <secH> src/art/<x>-d.svg
     "layer" "layer*" "cable*@cd"`. Run it again with `m` for mobile.
   - Use them with `<Art svg={d} class="dn-m" />` and `<Art svg={m} class="dn-d" />` (`?raw` import).
   - `@cd` + `data-draw` (and `data-start` / `data-end`) on the Art makes a cable draw on scroll. `data-draw="rev"` draws
     it from the breaker end.
4. Reuse the kit (`src/components/kit/`): Btn (call / text / indigo, tone dark), Eyebrow, Tape (rot = Figma rot), Screw,
   Toggle (btn / chip / badge / breaker), Bolt, Art. The ui `Img` takes `box` / `boxM` = box aspect and `focus`.
5. Copy is the Figma text word for word. Yellow notes never go on the site.
6. Use unique class prefixes per component (for example `ps-`, `ab-`): `:global` rules leak between components.

## Gotchas found in part 1

- show.py: a prefix like `1.1` also matches `1.10` and `1.11`, so pass the full section name.
- z-index across joins: when a section's object crosses into the next section, the earlier section needs the higher
  z-index. On Home: Hero 3, Services 2 over About 1, Work 2 over Why 1, Process 6 > Emergency 5 > Areas 4 > FAQ 3 >
  F 2.
- A `<span>` you size on mobile needs `display: block` once its parent stops being flex.
- Figma `rotation` r means CSS `rotate(-r deg)` with `transform-origin: 0 0`.
- `[hidden]` is `display: none !important` globally. Use it for states.
- Section heights: run `node scripts/qa-tops.mjs 390` and compare with `build-cache/_index.json`, so drift shows before
  the screenshots do.

## QA before you hand back

All of these must pass:

- `npm run build` is clean.
- `npm run check:links` reports 0 missing.
- `node scripts/axe.mjs <axe.min.js> <your pages>` reports 0 violations.
- `scripts/qa-compare.mjs` matches every section at 1440 and 390. Put the PNGs in
  `handoff/build-qa/part<N>/`.
- `motion-draw-sweep.cjs` and `motion-hidden-probe.cjs` pass at 1440 and 390.
- There is no horizontal scroll at 1920, 1280, 1024, 820, 430, 390 or 360.

Then:

1. Deploy with `npx vercel build --prod` and `npx vercel deploy --prebuilt --prod`.
2. Commit and push to `claude/project-thread-me9wb4` only.

# kit: the one shared component and motion kit

Fix round 1 (A-1) merged the four page kits (`home/`, `b3kit/`, `kit-b4/`, `services/kit/`) into this folder. A page never
gets its own copy of anything here again: if a page needs a variant, it becomes a prop or a data attribute of the kit
piece. The rule every animation follows is at the top of `MOTION.md` (ease-in-out tweens, CSS start state = JS start
state, no visible jumps).

## Components (Astro)

| File | What | Props |
|---|---|---|
| `Wave.astro` | The wave seam between two sections. It sits at the top edge of the lower section (the host, `position: relative`) and paints that section's colour up into the one above. | `d` / `m` geometry (omitted = the standard Figma seam with `shape`/`shapeM`/`rise`/`riseM`; a `waves.ts` key with `hostY`/`hostYM`; a traced `{path,h,w?}`; or a sine `{a,L,phi,clip,x0,x1,W}` with `above`), `fill`, `top`/`topM`, `bottom`, `only` ('d'/'m'), `z` (default 3), `class`, `clear` (default true; `data-wave` for the seam checker). Clearance: content keeps `--wave-clear` (24 px desktop, 16 px mobile). |
| `waves.ts` | Traced Figma wave vectors, by key. | |
| `WaveRule.astro` | Thin wavy rule with a hex nut in the middle (footer, Diagnosis). | `color`, `bg`, `nut`, `class` |
| `Btn.astro` | Every button. Always a real link. | `look` main / call / ghost / bar / figma; `v`, `title`, `sub`, `href` (defaults to `tel:`), `w`, `h`, `external`, `t`, `plain`, `dark`, `arrow`, `circle`. The five looks are the five Figma button families, kept pixel-identical. |
| `Eyebrow.astro` | The hex-nut (or live red dot) + Oswald caps label. | `look` main / town / page / figma; `tone` tan / deep / ink / mute / red / paper; `text` or the slot, `dot`, `icon`, `t`, `as` |
| `Logo.astro`, `Stamp.astro` | The real logo as an image / as a rotated rubber stamp (CSS mask). | `w`, `tone` / `color`, `deg`, `opacity`, `t`, `fx` |
| `Marquee.astro` | Tilted band of review words (CSS marquee today; `marquee.ts` takes it over in Phase 2). | `words`, `star`, `size`, `class` |
| `Curtain.astro` | The page curtain markup (one panel, one wave edge at each end). `curtain.ts` drives it. | |

## Motion modules (TypeScript)

### `settle.ts`: the one re-measure
- `settled(): Promise<void>` resolves once fonts are in (2.5 s cap), the window has loaded, and the wide-screen zoom on
  `<html>` has held still for two frames.
- `requestRefresh(delay = 150)` is debounced. It runs `lenis.resize()` then `ScrollTrigger.refresh()`, never during a scroll
  (it waits for ScrollTrigger's `scrollEnd`). **Nothing else calls `ScrollTrigger.refresh()`.** motion.ts limits
  ScrollTrigger's own auto-refresh to `visibilitychange, DOMContentLoaded, resize`.

### `scrub.ts`: the one engine for scroll-scrubbed moments
Progress follows the scroll (ScrollTrigger scrub on Lenis), never a clock. It is built after the hero handoff
(`pbp:handoff`, 4.5 s fallback) and rebuilt per layout band (≤767, 768–1023, 1024–1279, ≥1280).

| Attribute | On | Meaning |
|---|---|---|
| `data-scrub` | the moment's box | Its pass through the viewport drives progress 0 → 1. Gets `.is-scrub` once built. |
| `data-start` / `data-end` (`-m` on phones) | box | ScrollTrigger start/end. Defaults are `top 80%` / `bottom 50%`. |
| `data-lag` | box | Scrub smoothing in s (default 0.6). |
| `data-stop-mode="pop"` | box | Stops swell (scrubbed) instead of toggling `.is-on`. |
| `data-scrub-track` | a child | Its box is the trigger instead of the `[data-scrub]` box. |
| `data-scrub-path` | an SVG path with `pathLength="1"` | Drawn 0 → 100 %. CSS: `stroke-dasharray: 1` and, under `html.motion`, `stroke-dashoffset: 1` (empty). |
| `data-win="a,b"` | path / fill / turn / tw | The part of the progress (0–1) in which it runs. |
| `data-scrub-fill` (+ `data-axis`, `data-axis-m`, `data-rev`) | an element | Scaled 0 → 1 (or 1 → 0) along x or y. CSS sets the origin and the start scale. |
| `data-scrub-turn="a,b"` (+ `data-origin="x y"`) | an element | Rotation a → b degrees. |
| `data-scrub-tw='{json}'` | an element | Tweened from these vars to its CSS state. |
| `data-scrub-y="px"` | an element | Drifts down by px over the pass. |
| `data-stop` (+ `data-at`, `data-at-m`, `data-at-el`, `data-rot`, `data-scale`) | an element | A numbered stop. Class mode: `.is-on` once the water reaches it. Pop mode: swells and turns, then settles; a `[data-lit]` child flashes. |

- `drawTo(path, p)` is the one writer of a pathLength=1 path's `stroke-dashoffset`. It writes a unitless value.
  GSAP's CSS tween rounds px values and snapped 1 → 0 with nothing in between, which was bug A-2.
- `home/flow.ts` (the "How a job goes" pipe with its bead, stops, chevrons and gauge) is the one bespoke scrub. It uses
  `drawTo`, `settled` and `requestRefresh` from here.

### `curtain.ts`: page transitions (one channel: GSAP `yPercent` on `.pt-panel`)
- `park()` (at boot) sets yPercent 100, unless this page arrived under the curtain. It also resets the curtain on a
  bfcache restore.
- `cover(href)` covers in one ease-in-out move (current → 0, 0.6 s), then navigates.
- `reveal(onHandoff, onDone)` handles a page that arrives covered (`html.pt-in`). It sets
  `history.scrollRestoration = 'manual'`, puts the page at the top (window + `lenis.scrollTo(0, { immediate: true })`),
  then lifts the panel 0 → -100 (0.75 s). `onHandoff` fires once the panel has cleared the header. scrollRestoration
  returns to `'auto'` afterwards.
- `interceptLinks()` covers for in-site links to another page, and drops a cross-page `#hash` so a new page always
  opens at the top. Same-page `#` links stay with Lenis (smooth). New tabs, modifier clicks, downloads and
  `data-no-curtain` are skipped.
- `toTop()`.

### `accordion.ts`: the one controller for every `<details data-acc>`
- Markup: `<details data-acc [name="group"]><summary>…</summary>…body…</details>`. Rows sharing a `name` are one group,
  and two are never open at once. The native `name` exclusivity is also the no-JS fallback.
- `data-acc="row"` (default): FLIP height, one 0.7 s `power2.inOut` timeline per switch. The closing row's colours
  ease back while it shrinks (`.acc-off`: styled closed, still rendered). The opening answer fades in after 0.15 s.
  A click mid-animation re-targets from the current heights, so the latest click wins.
- `data-acc="pop"`: a floating dropdown list fades and slides (0.5 s). It closes on Escape or an outside click.
- `aria-expanded` on the summary mirrors the state. Reduced motion (no `html.motion`) gives the instant native toggle.
- Component CSS: style the open look on `[open]:not(.acc-off)`.
- `setOpen(row, open)` opens or closes a row from code, with the same timeline as a click.
- `initAccordions(root?)` is called by `ui.ts`.

### `marquee.ts` (API, wired in Phase 2), `idle.ts` (API), `hover.ts` (pointer check)
- `marquee(band)` / `initMarquees()`. Markup: `[data-marquee]` holds two `[data-marquee-track]` copies. It loops in
  ~40 s, the scroll velocity boosts it and it eases back in ~1.2 s, and it pauses on hover or focus. It only runs in view
  and under motion.
- `registerIdle(el, gesture, priority)` / `startIdle()` play one gesture every 5–7 s on one in-view element, never the
  same element twice. It pauses while scrolling, on hover, on form focus, when the tab is hidden and under reduced
  motion.
- `finePointer()`: hover effects run only on `(hover: hover) and (pointer: fine)`.

## One writer per property

Each animated property of an element has exactly one owner. If a second module needs to move the same element, it
animates a different property (for example `translate` vs `transform`) or a wrapper element.

| Element | Property | Owner |
|---|---|---|
| `.pt-panel` | `transform` (yPercent) | `curtain.ts` |
| `.pt-mark` | `opacity`, `visibility` | `curtain.ts` |
| `history.scrollRestoration` | | `curtain.ts` (plus the Base.astro head script, `manual` when arriving under the curtain) |
| window scroll position | | Lenis (`motion.ts`); `curtain.ts toTop()` only under the cover |
| ScrollTrigger refresh, `lenis.resize()` | | `settle.ts requestRefresh()` |
| `[data-scrub-path]`, `.pw-water` | `stroke-dashoffset` | `drawTo()` (called by `scrub.ts` and `home/flow.ts`) |
| `[data-scrub-fill]` | `transform` (scaleX / scaleY) | `scrub.ts` |
| `[data-scrub-turn]` | `transform` (rotation) | `scrub.ts` |
| `[data-scrub-tw]` | the vars in its JSON | `scrub.ts` |
| `[data-scrub-y]` | `transform` (y) | `scrub.ts` |
| `[data-stop]` | class `.is-on`; in pop mode `transform` (scale, rotate) | `scrub.ts` |
| `[data-stop] [data-lit]` | `opacity` | `scrub.ts` |
| `.pw-head` | `transform` attribute, `opacity` | `home/flow.ts` |
| `.stp` / `.chev` | class `.is-lit` / `.is-on` | `home/flow.ts` |
| `[data-gauge-needle]` | `transform` (rotation) | `home/flow.ts` |
| `details[data-acc]` | `height`, `overflow`, `open`, classes `.acc-off` / `.acc-anim`, `name` (held off during a switch) | `accordion.ts` |
| `details[data-acc]` body children | `opacity` (row); `opacity`, `visibility`, `transform` (pop) | `accordion.ts` |
| `summary` of a `[data-acc]` row | `aria-expanded` | `accordion.ts` |
| colours of an accordion row | `background-color`, `color`, `border-color`, `fill`, `stroke`, … | CSS transitions (`kit.css`) |
| `[data-t]` entrance items, parallax | `opacity`, `transform` | `motion.ts` |
| `[data-marquee-track]` | `transform` (translate3d x) | `marquee.ts` (Phase 2) |
| hover lift | `translate` (CSS transition) | component CSS, `finePointer()` |
| idle gesture | `rotate` / `scale` on the element or an inner child (never `transform` when an entrance owns it) | `idle.ts` |

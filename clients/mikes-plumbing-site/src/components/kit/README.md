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

### `curtain.ts`: page transitions (fix round 1, B2: the loader's 8 blinds; one channel: GSAP `xPercent` per `.pt-blind`)
- The curtain is the same family as the loader: 8 full-width horizontal blinds (`Curtain.astro`), even ones park off to
  the left (xPercent -101), odd ones to the right (+101). The CSS resting state is "covering", so a page that arrives
  under the curtain is covered before paint.
- `park()` (at boot) parks the blinds off-screen, unless this page arrived under the curtain. It also resets the curtain
  on a bfcache restore.
- `cover(href)` slides every blind to 0 (0.6 s `power2.inOut`, stagger 0.012 s, alternating sides), THEN navigates.
- `reveal(onHandoff, onDone)` handles a page that arrives covered (`html.pt-in`): `history.scrollRestoration = 'manual'`,
  the page goes to the top under the cover, then the blinds slide off to alternating sides (0.6 s `power2.inOut`);
  `onHandoff` (hero timeline) fires at ~75 % of the blind travel, so the H1 starts as the cover clears (fix round 2,
  review 3); `onDone` (scrollRestoration back to `'auto'`, `pt-in` off) when the last blind is off.
- Colours (fix round 2, review 3): the blinds are tan / bone alternating (the loader slats' colours), so cover and reveal
  read on ink heroes too.
- `interceptLinks()` covers for in-site links to another page, and drops a cross-page `#hash` so a new page always
  opens at the top. Same-page `#` links stay with Lenis (smooth). New tabs, modifier clicks, downloads and
  `data-no-curtain` are skipped.
- `toTop()`.

### `loader.ts`: the first-visit loader (fix round 1, B3; markup `global/Loader.astro`)
`runLoader({ onCover, onDone })`. Base: 21st.dev "Swiss Poster Counter Preloader" (id 35248), vanilla TS + GSAP, 3.1 KB
minified. A 3 x 7 slat counter counts 000 -> 100 while the page loads (100 forced at 1.8 s), then 8 blinds slide off
alternately (0.6 s). `onCover` runs while still fully covered (hero start states), `onDone` when the last blind is off
(hero timeline, header, Lenis). Once per session (`sessionStorage mps-intro`), skippable (click, tap, key), max 3.4 s,
never under reduced motion. The slats move only through their CSS custom properties `--x --y --s` (CSS transition).

### `marquee.ts`: the one marquee engine (fix round 1, B8)
`[data-marquee]` holds two `[data-marquee-track]` copies (`Marquee.astro`, or hand markup like `services/Callout.astro`).
`initMarquees()` (motion.ts, after the handoff): each copy is filled with clones until it is wider than the band (no gap
360-1920), one GSAP ticker loop moves both tracks by `x` so one period takes ~40 s at any width, scroll velocity boosts it
(up to 3x, `|v| / 500`) and the boost eases back over ~1.2 s, hover or keyboard focus eases it to a stop (~0.4 s) and back.
Runs only in view and under `html.motion`; reduced motion = static first copy. Check: `node scripts/check-marquees.mjs`.

### `accordion.ts`: the one controller for every `<details data-acc>`
- Markup: `<details data-acc [name="group"]><summary>…</summary>…body…</details>`. Rows sharing a `name` are one group,
  and two are never open at once. The native `name` exclusivity is also the no-JS fallback.
- `data-acc="row"` (default): FLIP height, one 0.7 s `power2.inOut` timeline per switch. The closing row's colours
  ease back while it shrinks (`.acc-off`: styled closed, still rendered). The opening answer fades in after 0.15 s.
  A click mid-animation re-targets from the current heights, so the latest click wins.
- Title layers (fix round 2, review 11): a title whose open look is another face or colour (Home FAQ: sans ink on bone ->
  serif bone on ink) carries `data-acc-title`; its row switches as a swap (`.acc-swap`, review 11 re-look), inside the
  same 0.7 s height timeline: 0 -> 0.15 s the summary text fades out on the old background (the title as a snapshot of its
  old look, `.acc-ghost`, aria-hidden, absolute at the old place; a closing answer is hidden at once); 0.15 -> 0.35 s the
  background switches (CSS 0.2 s) with no text shown, text colours step at 0.25 s; 0.35 -> 0.6 s the summary text fades in
  on the new background (opening answer 0.35 -> 0.7 s). Two title layers are never visible together and no text sits on
  the mid-grey. The ghost is removed at the end or on a re-target (latest click wins).
- `data-acc="pop"`: a floating dropdown list fades and slides (0.5 s). It closes on Escape or an outside click.
- `aria-expanded` on the summary mirrors the state. Reduced motion (no `html.motion`) gives the instant native toggle.
- Component CSS: style the open look on `[open]:not(.acc-off)`.
- `setOpen(row, open)` opens or closes a row from code, with the same timeline as a click.
- `initAccordions(root?)` is called by `ui.ts`.

### `idle.ts`, `hover.ts` (pointer check)
- `startIdle()` (motion.ts, at idle time after the handoff) collects every `[data-idle]`. `registerIdle(el, play,
  priority)` adds a custom gesture: `play()` returns a WAAPI Animation or a gsap animation (used by the contact sign).
  One gesture every 5-7 s on one element at least half in view, lowest priority first (ties random), never the same
  element twice in a row. Paused while scrolling and 0.8 s after, while the pointer is over the object or any clickable,
  on form focus, when the tab is hidden, under the loader / curtain and under reduced motion. A `[data-idle]` inside
  another `[data-idle]` is skipped (the wrapper owns it).
- `finePointer()`: hover effects run only on `(hover: hover) and (pointer: fine)`.

### `data-idle`: put an idle gesture on an object (any builder may add it, no script needed)
`<svg|img|div data-idle="GESTURE" [data-idle-origin="50% 0%"] [data-idle-priority="N"]>` on the **object itself, never on
text**. `idle.ts` collects every `[data-idle]` at boot (and `registerIdle()` adds custom ones). Every 5-7 s (random) it
plays ONE gesture on ONE element that is at least half in view, picking the lowest priority number first and never the same
element twice in a row. Paused while scrolling, on hover, on form focus, when the tab is hidden and under reduced motion.

The gesture runs on the Web Animations API with `composite: 'add'` on the **individual CSS properties** `rotate`, `scale`,
`translate`: it adds on top of whatever `transform` an entrance, a parallax or a scrub writes, so it never fights them and
always ends exactly where it started. Do not put `data-idle` on an element whose own `rotate`/`scale`/`translate` is
animated by someone else (put it on a wrapper or inner child).

| `data-idle` | Gesture (duration) | Default priority | For |
|---|---|---|---|
| `shake` | rotate +-4 deg x3 with a small x jiggle (0.6 s) | 1 | the black "5.0 · 20 reviews on Yelp" badge |
| `thump` | scale 1 -> 1.1 -> 0.97 -> 1 (0.5 s) | 2 | stamps |
| `nut` | rotate +60 deg, ease-in-out (0.7 s); a hexagon ends looking identical | 3 | hex nuts |
| `valve` | rotate +90 deg, ease-in-out (0.8 s) | 4 | the red valve wheel |
| `drip` | falls 16 px and fades, then reappears at the top (0.7 s) | 5 | drips |
| `twitch` | rotate +6 / -3 / 0 deg (0.5 s) | 6 | dial / gauge needles (set `data-idle-origin` to the pivot) |
| `sway` | rotate +3 / -2 / 0 deg from the top centre (0.8 s) | 7 | hanging tags, signs |

`data-idle-origin` sets the `transform-origin` for the gesture (default: `center` for nut/valve/thump/shake, `50% 0%` for
sway). SVG children: the scheduler sets `transform-box: fill-box` so the origin is the shape's own box.

### Hover (CSS, `kit.css`): every clickable object answers a fine pointer
- Global: every `a`, `button`, `summary`, `[role=button]` gets a visible hover (colour or underline transition, 0.3 s).
- Opt-in lifts, on `(hover: hover) and (pointer: fine)` only, transition 0.35 s ease-in-out:
  `data-hover="lift"` (translate 0 -4 px + deeper shadow), `data-hover="tilt"` (rotate -1.5 deg, scale 1.02),
  `data-hover="nut"` (an inner `[data-nut]` or `.nut` child turns 60 deg). They use `translate` / `rotate` / `scale`, never
  `transform`, so they combine with entrances. Cards/rows/tags/stamps/strips that are links get `lift` by default from
  `kit.css` selectors; add the attribute on anything else.

### `RouteMap.astro` + `RouteMap.ts`: dashed driving routes out of Riverside (builder P, B13 / B33)
Used by the Home route map (`home/Areas.astro`) and every town map (`town/TClose.astro`). Put `<RouteMap />` once in the
component (it holds the CSS start states and loads the module). One scrubbed timeline per **visible** map svg (desktop and
phone each their own, `gsap.matchMedia`). Sequence: the map unfolds from the Riverside pin (circle clip, 0.9 s
power2.inOut, once; routes wait for it), Riverside pulses, then route 1 draws, its town dot pops and its tag slides out,
then route 2 ... in `data-rm-route` order (by distance). Scrub 0.8 s from `top 75%` to `center 40%` by default.

| Attribute | On | Meaning |
|---|---|---|
| `data-routemap` (+ `data-start`, `data-end`, `data-lag`) | the trigger box | one route map |
| `data-rm-unfold` (+ CSS vars `--rm-ox`, `--rm-oy`) | the box that unfolds (may be the same element) | circle clip from the pin |
| `data-rm-svg` | each layout's svg | builds only while visible |
| `data-rm-route="i"` | a `pathLength="1"` path (or the mask path that reveals a dashed `.rm-line`) | drawn by `drawTo` |
| `data-rm-dot="i"` / `data-rm-tag="i"` (`data-rm-from="14"` = slide from the right) | town dot / town tag | pop / slide in after route i |
| `data-rm-base` / `data-rm-ripple` | the Riverside dot / a ring around it | pulse / ripple |

Line style: class `rm-line` = 3 px ink, dash 10 / 8. QA hook: `window.__rm` lists `{ svg, tl, st }` per built map.

## One writer per property

Each animated property of an element has exactly one owner. If a second module needs to move the same element, it
animates a different property (for example `translate` vs `transform`) or a wrapper element.

| Element | Property | Owner |
|---|---|---|
| `.pt-blind` | `transform` (xPercent) | `curtain.ts` |
| `.ld-blind` / `.ld-stage`, `.ld-skip` | `transform` (xPercent) / `opacity`, `visibility` | `loader.ts` |
| `.ld-slat` | `--x`, `--y`, `--s` (CSS transition on `transform`) | `loader.ts` |
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
| `[data-acc-title]`, `.acc-ghost`, a swap row's summary children | `opacity`, `transition` (during a switch) | `accordion.ts` |
| colours of an accordion row | `background-color`, `color`, `border-color`, `fill`, `stroke`, … | CSS transitions (`kit.css`) |
| `[data-t]` entrance items, parallax | `opacity`, `transform` | `motion.ts` |
| `[data-marquee-track]` | `transform` (x) | `marquee.ts` |
| hover lift | `translate` (CSS transition) | component CSS, `finePointer()` |
| cover photo in a clipping frame (`img[data-drift]`) | `scale` (1.14, set once), `translate` (scrub) | `motion.ts photoDrift()` |
| idle gesture | `rotate` / `scale` / `translate` (WAAPI, `composite: 'add'`, so it adds to any transform) | `idle.ts` |
| hover lift / tilt (`data-hover`) | `translate` / `rotate` / `scale` (CSS transition) | `kit.css` |

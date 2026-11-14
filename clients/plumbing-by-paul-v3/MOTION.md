# Motion grammar (Plumbing By Paul v3)

One grammar for every page. You do not write animation code: you put data attributes on markup, and
`src/scripts/motion.ts` does the rest. The goal is the opposite of a busy site: **controlled, choreographed,
hierarchical, one thing at a time**. Every section enters in the same order (eyebrow, headline, body, CTAs, media,
accents), each step starting only when the previous one is mostly done, with one calm ease, so the whole site feels
like one hand made it.

Code: `src/scripts/motion.ts` (entrances, loader, curtain, signature moments, Lenis), `src/scripts/ui.ts`
(menus, accordions, carousels; works without motion), `src/scripts/forms.ts`. Pre-states: the end of
`src/styles/global.css`. The before-paint decision script: `src/layouts/Base.astro` (inline, in `<head>`).

## 0. Where the numbers come from (measured 14 Nov 2026, round 2)

**two26.studio** (the site Nick's taste comes from), Playwright at 1440x900, GSAP calls instrumented:
- Stack: GSAP 3.15 + ScrollTrigger + SplitText + DrawSVG + CustomEase, Lenis 1.1.20 on a wrapper div.
- Lenis: `lerp 0.1` (its `duration 1.7` is ignored because lerp is set), `wheelMultiplier 0.9`, `touchMultiplier 2.6`,
  `syncTouch true`, `syncTouchLerp 0.35`, `autoRaf false` (driven by the GSAP ticker).
- Headline lines: rise from `y 105%` out of a mask, `0.85 s back.out(1.4)`, `0.12 s` between lines.
- Small items (pills, CTA text): `0.5 s back.out(1.6)` from `y 15`, opacity 0; pills pop `0.55 s back.out(2.5)` from
  `scale 0.4, y 20`; consecutive items start `0.17 s` apart.
- Image cards: clip opens from `inset(42.5%)` with a `36 px` radius while the card settles from `scale 1.45` and a 3D tilt,
  `1.25 s power3.out`, triggered at `top 85%`. Section text groups trigger at `top 80%`.
- What makes it feel like "one thing at a time" is not long gaps but **few elements per section**: a headline, a few
  pills, one card. It overlaps heavily inside a group (lines 86 %), never across many unrelated elements.

**United Plumbing** (Nick's benchmark for smoothness), branch `claude/project-thread-lela0k` and the live bundle:
- Lenis live: `new Lenis({ lerp: .1, wheelMultiplier: 1, smoothWheel: true })`, GSAP ticker drives it,
  `lenis.on('scroll', ScrollTrigger.update)`, `lagSmoothing(0)`. Native touch (no syncTouch).
- Reveals: `power3.out`, `0.9-1 s`, `y 60`; lines `0.85 s back.out(1.4)`, `0.12 s` apart; children `0.09 s` apart;
  triggers `top 88%` (single) and `top 85%` (staggers). Hero items start `0.12 s` apart (heavily overlapped).
- Wide screens: `html.style.zoom = w/1440` above 1440 px.

**What we took, and what we deliberately did not:** United's Lenis exactly; two26's line gap (0.12 s), clip-open media
and trigger points; neither site's overshoot (`back.out`) on text, because Nick asked for calm easing; and a stricter
rule than both (steps overlap at most 30 %) because Nick asked for one thing at a time and our sections hold more
elements than two26's.

**Round-1 problems measured on the live build (before this rewrite):**
- Hero: 11 elements were in motion at the same moment ~1.4 s after the handoff (tier offsets 0 / 0.12 / 0.42 / 0.55 /
  0.9 s against 0.7-1.3 s durations).
- The "image glitch after a couple of seconds": three writers fought over the hero photo's `transform`: the component CSS
  (`img { transform: scale(1.06) }`), `data-parallax` (GSAP set `scale 1.12` + a scrubbed `yPercent`) and the `frame`
  entrance (GSAP `scale 1.14 -> 1`, then `clearProps: 'transform'`). At ~4.6 s after load the clear fired and the photo
  jumped from `matrix(1, 0, 0, 1, 0, 28.56)` to `matrix(1.06, 0, 0, 1.06, 0, 0)`: a visible 6 % zoom and a 28 px jump
  (frame strips: `designs/plumbing-by-paul/v3-build/r2/motion/glitch-before-1440.png`, `-after-`). The next scroll
  would have re-applied the parallax and jumped again. Same pattern on every page whose hero photo had CSS pre-scale +
  parallax + `frame` (services hub/service heroes, town heroes, about hero, emergency hero, home crew).

## 1. Safety first: how motion switches on

The inline script in `Base.astro` sets classes on `<html>` before first paint:

| Class | Meaning |
|---|---|
| `js` | JavaScript is running. |
| `motion` | Animate. Not set when the visitor has `prefers-reduced-motion: reduce`. |
| `no-motion` | Reduced motion: everything is static and complete. |
| `intro` | First visit this browser session: the loader plays (sessionStorage `pbp-intro`). |
| `pt-in` | The visitor came from an in-site link: the curtain is down and lifts on load (sessionStorage `pbp-nav`). |

- Without JS, or with reduced motion, nothing is hidden. Every page must read completely in that state.
- With motion, `[data-t]` elements inside a `[data-m-section]` start at opacity 0 (CSS) and are released one by
  one (`.m-built`) at the moment their tween is built. Media using `data-fx="frame"` and text using
  `data-fx="nudge"` are never hidden by CSS (LCP); motion.ts hides a `frame` only once it has checked it is below the
  fold, and leaves one that is already on screen (a reload mid-page) exactly as it is.
- If the module never boots, a 3.5 s safety in `Base.astro` removes `motion`, so nothing stays hidden.
- Back/forward navigation never shows the loader or the curtain.

## 2. Sections, tiers and steps

Mark every content section with `data-m-section`. Inside it, give each animated element a tier:

| Tier | `data-t` | What | Default effect |
|---|---|---|---|
| 1 | `data-t="1"` | eyebrow, rating pill, breadcrumbs | `slide` (x -16, fade, 0.6 s) |
| 2 | `data-t="2"` | the headline | `lines` (each line rises out of a mask, 0.8 s, 0.12 s apart) |
| 3 | `data-t="3"` | lead, body, then buttons (CTAs get their own step) | `rise` (y 24, fade, 0.7 s) |
| 4 | `data-t="4"` | photos, cards, grids, maps | `rise` (y 40, fade, 0.9 s) |
| 5 | `data-t="5"` | seals, stickers, patches, chips | `pop` (scale from 0.72, -8 deg, 0.55 s, tiny settle) |

**The sequence (the core rule).** `choreograph()` sorts a section's elements into steps: tier 1, tier 2, tier 3 text,
tier 3 CTAs (anything holding a `.btn`), tier 4, tier 5, and DOM order inside a step. Then:
- A new step starts when the previous step is **70 % through its duration** (`OVERLAP = 0.3`). With `power3.out` that
  is ~97 % of the way there visually, so the eye has already left it. Never two steps moving together.
- Several elements of the same step follow at a gap that scales with their size (0.12 s for small bits, up to 0.4 s for a
  big photo), and the element after a whole `data-stagger` group waits for that group like a new step.
- Timings are not hand-written per section: the sequence is computed from the real durations, so adding an element
  just lengthens the sequence, it never makes things collide.
- One ease: `power3.out` for every entrance, `power2.out` for pure fades, `back.out(1.3)` only for tier-5 accents.
  Distances are modest (16-40 px). No bouncing text, no loops.
- `SectionHead` already wires eyebrow t1, H2 t2 and lead t3. `Seal` is t5 by default (`t={false}` turns it off).
- Long sections: an element more than about 0.8 viewport below the section top gets its own band and trigger, so a photo
  at the bottom of a tall section plays when *it* scrolls in, still in step order with its neighbours.
- Each band plays once, when its first element reaches **88 % of the viewport height** (United's point), after fonts are
  in and its lazy photos have decoded (max 0.45 s wait, so a photo never pops in mid-reveal). A band that only triggers
  when it is already high on screen (anchor jump, fast fling) plays 2.2x faster instead of making the reader wait.

### `data-fx`: override the default effect

| Value | Use for | What it does |
|---|---|---|
| `lines` | headlines | split into lines (real lines, fonts loaded), each line rises out of a mask; reverts afterwards |
| `slide` | small labels | x -16 and fade |
| `rise` | text, cards | y offset and fade |
| `nudge` | the largest text block in a hero | plain load: y 16 only, never hidden (LCP); under the loader/curtain it also fades in on its turn |
| `fade` | backgrounds, big photos behind text | opacity only |
| `frame` | the main photo of a section | the frame (ring, shadow, tint) rises in while the photo opens from a rounded `inset(9%)` and settles from 1.06; see below |
| `toss` | tilted snapshots, the roll card | rises in and settles into its CSS tilt from 5 degrees off (alternating), no overshoot |
| `pop` | seals, stickers | scales up from 0.72 with a small twist (tiny `back.out(1.3)` settle) |
| `spin` | the stamp ring | turns in from -90 degrees |
| `write` | a script word | wipes in left to right |
| `float` | retired (was an endless bob) | now behaves like `rise`: nothing loops in the eye line |

**`frame` and still photos.** The photo is animated only through the individual CSS `scale` property and its own
`clip-path`, both written by hand, never through `transform`, so it multiplies with (never replaces) any CSS transform
the component gives the img. It ends at `scale 1` and `inset(0)` = no change, so removing them afterwards moves nothing.
After its reveal **a photo never moves again**: no parallax, no settle, no loop. On a plain load (no loader, no curtain)
the hero's frame photo is not animated at all, because it is the LCP element.

### `data-stagger`

On a container with a tier: the container's rendered **children** animate one after another (0.12 s apart, the whole
group never longer than 0.84 s) with the container's effect. A child with its own `data-t` keeps its own tier (skipped by
the stagger); a child with its own `data-fx` (a `frame` photo in a bento) uses that effect inside the stagger. Use it for
chip rows, card grids, FAQ lists, rails.

### Hero: `data-m-hero`

Add `data-m-hero` next to `data-m-section` on the first section of a page. Its sequence is built at once and played at
the **handoff**: when the loader lifts (first visit), when the curtain lifts (in-site navigation), or immediately on a
plain load. The header settles first (top bar fade, logo tab slides down, 0.7 s `power3.out`), the hero sequence starts
when it is 40 % done. Stripe underlines (`data-draw`) and the hero's swoosh run last, as accents. The hero has the most
steps of any section, so its sequence runs at 1.2x (ratios kept): about 3.8 s from the first eyebrow to the last chip.
Only one hero per page.

## 3. Loader and curtain (the handoff)

- **Loader** (`components/global/Loader.astro`, first visit per session only): one beat at a time, each starting when the
  previous is ~70 % done: the ring draws round the seal (0.8 s), the seal settles, the three livery stripes slide in, the
  words, then the pipe, which fills with water while the page loads (at least 1.8 s, at most 3.4 s). Then the navy panel
  lifts with the van's swoosh as its trailing edge; the hero sequence starts 0.45 s into the lift (the panel uncovers the
  page from the bottom, so the hero top is revealed last). Any click, tap or key skips it. The hero photo loads (and
  paints, so LCP is taken) underneath it; the hero's start states are applied only as the panel starts to lift.
- **Curtain** (`components/global/Curtain.astro`): a click on an in-site link drops a navy panel with the swoosh on its
  top edge (0.65 s), then navigates. The next page lowers it away and plays its hero.
  Skipped for new tabs, modifier clicks, downloads, hash links on the same page, and `data-no-curtain` links.
- Both panels travel their own layout height (`offsetHeight`), so they stay exact under the wide-screen zoom.

You never call either one. Use `Base.astro`; `loader={false}` turns the loader off for a page (404, thank-you).

## 3b. Lenis and ScrollTrigger

- `new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, anchors: { offset: -96 } })`: United's
  live settings. Lenis' lerp is frame-rate independent (it damps by elapsed time), so it feels the same at 60 and 120 Hz.
  Touch stays native (iOS momentum), like United.
- One clock: `gsap.ticker` drives `lenis.raf`, `lenis.on('scroll', ScrollTrigger.update)`, `lagSmoothing(0)`. Lenis
  scrolls the real window, so no `scrollerProxy` is needed.
- Wide-screen zoom (Base.astro sets `html.style.zoom = width / 1440` above 1440 px): measured in Chrome 153 at 1920
  (zoom 1.3333) and 2560 (1.7778), `getBoundingClientRect`, `scrollY`, `innerHeight` and `scrollHeight` all report zoomed
  px consistently, so ScrollTrigger start points and the Lenis limit are correct with no special code (bands trigger at
  0.85-0.95 of the viewport at 1440, 1920 and 2560 alike, also after a live resize from 1280). motion.ts still re-measures
  (`lenis.resize()` + `ScrollTrigger.refresh()`, debounced) whenever `html.style.zoom` changes without a resize event and
  whenever the page height changes (accordions, late images), so triggers below never drift.
- Rule for page code: if you measure anything yourself, use `getBoundingClientRect` with `scrollY`/`innerHeight` (same
  units), or `offset*` with `offset*` (layout px); never mix the two families under zoom.

## 4. Signature moments (one or two per page, not everywhere)

| Attribute | Where | Behaviour |
|---|---|---|
| `data-count="947"` (+ `data-decimals="1"`) | a number | counts up from 0 once in view |
| `data-meter` | `Meter.astro` | the drums roll up to their digits, the last drum longest |
| `data-draw` | SVG paths (`Underline.astro`) | strokes draw in (DrawSVG) |
| `data-swoosh` | `Swoosh.astro` (on by default; `draw={false}` off) | the three ribbons run in from the leading side, once (in the hero: as the last accent) |
| `data-flow` | `FlowLines.astro` | static (the endless dash drift behind the photos was retired) |
| `data-water` | `Water.astro` | CSS drift of the two wave layers (no JS; an endless loop owned by Water.astro, see the round-2 notes) |
| `data-parallax`, `data-parallax-wrap` | (retired) | ignored: photos sit still once revealed. Remove when you next touch the markup |
| `data-pipe` + `data-pipe-fill` (+ `data-pipe-fill-v`) | Process pipe | water follows the scroll: across on desktop, down the left on mobile |
| `data-marquee` | `TownBand.astro` | endless loop at 38 px/s; scroll speed nudges it faster, then it eases back |
| `data-draw-map`, `data-route` | `PinellasMap.astro` | the county outline draws; the dashed truck route then flows once and rests |
| `data-magnetic` | primary buttons (default on `pri`/`priN`) | the button leans toward the pointer (fine pointers only) |
| (every `.btn`) | buttons | the hover fill grows from where the pointer entered |

## 5. Interface attributes (`ui.ts`, work with or without motion)

| Attribute | Behaviour |
|---|---|
| `data-header` | `.is-scrolled` after 40 px (logo tab compacts); hides going down past 600 px, returns going up |
| `data-mega-btn` / `data-mega` / `data-mega-item` / `data-mg-col` | mega menus: hover intent (fine pointers), click, ArrowDown into the panel, Escape returns focus, outside click closes |
| `data-menu-open` / `data-mnav` / `data-menu-close` / `data-mn-item` | mobile menu dialog: circle reveal from the button, focus trap, Escape, scroll lock, links close it |
| `data-fcol` (+ `data-fcol-open`) | footer columns are accordions on mobile only |
| `details[data-acc]` (+ `name`) | FAQ accordions: smooth height; one open per `name` group (native `name` is the no-JS fallback) |
| `data-carousel` / `data-track` / `data-slide` / `data-dot` / `data-count-now` | mobile rails: dots and "n of 6" follow the scroll |
| `data-crew` / `data-crew-btn` / `data-crew-*` | crew patches swap the review bubble; a patch without a quote shows the labelled stand-in |
| `data-mbar` | mobile call bar shows after the hero, steps aside over the waterline CTA |
| `select[data-placeholder]`, `input[data-photo]` + `[data-photo-label]` | placeholder colour; chosen file name |
| `form[data-estimate-form]` + `[data-form-msg]` | `forms.ts` validation and submit (see README) |

## 6. Rules for builders

1. Every content section: `data-m-section`. The first one on the page: also `data-m-hero`.
2. Use `SectionHead` for headings so tiers 1 to 3 are right without thinking.
3. One `frame` photo per section at most; secondary photos `rise` or `toss`.
4. Tier 5 is for accents only. If everything pops, nothing does.
5. No new easing curves, no new durations, no scroll-jacking, no pinning, no infinite loops in the eye line (CSS or JS).
   Ask before adding a new `data-fx`.
6. Never hide the largest element in the first viewport: use `frame` (photo) or `nudge` (text) there.
7. Never put a CSS `transform` (zoom, pre-scale) on a photo to make room for motion: photos do not move. A frame that
   holds a photo must clip it (`overflow: hidden` + `border-radius`, the `.frame` class does both).
8. Test with reduced motion on (DevTools > Rendering): the page must be complete and readable.

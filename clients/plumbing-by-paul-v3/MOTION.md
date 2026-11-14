# Motion grammar (Plumbing By Paul v3)

One grammar for every page. You do not write animation code: you put data attributes on markup, and
`src/scripts/motion.ts` does the rest. The goal is the opposite of a busy site: **controlled, choreographed,
hierarchical**. Every section enters in the same order (eyebrow, headline, body, media, accents), with one ease
family, so the whole site feels like one hand made it.

Code: `src/scripts/motion.ts` (entrances, loader, curtain, signature moments, Lenis), `src/scripts/ui.ts`
(menus, accordions, carousels; works without motion), `src/scripts/forms.ts`. Pre-states: the end of
`src/styles/global.css`. The before-paint decision script: `src/layouts/Base.astro` (inline, in `<head>`).

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
  `data-fx="nudge"` are never hidden.
- If the module never boots, a 3.5 s safety in `Base.astro` removes `motion`, so nothing stays hidden.
- Back/forward navigation never shows the loader or the curtain.

## 2. Sections and the five tiers

Mark every content section with `data-m-section`. Inside it, give each animated element a tier:

| Tier | `data-t` | What | Default effect | Starts at |
|---|---|---|---|---|
| 1 | `data-t="1"` | eyebrow, rating pill | `slide` (x -18, fade) | 0 s |
| 2 | `data-t="2"` | the headline | `lines` (line-split mask, lines rise in) | 0.12 s |
| 3 | `data-t="3"` | lead, body, buttons, links | `rise` (y 26, fade) | 0.42 s |
| 4 | `data-t="4"` | photos, cards, grids, maps | `rise` (y 56, fade, slower) | 0.55 s |
| 5 | `data-t="5"` | seals, stickers, patches, chips | `pop` (scale from 0.4, back.out) | 0.9 s |

- Several elements of the same tier follow each other 0.08 s apart, in DOM order.
- `SectionHead` already wires eyebrow t1, H2 t2 and lead t3. `Seal` is t5 by default (`t={false}` turns it off).
- Long sections: an element more than about 0.8 viewport below the section top gets its own trigger, so a
  photo at the bottom of a tall section plays when *it* scrolls in, still in tier order with its neighbours.
- Each group plays once, when its first element reaches 88 % of the viewport height.
- One ease family: `expo.out` for everything; `back.out` only for tier-5 accents (`pop`, `toss`).

### `data-fx`: override the default effect

| Value | Use for | What it does |
|---|---|---|
| `lines` | headlines | splits into lines (after fonts load), each line rises out of a mask; reverts afterwards |
| `slide` | small labels | x -18 and fade |
| `rise` | text, cards | y offset and fade |
| `nudge` | the largest text block in a hero | y offset only, never hidden (keeps LCP early under the loader) |
| `fade` | backgrounds, big photos behind text | opacity only |
| `frame` | the main photo of a section | the frame opens from a rounded inset and the photo settles from 1.14; never fully hidden (LCP-safe) |
| `toss` | tilted snapshots, the roll card | drops in with a small random tilt (back.out) |
| `pop` | seals, stickers | scales up from 0.4 with a twist (back.out) |
| `spin` | the stamp ring | spins in from -160 degrees |
| `write` | a script word | wipes in left to right |
| `float` | one decorative item per page at most | rises in, then bobs gently forever |

### `data-stagger`

On a container with a tier: the container's **children** animate one after another (0.07 s apart) with the
container's effect, instead of the container. A child that has its own `data-t` keeps its own tier and effect
(it is skipped by the stagger). Use it for chip rows, card grids, FAQ lists, rails.

### Hero: `data-m-hero`

Add `data-m-hero` next to `data-m-section` on the first section of a page. Its tiers are built at once and
played at the **handoff**: when the loader lifts (first visit), when the curtain lifts (in-site navigation), or
immediately on a plain load. Stripe underlines (`data-draw`) in the hero draw after the accents land.
Only one hero per page.

## 3. Loader and curtain (the handoff)

- **Loader** (`components/global/Loader.astro`, first visit per session only): the ring draws round the seal,
  the seal pops, the three livery stripes slide in, the pipe fills with water while the page loads (at least
  1.5 s, at most 3.2 s), then the navy panel lifts with the van's swoosh as its trailing edge. 0.42 s into the
  lift the hero starts, so the page is already moving as it is revealed. Any click, tap or key skips it.
  The hero photo loads underneath it, so LCP is not blocked.
- **Curtain** (`components/global/Curtain.astro`): a click on an in-site link drops a navy panel with the
  swoosh on its top edge (0.65 s), then navigates. The next page lowers it away and plays its hero.
  Skipped for new tabs, modifier clicks, downloads, hash links on the same page, and `data-no-curtain` links.

You never call either one. Use `Base.astro`; `loader={false}` turns the loader off for a page (404, thank-you).

## 4. Signature moments (one or two per page, not everywhere)

| Attribute | Where | Behaviour |
|---|---|---|
| `data-count="947"` (+ `data-decimals="1"`) | a number | counts up from 0 once in view |
| `data-meter` | `Meter.astro` | the drums roll up to their digits, the last drum longest |
| `data-draw` | SVG paths (`Underline.astro`) | strokes draw in (DrawSVG) |
| `data-swoosh` | `Swoosh.astro` (on by default; `draw={false}` off) | the three ribbons run in from the leading side |
| `data-flow` | `FlowLines.astro` | a slow current along the lines, desktop pointers only, only while on screen |
| `data-water` | `Water.astro` | CSS drift of the two wave layers (no JS) |
| `data-parallax="0.08"` | a photo | moves by ±8 % of its height across the viewport (scrubbed), pre-scaled so no edge shows |
| `data-parallax-wrap` | a framed hero photo | the picture inside drifts a few percent while the hero scrolls away |
| `data-pipe` + `data-pipe-fill` (+ `data-pipe-fill-v`) | Process pipe | water follows the scroll: across on desktop, down the left on mobile |
| `data-marquee` | `TownBand.astro` | endless loop at 38 px/s; scroll speed nudges it faster, then it eases back |
| `data-draw-map`, `data-route` | `PinellasMap.astro` | the county outline draws; the dashed truck route flows |
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
5. No new easing curves, no new durations, no scroll-jacking, no pinning. Ask before adding a new `data-fx`.
6. Never hide the largest element in the first viewport: use `frame` (photo) or `nudge` (text) there.
7. Test with reduced motion on (DevTools > Rendering): the page must be complete and readable.

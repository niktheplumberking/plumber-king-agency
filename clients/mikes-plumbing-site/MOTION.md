# Motion system rule (read first; fix round 1, B1)

**Every animated change is a tween with ease-in-out** (`sine.inOut` or `power2.inOut`, 0.5 to 0.9 s). That covers
background and text colour, height, position and opacity, and when one change moves several of them (an accordion row
that grows and turns from paper to ink) they run **in the same timeline**. Banned:
- `display` toggles mid-animation (keep the element rendered until its tween ends, then hide it);
- class swaps that change colour with no transition (the class may flip, but a CSS `transition` or a tween carries it);
- `.set()` jumps that can be seen (a `set` is only allowed off-screen, under a cover, or to the value already showing);
- CSS defaults that differ from the JS start state (the CSS under `html.motion` must equal frame 0 of the timeline, so
  nothing flashes or snaps when the script builds).

One writer per property: each animated property of an element has exactly one owner (a kit module or one component
script). The table and the kit API: `src/components/kit/README.md`. Scroll-scrubbed moments, the accordion, the curtain
and the re-measure all live in `src/components/kit/`; components configure them with data attributes and never write
their own copy.

# Motion grammar (Plumbing By Paul v3)

One grammar for every page. You do not write animation code: you put data attributes on markup, and
`src/scripts/motion.ts` does the rest. The goal is the opposite of a busy site: **controlled, quick, hierarchical**.
Since round 3 every section reveals in **three priority groups** (G1 the message: headline, lead, main photo; G2 the
support: eyebrow, buttons, chips, captions, patches, small cards; G3 the flourishes: seals, underlines, swooshes,
counters), each group a beat after the previous one, the whole section done in about a second, as it enters the
viewport. One calm ease, so the whole site feels like one hand made it. Photos and heads add depth with a gentle
United-style parallax.

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

**What we took in round 2 (the strict one-step-at-a-time rule below was replaced in round 3 by the three groups):** United's Lenis exactly; two26's line gap (0.12 s), clip-open media
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

**Round 3 (15 Nov 2026), Nick's verdict on round 2:** "entrances happen too many times and too slowly; scroll faster
and you skip them and see empty sections; United had smoother entrances and a softer scroll."
- Measured on the round-2 build (Playwright, a per-frame sampler that flags content >= 50 % inside the viewport at
  opacity < 0.2): at reading pace content sat invisible in view for up to **2.2-2.95 s** (Home 1440: 1953 of 2221 frames
  had some), and after a fast wheel scroll **5-36 elements were still hidden** when the scroll stopped. Causes: one
  step at a time (a section took 3-4 s), bands waiting for the band above (`queuePlay`, up to 3 s), a 0.45 s wait for
  lazy photos to decode, and triggers at 88 %.
- United live (`united-plumbing-pomona.vercel.app`, Playwright, inline transforms sampled while scrolling) and its
  source (`git show origin/claude/project-thread-lela0k:clients/united-plumbing-site/src/scripts/motion.ts`):
  every cover photo in a clipped frame drifts inside its frame `translate 0 -5% -> 5%` (img pre-scaled `1.14`, scrub
  0.6); every section H2 drifts `y +40 -> -20 px` (scrub 0.8); the hero photo carries `data-parallax` (`yPercent`
  +-6 %). Lenis `lerp 0.1`, wheel 1.
- What we took: United's amount of depth (most photos and every section head move) and its scrub feel; NOT its
  photo-inside-frame drift (that needs a CSS pre-scale on the photo, the round-2 glitch; our photos never move inside
  their frame: the whole media column drifts instead).
- Result after the rewrite (same sampler, Home / water-heaters / about / reviews / emergency at 1440 and 390): see
  `designs/plumbing-by-paul/v3-build/r3/README.md`.

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

## 1b. Round 4 (15 Nov 2026): United's scroll UX on Paul's UI (current model)

Nick on round 3: reveals were so fast they never visibly happened (the "Who shows up?" crew chips never animated), the site
felt preloaded. Ask: copy United Plumbing's scroll UX onto Paul's UI; keep his 3 priority groups as small delays; keep the
UI and the round-3 parallax; no element may flash before its entrance. Plan: `designs/plumbing-by-paul/ROUND4-MOTION-PLAN.md`
(+ second-review corrections). Proof: `designs/plumbing-by-paul/v3-build/r4/README.md`.

**Removed** (round 3): the band model (one trigger per 0.7-viewport band), `START 'top 105%'`, the 2.5x speed-up for late
bands, the Lenis-velocity speed-up (up to 5x), the fling instant-finish (>= 45 px/frame) and the counter speed-up.
Markup is unchanged: the round-3 `data-t` / `data-fx` / `data-stagger` / `data-g` attributes are classified centrally in
motion.ts (`fxOf()` = effect, `groupOf()` = group). No component was edited.

**Model** (United's `initReveals`): every element has its OWN `once` ScrollTrigger and plays when it reaches it, never
faster, never skipped. Exceptions: a **section head** (the headline's `.shead`, else the headline's parent: eyebrow,
headline, and the lead/buttons starting within half a viewport of it) shares ONE trigger, ordered inside by group (Nick
round 3: controlled, not everything moving); an element whose box is already **above** the viewport when its tween is built
is set to its end state (anchor jump, reload mid-page); anything on screen or below animates.

| Trigger (United) | Used for |
|---|---|
| `top 88%` | single elements, section heads, split headlines |
| `top 85%` | `data-stagger` groups (rails, grids, lists) |
| `top 92%` | `data-draw` underlines, swoosh edges |
| `top 90%` | counters, the water meter |

**Effects (United's table, `fromTo` with explicit end values, `immediateRender: true`):**

| Effect | From -> to | Duration, ease | Paul elements (mapping in `fxOf()`) |
|---|---|---|---|
| `lines` | each line `yPercent 110, rotate 2` -> 0, in a mask | 0.9 s, 0.1 s/line, `back.out(1.4)` (hero 0.85 s, 0.12 s/line) | every `data-t="2"` headline |
| `up` | `y 60`, opacity 0 | 1.0 s `power3.out` (hero 0.9) | eyebrows (t1), leads/body/buttons (t3), small cards, `rise`, stagger lists/grids |
| `left` / `right` | `x -80` / `x 80` (phones +-40) | 1.0 s `power3.out` | t4 cards/panels that are a side column (< 60 % of the section wide, centre left of 45 % / right of 55 %); `slide` |
| `scale` | `scale 0.92`, opacity 0 | 1.0 s `power3.out` | big centred t4 blocks (>= 200 px tall), `frame` photos inside a stagger grid |
| `clip` | `clip-path inset(-5% -5% 100% -5%)` -> `inset(-5%)`, + 0.3 s fade-in | 1.2 s `power3.inOut` (hero 1.1) | every `frame` photo: the frame opens top to bottom as one piece; negative insets keep the white ring and shadow; clip removed at the end; the photo itself is never transformed |
| `pop` | `scale 0.6, y 20`, opacity 0 | 0.6 s `back.out(2.2)` | t5 chips, patches, pills, seals; `pop` |
| stagger children | the group's effect, children 0.09 s apart | 0.9 s each | `data-stagger` (crew chips: `pop`, 6 chips over 0.45 s) |
| `toss` | `y 60`, CSS tilt +-4 deg | 1.0 s `power3.out` | tilted snapshots |
| `spin` / `write` / `fade` | as before, United durations | 0.9 / 0.9 / 1.0 s | stamp ring / script word / backgrounds |
| `nudge` | `y 24` (plain load: never hidden, LCP) | 0.9 s | the hero lead only; outside a hero it is `up` |

**Nick's groups = small delays on top of each element's own trigger** (`G_DELAY`): **G1 +0** (headline, lead/body,
main photo, big cards), **G2 +0.15 s** (eyebrow, pills, buttons, chips, captions, patches, small cards, lists),
**G3 +0.3 s** (seals, stamps, script flourishes, underlines, swooshes, counters, meters). Inside a section head, items of
one group start 0.1 s apart in DOM order (max +0.2 s). `groupOf()` is unchanged from round 3; `data-g` still overrides.

**Hero** (United `heroTimeline`): one ordered timeline at the handoff: items in group order, 0.12 s apart, a split
headline holds the next item for 0.12 s per line, each new group adds 0.15 s, G3 (stripe underline 0.8 s, swoosh 0.9 s)
last. Under the loader or curtain the header settles first (top bar fade 0.5 s; logo tab, nav items and header buttons
drop `y -24`, 0.6 s, 0.05 s apart); the hero starts 0.25 s in. On in-site navigation both run **1.5x**. On a plain load
there is no header beat (it would flash) and the LCP photo is not animated.

**Build**: the hero at the handoff; everything else right after it, in idle slices of ~12 ms (tweens and SplitText line
splits up front, like United, so no layout work happens mid-scroll), then signatures, then the parallax in its own slice.
Pre-hide: CSS `opacity 0` on every `[data-t]` until `.m-built` (a stagger group hides its children through its own
opacity); `.m-built` is added in the same task that applies the tween's start state, so nothing flashes. Exceptions (LCP):
`frame` and `nudge` are not CSS-hidden; below the fold their start state is applied when built; a frame on screen at build
time is left exactly as it is. Every tween and trigger is registered, so the first Tab finishes them all.
A trigger nested inside another animated element (a patch on a review card) subtracts its hosts' current `y` at every
refresh, so a host still at its y 60 start offset does not push the nested trigger point 60 px down.

**Curtain**: lifts at once on in-site navigation (it no longer waits for fonts); the hero is hidden while the panel still
covers it and its timeline is built when the fonts are in (max 0.7 s, normally cached).

**Lenis**: United exactly, `lerp 0.1` (round 3 had 0.085); no velocity listener.
**Parallax**: unchanged from round 3 (section 4b), except the toggling `will-change: transform` was dropped.
Entrances never touch `yPercent` (the parallax channel on `[data-px]` elements) and never clear `transform` on them.

## 2. Sections, tiers and the three groups (markup API; the timing below is round 3 history, see 1b)

Mark every content section with `data-m-section`. Inside it, give each animated element a tier (it picks the default
effect and, with the element's role, its priority group):

| Tier | `data-t` | What | Default effect |
|---|---|---|---|
| 1 | `data-t="1"` | eyebrow, rating pill, breadcrumbs | `slide` (x -16, fade, 0.55 s) |
| 2 | `data-t="2"` | the headline | `lines` (each line rises out of a mask, 0.7 s, 0.06 s apart) |
| 3 | `data-t="3"` | lead, body, buttons, captions | `rise` (y 20, fade, 0.6 s) |
| 4 | `data-t="4"` | photos, cards, grids, maps | `rise` (y 28, fade, 0.75 s) |
| 5 | `data-t="5"` | seals, stickers, patches, chips | `pop` (scale from 0.75, -6 deg, 0.5 s, tiny settle) |

**The three priority groups (the core rule, round 3).** `groupOf()` in motion.ts sorts a band's elements:

| Group | Starts | Gets |
|---|---|---|
| G1 the message | 0 | headline (t2), lead and body text (t3 without buttons), the main photo (`frame`, `fade`, any t4 taller than 120 px), card grids whose cards are >= 160 px tall or hold a frame |
| G2 the support | +0.18 s (hero +0.24 s) | eyebrow/rating pill (t1), buttons (t3 holding a `.btn`), t3 lists (`data-stagger`), captions/footnotes (`.caption`, `.label`, `figcaption`), snapshots (`toss`), small t4 (< 120 px) and grids of small cards/rows, t5 chips, captions, pills, name patches, chip rails |
| G3 the flourishes | +0.18 s after G2 | seals/stamps/medals/number stickers (`.seal .stamp .medal .nst`), `spin`, `write` and t5 `.script` flourishes, empty decorative shapes (a colour block), the section's `data-draw` underlines; the hero's swoosh; counters and meters start 0.3-0.35 s after they enter |

- A later group starts after the previous non-empty group; a band with only G2 items starts them at 0.
- Inside a group items start 0.05 s apart in DOM order (never more than 0.15 s in total); the children of a
  `data-stagger` group 0.05 s apart (the whole list never more than 0.25 s).
- Result: a band is fully revealed **~0.9-1.05 s** after it triggers (worst case: G3 at 0.36 s + 0.15 s + 0.5 s pop).
  The hero, after the loader/curtain, measures **~1.3 s** from the handoff (1.6 s including the header beat).
- `data-g="1|2|3"` on an element overrides the mapping (no page needed it at round 3).
- One ease: `power3.out` for every entrance, `power2.out` for pure fades, `back.out(1.3)` only for G3 seals/stamps.
  Distances are small (16-28 px). No bouncing text, no loops.
- `SectionHead` already wires eyebrow t1 (G2), H2 t2 (G1) and lead t3 (G1). `Seal` is t5 (G3; `t={false}` turns it off).
- Long sections (round 3, removed in round 4): an element more than 0.7 viewport below the section top gets its own band and trigger, so a photo at
  the bottom of a tall section reveals as *it* enters.
- **Triggers (round 3, removed in round 4)**: a band plays when its first element's top reaches **105 % of the viewport height** (i.e. as it enters,
  a few px early), immediately: it never waits for another band and never waits for photos to decode.
- **Fast scrolling (round 3, removed in round 4)** (three guards in motion.ts): a band that triggers when it is already above
  55 % of the viewport plays 2.5x faster; one that has already left the viewport is set to its end state at once; while
  bands are playing, the Lenis velocity speeds them up (up to 5x above 20 px/frame), and a fling (>= 45 px/frame,
  ~2700 px/s) finishes running bands at once and shows bands that trigger during it already finished.

### `data-fx`: override the default effect

| Value | Use for | What it does |
|---|---|---|
| `lines` | headlines | split into lines (real lines, fonts loaded), each line rises out of a mask (0.06 s apart); reverts afterwards |
| `slide` | small labels | x -16 and fade |
| `rise` | text, cards | y offset and fade |
| `nudge` | the largest text block in a hero | plain load: y 16 only, never hidden (LCP); under the loader/curtain it also fades in on its turn |
| `fade` | backgrounds, big photos behind text | opacity only |
| `frame` | the main photo of a section | the frame (ring, shadow, tint) rises 24 px in while the photo opens from a rounded `inset(6%)` and settles from 1.04 (0.85 s); see below |
| `toss` | tilted snapshots, the roll card | rises in and settles into its CSS tilt from 4 degrees off (alternating), no overshoot |
| `pop` | seals, stickers | scales up from 0.75 with a small twist (tiny `back.out(1.3)` settle) |
| `spin` | the stamp ring | turns in from -60 degrees |
| `write` | a script word | wipes in left to right |
| `float` | retired (was an endless bob) | now behaves like `rise`: nothing loops in the eye line |

**`frame` and still photos.** The photo is animated only through the individual CSS `scale` property and its own
`clip-path`, both written by hand, never through `transform`, so it multiplies with (never replaces) any CSS transform
the component gives the img. It ends at `scale 1` and `inset(0)` = no change, so removing them afterwards moves nothing.
After its reveal **a photo never moves inside its frame**: no settle, no loop, no in-frame drift. The parallax moves the
whole media column around it (section 4b). On a plain load (no loader, no curtain) the hero's frame photo is not
animated at all, because it is the LCP element.

### `data-stagger`

On a container with a tier: the container's rendered **children** animate one after another (0.05 s apart, the whole
group never longer than 0.25 s) with the container's effect. A child with its own `data-t` keeps its own tier (skipped by
the stagger); a child with its own `data-fx` (a `frame` photo in a bento) uses that effect inside the stagger. Use it for
chip rows, card grids, FAQ lists, rails.

### Hero: `data-m-hero`

Add `data-m-hero` next to `data-m-section` on the first section of a page. Its sequence is built at once and played at
the **handoff**: when the loader lifts (first visit), when the curtain lifts (in-site navigation), or immediately on a
plain load. The header settles first (top bar fade, logo tab slides down, 0.7 s `power3.out`), the hero groups start
when it is 40 % done: G1 (H1 lines, lead, photo), G2 0.24 s later (rating pill, buttons, caption, snapshot, chips),
G3 0.24 s after that (seals, the stripe underline `data-draw` 0.7 s, the swoosh 0.8 s). Measured: hero settled 1.27 s
after the handoff on a plain load or curtain, 1.6 s after the loader handoff (header beat included). Only one hero per page.

## 3. Loader and curtain (the handoff)

- **Loader** (`components/global/Loader.astro`, first visit per session only): one beat at a time, each starting when the
  previous is ~70 % done: the ring draws round the seal (0.8 s), the seal settles, the three livery stripes slide in, the
  words, then the pipe, which fills with water while the page loads (at least 1.8 s, at most 3.4 s). Then the navy panel
  lifts with the van's swoosh as its trailing edge; the hero sequence starts 0.45 s into the lift (the panel uncovers the
  page from the bottom, so the hero top is revealed last). Any click, tap or key skips it. The hero photo loads (and
  paints, so LCP is taken) underneath it; the hero's start states are applied only as the panel starts to lift.
- **Curtain** (`components/kit/Curtain.astro` + `kit/curtain.ts`; fix round 1 A-3/B4): one channel, GSAP `yPercent` on
  `.pt-panel` (no CSS transform on it). A click on an in-site link covers the page in one continuous `0.6 s power2.inOut`
  move (yPercent 100 to 0, the panel is one wave-edge taller at each end so 0 is full coverage), THEN navigates. The next
  page starts covered (`html.pt-in`, set before paint), is put at the top under the cover (`history.scrollRestoration =
  'manual'` while arriving, `lenis.scrollTo(0, { immediate: true })`), then the panel lifts to yPercent -100 in
  `0.75 s power2.inOut`; the hero plays once the panel has cleared the header, and `scrollRestoration` returns to
  `'auto'` after the lift so back/forward keep the browser's native restore. A cross-page link drops its `#hash`
  (a new page always opens at the top). Skipped for new tabs, modifier clicks, downloads, hash links on the same page
  (Lenis scrolls those smoothly), and `data-no-curtain` links.
- Both panels travel their own layout height (`offsetHeight`), so they stay exact under the wide-screen zoom.

You never call either one. Use `Base.astro`; `loader={false}` turns the loader off for a page (404, thank-you).

## 3b. Lenis and ScrollTrigger

- `new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, anchors: { offset: -96 } })`: United's
  live settings exactly (round 4; round 3 used lerp 0.085 and a velocity-driven fast-scroll guard, both removed). Lenis' lerp is frame-rate independent (it damps by elapsed time), so it feels the same at 60 and 120 Hz.
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
| `data-count="947"` (+ `data-decimals="1"`) | a number | G3: counts up from 0 as it enters (1.2 s `expo.out`, 0.35 s in); already passed = final value at once |
| `data-meter` | `Meter.astro` | G3: the drums roll up to their digits (0.9 s + 0.15 s per drum), the last drum longest |
| `data-draw` | SVG paths (`Underline.astro`) | G3 of its band: strokes draw in (DrawSVG, 0.7 s) |
| `data-swoosh` | `Swoosh.astro` (on by default; `draw={false}` off) | the three ribbons run in from the leading side, once, as it enters (in the hero: G3) |
| `data-flow` | `FlowLines.astro` | no dash drift; the flow lines take part in the parallax (+-48 px) |
| `data-water` | `Water.astro` | CSS drift of the two wave layers (no JS; an endless loop owned by Water.astro, see the round-2 notes) |
| `data-parallax`, `data-parallax-wrap` | (retired) | ignored: parallax is automatic since round 3 (section 4b). Remove when you next touch the markup |
| `data-no-px` | on a frame | keeps that photo's media column out of the parallax |
| `data-pipe` + `data-pipe-fill` (+ `data-pipe-fill-v`) | Process pipe | water follows the scroll: across on desktop, down the left on mobile |
| `data-marquee` | `TownBand.astro` | endless loop at 38 px/s; scroll speed nudges it faster, then it eases back |
| `data-draw-map`, `data-route` | `PinellasMap.astro` | the county outline draws; the dashed truck route then flows once and rests |
| `data-magnetic` | primary buttons (default on `pri`/`priN`) | the button leans toward the pointer (fine pointers only) |
| (every `.btn`) | buttons | the hover fill grows from where the pointer entered |

## 4b. Parallax (round 3, automatic)

`parallax()` in motion.ts picks the targets itself, per section, at idle time (desktop >= 1024 px full range, tablet
0.6x, phones < 640 px 0.45x, reduced motion: off with the rest of motion). Each target is scrubbed over its pass through
the viewport (`top bottom` -> `bottom top`, `scrub 0.5`, driven by the same Lenis/ScrollTrigger clock):

| Target | Desktop range | Direction |
|---|---|---|
| Media column: the highest ancestor of a `frame` that holds only media (the frame + its caption, patches, snapshots, stickers; stops at text, at a second frame, at `data-stagger`/carousels, at 1.3 viewports tall) | +-36 px | lags (moves with the page, slower) |
| Accents riding on that column (`.seal .stamp .medal .nst`, `toss`, `pop`) | +-14 px against it | leads: depth inside the column |
| Hero media column | 0 -> +64 px as the hero scrolls away (starts at 0: nothing moves at load, LCP/CLS untouched); its accents 0 -> -28 px | lags |
| `.shead` (eyebrow + headline + lead as one block) | +24 -> -24 px | leads (United: H2 +40 -> -20) |
| Seals/stamps/medals not on a photo | +-28 px | leads |
| `img[data-flow]` flow lines | +-48 px | lags the most |
| Empty decorative blocks with a tier (colour block behind a photo) | +-30 px | lags |

- **Room cap**: every range is capped by the free space above and below the target (to text, buttons and `[data-t]`
  content that overlaps it horizontally, and to the section's edges when the section does not clip), minus 8 px;
  under 8 px of room the target stays still. So nothing drifts into its neighbours (e.g. Home medals stay still).
- **One writer per property** (rule 7): a target that has no entrance (a wrapper, a `.shead`, a flow line) moves through
  the CSS `translate` property; a target that also has an entrance (a seal, a snapshot) moves through GSAP's own
  `yPercent` component, which entrances (y, rotation, scale) never touch (it gets `data-px`, and its `frame` entrance then
  does not `clearProps: transform`). Photos are never targets: they ride inside their column.
- **Crisp photos**: every value is snapped to whole device pixels (`devicePixelRatio x html zoom`), so the photo is never
  resampled at a sub-pixel offset; `will-change: transform` is set only while the target is in view.
- Triggers are measured without the drift (`refreshInit` clears it, `refresh` repaints), so band start points never move.
- Measured (frame-strip probe, Home/about 1440, water-heaters 390): 0 off-grid samples, photo offset inside its frame
  constant (1 value per column across the whole scroll), no inline transform on any img, no step jump.

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
   Ask before adding a new `data-fx`. Never make a band wait for another band, and never add a wait before a band plays.
6. Never hide the largest element in the first viewport: use `frame` (photo) or `nudge` (text) there.
7. Never put a CSS `transform` (zoom, pre-scale) on a photo to make room for motion: photos do not move inside their
   frame. A frame that holds a photo must clip it (`overflow: hidden` + `border-radius`, the `.frame` class does both).
   One writer per property per element: entrances own `transform`/opacity/clip, parallax owns `translate` (or GSAP
   `yPercent` on an element that also has an entrance), the frame reveal owns the img's `scale`/`clip-path`. Do not
   set the CSS `translate` property on anything inside a `data-m-section`.
8. Test with reduced motion on (DevTools > Rendering): the page must be complete and readable.

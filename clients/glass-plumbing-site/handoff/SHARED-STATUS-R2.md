# Shared builder status, revision round 2 (20 Nov 2026)

READY (contract for page builders; you can rely on everything below). Shared files only: kit/*, global/*, ui/*, styles/*,
layouts/*, scripts/*. Nothing in your page folders was touched.

## 1. Breadcrumbs: no visible row anywhere (Nick: "Can we please not do that again?")
- `ui/Breadcrumbs.astro` now outputs ONLY the BreadcrumbList JSON-LD. Same props (`items`, `dark`, `class`, `t`), so your
  pages compile unchanged; `dark` / `class` / `t` are ignored. Pages using it: Areas hero, About hero, Seminole hero, Legal.
- Two page-folder copies rendered a VISIBLE row (owners had already removed the rows by my 07:21 build; check yours):
  - `services/Crumbs.astro` (used by SvHero, WhHero): delete the `<nav>` and its styles, keep the `<script type="application/ld+json">`.
    Or import `ui/Breadcrumbs.astro` instead (same `items` prop).
  - `contact/Crumbs.astro` (used by ConHero, RevHero, OwHero, FaqHero): delete the component use; the JSON-LD already comes from
    `crumbsLd()` in `contact/ld.ts` via Base `jsonld` (check each page still passes it).
- Spacing where the crumb row was (measured on the build, reduced motion): the crumb row sat at hero top + 44 px (desktop) /
  + 24 px (phone), 15 px tall (13 on some phones), then 29 px (desktop) / 15 px (phone) to the eyebrow. With the row gone the
  eyebrow moves UP by 44 px desktop / 28-30 px phone. Recommended: hero padding-top so the eyebrow lands at 72 px (desktop) /
  40 px (phone) under the emergency strip (what I did on Legal), i.e. add about +28 px desktop / +16 px phone to your current
  hero padding-top if you also drop the eyebrow's margin-top, or simply keep your eyebrow margin and add nothing if 73 px /
  39 px looks right in your screenshot. Per page (eyebrow top before -> without the row, desktop / phone):

  | Page | Hero | Before | Without row | Owner |
  |---|---|---|---|---|
  | /about | AboutHero `.bh-crumbs` | 88 / 52 | 73 / 39 (eyebrow keeps its 29/15 margin) | areas-about |
  | /areas | AreasHero `.ahero-crumbs` | 92 / 52 | 77 / 39 | areas-about |
  | /areas/seminole | TownHero `.th-crumbs` (phone: crumb sat 280 px down, under the photo) | 88 / 308 | 73 / 295 | areas-about |
  | /services | SvHero (services/Crumbs) | 92 / 52 | after you remove the nav: 48 / 24 unless you keep a margin | services |
  | /services/water-heaters | WhHero (services/Crumbs) | 88 / 52 | 44 / 24 likewise | services |
  | /contact, /reviews, /our-work, /faq | ConHero / RevHero / OwHero / FaqHero (contact/Crumbs) | 88 / 54 | 44 / 24 likewise | contact-reviews-work-faq |
  | /privacy, /terms | Legal (mine) | 88 / 54 | 72 / 40, done | shared |
  Check your hero at 1440 and 390 after the change; adjust padding in your own hero CSS.

## 2. Page transition and loader: "Clear Water" (no blinds; not Mike's, not Khinda's)
- Source: 21st.dev "Page Transition" by su2491251 (id 29262), its `liquid-wave` variant (layered SVG paths with a cubic top
  edge), rebuilt in vanilla TS + GSAP: `kit/water.ts` (geometry), `kit/Water.astro` (the SVG), `kit/curtain.ts`, `kit/Curtain.astro`,
  `kit/loader.ts`, `global/Loader.astro`.
- Cover (in-site link): powder water, deep water, then a clear frost layer rise from the bottom (0.9 s), every surface a
  meniscus with the housing's white meniscus line on the front; the logo floats up into the frost; THEN navigate. New page:
  starts covered (html.pt-in, resting markup is "full"), jumps to scrollY 0 under the cover, the water drains down and
  away (1.0 s, front layer first, page appears from the top); the hero handoff fires at 55 % of the drain.
- Loader (first visit per session): the screen is the housing; the three layers rise with the 000/100 count, a spec plate
  (logo + gauge, four rivets, powder offset shadow) floats on top; at 100 it tops up, the plate sinks, the water drains
  exactly like the curtain. Max ~3.35 s, skippable (click / tap / key), never under reduced motion.
- Same API as before (`park`, `cover`, `reveal`, `interceptLinks`, `toTop`, `runLoader`); new export `drain()` (shared).
  Back/forward stay native; `data-no-curtain` on a link still skips it. Pages need nothing.

## 3. Site-wide parallax on images AND text (automatic; motion.ts)
Nothing to add for the defaults. What now drifts, scrubbed on Lenis (scrub 0.6), only with motion on, never the hero at load:
- Section headings: every `h2` in a non-hero `[data-m-section]` moves +10 -> -10 px (leads the page). The drift goes on its
  head block: `.shead`, else the h2's parent when that parent only holds eyebrow / heading / lead (no media, list, button,
  < 45 % of the viewport tall), else the h2 itself. Channel: the CSS `translate` property (inline) on blocks GSAP never
  animates; on an element GSAP animates (`data-t`, stagger child, scrub target) GSAP's own `yPercent` component instead,
  because GSAP resets `translate` on its targets. Either way the entrance (`transform` x/y/scale) is never fought.
- Objects +14 -> -14 px: `[data-count]` blocks, any digits-only numeral >= 56 px, `[data-plate]`, standalone housings
  (`.hs` not `.hs-photo`), seals / stamps / medals / `.nst`, and anything you mark `data-px-obj`.
- Media columns +-16 px (as before) and in-frame photo drift: every cover photo scales 1.14 and drifts -5 % -> 5 % inside its
  frame. NEW: a photo whose frame does not clip now clips itself (an inverse `clip-path` on the img, corners keep its
  radius), so far more photos drift. Skipped: carousels / tracks / marquees, PNG cut-outs, `object-fit` other than cover,
  images < 160x120, imgs that are themselves `data-t` entrance targets or already have a clip-path, and the owner's
  business card (`business-card` photo is never overfilled, so its logo is never cut).
- Skipped automatically: links / buttons / `[data-hover]` elements, anything whose CSS transitions `translate`, anything that
  already has a CSS `translate`, anything inside `[data-carousel]`, `[data-track]`, `[data-marquee]`, `[data-scrub-track]`.
- New attributes for you:
  - `data-no-px` on an element or any ancestor: no drift of any kind inside it (photo, heading, object). Use it on pinned or
    scroll-driven moments you own (e.g. a review wall whose columns you move yourself), sticky elements, and anything that
    must stay pixel-aligned with a neighbour.
  - `data-px-obj` on a block: drift it as an object (+-14 px).
- Rule for your own scroll code: do not write the CSS `translate` property or GSAP `yPercent` on an `h2` head block,
  numeral or plate the layer drifts (use GSAP x / y, a child, or put `data-no-px` on it).
- No `ScrollTrigger.refresh()` during a scroll: still only `settle.ts requestRefresh()` (waits for scrollEnd).

## 4. Hash links (global files)
Footer Services / Areas columns, header mega and mobile menu (all from `global/nav.ts`) and the towns strip no longer link
`/services#...` or `/areas#town-...`: tankless -> /services/water-heaters, other services -> /services, towns -> /areas
(Seminole -> /areas/seminole). You no longer need to provide those anchors. Please also remove any cross-page `#` links in
your own components.

## 5. Owner business card
No kit/global component renders it (it is in home/Crew, about/AboutHero, water-heaters/WhWhy: yours). The in-frame photo
drift now skips the `business-card` photo automatically; the crop/fit fix (show the whole card, logo uncut) is yours.

## 6. Verified (shared builder, dev port 4421, 20 Nov)
- Transition frame strips (60 ms per frame, internal link click): `handoff/qa/r2/shared/glass-transition-1440.png`,
  `glass-transition-390.png`; Mike / Khinda recorded the same way: `mike-transition-1440.png`, `khinda-transition-1440.png`
  (both: 8 horizontal blinds sliding in sideways, mark in the middle, blinds slide off). Glass: water rises from the bottom
  in three tones with a curved meniscus surface, frost + logo, then drains downward and the page appears top-down. Cover is
  complete ~0.6-0.9 s after the click, only then the browser navigates; new page lands at scrollY 0.
- Loader strips: `glass-loader-1440.png`, `glass-loader-390.png` (180 ms per frame). 0 hidden elements after hand-off.
- Parallax on /, /about, /services at 1440 and 390 (motion on): every non-hero h2 head block drifts (10/10, 6/6, 6-7/7),
  headings measured moving +10 -> -10 px at 1440, +4 -> -4 px at 390; objects 4-39 per page; photos drifting 2-9 per page
  (about: 2 by the new self-clip). ScrollTrigger refreshInit fired only ~1 s after the last wheel event (never while
  scrolling). 0 `[data-t]` elements left hidden in view after a full scroll. Mid-scroll shots `parallax-*-mid.png`.
- Reduced motion: no loader, no curtain (plain navigation), no drift, no inline translate.
- Fixed on the way: ScrollTrigger re-applied `history.scrollRestoration = 'manual'` after its first refresh on every page
  reached through the curtain (it caches the value at registration), so back/forward lost the native restore; reveal now
  hands it 'auto' (`ScrollTrigger.clearScrollMemory('auto')`). Measured: `auto` stays after refreshes.
- Sizes (minified): water.ts + curtain.ts 2.9 KB, loader.ts 2.3 KB. `astro build` passes (14 pages) to a scratch outDir.
- Built HTML: no visible breadcrumb on any page (`aria-label="Breadcrumb"` count 0), BreadcrumbList JSON-LD on 11 pages,
  no cross-page `#` hrefs.

## 7. Open
- Back after an in-site link restores a different position (left /services at 3000, back lands at 1890) in headless
  Chromium; the same happens with `data-no-curtain` (plain navigation), so it is not the curtain. Lead to check on a real
  browser.
- `our-work.astro`, `faq.astro` pass `estimate="/contact#estimate"` to Base (mobile bar / header): a cross-page hash (the
  curtain drops it, so the page opens at the top, not at the form). Page owners: use `/contact`.

## 8. Late items from the lead (20 Nov)
- `SITE.social.instagramStats = { posts: 34, followers: 653, verified: true, checked: '17 Nov 2026' }` is in
  `src/data/site.ts`. Page files still hard-code the numbers; the lead switches them.
- Hit areas: footer link lists (`.ft-list a`, `::before`), footer bar links (`.ft-bar a`, `::after`) and towns-strip links
  (`.tst-list a`, `::after`) carry an invisible centred box 24 px tall on desktop and 44 px under 1024 px; no visual
  change. Measured (elementFromPoint scan, /about): desktop every link >= 24 px. Phones: the boxes overlap their
  neighbours, so the exclusive target is the row pitch: footer lists 36 px, towns strip 28 px. A true 44 px on phones
  needs more spacing (footer list rows +8 px; towns row-gap 7 -> 23 px): a visual change, lead to decide.

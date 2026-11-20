
## CONTACT/REVIEWS/OUR-WORK/FAQ builder (19 Nov)
- **Towns strip** (dark band "Serving all of Pinellas County from Largo" above the footer on every page): it is page-independent,
  so it belongs in `global/` (e.g. `global/TownsStrip.astro`). Until it exists I use my own copy in
  `src/components/contact/TownsStrip.astro` on /contact, /reviews, /our-work, /faq; the lead can swap it for the shared one.
- `forms.ts` requires `input[name=name]`; the FAQ "Ask a real plumber" box has only question + phone in Figma, so it uses
  its own small submit script (same rule: FORM_ENDPOINT from lib/form.ts, else /thank-you). No change needed in forms.ts.

## SERVICES builder (19 Nov)
- **Fonts**: `tokens.css` registers Public Sans 400/600 and JetBrains Mono 500 only, and `scripts/late-fonts.ts` adds PS 500/800/400i
  and JM 400/800. **Public Sans 700 and JetBrains Mono 700 are registered nowhere**, but the Figma uses them everywhere (buttons
  "Public Sans Bold", eyebrows/labels "JetBrains Mono Bold"); the browser fakes the bold. Please add both `@font-face` (files are in
  `public/fonts/`). The late-fonts comment says they are in tokens.css; they are not.
- **Towns strip**: same as the request above; until a `global/TownsStrip.astro` exists I use my own copy in
  `src/components/services/TownsStrip.astro` on /services and /services/water-heaters.

## HOME builder (19 Nov) -> SHARED: phone overrides of Housing and Plate never apply (bug)
- `kit/Housing.astro` and `kit/Plate.astro` write the desktop values as INLINE custom properties (`style="--cap:36px;--pad:16px;..."`)
  and switch to the phone values in a `@media (max-width: 767px)` class rule (`.hs { --cap: var(--capm) }`, `.pl { --pad: var(--padm) }`).
  An inline custom property always beats a class rule, so under 768 the desktop cap / glass top / radius / port / highlight /
  shadow (Housing) and pad / size / kx / pitch / title size (Plate) stay. Measured on Home at 390: Housing `--cap` = 23px (capm 17),
  Plate `--pad` = 16px (padm 10), so the hero "On the job" plate wraps "Glass van" / "Mini-excavator".
  Fix suggestion: name the inline ones `--cap-d` / `--pad-d` (and `-m`) and set `--cap: var(--cap-d)` in the base rule,
  `--cap: var(--cap-m)` in the phone rule. Width/height already work (they use `--hwm` directly).

## AREAS + ABOUT builder (19 Nov)
- **Schibsted Grotesk 900 (Black)**: Figma uses it for the outlined answer words on /areas/seminole (City FAQ) and the huge
  rule numbers on /about; `public/fonts/schibsted-grotesk-latin-900-normal.woff2` exists but no `@font-face` registers it.
  Until tokens.css has it, `town/TownFaq.astro` and `about/AboutRules.astro` each declare that one `@font-face` (same URL);
  once it is in tokens.css those two lines can go.
- **Housing "lying" variant** (optional): the /areas hero van photo sits in a horizontal housing (cap band across the top,
  port, 28 px radius all round). Kit Housing only does the standing canister, so `areas/AreasHero.astro` draws its own.
  If more pages need it, a `lying` prop on Housing would let it move into the kit.
- **Plate row gap** (optional): the Figma "Find us" plate on /areas has a 16 px extra gap before its last row (Licence). Plate
  has no per-row gap, so the /areas plate is 16 px shorter than the frame (the button below is moved down to keep the
  section height). A `gapBefore` row option would match it.
- **Towns strip**: /areas, /areas/seminole and /about now use `global/TownsStrip.astro` (thanks).

## CONTACT/REVIEWS/OUR-WORK/FAQ builder (19 Nov, update)
- Towns strip request above is **resolved**: /contact, /reviews, /our-work and /faq now import `global/TownsStrip.astro`;
  my copy `components/contact/TownsStrip.astro` is deleted (nothing else imported it).
- (HOME builder, 19 Nov, later) Resolved: the kit now writes `-d` / `-m` inline vars; re-checked Home at 390 (hero plate no
  longer wraps, Housing caps correct). Nothing open from HOME.

## FIX ROUND A (home + reviews + shared, 20 Nov)
- Renamed the Paul leftovers: `window.__pbpMotion` -> `window.__glassMotion`, `window.__pbpLenis` -> `window.__glassLenis`, and the
  event `pbp:handoff` -> `glass:handoff` (definitions in scripts/motion.ts; readers in kit/curtain, idle, loader, scrub, settle,
  scripts/ui, scripts/objects, layouts/Base, home/Process). A grep of all of `src` found no reader in a page folder I do not own.
  Anyone adding a reader: use the `__glass*` names and `glass:handoff`.
- MOTION.md (root, not in my areas) still names the old sessionStorage keys `pbp-intro` / `pbp-nav` (the code uses
  `gps-intro` / `gps-nav`); the lead may want to correct those two lines.
- Page transition shortened (kit/curtain.ts): fill 0.6 s + drain 0.6 s (was 0.9 + 1.0); the loader's exit uses the same drain.
- Home FAQ emergency row now shows crew-crawlspace (was van-night) so home Crew can use the van photo without a face under
  Kody's card. /about still shows the card over a face (not mine: about/AboutHero).

## FIX ROUND B (about/areas/seminole fixer, 20 Nov) -> fixer A / home owner (shared motion)
- **1024 px, motion on: transient 16 px horizontal scroll** (scrollWidth 1040; `window.scrollTo(200, 0)` really moves to
  scrollX 16 while entrances are pending; `body { overflow-x: clip }` propagates to the viewport as hidden, which still
  allows programmatic scroll). Cause: the `right` entrance pre-state (x +80) of side columns below the fold. On my pages I
  clipped the two culprits (`.tcta`, `.brec` now `overflow-x: clip`): /about and /areas/seminole read 1024 now. **Home still
  shows 1040 at 1024** (not mine). Suggest `overflow-x: clip` on `html` (or `main`) once, or a smaller x for `right` under 1280.

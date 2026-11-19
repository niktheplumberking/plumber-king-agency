CONTRACT READY (19 Nov, shared builder): kit/Btn, kit/Eyebrow, kit/Housing, kit/Plate, kit/Seam + type classes are in. Props below.
SHARED DONE (19 Nov): global chrome, TownsStrip, Legal template, /thank-you, /privacy, /terms, /404 built and compared. Not committed (the lead commits).

# Shared builder status

## Contract (use as is; ask the lead for changes, never edit)

### `kit/Btn.astro`
`<Btn look="call" sub="Call now · 24/7" size="l" w={280} />`
- `look`: `'call'` (default; red, white text, wrench, href defaults to `tel:`; 4/4 offset shadow: ink on light, powder inside `.on-ink`) | `'ink'` | `'line'` (1.5 px outline; white inside `.on-ink`) | `'light'` (white fill) | `'powder'`.
- `label` (default on call = the phone number), `sub?` (second mono line), `href?`, `icon?` `'wrench' | 'camera' | <Icon.astro name> | false` (call defaults to wrench; a camera button with no href defaults to `sms:`), `arrow?` (trailing arrow).
- `size?` `'l'` 64 (60 on phones) | `'m'` 56 (default) | `'s'` 48. Odd Figma heights: `h` / `hm` (px, desktop / phone).
- `w?` / `wm?` px width at 1440 / under 768 (never wider than its container), `block?` = 100 %.
- `shadow?` true | false | 'ink' | 'powder' (default: call only). `type?` -> real `<button>` (forms). `t?` / `fx?` -> data-t / data-fx. `external?` (new tab + sr note). `class`, other attributes pass through.
- Hero pair: `<Btn sub="Call now · 24/7" size="l" w={280} />` + `<Btn look="line" icon="camera" label="Text us a photo" sub="To (727) 512-0673" arrow size="l" w={280} />`.

### `kit/Eyebrow.astro`
`<Eyebrow text="Licensed & insured · Pinellas County" />` (or slot). `tone?` 'pdeep' (default) | 'light' (powder) | 'dark' (ink); inside `.on-ink` it is powder by itself. `t?` (default '1'), `as?` (default p).

### `kit/Housing.astro`
`<Housing w={284} h={540} wm={218} hm={300} tone="photo" shadow={12} shadowm={8} fluid><Img .../></Housing>`
`<Housing w={216} h={330} fill={0.42} />`
- `w`,`h` (whole object incl. cap + port, Figma px), `wm`,`hm` (phone), `fluid` (100 % wide up to w, aspect-ratio height).
- `fill` 0-1 water level (`data-fill`: rises on enter with motion; full otherwise). `tone` 'light' | 'frost' | 'ink' | 'photo'.
- `r`/`rm` bottom radius, `cap`/`capm` cap height override, `shadow`/`shadowm` powder offset px, `hl={false}`, `label` (role img), slot = content inside the glass (centred; for tone photo it fills the glass).

### `kit/Plate.astro`
`<Plate title="On the job" rows={[['Rig','Glass van'],['Dig','Mini-excavator']]} w={214} />`
- `rows` [[key, value]] (value may be `{ text, href, external? }`), `title?`, `w?`/`wm?`.
- Geometry: `pad` 16, `size` 11, `tsize` 12, `kx` 72 (value column x), `pitch` 21; phone overrides `padm sizem tsizem kxm pitchm`.
- `shadow` 'ink' (default) | 'pdeep' | 'powder' | false; `tone` 'steel' | 'ink'. Rivets pop on enter (data-plate).

### `kit/Seam.astro`
First child of the LOWER section (section must be `position: relative` or have class `seam-host`).
`<Seam from="var(--white)" to="var(--frost)" d={56} dm={36} />` = Figma "meniscus dip" (upper colour hangs down).
`<Seam from="var(--frost)" to="var(--ink)" flip d={56} dm={36} />` = "meniscus rise" (lower colour bulges up). `only` 'd' | 'm'.

### Type classes (global.css)
`.h1` 80/0.98 (phone 40/1), `.h2` 56/1.02 (phone 34), `.h3` 26/1.04 (phone 19): Schibsted 800, -2 %. Other sizes: set `--h1 --h1m --h2 --h2m --h3 --h3m` inline, e.g. `<h2 class="h2" style="--h2:62px;--h2m:44px">`.
`.lead` Public Sans 19/1.5 (phone 16; `--lead`, `--leadm`). `.mono` JetBrains 500 11 px caps +6 % (`--mono`, `--monom`), `.mono-b` same in 700.
Two-tone: `<h2 class="h2">Line one <span class="tone">line two</span></h2>` (pdeep; powder inside `.on-ink`).
`.on-ink` = ink background + frost text + white hairlines (`--line`). Tokens added: `--shadow-ink`, `--shadow-powder`, `--line`.

### Links other builders must provide (footer + header point here)
- `/services#hot-water`, `/services#leaks-lines`, `/services#drains-fixtures`, `/services#remodel-commercial` (the four family cards).
- `/areas#town-<slug>` for every town in `towns.ts` (slugs as in the file).

## Built (shared builder, 19 Nov)

### Global chrome (Base.astro renders all of it; pages do nothing)
- `global/UtilityBar.astro`: stars + "5.0 on Google · 104 + 77 reviews" (each count links to its own profile, never summed), licence CFC1432488 with the DBPR link, 24/7 + phone. Phone: "24/7 · phone · CFC1432488".
- `global/Header.astro`: 88 px (68 under 1200), nav from `global/nav.ts` (current page bold + 3 px pdeep bar), Text a photo (sms) + red call. Under 1200: red 48 px call square + menu button (768-1199 shows the full call button instead). Hides on scroll down, returns on scroll up.
- `global/MobileMenu.astro`: dialog, numbered links (Home ... Contact + FAQ), call + text buttons, licence line. Focus trap + Escape tested.
- `global/EmergencyStrip.astro`: frost strip under the header.
- `global/Footer.astro`: powder band with the giant outlined phone (one tel link), "On the record" plate (licence -> DBPR, Base "Largo, FL", email), three link columns (disclosures on phones, `data-fcol`), discount strip, ink bar (Privacy, Terms, licence). Round 7: no call-back bar.
- `global/MobileCallBar.astro`: under 1024 only, appears once the first `main > section` has left the viewport and stays; `inert` while hidden. Pages need nothing.
- `global/Loader.astro` + `kit/loader.ts` (same `runLoader` API), `kit/Curtain.astro` + `curtain.ts`: frost / white blinds.
- `kit/glass.ts`: water rise, rivets, seams on enter (after the loader hand-off); end state at once without motion.

### For the page builders
- **Towns strip** (11 frames): put `<TownsStrip />` (`import TownsStrip from '../components/global/TownsStrip.astro'`) as the last thing inside `<Base>`, right above the footer. 18 towns in Figma order; the first six link (Seminole -> /areas/seminole, others -> /areas#town-<slug>).
- **Legal template**: `global/Legal.astro` (`title`, `crumb`, `path`, `lead`, `sections: {id, nav, t, body(html)}[]`), used by /privacy and /terms.
- `ui/Breadcrumbs.astro` restyled to JM 500 11 px muted (prop `t`).
- Nav anchors you must provide: see "Links other builders must provide" above. `/about` and `/services/water-heaters` are linked from header/footer and were not built yet when I ran the link check.
- Facebook is left out of the footer and menu: `site.ts` has no Facebook URL (Figma shows one). Add it to site.ts and `nav.ts` when Kody gives it.
- The footer plate shows Base "Largo, FL", not the street address Figma shows. Lead to confirm whether the street can be shown.

### Pages
- `/thank-you` (noindex, no loader): confirmation + Work order plate, three step housings (fill .25 / .5 / .75), ink call / Instagram panels with a seam, two framed photos (van-night, water-heater-expansion-tank), towns strip. Kody to confirm: reply time (none shown) and "You hear the price before any work starts" (Figma copy).
- `/privacy`: Figma copy, "Draft, 18 Nov 2026". `/terms`: same template, draft text with Glass facts, "Draft, 19 Nov 2026" (needs Kody / a lawyer before launch).
- `/404`: rewritten for Glass ("This pipe runs dry."), call + text, links to every built route, housing fill .06. No Figma frame: built from the kit.
- Deleted: `src/pages/zz-shared-kit.astro` (scratch). `kit/README.md` rewritten for the Glass kit (Mike's Wave / Stamp / RouteMap notes removed).

### QA (handoff/qa/shared/, Figma left, build right; reduced motion)
- `chrome-top-1440.png`, `chrome-top-390.png`, `privacy-1440.png`, `privacy-390.png`, `thank-you-1440.png`, `thank-you-390.png`; `terms-*`, `404-*` are build only (no Figma frames).
- Page heights vs Figma: privacy 2672 / 2675 (1440), 2577 / 2574 (390); thank-you 3838 / 3834, 3671 / 3665. Sections within 0-7 px.
- Motion on: loader runs and hands off (privacy 390), header hides / returns, all housings fill, rivets and seams play, no element left hidden, no console errors on my pages.
- Basic a11y scan (no axe installed): no duplicate ids, alt on every image, every link / button named, one h1, no heading skips on all four pages at both widths. Menu focus trap + Escape OK. No horizontal scroll at 390.
- `astro build` passed (12 pages). Link check: only `/about` and `/services/water-heaters` missing (other builders' pages).

### Not matched (honest list)
- Font rendering: Public Sans renders a little narrower than Figma (emergency strip about 14 px shorter; the towns strip wraps "Oldsmar" to line 2 at 1440, Figma keeps it on line 1).
- Footer: phone number about 6 px lower, pill about 4 px wider than Figma.
- Thank-you mobile: Call-or-follow section 7 px taller, While-you-wait 6 px taller; photo frames are 2 px outlines outside the box (Figma strokes inside).
- Towns strip on phones: 249 px vs Figma 252.
- No Figma frames for the mobile menu, loader, curtain, 404 or terms: built from the kit and the brief.

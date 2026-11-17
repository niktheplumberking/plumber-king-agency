# Mike's Plumbing Services: build brief (Figma -> live preview)

Client: Mike Navarro, Mike's Plumbing Services, Riverside CA, (951) 809-9533. Spec = the approved Figma (FIGMA-FRAMES.md).
Copy = `plan/PAGES-COPY.md` (word for word) + the homepage copy in Figma. Facts = `research/BRAND-AUDIT.md`,
`research/REVIEWS-YELP-RAW.txt`. Design system = `plan/DESIGN-SYSTEM-AND-HOME-SHEET.md`.
Proven code to copy from (same repo, `main`): `clients/plumbing-by-paul-v3/` (motion, layout, SEO, forms, link check) and
`clients/united-plumbing-site/` (the scroll feel Nick loves). Read `clients/plumbing-by-paul-v3/MOTION.md` and
`BUILDERS.md` first: every motion problem we hit (flashes, glitching photos, empty sections on fast scroll,
too-slow / too-fast entrances) is solved and measured there.

## 1. Stack and repo
- Astro 5 static + GSAP 3.13 (ScrollTrigger, SplitText, DrawSVG) + Lenis 1.3, `@astrojs/sitemap`, `sharp`, Astro `<Image>`.
- Folder `clients/mikes-plumbing-site/` in `niktheplumberking/plumber-king-agency`, on your thread's branch.
  Start by copying `clients/plumbing-by-paul-v3/` (keep `src/scripts/motion.ts`, `ui.ts`, `forms.ts`, `Base.astro`,
  `scripts/check-links.mjs`, `vercel.json`, `astro.config.mjs`), then replace tokens, fonts, components and pages.
- Fonts self-hosted (latin woff2): Abril Fatface, Oswald (500/600/700), Archivo (400/500/600/700/800 + italic), Yesteryear.
- Colours: ink #0E0D0B, coal #1C1A16, paper #F3ECDD, bone #FBF8F2, tan #D2C5A6, tan-dark #6B5C3E, red #D9412B,
  mute #A79D88, ink-2 #4A443A. Check contrast: CTA text 4.5:1 (ink on tan passes; never paper text on tan).

## 2. One-to-one, full grid (Nick: "exactly the same width, not a smaller grid")
- At 1440 the site must match Figma geometry exactly: content column x 120 -> 1320 (1200 wide), full-bleed sections
  1440, same font sizes, line breaks, gaps, image crops. No `max-width: 1100/1140/1200 + padding` container that
  shrinks the content: `.wrap { width: calc(100% - 2 * var(--gutter)); --gutter: 120px }` at 1440.
- Above 1440: `html.style.zoom = innerWidth / 1440` (Paul's Base.astro does this), so 1920 looks like Figma, bigger.
- 1280-1439: same zoom rule (zoom = width / 1440), so proportions never change.
- 768-1279: tablet pass of the desktop layout (fluid gutter 48-80 px, type via `clamp`), checked at 1024 and 820.
- Below 768: the 390 mobile frames, fluid from 360 to 767 (check 360, 390, 430). No horizontal scroll anywhere.
- Seam objects (pipes, bands, ticker, drips, valve, pipe into the 24h dial) are absolutely positioned layers over the
  section boundary (`position:absolute` in a wrapper with `overflow: visible`, z-index above both sections).
  Sections that need clipping clip an inner layer, never the seam layer.
- Export every drawn shape (wave edges, hex nuts, pipes, valve wheel, gauge, dial ticks, stamps, tickets) from Figma as
  SVG once; never redraw them by eye.

## 3. Motion (the United / Paul feel)
Copy Paul v3's `motion.ts` as-is and use its attributes (MOTION.md section 1b = current model, which is United's scroll UX):
- Lenis `lerp 0.1, wheelMultiplier 1, smoothWheel true`, touch native, driven by the GSAP ticker,
  `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.lagSmoothing(0)`.
- Entrances: every element its own `once` trigger (`top 88%`, staggers `top 85%`, draws `top 92%`, counters `top 90%`);
  headlines split into lines that rise from a mask (0.9 s, 0.1 s/line, `back.out(1.4)`), blocks `y 60 -> 0` 1.0 s
  `power3.out`, photos open with a clip (1.2 s `power3.inOut`), chips/hex nuts/stamps pop (0.6 s `back.out(2.2)`).
  Nick's 3 groups: G1 headline/lead/main photo +0, G2 buttons/chips/captions +0.15 s, G3 stamps/underlines/counters +0.3 s.
- Hero: one ordered timeline after a first-visit loader (Mike's hex badge + a pipe that fills while the page loads,
  max 3.4 s, skippable, once per session); in-site links use the curtain.
- Parallax: automatic per Paul's `parallax()` (media columns +-36 px, section heads +24 -> -24 px, stamps lead).
  Photos never move inside their frame; one writer per CSS property.
- Mike's signature moments (one or two per page): the 24h dial needle sweeps to 24 as it enters; the "How a job goes"
  pipe fills with water as you scroll (Paul's `data-pipe`); the route map routes draw from Riverside (Paul's
  `data-route` pattern); the review ticker and the keyword band are slow marquees that pause on hover; stamps pop
  with a 2-degree settle; services list: hover a row and its photo card follows the pointer (desktop only;
  on mobile the active row expands, as in the mobile frame).
- Never: flashes before an entrance (pre-hide under `html.motion` before first paint, 3.5 s safety), CSS transforms on
  photos, instant-finish fast-scroll hacks, `ScrollTrigger.refresh` on every resize (width-only), loops in the reading line
  without a pause. Reduced motion = static and complete; no JS = everything visible.
- Proof: record the home page scrolling at 1440 and 390 next to United (`united-plumbing-pomona.vercel.app`) and Paul
  (`plumbing-by-paul.vercel.app`) at the same speed; content must never sit invisible in view (use Paul's frame sampler,
  MOTION.md section 0 / round 3).

## 4. Buttons and functions (all must work)
- Every phone button: `tel:+19518099533`. "Text Mike a photo": `sms:+19518099533` (with a body prefill where the OS
  allows). Mike has NOT confirmed the number takes texts: keep the button, list it in the README "Mike to confirm".
- Forms (job ticket, call-back bar, estimate, contact): validation, labelled fields, chips as real checkboxes, photo
  upload field; submit to `PUBLIC_FORM_ENDPOINT` if set, else go to `/thank-you` (Paul's `forms.ts`). Say in the
  README that no backend is connected until Nick picks one.
- Nav: mega menu (Services, Areas), mobile menu dialog, sticky header that hides on scroll down, mobile call bar
  after the hero. Every card and row is a link with a hover state. `npm run check:links`: 0 broken internal links.
- Yelp, Instagram links open the real profiles (from BRAND-AUDIT) in a new tab.

## 5. On-page SEO (every page)
- Title + meta description + H1 + URL from PAGES-COPY.md (titles <= 60 chars, metas <= 155). One H1. Logical H2/H3.
- Canonical, Open Graph + Twitter image per page (1200x630 from a real photo), favicon from the logo.
- JSON-LD: `Plumber` (LocalBusiness) site-wide with NAP, areaServed (the towns), sameAs (Yelp, Instagram),
  openingHours ONLY if Mike confirms; `Service` on service pages; `FAQPage` where an FAQ is visible;
  `BreadcrumbList` on inner pages; `ContactPage`, `AboutPage`. No AggregateRating, no licence until Mike gives one.
- Photos: descriptive file names (`water-heater-gas-valve-riverside.jpg`), `alt` that says what the photo shows and
  where, `width/height` set, AVIF/WebP, lazy below the fold, the hero photo `fetchpriority=high`. Include images in the
  sitemap (image sitemap entries) and give key photos a `figcaption`.
- Internal links: service pages -> 3 related services + the town pages; town pages -> top services + nearby towns;
  every page -> contact; breadcrumbs. Anchor text = the page's keyword, not "click here".
- Content optimization: each service/town page answers the main question in the first 50 words (quick-answer box),
  uses the reviews that match it, and has an FAQ block. No invented facts, prices or claims (see section 7).
- robots.txt, sitemap-index.xml, 404 page, `trailingSlash: never`, 301s for any old URLs Mike had (none found).
- Preview = noindex (`vercel.json` header on *.vercel.app). Launch flips it (Nick's go only).
- Performance: LCP <= 2.5 s mobile, CLS 0, fonts preloaded with `font-display: swap`, JS only the motion bundle.

## 6. Off-page SEO and backlinks (plan only; nothing posted without Nick)
Write `SEO-OFFPAGE.md`: Google Business Profile (none found: Mike must create/verify it, it is the #1 local factor),
NAP-consistent citations (Yelp exists; Nextdoor is mentioned in a review; then Apple Maps, Bing Places, BBB, Angi,
Thumbtack, HomeAdvisor, Houzz, Riverside Chamber), review plan (Google reviews link once GBP exists), local backlinks
(supplier pages, community sponsorships, local news "new business" features). No paid links, no link exchanges,
no scaled content. Each listing is created only with Nick's and Mike's OK (they hold the logins).

## 7. Facts rules (what can go wrong: invented claims)
- No "24/7" (Yelp only says "Open 24 hours"): write "Open 24 hours (Yelp)" until Mike confirms.
- No licence, insured, bonded, warranty, prices, response times, "most asked", years of experience, unless a source file
  shows it. California: unlicensed contractors may only take jobs under $1,000 and must say so in ads (B&P 7027.2);
  this is the #1 open question for Mike.
- Reviews word for word, name + initial, "Yelp". The mascot is captioned as his 3D mascot, never as Mike.
- PKA's own Mike research (all 20 reviews, the real photo of Mike, email, payment methods, "15% off", "Open 7 days"):
  use each one only if your research file shows the source. Add the extra reviews to the Reviews page and the tally.
- Yellow Figma notes are never on the site; collect them in the README "Mike to confirm" list.

## 8. QA before Nick sees anything
- `npm run build` clean, `check:links` 0 broken, console clean, axe 0 violations (reduced motion), keyboard path.
- Playwright vs Figma, section by section at the same scale: 1440 and 390 (plus 1920, 1280, 1024, 820, 360 for layout).
  Target: within a few px of Figma at 1440 and 390. No horizontal scroll, 44 px tap targets, no overlaps, no clipped text.
- Motion check: Paul's sampler shows no element invisible in view for > 0.3 s at reading pace and none left hidden
  after a fast scroll; no photo jump; scroll feel side by side with United.
- Lighthouse mobile on Home, a service page and a town page: LCP <= 2.5 s, CLS 0, SEO 100.
- An independent reviewer (a separate agent) checks every page against Figma and the facts files before Nick.

## 9. Deploy
- Vercel preview from the cloud (the PLUMBER env has the Vercel token): clean name like
  `mikes-plumbing-riverside.vercel.app`, noindex. If the CLI needs a device login, open the approval page in Nick's
  Chrome and tell him; he clicks approve.
- Launch (Hostinger or Mike's host, real domain, GSC + Bing sitemap submit) only on Nick's go, after the
  "Mike to confirm" list is closed.

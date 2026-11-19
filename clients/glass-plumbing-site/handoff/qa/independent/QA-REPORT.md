# Glass Plumbing preview: independent QA (19 Nov 2026)

Live URL tested: https://glass-plumbing-largo.vercel.app · Playwright chromium · Figma from `handoff/figma-cache` only (no Figma calls).
Evidence PNGs (Figma left, build right, unless noted) are in this folder.

## Verdict: YES, ship to Nick as a concept preview, after the 3 MAJOR fixes below (about an hour of work)
There are no blockers. The Figma match is very close: every page is within about 0 to 40 px of total frame height, and all
24 desktop and mobile frames were compared section by section. Functions, facts, SEO and motion all pass. The MAJOR items
are small layout or style slips that a picky viewer would see on a phone.

## BLOCKERS
None.

## MAJOR (fix before sending)
1. **Horizontal scroll at 360 px.** Pages: /privacy and /terms (page 370 px wide), /our-work (366 px) and /areas/seminole (368 px, with reduced motion). The page moves sideways by 6 to 10 px on small Android phones.
   - /privacy and /terms: the "Questions / Ask a real person" block and its call button are a fixed 350 px wide at left 20. Likely file: `src/components/global/Legal.astro` (cid jax2ixzq). Fix: width 100% / max-width.
   - /our-work: the CTA polaroid slot `.oc-slot` has a fixed `left:172px; width:170px` and runs to x 366. File: `src/components/our-work/OwCta.astro`, mobile media query.
   - /areas/seminole: an SVG `<text>` in the "City emergency band" (page y about 4850) reaches x 368. File: `src/components/town/TownEmergency.astro`.
   - Evidence: `m1-privacy-360-hscroll.png`, `m1-our-work-360-hscroll.png`, `m1-seminole-360-hscroll.png`.
2. **The FAQ page's "Send to Kody" button has the wrong style.** Page: /faq, 1440 and 390. In Figma it is ink-filled (dark with white text). The build shows a white button with an outline, and it stays white even after both fields are filled. File: `src/components/faq/FaqAsk.astro` (`.fa-send`). Evidence: `m2-faq-desktop-send-button.png`, `m2-faq-mobile-send-button.png`.
3. **Mobile CTA buttons on /our-work are not full width.** Page: /our-work, 390. In Figma, the call button and the "Text a photo" button span the full 358 px. In the build they are narrow (about 150 px), even though the CSS says `width:100%`. The Btn `w` inline width probably wins. File: `src/components/our-work/OwCta.astro`. Evidence: `m3-our-work-mobile-cta-buttons.png`.

## MAJOR (accessibility; Nick to decide, because Figma has it too)
4. **Contrast failures (axe-core 4.14), site-wide.**
   - The small mono sub-line on every red call button ("CALL NOW · 24/7"): #F0D7D8 on #B6353A = 4.33:1, below the 4.5:1 minimum. Every page fails. File: `src/components/kit/Btn.astro` (`.btn-sub`). Using #FFFFFF fixes it.
   - Home Crew heading "And his crew." in pdeep on ink = 2.73:1. Figma draws it this way too, but brief §10 says `.tone` on ink = powder. File: `src/components/home/Crew.astro`.
   - Reviews hero "Open on Google" links (#2F6178 on #C7CED1) and the WH care tag counter: 4.24:1.
   - Home estimate: a tel link inside white text has no underline (link-in-text-block).

## MINOR
- **/reviews, 1440, "Leave a review" buttons.** The arrow icons are missing and the buttons sit about 25 px higher than in Figma. The label change follows brief §11 and is fine. File: `src/components/reviews/RevLeave.astro`. Evidence: `n1-...png`.
- **/reviews, 390, Facebook card.** Figma has "Open Facebook →"; the build has no link. This is deliberate in source (no Facebook URL in site.ts). Add the link once Kody confirms the page. Evidence: `n2-...png`.
- **/our-work, both widths, reviews strip background.** It is ink #16130F; Figma is ink2 #24211C. The section has class `cx-ink2`, but something overrides it (probably `.on-ink` or `.cx-sec`). File: `OwQuotes.astro` / `contact/cx.css`. Evidence: `n3-...png`.
- **/services/water-heaters, both widths, "Rating plate" mock.** It is rotated -3° (counter-clockwise); Figma tilts it clockwise. File: `WhCta.astro` (`.wc-mock { rotate: -3deg }`). Evidence: `n4-...png`.
- **Home, 1440, business card under the services grid.** It sits lower and more clipped than in Figma (the "Plumbing Services" headline is cut off). Evidence: `n5-...png`.
- **Tablet 1024.**
  - /services/water-heaters: the H1 breaks as "Water Heaters / in / Largo, FL" (orphan "in"). Evidence: `n6-...png`.
  - Home: the hero collage, Google gauges and reviews use only the left half of the screen, which leaves large empty areas on the right. Nothing overlaps or breaks.
- **Home 3-step form.** "Next" with no tile chosen silently does nothing (no message). Back, live plate, keyboard and the submit to /thank-you all work.
- **/our-work filters.** The "Water mains" and "Commercial" chips lead to "No photos in this group yet". Either hide them or add photos.
- **Form error text in red.** The error messages (`.sh-msg`, `.wh-msg`) are #B6353A. Strictly, red is meant ONLY for call buttons and "Call me back"; use ink or pdeep for errors.
- **Small tap targets on phones.**
  - Breadcrumb "Home" is 13 to 25 px tall, footer "Privacy"/"Terms" 23 px, and towns-strip links 25 px. These are under 44 px; /areas breadcrumb at 13 px is under the 24 px minimum.
  - Mobile horizontal scrollers (.slips-wrap, .rail, .arev-track, .tr-photos, .oh-row) cannot be scrolled by keyboard (axe scrollable-region-focusable).
- **About, "Four rules" numbers.** They render filled, while Figma shows them outlined. This is by design (the INTERACTION note says they fill after typing), so it is not a defect. With motion on, rules 3 and 4 become fully visible 0.5 to 0.6 s after entering view, because of the typing effect.
- **Motion timing at reading pace.** A few elements reach full opacity right at the 0.5 to 0.6 s limit: WH process step "06 Test", WH pricing "Access" and "Gas or electric" on mobile, the "Make it last" eyebrow, and "Related services". It is borderline, not stuck.
- **Leftovers in non-rendered files.**
  - `dist/.htaccess` has a comment "(Paul example; Mike had no old site)" and a `/home` → `/` redirect copied from Paul. Nothing is visible on the site.
  - The comment in `src/pages/terms.astro` mentions Mike.
- **"Floor Drain Built In" photo.** That burned-in text is on the photo (`water-heater-expansion-tank`) used in the home FAQ, and it contradicts its "expansion tank" caption. Figma uses the same image.
- **Kody's own Instagram line "Licensed and insured master plumber".** It is quoted on home, about and reviews. His licence is "Certified Plumbing Contractor", and "master plumber" is not a Florida licence title. It is his words, but worth one line to Nick.
- **WH care tag.** It starts at "0 of 3 done"; Figma shows "1 of 3" as an example. This is deliberate in source, so it is fine.

## What passed (evidence: scripts and outputs in the session scratchpad)
- **Figma match.** All 12 routes × 2 frames compared per INDEX section (auto-aligned). The only visible differences are listed above. Photos, fonts, weights, colours and layout match. Business BASE shows "Largo, FL" in place of Figma's street address, as site.ts requires.
- **Widths 1920, 1280, 1024, 820.** No horizontal scroll, no clipping, no overlaps. 360 fails on 4 pages (MAJOR 1). 390: no scroll.
- **Motion** (normal, scrolled at about 750 px/s and at about 10,000 px/s on all 12 pages at 1440 and 390):
  - No element stuck hidden and no console errors.
  - Loader on first visit: 000→100 in about 2.4 s, gone by 3.2 s, and remembered per session.
  - Curtain on internal link click: logo blinds work.
  - Header hides on scroll down and shows on scroll up.
  - Lenis is active, and parallax drift on photos was measured (translate 0 → 5%).
  - Scroll feel vs Mike: the Lenis easing curve is identical sample for sample (273→599 px over 1 s after one wheel tick), and reveals are similar in density. It feels the same, which is the intent.
- **Function.**
  - Links: all 354 tel links = `tel:+17275120673`, all 186 sms links = `sms:+17275120673`, and all 48 internal hrefs resolve (200).
  - Forms: all 7 estimate forms plus the FAQ ask box reject empty input with a plain message, set aria-invalid, focus the first bad field, then go to /thank-you.
  - Home FAQ: search with mark highlight, count and a "none" state, plus chips and the accordion all work.
  - /areas town checker: the combobox, results for Seminole/Tampa/Orlando, and keyboard pick all work.
  - Contact: flip cards and audience tabs (with arrow keys) work.
  - Services FAQ tabs work.
  - About switchboard: it moves every 2 s, and Pause holds it.
  - WH reasons: they auto-advance, and Pause holds them.
  - WH care tag: a tick sets the counter to 1, sets the date, and persists after reload.
  - Our-work filters work.
  - Mobile menu: it opens, focus moves inside, Tab is trapped in the dialog, Esc closes it, and focus returns to the button.
  - Mobile call bar: hidden at the top, it shows once the hero has scrolled away, hides again at the top, and its links are correct.
  - Footer disclosures work, and there are no console errors on any page.
- **Accessibility.** One H1 per page, no heading skips, every img has alt text, no names in alt text on face photos, and visible focus on all 119 tabbed elements on home. Lighthouse a11y score: 97.
- **Facts.**
  - No "181". The counts 104 and 77 are always shown separately; the menu shows "104 + 77 reviews", not a sum.
  - Every quoted review is word for word against reviews.ts (16 reviews).
  - No invented prices, years or response times. The only numbers are $100 (the offer cap), 24/7, and review dates and quotes.
  - Licence CFC1432488 appears in the utility bar, header area and footer.
  - No "Kody to confirm" notes are visible.
  - No other-client names in the rendered text. "Yelp" appears once, legitimately: "Angi, Nextdoor or Yelp get added once we can see them".
  - No photo is used twice on a page (including water-heater-tank vs -2). kitchen-faucet and kitchen-faucet-2 on /our-work are two different faucets.
- **SEO.**
  - Every page has a unique title (35 to 54 chars), a meta description (94 to 149 chars), a canonical, og:title, og:url and og:image.
  - All JSON-LD parses: Plumber, WebSite, WebPage/AboutPage/ContactPage, BreadcrumbList on inner pages, FAQPage where FAQs show, and Service on WH. There is no AggregateRating or Review markup, and the schema has no street address.
  - The preview is noindex via meta, the X-Robots-Tag header and robots.txt `Disallow: /`. sitemap-index.xml and sitemap-0.xml list 12 URLs (no thank-you or 404).
  - /404-test returns 404 with its own page.
- **Performance.** Lighthouse 12 mobile on Home: Performance 96, FCP 1.5 s, LCP 2.4 s, CLS 0.003, TBT 110 ms. Lighthouse SEO is 69 only because the preview is noindex (expected).

## Could NOT check / notes for launch
- Real phones (iOS Safari, Android Chrome), real touch momentum and notch safe areas: tested in emulated Chromium only.
- Flash and jump detection was sampled every 100 ms by script, not filmed; no frame-by-frame video review.
- Lighthouse was run only on Home (mobile).
- The no-JS fallback was not tested. Without JS, the GET forms would put the name and phone in the URL, and forms with no action would post to their own page.
- Leads go nowhere on the preview: `PUBLIC_FORM_ENDPOINT` is unset, so forms jump to /thank-you without sending. An endpoint is needed before launch.
- The canonical, og:url and sitemap still use the vercel.app host; switch them to the real domain at launch.
- The Google and Instagram profile URLs and the DBPR link were not opened. External sites were not checked.

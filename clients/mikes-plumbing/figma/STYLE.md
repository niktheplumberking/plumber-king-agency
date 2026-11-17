# Mike's Plumbing Figma build rules (for every page builder)
File QbPRX8MU5AA6peTerdP5gg, page "Mike's Plumbing Services" 481:437. Figma session af8ac470-26da-4ee3-b0c0-7524a3c06c32.
Every use_figma call: paste helpers.js VERBATIM first (cat it), then: page=await figma.getNodeByIdAsync('481:437'); await figma.setCurrentPageAsync(page); get your SECTION by id.
skillNames: "resource:figma-use,resource:figma-generate-design".
Layout inside each section: desktop frame "<Page> - Desktop 1440" at x=120,y=200; mobile frame "<Page> - Mobile 390" at x=2000,y=200.
Yellow NOTE stickies ("Mike to confirm ...") BESIDE frames only: x=1600 (desktop notes) and x=2430 (mobile notes), never inside frames.
After building, resize the section to fit (resizeWithoutConstraints(2830, maxBottom+200)) and set frame heights to content.
Order on every desktop page: UTILBAR(D,0) · HEADER(D,40,'<active nav>') · PAGEHERO(D,144,...) · 4-7 content sections · CONTACTBAND · FOOTER.
Mobile: MHEADER(M,0) · MPAGEHERO(M,72,...) · stacked content sections (20px side padding, 350 wide) · MCONTACT · MFOOTER · MSTICKY at the very bottom of the frame (shows the sticky bar).
Style: black/charcoal + cream/tan ONLY (his brand). Alternate dark (C.ink/C.char) and light (C.paper/C.cream) sections. Playfair Display Black headings with ONE italic tan word (HEAD()); Jost body; Yellowtail only as a small script accent (max 1 per page). Badge-hex shapes (HX) and RULE() divider are the brand motif; cut-corner photos (IMGHX cutCorners). Every section gets its own idea (no lazy pale centred-heading + white cards ending; the end of the page gets the same effort as the hero). Paired buttons same height. Header aligned to the 80px grid edges.
FACTS: only use research/FACTS-CHECK.md and research/SEO-PLAN.md. Reviews word for word from FACTS-CHECK (trim only with "…"), always labelled Yelp with name, town, date. NEVER: "licensed", licence numbers, prices, response-time promises, years other than Est. 2025 / 10+ years, warranties, Google ratings, AggregateRating. Hours are unconfirmed (Yelp 24h vs Nextdoor 7am-11pm): say "Emergency service" not "24/7" except where labelled "Mike to confirm".
Photos: only H.* hashes (real IG/Yelp). Never the same photo twice on one page (hero bg + hero photo of the same image counts as one use; prefer photo2 different). Map = H.map (Google Maps screenshot 17 Nov 2026), label it.
No text overlaps, nothing on faces (Mike's face is in H.mike upper-middle). After building each frame take ONE screenshot (frame.screenshot({scale:0.35})) and fix overlaps/clipped text before finishing.

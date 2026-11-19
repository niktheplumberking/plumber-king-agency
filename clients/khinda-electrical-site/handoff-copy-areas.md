# Khinda Electrical · part 3 pages: new copy (build part 3)

Every line below is site copy on the part 3 pages that is **not** drawn word for word in the Figma frames (found by
comparing each built page's text with every Figma text layer in the build cache). Everything drawn in Figma is left out.
Sources: Figma lines, the facts already on the site (src/data/faq.ts, src/data/service-pages.ts: City of Surrey Bylaw
15596, Technical Safety BC, CEC 26th edition, BC Hydro rebate guide of 15 Jul 2026), and his Instagram (counted 17 Nov 2026).
No reviews, ratings, prices, times, years, licence or insurance claims. Lines in *italics* are screen-reader only.

Khinda to confirm: which towns he covers; his Google review link (the review buttons open a Google search until then);
the privacy lines about what he does with calls and texts (CCT 04, CCT 08).

## /areas/ (04)
- Form strip steps: "Step 2 of 3 · What’s your number? · Next: the job" · "Step 3 of 3 · What needs doing?" · "Town, phone, job. That’s all."
- *Map, not to scale: Surrey neighbourhoods are ring 1 around his Surrey base, Delta, Langley and White Rock are ring 2.*
- Rules pages: "Page 02 / 04 · BC works to the CEC, 26th edition. In force in BC since 4 March 2025. New electrical work is done to this edition. Source · BC Electrical Code · Next · 03 Strata →"
- "Page 03 / 04 · In a condo or strata townhouse, a licensed contractor takes out the permit for you. Source · Technical Safety BC · Next · 04 EV rebate →"
- "Page 04 / 04 · BC Hydro pays up to 50% of a home charger. Up to $350, when a licensed electrician installs it with a permit. Source · BC Hydro guide, 15 Jul 2026 · Back · 03 Strata ←"
- Review folders, per town (Fleetwood, Guildford, Cloverdale, S. Surrey, Nearby): "{Town} · switch on" · "No {Town} reviews online yet." · "Folder 1 of 3 · {Town}" · "Be the first {Town} review: call 236-818-2664 →"
- Folder job cards: "Shop fit-out · Surrey area · Lighting for a barbershop fit-out, from his Instagram." · "Home · Surrey area · Pot lights and a lit feature wall in a living room, from his Instagram."
- FAQ: "Call and ask about your town. He tells you on the call, before the visit is booked."

## Town pages (05 Newton = template; 8 more towns swap the name; src/data/towns.ts)
- Meta: "Khinda Electrical works in {Town} for panels, lights, EV chargers and basement suites. {Town} is part of Surrey, so the City of Surrey issues the electrical permit and a licensed contractor applies. Call 236-818-2664 or text a photo of the job." (Delta, White Rock: "…is its own city, outside Surrey, so Technical Safety BC issues the electrical permit…"; Langley: see fix round 2 below)
- Distance: "{Town} is Surrey. {Town} sits inside Surrey, the same city he works out of. Same permit office, same code, no crossing into another town." · button "Call from {Town}"
- Plate: "{Town} · your street" · "Jobs for {Town} homes, / marked on the plan." · "Three common jobs, marked on a typical house with a basement suite. Each one ends the same way: call or text a photo." · "Typical {Town} suite" · "Top 6 services in {Town}"
- Permit: "Permit in {Town}?" · "Yes, for regulated electrical work. {Town} is in Surrey, and the City of Surrey issues its own electrical permits (Bylaw 15596). A licensed contractor applies for it." · "Bylaw 15596 · licensed contractor applies"
- Wall: "What {Town} says" · "The first {Town} review" · "No Google reviews online yet. When {Town} customers post them, their words go here, next to the job they are about."
- Cut-outs: "{Job} · from his Instagram" (spiral sconce, soffit lights, shop reception, modern chandelier, starry ceiling, condo hallway …)
- FAQ Q2/Q3 answers: "It may apply: the BC Hydro home charger rebate covers up to 50% of the cost, to a maximum of $350. It needs a licensed electrician and an electrical permit (BC Hydro guide, 15 Jul 2026)." · "A suite gets its own circuits for the kitchen and laundry. That is regulated work, so it needs an electrical permit from the City of Surrey. Text a photo of the space to start."
- Fix round 2 (review M5 / M7, 19 Nov 2026), src/data/towns.ts:
  - Langley (two councils): quick answer "Langley is two municipalities, the City of Langley and the Township of Langley; in both Technical Safety BC issues the electrical permit and a licensed contractor applies." · Distance "The City of Langley and the Township of Langley are next to his Surrey base. Same code across BC; the electrical permit in both comes from Technical Safety BC." · Permit "…The City of Langley and the Township of Langley are outside Surrey, and Technical Safety BC issues the electrical permits in both…" · FAQ permit answer the same · row "City + Township, next to Surrey". Source: FACTS-CHECK 5.1 (TSBC issues permits everywhere but the 7 listed cities).
  - Local problems per town (3 of 9, `PROBS`): suite circuits, EV panel room, pot lights (Figma Newton) plus lines from the approved service pages: "Breakers keep tripping", "Old fuse panel", "Insurer asked for an update", "Lights flicker" (Panel upgrades 3.3 signs), "Soffit and garden lights" (Lighting FAQ), "A shop or office fit-out" (his own line + IG jobs).
  - FAQ gangs 2-3 per town (`FAQS`): EV rebate (5.5), rebate 180 days + Tesla (5.5), suites, code CEC 26th from 4 Mar 2025 (5.4), Surrey EV load calculation (5.3, Surrey towns only), homeowner permit route + strata (5.2, Surrey towns only), commercial (his own line), White Rock community top-up up to $2,350, 4 Aug-31 Dec 2026 (5.6, White Rock only; recheck or remove after 31 Dec 2026).
  - Photos per town (`SET`): wall and owner-band photos now differ per town (Guildford wall ig20, Langley wall ig57; bands ig09 / ig39 / ig12 / ig01 / ig23 / ig61, ig11 only on Newton, Cloverdale, Delta).

## /about/ (06)
- "Text him a photo →" · "Three jobs from @khinda__electrical. Tap one to watch it on his Instagram, with the rest of his reels." · "Look up TSBC licences →" (links to the TSBC public lookup; claims nothing about his licence)

## /contact/ (07)
- 7.4 map tag rolls to "Open in Google Maps ↗"; mobile tag "Surrey + towns next door"
- 7.5 drawer cards: "Commercial quote · What to send: The address, what the space is for, and when it opens." · "Permit question · What to send: The job, your town, and if it is a strata home." (Figma) · "Send a video · What to send: A short video of the problem, plus your town."
- 7.6 tag backs: "Back · 01 · Yes. Send it by text or WhatsApp to 236-818-2664: the panel, the fixture or the outlet, plus your town." · "Back · 02 · Text the day that suits you to 236-818-2664 and he will tell you straight if he can make it." · "Ask about a day →" · "Ask · 03"

## /reviews/ (08)
- *A terminal board: five open slots for Google reviews, none written yet, and six wired slots for jobs he posted on Instagram.*
- *His bio, as a quote: All domestic. Commercial work. Renovations.*

## /our-work/ (09)
- *Job types: panels, lighting, commercial, fire alarm, outdoor. Lit in the ceiling: a chandelier, a starry ceiling, pot lights and a condo hallway.*
- *Sheet notes: 1 sorted by colour, 2 every run lands in the panel, 3 each gets its label · Ceiling outlet to fixture.*
- *1,521 followers and 66 posts, counted 17 Nov 2026.*
- Filter live line: "Showing all 6 jobs." / "Showing {n} of 6 jobs: {Type}."

## /faq/ (10)
Topic 01 questions are Figma; Figma draws only Q01’s answer. The other answers reuse lines already on the site.
- Permits & law · Q02 "No. Technical Safety BC says strata owners can’t get homeowner permits, so a licensed contractor applies for the permit." (Source · Technical Safety BC)
- Q03 "The BC Electrical Code: the Canadian Electrical Code, 26th edition, in force since 4 March 2025." (Source · Technical Safety BC)
- Q04 "For regulated electrical work, the permit is taken out by a licensed electrical contractor, and Technical Safety BC issues those licences." (Source · Technical Safety BC)
- Topic 02 · Gauge 12/2 · Panels · "2 questions. One opens at a time." · "12/2 NMD90 · Panels" · "Ask about your panel"
  - "100A or 200A?" · "Many homes adding an EV charger or a heat pump need 200A. A load calculation on your panel decides it, and he walks you through the result before any work starts."
  - "How long does a panel upgrade take?" · "It depends on your panel, the permit and the inspection. He looks first, then prices it: you hear the price before any work starts. A photo of the panel helps."
- Topic 03 · Gauge 10/3 · EV chargers · "10/3 NMD90 · EV chargers" · "Ask about a charger"
  - "Is there a rebate for a home EV charger?" · "BC Hydro’s home charger rebate: up to 50%, max $350, with a licensed electrician and a permit. Apply within 6 months of the charger invoice." (Source · BC Hydro home charger rebate guide, 15 Jul 2026)
  - "Are Tesla chargers covered by the rebate?" · "Not at this time: BC Hydro’s guide of 15 Jul 2026 says Tesla-manufactured EV chargers are not eligible."
- Topic 04 · Gauge 14/3 · Lighting · "14/3 NMD90 · Lighting" · "Ask about your lights"
  - "Do you install pot lights?" · "Yes. Pot lights, chandeliers, pendants and soffit lights are all on his Instagram, @khinda__electrical. Text a photo of the room to 236-818-2664."
  - "Do new lights need a permit in Surrey?" · "For regulated electrical work, yes. The City of Surrey issues electrical permits (Bylaw 15596) and a licensed contractor applies."
- Topic 05 · Gauge 6/3 · Booking & price · "6/3 NMD90 · Booking" · "Ask for a price"
  - "How do I get a price?" · "Call or text 236-818-2664. He looks at the job first, then prices it: you hear the price before any work starts."
  - "Can I send a photo first?" · "Yes. Text a photo of the panel, outlet or fixture to 236-818-2664, with your town. A photo shows the job faster than words, and the call that follows is shorter."
- Link texts: "Ask about your panel: 236-818-2664 →" · "Text a photo of the panel →" · "Ask about your charger: 236-818-2664 →" · "Text a photo of the room →" · "Call 236-818-2664 →" · "Text the photo →"
- *Guides: Guide 01: 100A vs 200A, which panel do you need? Coming soon. · Guide 02: The BC Hydro EV charger rebate, step by step. Coming soon. · Guide 03: Surrey electrical permits, explained. Coming soon.*
- Meta: "Surrey electrical permits, panel upgrades, the BC Hydro EV charger rebate, lighting and booking, answered from the rules that apply in Surrey, BC. Still not sure? Call or text 236-818-2664."

## /privacy/ (no Figma frame; all new)
- Eyebrow "Privacy · in plain words" · H1 "Privacy / on this site" · lead "No analytics, no tracking, no cookies. Below is everything the site keeps or sends, one circuit at a time."
- "Circuit directory · privacy" · "Khinda Electrical · Surrey"
- CCT 01 OFF · Analytics and tracking · "None. This site has no analytics, no tracking pixels and no ads, so nobody counts or follows your visit."
- CCT 02 OFF · Cookies · "None. The site sets no cookies."
- CCT 03 · The form · preview (PUBLIC_FORM_ENDPOINT unset), OFF: "Right now the form on this site sends nothing: it checks what you typed, then opens a thank-you page. To reach him, call or text 236-818-2664." · live (endpoint set), ON: "Only what you type or attach: your name, number, town, the job, a photo if you add one, and the best time to reach you. It goes to Khinda Electrical, to answer you about your job."
- CCT 04 ON · Calls, texts and WhatsApp · "If you call, text or WhatsApp 236-818-2664, your number and message reach him through your phone company or WhatsApp, under their own rules. He uses them to answer you about your job."
- CCT 05 ON · Your browser · "Two small notes in your browser’s session storage stop the opening animation from playing on every page. They hold nothing about you and are gone when you close the tab."
- CCT 06 ON · The web host · "Like most websites, the company that hosts this one may keep standard server logs, such as an IP address and the page asked for, to run and protect the site."
- CCT 07 · Links to other sites · "Instagram, Google Maps and WhatsApp links open their own sites, with their own privacy rules."
- CCT 08 OFF · Selling or sharing · "Your details are not sold or passed on for marketing. To ask what he has from you, or to have it deleted, call or text 236-818-2664."
- "Last updated 19 Nov 2026"

## /thank-you/ (no Figma frame; all new; no timing promised)
- Preview (form endpoint unset): eyebrow "Thank you" · H1 "Thanks. / Call or text to talk now." · "This form doesn’t send anything yet, so nothing reached him. Call or text 236-818-2664 and tell him about the job." · breaker "Main · off"
- Live (endpoint set): eyebrow "Sent · thank you" · H1 "Thanks. / Main breaker on." · "Your details went to Khinda Electrical. To add anything, or to talk now, call or text 236-818-2664." · breaker "Main · on"
- Next cards: "01 Have a photo? Text it to the same number: the panel, outlet or fixture, with your town. Text a photo →" · "02 See his work: Panels, chandeliers, pot lights and shop fit-outs, all his own photos. Our work →" · "03 Got a question? Permits, panels, EV chargers and booking, answered for Surrey. Read the FAQ →"

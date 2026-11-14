# Plumbing By Paul, website v3

Astro 5 static site, built 1:1 from the Figma file (Home: desktop `419:1317`, mobile `424:2340`; globals `415:2398`).
Phase 1 = foundation + Home. Other builders add pages: see `BUILDERS.md`. Motion: see `MOTION.md`.

```bash
npm install          # node 22
npm run dev          # http://localhost:4321
npm run build        # static output in dist/
npm run preview      # serve dist/
npm run check:links  # every internal link in dist must resolve (lists pages not built yet)
```

## Environment variables (`.env.example`)

| Variable | Default | Meaning |
|---|---|---|
| `SITE_URL` | `https://plumbingbypaulllc.com` | canonical origin for canonicals, OG URLs, sitemap, JSON-LD |
| `PUBLIC_NOINDEX` | `true` | every build is `noindex, nofollow` and robots.txt disallows all, unless this is exactly `false` (launch build only) |
| `PUBLIC_FORM_ENDPOINT` | empty | where estimate forms POST (multipart, includes the photo). Empty = preview behaviour, below |
| `PUBLIC_GTM_ID` | empty | Google Tag Manager container. None was found on Paul's current site |
| `PUBLIC_GA_ID` | empty | GA4 ID, used only when there is no GTM ID |

Vercel also sends `X-Robots-Tag: noindex, nofollow` on any `*.vercel.app` host, so previews stay out of Google
even if `PUBLIC_NOINDEX` is wrong. Live hosting is decided by the agency, not this repo.

## Forms

- With JS: name and a 10-digit phone are checked in plain words. With `PUBLIC_FORM_ENDPOINT` set, the form POSTs
  multipart to it and goes to `/thank-you`; if the service fails the visitor sees why and the phone number.
  Without an endpoint (preview), it goes straight to `/thank-you` and **sends nothing**.
- Without JS and without an endpoint, the form falls back to `GET /thank-you`, which puts the name and phone in the
  URL. Set `PUBLIC_FORM_ENDPOINT` before launch (it switches the no-JS fallback to POST).
- `/thank-you` is not built yet (phase 2/3).

## Paul to confirm (from the Figma yellow notes on Home and the global sections)

Nothing below is presented as more certain than the note allows; the site shows what the note says it shows.

1. **Hours.** Google: open daily 8 AM to 5 PM. Old site: 24/7 emergency. The site shows "Open 7 days, 8 AM to 5 PM"
   and "24/7 emergency line" (`SITE.hours`). Which is true?
2. **Warranty.** "1-year workmanship warranty" (his old-site claim). Exact terms?
3. **Free estimates.** Every job type, emergencies included?
4. **Bonded and insured.** His claim; no certificate seen (FAQ 02).
5. **Crew names.** Patches use first names from Google reviews (Brian, Phil, Chris, JR, Troy, Noah, Carlton,
   Steven, Marcus). Approve showing them; match names to faces. The JR review count needs checking.
6. **Noah.** No Google review naming Noah was pulled yet: his patch shows a labelled stand-in.
7. **Family photo.** Permission to show Paul and Alycia's son (`about-son-with-gift-roll-truck`).
8. **Offers.** Financing, a first-visit offer or a maintenance plan: the Services panel shows a labelled slot.
9. **Towns.** Which towns he works in every week (town chips and the map).
10. **PBP Construction.** Whether the plumbing site mentions the remodel arm (the remodel photos in "Our work" depend on it).
11. **Tankless and hydro jetting.** Does he install/service tankless and own a jetter?
12. **Vector logo** from the wrap shop (the site uses the raster logo from his current site).
13. **Price ranges** for the common jobs (FAQ 01 says "estimates are free" and gives no numbers until he supplies them).
14. **Payment link.** "Make a payment" goes to `/contact` until he gives the real link (`SITE.paymentUrl`).
15. **Process step 2** heads-up text ("We tell you who's coming"): confirm that is how the office works.
16. **Geo pin.** Latitude/longitude came from the v2 build (approximate). Check against the Google Business Profile pin.
17. **Counts to refresh at launch.** Google rating 4.9 from 947 reviews and the Instagram post count (740) were read on
    13 Nov 2026 (`SITE.rating`, `SITE.social.instagramPosts`). The crew review counts are from the 170 most relevant reviews.
18. **Service page prices.** Every service page (`src/data/service-pages.ts`) shows price rows as "from $__" stand-ins labelled "Paul to supply" (screen readers hear "price not published yet"). Real "from" prices per job?
19. **Permits.** /water-heaters (facts row, step 3, FAQ) says a water heater replacement needs a Pinellas County permit and we pull it; the /services FAQ says we pull permits "when a job needs one". Check against pinellas.gov and confirm Paul pulls them.
20. **Garbage disposal lifespan.** /garbage-disposal says "around 5 to 10 years with care" (facts row labelled "per Paul" and FAQ). His figure?
21. **Gas work.** /gas-lines: confirm the licence covers gas piping and appliance hookups, and the "if you smell gas" safety wording (leave, call the gas company or 911).
22. **Service page photos from Paul.** Labelled photo slots wait for: a camera-screen shot (/drain-camera, /clogged-drain, /sewer-service) and a toilet before/after (/toilet-repair). /water-softeners has no softener install photo yet and uses kitchen-sink and tankless photos.
23. **Reviews from the raw scrape.** Pete Downing (/sewer-service, /drain-camera), Vicdian Vazquez (/sewer-service) and Jordan Kerrigan (/clogged-drain, /drain-camera) are quoted word for word from the scraped reviews, not the curated set. Approve their use.
24. **Crew patches on service pages.** Patch names come from the review that names them (for example Alex, Elvis, JR, Jacob); the /water-heaters process photo patches say "Crew". Approve names against faces.
25. **Toilet repair.** "Many tank leaks are fixed in one visit" (/toilet-repair answer and FAQ): true?
26. **Services hub offer slot.** /services "Paul's promise" shows the same labelled offer slot (financing, first-visit offer or maintenance plan) as item 8.
27. **Tankless link.** There is no tankless page: the "Tankless water heaters" links on /services (job-ticket list and the Hot water family) go to /water-heaters#types. Confirm, or ask for a page (see item 11).
28. **/emergency-plumbing.** The "first five minutes" steps and the hurricane section wording (Storms) are written from his old site and photos: confirm the advice. The after-hours charge FAQ is a labelled stand-in (left out of the FAQ schema). The "24/7" wording follows item 1. JR's patch is used on the spotlight review: confirm it is him.
29. **Town pages (/service-areas/clearwater-fl, /service-areas/seminole-fl).** Drive time from the shop is a labelled slot (measure on Google Maps). Confirm the four "local problems" per town, the Floridan Aquifer hard-water line, the Seminole "Pinellas County Utilities" supply line, the neighborhood chips, the permit wording, and any travel charge. Town review and job-photo slots are labelled stand-ins until he sends a review and photos from that town (Seminole has none yet).
30. **/service-areas.** The St. Pete sewer lateral rebate card: check the program on stpete.org before launch. "Outside Pinellas?" and "travel charge" FAQs are labelled stand-ins (not in the schema). Permission for the classroom photo; the sponsorship wording ("we sponsor the teams") needs his OK. Only Clearwater and Seminole have pages; the other town chips have no links yet.
31. **/about.** The "in line at Publix" line, the timeline milestones and years, owner bios and titles (and how Alycia writes her name), crew first names on the patch wall, the four house rules, the toilet-costume photo, "BBB A+ rating", "Bonded and insured" (item 4) and the warranty (item 2), and whether he is hiring at launch.
32. **/our-work.** The three job stories (what was done, where), the before/after slider is a labelled stand-in until he sends a matched pair, the remodel photos depend on item 10, and the Instagram count follows item 17.
33. **/contact.** Who is in the office photo (`office-team-with-paul`) and the office patch names Missy and Melissa (taken from reviews); the three men in the shop-front photo; the callback time (contact FAQ 02 is a labelled "[Paul to supply]" stand-in, left out of the FAQ schema); "Pay an invoice" calls the office until the payment link exists (item 14); the "We're hiring" card comes out if he is not hiring (item 31). "Open now" is computed from the 8 AM to 5 PM hours (item 1).
34. **/guides/water-heater-repair-or-replace.** Lifespan figures in the job-ticket table, the repair-or-replace signs, the tankless answers (item 11), the permit wording (item 19) and the date shown ("Updated November 2026"). FAQ 05 ("How much does a new water heater cost?") carries a "[Paul to supply starting prices]" stand-in and is left out of the FAQ schema. The other seven guides in the rails show as "Coming soon" cards with no link until they are written.
35. **/faq.** Hours (FAQ 10, item 1) and free estimates (FAQ 12, item 3) follow the Figma sticky notes; check the six Paul's tips and the six habits ("Pinellas has hard water", softener advice) in his words.
36. **/privacy-policy and /terms-and-conditions.** Both are drafts for Paul's (and ideally a lawyer's) review and are labelled "Draft for Paul's review". Every bracketed item needs an answer: the "Last updated" date, how long records are kept, scheduling and cancellation terms, and payment terms and the payment link (item 14).
37. **/thank-you.** "We'll call you back" with no time promised until the callback time is confirmed (see the /contact item). The gift-roll photo caption ("There's one of these in your future") implies every customer gets one: confirm.
38. **/reviews.** The 947 count and 4.9 rating follow item 17; crew names on the review patches follow item 5.

## Not in this repo yet

Every inner page (list in `BUILDERS.md` section 4), the `/thank-you` page, a traced Pinellas map (the map is the
stylised Figma drawing; tracing real municipal shapes is a later pass), and analytics IDs.

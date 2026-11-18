# Mike's Plumbing Services website

Astro 5 static site, built 1:1 from the approved VFACT Figma (file QbPRX8MU5AA6peTerdP5gg, page 626:1943; frame map
`handoff/FIGMA-FRAMES.md`). Spec and rules: `handoff/BUILD-BRIEF.md`. Motion: `MOTION.md` (entrances, United/Paul model)
plus the shared motion kit (`src/components/kit/`, API in its README: scrubbed moments, accordion, curtain, waves). Off-page plan: `SEO-OFFPAGE.md`.

```bash
npm ci               # node 22
npm run dev          # http://localhost:4321
npm run build        # static output in dist/
npm run check:links  # every internal link in dist must resolve
```

Preview (noindex): https://mikes-plumbing-riverside.vercel.app (Vercel project `mikes-plumbing-riverside`).
Deploy a preview: `npx vercel build --prod` then `npx vercel deploy --prebuilt --prod`.

## Environment variables

| Variable | Default | Meaning |
|---|---|---|
| `SITE_URL` | `https://mikes-plumbing-riverside.vercel.app` | canonical origin (set to the real domain at launch) |
| `PUBLIC_NOINDEX` | `true` | noindex + robots disallow unless exactly `false` (launch build only, Nick's go) |
| `PUBLIC_FORM_ENDPOINT` | empty | where the forms POST. Empty = preview: forms validate, then go to /thank-you and send nothing. **No backend is connected yet.** |
| `PUBLIC_GTM_ID` / `PUBLIC_GA_ID` | empty | analytics (none chosen yet; the privacy page must then list them) |

`*.vercel.app` also sends `X-Robots-Tag: noindex, nofollow`. Live hosting = Hostinger (or Mike's host) with `public/.htaccess`.

## Pages (21)
`/`, `/services`, `/water-heaters`, `/drain-cleaning`, `/emergency-plumber`, `/service-areas`, six town pages
`/plumber-{corona,moreno-valley,murrieta,buena-park,los-angeles,west-hollywood}-ca` (Riverside = home), `/about`,
`/our-work`, `/reviews`, `/contact`, `/faq`, `/privacy`, `/terms`, `/thank-you` (noindex), `/404`.

## Facts on the site and their sources
All in `src/data/site.ts` and `src/data/reviews.ts` (each line names its source). 20 Yelp reviews word for word (read
17 Nov 2026). Email (Nextdoor), payments Cash/Zelle/Cash App (Yelp), "15% off for new customers" (Nextdoor + his flyer),
"Open 7 days" (Yelp + Nextdoor), "Open 24 hours (Yelp)", photo of Mike on a drain camera job (his Instagram).
Never on the site until Mike confirms: licence, insured, warranty, prices, response times, years, "24/7".

## Mike to confirm (all must be closed before launch)
1. **CSLB licence number.** None found (Yelp: "License not provided"). If licensed, the number must show on the site and ads
   (B&P 7030.5). If not, jobs under $1,000 only and ads must say so (B&P 7027.2). Blocks launch.
2. **Real hours.** Yelp says open 24 hours, Nextdoor 7 AM-11 PM. Emergency / night / weekend hours.
3. **Texts on (951) 809-9533.** The "Text Mike a photo" buttons use `sms:`; confirm the number takes texts.
4. **A real photo of Mike** (face) and a family photo. Today: back view at the van, side view on a camera job, 3D mascot.
5. **Insured** (IG bio says "Insured"; no certificate seen). Off the site until confirmed.
6. **Towns he serves** (site uses his Yelp reviewers' towns + Riverside) and each town page's geography line.
7. **Town page wording** written from each town's Yelp review (headlines, checklist lines, FAQ Q3, "Same van, same plumber.").
8. **Where form leads go** (email / SMS / CRM) and the business email to show.
9. **Google Business Profile** (none found; #1 local factor, see SEO-OFFPAGE.md).
10. **Services:** pressure washing on a plumbing site? tank/tankless, gas/electric heaters, haul-away, permits, sewer camera,
    gas line work, "most asked" service.
11. **15% off terms** (who qualifies, any limits).
12. **Privacy and terms:** legal review, effective date, privacy request email, analytics/cookies used.
13. **Map:** OpenStreetMap image today; swap for a Google Maps screenshot if wanted.

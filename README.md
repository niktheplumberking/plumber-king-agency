# Plumber King Agency website

Marketing site for **Plumber King Agency**, a **Bennett & Co LLC** company. It is built with Next.js 16 and Tailwind CSS 4 (animations are plain CSS plus a small scroll helper in `src/lib/scroll.ts`, to keep JavaScript small), and exported as plain static files so it runs on Hostinger shared hosting (WFACT hosting law: Hostinger for live sites, Vercel for previews only).

## Commands

```bash
npm install
npm run dev            # local dev server
npm run build          # production build -> out/ (placeholders hidden)
npm run build:preview  # preview build -> out/ (placeholder reviews/stats/portfolio visible, each badged)
npm run serve          # serve out/ on http://localhost:4173 (behaves like Hostinger)
npm run typecheck
```

Copy `.env.example` to `.env.local` and fill it in before the live build.

## Deploying to Hostinger

1. `npm run build`
2. Upload **everything inside `out/`**, including the hidden `.htaccess`, to `public_html/`.
3. In Google Search Console and Bing Webmaster Tools, add the domain and submit `https://<domain>/sitemap.xml`.
4. Submit the contact form once on the live site and confirm the email reaches support@bennettndco.com (check spam too).

`.htaccess` forces HTTPS, redirects www to non-www, serves `404.html`, and sets caching and security headers.

## What still needs Nick (TO-CONFIRM)

| Item | Where | Why |
|---|---|---|
| Domain | `NEXT_PUBLIC_SITE_URL` | Nick bought a domain on 2026-10-14; which one is not confirmed yet. Sitemap, canonicals and schema use this value, so set it before the live build |
| Lead email delivery | `public/lead.php` | Sends each lead to support@bennettndco.com with PHP `mail()` on Hostinger. Tested locally with a captured mailbox only; send one real test lead after launch |
| Booking link | `src/content/site.ts` | Set to Nick's Calendly (2026-10-14) |
| Reviews and portfolio | `src/content/proof.ts` | The old site's clients and quotes were not Nick's work and were removed. Only generic preview slots remain. Add real reviews (with a `sourceUrl`) and real projects as they come |
| Lawyer review of legal pages | `src/app/terms-of-service/page.tsx`, `src/app/privacy-policy/page.tsx` | Entity, Wyoming law and address now match bennettndco.com/terms; a lawyer review is still recommended |
| Pricing and timeline wording | `src/content/faq.ts` | No prices were supplied, so none are invented |

## Placeholder rule (reviews, stats, portfolio)

Since October 2024, the US FTC rule on fake reviews (16 CFR Part 465) carries per-violation fines for made-up testimonials. The WFACT rulebook (DR-FAKE-SOCIAL-PROOF) also bans invented quotes. So:

- Every review, stat and portfolio item in `src/content/proof.ts` starts as `status: "placeholder"`.
- Placeholders render **only** in `npm run build:preview`, each with a striped PLACEHOLDER badge.
- The live build shows only `verified` entries. With none verified, the proof section is left out entirely.
- Before setting an entry to `verified`, add a `sourceUrl` (the public Google or Facebook review), or for a stat a `basis` saying how it was measured.

## SEO, GEO and AEO in the build

- Each page has its own title, description, canonical URL, Open Graph and Twitter tags, and a 1200x630 share image.
- `sitemap.xml`, `robots.txt` (AI crawlers allowed), `llms.txt` (a plain summary for AI assistants) and `manifest.webmanifest`.
- JSON-LD structured data: Organization + ProfessionalService (with Bennett & Co LLC as the parent organization), WebSite, Person, Service, FAQPage, Article and BreadcrumbList.
- Guides open with a short direct answer so search engines and AI assistants can quote them.
- Semantic HTML: one H1 per page, an ordered heading structure, breadcrumbs, a skip link and a reduced-motion mode.

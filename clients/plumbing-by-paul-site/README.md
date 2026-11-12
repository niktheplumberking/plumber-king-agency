# Plumbing By Paul website

Astro 5 static site. Brand rules: `BRAND.md`. Builder rules: `src/AGENT-BRIEF.md`.

## Run

```bash
npm install
npm run dev        # local dev
npx astro build    # must end with 0 errors
npx astro preview  # serve dist/
```

## Preview vs launch

- `PUBLIC_NOINDEX` defaults to `true`: every page carries `noindex` and `robots.txt` blocks everything.
  Set `PUBLIC_NOINDEX=false` only at launch, on the real domain.
- Set `PUBLIC_SITE_URL` (see `astro.config.mjs`) to the real domain at launch so canonicals, sitemap and schema are right.
- `vercel.preview.json` adds an `X-Robots-Tag: noindex` header for preview deploys. Do not use it for the live site.
- Hosting rule: Vercel for previews only.

## The forms do not send anything yet

`FORM_LIVE = false` in `src/data/site.ts`. The estimate forms validate and then go to `/thank-you/`, which shows a
preview note. Before launch: point the two form `action`s in `src/components/sections/EstimateForm.astro` at a real endpoint,
set `FORM_LIVE = true` (this lets the browser really submit), and test a real submission end to end.

## Before launch, Paul must confirm

See the "Paul to confirm" list in `src/AGENT-BRIEF.md`.

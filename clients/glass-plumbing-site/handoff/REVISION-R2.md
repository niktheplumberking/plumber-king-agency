# Glass revision round 2 (Nick's review of the live build, 20 Nov 2026 07:01 UTC)

Live: https://glass-plumbing-largo.vercel.app . Verdict from Nick: below the bar ("I don't think it's matching the
quality"), but "really close". Mike's VFACT site is the bar (mikes-plumbing-riverside.vercel.app); United and Paul too.
New rules (now in pk-brain skills pka-site-craft section 6 items 14-18, pka-client-site): read them:
`/home/user/pk-brain/.claude/skills/pka-site-craft/SKILL.md` (section 6 whole) and `/home/user/pk-brain/.claude/skills/pka-client-site/SKILL.md` (step 4 motion bullets).

## Nick's points (paraphrased faithfully; his words in quotes)
KEEP (praised, do not redesign; small polish only): Home Emergency (wheel rotating on scroll) and the seam between
"How a job goes" and Emergency; About "How we work"; the FAQ/Questions sections; "Tell us about the job" (home estimate);
the footer. Contact "Contact questions" (flip cards) is "interesting": centre its title.
FIX:
1. "Kody Glass, Owner" business-card photo: logo cut in half (home Crew area and About). Show it fully / reposition.
2. Home "What 16 reviews say" (Why us): "really, really terrible": text only, no stars, nothing builds credibility.
   Needs stars, proof, real quotes, interaction.
3. Home "Five steps. No surprises": idea good, "layout is shit", nothing interactive.
4. Contact hero "Fastest first: 5 ways to reach us": "really empty and bold".
5. Reviews hero: "pretty empty"; visible "Home / Reviews" breadcrumb must go on EVERY page ("Can we please not do that
   again?"); keep BreadcrumbList JSON-LD only.
6. Reviews "What people mention": 3 text blocks left + tally right = slop, too much empty space.
7. Reviews "All reviews, newest first": no motion. Wants a scroll-driven wall: left and right columns move down while the
   middle one moves up as you scroll (21st.dev has such components).
8. About: first photo in the hero/"here" section not centred properly; "On the record": promote the licence (FL CFC1432488,
   DBPR) and Instagram (@glassplumbingservices, 653 followers + verified tick read 17 Nov 2026, 34 posts) visibly.
9. Everywhere: no "text left, text right, that's it" sections. Each section gets a layout idea from what the page and the
   section are about (21st.dev as main reference; Pinterest/Dribbble/Awwwards ideas welcome), interactive, "controlled".
   Titles may be centred.
10. Motion: Lenis + GSAP smooth scroll and parallax on images AND text across the whole site, beautiful scroll.
11. Page transition must not look like Mike's or Khinda's (all three currently use 8 blinds: replace for Glass).
    Loader "feels kind of weird", may stay; improving it is optional.
Also from the skill (lead found): "No cross-page hash links: link the real page instead." The build links
/services#family and /areas#town-x: change to the real page (/services, /areas) or a built page.

## How to work (every builder)
- Live-audit your pages first: screenshot each section at 1440 and 390 on the live preview, judge each against rules 14-18
  and Nick's points; list KEEP / POLISH / REBUILD with one-line why. Kept sections stay untouched.
- For each REBUILD: search 21st.dev (load tool `mcp__21st_dev__search` via ToolSearch "select:mcp__21st_dev__search,mcp__21st_dev__get_component";
  if it fails, browse https://21st.dev/community/components/s/<category> with Playwright) by what the section is ABOUT
  (testimonials wall, marquee columns, contact cards, stats, timeline/steps, hero, logo cloud, bento, record/credentials...).
  Shortlist 3, pick the most advanced one that fits, adapt it to Astro + vanilla TS + GSAP (no React), re-skin with the
  Glass system (tokens.css; housings, powder offset shadow, spec plates, meniscus) so it is Glass's own, not the demo.
  Log your picks (section, 21st.dev URL/name, adaptation) in handoff/COMPONENT-MAP-R2.md (append your own block).
- Never repeat a layout already used elsewhere on the site, or Mike's/Khinda's/United's/Paul's.
- Facts only from src/data/*.ts and the existing copy; reviews word for word; 104 and 77 never summed; red only on call
  buttons; no photo twice on a page; no names on faces.
- Motion via MOTION.md attributes / kit; every new interaction has reduced-motion and no-JS fallbacks; anything moving
  > 5 s on its own has a pause (a scroll-driven wall moves only with scroll, so no pause needed, but an auto-loop does).
- Verify at 1440, 1280, 1024, 820, 390, 360: no horizontal scroll, nothing cut off, 44 px taps, axe clean (axe-core:
  use the copy the earlier QA used if present in a node_modules; never npm install). Save before/after PNGs in
  handoff/qa/r2/<your-area>/.
- Your own dev port; stop it when done. Do not commit. Final reply: per section what changed + evidence + 21st.dev source.

## Fix round after the independent R2 review (lead, 20 Nov)
Source: handoff/qa/r2/independent/REVIEW.md. Fact rule for this round: business-specific claims (what Glass does,
promises, local permit/water/housing facts) need a line in src/data/*.ts or research/FACTS-CHECK.md / LOCAL-FACTS.md, and
INFERRING items must be hedged ("usually", "check with your permit office") or removed. General trade knowledge may stay
only if accurate and phrased generally (no numbers). Keep "24/7" (his own site and card). Remove the trip-charge line and
"we haul the old one" (unconfirmed). No names next to a single face; "the Glass brothers" only as a quote from a review.
Maps: /areas keeps the map; home Areas, /contact shop and Seminole distance must not be "map + plate" again.

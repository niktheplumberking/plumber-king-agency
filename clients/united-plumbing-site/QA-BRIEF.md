# Pixel-match pass brief (round 2)

Read `AGENT-BRIEF.md` first (content rules, Figma ids, motion attributes, design tokens). This file adds the round-2 job.

## The job
Nick (agency owner) wants every page a true 1:1 match with the Figma frames: same sizes, proportions, spacing, alignment,
font sizes, line breaks, colours, radii, image crops, element positions. Desktop AND phone. He judges hard. Find every
difference between Figma and the site for your pages and fix it. Do not "improve" the design; match it.

## How to compare (be precise, not eyeballed at thumbnail size)
1. Figma: `create_session` (fileKey `QbPRX8MU5AA6peTerdP5gg`), then `get_screenshot` of the frame (desktop frames are 1440 wide,
   mobile 390 or 375). Get section-level crops at 1:1 scale, not the whole page shrunk. Use `get_design_context` /
   `get_metadata` on a section node for exact numbers (font size, line height, letter spacing, padding, gaps, widths, colours).
   Load `skill://figma/figma-design-to-code/SKILL.md` via `get_figma_skill` before `get_design_context`. Read-only.
   Viewing images: at most 2-3 images per turn, crop with Python PIL first (whole-page images get dropped by a request limit).
   Older cut parts exist in `/tmp/claude-0/-home-user/cf29b17e-d3ee-5b4f-be9c-a5966b09f4a5/scratchpad/fig/` (desktop, 1000 px wide)
   and `/home/user/shots/fm/` (some mobile).
2. Site: run your own dev server `npx astro dev --port <your port> --host 127.0.0.1` (background). Playwright screenshot at
   viewport exactly 1440x900 (desktop) and 390x844 (isMobile, hasTouch, deviceScaleFactor 1), `reducedMotion: 'reduce'`,
   scroll through first so lazy images load. Note: above 1440 px the whole page is CSS-zoomed (Base.astro) so 1440 is the
   reference width.
3. Compare section by section, same crop, side by side (PIL), at the same scale. Measure: section heights, heading sizes and
   line breaks, x/y of key elements, card sizes, gaps. Use `get_design_context` numbers vs computed styles
   (`getComputedStyle`, `getBoundingClientRect`) where the eye is unsure. Target: within a few px.
4. Fix in your files. Re-shoot. Repeat until it matches. Then check the phone frame the same way.

## Rules
- Only edit the files you own (listed in your task). If a shared component needs a change, describe it exactly in your report
  (file, selector, old -> new) instead of editing it, unless your task says you own it.
- Copy rules from AGENT-BRIEF.md still apply (no invented facts, no banned claims, no em dashes, placeholders stay).
- Yellow sticky notes in Figma are designer notes: never on the site.
- Keep motion attributes working. Do not edit `src/scripts/motion.ts`, `Base.astro`, `global.css` (report needs instead).
- Never run `astro build` into `dist/`. Console must stay clean; no horizontal scroll at 390.
- Report (short): what differed and what you fixed, per page and per size; anything left that still differs and why;
  shared-file changes you need.

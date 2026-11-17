# Figma extraction brief (read-only, for the Mike build)

Goal: put every approved VFACT frame on disk so builders never call Figma.
File key QbPRX8MU5AA6peTerdP5gg, page 626:1943 "Mike's Plumbing Solutions VFACT". READ-ONLY: never change anything in Figma.
Session: call mcp__Figma__create_session once (fileKey above, description "read-only extraction of Mike VFACT frames"),
pass its sessionId on every call. Load tools with ToolSearch "select:mcp__Figma__use_figma,mcp__Figma__get_screenshot,mcp__Figma__create_session".
Before the first use_figma call, read the figma-use skill (ReadMcpResourceTool skill://figma/figma-use/SKILL.md, if available) and pass skillNames "resource:figma-use".

Budget: one other agent works on Figma at the same time. Never run Figma calls in parallel yourself (one at a time).
If a call returns a rate-limit error: wait (Bash sleep is blocked; do non-Figma work like checking files) and retry up to 3 times
with growing gaps, then stop and report which frames are missing.

For EACH frame in your list:
1. Screenshot at 1x: get_screenshot(nodeId, maxDimension = the frame's height (desktop frames are 1440 wide, mobile 390 wide;
   use the larger of height and width)). Download the PNG with the curl command it gives to
   `/home/user/plumber-king-agency/clients/mikes-plumbing-site/handoff/figma-cache/<page>/<desktop|mobile>-<id with - instead of :>.png`.
   Check the PNG size with python PIL equals the frame size (1440 x H or 390 x H). If the tool capped it, take it in two calls
   on the top-level child sections instead (name files `<desktop|mobile>-<id>--<section-slug>.png`).
2. Node tree: run `/home/user/plumber-king-agency/clients/mikes-plumbing-site/handoff/tools/figma-dump.js` through use_figma,
   replacing __ROOT__ with the frame id, __FROM__/__TO__ with child index ranges. Start with FROM=0, TO=6; the result tells you
   `total`; continue in chunks of ~6 until done (smaller chunks if a result is truncated or errors on size).
   Save each result string exactly as returned (it is JSON) to `.../figma-cache/<page>/<desktop|mobile>-<id>.partN.json`,
   then merge the parts with python into `<desktop|mobile>-<id>.json` ({id,n,w,h,fill,k:[all children in order]}) and delete the parts.
   Validate with python json.load. Write the JSON with the Write tool or a python heredoc; never retype values by hand.
3. Append to `.../figma-cache/INDEX.md`: page, frame id, size, and one line per top-level child: index, name, y, height.

Page slugs: home, services, water-heaters, drain-cleaning, emergency, town-corona, service-areas, about, our-work, reviews,
contact, faq, privacy, terms, thank-you, assets.
When done, report: frames done, files written (sizes), anything missing or odd (e.g. hidden nodes, text with mixed styles).
Do not build anything, do not commit.

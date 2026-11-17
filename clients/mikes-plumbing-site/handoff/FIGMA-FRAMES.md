# Mike's Plumbing: approved Figma frames (the build spec)

File `QbPRX8MU5AA6peTerdP5gg`, page **"Mike's Plumbing Solutions VFACT"** (`626:1943`).
Read-only for builders. Yellow "MIKE TO CONFIRM" notes sit beside frames: they are designer notes, never on the site.
Assets column (real photos, logo, map): frame `642:437` at x -1760. The same files are in `research/photos/` here.

| Page | Desktop 1440 | Mobile 390 | URL (from plan/PAGES-COPY.md) |
|---|---|---|---|
| Home | `631:2037` (1440x11160) | `640:437` (390x14438) | `/` |
| Services hub | `669:539` (7050) | `670:4039` (8528) | see PAGES-COPY §1 |
| Water heaters | `670:7700` (5540) | `670:11675` (6232) | §2 |
| Drain cleaning & hydro jetting | `670:13365` (5434) | `672:437` (5940) | §3 (template for every other service page) |
| Emergency plumbing | `669:783` (4340) | `670:2103` (4444) | §4 |
| Town page: Plumber in Corona, CA | `670:3403` (5760) | `670:8484` (7050) | §5 (template for every other town) |
| Service areas | `670:10564` (4090) | `670:12818` (4468) | §6 |
| About | `669:863` (5600) | `670:2272` (5682) | §7 |
| Our work | `670:4205` (5026) | `670:9446` (5400) | §8 |
| Reviews | `670:11578` (5674) | `671:1096` (5998) | §9 |
| Contact | `669:438` (3594) | `670:1594` (4349) | §10 |
| FAQ | `670:3208` (3939) | `670:5203` (4096) | §11 |
| Privacy | `670:7059` (2726) | `670:7187` (2807) | §12 |
| Terms | `670:7272` (2836) | `670:7407` (2901) | §12 |
| Thank you | `670:8742` (2131) | `670:8864` (2810) | §13 (noindex) |

Every frame is built from named child frames, one per section (e.g. `reviews`, `services`, `process (stair steps)`),
plus page-level decoration nodes that cross section seams (names start with `seam detail`, `band`, `pipe`, `tape`,
`review ticker`, `wave seam`). Those crossing pieces are part of the design: build them as absolutely positioned
layers above both sections, not inside one section.

## Figma call budget (important)
On 17 Nov the Figma MCP hit the Professional-plan call limit after ~4 agents worked in parallel, and it then blocked
every thread on the account for a while. Rules:
- Max 2 agents calling Figma at the same time.
- Per section: one `get_design_context` (or `get_metadata`) + one `get_screenshot`, saved to disk
  (`handoff/figma-cache/<frame>/<section>.{json,png}`), then work from the cache. Never re-fetch what is cached.
- Export vectors (pipes, waves, hex nuts, dial ticks, stamps) once as SVG and reuse them.
- If a call returns the rate-limit error: stop Figma work, keep building from the cache, retry in 30-60 min.

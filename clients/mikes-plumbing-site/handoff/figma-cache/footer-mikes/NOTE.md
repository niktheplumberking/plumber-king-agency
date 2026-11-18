# Footer "MIKE'S" reference (fix round 1, B10d)

File QbPRX8MU5AA6peTerdP5gg. Calls made (Figma MCP budget 3): create_session, get_screenshot 595:438 (maxDimension 1440).
- Node 595:438 is a whole Home page frame (1440 x 9746), not the footer alone, so the 1440-px cap rendered it at 213 x 1440:
  `home-595-438-213w.png`. At that size the footer reads as: dark coal footer, logo + tagline left, three link columns,
  copyright bar. No giant "MIKE'S" wordmark is legible in this render.
- The third call was not spent: get_design_context on a 9746-px page would not isolate the footer either.
- Built from the brief's own spec instead: full-bleed "MIKE'S" in Abril Fatface, tan on coal, cut in half by the bottom edge,
  aria-hidden, full width at 390 with no horizontal scroll. Logged in README (deviation log).

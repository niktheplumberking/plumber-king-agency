# Why the VFACT design of Mike's site landed, and what the PKA project should change

Written 17 Nov 2026 after comparing, in Figma, the PKA project's Mike design (page `481:437`, home `595:438`) with the
VFACT design (page `626:1943`, home `631:2037`). Nick's verdict on VFACT: "literally perfect", "so many beautiful things".
Labels: **fact** = seen in Figma or the files; **inferring** = my reading of the cause.

## 1. What PKA did better (keep it)
- **More facts (fact).** PKA read all 20 Yelp reviews (counts "14 of 20 came fast, 11 of 20 fair price, 7 of 20 left it
  clean"); VFACT captured only 9. PKA found a real photo of Mike working ("Mike on a drain camera job"), an email
  (mikesplumbingco25@gmail.com), payment methods (Cash, Zelle, Cash App), "15% off for new customers", "Open 7 days".
  VFACT does not have these. **Merge them into the build** if PKA's research files show a source for each one
  (don't know yet: "Insured" and "15% off" sources were not checked by me).
- Clean, consistent, no overlaps, real Google-style map.

## 2. Why VFACT looks like a bespoke site and PKA's looks like a template
1. **One owned motif, taken from Mike's own things (fact).** His flyer gave the palette (ink + tan), the fonts
   (Abril Fatface headings, Oswald labels, Archivo text, Yesteryear script) and the idea "every job gets the stamp".
   His logo badge gave the hex nut. Every number, button, badge and step on the site is a hex nut; every section is
   joined by plumbing (pipes, valves, couplings, tags, drips, a gauge).
   PKA used a generic italic serif and the hex only as a small label.
2. **Each section is a physical object, not a component (fact).** VFACT: reviews = editorial quote + ticket stubs +
   tally of hex nuts; services = an index list with a photo that pops on hover; about = a bolted nameplate with tags
   hanging from a pipe; emergency = a 24-hour dial; areas = a route map from Riverside; FAQ = "Ask Mike." sitting on a
   pipe; CTA = a job ticket with carbon copy; process = one pipe run with 5 stops.
   PKA's own section names are component types: "3x2 photo tiles", "bento", "5-step rail", "accordion",
   "map card + town chips". **Inferring:** its skill lists the master structure as section *types* plus the CRO SOP
   14-block formula, so the agent picked the default component for each block. Structure was meant to be fixed,
   layout free; in practice the layout came with the structure.
3. **The seams carry the story (fact).** VFACT sections meet on wave edges, and objects cross them: a keyword band
   between reviews and services, a pipe that leaves the services list and carries the about tags, a review ticker,
   drips, a valve, a pipe into the dial. PKA repeats one centred "hex label" divider about 8 times with straight edges.
4. **No layout twice, checked across the whole site (fact).** A separate reviewer listed every repeat (same layout,
   same photo twice on a page) across 30 frames and each one was redesigned.
5. **The loop (fact).** Design a section, screenshot it at full size, fix, next. Then an independent review of every
   frame, then fixes, then Nick. Each Nick critique became a rule the same turn.
6. **Fewer rules, more craft (inferring).** PKA's `pka-client-site` (188 lines) + `pka-site-craft` (212 lines) + the SOP,
   with three STOP gates and several rewrites on 17 Nov, push the agent to comply. VFACT worked from three short sheets:
   facts (BRAND-AUDIT), the design system (palette, fonts, motif), and page copy, then had freedom per section.

## 3. The method, zero to finished (what PKA should do every time)
1. **Facts file.** Logo, flyer, van, IG posts, every review word for word, phone, towns, hours source, licence lookup.
   Each fact with its source. Missing = a "confirm" note, never invented.
2. **Owned motif.** List the client's physical things (logo shape, flyer, van, slogan, tools in his photos).
   Pick ONE shape + ONE phrase as the motif, take fonts and colours from his own print (logo/flyer/van).
3. **Copy sheet per page** (sections in SEO order: the structure from United/Paul stays).
4. **Per section, ask "what plumbing object could this be?"** before "which component?". Find 21st.dev / Dribbble
   references for the interaction, not for the look. Log them.
5. **Seams.** Every boundary gets a wave or shaped edge, and at least every second boundary gets an object that crosses it.
6. **Design in Figma, section by section, screenshot at full size after each, fix before moving on.**
7. **Repeat check across all pages** (layouts, photos, final CTAs) + facts check (every claim has a source).
8. **Independent review**, fix, then show Nick. Log his praise and critique as rules the same turn.

## 4. What PKA should change in its own setup (proposal for Nick to approve)
- In `pka-client-site`: keep the master *structure* as what each section must SAY, and delete the component words
  from it ("bento", "tiles", "rail", "accordion", "card + chips"). Add steps 2, 4, 5 and 7 from section 3 above.
- Add one line to the design log: "Mike VFACT 17 Nov = reference for owned motif + seams + one-object-per-section".
- Merge, don't stack, rules: one skill file wins; no rewrites mid-day without Nick.
- Figma call budget (see FIGMA-FRAMES.md): max 2 Figma agents at a time, cache every fetch.

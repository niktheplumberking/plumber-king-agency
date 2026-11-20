# Glass fix round 3 (after the independent re-check, 20 Nov)

Source of findings: handoff/qa/r2/recheck/RECHECK.md (read it fully). Brief and Nick's points: handoff/REVISION-R2.md,
handoff/BUILD-BRIEF.md, rules in /home/user/pk-brain/.claude/skills/pka-site-craft/SKILL.md section 6 items 14-18.

## Ground rules (both fixers)
- Facts: only what research proves (/mnt/project-files/plumber-king-agency/clients/glass-plumbing/research/ and
  src/data/*.ts). Unproven = remove or phrase as general trade knowledge. Never: names beside a single face (we cannot tell
  Kody from Zak), invented promises, prices, years, response times, who answers the phone, who runs the Instagram.
  Reviews word for word. 104 and 77 never summed. Red only on call buttons.
- No repeats: a new section idea must not match ANY section of Mike's site
  (`git show origin/claude/project-thread-59bfrz:clients/mikes-plumbing-site/...`, list with
  `git ls-tree -r --name-only origin/claude/project-thread-59bfrz clients/mikes-plumbing-site/src/components`),
  Khinda's (`origin/claude/project-thread-me9wb4`, clients/khinda-electrical-site/src/components), or another Glass section.
  Before building, write a one-line "nearest match in Mike/Khinda/Glass and why mine differs" per section into your
  NOTES file. Check by reading their component code, not names.
- No text-left / object-right slop; every section has something to touch or something scroll-driven.
- 21st.dev (mcp__21st_dev__search / get_component, load via ToolSearch) as the main reference per section, picked from what
  the section is about; log the source in NOTES.
- Motion: MOTION.md attributes; parallax on wrappers; reduced motion static and complete; anything auto-moving > 5 s pauses.
  Keep JS small: no per-frame work when off-screen (IntersectionObserver gate), no layout reads in scroll handlers.
- Never touch the other fixer's folders. Shared files (src/layouts, src/scripts, src/styles, kit/, ui/, data/) belong to
  fixer E only; fixer D asks the lead in handoff/REQUESTS.md.
- Loop per section: build, `npm run build`, own dev/preview port, Playwright at 1440 and 390 (reduced motion and motion
  on), look at the screenshots yourself, fix. No horizontal scroll at 390/768/1024/1440. `npm run check:links` = 0.
- Do not deploy, do not commit, do not push. Lead does that.

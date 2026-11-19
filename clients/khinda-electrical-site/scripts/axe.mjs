// axe-core (WCAG 2.x A/AA rules) on built pages at 1440 and 390. node scripts/axe.mjs <axe.min.js> [paths...]
// Exit 1 on any violation. Needs a local axe-core copy (path as arg 1) and Playwright.
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import { serveDist } from './serve-dist.mjs';
const [axePath, ...paths] = process.argv.slice(2);
const src = fs.readFileSync(axePath, 'utf8');
const srv = await serveDist(); const b = await chromium.launch(); let bad = 0;
for (const w of [1440, 390]) for (const p of paths.length ? paths : ['/']) {
  const pg = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await pg.goto(srv.url + p, { waitUntil: 'networkidle' }); await pg.addScriptTag({ content: src });
  const r = await pg.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] })).violations.map((v) => ({ id: v.id, n: v.nodes.length, t: v.nodes.slice(0, 3).map((x) => x.target.join(' ')) })));
  bad += r.length; console.log(w, p, r.length ? JSON.stringify(r) : 'OK'); await pg.close();
}
await b.close(); process.exit(bad ? 1 : 0);

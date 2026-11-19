// Internal link check on the built site: every href="/..." in dist/*.html must resolve to a built page or file.
// Run after `npm run build`:  npm run check:links      Exit code 1 when anything is missing (lists each path once).
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const pages = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); });
walk(dist);

const missing = new Map();
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const [, raw] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const path = raw.replace(/\/$/, '') || '/';
    if (path.startsWith('/_astro') || path.startsWith('/fonts')) continue;
    const ok = path === '/' ? existsSync(join(dist, 'index.html'))
      : existsSync(join(dist, path)) || existsSync(join(dist, `${path}.html`)) || existsSync(join(dist, path, 'index.html'));
    if (!ok) missing.set(path, [...(missing.get(path) ?? []), page.replace(dist, '')]);
  }
}
if (!missing.size) { console.log(`OK: every internal link in ${pages.length} page(s) resolves.`); process.exit(0); }
console.log(`MISSING: ${missing.size} internal path(s) have no built page:`);
for (const [path, from] of [...missing].sort()) console.log(`  ${path}   (linked from ${[...new Set(from)].join(', ')})`);
process.exit(1);

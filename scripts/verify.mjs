// Independent launch-file and SEO check of the built site in out/ (run after `npm run build`).
// Reads the files on disk only; it never trusts the build log. Exit code 1 on any failure.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] ?? "out");
const fails = [];
const ok = [];
const decode = (s) => s?.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const check = (cond, pass, fail) => (cond ? ok.push(pass) : fails.push(fail));

const htmlFiles = [];
const walk = (d) => readdirSync(d).forEach((n) => { const p = path.join(d, n); statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && htmlFiles.push(p); });
walk(out);
const rel = (p) => "/" + path.relative(out, p).split(path.sep).join("/").replace(/index\.html$/, "");
const pages = htmlFiles.filter((p) => !/\/(404|_not-found)(\/|\.html)/.test(p) && !p.endsWith("404.html"));

// Launch files
for (const f of ["robots.txt", "sitemap.xml", "llms.txt", "404.html", "og-image.png", "manifest.webmanifest", ".htaccess", "icon.png", "apple-icon.png", "lead.php", "brand/logo-160.webp", "brand/nick-founder.webp"]) check(existsSync(path.join(out, f)), `${f} present`, `${f} missing`);
const robots = readFileSync(path.join(out, "robots.txt"), "utf-8");
const sitemap = readFileSync(path.join(out, "sitemap.xml"), "utf-8");
const siteUrl = (sitemap.match(/<loc>(https:\/\/[^/<]+)\//) ?? [])[1];
check(!!siteUrl, `sitemap uses https origin ${siteUrl}`, "sitemap has no absolute https <loc>");
check(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), "robots.txt points to the sitemap", "robots.txt has no Sitemap line for the production origin");
check(!/Disallow:\s*\/\s*$/m.test(robots), "robots.txt does not block the site", "robots.txt blocks the whole site");

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(siteUrl, ""));
const pagePaths = pages.map(rel).sort();
check(JSON.stringify([...locs].sort()) === JSON.stringify(pagePaths), `sitemap lists exactly the ${pagePaths.length} pages`, `sitemap/pages mismatch: only in sitemap ${locs.filter((l) => !pagePaths.includes(l))}; only on disk ${pagePaths.filter((p) => !locs.includes(p))}`);

// Per page SEO
const titles = new Map(), descs = new Map();
const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "1";
for (const p of pages) {
  const html = readFileSync(p, "utf-8");
  const r = rel(p);
  const title = decode((html.match(/<title>([^<]*)<\/title>/) ?? [])[1]);
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1]);
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) ?? [])[1];
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  check(!!title && title.length <= 70, `${r} title ok`, `${r}: title missing or over 70 chars (${title?.length}): ${title}`);
  check(!!desc && desc.length >= 70 && desc.length <= 165, `${r} description ok`, `${r}: description length ${desc?.length} (want 70-165)`);
  check(canon === siteUrl + r, `${r} canonical ok`, `${r}: canonical ${canon} != ${siteUrl + r}`);
  check(h1s === 1, `${r} one h1`, `${r}: ${h1s} <h1> elements`);
  check(/<meta property="og:image" content="https:\/\//.test(html), `${r} og:image`, `${r}: no absolute og:image`);
  check(/<html lang="en-US"/.test(html), `${r} lang`, `${r}: missing lang`);
  if (title) titles.set(title, [...(titles.get(title) ?? []), r]);
  if (desc) descs.set(desc, [...(descs.get(desc) ?? []), r]);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); ok.push(`${r} JSON-LD parses`); } catch (e) { fails.push(`${r}: JSON-LD does not parse: ${e.message}`); }
  }
  check(html.includes('"@type":"BreadcrumbList"') || r === "/", `${r} breadcrumbs`, `${r}: no BreadcrumbList schema`);
  // Placeholder proof must never reach the live build
  if (!showPlaceholders) check(!/class="placeholder-badge"/.test(html), `${r} no placeholder proof`, `${r}: placeholder proof is visible on a live build`);
  // Internal links resolve to a file in out/
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith("/_next/")) continue;
    const target = path.join(out, href, href.endsWith("/") ? "index.html" : "");
    check(existsSync(target) && statSync(target).isFile(), "", `${r}: broken internal link ${href}`);
  }
}
for (const [t, ps] of titles) check(ps.length === 1, "", `duplicate title "${t}" on ${ps.join(", ")}`);
for (const [d, ps] of descs) check(ps.length === 1, "", `duplicate description on ${ps.join(", ")}`);

const html404 = readFileSync(path.join(out, "404.html"), "utf-8");
check(/noindex/.test(html404), "404 page is noindex", "404 page is indexable");
check(readFileSync(path.join(out, "llms.txt"), "utf-8").includes("Bennett & Co LLC"), "llms.txt names Bennett & Co LLC", "llms.txt does not name the holding company");
const tos = readFileSync(path.join(out, "terms-of-service/index.html"), "utf-8");
check(decode(tos).includes("Bennett & Co LLC") && tos.includes("Wyoming") && tos.includes("30 N Gould St"), "Terms of Service names Bennett & Co LLC, Wyoming law and address", "Terms of Service is missing the entity, Wyoming law or address");

console.log(`checks passed: ${ok.filter(Boolean).length}`);
if (fails.length) { console.log(`FAILED (${fails.length}):`); fails.forEach((f) => console.log("  - " + f)); process.exit(1); }
console.log(`VERIFY: PASS (${pages.length} pages)`);

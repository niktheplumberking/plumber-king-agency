// Screenshots for human review: node scripts/shots.mjs <outDir> <path...>  (server must be running on PORT)
import { chromium } from "playwright";
const [outDir, ...paths] = process.argv.slice(2);
const port = process.env.PORT ?? 4173;
const widths = (process.env.WIDTHS ?? "1440,390").split(",").map(Number);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? undefined });
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: w > 800 ? 900 : 844 }, deviceScaleFactor: 1 });
  for (const p of paths) {
    await page.goto(`http://localhost:${port}${p}`, { waitUntil: "networkidle" });
    // scroll through so whileInView reveals fire, then back to the top
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(60); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(1600);
    const name = `${outDir}/${(p.replace(/\//g, "_") || "_").replace(/^_|_$/g, "") || "home"}-${w}.png`;
    await page.screenshot({ path: name, fullPage: true });
    console.log(name);
  }
  await page.close();
}
await browser.close();

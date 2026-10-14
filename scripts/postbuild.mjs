// After `next build`: render the share card to og-image.png, then remove the helper page from the output.
import { spawn } from "node:child_process";
import { copyFileSync, existsSync, rmSync } from "node:fs";
import { chromium } from "playwright";

const port = 4199;
const server = spawn(process.execPath, ["scripts/serve.mjs", "out"], { env: { ...process.env, PORT: String(port) }, stdio: "ignore" });
await new Promise((r) => setTimeout(r, 600));
const fallback = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? (existsSync(fallback) ? fallback : undefined) });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(`http://localhost:${port}/og-card/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#og").screenshot({ path: "out/og-image.png" });
  copyFileSync("out/og-image.png", "public/og-image.png");
  console.log("postbuild: wrote og-image.png (1200x630)");
} finally {
  await browser.close();
  server.kill();
}
rmSync("out/og-card", { recursive: true, force: true });
rmSync("out/og-card.txt", { force: true });
console.log("postbuild: removed /og-card/ helper page");

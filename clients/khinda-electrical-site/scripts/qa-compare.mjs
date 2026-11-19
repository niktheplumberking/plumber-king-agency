// QA: full-page screenshot of a built page (reduced motion = static complete), then side-by-side crops against the Figma
// export, section by section. node scripts/qa-compare.mjs <path> <1440|390> <figma.png> <outDir> [name:y:h ...]
// Sections are given in Figma page px (frame coords). Writes <outDir>/<w>-<name>.png = Figma | build, and full-<w>.png.
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import sharp from 'sharp';
import fs from 'node:fs';
import { serveDist } from './serve-dist.mjs';
const [pth, ws, ref, out, ...secs] = process.argv.slice(2);
const W = +ws;
fs.mkdirSync(out, { recursive: true });
const srv = await serveDist();
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: W, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto(srv.url + pth, { waitUntil: 'networkidle' });
await p.evaluate(async () => { await document.fonts.ready; for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } window.scrollTo(0, 0); });
await p.addStyleTag({ content: '[data-mbar]{display:none!important} .hdr{position:relative!important}' });
await p.waitForTimeout(400);
const full = `${out}/full-${W}.png`;
await p.screenshot({ path: full, fullPage: true });
const meta = await sharp(full).metadata();
console.log('page height', meta.height, 'figma', (await sharp(ref).metadata()).height);
for (const s of secs) {
  const [name, y, h] = s.split(':'); const Y = +y, H = +h;
  const a = await sharp(ref).extract({ left: 0, top: Y, width: W, height: Math.min(H, (await sharp(ref).metadata()).height - Y) }).toBuffer();
  const hh = Math.max(1, Math.min(H, meta.height - Y));
  const bb = await sharp(full).extract({ left: 0, top: Math.min(Y, meta.height - 1), width: W, height: hh }).toBuffer();
  await sharp({ create: { width: W * 2 + 20, height: H, channels: 3, background: '#ff00ff' } })
    .composite([{ input: a, left: 0, top: 0 }, { input: bb, left: W + 20, top: 0 }]).png().toFile(`${out}/${W}-${name}.png`);
}
await b.close(); srv.close();

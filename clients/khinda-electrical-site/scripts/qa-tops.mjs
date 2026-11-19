import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { serveDist } from './serve-dist.mjs';
const W = +process.argv[2]; const srv = await serveDist(); const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: W, height: 900 }, reducedMotion: 'reduce' })).newPage();
await p.goto(srv.url + (process.argv[3] || '/'), { waitUntil: 'networkidle' });
await p.addStyleTag({ content: '[data-mbar]{display:none!important} .hdr{position:relative!important}' });
console.log(JSON.stringify(await p.evaluate(() => Array.from(document.querySelectorAll('body section, body footer, body header, body [class*="util"]')).filter(e=>!e.closest('section section')).map((e) => { const r = e.getBoundingClientRect(); return [e.className.split(' ')[0], Math.round(r.top + scrollY), Math.round(r.height)]; }))));
await b.close(); srv.close?.(); process.exit(0);

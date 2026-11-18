// Tiny static server for dist/ (or $DIST) for the QA scripts: /path -> dist/path.html, 404 -> dist/404.html. Returns { url, close }.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = process.env.DIST ? path.resolve(process.env.DIST) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml', '.json': 'application/json', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

export function serveDist(port = 0) {
  return new Promise((resolve) => {
    const srv = http.createServer((q, r) => {
      let u = decodeURIComponent(q.url.split('?')[0].split('#')[0]);
      if (u.endsWith('/')) u += 'index.html';
      let f = path.join(DIST, u);
      if (!f.startsWith(DIST)) { r.statusCode = 403; return r.end(); }
      if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) {
        if (fs.existsSync(f + '.html')) f += '.html'; else { f = path.join(DIST, '404.html'); r.statusCode = 404; }
      }
      r.setHeader('content-type', TYPES[path.extname(f)] || 'application/octet-stream');
      fs.createReadStream(f).pipe(r);
    }).listen(port, () => resolve({ url: `http://localhost:${srv.address().port}`, close: () => srv.close() }));
  });
}

export const PAGES = ['/', '/services', '/drain-cleaning', '/water-heaters', '/emergency-plumber', '/about', '/reviews', '/our-work', '/faq',
  '/contact', '/service-areas', '/plumber-corona-ca', '/plumber-moreno-valley-ca', '/plumber-murrieta-ca', '/plumber-buena-park-ca',
  '/plumber-los-angeles-ca', '/plumber-west-hollywood-ca', '/privacy', '/terms', '/thank-you', '/404'];

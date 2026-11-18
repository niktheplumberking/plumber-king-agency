// Home only (Base.astro, html[data-late-fonts]): add the late faces once the window has loaded and the main thread is idle,
// then re-measure the scroll triggers once they are in (text below the fold may change width with the swap).
import { LATE } from './late-fonts';
import { requestRefresh } from '../components/kit/settle';

const html = document.documentElement;
if (html.hasAttribute('data-late-fonts') && document.fonts && 'FontFace' in window) {
  const add = () => {
    const faces = LATE.map((f) => new FontFace(f.family, `url('/fonts/${f.file}.woff2') format('woff2')`, { style: f.style, weight: f.weight, display: 'swap' }));
    faces.forEach((f) => document.fonts.add(f));
    Promise.allSettled(faces.map((f) => f.load())).then(() => requestRefresh());
  };
  const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(add, { timeout: 600 }) : setTimeout(add, 50));
  if (document.readyState === 'complete') idle(); else window.addEventListener('load', idle, { once: true });
}

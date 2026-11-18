// Font faces that no first viewport on the home page paints (measured at 390 and 1440, fix round 2 TBT/LCP): on home they are
// registered only after the window has loaded, so they are not fetched before the first paint and do not count against
// the LCP. Every other page gets the same faces as plain @font-face rules in <head> (Base.astro), exactly as before.
export type Late = { family: string; style: 'normal' | 'italic'; weight: string; file: string };
export const LATE: Late[] = [
  { family: 'Oswald', style: 'normal', weight: '400', file: 'oswald-latin-400-normal' },
  { family: 'Oswald', style: 'normal', weight: '500', file: 'oswald-latin-500-normal' },
  { family: 'Oswald', style: 'normal', weight: '700', file: 'oswald-latin-700-normal' },
  { family: 'Archivo', style: 'normal', weight: '800', file: 'archivo-latin-800-normal' },
  { family: 'Archivo', style: 'italic', weight: '400 500', file: 'archivo-latin-400-italic' },
  { family: 'Archivo', style: 'italic', weight: '600 800', file: 'archivo-latin-600-italic' },
  { family: 'Yesteryear', style: 'normal', weight: '400', file: 'yesteryear-latin-400-normal' },
];
export const lateCss = () => LATE.map((f) => `@font-face{font-family:'${f.family}';font-style:${f.style};font-weight:${f.weight};font-display:swap;src:url('/fonts/${f.file}.woff2') format('woff2')}`).join('');

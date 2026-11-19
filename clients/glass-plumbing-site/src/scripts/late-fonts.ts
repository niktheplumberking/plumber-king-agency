// Faces no first viewport paints (Public Sans 700 + JetBrains Mono 700 are in tokens.css: the header, utility bar,
// eyebrows and buttons paint them on every page): home registers them after load; other pages get them as @font-face in <head> (Base.astro).
export type Late = { family: string; style: 'normal' | 'italic'; weight: string; file: string };
export const LATE: Late[] = [
  { family: 'Schibsted Grotesk', style: 'normal', weight: '400', file: 'schibsted-grotesk-latin-400-normal' },
  { family: 'Schibsted Grotesk', style: 'normal', weight: '500', file: 'schibsted-grotesk-latin-500-normal' },
  { family: 'Schibsted Grotesk', style: 'normal', weight: '600', file: 'schibsted-grotesk-latin-600-normal' },
  { family: 'Schibsted Grotesk', style: 'normal', weight: '900', file: 'schibsted-grotesk-latin-900-normal' },
  { family: 'Public Sans', style: 'normal', weight: '500', file: 'public-sans-latin-500-normal' },
  { family: 'Public Sans', style: 'normal', weight: '800', file: 'public-sans-latin-800-normal' },
  { family: 'Public Sans', style: 'italic', weight: '400', file: 'public-sans-latin-400-italic' },
  { family: 'JetBrains Mono', style: 'normal', weight: '400', file: 'jetbrains-mono-latin-400-normal' },
  { family: 'JetBrains Mono', style: 'normal', weight: '800', file: 'jetbrains-mono-latin-800-normal' },
];
export const lateCss = () => LATE.map((f) => `@font-face{font-family:'${f.family}';font-style:${f.style};font-weight:${f.weight};font-display:swap;src:url('/fonts/${f.file}.woff2') format('woff2')}`).join('');

// Faint sky flow lines, drawn once per variant as a static SVG file (/flow/<name>.svg, src/pages/flow/[name].svg.ts).
// They used to be inline SVG on every page: ~10 KB of path data in each document, which pushed the Home HTML past the
// next TCP round trip on mobile (Lighthouse LCP 2.6 s, QA round 2). As files they are cached across pages.
export type FlowVariant = 'hero' | 'heroM' | 'navy' | 'cta';

const DEFAULT_OPACITY: Record<FlowVariant, number> = { hero: 0.22, heroM: 0.22, navy: 0.1, cta: 0.1 };

/** Every variant/opacity pair a page uses. A pair not listed here fails the build (the file would not exist). */
export const FLOW_FILES: [FlowVariant, number][] = [['hero', 0.22], ['heroM', 0.22], ['navy', 0.1], ['navy', 0.12], ['navy', 0.5], ['cta', 0.1]];

export const flowName = (variant: FlowVariant, opacity?: number) => {
  const op = opacity ?? DEFAULT_OPACITY[variant];
  if (!FLOW_FILES.some(([v, o]) => v === variant && o === op)) throw new Error(`FlowLines ${variant} at opacity ${op} is not in FLOW_FILES (flowLines.ts)`);
  return `${variant}-${Math.round(op * 100)}`;
};

/** The Figma formulas, unchanged from the inline component. */
export function flowSvg(variant: FlowVariant, opacity?: number): string {
  let w = 1440, h = 800; const d: string[] = [];
  if (variant === 'hero') { for (let i = 0; i < 14; i++) { const o = i * 34; d.push(`M${-80 + o * 0.6} ${820 + o * 0.2} C ${300 + o} ${700 - o * 0.5}, ${760 + o * 0.7} ${560 - o}, 1500 ${60 + o * 1.6 - 140}`); } }
  if (variant === 'heroM') { w = 390; h = 900; for (let i = 0; i < 10; i++) { const o = i * 26; d.push(`M-40 ${640 + o} C 80 ${520 + o * 0.5}, 250 ${470 - o}, 430 ${120 + o * 1.5}`); } }
  if (variant === 'navy') { h = 940; for (let i = 0; i < 9; i++) { const o = i * 46; d.push(`M-40 ${520 + o * 0.9} C 380 ${420 + o}, 900 ${760 - o * 0.4}, 1480 ${180 + o * 1.1}`); } }
  if (variant === 'cta') { h = 480; for (let i = 0; i < 8; i++) { const o = i * 40; d.push(`M-40 ${300 + o} C 300 ${200 + o}, 700 ${420 - o * 0.3}, 1480 ${40 + o}`); } }
  const op = opacity ?? DEFAULT_OPACITY[variant];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">`
    + d.map((p) => `<path d="${p}" stroke="#61ADCB" stroke-opacity="${op}" stroke-width="1" fill="none" vector-effect="non-scaling-stroke"/>`).join('')
    + '</svg>';
}

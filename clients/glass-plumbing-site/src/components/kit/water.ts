// "Clear Water" sheet: the one geometry behind the page curtain (kit/curtain.ts) and the first-visit loader (kit/loader.ts),
// so both are one family and nobody else's (Mike and Khinda use blinds). Adapted from 21st.dev "Page Transition"
// (su2491251, liquid-wave variant: layered SVG paths whose top edge is a smooth cubic curve through per-point levels),
// rewritten for vanilla TS + GSAP and re-skinned as Glass's motif: three layers of water (powder, pdeep, then clear frost)
// rise like water filling a housing, every surface is a meniscus (the water climbs the walls, the centre sits lower while
// it moves) with the housing's white meniscus line on the front surface; the drain runs the other way, front layer first.
// One writer: the `d` attribute of the paths in kit/Water.astro is written only through draw() here.
// Coordinates: viewBox 0 0 100 100, preserveAspectRatio none (so the sheet always fills the viewport).
export const LAYERS = 3;
const NP = 13;          // points across the surface
const M = 9;            // meniscus depth, % of the viewport height, while the water moves
const LAG = 0.1;        // each layer starts this much of the run after the one before
const WAVE = 0.05;      // the surface is not perfectly level while it moves (a slow swell across)
const SPAN = 1 - LAG * (LAYERS - 1) - WAVE; // one point's travel; everything is done at t = 1
const BOT = 102, TOP = -2;
const eio = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2); // ease-in-out (MOTION.md rule)
const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** Level 0-1 of layer i at point j for run progress t (0-1). Fill: back layer first. Drain: front layer first. */
function level(i: number, j: number, t: number, drain: boolean) {
  const order = drain ? LAYERS - 1 - i : i;
  const d0 = order * LAG + WAVE * (0.5 + 0.5 * Math.sin((j / (NP - 1)) * Math.PI * 1.6 + order * 1.3 + (drain ? 2 : 0)));
  const q = eio(clamp((t - d0) / SPAN));
  return drain ? 1 - q : q;
}

function edge(ys: number[]) {
  const step = 100 / (NP - 1);
  let d = `${ys[0].toFixed(2)}`;
  for (let j = 0; j < NP - 1; j++) {
    const cx = (j + 0.5) * step;
    d += ` C${cx.toFixed(2)} ${ys[j].toFixed(2)} ${cx.toFixed(2)} ${ys[j + 1].toFixed(2)} ${((j + 1) * step).toFixed(2)} ${ys[j + 1].toFixed(2)}`;
  }
  return d;
}

export type Sheet = { layers: SVGPathElement[]; line: SVGPathElement | null };
export const sheetOf = (root: Element): Sheet => ({
  layers: Array.from(root.querySelectorAll<SVGPathElement>('[data-wl]')),
  line: root.querySelector<SVGPathElement>('[data-wline]'),
});

/** Paint the sheet. t: run progress 0-1; drain: run direction; wob: a small idle swell (loader only), in viewBox units. */
export function draw(s: Sheet, t: number, drain = false, wob = 0, phase = 0) {
  s.layers.forEach((p, i) => {
    const ys: number[] = [];
    for (let j = 0; j < NP; j++) {
      const lv = level(i, j, t, drain);
      const x = j / (NP - 1);
      const moving = Math.sin(Math.PI * lv); // 0 at rest (empty or full), 1 halfway
      ys.push(BOT - lv * (BOT - TOP) + M * (1 - (2 * x - 1) ** 2) * moving + wob * Math.sin(phase + j * 0.7 + i) * moving);
    }
    const e = edge(ys);
    p.setAttribute('d', `M0 ${BOT} V${e} V${BOT} Z`);
    if (i === LAYERS - 1 && s.line) s.line.setAttribute('d', `M0 ${e}`);
  });
}

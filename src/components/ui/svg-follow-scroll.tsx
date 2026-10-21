"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

/*
 * Scroll-drawn line (after Skiper19 "svg follow scroll", Nick 2026-10-21). One playful path is drawn in step with the
 * scroll and undrawn when scrolling back up. It starts a few px off card 05's bottom-right corner in "From invisible to
 * booked", waves across the pink, swings off screen, comes back in from the left behind "Your website rings a phone." and
 * ends 12 px short of the dot after "guy's", arriving from about 2 o'clock.
 *
 * Path (rebuilt after Nick's review, 2026-10-21): like the original component, the line is one smooth stroke drawn at a
 * steady rate, a fixed share of its length per pixel scrolled. It is made only of straight runs and true circles: each
 * turn or loop is an arc of one circle, and every straight run leaves one circle and meets the next exactly on their
 * shared tangent. So the line never kinks, never wobbles, and keeps the same thickness everywhere.
 *
 * Layering (Nick: "1. background 2. the line 3. everything after"): each section is `isolate` and holds its own copy of
 * the path in a `-z-10` layer, so the line paints just above that section's background and below all its content. Each
 * layer clips at its section's edges, so the white copy shows only on the pink section and the pink copy only on the
 * ivory one: the colour changes exactly at the border. No `motion` package: plain scroll events and a dash offset.
 */

type Layer = { el: HTMLDivElement; svg: SVGSVGElement; paths: SVGPathElement[]; over: boolean };
type Store = { add: (l: Layer) => () => void };
const Ctx = createContext<Store | null>(null);

type Pt = [number, number];
const GAP_START = 8; // px between the card's edge and the line's rounded end
const GAP_END = 12; // px between the line's rounded end and the dot
const END_ANGLE = (32 * Math.PI) / 180; // arrives from 2 o'clock, ~32 degrees above horizontal

/** Page position ignoring transforms (the Reveal lift and the card tilt must not move the anchors). */
function docOffset(el: HTMLElement) {
  let x = 0, y = 0, n: HTMLElement | null = el;
  while (n) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
  return { x, y };
}

/** A circle the line wraps around. `d`: 1 turns clockwise on screen, -1 anticlockwise. `loop`: go once fully round. */
type Ring = { c: Pt; r: number; d: 1 | -1; loop?: boolean };

const TAU = Math.PI * 2;
const at = (g: Ring, a: number): Pt => [g.c[0] + g.r * Math.cos(a), g.c[1] + g.r * Math.sin(a)];
/** Where a line heading at angle `h` touches ring `g` (moving with the ring's turn). */
const touch = (g: Ring, h: number) => h - (g.d * Math.PI) / 2;

/** The straight run that leaves ring `a` and meets ring `b` on a shared tangent: its heading. */
function bridge(a: Ring, b: Ring) {
  const dx = b.c[0] - a.c[0], dy = b.c[1] - a.c[1];
  const D = Math.hypot(dx, dy), psi = Math.atan2(dy, dx);
  const k = Math.max(-1, Math.min(1, (b.r * b.d - a.r * a.d) / D));
  for (const h of [psi - Math.asin(k), psi - Math.PI + Math.asin(k)]) {
    const p = at(a, touch(a, h)), q = at(b, touch(b, h));
    if ((q[0] - p[0]) * Math.cos(h) + (q[1] - p[1]) * Math.sin(h) > -1e-6) return h; // 0: the rings touch, no run
  }
  return psi;
}

/** The SVG path, its length and points along it (every ~`step` px, with the length so far): rings joined by straight
 *  tangent runs. A ring with r = 0 is a plain point. The first ring is entered at `startAngle`, the last left at
 *  `endAngle` (ignored for points). */
function beltPath(rings: Ring[], startAngle: number, endAngle: number, step = 3) {
  const f = (n: number) => n.toFixed(1);
  const heads: number[] = [];
  let kinked = false; // two rings too close for a shared tangent: the line would break into a corner
  for (let i = 0; i < rings.length - 1; i++) {
    const a = rings[i], b = rings[i + 1];
    if (Math.abs(b.r * b.d - a.r * a.d) > Math.hypot(b.c[0] - a.c[0], b.c[1] - a.c[1]) + 1e-6) kinked = true;
    heads.push(bridge(a, b));
  }
  let d = "", len = 0, prev: Pt | null = null;
  const pts: { p: Pt; s: number }[] = [];
  const sweeps: number[] = [];
  rings.forEach((g, i) => {
    const a0 = i === 0 ? startAngle : touch(g, heads[i - 1]);
    const a1 = i === rings.length - 1 ? endAngle : touch(g, heads[i]);
    const p0 = at(g, a0);
    if (prev) {
      const run = Math.hypot(p0[0] - prev[0], p0[1] - prev[1]), n = Math.ceil(run / step), q0 = prev;
      for (let j = 1; j <= n; j++) pts.push({ p: [q0[0] + (p0[0] - q0[0]) * (j / n), q0[1] + (p0[1] - q0[1]) * (j / n)], s: len + run * (j / n) });
      len += run;
    } else pts.push({ p: p0, s: 0 });
    d += i === 0 ? `M ${f(p0[0])} ${f(p0[1])}` : ` L ${f(p0[0])} ${f(p0[1])}`;
    prev = p0;
    if (!g.r) return;
    let sweep = (((a1 - a0) * g.d) % TAU + TAU) % TAU;
    if (g.loop && sweep < Math.PI * 1.25) sweep += TAU;
    sweeps.push(g.loop ? 0 : sweep);
    const m = Math.ceil((g.r * sweep) / step);
    for (let j = 1; j <= m; j++) pts.push({ p: at(g, a0 + g.d * sweep * (j / m)), s: len + g.r * sweep * (j / m) });
    len += g.r * sweep;
    const n = Math.max(1, Math.ceil(sweep / (Math.PI * 0.9)));
    for (let j = 1; j <= n; j++) {
      const q = at(g, a0 + g.d * sweep * (j / n));
      d += ` A ${f(g.r)} ${f(g.r)} 0 0 ${g.d > 0 ? 1 : 0} ${f(q[0])} ${f(q[1])}`;
      prev = q;
    }
  });
  return { d, len, pts, sweeps, kinked };
}

/** One letter of the title, drawn on a canvas so the line can be tested against its real ink (not its box). */
type Glyph = { x0: number; y0: number; x1: number; y1: number; base: number; ink: (x: number, y: number) => boolean };

export function TrailRun({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const layers = useRef(new Set<Layer>());
  const geo = useRef<{ sDoc: number; eDoc: number; lens: [number, number, number]; over: [number, number][] } | null>(null);
  const redraw = useRef<() => void>(() => {});
  const store = useRef<Store>({
    add: (l) => { layers.current.add(l); redraw.current(); return () => { layers.current.delete(l); }; },
  });

  useLayoutEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const paint = () => {
      const g = geo.current;
      if (!g) return;
      let p = 1;
      if (!reduce.matches) {
        // Steady drawing, as in the original: the drawn share grows in a straight line with the scroll, from card 05's
        // corner at 80% down the screen to the dot at half way.
        const vh = window.innerHeight;
        const from = g.sDoc - vh * 0.8, to = g.eDoc - vh * 0.5;
        p = Math.min(1, Math.max(0, (window.scrollY - from) / (to - from)));
      }
      // Two strokes drawn one after the other: the pink-section part (it leaves past the right edge), a pause while the
      // line is "off screen", then the title part (it comes in from the left edge).
      const [la, gap, lb] = g.lens, s = p * (la + gap + lb);
      const parts = [Math.min(1, s / la), Math.min(1, Math.max(0, (s - la - gap) / lb))];
      // The copy above the letters shows only on its stretches, and only as far as the line has been drawn.
      const segs = g.over.map(([a, b]) => [a, Math.min(b, parts[1])]).filter(([a, b]) => b > a);
      let dash = "0 " + segs.map(([a, b], k) => `${a - (k ? segs[k - 1][1] : 0)} ${b - a}`).join(" ") + " 2";
      if (!segs.length) dash = "0 2";
      for (const l of layers.current) {
        if (l.over) {
          l.paths[0].style.opacity = "0";
          l.paths[1].style.strokeDasharray = dash;
          l.paths[1].style.strokeDashoffset = "0";
          l.paths[1].style.opacity = segs.length ? "1" : "0";
          continue;
        }
        l.paths.forEach((path, i) => {
          path.style.strokeDashoffset = String(1 - parts[i]);
          path.style.opacity = parts[i] < 0.002 ? "0" : "1";
        });
      }
    };

    const measure = () => {
      const startEl = root.querySelector<HTMLElement>("[data-trail-start]");
      const endEl = root.querySelector<HTMLElement>("[data-trail-end]");
      if (!startEl || !endEl) return;
      const W = root.clientWidth, H = root.offsetHeight;
      const o = docOffset(root);
      const sw = W < 768 ? 8 : 13;

      // Start: off the bottom-right corner of card 05, outside its pink offset shadow and rounded corner, at 45 degrees
      // in the card's own (tilted) frame.
      const c = docOffset(startEl);
      const cw = startEl.offsetWidth, ch = startEl.offsetHeight;
      const box = startEl.querySelector<HTMLElement>(":scope > div");
      const radius = box ? parseFloat(getComputedStyle(box).borderBottomRightRadius) || 0 : 0;
      const shadow = 8;
      const rot = (parseFloat(getComputedStyle(startEl).rotate) || 0) * (Math.PI / 180);
      const cos = Math.cos(rot), sin = Math.sin(rot);
      const turn = (x: number, y: number): Pt => [x * cos - y * sin, x * sin + y * cos];
      const k = radius + GAP_START + sw / 2;
      const local: Pt = [cw / 2 + shadow - radius + k * Math.SQRT1_2, ch / 2 + shadow - radius + k * Math.SQRT1_2];
      const [lx, ly] = turn(local[0], local[1]);
      const S: Pt = [c.x - o.x + cw / 2 + lx, c.y - o.y + ch / 2 + ly];
      const startDir = turn(Math.SQRT1_2, Math.SQRT1_2);

      // End: the centre of the dot glyph, measured from the font itself, then backed off up-right.
      const cs = getComputedStyle(endEl);
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const m = ctx.measureText(".");
      const e = docOffset(endEl);
      const base = e.y - o.y + m.fontBoundingBoxAscent + (endEl.offsetHeight - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2;
      const dotX = e.x - o.x + (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2;
      const dotY = base - (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
      const r = (m.actualBoundingBoxRight + m.actualBoundingBoxLeft) / 2;
      const ed: Pt = [Math.cos(END_ANGLE), -Math.sin(END_ANGLE)];
      const E: Pt = [dotX + ed[0] * (r + GAP_END + sw / 2), dotY + ed[1] * (r + GAP_END + sw / 2)];

      // The border between the two sections, and the sizes of the turns and loops.
      const first = root.firstElementChild as HTMLElement | null;
      const B = first ? first.offsetHeight : S[1] + 200;
      const phone = W < 768;
      const loopR = Math.min(72, Math.max(34, W * 0.045));
      const turnR = Math.min(150, Math.max(56, W * 0.085));
      const below = Math.max(80, B - S[1]);
      const down = Math.max(160, E[1] - B);

      // Start ring: the line leaves the card heading out of the corner and turns gently to the right.
      const s0: Ring = { r: 2, d: -1, c: [0, 0] };
      const sn = Math.atan2(startDir[1], startDir[0]) - (s0.d * Math.PI) / 2;
      s0.c = [S[0] - s0.r * Math.cos(sn), S[1] - s0.r * Math.sin(sn)];
      // End ring: the line comes down the right and curls in to the dot from 2 o'clock. As big as the room right of the
      // dot allows, so the last stretch is one slow curve closing in on the dot, not a straight run (Nick 13:10).
      const roomR = (W - Math.max(sw, W * 0.012) - sw / 2 - E[0]) / (1 - Math.cos(Math.PI / 2 - END_ANGLE));
      const e0: Ring = { r: phone ? turnR * 0.5 : Math.max(turnR * 0.5, Math.min(roomR * 0.85, turnR * 3.2)), d: 1, c: [0, 0] };
      const en = Math.atan2(-ed[1], -ed[0]) - (e0.d * Math.PI) / 2;
      e0.c = [E[0] - e0.r * Math.cos(en), E[1] - e0.r * Math.sin(en)];

      /* Part A, on the pink: out of the card's corner in one calm wave (down, up, down) and away past the right edge. No
         loop here (Nick 2026-10-21: a ring right after the start looks terrible). A wave is made of the same parts as
         everything else: arcs of true circles joined on shared tangents, so it never kinks or wobbles. */
      // The crest keeps clear of the dip on narrow screens, so the wave never folds back on itself.
      const R1 = Math.min(turnR, below * 0.45), R2 = Math.min(R1 * 1.6, (W - S[0]) * 0.3);
      const vx = S[0] + R1 * 1.3, cx = Math.max(S[0] + (W - S[0]) * 0.55, vx + (R1 + R2) * 1.2);
      const ringsA: Ring[] = [
        s0,
        ...(phone ? [] : [
          { c: [vx, S[1] + below * 0.72 - R1] as Pt, r: R1, d: -1 as const },
          { c: [cx, S[1] + below * 0.05 + R2] as Pt, r: R2, d: 1 as const },
        ]),
        { c: [Math.max(W * 1.05, cx + R2 * 2), S[1] + (phone ? -0.4 : 0.45) * below], r: 0, d: 1 },
      ];

      /* Part B, on the ivory (Nick 2026-10-21 12:26 and 13:10): in from the left edge, the written loop left of "rings a
         phone.", up behind "Your website", down through the belly of the "b" and along "rings a phone." through the
         bellies of the "p" and the "o", then up only to the height of the "h" in "phone." (never touching the "e"), out
         almost to the screen edge in one slow half circle, and gently into the dot from 2 o'clock. Never across the pink
         "Yours, or the other guy's."
         Depth (Nick 13:10): the line runs behind the black letters, but a second copy above them shows from the middle of
         the b's belly to the middle of the p's belly, and from the middle of the o's belly to the end, so the line seems
         to weave over and under the b, the p and the o. The places are found by testing the line against each letter's
         real ink, and the shortest route that meets every rule is kept. */
      const lines = Array.from(endEl.closest("h2")?.querySelectorAll<HTMLElement>(".ps-l") ?? []);
      const box2 = (i: number) => {
        const l = lines[i];
        const lo = l ? docOffset(l) : { x: o.x, y: o.y + B };
        return { x0: lo.x - o.x, x1: lo.x - o.x + (l?.offsetWidth ?? 0), y: lo.y - o.y, h: l?.offsetHeight ?? 100 };
      };
      const L1 = box2(0), L2 = box2(1), L3 = box2(2);
      const lh = L2.h;
      const entry: Ring = { c: [-0.05 * W, L1.y - 0.2 * lh], r: 0, d: 1 };
      const rA = Math.min(loopR * 1.3, L2.x0 / 2 - 24, lh * 0.42);
      const loopA = !phone && rA >= 30;
      // Clockwise, against the overall left turn, so the line crosses itself like a written loop (about 280 degrees).
      const ringA: Ring = { c: [L2.x0 * 0.5, L2.y + 0.5 * lh], r: rA, d: 1, loop: true };
      const edge = W - Math.max(sw, W * 0.012) - sw / 2; // the half circle reaches almost to the screen edge

      // Letters, each drawn on its own canvas at its place on the page.
      const glyph = (line: HTMLElement | undefined, i: number): Glyph | null => {
        const tn = line?.firstChild;
        if (!line || !tn || tn.nodeType !== 3 || i < 0) return null;
        const rg = document.createRange();
        rg.setStart(tn, i); rg.setEnd(tn, i + 1);
        const rr = rg.getBoundingClientRect(), lr = line.getBoundingClientRect(), lo = docOffset(line);
        const x0 = lo.x - o.x + (rr.left - lr.left), y0 = lo.y - o.y + (rr.top - lr.top);
        const w = Math.ceil(rr.width) + 8, h = Math.ceil(rr.height) + 8;
        const cv = document.createElement("canvas");
        cv.width = w; cv.height = h;
        const cx2 = cv.getContext("2d", { willReadFrequently: true });
        if (!cx2) return null;
        const lcs = getComputedStyle(line);
        cx2.font = `${lcs.fontStyle} ${lcs.fontWeight} ${lcs.fontSize} ${lcs.fontFamily}`;
        const fm = cx2.measureText(tn.textContent![i]);
        cx2.fillText(tn.textContent![i], 4, 4 + fm.fontBoundingBoxAscent);
        const px = cx2.getImageData(0, 0, w, h).data;
        const ink = (x: number, y: number) => {
          const u = Math.round(x - x0 + 4), v = Math.round(y - y0 + 4);
          return u >= 0 && v >= 0 && u < w && v < h && px[(v * w + u) * 4 + 3] > 110;
        };
        return { x0: x0 - 4, y0: y0 - 4, x1: x0 + w - 4, y1: y0 + h - 4, base: y0 + fm.fontBoundingBoxAscent, ink };
      };
      const t1 = lines[0]?.textContent ?? "", t2 = lines[1]?.textContent ?? "", ph = t2.indexOf("phone");
      const gb = glyph(lines[0], t1.lastIndexOf("b"));
      const [gp, gh, go, gn, ge, gd] = [0, 1, 2, 3, 4, 5].map((k) => glyph(lines[1], ph < 0 ? -1 : ph + k));
      const tail = lines[3] ? (lines[3].firstChild?.textContent ?? "") : "";
      const pinkEnd = [tail.length - 1, tail.length - 2].map((k) => glyph(lines[3], k));

      // Walk the line through one letter: stroke, belly, stroke. Returns the length at the middle of the belly.
      const pts0: { p: Pt; s: number }[] = [];
      const belly = (pts: typeof pts0, g: Glyph | null, after = 0) => {
        if (!g) return -1;
        let state = 0, gapA = -1;
        for (let i = 0; i < pts.length; i++) {
          const { p, s } = pts[i];
          if (s < after) continue;
          if (p[0] < g.x0 || p[0] > g.x1 || p[1] < g.y0 || p[1] > g.y1) { state = 0; continue; }
          const k = g.ink(p[0], p[1]);
          if (state === 0 && k) state = 1;
          else if (state === 1 && !k) { state = 2; gapA = s; }
          else if (state === 2 && k) {
            if (s - gapA > sw * 0.8) return (gapA + s) / 2;
            state = 1;
          }
        }
        return -1;
      };
      // Does the line's painted width touch a letter's ink anywhere?
      const rad = sw / 2 + 3;
      const ring8 = Array.from({ length: 8 }, (_, k) => [Math.cos((k * Math.PI) / 4) * rad, Math.sin((k * Math.PI) / 4) * rad]);
      const touches = (pts: typeof pts0, g: Glyph | null) => !!g && pts.some(({ p }) =>
        p[0] > g.x0 - rad && p[0] < g.x1 + rad && p[1] > g.y0 - rad && p[1] < g.y1 + rad &&
        (g.ink(p[0], p[1]) || ring8.some(([dx, dy]) => g.ink(p[0] + dx, p[1] + dy))));

      let Bp = beltPath([entry, { c: [W - lh, L1.y + lh], r: Math.min(lh * 0.6, W * 0.06), d: 1 }, e0], 0, en);
      let over: [number, number][] = [];
      if (!phone && gb && gp && gh && go && ge) {
        const fsz = parseFloat(getComputedStyle(lines[1]).fontSize);
        const topInk = (g: Glyph) => { for (let y = Math.floor(g.y0); y < g.base; y++) for (let x = g.x0; x < g.x1; x++) if (g.ink(x, y)) return y; return g.base; };
        const xh = go.base - topInk(go);
        // The middle of a belly: on the row half an x-height above the baseline, the gap between the first two strokes.
        const mid = (g: Glyph): Pt => {
          const y = g.base - xh / 2;
          let run = 0, a0 = -1;
          for (let x = g.x0; x < g.x1; x++) {
            const k = g.ink(x, y);
            if (run === 0 && k) run = 1; else if (run === 1 && !k) { run = 2; a0 = x; } else if (run === 2 && k) return [(a0 + x) / 2, y];
          }
          return [(g.x0 + g.x1) / 2, y];
        };
        const Pb = mid(gb), Pp = mid(gp);
        const hTop = topInk(gh);
        // The descent is one straight run through the middle of the b's belly and the middle of the p's belly. The crest
        // before it and the dip after it both sit on that run's line, so it meets them on their tangents.
        const ux0 = Pp[0] - Pb[0], uy0 = Pp[1] - Pb[1], ul = Math.hypot(ux0, uy0);
        const ux = ux0 / ul, uy = uy0 / ul;
        const Rw = Math.min(lh * 0.9, W * 0.08);
        const tc = Pb[0] - L1.x0 > Rw * 1.2 ? Math.min(lh * 0.6, (Pb[0] - L1.x0) * 0.4) : lh * 0.3;
        const crest: Ring = { c: [Pb[0] - ux * tc - Rw * uy, Pb[1] - uy * tc + Rw * ux], r: Rw, d: 1 };
        let best: { score: number; B: ReturnType<typeof beltPath>; over: [number, number][] } | null = null;
        if (ux > 0.2)
          for (const tk of [0, 0.05, 0.1, 0.2, 0.35])
            for (const rd of [0.3, 0.45, 0.6, 0.75, 0.9])
              for (const rk of Array.from({ length: 22 }, (_, k) => 0.5 + k * 0.1)) {
                const t = tk * fsz, r2 = rd * fsz, R = rk * fsz;
                const dip: Ring = { c: [Pp[0] + ux * t + r2 * uy, Pp[1] + uy * t - r2 * ux], r: r2, d: -1 };
                for (const spiral of [true, false]) {
                const Q: Ring = { c: [edge - R, hTop + R], r: R, d: 1 };
                // Spiral finish: the end curl sits inside the half circle and touches it, so the line goes over at the height
                // of the "h", round the half circle and straight on into the smaller curl, closer and closer to the dot,
                // with no straight run at all. Only possible when the dot lies inside the half circle.
                let end = e0;
                if (spiral) {
                  const ux2 = Math.cos(en), uy2 = Math.sin(en);
                  const gap = (r: number) => Math.hypot(Q.c[0] - (E[0] - r * ux2), Q.c[1] - (E[1] - r * uy2)) - (R - r);
                  if (gap(4) >= 0) continue;
                  let lo = 4, hi = R;
                  for (let it = 0; it < 40; it++) { const m = (lo + hi) / 2; if (gap(m) < 0) lo = m; else hi = m; }
                  const r = (lo + hi) / 2;
                  if (r < sw * 3) continue;
                  end = { c: [E[0] - r * ux2, E[1] - r * uy2], r, d: 1 };
                }
                const rings: Ring[] = [entry, ...(loopA ? [ringA] : []), crest, dip, Q, end];
                const cand = beltPath(rings, 0, en);
                const sB = belly(cand.pts, gb), sP = belly(cand.pts, gp, Math.max(0, sB)), sO = belly(cand.pts, go, Math.max(0, sP));
                let bad = 0;
                if (sB < 0) bad += 3; if (sP < 0) bad += 3; if (sO < 0) bad += 3;
                if (touches(cand.pts, ge) || touches(cand.pts, gd)) bad += 4;
                if (pinkEnd.some((g) => touches(cand.pts, g))) bad += 4;
                if (cand.pts.some(({ p }) => p[1] > L3.y - rad && p[1] < L3.y + L3.h && p[0] < L3.x1 + rad)) bad += 4;
                // No turn may wrap round on itself (only the written loop does that).
                if (cand.kinked || cand.sweeps.some((w) => w > Math.PI * 1.15)) bad += 5;
                // Out of the dip the line keeps heading right and up to the half circle, never hooking back.
                { const h = bridge(dip, Q); if (Math.cos(h) < 0.35 || Math.sin(h) > 0) bad += 5; }
                // Preferences, in order: every rule met, the spiral finish (no straight run), crossing the n, a shorter line.
                const score = bad * 1e5 + (spiral ? 0 : 3000) + (touches(cand.pts, gn) ? 0 : 800) + cand.len;
                if (!best || score < best.score) {
                  const ov: [number, number][] = [];
                  if (sB >= 0 && sP > sB) ov.push([sB / cand.len, sP / cand.len]);
                  if (sO >= 0) ov.push([sO / cand.len, 1]);
                  best = { score, B: cand, over: ov };
                }
                }
              }
        if (best) { Bp = best.B; over = best.over; }
      }

      const A = beltPath(ringsA, sn, 0);
      geo.current = { sDoc: o.y + S[1], eDoc: o.y + E[1], lens: [A.len, W * 0.6, Bp.len], over };

      for (const l of layers.current) {
        const top = docOffset(l.el).y - o.y;
        l.svg.setAttribute("width", String(W));
        l.svg.setAttribute("height", String(H));
        l.svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        l.svg.style.top = `${-top}px`;
        l.paths.forEach((path, i) => {
          path.setAttribute("d", i ? Bp.d : A.d);
          path.setAttribute("stroke-width", String(sw));
        });
      }
      paint();
    };

    redraw.current = measure;
    measure();
    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; paint(); }); };
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", measure);
    reduce.addEventListener("change", paint);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", measure);
      reduce.removeEventListener("change", paint);
    };
  }, []);

  return <Ctx.Provider value={store.current}><div ref={wrap}>{children}</div></Ctx.Provider>;
}

/** This section's copy of the line: above its background, below everything else, clipped at its edges. With `over`, the
 *  copy that shows above the title on the stretches where the line weaves in front of the letters. */
export function TrailLayer({ tone, over = false }: { tone: "white" | "pink"; over?: boolean }) {
  const store = useContext(Ctx);
  const el = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const pathA = useRef<SVGPathElement>(null);
  const pathB = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (!store || !el.current || !svg.current || !pathA.current || !pathB.current) return;
    return store.add({ el: el.current, svg: svg.current, paths: [pathA.current, pathB.current], over });
  }, [store, over]);
  return (
    <div ref={el} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${over ? "z-10" : "-z-10"}`}>
      <svg ref={svg} className="absolute left-0 overflow-visible" width="0" height="0">
        {[pathA, pathB].map((r, i) => (
          <path key={i} ref={r} fill="none" stroke={tone === "white" ? "#ffffff" : "#ff3d8b"} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: 1, opacity: 0 }} />
        ))}
      </svg>
    </div>
  );
}

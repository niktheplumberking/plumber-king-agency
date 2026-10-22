"use client";

import { createContext, useContext, useEffect, useId, useLayoutEffect, useRef, type ReactNode } from "react";

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
  const geo = useRef<{ sDoc: number; eDoc: number; lens: [number, number, number]; over: [number, number][]; cut: string } | null>(null);
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
      const [la, gap, lb] = g.lens;
      let s = la + lb;
      if (!reduce.matches) {
        // Steady drawing, as in the original: the line grows at one even speed with the scroll, the speed it had when it
        // ran from card 05's corner (80% down the screen) to the dot (half way) with a pause between its two parts.
        const vh = window.innerHeight;
        const from = g.sDoc - vh * 0.8, to = g.eDoc - vh * 0.5;
        s = Math.min(la + lb, Math.max(0, ((window.scrollY - from) * (la + gap + lb)) / (to - from)));
      }
      /* Two strokes drawn one after the other: the pink-section part (it leaves past the right edge), then the title part
         (it comes in from the left edge). Nick 2026-10-22: no scrolling without the line moving, so the title part starts
         the moment the first part is off screen; the pause is cut, so the line reaches the dot that much sooner. */
      const parts = [Math.min(1, s / la), Math.min(1, Math.max(0, (s - la) / lb))];
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
          // Its ends are square, so a switch next to a letter's edge reads as the line slipping under it; while the line
          // is still being drawn through a front stretch, a dot gives it the same round tip as the copy behind.
          const dot = l.svg.querySelector("circle");
          const live = parts[1] < 1 && g.over.some(([a, b]) => parts[1] > a && parts[1] < b);
          if (dot) {
            dot.style.opacity = live ? "1" : "0";
            if (live) { const q = l.paths[1].getPointAtLength(parts[1] * g.lens[2]); dot.setAttribute("cx", String(q.x)); dot.setAttribute("cy", String(q.y)); }
          }
          continue;
        }
        l.paths.forEach((path, i) => {
          path.style.strokeDashoffset = String(1 - parts[i]);
          path.style.opacity = parts[i] < 0.002 ? "0" : "1";
        });
      }
    };

    const route: { key: string; Bp: ReturnType<typeof beltPath> | null; over: [number, number][]; cut: string } = { key: "", Bp: null, over: [], cut: "" };
    type Found = { Bp: ReturnType<typeof beltPath>; over: [number, number][]; cut: string };
    let job: { key: string; it: Generator<void, Found> } | null = null;
    let slice = 0, alive = true;
    // Runs the route search a slice at a time; when it is done the answer is cached and the line measured again.
    const pump = () => {
      if (slice) return;
      slice = window.setTimeout(() => {
        slice = 0;
        if (!alive || !job) return;
        const r = job.it.next();
        if (!r.done) { pump(); return; }
        route.key = job.key; route.Bp = r.value.Bp; route.over = r.value.over; route.cut = r.value.cut;
        job = null;
        redraw.current?.();
      }, 16);
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
      const e0: Ring = { r: Math.max(turnR * 0.5, Math.min(roomR * 0.85, turnR * 3.2)), d: 1, c: [0, 0] };
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
        { c: [vx, S[1] + below * 0.72 - R1] as Pt, r: R1, d: -1 as const },
        { c: [cx, S[1] + below * 0.05 + R2] as Pt, r: R2, d: 1 as const },
        { c: [Math.max(W * 1.05, cx + R2 * 2), S[1] + 0.45 * below], r: 0, d: 1 },
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
      const yo = t1.indexOf("our"), [gYo, gYu, gYr] = [0, 1, 2].map((k) => glyph(lines[0], yo < 0 ? -1 : yo + k));
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
      /* The route search below is the slowest thing on the page (QA 2026-10-21: it froze a fresh load for seconds on a
         laptop), so it runs only when the layout it depends on has changed, and its last answer is reused otherwise. */
      const key = [W, H, S, E, L1, L2, L3, box2(3), lines.map((l) => getComputedStyle(l).fontSize), document.fonts?.status]
        .flat(2).map((v) => (typeof v === "number" ? Math.round(v * 2) / 2 : String(v))).join();
      let cut = "", waiting = false;
      const route0 = Bp;
      let eY = E[1], phoneA: ReturnType<typeof beltPath> | null = null;
      if (phone && gb && gp && go) {
        /* Phones (Nick 2026-10-22, second recording): one simple line. From the card's corner it bends straight down
           towards the b of "website", turns pink where it crosses onto the light section, runs down through the b and
           the p, turns inside the p and goes straight right through "one." and off the screen. No line from the left,
           no end at the dot. Over the letters from the middle of the b's belly to the middle of the p's, and again from
           the middle of the o's. */
        const topInk = (g: Glyph) => { for (let y = Math.floor(g.y0); y < g.base; y++) for (let x = g.x0; x < g.x1; x++) if (g.ink(x, y)) return y; return g.base; };
        const xh = go.base - topInk(go);
        const mid = (g: Glyph): Pt => {
          const y = g.base - xh / 2;
          let run = 0, a0 = -1;
          for (let x = g.x0; x < g.x1; x++) {
            const k = g.ink(x, y);
            if (run === 0 && k) run = 1; else if (run === 1 && !k) { run = 2; a0 = x; } else if (run === 2 && k) return [(a0 + x) / 2, y];
          }
          return [(g.x0 + g.x1) / 2, y];
        };
        const Pb = mid(gb), Pp = mid(gp), yO = mid(go)[1];
        const ul = Math.hypot(Pp[0] - Pb[0], Pp[1] - Pb[1]), u: Pt = [(Pp[0] - Pb[0]) / ul, (Pp[1] - Pb[1]) / ul];
        // The bend off the card: a circle touching the start direction and the b-p line (a fillet at their crossing).
        const [sx, sy] = startDir;
        const den = sx * u[1] - sy * u[0];
        const tX = ((Pb[0] - S[0]) * u[1] - (Pb[1] - S[1]) * u[0]) / den; // distance along the start direction to the crossing
        const X: Pt = [S[0] + sx * tX, S[1] + sy * tX];
        const turn = Math.acos(Math.max(-1, Math.min(1, sx * u[0] + sy * u[1])));
        const r1 = Math.max(8, Math.min(turnR, (tX - 4) / Math.max(0.05, Math.tan(turn / 2))));
        const t1 = r1 * Math.tan(turn / 2);
        const P1: Pt = [X[0] - sx * t1, X[1] - sy * t1];
        const bend: Ring = { c: [P1[0] - r1 * sy, P1[1] + r1 * sx], r: r1, d: 1 };
        // The turn inside the p: anticlockwise, its bottom on the o's middle row, leaving heading right.
        const r2 = Math.max(4, xh * 0.25);
        const tq = (yO - r2 + r2 * u[0] - Pb[1]) / u[1];
        const Pq: Pt = [Pb[0] + u[0] * tq, Pb[1] + u[1] * tq];
        const dip: Ring = { c: [Pq[0] + r2 * u[1], Pq[1] - r2 * u[0]], r: r2, d: -1 };
        const out: Ring = { c: [W + sw * 4, yO], r: 0, d: 1 };
        // Where the b-p line crosses onto the light section, the white line hands over to the pink one.
        const tB = (B - Pb[1]) / u[1];
        const T: Ring = { c: [Pb[0] + u[0] * tB, B], r: 0, d: 1 };
        phoneA = beltPath([s0, bend, T], sn, 0);
        Bp = beltPath([T, dip, out], 0, 0);
        const sB = belly(Bp.pts, gb), sP = belly(Bp.pts, gp, Math.max(0, sB)), sO = belly(Bp.pts, go, Math.max(0, sP));
        over = [];
        if (sB >= 0 && sP > sB) over.push([sB / Bp.len, sP / Bp.len]);
        if (sO >= 0) over.push([sO / Bp.len, 1]);
        eY = yO;
      }
      else if (key === route.key && route.Bp) { Bp = route.Bp; over = route.over; cut = route.cut; }
      else if (gb && gp && gh && go && ge) {
        /* The search runs in short slices between frames (Nick 2026-10-22: a phone froze while it ran in one go); until it
           finishes, the simple route above stands in. The section is far below the first screen, so it is done long before
           anyone scrolls there. */
        waiting = true;
        if (job?.key !== key) {
          const gB = gb, gP = gp, gH = gh, gO = go, gE = ge;
          function* search(): Generator<void, { Bp: ReturnType<typeof beltPath>; over: [number, number][]; cut: string }> {
            const [gb, gp, gh, go, ge] = [gB, gP, gH, gO, gE];
            let Bp = route0, over: [number, number][] = [], cut = "", t0 = performance.now();
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
          let best = null as { score: number; B: ReturnType<typeof beltPath>; over: [number, number][] } | null;
          // Coarse pass over the half-circle size (every 0.2 em), then a fine pass (0.1 em) next to the best one found.
          let bestRk = -1;
          const tries = (pass: number) => pass === 0 ? Array.from({ length: 11 }, (_, k) => 0.5 + k * 0.2) : [bestRk - 0.1, bestRk + 0.1].filter((v) => v >= 0.5 && v <= 2.65);
          if (ux > 0.2)
            for (let pass = 0; pass < 2; pass++)
            for (const tk of [0, 0.05, 0.1, 0.2, 0.35])
              for (const rd of [0.3, 0.45, 0.6, 0.75, 0.9])
                for (const rk of tries(pass)) {
                  const t = tk * fsz, r2 = rd * fsz, R = rk * fsz;
                  const dip: Ring = { c: [Pp[0] + ux * t + r2 * uy, Pp[1] + uy * t - r2 * ux], r: r2, d: -1 };
                  const Q: Ring = { c: [edge - R, hTop + R], r: R, d: 1 };
                  // Once a route meets every rule, routes that hook back out of the dip can never win: skip them unbuilt.
                  { const h = bridge(dip, Q); if (best && best.score < 1e5 && (Math.cos(h) < 0.35 || Math.sin(h) > 0)) continue; }
                  for (const spiral of [true, false]) {
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
                  if (performance.now() - t0 > 8) { yield; t0 = performance.now(); }
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
                    if (pass === 0) bestRk = rk;
                  }
                  }
                }
          if (best) {
            Bp = best.B; over = best.over;
            /* Nick 14:01: on the way up from the loop the line stays behind the "o" of "Your" and goes in front of the "u"'s second stroke
               and the "r", switching where it crosses clear background (between the o and the u, and just after the r). */
            const pts = Bp.pts;
            const inkAt = (g: Glyph | null, p: Pt) => !!g && p[0] > g.x0 && p[0] < g.x1 && p[1] > g.y0 && p[1] < g.y1 && g.ink(p[0], p[1]);
            const lastInk = (g: Glyph | null, from = 0) => { let k = -1; for (let i = from; i < pts.length && pts[i].s < (over[0]?.[0] ?? 1) * Bp.len; i++) if (inkAt(g, pts[i].p)) k = i; return k; };
            const firstInk = (g: Glyph | null, from = 0) => { for (let i = from; i < pts.length; i++) if (inkAt(g, pts[i].p)) return i; return -1; };
            const oEnd = lastInk(gYo), uStart = firstInk(gYu, Math.max(0, oEnd));
            // The line can clip the r's top with its edge only, so the r counts wherever the painted width touches it.
            let rEnd = lastInk(gYr);
            if (rEnd < 0 && gYr) for (let i = 0; i < pts.length && pts[i].s < (over[0]?.[0] ?? 1) * Bp.len; i++) {
              const p = pts[i].p;
              if (inkAt(gYr, p) || ring8.some(([dx, dy]) => inkAt(gYr, [p[0] + dx, p[1] + dy]))) rEnd = i;
            }
            /* Nick 14:59: behind the "u"'s first stroke too; in front only from its second (right) stroke. Its left edge is
               the start of the last ink run across the middle of the u's x-height. */
            let stem2 = Infinity;
            if (gYu) {
              const yRow = gYu.base - (gYo ? gYo.base - topInk(gYo) : 0) * 0.55;
              let prev = false;
              for (let x = gYu.x0; x < gYu.x1; x += 0.5) { const on = gYu.ink(x, yRow); if (on && !prev) stem2 = x; prev = on; }
            }
            let uFront = -1;
            if (uStart > 0 && Number.isFinite(stem2)) for (let i = uStart; i < pts.length; i++) if (pts[i].p[0] >= stem2) { uFront = i; break; }
            if (uFront > 0 && rEnd > uFront && gYu) {
              /* Nick 18:01: where the u's bowl joins its second stroke there is no clear background to switch in, and a square
                 end across the line read as a break. So the copy in front starts back at the u's left edge and is cut away
                 up to the second stroke along a straight upright edge, the stroke's own edge: the line slips out from under
                 the bowl exactly where the stroke begins. */
              const a = pts[uStart].s;
              cut = `M${gYu.x0 - sw} ${L1.y - sw}H${stem2}V${L1.y + L1.h + sw}H${gYu.x0 - sw}Z`;
              const b = pts[Math.min(pts.length - 1, rEnd + Math.ceil(sw / 3))].s;
              if (b / Bp.len < (over[0]?.[0] ?? 1)) over = [[a / Bp.len, b / Bp.len], ...over];
            }
          }
            return { Bp, over, cut };
          }
          job = { key, it: search() };
          pump();
        }
      }
      if (!waiting) { route.key = key; route.Bp = Bp; route.over = over; route.cut = cut; }

      const A = phoneA ?? beltPath(ringsA, sn, 0);
      geo.current = { sDoc: o.y + S[1], eDoc: o.y + eY, lens: [A.len, W * 0.6, Bp.len], over, cut };

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
        l.svg.querySelector("circle")?.setAttribute("r", String(sw / 2));
        // Everything outside the cut-away boxes (one big box with the cut boxes as holes).
        l.svg.querySelector("clipPath path")?.setAttribute("d", `M-99999 -99999H99999V99999H-99999Z${cut}`);
      }
      paint();
    };

    // Measuring waits for an idle moment, so it never holds up the page's first animations; calls close together run once.
    let pending = 0;
    const idle = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const schedule = () => {
      if (pending) return;
      const run = () => { pending = 0; measure(); };
      pending = idle.requestIdleCallback ? idle.requestIdleCallback(run, { timeout: 700 }) : window.setTimeout(run, 60);
    };
    redraw.current = schedule;
    schedule();
    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; paint(); }); };
    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", schedule);
    reduce.addEventListener("change", paint);
    document.fonts?.ready.then(schedule);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", schedule);
      if (pending) { if (idle.cancelIdleCallback) idle.cancelIdleCallback(pending); else clearTimeout(pending); }
      alive = false; clearTimeout(slice);
      reduce.removeEventListener("change", paint);
    };
  }, []);

  return <Ctx.Provider value={store.current}><div ref={wrap}>{children}</div></Ctx.Provider>;
}

/** This section's copy of the line: above its background, below everything else, clipped at its edges. With `over`, the
 *  copy that shows above the title on the stretches where the line weaves in front of the letters. */
export function TrailLayer({ tone, over = false }: { tone: "white" | "pink"; over?: boolean }) {
  const store = useContext(Ctx);
  const clip = useId().replace(/:/g, "");
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
        {over && <defs><clipPath id={clip} clipPathUnits="userSpaceOnUse"><path clipRule="evenodd" d="M-99999 -99999H99999V99999H-99999Z" /></clipPath></defs>}
        {[pathA, pathB].map((r, i) => (
          <path key={i} ref={r} fill="none" stroke={tone === "white" ? "#ffffff" : "#ff3d8b"} strokeLinecap={over ? "butt" : "round"} strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" clipPath={over ? `url(#${clip})` : undefined} style={{ strokeDashoffset: 1, opacity: 0 }} />
        ))}
        {over && <circle r={0} fill="#ff3d8b" clipPath={`url(#${clip})`} style={{ opacity: 0 }} />}
      </svg>
    </div>
  );
}

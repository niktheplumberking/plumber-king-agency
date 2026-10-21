"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

/*
 * Scroll-drawn line (after Skiper19 "svg follow scroll", Nick 2026-10-21). One playful path is drawn in step with the
 * scroll and undrawn when scrolling back up. It starts a few px off card 05's bottom-right corner in "From invisible to
 * booked", loops on the pink, swings off screen, crosses into "Your website rings a phone." and ends 12 px short of the
 * dot after "guy's", arriving from about 2 o'clock.
 *
 * Layering (Nick: "1. background 2. the line 3. everything after"): each section is `isolate` and holds its own copy of
 * the path in a `-z-10` layer, so the line paints just above that section's background and below all its content. Each
 * layer clips at its section's edges, so the white copy shows only on the pink section and the pink copy only on the
 * ivory one: the colour changes exactly at the border. No `motion` package: plain scroll events and a dash offset.
 */

type Layer = { el: HTMLDivElement; svg: SVGSVGElement; path: SVGPathElement };
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

/** Smooth path through the points: tangents from the neighbours, handle lengths from each segment (keeps loops round). */
function smooth(pts: Pt[], t0: Pt, t1: Pt) {
  const n = pts.length;
  const dir = (i: number): Pt => {
    if (i === 0) return t0;
    if (i === n - 1) return t1;
    const dx = pts[i + 1][0] - pts[i - 1][0], dy = pts[i + 1][1] - pts[i - 1][1];
    const l = Math.hypot(dx, dy) || 1;
    return [dx / l, dy / l];
  };
  const segs: [Pt, Pt, Pt, Pt][] = [];
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i], b = pts[i + 1], da = dir(i), db = dir(i + 1);
    const h = (Math.hypot(b[0] - a[0], b[1] - a[1]) / 3) * 1.17;
    segs.push([a, [a[0] + da[0] * h, a[1] + da[1] * h], [b[0] - db[0] * h, b[1] - db[1] * h], b]);
  }
  return segs;
}

/** A loop the line runs once around. `right`: entered at the bottom heading right; otherwise entered at the top heading left. */
const loop = (cx: number, cy: number, r: number, right: boolean): Pt[] =>
  right ? [[cx, cy + r], [cx + r, cy], [cx, cy - r], [cx - r, cy]] : [[cx, cy - r], [cx - r, cy], [cx, cy + r], [cx + r, cy]];

export function TrailRun({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const layers = useRef(new Set<Layer>());
  const geo = useRef<{ table: { s: number; u: number }[]; L: number; sDoc: number; eDoc: number } | null>(null);
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
        const vh = window.innerHeight;
        const q = Math.min(1, Math.max(0, (window.scrollY + vh * 0.6 - g.sDoc) / (g.eDoc - g.sDoc)));
        // Find the drawn length whose blended progress equals q (the table is increasing).
        const t = g.table;
        let lo = 0, hi = t.length - 1;
        while (hi - lo > 1) { const m = (lo + hi) >> 1; if (t[m].u < q) lo = m; else hi = m; }
        const a = t[lo], b = t[hi];
        const s = b.u === a.u ? a.s : a.s + ((q - a.u) / (b.u - a.u)) * (b.s - a.s);
        p = Math.min(1, Math.max(0, s / g.L));
      }
      for (const l of layers.current) {
        l.path.style.strokeDashoffset = String(1 - p);
        l.path.style.opacity = p < 0.002 ? "0" : "1";
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

      // The border between the two sections.
      const first = root.firstElementChild as HTMLElement | null;
      const B = first ? first.offsetHeight : S[1] + 200;
      const lr = Math.min(80, Math.max(34, W * 0.05));
      const below = Math.max(60, B - S[1]);
      const down = Math.max(120, E[1] - B);

      const pts: Pt[] = [
        S,
        // Loop 1, on the pink just right of card 05 (on phones it tucks back under the card).
        ...loop(Math.min(S[0] + 3 * lr, W - 1.3 * lr), S[1] + (W < 768 ? 0.45 * below : Math.min(0.2 * below, 40)), lr, true),
        [W + 0.06 * W, B - 0.15 * below], // out past the right edge
        [0.72 * W, B + 0.25 * down], // back in across the border
        // Loop 2, behind the big title (left out on phones, where the title is too small to carry it).
        ...(W < 768 ? [] : loop(0.42 * W, B + 0.47 * down, lr * 1.3, false)),
        [-0.05 * W, B + 0.78 * down], // out past the left edge
        [0.55 * W, E[1] - 0.62 * down], // up across the title
        [Math.min(E[0] + 0.03 * W, W - sw), E[1] - Math.max(70, 0.09 * W)], // above the dot, then a small hook in from 2 o'clock
        E,
      ];
      const segs = smooth(pts, startDir, [-ed[0], -ed[1]]);
      const f = (n: number) => n.toFixed(1);
      const d = "M " + f(S[0]) + " " + f(S[1]) + segs.map(([, a, b, z]) => ` C ${f(a[0])} ${f(a[1])}, ${f(b[0])} ${f(b[1])}, ${f(z[0])} ${f(z[1])}`).join("");

      // Length table, and the blended progress u = half drawn length, half deepest point reached so far.
      const table: { s: number; y: number }[] = [{ s: 0, y: S[1] }];
      let s = 0, prev = S, maxY = S[1];
      for (const [a, b1, b2, z] of segs) {
        for (let i = 1; i <= 40; i++) {
          const t = i / 40, mt = 1 - t;
          const x = mt * mt * mt * a[0] + 3 * mt * mt * t * b1[0] + 3 * mt * t * t * b2[0] + t * t * t * z[0];
          const y = mt * mt * mt * a[1] + 3 * mt * mt * t * b1[1] + 3 * mt * t * t * b2[1] + t * t * t * z[1];
          s += Math.hypot(x - prev[0], y - prev[1]);
          prev = [x, y];
          maxY = Math.max(maxY, y);
          table.push({ s, y: maxY });
        }
      }
      const L = s, span = Math.max(1, E[1] - S[1]);
      geo.current = {
        L,
        table: table.map((r2) => ({ s: r2.s, u: 0.5 * (r2.s / L) + 0.5 * Math.min(1, Math.max(0, (r2.y - S[1]) / span)) })),
        sDoc: o.y + S[1],
        eDoc: o.y + E[1],
      };

      for (const l of layers.current) {
        const top = docOffset(l.el).y - o.y;
        l.svg.setAttribute("width", String(W));
        l.svg.setAttribute("height", String(H));
        l.svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        l.svg.style.top = `${-top}px`;
        l.path.setAttribute("d", d);
        l.path.setAttribute("stroke-width", String(sw));
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

/** This section's copy of the line: above its background, below everything else, clipped at its edges. */
export function TrailLayer({ tone }: { tone: "white" | "pink" }) {
  const store = useContext(Ctx);
  const el = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (!store || !el.current || !svg.current || !path.current) return;
    return store.add({ el: el.current, svg: svg.current, path: path.current });
  }, [store]);
  return (
    <div ref={el} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg ref={svg} className="absolute left-0 overflow-visible" width="0" height="0">
        <path ref={path} fill="none" stroke={tone === "white" ? "#ffffff" : "#ff3d8b"} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: 1, opacity: 0 }} />
      </svg>
    </div>
  );
}

"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

/*
 * Scroll-drawn line (after Skiper19 "svg follow scroll", Nick 2026-10-21). One playful path is drawn in step with the
 * scroll and undrawn when scrolling back up. It starts a few px off card 05's bottom-right corner in "From invisible to
 * booked", loops on the pink, swings off screen, crosses into "Your website rings a phone." and ends 12 px short of the
 * dot after "guy's", arriving from about 2 o'clock.
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
    if ((q[0] - p[0]) * Math.cos(h) + (q[1] - p[1]) * Math.sin(h) > 0) return h;
  }
  return psi;
}

/** The SVG path: start ring (through S), rings in between, end ring (through E), joined by straight tangent runs. */
function beltPath(rings: Ring[], startAngle: number, endAngle: number) {
  const f = (n: number) => n.toFixed(1);
  const heads: number[] = [];
  for (let i = 0; i < rings.length - 1; i++) heads.push(bridge(rings[i], rings[i + 1]));
  let d = "";
  rings.forEach((g, i) => {
    const a0 = i === 0 ? startAngle : touch(g, heads[i - 1]);
    const a1 = i === rings.length - 1 ? endAngle : touch(g, heads[i]);
    let sweep = (((a1 - a0) * g.d) % TAU + TAU) % TAU;
    if (g.loop && sweep < Math.PI * 1.25) sweep += TAU;
    const p0 = at(g, a0);
    d += i === 0 ? `M ${f(p0[0])} ${f(p0[1])}` : ` L ${f(p0[0])} ${f(p0[1])}`;
    const n = Math.max(1, Math.ceil(sweep / (Math.PI * 0.9)));
    for (let j = 1; j <= n; j++) {
      const p = at(g, a0 + g.d * sweep * (j / n));
      d += ` A ${f(g.r)} ${f(g.r)} 0 0 ${g.d > 0 ? 1 : 0} ${f(p[0])} ${f(p[1])}`;
    }
  });
  return d;
}

export function TrailRun({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const layers = useRef(new Set<Layer>());
  const geo = useRef<{ sDoc: number; eDoc: number } | null>(null);
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

      // The border between the two sections, and the sizes of the turns and loops.
      const first = root.firstElementChild as HTMLElement | null;
      const B = first ? first.offsetHeight : S[1] + 200;
      const phone = W < 768;
      const loopR = Math.min(72, Math.max(34, W * 0.045));
      const turnR = Math.min(150, Math.max(56, W * 0.085));
      const below = Math.max(80, B - S[1]);
      const down = Math.max(160, E[1] - B);

      // Start ring: the line leaves the card heading out of the corner and turns gently to the right.
      const s0: Ring = { r: turnR * 0.8, d: -1, c: [0, 0] };
      const sn = Math.atan2(startDir[1], startDir[0]) - (s0.d * Math.PI) / 2;
      s0.c = [S[0] - s0.r * Math.cos(sn), S[1] - s0.r * Math.sin(sn)];
      // End ring: the line comes over the top and curls in to the dot from 2 o'clock.
      const e0: Ring = { r: turnR * 0.5, d: 1, c: [0, 0] };
      const en = Math.atan2(-ed[1], -ed[0]) - (e0.d * Math.PI) / 2;
      e0.c = [E[0] - e0.r * Math.cos(en), E[1] - e0.r * Math.sin(en)];

      // Empty corners of the title: right of line 1 and right of line 3 (both lines are left-aligned).
      const lines = Array.from(endEl.closest("h2")?.querySelectorAll<HTMLElement>(".ps-l") ?? []);
      const titleLoops: Ring[] = [];
      for (const i of [0, 2]) {
        const l = lines[i];
        if (!l) continue;
        const lo = docOffset(l);
        const lh = l.offsetHeight, room = W - (lo.x - o.x + l.offsetWidth);
        const r = Math.min(loopR * 1.3, room / 2 - 24, lh * 0.42);
        if (r < 30) continue;
        titleLoops.push({ c: [W - room / 2, lo.y - o.y + lh * (i ? 0.45 : 0.55)], r, d: 1, loop: true });
      }

      const rings: Ring[] = [
        s0,
        // Loop 1, on the pink to the right of card 05 (phones have no room beside the card, so no loop there).
        ...(phone ? [] : [{ c: [Math.min(S[0] + 3.8 * loopR, W - 1.4 * loopR), S[1] + 0.1 * below] as Pt, r: loopR, d: -1 as const, loop: true }]),
        // Wide turn past the right edge: the line leaves the pink and comes back on the ivory heading left.
        { c: [W + 0.03 * W, B - 0.2 * below], r: turnR * 1.1, d: 1 },
        // Then it stays in the empty corners of the zig-zag title: a loop right of "Your website", a steep drop past
        // "phone.", a loop right of "Yours, or the", and the curl into the dot. It crosses words only steeply.
        ...titleLoops,
        e0,
      ];
      const d = beltPath(rings, sn, en);
      geo.current = { sDoc: o.y + S[1], eDoc: o.y + E[1] };

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

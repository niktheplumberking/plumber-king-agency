"use client";

import { useLayoutEffect, useRef, useState, type ComponentType } from "react";

/*
 * How It Works: tilted cards pinned to a board in a zigzag, joined by a dashed line (21st.dev component Nick sent
 * 2026-10-21). Kept from the original: the zigzag, the card heights (top 0 / 120 / 450 / 570 / 850 px), the tilt
 * (left-hand cards lean right, right-hand cards lean left), the hover lift and the flowing dashed line. Changed for
 * Plumber King: no notebook lines or side fades (Nick: "deleted"), the card inside is our own (big number, pink story
 * word, plumbing icon, Urbanist + Open Sans, charcoal border with a pink offset shadow, a pink peg instead of the pin),
 * the horizontal places of cards 02-05 are moved off the straight columns (Nick: "freedom of placement"), and the
 * dashed line is measured from the real card positions so it still joins them after that move. The line's flow
 * stops for reduced motion and the page's Pause motion button. No `motion` package: the line flow is plain CSS.
 * Under 1024 px the cards stack in a small zigzag, slightly tilted, without the dashed line.
 */

export type HowStep = { word: string; title: string; body: string; icon: ComponentType<{ className?: string }> };
/** Desktop place of each card: `top` in px; `k` = the card centre's distance from the board centre, as a share of the room
 *  each side (-1 = far left, 1 = far right); `tilt` in degrees. */
export type HowPlace = { top: number; k: number; tilt: number };

export function HowItWorks({ steps, places, height, className, lastCardAttr }: { steps: HowStep[]; places: HowPlace[]; height: number; className?: string; lastCardAttr?: string }) {
  const board = useRef<HTMLDivElement>(null);
  const [d, setD] = useState("");

  /* The dashed line joins the cards in order, 01 to 05. Each piece leaves the middle of a card's side square to that side
     (measured on the tilted card, just past its edge and pink shadow) and arrives the same way at the next card, so every
     piece is one calm S-curve with no kinks. */
  useLayoutEffect(() => {
    const el = board.current;
    if (!el) return;
    const draw = () => {
      if (window.innerWidth < 1024) return setD("");
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-how-card]"));
      // A point just outside the tilted card at local (lx, ly) from its centre, and the outward direction there.
      const edge = (c: HTMLElement, lx: number, ly: number, nx: number, ny: number) => {
        const a = (parseFloat(getComputedStyle(c).rotate) || 0) * (Math.PI / 180);
        const cos = Math.cos(a), sin = Math.sin(a);
        const x = c.offsetLeft + c.offsetWidth / 2 + lx * cos - ly * sin, y = c.offsetTop + c.offsetHeight / 2 + lx * sin + ly * cos;
        return { x, y, n: [nx * cos - ny * sin, nx * sin + ny * cos] as [number, number] };
      };
      const side = (c: HTMLElement, right: boolean) => edge(c, (right ? 1 : -1) * (c.offsetWidth / 2 + (right ? 18 : 10)), -0.05 * c.offsetHeight, right ? 1 : -1, 0);
      const f = (v: number) => v.toFixed(1);
      let path = "";
      for (let i = 0; i < cards.length - 1; i++) {
        const a = cards[i], b = cards[i + 1];
        const right = b.offsetLeft > a.offsetLeft;
        let p = side(a, right);
        const q = side(b, !right);
        let kp = Math.max(40, (q.x - p.x) * (right ? 1 : -1) * 0.5), kq = kp;
        // Cards whose facing sides nearly meet: leave the bottom of the first (on the side of the next card) and come into
        // the next card's facing side, one smooth quarter-turn, so no piece doubles back.
        if ((q.x - p.x) * (right ? 1 : -1) < 40) {
          p = edge(a, (right ? 1 : -1) * 0.3 * a.offsetWidth, a.offsetHeight / 2 + 18, 0, 1);
          kp = Math.max(50, Math.abs(q.y - p.y) * 0.6);
          kq = Math.max(50, Math.abs(q.x - p.x) * 0.6);
        }
        path += `M ${f(p.x)} ${f(p.y)} C ${f(p.x + p.n[0] * kp)} ${f(p.y + p.n[1] * kp)}, ${f(q.x + q.n[0] * kq)} ${f(q.y + q.n[1] * kq)}, ${f(q.x)} ${f(q.y)} `;
      }
      setD(path.trim());
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    document.fonts?.ready.then(draw);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={board} className={`relative mx-auto flex w-full max-w-[1588px] flex-col gap-12 lg:block lg:h-[var(--how-h)] ${className ?? ""}`} style={{ "--how-h": `${height}px` } as React.CSSProperties}>
      {d ? (
        <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
          <path d={d} className="how-dash" fill="none" stroke="var(--color-ribbon)" strokeOpacity="0.6" strokeWidth="2.5" strokeDasharray="10 8" strokeLinecap="round" />
        </svg>
      ) : null}
      {steps.map((s, i) => {
        const p = places[i % places.length];
        const Icon = s.icon;
        return (
          <article
            key={s.word}
            data-how-card=""
            {...(i === steps.length - 1 && lastCardAttr ? { [lastCardAttr]: "" } : {})}
            className={`how-card relative z-10 w-[86%] max-w-[24rem] lg:absolute lg:mx-0 lg:w-[300px] lg:max-w-none ${i % 2 ? "ml-auto" : ""}`}
            style={{ "--tilt": `${p.tilt}deg`, "--top": `${p.top}px`, "--k": p.k } as React.CSSProperties}
          >
            <span aria-hidden className="how-peg" />
            <div className="rounded-[1.5rem] border-2 border-ink bg-white p-6 shadow-[8px_8px_0_var(--color-ribbon)]">
              <div className="flex items-start justify-between gap-4">
                <span aria-hidden className="display text-t1 leading-[0.85] text-ink">{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ribbon text-white"><Icon className="h-6 w-6" /></span>
              </div>
              <h3 className="display mt-5 text-t2 text-ink"><span className="text-ribbon">{s.word}.</span> {s.title}</h3>
              <p className="mt-2 text-t3 text-slate">{s.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

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
/** Desktop place of each card: `top` in px, and `left` or `right` as a share of the 1000 px board; `tilt` in degrees. */
export type HowPlace = { top: number; left?: string; right?: string; tilt: number };

export function HowItWorks({ steps, places, height, className, lastCardAttr }: { steps: HowStep[]; places: HowPlace[]; height: number; className?: string; lastCardAttr?: string }) {
  const board = useRef<HTMLDivElement>(null);
  const [d, setD] = useState("");

  // The dashed line runs from each card's side to the next card's facing side, at 45% of the card's height.
  useLayoutEffect(() => {
    const el = board.current;
    if (!el) return;
    const draw = () => {
      if (window.innerWidth < 1024) return setD("");
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-how-card]"));
      let path = "";
      for (let i = 0; i < cards.length - 1; i++) {
        const a = cards[i], b = cards[i + 1];
        const aMid = a.offsetLeft + a.offsetWidth / 2, bMid = b.offsetLeft + b.offsetWidth / 2;
        const right = bMid > aMid;
        const x1 = right ? a.offsetLeft + a.offsetWidth : a.offsetLeft, y1 = a.offsetTop + a.offsetHeight * 0.45;
        const x2 = right ? b.offsetLeft : b.offsetLeft + b.offsetWidth, y2 = b.offsetTop + b.offsetHeight * 0.45;
        const k = (x2 - x1) * 0.6;
        path += (i ? " " : "M " + x1.toFixed(0) + " " + y1.toFixed(0)) + (i ? " L " + x1.toFixed(0) + " " + y1.toFixed(0) : "") +
          " C " + (x1 + k).toFixed(0) + " " + y1.toFixed(0) + ", " + (x2 - k).toFixed(0) + " " + y2.toFixed(0) + ", " + x2.toFixed(0) + " " + y2.toFixed(0);
      }
      setD(path);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    document.fonts?.ready.then(draw);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={board} className={`relative mx-auto flex w-full max-w-[1000px] flex-col gap-12 lg:block lg:h-[var(--how-h)] ${className ?? ""}`} style={{ "--how-h": `${height}px` } as React.CSSProperties}>
      {d ? (
        <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
          <path d={d} className="how-dash" fill="none" stroke="var(--color-ribbon)" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" />
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
            style={{ "--tilt": `${p.tilt}deg`, "--top": `${p.top}px`, "--left": p.left ?? "auto", "--right": p.right ?? "auto" } as React.CSSProperties}
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

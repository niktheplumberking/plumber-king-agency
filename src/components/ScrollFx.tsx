"use client";
import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";

/**
 * One small client wrapper that lets server-rendered sections move on scroll without shipping their markup as JavaScript.
 * Any child with data-fx-y / data-fx-x (pixels, or "%" values) travels from +value to -value while the section crosses
 * the screen; data-fx-rotate="a,b" rotates between a and b degrees. Static under reduced motion.
 */
export function ScrollFx({ as: Tag = "div", className, children, ...rest }: { as?: "div" | "section"; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, () => {
    const st = { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true };
    ref.current!.querySelectorAll<HTMLElement>("[data-fx-y],[data-fx-x],[data-fx-rotate]").forEach((el) => {
      const from: gsap.TweenVars = {}, to: gsap.TweenVars = { ease: "none", scrollTrigger: st };
      const y = el.dataset.fxY, x = el.dataset.fxX, r = el.dataset.fxRotate;
      if (y) { const pct = y.endsWith("%"); const n = parseFloat(y); from[pct ? "yPercent" : "y"] = n; to[pct ? "yPercent" : "y"] = -n; }
      if (x) { const pct = x.endsWith("%"); const n = parseFloat(x); from[pct ? "xPercent" : "x"] = n; to[pct ? "xPercent" : "x"] = -n; }
      if (r) { const [a, b] = r.split(",").map(Number); from.rotate = a; to.rotate = b; }
      gsap.fromTo(el, from, to);
    });
  });
  const Comp = Tag as React.ElementType;
  return <Comp ref={ref} className={className} {...rest}>{children}</Comp>;
}

/** Stacking cards: each [data-stack-card] pins (CSS sticky) and the one beneath shrinks and dims as the next slides over it. Desktop only. */
export function StackFx({ className, children, ...rest }: { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, ({ mobile }) => {
    if (mobile) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card.firstElementChild, { scale: 0.92, yPercent: -4, ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 18%", scrub: true } });
    });
  });
  return <section ref={ref} className={className} {...rest}>{children}</section>;
}

/**
 * Pinned horizontal track, after the 21st.dev "Product Timeline" (hyperiux): [data-pin] is pinned while [data-track]
 * slides left and [data-rail] draws itself. Phones and reduced motion keep the plain vertical list.
 */
export function HScrollFx({ className, children, ...rest }: { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, ({ mobile }) => {
    if (mobile) return;
    const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
    const distance = () => track.scrollWidth - window.innerWidth + 64;
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current!.querySelector("[data-pin]"), start: "top top", end: () => `+=${distance()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true } });
    tl.to(track, { x: () => -distance(), ease: "none" }, 0).fromTo(ref.current!.querySelector("[data-rail]"), { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
  });
  return <section ref={ref} className={className} {...rest}>{children}</section>;
}

/** A looping marquee row. Built on the client from a short list so the repeated copies never bloat the page payload. */
export function MarqueeRow({ items, dur, reverse, itemClass, sep, outlineEvery }: { items: string[]; dur: string; reverse?: boolean; itemClass: string; sep: string; outlineEvery?: boolean }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee overflow-hidden">
      <div className={`marquee-track flex w-max items-center ${reverse ? "reverse" : ""}`} style={{ "--dur": dur } as React.CSSProperties}>
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className={itemClass}>
            <span className={outlineEvery && i % 2 ? "outline-text" : undefined}>{t}</span>
            <span className="text-[0.5em] opacity-80">{sep}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

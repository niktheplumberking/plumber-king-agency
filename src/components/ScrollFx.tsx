"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGsap } from "@/lib/gsap";

/**
 * One small client wrapper that lets server-rendered sections move on scroll without shipping their markup as JavaScript.
 * Any child with data-fx-y / data-fx-x (pixels, or "%" values) travels from +value to -value while the section crosses
 * the screen, or from a to b when written "a,b"; data-fx-rotate="a,b" rotates between a and b degrees. The scrub is
 * eased (0.6 s), so motion follows the scroll smoothly instead of stepping with each wheel tick. Static under reduced motion.
 */
export function ScrollFx({ as: Tag = "div", className, children, ...rest }: { as?: "div" | "section"; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, () => {
    const st = { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.6 };
    ref.current!.querySelectorAll<HTMLElement>("[data-fx-y],[data-fx-x],[data-fx-rotate]").forEach((el) => {
      const from: gsap.TweenVars = {}, to: gsap.TweenVars = { ease: "none", scrollTrigger: st };
      const y = el.dataset.fxY, x = el.dataset.fxX, r = el.dataset.fxRotate;
      const span = (v: string, axis: "x" | "y") => {
        const [a, b] = v.split(",").map((p) => p.trim()), key = a.endsWith("%") ? `${axis}Percent` : axis;
        from[key] = parseFloat(a); to[key] = b === undefined ? -parseFloat(a) : parseFloat(b);
      };
      if (y) span(y, "y");
      if (x) span(x, "x");
      if (r) { const [a, b] = r.split(",").map(Number); from.rotate = a; to.rotate = b; }
      gsap.fromTo(el, from, to);
    });
    // Looping strips (Nick, 2026-10-17): each [data-loop] row ("1" = left to right, "-1" = right to left) drifts on its
    // own. Scrolling pushes it: the speed ramps up and back down in straight lines, never a jump. The page's
    // "Pause motion" button (pk-motion event) stops and restarts them.
    const loops = ref.current!.querySelectorAll<HTMLElement>("[data-loop]");
    if (!loops.length) return;
    const tws = [...loops].map((el) => el.dataset.loop === "1"
      ? gsap.fromTo(el, { xPercent: -50 }, { xPercent: 0, duration: 46, ease: "none", repeat: -1 })
      : gsap.fromTo(el, { xPercent: 0 }, { xPercent: -50, duration: 40, ease: "none", repeat: -1 }));
    const push = (v: number) => tws.forEach((t) => gsap.to(t, {
      timeScale: 1 + Math.min(Math.abs(v) / 450, 5), duration: 0.5, ease: "none", overwrite: true,
      onComplete: () => { gsap.to(t, { timeScale: 1, duration: 1.4, ease: "none" }); },
    }));
    ScrollTrigger.create({ trigger: ref.current, start: "top bottom", end: "bottom top", onUpdate: (st) => push(st.getVelocity()) });
    const onMotion = (e: Event) => tws.forEach((t) => ((e as CustomEvent<boolean>).detail ? t.pause() : t.play()));
    window.addEventListener("pk-motion", onMotion);
    return () => window.removeEventListener("pk-motion", onMotion);
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

/**
 * A marquee row. Built on the client from a short list so the repeated copies never bloat the page payload.
 * `loop` rows ("1" or "-1") are driven by the ScrollFx around them (see above) instead of the CSS loop.
 * sep "dot" draws a round dot instead of a text glyph.
 */
export function MarqueeRow({ items, dur, reverse, itemClass, sep, outlineEvery, loop }: { items: string[]; dur?: string; reverse?: boolean; itemClass: string; sep: string; outlineEvery?: boolean; loop?: "1" | "-1" }) {
  const row = [...items, ...items, ...items, ...items, ...items, ...items];
  return (
    <div className="marquee overflow-hidden">
      <div data-loop={loop} className={`${loop ? "" : "marquee-track"} flex w-max items-center will-change-transform ${reverse ? "reverse" : ""}`} style={dur ? ({ "--dur": dur } as React.CSSProperties) : undefined}>
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className={itemClass}>
            <span className={outlineEvery && i % 2 ? "outline-text" : undefined}>{t}</span>
            {sep === "dot" ? <span aria-hidden className="mx-[0.2em] inline-block h-[0.3em] w-[0.3em] rounded-full bg-current opacity-80" /> : <span className="text-t3 opacity-80">{sep}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

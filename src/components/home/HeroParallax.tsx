"use client";
import { createContext, useContext, useRef } from "react";
import { SCROLL_AWAY, lerp, useScrollProgress } from "@/lib/scroll";

const Section = createContext<React.RefObject<HTMLElement | null> | null>(null);

/** The hero section; its layers drift at different speeds as it scrolls away. Content stays server-rendered and visible without JavaScript. */
export function HeroScroll({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} className={className}>
      <Section.Provider value={ref}>{children}</Section.Provider>
    </section>
  );
}

/** One parallax layer: moves by `y` pixels (and optionally rotates or fades) over the hero's scroll. Static under reduced motion. */
export function Parallax({ y, rotate, fadeTo, className, children, hidden }: { y: number; rotate?: [number, number]; fadeTo?: number; className?: string; children: React.ReactNode; hidden?: boolean }) {
  const section = useContext(Section)!;
  const layer = useRef<HTMLDivElement>(null);
  useScrollProgress(section, SCROLL_AWAY, (p) => {
    const el = layer.current;
    if (!el) return;
    el.style.transform = `translate3d(0,${lerp(0, y, p)}px,0)${rotate ? ` rotate(${lerp(rotate[0], rotate[1], p)}deg)` : ""}`;
    if (fadeTo !== undefined) el.style.opacity = String(lerp(1, fadeTo, Math.min(1, p / 0.8)));
  });
  return (
    <div ref={layer} aria-hidden={hidden || undefined} style={rotate ? { transform: `rotate(${rotate[0]}deg)` } : undefined} className={`will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}

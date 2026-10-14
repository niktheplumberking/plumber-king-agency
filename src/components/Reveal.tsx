import type { ReactNode } from "react";

/**
 * Fades and lifts content in once as it enters the viewport. Plain CSS (`[data-reveal]` in globals.css) switched on
 * by RevealObserver; without JavaScript, or under reduced motion, the content is simply shown.
 */
export function Reveal({ children, delay = 0, y = 28, className, as: Tag = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" | "article" }) {
  return (
    <Tag data-reveal="" className={className} style={{ "--rd": `${delay}s`, "--ry": `${y}px` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

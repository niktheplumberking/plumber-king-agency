import type { ReactNode } from "react";

/**
 * Fades and lifts content in once (14 px, 0.62 s) as it enters the viewport. Plain CSS (`[data-reveal]` in globals.css) switched on
 * by RevealObserver; without JavaScript, or under reduced motion, the content is simply shown.
 */
export function Reveal({ children, delay = 0, y = 14, className, as: Tag = "div", off }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" | "article"; off?: boolean }) {
  // `off`: render visible from the first paint (use for anything that can be the largest thing on screen, so LCP never waits).
  return (
    <Tag data-reveal={off ? undefined : ""} className={className} style={{ "--rd": `${delay}s`, "--ry": `${y}px` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

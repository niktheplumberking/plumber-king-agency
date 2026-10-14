import { useId } from "react";
import Link from "@/components/Link";
import { site } from "@/content/site";

const PD = "M24 34 H54 a23 23 0 0 1 0 46 H44 V92 H24 Z M48 47 C48 47 40 57 40 62 a8 8 0 0 0 16 0 C56 57 48 47 48 47 Z";
const HANG = "translate(24 34) rotate(-58) scale(0.68) translate(-7 7)";

/**
 * The "Crowned P" mark (Nick, 2026-10-14 17:39: take C "Hung, steeper" from round7/hanging-crown.jpg): a bold P whose
 * counter is a water drop, with a solid pink crown hooked on the P's top-left corner like a hat on a peg. Layers, back
 * to front: the P, the crown's back, the P's corner tip (it pokes out in front of the crown's back), the crown's band.
 * Thin gaps in the background colour separate the layers, so pass `gap` = whatever the mark sits on.
 */
export function CrownedP({ className = "", p = "var(--color-ink)", crown = "var(--color-ribbon)", gap = "var(--color-paper)" }: { className?: string; p?: string; crown?: string; gap?: string }) {
  const clip = "pk" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="5 18 74 76" className={className} aria-hidden>
      <defs><clipPath id={clip}><path transform={HANG} d="M-40 -1 H40 V-60 H-40 Z" /></clipPath></defs>
      <path fillRule="evenodd" fill={p} d={PD} />
      <path transform={HANG} fill={crown} stroke={gap} strokeWidth="3.82" strokeLinejoin="round" paintOrder="stroke" d="M-20 1 L-25 -17 L-11 -8 L0 -23 L11 -8 L25 -17 L20 1 Z" />
      <path clipPath={`url(#${clip})`} fillRule="evenodd" fill={p} stroke={gap} strokeWidth="2.6" paintOrder="stroke" d={PD} />
      <path transform={HANG} fill={crown} stroke={gap} strokeWidth="3.82" strokeLinejoin="round" paintOrder="stroke" d="M-22 -1 H22 V7 H-22 Z" />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const light = tone === "light";
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <CrownedP className="h-11 w-auto" p={light ? "#fff" : undefined} gap={light ? "var(--color-navy-950)" : undefined} />
      <span className="leading-none">
        <span className={`display block text-[1.05rem] italic ${light ? "text-white" : "text-ink"}`}>Plumber King</span>
        <span className={`mt-1 block text-xs font-extrabold tracking-[0.4em] uppercase italic ${light ? "text-ribbon" : "text-royal"}`}>Agency</span>
      </span>
    </Link>
  );
}

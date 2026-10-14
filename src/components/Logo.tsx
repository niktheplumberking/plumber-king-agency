import Link from "@/components/Link";
import { site } from "@/content/site";

/**
 * The "Crowned P" mark (Nick, 2026-10-14 17:35, take C3): a bold P whose counter is a water drop, with a small pink
 * crown tipped steeply and sitting fully on top of the P's top-left corner; the corner still shows beside it.
 * A thin gap in the background colour separates crown and P, so pass `gap` = whatever the mark sits on.
 * Hand-built vector: sharp at any size, colours from the palette tokens.
 */
export function CrownedP({ className = "", p = "var(--color-ink)", crown = "var(--color-ribbon)", gap = "var(--color-paper)" }: { className?: string; p?: string; crown?: string; gap?: string }) {
  return (
    <svg viewBox="20 20 60 74" className={className} aria-hidden>
      <path fillRule="evenodd" fill={p} d="M24 34 H54 a23 23 0 0 1 0 46 H44 V92 H24 Z M48 47 C48 47 40 57 40 62 a8 8 0 0 0 16 0 C56 57 48 47 48 47 Z" />
      <path transform="translate(38 39) rotate(-58) scale(0.52) translate(0 -3)" fill={crown} stroke={gap} strokeWidth="5" strokeLinejoin="round" paintOrder="stroke"
        d="M-20 1 L-25 -17 L-11 -8 L0 -23 L11 -8 L25 -17 L20 1 Z M-22 -1 H22 V7 H-22 Z" />
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

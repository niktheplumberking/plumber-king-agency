import Link from "@/components/Link";
import { site } from "@/content/site";

/**
 * The "Crowned P" mark Nick picked on 2026-10-14: a bold P whose counter is a water drop, wearing a crown.
 * Hand-built vector, so it stays sharp at any size and takes its colours from the palette tokens.
 */
export function CrownedP({ className = "", p = "var(--color-ink)", crown = "var(--color-ribbon)" }: { className?: string; p?: string; crown?: string }) {
  return (
    <svg viewBox="20 6 60 88" className={className} aria-hidden>
      <path fillRule="evenodd" fill={p} d="M24 34 H54 a23 23 0 0 1 0 46 H44 V92 H24 Z M48 47 C48 47 40 57 40 62 a8 8 0 0 0 16 0 C56 57 48 47 48 47 Z" />
      <path d="M24 30 V14 L35 22 L46.5 9 L58 22 L69 14 L69 30 Z" fill={crown} />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const light = tone === "light";
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <CrownedP className="h-11 w-auto" p={light ? "#fff" : undefined} />
      <span className="leading-none">
        <span className={`display block text-[1.05rem] ${light ? "text-white" : "text-ink"}`}>Plumber King</span>
        <span className={`mt-1 block text-[0.6rem] font-extrabold tracking-[0.5em] uppercase ${light ? "text-gold-300" : "text-gold-600"}`}>Agency</span>
      </span>
    </Link>
  );
}

import Link from "@/components/Link";
import { site } from "@/content/site";

/**
 * The logo is Bobo (Nick, 2026-10-15 16:31: "this little guy is our logo"): the round badge approved at 17:13, Bobo
 * sitting low in a circle so his body runs off the bottom edge. Badge only, no text beside it. `light` = the white
 * badge for white backgrounds (header), `dark` = the charcoal badge for the dark footer.
 */
export function BoboBadge({ variant = "light", className = "h-14 w-14" }: { variant?: "light" | "dark"; className?: string }) {
  const ring = variant === "light" ? "ring-ink/10" : "ring-white/15";
  return <img src={`/brand/bobo-badge-${variant}.webp`} alt="" width={128} height={128} decoding="async" className={`rounded-full ring-1 ${ring} ${className}`} />;
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label={`${site.name} home`}>
      <BoboBadge variant={tone === "dark" ? "light" : "dark"} />
    </Link>
  );
}

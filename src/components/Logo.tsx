import Link from "@/components/Link";
import { site } from "@/content/site";
import { CrownMark } from "./CrownMark";

/** The real logo once supplied (site.assets.logo); until then a wordmark with the crown. */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      {site.assets.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={site.assets.logo} alt={site.name} width={52} height={52} className="h-12 w-12 md:h-13 md:w-13" />
      ) : (
        <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-800 ring-2 ring-gold/70">
          <CrownMark className="h-5 w-6 text-gold" />
        </span>
      )}
      <span className={`font-display text-[1.15rem] leading-none font-extrabold tracking-tight ${text}`}>
        Plumber King<span className={`block text-[0.75rem] font-semibold tracking-[0.2em] uppercase ${tone === "light" ? "text-[#ff8a7f]" : "text-ribbon"}`}>Agency</span>
      </span>
    </Link>
  );
}

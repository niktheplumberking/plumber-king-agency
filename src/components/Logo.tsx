import Link from "@/components/Link";
import { site } from "@/content/site";
import { CrownMark } from "./CrownMark";

/** The real logo once supplied (site.assets.logo); until then a wordmark with the crown. */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
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
      {/* Wordmark in the round-2 style: heavy italic caps, tilted up, PLUMBER in blue and KING in red. */}
      <span className="-rotate-[4deg] leading-none">
        <span className={`display block text-[1.05rem] italic ${tone === "light" ? "text-white" : "text-royal"}`}>Plumber <span className={tone === "light" ? "text-gold-300" : "text-ribbon"}>King</span></span>
        <span className={`mt-0.5 block text-[0.62rem] font-extrabold tracking-[0.42em] uppercase ${tone === "light" ? "text-white/90" : "text-ink/70"}`}>Agency</span>
      </span>
    </Link>
  );
}

import Link from "@/components/Link";
import { site } from "@/content/site";

/**
 * The logo is Bobo, the duck alone (Nick, 2026-10-15: "this little guy is our logo"; 2026-10-16: no circle or
 * badge behind him, and bigger). Never draw a background shape behind this image anywhere on the site.
 */
export function BoboLogo({ className = "h-16 w-auto" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/bobo-logo-96.webp" srcSet="/brand/bobo-logo-96.webp 1x, /brand/bobo-logo-192.webp 2x" alt="Plumber King Agency logo: Bobo the duck" width={84} height={96} decoding="async" className={className} />;
}

/** The approved Brand DNA v4 lockup (Nick, 2026-10-16 18:13): Bobo left, PLUMBER KING over five stars and AGENCY. */
export function Wordmark({ className = "h-11 w-auto sm:h-14 lg:h-[4.25rem]" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/logo-wordmark-160.webp" srcSet="/brand/logo-wordmark-96.webp 464w, /brand/logo-wordmark-160.webp 774w" sizes="(min-width: 1024px) 330px, (min-width: 640px) 271px, 213px" alt="Plumber King Agency" width={774} height={160} decoding="async" className={className} />;
}

export function Logo({ className, duckOnly = false }: { className?: string; duckOnly?: boolean }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label={`${site.name} home`}>
      {duckOnly ? <BoboLogo className={className ?? "h-16 w-auto"} /> : <Wordmark className={className} />}
    </Link>
  );
}

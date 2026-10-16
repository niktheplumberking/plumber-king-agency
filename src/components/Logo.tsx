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

export function Logo({ className = "h-16 w-auto lg:h-[4.75rem]" }: { className?: string }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label={`${site.name} home`}>
      <BoboLogo className={className} />
    </Link>
  );
}

import Link from "@/components/Link";
import { CtaButton } from "@/components/CtaButton";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="on-blue blueprint relative flex min-h-[80svh] items-center overflow-hidden pt-24 text-white">
      <div className="container-x">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bobo/sorry.webp" alt="Bobo, the Plumber King duck, looking a little lost" width={160} height={160} className="h-36 w-36" />
        <h1 className="display mt-6 text-[clamp(2.8rem,1.8rem+5vw,6rem)]">This pipe leads <span className="accent">nowhere.</span></h1>
        <p className="mt-4 max-w-lg text-lg text-white/90">The page you were looking for has moved or never existed. Let&apos;s get you somewhere useful.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><CtaButton /><Link href="/" className="btn btn-ghost-light">Back to the homepage</Link></div>
      </div>
    </section>
  );
}

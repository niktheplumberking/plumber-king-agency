import { CrownMark } from "@/components/CrownMark";

/** Rendered once at build time to make /og-image.png (1200x630), then removed from the output. Not a public page. */
export const metadata = { robots: { index: false, follow: false } };

export default function OgCard() {
  return (
    <div id="og" className="grain fixed inset-0 z-[100] flex h-[630px] w-[1200px] flex-col justify-between overflow-hidden bg-navy-950 p-16 text-white">
      <div aria-hidden className="absolute -top-40 -right-40 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(245_191_60/0.25),transparent)]" />
      <div className="relative flex items-center gap-4"><CrownMark className="h-10 w-14 text-gold" /><span className="font-display text-3xl font-extrabold">Plumber King <span className="text-gold-300">Agency</span></span></div>
      <p className="relative max-w-[46rem] font-display text-[4.6rem] leading-[1] font-extrabold tracking-tight">Websites that keep plumbers <span className="accent">booked solid.</span></p>
      <p className="relative max-w-[44rem] text-2xl text-white/90">Websites · SEO · AI search · for plumbing companies in the USA &amp; Canada</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-512.png" alt="" width={300} height={300} className="absolute right-14 bottom-16 h-[300px] w-[300px]" />
      <div className="absolute inset-x-0 bottom-0 h-3 bg-ribbon" />
    </div>
  );
}

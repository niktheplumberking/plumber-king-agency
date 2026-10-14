"use client";
import { useRef } from "react";
import { ENTER_TO_EXIT, lerp, useScrollProgress } from "@/lib/scroll";
import { site, showPlaceholders } from "@/content/site";
import { CrownMark } from "../CrownMark";
import { PlaceholderBadge } from "../PlaceholderBadge";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";

/** Nick's story, in his own words from the old site. The photo is his real photo once supplied (never generated without his OK). */
export function Founder({ full = false }: { full?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const quote = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, ENTER_TO_EXIT, (p) => {
    if (img.current) img.current.style.transform = `translate3d(0,${lerp(60, -60, p)}px,0)`;
    if (quote.current) quote.current.style.transform = `translate3d(0,${lerp(120, -40, p)}px,0)`;
  });

  return (
    <section ref={ref} id="founder" className="relative overflow-hidden bg-paper pt-24 pb-32 md:pt-32 md:pb-40" aria-labelledby="founder-h">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md">
          <div ref={img} className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-navy-900 shadow-[0_40px_100px_-40px_rgb(12_27_60/0.6)]">
            {site.assets.founderPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={site.assets.founderPhoto} srcSet={`/brand/nick-founder-480.webp 480w, ${site.assets.founderPhoto} 900w`} sizes="(min-width: 1024px) 28rem, 90vw" alt="Nick, founder of Plumber King Agency, at his desk" className="h-full w-full object-cover" width={900} height={1200} loading={full ? "eager" : "lazy"} fetchPriority={full ? "high" : "auto"} />
            ) : (
              <div className="grain relative flex h-full flex-col items-center justify-center gap-4 text-gold">
                <CrownMark className="h-20 w-28" />
                <p className="font-display text-3xl font-bold text-white">Nick</p>
                <p className="text-white/70">Founder, Plumber King Agency</p>
                {showPlaceholders && <PlaceholderBadge label="Nick's real photo goes here" />}
              </div>
            )}
          </div>
          <div ref={quote} className="absolute -right-3 -bottom-6 max-w-[17rem] rounded-2xl bg-ribbon p-5 text-white shadow-xl sm:-right-10">
            <p className="text-sm font-semibold text-white">Nick&apos;s rule</p>
            <p className="mt-1 font-display text-lg leading-snug font-bold">{site.founderQuote}</p>
          </div>
        </div>

        <Reveal className="pt-10 lg:pt-0">
          <h2 id="founder-h" className="text-[clamp(2.2rem,1.5rem+3vw,4rem)] font-extrabold">The plumber&apos;s marketing guy. <span className="text-royal">Meet Nick.</span></h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-lg text-slate">
            <p>Most tradesmen are brilliant at the work, but nobody ever taught them how websites, Google or online marketing work, and you shouldn&apos;t have to figure that out on your own. Too many good plumbers end up with websites that don&apos;t bring in a single enquiry, while agencies take the money and disappear.</p>
            <p>I started Plumber King Agency because I kept seeing solid, hardworking plumbers losing out to competitors who simply had better online setups. That never sat right with me.</p>
            {full && <p>When you grow, I grow. If your phone starts ringing and you win better jobs, I get to show those results as a case study. I&apos;m as invested in your success as you are, and I only want to work with plumbers who are serious about growing.</p>}
            <p>Everything I build is designed to help people trust you faster, find you easier and actually contact you. No nonsense, just honest work that helps both of us win.</p>
          </div>
          <CtaButton className="mt-9" />
        </Reveal>
      </div>
    </section>
  );
}

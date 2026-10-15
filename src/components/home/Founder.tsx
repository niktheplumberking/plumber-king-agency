import { site, showPlaceholders } from "@/content/site";
import { CrownMark } from "../CrownMark";
import { PlaceholderBadge } from "../PlaceholderBadge";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";
import { ScrollFx } from "../ScrollFx";

/** Nick's story, in his own words from the old site. The photo is his real photo once supplied (never generated without his OK). */
export function Founder({ full = false }: { full?: boolean }) {
  return (
    <ScrollFx as="section" id="founder" className="relative overflow-hidden bg-paper pt-24 pb-32 md:pt-32 md:pb-40" aria-labelledby="founder-h">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md">
          <span aria-hidden className="sticker absolute -top-4 -left-3 z-10 bg-royal text-white" style={{ "--tilt": "-6deg" } as React.CSSProperties}>Founder</span>
          <div data-fx-y="50" className="relative aspect-[3/4] overflow-hidden rounded-md border-2 border-ink bg-navy-900 shadow-[10px_10px_0_var(--color-royal)]">
            {site.assets.founderPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={site.assets.founderPhoto} srcSet={`/brand/nick-founder-480.webp 480w, ${site.assets.founderPhoto} 900w`} sizes="(min-width: 1024px) 28rem, 90vw" alt="Nick, founder of Plumber King Agency, at his desk" className="h-full w-full object-cover" width={900} height={1200} loading={full ? "eager" : "lazy"} fetchPriority={full ? "high" : "auto"} />
            ) : (
              <div className="grain relative flex h-full flex-col items-center justify-center gap-4 text-gold">
                <CrownMark className="h-20 w-28" />
                <p className="font-display text-t2 font-bold text-white">Nick</p>
                <p className="text-white/90">Founder, Plumber King Agency</p>
                {showPlaceholders && <PlaceholderBadge label="Nick's real photo goes here" />}
              </div>
            )}
          </div>
          <div data-fx-y="70" className="absolute -right-3 -bottom-6 max-w-[17rem] -rotate-2 rounded-md border-2 border-ink bg-ribbon p-5 text-ink shadow-[5px_5px_0_var(--color-ink)] sm:-right-10">
            <p className="text-t3 font-extrabold tracking-widest text-ink uppercase">Nick&apos;s rule</p>
            <p className="mt-1 font-display text-t3 leading-snug font-bold">{site.founderQuote}</p>
          </div>
        </div>

        <Reveal className="pt-10 lg:pt-0">
          <p className="kicker">Who you work with</p>
          <h2 id="founder-h" className="display mt-5 text-t1">The plumber&apos;s marketing guy. <span className="accent">Meet Nick.</span></h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-t3 text-slate">
            <p>Most tradesmen are brilliant at the work, but nobody ever taught them how websites, Google or online marketing work, and you shouldn&apos;t have to figure that out on your own. Too many good plumbers end up with websites that don&apos;t bring in a single enquiry, while agencies take the money and disappear.</p>
            <p>I started Plumber King Agency because I kept seeing solid, hardworking plumbers losing out to competitors who simply had better online setups. That never sat right with me.</p>
            {full && <p>When you grow, I grow. If your phone starts ringing and you win better jobs, I get to show those results as a case study. I&apos;m as invested in your success as you are, and I only want to work with plumbers who are serious about growing.</p>}
            <p>Everything I build is designed to help people trust you faster, find you easier and actually contact you. No nonsense, just honest work that helps both of us win.</p>
          </div>
          <CtaButton className="mt-9" />
        </Reveal>
      </div>
    </ScrollFx>
  );
}

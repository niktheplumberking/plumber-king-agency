"use client";
import { useRef } from "react";
import { ENTER_TO_EXIT, lerp, useScrollProgress } from "@/lib/scroll";
import { ArrowUpRight, Star } from "lucide-react";
import { showPlaceholders } from "@/content/site";
import { stats, testimonials, visible, work } from "@/content/proof";
import { PlaceholderBadge } from "../PlaceholderBadge";
import { Reveal } from "../Reveal";

/**
 * Portfolio, numbers and reviews. Renders ONLY verified entries on the live site; on preview builds placeholder
 * entries also render, each badged. With nothing verified, the live site simply has no proof section yet:
 * better no proof than fake proof (FTC rule, factory rule DR-FAKE-SOCIAL-PROOF).
 */
export function Proof() {
  const items = visible(work, showPlaceholders);
  const quotes = visible(testimonials, showPlaceholders);
  const numbers = visible(stats, showPlaceholders);
  if (!items.length && !quotes.length && !numbers.length) return null;
  return (
    <section className="overflow-hidden bg-navy-950 py-24 text-white md:py-32" aria-labelledby="proof-h">
      <div className="container-x">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="proof-h" className="max-w-2xl text-[clamp(2.2rem,1.5rem+3vw,4rem)] font-extrabold">Real plumbers. <span className="text-gold">Real websites.</span></h2>
          {showPlaceholders && <PlaceholderBadge label="Preview only: not confirmed real" />}
        </Reveal>
      </div>
      {items.length > 0 && <WorkRail items={items} />}
      <div className="container-x">
        {numbers.length > 0 && (
          <dl className="mt-20 grid gap-8 border-y border-white/10 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {numbers.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1">
                <dt className="text-white/70">{s.label}</dt>
                <dd className="font-display text-5xl font-extrabold text-gold">{s.value}</dd>
                {s.status === "placeholder" && <PlaceholderBadge />}
              </div>
            ))}
          </dl>
        )}
        {quotes.length > 0 && (
          <ul className="mt-16 grid gap-5 md:grid-cols-2">
            {quotes.map((t, i) => (
              <Reveal as="li" key={t.name} delay={(i % 2) * 0.1} className={`rounded-3xl bg-white/[0.05] p-7 ring-1 ring-white/10 ${i % 2 ? "md:translate-y-10" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" aria-hidden />)}</div>
                  {t.status === "placeholder" && <PlaceholderBadge />}
                </div>
                <blockquote className="mt-4 text-lg text-white/90">&ldquo;{t.quote}&rdquo;</blockquote>
                <p className="mt-5 font-semibold">{t.name}<span className="font-normal text-white/65"> · {t.company}</span></p>
                {t.sourceUrl && <a href={t.sourceUrl} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1 text-sm text-gold hover:underline">Read the original review<ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a>}
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function WorkRail({ items }: { items: typeof work }) {
  const ref = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  useScrollProgress(ref, ENTER_TO_EXIT, (p) => { if (rail.current) rail.current.style.transform = `translate3d(${lerp(6, -22, p)}%,0,0)`; });
  return (
    <div ref={ref} className="mt-14">
      <ul ref={rail} className="flex gap-6 px-5 md:px-8">
        {items.map((w) => (
          <li key={w.name} className="w-[82vw] max-w-[34rem] shrink-0">
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl" style={{ background: `linear-gradient(140deg, ${w.accent}, #071126)` }}>
              {w.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.image} alt={`${w.name} website on laptop and phone`} className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <div className="flex h-full flex-col items-start justify-end p-7">
                  <PlaceholderBadge label="Screenshot to come" />
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="font-display text-xl font-bold">{w.name}{w.place && <span className="font-sans text-base font-normal text-white/65"> · {w.place}</span>}</p>
              {w.status === "placeholder" && <PlaceholderBadge />}
            </div>
            {w.result && <p className="mt-1 text-white/75">{w.result}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

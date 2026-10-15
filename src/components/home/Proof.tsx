import { ArrowUpRight, Star } from "lucide-react";
import { showPlaceholders } from "@/content/site";
import { stats, testimonials, visible, work } from "@/content/proof";
import { PlaceholderBadge } from "../PlaceholderBadge";
import { Reveal } from "../Reveal";
import { ScrollFx } from "../ScrollFx";

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
    <section className="on-blue overflow-hidden bg-navy-900 py-24 text-white md:py-32" aria-labelledby="proof-h">
      <div className="container-x">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="proof-h" className="display max-w-2xl text-t1">Real plumbers. <span className="accent">Real websites.</span></h2>
          {showPlaceholders && <PlaceholderBadge label="Preview only: not confirmed real" />}
        </Reveal>
      </div>
      {items.length > 0 && <WorkRail items={items} />}
      <div className="container-x">
        {numbers.length > 0 && (
          <dl className="mt-20 grid gap-8 border-y border-white/10 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {numbers.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1">
                <dt className="text-white/90">{s.label}</dt>
                <dd className="font-display text-t1 font-extrabold text-white">{s.value}</dd>
                {s.status === "placeholder" && <PlaceholderBadge />}
              </div>
            ))}
          </dl>
        )}
      </div>
      {quotes.length > 0 && <ReviewMarquee quotes={quotes} />}
    </section>
  );
}

function WorkRail({ items }: { items: typeof work }) {
  return (
    <ScrollFx className="mt-14">
      <ul data-fx-x="8%" className="flex gap-6 px-5 md:px-8">
        {items.map((w) => (
          <li key={w.name} className="w-[82vw] max-w-[34rem] shrink-0">
            <div className="relative aspect-[3/2] overflow-hidden rounded-md border-2 border-ink" style={{ background: `linear-gradient(140deg, ${w.accent}, #123c3a)` }}>
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
              <p className="font-display text-t2 font-bold">{w.name}{w.place && <span className="font-sans text-t3 font-normal text-white/90"> · {w.place}</span>}</p>
              {w.status === "placeholder" && <PlaceholderBadge />}
            </div>
            {w.result && <p className="mt-1 text-white/90">{w.result}</p>}
          </li>
        ))}
      </ul>
    </ScrollFx>
  );
}

/**
 * Reviews as two rows drifting in opposite directions, after the 21st.dev "Testimonials Marquee" (shadcnspace marquee-01),
 * rebuilt with the site's CSS marquee (no extra JavaScript) and paused on hover so a card can be read.
 */
function ReviewMarquee({ quotes }: { quotes: typeof testimonials }) {
  const rows = [quotes, [...quotes].reverse()];
  return (
    <div className="relative mt-16 space-y-5">
      {rows.map((row, r) => {
        const loop = Array.from({ length: Math.max(2, Math.ceil(8 / row.length)) }, () => row).flat();
        return (
          <div key={r} className="marquee overflow-hidden">
            <ul className={`marquee-track pause-on-hover flex w-max gap-5 ${r ? "reverse" : ""}`} style={{ "--dur": "60s" } as React.CSSProperties}>
              {[...loop, ...loop].map((t, i) => (
                <li key={i} aria-hidden={i >= row.length} className="w-[22rem] shrink-0 rounded-md border-2 border-ink bg-white p-6 text-ink shadow-[5px_5px_0_var(--color-ink)]">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-ribbon" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" aria-hidden />)}</div>
                    {t.status === "placeholder" && <PlaceholderBadge />}
                  </div>
                  <blockquote className="mt-4 line-clamp-4 text-t3">&ldquo;{t.quote}&rdquo;</blockquote>
                  <p className="mt-4 text-t3 font-extrabold tracking-wide uppercase">{t.name}<span className="font-semibold text-slate normal-case"> · {t.company}</span></p>
                  {t.sourceUrl && <a href={t.sourceUrl} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1 text-t3 font-semibold text-royal hover:underline">Read the original review<ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a>}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-navy-900" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-navy-900" />
    </div>
  );
}

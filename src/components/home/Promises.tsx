"use client";
import { useRef } from "react";
import { Check } from "lucide-react";
import { gsap, useGsap } from "@/lib/gsap";
import { CtaButton } from "../CtaButton";

/*
 * Section 2, rebuilt 2026-10-16 (Nick: "too many blank spaces, nothing drives the eye"). Pain point: plumbers have
 * been burned by agencies. Each row strikes through a common agency frustration and swaps in the promise that
 * answers it. These are general frustrations, never a named competitor, and every promise is something the site
 * already commits to (FAQ, services). Pattern from 21st.dev "Comparison Section" (hirael), ported to GSAP.
 * Eye path: title, subline, then down the panel row by row, ending on the button.
 */
const rows = [
  { pain: "An agency that learns your trade on your dime", promise: "Plumbers only" },
  { pain: "Your website held hostage if you ever leave", promise: "You own your website" },
  { pain: "A sales pitch before a straight answer", promise: "Free 30-minute strategy call" },
  { pain: "Reports full of jargon nobody reads", promise: "Monthly report in plain English" },
  { pain: "No idea which calls came from the website", promise: "Calls, forms and leads tracked" },
  { pain: "They vanish the day the site goes live", promise: "Support after launch" },
  { pain: "Projects that drag on with no end date", promise: "A timeline before we start" },
];

export function Promises() {
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, () => {
    gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 82%", once: true } });
      tl.from(row.querySelector("[data-pain]"), { backgroundSize: "0% 3px", duration: 0.45, ease: "power3.inOut" })
        .from(row.querySelector("[data-promise]"), { xPercent: 12, autoAlpha: 0, rotate: 3, duration: 0.55, ease: "back.out(1.6)" }, "<0.1");
    });
    gsap.from("[data-panel-bobo]", { y: 60, rotate: -12, ease: "back.out(1.4)", duration: 0.9, scrollTrigger: { trigger: "[data-panel]", start: "top 75%", once: true } });
  });

  return (
    <section ref={ref} aria-labelledby="promise-h" className="relative overflow-x-clip bg-white pt-40 pb-28 md:pt-52 md:pb-36">
      <div aria-hidden className="pointer-events-none absolute top-24 left-[-10%] -z-0 aspect-square w-[min(44rem,70vw)] rounded-full bg-sky" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="promise-h" className="display text-t1">No runaround. <span className="accent">Just more booked jobs.</span></h2>
          <p className="mt-6 max-w-md text-t3 text-slate md:text-t2">You have heard the agency pitch before. Here is what changes when you work with me, in plain English.</p>
          <div className="mt-9 hidden lg:block"><CtaButton /></div>
        </div>

        {/* The panel runs off the right edge of the screen on wide layouts. */}
        <div data-panel className="relative lg:-mr-[clamp(1rem,2.2vw,2.5rem)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-panel-bobo src="/brand/bobo-full.webp" alt="Bobo the duck" width={480} height={549} loading="lazy" decoding="async" className="absolute -top-24 right-6 z-10 w-28 md:-top-32 md:w-36" />
          <ol className="relative rounded-3xl bg-ink px-5 py-8 text-white shadow-[12px_12px_0_var(--color-ribbon)] md:px-10 md:py-12 lg:rounded-r-none">
            {rows.map((r, i) => (
              <li key={r.promise} data-row className="grid gap-2 border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-8">
                <p className="relative self-start text-t3 text-mist md:self-center">
                  {/* The strike is a background line on the inline text, so it crosses every line when the text wraps. */}
                  <span data-pain className="bg-[linear-gradient(var(--color-ribbon),var(--color-ribbon))] bg-[length:100%_3px] bg-[position:0_58%] bg-no-repeat [box-decoration-break:clone]">{r.pain}</span>
                  <span className="sr-only"> (not with us)</span>
                </p>
                <p data-promise className="flex items-center gap-3 text-t2 font-bold">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${i % 2 ? "bg-white text-ink" : "bg-ribbon-deep text-white"}`}><Check className="h-5 w-5" aria-hidden /></span>
                  {r.promise}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex justify-center lg:hidden"><CtaButton /></div>
      </div>
    </section>
  );
}

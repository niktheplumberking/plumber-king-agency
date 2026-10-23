"use client";
import { useRef } from "react";
import { Check, X } from "lucide-react";
import { gsap, useGsap, warm } from "@/lib/gsap";
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
  { pain: "Reports full of jargon nobody reads", promise: "Reports in plain English" },
  { pain: "No idea which calls came from the website", promise: "Calls, forms and leads tracked" },
  { pain: "They vanish the day the site goes live", promise: "Support after launch" },
  { pain: "Projects that drag on with no end date", promise: "A timeline before we start" },
];

export function Promises() {
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, ({ mobile }) => {
    warm(mobile ? "[data-mrow]" : "[data-pain],[data-promise]");
    warm("[data-panel-bobo]");
    if (mobile) {
      // Phones: two boxes (Nick 2026-10-22), each line slides in as it comes up.
      gsap.utils.toArray<HTMLElement>("[data-mrow]").forEach((row) => {
        gsap.from(row, { autoAlpha: 0, x: -16, duration: 0.45, ease: "power2.out", scrollTrigger: { trigger: row, start: "top 88%", once: true } });
      });
    } else {
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 82%", once: true } });
        tl.from(row.querySelector("[data-pain]"), { autoAlpha: 0, x: -16, duration: 0.4, ease: "power2.out" })
          .from(row.querySelector("[data-promise]"), { xPercent: 12, autoAlpha: 0, rotate: 3, duration: 0.55, ease: "back.out(1.6)" }, "<0.1");
      });
    }
    // Bobo stands up as the panel comes in, once per load (Nick 2026-10-22: every entrance plays once and never again
    // on the way back up; this replaces his 2026-10-19 "every time").
    const at = mobile ? "m" : "d";
    gsap.from(`[data-panel-bobo="${at}"]`, { y: 60, rotate: -12, ease: "back.out(1.4)", duration: 0.9, scrollTrigger: { trigger: `[data-panel="${at}"]`, start: mobile ? "top 80%" : "top 75%", once: true } });
  });

  return (
    <section ref={ref} aria-labelledby="promise-h" className="relative overflow-x-clip bg-white pt-52 pb-28 md:pt-72 md:pb-36">
      <div aria-hidden className="pointer-events-none absolute top-24 left-[-10%] -z-0 aspect-square w-[min(44rem,70vw)] rounded-full bg-sky" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="promise-h" className="display text-t1">No runaround. <span className="accent">Just more booked jobs.</span></h2>
          <p className="mt-6 max-w-md text-t3 text-slate md:text-t2">You have heard the agency pitch before. Here is what changes when you work with me, in plain English.</p>
          <div className="mt-9 hidden lg:block"><CtaButton /></div>
        </div>

        {/* The panel runs off the right edge of the screen on wide layouts. */}
        <div data-panel="d" className="relative mt-14 hidden md:block lg:mt-0 lg:-mr-[clamp(1rem,2.2vw,2.5rem)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-panel-bobo="d" src="/brand/bobo-full.webp" alt="Bobo the duck" width={480} height={549} loading="lazy" decoding="async" className="absolute -top-[9.5rem] right-6 w-36" />
          <div className="relative z-10 rounded-3xl bg-ink px-5 pt-8 pb-8 text-white shadow-[12px_12px_0_var(--color-ribbon)] md:px-10 md:pt-10 md:pb-12 lg:rounded-r-none">
          {/* Column titles: one size for both, sized so PLUMBER KING AGENCY fills its half, then stretched taller; OTHER
              AGENCIES is letter-spaced out to the same width (Nick, 2026-10-17: "same font, bigger, extend in height"). */}
          <div aria-hidden className="mb-6 grid gap-3 border-b border-white/10 pb-6 md:mb-8 md:grid-cols-2 md:gap-8 md:pb-8">
            <div className="fit-box"><p className="fit-title tall display text-mist [--fit:11.2] [letter-spacing:1.7cqi]">OTHER AGENCIES</p></div>
            <div className="fit-box"><p className="fit-title tall display text-white [--fit:11.2]">PLUMBER <span className="text-ribbon">KING</span> AGENCY</p></div>
          </div>
          <h3 className="sr-only">Other agencies compared with Plumber King Agency</h3>
          <ol className="relative">
            {rows.map((r, i) => (
              <li key={r.promise} data-row className="grid gap-2 border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-8">
                <p className="relative self-start text-t3 text-mist md:self-center">
                  {/* No strike line (Nick, 2026-10-17: hard to read). Muted grey says "the bad deal" on its own. */}
                  <span data-pain>{r.pain}</span>
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
        </div>

        {/* Phones (Nick 2026-10-22): two boxes, the other agencies first, then ours with Bobo standing behind its top edge,
            his whole body showing above it, the way he stands on desktop. */}
        <div className="mt-14 grid gap-36 md:hidden">
          <div className="rounded-3xl bg-ink px-5 pt-8 pb-8 text-white">
            <div aria-hidden className="fit-box mb-6 border-b border-white/10 pb-6"><p className="fit-title tall display text-mist [--fit:11.2] [letter-spacing:1.7cqi]">OTHER AGENCIES</p></div>
            <h3 className="sr-only">Other agencies</h3>
            <ul>
              {rows.map((r) => (
                <li key={r.pain} data-mrow className="flex items-center gap-3 border-b border-white/10 py-4 text-t3 text-mist first:pt-0 last:border-0 last:pb-0">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-mist"><X className="h-5 w-5" aria-hidden /></span>
                  {r.pain}
                </li>
              ))}
            </ul>
          </div>
          <div data-panel="m" className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-panel-bobo="m" src="/brand/bobo-full.webp" alt="Bobo the duck" width={480} height={549} loading="lazy" decoding="async" className="absolute -top-[7.4rem] right-6 w-28" />
            <div className="relative z-10 rounded-3xl bg-ink px-5 pt-8 pb-8 text-white shadow-[12px_12px_0_var(--color-ribbon)]">
              <div aria-hidden className="fit-box mb-6 border-b border-white/10 pb-6"><p className="fit-title tall display text-white [--fit:11.2]">PLUMBER <span className="text-ribbon">KING</span> AGENCY</p></div>
              <h3 className="sr-only">Plumber King Agency</h3>
              <ul>
                {rows.map((r, i) => (
                  <li key={r.promise} data-mrow className="flex items-center gap-3 border-b border-white/10 py-4 text-t2 font-bold first:pt-0 last:border-0 last:pb-0">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${i % 2 ? "bg-white text-ink" : "bg-ribbon-deep text-white"}`}><Check className="h-5 w-5" aria-hidden /></span>
                    {r.promise}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:hidden"><CtaButton /></div>
      </div>
    </section>
  );
}

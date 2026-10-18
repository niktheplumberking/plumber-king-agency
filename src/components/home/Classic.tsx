import Link from "@/components/Link";
import { ArrowUpRight } from "lucide-react";
import { CtaButton } from "../CtaButton";
import { Reveal } from "../Reveal";
import { HScrollFx } from "../ScrollFx";
import { process, system } from "./Showcase";

/*
 * Backup (Nick 2026-10-18: "save the backup because if I don't like it I will tell you to go back"). The two sections
 * as they were before round 7, kept unused so going back is a one-line swap in page.tsx and process/page.tsx.
 * Same code is on the branch backup-before-round7 (commit fb71fea).
 */

/**
 * "Everything it takes", rebuilt 2026-10-17 (Nick: "completely rebuild it", 21st.dev). Pattern: the "Hover Expand
 * Gallery" (kedhareswer) and "Hover Expand" (educalvolpz) accordions, ported to plain CSS (.xg in globals.css, no
 * extra JavaScript): four tall picture panels; the one you point at (or tab into) opens wide with its story, the rest
 * fold into rails with a sideways label. Phones get the four cards stacked, all open.
 */
export function SystemBentoClassic() {
  return (
    <section className="on-blue blueprint relative overflow-hidden py-24 text-white md:py-32" aria-labelledby="system-h">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:items-end">
          <h2 id="system-h" className="display text-t1">Everything it takes <span className="accent">to own your town.</span></h2>
          <p className="text-t3 text-white/90 md:text-t2">Built for plumbers only. We handle the tech so you can stay on the tools.</p>
        </Reveal>
        <ol className="xg mt-14 md:mt-16">
          {system.map((s, i) => (
            <li key={s.title} className="xg-item" style={{ "--i": i } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} srcSet={`${s.img.replace(".webp", "-720.webp")} 720w, ${s.img} 1200w`} sizes="(min-width: 1024px) 50vw, 92vw" alt={s.alt} width={1200} height={900} loading="lazy" decoding="async" className="xg-img" />
              <span aria-hidden className="xg-rail"><b>0{i + 1}</b>{s.title}</span>
              <div className="xg-full">
                <p className="xg-num">0{i + 1}</p>
                <h3 className="display text-t2">{s.title}</h3>
                <p className="mt-3 max-w-md text-t3 text-white/90">{s.body}</p>
                <Link href={s.href} className="xg-link">How it works<ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Pinned horizontal timeline, after the 21st.dev "Product Timeline" (hyperiux): the track slides left as you scroll and
 * the pink rail (the "train") draws itself. Rebuilt 2026-10-17 (Nick): the title is "Five steps." centred and stretched,
 * over a giant slanted "0 GUESSWORK" that runs off both screen edges; the subline is gone; titles are bigger; and each
 * station swells while the rail's head passes it, then settles as the next one swells (a wave). HScrollFx sets .on.
 * Phones and reduced motion get the same steps as a vertical list (on phones each step swells as it crosses the middle).
 */
export function ProcessTimelineClassic({ compact = false }: { compact?: boolean }) {
  return (
    <HScrollFx className={`overflow-hidden bg-white ${compact ? "py-16" : "py-24 md:py-0"}`} aria-labelledby="process-h">
      <div data-pin className="md:flex md:h-[100svh] md:flex-col md:justify-center md:pt-16">
        <h2 id="process-h" className="steps-h display">Five steps.<span className="sr-only"> Zero guesswork.</span></h2>
        <p aria-hidden className="guess slant">0 GUESSWORK</p>
        <div className="relative mt-8 md:mt-12">
          <span aria-hidden data-rail className="absolute top-[1.4rem] right-0 left-0 hidden h-[3px] origin-left bg-ribbon md:block" />
          <ol data-track className="container-x flex flex-col gap-10 md:w-max md:max-w-none md:flex-row md:gap-20 md:pr-[30vw]">
            {process.map((p, i) => (
              <li key={p.title} data-station className="station">
                <span className="step-ic"><p.icon className="h-5 w-5" aria-hidden /></span>
                <p className="big-num mt-6">0{i + 1}</p>
                <h3 className="station-h">{p.title}</h3>
                <p className="mt-3 max-w-[22rem] text-t3 text-slate">{p.body}</p>
              </li>
            ))}
            <li className="flex items-center md:w-[27rem]"><CtaButton /></li>
          </ol>
        </div>
      </div>
    </HScrollFx>
  );
}

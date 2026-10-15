import { Check } from "lucide-react";
import { CtaButton } from "../CtaButton";
import { SpreadFx } from "../ScrollFx";

/*
 * Section 2: trust without invented proof (docs/competitor-teardown.md). King Contractor puts reviews here; we have
 * none we can show yet, so this carries Nick's promises instead, each one something the site already commits to
 * (FAQ, services). Real reviews take this slot the day Nick has them. The stickers pile up on Bobo and spread out to
 * free-placed spots as you scroll (SpreadFx); on phones they sit in a loose, tilted cloud.
 */
// Positions and tilts live in globals.css (.pstk), so this list ships as short strings.
const promises = ["Plumbers only", "You own your website", "Free 30-minute strategy call", "Monthly report in plain English", "Calls, forms and leads tracked", "Support after launch", "A timeline before we start"];

export function Promises() {
  return (
    <SpreadFx aria-labelledby="promise-h" className="relative bg-[linear-gradient(to_bottom,#fff_0%,var(--color-sky)_100%)] pt-40 pb-24 md:pt-52 md:pb-32">
      <div data-spread-pin className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="promise-h" className="display text-t1">No runaround. <span className="accent">Just more booked jobs.</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-t3 text-slate">I only work with plumbers, so I already know the jobs you want more of. Here is what you get, in plain English.</p>
        </div>
        <div data-spread-stage className="relative mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-3 lg:mt-6 lg:block lg:h-[30rem]">
          <div data-spread-center className="order-last mx-auto mt-6 w-full lg:absolute lg:top-1/2 lg:left-1/2 lg:mt-0 lg:w-auto lg:-translate-x-1/2 lg:-translate-y-1/2">
            <div className="relative mx-auto aspect-square w-56 rounded-full bg-ribbon lg:w-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bobo/cheer.webp" alt="Bobo, the Plumber King duck, cheering" width={320} height={320} loading="lazy" decoding="async" className="absolute -top-[14%] left-1/2 w-[112%] max-w-none -translate-x-1/2" />
            </div>
          </div>
          {promises.map((t) => <span key={t} data-spread className="sticker pstk"><Check className="h-4 w-4" aria-hidden />{t}</span>)}
        </div>
        <div className="mt-14 flex justify-center lg:mt-16"><CtaButton /></div>
      </div>
    </SpreadFx>
  );
}

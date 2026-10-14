import { Fragment } from "react";
import Link from "@/components/Link";
import { HeroScroll, Parallax } from "./HeroParallax";
import { BadgeCheck, CalendarCheck, Check, MapPin, PhoneIncoming, Wrench } from "lucide-react";
import { site } from "@/content/site";
import { CtaButton } from "../CtaButton";
import { CrownMark } from "../CrownMark";
import { PhoneFrame } from "./PhoneFrame";

const leads = [
  { icon: PhoneIncoming, title: "Incoming call", body: "Burst pipe under the kitchen sink", meta: "Cary, NC · just now", tone: "bg-ribbon" },
  { icon: Wrench, title: "New quote request", body: "Water heater replacement, 50 gal", meta: "Raleigh, NC · 4 min ago", tone: "bg-royal" },
  { icon: CalendarCheck, title: "Job booked", body: "Drain cleaning, Thursday morning", meta: "Apex, NC · 12 min ago", tone: "bg-gold-600" },
];

/**
 * Home hero. Server-rendered so the headline and copy paint before any JavaScript loads (fast LCP);
 * the entrance plays as CSS keyframes (.enter-*, inlined in the layout) and only the scroll parallax needs JavaScript.
 */
export function Hero() {
  return (
    <HeroScroll className="grain relative isolate overflow-hidden bg-navy-950 pt-28 pb-20 text-white md:pt-36 md:pb-28">
      {/* Gold spotlight from the crown, not a blue gradient (factory rule DR-GRADIENT-HERO). */}
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(closest-side,rgb(245_191_60/0.22),transparent)]" />
      <Parallax hidden y={260} rotate={[-8, 14]} className="pointer-events-none absolute top-24 right-[4%] -z-10 hidden text-gold/[0.07] md:block">
        <CrownMark className="h-[26rem] w-[34rem]" />
      </Parallax>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <Parallax y={120} fadeTo={0.15}>
          <p className="enter-fade inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/85">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden /> Websites, SEO & AI search for plumbing companies
          </p>
          <h1 className="mt-6 text-[clamp(2.6rem,1.6rem+4.6vw,5.4rem)] font-extrabold">
            <SplitWords text="We build websites that keep plumbers" />{" "}
            <span className="relative inline-block whitespace-nowrap text-gold">
              <SplitWords text="booked solid." delay={0.3} />
              <svg aria-hidden viewBox="0 0 300 18" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-ribbon">
                <path className="enter-draw" pathLength={1} d="M3 13C70 4 180 2 297 9" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          {/* No entrance on this paragraph: it is the largest text on phones (the LCP element), so it paints at once. */}
          <p className="mt-7 max-w-[36rem] text-lg text-white/80 md:text-xl">
            When a pipe bursts, homeowners grab their phone and call the first plumber they trust. We make sure that&apos;s you: a fast site built to convert, top spots on Google and AI search, and a call button under every thumb.
          </p>
          <div className="enter-fade mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.3s" } as React.CSSProperties}>
            <CtaButton />
            <Link href="/free-website-audit/" className="btn btn-ghost-light">{site.secondaryCta}</Link>
          </div>
          <ul className="enter-fade mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem] text-white/80" style={{ "--d": "0.4s" } as React.CSSProperties}>
            {["Plumbers only", "You own your website", "Built for Google & AI search", "USA & Canada"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="h-4.5 w-4.5 text-gold" aria-hidden />{t}</li>
            ))}
          </ul>
        </Parallax>

        <Parallax y={-90} className="relative mx-auto w-full max-w-[22rem]">
          <PhoneFrame>
            <div className="flex items-center justify-between px-5 pt-4 text-[0.75rem] font-semibold text-white/70"><span>Leads</span><span className="rounded bg-white/10 px-1.5 py-0.5">SAMPLE</span></div>
            <div className="px-5 pt-5">
              <p className="text-[0.8rem] font-medium text-white/60">Tuesday</p>
              <p className="font-display text-2xl font-bold">Your phone, after launch</p>
            </div>
            <ul className="mt-5 space-y-3 px-3.5" aria-label="Example of leads arriving (illustration)">
              {leads.map((l, i) => (
                <li key={l.title} className="enter-slide flex gap-3 rounded-2xl bg-white/[0.08] p-3.5 ring-1 ring-white/10" style={{ "--d": `${0.4 + i * 0.15}s` } as React.CSSProperties}>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${l.tone}`}><l.icon className="h-5 w-5 text-white" aria-hidden /></span>
                  <span className="min-w-0">
                    <span className="block text-[0.82rem] font-semibold text-white">{l.title} <span className="font-normal text-white/60">(SAMPLE)</span></span>
                    <span className="block truncate text-[0.82rem] text-white/80">{l.body}</span>
                    <span className="mt-0.5 flex items-center gap-1 text-[0.75rem] text-white/60"><MapPin className="h-3 w-3" aria-hidden />{l.meta}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mx-3.5 mt-4 mb-5 flex items-center gap-2 rounded-2xl bg-gold/15 p-3 text-[0.78rem] text-gold-300 ring-1 ring-gold/30">
              <BadgeCheck className="h-4.5 w-4.5 shrink-0" aria-hidden /> Every lead sent to your phone in seconds
            </div>
          </PhoneFrame>
          <p className="mt-4 text-center text-sm text-white/70">Illustration of how leads reach you</p>
        </Parallax>
      </div>
    </HeroScroll>
  );
}

function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {/* The space sits between the clipped word boxes: a trailing space inside an inline-block collapses. */}
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="enter-rise inline-block" style={{ "--d": `${Math.min(0.6, delay + i * 0.05)}s` } as React.CSSProperties}>{w}</span>
          </span>
        </Fragment>
      ))}
    </>
  );
}

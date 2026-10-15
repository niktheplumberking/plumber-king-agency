import { Fragment } from "react";
import Link from "@/components/Link";
import { MapPin, PhoneIncoming, Star, Wrench } from "lucide-react";
import { site } from "@/content/site";
import { CtaButton } from "../CtaButton";
import { HeroMotion } from "./HeroMotion";

const leads = [
  { icon: PhoneIncoming, title: "Incoming call", body: "Burst pipe under the kitchen sink", meta: "Cary, NC · just now", tone: "bg-ribbon" },
  { icon: Wrench, title: "Quote request", body: "Water heater replacement, 50 gal", meta: "Raleigh, NC · 4 min ago", tone: "bg-royal" },
];

/**
 * Home hero: Nick himself (owner photo, cut out) standing in a hot-pink arch, with free-placed stickers, two sample
 * lead cards and Bobo peeking from behind. A plumber photo made us look like a plumbing company; the owner's face is
 * what builds trust (Nick, 2026-10-15, after theplumberagency.com). The headline is server-rendered and paints
 * before any JavaScript (fast LCP); GSAP only adds the scroll-away drift. The bottom edge of the photo sits under the
 * scroll strips that overlap this section.
 */
export function Hero() {
  return (
    <HeroMotion className="relative isolate overflow-hidden bg-white">
      <div className="container-x relative grid items-end gap-6 pt-28 md:min-h-[100svh] md:grid-cols-[1.05fr_1fr] md:gap-4 md:pt-24">
        <div data-hero-copy className="relative z-10 max-w-[42rem] self-center pb-4 md:pb-24">
          <h1 className="display text-t1 text-ink">
            <SplitWords text="Websites that keep plumbers" />{" "}
            <span className="accent"><SplitWords text="booked solid." delay={0.25} /></span>
          </h1>
          {/* No entrance on this paragraph: on phones it can be the largest text block, so it paints at once. */}
          <p className="mt-7 max-w-[34rem] text-t3 text-slate md:text-t2">
            When a pipe bursts, homeowners call the first plumber they trust. I make sure that&apos;s you: a fast site built to convert, top spots on Google and AI search, and a call button under every thumb.
          </p>
          <div className="enter-fade mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap" style={{ "--d": "0.3s" } as React.CSSProperties}>
            <CtaButton />
            <Link href="/free-website-audit/" className="btn btn-ghost-dark">{site.secondaryCta}</Link>
          </div>
          <p className="enter-fade mt-6 text-t3 text-slate" style={{ "--d": "0.4s" } as React.CSSProperties}>Free 30-minute strategy call · Plumbers only · You own your website</p>
        </div>

        {/* Nick in a hot-pink arch. Phones: below the copy, smaller. */}
        <div data-hero-media className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] self-end md:max-w-none">
          <div aria-hidden className="absolute inset-x-[10%] top-[10%] bottom-0 rounded-t-full bg-ribbon" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/nick-hero-520.webp" srcSet="/brand/nick-hero-520.webp 520w, /brand/nick-hero.webp 820w" sizes="(min-width: 768px) 46vw, 90vw" alt="Nick, founder of Plumber King Agency" width={820} height={1019} fetchPriority="high" decoding="async" className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-hero-bobo src="/bobo/wave.webp" alt="Bobo the duck waving" width={320} height={320} decoding="async" className="absolute right-[-2%] bottom-[14%] w-[30%] max-w-[10rem] -rotate-6" />
          <span data-hero-sticker className="sticker absolute top-[20%] left-[0%] bg-white text-ink" style={{ "--tilt": "-9deg" } as React.CSSProperties} aria-hidden>
            <Star className="h-3.5 w-3.5 fill-current" />Plumbers only
          </span>
          <span className="sticker absolute bottom-[24%] left-[2%] bg-ink text-white md:left-[0%]" style={{ "--tilt": "5deg" } as React.CSSProperties}>Nick · Founder</span>
          <ul data-hero-leads className="absolute top-[34%] right-[-5%] hidden w-[17.5rem] space-y-2.5 xl:block 2xl:right-[-7%]" aria-label="Example of leads arriving (illustration)">
            {leads.map((l, i) => (
              <li key={l.title} className="enter-slide lead-card" style={{ "--d": `${0.45 + i * 0.2}s` } as React.CSSProperties}>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded ${l.tone}`}><l.icon className="h-5 w-5 text-white" aria-hidden /></span>
                <span className="min-w-0">
                  <span className="lead-t">{l.title} <span className="font-semibold text-slate normal-case">(SAMPLE)</span></span>
                  <span className="block truncate text-t3">{l.body}</span>
                  <span className="lead-m"><MapPin className="h-3 w-3" aria-hidden />{l.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HeroMotion>
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
          <span className="split-w">
            <span className="enter-rise split-i" style={{ "--d": `${Math.min(0.6, delay + i * 0.05)}s` } as React.CSSProperties}>{w}</span>
          </span>
        </Fragment>
      ))}
    </>
  );
}

import { Bot, MapPin, MonitorSmartphone, PhoneCall, Search, ShieldCheck, Wrench } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";
import { ScrollFx } from "../ScrollFx";
import { FacebookIcon, InstagramIcon } from "../SocialIcons";

/** What Nick does, as tiles. Only services the site already sells. */
const what = [
  { icon: MonitorSmartphone, t: "Websites" },
  { icon: Search, t: "Local SEO" },
  { icon: Bot, t: "AI search" },
  { icon: PhoneCall, t: "Lead follow-up" },
];

/** Facts only: each one is already promised elsewhere on the site (FAQ, Terms, Nick 2026-10-17). */
const facts = [
  { big: "1–2", small: "weeks from start to launch" },
  { big: "3", small: "months of support included" },
  { big: "Yours", small: "the website, once paid in full" },
];

/**
 * "Meet Nick", rebuilt 2026-10-17 (Nick: "80% of the canvas is blank"). An about bento after the 21st.dev "About Bento"
 * (uilayout.contact) and "Feature Overview Bento" (hirael): the photo, the story, Nick's rule, what he does, hard facts
 * and the call to action each get a tile, so the section reads as who he is at a glance. Tiles lift and tilt on hover
 * (CSS only); the photo and the rule drift a little on scroll. Nick's words are from his old site.
 */
export function Founder({ full = false }: { full?: boolean }) {
  return (
    <ScrollFx as="section" id="founder" className="relative overflow-hidden bg-paper py-24 md:py-32" aria-labelledby="founder-h">
      <div aria-hidden className="hero-dots pointer-events-none absolute top-10 right-0 h-72 w-[30%]" />
      <div className="container-x bento">
        <Reveal className="bt bt-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-fx-y="-6%,6%" src={site.assets.founderPhoto ?? "/brand/nick-founder.webp"} srcSet="/brand/nick-founder-480.webp 480w, /brand/nick-founder.webp 900w" sizes="(min-width: 1024px) 30rem, 92vw" alt="Nick, founder of Plumber King Agency, at his desk" className="bt-img" width={900} height={1200} loading={full ? "eager" : "lazy"} fetchPriority={full ? "high" : "auto"} />
          <span aria-hidden className="sticker absolute top-5 left-5 bg-ribbon-deep text-white" style={{ "--tilt": "-6deg" } as React.CSSProperties}>Founder</span>
          <div className="bt-name">
            <p className="display text-t2">Nick</p>
            <p className="text-t3 text-white/90">Founder, Plumber King Agency</p>
            <div className="mt-3 flex gap-2">
              <a href={site.social.instagram} target="_blank" rel="noopener" className="bt-soc" aria-label="Nick on Instagram"><InstagramIcon className="h-5 w-5" /></a>
              <a href={site.social.facebook} target="_blank" rel="noopener" className="bt-soc" aria-label="Plumber King Agency on Facebook"><FacebookIcon className="h-5 w-5" /></a>
            </div>
          </div>
        </Reveal>

        <Reveal className="bt bt-story">
          <h2 id="founder-h" className="display text-t1">The plumber&apos;s marketing guy. <span className="accent">Meet Nick.</span></h2>
          <div className="mt-6 max-w-[60ch] space-y-4 text-t3 text-slate">
            <p>Most tradesmen are brilliant at the work, but nobody ever taught them how websites, Google or online marketing work. Too many good plumbers end up with websites that don&apos;t bring in a single enquiry, while agencies take the money and disappear.</p>
            <p>I started Plumber King Agency because I kept seeing solid, hardworking plumbers lose out to competitors who simply had better online setups. That never sat right with me.</p>
            {full && <p>When you grow, I grow. If your phone starts ringing and you win better jobs, I get to show those results as a case study. I&apos;m as invested in your success as you are, and I only want to work with plumbers who are serious about growing.</p>}
          </div>
        </Reveal>

        <Reveal className="bt bt-rule">
          <p className="text-t3 font-bold tracking-widest uppercase">Nick&apos;s rule</p>
          <p data-fx-y="12,-12" className="display mt-3 text-t2">&ldquo;{site.founderQuote}&rdquo;</p>
          <Wrench aria-hidden className="bt-rule-ic" />
        </Reveal>

        <Reveal className="bt bt-what">
          <p className="text-t3 font-bold tracking-widest text-slate uppercase">What I do</p>
          <ul className="mt-4 grid grid-cols-2 gap-2.5">
            {what.map((w) => <li key={w.t} className="bt-chip"><w.icon className="h-5 w-5" aria-hidden />{w.t}</li>)}
          </ul>
        </Reveal>

        {facts.map((f) => (
          <Reveal key={f.small} className="bt bt-fact">
            <p className="xg-num">{f.big}</p>
            <p className="mt-2 text-t3 font-semibold">{f.small}</p>
          </Reveal>
        ))}

        <Reveal className="bt bt-where">
          <p className="flex items-center gap-2 text-t3 font-bold"><ShieldCheck className="h-5 w-5 text-ribbon-deep" aria-hidden />Plumbers only</p>
          <p className="mt-2 flex items-center gap-2 text-t3 font-bold"><MapPin className="h-5 w-5 text-ribbon-deep" aria-hidden />USA and Canada</p>
        </Reveal>

        <Reveal className="bt bt-cta">
          <p className="display text-t2">Talk to Nick, not a sales team.</p>
          <CtaButton className="mt-5" />
        </Reveal>
      </div>
    </ScrollFx>
  );
}

import { Bot, MapPin, MonitorSmartphone, PhoneCall, Search, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { AboutTabs } from "@/components/AboutTabs";
import { NickPhotos } from "@/components/NickPhotos";
import { CtaButton } from "@/components/CtaButton";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { founderFull, nick } from "@/content/about";
import { site } from "@/content/site";
import { pageMeta, personLd } from "@/lib/seo";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";

export const metadata = pageMeta({
  title: "Nick Bennett, Plumber Website Designer",
  description: "Meet Nick Bennett, founder of Plumber King Agency: the web designer building websites, local SEO and AI search for plumbers in the USA and Canada.",
  path: "/about/nick-bennett/",
});

const what = [
  { icon: MonitorSmartphone, t: "Plumber websites", d: "Fast, mobile-first websites built to turn visitors into calls." },
  { icon: Search, t: "Local SEO", d: "Service pages, Google Business Profile and the searches that bring jobs." },
  { icon: Bot, t: "AI search", d: "Clear answers so ChatGPT, Gemini and Google's AI Overviews can recommend you." },
  { icon: PhoneCall, t: "Lead follow-up", d: "Every call and quote request sent straight to your phone." },
];

export default function NickPage() {
  return (
    <>
      <PageHero photo={nick.deskPoint} crumbs={[{ name: "About", path: "/about/" }, { name: founderFull, path: "/about/nick-bennett/" }]} title={<>Hi, I&apos;m {founderFull}. <span className="accent">I build websites for plumbers.</span></>} intro={<p>I&apos;m the founder of {site.name} and the person you talk to, from the first call to launch day and after.</p>}>
        <AboutTabs current="me" />
      </PageHero>

      <section id="who" className="bg-paper py-20 md:py-28" aria-labelledby="who-h">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <Reveal>
            <h2 id="who-h" className="display text-t1">Who I am</h2>
            <div className="mt-6 space-y-4 text-t3 text-slate">
              <p>I&apos;m a web designer who builds brands, online stores and websites, and I now work with one trade only: plumbing. My company, {site.name}, is owned by {site.legalEntity} and serves plumbing businesses across the USA and Canada.</p>
              <p>Most plumbers are brilliant at the work, but nobody ever taught them how websites, Google or online marketing work. Too many good plumbers end up with websites that don&apos;t bring in a single enquiry, while agencies take the money and disappear. I started {site.name} to change that.</p>
              <p>When you work with me, you deal with me directly. No account managers, no call centre, no jargon.</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CtaButton />
              <a href={site.social.instagram} target="_blank" rel="noopener" className="bt-soc border-2 border-ink" aria-label={`${founderFull} on Instagram`}><InstagramIcon className="h-5 w-5" /></a>
              <a href={site.social.facebook} target="_blank" rel="noopener" className="bt-soc border-2 border-ink" aria-label={`${site.name} on Facebook`}><FacebookIcon className="h-5 w-5" /></a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="bt bt-rule">
            <p className="text-t3 font-bold tracking-widest uppercase">My rule</p>
            <p className="display mt-3 text-t1">&ldquo;{site.founderQuote}&rdquo;</p>
          </Reveal>
        </div>
      </section>

      <section id="what" className="bg-white py-20 md:py-28" aria-labelledby="what-h">
        <div className="container-x">
          <Reveal><h2 id="what-h" className="display text-t1">What I do <span className="accent">for plumbers</span></h2></Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {what.map((w, i) => (
              <Reveal as="li" key={w.t} delay={i * 0.06} className="bt">
                <w.icon className="h-7 w-7 text-ribbon-deep" aria-hidden />
                <h3 className="mt-4 text-t2 font-bold">{w.t}</h3>
                <p className="mt-2 text-t3 text-slate">{w.d}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="bt-chip"><ShieldCheck className="h-5 w-5" aria-hidden />Plumbers only</span>
            <span className="bt-chip"><MapPin className="h-5 w-5" aria-hidden />USA and Canada</span>
          </div>
        </div>
      </section>

      <section id="photos" className="bg-paper py-20 md:py-28" aria-labelledby="photos-h">
        <div className="container-x">
          <Reveal><h2 id="photos-h" className="display text-t1">The face <span className="accent">behind the brand</span></h2></Reveal>
          <div className="mt-12"><NickPhotos /></div>
        </div>
      </section>

      <FinalCta />
      <JsonLd data={personLd()} />
    </>
  );
}

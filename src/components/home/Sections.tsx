"use client";
import Link from "@/components/Link";
import { useRef } from "react";
import { ENTER_TO_EXIT, lerp, useReducedMotion, useScrollProgress, type ScrollRange } from "@/lib/scroll";
import { ArrowUpRight, Bot, Check, ClipboardList, Gauge, LifeBuoy, MonitorSmartphone, PenTool, Rocket, Search, Smartphone, Star, X } from "lucide-react";
import { services } from "@/content/services";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";

/* ---------- The one looping element on the page: the jobs we help you win ---------- */
const jobs = ["Water heaters", "Drain cleaning", "Burst pipes", "Repiping", "Sewer lines", "Leak detection", "Tankless installs", "Emergency calls", "Bathroom remodels", "Sump pumps"];
export function JobsMarquee() {
  const reduce = useReducedMotion();
  const row = [...jobs, ...jobs];
  return (
    <section aria-label="Jobs we help you win" className="overflow-hidden border-y border-navy-900/10 bg-paper py-6">
      <div className={`flex w-max gap-10 ${reduce ? "" : "animate-[marquee_38s_linear_infinite]"}`}>
        {row.map((j, i) => (
          <span key={i} aria-hidden={i >= jobs.length} className="flex items-center gap-10 font-display text-2xl font-bold text-navy-900/80 md:text-3xl">
            {j}<span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gold" aria-hidden />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

/* ---------- The problem: old way vs the Plumber King way ---------- */
const oldWay = ["A template site that looks like every other plumber's", "No calls coming from the website", "SEO that feels like a scam: you pay, nothing moves", "An agency that doesn't understand plumbing", "Competitors on top of Google while you're invisible", "Relying on word-of-mouth and hoping the phone rings"];
const kingWay = ["A custom site built to turn visitors into calls", "Your phone ringing with local homeowners who need you", "SEO built around the plumbing searches that become jobs", "A partner who speaks your language and knows your business", "Showing up first when homeowners need a plumber", "Steady, predictable lead flow every month"];

export function ProblemSplit() {
  return (
    <section className="bg-paper py-24 md:py-32" aria-labelledby="problem-h">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <h2 id="problem-h" className="text-[clamp(2.2rem,1.5rem+3vw,4rem)] font-extrabold">Why most plumber websites never make the phone ring.</h2>
          <p className="mt-6 max-w-lg text-lg text-slate">You didn&apos;t become a plumber to become a marketing expert. But a website that doesn&apos;t bring in calls is quietly sending your jobs to the plumber down the road.</p>
          <p className="mt-6 max-w-lg text-lg font-semibold">The difference is a partner who only works with plumbers.</p>
          <CtaButton className="mt-8" />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal className="rounded-3xl border border-navy-900/10 bg-ivory p-7">
            <h3 className="flex items-center gap-2 text-xl font-bold text-slate"><X className="h-5 w-5 text-ribbon" aria-hidden />The old way</h3>
            <ul className="mt-5 space-y-4">
              {oldWay.map((t) => (<li key={t} className="flex gap-3 text-slate"><X className="mt-1 h-4 w-4 shrink-0 text-ribbon/70" aria-hidden />{t}</li>))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="relative rounded-3xl bg-navy-900 p-7 text-white shadow-[0_30px_80px_-30px_rgb(12_27_60/0.6)] sm:-translate-y-6">
            <h3 className="flex items-center gap-2 text-xl font-bold"><Check className="h-5 w-5 text-gold" aria-hidden />The Plumber King way</h3>
            <ul className="mt-5 space-y-4">
              {kingWay.map((t) => (<li key={t} className="flex gap-3 text-white/90"><Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />{t}</li>))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- The system: asymmetric bento, not a three-card row ---------- */
export function SystemBento() {
  return (
    <section className="grain relative overflow-hidden bg-navy-950 py-24 text-white md:py-32" aria-labelledby="system-h">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <h2 id="system-h" className="text-[clamp(2.2rem,1.5rem+3vw,4rem)] font-extrabold">The Plumber King system. <span className="text-gold">Everything it takes to own your town.</span></h2>
          <p className="mt-5 max-w-2xl text-lg text-white/75">Built by plumber marketing specialists, for plumbers only. We handle the tech so you can focus on the work.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-6">
          <BentoCard className="md:col-span-4 md:row-span-2" href={`/services/${services[0].slug}/`} icon={MonitorSmartphone} title="Websites that actually convert" body="Not brochures. Conversion machines: click-to-call on every screen, a page for every job and every town, and trust signals exactly where homeowners look.">
            <SiteSketch />
          </BentoCard>
          <BentoCard className="md:col-span-2" href={`/services/${services[1].slug}/`} icon={Search} title="Plumber SEO" body="Map pack, service pages and technical SEO built around the searches that turn into jobs." />
          <BentoCard className="md:col-span-2" href={`/services/${services[1].slug}/`} icon={Bot} title="AI search (GEO & AEO)" body="Clear answers and structured data so ChatGPT, Gemini and Google's AI Overviews can recommend you." />
          <BentoCard className="md:col-span-3" href={`/services/${services[2].slug}/`} icon={Smartphone} title="24/7 lead capture" body="Every call and form sent to your phone the moment it lands, so you call back first." />
          <BentoCard className="md:col-span-3" href={`/services/${services[1].slug}/`} icon={Star} title="Reviews & reputation" body="A simple system to collect real Google reviews and keep your star rating working for you." />
        </div>
        <ul className="mt-10 grid gap-x-8 gap-y-4 border-t border-white/10 pt-8 text-white/80 sm:grid-cols-2 lg:grid-cols-4">
          {[{ i: Gauge, t: "Speed optimization" }, { i: ClipboardList, t: "Monthly plain-English reports" }, { i: PenTool, t: "Conversion testing" }, { i: LifeBuoy, t: "Support that answers" }].map(({ i: I, t }) => (
            <li key={t} className="flex items-center gap-3"><I className="h-5 w-5 text-gold" aria-hidden />{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BentoCard({ className = "", href, icon: Icon, title, body, children }: { className?: string; href: string; icon: React.ComponentType<{ className?: string }>; title: string; body: string; children?: React.ReactNode }) {
  return (
    <Reveal className={`group relative overflow-hidden rounded-3xl bg-white/[0.05] p-7 ring-1 ring-white/10 transition-colors duration-500 hover:bg-white/[0.08] ${className}`}>
      <Link href={href} className="absolute inset-0 z-10" aria-label={`${title}: learn more`} />
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold"><Icon className="h-6 w-6" /></span>
        <ArrowUpRight className="h-5 w-5 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" aria-hidden />
      </div>
      <h3 className="mt-6 text-2xl font-bold">{title}</h3>
      <p className="mt-3 max-w-md text-white/75">{body}</p>
      {children}
    </Reveal>
  );
}

function SiteSketch() {
  const ref = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, ENTER_TO_EXIT, (p) => { if (card.current) card.current.style.transform = `translate3d(0,${lerp(40, -40, p)}px,0)`; });
  return (
    <div ref={ref} aria-hidden className="relative mt-8 h-56 md:h-72">
      <div ref={card} className="absolute inset-x-0 top-0 translate-y-10 rounded-2xl bg-paper p-4 text-ink shadow-2xl">
        <div className="flex items-center justify-between"><span className="h-3 w-24 rounded bg-navy-900/80" /><span className="rounded-full bg-ribbon px-3 py-1 text-[0.75rem] font-bold text-white">Call now</span></div>
        <div className="mt-5 h-5 w-3/4 rounded bg-navy-900/85" />
        <div className="mt-2 h-5 w-1/2 rounded bg-navy-900/85" />
        <div className="mt-4 flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div>
        <div className="mt-4 grid grid-cols-3 gap-2">{["Water heaters", "Drains", "Repiping"].map((t) => <span key={t} className="rounded-lg bg-ivory px-2 py-2 text-[0.75rem] font-semibold">{t}</span>)}</div>
      </div>
    </div>
  );
}

/* ---------- Process: a line that draws itself as you scroll ---------- */
const process = [
  { icon: Search, title: "Discovery & strategy", body: "A quick call to understand your trade, your goals and your customers. Then a conversion-focused plan for your service area and the jobs you want more of." },
  { icon: ClipboardList, title: "Content & wireframe", body: "We gather the right content or write it for you, focused on what sells. Then a clean wireframe so the structure and message are right before design starts." },
  { icon: PenTool, title: "Design & build", body: "Your custom site, designed and built with SEO baked in. Every element is there to turn a visitor into a call." },
  { icon: Rocket, title: "Launch", body: "Once you approve, we go live with SEO set up, the sitemap submitted to Google and Bing, and tracking in place." },
  { icon: LifeBuoy, title: "Ongoing support", body: "We don't disappear after launch. Edits, updates and tweaks whenever you need them, so you're never left chasing a developer." },
];

const TIMELINE: ScrollRange = [0, 0.75, 1, 0.6];

export function ProcessTimeline({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  useScrollProgress(ref, TIMELINE, (p) => { if (line.current) line.current.style.transform = `scaleY(${p})`; });
  return (
    <section className={`bg-ivory ${compact ? "py-20" : "py-24 md:py-32"}`} aria-labelledby="process-h">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="process-h" className="text-[clamp(2.2rem,1.5rem+3vw,4rem)] font-extrabold">How we work.</h2>
          <p className="mt-5 max-w-md text-lg text-slate">Five clear steps from first call to a site that keeps working for you. You always know what&apos;s happening and what we need from you.</p>
          <CtaButton className="mt-8" />
        </Reveal>
        <ol ref={ref} className="relative space-y-12 pl-14">
          <span aria-hidden className="absolute top-2 bottom-2 left-[1.15rem] w-[3px] rounded-full bg-navy-900/10" />
          {/* Draws as you scroll; fully drawn when reduced motion is on (the scroll handler is skipped and the class default applies). */}
          <span ref={line} aria-hidden className="absolute top-2 bottom-2 left-[1.15rem] w-[3px] timeline-line origin-top rounded-full bg-ribbon" />
          {process.map((p, i) => (
            <Reveal as="li" key={p.title} className="relative">
              <span className="absolute top-0 -left-14 grid h-10 w-10 place-items-center rounded-full bg-navy-900 text-gold ring-4 ring-ivory"><p.icon className="h-5 w-5" aria-hidden /></span>
              <p className="text-sm font-semibold text-gold-700">Step {i + 1}</p>
              <h3 className="mt-1 text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 max-w-xl text-lg text-slate">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

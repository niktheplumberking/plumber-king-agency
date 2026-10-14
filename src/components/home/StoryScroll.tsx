"use client";
import { useRef, useState } from "react";
import { PINNED, useReducedMotion, useScrollProgress } from "@/lib/scroll";
import { Bot, MapPin, Phone, PhoneCall, Search, ShieldCheck, Star } from "lucide-react";
import { PhoneFrame } from "./PhoneFrame";

const steps = [
  {
    key: "found",
    label: "Found",
    title: "They search. You show up.",
    body: "\"Emergency plumber near me.\" \"Who fixes water heaters in Cary?\" Whether they type it into Google or ask an AI assistant, your business is built to be one of the answers: service pages, Google Business Profile, schema markup and clear answers that search engines can read.",
  },
  {
    key: "trusted",
    label: "Trusted",
    title: "They land. They trust you in seconds.",
    body: "Real photos of you and your trucks, your license and insurance, your reviews and your guarantee, right where a worried homeowner looks first. No stock-photo models, no walls of text.",
  },
  {
    key: "booked",
    label: "Booked",
    title: "They tap. Your phone rings.",
    body: "A call button under every thumb, a two-field quote form for the people who would rather type, and every lead sent to your phone straight away, so you get the job before they call someone else.",
  },
] as const;

/** Apple-style pinned story: the phone stays put while the three steps play out as you scroll. */
export function StoryScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, PINNED, (p) => {
    setActive(Math.min(2, Math.floor(p * 3)));
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
  }, true);

  if (reduce) {
    return (
      <section className="bg-sky py-24" aria-labelledby="story-h">
        <div className="container-x">
          <h2 id="story-h" className="display max-w-2xl text-5xl md:text-6xl">From invisible to <span className="accent">booked.</span></h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.key}><p className="display text-xl text-ribbon">0{i + 1} {s.label}</p><h3 className="mt-2 text-2xl font-bold">{s.title}</h3><p className="mt-3 text-slate">{s.body}</p></li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[300vh] bg-sky" aria-labelledby="story-h">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="kicker">How it plays out</p>
            <h2 id="story-h" className="display mt-5 max-w-xl text-[clamp(2.4rem,1.4rem+3.6vw,4.8rem)]">From invisible to <span className="accent">booked.</span></h2>
            <ol className="mt-8 flex gap-2" aria-label="Steps">
              {steps.map((s, i) => (
                <li key={s.key} className={`rounded-md border-2 px-4 py-2 text-xs font-extrabold tracking-wider uppercase transition-colors duration-500 ${i === active ? "border-ink bg-ink text-white" : "border-ink/15 text-slate"}`}>
                  0{i + 1} {s.label}
                </li>
              ))}
            </ol>
            <div className="relative mt-8 min-h-[15rem] md:min-h-[13rem]">
              <div key={steps[active].key} className="enter-fade">
                <h3 className="display text-3xl md:text-4xl">{steps[active].title}</h3>
                <p className="mt-4 max-w-lg text-lg text-slate">{steps[active].body}</p>
              </div>
            </div>
            <div className="mt-6 h-1.5 w-full max-w-md overflow-hidden bg-ink/10" aria-hidden>
              <div ref={bar} className="h-full origin-left scale-x-0 bg-ribbon" />
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[20rem] sm:block lg:max-w-[21rem]">
            <PhoneFrame>
              <div className="h-[30rem]">
                {active === 0 && <ScreenFound key="f" />}
                {active === 1 && <ScreenTrusted key="t" />}
                {active === 2 && <ScreenBooked key="b" />}
              </div>
            </PhoneFrame>
            <p className="mt-3 text-center text-sm text-slate">SAMPLE illustration</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function ScreenFound() {
  return (
    <div className="enter-fade px-4 pt-4">
      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.8rem] text-ink"><Search className="h-4 w-4 text-slate" aria-hidden />emergency plumber near me</div>
      <div className="mt-4 rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
        <p className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-royal-200"><Bot className="h-3.5 w-3.5" aria-hidden /> AI answer</p>
        <p className="mt-1.5 text-[0.78rem] leading-relaxed text-white/90">For a burst pipe tonight, <span className="rounded bg-gold/25 px-1 font-semibold text-gold-300">Your Plumbing Co.</span> handles emergency calls in your area and is well reviewed...</p>
      </div>
      <p className="mt-4 text-[0.75rem] font-semibold text-white/90">Places</p>
      {["Your Plumbing Co.", "Other Plumbing", "Another Rooter"].map((n, i) => (
        <div key={n} className={`mt-2 flex items-center gap-3 rounded-xl p-3 ${i === 0 ? "bg-gold/15 ring-1 ring-gold/40" : "bg-white/[0.05]"}`}>
          <MapPin className={`h-4.5 w-4.5 ${i === 0 ? "text-gold" : "text-white/90"}`} aria-hidden />
          <div className="min-w-0 flex-1"><p className={`truncate text-[0.82rem] font-semibold ${i === 0 ? "text-white" : "text-white/90"}`}>{n}</p><p className="text-[0.75rem] text-white/90">Plumber · Nearby</p></div>
          {i === 0 && <Phone className="h-4 w-4 text-gold" aria-hidden />}
        </div>
      ))}
    </div>
  );
}

function ScreenTrusted() {
  return (
    <div className="enter-fade px-4 pt-4">
      <div className="rounded-xl bg-royal p-4">
        <p className="text-[0.75rem] font-semibold text-gold">YOUR PLUMBING CO.</p>
        <p className="mt-1 font-display text-xl leading-tight font-bold">Fast, honest plumbing in Cary & Raleigh</p>
        <div className="mt-3 flex gap-0.5 text-gold" aria-label="Your Google rating">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />)}</div>
        <div className="mt-3 rounded-full bg-ribbon py-2 text-center text-[0.78rem] font-semibold">Call now</div>
      </div>
      <ul className="mt-3 space-y-2 text-[0.78rem]">
        {["Reviews from your neighbors", "Real photos of our team", "Clear service areas", "Call or text, your choice"].map((t) => (
          <li key={t} className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2.5"><ShieldCheck className="h-4 w-4 text-gold" aria-hidden />{t}</li>
        ))}
      </ul>
    </div>
  );
}

function ScreenBooked() {
  return (
    <div className="enter-fade flex h-full flex-col items-center px-6 pt-14 text-center">
      <span className="enter-pulse grid h-20 w-20 place-items-center rounded-full bg-ribbon shadow-[0_0_0_10px_rgb(200_55_45/0.2),0_0_0_22px_rgb(200_55_45/0.1)]">
        <PhoneCall className="h-9 w-9" aria-hidden />
      </span>
      <p className="mt-8 text-[0.75rem] font-semibold text-white/90">Incoming call · from your website</p>
      <p className="mt-1 font-display text-2xl font-bold">New customer</p>
      <p className="text-[0.82rem] text-white/90">Water heater leaking · Apex, NC</p>
      <div className="mt-auto mb-8 flex w-full gap-3">
        <span className="flex-1 rounded-full bg-white/10 py-3 text-[0.8rem]">Decline</span>
        <span className="flex-1 rounded-full bg-[#1d7a3c] py-3 text-[0.8rem] font-semibold">Accept</span>
      </div>
    </div>
  );
}

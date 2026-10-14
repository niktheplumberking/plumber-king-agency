"use client";
import Link from "@/components/Link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "../Reveal";

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Counts from the previous amount to the new one over 0.6 s (instant under reduced motion). */
function AnimatedMoney({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { from.current = value; setShown(value); return; }
    const t0 = performance.now();
    let id = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 600);
      const v = Math.round(start + (value - start) * (1 - Math.pow(1 - k, 4)));
      from.current = v;
      setShown(v);
      if (k < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [value]);
  return <>{money(shown)}</>;
}

/** "What is one extra job a week worth?" Uses only the visitor's own numbers; no promised results. */
export function JobValueCalculator() {
  const [ticket, setTicket] = useState(450);
  const [jobs, setJobs] = useState(3);
  // The starting values are only an example: they carry a visible SAMPLE tag until the visitor sets their own.
  const [touched, setTouched] = useState(false);
  // The leading space keeps "SAMPLE" a separate word next to the number (screen readers and the factory claims check read it).
  const tag = touched ? null : <>{" "}<span className="ml-1 rounded bg-white/15 px-1.5 py-0.5 align-middle font-sans text-xs font-semibold text-white/90">SAMPLE</span></>;
  const ids = { t: useId(), j: useId() };
  const yearly = ticket * jobs * 52;
  return (
    <section className="bg-paper py-24 md:py-32" aria-labelledby="calc-h">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="kicker">04 — Do the math</p>
          <h2 id="calc-h" className="display mt-5 text-[clamp(2.4rem,1.4rem+4vw,5.2rem)]">What are a few extra jobs <span className="accent">worth to you?</span></h2>
          <p className="mt-5 max-w-lg text-lg text-slate">Move the sliders to your own numbers. This isn&apos;t a promise of results. It shows what&apos;s at stake when your website sends calls to someone else.</p>
        </Reveal>
        <Reveal delay={0.1} className="on-blue blueprint rounded-md border-2 border-ink p-7 text-white shadow-[8px_8px_0_var(--color-ink)] md:p-10">
          <div className="space-y-8">
            <div>
              <div className="flex items-baseline justify-between gap-4"><label htmlFor={ids.t} className="font-semibold">Your average job value</label><output htmlFor={ids.t} className="font-display text-2xl font-bold text-white">{money(ticket)}{tag}</output></div>
              <input id={ids.t} type="range" min={100} max={3000} step={50} value={ticket} onChange={(e) => { setTicket(+e.target.value); setTouched(true); }} className="mt-4 h-11 w-full cursor-pointer accent-[#ffffff]" />
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-4"><label htmlFor={ids.j} className="font-semibold">Extra booked jobs per week</label><output htmlFor={ids.j} className="font-display text-2xl font-bold text-white">{jobs}{tag}</output></div>
              <input id={ids.j} type="range" min={1} max={20} step={1} value={jobs} onChange={(e) => { setJobs(+e.target.value); setTouched(true); }} className="mt-4 h-11 w-full cursor-pointer accent-[#ffffff]" />
            </div>
          </div>
          <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
            <div><p className="text-sm text-white/90">Extra revenue per month</p><p className="font-display text-3xl font-extrabold" aria-live="polite"><AnimatedMoney value={Math.round(yearly / 12)} />{tag}</p></div>
            <div><p className="text-sm text-white/90">Extra revenue per year</p><p className="font-display text-4xl font-extrabold text-white" aria-live="polite"><AnimatedMoney value={yearly} />{tag}</p></div>
          </div>
          <Link href="/free-website-audit/" className="btn btn-gold mt-8 w-full">See what your site is missing<ArrowRight className="h-4.5 w-4.5" aria-hidden /></Link>
        </Reveal>
      </div>
    </section>
  );
}

const questions = [
  { q: "Is your phone number at the top of every page on a phone?", fix: "Put your number in the header of every page. On phones, make it a tap-to-call link." },
  { q: "Can a visitor call you with one tap from anywhere on the page?", fix: "Add a sticky call button on mobile that stays visible as people scroll." },
  { q: "Does each main service have its own page?", fix: "Give every money-making job (water heaters, drains, repiping...) its own page. Google ranks pages, not websites." },
  { q: "Do you have pages for the towns you serve?", fix: "Add real, useful pages for your main service areas, not copies with the city name swapped." },
  { q: "Do you show real Google reviews on your site?", fix: "Show your real Google rating and a few recent reviews near the top, linked to the source." },
  { q: "Are there real photos of you, your team or your trucks?", fix: "Swap stock photos for real ones. Homeowners want to see who is coming to their house." },
  { q: "Does your homepage load fast on a phone (about 3 seconds or less)?", fix: "Compress images and cut heavy scripts. Test it free with Google PageSpeed Insights." },
  { q: "Is your Google Business Profile complete and linked to your website?", fix: "Fill in categories, services, service area, hours and photos, and link it to your site." },
];

/** 60-second website check: yes/no questions, a score and the fixes that matter. */
export function WebsiteGrader() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => questions.map(() => null));
  const step = answers.findIndex((a) => a === null);
  const done = step === -1;
  const score = useMemo(() => answers.filter(Boolean).length, [answers]);
  const answer = (v: boolean) => setAnswers((a) => a.map((x, i) => (i === step ? v : x)));
  const reset = () => setAnswers(questions.map(() => null));
  const verdict = score >= 7 ? "Strong foundation. A few tweaks could squeeze more calls out of it." : score >= 4 ? "You're leaving calls on the table. The fixes below are where to start." : "Your website is probably costing you jobs every week. Good news: it's fixable.";

  return (
    <section className="bg-ivory py-24 md:py-32" aria-labelledby="grader-h">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <p className="kicker">05 — Free website check</p>
          <h2 id="grader-h" className="display mt-5 text-[clamp(2.4rem,1.4rem+4vw,5.2rem)]">Is your website costing you jobs? <span className="accent">60 seconds.</span></h2>
          <p className="mt-5 max-w-md text-lg text-slate">Eight yes-or-no questions. You get a score and the exact fixes for anything you answer no to, free, no email needed.</p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-md border-2 border-ink bg-paper p-7 shadow-[8px_8px_0_var(--color-royal)] md:p-10">
          <div className="flex items-center justify-between text-sm font-semibold text-slate">
            <span>{done ? "Your result" : `Question ${step + 1} of ${questions.length}`}</span>
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1.5 rounded px-3 hover:text-ink"><RotateCcw className="h-4 w-4" aria-hidden />Start over</button>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-900/10" aria-hidden>
            <div className="h-full origin-left bg-ribbon transition-transform duration-500" style={{ transform: `scaleX(${(done ? questions.length : step) / questions.length})` }} />
          </div>
          <div className="mt-8 min-h-[16rem]" aria-live="polite">
            {!done ? (
                <div key={step} className="enter-slide">
                  <p className="font-display text-2xl font-extrabold md:text-3xl">{questions[step].q}</p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => answer(true)} className="btn bg-royal text-white shadow-[4px_4px_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--color-ink)]"><Check className="h-5 w-5" aria-hidden />Yes</button>
                    <button type="button" onClick={() => answer(false)} className="btn btn-ghost-dark"><X className="h-5 w-5" aria-hidden />No / not sure</button>
                  </div>
                </div>
              ) : (
                <div key="result" className="enter-fade">
                  <p className="font-display text-6xl font-extrabold">{score}<span className="text-3xl text-slate">/{questions.length}</span></p>
                  <p className="mt-3 text-lg font-semibold">{verdict}</p>
                  {score < questions.length && (
                    <ul className="mt-6 space-y-3">
                      {questions.map((q, i) => answers[i] === false && (
                        <li key={q.q} className="flex gap-3 text-slate"><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ribbon" aria-hidden />{q.fix}</li>
                      ))}
                    </ul>
                  )}
                  <Link href="/free-website-audit/" className="btn btn-primary mt-8">{site.secondaryCta}<ArrowRight className="h-4.5 w-4.5" aria-hidden /></Link>
                </div>
              )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";
import Link from "@/components/Link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Lock, RotateCcw, ShieldCheck, Wrench, X } from "lucide-react";
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
  const tag = touched ? null : <>{" "}<span className="ml-1 align-middle font-sans text-t3 font-semibold text-white/90">SAMPLE</span></>;
  const ids = { t: useId(), j: useId() };
  const yearly = ticket * jobs * 52;
  return (
    <section className="bg-paper py-24 md:py-32" aria-labelledby="calc-h">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 id="calc-h" className="display text-t1">What are a few extra jobs <span className="accent">worth to you?</span></h2>
          <p className="mt-5 max-w-lg text-t3 text-slate">Move the sliders to your own numbers. This isn&apos;t a promise of results. It shows what&apos;s at stake when your website sends calls to someone else.</p>
        </Reveal>
        <Reveal delay={0.1} className="on-blue blueprint rounded-md border-2 border-ink p-7 text-white shadow-[8px_8px_0_var(--color-ink)] md:p-10">
          <div className="space-y-8">
            <div>
              <div className="flex items-baseline justify-between gap-4"><label htmlFor={ids.t} className="font-semibold">Your average job value</label><output htmlFor={ids.t} className="font-display text-t2 font-bold text-white">{money(ticket)}{tag}</output></div>
              <input id={ids.t} type="range" min={100} max={3000} step={50} value={ticket} onChange={(e) => { setTicket(+e.target.value); setTouched(true); }} className="mt-4 h-11 w-full cursor-pointer accent-[var(--color-royal)]" />
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-4"><label htmlFor={ids.j} className="font-semibold">Extra booked jobs per week</label><output htmlFor={ids.j} className="font-display text-t2 font-bold text-white">{jobs}{tag}</output></div>
              <input id={ids.j} type="range" min={1} max={20} step={1} value={jobs} onChange={(e) => { setJobs(+e.target.value); setTouched(true); }} className="mt-4 h-11 w-full cursor-pointer accent-[var(--color-royal)]" />
            </div>
          </div>
          <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
            <div><p className="text-t3 text-white/90">Extra revenue per month</p><p className="font-display text-t2 font-extrabold" aria-live="polite"><AnimatedMoney value={Math.round(yearly / 12)} />{tag}</p></div>
            <div><p className="text-t3 text-white/90">Extra revenue per year</p><p className="font-display text-t2 font-extrabold text-white" aria-live="polite"><AnimatedMoney value={yearly} />{tag}</p></div>
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

/**
 * 60-second website check: yes/no questions, a score and the fixes that matter. Rebuilt 2026-10-17 (Nick: "push
 * harder, maximum conversion"): the left side says why the check can be trusted (free, nothing sent, real fixes);
 * the card has a segmented progress bar, a live score ring, big answer tiles, Bobo reacting, and a result screen
 * with both next steps. Patterns from the 21st.dev "Questionnaire" (uiable) one-question-at-a-time flow.
 */
export function WebsiteGrader() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => questions.map(() => null));
  const step = answers.findIndex((a) => a === null);
  const done = step === -1;
  const score = useMemo(() => answers.filter(Boolean).length, [answers]);
  const answer = (v: boolean) => setAnswers((a) => a.map((x, i) => (i === step ? v : x)));
  const reset = () => setAnswers(questions.map(() => null));
  const n = questions.length;
  const verdict = score >= 7 ? "Strong foundation. A few tweaks could squeeze more calls out of it." : score >= 4 ? "You're leaving calls on the table. The fixes below are where to start." : "Your website is probably costing you jobs every week. Good news: it's fixable.";

  return (
    <section className="relative overflow-hidden bg-ivory py-24 md:py-32" aria-labelledby="grader-h">
      <div aria-hidden className="hero-dots pointer-events-none absolute bottom-10 left-0 h-72 w-[30%]" />
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <h2 id="grader-h" className="display text-t1">Is your website costing you jobs? <span className="accent">60 seconds.</span></h2>
          <p className="mt-5 max-w-md text-t3 text-slate md:text-t2">Eight yes-or-no questions. You get a score and the exact fixes for anything you answer no to.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[[ShieldCheck, "Free, no email needed"], [Lock, "Nothing is sent anywhere"], [Wrench, "Real fixes, not a pitch"]].map(([Ic, t]) => {
              const I = Ic as typeof Check;
              return <li key={t as string} className="gr-trust"><I className="h-5 w-5" aria-hidden />{t as string}</li>;
            })}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="gr-card">
          {/* Bobo reacts to the visitor's answers: thinking while they go, then cheering or sorry at the result. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={!done ? "/bobo/think.webp" : score >= 6 ? "/bobo/cheer.webp" : "/bobo/sorry.webp"} alt={!done ? "Bobo the duck thinking" : score >= 6 ? "Bobo the duck cheering" : "Bobo the duck looking worried"} width={120} height={120} className="pointer-events-none absolute -top-[4.5rem] right-4 h-24 w-24 md:-top-24 md:h-28 md:w-28" />
          <div className="flex items-center justify-between gap-4 text-t3 font-semibold text-slate">
            <span>{done ? "Your result" : `Question ${step + 1} of ${n}`}</span>
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1.5 rounded px-3 hover:text-ink"><RotateCcw className="h-4 w-4" aria-hidden />Start over</button>
          </div>
          <ol aria-hidden className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${n},1fr)` }}>
            {answers.map((a, i) => <li key={i} className={`gr-seg ${a === true ? "yes" : a === false ? "no" : i === step ? "now" : ""}`} />)}
          </ol>
          <div className="mt-8 grid min-h-[17rem] gap-8 md:grid-cols-[minmax(0,1fr)_auto]" aria-live="polite">
            {!done ? (
              <div key={step} className="enter-slide">
                <p className="font-display text-t2 font-extrabold">{questions[step].q}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={() => answer(true)} className="gr-ans yes"><Check className="h-6 w-6" aria-hidden />Yes</button>
                  <button type="button" onClick={() => answer(false)} className="gr-ans"><X className="h-6 w-6" aria-hidden />No / not sure</button>
                </div>
              </div>
            ) : (
              <div key="result" className="enter-fade">
                <p className="mt-1 text-t3 font-semibold">{verdict}</p>
                {score < n && (
                  <ul className="mt-6 space-y-3">
                    {questions.map((q, i) => answers[i] === false && (
                      <li key={q.q} className="gr-fix"><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ribbon-deep" aria-hidden />{q.fix}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/free-website-audit/" className="btn btn-primary">{site.secondaryCta}<ArrowRight className="h-4.5 w-4.5" aria-hidden /></Link>
                </div>
              </div>
            )}
            {/* Live score ring: fills as "yes" answers add up. */}
            <div className="gr-ring order-first md:order-none" role="img" aria-label={`Score so far: ${score} of ${n}`}>
              <svg viewBox="0 0 64 64" aria-hidden><circle cx="32" cy="32" r="27" /><circle cx="32" cy="32" r="27" className="fill" style={{ strokeDashoffset: 169.6 * (1 - score / n) }} /></svg>
              <p><b className="font-display">{score}</b><span>/{n}</span></p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";
import { ArrowRight, X } from "lucide-react";
import { ctaHref } from "@/content/site";
import { BoboModel } from "./BoboModel";

/** Bobo's open panel: the question, the paths and the live 3D Bobo. Loaded only when a visitor opens Bobo, so pages never pay for it. */
export type Goal = "calls" | "site" | "look";
type Action = { label: string; href: string };

const goals: { id: Goal; label: string }[] = [
  { id: "calls", label: "I need more calls" },
  { id: "site", label: "I need a new website" },
  { id: "look", label: "Just looking around" },
];

const forGoal: Record<Goal, { say: string; actions: Action[] }> = {
  calls: {
    say: "Let's find where your calls are leaking. Start with the 60-second check, then see what extra jobs are worth to you.",
    actions: [{ label: "Take the 60-second check", href: "/#grader-h" }, { label: "Do the math", href: "/#calc-h" }, { label: "Book a free call", href: ctaHref }],
  },
  site: {
    say: "Good call. Here's what a Plumber King website includes and how we build it, step by step.",
    actions: [{ label: "Website design for plumbers", href: "/services/plumber-website-design/" }, { label: "See the 5 steps", href: "/process/" }, { label: "Book a free call", href: ctaHref }],
  },
  look: {
    say: "Take your time. These free guides are a good place to start, and the audit costs nothing.",
    actions: [{ label: "Free guides", href: "/resources/" }, { label: "Get a free website audit", href: "/free-website-audit/" }],
  },
};


export function BoboPanel({ goal, choose, setGoal, close, hide }: { goal: Goal | null; choose: (g: Goal) => void; setGoal: (g: Goal | null) => void; close: () => void; hide: () => void }) {
  const plan = goal ? forGoal[goal] : null;
  return (
        <div role="dialog" aria-label="Bobo, your guide" className="bobo-pop relative w-[min(22rem,calc(100vw-2rem))] rounded-md border-2 border-ink bg-paper p-5 text-ink shadow-[6px_6px_0_var(--color-ink)]">
          <button type="button" onClick={close} aria-label="Close" className="absolute top-2 right-2 grid h-9 w-9 place-items-center rounded-md hover:bg-ink/5"><X className="h-4 w-4" /></button>
          <div className="flex items-end gap-3">
            <BoboModel poster={plan ? "/bobo/point.webp" : "/bobo/wave.webp"} className="-mt-16 -ml-3 w-28 shrink-0" />
            <p className="display pb-1 text-t3">{plan ? "Here's your path" : "Hi, I'm Bobo!"}</p>
          </div>
          {!plan ? (
            <>
              <p className="mt-3 text-t3 text-slate">I&apos;m the Plumber King duck. What brings you here today?</p>
              <div className="mt-4 grid gap-2">
                {goals.map((g) => (
                  <button key={g.id} type="button" onClick={() => choose(g.id)} className="rounded-md border-2 border-ink/15 px-4 py-3 text-left text-t3 font-semibold transition-colors hover:border-ribbon hover:text-ribbon">{g.label}</button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-t3 text-slate">{plan.say}</p>
              <div className="mt-4 grid gap-2">
                {plan.actions.map((a, i) => {
                  const ext = a.href.startsWith("http");
                  return (
                    <a key={a.label} href={a.href} {...(ext ? { target: "_blank", rel: "noopener" } : {})} onClick={close}
                      className={`flex items-center justify-between rounded-md px-4 py-3 text-t3 font-semibold ${i === plan.actions.length - 1 && ext ? "bg-ribbon text-ink" : "border-2 border-ink/15 hover:border-ribbon hover:text-ribbon"}`}>
                      {a.label}<ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  );
                })}
              </div>
              <button type="button" onClick={() => setGoal(null)} className="mt-3 text-t3 text-slate underline underline-offset-2">Change my answer</button>
            </>
          )}
          <button type="button" onClick={hide} className="mt-4 block text-t3 text-slate hover:text-ink">Hide Bobo</button>
        </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { ctaHref } from "@/content/site";

/**
 * Bobo, the Plumber King duck: a small guide in the corner. Each page gets one short tip (shown once per page per
 * visit), and the panel asks what the visitor is here for, then points them to the next useful thing. It is
 * scripted help, not a chatbot, so it never says anything we have not written. The choice is kept in this browser
 * only (localStorage); nothing is sent anywhere.
 */
type Goal = "calls" | "site" | "look";
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

function tipFor(path: string): string | null {
  if (path === "/") return "Hi, I'm Bobo! Want to see how many jobs your website might be missing? Tap me.";
  if (path.startsWith("/services")) return "Not sure what you need? Most plumbers start with the website, then local SEO.";
  if (path.startsWith("/process")) return "Five steps, no guesswork. You always know what happens next.";
  if (path.startsWith("/about")) return "That's Nick, my boss. He only works with plumbers.";
  if (path.startsWith("/resources")) return "Grab a guide. The website checklist takes about 5 minutes.";
  if (path.startsWith("/free-website-audit")) return "Fill this in and we'll check your website for free.";
  if (path.startsWith("/contact")) return "Rather talk? Book a call. Rather write? Use the form.";
  if (path.startsWith("/faq")) return "Can't find your answer? Ask Nick on a free call.";
  return null;
}

const read = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* storage blocked: Bobo still works for this page */ } };
const seen = (k: string) => { try { if (sessionStorage.getItem(k)) return true; sessionStorage.setItem(k, "1"); } catch { /* ignore */ } return false; };

export function Bobo() {
  const path = usePathname() || "/";
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [tip, setTip] = useState<string | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    setHidden(read("pk-bobo-hidden") === "1");
    const g = read("pk-bobo-goal");
    if (g === "calls" || g === "site" || g === "look") setGoal(g);
    setReady(true);
  }, []);

  // One tip per page per visit.
  useEffect(() => {
    setTip(null); setOpen(false);
    const t = tipFor(path);
    if (!t || seen("pk-bobo-tip:" + path)) return;
    // Wait until the visitor scrolls a little, so the tip never covers the headline they are reading.
    let id = 0;
    const on = () => {
      if (window.scrollY < window.innerHeight * 0.6) return;
      window.removeEventListener("scroll", on);
      id = window.setTimeout(() => setTip(t), 1200);
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); clearTimeout(id); };
  }, [path]);

  // A tip is a nudge, not a banner: it tucks itself away after a few seconds.
  useEffect(() => {
    if (!tip) return;
    const id = window.setTimeout(() => setTip(null), 8000);
    return () => clearTimeout(id);
  }, [tip]);

  if (!ready || hidden || path.startsWith("/privacy") || path.startsWith("/terms")) return null;

  const choose = (g: Goal) => { setGoal(g); write("pk-bobo-goal", g); };
  const hide = () => { setHidden(true); write("pk-bobo-hidden", "1"); };
  const plan = goal ? forGoal[goal] : null;

  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {open && (
        <div role="dialog" aria-label="Bobo, your guide" className="bobo-pop relative w-[min(22rem,calc(100vw-2rem))] rounded-md border-2 border-ink bg-paper p-5 text-ink shadow-[6px_6px_0_var(--color-ink)]">
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute top-2 right-2 grid h-9 w-9 place-items-center rounded-md hover:bg-ink/5"><X className="h-4 w-4" /></button>
          <div className="flex items-end gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={plan ? "/bobo/point.webp" : "/bobo/wave.webp"} alt="" width={88} height={88} className="-mt-12 -ml-2 h-[5.5rem] w-[5.5rem] shrink-0" />
            <p className="display pb-1 text-lg">{plan ? "Here's your path" : "Hi, I'm Bobo!"}</p>
          </div>
          {!plan ? (
            <>
              <p className="mt-3 text-[0.95rem] text-slate">I&apos;m the Plumber King duck. What brings you here today?</p>
              <div className="mt-4 grid gap-2">
                {goals.map((g) => (
                  <button key={g.id} type="button" onClick={() => choose(g.id)} className="rounded-md border-2 border-ink/15 px-4 py-3 text-left text-[0.95rem] font-semibold transition-colors hover:border-ribbon hover:text-ribbon">{g.label}</button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-[0.95rem] text-slate">{plan.say}</p>
              <div className="mt-4 grid gap-2">
                {plan.actions.map((a, i) => {
                  const ext = a.href.startsWith("http");
                  return (
                    <a key={a.label} href={a.href} {...(ext ? { target: "_blank", rel: "noopener" } : {})} onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-md px-4 py-3 text-[0.95rem] font-semibold ${i === plan.actions.length - 1 && ext ? "bg-ribbon text-ink" : "border-2 border-ink/15 hover:border-ribbon hover:text-ribbon"}`}>
                      {a.label}<ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  );
                })}
              </div>
              <button type="button" onClick={() => setGoal(null)} className="mt-3 text-sm text-slate underline underline-offset-2">Change my answer</button>
            </>
          )}
          <button type="button" onClick={hide} className="mt-4 block text-xs text-slate hover:text-ink">Hide Bobo</button>
        </div>
      )}

      {tip && !open && (
        <div className="bobo-pop relative max-w-[16rem] rounded-md border-2 border-ink bg-paper py-3 pr-9 pl-4 text-[0.9rem] font-semibold text-ink shadow-[4px_4px_0_var(--color-ink)]">
          <button type="button" onClick={() => setOpen(true)} className="text-left">{tip}</button>
          <button type="button" onClick={() => setTip(null)} aria-label="Dismiss tip" className="absolute top-1.5 right-1.5 grid h-7 w-7 place-items-center rounded hover:bg-ink/5"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      <button type="button" onClick={() => { setOpen((o) => !o); setTip(null); }} aria-expanded={open} aria-label={open ? "Close Bobo" : "Open Bobo, your guide"}
        className="bobo-btn grid h-16 w-16 place-items-center overflow-hidden rounded-xl border-2 border-ink bg-sky shadow-[4px_4px_0_var(--color-ink)] transition-transform hover:-rotate-6 active:translate-x-0.5 active:translate-y-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bobo/head.webp" alt="" width={64} height={64} className="h-full w-full object-cover" />
      </button>
    </div>
  );
}

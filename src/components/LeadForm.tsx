"use client";
import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/content/site";

type Kind = "strategy-call" | "website-audit";

/**
 * Short form (fewer fields, more leads). POSTs JSON to site.formEndpoint (default /lead.php on Hostinger, which emails
 * the lead to support@bennettndco.com). If sending fails, the visitor is shown the email address instead, so a lead
 * is never silently lost.
 */
export function LeadForm({ kind = "strategy-call", tone = "dark" }: { kind?: Kind; tone?: "dark" | "light" }) {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const dark = tone === "dark";
  const field = `mt-2 block min-h-12 w-full rounded-xl border px-4 py-3 text-base outline-none transition-colors focus:border-gold ${dark ? "border-white/15 bg-white/[0.06] text-white placeholder:text-white/45" : "border-navy-900/15 bg-white text-ink placeholder:text-slate/70"}`;
  const label = `text-sm font-semibold ${dark ? "text-white/90" : "text-ink"}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_website_hp")) return; // honeypot: bots fill hidden fields
    const data = Object.fromEntries(fd.entries());
    delete (data as Record<string, unknown>).company_website_hp;
    const payload = { ...data, kind, page: window.location.pathname, submittedAt: new Date().toISOString() };
    if (!site.formEndpoint) {
      const body = Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(kind === "website-audit" ? "Free website audit request" : "Strategy call request")}&body=${encodeURIComponent(body)}`;
      setState("sent");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(site.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      setState(res.ok && json?.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className={`rounded-3xl p-8 ${dark ? "bg-white/[0.06] text-white" : "bg-ivory"}`}>
        <CheckCircle2 className="h-10 w-10 text-gold" aria-hidden />
        <p className="mt-4 font-display text-2xl font-bold">Got it. Nick will be in touch.</p>
        <p className={`mt-2 ${dark ? "text-white/75" : "text-slate"}`}>Nick reads and replies to every request personally.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <div><label htmlFor={`${id}-name`} className={label}>Your name</label><input id={`${id}-name`} name="name" required autoComplete="name" className={field} placeholder="Mike Johnson" /></div>
      <div><label htmlFor={`${id}-co`} className={label}>Business name</label><input id={`${id}-co`} name="business" required autoComplete="organization" className={field} placeholder="Johnson Plumbing" /></div>
      <div><label htmlFor={`${id}-email`} className={label}>Email</label><input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={field} placeholder="mike@johnsonplumbing.com" /></div>
      <div><label htmlFor={`${id}-phone`} className={label}>Phone</label><input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" className={field} placeholder="(555) 555-0123" /></div>
      <div className="sm:col-span-2"><label htmlFor={`${id}-site`} className={label}>{kind === "website-audit" ? "Your current website" : "Current website (if you have one)"}</label><input id={`${id}-site`} name="website" type="text" inputMode="url" required={kind === "website-audit"} className={field} placeholder="johnsonplumbing.com" /></div>
      <div aria-hidden className="absolute -left-[9999px]"><label htmlFor={`${id}-hp`}>Leave empty</label><input id={`${id}-hp`} name="company_website_hp" tabIndex={-1} autoComplete="off" /></div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full sm:w-auto">
          {state === "sending" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
          {kind === "website-audit" ? site.secondaryCta : site.primaryCta}
          <ArrowRight className="h-4.5 w-4.5" aria-hidden />
        </button>
        {state === "error" && <p role="alert" className="mt-3 text-sm font-semibold text-ribbon">That didn&apos;t send. Please email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> and we&apos;ll get right back to you.</p>}
        <p className={`mt-4 text-sm ${dark ? "text-white/65" : "text-slate"}`}>No commitment, no hard sell. By sending this you agree to our <a href="/privacy-policy/" className="underline">Privacy Policy</a>.</p>
      </div>
    </form>
  );
}

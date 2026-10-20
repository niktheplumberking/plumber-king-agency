"use client";
import { useId, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { site } from "@/content/site";

type Kind = "strategy-call" | "website-audit";

/**
 * Short two-step form (2026-10-17, Nick: "as easy as possible to take the next step"): step 1 asks only for a name and a
 * phone number, step 2 for the business, email and website. Splitting it keeps the first ask tiny, which is the
 * pattern the 21st.dev "Multi-Step Form" (ravikatiyar162) is built on. The server still gets every field it needs.
 * Fewer fields per screen, more leads. POSTs JSON to site.formEndpoint (default /lead.php on Hostinger, which emails
 * the lead to nick@plumberkingagency.com). If sending fails, the visitor is shown the email address instead, so a lead
 * is never silently lost.
 * Nick 2026-10-20: on step 1 the name box is as wide as the "Next" button under it, and the room that frees holds a
 * country box (US +1 by default, Canada +1 too) in front of the phone. The code is added to the phone number sent.
 */
const COUNTRIES = [
  { v: "US", label: "United States +1", code: "+1" },
  { v: "CA", label: "Canada +1", code: "+1" },
] as const;

/** Small flag drawn inline, so it shows on every system (Windows does not draw flag emoji). */
function Flag({ c }: { c: "US" | "CA" }) {
  if (c === "CA")
    return (
      <svg viewBox="0 0 30 20" className="lf-flag" aria-hidden>
        <rect width="30" height="20" fill="#fff" />
        <rect width="7.5" height="20" fill="#d52b1e" />
        <rect x="22.5" width="7.5" height="20" fill="#d52b1e" />
        <path fill="#d52b1e" d="M15 4.2l1 1.9 1.3-.5-.4 3 1.6-1.5.4 1.1 1.7-.3-.6 1.8.8.4-2.9 2.3.3 1.1-2.8-.4.1 2.7h-1l.1-2.7-2.8.4.3-1.1-2.9-2.3.8-.4-.6-1.8 1.7.3.4-1.1 1.6 1.5-.4-3 1.3.5z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 30 20" className="lf-flag" aria-hidden>
      <rect width="30" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#b22234" />)}
      <rect width="13" height={(7 * 20) / 13} fill="#3c3b6e" />
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((k) => <circle key={`${r}-${k}`} cx={1.6 + k * 2.45} cy={1.5 + r * 2.6} r="0.55" fill="#fff" />))}
    </svg>
  );
}
/** What is missing or wrong, per field name, in plain words a plumber can act on. */
function check(fd: FormData, kind: Kind) {
  const v = (k: string) => String(fd.get(k) ?? "").trim();
  const e: Record<string, string> = {};
  if (!v("name")) e.name = "Please enter your name.";
  if (!v("business")) e.business = "Please enter your business name.";
  if (!v("email")) e.email = "Please enter your email so Nick can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = "That email looks incomplete. Check it has an @ and a domain, like mike@johnsonplumbing.com.";
  if (v("phone").replace(/\D/g, "").length < 7) e.phone = v("phone") ? "That phone number looks too short. Include the area code." : "Please enter a phone number.";
  if (kind === "website-audit" && !v("website")) e.website = "Please enter your website address so Nick can audit it.";
  return e;
}

export function LeadForm({ kind = "strategy-call", tone = "dark" }: { kind?: Kind; tone?: "dark" | "light" }) {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<1 | 2>(1);
  const [country, setCountry] = useState<"US" | "CA">("US");
  const dark = tone === "dark";
  const field = `mt-2 block min-h-12 w-full rounded-md border-2 px-4 py-3 text-t3 outline-none transition-colors focus:border-ribbon ${dark ? "aria-[invalid=true]:border-white border-white/30 bg-white/10 text-white placeholder:text-white/75" : "aria-[invalid=true]:border-ribbon-deep border-ink/20 bg-white text-ink placeholder:text-slate/70"}`;
  const err = `mt-2 text-t3 font-semibold ${dark ? "text-white" : "text-ribbon-deep"}`;
  const label = `text-t3 font-extrabold tracking-wider uppercase ${dark ? "text-white/90" : "text-ink"}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("company_website_hp")) return; // honeypot: bots fill hidden fields
    // Our own inline errors (not the browser's pop-ups): each one sits under its field and is tied to it for screen readers.
    const all = check(fd, kind);
    // Step 1 checks only its own two fields, then moves on to step 2.
    const found = stage === 1 ? Object.fromEntries(Object.entries(all).filter(([k]) => k === "name" || k === "phone")) : all;
    setErrors(found);
    const first = Object.keys(found)[0];
    const focus = (k: string) => setTimeout(() => (form.elements.namedItem(k) as HTMLElement | null)?.focus(), 0);
    if (first) { if (first === "name" || first === "phone") setStage(1); focus(first); return; }
    if (stage === 1) { setStage(2); focus("business"); return; }
    const data = Object.fromEntries(fd.entries()) as Record<string, unknown>;
    delete data.company_website_hp;
    // The server keeps a fixed set of fields, so the country rides along inside the phone number.
    const cc = COUNTRIES.find((c) => c.v === data.country) ?? COUNTRIES[0];
    data.phone = `${cc.code} ${String(data.phone ?? "").trim()} (${cc.v})`;
    delete data.country;
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
      <div role="status" className={`rounded-md border-2 border-ink p-8 ${dark ? "bg-white/[0.06] text-white" : "bg-ivory"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bobo/cheer.webp" alt="Bobo the duck cheering" width={96} height={96} className="h-24 w-24" />
        <p className="mt-4 font-display text-t2 font-bold">Got it. Nick will be in touch.</p>
        <p className={`mt-2 ${dark ? "text-white/90" : "text-slate"}`}>Nick reads and replies to every request personally.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-5 ${stage === 1 ? "lf-s1" : "sm:grid-cols-2"}`} noValidate>
      <div className="col-span-full flex items-center gap-3" aria-live="polite">
        <span className={`text-t3 font-bold ${dark ? "text-white" : "text-ink"}`}>Step {stage} of 2</span>
        <span aria-hidden className="lf-bar"><span style={{ transform: `scaleX(${stage / 2})` }} /></span>
      </div>
      <div hidden={stage !== 1} className="contents">
      <div className="lf-name min-w-0"><label htmlFor={`${id}-name`} className={label}>Your name</label><input id={`${id}-name`} name="name" required autoComplete="name" size={8} className={`${field} min-w-0`} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? `${id}-name-err` : undefined} placeholder="Mike Johnson" />{errors.name && <p id={`${id}-name-err`} className={err}>{errors.name}</p>}</div>
      <div className="min-w-0"><label htmlFor={`${id}-cc`} className={label}>Country</label>
        <div className={`lf-cc mt-2 ${dark ? "lf-cc-dark" : ""}`}>
          <Flag c={country} />
          <select id={`${id}-cc`} name="country" value={country} onChange={(e) => setCountry(e.target.value as "US" | "CA")} autoComplete="country" className={`lf-cc-sel ${dark ? "text-white" : "text-ink"}`} aria-label="Country code">
            {COUNTRIES.map((c) => <option key={c.v} value={c.v}>{c.code}</option>)}
          </select>
        </div>
      </div>
      <div className="min-w-0"><label htmlFor={`${id}-phone`} className={label}>Phone</label><input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" className={field} aria-invalid={errors.phone ? true : undefined} aria-describedby={errors.phone ? `${id}-phone-err` : undefined} placeholder="(555) 555-0123" />{errors.phone && <p id={`${id}-phone-err`} className={err}>{errors.phone}</p>}</div>
      </div>
      <div hidden={stage !== 2} className="contents">
      <div><label htmlFor={`${id}-co`} className={label}>Business name</label><input id={`${id}-co`} name="business" required autoComplete="organization" className={field} aria-invalid={errors.business ? true : undefined} aria-describedby={errors.business ? `${id}-business-err` : undefined} placeholder="Johnson Plumbing" />{errors.business && <p id={`${id}-business-err`} className={err}>{errors.business}</p>}</div>
      <div><label htmlFor={`${id}-email`} className={label}>Email</label><input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={field} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? `${id}-email-err` : undefined} placeholder="mike@johnsonplumbing.com" />{errors.email && <p id={`${id}-email-err`} className={err}>{errors.email}</p>}</div>
      <div className="sm:col-span-2"><label htmlFor={`${id}-site`} className={label}>{kind === "website-audit" ? "Your current website" : "Current website (if you have one)"}</label><input id={`${id}-site`} name="website" type="text" inputMode="url" required={kind === "website-audit"} className={field} aria-invalid={errors.website ? true : undefined} aria-describedby={errors.website ? `${id}-website-err` : undefined} placeholder="johnsonplumbing.com" />{errors.website && <p id={`${id}-website-err`} className={err}>{errors.website}</p>}</div>
      </div>
      <div aria-hidden className="absolute -left-[9999px]"><label htmlFor={`${id}-hp`}>Leave empty</label><input id={`${id}-hp`} name="company_website_hp" tabIndex={-1} autoComplete="off" /></div>
      <div className="col-span-full lf-foot">
        <div className="lf-btns flex flex-wrap items-center gap-3">
          {stage === 2 && <button type="button" onClick={() => setStage(1)} className={`min-h-11 px-3 font-bold underline underline-offset-4 ${dark ? "text-white" : "text-ink"}`}>Back</button>}
          <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full sm:w-auto">
            {state === "sending" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
            {stage === 1 ? "Next: your business" : kind === "website-audit" ? site.secondaryCta : site.primaryCta}
            <ArrowRight className="h-4.5 w-4.5" aria-hidden />
          </button>
        </div>
        {state === "error" && <p role="alert" className="mt-3 text-t3 font-semibold text-royal">That didn&apos;t send. Please email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> and we&apos;ll get right back to you.</p>}
        <p className={`mt-4 text-t3 ${dark ? "text-white/90" : "text-slate"}`}>No commitment, no hard sell. By sending this you agree to our <a href="/privacy-policy/" className="underline">Privacy Policy</a>.</p>
      </div>
    </form>
  );
}

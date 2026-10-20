import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { nick } from "@/content/about";
import { LeadForm } from "@/components/LeadForm";
import { WebsiteGrader } from "@/components/home/Interactive";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Free Website Audit for Plumbers",
  description: "Get a free, honest audit of your plumbing website: what's costing you calls, how you compare to local competitors on Google, and what to fix first.",
  path: "/free-website-audit/",
});

const checks = ["Mobile experience: can a homeowner call you in one tap?", "Speed on a phone signal", "Your Google Business Profile and map-pack presence", "Service and city pages: what's missing", "Trust signals: reviews, real photos, credentials, service promises", "How AI search tools see your business"];

export default function AuditPage() {
  return (
    <>
      <PageHero photo={nick.deskBack} crumbs={[{ name: "Free website audit", path: "/free-website-audit/" }]} title={<>Find out what your website is <span className="accent">costing you.</span></>} intro="Send us your site. Nick will review it personally and tell you straight what's holding it back." />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-t2 font-bold">What we look at</h2>
            <ul className="mt-6 space-y-4">{checks.map((c) => (<li key={c} className="flex gap-3 text-t3 text-slate"><Check className="mt-1 h-5 w-5 shrink-0 text-ribbon" aria-hidden />{c}</li>))}</ul>
          </div>
          <div className="rounded-md border-2 border-ink bg-white p-6 md:p-10"><LeadForm kind="website-audit" tone="light" /></div>
        </div>
      </section>
      <WebsiteGrader plain />
    </>
  );
}

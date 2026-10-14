import Link from "@/components/Link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta, serviceLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Marketing Services for Plumbing Companies",
  description: "Plumber website design, local SEO and AI-search visibility, and lead capture that sends every inquiry to your phone. Built for plumbing companies only.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Services", path: "/services/" }]} title={<>Everything a plumbing company needs to <span className="accent">get found, trusted and called.</span></>} intro="Three services that work as one system. Pick one or let us run all of it." />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.slug}>
              <Link href={`/services/${s.slug}/`} className="group grid gap-6 rounded-md border-2 border-ink bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-navy-900/25 hover:shadow-[6px_6px_0_var(--color-royal)] md:grid-cols-[auto_1fr_auto] md:items-center md:p-10">
                <span className="font-display text-5xl font-extrabold text-gold-700">0{i + 1}</span>
                <span>
                  <h2 className="text-3xl font-bold md:text-4xl">{s.name}</h2>
                  <p className="mt-3 max-w-2xl text-lg text-slate">{s.outcome}</p>
                </span>
                <span className="inline-flex items-center gap-2 font-semibold text-royal">Learn more<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCta />
      <JsonLd data={services.map((s) => serviceLd({ name: s.name, description: s.metaDescription, path: `/services/${s.slug}/` }))} />
    </>
  );
}

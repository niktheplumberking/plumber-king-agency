import { notFound } from "next/navigation";
import Link from "@/components/Link";
import { Check } from "lucide-react";
import { serviceBySlug, services } from "@/content/services";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaButton } from "@/components/CtaButton";
import { FaqList } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { faqLd, pageMeta, serviceLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}/` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);
  return (
    <>
      <PageHero crumbs={[{ name: "Services", path: "/services/" }, { name: s.name, path: `/services/${s.slug}/` }]} title={s.name} intro={<p>{s.outcome}</p>}>
        <CtaButton className="mt-9" />
      </PageHero>
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Above the fold on most screens: no scroll reveal, so it paints at once (LCP). */}
          <p className="max-w-[65ch] text-xl leading-relaxed text-ink">{s.intro}</p>
          <div className="rounded-[2rem] bg-ivory p-8">
            <h2 className="text-2xl font-bold">Built for</h2>
            <ul className="mt-5 space-y-3">
              {s.forWho.map((w) => (<li key={w} className="flex gap-3 text-slate"><Check className="mt-1 h-5 w-5 shrink-0 text-ribbon" aria-hidden />{w}</li>))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-ivory py-20 md:py-28" aria-labelledby="inc-h">
        <div className="container-x">
          <h2 id="inc-h" className="max-w-2xl text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] font-extrabold">What&apos;s included</h2>
          <dl className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {s.includes.map((inc, i) => (
              <Reveal key={inc.title} delay={(i % 2) * 0.08} className="border-t-2 border-navy-900 pt-5">
                <dt className="font-display text-2xl font-bold">{inc.title}</dt>
                <dd className="mt-2 text-lg text-slate">{inc.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
      <section className="bg-paper py-20 md:py-28" aria-labelledby="sfaq-h">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="sfaq-h" className="text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] font-extrabold">Questions about {s.name.toLowerCase()}</h2>
            <p className="mt-5 text-lg text-slate">Also see: {others.map((o, i) => (<span key={o.slug}>{i > 0 && " and "}<Link href={`/services/${o.slug}/`} className="inline-block py-1.5 font-semibold text-royal underline underline-offset-4">{o.name}</Link></span>))}.</p>
          </div>
          <FaqList items={s.faqs} />
        </div>
      </section>
      <FinalCta />
      <JsonLd data={[serviceLd({ name: s.name, description: s.metaDescription, path: `/services/${s.slug}/` }), faqLd(s.faqs)]} />
    </>
  );
}

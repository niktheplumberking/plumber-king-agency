import { notFound } from "next/navigation";
import Link from "@/components/Link";
import { guideBySlug, guides } from "@/content/guides";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { CtaButton } from "@/components/CtaButton";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideBySlug((await params).slug);
  if (!g) return {};
  return pageMeta({ title: g.metaTitle, description: g.description, path: `/resources/${g.slug}/`, type: "article" });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();
  const path = `/resources/${g.slug}/`;
  const date = new Date(`${g.published}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <>
      <PageHero crumbs={[{ name: "Guides", path: "/resources/" }, { name: g.title.split(":")[0], path }]} title={g.title}>
        <p className="mt-6 text-white/90">By {site.founder}, {site.name} · <time dateTime={g.published}>{date}</time> · {g.readMinutes} min read</p>
      </PageHero>
      <article className="bg-paper py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div className="prose-pk">
            <aside aria-label="Short answer" className="mb-10 rounded-2xl border-l-4 border-gold bg-ivory p-6">
              <p className="mb-2! text-sm font-bold text-gold-700">The short answer</p>
              <p className="mb-0! text-lg text-ink!">{g.answer}</p>
            </aside>
            {g.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((p, i) => <p key={i}>{p}</p>)}
                {s.list && <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              </section>
            ))}
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="on-blue blueprint rounded-md border-2 border-ink p-6 text-white">
              <p className="font-display text-xl font-bold">Want us to check your site for you?</p>
              <p className="mt-2 text-white/90">Free audit. Straight answers, no hard sell.</p>
              <Link href="/free-website-audit/" className="btn btn-gold mt-5 w-full">Free website audit</Link>
            </div>
            <nav aria-label="More guides" className="mt-6">
              <p className="text-sm font-semibold text-slate">More guides</p>
              <ul className="mt-3 space-y-3">
                {guides.filter((o) => o.slug !== g.slug).map((o) => (<li key={o.slug}><Link href={`/resources/${o.slug}/`} className="inline-block py-1 font-semibold text-royal hover:underline">{o.title.split(":")[0]}</Link></li>))}
              </ul>
            </nav>
          </aside>
        </div>
        <div className="container-x mt-12"><CtaButton /></div>
      </article>
      <FinalCta />
      <JsonLd data={articleLd({ title: g.title, description: g.description, path, published: g.published })} />
    </>
  );
}

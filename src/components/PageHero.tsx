import Link from "@/components/Link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

/** Inner-page header: light band with a blueprint grid edge, visible breadcrumbs (also emitted as BreadcrumbList schema), one H1. */
export function PageHero({ title, intro, crumbs, children }: { title: React.ReactNode; intro?: React.ReactNode; crumbs: { name: string; path: string }[]; children?: React.ReactNode }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-ivory pt-32 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden className="blueprint pointer-events-none absolute inset-y-0 right-0 hidden w-[28%] border-l-2 border-ink lg:block" />
      <div className="container-x relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                {i < all.length - 1 ? <Link href={c.path} className="inline-block py-1.5 hover:text-ink">{c.name}</Link> : <span aria-current="page" className="font-semibold text-ink">{c.name}</span>}
                {i < all.length - 1 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="display mt-6 max-w-4xl text-[clamp(2.6rem,1.6rem+4.4vw,5.8rem)] lg:max-w-[64%]">{title}</h1>
        {intro && <div className="mt-6 max-w-2xl text-lg text-slate md:text-xl">{intro}</div>}
        {children}
      </div>
      <JsonLd data={breadcrumbLd(all)} />
    </section>
  );
}

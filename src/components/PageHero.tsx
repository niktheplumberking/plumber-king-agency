import Link from "@/components/Link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { CrownMark } from "./CrownMark";

/** Inner-page header: dark band, visible breadcrumbs (also emitted as BreadcrumbList schema), one H1. */
export function PageHero({ title, intro, crumbs, children }: { title: React.ReactNode; intro?: React.ReactNode; crumbs: { name: string; path: string }[]; children?: React.ReactNode }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="grain relative overflow-hidden bg-navy-950 pt-32 pb-16 text-white md:pt-40 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-48 right-[-15%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(245_191_60/0.16),transparent)]" />
      <CrownMark className="pointer-events-none absolute top-28 right-[6%] hidden h-56 w-72 text-gold/[0.06] md:block" />
      <div className="container-x relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                {i < all.length - 1 ? <Link href={c.path} className="inline-block py-1.5 hover:text-white">{c.name}</Link> : <span aria-current="page" className="text-white">{c.name}</span>}
                {i < all.length - 1 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,1.6rem+3.6vw,4.8rem)] font-extrabold">{title}</h1>
        {intro && <div className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">{intro}</div>}
        {children}
      </div>
      <JsonLd data={breadcrumbLd(all)} />
    </section>
  );
}

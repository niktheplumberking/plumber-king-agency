import Link from "@/components/Link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { nickSrc, nickSrcSet, type NickPhoto } from "@/content/about";

/** Inner-page header: light band with a blueprint grid edge (or, with `photo`, one of Nick's photos in that strip), visible breadcrumbs (also emitted as BreadcrumbList schema), one H1. */
export function PageHero({ title, intro, crumbs, children, photo }: { title: React.ReactNode; intro?: React.ReactNode; crumbs: { name: string; path: string }[]; children?: React.ReactNode; photo?: NickPhoto }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-ivory pt-32 pb-16 md:pt-40 md:pb-24">
      {!photo && <div aria-hidden className="blueprint pointer-events-none absolute inset-y-0 right-0 hidden w-[28%] border-l-2 border-ink lg:block" />}
      <div className="container-x relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 overflow-hidden text-t3 whitespace-nowrap text-slate">
            {all.map((c, i) => (
              <li key={c.path} className="flex min-w-0 items-center gap-1.5 last:shrink">
                {i < all.length - 1 ? <Link href={c.path} className="tap inline-block py-1.5 hover:text-ink">{c.name}</Link> : <span aria-current="page" className="truncate font-semibold text-ink">{c.name}</span>}
                {i < all.length - 1 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="display mt-6 max-w-4xl text-t1 lg:max-w-[64%]">{title}</h1>
        {intro && <div className="mt-6 max-w-2xl text-t3 text-slate md:text-t2">{intro}</div>}
        {children}
      </div>
      {/* One image for both layouts: under the intro on phones, the right-hand strip on desktop (the wrapper drops out). */}
      {photo && (
        <div className="container-x mt-10 lg:mt-0 lg:contents">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={nickSrc(photo)} srcSet={nickSrcSet(photo)} sizes="(min-width: 1024px) 28vw, 92vw" alt={photo.alt} width={photo.w} height={photo.h} decoding="async" className="aspect-[4/3] w-full rounded-[1.25rem] border-2 border-ink object-cover lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:h-full lg:w-[28%] lg:rounded-none lg:border-0 lg:border-l-2" style={{ objectPosition: photo.pos }} />
        </div>
      )}
      <JsonLd data={breadcrumbLd(all)} />
    </section>
  );
}

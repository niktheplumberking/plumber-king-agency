import Link from "@/components/Link";
import { ArrowRight, Clock } from "lucide-react";
import { guides } from "@/content/guides";
import { PageHero } from "@/components/PageHero";
import { nick } from "@/content/about";
import { Reveal } from "@/components/Reveal";
import { FinalCta } from "@/components/FinalCta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Guides for Plumbers: Websites, SEO & AI Search",
  description: "Free, practical guides for plumbers: the website checklist that gets calls, how to show up in AI search, and how to set up your Google Business Profile.",
  path: "/resources/",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero photo={nick.coworkA} crumbs={[{ name: "Guides", path: "/resources/" }]} title={<>Straight-talking guides for <span className="accent">plumbing business owners.</span></>} intro="No fluff. What works online for plumbers, and what to fix first." />
      <section className="bg-paper py-20 md:py-28">
        <ul className="container-x grid gap-6 md:grid-cols-2">
          {guides.map((g, i) => (
            <Reveal as="li" key={g.slug} off={i === 0} delay={(i % 2) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
              <Link href={`/resources/${g.slug}/`} className={`group flex h-full flex-col rounded-md p-8 transition-all duration-300 hover:-translate-y-1 md:p-10 ${i === 0 ? "on-blue blueprint border-2 border-ink text-white" : "border-2 border-ink bg-white hover:shadow-[6px_6px_0_var(--color-royal)]"}`}>
                <h2 className={`font-bold ${i === 0 ? "max-w-3xl text-t2" : "text-t2"}`}>{g.title}</h2>
                <p className={`mt-4 max-w-2xl ${i === 0 ? "text-white/90" : "text-slate"}`}>{g.description}</p>
                <span className={`mt-4 flex items-center gap-2 text-t3 ${i === 0 ? "text-white/90" : "text-slate"}`}><Clock className="h-4 w-4" aria-hidden />{g.readMinutes} min read</span>
                <span className={`mt-auto inline-flex items-center gap-2 pt-6 font-semibold ${i === 0 ? "text-white" : "text-royal"}`}>Read the guide<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}

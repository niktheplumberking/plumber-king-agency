import Link from "@/components/Link";
import { ArrowRight, Clock } from "lucide-react";
import { guides } from "@/content/guides";
import { PageHero } from "@/components/PageHero";
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
      <PageHero crumbs={[{ name: "Guides", path: "/resources/" }]} title={<>Straight-talking guides for <span className="text-gold">plumbing business owners.</span></>} intro="No fluff. What works online for plumbers, and what to fix first." />
      <section className="bg-paper py-20 md:py-28">
        <ul className="container-x grid gap-6 md:grid-cols-2">
          {guides.map((g, i) => (
            <Reveal as="li" key={g.slug} delay={(i % 2) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
              <Link href={`/resources/${g.slug}/`} className={`group flex h-full flex-col rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1 md:p-10 ${i === 0 ? "bg-navy-900 text-white" : "border border-navy-900/10 bg-white hover:shadow-[0_30px_80px_-40px_rgb(12_27_60/0.4)]"}`}>
                <span className={`flex items-center gap-2 text-sm ${i === 0 ? "text-white/70" : "text-slate"}`}><Clock className="h-4 w-4" aria-hidden />{g.readMinutes} min read</span>
                <h2 className={`mt-4 font-bold ${i === 0 ? "max-w-3xl text-3xl md:text-4xl" : "text-2xl"}`}>{g.title}</h2>
                <p className={`mt-4 max-w-2xl ${i === 0 ? "text-white/80" : "text-slate"}`}>{g.description}</p>
                <span className={`mt-auto inline-flex items-center gap-2 pt-6 font-semibold ${i === 0 ? "text-gold" : "text-ribbon"}`}>Read the guide<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}

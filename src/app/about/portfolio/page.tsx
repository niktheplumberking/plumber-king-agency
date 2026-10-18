import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { AboutTabs } from "@/components/AboutTabs";
import { CtaButton } from "@/components/CtaButton";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { founderFull, projects } from "@/content/about";
import { abs, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Nick Bennett Web Design Portfolio",
  description: "Web design portfolio of Nick Bennett: MindXBridge brand and website, CourtHub padel store in Dubai, RIZM Technologies, Health Steps and e-commerce brands.",
  path: "/about/portfolio/",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "About", path: "/about/" }, { name: "Portfolio", path: "/about/portfolio/" }]} title={<>Brands, stores and websites <span className="accent">I have built.</span></>} intro={<p>Before I focused on plumbers, I built for research platforms, sports retailers, app studios and fashion brands. The same work now goes into every plumber website.</p>}>
        <AboutTabs current="work" />
      </PageHero>

      <section className="bg-paper py-20 md:py-28" aria-label="Projects">
        <div className="container-x space-y-10 md:space-y-14">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.id} className={`pf ${p.image ? "pf-img" : ""}`}>
              <span id={p.id} className="absolute -top-28" aria-hidden />
              {p.image && (
                <div className="pf-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image.src} srcSet={`${p.image.small} 600w, ${p.image.src} 1200w`} sizes="(min-width: 1024px) 50vw, 92vw" alt={p.image.alt} width={1200} height={p.image.h} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                </div>
              )}
              <div className="pf-body">
                <p className="xg-num">0{i + 1}</p>
                <h2 className="display text-t1">{p.name}</h2>
                <p className="mt-2 text-t3 font-bold text-ribbon-deep">{p.kind}{p.where ? ` · ${p.where}` : ""}</p>
                <p className="mt-4 max-w-[60ch] text-t3 text-slate">{p.what}</p>
                <ul className="mt-5 space-y-2">
                  {p.did.map((d) => <li key={d} className="flex gap-3 text-t3"><Check className="mt-1 h-5 w-5 shrink-0 text-ribbon" aria-hidden />{d}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
          <p className="text-t3 text-slate">Brand names belong to their owners and are shown to describe work {founderFull} did for them.</p>
          <CtaButton />
        </div>
      </section>

      <FinalCta />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Portfolio of Nick Bennett", url: abs("/about/portfolio/"), about: { "@type": "Person", name: founderFull }, hasPart: projects.map((p) => ({ "@type": "CreativeWork", name: p.name, description: p.what })) }} />
    </>
  );
}

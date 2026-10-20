import { PageHero } from "@/components/PageHero";
import { nick } from "@/content/about";
import { AboutFolders } from "@/components/home/AboutFolders";
import { ProblemSplit } from "@/components/home/Sections";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { pageMeta, personLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Nick, Founder of Plumber King Agency",
  description: "Why Nick started Plumber King Agency: helping hardworking plumbers win the jobs they deserve with websites and marketing that actually bring in calls.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero photo={nick.sketch} crumbs={[{ name: "About Nick", path: "/about/" }]} title={<>Built for plumbers, <span className="accent">by someone in your corner.</span></>} intro={<p>{site.name} is a {site.legalEntity} company serving plumbing businesses across the USA and Canada.</p>} />
      <AboutFolders />
      {site.assets.banner && (
        <section className="bg-paper pb-24" aria-label="The Plumber King crew">
          <div className="container-x">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.assets.banner} alt="Illustration: the Plumber King Agency crew at work, each plumber wearing a gold crown" width={1536} height={1024} loading="lazy" className="w-full rounded-[2rem] shadow-[0_40px_100px_-40px_rgb(12_27_60/0.5)]" />
          </div>
        </section>
      )}
      <ProblemSplit />
      <FinalCta />
      <JsonLd data={personLd()} />
    </>
  );
}

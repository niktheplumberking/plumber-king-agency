import { Hero } from "@/components/home/Hero";
import { StoryScroll } from "@/components/home/StoryScroll";
import { ProblemSplit } from "@/components/home/Sections";
import { JobsMarquee, ProcessTimeline, SystemBento } from "@/components/home/Showcase";
import { JobValueCalculator, WebsiteGrader } from "@/components/home/Interactive";
import { Founder } from "@/components/home/Founder";
import { Proof } from "@/components/home/Proof";
import { FaqList } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/content/faq";
import { faqLd, pageMeta, personLd } from "@/lib/seo";
import Link from "@/components/Link";

export const metadata = pageMeta({
  title: "Plumber King Agency | Websites & SEO That Keep Plumbers Booked",
  description: "Websites, local SEO and AI-search visibility for plumbing companies in the USA and Canada. Get found, get trusted, get the call. Book a free strategy call.",
  path: "/",
  noTitleSuffix: true,
});

export default function Home() {
  const homeFaqs = faqs.slice(0, 4);
  return (
    <>
      <Hero />
      <JobsMarquee />
      <StoryScroll />
      <ProblemSplit />
      <SystemBento />
      <JobValueCalculator />
      <Founder />
      <Proof />
      <ProcessTimeline />
      <WebsiteGrader />
      <section className="bg-paper py-24 md:py-32" aria-labelledby="faq-h">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="kicker">07 — FAQ</p>
            <h2 id="faq-h" className="display mt-5 text-[clamp(2.4rem,1.4rem+4vw,5.2rem)]">Straight <span className="accent">answers.</span></h2>
            <p className="mt-5 max-w-sm text-lg text-slate">The questions plumbers ask us most. More on the <Link href="/faq/" className="font-semibold text-royal underline underline-offset-4">full FAQ page</Link>.</p>
          </Reveal>
          <FaqList items={homeFaqs} />
        </div>
      </section>
      <FinalCta />
      <JsonLd data={[faqLd(homeFaqs), personLd()]} />
    </>
  );
}

import { Hero } from "@/components/home/Hero";
import { StoryScroll } from "@/components/home/StoryScroll";
import { ProblemSplit } from "@/components/home/Sections";
import { JobsMarquee, ProcessTimeline, SystemBento } from "@/components/home/Showcase";
import { Promises } from "@/components/home/Promises";
import { JobValueCalculator, WebsiteGrader } from "@/components/home/Interactive";
import { AboutFolders } from "@/components/home/AboutFolders";
import { Proof } from "@/components/home/Proof";
import { FaqList } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/content/faq";
import { faqLd, pageMeta, personLd } from "@/lib/seo";
import Link from "@/components/Link";
import { CtaButton } from "@/components/CtaButton";

export const metadata = pageMeta({
  title: "Plumber King Agency | Websites & SEO That Keep Plumbers Booked",
  description: "Websites, local SEO and AI-search visibility for plumbing companies in the USA and Canada. Get found, get trusted, get the call. Book a free strategy call.",
  path: "/",
  noTitleSuffix: true,
});

export default function Home() {
  // Home shows the five questions plumbers ask first; the FAQ page has them all.
  const homeFaqs = [0, 1, 9, 11, 2].map((i) => faqs[i]);
  return (
    <>
      <Hero />
      <JobsMarquee />
      <Promises />
      <StoryScroll />
      <ProblemSplit />
      <SystemBento />
      <JobValueCalculator />
      <AboutFolders />
      <Proof />
      <ProcessTimeline />
      <WebsiteGrader />
      {/* FAQ, rebuilt 2026-10-17: a sticky side with Bobo and a "still stuck? ask Nick" card next to the numbered rows. */}
      <section className="relative overflow-hidden bg-paper py-24 md:py-32" aria-labelledby="faq-h">
        <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 aspect-square w-[34rem] rounded-full bg-sky" />
        <div className="container-x relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="faq-h" className="display text-t1">Straight <span className="accent">answers.</span></h2>
            <p className="mt-5 max-w-sm text-t3 text-slate md:text-t2">The questions plumbers ask us most.</p>
            <div className="fq-ask">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bobo/think.webp" alt="Bobo the duck thinking" width={120} height={120} loading="lazy" className="fq-bobo" />
              <p className="display text-t2">Still got a question?</p>
              <p className="mt-2 text-t3 text-slate">Ask Nick on a free call, or read the <Link href="/faq/" className="font-semibold text-ribbon-deep underline underline-offset-4">full FAQ page</Link>.</p>
              <CtaButton className="mt-5" />
            </div>
          </Reveal>
          <FaqList items={homeFaqs} />
        </div>
      </section>
      <FinalCta />
      <JsonLd data={[faqLd(homeFaqs), personLd()]} />
    </>
  );
}

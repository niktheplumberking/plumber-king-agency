import { PageHero } from "@/components/PageHero";
import { nick } from "@/content/about";
import { FaqList } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/content/faq";
import { services } from "@/content/services";
import { faqLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Plumber Marketing FAQ: Websites, SEO & AI Search",
  description: "Straight answers for plumbers: what a website costs, how long SEO takes, whether you own your site, and how to show up in ChatGPT and Google AI Overviews.",
  path: "/faq/",
});

export default function FaqPage() {
  const all = [...faqs, ...services.flatMap((s) => s.faqs)];
  return (
    <>
      <PageHero photo={nick.coworkA} crumbs={[{ name: "FAQ", path: "/faq/" }]} title={<>Straight answers to <span className="accent">what plumbers ask us.</span></>} intro="If your question isn't here, ask it on a free strategy call." />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x max-w-4xl"><FaqList items={all} level={2} /></div>
      </section>
      <FinalCta />
      <JsonLd data={faqLd(all)} />
    </>
  );
}

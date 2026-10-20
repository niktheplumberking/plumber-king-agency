import { Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { nick } from "@/content/about";
import { LeadForm } from "@/components/LeadForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Us: Book a Free Strategy Call",
  description: "Book a free strategy call with Nick at Plumber King Agency. Websites, SEO and lead capture for plumbing companies in the USA and Canada.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero photo={nick.deskWave} crumbs={[{ name: "Contact", path: "/contact/" }]} title={<>Let&apos;s get your <span className="accent">phone ringing.</span></>} intro="Tell us a little about your business. Nick will reply personally to set up your free strategy call." />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <div className="rounded-md border-2 border-ink bg-white p-6 md:p-10"><LeadForm tone="light" /></div>
          <div className="space-y-6">
            <div><h2 className="text-t2 font-bold">Prefer email?</h2><a href={`mailto:${site.email}`} className="tap mt-3 inline-flex items-center gap-2 text-t3 font-semibold text-royal hover:underline"><Mail className="h-5 w-5" aria-hidden />{site.email}</a></div>
            <div><h2 className="text-t2 font-bold">Where we work</h2><p className="mt-3 flex items-center gap-2 text-t3 text-slate"><MapPin className="h-5 w-5" aria-hidden />Serving USA &amp; Canada</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/home/Showcase";
import { FinalCta } from "@/components/FinalCta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Process: How We Build Plumber Websites",
  description: "Discovery and strategy, content and wireframe, design and build, launch, and support after launch: the five steps from first call to a plumber website that keeps working.",
  path: "/process/",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Process", path: "/process/" }]} title={<>From first call to a phone that <span className="accent">keeps ringing.</span></>} intro="No mystery, no disappearing agency. Here's exactly what happens, step by step." />
      <ProcessTimeline />
      <FinalCta />
    </>
  );
}

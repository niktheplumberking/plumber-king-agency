import { site } from "@/content/site";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { faqs } from "@/content/faq";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/** llms.txt (llmstxt.org): a plain summary for AI assistants. Facts only, from the same content as the pages. */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is owned by ${site.legalEntity}. It works only with plumbing companies, in the USA and Canada. Contact: ${site.email}. Founder: ${site.founder}.`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.name}](${abs(`/services/${s.slug}/`)}): ${s.metaDescription}`),
    "",
    "## Guides",
    "",
    ...guides.map((g) => `- [${g.title}](${abs(`/resources/${g.slug}/`)}): ${g.description}`),
    "",
    "## Key pages",
    "",
    `- [About Nick](${abs("/about/")}): who runs Plumber King Agency and why.`,
    `- [Process](${abs("/process/")}): discovery and strategy, content and wireframe, design and build, launch, 3 months of support after launch.`,
    `- [FAQ](${abs("/faq/")}): pricing approach, ownership, timelines, SEO and AI search.`,
    `- [Free website audit](${abs("/free-website-audit/")}): request a free review of a plumbing website.`,
    `- [Contact](${abs("/contact/")}): book a free strategy call.`,
    "",
    "## FAQ",
    "",
    ...faqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

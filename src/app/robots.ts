import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/** Open to all search engines and AI crawlers (GEO): being readable is how assistants learn about the business. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: abs("/sitemap.xml"),
  };
}

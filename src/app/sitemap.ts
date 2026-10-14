import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/** Every indexable page, absolute https URLs, for Google Search Console and Bing Webmaster Tools. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-14");
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", lastModified = now) => ({ url: abs(path), lastModified, changeFrequency, priority });
  return [
    page("/", 1, "weekly"),
    page("/services/", 0.9),
    ...services.map((s) => page(`/services/${s.slug}/`, 0.9)),
    page("/free-website-audit/", 0.8),
    page("/process/", 0.7),
    page("/about/", 0.7),
    page("/faq/", 0.7),
    page("/resources/", 0.7, "weekly"),
    ...guides.map((g) => page(`/resources/${g.slug}/`, 0.6, "monthly", new Date(g.published))),
    page("/contact/", 0.6),
    page("/privacy-policy/", 0.2, "yearly"),
    page("/terms-of-service/", 0.2, "yearly"),
  ];
}

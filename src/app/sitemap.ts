import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/** Every indexable page, absolute https URLs, for Google Search Console and Bing Webmaster Tools. */
export default function sitemap(): MetadataRoute.Sitemap {
  // Real last-change date of each page's words or layout (from git history). Update a page's date when you change it;
  // pages not listed fall back to the launch build (2026-10-14).
  const changed: Record<string, string> = {
    "/": "2026-10-23", "/services/": "2026-10-23", "/services/plumber-website-design/": "2026-10-17", "/services/plumber-seo/": "2026-10-17",
    "/services/plumber-lead-generation/": "2026-10-23", "/free-website-audit/": "2026-10-20", "/process/": "2026-10-23", "/about/": "2026-10-23",
    "/about/nick-bennett/": "2026-10-20", "/about/portfolio/": "2026-10-22", "/about/story/": "2026-10-23", "/faq/": "2026-10-23",
    "/resources/": "2026-10-23", "/contact/": "2026-10-20", "/privacy-policy/": "2026-10-17", "/terms-of-service/": "2026-10-17",
  };
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", lastModified = new Date(changed[path] ?? "2026-10-14")) => ({ url: abs(path), lastModified, changeFrequency, priority });
  return [
    page("/", 1, "weekly"),
    page("/services/", 0.9),
    ...services.map((s) => page(`/services/${s.slug}/`, 0.9)),
    page("/free-website-audit/", 0.8),
    page("/process/", 0.7),
    page("/about/", 0.7),
    page("/about/nick-bennett/", 0.7),
    page("/about/portfolio/", 0.7),
    page("/about/story/", 0.6),
    page("/faq/", 0.7),
    page("/resources/", 0.7, "weekly"),
    ...guides.map((g) => page(`/resources/${g.slug}/`, 0.6, "monthly", new Date(g.published))),
    page("/contact/", 0.6),
    page("/privacy-policy/", 0.2, "yearly"),
    page("/terms-of-service/", 0.2, "yearly"),
  ];
}

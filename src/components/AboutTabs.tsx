import Link from "@/components/Link";
import { folders } from "@/content/about";

/** The three "about" folders as tabs, so each page leads to the other two. */
export function AboutTabs({ current }: { current: "me" | "work" | "story" }) {
  return (
    <nav aria-label="About Nick Bennett" className="mt-10">
      <ul className="flex flex-wrap gap-3">
        {folders.map((f) => (
          <li key={f.id}>
            <Link href={f.href} aria-current={f.id === current ? "page" : undefined} className={`ab-tab ${f.id === current ? "on" : ""}`}>{f.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

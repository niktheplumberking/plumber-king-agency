import Link from "@/components/Link";
import { ArrowUpRight } from "lucide-react";
import { folders, founderFull } from "@/content/about";
import { site } from "@/content/site";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";
import { FolderSlot } from "./FolderSlot";

/**
 * "Meet Nick", rebuilt 2026-10-18 (Nick): three glass folders after the 21st.dev "Glass Folder Cards" component.
 * Each folder is one page about Nick Bennett: about me, portfolio, my story. Hover leans the glass, a click opens the
 * folder and fans its files (each file links into that page), and the link under each folder opens the page itself.
 */
export function AboutFolders({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section id="founder" className="relative overflow-hidden bg-paper py-24 md:py-32" aria-labelledby="founder-h">
      <div aria-hidden className="hero-dots pointer-events-none absolute top-10 right-0 h-72 w-[30%]" />
      <div className="container-x">
        {/* Title as a name wordmark (Nick 2026-10-19: the big-left, small-right layout read as "AI slop"): a small
            "I'm", then the name across the full width, then the pink line, set flush right (Nick 2026-10-20; the subline
            beside it is gone). */}
        <Reveal className="fn-head fit-box">
          <H id="founder-h" className="display fn-title">
            <span className="fn-im">I&apos;m</span>{" "}
            <span className="fn-name">{founderFull}.</span>{" "}
            <span className="accent fn-sub">You deal with me, not a sales team.</span>
          </H>
        </Reveal>
        <ul className="mt-16 grid gap-x-8 gap-y-20 md:grid-cols-3">
          {folders.map((f, i) => (
            <li key={f.id} className="flex flex-col items-center text-center">
              <FolderSlot folder={f} delay={i * 160} />
              <p className="mt-6 max-w-[22rem] text-t3 text-slate">{f.blurb}</p>
              <Link href={f.href} className="ul-link mt-3 min-h-11 self-center">{f.linkText}<ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
            </li>
          ))}
        </ul>
        <Reveal className="mt-20 flex flex-col items-center gap-5 text-center">
          <p className="display fn-motto max-w-[16em]">&ldquo;{site.founderQuote}&rdquo;</p>
          <CtaButton />
        </Reveal>
      </div>
    </section>
  );
}

import { PageHero } from "@/components/PageHero";
import { AboutTabs } from "@/components/AboutTabs";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { founderFull, nick } from "@/content/about";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Nick Bennett's Story: Web Design for Plumbers",
  description: "How Nick Bennett got into web design, why he builds websites and local SEO only for plumbers, and his five-year plan for plumbers in the USA and Canada.",
  path: "/about/story/",
  type: "article",
});

const chapters = [
  {
    id: "start",
    h: "How I got into web design",
    p: [
      "I started by building online stores and websites for clothing brands and e-commerce companies. That taught me the one thing that matters: a website is a salesperson. If it doesn't bring in customers, it isn't doing its job, however good it looks.",
      "From there I moved on to bigger projects: the complete brand and website for MindXBridge, a research incubator working with universities in Ireland and Saudi Arabia; an English and Arabic padel store for CourtHub in Dubai; and websites and app work with our app development partner, RIZM.",
    ],
  },
  {
    id: "plumbers",
    h: "Why plumbers",
    p: [
      "I kept seeing solid, hardworking plumbers lose jobs to competitors who simply had better websites and showed up first on Google. Their work was better. Their online presence wasn't. That never sat right with me.",
      `So I built ${site.name} around one trade. Every page, every Google profile and every call button I build is for plumbing companies, so you never pay for an agency to learn your trade.`,
    ],
  },
  {
    id: "next",
    h: "The next five years",
    p: [
      "My goal is simple: to be the name plumbers in the USA and Canada think of when they need more calls from their website.",
      "That means more plumbers with websites they own, free guides that teach plumbers how Google and AI search actually work, and honest results we can show with our clients' permission.",
      "When you grow, I grow. If your phone starts ringing and you win better jobs, that is the proof my business is built on.",
    ],
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHero photo={nick.coworkB} crumbs={[{ name: "About", path: "/about/" }, { name: "My story", path: "/about/story/" }]} title={<>My story, and <span className="accent">where I&apos;m taking it.</span></>} intro={<p>{founderFull} on how he got into web design and what he wants to build for the plumbing community.</p>}>
        <AboutTabs current="story" />
      </PageHero>
      <article className="bg-paper py-20 md:py-28">
        <div className="container-x max-w-4xl space-y-16">
          {chapters.map((c, i) => (
            <Reveal as="section" key={c.id} className="relative">
              <span id={c.id} className="absolute -top-28" aria-hidden />
              <p className="xg-num">0{i + 1}</p>
              <h2 className="display mt-2 text-t1">{c.h}</h2>
              <div className="mt-5 space-y-4 text-t3 text-slate">{c.p.map((t) => <p key={t}>{t}</p>)}</div>
            </Reveal>
          ))}
        </div>
      </article>
      <FinalCta />
    </>
  );
}

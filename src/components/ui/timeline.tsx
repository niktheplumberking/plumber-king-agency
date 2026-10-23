// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";
/*
 * 21st.dev "Timeline" (Hyperiux), sent by Nick 2026-10-18 for "Five steps": the section pins, the track slides to the
 * right-to-left as you scroll, the line draws, and each step draws its stem and dot and reveals its text line by line.
 * Copied as given, with these changes only: our five process steps instead of dated milestones (top, bottom, top...),
 * brand colours and the site's three type sizes, our call button in the period-label slot, w-full instead of w-screen
 * (no sideways scroll), and the slide distance, line length and reveal points measured from where the steps really
 * sit, because five steps don't fill the seven-milestone track the fixed numbers were made for.
 */

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export type TimelineStep = { title: string; body: string };

type JourneyItem = {
  id: string;
  num: string;
  title: string;
  content: string;
  top: boolean;
};

type SplitTextInstance = InstanceType<typeof SplitText>;

export type TimelineProps = {
  steps: TimelineStep[];
  title?: ReactNode;
  titleId?: string;
  periodLabel?: ReactNode;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Smaller copy of the image for phones (srcset), and whether it loads right away (it is the main image on /process/). */
  imageSmallUrl?: string;
  eager?: boolean;
  /** Reveal animation duration, in seconds. */
  duration?: number;
  /** Fallback reveal duration when `duration` is omitted, in seconds. */
  scrollDuration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

export default function Timeline({
  steps,
  title = "Five steps.",
  titleId,
  periodLabel,
  textColor = "#141414",
  mutedTextColor = "#5c5559",
  activeColor = "#ff3d8b",
  backgroundColor = "#ffffff",
  imageUrl = "/media/svc-web.webp",
  imageAlt = "",
  imageSmallUrl,
  eager = false,
  duration,
  scrollDuration = 1.2,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  // Lines are split only once the web fonts are in: split earlier and a reflow leaves a line outside its mask.
  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => { if (live) setFontsReady(true); });
    return () => { live = false; };
  }, []);
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);
  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  // Steps 1, 3, 5 above the line, 2 and 4 below it, so they alternate along the track.
  const allJourneyItems: JourneyItem[] = steps.map((s, i) => ({
    id: `step-${i + 1}`,
    num: String(i + 1).padStart(2, "0"),
    title: s.title,
    content: s.body,
    top: i % 2 === 0,
  }));
  const topJourneyData = allJourneyItems.filter((item) => item.top);
  const bottomJourneyData = allJourneyItems.filter((item) => !item.top);

  // Where the track has to travel: until the last step sits inside the right edge of the screen.
  const measure = () => {
    const section = sectionRef.current!;
    const slider = wholeSliderRef.current!;
    const vw = window.innerWidth;
    const isMobile = vw < 600;
    const sliderLeft = slider.getBoundingClientRect().left - (gsap.getProperty(slider, "x") as number);
    const lefts = allJourneyItems.map((item) => {
      const el = section.querySelector<HTMLElement>(`[data-step="${item.id}"]`)!;
      return el.getBoundingClientRect().left - (gsap.getProperty(slider, "x") as number) - sliderLeft;
    });
    const lastEl = section.querySelector<HTMLElement>(`[data-step="${allJourneyItems[allJourneyItems.length - 1].id}"]`)!;
    const lastRight = lefts[lefts.length - 1] + lastEl.offsetWidth;
    const travel = Math.max(0, lastRight - vw * (isMobile ? 0.98 : 0.94));
    const lineEl = section.querySelector<HTMLElement>(".journey-line")!;
    const lineLeft = lineEl.getBoundingClientRect().left - (gsap.getProperty(slider, "x") as number) - sliderLeft;
    return { vw, isMobile, lefts, travel, lineLeft, lineWidth: Math.max(0, lefts[lefts.length - 1] - lineLeft + vw * 0.04) };
  };

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const isMobile = window.innerWidth < 600;
    const lineStart = isMobile ? "top 30%" : "top 25%";
    // Phones stop sliding a little earlier than the original (82%) so the last step stays on screen to be read.
    const slideEnd = isMobile ? "72% 50%" : "92% bottom";
    const lineEnd = isMobile ? "70% 50%" : "92% bottom";

    // The line is drawn with scaleX over its full measured length (the original grows its width, which re-lays out
    // the page on every scroll frame).
    const setLine = () => gsap.set(".journey-line", { width: measure().lineWidth, transformOrigin: "left center" });
    setLine();
    ScrollTrigger.addEventListener("refreshInit", setLine);

    // Reduced motion: no pinning and no sliding; the track is a plain row you can swipe or scroll sideways (below).
    if (reducedMotion) {
      return () => ScrollTrigger.removeEventListener("refreshInit", setLine);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true,
        invalidateOnRefresh: true,
      },
      defaults: {
        ease: "none",
      },
    });

    tl.fromTo(
      wholeSliderRef.current,
      { x: 0 },
      { x: () => -measure().travel },
    );

    gsap.fromTo(".journey-line", { scaleX: 0 }, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: lineStart,
        end: lineEnd,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    return () => ScrollTrigger.removeEventListener("refreshInit", setLine);
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const items = allJourneyItems;

    if (!fontsReady) return;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.description-${item.id}`, {
          opacity: 1,
          clearProps: "transform",
        });
      });
      return;
    }

    // One set per property for all steps at once, so GSAP reads every element's style before writing any (one setup
    // per step made the browser re-measure the page between each, ~125 ms of forced reflow on a phone; SEO fix 8).
    const all = (prefix: string) => items.map((item) => `.${prefix}-${item.id}`).join(",");
    gsap.set(all("jl"), { scaleY: 0, transformOrigin: "bottom bottom" });
    gsap.set(all("jd"), { scale: 0 });
    gsap.set(`${all("title")},${all("description")}`, { opacity: 1 });

    const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
    const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};

    items.forEach((item) => {
      // Only lines are animated, so only lines are split, and the text stays as it is for screen readers.
      titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
        type: "lines",
        mask: "lines",
        aria: "none",
      });

      descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, {
        type: "lines",
        mask: "lines",
        aria: "none",
      });
    });

    // Every line starts hidden below its mask right away (Nick 2026-10-21: on a first visit, lines of steps further
    // along showed before their station was reached, because a scrubbed tween only sets its start state once its
    // scroll range has been passed).
    gsap.set(items.flatMap((item) => [...(titleSplits[item.id]?.lines ?? []), ...(descriptionSplits[item.id]?.lines ?? [])]), { y: 100 });

    // When each step draws (Nick 2026-10-20: "the line is a train, each step a station"). A step's stem, dot, title
    // and text start the moment the tip of the pink line reaches that step's stem, and finish a short scroll later.
    // Worked out from the line's own scroll range (start "top 25%", end "92% bottom"; phones "top 30%" / "70% 50%"),
    // so the step can never appear before the train arrives. The earlier version keyed it to where the step sat on
    // screen, which ran ahead of the line.
    const positions = (index: number): [number, number] => {
      const { isMobile, lefts, lineLeft, lineWidth } = measure();
      const top = section.getBoundingClientRect().top + window.scrollY;
      const H = section.offsetHeight;
      const vh = window.innerHeight;
      const s0 = top - (isMobile ? 0.3 : 0.25) * vh;
      const s1 = isMobile ? top + 0.7 * H - 0.5 * vh : top + 0.92 * H - vh;
      const reach = lineWidth ? Math.min(1, Math.max(0, (lefts[index] - lineLeft) / lineWidth)) : 0;
      const at = s0 + reach * (s1 - s0);
      return [at, at + vh * (isMobile ? 0.2 : 0.25)];
    };

    const createItemTimeline = (
      item: JourneyItem,
      index: number,
    ) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleLines = titleSplits[item.id]?.lines || [];
      const descriptionLines = descriptionSplits[item.id]?.lines || [];

      const isTop = item.top;

      if (!isTop) {
        gsap.set(lineSelector, { transformOrigin: "top top" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: () => positions(index)[0],
          end: () => positions(index)[1],
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(lineSelector, {
          scaleY: 1,
          duration: normalizedDuration * 0.4,
        })
        .to(
          dotSelector,
          {
            scale: 1,
            duration: normalizedDuration * 0.4,
          },
          "<",
        )
        .fromTo(
          titleLines,
          { y: 100 },
          {
            y: 0,
            delay: -0.8 * normalizedDuration,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
        )
        .fromTo(
          descriptionLines,
          { y: 100 },
          {
            y: 0,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
          "<",
        );

      return timeline;
    };

    items.forEach((item, index) => {
      createItemTimeline(item, index);
    });

    // Width changes only: on phones the browser bar showing or hiding is a height-only resize, and a forced refresh
    // there scrolled the page to the top and back mid-swipe (Nick's iPhone glitch, 2026-10-22).
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Object.values(titleSplits).forEach((split) => split?.revert?.());
      Object.values(descriptionSplits).forEach((split) => split?.revert?.());
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [normalizedDuration, reducedMotion, fontsReady], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby={titleId}
      className={reducedMotion ? "w-full relative py-16" : "h-[180vw] max-[600px]:h-[300vh] w-full relative"}
      style={sectionStyle}
    >
      <div tabIndex={reducedMotion ? 0 : undefined} className={reducedMotion ? "w-full overflow-x-auto" : "h-screen w-full sticky top-[0%] pt-[10%] overflow-hidden max-[600px]:top-[5%] max-[600px]:pt-[16vw]"}>
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[34vw] w-[225vw] items-center gap-[5vw] px-[5vw] max-[600px]:h-[66vh] max-[600px]:w-[560vw] max-[600px]:px-[7vw]"
        >
          <div className="h-full w-[30vw] shrink-0 overflow-hidden rounded-[1vw] border-2 border-ink shadow-[8px_8px_0_var(--color-ribbon)] max-[600px]:h-[65vw] max-[600px]:w-[85vw] max-[600px]:rounded-[5vw]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              srcSet={imageSmallUrl ? `${imageSmallUrl} 720w, ${imageUrl} 1200w` : undefined}
              sizes="(max-width: 600px) 85vw, 30vw"
              alt={imageAlt}
              draggable={false}
              loading={eager ? "eager" : "lazy"}
              fetchPriority={eager ? "high" : undefined}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative h-full w-full">
            <div className="w-full absolute left-0 top-[49%] flex items-center h-fit">
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] shrink-0 rounded-full"
                style={activeStyle}
              ></div>
              <div
                className="h-[3px] w-[0%] rounded-full journey-line"
                style={activeStyle}
              ></div>
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] shrink-0 rounded-full"
                style={activeStyle}
              ></div>
            </div>

            <div className="flex h-1/2 w-full items-center justify-start gap-[.5vw]">
              <div className="h-full w-[20%] shrink-0 pt-[2vw] max-[600px]:h-fit max-[600px]:w-[60vw] max-[600px]:pt-[5vw]">
                <h2 id={titleId} className="display text-t1">
                  {title}
                </h2>
              </div>

              <div className="w-full flex h-full gap-x-[15vw] max-[600px]:gap-x-[40vw]">
                {topJourneyData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    data-step={item.id}
                    className="relative h-full w-[38vw] shrink-0 px-[3vw] max-[600px]:flex max-[600px]:w-[70vw] max-[600px]:flex-col max-[600px]:px-[7vw]"
                  >
                    <div className="w-full absolute left-0 bottom-0 top-0 h-full">
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] translate-x-[-50%] relative aspect-square rounded-full jd-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`h-[94%] w-[2px] origin-bottom rounded-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>

                    <div className="mt-[-1vw] space-y-[1vw] max-[600px]:mt-[-2vw]">
                      <h3
                        className={`title-${item.id} tl-t font-display text-t2 font-black leading-tight`}
                      >
                        <span className="text-ribbon-deep">{item.num}</span> {item.title}
                      </h3>
                      <p
                        className={`description-${item.id} tl-d w-[90%] text-t3 max-[600px]:w-[90%]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-1/2 flex items-center justify-start w-full">
              <div className="w-[34%] shrink-0 pt-[2vw] max-[600px]:pt-[5vw] max-[600px]:w-[85vw] h-full">
                {periodLabel}
              </div>

              <div className="w-full flex h-full gap-x-[15vw] max-[600px]:gap-x-[40vw] max-[600px]:ml-[30vw]">
                {bottomJourneyData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    data-step={item.id}
                    className="relative h-full w-[38vw] shrink-0 px-[3vw] max-[600px]:w-[70vw] max-[600px]:px-[7vw]"
                  >
                    <div className="w-full absolute left-0 bottom-[-1%] h-full">
                      <div
                        className={`h-[94%] origin-top w-[2px] rounded-full max-[600px]:h-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] translate-x-[-50%] relative w-auto aspect-square rounded-full jd-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-[1vw]">
                      <h3
                        className={`title-${item.id} tl-t font-display text-t2 font-black leading-tight`}
                      >
                        <span className="text-ribbon-deep">{item.num}</span> {item.title}
                      </h3>
                      <p
                        className={`description-${item.id} tl-d w-[90%] text-t3 max-[600px]:w-[90%]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

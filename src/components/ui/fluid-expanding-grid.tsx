"use client";

import React, { useEffect, useRef, useState } from "react";
import { LayoutGroup, LazyMotion, MotionConfig, domMax, m as motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStill } from "@/lib/useStill";

/**
 * 21st.dev "Fluid Expanding Grid" (Nick 2026-10-18), brand-fitted. Three tiles on a 2x2 grid: the open tile spans its
 * whole row, a click (or Enter/Space) opens another. Changed from the original: tiles are buttons with aria-expanded,
 * text uses the site's 3 sizes and fonts, and an open tile shows a before/after split with example numbers.
 * `open` lets the page open a tile from outside (the section opens the step being read). Pause motion and reduced
 * motion turn the spring into an instant switch.
 */
export interface GalleryItem {
  id: string;
  label: string;
  title: string;
  image: string;
  imageSrcSet?: string;
  /** Where the subject sits across the picture (CSS object-position), so the open tile's halves keep it in frame. */
  pos?: string;
  /** The "without us" picture. Missing: the same picture in grey. */
  before?: string;
  beforeSrcSet?: string;
  beforePos?: string;
  /** Describes the "with us" picture; beforeAlt the "without us" one. */
  alt: string;
  beforeAlt?: string;
  stat: string;
  from: string;
  to: string;
}

interface FluidExpandingGridProps {
  items: GalleryItem[];
  open?: string;
  className?: string;
  id?: string;
}

const SIZES = "(min-width: 64rem) 45vw, 100vw";
const HALF = "(min-width: 64rem) 23vw, 50vw";

const split = (ids: string[], first: string) => {
  const i = ids.indexOf(first);
  if (i < 0) return { row1: ids.slice(0, 2), row2: ids.slice(2, 4) };
  const rest = ids.filter((x) => x !== first);
  return i < 2 ? { row1: [first], row2: rest.slice(0, 2) } : { row1: rest.slice(0, 2), row2: [first] };
};

export function FluidExpandingGrid({ items, open, className, id = "fluid-gallery" }: FluidExpandingGridProps) {
  const still = useStill();
  const [layout, setLayout] = useState(() => split(items.map((i) => i.id), open ?? items[items.length - 1].id));
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const handleExpand = (key: string) => {
    const l = layoutRef.current;
    const inRow1 = l.row1.includes(key);
    if ((inRow1 && l.row1.length === 1) || (!inRow1 && l.row2.length === 1)) return;
    if (inRow1) {
      const neighbor = l.row1.find((i) => i !== key)!;
      setLayout({ row1: [key], row2: [neighbor, ...l.row2.filter((i) => i !== neighbor)].slice(0, 2) });
    } else {
      const neighbor = l.row2.find((i) => i !== key)!;
      setLayout({ row1: [neighbor, ...l.row1.filter((i) => i !== neighbor)].slice(0, 2), row2: [key] });
    }
  };

  useEffect(() => { if (open) handleExpand(open); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const spring = still ? { duration: 0 } : { type: "spring" as const, stiffness: 100, damping: 25 };

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
      <div className={cn("feg w-full", className)}>
        <LayoutGroup id={id}>
          <motion.div layout={!still} transition={spring} className="feg-grid grid h-full w-full grid-cols-2 grid-rows-2 gap-3 sm:gap-5">
            {items.map((item) => {
              const isRow1 = layout.row1.includes(item.id);
              const rowArr = isRow1 ? layout.row1 : layout.row2;
              const isSelected = rowArr.length === 1 && rowArr[0] === item.id;
              const gridRow = isRow1 ? 1 : 2;
              const gridColumn = isSelected ? "1 / span 2" : rowArr.indexOf(item.id) === 0 ? "1" : "2";
              return (
                <motion.button
                  type="button"
                  key={item.id}
                  layoutId={`${id}-${item.id}`}
                  onClick={() => handleExpand(item.id)}
                  aria-expanded={isSelected}
                  aria-label={`${item.label}: ${item.title} Example: ${item.stat}, ${item.from} without us, ${item.to} with us.`}
                  style={{ gridRow, gridColumn }}
                  className={cn("feg-tile group relative h-full w-full text-left", isSelected ? "z-30 is-open" : "z-10")}
                  transition={{ layout: spring }}
                >
                  <motion.div layoutId={`${id}-${item.id}-mask-wrapper`} transition={spring} className="absolute inset-0 overflow-hidden bg-sky" style={{ borderRadius: 28 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} srcSet={item.imageSrcSet} sizes={SIZES} alt={item.alt} loading="lazy" decoding="async" className="feg-after absolute inset-0 h-full w-full object-cover" style={{ objectPosition: item.pos }} />
                    {/* Open tile: "without us" slides in on the left half, "with us" fades in on the right half, each framed on its subject. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.before ?? item.image} srcSet={item.before ? item.beforeSrcSet : item.imageSrcSet} sizes={HALF} alt={item.beforeAlt ?? `${item.alt}, without us`} loading="lazy" decoding="async" className={cn("feg-before absolute inset-y-0 left-0 h-full w-1/2 object-cover", !item.before && "feg-grey")} style={{ objectPosition: item.beforePos ?? item.pos }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} srcSet={item.imageSrcSet} sizes={HALF} alt={item.alt} loading="lazy" decoding="async" className="feg-after-half absolute inset-y-0 right-0 h-full w-1/2 object-cover" style={{ objectPosition: item.pos }} />
                    <span className="feg-shade absolute inset-0" />
                  </motion.div>

                  <span aria-hidden className="feg-edge absolute inset-0" style={{ borderRadius: 28 }} />

                  {/* Open: the before/after numbers, one on each half. */}
                  <span aria-hidden className="feg-ba absolute inset-x-0 top-0 flex justify-between p-4 sm:p-5">
                    <span className="feg-pill feg-pill-dim">Without us<b>{item.from}</b></span>
                    <span className="feg-pill">With us<b>{item.to}</b></span>
                  </span>

                  <motion.span layout="position" transition={spring} aria-hidden className="absolute inset-x-0 bottom-0 block p-4 text-white select-none sm:p-6">
                    <span className="feg-label">{item.label}</span>
                    <span className="feg-title display mt-1 block text-t2">{item.title}</span>
                    <span className="feg-stat mt-1 block text-t3">{item.stat}<b className="feg-num-m">{item.from} without us → {item.to} with us</b></span>
                  </motion.span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
      </MotionConfig>
    </LazyMotion>
  );
}

export default FluidExpandingGrid;

"use client";

import { useEffect, useRef, useState } from "react";
import GlassFolder, { type ArtRecipe } from "@/components/ui/glass-folder-cards";
import type { Folder } from "@/content/about";

/** Brand marble for folders without a photo: whites and pinks only (palette H). */
const PINK: ArtRecipe = { style: "marble", colors: ["#FFF0F6", "#FFD6E7", "#FF8FBF", "#FF3D8B", "#C2185B", "#FFE6F0", "#FFFFFF"], scale: 0.7, warp: 2.6, angle: -0.5, gloss: 0.35, veins: 0.15 };

/** One glass folder sized to its column (the component takes a pixel width; its height follows). */
export function FolderSlot({ folder, delay }: { folder: Folder; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(Math.min(380, e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex w-full justify-center" style={{ minHeight: w ? undefined : "22rem" }}>
      {w > 0 && (
        <GlassFolder
          label={folder.label}
          meta={folder.meta}
          tone="light"
          art={folder.image ? "none" : PINK}
          image={folder.image}
          seed={7}
          action="none"
          width={w}
          appearDelay={delay}
          files={folder.files.map((f) => ({ name: f.name, meta: f.meta, href: f.href, image: f.image }))}
        />
      )}
    </div>
  );
}

// Wide-screen zoom (Base.astro): above 1440 px the page is scaled by viewport/1440 with CSS zoom, and browsers pick srcset
// candidates without counting that zoom. A fixed px slot (`572px`) would then fetch a 572 px file for a ~1000 px box at 2560.
// So the px slot that applies at 1440 is restated in vw for wider screens: 572px at 1440 = 39.722vw, exact at any width.
// vw slots already scale with the zoom and need nothing. If no candidate covers that slot at 2560 (zoom 1.78), one is added.
// Used by Img.astro and by Base.astro's LCP preload, so both ask for the same files.
export function zoomSizes(input: string): { sizes: string; slot: number } {
  const parts = input.split(/,(?![^(]*\))/).map((x) => x.trim()).filter(Boolean);
  for (const part of parts) {
    const m = part.match(/^(\([^)]*\))?\s*(.+)$/)!;
    const cond = m[1] ?? '';
    const min = cond.match(/^\(\s*min-width\s*:\s*(\d+)px\s*\)$/);
    if (cond && !min) continue; // max-width or other conditions: not the entry that holds at 1440
    if (min && +min[1] > 1440) return { sizes: input, slot: 0 }; // the author already wrote a wide-screen slot
    const px = m[2].match(/^(\d+(?:\.\d+)?)px$/);
    if (!px) return { sizes: input, slot: 0 };
    return { sizes: `(min-width: 1441px) ${(+px[1] / 14.4).toFixed(3)}vw, ${input}`, slot: +px[1] };
  }
  return { sizes: input, slot: 0 };
}

/** The srcset widths plus, when needed, one that covers the 1440 slot at 2560 (never above the original). */
export function zoomWidths(widths: number[], slot: number, srcWidth: number): number[] {
  const w = widths.filter((x) => x <= srcWidth);
  if (!w.length) w.push(srcWidth);
  const wide = Math.min(srcWidth, Math.ceil((slot * 1.78) / 40) * 40);
  if (slot && wide > Math.max(...w)) w.push(wide);
  return w;
}

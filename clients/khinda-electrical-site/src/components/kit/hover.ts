// Hover (fix round 1 B11, Phase 2 fills it in). Rule: every card, row, tag, stamp and strip responds to hover on fine
// pointers only, with a CSS transition (0.3-0.5 s, ease-in-out) on properties the element's row in kit/README.md gives to
// hover: `translate` (lift) and `rotate` / `scale` on an inner child, never `transform` on an element that has an entrance
// or a parallax. Phase 1 exports the pointer check every hover script must use.
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

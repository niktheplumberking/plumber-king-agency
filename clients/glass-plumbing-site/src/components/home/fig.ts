// Home helpers: the Figma vectors the home sections draw inline (exported from figma-cache/home/desktop-712-448.json
// `svgs`, colours turned into currentColor where the section recolours them), and the review-quote helper.
import { REVIEWS } from '../../data/reviews';

/** Gold five-star row (Figma "stars"). */
export const STARS = (w = 75, h = 12) => {
  const r = h / 2;
  const star = (cx: number) => {
    // 5-point star of radius r centred at cx, r (same proportions as the Figma star).
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rad = i % 2 === 0 ? r : r * 0.43;
      pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(r + rad * Math.sin(a) + 0.4).toFixed(2)}`);
    }
    return `<polygon points="${pts.join(' ')}"/>`;
  };
  const gap = (w - 5 * h) / 4;
  let s = '';
  for (let i = 0; i < 5; i++) s += star(r + i * (h + gap));
  return `<svg class="stars" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="#F9B50D" aria-hidden="true" focusable="false">${s}</svg>`;
};

/** Figma wrench (white fill, ink outline) used on every call button. */
export const WRENCH = '<svg width="20" height="20" viewBox="0 0 21 21" fill="none" aria-hidden="true" focusable="false"><path d="M11.7083 4.51304C10.4583 3.26304 10.625 1.26304 12.125 0.596375L14.125 2.59637H16.125V4.59637L18.125 6.59637C17.4583 8.09637 15.4583 8.26304 14.2083 7.01304L4.45833 16.763C3.625 17.5964 1.95833 17.5964 1.125 16.763C0.291667 15.9297 0.291667 14.263 1.125 13.4297L11.7083 4.51304Z" fill="white" stroke="black"/></svg>';

export const CAMERA = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false"><rect x="0.8" y="5.3" width="16.4" height="10.1" rx="2.2" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="10.08" r="2.44" stroke="currentColor" stroke-width="1.6"/><rect x="5.4" y="2.16" width="7.2" height="2.52" rx="1" fill="currentColor"/></svg>';

export const ARROW = '<svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true" focusable="false"><path d="M0.9 5.9H12.9M7.9 10.9L12.9 5.9L7.9 0.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export const CHEVRON = '<svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true" focusable="false"><path d="M0.9 0.9L6.9 6.9L12.9 0.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** Problem tiles (Final estimate step 1), 32 x 32. */
export const TILE_ICONS: Record<string, string> = {
  heater: '<path d="M9 6H23C23.55 6 24 6.45 24 7V22C24 25.87 20.87 29 17 29H15C11.13 29 8 25.87 8 22V7C8 6.45 8.45 6 9 6Z" stroke="#2F6178" stroke-width="2"/><rect x="5" y="2" width="22" height="5" rx="1" fill="#2F6178"/><rect x="11" y="10" width="3" height="12" rx="1.5" fill="#2F6178" fill-opacity="0.5"/>',
  drop: '<path d="M11 1C11 1 1 13 1 19C1 24.5 5.5 28 11 28C16.5 28 21 24.5 21 19C21 13 11 1 11 1Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 2)"/>',
  drain: '<circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/><path d="M9 11H23M9 16H23M9 21H23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  toilet: '<rect x="10" y="3" width="12" height="7" rx="1" stroke="currentColor" stroke-width="2"/><ellipse cx="16" cy="15.5" rx="11" ry="2.5" stroke="currentColor" stroke-width="2"/><path d="M7 17C8 24 12 27 16 27C20 27 24 24 25 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="12" y="27" width="8" height="3" rx="1" fill="currentColor"/>',
  gauge: '<path d="M2 18A14 14 0 0 1 30 18H27.76A11.76 11.76 0 0 0 4.24 18Z" fill="currentColor"/><rect x="15" y="10" width="2" height="10" rx="1" transform="rotate(35 15 10)" fill="currentColor"/><circle cx="16" cy="18" r="3" fill="currentColor"/><rect x="2" y="18" width="28" height="2" rx="1" fill="currentColor"/>',
  other: '<circle cx="16" cy="16" r="13" stroke="currentColor" stroke-width="2"/><path d="M12.6 12.4a3.5 3.5 0 0 1 6.8 1.1c0 2.3-3.4 2.9-3.4 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="16" cy="22.4" r="1.4" fill="currentColor"/>',
};

/**
 * A review quote, word for word: `from` must be an exact substring of that reviewer's text in reviews.ts (the build fails
 * otherwise), so a quote can never drift from the source.
 */
export function quote(name: string, from: string) {
  const r = REVIEWS.find((x) => x.name === name);
  if (!r) throw new Error(`home/fig quote(): no review by "${name}"`);
  if (!r.text.includes(from)) throw new Error(`home/fig quote(): "${from}" is not in ${name}'s review`);
  return { name: r.name, text: from };
}

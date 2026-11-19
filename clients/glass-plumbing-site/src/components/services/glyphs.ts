// Drawn glyphs exported from the Figma frames (figma-cache services/*.json + water-heaters/*.json `svgs` table), used as
// inline SVG by the /services and /services/water-heaters components. Never redrawn by eye.
export const WRENCH =
  '<svg viewBox="0 0 21 21" width="20" height="20" aria-hidden="true" focusable="false"><path d="M11.7083 4.5131C10.4583 3.2631 10.625 1.2631 12.125 0.596436L14.125 2.59644H16.125V4.59644L18.125 6.59644C17.4583 8.09644 15.4583 8.2631 14.2083 7.0131L4.45833 16.7631C3.625 17.5964 1.95833 17.5964 1.125 16.7631C0.291667 15.9298 0.291667 14.2631 1.125 13.4298L11.7083 4.5131Z" fill="#fff" stroke="#000"/></svg>';
export const CAMERA =
  '<svg viewBox="0 0 18 18" width="18" height="18" fill="none" aria-hidden="true" focusable="false"><rect x="0.8" y="5.3" width="16.4" height="10.1" rx="2.2" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="10.08" r="2.44" stroke="currentColor" stroke-width="1.6"/><rect x="5.4" y="2.16" width="7.2" height="2.52" rx="1" fill="currentColor"/></svg>';
export const ARROW =
  '<svg viewBox="0 0 14 12" width="14" height="12" fill="none" aria-hidden="true" focusable="false"><path d="M0.9 5.9H12.9M7.9 10.9L12.9 5.9L7.9 0.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const ARROW_L =
  '<svg viewBox="0 0 20 16" width="20" height="16" fill="none" aria-hidden="true" focusable="false"><path d="M1 8H19M12 15L19 8L12 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const TICK =
  '<svg viewBox="0 0 21 15" width="18" height="12" fill="none" aria-hidden="true" focusable="false"><path d="M1.3 7.3L7.3 13.3L19.3 1.3" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const STAR = (x: number) =>
  `<path transform="translate(${x} 0)" d="M9 0L11.3805 5.72348L17.5595 6.21885L12.8518 10.2515L14.2901 16.2812L9 13.05L3.70993 16.2812L5.14822 10.2515L0.440492 6.21885L6.61947 5.72348L9 0Z"/>`;
/** Five gold stars (Figma "stars" 105 x 18, 21 px pitch). Size it with CSS width. */
export const STARS = `<svg viewBox="0 0 102 17" fill="#F9B50D" aria-hidden="true" focusable="false">${[0, 21, 42, 63, 84].map(STAR).join('')}</svg>`;

// Desktop placement from the Figma JSON: x = page x, y = y inside the section, w/h, rot = Figma rotation (CSS = -rot).
// Used as style={ab(...)} on an element with [data-ab]; it is absolute only at >= 1280 px (kit.css), so the same markup
// flows on tablet and phones.
export const ab = (x: number, y: number, w?: number | null, h?: number | null, rot?: number) =>
  `--x:${x}px;--y:${y}px;` + (w != null ? `--w:${w}px;` : '') + (h != null ? `--h:${h}px;` : '') + (rot ? `--r:${-rot}deg;` : '');

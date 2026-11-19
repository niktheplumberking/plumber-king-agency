import type { DM } from '../../data/service-pages';
export const dsk = (v: DM) => (Array.isArray(v) ? v[0] : v);
export const words = (s: string) => s.trim().split(/\s+/).length;
export const pad = (n: number) => String(n).padStart(2, '0');
/** Strip filters / defs from an inline art SVG (a second copy inside the loupe must not repeat the ids). */
export const bare = (svg: string) => svg.replace(/<defs>[\s\S]*?<\/defs>/, '').replace(/\sfilter="url\([^)]*\)"/g, '').replace(/\sclip-path="url\([^)]*\)"/g, '');

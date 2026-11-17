// Display helpers for review data (src/data/reviews.ts keeps Yelp's raw strings).
/** "Bonita CA" -> "Bonita, CA"; "Fort Worth TX" -> "Fort Worth, TX"; "Corona" -> "Corona, CA"; "CA" -> "CA";
 *  "Nakagami District Japan" -> "Nakagami District, Japan" (as Yelp shows the reviewer's home town). */
export function place(town: string): string {
  const t = town.trim();
  if (/^[A-Z]{2}$/.test(t)) return t;
  const st = t.match(/^(.*)\s([A-Z]{2})$/);
  if (st) return `${st[1]}, ${st[2]}`;
  const country = t.match(/^(.*)\s(Japan|Canada|Mexico)$/);
  if (country) return `${country[1]}, ${country[2]}`;
  return `${t}, CA`;
}
/** "Aug 20 2026" -> "Aug 20, 2026" */
export const when = (d: string) => d.replace(/^(\w{3}) (\d{1,2}) (\d{4})$/, '$1 $2, $3');
/** "Brandon A." -> "BA" */
export const initials = (n: string) => n.replace(/[^A-Za-z ]/g, '').split(/\s+/).filter(Boolean).map((w) => w[0].toUpperCase()).slice(0, 2).join('');

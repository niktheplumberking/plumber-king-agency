import { nickPhotos, nickSrc, nickSrcSet } from "@/content/about";

/** Nick's photo wall: all 13 of his picks (2026-10-20), a masonry of columns so portrait and wide shots keep their shape. */
export function NickPhotos() {
  return (
    <ul className="ph-grid">
      {nickPhotos.map((p) => (
        <li key={p.key} className="ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={nickSrc(p)} srcSet={nickSrcSet(p)} sizes="(min-width: 64rem) 31vw, 46vw" alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  );
}

import { nickPhotos } from "@/content/about";

/** Nick's photo wall: real photos where we have them, labelled grey slots until his shoot is in. */
export function NickPhotos() {
  return (
    <ul className="ph-grid">
      {nickPhotos.map((p, i) => (
        <li key={i} className={`ph ph-${i}`}>
          {p.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.src} alt={p.alt} width={900} height={1200} loading="lazy" decoding="async" />
          ) : (
            <span className="ph-empty">Photo coming soon</span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** A simple drawn crown, used as the brand accent (and as the fallback mark until the real logo file is supplied). */
export function CrownMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d="M6 40 3 12l15 12L32 4l14 20 15-12-3 28Z" fill="currentColor" />
      <rect x="6" y="40" width="52" height="6" rx="2" fill="currentColor" />
      <circle cx="3" cy="11" r="3" fill="currentColor" />
      <circle cx="32" cy="4" r="3.5" fill="currentColor" />
      <circle cx="61" cy="11" r="3" fill="currentColor" />
    </svg>
  );
}

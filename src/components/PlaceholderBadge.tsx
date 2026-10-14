/** Visible on preview builds only, wherever placeholder (unverified) content is shown. */
export function PlaceholderBadge({ label = "Placeholder" }: { label?: string }) {
  return (
    <span className="placeholder-badge" title="Not real yet. Hidden on the live site until Nick confirms it.">
      {label}
    </span>
  );
}

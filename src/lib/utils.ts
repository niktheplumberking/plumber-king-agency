/** Joins class names, skipping empty ones (the shadcn `cn` helper the 21st.dev components import, without its extra packages). */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

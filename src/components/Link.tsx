import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * Site-wide link. Viewport prefetching is off: on a static marketing site it downloaded the JavaScript of
 * every linked page up front (about 90 KB extra per visit). Clicks still navigate client-side.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}

import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import s from './AlternatingRow.module.css';

export interface AlternatingRowProps {
  media: ReactNode;
  text: ReactNode;
  /** Place the media on the right on wide viewports (via CSS order). */
  reverse?: boolean;
  /** First row omits the top divider. */
  first?: boolean;
  /** Anchor id for in-page quick-nav (Destinations). */
  id?: string;
  scrollMargin?: number;
}

/**
 * Two-column image/text row that alternates sides on wide viewports and
 * stacks (media first) on narrow ones. DOM order is fixed (media, text);
 * `reverse` swaps sides purely with CSS `order`, so no JS width branch.
 */
export function AlternatingRow({ media, text, reverse = false, first = false, id, scrollMargin }: AlternatingRowProps) {
  return (
    <section
      id={id}
      className={cx(s.row, !first && s.bordered, reverse && s.reverse)}
      style={scrollMargin != null ? { scrollMarginTop: scrollMargin } : undefined}
    >
      <div className={s.media}>{media}</div>
      <div>{text}</div>
    </section>
  );
}

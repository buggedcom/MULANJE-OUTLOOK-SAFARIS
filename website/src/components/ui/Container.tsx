import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import s from './Container.module.css';

type MaxWidth = 1000 | 1200 | 1240;
type Pad = 'sm' | 'md' | 'lg' | 'none';

const mwClass: Record<MaxWidth, string> = { 1000: s.mw1000, 1200: s.mw1200, 1240: s.mw1240 };
const padClass: Record<Pad, string | undefined> = { sm: s.padSm, md: s.padMd, lg: s.padLg, none: undefined };

export interface ContainerProps {
  children: ReactNode;
  /** Rendered element (default `section`). */
  as?: ElementType;
  maxWidth?: MaxWidth;
  pad?: Pad;
  id?: string;
  /** Sets scroll-margin-top (px) for in-page anchor targets. */
  scrollMargin?: number;
  className?: string;
  style?: CSSProperties;
}

/** Centered, max-width, horizontally-padded page container. */
export function Container({
  children,
  as: As = 'section',
  maxWidth = 1200,
  pad = 'md',
  id,
  scrollMargin,
  className,
  style,
}: ContainerProps) {
  return (
    <As
      id={id}
      className={cx(s.root, mwClass[maxWidth], padClass[pad], className)}
      style={scrollMargin != null ? { scrollMarginTop: scrollMargin, ...style } : style}
    >
      {children}
    </As>
  );
}

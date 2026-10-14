import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import s from './SectionHeader.module.css';

type Size = 'sm' | 'md' | 'lg';
const sizeClass: Record<Size, string> = { sm: s.sizeSm, md: s.sizeMd, lg: s.sizeLg };

export interface SectionHeaderProps {
  title: string;
  kicker?: string;
  /** Kicker colour override (defaults to the DS accent via .card-kicker). */
  kickerColor?: string;
  intro?: ReactNode;
  align?: 'left' | 'center';
  size?: Size;
  /** Constrains the header block width (e.g. '52ch'). */
  maxWidth?: string;
}

/** Kicker + heading (+ optional intro) that opens a section. */
export function SectionHeader({
  title,
  kicker,
  kickerColor,
  intro,
  align = 'left',
  size = 'md',
  maxWidth,
}: SectionHeaderProps) {
  return (
    <div className={cx(align === 'center' && s.center)} style={maxWidth ? { maxWidth } : undefined}>
      {kicker && (
        <span className={cx('card-kicker', s.kicker)} style={kickerColor ? { color: kickerColor } : undefined}>
          {kicker}
        </span>
      )}
      <h2 className={cx(s.title, sizeClass[size])}>{title}</h2>
      {intro && <p className={s.intro}>{intro}</p>}
    </div>
  );
}

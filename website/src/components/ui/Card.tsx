import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface CardProps {
  children: ReactNode;
  elevation?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
}

export function Card({ children, elevation, className, style }: CardProps) {
  return (
    <div className={cx('card', elevation && `elev-${elevation}`, className)} style={style}>
      {children}
    </div>
  );
}

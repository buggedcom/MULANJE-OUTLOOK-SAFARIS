import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../lib/cx';

type TagVariant = 'accent' | 'accent-2' | 'neutral' | 'outline';

export interface TagProps {
  variant?: TagVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Tag({ variant = 'accent', children, className, style }: TagProps) {
  return (
    <span className={cx('tag', `tag-${variant}`, className)} style={style}>
      {children}
    </span>
  );
}

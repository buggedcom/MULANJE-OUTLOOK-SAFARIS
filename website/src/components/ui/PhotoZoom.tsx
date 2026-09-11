import type { CSSProperties } from 'react';
import { cx } from '../../lib/cx';
import { img } from '../../lib/images';

export interface PhotoZoomProps {
  /** Source-relative image path (resolved via img()). */
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  washed?: boolean;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
}

/** The `.mo-zoom` hover-zoom frame wrapping a `.mo-photo` image. */
export function PhotoZoom({
  src,
  alt = '',
  className,
  style,
  imgStyle,
  washed = false,
  loading,
  onClick,
}: PhotoZoomProps) {
  return (
    <div className={cx('mo-zoom', className)} style={style} onClick={onClick}>
      <img
        className={cx('mo-photo', washed && 'washed')}
        src={img(src)}
        alt={alt}
        loading={loading}
        style={{ width: '100%', height: '100%', objectFit: 'cover', ...imgStyle }}
      />
    </div>
  );
}

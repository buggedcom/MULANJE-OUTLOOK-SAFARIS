import { useEffect } from 'react';
import { img } from '../lib/images';
import { cx } from '../lib/cx';
import { Icon } from './ui/Icon';
import { icons } from '../lib/icons';
import s from './Lightbox.module.css';

export interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Full-screen image viewer with wrap-around prev/next, close and a counter. */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const total = images.length;
  const prev = () => onNavigate((index - 1 + total) % total);
  const next = () => onNavigate((index + 1) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  return (
    <div role="dialog" aria-modal="true" aria-label={`Image ${index + 1} of ${total}`} onClick={onClose} className={s.overlay}>
      <button type="button" aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(); }} className={cx(s.btn, s.close)}>
        <Icon d={icons.close} size={22} color="#fff" />
      </button>
      <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); prev(); }} className={cx(s.btn, s.nav, s.navPrev)}>
        <Icon d={icons.chevronLeft} size={24} color="#fff" />
      </button>
      <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); next(); }} className={cx(s.btn, s.nav, s.navNext)}>
        <Icon d={icons.chevronRight} size={24} color="#fff" />
      </button>
      <img src={img(images[index])} alt="" onClick={(e) => e.stopPropagation()} className={s.image} />
      <span className={s.counter}>
        {index + 1} / {total}
      </span>
    </div>
  );
}

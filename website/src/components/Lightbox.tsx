import { useEffect } from 'react';
import { img } from '../lib/images';
import { Icon } from './ui/Icon';
import { icons } from '../lib/icons';

export interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const roundBtn = (extra: React.CSSProperties): React.CSSProperties => ({
  position: 'absolute',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  background: 'rgba(255,255,255,.14)',
  color: '#fff',
  display: 'grid',
  placeItems: 'center',
  ...extra,
});

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
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${total}`}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(20,18,17,.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px,4vw,56px)',
      }}
    >
      <button type="button" aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(); }} style={roundBtn({ top: '20px', right: '20px' })}>
        <Icon d={icons.close} size={22} color="#fff" />
      </button>
      <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); prev(); }} style={roundBtn({ left: 'clamp(8px,2vw,28px)', top: '50%', transform: 'translateY(-50%)', width: '52px', height: '52px' })}>
        <Icon d={icons.chevronLeft} size={24} color="#fff" />
      </button>
      <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); next(); }} style={roundBtn({ right: 'clamp(8px,2vw,28px)', top: '50%', transform: 'translateY(-50%)', width: '52px', height: '52px' })}>
        <Icon d={icons.chevronRight} size={24} color="#fff" />
      </button>
      <img
        src={img(images[index])}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 'var(--radius-md)', boxShadow: '0 30px 80px rgba(0,0,0,.5)' }}
      />
      <span style={{ position: 'absolute', bottom: '22px', left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,.7)', fontSize: '13px' }}>
        {index + 1} / {total}
      </span>
    </div>
  );
}

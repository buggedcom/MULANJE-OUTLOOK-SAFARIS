import { useState } from 'react';
import { img } from '../lib/images';
import { useInterval } from '../lib/useInterval';
import { Icon } from './ui/Icon';
import { icons } from '../lib/icons';

const IMAGES = ['photos/mulanje-hero.jpg', 'photos/lake-beach.jpg', 'photos/elephant.jpg'];
const CAPTIONS = ['Mount Mulanje massif', 'Lake Malawi shoreline', 'Liwonde National Park'];
const INTERVAL = 4200;

/** Auto-rotating hero image panel (split-hero right column). */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  useInterval(() => setIndex((i) => (i + 1) % IMAGES.length), INTERVAL);

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '4/5',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {IMAGES.map((im, i) => (
        <img
          key={im}
          src={img(im)}
          alt={CAPTIONS[i]}
          aria-hidden={i !== index}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 1s ease',
            opacity: index === i ? 1 : 0,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '22px',
          background: 'linear-gradient(to top, color-mix(in srgb, #201e1d 72%, transparent), transparent)',
          color: '#fff',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <Icon d={icons.pin} size={16} color="#fff" />
        <span style={{ fontSize: '13.5px' }}>{CAPTIONS[index]}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          {IMAGES.map((_, i) => (
            <span
              key={i}
              data-testid="hero-dot"
              data-active={index === i}
              style={{
                width: index === i ? '18px' : '6px',
                height: '6px',
                borderRadius: '999px',
                background: '#fff',
                opacity: index === i ? 1 : 0.5,
                transition: 'all .3s ease',
              }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

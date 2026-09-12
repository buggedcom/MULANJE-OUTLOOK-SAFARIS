import { useState } from 'react';
import { img } from '../lib/images';
import { useInterval } from '../lib/useInterval';
import { cx } from '../lib/cx';
import { Icon } from './ui/Icon';
import { icons } from '../lib/icons';
import s from './HeroSlideshow.module.css';

const IMAGES = ['photos/mulanje-hero.jpg', 'photos/lake-beach.jpg', 'photos/elephant.jpg'];
const CAPTIONS = ['Mount Mulanje massif', 'Lake Malawi shoreline', 'Liwonde National Park'];
const INTERVAL = 4200;

/** Auto-rotating hero image panel (split-hero right column). */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  useInterval(() => setIndex((i) => (i + 1) % IMAGES.length), INTERVAL);

  return (
    <div className={s.frame}>
      {IMAGES.map((im, i) => (
        <img
          key={im}
          className={s.slide}
          src={img(im)}
          alt={CAPTIONS[i]}
          aria-hidden={i !== index}
          style={{ opacity: index === i ? 1 : 0 }}
        />
      ))}
      <div className={s.caption}>
        <Icon d={icons.pin} size={16} color="#fff" />
        <span className={s.captionText}>{CAPTIONS[index]}</span>
        <span className={s.dots}>
          {IMAGES.map((_, i) => (
            <span
              key={i}
              data-testid="hero-dot"
              data-active={index === i}
              className={cx(s.dot, index === i && s.dotActive)}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

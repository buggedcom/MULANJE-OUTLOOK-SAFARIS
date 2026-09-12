import { Link } from 'react-router-dom';
import { cx } from '../../lib/cx';
import { img } from '../../lib/images';
import { Tag } from './Tag';
import s from './TourCard.module.css';

export interface TourCardProps {
  to: string;
  image: string;
  title: string;
  kicker?: string;
  /** `tag` = accent-2 Tag pill (experiences); `uppercase` = grade eyebrow. */
  kickerVariant?: 'tag' | 'uppercase';
  body?: string;
  cta?: string;
  aspect?: '4/3' | '3/2';
  badge?: string;
  /** Card background token (default surface). */
  background?: string;
  /** Adds the mo-xcard hover-lift (off for the TourDetail related cards). */
  lift?: boolean;
}

/** Image + kicker + title (+ body/cta/badge) card linking to a route. */
export function TourCard({
  to,
  image,
  title,
  kicker,
  kickerVariant = 'uppercase',
  body,
  cta,
  aspect = '3/2',
  badge,
  background = 'var(--color-surface)',
  lift = false,
}: TourCardProps) {
  return (
    <Link to={to} className={cx('mo-zoom', lift && 'mo-xcard', s.card)} style={{ background }}>
      <div className={cx(s.media, aspect === '4/3' ? s.aspect43 : s.aspect32)}>
        <img className={cx('mo-photo', s.img)} src={img(image)} alt={title} />
        {badge && <span className={s.badge}>{badge}</span>}
      </div>
      <div className={s.body}>
        {kicker &&
          (kickerVariant === 'tag' ? (
            <Tag variant="accent-2" className={s.kickerTag}>
              {kicker}
            </Tag>
          ) : (
            <span className={s.grade}>{kicker}</span>
          ))}
        <h3 className={s.title}>{title}</h3>
        {body && <p className={s.desc}>{body}</p>}
        {cta && <span className={cx('btn btn-ghost', s.ghost)}>{cta}</span>}
      </div>
    </Link>
  );
}

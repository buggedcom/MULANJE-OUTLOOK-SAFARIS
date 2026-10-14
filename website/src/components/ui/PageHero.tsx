import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { contact } from '../../data/site';
import { img } from '../../lib/images';
import { icons } from '../../lib/icons';
import { cx } from '../../lib/cx';
import { Tag } from './Tag';
import { Icon } from './Icon';
import s from './PageHero.module.css';

export interface HeroFact {
  icon: string | readonly string[];
  label: string;
}

export interface PageHeroProps {
  image: string;
  kicker?: string;
  title: string;
  sub?: string;
  /** Gradient scrim: `bottom` (default) or `darker` (tour detail). */
  overlay?: 'bottom' | 'darker';
  /** "All tours"-style back link above the heading. */
  backLink?: { to: string; label: string };
  /** Custom tag chips replacing the single kicker Tag (tour detail). */
  tags?: ReactNode;
  /** Facts row below the sub (tour detail: duration/grade/guests). */
  facts?: HeroFact[];
  /** Show a "Follow us on Instagram" button (gallery hero). */
  instagramLink?: boolean;
}

/** Full-bleed image hero used by About/Tours/Activities/Gallery/Contact and,
    via the extra props, Destinations and TourDetail. */
export function PageHero({
  image,
  kicker,
  title,
  sub,
  overlay = 'bottom',
  backLink,
  tags,
  facts,
  instagramLink,
}: PageHeroProps) {
  return (
    <section className={s.hero}>
      <img className={s.img} src={img(image)} alt="" />
      <div className={cx(s.overlay, overlay === 'darker' ? s.overlayDarker : s.overlayBottom)} />
      <div className={s.inner}>
        {backLink && (
          <Link to={backLink.to} className={s.backLink}>
            <Icon d={icons.arrowLeftLong} size={16} /> {backLink.label}
          </Link>
        )}
        {tags ? (
          <div className={s.tagsRow}>{tags}</div>
        ) : (
          kicker && (
            <Tag variant="accent-2" className={s.kicker}>
              {kicker}
            </Tag>
          )
        )}
        <h1 className={s.title}>{title}</h1>
        {sub && <p className={s.sub}>{sub}</p>}
        {facts && (
          <div className={s.facts}>
            {facts.map((f) => (
              <div key={f.label} className={s.fact}>
                <Icon d={f.icon} size={19} color="var(--color-accent-300)" />
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        )}
        {instagramLink && (
          <a href={contact.instagram} target="_blank" rel="noopener" className={cx('btn btn-primary btn-inline', s.ig)}>
            <Icon d={icons.instagram} size={18} />
            Follow us on Instagram
          </a>
        )}
      </div>
    </section>
  );
}

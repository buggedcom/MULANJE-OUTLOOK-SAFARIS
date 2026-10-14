import { useState } from 'react';
import type { TourDay } from '../data/tours';
import { cx } from '../lib/cx';
import { Icon } from './ui/Icon';
import { PhotoZoom } from './ui/PhotoZoom';
import { icons, metaIcon } from '../lib/icons';
import s from './ItineraryAccordion.module.css';

/** Day-by-day itinerary timeline; one day open at a time (source default: day 3). */
export function ItineraryAccordion({ days }: { days: TourDay[] }) {
  const [open, setOpen] = useState(2);

  return (
    <div className={s.list}>
      {days.map((d, i) => {
        const isOpen = open === i;
        const toggle = () => setOpen(isOpen ? -1 : i);
        return (
          <div key={d.d} className={s.row}>
            <div className={s.rail}>
              <button type="button" onClick={toggle} aria-label={`Day ${d.d}`} data-open={isOpen} className={s.dayBtn}>
                {d.d}
              </button>
              {i < days.length - 1 && <div className={s.connector} />}
            </div>

            <div className={s.body}>
              <button type="button" onClick={toggle} aria-expanded={isOpen} className={s.header}>
                <div className={s.headText}>
                  <span className={s.dayEyebrow}>Day {d.d}</span>
                  <h3 className={s.dayTitle}>{d.t}</h3>
                </div>
                <span className={s.chevron} data-open={isOpen}>
                  <Icon d={icons.chevronDown} size={22} />
                </span>
              </button>

              {isOpen && (
                <div className={s.detail}>
                  <div className={s.detailGrid}>
                    <div>
                      <p className={s.dayBody}>{d.body}</p>
                      <div className={s.metaRow}>
                        {d.meta.map(([key, label], j) => (
                          <span key={j} className={cx('tag tag-neutral', s.metaChip)}>
                            <Icon d={metaIcon(key)} size={14} color="var(--color-accent-700)" />
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <PhotoZoom src={d.img} className={s.dayPhoto} />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

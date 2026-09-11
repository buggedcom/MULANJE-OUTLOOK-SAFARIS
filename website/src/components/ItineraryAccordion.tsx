import { useState } from 'react';
import type { TourDay } from '../data/tours';
import { Icon } from './ui/Icon';
import { PhotoZoom } from './ui/PhotoZoom';
import { icons, metaIcon } from '../lib/icons';
import { muted } from '../lib/style';
import { useBreakpoint } from '../lib/useBreakpoint';

/** Day-by-day itinerary timeline; one day open at a time (source default: day 3). */
export function ItineraryAccordion({ days }: { days: TourDay[] }) {
  const mobile = useBreakpoint() < 900;
  const [open, setOpen] = useState(2);

  return (
    <div style={{ position: 'relative' }}>
      {days.map((d, i) => {
        const isOpen = open === i;
        const toggle = () => setOpen(isOpen ? -1 : i);
        return (
          <div
            key={d.d}
            style={{ display: 'grid', gridTemplateColumns: mobile ? '40px 1fr' : '56px 1fr', gap: mobile ? '16px' : '28px', position: 'relative' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                type="button"
                onClick={toggle}
                aria-label={`Day ${d.d}`}
                style={{
                  width: mobile ? '40px' : '52px',
                  height: mobile ? '40px' : '52px',
                  flex: 'none',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  background: isOpen ? 'var(--color-accent)' : 'var(--color-surface)',
                  color: isOpen ? '#fff' : 'var(--color-accent-700)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: mobile ? '15px' : '19px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all .25s ease',
                }}
              >
                {d.d}
              </button>
              {i < days.length - 1 && (
                <div style={{ width: '2px', flex: 1, minHeight: '28px', background: 'var(--color-divider)', margin: '6px 0' }} />
              )}
            </div>

            <div style={{ paddingBottom: '26px', minWidth: 0 }}>
              <button
                type="button"
                onClick={toggle}
                aria-expanded={isOpen}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>
                    Day {d.d}
                  </span>
                  <h3 style={{ fontSize: mobile ? '19px' : '23px', margin: '3px 0 0', lineHeight: 1.15 }}>{d.t}</h3>
                </div>
                <span style={{ flex: 'none', color: muted(50), transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .25s ease' }}>
                  <Icon d={icons.chevronDown} size={22} />
                </span>
              </button>

              {isOpen && (
                <div style={{ marginTop: '16px', animation: 'moslideup .35s ease both' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.4fr 1fr', gap: '20px', alignItems: 'stretch' }}>
                    <div>
                      <p style={{ fontSize: '15px', lineHeight: 1.62, margin: 0, color: muted(74) }}>{d.body}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                        {d.meta.map(([key, label], j) => (
                          <span key={j} className="tag tag-neutral" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px' }}>
                            <Icon d={metaIcon(key)} size={14} color="var(--color-accent-700)" />
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <PhotoZoom src={d.img} style={{ borderRadius: 'var(--radius-md)', minHeight: '160px', boxShadow: 'var(--shadow-sm)' }} />
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

import { PageHero } from '../components/ui/PageHero';
import { CtaBand } from '../components/ui/CtaBand';
import { Tag } from '../components/ui/Tag';
import { PhotoZoom } from '../components/ui/PhotoZoom';
import { muted } from '../lib/style';
import { useBreakpoint } from '../lib/useBreakpoint';
import { activities } from '../data/site';

export function ActivitiesPage() {
  const mobile = useBreakpoint() < 900;

  return (
    <div>
      <PageHero
        image="photos/abseil-river.jpg"
        kicker="Adventure activities"
        title="Add a thrill to your journey"
        sub="Climb, abseil and zip-line across Mulanje’s river valleys, dive the clear waters of Lake Malawi, or share in village life and festivals."
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) var(--space-4)' }}>
        {activities.map((a, i) => {
          const reverse = i % 2 === 1 && !mobile;
          const media = (
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '10px', height: mobile ? 'auto' : '380px' }}>
              <PhotoZoom src={a.img[0]} style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', minHeight: mobile ? '220px' : 'auto' }} />
              <PhotoZoom src={a.img[1]} style={{ borderRadius: 'var(--radius-md)', minHeight: mobile ? '140px' : 'auto' }} />
            </div>
          );
          const text = (
            <div>
              <Tag variant="accent-2" style={{ marginBottom: '14px' }}>{a.tag}</Tag>
              <h2 style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '12px 0 0' }}>{a.name}</h2>
              <p style={{ fontSize: '16.5px', lineHeight: 1.62, marginTop: '16px', color: muted(82) }}>{a.lead}</p>
              <p style={{ fontSize: '15px', lineHeight: 1.62, color: muted(72) }}>{a.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
                {a.chips.map((c) => (
                  <Tag key={c} variant="accent" style={{ padding: '6px 13px', fontSize: '12px' }}>{c}</Tag>
                ))}
              </div>
            </div>
          );
          return (
            <section
              key={a.name}
              style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 'clamp(28px,4vw,60px)', alignItems: 'center', padding: 'clamp(36px,5vw,64px) 0', borderTop: i === 0 ? 'none' : '1px solid var(--color-divider)' }}
            >
              {reverse ? text : media}
              {reverse ? media : text}
            </section>
          );
        })}
      </div>

      <CtaBand
        title="Bundle activities into your tour"
        sub="Most activities slot straight into a wider itinerary. Tell us what excites you and we’ll build it in."
        primary={{ label: 'Enquire now', to: '/contact' }}
        secondary={{ label: 'Browse tours', to: '/tours' }}
      />
    </div>
  );
}

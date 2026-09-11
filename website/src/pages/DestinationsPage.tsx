import { Link } from 'react-router-dom';
import { Tag } from '../components/ui/Tag';
import { PhotoZoom } from '../components/ui/PhotoZoom';
import { img } from '../lib/images';
import { muted } from '../lib/style';
import { useBreakpoint } from '../lib/useBreakpoint';
import { destinations } from '../data/site';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function DestinationsPage() {
  const mobile = useBreakpoint() < 900;

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={img('photos/mulanje-boulders.jpg')} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, color-mix(in srgb,#201e1d 82%,transparent), color-mix(in srgb,#201e1d 30%,transparent) 60%, color-mix(in srgb,#201e1d 45%,transparent))' }} />
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: 'clamp(64px,9vw,120px) var(--space-4) clamp(48px,6vw,80px)', color: '#fff' }}>
          <Tag variant="accent-2" style={{ marginBottom: '16px' }}>Southern Malawi</Tag>
          <h1 style={{ fontSize: 'clamp(38px,5.6vw,64px)', lineHeight: 1.02, margin: '16px 0 0', maxWidth: '16ch', color: '#fff', letterSpacing: '-.02em' }}>
            Five extraordinary destinations, close enough to combine
          </h1>
          <p style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.6, maxWidth: '56ch', margin: '20px 0 0', color: 'rgba(255,255,255,.9)' }}>
            We run all-inclusive 1–10 day tours that sample the best of the region - demanding mountain
            traverses, Big Five safaris, tea-estate walks and the crystal shores of Lake Malawi. Because
            our destinations sit a short distance apart, you spend more time enjoying them and less time
            travelling.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-divider)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '18px var(--space-4)', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {destinations.map((d) => (
            <button key={d.id} type="button" onClick={() => scrollToId(d.id)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              <Tag variant="outline" style={{ padding: '7px 15px', cursor: 'pointer' }}>{d.name}</Tag>
            </button>
          ))}
        </div>
      </section>

      {/* Rows */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) var(--space-4)' }}>
        {destinations.map((d, i) => {
          const reverse = i % 2 === 1 && !mobile;
          const media = (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px', height: mobile ? 'auto' : '440px' }}>
              <PhotoZoom src={d.img[0]} style={{ gridRow: 'span 2', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', minHeight: mobile ? '240px' : 'auto' }} />
              <PhotoZoom src={d.img[1]} style={{ borderRadius: 'var(--radius-md)', minHeight: mobile ? '130px' : 'auto' }} />
              <PhotoZoom src={d.img[2]} style={{ borderRadius: 'var(--radius-md)', minHeight: mobile ? '130px' : 'auto' }} />
            </div>
          );
          const text = (
            <div>
              <span className="card-kicker" style={{ fontSize: '11px' }}>{d.kicker}</span>
              <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', margin: '10px 0 0' }}>{d.name}</h2>
              <p style={{ fontSize: '16px', lineHeight: 1.62, marginTop: '16px', color: muted(80) }}>{d.lead}</p>
              <p style={{ fontSize: '15px', lineHeight: 1.62, color: muted(72) }}>{d.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '20px 0 0' }}>
                {d.acts.map((a) => (
                  <Tag key={a} variant="accent" style={{ padding: '6px 13px', fontSize: '12px' }}>{a}</Tag>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginTop: '26px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--color-accent-700)' }}>{d.price}</span>
                <Link className="btn btn-primary" to="/tours" style={{ padding: '12px 22px' }}>Plan a visit</Link>
              </div>
            </div>
          );
          return (
            <section
              key={d.id}
              id={d.id}
              style={{ scrollMarginTop: '80px', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 'clamp(28px,4vw,60px)', alignItems: 'center', padding: 'clamp(36px,5vw,64px) 0', borderTop: i === 0 ? 'none' : '1px solid var(--color-divider)' }}
            >
              {reverse ? text : media}
              {reverse ? media : text}
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section style={{ background: 'var(--color-accent-100)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--space-4)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '44ch' }}>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: 0 }}>Mix any of these into one seamless journey</h2>
            <p style={{ fontSize: '16px', marginTop: '12px', color: muted(75) }}>
              Tell us how long you have and what you love. We’ll match the time you have with the very best of the region.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" to="/tours/6-day-southern" style={{ padding: '13px 24px' }}>See a sample tour</Link>
            <Link className="btn btn-secondary" to="/" state={{ scrollTo: 'enquire' }} style={{ padding: '13px 24px' }}>Plan my trip</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

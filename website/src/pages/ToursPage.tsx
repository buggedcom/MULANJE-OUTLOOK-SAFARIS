import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui/PageHero';
import { CtaBand } from '../components/ui/CtaBand';
import { img } from '../lib/images';
import { muted } from '../lib/style';
import { toursList } from '../data/site';

export function ToursPage() {
  return (
    <div>
      <PageHero
        image="photos/new-rock-dome.jpg"
        kicker="Popular tours"
        title="Find your Malawi adventure"
        sub="From a sunrise summit of Sapitwa to boat safaris on the Shire and lazy days on Lake Malawi - pick a journey or let us build one for you."
      />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(48px,6vw,84px) var(--space-4)' }}>
        <div style={{ maxWidth: '56ch', marginBottom: '40px' }}>
          <span className="card-kicker" style={{ fontSize: '11px' }}>Popular tours</span>
          <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', margin: '10px 0 0' }}>Journeys across Southern Malawi</h2>
          <p style={{ fontSize: '16px', marginTop: '14px', color: muted(75) }}>
            Every itinerary is a starting point. Tell us your dates, interests and budget and we’ll shape it around you.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'var(--space-4)' }}>
          {toursList.map((t) => (
            <Link key={t.slug} to={`/tours/${t.slug}`} className="mo-xcard mo-zoom" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ aspectRatio: '3/2', overflow: 'hidden', position: 'relative' }}>
                <img className="mo-photo" src={img(t.img)} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {t.featured && (
                  <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'var(--color-accent)', color: '#fff', fontSize: '11px', letterSpacing: '.05em', textTransform: 'uppercase', padding: '5px 11px', borderRadius: '999px' }}>
                    Most popular
                  </span>
                )}
              </div>
              <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>{t.grade}</span>
                <h3 style={{ fontSize: '21px', margin: '8px 0 8px' }}>{t.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.55, margin: '0 0 16px', color: muted(72), flex: 1 }}>{t.desc}</p>
                <span className="btn btn-ghost" style={{ alignSelf: 'flex-start', padding: 0 }}>View details →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Don’t see quite the right trip?"
        sub="We tailor every itinerary. Share what you’re after and we’ll design it around your time, fitness and budget."
        primary={{ label: 'Enquire now', to: '/contact' }}
        secondary={{ label: 'See activities', to: '/activities' }}
      />
    </div>
  );
}

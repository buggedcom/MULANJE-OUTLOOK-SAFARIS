import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui/PageHero';
import { CtaBand } from '../components/ui/CtaBand';
import { Card } from '../components/ui/Card';
import { Icon } from '../components/ui/Icon';
import { PhotoZoom } from '../components/ui/PhotoZoom';
import { icons } from '../lib/icons';
import { img } from '../lib/images';
import { muted } from '../lib/style';
import { useBreakpoint } from '../lib/useBreakpoint';
import { aboutWhyUs, aboutStats, aboutKeyDestinations, aboutImages } from '../data/site';

export function AboutPage() {
  const mobile = useBreakpoint() < 860;

  return (
    <div>
      <PageHero
        image="photos/new-summit-figure.jpg"
        kicker="About us"
        title="About Mulanje Outlook Safaris"
        sub="A locally owned tour operator dedicated to authentic, safe and unforgettable travel across Southern Malawi."
      />

      {/* Story */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,7vw,96px) var(--space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
          <PhotoZoom src="photos/team.jpg" washed style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }} imgStyle={{ aspectRatio: '5/4' }} />
          <div>
            <span className="card-kicker" style={{ fontSize: '11px' }}>Who we are</span>
            <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', margin: '10px 0 0', maxWidth: '20ch' }}>
              A locally owned company with Malawi in its bones
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, marginTop: '20px', color: muted(80) }}>
              Mulanje Outlook is a locally owned and managed company that runs mountain hiking, safaris
              and informative, eco-friendly sightseeing tours across Southern Malawi. Our goal is to
              provide efficient, reliable and professionally organised services that meet the every want
              and need of our valued clients.
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, color: muted(80) }}>
              We do this by ensuring our team is adequately trained and equipped, and by paying attention
              to detail. We incorporate our clients’ specific interests into flexible itineraries that we
              happily adjust to suit your time, level of fitness and budget.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '26px', marginTop: '26px' }}>
              {aboutStats.map((s) => (
                <div key={s[1]}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', color: 'var(--color-accent-700)' }}>{s[0]}</div>
                  <div style={{ fontSize: '12.5px', color: muted(60) }}>{s[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section style={{ background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,7vw,90px) var(--space-4)' }}>
          <div style={{ maxWidth: '60ch' }}>
            <span className="card-kicker" style={{ fontSize: '11px' }}>Why travel with us</span>
            <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', margin: '10px 0 0' }}>The best journeys are built on local knowledge</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 'var(--space-4)', marginTop: '44px' }}>
            {aboutWhyUs.map((c) => (
              <Card key={c.title} elevation="sm" style={{ background: 'var(--color-bg)', padding: '26px', gap: 0 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-accent-100)', display: 'grid', placeItems: 'center', color: 'var(--color-accent-700)', marginBottom: '16px' }}>
                  <Icon d={c.icon} size={22} />
                </div>
                <h4 style={{ fontSize: '19px', margin: '0 0 8px' }}>{c.title}</h4>
                <p style={{ fontSize: '14px', lineHeight: 1.55, margin: 0, color: muted(72) }}>{c.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key destinations */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,7vw,90px) var(--space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 'clamp(28px,4vw,60px)', alignItems: 'center' }}>
          <div>
            <span className="card-kicker" style={{ fontSize: '11px' }}>Where we go</span>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '10px 0 18px' }}>Our key destinations</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {aboutKeyDestinations.map((d, i) => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '15px 0', borderBottom: '1px solid var(--color-divider)' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--color-accent-700)', width: '26px' }}>
                    {'0' + (i + 1)}
                  </span>
                  <span style={{ fontSize: '17px' }}>{d}</span>
                </div>
              ))}
            </div>
            <Link className="btn btn-ghost" to="/destinations" style={{ marginTop: '18px' }}>
              Explore destinations <Icon d={icons.arrowRight} size={17} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {aboutImages.map((im) => (
              <PhotoZoom key={im} src={im} style={{ borderRadius: 'var(--radius-md)', aspectRatio: '1/1', boxShadow: 'var(--shadow-sm)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="mo-zoom" style={{ position: 'relative', overflow: 'hidden' }}>
        <img className="mo-photo" src={img('photos/new-tea-pickers.jpg')} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, color-mix(in srgb,#201e1d 82%,transparent) 0%, color-mix(in srgb,#201e1d 55%,transparent) 55%, transparent 100%)' }} />
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: 'clamp(64px,8vw,120px) var(--space-4)' }}>
          <div style={{ maxWidth: '52ch', color: '#fff' }}>
            <span className="card-kicker" style={{ fontSize: '11px', color: 'var(--color-accent-300)' }}>Our commitment</span>
            <h2 style={{ fontSize: 'clamp(28px,3.6vw,44px)', margin: '12px 0 0', color: '#fff' }}>Tourism that creates positive experiences for everyone</h2>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, marginTop: '18px', color: 'rgba(255,255,255,.9)' }}>
              We believe tourism should benefit both visitors and local people. By travelling with us you
              help create sustainable opportunities for local families while preserving the landscapes and
              traditions that make Malawi unique.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '26px' }}>
              {['Professional guiding', 'Responsible tourism', 'Supporting communities', 'Protecting the environment'].map((t) => (
                <span key={t} className="tag" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', padding: '6px 14px' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to plan your Malawi adventure?"
        sub="Tell us your dates and interests and a local expert will shape a trip around you."
        primary={{ label: 'Start planning', to: '/contact' }}
        secondary={{ label: 'Browse tours', to: '/tours' }}
      />
    </div>
  );
}

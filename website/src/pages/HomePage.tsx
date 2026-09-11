import { Link } from 'react-router-dom';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { EnquiryForm } from '../components/EnquiryForm';
import { Tag } from '../components/ui/Tag';
import { Card } from '../components/ui/Card';
import { Icon } from '../components/ui/Icon';
import { PhotoZoom } from '../components/ui/PhotoZoom';
import { icons } from '../lib/icons';
import { img } from '../lib/images';
import { useBreakpoint } from '../lib/useBreakpoint';
import {
  contact,
  experiences,
  homeStats,
  homeTourCards,
  homeWhyUs,
} from '../data/site';

const muted = (pct: number) => `color-mix(in srgb, var(--color-text) ${pct}%, transparent)`;

function HomeEnquire() {
  const width = useBreakpoint();
  const mobile = width < 860;
  const infoItems: { d: readonly string[]; label: string; value: string }[] = [
    { d: icons.phone, label: 'WhatsApp', value: contact.whatsappDisplay },
    { d: icons.envelope, label: 'Email', value: contact.email },
    { d: icons.pinDot, label: 'Based in', value: contact.locationShort },
  ];
  return (
    <section id="enquire" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,7vw,96px) var(--space-4)', scrollMarginTop: '90px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.15fr', gap: 'clamp(32px,5vw,64px)', alignItems: 'start' }}>
        <div>
          <span className="card-kicker" style={{ fontSize: '11px' }}>Begin your adventure</span>
          <h2 style={{ fontSize: 'clamp(28px,3.4vw,42px)', margin: '10px 0 0', maxWidth: '16ch' }}>
            Tell us the trip you’re dreaming of
          </h2>
          <p style={{ fontSize: '16.5px', lineHeight: 1.65, marginTop: '18px', color: muted(78), maxWidth: '44ch' }}>
            From your first enquiry until your journey ends, our goal is to make your visit enjoyable,
            seamless and inspiring. Send us a message and a local expert will reply personally.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '28px' }}>
            {infoItems.map((c) => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                <span style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-accent-100)', display: 'grid', placeItems: 'center', color: 'var(--color-accent-700)', flex: 'none' }}>
                  <Icon d={c.d} size={19} />
                </span>
                <span>
                  <span style={{ display: 'block', fontSize: '12px', color: muted(55) }}>{c.label}</span>
                  <span style={{ fontSize: '16px', fontFamily: 'var(--font-heading)' }}>{c.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <EnquiryForm
          fields={[
            { name: 'interest', label: 'Interested in', type: 'select', options: [
              'Mount Mulanje trek', 'Wildlife safari', 'Southern Malawi tour', 'Tea & culture', 'Lake Malawi', 'Not sure yet',
            ] },
            { name: 'dates', label: 'Approx. dates', type: 'text', placeholder: 'e.g. June 2026' },
          ]}
        />
      </div>
    </section>
  );
}

export function HomePage() {
  const width = useBreakpoint();
  const mobile = width < 860;

  return (
    <div>
      {/* Hero (split) */}
      <section style={{ position: 'relative', background: 'var(--color-accent-100)' }}>
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.05fr .95fr', gap: 'var(--space-8)', alignItems: 'center', padding: 'clamp(40px,6vw,86px) var(--space-4)' }}>
          <div style={{ animation: 'moslideup .7s ease both' }}>
            <Tag variant="accent-2" style={{ marginBottom: '20px' }}>The Warm Heart of Africa</Tag>
            <h1 style={{ fontSize: 'clamp(38px,5.4vw,66px)', lineHeight: 1.02, margin: '16px 0 0', letterSpacing: '-.02em' }}>
              Explore Mount Mulanje. Discover Southern Malawi.
            </h1>
            <p style={{ fontSize: 'clamp(16px,1.4vw,19px)', lineHeight: 1.6, maxWidth: '46ch', margin: '22px 0 0', color: muted(78) }}>
              A locally owned tour operator crafting authentic mountain treks, wildlife safaris,
              tea-estate walks and lakeside escapes across the south of Malawi.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }}>
              <Link className="btn btn-primary" to="/tours" style={{ padding: '13px 26px', fontSize: '15px' }}>Browse tours</Link>
              <Link className="btn btn-secondary" to="/" state={{ scrollTo: 'experiences' }} style={{ padding: '13px 26px', fontSize: '15px' }}>What we offer</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '26px', marginTop: '40px' }}>
              {homeStats.map((s) => (
                <div key={s[1]}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', color: 'var(--color-accent-700)' }}>{s[0]}</div>
                  <div style={{ fontSize: '12.5px', color: muted(60) }}>{s[1]}</div>
                </div>
              ))}
            </div>
          </div>
          <HeroSlideshow />
        </div>
      </section>

      {/* Welcome */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,7vw,96px) var(--space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
          <PhotoZoom src="photos/team.jpg" washed style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }} imgStyle={{ aspectRatio: '5/4' }} />
          <div>
            <span className="card-kicker" style={{ fontSize: '11px' }}>Welcome</span>
            <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', margin: '10px 0 0', maxWidth: '18ch' }}>A deeper way to experience Malawi</h2>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, marginTop: '20px', color: muted(80) }}>
              Nestled beneath the majestic peaks of Mount Mulanje, we create unforgettable journeys
              throughout Southern Malawi - a land of dramatic mountains, abundant wildlife, rolling tea
              estates, and the world-famous hospitality that earned Malawi its name.
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, color: muted(80) }}>
              Every journey is designed with care, combining adventure, comfort, and meaningful
              connections with nature and local communities.
            </p>
            <Link className="btn btn-ghost" to="/destinations" style={{ fontSize: '15px', marginTop: '6px' }}>
              Meet our destinations <Icon d={icons.arrowRight} size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why travel with us */}
      <section style={{ background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,7vw,90px) var(--space-4)' }}>
          <div style={{ maxWidth: '60ch' }}>
            <span className="card-kicker" style={{ fontSize: '11px' }}>Why travel with us</span>
            <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', margin: '10px 0 0' }}>Built on local knowledge and genuine hospitality</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 'var(--space-4)', marginTop: '44px' }}>
            {homeWhyUs.map((c) => (
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

      {/* Experiences */}
      <section id="experiences" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,7vw,96px) var(--space-4)', scrollMarginTop: '90px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', gap: '20px', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '52ch' }}>
            <span className="card-kicker" style={{ fontSize: '11px' }}>Our experiences</span>
            <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', margin: '10px 0 0' }}>Five ways to discover the south</h2>
          </div>
          <Link className="btn btn-secondary" to="/destinations" style={{ padding: '11px 20px' }}>All destinations</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'var(--space-4)', marginTop: '44px' }}>
          {experiences.map((e) => (
            <Link key={e.title} to="/destinations" className="mo-xcard mo-zoom" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <img className="mo-photo" src={img(e.img)} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '22px' }}>
                <Tag variant="accent-2" style={{ marginBottom: '12px' }}>{e.tag}</Tag>
                <h3 style={{ fontSize: '22px', margin: '12px 0 8px' }}>{e.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.55, margin: 0, color: muted(72) }}>{e.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular tours */}
      <section style={{ background: 'var(--color-accent-2-100)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,7vw,96px) var(--space-4)' }}>
          <div style={{ maxWidth: '56ch' }}>
            <span className="card-kicker" style={{ fontSize: '11px', color: 'var(--color-accent-2-700)' }}>Popular tours</span>
            <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', margin: '10px 0 0' }}>Journeys our guests love most</h2>
            <p style={{ fontSize: '16px', marginTop: '14px', color: muted(75) }}>
              Every itinerary is a starting point - tell us your dates, interests and budget and we’ll shape it around you.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'var(--space-4)', marginTop: '44px' }}>
            {homeTourCards.map((t) => (
              <Link key={t.slug} to={`/tours/${t.slug}`} className="mo-xcard mo-zoom" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-bg)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ aspectRatio: '3/2', overflow: 'hidden', position: 'relative' }}>
                  <img className="mo-photo" src={img(t.img)} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>{t.grade}</span>
                  <h3 style={{ fontSize: '20px', margin: '8px 0 8px' }}>{t.title}</h3>
                  <p style={{ fontSize: '13.5px', lineHeight: 1.5, margin: '0 0 16px', color: muted(72), flex: 1 }}>{t.desc}</p>
                  <span className="btn btn-ghost" style={{ alignSelf: 'flex-start', padding: 0 }}>View itinerary →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment band */}
      <section className="mo-zoom" style={{ position: 'relative', overflow: 'hidden' }}>
        <img className="mo-photo" src={img('photos/tea-mountain.jpg')} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, color-mix(in srgb,#201e1d 82%,transparent) 0%, color-mix(in srgb,#201e1d 55%,transparent) 55%, transparent 100%)' }} />
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: 'clamp(64px,8vw,120px) var(--space-4)' }}>
          <div style={{ maxWidth: '52ch', color: '#fff' }}>
            <span className="card-kicker" style={{ fontSize: '11px', color: 'var(--color-accent-300)' }}>Our commitment</span>
            <h2 style={{ fontSize: 'clamp(28px,3.6vw,44px)', margin: '12px 0 0', color: '#fff' }}>Responsible tourism that gives back</h2>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, marginTop: '18px', color: 'rgba(255,255,255,.9)' }}>
              By travelling with us you help create sustainable opportunities for local families while
              preserving the landscapes and traditions that make Malawi unique. We support local
              businesses, protect the natural environment, and deliver professional guiding on every trip.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '26px' }}>
              {['Local guides & porters', 'Community visits', 'Conservation partners'].map((t) => (
                <span key={t} className="tag" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', padding: '6px 14px' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeEnquire />
    </div>
  );
}

import { Link, useParams } from 'react-router-dom';
import { tours, isTourSlug, type Tour } from '../data/tours';
import { NotFoundPage } from './NotFoundPage';
import { RouteMap } from '../components/RouteMap';
import { ItineraryAccordion } from '../components/ItineraryAccordion';
import { EnquiryForm } from '../components/EnquiryForm';
import { Card } from '../components/ui/Card';
import { Icon } from '../components/ui/Icon';
import { PhotoZoom } from '../components/ui/PhotoZoom';
import { icons } from '../lib/icons';
import { img } from '../lib/images';
import { muted } from '../lib/style';
import { contact } from '../data/site';
import { useBreakpoint } from '../lib/useBreakpoint';

function scrollToEnquire() {
  document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' });
}

function ChecklistBlock({ items, color, glyph }: { items: string[]; color: string; glyph: string | readonly string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
      {items.map((t) => (
        <div key={t} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '15px', lineHeight: 1.45 }}>
          <span style={{ flex: 'none', marginTop: '3px', color }}>
            <Icon d={glyph} size={15} />
          </span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}

export function TourDetailPage() {
  const { slug } = useParams();
  const mobile = useBreakpoint() < 900;

  if (!slug || !isTourSlug(slug)) return <NotFoundPage />;
  const d: Tour = tours[slug];

  const heroFacts: { d: string[]; label: string }[] = [
    { d: ['M3 4h18v18H3z', 'M8 2v4M16 2v4', 'M3 10h18'], label: d.durFact },
    { d: ['m8 3 4 8 5-5 5 15H2L8 3z'], label: d.gradeFact },
    { d: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M22 21v-2a4 4 0 0 0-3-3.87'], label: d.guestsFact },
  ];

  const related = d.related.map((s) => ({ slug: s, tour: tours[s] })).filter((o) => o.tour);

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={img(d.heroImg)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, color-mix(in srgb,#201e1d 85%,transparent), color-mix(in srgb,#201e1d 35%,transparent) 55%, color-mix(in srgb,#201e1d 40%,transparent))' }} />
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: 'clamp(64px,9vw,120px) var(--space-4) clamp(40px,5vw,64px)', color: '#fff' }}>
          <Link to="/tours" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: 'rgba(255,255,255,.85)', textDecoration: 'none', fontSize: '14px', marginBottom: '20px' }}>
            <Icon d={icons.arrowLeftLong} size={16} /> All tours
          </Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <span className="tag" style={{ background: 'var(--color-accent)', color: '#fff', padding: '6px 14px' }}>{d.tagMain}</span>
            <span className="tag" style={{ background: 'rgba(255,255,255,.16)', color: '#fff', padding: '6px 14px' }}>{d.tagSub}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px,5.2vw,62px)', lineHeight: 1.03, margin: 0, maxWidth: '18ch', color: '#fff', letterSpacing: '-.02em' }}>{d.title}</h1>
          <p style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.6, maxWidth: '56ch', margin: '18px 0 0', color: 'rgba(255,255,255,.9)' }}>{d.subtitle}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '26px', marginTop: '30px' }}>
            {heroFacts.map((f) => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <Icon d={f.d} size={19} color="var(--color-accent-300)" />
                <span style={{ fontSize: '15px' }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview + sidebar */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px,5vw,72px) var(--space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.7fr 1fr', gap: 'clamp(28px,4vw,52px)', alignItems: 'start' }}>
          <div>
            <span className="card-kicker" style={{ fontSize: '11px' }}>Trip overview</span>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,36px)', margin: '10px 0 0' }}>{d.overviewH}</h2>
            {d.overviewP.map((p, i) => (
              <p key={i} style={{ fontSize: '16.5px', lineHeight: 1.65, marginTop: i === 0 ? '16px' : '0', color: muted(80) }}>{p}</p>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '14px', marginTop: '24px' }}>
              {d.quickFacts.map(([k, v]) => (
                <Card key={k} elevation="sm" style={{ background: 'var(--color-surface)', padding: '18px', gap: '4px' }}>
                  <span style={{ fontSize: '12px', color: muted(58) }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '22px' }}>{v}</span>
                </Card>
              ))}
            </div>
            <h3 style={{ fontSize: '22px', margin: '34px 0 0' }}>Trip highlights</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '12px 22px', marginTop: '16px' }}>
              {d.highlights.map((x) => (
                <div key={x} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-accent-600)', flex: 'none', marginTop: '2px' }}>
                    <Icon d={icons.check} size={18} />
                  </span>
                  <span style={{ fontSize: '14.5px', lineHeight: 1.4 }}>{x}</span>
                </div>
              ))}
            </div>
          </div>

          <aside style={{ position: mobile ? 'static' : 'sticky', top: '88px' }}>
            <Card elevation="md" style={{ background: 'var(--color-bg)', padding: '26px', border: '1px solid var(--color-divider)' }}>
              <span style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>{d.tagMain}</span>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', color: 'var(--color-text)', margin: '6px 0 4px' }}>{d.durFact}</div>
              <p style={{ fontSize: '12.5px', color: muted(55), margin: '0 0 18px' }}>Tailored to your group · contact us for a personalised quote.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', padding: '16px 0', borderTop: '1px solid var(--color-divider)', borderBottom: '1px solid var(--color-divider)', marginBottom: '18px' }}>
                {d.facts.map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '14px' }}>
                    <span style={{ color: muted(55) }}>{k}</span>
                    <span style={{ fontWeight: 600, textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>
              <button type="button" onClick={scrollToEnquire} className="btn btn-primary btn-block" style={{ padding: '13px', fontSize: '15px', margin: 0 }}>
                Enquire about this tour
              </button>
              <button type="button" onClick={scrollToEnquire} className="btn btn-secondary btn-block" style={{ padding: '13px', fontSize: '15px' }}>
                Ask a question
              </button>
              <p style={{ fontSize: '12px', textAlign: 'center', margin: '14px 0 0', color: muted(55) }}>No deposit to enquire · reply within 24h</p>
            </Card>
          </aside>
        </div>
      </section>

      {/* Route */}
      <section style={{ background: 'var(--color-accent-2-100)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(44px,5vw,72px) var(--space-4)' }}>
          <div style={{ maxWidth: '52ch', marginBottom: '28px' }}>
            <span className="card-kicker" style={{ fontSize: '11px', color: 'var(--color-accent-2-700)' }}>The route</span>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,36px)', margin: '10px 0 0' }}>Your journey, stop by stop</h2>
          </div>
          <Card elevation="sm" style={{ background: 'var(--color-bg)', padding: 'clamp(18px,3vw,32px)', overflowX: 'auto' }}>
            <RouteMap stops={d.stops} />
          </Card>
        </div>
      </section>

      {/* Itinerary */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(52px,6vw,88px) var(--space-4)' }}>
        <div style={{ textAlign: 'center', maxWidth: '52ch', margin: '0 auto 48px' }}>
          <span className="card-kicker" style={{ fontSize: '11px' }}>Day by day</span>
          <h2 style={{ fontSize: 'clamp(28px,3.4vw,42px)', margin: '10px 0 0' }}>Your itinerary, day by day</h2>
          <p style={{ fontSize: '16px', marginTop: '14px', color: muted(75) }}>{d.itinNote}</p>
        </div>
        <ItineraryAccordion days={d.days} />
      </section>

      {/* Inclusions */}
      <section style={{ background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--space-4)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 'clamp(24px,3vw,44px)' }}>
            <div>
              <h3 style={{ fontSize: '24px', margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--color-accent-2-700)' }}><Icon d={icons.check} size={22} /></span>
                What’s included
              </h3>
              <ChecklistBlock items={d.included} color="var(--color-accent-2-700)" glyph={icons.check} />
            </div>
            <div>
              <h3 style={{ fontSize: '24px', margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--color-accent-700)' }}><Icon d={icons.layers} size={22} /></span>
                Optional add-ons
              </h3>
              <ChecklistBlock items={d.optional} color="var(--color-accent-700)" glyph={icons.plus} />
              <h3 style={{ fontSize: '24px', margin: '28px 0 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: muted(55) }}><Icon d={icons.close} size={22} /></span>
                Not included
              </h3>
              <ChecklistBlock items={d.notIncluded} color={muted(45)} glyph={icons.close} />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--space-4)' }}>
        <span className="card-kicker" style={{ fontSize: '11px' }}>Gallery</span>
        <h2 style={{ fontSize: 'clamp(26px,3.2vw,36px)', margin: '10px 0 26px' }}>Moments from this journey</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px' }}>
          {d.gallery.map((g, i) => (
            <PhotoZoom key={i} src={g} style={{ borderRadius: 'var(--radius-md)', aspectRatio: i % 5 === 0 ? '2/1' : '1/1', gridColumn: i % 5 === 0 ? 'span 2' : 'auto', boxShadow: 'var(--shadow-sm)' }} />
          ))}
        </div>
      </section>

      {/* Enquire */}
      <section id="enquire" style={{ background: 'var(--color-accent-100)', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--space-4)' }}>
          <div style={{ textAlign: 'center', maxWidth: '46ch', margin: '0 auto 32px' }}>
            <span className="card-kicker" style={{ fontSize: '11px' }}>Enquire</span>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,40px)', margin: '10px 0 0' }}>Reserve your place on this journey</h2>
            <p style={{ fontSize: '16px', marginTop: '14px', color: muted(75) }}>
              Send your details and a local expert will confirm availability and tailor the trip to you - usually within a day.
            </p>
          </div>
          <EnquiryForm
            surface="var(--color-bg)"
            fields={[
              { name: 'month', label: 'Preferred month', type: 'text', placeholder: 'e.g. July 2026' },
              { name: 'group', label: 'Group size', type: 'text', placeholder: 'e.g. 2 adults' },
              { name: 'fitness', label: 'Fitness level', type: 'select', options: ['Confident hiker', 'Moderate - some hills', 'New to trekking'] },
            ]}
            messageLabel="Anything we should know?"
            messagePlaceholder="Dietary needs, add-ons you’d like, questions…"
            note={
              <>
                or WhatsApp us on{' '}
                <a href={contact.whatsappHref} target="_blank" rel="noopener" style={{ color: 'var(--color-accent-700)', fontWeight: 600, textDecoration: 'none' }}>
                  {contact.whatsappDisplay}
                </a>
              </>
            }
          />
        </div>
      </section>

      {/* Related */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--space-4)' }}>
        <h2 style={{ fontSize: 'clamp(24px,3vw,34px)', margin: '0 0 26px' }}>Other journeys you might like</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'var(--space-4)' }}>
          {related.map((o) => (
            <Link key={o.slug} to={`/tours/${o.slug}`} className="mo-zoom" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ aspectRatio: '3/2', overflow: 'hidden' }}>
                <img className="mo-photo" src={img(o.tour.heroImg)} alt={o.tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>{o.tour.tagSub}</span>
                <h3 style={{ fontSize: '20px', margin: '8px 0 0' }}>{o.tour.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

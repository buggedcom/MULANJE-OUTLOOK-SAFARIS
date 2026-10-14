import { useParams } from 'react-router-dom';
import { tours, isTourSlug, type Tour } from '../data/tours';
import { NotFoundPage } from './NotFoundPage';
import { RouteMap } from '../components/RouteMap';
import { ItineraryAccordion } from '../components/ItineraryAccordion';
import { EnquiryForm } from '../components/EnquiryForm';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { Checklist } from '../components/ui/Checklist';
import { TourCard } from '../components/ui/TourCard';
import { Icon } from '../components/ui/Icon';
import { PhotoZoom } from '../components/ui/PhotoZoom';
import { cx } from '../lib/cx';
import { icons } from '../lib/icons';
import { scrollToId } from '../lib/scroll';
import { contact } from '../data/site';
import s from './TourDetailPage.module.css';

export function TourDetailPage() {
  const { slug } = useParams();
  if (!slug || !isTourSlug(slug)) return <NotFoundPage />;
  const d: Tour = tours[slug];

  const heroFacts = [
    { icon: icons.calendar, label: d.durFact },
    { icon: icons.grade, label: d.gradeFact },
    { icon: icons.users, label: d.guestsFact },
  ];
  const related = d.related.map((sl) => ({ slug: sl, tour: tours[sl] })).filter((o) => o.tour);

  return (
    <div>
      <PageHero
        image={d.heroImg}
        title={d.title}
        sub={d.subtitle}
        overlay="darker"
        backLink={{ to: '/tours', label: 'All tours' }}
        facts={heroFacts}
        tags={
          <>
            <span className={cx('tag', s.heroTagMain)}>{d.tagMain}</span>
            <span className={cx('tag', s.heroTagSub)}>{d.tagSub}</span>
          </>
        }
      />

      {/* Overview + sidebar */}
      <Container pad="sm">
        <div className={s.overviewGrid}>
          <div>
            <span className={cx('card-kicker', s.kicker)}>Trip overview</span>
            <h2 className={s.overviewTitle}>{d.overviewH}</h2>
            {d.overviewP.map((p, i) => (
              <p key={i} className={s.para}>
                {p}
              </p>
            ))}
            <div className={s.factGrid}>
              {d.quickFacts.map(([k, v]) => (
                <Card key={k} elevation="sm" className={s.factCard}>
                  <span className={s.factKey}>{k}</span>
                  <span className={s.factVal}>{v}</span>
                </Card>
              ))}
            </div>
            <h3 className={s.highlightsTitle}>Trip highlights</h3>
            <div className={s.highlightGrid}>
              {d.highlights.map((x) => (
                <div key={x} className={s.highlightRow}>
                  <span className={s.highlightIcon}>
                    <Icon d={icons.check} size={18} />
                  </span>
                  <span className={s.highlightText}>{x}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className={s.sidebar}>
            <Card elevation="md" className={s.bookingCard}>
              <span className={s.bookingTag}>{d.tagMain}</span>
              <div className={s.bookingDur}>{d.durFact}</div>
              <p className={s.bookingNote}>Tailored to your group · contact us for a personalised quote.</p>
              <div className={s.factList}>
                {d.facts.map(([k, v]) => (
                  <div key={k} className={s.factRow}>
                    <span className={s.factRowKey}>{k}</span>
                    <span className={s.factRowVal}>{v}</span>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => scrollToId('enquire')} className={cx('btn btn-primary btn-block', s.bookingBtn)}>
                Enquire about this tour
              </button>
              <button type="button" onClick={() => scrollToId('enquire')} className={cx('btn btn-secondary btn-block', s.bookingBtn)}>
                Ask a question
              </button>
              <p className={s.bookingHint}>No deposit to enquire · reply within 24h</p>
            </Card>
          </aside>
        </div>
      </Container>

      <Section background="var(--color-accent-2-100)" pad="sm">
        <div className={s.routeHead}>
          <SectionHeader kicker="The route" kickerColor="var(--color-accent-2-700)" title="Your journey, stop by stop" size="sm" />
        </div>
        <Card elevation="sm" className={s.routeCard}>
          <RouteMap stops={d.stops} />
        </Card>
      </Section>

      <Container maxWidth={1000} pad="lg">
        <div className={s.itinHead}>
          <SectionHeader align="center" kicker="Day by day" title="Your itinerary, day by day" size="lg" intro={d.itinNote} maxWidth="52ch" />
        </div>
        <ItineraryAccordion days={d.days} />
      </Container>

      <Section background="var(--color-surface)" pad="md">
        <div className={s.inclGrid}>
          <div>
            <h3 className={s.inclHead}>
              <span style={{ color: 'var(--color-accent-2-700)' }}>
                <Icon d={icons.check} size={22} />
              </span>
              What’s included
            </h3>
            <Checklist items={d.included} color="var(--color-accent-2-700)" glyph={icons.check} />
          </div>
          <div>
            <h3 className={s.inclHead}>
              <span style={{ color: 'var(--color-accent-700)' }}>
                <Icon d={icons.layers} size={22} />
              </span>
              Optional add-ons
            </h3>
            <Checklist items={d.optional} color="var(--color-accent-700)" glyph={icons.plus} />
            <h3 className={cx(s.inclHead, s.inclHead2)}>
              <span style={{ color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>
                <Icon d={icons.close} size={22} />
              </span>
              Not included
            </h3>
            <Checklist items={d.notIncluded} color="color-mix(in srgb, var(--color-text) 45%, transparent)" glyph={icons.close} />
          </div>
        </div>
      </Section>

      <Container>
        <span className={cx('card-kicker', s.kicker)}>Gallery</span>
        <h2 className={s.galleryTitle}>Moments from this journey</h2>
        <div className={s.galleryGrid}>
          {d.gallery.map((g, i) => (
            <PhotoZoom key={i} src={g} className={cx(s.galleryImg, i % 5 === 0 && s.galleryWide)} />
          ))}
        </div>
      </Container>

      <Section background="var(--color-accent-100)" id="enquire" scrollMargin={80} maxWidth={1000} pad="md">
        <div className={s.enquireHead}>
          <SectionHeader
            align="center"
            kicker="Enquire"
            title="Reserve your place on this journey"
            size="lg"
            intro="Send your details and a local expert will confirm availability and tailor the trip to you - usually within a day."
            maxWidth="46ch"
          />
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
              <a href={contact.whatsappHref} target="_blank" rel="noopener" className={s.waLink}>
                {contact.whatsappDisplay}
              </a>
            </>
          }
        />
      </Section>

      <Container>
        <h2 className={s.relatedTitle}>Other journeys you might like</h2>
        <div className={s.relatedGrid}>
          {related.map((o) => (
            <TourCard key={o.slug} to={`/tours/${o.slug}`} image={o.tour.heroImg} title={o.tour.title} kicker={o.tour.tagSub} />
          ))}
        </div>
      </Container>
    </div>
  );
}

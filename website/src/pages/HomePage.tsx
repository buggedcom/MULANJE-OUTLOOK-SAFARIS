import { Link } from 'react-router-dom';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { EnquiryForm } from '../components/EnquiryForm';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FeatureCards } from '../components/ui/FeatureCards';
import { TourCard } from '../components/ui/TourCard';
import { CommitmentBand } from '../components/ui/CommitmentBand';
import { StatList } from '../components/ui/StatList';
import { InfoList, type InfoItem } from '../components/ui/InfoList';
import { Tag } from '../components/ui/Tag';
import { PhotoZoom } from '../components/ui/PhotoZoom';
import { Icon } from '../components/ui/Icon';
import { cx } from '../lib/cx';
import { icons } from '../lib/icons';
import { contact, experiences, enquiryInterests, homeStats, homeTourCards, homeWhyUs } from '../data/site';
import s from './HomePage.module.css';

const enquireInfo: InfoItem[] = [
  { icon: icons.phone, label: 'WhatsApp', value: contact.whatsappDisplay },
  { icon: icons.envelope, label: 'Email', value: contact.email },
  { icon: icons.pinDot, label: 'Based in', value: contact.locationShort },
];

function HomeEnquire() {
  return (
    <Container id="enquire" scrollMargin={90} pad="lg">
      <div className={s.enquireGrid}>
        <div>
          <span className={cx('card-kicker', s.kicker)}>Begin your adventure</span>
          <h2 className={s.enquireTitle}>Tell us the trip you’re dreaming of</h2>
          <p className={s.enquireLead}>
            From your first enquiry until your journey ends, our goal is to make your visit enjoyable,
            seamless and inspiring. Send us a message and a local expert will reply personally.
          </p>
          <div className={s.enquireInfo}>
            <InfoList items={enquireInfo} badgeSize={44} />
          </div>
        </div>
        <EnquiryForm
          fields={[
            { name: 'interest', label: 'Interested in', type: 'select', options: enquiryInterests },
            { name: 'dates', label: 'Approx. dates', type: 'text', placeholder: 'e.g. June 2026' },
          ]}
        />
      </div>
    </Container>
  );
}

export function HomePage() {
  return (
    <div>
      {/* Hero (split) */}
      <section className={s.heroBand}>
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <Tag variant="accent-2" className={s.heroTag}>
              The Warm Heart of Africa
            </Tag>
            <h1 className={s.heroTitle}>Explore Mount Mulanje. Discover Southern Malawi.</h1>
            <p className={s.heroLead}>
              A locally owned tour operator crafting authentic mountain treks, wildlife safaris,
              tea-estate walks and lakeside escapes across the south of Malawi.
            </p>
            <div className={s.heroCtas}>
              <Link className={cx('btn btn-primary', s.heroBtn)} to="/tours">
                Browse tours
              </Link>
              <Link className={cx('btn btn-secondary', s.heroBtn)} to="/" state={{ scrollTo: 'experiences' }}>
                What we offer
              </Link>
            </div>
            <div className={s.heroStats}>
              <StatList stats={homeStats} />
            </div>
          </div>
          <HeroSlideshow />
        </div>
      </section>

      {/* Welcome */}
      <Container pad="lg">
        <div className={s.welcomeGrid}>
          <PhotoZoom src="photos/team.jpg" washed style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }} imgStyle={{ aspectRatio: '5/4' }} />
          <div>
            <span className={cx('card-kicker', s.kicker)}>Welcome</span>
            <h2 className={s.welcomeTitle}>A deeper way to experience Malawi</h2>
            <p className={s.para}>
              Nestled beneath the majestic peaks of Mount Mulanje, we create unforgettable journeys
              throughout Southern Malawi - a land of dramatic mountains, abundant wildlife, rolling tea
              estates, and the world-famous hospitality that earned Malawi its name.
            </p>
            <p className={s.para}>
              Every journey is designed with care, combining adventure, comfort, and meaningful
              connections with nature and local communities.
            </p>
            <Link className={cx('btn btn-ghost', s.metaLink)} to="/destinations">
              Meet our destinations <Icon d={icons.arrowRight} size={17} />
            </Link>
          </div>
        </div>
      </Container>

      {/* Why travel with us */}
      <Section background="var(--color-surface)" pad="lg">
        <SectionHeader kicker="Why travel with us" title="Built on local knowledge and genuine hospitality" maxWidth="60ch" />
        <FeatureCards items={homeWhyUs} />
      </Section>

      {/* Experiences */}
      <Container id="experiences" scrollMargin={90} pad="lg">
        <div className={s.expHead}>
          <SectionHeader kicker="Our experiences" title="Five ways to discover the south" maxWidth="52ch" />
          <Link className="btn btn-secondary" to="/destinations" style={{ padding: '11px 20px' }}>
            All destinations
          </Link>
        </div>
        <div className={s.cardGrid}>
          {experiences.map((e) => (
            <TourCard
              key={e.title}
              to="/destinations"
              image={e.img}
              title={e.title}
              kicker={e.tag}
              kickerVariant="tag"
              body={e.body}
              aspect="4/3"
              lift
            />
          ))}
        </div>
      </Container>

      {/* Popular tours */}
      <Section background="var(--color-accent-2-100)" pad="lg">
        <SectionHeader
          kicker="Popular tours"
          kickerColor="var(--color-accent-2-700)"
          title="Journeys our guests love most"
          intro="Every itinerary is a starting point - tell us your dates, interests and budget and we’ll shape it around you."
          maxWidth="56ch"
        />
        <div className={s.tourGrid}>
          {homeTourCards.map((t) => (
            <TourCard
              key={t.slug}
              to={`/tours/${t.slug}`}
              image={t.img}
              title={t.title}
              kicker={t.grade}
              body={t.desc}
              cta="View itinerary →"
              background="var(--color-bg)"
              lift
            />
          ))}
        </div>
      </Section>

      <CommitmentBand
        image="photos/tea-mountain.jpg"
        kicker="Our commitment"
        title="Responsible tourism that gives back"
        body="By travelling with us you help create sustainable opportunities for local families while preserving the landscapes and traditions that make Malawi unique. We support local businesses, protect the natural environment, and deliver professional guiding on every trip."
        chips={['Local guides & porters', 'Community visits', 'Conservation partners']}
      />

      <HomeEnquire />
    </div>
  );
}

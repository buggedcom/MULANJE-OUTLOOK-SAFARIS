import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui/PageHero';
import { CtaBand } from '../components/ui/CtaBand';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FeatureCards } from '../components/ui/FeatureCards';
import { CommitmentBand } from '../components/ui/CommitmentBand';
import { StatList } from '../components/ui/StatList';
import { PhotoZoom } from '../components/ui/PhotoZoom';
import { Icon } from '../components/ui/Icon';
import { cx } from '../lib/cx';
import { icons } from '../lib/icons';
import { aboutWhyUs, aboutStats, aboutKeyDestinations, aboutImages } from '../data/site';
import s from './AboutPage.module.css';

export function AboutPage() {
  return (
    <div>
      <PageHero
        image="photos/new-summit-figure.jpg"
        kicker="About us"
        title="About Mulanje Outlook Safaris"
        sub="A locally owned tour operator dedicated to authentic, safe and unforgettable travel across Southern Malawi."
      />

      <Container pad="lg">
        <div className={cx(s.twoCol, s.story)}>
          <PhotoZoom src="photos/team.jpg" washed style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }} imgStyle={{ aspectRatio: '5/4' }} />
          <div>
            <span className={cx('card-kicker', s.kicker)}>Who we are</span>
            <h2 className={s.storyTitle}>A locally owned company with Malawi in its bones</h2>
            <p className={s.para}>
              Mulanje Outlook is a locally owned and managed company that runs mountain hiking, safaris
              and informative, eco-friendly sightseeing tours across Southern Malawi. Our goal is to
              provide efficient, reliable and professionally organised services that meet the every want
              and need of our valued clients.
            </p>
            <p className={s.para}>
              We do this by ensuring our team is adequately trained and equipped, and by paying attention
              to detail. We incorporate our clients’ specific interests into flexible itineraries that we
              happily adjust to suit your time, level of fitness and budget.
            </p>
            <div className={s.stats}>
              <StatList stats={aboutStats} />
            </div>
          </div>
        </div>
      </Container>

      <Section background="var(--color-surface)" pad="lg">
        <SectionHeader kicker="Why travel with us" title="The best journeys are built on local knowledge" maxWidth="60ch" />
        <FeatureCards items={aboutWhyUs} />
      </Section>

      <Container pad="lg">
        <div className={cx(s.twoCol, s.dests)}>
          <div>
            <span className={cx('card-kicker', s.kicker)}>Where we go</span>
            <h2 className={s.destTitle}>Our key destinations</h2>
            <div>
              {aboutKeyDestinations.map((d, i) => (
                <div key={d} className={s.destRow}>
                  <span className={s.destNum}>{'0' + (i + 1)}</span>
                  <span className={s.destName}>{d}</span>
                </div>
              ))}
            </div>
            <Link className={cx('btn btn-ghost', s.exploreLink)} to="/destinations">
              Explore destinations <Icon d={icons.arrowRight} size={17} />
            </Link>
          </div>
          <div className={s.imgGrid}>
            {aboutImages.map((im) => (
              <PhotoZoom key={im} src={im} className={s.aboutImg} />
            ))}
          </div>
        </div>
      </Container>

      <CommitmentBand
        image="photos/new-tea-pickers.jpg"
        kicker="Our commitment"
        title="Tourism that creates positive experiences for everyone"
        body="We believe tourism should benefit both visitors and local people. By travelling with us you help create sustainable opportunities for local families while preserving the landscapes and traditions that make Malawi unique."
        chips={['Professional guiding', 'Responsible tourism', 'Supporting communities', 'Protecting the environment']}
      />

      <CtaBand
        title="Ready to plan your Malawi adventure?"
        sub="Tell us your dates and interests and a local expert will shape a trip around you."
        primary={{ label: 'Start planning', to: '/contact' }}
        secondary={{ label: 'Browse tours', to: '/tours' }}
      />
    </div>
  );
}

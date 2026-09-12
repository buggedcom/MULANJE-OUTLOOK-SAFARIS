import { PageHero } from '../components/ui/PageHero';
import { CtaBand } from '../components/ui/CtaBand';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { TourCard } from '../components/ui/TourCard';
import { toursList } from '../data/site';
import s from './ToursPage.module.css';

export function ToursPage() {
  return (
    <div>
      <PageHero
        image="photos/new-rock-dome.jpg"
        kicker="Popular tours"
        title="Find your Malawi adventure"
        sub="From a sunrise summit of Sapitwa to boat safaris on the Shire and lazy days on Lake Malawi - pick a journey or let us build one for you."
      />

      <Container>
        <div className={s.header}>
          <SectionHeader
            kicker="Popular tours"
            title="Journeys across Southern Malawi"
            intro="Every itinerary is a starting point. Tell us your dates, interests and budget and we’ll shape it around you."
            maxWidth="56ch"
          />
        </div>
        <div className={s.grid}>
          {toursList.map((t) => (
            <TourCard
              key={t.slug}
              to={`/tours/${t.slug}`}
              image={t.img}
              title={t.title}
              kicker={t.grade}
              body={t.desc}
              cta="View details →"
              badge={t.featured ? 'Most popular' : undefined}
              lift
            />
          ))}
        </div>
      </Container>

      <CtaBand
        title="Don’t see quite the right trip?"
        sub="We tailor every itinerary. Share what you’re after and we’ll design it around your time, fitness and budget."
        primary={{ label: 'Enquire now', to: '/contact' }}
        secondary={{ label: 'See activities', to: '/activities' }}
      />
    </div>
  );
}

import { PageHero } from '../components/ui/PageHero';
import { CtaBand } from '../components/ui/CtaBand';
import { Container } from '../components/ui/Container';
import { Tag } from '../components/ui/Tag';
import { ChipRow } from '../components/ui/ChipRow';
import { PhotoZoom } from '../components/ui/PhotoZoom';
import { AlternatingRow } from '../components/AlternatingRow';
import { activities } from '../data/site';
import s from './ActivitiesPage.module.css';

export function ActivitiesPage() {
  return (
    <div>
      <PageHero
        image="photos/abseil-river.jpg"
        kicker="Adventure activities"
        title="Add a thrill to your journey"
        sub="Climb, abseil and zip-line across Mulanje’s river valleys, dive the clear waters of Lake Malawi, or share in village life and festivals."
      />

      <Container as="div" pad="sm">
        {activities.map((a, i) => (
          <AlternatingRow
            key={a.name}
            reverse={i % 2 === 1}
            first={i === 0}
            media={
              <div className={s.media}>
                <PhotoZoom src={a.img[0]} className={s.photoLead} />
                <PhotoZoom src={a.img[1]} className={s.photoSub} />
              </div>
            }
            text={
              <div>
                <Tag variant="accent-2" className={s.eyebrow}>
                  {a.tag}
                </Tag>
                <h2 className={s.name}>{a.name}</h2>
                <p className={s.lead}>{a.lead}</p>
                <p className={s.body}>{a.body}</p>
                <div className={s.chips}>
                  <ChipRow items={a.chips} />
                </div>
              </div>
            }
          />
        ))}
      </Container>

      <CtaBand
        title="Bundle activities into your tour"
        sub="Most activities slot straight into a wider itinerary. Tell us what excites you and we’ll build it in."
        primary={{ label: 'Enquire now', to: '/contact' }}
        secondary={{ label: 'Browse tours', to: '/tours' }}
      />
    </div>
  );
}

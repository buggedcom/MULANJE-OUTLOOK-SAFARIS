import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui/PageHero';
import { CtaBand } from '../components/ui/CtaBand';
import { Container } from '../components/ui/Container';
import { Tag } from '../components/ui/Tag';
import { ChipRow } from '../components/ui/ChipRow';
import { PhotoZoom } from '../components/ui/PhotoZoom';
import { AlternatingRow } from '../components/AlternatingRow';
import { cx } from '../lib/cx';
import { scrollToId } from '../lib/scroll';
import { destinations } from '../data/site';
import s from './DestinationsPage.module.css';

export function DestinationsPage() {
  return (
    <div>
      <PageHero
        image="photos/mulanje-boulders.jpg"
        kicker="Southern Malawi"
        title="Five extraordinary destinations, close enough to combine"
        sub="We run all-inclusive 1–10 day tours that sample the best of the region - demanding mountain traverses, Big Five safaris, tea-estate walks and the crystal shores of Lake Malawi. Because our destinations sit a short distance apart, you spend more time enjoying them and less time travelling."
      />

      <section className={s.quicknav}>
        <div className={s.quicknavInner}>
          {destinations.map((d) => (
            <button key={d.id} type="button" onClick={() => scrollToId(d.id)} className={s.chipBtn}>
              <Tag variant="outline" className={s.chipTag}>
                {d.name}
              </Tag>
            </button>
          ))}
        </div>
      </section>

      <Container as="div" pad="sm">
        {destinations.map((d, i) => (
          <AlternatingRow
            key={d.id}
            id={d.id}
            scrollMargin={80}
            reverse={i % 2 === 1}
            first={i === 0}
            media={
              <div className={s.media}>
                <PhotoZoom src={d.img[0]} className={s.photoLead} />
                <PhotoZoom src={d.img[1]} className={s.photoSub} />
                <PhotoZoom src={d.img[2]} className={s.photoSub} />
              </div>
            }
            text={
              <div>
                <span className={cx('card-kicker', s.kicker)}>{d.kicker}</span>
                <h2 className={s.name}>{d.name}</h2>
                <p className={s.lead}>{d.lead}</p>
                <p className={s.body}>{d.body}</p>
                <div className={s.chips}>
                  <ChipRow items={d.acts} />
                </div>
                <div className={s.priceRow}>
                  <span className={s.price}>{d.price}</span>
                  <Link className={cx('btn btn-primary', s.planBtn)} to="/tours">
                    Plan a visit
                  </Link>
                </div>
              </div>
            }
          />
        ))}
      </Container>

      <CtaBand
        title="Mix any of these into one seamless journey"
        sub="Tell us how long you have and what you love. We’ll match the time you have with the very best of the region."
        primary={{ label: 'See a sample tour', to: '/tours/6-day-southern' }}
        secondary={{ label: 'Plan my trip', to: '/', state: { scrollTo: 'enquire' } }}
      />
    </div>
  );
}

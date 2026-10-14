import { useState } from 'react';
import { PageHero } from '../components/ui/PageHero';
import { CtaBand } from '../components/ui/CtaBand';
import { Container } from '../components/ui/Container';
import { Lightbox } from '../components/Lightbox';
import { Icon } from '../components/ui/Icon';
import { cx } from '../lib/cx';
import { icons } from '../lib/icons';
import { img } from '../lib/images';
import { contact, galleryImages } from '../data/site';
import s from './GalleryPage.module.css';

export function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div>
      <PageHero
        image="photos/new-misty-summit.jpg"
        kicker="Gallery"
        title="Moments from Southern Malawi"
        sub="Peaks above the clouds, big game on the Shire, tea fields and golden lake sunsets - a glimpse of what awaits."
        instagramLink
      />

      <Container maxWidth={1240} pad="sm">
        <div className={s.masonry}>
          {galleryImages.map((im, i) => (
            <button
              key={im}
              type="button"
              aria-label={`Open image ${i + 1}`}
              onClick={() => setLightbox(i)}
              className={cx('mo-zoom', s.thumb)}
            >
              <img className={cx('mo-photo', s.thumbImg)} src={img(im)} loading="lazy" alt="" />
            </button>
          ))}
        </div>

        <div className={s.instaBlock}>
          <span className={cx('card-kicker', s.instaHandle)}>{contact.instagramHandle}</span>
          <h3 className={s.instaTitle}>We add new photos every week on Instagram</h3>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener"
            className={cx('btn btn-primary btn-inline', s.instaBtn)}
          >
            <Icon d={icons.instagram} size={18} />
            For more pictures
          </a>
        </div>
      </Container>

      <CtaBand
        title="Like what you see?"
        sub="These are the places we’ll take you. Start planning your own set of memories."
        primary={{ label: 'Plan your trip', to: '/contact' }}
        secondary={{ label: 'Browse tours', to: '/tours' }}
      />

      {lightbox !== null && (
        <Lightbox images={galleryImages} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
      )}
    </div>
  );
}

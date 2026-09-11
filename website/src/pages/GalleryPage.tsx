import { useState } from 'react';
import { PageHero } from '../components/ui/PageHero';
import { CtaBand } from '../components/ui/CtaBand';
import { Lightbox } from '../components/Lightbox';
import { Icon } from '../components/ui/Icon';
import { icons } from '../lib/icons';
import { img } from '../lib/images';
import { useBreakpoint } from '../lib/useBreakpoint';
import { contact, galleryImages } from '../data/site';

export function GalleryPage() {
  const width = useBreakpoint();
  const columns = width < 600 ? 1 : width < 960 ? 2 : 3;
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

      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(44px,5vw,72px) var(--space-4)' }}>
        <div style={{ columnCount: columns, columnGap: '14px' }}>
          {galleryImages.map((im, i) => (
            <button
              key={im}
              type="button"
              aria-label={`Open image ${i + 1}`}
              onClick={() => setLightbox(i)}
              className="mo-zoom"
              style={{ display: 'block', width: '100%', padding: 0, border: 'none', breakInside: 'avoid', marginBottom: '14px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', cursor: 'zoom-in', background: 'none' }}
            >
              <img className="mo-photo" src={img(im)} loading="lazy" alt="" style={{ width: '100%', display: 'block' }} />
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px', marginTop: 'clamp(36px,5vw,64px)' }}>
          <span className="card-kicker" style={{ fontSize: '11px', color: 'var(--color-accent-700)' }}>{contact.instagramHandle}</span>
          <h3 style={{ fontSize: 'clamp(22px,2.6vw,30px)', margin: 0, maxWidth: '20ch' }}>We add new photos every week on Instagram</h3>
          <a href={contact.instagram} target="_blank" rel="noopener" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '13px 26px', fontSize: '15px', marginTop: '4px' }}>
            <Icon d={icons.instagram} size={18} />
            For more pictures
          </a>
        </div>
      </section>

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

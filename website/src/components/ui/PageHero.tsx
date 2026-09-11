import { contact } from '../../data/site';
import { img } from '../../lib/images';
import { icons } from '../../lib/icons';
import { Tag } from './Tag';
import { Icon } from './Icon';

export interface PageHeroProps {
  image: string;
  kicker: string;
  title: string;
  sub?: string;
  /** Show an "Follow us on Instagram" button (gallery hero). */
  instagramLink?: boolean;
}

/** Full-bleed image hero used by About/Tours/Activities/Gallery/Contact.
    Ported from pageHero() (L526). */
export function PageHero({ image, kicker, title, sub, instagramLink }: PageHeroProps) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <img
        src={img(image)}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, color-mix(in srgb,#201e1d 82%,transparent), color-mix(in srgb,#201e1d 30%,transparent) 60%, color-mix(in srgb,#201e1d 45%,transparent))',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(64px,9vw,120px) var(--space-4) clamp(44px,6vw,72px)',
          color: '#fff',
        }}
      >
        <Tag variant="accent-2" style={{ marginBottom: '16px' }}>
          {kicker}
        </Tag>
        <h1
          style={{
            fontSize: 'clamp(36px,5.4vw,62px)',
            lineHeight: 1.03,
            margin: '16px 0 0',
            maxWidth: '18ch',
            color: '#fff',
            letterSpacing: '-.02em',
          }}
        >
          {title}
        </h1>
        {sub && (
          <p
            style={{
              fontSize: 'clamp(16px,1.5vw,19px)',
              lineHeight: 1.6,
              maxWidth: '56ch',
              margin: '18px 0 0',
              color: 'rgba(255,255,255,.9)',
            }}
          >
            {sub}
          </p>
        )}
        {instagramLink && (
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              padding: '12px 22px',
              fontSize: '15px',
              marginTop: '24px',
            }}
          >
            <Icon d={icons.instagram} size={18} />
            Follow us on Instagram
          </a>
        )}
      </div>
    </section>
  );
}

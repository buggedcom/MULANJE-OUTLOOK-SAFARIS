import { Link } from 'react-router-dom';
import { contact } from '../data/site';
import { Brand } from './ui/Brand';
import { Icon } from './ui/Icon';
import { icons } from '../lib/icons';

const exploreLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Popular tours', to: '/tours' },
  { label: 'Activities', to: '/activities' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

const linkStyle = { color: 'var(--color-neutral-200)', textDecoration: 'none', fontSize: '14px' };

export function Footer() {
  return (
    <footer style={{ background: 'var(--color-neutral-900)', color: 'var(--color-neutral-200)' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(48px,6vw,72px) var(--space-4) 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: 'var(--space-6)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <span style={{ display: 'inline-flex', color: 'var(--color-accent-300)' }}>
              <Brand variant="light" />
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', color: '#fff' }}>
              Mulanje Outlook
            </span>
          </div>
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              marginTop: '16px',
              maxWidth: '34ch',
              color: 'var(--color-neutral-300)',
            }}
          >
            {contact.tagline}
          </p>
        </div>

        <div>
          <h6 style={{ color: 'var(--color-neutral-400)', marginBottom: '14px' }}>Explore</h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {exploreLinks.map((l) => (
              <Link key={l.to} to={l.to} style={linkStyle}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h6 style={{ color: 'var(--color-neutral-400)', marginBottom: '14px' }}>Contact</h6>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '14px',
              color: 'var(--color-neutral-300)',
            }}
          >
            <a href={contact.whatsappHref} target="_blank" rel="noopener" style={linkStyle}>
              WhatsApp {contact.whatsappDisplay}
            </a>
            <a href={contact.phoneHref} style={linkStyle}>
              Call {contact.phoneDisplay}
            </a>
            <a href={contact.emailHref} style={linkStyle}>
              {contact.email}
            </a>
            <span>{contact.location}</span>
            <div style={{ display: 'flex', gap: '14px', marginTop: '8px' }}>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener"
                style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Icon d={icons.instagram} size={16} />
                Instagram
              </a>
              <a
                href={contact.tripadvisor}
                target="_blank"
                rel="noopener"
                style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Icon d={icons.tripadvisor} size={16} />
                TripAdvisor
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-neutral-800)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px var(--space-4)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'space-between',
            fontSize: '12.5px',
            color: 'var(--color-neutral-400)',
          }}
        >
          <span>© 2026 Mulanje Outlook Travel &amp; Safaris</span>
          <span>Locally owned &amp; managed in Malawi</span>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { contact } from '../data/site';
import { Brand } from './ui/Brand';
import { Icon } from './ui/Icon';
import { icons } from '../lib/icons';
import s from './Footer.module.css';

const exploreLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Popular tours', to: '/tours' },
  { label: 'Activities', to: '/activities' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div>
          <div className={s.brandRow}>
            <span className={s.brandMark}>
              <Brand variant="light" />
            </span>
            <span className={s.brandName}>Mulanje Outlook</span>
          </div>
          <p className={s.tagline}>{contact.tagline}</p>
        </div>

        <div>
          <h6 className={s.heading}>Explore</h6>
          <div className={s.col}>
            {exploreLinks.map((l) => (
              <Link key={l.to} to={l.to} className={s.link}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h6 className={s.heading}>Contact</h6>
          <div className={s.contactCol}>
            <a href={contact.whatsappHref} target="_blank" rel="noopener" className={s.link}>
              WhatsApp {contact.whatsappDisplay}
            </a>
            <a href={contact.phoneHref} className={s.link}>
              Call {contact.phoneDisplay}
            </a>
            <a href={contact.emailHref} className={s.link}>
              {contact.email}
            </a>
            <span>{contact.location}</span>
            <div className={s.social}>
              <a href={contact.instagram} target="_blank" rel="noopener" className={s.socialLink}>
                <Icon d={icons.instagram} size={16} />
                Instagram
              </a>
              <a href={contact.tripadvisor} target="_blank" rel="noopener" className={s.socialLink}>
                <Icon d={icons.tripadvisor} size={16} />
                TripAdvisor
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={s.bottom}>
        <div className={s.bottomInner}>
          <span>© 2026 Mulanje Outlook Travel &amp; Safaris</span>
          <span>Locally owned &amp; managed in Malawi</span>
        </div>
      </div>
    </footer>
  );
}

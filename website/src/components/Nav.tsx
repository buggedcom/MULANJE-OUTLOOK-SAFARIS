import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks, contact } from '../data/site';
import { useBreakpoint } from '../lib/useBreakpoint';
import { Icon } from './ui/Icon';
import { Brand } from './ui/Brand';
import { icons } from '../lib/icons';

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? 'var(--color-accent)' : 'inherit',
  textDecoration: 'none',
  fontSize: '14.5px',
  cursor: 'pointer',
});

export function Nav() {
  const width = useBreakpoint();
  const mobile = width < 900;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'color-mix(in srgb, var(--color-bg) 88%, transparent)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-divider)',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          padding: '14px var(--space-4)',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '11px',
            textDecoration: 'none',
            color: 'var(--color-text)',
            marginRight: 'auto',
          }}
        >
          <span style={{ display: 'inline-flex' }}>
            <Brand variant="dark" />
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', letterSpacing: '-.01em' }}>
              Mulanje Outlook
            </span>
            <span
              style={{
                fontSize: '10px',
                letterSpacing: '.28em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-700)',
                marginTop: '3px',
              }}
            >
              Travel &amp; Safaris
            </span>
          </span>
        </Link>

        {!mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '19px' }}>
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className="mo-navlink" style={linkStyle}>
                {l.label}
              </NavLink>
            ))}
            <a
              aria-label="Instagram"
              href={contact.instagram}
              target="_blank"
              rel="noopener"
              className="mo-navlink"
              style={{ display: 'inline-flex', color: 'inherit' }}
            >
              <Icon d={icons.instagram} size={20} />
            </a>
            <Link className="btn btn-primary" to="/contact" style={{ padding: '10px 18px' }}>
              Enquire
            </Link>
          </div>
        )}

        {mobile && (
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="btn btn-secondary btn-icon"
            style={{ width: '42px', height: '42px' }}
          >
            <Icon d={icons.menu} size={20} />
          </button>
        )}
      </nav>

      {mobile && menuOpen && (
        <div style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-divider)' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              padding: '8px var(--space-4) 18px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-accent)' : 'inherit',
                  textDecoration: 'none',
                  padding: '11px 0',
                  borderBottom: '1px solid var(--color-divider)',
                })}
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              className="btn btn-primary"
              to="/contact"
              onClick={() => setMenuOpen(false)}
              style={{ marginTop: '12px' }}
            >
              Enquire now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks, contact } from '../data/site';
import { useMobile } from '../lib/useMobile';
import { cx } from '../lib/cx';
import { Icon } from './ui/Icon';
import { Brand } from './ui/Brand';
import { icons } from '../lib/icons';
import s from './Nav.module.css';

export function Nav() {
  const mobile = useMobile(900);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link to="/" className={s.brand}>
          <Brand variant="dark" />
          <span className={s.brandText}>
            <span className={s.brandName}>Mulanje Outlook</span>
            <span className={s.brandSub}>Travel &amp; Safaris</span>
          </span>
        </Link>

        {!mobile && (
          <div className={s.links}>
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={cx('mo-navlink', s.link)}>
                {l.label}
              </NavLink>
            ))}
            <a aria-label="Instagram" href={contact.instagram} target="_blank" rel="noopener" className={cx('mo-navlink', s.igLink)}>
              <Icon d={icons.instagram} size={20} />
            </a>
            <Link className={cx('btn btn-primary', s.enquireBtn)} to="/contact">
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
            className={cx('btn btn-secondary btn-icon', s.menuBtn)}
          >
            <Icon d={icons.menu} size={20} />
          </button>
        )}
      </nav>

      {mobile && menuOpen && (
        <div className={s.menuPanel}>
          <div className={s.menuInner}>
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setMenuOpen(false)} className={s.menuLink}>
                {l.label}
              </NavLink>
            ))}
            <Link className={cx('btn btn-primary', s.menuEnquire)} to="/contact" onClick={() => setMenuOpen(false)}>
              Enquire now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

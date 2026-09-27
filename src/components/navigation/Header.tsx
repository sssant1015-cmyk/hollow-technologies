import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Sigil } from '../ui/Sigil';
import { usePrefs } from '../../lib/prefs';
import { openPalette } from '../ui/CommandPalette';

const LINKS = [
  { to: '/ecosystem', label: 'Ecosystem' },
  { to: '/projects', label: 'Projects' },
  { to: '/technology', label: 'Technology' },
  { to: '/labs', label: 'Labs' },
  { to: '/docs', label: 'Docs' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { set } = usePrefs();
  const prefs = usePrefs();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const cycleTheme = () => {
    const order = ['dark', 'light', 'system'] as const;
    const next = order[(order.indexOf(prefs.theme) + 1) % order.length]!;
    set({ theme: next });
  };
  const themeIcon = prefs.theme === 'dark' ? '◐' : prefs.theme === 'light' ? '◑' : '◒';

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="Hollow Technologies home">
            <Sigil size={30} animated />
            <span className="wordmark">
              HOLLOW TECHNOLOGIES
              <small>Build beyond the ordinary</small>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-btn" onClick={() => openPalette()} aria-label="Search (Ctrl+K)" title="Search — Ctrl+K">
              ⌕<span className="kbd-hint">⌘K</span>
            </button>
            <button className="icon-btn" onClick={cycleTheme} aria-label={`Theme: ${prefs.theme}. Click to change`} title="Theme">
              {themeIcon}
            </button>
            <Link to="/contact" className="btn btn-sm contact-cta" style={{ marginLeft: 6 }}>Contact</Link>
            <button className="icon-btn nav-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
              ☰
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Site menu">
          <button className="icon-btn nav-toggle" style={{ position: 'absolute', top: 20, right: 20 }} onClick={() => setMenuOpen(false)} aria-label="Close menu">
            ✕
          </button>
          {[{ to: '/', label: 'Home' }, ...LINKS, { to: '/roadmap', label: 'Roadmap' }, { to: '/contact', label: 'Contact' }].map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
              <small>→</small>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavbarScroll } from '../hooks/useScrollAnimations';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useNavbarScroll();

  const close = () => setMenuOpen(false);
  const active = (p) => location.pathname === p;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={close}>
          Nukitchens
        </Link>

        <button
          className={`navbar-hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={`navbar-link ${active('/') ? 'active' : ''}`} onClick={close}>Home</Link>
          <Link to="/portfolio" className={`navbar-link ${active('/portfolio') ? 'active' : ''}`} onClick={close}>Portfolio</Link>
          <Link to="/our-story" className={`navbar-link ${active('/our-story') ? 'active' : ''}`} onClick={close}>Our Story</Link>
          <Link to="/showroom" className={`navbar-link ${active('/showroom') ? 'active' : ''}`} onClick={close}>Showroom</Link>
        </div>
      </div>
    </nav>
  );
}

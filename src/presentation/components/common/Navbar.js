import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuth, setShowAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    let timer;
    const handleScroll = () => closeMenu();
    timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 150);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    closeMenu();
    await logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link fw-semibold ${isActive ? 'text-primary' : 'text-secondary'}`;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={closeMenu}>
            <i className="bi bi-film text-primary fs-4"></i>
            <span className="fw-bold text-primary fs-5">CineApp</span>
          </Link>

          <button
            className={`navbar-toggler ${menuOpen ? '' : 'collapsed'}`}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-controls="navbarMain"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/" end onClick={closeMenu}>
                  <i className="bi bi-house-door me-1"></i>Catálogo
                </NavLink>
              </li>
              {currentUser && (
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/favorites" onClick={closeMenu}>
                    <i className="bi bi-heart me-1"></i>Favoritos
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/contact" onClick={closeMenu}>
                  <i className="bi bi-envelope me-1"></i>Contacto
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/legal" onClick={closeMenu}>
                  <i className="bi bi-file-text me-1"></i>Aviso Legal
                </NavLink>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2 pb-2 pb-lg-0">
              {currentUser ? (
                <>
                  <span className="text-muted small">
                    <i className="bi bi-person-circle me-1"></i>
                    {currentUser.email}
                  </span>
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-1"></i>Salir
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => { closeMenu(); setShowAuth(true); }}
                >
                  <i className="bi bi-person me-1"></i>Acceder
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default Navbar;
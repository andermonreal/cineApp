// src/presentation/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-white border-top mt-auto py-4">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
          <Link to="/" className="text-decoration-none d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
            <i className="bi bi-film text-primary fs-5"></i>
            <span className="fw-bold text-primary">CineApp</span>
          </Link>
          <p className="text-muted small mt-1 mb-0">Tu catálogo de cine favorito</p>
        </div>
        <div className="col-md-4 text-center mb-3 mb-md-0">
          <nav className="d-flex justify-content-center gap-3">
            <Link to="/" className="text-muted text-decoration-none small">Catálogo</Link>
            <Link to="/contact" className="text-muted text-decoration-none small">Contacto</Link>
            <Link to="/legal" className="text-muted text-decoration-none small">Aviso Legal</Link>
          </nav>
        </div>
        <div className="col-md-4 text-center text-md-end">
          <span className="text-muted small">
            &copy; {new Date().getFullYear()} CineApp · Todos los derechos reservados
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
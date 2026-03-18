import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './presentation/context/AuthContext';
import Navbar from './presentation/components/common/Navbar';
import Footer from './presentation/components/common/Footer';
import HomePage from './presentation/pages/HomePage';
import MovieDetailPage from './presentation/pages/MovieDetailPage';
import FavoritesPage from './presentation/pages/FavoritesPage';
import ContactPage from './presentation/pages/ContactPage';
import LegalPage from './presentation/pages/LegalPage';
import './presentation/styles/index.css';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div id="root-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route
              path="*"
              element={
                <div className="container py-5 text-center">
                  <i className="bi bi-exclamation-circle fs-1 text-muted d-block mb-3 opacity-25"></i>
                  <h3 className="fw-bold">404 · Página no encontrada</h3>
                  <p className="text-muted">La página que buscas no existe.</p>
                  <a href="/" className="btn btn-primary">
                    <i className="bi bi-house-door me-2"></i>Volver al inicio
                  </a>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
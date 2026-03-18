import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFavorites, toggleFavorite } from '../../core/application/usescases/movieUseCases';
import StarRating from '../components/movies/StarRating';
import LoadingSpinner from '../components/common/LoadingSpinner';

const FavoritesPage = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const fetchFavorites = async () => {
    if (!currentUser) return;
    try {
      const data = await getFavorites(currentUser.uid);
      setFavorites(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [currentUser]);

  const handleRemove = async (movie) => {
    setRemovingId(movie.id);
    try {
      await toggleFavorite(currentUser.uid, movie);
      setFavorites((prev) => prev.filter((f) => f.id !== movie.id));
    } catch (err) {
      console.error(err);
    } finally {
      setRemovingId(null);
    }
  };

  if (!currentUser) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-heart fs-1 text-muted d-block mb-3 opacity-25"></i>
        <h4 className="text-muted">Accede para ver tus favoritos</h4>
        <p className="text-muted">Necesitas iniciar sesión para guardar y ver tus películas favoritas.</p>
        <Link to="/" className="btn btn-primary">
          <i className="bi bi-house-door me-2"></i>Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-5">
        <div className="bg-danger bg-opacity-10 rounded-3 p-3">
          <i className="bi bi-heart-fill text-danger fs-3"></i>
        </div>
        <div>
          <h2 className="fw-bold mb-0">Mis Favoritos</h2>
          <p className="text-muted mb-0">Películas guardadas por ti</p>
        </div>
      </div>

      {loading && <LoadingSpinner message="Cargando favoritos..." />}

      {!loading && favorites.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-heart fs-1 text-muted d-block mb-3 opacity-25"></i>
          <h5 className="text-muted">Aún no tienes favoritos</h5>
          <p className="text-muted">Explora el catálogo y guarda las películas que más te gusten</p>
          <Link to="/" className="btn btn-primary">
            <i className="bi bi-collection-play me-2"></i>Ver catálogo
          </Link>
        </div>
      )}

      {!loading && favorites.length > 0 && (
        <>
          <p className="text-muted small mb-4">
            <i className="bi bi-collection me-2"></i>
            {favorites.length} película{favorites.length !== 1 ? 's' : ''} guardada{favorites.length !== 1 ? 's' : ''}
          </p>
          <div className="row g-4">
            {favorites.map((movie) => (
              <div key={movie.id} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="row g-0 h-100">
                    <div className="col-4">
                      <img
                        src={movie.posterUrl || 'https://via.placeholder.com/150x225?text=Sin+Imagen'}
                        alt={movie.title}
                        className="img-fluid h-100 rounded-start"
                        style={{ objectFit: 'cover', minHeight: 150 }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150x225?text=Sin+Imagen'; }}
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body d-flex flex-column h-100">
                        <div className="mb-1">
                          <span className="badge bg-primary me-1">{movie.year}</span>
                          <span className="badge bg-light text-secondary border small">{movie.genre}</span>
                        </div>
                        <h6 className="fw-bold mb-2 text-dark">{movie.title}</h6>
                        <div className="d-flex align-items-center gap-1 mb-3">
                          <StarRating value={Math.round(movie.averageRating || 0)} readOnly size="sm" />
                          <span className="text-muted small">
                            {movie.averageRating > 0 ? movie.averageRating.toFixed(1) : '—'}
                          </span>
                        </div>
                        <div className="mt-auto d-flex gap-2">
                          <Link
                            to={`/movies/${movie.id}`}
                            className="btn btn-primary btn-sm flex-grow-1"
                          >
                            <i className="bi bi-play me-1"></i>Ver ficha
                          </Link>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemove(movie)}
                            disabled={removingId === movie.id}
                            title="Quitar de favoritos"
                          >
                            {removingId === movie.id ? (
                              <span className="spinner-border spinner-border-sm" />
                            ) : (
                              <i className="bi bi-heart-fill"></i>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
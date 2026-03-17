import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMovie } from '../hooks/useMovies';
import StarRating from '../components/movies/StarRating';
import CommentSection from '../components/movies/CommentSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AuthModal from '../components/auth/AuthModal';
import {
  rateMovie,
  getUserRating,
  toggleFavorite,
  checkIsFavorite,
} from '../../core/application/usescases/movieUseCases';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { movie, loading, error, refresh } = useMovie(id);

  const [showAuth, setShowAuth] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [ratingMsg, setRatingMsg] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [favMsg, setFavMsg] = useState('');

  useEffect(() => {
    if (currentUser && id) {
      getUserRating(id, currentUser.uid).then((r) => setUserRating(r || 0));
      checkIsFavorite(currentUser.uid, id).then(setIsFavorite);
    } else {
      setUserRating(0);
      setIsFavorite(false);
    }
  }, [currentUser, id]);

  const handleRate = async (rating) => {
    if (!currentUser) return setShowAuth(true);
    setRatingLoading(true);
    setRatingMsg('');
    try {
      await rateMovie(id, currentUser.uid, rating);
      setUserRating(rating);
      setRatingMsg('¡Puntuación guardada!');
      refresh();
      setTimeout(() => setRatingMsg(''), 3000);
    } catch (err) {
      setRatingMsg(err.message);
    } finally {
      setRatingLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!currentUser) return setShowAuth(true);
    setFavLoading(true);
    setFavMsg('');
    try {
      const added = await toggleFavorite(currentUser.uid, movie);
      setIsFavorite(added);
      setFavMsg(added ? '¡Añadida a favoritos!' : 'Eliminada de favoritos');
      setTimeout(() => setFavMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setFavLoading(false);
    }
  };

  if (loading) return <div className="container py-5"><LoadingSpinner message="Cargando película..." /></div>;
  if (error) return (
    <div className="container py-5">
      <div className="alert alert-danger">
        <i className="bi bi-exclamation-triangle me-2"></i>Error: {error}
      </div>
    </div>
  );
  if (!movie) return (
    <div className="container py-5 text-center">
      <i className="bi bi-film fs-1 text-muted d-block mb-3"></i>
      <h4>Película no encontrada</h4>
      <Link to="/" className="btn btn-primary">Volver al catálogo</Link>
    </div>
  );

  return (
    <>
      {/* Favorite banner — shown when marked as favorite */}
      {isFavorite && (
        <div
          className="py-2 text-center"
          style={{ background: 'linear-gradient(90deg, #ffeef0, #fff0f3, #ffeef0)', borderBottom: '1px solid #fecdd3' }}
        >
          <span className="text-danger fw-semibold small">
            <i className="bi bi-heart-fill me-2"></i>
            Esta película está en tu lista de favoritos
          </span>
        </div>
      )}

      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-primary">
                <i className="bi bi-house-door me-1"></i>Catálogo
              </Link>
            </li>
            <li className="breadcrumb-item active text-muted">{movie.title}</li>
          </ol>
        </nav>

        {/* Main info */}
        <div className="row g-4 mb-5">
          {/* Poster */}
          <div className="col-md-4 col-lg-3">
            <div className="position-sticky" style={{ top: '100px' }}>
              <div className="position-relative">
                <img
                  src={movie.posterUrl || 'https://via.placeholder.com/300x450?text=Sin+Imagen'}
                  alt={`Póster de ${movie.title}`}
                  className="img-fluid rounded-3 shadow w-100"
                  style={{ objectFit: 'cover', maxHeight: 450 }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=Sin+Imagen'; }}
                />
                {/* Favorite badge on poster */}
                {isFavorite && (
                  <div
                    className="position-absolute bottom-0 start-0 end-0 d-flex align-items-center justify-content-center py-2 rounded-bottom-3"
                    style={{ background: 'rgba(220,38,38,0.88)', backdropFilter: 'blur(4px)' }}
                  >
                    <i className="bi bi-heart-fill text-white me-2"></i>
                    <span className="text-white fw-semibold small">En tus favoritos</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="col-md-8 col-lg-9">
            <div className="d-flex flex-wrap align-items-start gap-2 mb-2">
              <span className="badge bg-primary">{movie.year}</span>
              <span className="badge bg-light text-secondary border">{movie.genre}</span>
              <span className="badge bg-light text-secondary border">
                <i className="bi bi-clock me-1"></i>{movie.duration}
              </span>
              {isFavorite && (
                <span className="badge bg-danger">
                  <i className="bi bi-heart-fill me-1"></i>Favorita
                </span>
              )}
            </div>

            <h1 className="fw-bold text-dark mb-1">{movie.title}</h1>
            <p className="text-muted mb-3">
              <i className="bi bi-camera-video me-2"></i>
              Dirigida por <span className="fw-semibold text-dark">{movie.director}</span>
            </p>

            {/* Average rating */}
            <div className="card border-0 bg-light p-3 mb-4 d-inline-flex flex-row align-items-center gap-3 rounded-3">
              <div className="text-center">
                <div className="display-6 fw-bold text-warning lh-1">
                  {movie.averageRating > 0 ? movie.averageRating.toFixed(1) : '—'}
                </div>
                <small className="text-muted">de 5</small>
              </div>
              <div>
                <StarRating value={Math.round(movie.averageRating)} readOnly size="md" />
                <p className="mb-0 text-muted small mt-1">
                  {movie.totalRatings > 0
                    ? `${movie.totalRatings} valoración${movie.totalRatings !== 1 ? 'es' : ''}`
                    : 'Sin valoraciones aún'}
                </p>
              </div>
            </div>

            {/* Synopsis */}
            <h6 className="fw-bold text-dark mb-2">
              <i className="bi bi-card-text me-2 text-primary"></i>Sinopsis
            </h6>
            <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>{movie.synopsis}</p>

            {/* Cast */}
            {movie.cast?.length > 0 && (
              <div className="mb-4">
                <h6 className="fw-bold text-dark mb-2">
                  <i className="bi bi-people me-2 text-primary"></i>Reparto
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {movie.cast.map((actor) => (
                    <span key={actor} className="badge bg-white border text-dark fw-normal">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions card */}
            <div className="card border-0 shadow-sm p-4">
              <div className="row g-4">
                {/* Rating section */}
                <div className="col-md-6 border-end-md">
                  <h6 className="fw-bold mb-1 d-flex align-items-center gap-2">
                    <i className="bi bi-star-fill text-warning"></i>Tu valoración
                  </h6>
                  {currentUser ? (
                    <>
                      <p className="text-muted small mb-2">
                        {userRating > 0 ? `Has puntuado esta película con ${userRating}/5` : 'Aún no has puntuado esta película'}
                      </p>
                      <div className="d-flex align-items-center gap-2">
                        <StarRating value={userRating} onChange={handleRate} size="lg" />
                        {ratingLoading && <span className="spinner-border spinner-border-sm text-primary" />}
                      </div>
                      {ratingMsg && (
                        <div className={`alert py-1 px-2 mt-2 small mb-0 ${ratingMsg.includes('!') ? 'alert-success' : 'alert-warning'}`}>
                          <i className={`bi ${ratingMsg.includes('!') ? 'bi-check-circle' : 'bi-exclamation-circle'} me-1`}></i>
                          {ratingMsg}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-muted small mb-2">Inicia sesión para valorar</p>
                      <button className="btn btn-outline-warning btn-sm" onClick={() => setShowAuth(true)}>
                        <i className="bi bi-star me-2"></i>Valorar película
                      </button>
                    </div>
                  )}
                </div>

                {/* Favorite section */}
                <div className="col-md-6">
                  <h6 className="fw-bold mb-1 d-flex align-items-center gap-2">
                    <i className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart text-danger'}`}></i>
                    Favoritos
                  </h6>
                  {currentUser ? (
                    <>
                      {/* Big prominent favorite toggle */}
                      <button
                        className={`btn w-100 fw-semibold py-2 mt-1 ${isFavorite
                            ? 'btn-danger'
                            : 'btn-outline-danger'
                          }`}
                        onClick={handleToggleFavorite}
                        disabled={favLoading}
                        style={{ transition: 'all 0.2s' }}
                      >
                        {favLoading ? (
                          <><span className="spinner-border spinner-border-sm me-2" />Actualizando...</>
                        ) : isFavorite ? (
                          <><i className="bi bi-heart-fill me-2"></i>En tu lista de favoritos</>
                        ) : (
                          <><i className="bi bi-heart me-2"></i>Añadir a favoritos</>
                        )}
                      </button>
                      {isFavorite && (
                        <p className="text-muted small mt-2 mb-0 text-center">
                          <i className="bi bi-info-circle me-1"></i>
                          Puedes verla en <Link to="/favorites" className="text-danger">tu lista</Link>
                        </p>
                      )}
                      {favMsg && (
                        <div className={`alert py-1 px-2 mt-2 small mb-0 ${isFavorite ? 'alert-danger' : 'alert-secondary'}`}>
                          <i className="bi bi-check-circle me-1"></i>{favMsg}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-muted small mb-2">Inicia sesión para guardar favoritos</p>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => setShowAuth(true)}>
                        <i className="bi bi-heart me-2"></i>Guardar como favorita
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-5" />

        {/* Comments */}
        <CommentSection movieId={id} onAuthRequired={() => setShowAuth(true)} />
      </div>

      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default MovieDetailPage;
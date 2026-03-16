import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const MovieCard = ({ movie, isFavorite = false, onToggleFavorite, onAuthRequired }) => {
  const { id, title, year, genre, posterUrl, averageRating, totalRatings } = movie;
  const [favLoading, setFavLoading] = useState(false);
  const [localFav, setLocalFav] = useState(isFavorite);

  React.useEffect(() => {
    setLocalFav(isFavorite);
  }, [isFavorite]);

  const handleFavClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!onToggleFavorite) return onAuthRequired?.();

    setFavLoading(true);
    try {
      const added = await onToggleFavorite(movie);
      setLocalFav(added);
    } catch {
      // silent
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <div className="card h-100 border-0 shadow-sm movie-card">
      <div className="position-relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
        <img
          src={posterUrl || 'https://via.placeholder.com/300x450?text=Sin+Imagen'}
          alt={`Póster de ${title}`}
          className="card-img-top w-100 h-100 object-fit-cover movie-poster"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=Sin+Imagen';
          }}
        />
        <div className="movie-overlay d-flex align-items-end p-3">
          <Link
            to={`/movies/${id}`}
            className="btn btn-light btn-sm w-100 fw-semibold"
          >
            <i className="bi bi-play-fill me-1"></i>Ver ficha
          </Link>
        </div>

        {/* Year badge */}
        <span className="badge bg-primary position-absolute top-0 start-0 m-2">{year}</span>

        {/* Favorite button — top right */}
        <button
          className={`btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle favorite-btn ${localFav ? 'btn-danger' : 'btn-light'
            }`}
          style={{ width: 34, height: 34, padding: 0, lineHeight: 1, zIndex: 2 }}
          onClick={handleFavClick}
          disabled={favLoading}
          title={localFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {favLoading ? (
            <span className="spinner-border spinner-border-sm" style={{ width: 14, height: 14 }} />
          ) : (
            <i className={`bi ${localFav ? 'bi-heart-fill' : 'bi-heart'}`} style={{ fontSize: 15 }}></i>
          )}
        </button>
      </div>

      <div className="card-body d-flex flex-column gap-1 p-3">
        <h6 className="card-title mb-0 fw-bold text-dark">
          <Link to={`/movies/${id}`} className="text-decoration-none text-dark">
            {title}
          </Link>
        </h6>
        <span className="badge bg-light text-secondary border small align-self-start">{genre}</span>
        <div className="d-flex align-items-center justify-content-between mt-auto pt-1">
          <div className="d-flex align-items-center gap-1">
            <StarRating value={Math.round(averageRating)} readOnly size="sm" />
            <span className="text-muted small">
              {averageRating > 0
                ? `${averageRating.toFixed(1)} (${totalRatings})`
                : 'Sin votos'}
            </span>
          </div>
          {localFav && (
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 small">
              <i className="bi bi-heart-fill me-1" style={{ fontSize: 10 }}></i>Favorita
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
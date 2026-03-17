import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getComments, addComment } from '../../../core/application/usescases/movieUseCases';

const formatDate = (date) => {
  if (!date) return '';
  try {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date instanceof Date ? date : new Date(date));
  } catch {
    return '';
  }
};

const CommentSection = ({ movieId, onAuthRequired }) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      const data = await getComments(movieId);
      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) fetchComments();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return onAuthRequired?.();

    setError('');
    setSubmitting(true);
    try {
      await addComment(movieId, currentUser.uid, currentUser.email, text);
      setText('');
      fetchComments();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h5 className="fw-bold mb-4">
        <i className="bi bi-chat-dots me-2 text-primary"></i>
        Comentarios ({comments.length})
      </h5>

      {/* Comment form */}
      <div className="card border-0 bg-light mb-4">
        <div className="card-body">
          {currentUser ? (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger py-2 small mb-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>{error}
                </div>
              )}
              <div className="mb-3">
                <label className="form-label fw-semibold small">Tu comentario</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="¿Qué te pareció la película?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  minLength={3}
                  maxLength={500}
                />
                <div className="text-end mt-1">
                  <small className="text-muted">{text.length}/500</small>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-sm fw-semibold"
                disabled={submitting || text.trim().length < 3}
              >
                {submitting ? (
                  <><span className="spinner-border spinner-border-sm me-2" />Enviando...</>
                ) : (
                  <><i className="bi bi-send me-2"></i>Publicar comentario</>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-2">
              <i className="bi bi-chat-square-text fs-3 text-muted d-block mb-2"></i>
              <p className="text-muted mb-2">Inicia sesión para dejar un comentario</p>
              <button className="btn btn-primary btn-sm" onClick={onAuthRequired}>
                <i className="bi bi-person me-2"></i>Acceder
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments list */}
      {loading ? (
        <div className="text-center py-3">
          <span className="spinner-border spinner-border-sm text-primary me-2" />
          <span className="text-muted small">Cargando comentarios...</span>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-4 text-muted">
          <i className="bi bi-chat fs-1 d-block mb-2 opacity-25"></i>
          <p className="mb-0">Sé el primero en comentar esta película</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {comments.map((comment) => (
            <div key={comment.id} className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <div
                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ width: 36, height: 36, fontSize: 14, flexShrink: 0 }}
                  >
                    {comment.userEmail?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <p className="mb-0 fw-semibold small">{comment.userEmail}</p>
                    <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="mb-0 text-dark" style={{ lineHeight: 1.6 }}>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
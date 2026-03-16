import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ show, onClose }) => {
  const { login, register } = useAuth();
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setEmail('');
    setPassword('');
    setConfirm('');
    setError('');
    setTab('login');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const getFirebaseError = (code) => {
    const messages = {
      'auth/email-already-in-use': 'Este correo ya está registrado.',
      'auth/invalid-email': 'El correo no es válido.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
      'auth/user-not-found': 'No existe una cuenta con ese correo.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/invalid-credential': 'Credenciales inválidas. Comprueba tu correo y contraseña.',
      'auth/too-many-requests': 'Demasiados intentos. Inténtalo más tarde.',
    };
    return messages[code] || 'Ha ocurrido un error. Inténtalo de nuevo.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (tab === 'register' && password !== confirm) {
      return setError('Las contraseñas no coinciden.');
    }

    setLoading(true);
    try {
      if (tab === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      handleClose();
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-film text-primary fs-4"></i>
              <h5 className="modal-title fw-bold text-primary mb-0">CineApp</h5>
            </div>
            <button type="button" className="btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body pt-0">
            {/* Tabs */}
            <ul className="nav nav-tabs mb-4 mt-3 border-bottom">
              <li className="nav-item">
                <button
                  className={`nav-link fw-semibold ${tab === 'login' ? 'active text-primary' : 'text-muted'}`}
                  onClick={() => { setTab('login'); setError(''); }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fw-semibold ${tab === 'register' ? 'active text-primary' : 'text-muted'}`}
                  onClick={() => { setTab('register'); setError(''); }}
                >
                  <i className="bi bi-person-plus me-2"></i>Registrarse
                </button>
              </li>
            </ul>

            {error && (
              <div className="alert alert-danger py-2 small">
                <i className="bi bi-exclamation-triangle me-2"></i>{error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Correo electrónico</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-envelope text-muted"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-lock text-muted"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {tab === 'register' && (
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Confirmar contraseña</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-lock-fill text-muted"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0"
                      placeholder="Repite la contraseña"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold py-2 mt-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Cargando...
                  </>
                ) : tab === 'login' ? (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i>Crear cuenta
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
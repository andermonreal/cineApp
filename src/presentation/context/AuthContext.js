import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { FirebaseAuthRepository } from '../../infrastructure/firebase/FirebaseAuthRepository';

const AuthContext = createContext(null);

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutos
const WARNING_BEFORE_MS = 60 * 1000;        // Aviso 1 minuto antes

// Eventos que se consideran "actividad" del usuario
const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const inactivityTimer = useRef(null);
  const warningTimer = useRef(null);

  const logout = useCallback(() => FirebaseAuthRepository.logout(), []);

  const clearTimers = useCallback(() => {
    clearTimeout(inactivityTimer.current);
    clearTimeout(warningTimer.current);
  }, []);

  const resetTimers = useCallback(() => {
    if (!currentUser) return;

    clearTimers();
    setShowWarning(false);

    // Aviso 1 minuto antes del logout
    warningTimer.current = setTimeout(() => {
      setShowWarning(true);
    }, INACTIVITY_TIMEOUT_MS - WARNING_BEFORE_MS);

    // Logout al cumplirse los 10 minutos
    inactivityTimer.current = setTimeout(() => {
      setShowWarning(false);
      logout();
    }, INACTIVITY_TIMEOUT_MS);
  }, [currentUser, clearTimers, logout]);

  // Escuchar eventos de actividad — solo cuando hay sesión activa
  useEffect(() => {
    if (!currentUser) {
      clearTimers();
      setShowWarning(false);
      return;
    }

    resetTimers();

    const handleActivity = () => resetTimers();
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }));

    return () => {
      clearTimers();
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, handleActivity));
    };
  }, [currentUser, resetTimers, clearTimers]);

  // Observar cambios de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = FirebaseAuthRepository.onAuthChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    await FirebaseAuthRepository.login(email, password);
  };

  const register = async (email, password) => {
    setAuthError(null);
    await FirebaseAuthRepository.register(email, password);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    authError,
    setAuthError,
    resetInactivityTimer: resetTimers,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}

      {/* ── Aviso de sesión a punto de expirar ── */}
      {showWarning && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x mb-4"
          style={{ zIndex: 9999, minWidth: 320 }}
        >
          <div className="alert alert-warning shadow-lg d-flex align-items-center gap-3 mb-0 border-0 rounded-3 px-4 py-3">
            <i className="bi bi-clock-history fs-4 text-warning flex-shrink-0"></i>
            <div className="flex-grow-1">
              <p className="mb-0 fw-semibold small">Tu sesión va a expirar</p>
              <p className="mb-0 text-muted" style={{ fontSize: '0.78rem' }}>
                Se cerrará por inactividad en 1 minuto
              </p>
            </div>
            <button
              className="btn btn-warning btn-sm fw-semibold flex-shrink-0"
              onClick={resetTimers}
            >
              Seguir conectado
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
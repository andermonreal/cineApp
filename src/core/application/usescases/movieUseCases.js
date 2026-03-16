import { FirebaseMovieRepository } from '../../../infrastructure/firebase/FirebaseMovieRepository';
import { FirebaseCommentRepository } from '../../../infrastructure/firebase/FirebaseCommentRepository';
import { FirebaseFavoriteRepository } from '../../../infrastructure/firebase/FirebaseFavoriteRepository';

// ── Movie Use Cases ──────────────────────────────────────────────────────────

export const getAllMovies = () => FirebaseMovieRepository.getAll();

export const getMovieById = (id) => FirebaseMovieRepository.getById(id);

export const rateMovie = async (movieId, userId, rating) => {
  if (!userId) throw new Error('Debes estar registrado para puntuar.');
  if (rating < 1 || rating > 5) throw new Error('La puntuación debe ser entre 1 y 5.');
  await FirebaseMovieRepository.updateRating(movieId, userId, rating);
};

export const getUserRating = (movieId, userId) =>
  FirebaseMovieRepository.getRatingByUser(movieId, userId);

// ── Comment Use Cases ────────────────────────────────────────────────────────

export const getComments = (movieId) =>
  FirebaseCommentRepository.getByMovieId(movieId);

export const addComment = async (movieId, userId, userEmail, text) => {
  if (!userId) throw new Error('Debes estar registrado para comentar.');
  const trimmed = text?.trim();
  if (!trimmed || trimmed.length < 3)
    throw new Error('El comentario debe tener al menos 3 caracteres.');
  return FirebaseCommentRepository.add(movieId, userId, userEmail, trimmed);
};

// ── Favorite Use Cases ───────────────────────────────────────────────────────

export const getFavorites = (userId) =>
  FirebaseFavoriteRepository.getByUserId(userId);

export const toggleFavorite = (userId, movie) =>
  FirebaseFavoriteRepository.toggle(userId, movie);

export const checkIsFavorite = (userId, movieId) =>
  FirebaseFavoriteRepository.isFavorite(userId, movieId);

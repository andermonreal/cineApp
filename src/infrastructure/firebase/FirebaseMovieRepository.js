import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import { createMovie } from '../../core/domain/entities/Movie';

const MOVIES_COLLECTION = 'movies';
const RATINGS_COLLECTION = 'ratings';

const mapDocToMovie = (docSnap) => {
  const data = docSnap.data();
  return createMovie({ id: docSnap.id, ...data });
};

export const FirebaseMovieRepository = {
  getAll: async () => {
    const snapshot = await getDocs(collection(db, MOVIES_COLLECTION));
    return snapshot.docs.map(mapDocToMovie);
  },

  getById: async (id) => {
    const docRef = doc(db, MOVIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return mapDocToMovie(docSnap);
  },

  getRatingByUser: async (movieId, userId) => {
    const ratingRef = doc(db, MOVIES_COLLECTION, movieId, RATINGS_COLLECTION, userId);
    const snap = await getDoc(ratingRef);
    return snap.exists() ? snap.data().value : null;
  },

  updateRating: async (movieId, userId, newRating) => {
    const movieRef = doc(db, MOVIES_COLLECTION, movieId);
    const ratingRef = doc(db, MOVIES_COLLECTION, movieId, RATINGS_COLLECTION, userId);
    const existingSnap = await getDoc(ratingRef);

    if (existingSnap.exists()) {
      const oldRating = existingSnap.data().value;
      const movieSnap = await getDoc(movieRef);
      const { averageRating, totalRatings } = movieSnap.data();
      const newAverage =
        (averageRating * totalRatings - oldRating + newRating) / totalRatings;

      await setDoc(ratingRef, { value: newRating, updatedAt: serverTimestamp() });
      await updateDoc(movieRef, { averageRating: parseFloat(newAverage.toFixed(2)) });
    } else {
      const movieSnap = await getDoc(movieRef);
      const { averageRating = 0, totalRatings = 0 } = movieSnap.data() || {};
      const newAverage =
        (averageRating * totalRatings + newRating) / (totalRatings + 1);

      await setDoc(ratingRef, { value: newRating, createdAt: serverTimestamp() });
      await updateDoc(movieRef, {
        averageRating: parseFloat(newAverage.toFixed(2)),
        totalRatings: increment(1),
      });
    }
  },
};

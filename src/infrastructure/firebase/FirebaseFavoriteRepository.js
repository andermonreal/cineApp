import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './config';

const USERS_COLLECTION = 'users';
const FAVORITES_COLLECTION = 'favorites';

export const FirebaseFavoriteRepository = {
  getByUserId: async (userId) => {
    const favRef = collection(db, USERS_COLLECTION, userId, FAVORITES_COLLECTION);
    const snapshot = await getDocs(favRef);
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  },

  isFavorite: async (userId, movieId) => {
    const favRef = doc(db, USERS_COLLECTION, userId, FAVORITES_COLLECTION, movieId);
    const snap = await getDoc(favRef);
    return snap.exists();
  },

  toggle: async (userId, movie) => {
    const favRef = doc(db, USERS_COLLECTION, userId, FAVORITES_COLLECTION, movie.id);
    const snap = await getDoc(favRef);

    if (snap.exists()) {
      await deleteDoc(favRef);
      return false;
    } else {
      await setDoc(favRef, {
        title: movie.title,
        year: movie.year,
        genre: movie.genre,
        posterUrl: movie.posterUrl,
        averageRating: movie.averageRating,
      });
      return true;
    }
  },
};

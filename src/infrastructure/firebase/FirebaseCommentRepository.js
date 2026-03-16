import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

const MOVIES_COLLECTION = 'movies';
const COMMENTS_COLLECTION = 'comments';

export const FirebaseCommentRepository = {
  getByMovieId: async (movieId) => {
    const commentsRef = collection(db, MOVIES_COLLECTION, movieId, COMMENTS_COLLECTION);
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate?.() ?? new Date(),
    }));
  },

  add: async (movieId, userId, userEmail, text) => {
    const commentsRef = collection(db, MOVIES_COLLECTION, movieId, COMMENTS_COLLECTION);
    const docRef = await addDoc(commentsRef, {
      userId,
      userEmail,
      text,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },
};

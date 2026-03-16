import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './config';

export const FirebaseAuthRepository = {
  register: (email, password) =>
    createUserWithEmailAndPassword(auth, email, password),

  login: (email, password) =>
    signInWithEmailAndPassword(auth, email, password),

  logout: () => signOut(auth),

  onAuthChange: (callback) => onAuthStateChanged(auth, callback),
};

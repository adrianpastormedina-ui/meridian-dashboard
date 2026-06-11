/**
 * Firebase initialization for Meridian Apex Zenith
 * Connects to the real Firebase project used by student.html and admin.html
 */

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCD-shiKELguyVarLGo90TkbSfp_FZgxAc",
  authDomain: "dashboard-alumnos-d974e.firebaseapp.com",
  projectId: "dashboard-alumnos-d974e",
  storageBucket: "dashboard-alumnos-d974e.firebasestorage.app",
  messagingSenderId: "732429521127",
  appId: "1:732429521127:web:84c4ac989e1259bc9e5242",
  measurementId: "G-DFJT3S1MED"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

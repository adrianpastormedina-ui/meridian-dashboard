import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCD-shiKELguyVarLGo90TkbSfp_FZgxAc",
  authDomain: "dashboard-alumnos-d974e.firebaseapp.com",
  projectId: "dashboard-alumnos-d974e",
  storageBucket: "dashboard-alumnos-d974e.firebasestorage.app",
  messagingSenderId: "732429521127",
  appId: "1:732429521127:web:84c4ac989e1259bc9e5242",
  measurementId: "G-DFJT3S1MED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

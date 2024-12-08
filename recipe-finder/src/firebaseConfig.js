// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiqCsZLvPw_pNX09XFxK8ZuodDRJ-7sCw",
  authDomain: "recipe-finder-app-2e8fa.firebaseapp.com",
  projectId: "recipe-finder-app-2e8fa",
  storageBucket: "recipe-finder-app-2e8fa.firebasestorage.app",
  messagingSenderId: "660048419411",
  appId: "1:660048419411:web:87a07f0417af83d654c4a6",
  measurementId: "G-Y7SX2YDZJX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);   // Authentication Service
export const db = getFirestore(app);  // Firestore Database
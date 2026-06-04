// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyDFoV3FsIeV5Wotq2RJZVltnAfGso_8Ass",
  authDomain: "dashdata-28654.firebaseapp.com",
  projectId: "dashdata-28654",
  storageBucket: "dashdata-28654.firebasestorage.app",
  messagingSenderId: "4885368596",
  appId: "1:4885368596:web:f6b0e51a7f0273530f3c01"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (Base de datos) y exportarla
export const db = getFirestore(app);
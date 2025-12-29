// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ REPLACE THESE VALUES WITH YOUR OWN FROM FIREBASE CONSOLE
const firebaseConfig = {
    apiKey: "AIzaSyCq9NNjY7Ek64WwmbLh9gB9fg6PyE6Gbxs",
    authDomain: "proxy-75f64.firebaseapp.com",
    projectId: "proxy-75f64",
    storageBucket: "proxy-75f64.firebasestorage.app",
    messagingSenderId: "165566576152",
    appId: "1:165566576152:web:a20ad1537c956af64c756d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQvpLxSg7Rf4CYqzduMTZZPWH2YX3eytM",
    authDomain: "e-commerce-9557d.firebaseapp.com",
    projectId: "e-commerce-9557d",
    storageBucket: "e-commerce-9557d.firebasestorage.app",
    messagingSenderId: "943360865134",
    appId: "1:943360865134:web:769da738486ee8b594477f",
    measurementId: "G-12ZE3674RB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
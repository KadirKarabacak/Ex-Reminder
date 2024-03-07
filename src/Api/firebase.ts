import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Default Setup
const firebaseApp = initializeApp({
    apiKey: "AIzaSyCTDVf4r8rsaIL1gRMnXl6tmGrC-Cl4e1w",
    authDomain: "my-router-project.firebaseapp.com",
    projectId: "my-router-project",
    storageBucket: "my-router-project.appspot.com",
    messagingSenderId: "999918257827",
    appId: "1:999918257827:web:d679ac1b87b845cd27a116",
    measurementId: "G-9H14BENC87",
});
export const db = getFirestore(firebaseApp);
export const auth = getAuth();
export const storage = getStorage();

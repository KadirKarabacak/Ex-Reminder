import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//: Firebase Default Setup
// const firebaseApp = initializeApp({
//     apiKey: "AIzaSyCTDVf4r8rsaIL1gRMnXl6tmGrC-Cl4e1w",
//     authDomain: "my-router-project.firebaseapp.com",
//     projectId: "my-router-project",
//     storageBucket: "my-router-project.appspot.com",
//     messagingSenderId: "999918257827",
//     appId: "1:999918257827:web:d679ac1b87b845cd27a116",
//     measurementId: "G-9H14BENC87",
// });

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth();
export const storage = getStorage();

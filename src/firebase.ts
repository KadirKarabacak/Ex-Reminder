import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCTDVf4r8rsaIL1gRMnXl6tmGrC-Cl4e1w",
    authDomain: "my-router-project.firebaseapp.com",
    projectId: "my-router-project",
    storageBucket: "my-router-project.appspot.com",
    messagingSenderId: "999918257827",
    appId: "1:999918257827:web:d679ac1b87b845cd27a116",
    measurementId: "G-9H14BENC87",
});
const db = getFirestore(firebaseApp);

const getUsers = async () => {
    const querySnapShot = await getDocs(collection(db, "users"));
    querySnapShot.forEach(doc => {
        // QJWrqzU0WtrHqlgoOQ7z, firstName - lastName - email
        console.log(doc.id, doc.data());
    });
};
getUsers();

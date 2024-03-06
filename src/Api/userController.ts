import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "./firebase";
import { CurrentUserTypes, LoginTypes } from "../Interfaces/User";

// // Firebase Default Setup
// const firebaseApp = initializeApp({
//     apiKey: "AIzaSyCTDVf4r8rsaIL1gRMnXl6tmGrC-Cl4e1w",
//     authDomain: "my-router-project.firebaseapp.com",
//     projectId: "my-router-project",
//     storageBucket: "my-router-project.appspot.com",
//     messagingSenderId: "999918257827",
//     appId: "1:999918257827:web:d679ac1b87b845cd27a116",
//     measurementId: "G-9H14BENC87",
// });
// const db = getFirestore(firebaseApp);
// export const auth = getAuth();

// Get All Users
export const getUsers = async () => {
    const querySnapShot = await getDocs(collection(db, "users"));
    querySnapShot.forEach(doc => {
        console.log(doc.id, doc.data());
    });
};

// Login
export const signInWithEmailAndPasswordQuery = async ({
    email,
    password,
}: LoginTypes) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        if (user) {
            toast.success("Successfully logged in, redirecting...");
            return true;
        }
    } catch (error) {
        toast.error(
            "Wrong email or password. Check your credentials and try again"
        );
    }
    return false;
};

// Create new user
export const createUserWithEmailAndPasswordQuery = async ({
    email,
    password,
}: LoginTypes) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        await sendEmailVerification(user);
        if (user) {
            toast.success(
                "User successfully created, check your email for verification."
            );
            return true;
        }
    } catch (error) {
        toast.error("There was an error creating the user.");
    }
    return false;
};

// Logout
export const logOut = async () => {
    signOut(auth)
        .then(() => {
            console.log("Logged out");
            toast.success("Successfully logged out");
        })
        .catch(error => {
            toast.error(`Something went wrong with ${error.message}`);
        });
};

// Update user profile with name and photoURL
export const updateUserProfile = function ({
    currentUser,
    displayName,
    photoURL,
}: CurrentUserTypes) {
    updateProfile(currentUser, {
        displayName: displayName,
        photoURL: photoURL,
    })
        .then(() => {
            console.log("Profile updated");
        })
        .catch(error => {
            console.log(error.message);
        });
};

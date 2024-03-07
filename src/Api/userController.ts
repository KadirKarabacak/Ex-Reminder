import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db, storage } from "./firebase";
import { CurrentUserTypes, LoginTypes } from "../Interfaces/User";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

export const updateUser = async ({
    photoURL,
    displayName,
    currentUser,
}: CurrentUserTypes) => {
    if (!photoURL) return;
    const imageRef = ref(storage, `images/${photoURL[0]}`);

    await uploadBytes(imageRef, photoURL[0]);

    await getDownloadURL(imageRef).then(url => {
        updateProfile(currentUser, {
            displayName,
            photoURL: url,
        });
        toast.success("Profile updated");
    });
};

// export const useUpdateUser = async function () {
//     const queryClient = useQueryClient();
//     const { mutate: editUser, isPending } = useMutation({
//         mutationFn: updateUser,
//         onSuccess: () => {
//             toast.success("Profile updated");
//             queryClient.invalidateQueries();
//         },
//         onError: err => {
//             toast.error(err.message);
//         },
//     });
//     return { isPending, editUser };
// };

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    updateProfile,
    sendPasswordResetEmail,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    deleteUser,
    verifyBeforeUpdateEmail,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db, storage } from "./firebase";
import { CurrentUserTypes, LoginTypes } from "../Interfaces/User";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

//! Create new user [ Handle with react query ]
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
            ("Logged out");
            toast.success("Successfully logged out");
        })
        .catch(error => {
            toast.error(`Something went wrong with ${error.message}`);
        });
};

// Update user
const updateUser = async ({
    photoURL,
    displayName,
    currentUser,
}: CurrentUserTypes) => {
    if (photoURL.length > 0) {
        const imageRef = ref(storage, `images/${photoURL[0]}`);
        await uploadBytes(imageRef, photoURL[0]);
        await getDownloadURL(imageRef).then(url => {
            updateProfile(currentUser, {
                photoURL: url,
            });
        });
    }
    if (displayName.length > 0) {
        await updateProfile(currentUser, {
            displayName,
        });
    }
    // Remove password update from here
    // if (password.length > 0) {
    //     const credential = EmailAuthProvider.credential(
    //         currentUser.email,
    //         prompt(
    //             "Please enter your previous password for reauthentication"
    //         ) as string
    //     );
    //     await reauthenticateWithCredential(currentUser, credential);
    //     await updatePassword(currentUser, password);
    // }
};

// Update user Query
export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success("Profile updated");
            queryClient.invalidateQueries({ queryKey: ["updateUser"] });
        },
        onError: (err: any) => {
            toast.error(err.message);
        },
    });
    return { mutate, isPending };
}

// Reset Password
async function resetPasswordEmail(email: string) {
    await sendPasswordResetEmail(auth, email);
}

// Reset Password Query
export function useResetPasswordEmail() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: resetPasswordEmail,
        onSuccess: () => {
            toast.success("Password reset email sent");
            queryClient.invalidateQueries();
            navigate("/login");
        },
        onError: (err: any) => {
            toast.error(err.message);
        },
    });
    return { mutate, isPending };
}

// Delete user
async function deleteUserAccount({
    currentUser,
    password,
}: {
    currentUser: any;
    password: string;
}) {
    const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
    );
    await reauthenticateWithCredential(currentUser, credential);

    await deleteUser(currentUser).then(() => {
        logOut();
    });
}

// Delete user Query
export function useDeleteUserAccount() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (variables: { currentUser: any; password: string }) =>
            deleteUserAccount(variables),
        onSuccess: () => {
            toast.success("User deleted");
            queryClient.invalidateQueries();
        },
        onError: (err: any) => {
            toast.error(
                `Error on deleting user because of your password is wrong`
            );
        },
    });
    return { mutate, isPending };
}

// Update user email
export async function updateUserEmail(
    currentUser: any,
    email: string,
    password: string
) {
    const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
    );
    await reauthenticateWithCredential(currentUser, credential);
    await verifyBeforeUpdateEmail(currentUser, email);
}

// Update user email Query
// export function useUpdateUserEmail() {
//     const queryClient = useQueryClient();
//     const { mutate, isPending } = useMutation({
//         mutationFn: (variables: {
//             currentUser: any;
//             email: string;
//             password: string;
//         }) => updateUserEmail(variables),
//         onSuccess: () => {
//             toast.success("Email updated");
//             queryClient.invalidateQueries();
//         },
//         onError: (err: any) => {
//             toast.error(err.message);
//         },
//     });
//     return { mutate, isPending };
// }

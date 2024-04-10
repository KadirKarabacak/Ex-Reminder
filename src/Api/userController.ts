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
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db, storage } from "./firebase";
import {
    CurrentUserTypes,
    DeleteUserTypes,
    LoginTypes,
    UpdateUserEmailTypes,
    UpdateUserPasswordTypes,
} from "../Interfaces/User";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";

//: Login
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
            let ref = doc(db, "users", user.uid);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        email: docSnap.data().email,
                    })
                );
                localStorage.setItem("user-creds", JSON.stringify(user));
            }
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

//: Create new user
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
        if (user) {
            await sendEmailVerification(user);
            const ref = doc(db, "users", user.uid);
            await setDoc(ref, {
                email: user.email,
                createdAt: new Date(),
            });
            return true;
        }
    } catch (error: any) {
        if (error.message.includes("email-already-in-use")) {
            toast.error(i18n.t("Email already in use"));
        } else {
            console.log(error);
            toast.error(i18n.t("There was an error creating the user."));
        }
    }
    return false;
};

//: Logout
export const logOut = async () => {
    signOut(auth)
        .then(() => {
            return true;
        })
        .catch(error => {
            toast.error(i18n.t(`Something went wrong with ${error.message}`));
        });
    return false;
};

//: Update user
const updateUser = async ({
    photoURL,
    displayName,
    currentUser,
}: CurrentUserTypes) => {
    if (photoURL.length > 0) {
        const imageRef = ref(storage, `images/${photoURL[0]?.name}`);
        await uploadBytes(imageRef, photoURL[0]);
        const url = await getDownloadURL(imageRef);
        await updateProfile(currentUser, {
            photoURL: url,
        });
    }
    if (displayName) {
        await updateProfile(currentUser, {
            displayName,
        });
    }
};

//: Update user Query
export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success(i18n.t("Profile updated"));
            queryClient.invalidateQueries();
        },
        onError: (err: any) => {
            toast.error(err.message);
        },
    });
    return { mutate, isPending };
}

//: Reset Password [ Forgot Password ]
async function resetPasswordEmail(email: string) {
    await sendPasswordResetEmail(auth, email);
}

//: Reset Password Query [ Forgot Password ]
export function useResetPasswordEmail() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: resetPasswordEmail,
        onSuccess: () => {
            toast.success(i18n.t("Password reset email sent"));
            queryClient.invalidateQueries();
            navigate("/login");
        },
        onError: (err: any) => {
            toast.error(err.message);
        },
    });
    return { mutate, isPending };
}

//: Delete user
async function deleteUserAccount({
    currentUser,
    password,
    userId,
}: DeleteUserTypes) {
    const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
    );
    await reauthenticateWithCredential(currentUser, credential);
    await deleteDoc(doc(db, `users/${userId}`));
    await deleteUser(currentUser).then(() => {
        logOut();
    });
}

//: Delete user Query
export function useDeleteUserAccount() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (variables: DeleteUserTypes) =>
            deleteUserAccount(variables),
        onSuccess: () => {
            toast.success(i18n.t("User deleted"));
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error(
                i18n.t(
                    `Error on deleting user because of your password is wrong`
                )
            );
        },
    });
    return { mutate, isPending };
}

//: Update user email
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

//: Update user email Query
export function useUpdateUserEmail() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: UpdateUserEmailTypes) => {
            const { currentUser, email, password } = variables;
            await updateUserEmail(currentUser, email, password);
            return;
        },
        onSuccess: () => {
            toast.success(
                i18n.t("Your verification mail was sent successfully")
            );
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error(
                i18n.t("Incorrect password or email, check your credentials")
            );
        },
    });
    return { mutateAsync, isPending };
}

//: Update user password
export async function updateUserPassword({
    currentUser,
    password,
    newPassword,
}: UpdateUserPasswordTypes) {
    const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
    );
    await reauthenticateWithCredential(currentUser, credential);
    await updatePassword(currentUser, newPassword);
}

//: Update user password Query
export function useUpdateUserPassword() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: UpdateUserPasswordTypes) => {
            await updateUserPassword(variables);
            return;
        },
        onSuccess: () => {
            toast.success(i18n.t("Password successfully updated"));
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error(i18n.t("Wrong or invalid password"));
        },
    });
    return { mutateAsync, isPending };
}

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
import {
    CurrentUserTypes,
    DeleteUserTypes,
    Employee,
    LoginTypes,
    UpdateUserEmailTypes,
    UpdateUserPasswordTypes,
} from "../Interfaces/User";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";

// Get All Users
const getEmployees = async () => {
    const querySnapShot = await getDocs(collection(db, "employees"));
    const employees: Employee[] = [];
    querySnapShot.forEach(doc => employees.push(doc.data() as Employee));
    return employees;
};

export function useGetEmployees() {
    const { data, isLoading } = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees,
    });
    return { data, isLoading };
}

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
            return true;
        }
    } catch (error) {}
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
            return true;
        }
    } catch (error: any) {
        console.log(error.message);
        if (error.message.includes("email-already-in-use")) {
            toast.error(i18n.t("Email already in use"));
        } else {
            toast.error(i18n.t("There was an error creating the user."));
        }
    }
    return false;
};

// Logout
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
};

// Update user Query
export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success(i18n.t("Profile updated"));
            queryClient.invalidateQueries({ queryKey: ["updateUser"] });
        },
        onError: (err: any) => {
            toast.error(err.message);
        },
    });
    return { mutate, isPending };
}

// Reset Password [ Forgot Password ]
async function resetPasswordEmail(email: string) {
    await sendPasswordResetEmail(auth, email);
}

// Reset Password Query [ Forgot Password ]
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

// Delete user
async function deleteUserAccount({ currentUser, password }: DeleteUserTypes) {
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

// Update user password
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

// Update user password Query
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

//! OTHER CONTROLLERS

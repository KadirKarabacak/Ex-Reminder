import { User } from "firebase/auth";

export interface LoginTypes {
    email: string;
    password: string;
}

export interface CurrentUserTypes {
    currentUser: User;
    displayName: string;
    photoURL: string;
}

export interface LoginTypes {
    email: string;
    password: string;
}

export interface CurrentUserTypes {
    currentUser: any;
    displayName: string;
    photoURL: any;
}

export interface UpdateUserPasswordTypes {
    currentUser: any;
    password: string;
    newPassword: string;
}

export interface UpdateUserEmailTypes {
    currentUser: any;
    email: string;
    password: string;
}

export interface DeleteUserTypes {
    currentUser: any;
    password: string;
}

export interface ModalTypes {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

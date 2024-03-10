export interface LoginTypes {
    email: string;
    password: string;
}

export interface CurrentUserTypes {
    currentUser: any;
    displayName: string;
    photoURL: any;
}

export interface ModalTypes {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

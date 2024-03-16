import { ReactNode } from "react";

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

export interface Employee {
    first_name: string;
    age: number;
    department: string;
    email: string;
    employee_id: string;
    last_name: string;
    job_title: string;
    hire_date: string;
    manager_id: string;
    salary: string;
}

export interface UpdateEmployeeTypes {
    employee: object;
    id: string;
}

export interface EditEmployeeModalTypes {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    row: any;
}

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof EmployeeData
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export type Order = "asc" | "desc";

export interface ButtonGroupTypes {
    id: string;
    row: any;
}

export interface HeadingProps {
    title: string;
}

export interface ProtectedRouteProps {
    children: ReactNode;
}

export interface EmployeeData {
    age: string;
    department: string;
    email: string;
    employee_id: number;
    full_name: string;
    hire_date: string;
    job_title: string;
    salary: string;
}

export interface DeleteEmployeeTypes {
    id: string;
}

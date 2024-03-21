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
    userId: string | undefined;
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
    salary: string;
    id?: string;
}

export interface UpdateEmployeeTypes {
    employee: object;
    id: string;
    userId: string | undefined;
}

export interface EditEmployeeModalTypes {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    row: any;
}

export interface EditItemModalTypes {
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
    row: any;
    tableName: string;
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
    userId: string | undefined;
}

export interface DeleteItemTypes {
    id: string;
    userId: string | undefined;
}

export interface Warehouses {
    itemAmount?: number;
    itemId?: string;
    itemName: string;
    itemSalePrice?: number;
    itemPurchasePrice?: number;
    purchasePrice?: number;
    itemDescription?: string;
    id?: string;
    createdAt: Date;
}

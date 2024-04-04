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

export interface EditCompanyModalTypes {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    row: any;
}

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property:
            | keyof EmployeeData
            | keyof Warehouses
            | keyof Companies
            | keyof Sales
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

export interface DeleteCompanyTypes {
    id: string;
    userId: string | undefined;
}

export interface DeleteAgreementTypes {
    agreementId: any;
    userId: string | undefined;
    companyId: string | undefined;
}

export interface DeleteSaleTypes {
    id: any;
    userId: string | undefined;
    companyId: string | undefined;
    saleToDeleteId: any;
    deleteOption: string;
}

export interface Warehouses {
    itemAmount?: number;
    itemId?: string;
    itemName: string;
    itemSalePrice?: string;
    itemPurchasePrice?: number;
    purchasePrice?: number;
    itemDescription?: string;
    id?: string;
    createdAt: Date;
}

export interface TableRowTypes {
    isItemSelected: any;
    handleClick: any;
    index: number;
    labelId: string;
    row: any;
}

export interface UpdateCompanyTypes {
    company: object;
    id: string;
    userId: string | undefined;
}

export interface Companies {
    companyName: string;
    companyAddress: {
        companyCoordinates: {
            lat: any;
            lng: any;
        };
        district: string;
        doorNumber: string;
        neighbourhood: string;
        province: string;
        street: string;
    };
    companyPhone: number | string;
    companyEmail: string;
    companyWebsite: string;
    companyLogo: string;
    companyDescription: string;
    companyManager: {
        managerName: string;
        managerPhone: number | string;
        managerEmail: string;
    };
    id?: string;
    createdAt: string;
}

export interface Agreements {
    agreementBudget: string;
    agreementContent: string;
    agreementEndDate: string;
    agreementStartDate: string;
    agreementParties: string;
    createdAt: string;
    agreementId?: string;
    companyId?: string;
}

export interface Sales {
    saleItemId: string;
    saleItemName: string;
    saleItemAmount: number;
    saleItemPrice: number;
    saleCompanyId: string;
    saleCompanyName: string;
    saleDescription: string;
    saleCreatedAt: string;
    saleGuarantee: string;
    saleGuaranteeTime: string;
    id?: string;
    saleId?: string | undefined;
}

export interface UpdateAgreementTypes {
    editedAgreement: object;
    id: string;
    userId: string | undefined;
    companyId: string | undefined;
}

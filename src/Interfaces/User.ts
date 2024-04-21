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
    full_name: string;
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
    employee: EmployeeData;
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
    id?: string;
    full_name: string;
    hire_date: string;
    job_title: string;
    salary: string;
    createdAt?: string;
    editedAt?: string;
}

export interface DeleteEmployeeTypes {
    id: string;
    userId: string | undefined;
    row: EmployeeData;
}

export interface DeleteItemTypes {
    id: string;
    userId: string | undefined;
    row: Warehouses;
}

export interface DeleteCompanyTypes {
    id: string;
    userId: string | undefined;
    row: Companies;
}

export interface DeleteAgreementTypes {
    agreementId: any;
    userId: string | undefined;
    companyId: string | undefined;
    agreement: Agreements;
}

export interface DeleteSaleTypes {
    id: any;
    userId: string | undefined;
    companyId: string | undefined;
    saleToDeleteId: any;
    deleteOption: string;
    row: Sales;
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
    // index: number;
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
    companyAddress: CompanyAddressTypes;
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

export interface CompanyAddressTypes {
    companyCoordinates: {
        lat: any;
        lng: any;
    };
    district: string;
    doorNumber: string;
    neighbourhood: string;
    province: string;
    street: string;
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
    totalSalePrice: number;
}

export interface UpdateAgreementTypes {
    editedAgreement: object;
    id: string;
    userId: string | undefined;
    companyId: string | undefined;
}

export interface UpdateNegotiateTypes {
    negotiate: object;
    id: string;
    userId: string | undefined;
}

export interface NegotiateTypes {
    companyName: any;
    companyId: any;
    negotiateContent: string;
    negotiateDateAndTime: Date | string;
    negotiateAlarm: boolean;
    negotiateAlarmWarningTime: number;
    isAlarmDismissed: boolean;
    negotiateId?: string;
}

export interface UpdateItemTypes {
    item: Warehouses;
    id: any;
    userId: string | undefined;
}

export interface NotificationTypes {
    contentObj: any;
    createdAt?: Date | string;
    isReaded?: boolean;
    event: string;
    id?: string;
}

export interface UpdateNotificationTypes {
    notification: NotificationTypes;
    id: any;
    userId: string | undefined;
}

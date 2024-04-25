import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { updateItem } from "./warehouseController";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import i18n from "../i18n";
import toast from "react-hot-toast";
import { DeleteSaleTypes, Sales, Warehouses } from "../Interfaces/User";
import { useAddNotification } from "./notificationController";

//: Add Sale to Company
const addSale = async function (
    sale: Sales,
    selectedCompany: string | undefined,
    userId: string | undefined,
    item: Warehouses,
    id: string | undefined
) {
    await addDoc(
        collection(db, `users/${userId}/companies/${selectedCompany}/sales`),
        {
            ...sale,
            saleId: id,
        }
    );
    await addDoc(collection(db, `users/${userId}/accounting`), {
        ...sale,
        saleId: id,
    });

    await updateItem({ item, id, userId });
};

//: Add Sale to Company Query
export const useAddSale = function () {
    const queryClient = useQueryClient();
    const { addNotifications } = useAddNotification();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: {
            sale: any;
            selectedCompany: string | undefined;
            item: any;
            id: string | undefined;
        }) => {
            addSale(
                data.sale,
                data.selectedCompany,
                auth?.currentUser?.uid,
                data.item,
                data.id
            );
            return data;
        },
        onSuccess: async data => {
            await addNotifications({
                contentObj: data,
                event: "Add Sale",
            });
            toast.success(i18n.t("New Sale added successfully"));
            queryClient.invalidateQueries();
        },
        onError: err => {
            console.log(err);
            toast.error(i18n.t("There was an error adding the Sale"));
        },
    });
    return { mutateAsync, isPending };
};

//: Get Sales by companyId
const getSales = async (
    userId: string | undefined,
    companyId: string | undefined
) => {
    const querySnapShot = await getDocs(
        collection(db, `users/${userId}/companies/${companyId}/sales`)
    );

    const sales: Sales[] = [];
    querySnapShot.forEach(doc => {
        const saleData = doc.data() as Sales;
        sales.push({
            ...saleData,
            id: doc.id,
        });
    });

    return sales;
};

//: Get Sales by companyId Query
export function useGetSales(companyId: string) {
    const { data, isLoading } = useQuery({
        queryKey: ["companies"],
        queryFn: () => getSales(auth?.currentUser?.uid, companyId),
    });
    return { data, isLoading };
}

//: Delete Sales
const deleteSales = async function ({
    id,
    userId,
    companyId,
    saleToDeleteId,
    deleteOption,
}: DeleteSaleTypes) {
    const refCompany = doc(
        db,
        `users/${userId}/companies/${companyId}/sales`,
        id
    );
    const refAccounting = doc(db, `users/${userId}/accounting`, saleToDeleteId);
    try {
        await deleteDoc(refCompany);
        if (
            deleteOption === "Keep in Accounting" ||
            deleteOption === "Muhasebede Tut"
        )
            return toast.success(
                i18n.t("Sale successfully deleted from company")
            );
        //: If user don't want to delete sale from accounting, return before delete next line
        await deleteDoc(refAccounting);
        toast.success(
            i18n.t("Sale successfully deleted from company and accounting")
        );
    } catch (err) {
        console.error(err);
        toast.error(i18n.t("An error occurred while deleting the Sale"));
    }
};

//: Delete Sales Query
export const useDeleteSales = function () {
    const queryClient = useQueryClient();
    const { addNotifications } = useAddNotification();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: DeleteSaleTypes) => {
            await deleteSales(variables);
            return variables;
        },
        onSuccess: async data => {
            await addNotifications({
                contentObj: data.row,
                event: "Delete Sale",
            });
            queryClient.invalidateQueries();
        },
        onError: err => {
            console.log(err);
        },
    });
    return { mutateAsync, isPending };
};

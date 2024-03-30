import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { DeleteItemTypes, Warehouses } from "../Interfaces/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import i18n from "../i18n";

//! Get All Warehouse
const getWarehouse = async (userId: string | undefined) => {
    const querySnapShot = await getDocs(
        collection(db, `users/${userId}/warehouse`)
    );

    const warehouses: Warehouses[] = [];
    querySnapShot.forEach(doc => {
        const employeeData = doc.data() as Warehouses;
        warehouses.push({
            ...employeeData,
            id: doc.id,
        });
    });

    return warehouses;
};

//! Get All Warehouse Query
export function useGetWarehouse() {
    const { data, isLoading } = useQuery({
        queryKey: ["warehouses", auth?.currentUser?.uid],
        queryFn: () => getWarehouse(auth?.currentUser?.uid),
    });
    return { data, isLoading };
}

//! Add new item
const addItem = async function (item: object, userId: string | undefined) {
    await addDoc(collection(db, `users/${userId}/warehouse`), item);
};

//! Add new item Query
export const useAddItem = function () {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (item: object) => addItem(item, auth?.currentUser?.uid),
        onSuccess: () => {
            toast.success(i18n.t("New Item added successfully"));
            queryClient.invalidateQueries();
        },
        onError: err => {
            console.log(err);
            toast.error(i18n.t("There was an error adding the item"));
        },
    });
    return { mutate, isPending };
};

interface UpdateItemTypes {
    item: object;
    id: any;
    userId: string | undefined;
}

//! Update Item
export const updateItem = async function ({
    item,
    id,
    userId,
}: UpdateItemTypes) {
    const ref = doc(db, `users/${userId}/warehouse`, id);
    await updateDoc(ref, item);
};

//! Update Item Query
export const useUpdateItem = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: UpdateItemTypes) => {
            await updateItem(variables);
            return;
        },
        onSuccess: () => {
            toast.success(i18n.t("Item successfully edited"));
            queryClient.invalidateQueries();
        },
        onError: err => {
            console.log(err);
            toast.error(i18n.t("An error occurred while editing the item"));
        },
    });
    return { mutateAsync, isPending };
};

//! Delete Item
const deleteItem = async function ({ id, userId }: DeleteItemTypes) {
    const ref = doc(db, `users/${userId}/warehouse`, id);
    try {
        await deleteDoc(ref);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

//! Delete Item query
export const useDeleteItem = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: DeleteItemTypes) =>
            await deleteItem(variables),
        onSuccess: () => {
            toast.success(i18n.t("Item successfully deleted"));
            queryClient.invalidateQueries();
        },
        onError: err => {
            console.log(err);
            toast.error(i18n.t("An error occurred while deleting the item"));
        },
    });
    return { mutateAsync, isPending };
};

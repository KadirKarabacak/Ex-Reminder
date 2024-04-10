import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import i18n from "../i18n";
import {
    Companies,
    DeleteCompanyTypes,
    UpdateCompanyTypes,
} from "../Interfaces/User";

//: Get All Companies
const getCompanies = async (userId: string | undefined) => {
    const querySnapShot = await getDocs(
        collection(db, `users/${userId}/companies`)
    );

    const companies: Companies[] = [];
    querySnapShot.forEach(doc => {
        const companyData = doc.data() as Companies;
        companies.push({
            ...companyData,
            id: doc.id,
        });
    });

    return companies;
};

//: Get All Companies Query
export function useGetCompanies() {
    const { data, isLoading } = useQuery({
        queryKey: ["companies", auth?.currentUser?.uid],
        queryFn: () => getCompanies(auth?.currentUser?.uid),
    });
    return { data, isLoading };
}

//: Add new company
const addCompany = async function (
    company: object,
    userId: string | undefined
) {
    await addDoc(collection(db, `users/${userId}/companies`), company);
};

//: Add new company Query
export const useAddCompany = function () {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (company: object) =>
            addCompany(company, auth?.currentUser?.uid),
        onSuccess: () => {
            toast.success(i18n.t("New Company added successfully"));
            queryClient.invalidateQueries({ queryKey: ["companies"] });
        },
        onError: err => {
            console.log(err);
            toast.error(i18n.t("There was an error adding the Company"));
        },
    });
    return { mutate, isPending };
};

//: Update Company
const updateCompany = async function ({
    company,
    id,
    userId,
}: UpdateCompanyTypes) {
    const ref = doc(db, `users/${userId}/companies`, id);
    await updateDoc(ref, company);
};

//: Update Company Query
export const useUpdateCompany = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: UpdateCompanyTypes) => {
            await updateCompany(variables);
            return;
        },
        onSuccess: () => {
            toast.success(i18n.t("Company successfully edited"));
            queryClient.invalidateQueries({ queryKey: ["companies"] });
        },
        onError: err => {
            console.log(err);
            toast.error(i18n.t("An error occurred while editing the company"));
        },
    });
    return { mutateAsync, isPending };
};

//: Delete Company
const deleteCompany = async function ({ id, userId }: DeleteCompanyTypes) {
    const ref = doc(db, `users/${userId}/companies`, id);
    try {
        await deleteDoc(ref);
    } catch (err) {
        console.error(err);
    }
};

//: Delete Company query
export const useDeleteCompany = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: DeleteCompanyTypes) =>
            await deleteCompany(variables),
        onSuccess: () => {
            toast.success(i18n.t("Company successfully deleted"));
            queryClient.invalidateQueries({ queryKey: ["companies"] });
        },
        onError: err => {
            console.log(err);
            toast.error(i18n.t("An error occurred while deleting the company"));
        },
    });
    return { mutateAsync, isPending };
};

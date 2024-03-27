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
    Agreements,
    Companies,
    DeleteAgreementTypes,
    DeleteCompanyTypes,
    UpdateAgreementTypes,
    UpdateCompanyTypes,
} from "../Interfaces/User";

//! Get All Companies
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

//! Get All Companies Query
export function useGetCompanies() {
    const { data, isLoading } = useQuery({
        queryKey: ["companies", auth?.currentUser?.uid],
        queryFn: () => getCompanies(auth?.currentUser?.uid),
    });
    return { data, isLoading };
}

//! Add new company
const addCompany = async function (
    company: object,
    userId: string | undefined
) {
    await addDoc(collection(db, `users/${userId}/companies`), company);
};

//! Add new company Query
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

//! Update Company
const updateCompany = async function ({
    company,
    id,
    userId,
}: UpdateCompanyTypes) {
    const ref = doc(db, `users/${userId}/companies`, id);
    await updateDoc(ref, company);
};

//! Update Company Query
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

//! Delete Company
const deleteCompany = async function ({ id, userId }: DeleteCompanyTypes) {
    const ref = doc(db, `users/${userId}/companies`, id);
    try {
        await deleteDoc(ref);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

//! Delete Company query
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

//! Add agreement to company
const addAgreement = async function (
    agreement: object,
    companyId: string | undefined,
    userId: string | undefined
) {
    await addDoc(
        collection(db, `users/${userId}/companies/${companyId}/agreements`),
        agreement
    );
};

//! Add new agreement Query
export const useAddAgreement = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: {
            agreement: object;
            companyId: string | undefined;
        }) =>
            addAgreement(
                data.agreement,
                data.companyId,
                auth?.currentUser?.uid
            ),
        onSuccess: () => {
            toast.success(i18n.t("New Agreement added successfully"));
            queryClient.invalidateQueries({ queryKey: ["agreements"] });
        },
        onError: err => {
            console.log(err);
            toast.error(i18n.t("There was an error adding the Agreement"));
        },
    });
    return { mutateAsync, isPending };
};

//! Get Agreements
const getAgreements = async (
    userId: string | undefined,
    companyId: string | undefined
) => {
    const querySnapShot = await getDocs(
        collection(db, `users/${userId}/companies/${companyId}/agreements`)
    );

    const agreements: Agreements[] = [];
    querySnapShot.forEach(doc => {
        const agreementData = doc.data() as Agreements;
        agreements.push({
            ...agreementData,
            agreementId: doc.id,
        });
    });
    return agreements;
};

//! Get Agreements Query
export const useGetAgreements = function (companyId: string | undefined) {
    const { data, isLoading } = useQuery({
        queryKey: ["agreements"],
        queryFn: () => getAgreements(auth?.currentUser?.uid, companyId),
    });
    return { data, isLoading };
};

//! Update Agreement
const updateAgreement = async function ({
    editedAgreement,
    companyId,
    id,
    userId,
}: UpdateAgreementTypes) {
    const ref = doc(
        db,
        `users/${userId}/companies/${companyId}/agreements`,
        id
    );
    await updateDoc(ref, editedAgreement);
};

//! Update Agreement Query
export const useUpdateAgreement = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: UpdateAgreementTypes) => {
            await updateAgreement(variables);
            return;
        },
        onSuccess: () => {
            toast.success(i18n.t("Agreement successfully edited"));
            queryClient.invalidateQueries({ queryKey: ["agreements"] });
        },
        onError: err => {
            console.log(err);
            toast.error(
                i18n.t("An error occurred while editing the Agreement")
            );
        },
    });
    return { mutateAsync, isPending };
};

//! Delete Employee
const deleteAgreement = async function ({
    agreementId,
    userId,
    companyId,
}: DeleteAgreementTypes) {
    const ref = doc(
        db,
        `users/${userId}/companies/${companyId}/agreements`,
        agreementId
    );
    try {
        await deleteDoc(ref);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

//! Delete employee query
export const useDeleteAgreement = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: DeleteAgreementTypes) =>
            await deleteAgreement(variables),
        onSuccess: () => {
            toast.success(i18n.t("Agreement successfully deleted"));
            queryClient.invalidateQueries({ queryKey: ["agreements"] });
        },
        onError: err => {
            console.log(err);
            toast.error(
                i18n.t("An error occurred while deleting the Agreement")
            );
        },
    });
    return { mutateAsync, isPending };
};

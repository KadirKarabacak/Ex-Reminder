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
    DeleteAgreementTypes,
    UpdateAgreementTypes,
} from "../Interfaces/User";

//: Add agreement to company
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

//: Add new agreement Query
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

//: Get Agreements
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

//: Get Agreements Query
export const useGetAgreements = function (companyId: string | undefined) {
    const { data, isLoading } = useQuery({
        queryKey: ["agreements"],
        queryFn: () => getAgreements(auth?.currentUser?.uid, companyId),
    });
    return { data, isLoading };
};

//: Update Agreement
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

//: Update Agreement Query
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

//: Delete Agreement
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

//: Delete agreement query
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

import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import i18n from "../i18n";

interface Companies {
    companyName: string;
    companyAddress: string;
    companyPhone: number | string;
    companyEmail: string;
    companyWebsite: string;
    companyLogo: string;
    companyDescription: string;
    companyManager: object;
    id?: string;
}

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

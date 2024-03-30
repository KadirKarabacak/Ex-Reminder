import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useQuery } from "@tanstack/react-query";
import { Sales } from "../Interfaces/User";

//! Get Accounting
const getAccounting = async (userId: string | undefined) => {
    const querySnapShot = await getDocs(
        collection(db, `users/${userId}/accounting`)
    );

    const accounting: Sales[] = [];
    querySnapShot.forEach(doc => {
        const salesData = doc.data() as Sales;
        accounting.push({
            ...salesData,
            id: doc.id,
        });
    });

    return accounting;
};

//! Get Accounting Query
export function useGetAccounting() {
    const { data, isLoading } = useQuery({
        queryKey: ["accounting", auth?.currentUser?.uid],
        queryFn: () => getAccounting(auth?.currentUser?.uid),
    });
    return { data, isLoading };
}

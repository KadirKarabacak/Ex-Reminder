import {
    addDoc,
    collection,
    doc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { NegotiateTypes, UpdateNegotiateTypes } from "../Interfaces/User";
import { auth, db } from "./firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import i18n from "../i18n";
import { addNotification, useAddNotification } from "./notificationController";

//: Add Negotiate
const addNegotiate = async function (
    userId: string | undefined,
    negotiate: NegotiateTypes
) {
    const result = await addDoc(
        collection(db, `users/${userId}/negotiates`),
        negotiate
    );
    const negotiateId = result.id;
    const updateDocData = { ...negotiate, negotiateId: negotiateId };
    await setDoc(result, updateDocData);
    return updateDocData;
};

//: Add Negotiate Query
export function useAddNegotiate() {
    const queryClient = useQueryClient();
    const { addNotifications } = useAddNotification();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (variables: {
            userId: string | undefined;
            negotiate: NegotiateTypes;
        }) => addNegotiate(variables.userId, variables.negotiate),
        onSuccess: async data => {
            await addNotifications({
                contentObj: data,
                event: "Add Negotiate",
            });
            queryClient.invalidateQueries();
            if (data.negotiateAlarm)
                toast.success(
                    i18n.t(
                        `Negotiate added successfully. We will warn you when ${data.negotiateAlarmWarningTime} hours left.`
                    )
                );
            else {
                toast.success(i18n.t(`Negotiate added successfully.`));
            }
        },
        onError: () => {
            toast.error(i18n.t("An error occurred while adding the Negotiate"));
        },
    });
    return { mutateAsync, isPending };
}

//: Get Negotiates
const getNegotiates = async function (userId: string | undefined) {
    const querySnapshot = await getDocs(
        collection(db, `users/${userId}/negotiates`)
    );
    const negotiates = querySnapshot.docs.map(doc => doc.data());
    return negotiates;
};

//: Get Negotiates Query
export function useGetNegotiates(userId: string | undefined) {
    const { data, isLoading } = useQuery({
        queryFn: () => getNegotiates(userId),
        queryKey: ["negotiates"],
        refetchInterval: 60000,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading };
}

//: Update Negotiate
const updateNegotiate = async function ({
    negotiate,
    id,
    userId,
}: UpdateNegotiateTypes) {
    const ref = doc(db, `users/${userId}/negotiates`, id);
    await updateDoc(ref, negotiate);
};

//: Update Negotiate Query
export function useUpdateNegotiate() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: UpdateNegotiateTypes) =>
            await updateNegotiate(variables),
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: err => {
            console.log(err.message);
        },
    });
    return { mutateAsync, isPending };
}

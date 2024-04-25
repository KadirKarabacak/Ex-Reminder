import {
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import i18n from "../i18n";
import { NotificationTypes, UpdateNotificationTypes } from "../Interfaces/User";

//: Add notification
export const addNotification = async function (
    notification: NotificationTypes,
    userId: string | undefined
) {
    await addDoc(collection(db, `users/${userId}/notifications`), {
        ...notification,
        isReaded: false,
        createdAt: new Date(),
    });
};

export function useAddNotification() {
    const queryClient = useQueryClient();
    const { mutateAsync: addNotifications, isPending } = useMutation({
        mutationFn: (notification: NotificationTypes) =>
            addNotification(notification, auth?.currentUser?.uid),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    });
    return { addNotifications, isPending };
}

//: Get Notifications
const getNotifications = async (userId: string | undefined) => {
    const querySnapShot = await getDocs(
        collection(db, `users/${userId}/notifications`)
    );

    const notifications: NotificationTypes[] = [];
    querySnapShot.forEach(doc => {
        const notificationData = doc.data() as NotificationTypes;
        notifications.push({
            ...notificationData,
            id: doc.id,
        });
    });
    return notifications;
};

//: Get Notifications Query
export function useGetNotifications() {
    const { data, isLoading } = useQuery({
        queryKey: ["notifications", auth?.currentUser?.uid],
        queryFn: () => getNotifications(auth?.currentUser?.uid),
    });
    return { data, isLoading };
}

//: Mark Notifications as Readed
export const updateNotification = async function ({
    notification,
    id,
    userId,
}: UpdateNotificationTypes) {
    const ref = doc(db, `users/${userId}/notifications`, id);
    const updatedNotification = {
        ...notification,
        isReaded: !notification.isReaded,
    };
    await updateDoc(ref, updatedNotification);
};

//: Update Notification Query
export const useUpdateNotification = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: UpdateNotificationTypes) => {
            await updateNotification(variables);
            return variables;
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: err => {
            console.log(err);
            toast.error(
                i18n.t("An error occurred while notifications marking as read")
            );
        },
    });
    return { mutateAsync, isPending };
};

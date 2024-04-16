import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useQuery } from "@tanstack/react-query";

export interface NotificationTypes {
    contentObj: any;
    createdAt?: Date | string;
    isReaded?: boolean;
    event: string;
    id?: string;
}

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

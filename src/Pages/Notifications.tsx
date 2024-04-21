import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { springOptions } from "../Constants/constant";
import { useGetNotifications } from "../Api/notificationController";
import { useTranslation } from "react-i18next";
import { InfinitySpin } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import CustomTable from "../Components/Table";
import { NotificationToolBar } from "../Components/TableToolBars/NotificationBar";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NotificationTypes } from "../Interfaces/User";

const StyledNotifications = styled.main`
    width: 100%;
    min-height: 60rem;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

const FullPage = styled.div`
    height: 65rem;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AnimatedStyledNotifications = animated(StyledNotifications);

export default function Notifications() {
    const animationProps = useSpring(springOptions);
    const { data: notifications, isLoading } = useGetNotifications();
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState("");
    const [searchParams] = useSearchParams();
    const [selected, setSelected] = useState<readonly string[]>([]);
    const isAllSelected = notifications?.length === selected.length;
    const notReadedNotification = notifications?.filter(
        (notification: NotificationTypes) => notification.isReaded === false
    );
    const readedNotification = notifications?.filter(
        (notification: NotificationTypes) => notification.isReaded === true
    );

    if (isLoading)
        return (
            <FullPage>
                <InfinitySpin color="var(--color-grey-800)" />
            </FullPage>
        );

    return (
        <AnimatedStyledNotifications style={animationProps}>
            <Helmet>
                <title>Ex Reminder | {t("Notifications")}</title>
            </Helmet>
            <CustomTable
                CustomToolbar={
                    <NotificationToolBar
                        setSearchText={setSearchText}
                        searchText={searchText}
                        selected={selected}
                        isAllSelected={isAllSelected}
                        setSelected={setSelected}
                    />
                }
                data={
                    searchParams.has("action", "not-readed")
                        ? notReadedNotification
                        : readedNotification
                }
                searchText={searchText}
                selected={selected}
                setSelected={setSelected}
            />
        </AnimatedStyledNotifications>
    );
}

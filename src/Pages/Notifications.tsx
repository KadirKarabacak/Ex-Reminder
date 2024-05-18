import { animated, easings, useSpring } from "react-spring";
import styled from "styled-components";
import { useGetNotifications } from "../Api/notificationController";
import { useTranslation } from "react-i18next";
import { InfinitySpin } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import CustomTable from "../Components/Table";
import { NotificationToolBar } from "../Components/TableToolBars/NotificationBar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NotificationTypes } from "../Interfaces/User";
import i18n from "../i18n";
import JoyrideTitle from "../Components/JoyrideTitle";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import { CallBackProps } from "react-joyride";
import CustomJoyride from "../Components/CustomJoyride";

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

    @media (max-width: 1000px) {
        border-radius: 0;
        padding: 1rem;
    }

    @media (max-width: 600px) {
        height: calc(100dvh - 7rem);
    }
`;

const FullPage = styled.div`
    height: 65rem;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-300)",
    transition: "all .3s",
};

const notificationsSteps = [
    {
        target: ".markAsRead-btn",
        content: i18n.t(
            "Here you can mark your notifications as read or unread. You must be on the unread page to mark as read and on the read page to mark as unread. :)"
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<MarkChatReadIcon sx={iconStyle} />}
                title={i18n.t("Mark as Read & Unread")}
            />
        ),
    },
    {
        target: ".switch-read-unread-btn",
        content: i18n.t(
            "Here you can switch between your read and unread notifications and see only the ones that match your selection."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<ToggleOnIcon sx={iconStyle} />}
                title={i18n.t("Switch Between Read & Unread")}
            />
        ),
    },
    {
        target: ".search-input-notifications",
        content: i18n.t(
            "From here, you can find a notification in your table much more easily by searching by notification date."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<SearchIcon sx={iconStyle} />}
                title={i18n.t("Search Data")}
            />
        ),
    },
    {
        target: ".notifications-info-button",
        content: i18n.t(
            "Here you can see what the colors and icons of all the notifications in the notifications table mean. This makes it easier to find a specific notification you are looking for."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<InfoIcon sx={iconStyle} />}
                title={i18n.t("Notifications Info")}
            />
        ),
    },
];

const AnimatedStyledNotifications = animated(StyledNotifications);

export default function Notifications() {
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);
    const animationProps = useSpring({
        from: { opacity: 0, transform: "translateY(50px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: {
            duration: 800,
            easing: easings.easeInOutBack,
        },
        onRest: () => setIsAnimationEnd(true),
    });
    const { data: notifications, isLoading } = useGetNotifications();
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState("");
    const [searchParams] = useSearchParams();
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [runJoyride, setRunJoyride] = useState(false);
    const notReadedNotification = notifications?.filter(
        (notification: NotificationTypes) => notification.isReaded === false
    );
    const readedNotification = notifications?.filter(
        (notification: NotificationTypes) => notification.isReaded === true
    );
    const isAllSelected = searchParams.has("action", "not-readed")
        ? notReadedNotification?.length !== 0 &&
          notReadedNotification?.length === selected.length
        : readedNotification?.length !== 0 &&
          readedNotification?.length === selected.length;

    useEffect(() => {
        if (localStorage.getItem("isNotificationsJoyrideDisplayed") === "true")
            return;
        else {
            localStorage.setItem("isNotificationsJoyrideDisplayed", "false");
            isAnimationEnd && setRunJoyride(true);
        }
    }, [isAnimationEnd]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, lifecycle } = data;
        if (
            lifecycle === "tooltip" ||
            lifecycle === "complete" ||
            lifecycle === "ready"
        ) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
        if (status === "finished") {
            localStorage.setItem("isNotificationsJoyrideDisplayed", "true");
            setRunJoyride(false);
        }
    };

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
            <CustomJoyride
                steps={notificationsSteps}
                pathname={runJoyride}
                callback={handleJoyrideCallback}
            />
        </AnimatedStyledNotifications>
    );
}

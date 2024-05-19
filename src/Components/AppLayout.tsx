import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import ProtectedRoute from "./ProtectedRoute";
import {
    useGetNegotiates,
    useUpdateNegotiate,
} from "../Api/negotiateController";
import { auth } from "../Api/firebase";
import { differenceInMinutes, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import Alarm from "./Alarm";
import CustomJoyride from "./CustomJoyride";
import JoyrideTitle from "./JoyrideTitle";
import i18n from "../i18n";
import { CallBackProps } from "react-joyride";
import MapIcon from "@mui/icons-material/Map";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { WarehouseOutlined } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const StyledAppLayout = styled.div`
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
    display: contents;

    @media (min-width: 1000px) {
        display: grid;
    }
`;

const Container = styled.div`
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-300)",
    transition: "all .3s",
};

const StyledMain = styled.main`
    background-color: var(--color-grey-50);
`;

const applayoutSteps = [
    {
        target: ".map-nav",
        content: i18n.t(
            "Map Route shows map location pins and surface information of companies your company does business with."
        ),
        placement: "right",
        title: (
            <JoyrideTitle
                icon={<MapIcon sx={iconStyle} />}
                title={i18n.t("Map")}
            />
        ),
    },
    {
        target: ".accounting-nav",
        content: i18n.t(
            "Accounting Route shows the list and details of all sales your company makes to other companies."
        ),
        placement: "right",
        title: (
            <JoyrideTitle
                icon={<AccountBalanceWalletIcon sx={iconStyle} />}
                title={i18n.t("Accounting")}
            />
        ),
    },
    {
        target: ".companies-nav",
        content: i18n.t(
            "Companies Route shows all the companies your company does business with and enables you to make sales, agreements and negotiations with them."
        ),
        placement: "right",
        title: (
            <JoyrideTitle
                icon={<BusinessIcon sx={iconStyle} />}
                title={i18n.t("Companies")}
            />
        ),
    },
    {
        target: ".warehouse-nav",
        content: i18n.t(
            "Warehouse Route shows all the products in your company's inventory and information such as product purchase and sale price."
        ),
        placement: "right",
        title: (
            <JoyrideTitle
                icon={<WarehouseOutlined sx={iconStyle} />}
                title={i18n.t("Warehouse")}
            />
        ),
    },
    {
        target: ".employees-nav",
        content: i18n.t(
            "Employees Route shows all your employees and their information within your company."
        ),
        placement: "right",
        title: (
            <JoyrideTitle
                icon={<GroupIcon sx={iconStyle} />}
                title={i18n.t("Employees")}
            />
        ),
    },
    {
        target: ".settings-nav",
        content: i18n.t(
            "Settings Route allow you to update your company's login & display settings"
        ),
        placement: "right",
        title: (
            <JoyrideTitle
                icon={<SettingsIcon sx={iconStyle} />}
                title={i18n.t("Settings")}
            />
        ),
    },
    {
        target: ".language-nav",
        content: i18n.t("You can change language from here in application"),
        placement: "bottom",
        title: (
            <JoyrideTitle
                icon={<LanguageIcon sx={iconStyle} />}
                title={i18n.t("Change Language")}
            />
        ),
    },
    {
        target: ".notifications-nav",
        content: i18n.t(
            "Notifications holds your application changes like adding, updating or deleting stuff."
        ),
        placement: "bottom",
        title: (
            <JoyrideTitle
                icon={<NotificationsIcon sx={iconStyle} />}
                title={i18n.t("Notifications")}
            />
        ),
    },
    {
        target: ".toggledarkmode-nav",
        content: i18n.t(
            "You can switch between Dark-Mode & Light-Mode from here"
        ),
        placement: "bottom",
        title: (
            <JoyrideTitle
                icon={<DarkModeIcon sx={iconStyle} />}
                title={i18n.t("Dark Mode & Light Mode")}
            />
        ),
    },
    {
        target: ".logout-nav",
        content: i18n.t("You can safely logout from here"),
        placement: "bottom",
        title: (
            <JoyrideTitle
                icon={<LogoutIcon sx={iconStyle} />}
                title={i18n.t("Logout")}
            />
        ),
    },
];

const applayoutPhoneSteps = [
    {
        target: ".applicationDrawer",
        content: i18n.t(
            "From here you can navigate in application between different pages like Map, Accounting, Companies etc."
        ),
        placement: "right-end",
        title: (
            <JoyrideTitle
                icon={<SwapVertIcon sx={iconStyle} />}
                title={i18n.t("Application Navigation")}
            />
        ),
    },
    {
        target: ".applicationMenu",
        content: i18n.t(
            "From here you can change application's language, can check notifications, can toggle between Light Mode & Dark Mode and you can safely logout."
        ),
        placement: "right-end",
        title: (
            <JoyrideTitle
                icon={<SettingsIcon sx={iconStyle} />}
                title={i18n.t("Application Menu")}
            />
        ),
    },
];

// Parent Route
function AppLayout() {
    // const { t } = useTranslation();
    const { pathname } = useLocation();
    const { currentUser } = auth;
    const { data: negotiates } = useGetNegotiates(currentUser?.uid);
    const userId = currentUser?.uid;
    const { isPending, mutateAsync: updateNegotiate } = useUpdateNegotiate();
    const [isAlarm, setIsAlarm] = useState(false);
    const [runJoyride, setRunJoyride] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setIsOpenDrawer(prevState => !prevState);
    };

    const findNegotiateToAlert = negotiates?.filter(neg => {
        // ! If user don't want to alert, don't take negotiate
        if (!neg.negotiateAlarm) return;
        if (isBefore(neg.negotiateDateAndTime.seconds * 1000, new Date()))
            return;

        // ! Alert time from user's selected hour
        const warnTime = neg.negotiateAlarmWarningTime * 60;

        // ! Calculate minutes left to negotiate
        const diff = differenceInMinutes(
            neg.negotiateDateAndTime.seconds * 1000,
            new Date()
        );
        if (diff <= warnTime && !neg.isAlarmDismissed) return neg;
        else return null;
    });

    useEffect(() => {
        if (findNegotiateToAlert && findNegotiateToAlert?.length > 0) {
            setIsAlarm(true);
        }
    }, [findNegotiateToAlert?.length]);

    const handleDismissAlarm = (id: string) => {
        const findNegotiate = negotiates?.find(neg => neg.negotiateId === id);
        const negotiate = { ...findNegotiate, isAlarmDismissed: true };
        updateNegotiate({ negotiate, id, userId });
        !isPending && setIsAlarm(false);
    };

    useEffect(() => {
        if (localStorage.getItem("isAppJoyrideDisplayed") === "true") return;
        else {
            localStorage.setItem("isAppJoyrideDisplayed", "false");
            setRunJoyride(true);
        }
    }, []);

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
            localStorage.setItem("isAppJoyrideDisplayed", "true");
            setRunJoyride(false);
        }
    };

    useEffect(() => {
        if (
            window.innerWidth > 1000 &&
            (pathname === "/" ||
                pathname === "/companies" ||
                pathname === "/warehouse" ||
                pathname.includes("/notifications"))
        )
            document.body.style.overflow = "hidden";
        else document.body.style.overflow = "visible";
    }, [pathname]);

    return (
        <ProtectedRoute>
            <CustomJoyride
                steps={
                    window.innerWidth < 1000 && window.innerWidth > 600
                        ? applayoutSteps.slice(6)
                        : window.innerWidth > 1000
                        ? applayoutSteps
                        : applayoutPhoneSteps
                }
                pathname={runJoyride}
                callback={handleJoyrideCallback}
            />
            <StyledAppLayout>
                <Header
                    setIsOpenDrawer={setIsOpenDrawer}
                    toggleDrawer={toggleDrawer}
                    isOpenDrawer={isOpenDrawer}
                />
                <Sidebar
                    isOpenDrawer={isOpenDrawer}
                    toggleDrawer={toggleDrawer}
                />
                <StyledMain
                    style={{
                        padding:
                            pathname === "/" || window.innerWidth < 1000
                                ? "0"
                                : "3.5rem",
                    }}
                >
                    <Container>
                        <Outlet />
                    </Container>
                    {isAlarm &&
                        findNegotiateToAlert?.map(neg => (
                            <Alarm
                                key={neg.negotiateId}
                                findNegotiateToAlert={neg}
                                handleDismissAlarm={handleDismissAlarm}
                            />
                        ))}
                </StyledMain>
            </StyledAppLayout>
        </ProtectedRoute>
    );
}

export default AppLayout;

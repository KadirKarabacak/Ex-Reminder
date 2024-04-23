import styled from "styled-components";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDarkMode } from "../Contexts/DarkModeContext";
import {
    Box,
    Button,
    Divider,
    FormControl,
    MenuItem,
    Select,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { logOut } from "../Api/userController";
import { auth } from "../Api/firebase";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { useGetNotifications } from "../Api/notificationController";
import { NotificationTypes } from "../Interfaces/User";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 3rem;
    border-bottom: 1px solid var(--color-grey-100);
    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;
    z-index: 1000;
`;

const StyledList = styled.ul`
    display: flex;
    gap: 1.2rem;
    list-style: none;
    align-items: center;
`;

const StyledListItem = styled.li`
    display: flex;
    align-items: center;
    gap: 1rem;

    &:not(:first-child) {
        border: 1px solid var(--color-grey-200);
        border-radius: 3px;
    }
`;

const StyledUserInfo = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const StyledAvatar = styled.img`
    width: 4rem;
    display: block;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center center;
    border-radius: 50%;
    transition: all 0.3s;

    &:hover {
        opacity: 0.9;
        outline: 2px solid transparent;
        scale: 1.1;
        border-radius: 3px;
    }
`;

const StyledName = styled.span`
    color: var(--color-grey-800);
`;

const StyledButton = styled(Button)`
    &:hover > svg {
        color: var(--color-brand-500);
    }
`;

const StyledFormControl = styled(FormControl)`
    & > div {
        color: var(--color-grey-800);
        font-size: 1.3rem;
        min-width: 1rem;

        &:hover &::before {
            border-bottom: 1px solid var(--color-grey-800);
        }

        &::before {
            border-color: var(--color-grey-800) !important;
        }
    }

    & > div > div {
        padding: 0.8rem;
    }

    & > div > svg {
        color: var(--color-grey-800) !important;
    }
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-600)",
    transition: "all .3s",
    ":hover": {
        color: "var(--color-brand-500)",
    },
};

function Header() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [currentLanguage, setCurrentLanguage] = useState("en-EN");
    const [searchParams, setSearchParams] = useSearchParams();
    const [isNotReadeds, setIsNotReadeds] = useState<NotificationTypes[]>();
    const navigate = useNavigate();
    const { currentUser } = auth;
    const { t, i18n } = useTranslation();
    const { pathname } = useLocation();
    const { data: notifications } = useGetNotifications();

    useEffect(() => {
        if (notifications)
            setIsNotReadeds(
                notifications?.filter(
                    notification => notification.isReaded === false
                )
            );
    }, [notifications, isNotReadeds]);

    const handleChangeLang = (e: string) => {
        i18n.changeLanguage(e);
        setCurrentLanguage(e);
    };

    useEffect(() => {
        setCurrentLanguage(i18n.language || "en-EN");
        i18n.changeLanguage(i18n.language);
    }, []);

    useEffect(() => {
        if (pathname === "/notifications") {
            searchParams.set("action", "not-readed");
            setSearchParams(searchParams);
        }
    }, [pathname]);

    return (
        <StyledHeader
            style={{
                boxShadow: pathname === "/" ? "var(--shadow-md)" : "none",
            }}
        >
            <StyledList>
                <StyledUserInfo onClick={() => navigate("/settings")}>
                    <StyledListItem>
                        {currentUser?.photoURL && (
                            <StyledAvatar
                                src={currentUser.photoURL}
                                alt={t("User Avatar")}
                            />
                        )}
                        {!currentUser?.photoURL && (
                            <StyledAvatar
                                src="../../placeholder-avatar.png"
                                alt={t("Placeholder Avatar")}
                            />
                        )}
                        <StyledName>
                            {currentUser?.displayName
                                ? currentUser.displayName
                                : t("User")}
                        </StyledName>
                    </StyledListItem>
                </StyledUserInfo>
                <Divider
                    orientation="vertical"
                    variant="fullWidth"
                    flexItem
                    sx={{ borderColor: "var(--color-grey-300)" }}
                />
                <StyledListItem>
                    <StyledFormControl variant="filled">
                        <Select
                            value={currentLanguage}
                            onChange={e => handleChangeLang(e.target.value)}
                            variant="standard"
                            sx={{ minWidth: "10rem" }}
                        >
                            <MenuItem value="tr-TR">
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: "100%",
                                        gap: "8px",
                                        fontSize: "1rem",
                                    }}
                                >
                                    <Box>Türkçe</Box>
                                </Box>
                            </MenuItem>
                            <MenuItem value="en-EN">
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: "100%",
                                        gap: "8px",
                                        fontSize: "1rem",
                                    }}
                                >
                                    <Box>English</Box>
                                </Box>
                            </MenuItem>
                        </Select>
                    </StyledFormControl>
                </StyledListItem>
                <StyledListItem>
                    <Badge badgeContent={isNotReadeds?.length} color="success">
                        <Link to="/notifications">
                            <Tooltip
                                TransitionComponent={Grow}
                                title={t("Notifications")}
                            >
                                <StyledButton
                                    sx={{
                                        fontSize: "2rem",
                                        minWidth: 0,
                                        p: "0.7rem",
                                    }}
                                    color="inherit"
                                    variant="text"
                                >
                                    <NotificationsIcon sx={iconStyle} />
                                </StyledButton>
                            </Tooltip>
                        </Link>
                    </Badge>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip
                        TransitionComponent={Grow}
                        title={t("Toggle Darkmode")}
                    >
                        <StyledButton
                            sx={{
                                fontSize: "2rem",
                                minWidth: 0,
                                p: "0.7rem",
                            }}
                            onClick={() => toggleDarkMode()}
                            color="inherit"
                            variant="text"
                        >
                            {isDarkMode ? (
                                <LightModeIcon sx={iconStyle} />
                            ) : (
                                <DarkModeIcon sx={iconStyle} />
                            )}
                        </StyledButton>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip TransitionComponent={Grow} title={t("Logout")}>
                        <Link
                            onClick={() => {
                                logOut();
                                return toast.success(
                                    t("Successfully logged out")
                                );
                            }}
                            to="/login"
                        >
                            <StyledButton
                                sx={{
                                    fontSize: "2rem",
                                    minWidth: 0,
                                    p: "0.7rem",
                                    lineHeight: 0,
                                }}
                                color="inherit"
                                variant="text"
                            >
                                <LogoutIcon sx={iconStyle} />
                            </StyledButton>
                        </Link>
                    </Tooltip>
                </StyledListItem>
            </StyledList>
        </StyledHeader>
    );
}

export default Header;

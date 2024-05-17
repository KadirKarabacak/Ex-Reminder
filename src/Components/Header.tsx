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
    Menu,
    MenuItem,
    Select,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../Api/userController";
import { auth } from "../Api/firebase";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { useGetNotifications } from "../Api/notificationController";
import { NotificationTypes } from "../Interfaces/User";
import { Sling as Hamburger } from "hamburger-react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    border-bottom: 1px solid var(--color-grey-100);
    padding: 1.2rem 3rem 1.2rem 1rem;

    /* 1000px'den büyük ekranlar */
    @media (min-width: 1000px) {
        padding: 1.2rem 3rem;
        display: flex;
        justify-content: flex-end;
        gap: 2.4rem;
        align-items: center;
        z-index: 1000;
    }

    @media (max-width: 500px) {
        padding: 1.2rem 1rem;
    }
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

    @media (max-width: 500px) {
        & > div {
            color: black;
            font-size: 1.3rem;
            min-width: 1rem;

            &:hover &::before {
                border-bottom: 1px solid var(--color-green-lighter);
            }

            &::before {
                border-color: black !important;
            }
        }
        & > div > svg {
            color: black !important;
        }
    }
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-600)",
    transition: "all .3s",
};

interface HeaderTypes {
    toggleDrawer: () => void;
    isOpenDrawer: boolean;
    setIsOpenDrawer: any;
}

const StyledSmallContainer = styled.div`
    display: none;
    @media (max-width: 500px) {
        display: block;
    }
`;

const StyledLargeContainer = styled.div`
    display: flex;
    gap: 1rem;
    @media (max-width: 500px) {
        display: none;
    }
`;

function Header({ isOpenDrawer, setIsOpenDrawer }: HeaderTypes) {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [currentLanguage, setCurrentLanguage] = useState("en-EN");
    const [isNotReadeds, setIsNotReadeds] = useState<NotificationTypes[]>();
    const navigate = useNavigate();
    const { currentUser } = auth;
    const { t, i18n } = useTranslation();
    const { pathname } = useLocation();
    const { data: notifications } = useGetNotifications();

    // TODO:
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const opensMenu = Boolean(anchorEl);
    const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

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

    return (
        <StyledHeader
            style={{
                boxShadow: pathname === "/" ? "var(--shadow-md)" : "none",
            }}
        >
            <StyledList>
                {/* TODO: */}
                {window.innerWidth < 1000 && (
                    <span style={{ marginRight: "auto" }}>
                        <Hamburger
                            label="Sidebar Drawer Controller"
                            rounded
                            size={26}
                            toggled={isOpenDrawer}
                            toggle={setIsOpenDrawer}
                            color="var(--color-grey-800)"
                        />
                    </span>
                )}
                <StyledUserInfo onClick={() => navigate("/settings")}>
                    <StyledListItem id="userInfo">
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
                <StyledSmallContainer>
                    <StyledButton
                        aria-haspopup="true"
                        aria-expanded={opensMenu ? "true" : undefined}
                        onClick={handleClickMenuItem}
                        className="notifications-info-button"
                        sx={{
                            fontSize: "2rem",
                            minWidth: 0,
                            p: "0.7rem",
                            marginRight: "auto",
                            borderColor: "transparent",
                            borderRadius: "50%",
                        }}
                        color="inherit"
                        variant="outlined"
                    >
                        <MoreVertIcon sx={iconStyle} />
                    </StyledButton>
                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={opensMenu}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem
                            sx={{
                                paddingLeft: "10px!important",
                                paddingRight: "10px!important",
                            }}
                            disableRipple
                        >
                            <StyledFormControl
                                variant="filled"
                                id="switchLanguage"
                                sx={{ width: "100%" }}
                            >
                                <Select
                                    value={currentLanguage}
                                    onChange={e =>
                                        handleChangeLang(e.target.value)
                                    }
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
                        </MenuItem>
                        <MenuItem
                            sx={{
                                paddingLeft: "10px!important",
                                paddingRight: "10px!important",
                            }}
                            onClick={handleCloseMenu}
                            disableRipple
                        >
                            <Badge
                                badgeContent={isNotReadeds?.length}
                                color="success"
                            >
                                <Link to="/notifications?action=not-readed">
                                    <Tooltip
                                        TransitionComponent={Grow}
                                        title={t("Notifications")}
                                    >
                                        <StyledButton
                                            sx={{
                                                fontSize: "1rem",
                                                minWidth: 0,
                                                p: "0.7rem",
                                                display: "flex",
                                                gap: "0.5rem",
                                            }}
                                            color="inherit"
                                            variant="text"
                                        >
                                            <NotificationsIcon
                                                sx={{
                                                    ...iconStyle,
                                                    "@media (max-width: 500px)":
                                                        {
                                                            color: "var(--color-green-lighter)",
                                                        },
                                                }}
                                            />{" "}
                                            {t("Notifications")}
                                        </StyledButton>
                                    </Tooltip>
                                </Link>
                            </Badge>
                        </MenuItem>
                        <MenuItem
                            onClick={handleCloseMenu}
                            sx={{
                                paddingLeft: "10px!important",
                                paddingRight: "10px!important",
                            }}
                            disableRipple
                        >
                            <StyledButton
                                sx={{
                                    fontSize: "1rem",
                                    minWidth: 0,
                                    p: "0.7rem",
                                    display: "flex",
                                    gap: "0.5rem",
                                }}
                                onClick={() => toggleDarkMode()}
                                color="inherit"
                                variant="text"
                            >
                                {isDarkMode ? (
                                    <>
                                        <LightModeIcon
                                            sx={{
                                                ...iconStyle,
                                                "@media (max-width: 500px)": {
                                                    color: "var(--color-green-lighter)",
                                                },
                                            }}
                                        />
                                        {t("Light Mode")}
                                    </>
                                ) : (
                                    <>
                                        <DarkModeIcon
                                            sx={{
                                                ...iconStyle,
                                                "@media (max-width: 500px)": {
                                                    color: "var(--color-green-lighter)",
                                                },
                                            }}
                                        />
                                        {t("Dark Mode")}{" "}
                                    </>
                                )}
                            </StyledButton>
                        </MenuItem>
                        <MenuItem
                            sx={{
                                paddingLeft: "10px!important",
                                paddingRight: "10px!important",
                            }}
                            disableRipple
                        >
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
                                        fontSize: "1rem",
                                        minWidth: 0,
                                        p: "0.7rem",
                                        lineHeight: 0,
                                        display: "flex",
                                        gap: "0.5rem",
                                    }}
                                    color="inherit"
                                    variant="text"
                                >
                                    <LogoutIcon
                                        sx={{
                                            ...iconStyle,
                                            "@media (max-width: 500px)": {
                                                color: "var(--color-green-lighter)",
                                            },
                                        }}
                                    />{" "}
                                    {t("Logout")}
                                </StyledButton>
                            </Link>
                        </MenuItem>
                    </Menu>
                </StyledSmallContainer>
                <StyledLargeContainer>
                    <Divider
                        orientation="vertical"
                        variant="fullWidth"
                        flexItem
                        sx={{ borderColor: "var(--color-grey-300)" }}
                    />

                    <StyledListItem className="language-nav">
                        <StyledFormControl variant="filled" id="switchLanguage">
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
                    <StyledListItem
                        className="notifications-nav"
                        id="notificationsBtn"
                    >
                        <Badge
                            badgeContent={isNotReadeds?.length}
                            color="success"
                        >
                            <Link to="/notifications?action=not-readed">
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
                    <StyledListItem
                        className="toggledarkmode-nav"
                        id="toggleDarkModeBtn"
                    >
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
                    <StyledListItem className="logout-nav" id="logoutBtn">
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
                </StyledLargeContainer>
            </StyledList>
        </StyledHeader>
    );
}

export default Header;

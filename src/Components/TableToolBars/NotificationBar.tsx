import {
    Button,
    FormControl,
    Menu,
    MenuItem,
    Select,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SearchInput from "../SearchInput";
import {
    useGetNotifications,
    useUpdateNotification,
} from "../../Api/notificationController";
import { auth } from "../../Api/firebase";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import InfoIcon from "@mui/icons-material/Info";
import Grow from "@mui/material/Grow";
import NotificationsInfo from "../NotificationsInfo";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useState } from "react";
import DeleteSelectedNotificationsModal from "../Modals/Notifications/DeleteSelectedNotificationsModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const StyledSelect = styled(Select)`
    && {
        font-size: 1.3rem;
        color: var(--color-grey-800);

        @media (max-width: 1000px) {
            color: black;
        }

        & > fieldset {
            border-color: var(--color-grey-500);
        }

        &:hover > fieldset {
            border-color: var(--color-brand-600) !important;
        }

        & > .Mui-disabled {
            background: var(--color-grey-200);
            color: var(--color-grey-600);
            -webkit-text-fill-color: var(--color-grey-500);
            cursor: not-allowed;
        }
    }
`;

const StyledButton = styled(Button)`
    &:hover > svg {
        color: var(--color-green-lighter);
    }
`;

const IconStyles = {
    fontSize: "1.8rem",
    fill: "var(--color-green-lighter)",
};

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-600)",
    transition: "all .3s",
    ":hover": {
        color: "var(--color-green-lighter)",
    },
};

const StyledSmallContainer = styled.div`
    display: none;
    @media (max-width: 1000px) {
        display: block;
    }
`;

const StyledLargeContainer = styled.div`
    display: flex;
    gap: 1rem;
    @media (max-width: 1000px) {
        display: none;
    }
`;

export function NotificationToolBar({
    searchText,
    setSearchText,
    selected,
    isAllSelected,
    setSelected,
}: {
    searchText: string;
    setSearchText: any;
    selected: readonly string[];
    isAllSelected: boolean;
    setSelected: any;
}) {
    const { t } = useTranslation();
    const { data: notifications } = useGetNotifications();
    const { mutateAsync: updateNotification, isPending: isUpdating } =
        useUpdateNotification();
    const [searchParams, setSearchParams] = useSearchParams();
    const [opensDeleteNotification, setOpensDeleteNotification] =
        useState(false);
    // const { mutateAsync: deleteNotification, isPending } =
    //     useDeleteNotification();
    const { currentUser } = auth;
    const userId = currentUser?.uid;

    // TODO:
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const opensMenu = Boolean(anchorEl);
    const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const readedOrNotReadedNotification = [
        {
            label: t("Unread"),
            value: 0,
        },
        {
            label: t("Read"),
            value: 1,
        },
    ];

    async function findAndUpdateNotification() {
        const findedNotifications = notifications?.filter(notification =>
            selected.includes(notification.id as string)
        );
        findedNotifications?.map(note =>
            updateNotification({ id: note.id, notification: note, userId })
        );
        setSelected([]);
        if (searchParams.has("action", "readed"))
            return toast.success(t(`The notifications were marked as unread`));
        else {
            return toast.success(t(`The notifications were marked as read`));
        }
    }

    async function deleteSelectedNotifications() {
        if (!selected.length)
            return toast.error(t(`No notifications selected yet`));
        handleOpenDeleteModal();
    }

    function handleOpenDeleteModal() {
        setOpensDeleteNotification(true);
        searchParams.set("event", "delete-notification");
        setSearchParams(searchParams);
    }

    function handleCloseDeleteModal() {
        setOpensDeleteNotification(false);
        setTimeout(() => {
            searchParams.delete("event");
            setSearchParams(searchParams);
        }, 400);
    }

    return (
        <>
            <StyledToolBar
                sx={{
                    pl: { sm: 3 },
                    pr: { xs: 1, sm: 2 },
                    gap: "1rem",
                }}
            >
                <Typography
                    sx={{
                        color: "var(--color-green-lighter)",
                        fontSize: "2.4rem",
                        fontWeight: "bold",
                        borderBottom: "3px solid var(--color-green-lighter)",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Notifications")}
                </Typography>
                <Tooltip
                    TransitionComponent={Grow}
                    title={<NotificationsInfo />}
                >
                    <StyledButton
                        className="notifications-info-button"
                        sx={{
                            fontSize: "2rem",
                            minWidth: 0,
                            p: "0.7rem",
                            marginRight: "auto",
                            borderColor: "var(--color-grey-200)",
                            borderRadius: "50%",
                        }}
                        color="inherit"
                        variant="outlined"
                    >
                        <InfoIcon sx={iconStyle} />
                    </StyledButton>
                </Tooltip>
                <StyledLargeContainer>
                    {searchParams.has("action", "readed") && (
                        <Tooltip
                            TransitionComponent={Grow}
                            title={t(
                                `Delete ${
                                    isAllSelected ? "all" : "selected"
                                } notifications`
                            )}
                        >
                            <StyledButton
                                onClick={deleteSelectedNotifications}
                                sx={{
                                    fontSize: "2rem",
                                    minWidth: 0,
                                    p: "0.7rem",
                                    borderColor: "var(--color-grey-200)",
                                    borderRadius: "50%",
                                    ":hover > svg": {
                                        color: "#d32f2f",
                                    },
                                }}
                                color="inherit"
                                variant="outlined"
                            >
                                <DeleteSweepIcon sx={iconStyle} />
                            </StyledButton>
                        </Tooltip>
                    )}
                </StyledLargeContainer>

                <SearchInput
                    searchText={searchText}
                    setSearchText={setSearchText}
                    label={t("Search Notification by date")}
                />
                <StyledSmallContainer>
                    <Button
                        sx={{
                            backgroundColor: "var(--color-grey-800)",
                            color: "var(--color-grey-50)",
                            transition: "all .3s",
                            padding: "1rem 2rem",
                            fontSize: "1.1rem",
                            alignSelf: "center",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-600)",
                                color: "var(--color-grey-100)",
                            },
                            "&:disabled": {
                                backgroundColor: "var(--color-grey-500)",
                            },
                            "& > span > svg": { fill: "var(--color-grey-50)" },
                        }}
                        id="demo-customized-button"
                        aria-controls={
                            opensMenu ? "demo-customized-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={opensMenu ? "true" : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClickMenuItem}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Operations
                    </Button>
                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={opensMenu}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem disableRipple>
                            <FormControl
                                sx={{ minWidth: "10%", width: "100%" }}
                            >
                                <StyledSelect
                                    variant="filled"
                                    className="switch-read-unread-btn"
                                    sx={{
                                        "& > div": {
                                            padding: "12.5px 14px",
                                        },
                                    }}
                                    labelId="selectedNotificationLabel"
                                    id="selectedNotification"
                                    value={
                                        searchParams.get("action") ===
                                        "not-readed"
                                            ? 0
                                            : 1
                                    }
                                    onChange={e => {
                                        searchParams.set(
                                            "action",
                                            e.target.value === 0
                                                ? "not-readed"
                                                : "readed"
                                        );
                                        setSearchParams(searchParams);
                                        setSelected([]);
                                    }}
                                >
                                    {readedOrNotReadedNotification.map(
                                        (notificationType, i) => (
                                            <MenuItem
                                                sx={{
                                                    borderBottom:
                                                        "1px solid #efefef",
                                                }}
                                                disableRipple
                                                key={i}
                                                value={notificationType.value}
                                            >
                                                {notificationType.label}
                                            </MenuItem>
                                        )
                                    )}
                                </StyledSelect>
                            </FormControl>
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu} disableRipple>
                            <Button
                                className="markAsRead-btn"
                                onClick={findAndUpdateNotification}
                                disabled={selected.length === 0 || isUpdating}
                                sx={{
                                    backgroundColor: "var(--color-grey-800)",
                                    color: "var(--color-grey-50)",
                                    transition: "all .3s",
                                    padding: "1rem",
                                    fontSize: "1.1rem",
                                    alignSelf: "center",
                                    letterSpacing: "0",
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-600)",
                                        color: "var(--color-grey-100)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                    "&:disabled": {
                                        backgroundColor:
                                            "var(--color-grey-500)",
                                        cursor: "not-allowed",
                                        opacity: "0.8",
                                    },
                                }}
                                variant="contained"
                            >
                                {isAllSelected &&
                                searchParams.has("action", "not-readed") ? (
                                    <span
                                        style={{
                                            display: "flex",
                                            gap: "0.5rem",
                                            alignItems: "center",
                                        }}
                                    >
                                        {t("Mark all as read")}
                                        <MarkChatReadIcon sx={IconStyles} />
                                    </span>
                                ) : isAllSelected &&
                                  searchParams.has("action", "readed") ? (
                                    <span
                                        style={{
                                            display: "flex",
                                            gap: "0.5rem",
                                            alignItems: "center",
                                        }}
                                    >
                                        {" "}
                                        {t("Mark all as unread")}{" "}
                                        <MarkChatUnreadIcon sx={IconStyles} />
                                    </span>
                                ) : !isAllSelected &&
                                  searchParams.has("action", "not-readed") ? (
                                    <span
                                        style={{
                                            display: "flex",
                                            gap: "0.5rem",
                                            alignItems: "center",
                                        }}
                                    >
                                        {t("Mark as read")}
                                        <MarkChatReadIcon sx={IconStyles} />
                                    </span>
                                ) : (
                                    <span
                                        style={{
                                            display: "flex",
                                            gap: "0.5rem",
                                            alignItems: "center",
                                        }}
                                    >
                                        {t("Mark as unread")}
                                        <MarkChatUnreadIcon sx={IconStyles} />
                                    </span>
                                )}
                            </Button>
                        </MenuItem>
                        <MenuItem disableRipple onClick={handleCloseMenu}>
                            {searchParams.has("action", "readed") && (
                                <Tooltip
                                    TransitionComponent={Grow}
                                    title={t(
                                        `Delete ${
                                            isAllSelected ? "all" : "selected"
                                        } notifications`
                                    )}
                                >
                                    <StyledButton
                                        onClick={deleteSelectedNotifications}
                                        sx={{
                                            fontSize: "1.1rem",
                                            minWidth: 0,
                                            p: "0.7rem",
                                            border: "1px solid var(--color-grey-500)",
                                            ":hover > svg": {
                                                color: "#d32f2f",
                                            },
                                            display: "flex",
                                            gap: "0.5rem",
                                        }}
                                        color="inherit"
                                        variant="text"
                                    >
                                        <DeleteSweepIcon sx={iconStyle} />{" "}
                                        {t("Delete Selecteds")}
                                    </StyledButton>
                                </Tooltip>
                            )}
                        </MenuItem>
                    </Menu>
                </StyledSmallContainer>
                <StyledLargeContainer>
                    <FormControl sx={{ minWidth: "10%" }}>
                        <StyledSelect
                            className="switch-read-unread-btn"
                            sx={{
                                "& > div": {
                                    padding: "12.5px 14px",
                                },
                            }}
                            labelId="selectedNotificationLabel"
                            id="selectedNotification"
                            value={
                                searchParams.get("action") === "not-readed"
                                    ? 0
                                    : 1
                            }
                            onChange={e => {
                                searchParams.set(
                                    "action",
                                    e.target.value === 0
                                        ? "not-readed"
                                        : "readed"
                                );
                                setSearchParams(searchParams);
                                setSelected([]);
                            }}
                        >
                            {readedOrNotReadedNotification.map(
                                (notificationType, i) => (
                                    <MenuItem
                                        sx={{
                                            borderBottom: "1px solid #efefef",
                                        }}
                                        disableRipple
                                        key={i}
                                        value={notificationType.value}
                                    >
                                        {notificationType.label}
                                    </MenuItem>
                                )
                            )}
                        </StyledSelect>
                    </FormControl>
                    <Button
                        className="markAsRead-btn"
                        onClick={findAndUpdateNotification}
                        disabled={selected.length === 0 || isUpdating}
                        sx={{
                            backgroundColor: "var(--color-grey-800)",
                            color: "var(--color-grey-50)",
                            transition: "all .3s",
                            padding: "1rem",
                            fontSize: "1.1rem",
                            alignSelf: "center",
                            letterSpacing: "0",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-600)",
                                color: "var(--color-grey-100)",
                                transform: "translateY(-2px)",
                            },
                            "&:active": {
                                transform: "translateY(0)",
                            },
                            "&:disabled": {
                                backgroundColor: "var(--color-grey-400)",
                                cursor: "not-allowed",
                                opacity: "0.8",
                            },
                        }}
                        variant="contained"
                    >
                        {isAllSelected &&
                        searchParams.has("action", "not-readed") ? (
                            <span
                                style={{
                                    display: "flex",
                                    gap: "0.5rem",
                                    alignItems: "center",
                                }}
                            >
                                {t("Mark all as read")}
                                <MarkChatReadIcon sx={IconStyles} />
                            </span>
                        ) : isAllSelected &&
                          searchParams.has("action", "readed") ? (
                            <span
                                style={{
                                    display: "flex",
                                    gap: "0.5rem",
                                    alignItems: "center",
                                }}
                            >
                                {" "}
                                {t("Mark all as unread")}{" "}
                                <MarkChatUnreadIcon sx={IconStyles} />
                            </span>
                        ) : !isAllSelected &&
                          searchParams.has("action", "not-readed") ? (
                            <span
                                style={{
                                    display: "flex",
                                    gap: "0.5rem",
                                    alignItems: "center",
                                }}
                            >
                                {t("Mark as read")}
                                <MarkChatReadIcon sx={IconStyles} />
                            </span>
                        ) : (
                            <span
                                style={{
                                    display: "flex",
                                    gap: "0.5rem",
                                    alignItems: "center",
                                }}
                            >
                                {t("Mark as unread")}
                                <MarkChatUnreadIcon sx={IconStyles} />
                            </span>
                        )}
                    </Button>
                </StyledLargeContainer>
            </StyledToolBar>
            {searchParams.has("event", "delete-notification") && (
                <DeleteSelectedNotificationsModal
                    handleClose={handleCloseDeleteModal}
                    open={opensDeleteNotification}
                    selected={selected}
                />
            )}
        </>
    );
}

import {
    Button,
    FormControl,
    MenuItem,
    Select,
    Toolbar,
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

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const StyledSelect = styled(Select)`
    && {
        font-size: 1.3rem;
        color: var(--color-grey-800);

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

const IconStyles = {
    fontSize: "1.8rem",
    fill: "var(--color-green-lighter)",
};

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
    const { currentUser } = auth;
    const userId = currentUser?.uid;

    const readedOrNotReadedNotification = [
        {
            label: t("Unread Notifications"),
            value: 0,
        },
        {
            label: t("Notifications read"),
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

    return (
        <>
            <StyledToolBar
                sx={{
                    pl: { sm: 3 },
                    pr: { xs: 1, sm: 2 },
                    gap: "1.5rem",
                }}
            >
                <Typography
                    sx={{
                        marginRight: "auto",
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
                <SearchInput
                    searchText={searchText}
                    setSearchText={setSearchText}
                    label={t("Search Notification by date")}
                />
                <FormControl sx={{ minWidth: "10%" }}>
                    <StyledSelect
                        sx={{
                            "& > div": {
                                padding: "12.5px 14px",
                            },
                        }}
                        labelId="selectedNotificationLabel"
                        id="selectedNotification"
                        value={
                            searchParams.get("action") === "not-readed" ? 0 : 1
                        }
                        onChange={e => {
                            searchParams.set(
                                "action",
                                e.target.value === 0 ? "not-readed" : "readed"
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
                    onClick={findAndUpdateNotification}
                    disabled={selected.length === 0 || isUpdating}
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
            </StyledToolBar>
        </>
    );
}

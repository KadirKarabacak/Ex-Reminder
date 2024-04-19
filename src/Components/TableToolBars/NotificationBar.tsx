import { Button, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SearchInput from "../SearchInput";

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

export function NotificationToolBar({
    searchText,
    setSearchText,
}: {
    searchText: any;
    setSearchText: any;
}) {
    const { t } = useTranslation();

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
                            transform: "translateY(-2px)",
                        },
                        "&:active": {
                            transform: "translateY(0)",
                        },
                        "&:disabled": {
                            backgroundColor: "var(--color-grey-500)",
                        },
                    }}
                    variant="contained"
                >
                    {t("Mark as read")}
                </Button>
            </StyledToolBar>
        </>
    );
}

import { Button, TextField, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AddItemModal from "../Modals/AddItemModal";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
    width: 20%;
    & div + p {
        font-size: 1rem;
    }
    & label {
        color: var(--color-grey-400);
        font-size: 1.2rem;
    }
    & div > input {
        color: var(--color-grey-800);
        font-size: 1.3rem;
        padding: 1.3rem;

        &:disabled {
            background-color: var(--color-grey-300);
        }
    }
    & div > fieldset {
        border-color: var(--color-grey-500);
    }
    &:hover > div > fieldset {
        border-color: var(--color-brand-600) !important;
    }
`;

export function WarehouseToolBar({
    searchText,
    setSearchText,
}: {
    searchText: any;
    setSearchText: any;
}) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Toolbar
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
                        borderBottom: "3px solid var(--color-green-new)",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Warehouses")}
                </Typography>
                <StyledTextField
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder={t("Search Item by Name")}
                />
                <Button
                    onClick={handleOpen}
                    sx={{
                        backgroundColor: "var(--color-grey-800)",
                        color: "var(--color-grey-50)",
                        transition: "all .3s",
                        padding: "1rem 2rem",
                        fontSize: "1rem",
                        alignSelf: "center",
                        fontWeight: "bold",
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
                    {t("Add New Item")}
                </Button>
            </Toolbar>
            <AddItemModal handleClose={handleClose} open={open} />
        </>
    );
}

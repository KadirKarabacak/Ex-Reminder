import { Button, TextField, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import styled from "styled-components";
import AddSaleModal from "../Modals/AddSaleModal";

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

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
        border-color: var(--color-green-new) !important;
    }
`;

export function AccountingToolBar({
    searchText,
    setSearchText,
}: {
    searchText: any;
    setSearchText: any;
}) {
    const { t } = useTranslation();
    const [openMakeSale, setOpenMakeSale] = useState(false);
    const handleOpenMakeSale = () => setOpenMakeSale(true);
    const handleCloseMakeSale = () => setOpenMakeSale(false);

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
                        borderBottom: "3px solid var(--color-green-new)",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Accounting")}
                </Typography>
                <StyledTextField
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Search Sales by Company Name"
                />
                <Button
                    onClick={handleOpenMakeSale}
                    sx={{
                        backgroundColor: "var(--color-green-lighter)",
                        color: "white",
                        transition: "all .3s",
                        padding: "1rem 2rem",
                        fontSize: "1.1rem",
                        alignSelf: "center",
                        "&:hover": {
                            backgroundColor: "var(--color-green-new)",
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
                    {t("Make Sale")}
                </Button>
            </StyledToolBar>
            <AddSaleModal
                handleClose={handleCloseMakeSale}
                open={openMakeSale}
            />
        </>
    );
}

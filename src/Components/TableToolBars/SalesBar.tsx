import { TextField, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

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

const StyledSpan = styled.span`
    border-left: 1px solid var(--color-grey-300);
    padding-left: 6px;
    color: var(--color-grey-800);
`;

export function SalesToolBar({
    searchText,
    setSearchText,
    currentCompany,
}: {
    searchText: any;
    setSearchText: any;
    currentCompany: any;
}) {
    const { t } = useTranslation();
    // const [open, setOpen] = useState(false);
    // const [openMakeSale, setOpenMakeSale] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    // const handleOpenMakeSale = () => setOpenMakeSale(true);
    // const handleCloseMakeSale = () => setOpenMakeSale(false);

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
                    {t("Sales")}{" "}
                    <StyledSpan>{currentCompany.companyName}</StyledSpan>
                </Typography>
                <StyledTextField
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Search Sale by Date"
                />
                {/* <Button
                    onClick={handleOpen}
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
                    {t("Add Company")}
                </Button> */}
                {/* <Button
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
                </Button> */}
            </StyledToolBar>
            {/* <AddCompanyModal handleClose={handleClose} open={open} />
            <AddSaleModal
                handleClose={handleCloseMakeSale}
                open={openMakeSale}
            /> */}
        </>
    );
}
import { Button, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import styled from "styled-components";
import AddCompanyModal from "../Modals/AddCompanyModal";

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

export function CompaniesToolBar() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        marginRight: "auto",
                        color: "var(--color-indigo-700)",
                        fontSize: "2rem",
                        fontWeight: "bold",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Companies")}
                </Typography>
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
                    {t("Add Company")}
                </Button>
                {/* <Tooltip title="Filter list">
                    <StyledIconButton>
                        <FilterListIcon />
                    </StyledIconButton>
                </Tooltip> */}
            </StyledToolBar>
            <AddCompanyModal handleClose={handleClose} open={open} />
        </>
    );
}

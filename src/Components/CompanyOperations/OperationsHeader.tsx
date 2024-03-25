import { Button, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddAgreementModal from "../Modals/AddAgreementModal";

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

export function OperationsHeader({ currentCompany }: { currentCompany: any }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [opensAgreement, setOpensAgreement] = useState(false);

    const handleOpenAgreement = () => setOpensAgreement(true);
    const handleCloseAgreement = () => setOpensAgreement(false);

    return (
        <>
            <StyledToolBar
                sx={{
                    pl: { sm: 3 },
                    pr: { xs: 1, sm: 2 },
                    gap: "1rem",
                    width: "100%",
                }}
            >
                <Typography
                    sx={{
                        marginRight: "auto",
                        color: "var(--color-grey-800)",
                        fontSize: "3rem",
                        fontWeight: "bold",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Operations")}{" "}
                    <span style={{ color: "var(--color-green-new)" }}>
                        {" "}
                        {currentCompany?.companyName}
                    </span>
                </Typography>
                <Button
                    onClick={handleOpenAgreement}
                    sx={{
                        backgroundColor: "var(--color-grey-800)",
                        color: "var(--color-grey-50)",
                        transition: "all .3s",
                        padding: "1rem 2rem",
                        fontSize: "1rem",
                        alignSelf: "center",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "var(--color-grey-700)",
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
                    {t("Add Agreement")}
                </Button>

                <Button
                    onClick={() => navigate("/companies")}
                    sx={{
                        color: "var(--color-grey-800)",
                        transition: "all .3s",
                        padding: "1rem 1.6rem",
                        fontSize: "1.1rem",
                        border: "1px solid var(--color-grey-500)",
                        backgroundColor: "var(--color-grey-100)",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "var(--color-grey-200)",
                            transform: "translateY(-2px)",
                            border: "1px solid var(--color-grey-800)",
                        },
                        "&:active": {
                            transform: "translateY(0)",
                        },
                    }}
                    variant="outlined"
                >
                    {t("Back to Companies")}
                </Button>
            </StyledToolBar>
            <AddAgreementModal
                handleClose={handleCloseAgreement}
                open={opensAgreement}
                currentCompany={currentCompany}
            />
        </>
    );
}

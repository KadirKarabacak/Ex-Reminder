import { Button, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddAgreementModal from "../Modals/Agreements/AddAgreementModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const StyledSpan = styled.span`
    color: var(--color-grey-800);
    border-left: 2px solid var(--color-grey-500);
    padding-left: 8px;
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
                        color: "var(--color-green-lighter)",
                        fontSize: "2.4rem",
                        fontWeight: "bold",
                        borderBottom: "3px solid var(--color-green-new)",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Operations")}{" "}
                    <StyledSpan> {currentCompany?.companyName}</StyledSpan>
                </Typography>
                <Button
                    onClick={handleOpenAgreement}
                    sx={{
                        backgroundColor: "var(--color-green-lighter)",
                        color: "#f5f3f3",
                        transition: "all .3s",
                        padding: "1rem 2rem",
                        fontSize: "1.1rem",
                        alignSelf: "center",
                        fontWeight: "bold",
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
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
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
                    <ArrowBackIcon /> {t("Back to Companies")}
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

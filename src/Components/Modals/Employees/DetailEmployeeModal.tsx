import {
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    Grid,
    Modal,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../../Utils/utils";
import { EditEmployeeModalTypes } from "../../../Interfaces/User";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 45%;
    background-color: var(--color-grey-100);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 4rem;
    border-radius: 5px;

    @media (max-width: 1000px) {
        width: 80%;
    }
    @media (max-width: 650px) {
        width: 95%;
        padding: 3rem 2rem;
    }
    @media (max-width: 450px) {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 0;
        gap: 0.3rem;
    }
`;
const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    justify-content: center;
`;

const StyledTitle = styled.h4`
    color: var(--color-green-new);
    align-self: flex-start;
    margin-bottom: 0.9rem;
`;

const StyledDescription = styled.h5`
    color: var(--color-grey-600);
    align-self: flex-start;
    margin-bottom: 0.9rem;
`;

const StyledSpan = styled.span`
    color: var(--color-green-lighter);
    padding-left: 8px;
    border-left: 2px solid var(--color-grey-500);
`;

export default function DetailEmployeeModal({
    open,
    handleClose,
    row,
}: EditEmployeeModalTypes) {
    const { t } = useTranslation();

    function onCloseModal() {
        handleClose(open);
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onCloseModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <StyledBox>
                    <Typography
                        id="transition-modal-title"
                        variant="h3"
                        component="h1"
                        sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                    >
                        {t(`Employee Detail `)}{" "}
                        <StyledSpan>{row.full_name}</StyledSpan>
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: "2rem" }}>
                        <Grid item xs={4}>
                            <StyledTitle>{t("Name of employee")}</StyledTitle>

                            <StyledDescription>
                                {row.full_name || t("Not spesified")}
                            </StyledDescription>
                            <Divider
                                orientation="vertical"
                                variant="fullWidth"
                                flexItem
                                sx={{
                                    borderColor: "var(--color-grey-300)",
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTitle>{t("Job Title")}</StyledTitle>
                            <StyledDescription>
                                {row.job_title || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTitle>{t("Department")}</StyledTitle>
                            <StyledDescription>
                                {row.department || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider
                                sx={{
                                    borderColor: "var(--color-grey-200)",
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTitle>Email</StyledTitle>
                            <StyledDescription>
                                {row.email || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTitle>{t("Age")}</StyledTitle>
                            <StyledDescription>
                                {row.age || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTitle>{t("Salary")}</StyledTitle>
                            <StyledDescription>
                                {formatCurrency(row.salary) ||
                                    t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider
                                sx={{
                                    borderColor: "var(--color-grey-200)",
                                }}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <StyledTitle>{t("Hire Date")}</StyledTitle>
                            <StyledDescription>
                                {row.hire_date || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider
                                sx={{
                                    borderColor: "var(--color-grey-200)",
                                }}
                            />
                        </Grid>
                    </Grid>

                    <StyledButtonContainer>
                        <Button
                            onClick={onCloseModal}
                            sx={{
                                color: "var(--color-grey-800)",
                                transition: "all .3s",
                                padding: "1rem 3rem",
                                fontSize: "1.1rem",
                                border: "1px solid var(--color-grey-500)",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    transform: "translateY(-2px)",
                                    border: "1px solid var(--color-grey-800)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                            }}
                            variant="outlined"
                        >
                            {t("Close")}
                        </Button>
                    </StyledButtonContainer>
                </StyledBox>
            </Fade>
        </Modal>
    );
}

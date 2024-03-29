import {
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    Grid,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { EditCompanyModalTypes } from "../../Interfaces/User";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { formatDate } from "../../Utils/utils";
import { useUpdateCompany } from "../../Api/companyController";
import { auth } from "../../Api/firebase";
import i18n from "../../i18n";
import { MuiTelInput } from "mui-tel-input";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 35%;
    background-color: var(--color-grey-100);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 4rem 4rem 3rem;
    border-radius: 5px;
`;
const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    justify-content: center;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
    background-color: var(--color-grey-200);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    & div + p {
        font-size: 1rem;
    }
    & label {
        color: var(--color-grey-400);
        font-size: 1.3rem;
    }

    & div > input {
        color: var(--color-grey-700);
        font-size: 1.3rem;

        &:disabled {
            background-color: var(--color-grey-300);
        }
    }

    & div > input:focus .MuiInputLabel-filled {
        color: var(--color-brand-500);
    }

    & div > fieldset {
        border-color: var(--color-grey-500);
    }
    &:hover > div > fieldset {
        border-color: var(--color-brand-600) !important;
    }
`;

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 0.9rem;
`;

const StyledTelInput = styled(MuiTelInput)`
    width: 100%;
    background-color: var(--color-grey-200);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    & label {
        color: var(--color-grey-400);
        font-size: 1.3rem;
    }

    & > div {
        color: var(--color-grey-800);
        font-size: 1.3rem;
        padding-left: 10px;
    }

    & > div > fieldset {
        border-color: var(--color-grey-500);
    }

    &:hover > div > fieldset {
        border-color: var(--color-brand-600) !important;
    }
`;

const StyledSpan = styled.span`
    color: var(--color-brand-500);
`;

export default function EditCompanyModal({
    open,
    handleClose,
    id,
    row,
}: EditCompanyModalTypes) {
    const { t } = useTranslation();
    const { isPending, mutateAsync: updateCompany } = useUpdateCompany();
    const [companyPhone, setCompanyPhone] = useState(row?.companyPhone || "");
    const [managerPhone, setManagerPhone] = useState(
        row?.companyManager?.managerPhone || ""
    );
    const { currentUser } = auth;
    const currentLanguage = i18n.language;
    const userId = currentUser?.uid;

    const {
        handleSubmit,
        register,
        getValues,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm();

    async function onSubmit() {
        const {
            companyName,
            companyAddress,
            companyEmail,
            companyWebsite,
            managerName,
            managerEmail,
        } = getValues();

        const company = {
            companyName,
            companyAddress,
            companyPhone: companyPhone,
            companyEmail,
            companyWebsite,
            companyManager: {
                managerName,
                managerPhone: managerPhone,
                managerEmail,
            },
            editedAt: formatDate(new Date()),
        };
        await updateCompany({ company, id, userId });
        onCloseModal();
    }

    function onCloseModal() {
        handleClose(open);
        clearErrors();
        reset();
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <StyledBox>
                        <Typography
                            id="transition-modal-title"
                            variant="h2"
                            component="h1"
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            {t("Edit Company")}{" "}
                            <StyledSpan>{row.companyName}</StyledSpan>
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: "1rem" }}>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Company Name")}</StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    variant="filled"
                                    label={t("Company Name")}
                                    {...register("companyName", {
                                        required: t("Company Name is required"),
                                    })}
                                    error={Boolean(errors?.companyName)}
                                    helperText={
                                        (errors?.companyName
                                            ?.message as React.ReactNode) || ""
                                    }
                                    defaultValue={row.companyName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>
                                    {t("Company Address")}
                                </StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    variant="filled"
                                    label={t("Company Address")}
                                    {...register("companyAddress")}
                                    error={Boolean(errors?.companyAddress)}
                                    helperText={
                                        (errors?.companyAddress
                                            ?.message as React.ReactNode) || ""
                                    }
                                    defaultValue={row.companyAddress}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider
                                    sx={{
                                        borderColor: "var(--color-grey-200)",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>{t("Company Phone")}</StyledTitle>
                                <StyledTelInput
                                    label={t("Company Phone")}
                                    variant="filled"
                                    preferredCountries={["TR", "GB"]}
                                    defaultCountry={
                                        currentLanguage === "tr-TR"
                                            ? "TR"
                                            : "GB"
                                    }
                                    value={companyPhone}
                                    onChange={value => setCompanyPhone(value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>{t("Company Email")}</StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    variant="filled"
                                    label="Company Email"
                                    {...register("companyEmail", {
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: t("Invalid email"),
                                        },
                                    })}
                                    error={Boolean(errors?.companyEmail)}
                                    helperText={
                                        (errors?.companyEmail
                                            ?.message as React.ReactNode) || ""
                                    }
                                    defaultValue={row.companyEmail}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>
                                    {t("Company Website")}
                                </StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    variant="filled"
                                    label={t("Company Website")}
                                    {...register("companyWebsite")}
                                    defaultValue={row.companyWebsite}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider
                                    sx={{
                                        borderColor: "var(--color-grey-200)",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>{t("Manager Name")}</StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    variant="filled"
                                    label={t("Manager Name")}
                                    {...register("managerName")}
                                    defaultValue={
                                        row?.companyManager?.managerName
                                    }
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>{t("Manager Phone")}</StyledTitle>
                                <StyledTelInput
                                    label={t("Manager Phone")}
                                    variant="filled"
                                    preferredCountries={["TR", "GB"]}
                                    defaultCountry={
                                        currentLanguage === "tr-TR"
                                            ? "TR"
                                            : "GB"
                                    }
                                    value={managerPhone}
                                    onChange={value => setManagerPhone(value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>{t("Manager Email")}</StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    variant="filled"
                                    label={t("Manager Email")}
                                    {...register("managerEmail")}
                                    defaultValue={
                                        row?.companyManager?.managerEmail
                                    }
                                />
                            </Grid>
                        </Grid>

                        <StyledButtonContainer>
                            <Button
                                sx={{
                                    backgroundColor: "var(--color-grey-800)",
                                    color: "var(--color-grey-50)",
                                    transition: "all .3s",
                                    padding:
                                        currentLanguage === "en-EN"
                                            ? "1rem 3rem"
                                            : "1rem 2rem",
                                    fontSize: "1.1rem",
                                    alignSelf: "flex-start",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-700)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                type="submit"
                                variant="contained"
                                disabled={isPending}
                            >
                                {t("Edit")}
                            </Button>
                            <Button
                                onClick={onCloseModal}
                                sx={{
                                    color: "var(--color-grey-800)",
                                    transition: "all .3s",
                                    padding:
                                        currentLanguage === "en-EN"
                                            ? "1rem 2rem"
                                            : "1rem 3rem",
                                    fontSize: "1.1rem",
                                    border: "1px solid var(--color-grey-500)",
                                    backgroundColor: "var(--color-grey-100)",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-200)",
                                        transform: "translateY(-2px)",
                                        border: "1px solid var(--color-grey-800)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                variant="outlined"
                                disabled={isPending}
                            >
                                {t("Cancel")}
                            </Button>
                        </StyledButtonContainer>
                    </StyledBox>
                </form>
            </Fade>
        </Modal>
    );
}

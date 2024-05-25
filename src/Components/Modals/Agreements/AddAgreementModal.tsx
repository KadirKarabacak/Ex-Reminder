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
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
// import { MuiTelInput } from "mui-tel-input";
import { add, isBefore, min } from "date-fns";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import { useAddAgreement } from "../../../Api/agreementController";
import { formatCurrency, formatDate } from "../../../Utils/utils";
import toast from "react-hot-toast";
import { auth } from "../../../Api/firebase";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 35%;
    background-color: var(--color-grey-100);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 5rem 4rem 5rem;
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
    margin-top: 3rem;
    justify-content: center;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
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

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 0.9rem;
`;

const StyledSpan = styled.span`
    color: var(--color-green-lighter);
    font-size: 3rem;
    border-left: 2px solid var(--color-grey-500);
    padding-left: 8px;
`;

const StyledDatePicker = styled(DatePicker)`
    width: 100%;

    & > div {
        color: var(--color-grey-800);
        font-size: 1.3rem;

        &:hover > fieldset {
            border-color: var(--color-brand-600) !important;
        }

        & > fieldset {
            border-color: var(--color-grey-500);
        }
    }
`;

const minDate = min([new Date(2000, 1, 1)]);

interface AgreementModalTypes {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    currentCompany: any;
}

export default function AddAgreementModal({
    open,
    handleClose,
    currentCompany,
}: AgreementModalTypes) {
    const { t } = useTranslation();
    const [agreementStart, setAgreementStart] = useState(new Date());
    const [agreementEnd, setAgreementEnd] = useState(
        add(new Date(), { months: 1 })
    );
    const [error, setError] = useState<DateValidationError>(null);
    const { mutateAsync: addAgreement, isPending } = useAddAgreement();
    const companyId = currentCompany?.id;
    const { currentUser } = auth;

    const errorMessage = React.useMemo(() => {
        switch (error) {
            case "minDate": {
                return t("Date cannot be before 10/06/2000");
            }
            case "invalidDate": {
                return t("Your date is not valid");
            }

            default: {
                return "";
            }
        }
    }, [error]);

    const {
        handleSubmit,
        register,
        getValues,
        clearErrors,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const isDateBefore = isBefore(agreementEnd, agreementStart);

    async function onSubmit() {
        const { agreementContent, agreementParties, agreementBudget } =
            getValues();

        let budget;
        if (agreementBudget) budget = formatCurrency(agreementBudget);

        const agreement = {
            agreementContent,
            agreementParties,
            agreementBudget: budget || "",
            agreementStartDate: formatDate(agreementStart),
            agreementEndDate: formatDate(agreementEnd),
            createdAt: formatDate(new Date()),
            companyId,
        };
        if (errorMessage) return toast.error(errorMessage);
        if (isDateBefore)
            return toast.error(t("End Date cannot be before Start Date"));
        await addAgreement({ agreement, companyId });
        //! BİR ANLAŞMA BELGESİ VAR İSE KULLANICININ ONU SİSTEME YÜKLEMESİNE İZİN VER
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
                            variant="h3"
                            component="h1"
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            {t("Add Agreement with")}{" "}
                            <StyledSpan>
                                {currentCompany.companyName}
                            </StyledSpan>
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: "1rem" }}>
                            <Grid item xs={12} md={6}>
                                <StyledTitle>
                                    {t("Agreement Content*")}
                                </StyledTitle>
                                <StyledTextField
                                    id="agreementContent"
                                    disabled={isPending}
                                    placeholder={t("Agreement Content")}
                                    {...register("agreementContent", {
                                        required: t(
                                            "Agreement Content is required"
                                        ),
                                    })}
                                    error={Boolean(errors?.agreementContent)}
                                    helperText={
                                        (errors?.agreementContent
                                            ?.message as React.ReactNode) || ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>
                                    {t("Agreement Budget")}
                                </StyledTitle>
                                <StyledTextField
                                    id="agreementBudget"
                                    disabled={isPending}
                                    type="number"
                                    placeholder={t("Agreement Budget")}
                                    {...register("agreementBudget")}
                                    error={Boolean(errors?.agreementBudget)}
                                    helperText={
                                        (errors?.agreementBudget
                                            ?.message as React.ReactNode) || ""
                                    }
                                />
                            </Grid>
                            {window.innerWidth > 900 && (
                                <Grid item xs={12}>
                                    <Divider
                                        sx={{
                                            borderColor:
                                                "var(--color-grey-200)",
                                        }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={6} md={4}>
                                <StyledTitle>
                                    {t("Parties of Agreement")}
                                </StyledTitle>
                                <StyledTextField
                                    id="agreementParties"
                                    disabled={isPending}
                                    type="text"
                                    defaultValue={`${
                                        currentUser?.displayName || t("You")
                                    } & ${currentCompany?.companyName}`}
                                    placeholder={t("Company A & Company B")}
                                    {...register("agreementParties")}
                                />
                            </Grid>

                            <Grid item xs={6} md={4}>
                                <StyledTitle>
                                    {window.innerWidth < 600
                                        ? t("Start Date")
                                        : t("Agreement Start Date")}
                                </StyledTitle>
                                <StyledDatePicker
                                    disabled={isPending}
                                    format="dd/MM/yyyy"
                                    onChange={(date: any) => {
                                        setValue("agreementStartDate", date);
                                        setAgreementStart(date);
                                    }}
                                    value={agreementStart}
                                    defaultValue={new Date()}
                                    onError={newError => setError(newError)}
                                    slotProps={{
                                        textField: {
                                            helperText: errorMessage,
                                            id: "agreementStartDate",
                                        },
                                    }}
                                    minDate={minDate}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <StyledTitle>
                                    {window.innerWidth < 600
                                        ? t("End Date")
                                        : t("Agreement End Date")}
                                </StyledTitle>
                                <StyledDatePicker
                                    disabled={isPending}
                                    format="dd/MM/yyyy"
                                    onChange={(date: any) => {
                                        setValue("agreementEndDate", date);
                                        setAgreementEnd(date);
                                    }}
                                    value={agreementEnd}
                                    defaultValue={new Date()}
                                    onError={newError => setError(newError)}
                                    slotProps={{
                                        textField: {
                                            helperText: errorMessage,
                                            id: "agreementEndDate",
                                        },
                                    }}
                                    minDate={minDate}
                                />
                            </Grid>
                        </Grid>

                        <StyledButtonContainer>
                            <Button
                                id="complateAgreementBtn"
                                disabled={isPending}
                                sx={{
                                    backgroundColor: "var(--color-grey-800)",
                                    color: "var(--color-grey-50)",
                                    transition: "all .3s",
                                    padding: "1rem 2rem",
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
                                    "&.Mui-disabled": {
                                        background: "var(--color-grey-400)",
                                        WebkitTextFillColor:
                                            "var(--color-grey-500)",
                                    },
                                }}
                                type="submit"
                                variant="contained"
                            >
                                {t("Complate Agreement")}
                            </Button>
                            <Button
                                id="cancelAgreementBtn"
                                disabled={isPending}
                                onClick={onCloseModal}
                                sx={{
                                    color: "var(--color-grey-800)",
                                    transition: "all .3s",
                                    padding: "1rem 3rem",
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

                                    "&.Mui-disabled": {
                                        background: "var(--color-grey-400)",
                                        WebkitTextFillColor:
                                            "var(--color-grey-500)",
                                    },
                                }}
                                variant="outlined"
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

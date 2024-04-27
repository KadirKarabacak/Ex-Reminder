import { Button, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Heading from "../Heading";
import { useResetPasswordEmail } from "../../Api/userController";
import { useTranslation } from "react-i18next";

const StyledLogo = styled.img`
    width: 18rem;
    height: 18rem;
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
        color: var(--color-grey-400) !important;
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

const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
`;

const StyledParagraph = styled.p`
    color: var(--color-grey-600);
    font-size: 1.2rem;
`;

export default function ForgotPasswordForm() {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setFocus,
    } = useForm();
    const { mutate: resetPassword, isPending: isResetting } =
        useResetPasswordEmail();
    const navigate = useNavigate();

    function onSubmit() {
        const { email } = getValues();
        resetPassword(email);
    }

    useEffect(() => {
        setFocus("email");
    }, [setFocus]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2.5rem",
                    color: "var(--color-grey-800)",
                    backgroundColor: "var(--color-grey-50-forms)",
                    p: "6rem 4rem",
                    boxShadow: "var(--shadow-md)",
                    position: "relative",
                    zIndex: "9",
                }}
            >
                <StyledLogo src="../../../EX_REMINDER-blue.png" />
                <Heading title={t("Reset your password")} />
                <StyledTextField
                    label="Email"
                    disabled={isResetting}
                    sx={{ minWidth: "100%" }}
                    variant="filled"
                    {...register("email", {
                        required: t("Email is required"),
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t("Invalid email"),
                        },
                    })}
                    id="email"
                    error={Boolean(errors.email)}
                    helperText={
                        (errors?.email?.message as React.ReactNode) || ""
                    }
                />
                <StyledButtonContainer>
                    <Button
                        disabled={isResetting}
                        sx={{
                            backgroundColor: "var(--color-grey-800)",
                            color: "var(--color-grey-50)",
                            transition: "all .3s",
                            padding: "1rem 3rem",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-600)",
                                color: "var(--color-grey-100)",
                                transform: "translateY(-2px)",
                            },
                            "&:active": {
                                transform: "translateY(0)",
                            },
                            "&.Mui-disabled": {
                                background: "var(--color-grey-400)",
                            },
                        }}
                        type="submit"
                        variant="contained"
                    >
                        {t("Reset Password")}
                    </Button>
                    <StyledParagraph>{t("or")}</StyledParagraph>
                    <Button
                        disabled={isResetting}
                        onClick={() => navigate("/login")}
                        sx={{
                            color: "var(--color-grey-800)",
                            transition: "all .3s",
                            padding: "1rem 3rem",
                            fontSize: "1.1rem",
                            border: "1px solid var(--color-grey-800)",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-200)",
                                transform: "translateY(-2px)",
                                border: "1px solid var(--color-grey-800)",
                            },
                            "&:active": {
                                transform: "translateY(0)",
                            },
                            "&.Mui-disabled": {
                                background: "var(--color-grey-400)",
                            },
                        }}
                        variant="outlined"
                    >
                        {t("Back to login")}
                    </Button>
                </StyledButtonContainer>
            </Paper>
        </form>
    );
}

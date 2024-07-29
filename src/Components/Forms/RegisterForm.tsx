import { Button, Checkbox, Paper, TextField } from "@mui/material";
import Heading from "../Heading";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createUserWithEmailAndPasswordQuery } from "../../Api/userController";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import ConfidentialityAgreementModal from "../Modals/Register/ConfidentialityAgreementModal";

const StyledLogo = styled.img`
    width: 17rem;
    height: 17rem;
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
    margin-top: 0.5rem;
`;

const StyledLabel = styled.label`
    color: var(--color-grey-600);
    font-size: 1.3rem;

    &:hover > button {
        background-color: transparent;
    }
`;

const StyledAgreementContainer = styled.div`
    align-self: flex-start;
    display: flex;
    align-items: center;
    justify-content: start;
`;

const StyledErrorMessage = styled.div`
    color: var(--color-red-700);
    padding-left: 3rem;
    justify-self: start;
    font-size: 1.2rem;
`;

const StyledSpan = styled.span`
    font-weight: bold;
    color: var(--color-grey-900);
`;

const StyledCheckbox = styled(Checkbox)`
    align-self: start;

    & > svg {
        font-size: 1.8rem;
    }
`;

export default function RegisterForm() {
    const [open, setOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const { register, handleSubmit, reset, formState, getValues, setFocus } =
        useForm();
    const [confidentialityAgreement, setConfidentialityAgreement] =
        useState(false);
    const { errors, isSubmitting } = formState;
    const navigate = useNavigate();
    const currentLanguage = i18n.language;
    const [searchParams, setSearchParams] = useSearchParams();
    const isMobileOrBigDesktop =
        window.innerWidth > 1400 || window.innerWidth < 600;

    const handleOpen = () => {
        setOpen(true);
        setSearchParams("privacy-policy");
    };
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setSearchParams("");
        }, 500);
    };

    async function onSubmit() {
        const { email, password } = getValues();
        if (!email || !password) return;

        if (!confidentialityAgreement)
            return toast.error(
                t("You must agree Privacy Policy to use this application")
            );
        const createState = await createUserWithEmailAndPasswordQuery({
            email,
            password,
        });

        if (createState) {
            navigate("/login");
            toast.success(
                t(
                    "User successfully created, check your email for verification."
                )
            );
        }
        reset({
            email: "",
            password: "",
            repeatPassword: "",
        });
    }

    useEffect(() => {
        if (window.innerWidth > 1000) setFocus("email");
    }, [setFocus]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1.5rem",
                        color: "var(--color-grey-800)",
                        backgroundColor: "var(--color-grey-50-forms)",
                        p: "4rem",
                        "@media (max-width: 1400px)": {
                            padding: "2rem 4rem",
                            gap: " 0.8rem",
                        },
                        boxShadow: "var(--shadow-md)",
                        maxWidth: "55rem",
                        position: "relative",
                        zIndex: "9",
                    }}
                >
                    <StyledLogo src="../../../EX_REMINDER-blue.png" />
                    <Heading
                        title={
                            window.innerWidth < 500
                                ? t("Register")
                                : t("Register to get started")
                        }
                    />
                    <StyledTextField
                        disabled={isSubmitting}
                        label="Email"
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
                            (isMobileOrBigDesktop &&
                                (errors?.email?.message as React.ReactNode)) ||
                            ""
                        }
                    />
                    <StyledTextField
                        disabled={isSubmitting}
                        label={t("Password")}
                        sx={{ minWidth: "100%" }}
                        variant="filled"
                        {...register("password", {
                            required: t("Password is required"),
                            minLength: {
                                value: 8,
                                message: t(
                                    "Password must be at least 8 characters"
                                ),
                            },
                        })}
                        id="password"
                        type="password"
                        error={Boolean(errors?.password)}
                        helperText={
                            (isMobileOrBigDesktop &&
                                (errors?.password
                                    ?.message as React.ReactNode)) ||
                            ""
                        }
                    />
                    <StyledTextField
                        disabled={isSubmitting}
                        label={t("Repeat Password")}
                        sx={{ minWidth: "100%" }}
                        variant="filled"
                        {...register("repeatPassword", {
                            required: t("Password repeat is required"),
                            validate: value =>
                                getValues().password === value ||
                                t("Passwords do not match"),
                        })}
                        id="repeatPassword"
                        type="password"
                        error={Boolean(errors?.repeatPassword)}
                        helperText={
                            (isMobileOrBigDesktop &&
                                (errors?.repeatPassword
                                    ?.message as React.ReactNode)) ||
                            ""
                        }
                    />
                    <StyledAgreementContainer>
                        <StyledCheckbox
                            checked={confidentialityAgreement}
                            inputProps={{}}
                            onChange={e =>
                                setConfidentialityAgreement(e.target.checked)
                            }
                        />
                        <StyledLabel>
                            {currentLanguage === "en-EN" &&
                                t("I have read and approve ")}
                            <Button
                                onClick={handleOpen}
                                sx={{
                                    fontSize: "1.3rem",
                                    textTransform: "none",
                                    padding: "0",
                                    color: "var(--color-green-new)",
                                    verticalAlign: "baseline",
                                    fontWeight: "bold",
                                    ":hover": {
                                        backgroundColor:
                                            "var(--color-grey-200)",
                                    },
                                }}
                                variant="text"
                            >
                                {t("Clarification Text on Personal Data")}{" "}
                            </Button>{" "}
                            {t("in line with")}{" "}
                            <StyledSpan>
                                {t(
                                    "Privacy and Cookie Policy, Regulation on Distance Contracts"
                                )}
                            </StyledSpan>
                            {t(" and ")}
                            <StyledSpan>
                                {t(
                                    "Declaration and Consent Consent Text Regarding Personal Data"
                                )}
                            </StyledSpan>
                            {currentLanguage === "tr-TR" &&
                                t(" okudum onaylıyorum.")}
                        </StyledLabel>
                    </StyledAgreementContainer>
                    {errors?.confidentialityAgreement && (
                        <StyledErrorMessage>
                            {
                                errors?.confidentialityAgreement
                                    ?.message as string
                            }
                        </StyledErrorMessage>
                    )}
                    <StyledButtonContainer>
                        <Button
                            disabled={isSubmitting || !confidentialityAgreement}
                            sx={{
                                backgroundColor: "var(--color-green-new)",
                                color: "var(--color-white-soft)",
                                transition: "all .3s",
                                padding: "1rem 3rem",
                                fontSize: "1.1rem",
                                border: "1px solid transparent",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor:
                                        "var(--color-green-lighter)",
                                    color: "var(--color-white-soft)",
                                    transform: "translateY(-2px)",
                                    border: "1px solid transparent",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                                "&.Mui-disabled": {
                                    background: "var(--color-grey-400)",
                                    cursor: "not-allowed",
                                },
                            }}
                            type="submit"
                            variant="contained"
                        >
                            {t("Register")}
                        </Button>
                        <p>{t("or")}</p>
                        <Button
                            disabled={isSubmitting}
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
                            type="submit"
                            variant="outlined"
                        >
                            {t("Back to login")}
                        </Button>
                    </StyledButtonContainer>
                </Paper>
            </form>
            {searchParams.has("privacy-policy") && (
                <ConfidentialityAgreementModal
                    open={open}
                    handleClose={handleClose}
                    setConfidentialityAgreement={setConfidentialityAgreement}
                />
            )}
        </>
    );
}

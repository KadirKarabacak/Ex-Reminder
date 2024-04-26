import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@mui/material";
import Heading from "../Heading";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPasswordQuery } from "../../Api/userController";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const StyledLogo = styled.img`
    width: 18rem;
    height: 18rem;
    /* filter: blur(3px); */
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

const StyledLink = styled(Link)`
    font-size: 1.3rem;
    color: var(--color-grey-600);
    border-bottom: 1px solid transparent;
    padding-bottom: 3px;
    transition: all 0.3s;

    &:hover {
        color: var(--color-grey-800);
        border-bottom: 1px solid var(--color-grey-600);
        transform: translateY(-1px);
    }
    &:active {
        transform: translateY(0);
    }
`;

const StyledParagraph = styled.p`
    color: var(--color-grey-600);
    font-size: 1.2rem;
`;

const StyledFormControl = styled(FormControl)`
    & > div {
        color: var(--color-grey-800);
        font-size: 1.2rem;

        &:hover &::before {
            border-bottom: 1px solid var(--color-grey-800);
        }

        &::before {
            border-color: var(--color-grey-800) !important;
        }
    }

    & > div > div {
        padding: 1.5rem;
    }
`;

export default function LoginForm() {
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState("en-EN");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        getValues,
        setFocus,
    } = useForm();
    const navigate = useNavigate();

    async function onSubmit() {
        const { email, password } = getValues();
        if (!email || !password) return;
        const loginState = await signInWithEmailAndPasswordQuery({
            email,
            password,
        });
        reset();
        if (loginState) {
            navigate("/");
            return toast.success(t("Successfully logged in, redirecting..."));
        } else {
            return toast.error(
                t(
                    "Wrong email or password. Check your credentials and try again"
                )
            );
        }
    }

    useEffect(() => {
        setFocus("email");
    }, [setFocus]);

    useEffect(() => {
        setCurrentLanguage(i18n.language || "en-EN");
        i18n.changeLanguage(i18n.language);
    }, []);

    const handleChangeLang = (e: string) => {
        i18n.changeLanguage(e);
        setCurrentLanguage(e);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2rem",
                    color: "var(--color-grey-800)",
                    backgroundColor: "var(--color-grey-50)",
                    p: "4rem 4rem",
                    boxShadow: "var(--shadow-md)",
                    minWidth: "45rem",
                }}
            >
                {/* <StyledLogo src="../../logo-here.png" /> */}
                <StyledLogo
                    src="../../../EX_REMINDER-blue.png"
                    alt="EX_REMINDER logo"
                />
                <Heading title={t("Login to your account")} />
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
                        (errors?.email?.message as React.ReactNode) || ""
                    }
                />
                <StyledTextField
                    disabled={isSubmitting}
                    label={t("Password")}
                    sx={{ minWidth: "100%" }}
                    variant="filled"
                    {...register("password", {
                        required: t("Password is required"),
                    })}
                    id="password"
                    type="password"
                    error={Boolean(errors.email)}
                    helperText={
                        (errors?.password?.message as React.ReactNode) || ""
                    }
                />
                <StyledButtonContainer>
                    <Button
                        disabled={isSubmitting}
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
                        {t("Login")}
                    </Button>
                    <StyledParagraph>{t("or")}</StyledParagraph>
                    <Button
                        disabled={isSubmitting}
                        onClick={() => navigate("/register")}
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
                        {t("Register")}
                    </Button>
                </StyledButtonContainer>
                <StyledLink to="/forgotpassword">
                    {t("Forgot your password?")}
                </StyledLink>

                {/* Change language */}
                <StyledFormControl variant="standard">
                    <Select
                        value={currentLanguage}
                        onChange={e => handleChangeLang(e.target.value)}
                        variant="filled"
                        sx={{ minWidth: "10rem" }}
                    >
                        <MenuItem value="tr-TR">
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "100%",
                                    gap: "8px",
                                    fontSize: "1.3rem",
                                }}
                            >
                                <Box>Türkçe</Box>
                            </Box>
                        </MenuItem>
                        <MenuItem value="en-EN">
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "100%",
                                    gap: "8px",
                                    fontSize: "1.3rem",
                                }}
                            >
                                <Box>English</Box>
                            </Box>
                        </MenuItem>
                    </Select>
                </StyledFormControl>
            </Paper>
        </form>
    );
}

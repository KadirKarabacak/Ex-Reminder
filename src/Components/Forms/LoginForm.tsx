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
import CustomJoyride from "../CustomJoyride";
import JoyrideTitle from "../JoyrideTitle";
import i18n from "../../i18n";
import { CallBackProps } from "react-joyride";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LanguageIcon from "@mui/icons-material/Language";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockResetIcon from "@mui/icons-material/LockReset";

const StyledLogo = styled.img`
    width: 18rem;
    height: 18rem;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
    background-color: var(--color-grey-200);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    @media (max-width: 600px) {
        width: 80%;
    }

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

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-300)",
    transition: "all .3s",
};

const steps = [
    {
        target: ".login-form",
        title: (
            <JoyrideTitle
                icon={<WavingHandIcon sx={iconStyle} />}
                title={i18n.t("Welcome to the Ex-Reminder!")}
            />
        ),
        content: i18n.t(
            "The instructions will be useful for you. You can follow it and learn Ex-Reminder easily."
        ),
        placement: "top-end",
    },
    {
        target: ".register-button",
        title: (
            <JoyrideTitle
                icon={<VpnKeyIcon sx={iconStyle} />}
                title={i18n.t("Lets Register!")}
            />
        ),
        content: i18n.t(
            "To use Ex-Reminder, you can register here and log in with the e-mail and password you created."
        ),
        placement: "top-end",
    },
    {
        target: ".forgotpassword-button",
        title: (
            <JoyrideTitle
                icon={<LockResetIcon sx={iconStyle} />}
                title={i18n.t("Reset Password")}
            />
        ),
        content: i18n.t(
            "In case you forget your password, you can send a password reset email to your email using this link."
        ),
        placement: "top-end",
    },
    {
        target: ".change-language",
        title: (
            <JoyrideTitle
                icon={<LanguageIcon sx={iconStyle} />}
                title={i18n.t("Change Language")}
            />
        ),
        content: i18n.t("You can change the language from here before login"),
        placement: "top-end",
    },
];

export default function LoginForm() {
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState("en-EN");
    const [runJoyride, setRunJoyride] = useState(false);
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
            navigate("/", { replace: false });
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
        if (window.innerWidth > 1000) setFocus("email");
    }, [setFocus]);

    useEffect(() => {
        setCurrentLanguage(i18n.language || "en-EN");
        i18n.changeLanguage(i18n.language);
    }, []);

    const handleChangeLang = (e: string) => {
        i18n.changeLanguage(e);
        setCurrentLanguage(e);
    };

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, lifecycle } = data;
        if (
            lifecycle === "tooltip" ||
            lifecycle === "complete" ||
            lifecycle === "ready"
        ) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
        if (status === "finished") {
            localStorage.setItem("isLoginJoyrideDisplayed", "true");
            setRunJoyride(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("isLoginJoyrideDisplayed") !== "true") {
            localStorage.setItem("isLoginJoyrideDisplayed", "false");
            setRunJoyride(true);
        }
    }, [runJoyride]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <CustomJoyride
                steps={steps}
                pathname={runJoyride}
                callback={handleJoyrideCallback}
            />
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2rem",
                    color: "var(--color-grey-800)",
                    backgroundColor: "var(--color-grey-50-forms)",
                    p: "4rem 4rem",
                    boxShadow: "var(--shadow-md)",
                    minWidth: "45rem",
                    "@media (max-width: 1400px)": {
                        padding: "2rem 4rem",
                        gap: " 1rem",
                    },
                    "@media (max-width: 600px)": {
                        minWidth: "40rem",
                    },
                    position: "relative",
                    zIndex: "9",
                    "@media (max-width:600px)": {
                        padding: "2rem 1.5rem",
                        gap: " 1rem",
                    },
                    "@media (max-width:410px)": { minWidth: "35rem" },
                }}
            >
                <StyledLogo
                    src="../../../EX_REMINDER-blue.png"
                    alt="EX_REMINDER logo"
                />
                <Heading title={t("Login")} />
                <StyledTextField
                    disabled={isSubmitting}
                    label="Email"
                    sx={{
                        minWidth: "100%",
                        "@media (max-width: 600px)": { minWidth: "90%" },
                    }}
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
                    sx={{
                        minWidth: "100%",
                        "@media (max-width: 600px)": { minWidth: "90%" },
                    }}
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
                            backgroundColor: "var(--color-green-new)",
                            color: "var(--color-white-soft)",
                            transition: "all .3s",
                            padding: "1rem 3rem",
                            fontSize: "1.1rem",
                            border: "1px solid transparent",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "var(--color-green-lighter)",
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
                        {t("Login")}
                    </Button>
                    <StyledParagraph>{t("or")}</StyledParagraph>
                    <Button
                        className="register-button"
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
                <StyledLink
                    className="forgotpassword-button"
                    to="/forgotpassword"
                >
                    {t("Forgot your password?")}
                </StyledLink>

                {/* Change language */}
                <StyledFormControl
                    variant="standard"
                    className="change-language"
                >
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

import { Button, Paper, TextField } from "@mui/material";
import Heading from "./Heading";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPasswordQuery } from "../Api/userController";

const StyledLogo = styled.img`
    width: 10rem;
    height: 10rem;
    filter: blur(3px);
`;

const StyledTextField = styled(TextField)`
    & label {
        color: var(--color-grey-800);
    }

    & div > input {
        color: var(--color-grey-800);
    }

    & div > fieldset {
        border-color: var(--color-grey-500);
    }

    &:hover > label,
    &:hover > div > fieldset {
        color: var(--color-brand-600);
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

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        getValues,
    } = useForm();
    const navigate = useNavigate();

    async function onSubmit() {
        const { email, password } = getValues();
        if (!email || !password) return;
        const loginState = await signInWithEmailAndPasswordQuery({
            email,
            password,
        });
        if (loginState) navigate("/");
        reset();
    }

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
                    backgroundColor: "var(--color-grey-50)",
                    p: "6rem 4rem",
                    boxShadow: "var(--shadow-md)",
                }}
            >
                <StyledLogo src="../../logo-here.png" />
                <Heading title="Login to your account" />
                <StyledTextField
                    label="Email"
                    sx={{ minWidth: "100%" }}
                    variant="outlined"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email",
                        },
                    })}
                    id="email"
                    error={Boolean(errors.email)}
                    helperText={
                        (errors?.email?.message as React.ReactNode) || ""
                    }
                />
                <StyledTextField
                    label="Password"
                    sx={{ minWidth: "100%" }}
                    variant="outlined"
                    {...register("password", {
                        required: "Password is required",
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
                        sx={{
                            backgroundColor: "var(--color-grey-800)",
                            color: "var(--color-grey-50)",
                            transition: "all .3s",
                            padding: "1rem 3rem",
                            fontSize: "1.1rem",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-600)",
                                color: "var(--color-grey-100)",
                                transform: "translateY(-2px)",
                            },
                            "&:active": {
                                transform: "translateY(0)",
                            },
                        }}
                        type="submit"
                        variant="contained"
                    >
                        Login
                    </Button>
                    <StyledParagraph>or</StyledParagraph>
                    <Button
                        onClick={() => navigate("/register")}
                        sx={{
                            color: "var(--color-grey-800)",
                            transition: "all .3s",
                            padding: "1rem 3rem",
                            fontSize: "1.1rem",
                            border: "1px solid var(--color-grey-800)",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-800)",
                                color: "var(--color-grey-100)",
                                transform: "translateY(-2px)",
                                border: "1px solid var(--color-grey-800)",
                            },
                            "&:active": {
                                transform: "translateY(0)",
                            },
                        }}
                        type="submit"
                        variant="outlined"
                    >
                        Register
                    </Button>
                </StyledButtonContainer>
                <StyledLink to="/forgotpassword">
                    Forgot your password?
                </StyledLink>
            </Paper>
        </form>
    );
}

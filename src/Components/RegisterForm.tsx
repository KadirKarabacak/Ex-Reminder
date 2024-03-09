import { Button, Paper, TextField } from "@mui/material";
import Heading from "./Heading";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPasswordQuery } from "../Api/userController";

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

export default function LoginForm() {
    const { register, handleSubmit, reset, formState, getValues } = useForm();
    const { errors } = formState;
    const navigate = useNavigate();

    async function onSubmit() {
        const { email, password } = getValues();
        if (!email || !password) return;

        const createState = await createUserWithEmailAndPasswordQuery({
            email,
            password,
        });
        if (createState) navigate("/login");
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
                <Heading title="Register to get started" />
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
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                    id="password"
                    type="password"
                    error={Boolean(errors?.password)}
                    helperText={
                        (errors?.password?.message as React.ReactNode) || ""
                    }
                />
                <StyledTextField
                    label="Repeat Password"
                    sx={{ minWidth: "100%" }}
                    variant="outlined"
                    {...register("repeatPassword", {
                        required: "Password repeat is required",
                        validate: value =>
                            getValues().password === value ||
                            "Passwords do not match",
                    })}
                    id="repeatPassword"
                    type="password"
                    error={Boolean(errors?.repeatPassword)}
                    helperText={
                        (errors?.repeatPassword?.message as React.ReactNode) ||
                        ""
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
                        variant="contained"
                    >
                        Register
                    </Button>
                    <p>or</p>
                    <Button
                        onClick={() => navigate("/login")}
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
                        Back to login
                    </Button>
                </StyledButtonContainer>
            </Paper>
        </form>
    );
}

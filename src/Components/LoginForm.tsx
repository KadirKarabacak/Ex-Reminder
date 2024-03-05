import { Button, Paper, TextField, colors } from "@mui/material";
import Heading from "./Heading";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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
`;

export default function LoginForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    function onSubmit() {
        console.log("Submitted");
        // reset();
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
                <Heading title="Log in to get started" />
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
                    helperText={errors?.email?.message || ""}
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
                    error={Boolean(errors.email)}
                    helperText={errors?.password?.message || ""}
                />
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
            </Paper>
        </form>
    );
}

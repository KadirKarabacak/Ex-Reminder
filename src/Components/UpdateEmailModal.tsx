import {
    Backdrop,
    Box,
    Button,
    Fade,
    IconButton,
    InputAdornment,
    Modal,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { auth } from "../Api/firebase";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateUserEmail } from "../Api/userController";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { ModalTypes } from "../Interfaces/User";

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
    margin-top: 1rem;
    justify-content: center;
`;

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 0.7rem;
`;

const StyledTextField = styled(TextField)`
    & div + p {
        font-size: 1rem;
    }
    & label {
        color: var(--color-grey-800);
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

const StyledInput = styled(OutlinedInput)`
    margin-bottom: 1rem;
    width: 100%;
    & > input {
        color: var(--color-grey-800);
        font-size: 1.3rem;
    }

    & > input + div > button {
        color: var(--color-grey-800);
    }

    & > input + div + fieldset {
        border-color: var(--color-grey-500);
    }

    &:hover > input + div + fieldset {
        border-color: var(--color-brand-600) !important;
    }
`;

export default function UpdateEmailModal({ open, handleClose }: ModalTypes) {
    const [showPassword, setShowPassword] = React.useState(false);

    const { currentUser } = auth;
    const {
        handleSubmit,
        register,
        getValues,
        clearErrors,
        reset,
        formState: { isSubmitting, errors },
    } = useForm();

    function onSubmitEmail() {
        const { email, password } = getValues();
        if (!email.length)
            return toast.error("There is no value to update email");
        if (email.length > 0) {
            if (currentUser?.email === email)
                return toast.error("Current email is already in use");
            updateUserEmail(currentUser, email, password).then(() => {
                toast.success("Your verification mail was sent successfully");
                onCloseModal();
            });
        }
        reset({
            email: "",
            password: "",
        });
    }

    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    function onCloseModal() {
        handleClose(open);
        clearErrors();
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
                <form onSubmit={handleSubmit(onSubmitEmail)}>
                    <StyledBox>
                        <Typography
                            id="transition-modal-title"
                            variant="h2"
                            component="h1"
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            Update email
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ margin: "1.3rem 0", fontSize: "1.4rem" }}
                        >
                            For the email update, we will send a confirmation
                            email to your new email account.{" "}
                            <strong style={{ color: "var(--color-red-700)" }}>
                                Make sure you have access to the new email
                                address.
                            </strong>
                        </Typography>
                        <StyledTitle>Your Email</StyledTitle>
                        <StyledTextField
                            disabled
                            defaultValue={currentUser?.email}
                            sx={{ width: "100%", mb: "1rem" }}
                            variant="outlined"
                        />
                        <StyledTitle>New Email</StyledTitle>
                        <StyledTextField
                            disabled={isSubmitting}
                            placeholder="test@example.com"
                            sx={{ width: "100%", mb: "1rem" }}
                            variant="outlined"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email",
                                },
                            })}
                            error={Boolean(errors?.email)}
                            helperText={
                                (errors?.email?.message as React.ReactNode) ||
                                ""
                            }
                        />
                        <StyledTitle>Password</StyledTitle>
                        <StyledInput
                            {...register("password", {
                                required: "Password is required",
                            })}
                            error={Boolean(errors?.password)}
                            placeholder="Password"
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <StyledButtonContainer>
                            <Button
                                disabled={isSubmitting}
                                sx={{
                                    backgroundColor: "var(--color-grey-700)",
                                    color: "var(--color-grey-50)",
                                    transition: "all .3s",
                                    padding: "1rem 2rem",
                                    fontSize: "1.1rem",
                                    alignSelf: "flex-start",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-800)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                type="submit"
                                variant="contained"
                            >
                                Send Verification Mail
                            </Button>
                            <Button
                                disabled={isSubmitting}
                                onClick={onCloseModal}
                                sx={{
                                    color: "var(--color-grey-800)",
                                    transition: "all .3s",
                                    padding: "1rem 3rem",
                                    fontSize: "1.1rem",
                                    border: "1px solid var(--color-grey-500)",
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
                            >
                                Cancel
                            </Button>
                        </StyledButtonContainer>
                    </StyledBox>
                </form>
            </Fade>
        </Modal>
    );
}

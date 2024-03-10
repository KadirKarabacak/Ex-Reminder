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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { ModalTypes } from "../Interfaces/User";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 45%;
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

export default function UpdatePasswordModal({ open, handleClose }: ModalTypes) {
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

    function onSubmitPassword() {
        const { password, newPassword, repeatNewPassword } = getValues();
        // Password Update
        reset({
            password: "",
            newPassword: "",
            repeatPassword: "",
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
                <form onSubmit={handleSubmit(onSubmitPassword)}>
                    <StyledBox>
                        <Typography
                            id="transition-modal-title"
                            variant="h2"
                            component="h1"
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            Update Password
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ margin: "1.3rem 0", fontSize: "1.4rem" }}
                        >
                            Deneme
                        </Typography>
                        <StyledTitle>Password</StyledTitle>
                        <StyledInput
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
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
                        <StyledTitle>New Password</StyledTitle>
                        <StyledInput
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            })}
                            error={Boolean(errors?.password)}
                            placeholder="New password"
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
                        <StyledTitle>Repeat New Password</StyledTitle>
                        <StyledInput
                            {...register("repeatNewPassword", {
                                required: "Repeat new password is required",
                                validate: value =>
                                    value === getValues().newPassword ||
                                    "Passwords does not match",
                            })}
                            error={Boolean(errors?.password)}
                            placeholder="Repeat New password"
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
                                Update password
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

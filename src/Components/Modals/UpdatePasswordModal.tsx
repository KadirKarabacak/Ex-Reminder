import {
    Backdrop,
    Box,
    Button,
    Fade,
    IconButton,
    InputAdornment,
    Modal,
    OutlinedInput,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { auth } from "../../Api/firebase";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { ModalTypes } from "../../Interfaces/User";
import { useUpdateUserPassword } from "../../Api/userController";
import { useTranslation } from "react-i18next";

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
    margin-top: 2rem;
    justify-content: center;
`;

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 0.7rem;
`;

const StyledInput = styled(OutlinedInput)`
    margin-bottom: 0.2rem;
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

const StyledErrorMessage = styled.p`
    font-size: 1.3rem;
    color: var(--color-red-700);
    margin-bottom: 1rem;
`;

export default function UpdatePasswordModal({ open, handleClose }: ModalTypes) {
    const [showPassword, setShowPassword] = React.useState(false);
    const { t } = useTranslation();
    const { currentUser } = auth;
    const {
        handleSubmit,
        register,
        getValues,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm();
    const { mutateAsync: updatePassword, isPending: isUpdating } =
        useUpdateUserPassword();

    async function onSubmitPassword() {
        const { password, newPassword } = getValues();
        await updatePassword({ currentUser, password, newPassword });
        reset({
            password: "",
            newPassword: "",
            repeatNewPassword: "",
        });
        onCloseModal();
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
                <form onSubmit={handleSubmit(onSubmitPassword)}>
                    <StyledBox>
                        <Typography
                            id="transition-modal-title"
                            variant="h2"
                            component="h1"
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            {t("Update Password")}
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ margin: "1.3rem 0", fontSize: "1.4rem" }}
                        ></Typography>
                        <StyledTitle>{t("Password")}</StyledTitle>
                        <StyledInput
                            disabled={isUpdating}
                            {...register("password", {
                                required: t("Password is required"),
                                minLength: {
                                    value: 8,
                                    message: t(
                                        "Password must be at least 8 characters"
                                    ),
                                },
                            })}
                            error={Boolean(errors?.password)}
                            placeholder={t("Password")}
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
                        <StyledErrorMessage>
                            {errors?.password
                                ? (errors.password.message as React.ReactNode)
                                : ""}
                        </StyledErrorMessage>
                        <StyledTitle>{t("New Password")}</StyledTitle>
                        <StyledInput
                            disabled={isUpdating}
                            {...register("newPassword", {
                                required: t("New password is required"),
                                validate: value =>
                                    value !== getValues().password ||
                                    t(
                                        "New password cannot be the same as the old one"
                                    ),
                                minLength: {
                                    value: 8,
                                    message: t(
                                        "Password must be at least 8 characters"
                                    ),
                                },
                            })}
                            error={Boolean(errors?.password)}
                            placeholder={t("New password")}
                            id="outlined-adornment-newpassword"
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
                        <StyledErrorMessage>
                            {errors?.newPassword
                                ? (errors.newPassword
                                      .message as React.ReactNode)
                                : ""}
                        </StyledErrorMessage>
                        <StyledTitle>{t("Repeat New Password")}</StyledTitle>
                        <StyledInput
                            disabled={isUpdating}
                            {...register("repeatNewPassword", {
                                required: t("Repeat new password is required"),
                                validate: value =>
                                    value === getValues().newPassword ||
                                    t("Passwords do not match"),
                            })}
                            error={Boolean(errors?.password)}
                            placeholder="Repeat New password"
                            id="outlined-adornment-repeatpassword"
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
                        <StyledErrorMessage>
                            {errors?.repeatNewPassword
                                ? (errors.repeatNewPassword
                                      .message as React.ReactNode)
                                : ""}
                        </StyledErrorMessage>
                        <StyledButtonContainer>
                            <Button
                                disabled={isUpdating}
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
                                {t("Update password")}
                            </Button>
                            <Button
                                disabled={isUpdating}
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
                                {t("Cancel")}
                            </Button>
                        </StyledButtonContainer>
                    </StyledBox>
                </form>
            </Fade>
        </Modal>
    );
}

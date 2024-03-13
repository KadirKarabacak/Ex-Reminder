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
import { ModalTypes } from "../Interfaces/User";
import { auth } from "../Api/firebase";
import { useDeleteUserAccount } from "../Api/userController";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";

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

const StyledInput = styled(OutlinedInput)`
    margin-bottom: 0.5rem;
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

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 0.7rem;
`;

const StyledErrorMessage = styled.p`
    font-size: 1.3rem;
    color: var(--color-red-700);
    margin-bottom: 1rem;
`;

export default function DeleteUserModal({ open, handleClose }: ModalTypes) {
    const [showPassword, setShowPassword] = React.useState(false);
    const { t } = useTranslation();
    const { currentUser } = auth;
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
        clearErrors,
    } = useForm();
    const { mutate: deleteUser, isPending: isDeleting } =
        useDeleteUserAccount();

    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    function onDelete() {
        const { password } = getValues();
        deleteUser({ currentUser, password });
    }

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
                <form onSubmit={handleSubmit(onDelete)}>
                    <StyledBox>
                        <Typography
                            id="transition-modal-title"
                            variant="h2"
                            component="h1"
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            {t("Delete user")}
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ margin: "1.3rem 0", fontSize: "1.4rem" }}
                        >
                            {t("Deleted users")}{" "}
                            <strong style={{ color: "var(--color-red-700)" }}>
                                {" "}
                                {t("cannot be brought back")}
                            </strong>
                            {t(", are you sure you want to delete?")}
                        </Typography>
                        <StyledTitle>{t("Password")}</StyledTitle>
                        <StyledInput
                            disabled={isDeleting}
                            {...register("password", {
                                required: t("Password is required"),
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
                        <StyledButtonContainer>
                            <Button
                                disabled={isDeleting}
                                sx={{
                                    backgroundColor: "var(--color-red-700)",
                                    color: "white",
                                    transition: "all .3s",
                                    padding: "1rem 2rem",
                                    fontSize: "1.1rem",
                                    alignSelf: "flex-start",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor: "var(--color-red-800)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                type="submit"
                                variant="contained"
                            >
                                {t("Delete Account")}
                            </Button>
                            <Button
                                disabled={isDeleting}
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

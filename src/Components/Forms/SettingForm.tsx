import { Button, Paper, TextField } from "@mui/material";
import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { auth } from "../../Api/firebase";
import { useUpdateUser } from "../../Api/userController";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { extractFileName } from "../../Utils/utils";
import DeleteUserModal from "../Modals/DeleteUserModal";
import UpdateEmailModal from "../Modals/UpdateEmailModal";
import UpdatePasswordModal from "../Modals/UpdatePasswordModal";
import { useTranslation } from "react-i18next";

const StyledTitle = styled.h4`
    color: var(--color-grey-600);
    align-self: flex-start;
    margin-bottom: 1rem;
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
    }

    & div > fieldset {
        border-color: var(--color-grey-500);
    }

    &:hover > div > fieldset {
        border-color: var(--color-brand-600) !important;
    }
`;

const VisuallyHiddenInput = muiStyled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const StyledParagraph = styled.h1`
    font-size: 3.5rem;
    padding-bottom: 1rem;
    align-self: flex-start;
    display: block;
    color: var(--color-grey-800);
    font-weight: bold;
`;

const StyledDeleteText = styled.p`
    color: var(--color-grey-800);
    align-self: flex-start;
    text-align: left;
    margin-bottom: 2.5rem;
`;

const StyledSpan = styled.span`
    font-weight: bold;
    font-size: 1.8rem;

    color: var(--color-brand-500);
`;

const StyledFileCont = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    & svg {
        color: #e5e7eb;
    }
`;

const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
    justify-content: flex-start;
`;

export default function SettingForm() {
    const [open, setOpen] = React.useState(false);
    const [openEmailModal, setOpenEmailModal] = React.useState(false);
    const [openPasswordModal, setOpenPasswordModal] = React.useState(false);
    const { register, handleSubmit, getValues, reset } = useForm();
    const { currentUser } = auth;
    const { mutate: updateUser, isPending } = useUpdateUser();
    const initialPhotoURL = currentUser ? currentUser.photoURL : null;
    const [photoURL, setPhotoURL] = React.useState<any>(initialPhotoURL);
    const { t } = useTranslation();

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const handleOpenEmailModal = () => setOpenEmailModal(true);
    const handleCloseEmailModal = () => setOpenEmailModal(false);
    const handleOpenPasswordModal = () => setOpenPasswordModal(true);
    const handleClosePasswordModal = () => setOpenPasswordModal(false);

    const handleReset = () => {
        reset({
            displayName: "",
        });
        setPhotoURL(null);
    };

    useEffect(() => {
        const { photoURL } = getValues();
        setPhotoURL(photoURL);
    }, [getValues]);

    function onSubmit() {
        const { photoURL, displayName } = getValues();
        if (!photoURL.length && !displayName.length)
            return toast.error(t("There is no value to update user"));
        updateUser({ photoURL, displayName, currentUser });
        reset({
            displayName: "",
            password: "",
        });
        setPhotoURL(null);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: "var(--color-grey-800)",
                        backgroundColor: "transparent",
                        p: "2rem 6rem 2rem",
                        m: "4rem 4rem 0 4rem",
                        boxShadow: "var(--shadow-md)",
                    }}
                >
                    <StyledParagraph>
                        {t("Update username & avatar")}
                    </StyledParagraph>
                    <StyledTitle>{t("Display Name")}</StyledTitle>
                    <StyledTextField
                        disabled={isPending}
                        placeholder={t("Display Name")}
                        sx={{ minWidth: "100%", mb: "1rem" }}
                        variant="outlined"
                        {...register("displayName")}
                    />
                    <StyledTitle>{t("Profile photo")}</StyledTitle>
                    <StyledFileCont>
                        <Button
                            disabled={isPending}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            sx={{
                                backgroundColor: "var(--color-brand-500)",
                                color: "white",
                                transition: "all .3s",
                                padding: "1rem 2rem",
                                fontSize: "1.2rem",
                                alignSelf: "flex-start",
                                gap: "1rem",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "var(--color-brand-600)",
                                    transform: "translateY(-2px)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                                "&:disabled": {
                                    backgroundColor: "var(--color-grey-400)",
                                },
                            }}
                        >
                            <CloudUploadIcon sx={{ fontSize: "2rem" }} />
                            {t("Select file")}
                            <VisuallyHiddenInput
                                {...register("photoURL")}
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                onChange={e =>
                                    setPhotoURL(e?.target?.files?.[0] || null)
                                }
                            />
                        </Button>
                        <label htmlFor="fileInput">
                            {photoURL?.length !== 0 && photoURL !== null
                                ? extractFileName(photoURL)
                                : t("No file chosen")}
                        </label>
                    </StyledFileCont>
                    <StyledButtonContainer>
                        <Button
                            disabled={isPending}
                            sx={{
                                backgroundColor: "var(--color-grey-800)",
                                color: "var(--color-grey-50)",
                                transition: "all .3s",
                                padding: "1rem 3rem",
                                fontSize: "1.1rem",
                                alignSelf: "center",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "var(--color-grey-600)",
                                    color: "var(--color-grey-100)",
                                    transform: "translateY(-2px)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                                "&:disabled": {
                                    backgroundColor: "var(--color-grey-500)",
                                },
                            }}
                            type="submit"
                            variant="contained"
                        >
                            {t("Save changes")}
                        </Button>
                        <Button
                            onClick={handleReset}
                            sx={{
                                color: "var(--color-grey-800)",
                                transition: "all .3s",
                                padding: "1rem 3rem",
                                fontSize: "1.1rem",
                                border: "1px solid var(--color-grey-500)",
                                fontWeight: "bold",
                                backgroundColor: "var(--color-grey-100)",
                                "&:hover": {
                                    backgroundColor: "var(--color-grey-200)",
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
                </Paper>
            </form>

            {/* UPDATE EMAIL AND PASSWORD */}
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: "var(--color-grey-800)",
                    backgroundColor: "transparent",
                    p: "2rem 6rem",
                    m: "2rem 4rem 1rem",
                    boxShadow: "var(--shadow-md)",
                }}
            >
                <StyledParagraph>
                    {t("Update email & password")}
                </StyledParagraph>
                <StyledTitle>
                    {t("Update your email by sending verification mail")}
                </StyledTitle>
                <Button
                    onClick={handleOpenEmailModal}
                    sx={{
                        backgroundColor: "var(--color-grey-800)",
                        color: "var(--color-grey-50)",
                        transition: "all .3s",
                        padding: "1.1rem 2.5rem",
                        fontSize: "1.1rem",
                        alignSelf: "flex-start",
                        fontWeight: "bold",
                        mb: "1rem",
                        "&:hover": {
                            backgroundColor: "var(--color-grey-600)",
                            color: "var(--color-grey-100)",
                            transform: "translateY(-2px)",
                        },
                        "&:active": {
                            transform: "translateY(0)",
                        },
                        "&:disabled": {
                            backgroundColor: "var(--color-grey-500)",
                        },
                    }}
                    variant="contained"
                >
                    {t("Update Email")}
                </Button>

                <StyledTitle>
                    {t("Update your password by verifying your information")}
                </StyledTitle>
                <Button
                    onClick={handleOpenPasswordModal}
                    sx={{
                        backgroundColor: "var(--color-grey-800)",
                        color: "var(--color-grey-50)",
                        transition: "all .3s",
                        padding: "1.1rem 2rem",
                        fontSize: "1.1rem",
                        alignSelf: "flex-start",
                        fontWeight: "bold",
                        mb: "1rem",
                        "&:hover": {
                            backgroundColor: "var(--color-grey-600)",
                            color: "var(--color-grey-100)",
                            transform: "translateY(-2px)",
                        },
                        "&:active": {
                            transform: "translateY(0)",
                        },
                        "&:disabled": {
                            backgroundColor: "var(--color-grey-500)",
                        },
                    }}
                    variant="contained"
                >
                    {t("Update password")}
                </Button>
            </Paper>

            {/* DELETE USER */}
            {currentUser?.displayName && (
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: "var(--color-grey-800)",
                        backgroundColor: "transparent",
                        p: "2rem 6rem 4rem",
                        m: "1rem 4rem 4rem",
                        boxShadow: "var(--shadow-md)",
                    }}
                >
                    <StyledParagraph>{t("Delete account")}</StyledParagraph>
                    <StyledDeleteText>
                        {t("Are you sure you want to delete this user named")}{" "}
                        &nbsp;
                        <StyledSpan>
                            {currentUser?.displayName}&nbsp;
                        </StyledSpan>
                        ?
                    </StyledDeleteText>
                    <Button
                        sx={{
                            backgroundColor: "var(--color-red-700)",
                            color: "white",
                            transition: "all .3s",
                            padding: "1rem 3rem",
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
                        variant="contained"
                        onClick={handleOpenModal}
                    >
                        {t("Delete Account")}
                    </Button>
                </Paper>
            )}
            <UpdateEmailModal
                handleClose={handleCloseEmailModal}
                open={openEmailModal}
            />
            <UpdatePasswordModal
                handleClose={handleClosePasswordModal}
                open={openPasswordModal}
            />
            <DeleteUserModal handleClose={handleCloseModal} open={open} />
        </>
    );
}

import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EditEmployeeModalTypes } from "../../../Interfaces/User";
import { auth } from "../../../Api/firebase";
import { useDeleteNotification } from "../../../Api/notificationController";
import {
    createTurkishEventNames,
    formatDateAndTime,
} from "../../../Utils/utils";

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

    @media (max-width: 1000px) {
        width: 80%;
    }
    @media (max-width: 650px) {
        width: 95%;
        padding: 3rem 2rem;
    }
    @media (max-width: 450px) {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 0;
        gap: 0.3rem;
    }
`;
const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 3rem;
    justify-content: center;
`;

export default function DeleteNotificationModal({
    open,
    handleClose,
    id,
    row,
}: EditEmployeeModalTypes) {
    const { t, i18n } = useTranslation();
    const { handleSubmit } = useForm();
    const { currentUser } = auth;
    const currentLanguage = i18n.language;
    const userId = currentUser?.uid;
    const { mutateAsync: deleteNotification, isPending: isDeleting } =
        useDeleteNotification();

    async function onSubmit() {
        await deleteNotification({ userId, id });
        onCloseModal();
    }

    function onCloseModal() {
        handleClose(open);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <StyledBox>
                        <Typography
                            id="transition-modal-title"
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: "bold",
                                letterSpacing: "0.80px",
                                mb: "3rem",
                            }}
                        >
                            {t(`Delete Notification`)}{" "}
                        </Typography>
                        {currentLanguage === "en-EN" ? (
                            <Typography
                                id="transition-modal-description"
                                sx={{ margin: "1.3rem 0", fontSize: "1.4rem" }}
                            >
                                {t("Are you sure you want to delete")}{" "}
                                <span
                                    style={{
                                        color: row.event.includes("Add")
                                            ? "#2e7d32"
                                            : row.event.includes("Update")
                                            ? "#ed6c02"
                                            : "#d32f2f",
                                        fontWeight: "bold",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    {t(row.event)}
                                </span>{" "}
                                {t("notification which created at")}{" "}
                                <span
                                    style={{
                                        color: row.event.includes("Add")
                                            ? "#2e7d32"
                                            : row.event.includes("Update")
                                            ? "#ed6c02"
                                            : "#d32f2f",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {formatDateAndTime(
                                        row.createdAt.seconds * 1000
                                    )}
                                </span>
                            </Typography>
                        ) : (
                            <Typography
                                id="transition-modal-description"
                                sx={{ margin: "1.3rem 0", fontSize: "1.4rem" }}
                            >
                                <span
                                    style={{
                                        color: row.event.includes("Add")
                                            ? "#2e7d32"
                                            : row.event.includes("Update")
                                            ? "#ed6c02"
                                            : "#d32f2f",
                                        fontWeight: "bold",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    {createTurkishEventNames(row.event)}
                                </span>{" "}
                                işlemine sahip{" "}
                                <span
                                    style={{
                                        color: row.event.includes("Add")
                                            ? "#2e7d32"
                                            : row.event.includes("Update")
                                            ? "#ed6c02"
                                            : "#d32f2f",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {formatDateAndTime(
                                        row.createdAt.seconds * 1000
                                    )}
                                </span>{" "}
                                tarihinde oluşturulmuş bildirimi silmek
                                istediğinize emin misiniz?
                            </Typography>
                        )}
                        <StyledButtonContainer>
                            <Button
                                disabled={isDeleting}
                                sx={{
                                    backgroundColor: "var(--color-red-700)",
                                    color: "white",
                                    transition: "all .3s",
                                    padding:
                                        currentLanguage === "en-EN"
                                            ? "1rem 2rem"
                                            : "1rem 3rem",
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
                                    "&.Mui-disabled": {
                                        background: "var(--color-grey-400)",
                                    },
                                }}
                                type="submit"
                                variant="contained"
                            >
                                {t("Delete")}
                            </Button>
                            <Button
                                disabled={isDeleting}
                                onClick={onCloseModal}
                                sx={{
                                    color: "var(--color-grey-800)",
                                    transition: "all .3s",
                                    padding:
                                        currentLanguage === "en-EN"
                                            ? "1rem 2rem"
                                            : "1rem 3rem",
                                    fontSize: "1.1rem",
                                    border: "1px solid var(--color-grey-500)",
                                    backgroundColor: "var(--color-grey-100)",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-200)",
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

import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EditEmployeeModalTypes } from "../../Interfaces/User";
import { auth } from "../../Api/firebase";
import { useDeleteItem } from "../../Api/warehouseController";

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
    margin-top: 3rem;
    justify-content: center;
`;

const StyledSpan = styled.span`
    color: var(--color-red-700);
    margin-left: 6px;
    font-size: 1.7rem;
    font-weight: bold;
`;

export default function DeleteItemModal({
    open,
    handleClose,
    id,
    row,
}: EditEmployeeModalTypes) {
    const { t } = useTranslation();
    const { handleSubmit } = useForm();
    const { isPending: isDeleting, mutateAsync: deleteItem } = useDeleteItem();
    const { currentUser } = auth;
    const userId = currentUser?.uid;

    async function onSubmit() {
        await deleteItem({ id, userId });
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
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            {t(`Delete Item`)}
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ margin: "1.3rem 0", fontSize: "1.4rem" }}
                        >
                            {t("Deleted items")}{" "}
                            <strong>{t("cannot be brought back")}</strong>
                            {t(", are you sure you want to delete")}
                            <StyledSpan>{row.itemName}</StyledSpan>
                        </Typography>

                        <StyledButtonContainer>
                            <Button
                                disabled={isDeleting}
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
                                    padding: "1rem 3rem",
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

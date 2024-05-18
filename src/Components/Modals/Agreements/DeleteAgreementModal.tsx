import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { auth } from "../../../Api/firebase";
import { useDeleteAgreement } from "../../../Api/agreementController";
import { Agreements, Companies } from "../../../Interfaces/User";
import { remainingTime } from "../../../Utils/utils";

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
        width: 98%;
    }
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

interface DeleteAgreementTypes {
    agreement: Agreements;
    open: boolean;
    handleClose: () => void;
    currentCompany: Companies;
}

export default function DeleteAgreementModal({
    agreement,
    open,
    handleClose,
    currentCompany,
}: DeleteAgreementTypes) {
    const { t, i18n } = useTranslation();
    const { handleSubmit } = useForm();
    const { mutateAsync: deleteAgreement, isPending: isDeleting } =
        useDeleteAgreement();
    const { currentUser } = auth;
    const currentLanguage = i18n.language;
    const userId = currentUser?.uid;
    const companyId = currentCompany.id;
    const { agreementId } = agreement;
    const remainingAgreementTime = remainingTime(agreement.agreementEndDate);

    async function onSubmit() {
        await deleteAgreement({ agreementId, userId, companyId, agreement });
        onCloseModal();
    }

    function onCloseModal() {
        handleClose();
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
                            {t(`Delete Agreement`)}{" "}
                            <StyledSpan
                                style={{
                                    fontSize: "3rem",
                                    borderLeft:
                                        "2px solid var(--color-grey-500)",
                                    paddingLeft: "8px",
                                }}
                            >
                                {agreement.agreementContent}
                            </StyledSpan>
                        </Typography>
                        {currentLanguage === "en-EN" && (
                            <Typography
                                id="transition-modal-description"
                                sx={{ margin: "3rem 0", fontSize: "1.4rem" }}
                            >
                                {remainingAgreementTime !==
                                "Agreement is expired"
                                    ? t(
                                          `This agreement's end date is ${
                                              agreement.agreementEndDate
                                          }. Agreement still has ${remainingTime(
                                              agreement.agreementEndDate
                                          )} time to expire. Deleting this agreement can lead to wrong situations in your company. `
                                      )
                                    : null}
                                {t("Are you sure you want to delete")}
                                <StyledSpan>
                                    {agreement.agreementContent}
                                </StyledSpan>{" "}
                                ?
                            </Typography>
                        )}
                        {currentLanguage === "tr-TR" && (
                            <Typography
                                id="transition-modal-description"
                                sx={{ margin: "3rem 0", fontSize: "1.4rem" }}
                            >
                                {remainingAgreementTime !==
                                "Anlaşma süresi doldu"
                                    ? `Bu anlaşmanın bitiş tarihi ${
                                          agreement.agreementEndDate
                                      }. Anlaşmanın bitmesine hala ${remainingTime(
                                          agreement.agreementEndDate
                                      )} var. Bu anlaşmanın silinmesi şirketinizde yanlış durumlara yol açabilir. ${
                                          agreement.agreementContent
                                      } içerikli anlaşmayı silmek istediğinize emin misiniz?`
                                    : t("Are you sure you want to delete")}
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

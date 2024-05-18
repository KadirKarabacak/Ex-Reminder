import {
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    MenuItem,
    Modal,
    Select,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EditEmployeeModalTypes } from "../../../Interfaces/User";
import { useDeleteSales } from "../../../Api/saleController";
import { auth } from "../../../Api/firebase";
import { useGetAccounting } from "../../../Api/accountingController";
import i18n from "../../../i18n";
import { useState } from "react";

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
    font-size: 1.5rem;
    font-weight: bold;
`;

const StyledSelect = styled(Select)`
    && {
        font-size: 1.3rem;
        color: var(--color-grey-800);

        & > fieldset {
            border-color: var(--color-grey-500);
        }

        &:hover > fieldset {
            border-color: var(--color-brand-600) !important;
        }

        &:disabled {
            background-color: transparent !important;
            cursor: not-allowed;
        }
    }
`;

const StyledMenuItem = styled(MenuItem)`
    border-bottom: 1px solid #efefef !important;
    background-color: transparent !important;
`;

export default function DeleteSaleModal({
    open,
    handleClose,
    id,
    row,
}: EditEmployeeModalTypes) {
    const { t } = useTranslation();
    const currentLanguage = i18n.language;
    const [deleteOption, setDeleteOption] = useState<any>(
        currentLanguage === "en-EN"
            ? "Delete from Accounting"
            : "Muhasebeden Sil"
    );
    const { handleSubmit } = useForm();
    const { isPending: isDeleting, mutateAsync: deleteSales } =
        useDeleteSales();
    const { currentUser } = auth;
    const userId = currentUser?.uid;
    const companyId = row.saleCompanyId;
    const { data: accountings } = useGetAccounting();
    const saleToDelete = accountings?.find(sale => sale.saleId === row.saleId);
    const saleToDeleteId = saleToDelete?.id;

    async function onSubmit() {
        await deleteSales({
            id,
            userId,
            companyId,
            saleToDeleteId,
            deleteOption,
            row,
        });
        onCloseModal();
    }

    function onCloseModal() {
        handleClose(open);
    }

    const deleteOptions =
        currentLanguage === "en-EN"
            ? [t("Delete from Accounting"), t("Keep in Accounting")]
            : [t("Muhasebeden Sil"), t("Muhasebede Tut")];

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
                            {t(`Delete Sale`)}
                        </Typography>
                        {currentLanguage === "en-EN" && (
                            <Typography
                                id="transition-modal-description"
                                sx={{ margin: "1.3rem 0", fontSize: "1.4rem" }}
                            >
                                Deleted sales cannot be brought back, are you
                                sure you want to delete
                                <StyledSpan>
                                    {row.saleCreatedAt}
                                </StyledSpan>{" "}
                                dated sale to
                                <StyledSpan>
                                    {row.saleCompanyName} ?
                                </StyledSpan>{" "}
                                The delete operation will also delete the sales
                                record from the accounting table by default. If
                                you do not want it to be deleted, you can use
                                the following options.
                            </Typography>
                        )}
                        {currentLanguage === "tr-TR" && (
                            <Typography
                                id="transition-modal-description"
                                sx={{ margin: "1.3rem 0", fontSize: "1.4rem" }}
                            >
                                Silinen satış bilgileri geri getirilemez ve
                                muhasebe kayıtlarınızdan da silinir.
                                <StyledSpan>
                                    {row.saleCreatedAt}
                                </StyledSpan>{" "}
                                tarihli
                                <StyledSpan>
                                    {row.saleCompanyName}
                                </StyledSpan>{" "}
                                şirketine yapılan satışı silmek istediğinize
                                emin misiniz? Silme işleminin satış kaydını
                                muhasebe tablosundan da silmesini istemiyorsanız
                                aşağıdaki seçenekleri kullanabilirsiniz.
                            </Typography>
                        )}
                        <FormControl sx={{ width: "50%" }}>
                            <StyledSelect
                                required
                                displayEmpty
                                labelId="selectedItemLabel"
                                id="selectedItem"
                                onChange={e => {
                                    setDeleteOption(e.target.value);
                                }}
                                value={deleteOption}
                            >
                                <StyledMenuItem
                                    sx={{
                                        backgroundColor:
                                            "transparent!important",
                                    }}
                                    disabled
                                    disableRipple
                                    value=""
                                >
                                    {t("Select Option")}
                                </StyledMenuItem>
                                {deleteOptions.map((option, i) => (
                                    <StyledMenuItem
                                        sx={{
                                            backgroundColor:
                                                "transparent!important",
                                        }}
                                        disableRipple
                                        key={i}
                                        value={option}
                                    >
                                        {option}
                                    </StyledMenuItem>
                                ))}
                            </StyledSelect>
                        </FormControl>

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

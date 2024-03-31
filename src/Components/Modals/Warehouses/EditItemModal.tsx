import {
    Backdrop,
    Box,
    Button,
    Fade,
    Grid,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { EditItemModalTypes } from "../../../Interfaces/User";
import { useTranslation } from "react-i18next";
import React from "react";
import { useUpdateItem } from "../../../Api/warehouseController";
import {
    formatCurrency,
    formatDate,
    parseCurrency,
} from "../../../Utils/utils";
import { auth } from "../../../Api/firebase";

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
    margin-top: 2.5rem;
    justify-content: center;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
    background-color: var(--color-grey-200);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    & div + p {
        font-size: 1rem;
    }
    & label {
        color: var(--color-grey-400);
        font-size: 1.3rem;
    }

    & div > input {
        color: var(--color-grey-700);
        font-size: 1.3rem;

        &:disabled {
            background-color: var(--color-grey-300);
        }
    }

    & div > input:focus .MuiInputLabel-filled {
        color: var(--color-brand-500);
    }

    & div > fieldset {
        border-color: var(--color-grey-500);
    }
    &:hover > div > fieldset {
        border-color: var(--color-brand-600) !important;
    }
`;

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 0.9rem;
`;

const StyledSpan = styled.span`
    color: var(--color-green-lighter);
    border-left: 2px solid var(--color-grey-500);
    padding-left: 8px;
`;

export default function EditItemModal({
    open,
    handleClose,
    id,
    row,
}: EditItemModalTypes) {
    const { t, i18n } = useTranslation();
    const {
        handleSubmit,
        register,
        getValues,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm();
    const { currentUser } = auth;
    const currentLanguage = i18n.language;
    const userId = currentUser?.uid;
    const { isPending: isUpdating, mutateAsync: updateItem } = useUpdateItem();

    async function onSubmit() {
        const {
            itemName,
            itemAmount,
            itemDescription,
            itemSalePrice,
            itemPurchasePrice,
        } = getValues();
        let formattedSale;
        let formattedPurchase;
        if (itemSalePrice) formattedSale = formatCurrency(itemSalePrice);
        if (itemPurchasePrice)
            formattedPurchase = formatCurrency(itemPurchasePrice);

        const item = {
            itemName,
            itemAmount: +itemAmount,
            itemSalePrice: itemSalePrice ? formattedSale : "",
            itemPurchasePrice: itemPurchasePrice ? formattedPurchase : "",
            itemDescription,
            editedAt: formatDate(new Date()),
        };
        await updateItem({ id, item, userId });
        onCloseModal();
    }

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <StyledBox>
                        <Typography
                            id="transition-modal-title"
                            variant="h3"
                            component="h1"
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            {t("Edit Item")}{" "}
                            <StyledSpan> {row?.itemName}</StyledSpan>
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: "1rem" }}>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Item Name*")}</StyledTitle>
                                <StyledTextField
                                    variant="filled"
                                    disabled={isUpdating}
                                    label={t("Item Name")}
                                    defaultValue={row?.itemName}
                                    {...register("itemName", {
                                        required: t("Item Name is required"),
                                    })}
                                    error={Boolean(errors?.itemName)}
                                    helperText={
                                        (errors?.itemName
                                            ?.message as React.ReactNode) || ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Item Amount*")}</StyledTitle>
                                <StyledTextField
                                    variant="filled"
                                    disabled={isUpdating}
                                    defaultValue={row?.itemAmount || ""}
                                    label={t("Item Amount")}
                                    {...register("itemAmount", {
                                        required: t("Item Amount is required"),
                                    })}
                                    type="number"
                                    error={Boolean(errors?.itemAmount)}
                                    helperText={
                                        (errors?.itemAmount
                                            ?.message as React.ReactNode) || ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>
                                    {t("Item Sale Price")}
                                </StyledTitle>
                                <StyledTextField
                                    variant="filled"
                                    defaultValue={
                                        row?.itemSalePrice
                                            ? parseCurrency(row?.itemSalePrice)
                                            : ""
                                    }
                                    disabled={isUpdating}
                                    label={t("Item Sale Price")}
                                    {...register("itemSalePrice")}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>
                                    {t("Item Purchase Price")}
                                </StyledTitle>
                                <StyledTextField
                                    variant="filled"
                                    disabled={isUpdating}
                                    defaultValue={
                                        row?.itemPurchasePrice
                                            ? parseCurrency(
                                                  row?.itemPurchasePrice
                                              )
                                            : ""
                                    }
                                    label={t("Item Purchase Price")}
                                    {...register("itemPurchasePrice")}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTitle>
                                    {t("Item Description")}
                                </StyledTitle>
                                <StyledTextField
                                    variant="filled"
                                    disabled={isUpdating}
                                    defaultValue={row?.itemDescription}
                                    label={t("Item Description")}
                                    {...register("itemDescription")}
                                />
                            </Grid>
                        </Grid>
                        <StyledButtonContainer>
                            <Button
                                sx={{
                                    backgroundColor: "var(--color-grey-800)",
                                    color: "var(--color-grey-50)",
                                    transition: "all .3s",
                                    padding:
                                        currentLanguage === "en-EN"
                                            ? "1rem 3rem"
                                            : "1rem 2rem",
                                    fontSize: "1.1rem",
                                    alignSelf: "flex-start",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-700)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                type="submit"
                                variant="contained"
                                disabled={isUpdating}
                            >
                                {t("Edit")}
                            </Button>
                            <Button
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
                                disabled={isUpdating}
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

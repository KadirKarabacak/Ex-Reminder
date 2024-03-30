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
import { ModalTypes } from "../../Interfaces/User";
import { useTranslation } from "react-i18next";

import React from "react";
import { useAddItem, useGetWarehouse } from "../../Api/warehouseController";
import { formatCurrency, formatDate } from "../../Utils/utils";
import toast from "react-hot-toast";

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

    & div + p {
        font-size: 1rem;
    }
    & label {
        color: var(--color-grey-400);
        font-size: 1.2rem;
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

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 0.9rem;
`;

export default function AddItemModal({ open, handleClose }: ModalTypes) {
    const { t } = useTranslation();
    const {
        handleSubmit,
        register,
        getValues,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm();
    const { isPending: isAdding, mutate: addItem } = useAddItem();
    const { data: items } = useGetWarehouse();

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

        const isItemExist = items?.find(
            item =>
                item.itemName.toLowerCase().replaceAll(" ", "") ===
                itemName.toLowerCase().replaceAll(" ", "")
        );

        if (isItemExist) return toast.error("Item already exists in storage");
        const newItem = {
            itemName: itemName.slice(0, 1).toUpperCase() + itemName.slice(1),
            itemAmount: +itemAmount || 1,
            itemSalePrice: itemSalePrice ? formattedSale : "",
            itemPurchasePrice: itemPurchasePrice ? formattedPurchase : "",
            itemDescription,
            createdAt: formatDate(new Date()),
        };
        addItem(newItem);
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
                            variant="h2"
                            component="h1"
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            {t("Add New Item")}
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: "1rem" }}>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Item Name*")}</StyledTitle>
                                <StyledTextField
                                    disabled={isAdding}
                                    placeholder={t("Item Name")}
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
                                    disabled={isAdding}
                                    placeholder={t("Item Amount")}
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
                                    disabled={isAdding}
                                    placeholder={t("Item Sale Price")}
                                    {...register("itemSalePrice")}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>
                                    {t("Item Purchase Price")}
                                </StyledTitle>
                                <StyledTextField
                                    disabled={isAdding}
                                    placeholder={t("Item Purchase Price")}
                                    {...register("itemPurchasePrice")}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTitle>
                                    {t("Item Description")}
                                </StyledTitle>
                                <StyledTextField
                                    disabled={isAdding}
                                    placeholder={t("Item Description")}
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
                                    padding: "1rem 2rem",
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
                                disabled={isAdding}
                            >
                                {t("Add Item")}
                            </Button>
                            <Button
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
                                disabled={isAdding}
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

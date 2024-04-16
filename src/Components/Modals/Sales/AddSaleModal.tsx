import {
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    Grid,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useGetWarehouse } from "../../../Api/warehouseController";
import { useGetCompanies } from "../../../Api/companyController";
import { useAddSale } from "../../../Api/saleController";
import { calcGuaranteeExpireDate, formatDate } from "../../../Utils/utils";
import i18n from "../../../i18n";

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

        & > .Mui-disabled {
            background: var(--color-grey-200);
            color: var(--color-grey-600);
            -webkit-text-fill-color: var(--color-grey-500);
            cursor: not-allowed;
        }
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

const StyledMenuItem = styled(MenuItem)`
    border-bottom: 1px solid #efefef !important;
    background-color: transparent !important;
`;

export default function AddSaleModal({
    open,
    handleClose,
    row,
    tableName,
}: {
    open: boolean;
    handleClose: () => void;
    tableName?: string;
    row?: any;
}) {
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedGuarantee, setSelectedGuarantee] = useState(0);
    const [selectedGuaranteeTime, setSelectedGuaranteeTime] = useState("");
    const [saleDescription, setSaleDescription] = useState("");
    const [findPrice, setFindPrice] = useState<any>();
    const { t } = useTranslation();
    const currentLanguage = i18n.language;
    const {
        handleSubmit,
        register,
        getValues,
        clearErrors,
        reset,
        formState: { errors },
        watch,
    } = useForm();
    const { isPending: isAdding, mutateAsync: addSale } = useAddSale();
    const { data: companies } = useGetCompanies();
    const { data: items } = useGetWarehouse();
    const findItem = items?.find(item => item.id === selectedItem);
    const id = findItem?.id;
    const findCompany = companies?.find(
        company => company.id === selectedCompany
    );

    const itemGuarantees = [
        { label: t("Yes"), value: 1 },
        { label: t("No"), value: 0 },
    ];
    const itemGuaranteeTimes = [
        { label: t("1 Year"), value: 1 },
        { label: t("2 Year"), value: 2 },
    ];

    const guaranteeExpire =
        selectedGuarantee === 1 &&
        calcGuaranteeExpireDate(new Date(), +selectedGuaranteeTime);

    const watchAmount = watch("itemAmount");

    async function onSubmit() {
        const { itemAmount } = getValues();

        const sale = {
            saleItemId: selectedItem,
            saleItemName: findItem?.itemName,
            saleItemAmount: itemAmount,
            saleItemPrice: findPrice || "",
            saleCompanyId: selectedCompany || row.id,
            saleCompanyName: findCompany?.companyName,
            saleGuarantee: selectedGuarantee ? true : false,
            saleGuaranteeTime: selectedGuaranteeTime,
            saleGuaranteeEndTime: formatDate(guaranteeExpire),
            saleDescription: saleDescription,
            totalSalePrice: findPrice * itemAmount,
            saleCreatedAt: formatDate(new Date()),
        };

        const item = {
            ...findItem,
            itemAmount:
                findItem?.itemAmount && findItem?.itemAmount - itemAmount,
        };

        await addSale({ sale, selectedCompany, item, id });
        onCloseModal();
    }

    function onCloseModal() {
        handleClose();
        clearErrors();
        reset();
        setSelectedItem("");
        tableName !== "company" && setSelectedCompany("");
        setSelectedGuarantee(0);
        setSelectedGuaranteeTime("");
    }

    const updateSaleDescription = () => {
        const newSaleDescription =
            currentLanguage === "en-EN"
                ? `${t("Sell Item")} ${findItem?.itemName || ""} x${
                      watchAmount || ""
                  } ${t("to")} ${findCompany?.companyName || ""} ${t(
                      "at"
                  )} ${formatDate(new Date())}`
                : `${findItem?.itemName || ""} isimli üründen ${
                      watchAmount || ""
                  } adet ${
                      findCompany?.companyName || ""
                  } şirketine ${formatDate(
                      new Date()
                  )} tarihinde satış yapılmıştır.`;
        setSaleDescription(newSaleDescription);
    };

    useEffect(() => {
        tableName === "company" && setSelectedCompany(row.id);
        if (findItem) setFindPrice(findItem.itemSalePrice);
    }, [row?.id, findItem]);

    useEffect(() => {
        if (selectedGuarantee === 0) setSelectedGuaranteeTime("");
    }, [selectedGuarantee]);

    useEffect(() => {
        updateSaleDescription();
    }, [findItem, watchAmount, findCompany]);

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
                            {tableName === "company" && (
                                <>
                                    {" "}
                                    {t("Sell to")}{" "}
                                    <StyledSpan>{row.companyName}</StyledSpan>
                                </>
                            )}
                            {!tableName && t("Make Sale")}
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: "1rem" }}>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Select Item*")}</StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    <StyledSelect
                                        required
                                        disabled={isAdding}
                                        displayEmpty
                                        labelId="selectedItemLabel"
                                        id="selectedItem"
                                        value={selectedItem}
                                        onChange={e =>
                                            setSelectedItem(
                                                e.target.value as string
                                            )
                                        }
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
                                            {t("Select Item")}
                                        </StyledMenuItem>
                                        {items &&
                                            items.map((item, i) => (
                                                <StyledMenuItem
                                                    disabled={
                                                        item.itemAmount === 0
                                                    }
                                                    sx={{
                                                        backgroundColor:
                                                            "transparent!important",
                                                    }}
                                                    disableRipple
                                                    key={i}
                                                    value={item.id}
                                                >
                                                    {`${item.itemName} x${
                                                        item.itemAmount || 0
                                                    }`}
                                                </StyledMenuItem>
                                            ))}
                                    </StyledSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>
                                    {t("Select Company*")}
                                </StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    <StyledSelect
                                        required
                                        displayEmpty
                                        disabled={
                                            isAdding || tableName === "company"
                                        }
                                        labelId="selectedCompanyLabel"
                                        id="selectedCompany"
                                        value={selectedCompany}
                                        onChange={e =>
                                            setSelectedCompany(
                                                e.target.value as string
                                            )
                                        }
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
                                            {t("Select Company")}
                                        </StyledMenuItem>
                                        {companies &&
                                            companies.map((company, i) => (
                                                <StyledMenuItem
                                                    disableRipple
                                                    key={i}
                                                    value={company.id}
                                                >
                                                    {company.companyName}
                                                </StyledMenuItem>
                                            ))}
                                    </StyledSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Item Amount*")}</StyledTitle>
                                <StyledTextField
                                    disabled={isAdding}
                                    placeholder={t("Item Amount")}
                                    {...register("itemAmount", {
                                        required: t("Item Amount is required"),
                                        min: {
                                            value: 1,
                                            message: t(
                                                "Item amount must be minimum 1"
                                            ),
                                        },
                                        validate: value => {
                                            return (
                                                (findItem?.itemAmount &&
                                                    value <=
                                                        findItem?.itemAmount) ||
                                                t(
                                                    "Item Amount must be less or equal to the amount"
                                                )
                                            );
                                        },
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
                                    {t("Item Sale Price*")}
                                </StyledTitle>
                                <StyledTextField
                                    disabled
                                    placeholder={t("Item Sale Price")}
                                    {...register("itemSalePrice")}
                                    value={findPrice || 0}
                                    type="number"
                                    error={Boolean(errors?.itemSalePrice)}
                                    helperText={
                                        (errors?.itemSalePrice
                                            ?.message as React.ReactNode) || ""
                                    }
                                />
                            </Grid>

                            {/*  */}
                            <Grid item xs={6}>
                                <StyledTitle>{t("Item Guarantee")}</StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    <StyledSelect
                                        disabled={isAdding}
                                        labelId="selectedGuaranteeLabel"
                                        id="selectedGuarantee"
                                        value={selectedGuarantee}
                                        onChange={e =>
                                            setSelectedGuarantee(
                                                e.target.value as number
                                            )
                                        }
                                    >
                                        {itemGuarantees.map((guarantee, i) => (
                                            <MenuItem
                                                sx={{
                                                    borderBottom:
                                                        "1px solid #efefef",
                                                }}
                                                disableRipple
                                                key={i}
                                                value={guarantee.value}
                                            >
                                                {guarantee.label}
                                            </MenuItem>
                                        ))}
                                    </StyledSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>
                                    {t("Item Guarantee Time")}
                                </StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    <StyledSelect
                                        displayEmpty
                                        required
                                        disabled={
                                            isAdding || selectedGuarantee === 0
                                        }
                                        labelId="selectedGuaranteeTimeLabel"
                                        id="selectedGuaranteeTime"
                                        value={selectedGuaranteeTime}
                                        onChange={e =>
                                            setSelectedGuaranteeTime(
                                                e.target.value as string
                                            )
                                        }
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
                                            {t("Select Guarantee Time")}
                                        </StyledMenuItem>
                                        {itemGuaranteeTimes.map((time, i) => (
                                            <MenuItem
                                                sx={{
                                                    borderBottom:
                                                        "1px solid #efefef",
                                                }}
                                                disableRipple
                                                key={i}
                                                value={time.value}
                                            >
                                                {time.label}
                                            </MenuItem>
                                        ))}
                                    </StyledSelect>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <StyledTitle>
                                    {t("Sale Description")}
                                </StyledTitle>
                                <StyledTextField
                                    disabled={isAdding}
                                    placeholder={t("Sale Description")}
                                    value={saleDescription}
                                    onChange={e =>
                                        setSaleDescription(e.target.value)
                                    }
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
                                    "&.Mui-disabled": {
                                        background: "var(--color-grey-400)",
                                    },
                                }}
                                type="submit"
                                variant="contained"
                                disabled={isAdding}
                            >
                                {t("Make Sale")}
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
                                    "&.Mui-disabled": {
                                        background: "var(--color-grey-400)",
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

import {
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useGetWarehouse } from "../../Api/warehouseController";
import { useAddSale, useGetCompanies } from "../../Api/companyController";
import { formatCurrency, formatDate } from "../../Utils/utils";
import { styled as muiStyled } from "@mui/system";
import { useNavigate } from "react-router-dom";

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

const StyledSelect = muiStyled(Select)`
    && {
        font-size: 1.3rem;
        color: white;

        
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

const itemGuarantees = ["Yes", "No"];
const itemGuaranteeTimes = ["1 Year", "2 Year"];

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
    const [selectedGuarantee, setSelectedGuarantee] = useState("No");
    const [selectedGuaranteeTime, setSelectedGuaranteeTime] = useState("");
    const { t } = useTranslation();
    const { handleSubmit, register, getValues, clearErrors, reset } = useForm();
    const { isPending: isAdding, mutateAsync: addSale } = useAddSale();
    const { data: companies } = useGetCompanies();
    const { data: items } = useGetWarehouse();
    const navigate = useNavigate();

    async function onSubmit() {
        const { itemAmount, itemSalePrice, saleDescription } = getValues();

        const sale = {
            saleItemId: selectedItem,
            saleItemAmount: itemAmount,
            saleItemPrice: itemSalePrice ? formatCurrency(itemSalePrice) : "",
            saleCompanyId: selectedCompany || row.id,
            saleGuarantee: selectedGuarantee,
            saleGuaranteeTime: selectedGuaranteeTime,
            saleDescription,
            saleCreatedAt: formatDate(new Date()),
        };
        await addSale({ sale, selectedCompany });
        navigate(`/companies/${selectedCompany || row.id}`);
        onCloseModal();
    }

    function onCloseModal() {
        handleClose();
        clearErrors();
        reset();
        setSelectedItem("");
        tableName !== "company" && setSelectedCompany("");
        setSelectedGuarantee("No");
        setSelectedGuaranteeTime("");
    }

    useEffect(() => {
        if (tableName === "company") setSelectedCompany(row.id);
        if (selectedGuarantee === "No") setSelectedGuaranteeTime("");
    }, [selectedGuarantee]);

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
                                <StyledTitle>{t("Select Item")}</StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    <InputLabel
                                        sx={{
                                            color: "var(--color-grey-800)",
                                            fontSize: "1.3rem",
                                        }}
                                        id="selectedItemLabel"
                                    >
                                        {"Select Item"}
                                    </InputLabel>
                                    <StyledSelect
                                        required
                                        disabled={isAdding}
                                        labelId="selectedItemLabel"
                                        id="selectedItem"
                                        value={selectedItem}
                                        onChange={e =>
                                            setSelectedItem(
                                                e.target.value as string
                                            )
                                        }
                                    >
                                        {items &&
                                            items.map((item, i) => (
                                                <MenuItem
                                                    sx={{
                                                        borderBottom:
                                                            "1px solid #efefef",
                                                    }}
                                                    disableRipple
                                                    key={i}
                                                    value={item.id}
                                                >
                                                    {item.itemName}
                                                </MenuItem>
                                            ))}
                                    </StyledSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Select Company")}</StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    {tableName !== "company" && (
                                        <InputLabel
                                            sx={{
                                                color: "var(--color-grey-800)",
                                                fontSize: "1.3rem",
                                            }}
                                            id="selectedCompanyLabel"
                                        >
                                            {"Select Company"}
                                        </InputLabel>
                                    )}

                                    <StyledSelect
                                        required
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
                                        {companies &&
                                            companies.map((company, i) => (
                                                <MenuItem
                                                    sx={{
                                                        borderBottom:
                                                            "1px solid #efefef",
                                                    }}
                                                    disableRipple
                                                    key={i}
                                                    value={company.id}
                                                >
                                                    {company.companyName}
                                                </MenuItem>
                                            ))}
                                    </StyledSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Item Amount")}</StyledTitle>
                                <StyledTextField
                                    disabled={isAdding}
                                    label={t("Item Amount")}
                                    {...register("itemAmount")}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>
                                    {t("Item Sale Price")}
                                </StyledTitle>
                                <StyledTextField
                                    label={t("Item Sale Price")}
                                    {...register("itemSalePrice")}
                                    type="number"
                                />
                            </Grid>

                            {/*  */}
                            <Grid item xs={6}>
                                <StyledTitle>{t("Item Guarantee")}</StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    {/* <InputLabel
                                        sx={{
                                            color: "var(--color-grey-800)",
                                            fontSize: "1.3rem",
                                        }}
                                        id="selectedGuaranteeLabel"
                                    >
                                        {"Select Guarantee"}
                                    </InputLabel> */}
                                    <StyledSelect
                                        disabled={isAdding}
                                        labelId="selectedGuaranteeLabel"
                                        id="selectedGuarantee"
                                        value={selectedGuarantee}
                                        onChange={e =>
                                            setSelectedGuarantee(
                                                e.target.value as string
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
                                                value={guarantee}
                                            >
                                                {guarantee}
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
                                    <InputLabel
                                        sx={{
                                            color: "var(--color-grey-500)",
                                            fontSize: "1.3rem",
                                        }}
                                        id="selectedGuaranteeTimeLabel"
                                    >
                                        {"Select Guarantee Time"}
                                    </InputLabel>
                                    <StyledSelect
                                        required
                                        disabled={
                                            isAdding ||
                                            selectedGuarantee !== "Yes"
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
                                        {itemGuaranteeTimes.map((time, i) => (
                                            <MenuItem
                                                sx={{
                                                    borderBottom:
                                                        "1px solid #efefef",
                                                }}
                                                disableRipple
                                                key={i}
                                                value={time}
                                            >
                                                {time}
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
                                    defaultValue={`Sell Item (Item Name)x (Item Amount) to "(Company)" at ${formatDate(
                                        new Date()
                                    )}`}
                                    {...register("saleDescription")}
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

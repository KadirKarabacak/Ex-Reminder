import { Button, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AddItemModal from "../Modals/Warehouses/AddItemModal";
import SearchInput from "../SearchInput";
import ExportButton from "../ExportButton";
import { Warehouses } from "../../Interfaces/User";
import { formatCurrency } from "../../Utils/utils";

export function WarehouseToolBar({
    searchText,
    setSearchText,
    data,
}: {
    searchText: any;
    setSearchText: any;
    data: any;
}) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ExcelData = data.map((value: Warehouses) => {
        return {
            itemName: value?.itemName || t("-"),
            itemAmount: value?.itemAmount || t("-"),
            itemSalePrice: formatCurrency(value?.itemSalePrice) || t("-"),
            itemPurchasePrice:
                formatCurrency(value?.itemPurchasePrice) || t("-"),
            itemDescription: value?.itemDescription || t("-"),
        };
    });

    const PdfBody = data.map((value: Warehouses) => {
        return [
            value?.itemName || t("-"),
            value?.itemAmount || t("-"),
            formatCurrency(value?.itemSalePrice) || t("-"),
            formatCurrency(value?.itemPurchasePrice) || t("-"),
            value?.itemDescription || t("-"),
        ];
    });

    return (
        <>
            <Toolbar
                sx={{
                    pl: { sm: 3 },
                    pr: { xs: 1, sm: 2 },
                    gap: "1.5rem",
                }}
            >
                <Typography
                    sx={{
                        marginRight: "auto",
                        color: "var(--color-green-lighter)",
                        fontSize: "2.4rem",
                        fontWeight: "bold",
                        borderBottom: "3px solid var(--color-green-lighter)",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Warehouses")}
                </Typography>
                <SearchInput
                    searchText={searchText}
                    setSearchText={setSearchText}
                    label={t("Search Item by Name")}
                />
                <ExportButton
                    title={t("Warehouses")}
                    excel={{
                        headers: [
                            {
                                label: t("Item Name"),
                                key: "itemName",
                            },
                            {
                                label: t("Item Amount"),
                                key: "itemAmount",
                            },
                            {
                                label: t("Item Sale Price"),
                                key: "itemSalePrice",
                            },
                            {
                                label: t("Item Purchase Price"),
                                key: "itemPurchasePrice",
                            },
                            {
                                label: t("Description"),
                                key: "itemDescription",
                            },
                        ],
                        data: ExcelData,
                    }}
                    pdf={{
                        head: [
                            [
                                t("Item Name"),
                                t("Item Amount"),
                                t("Item Sale Price"),
                                t("Item Purchase Price"),
                                t("Description"),
                            ],
                        ],
                        body: PdfBody,
                    }}
                />
                <Button
                    onClick={handleOpen}
                    sx={{
                        backgroundColor: "var(--color-grey-800)",
                        color: "var(--color-grey-50)",
                        transition: "all .3s",
                        padding: "1rem 2rem",
                        fontSize: "1rem",
                        alignSelf: "center",
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
                    {t("Add New Item")}
                </Button>
            </Toolbar>
            <AddItemModal handleClose={handleClose} open={open} />
        </>
    );
}

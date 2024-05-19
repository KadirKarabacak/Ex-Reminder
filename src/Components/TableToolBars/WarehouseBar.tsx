import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AddItemModal from "../Modals/Warehouses/AddItemModal";
import SearchInput from "../SearchInput";
import ExportButton from "../ExportButton";
import { Warehouses } from "../../Interfaces/User";
import { formatCurrency } from "../../Utils/utils";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import ResponsiveSearchInput from "../ResponsiveSearchInput";

const StyledSmallContainer = styled.div`
    display: none;
    @media (max-width: 1000px) {
        display: block;
    }
`;

const StyledLargeContainer = styled.div`
    display: flex;
    gap: 1rem;
    @media (max-width: 1000px) {
        display: none;
    }
`;

const StyledSmallSearchContainer = styled.div`
    display: none;
    @media (max-width: 650px) {
        display: block;
    }
`;

const StyledLargeSearchContainer = styled.div`
    display: flex;
    gap: 1rem;
    @media (max-width: 650px) {
        display: none;
    }
`;

const iconStyle = {
    width: "2.5rem",
    height: "2.5rem",
    transition: "all .3s",
};

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
    const [searchParams, setSearchParams] = useSearchParams();
    // TODO:
    const [openSearchInput, setOpenSearchInput] = useState(false);

    const handleOpenSearchInput = () => {
        setOpenSearchInput(true);
        searchParams.set("search", "search-warehouse");
        setSearchParams(searchParams);
    };
    const handleCloseSearchInput = () => {
        setOpenSearchInput(false);
        setTimeout(() => {
            searchParams.delete("search");
            setSearchParams(searchParams);
        }, 400);
    };

    // TODO:
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const opensMenu = Boolean(anchorEl);
    const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

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
                <StyledLargeSearchContainer>
                    <SearchInput
                        searchText={searchText}
                        setSearchText={setSearchText}
                        label={t("Search Item by Name")}
                    />
                </StyledLargeSearchContainer>
                <StyledSmallSearchContainer>
                    <IconButton
                        className="warehouse-search-modal"
                        onClick={handleOpenSearchInput}
                        size="large"
                        aria-label="search"
                        color="inherit"
                    >
                        <SearchIcon sx={iconStyle} />
                    </IconButton>
                </StyledSmallSearchContainer>
                <StyledSmallContainer>
                    <Button
                        sx={{
                            backgroundColor: "var(--color-grey-800)",
                            color: "var(--color-grey-50)",
                            transition: "all .3s",
                            padding: "1rem 2rem",
                            fontSize: "1.1rem",
                            alignSelf: "center",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-600)",
                                color: "var(--color-grey-100)",
                            },
                            "&:disabled": {
                                backgroundColor: "var(--color-grey-500)",
                            },
                            "& > span > svg": { fill: "var(--color-grey-50)" },
                        }}
                        id="demo-customized-button"
                        aria-controls={
                            opensMenu ? "demo-customized-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClickMenuItem}
                        endIcon={<KeyboardArrowDownIcon />}
                        className="warehouse-operations-menu"
                    >
                        {t("Operations")}
                    </Button>
                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={opensMenu}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem disableRipple>
                            <ExportButton
                                isInSmallContainer={true}
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
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu} disableRipple>
                            <Button
                                className="addItem-btn"
                                onClick={handleOpen}
                                sx={{
                                    backgroundColor: "var(--color-grey-800)",
                                    color: "var(--color-grey-50)",
                                    transition: "all .3s",
                                    padding: "1rem 2rem",
                                    fontSize: "1rem",
                                    alignSelf: "center",
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-600)",
                                        color: "var(--color-grey-100)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                    "&:disabled": {
                                        backgroundColor:
                                            "var(--color-grey-500)",
                                    },
                                }}
                                variant="contained"
                            >
                                {t("Add New Item")}
                            </Button>
                        </MenuItem>
                    </Menu>
                </StyledSmallContainer>
                <StyledLargeContainer>
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
                        className="addItem-btn"
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
                </StyledLargeContainer>
            </Toolbar>
            <AddItemModal handleClose={handleClose} open={open} />
            {searchParams.has("search", "search-warehouse") && (
                <ResponsiveSearchInput
                    searchText={searchText}
                    setSearchText={setSearchText}
                    label={t("Search Item by Name")}
                    onCloseModal={handleCloseSearchInput}
                    open={openSearchInput}
                />
            )}
        </>
    );
}

import { IconButton, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SearchInput from "../SearchInput";
import { Sales } from "../../Interfaces/User";
import { formatCurrency } from "../../Utils/utils";
import ExportButton from "../ExportButton";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ResponsiveSearchInput from "../ResponsiveSearchInput";

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const StyledSpan = styled.span`
    border-left: 1px solid var(--color-grey-300);
    padding-left: 6px;
    color: var(--color-grey-800);
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

export function SalesToolBar({
    searchText,
    setSearchText,
    currentCompany,
    data,
}: {
    searchText: any;
    setSearchText: any;
    currentCompany: any;
    data: Sales[];
}) {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    // TODO:
    const [openSearchInput, setOpenSearchInput] = useState(false);

    const handleOpenSearchInput = () => {
        setOpenSearchInput(true);
        setSearchParams("search-sales");
    };
    const handleCloseSearchInput = () => {
        setOpenSearchInput(false);
        setTimeout(() => {
            setSearchParams(``);
        }, 400);
    };

    const ExcelData = data.map((value: Sales) => {
        return {
            saleCreatedAt: value?.saleCreatedAt || t("-"),
            saleItemName: value?.saleItemName || t("-"),
            saleItemAmount: value?.saleItemAmount || t("-"),
            saleItemPrice: formatCurrency(value?.saleItemPrice),
            saleDescription: value?.saleDescription || t("-"),
        };
    });

    const PdfBody = data.map((value: Sales) => {
        return [
            value?.saleCreatedAt || t("-"),
            value?.saleItemName || t("-"),
            value?.saleItemAmount || t("-"),
            formatCurrency(value?.saleItemPrice),
            value?.saleDescription || t("-"),
        ];
    });

    return (
        <>
            <StyledToolBar
                sx={{
                    pl: { sm: 3 },
                    pr: { xs: 1, sm: 2 },
                    gap: "1.5rem",
                    "@media (max-width:450px)": {
                        gap: "0.5rem",
                        pl: 1,
                    },
                }}
            >
                <Typography
                    sx={{
                        marginRight: "auto",
                        color: "var(--color-green-lighter)",
                        fontSize: "2.4rem",
                        fontWeight: "bold",
                        borderBottom: "3px solid var(--color-green-lihter)",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Sales")}{" "}
                    <StyledSpan>{currentCompany.companyName}</StyledSpan>
                </Typography>
                <StyledLargeSearchContainer>
                    <SearchInput
                        searchText={searchText}
                        setSearchText={setSearchText}
                        label={t("Search Sale by Date")}
                    />
                </StyledLargeSearchContainer>
                <StyledSmallSearchContainer>
                    <IconButton
                        onClick={handleOpenSearchInput}
                        size="large"
                        aria-label="search"
                        color="inherit"
                    >
                        <SearchIcon sx={iconStyle} />
                    </IconButton>
                </StyledSmallSearchContainer>
                <ExportButton
                    title={t("Sales") + ` ${currentCompany.companyName}`}
                    excel={{
                        headers: [
                            {
                                label: t("Sale Date"),
                                key: "saleCreatedAt",
                            },
                            {
                                label: t("Sale Item"),
                                key: "saleItemName",
                            },
                            {
                                label: t("Item Amount"),
                                key: "saleItemAmount",
                            },
                            {
                                label: t("Item Price"),
                                key: "saleItemPrice",
                            },
                            {
                                label: t("Sale Description"),
                                key: "saleDescription",
                            },
                        ],
                        data: ExcelData,
                    }}
                    pdf={{
                        head: [
                            [
                                t("Sale Date"),
                                t("Sale Item"),
                                t("Item Amount"),
                                t("Item Price"),
                                t("Sale Description"),
                            ],
                        ],
                        body: PdfBody,
                    }}
                />
            </StyledToolBar>
            {searchParams.has("search-sales") && (
                <ResponsiveSearchInput
                    searchText={searchText}
                    setSearchText={setSearchText}
                    label={t("Search Sale by Date")}
                    onCloseModal={handleCloseSearchInput}
                    open={openSearchInput}
                />
            )}
        </>
    );
}

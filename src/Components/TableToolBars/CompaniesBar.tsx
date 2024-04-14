import { Button, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import styled from "styled-components";
import AddCompanyModal from "../Modals/Companies/AddCompanyModal";
import AddSaleModal from "../Modals/Sales/AddSaleModal";
import SearchInput from "../SearchInput";
import { useSearchParams } from "react-router-dom";
import ExportButton from "../ExportButton";
import { Companies } from "../../Interfaces/User";

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

export function CompaniesToolBar({
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
    const [openMakeSale, setOpenMakeSale] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenMakeSale = () => {
        setOpenMakeSale(true);
        setSearchParams("make-sale");
    };
    const handleCloseMakeSale = () => {
        setOpenMakeSale(false);
        setTimeout(() => {
            setSearchParams("");
        }, 350);
    };
    console.log(data);

    const ExcelData = data?.map((value: Companies) => {
        return {
            companyName: value?.companyName || t("-"),
            companyAddress:
                `${value?.companyAddress.province} / ${value.companyAddress.district} / ${value.companyAddress.neighbourhood}` ||
                t("-"),
            companyPhone: value?.companyPhone || t("-"),
            companyEmail: value?.companyEmail || t("-"),
            managerName: value?.companyManager.managerName || t("-"),
        };
    });

    const PdfBody = data?.map((value: Companies) => {
        return [
            value?.companyName || t("-"),
            `${value?.companyAddress.province} / ${value.companyAddress.district} / ${value.companyAddress.neighbourhood}` ||
                t("-"),
            value?.companyPhone || t("-"),
            value?.companyEmail || t("-"),
            value?.companyManager.managerName || t("-"),
        ];
    });

    return (
        <>
            <StyledToolBar
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
                        borderBottom: "3px solid var(--color-green-new)",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Companies")}
                </Typography>
                <SearchInput
                    searchText={searchText}
                    setSearchText={setSearchText}
                    label={t("Search Company by Name")}
                />
                <ExportButton
                    title={t("Companies")}
                    excel={{
                        headers: [
                            {
                                label: t("Company Name"),
                                key: "companyName",
                            },
                            {
                                label: t("Company Address"),
                                key: "companyAddress",
                            },
                            {
                                label: t("Company Phone"),
                                key: "companyPhone",
                            },
                            {
                                label: t("Email"),
                                key: "companyEmail",
                            },
                            {
                                label: t("Manager Name"),
                                key: "managerName",
                            },
                        ],
                        data: ExcelData,
                    }}
                    pdf={{
                        head: [
                            [
                                t("Company Name"),
                                t("Company Address"),
                                t("Company Phone"),
                                t("Email"),
                                t("Manager Name"),
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
                        fontSize: "1.1rem",
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
                    {t("Add Company")}
                </Button>
                <Button
                    onClick={handleOpenMakeSale}
                    sx={{
                        backgroundColor: "var(--color-green-lighter)",
                        color: "white",
                        transition: "all .3s",
                        padding: "1rem 2rem",
                        fontSize: "1.1rem",
                        alignSelf: "center",
                        "&:hover": {
                            backgroundColor: "var(--color-green-new)",
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
                    {t("Make Sale")}
                </Button>
            </StyledToolBar>
            <AddCompanyModal handleClose={handleClose} open={open} />
            {searchParams.has("make-sale") && (
                <AddSaleModal
                    handleClose={handleCloseMakeSale}
                    open={openMakeSale}
                />
            )}
        </>
    );
}

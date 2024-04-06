import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Divider, IconButton } from "@mui/material";
import { DeleteOutline, MoreVert } from "@mui/icons-material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import EditEmployeeModal from "./Modals/Employees/EditEmployeeModal";
import DeleteEmployeeModal from "./Modals/Employees/DeleteEmployeeModal";
import { ButtonGroupTypes } from "../Interfaces/User";
import { useTranslation } from "react-i18next";
import DetailEmployeeModal from "./Modals/Employees/DetailEmployeeModal";
import EditItemModal from "./Modals/Warehouses/EditItemModal";
import DetailItemModal from "./Modals/Warehouses/DetailItemModal";
import DeleteItemModal from "./Modals/Warehouses/DeleteItemModal";
import EditCompanyModal from "./Modals/Companies/EditCompanyModal";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { useNavigate, useSearchParams } from "react-router-dom";
import DeleteCompanyModal from "./Modals/Companies/DeleteCompanyModal";
import AddSaleModal from "./Modals/Sales/AddSaleModal";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AddAgreementModal from "./Modals/Agreements/AddAgreementModal";
import DeleteSaleModal from "./Modals/Sales/DeleteSaleModal";
import AddNegotiateModal from "./Modals/Companies/AddNegotiateModal";
import MoreTimeIcon from "@mui/icons-material/MoreTime";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            fontSize: "1.2rem",
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

export default function ButtonGroup({ row, tableName }: ButtonGroupTypes) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Employees
    const [opens, setOpens] = React.useState(false);
    const [opensDelete, setOpensDelete] = React.useState(false);
    const [opensDetail, setOpensDetail] = React.useState(false);

    // Warehouses
    const [opensEditItem, setOpensEditItem] = React.useState(false);
    const [opensDetailItem, setOpensDetailItem] = React.useState(false);
    const [opensDeleteItem, setOpensDeleteItem] = React.useState(false);

    // Companies & Sales
    const [opensEditCompany, setOpensEditCompany] = React.useState(false);
    const [opensDeleteCompany, setOpensDeleteCompany] = React.useState(false);
    const [opensAddAgreement, setOpensAddAgreement] = React.useState(false);
    const [opensAddSale, setOpensAddSale] = React.useState(false);
    const [opensDeleteSale, setOpensDeleteSale] = React.useState(false);
    const [opensNegotiate, setOpensNegotiate] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //! Employees
    const handleOpenEditModal = () => {
        setOpens(true);
        handleClose();
        setSearchParams("edit-employee");
    };
    const handleOpenDeleteModal = () => {
        setOpensDelete(true);
        handleClose();
        setSearchParams("delete-employee");
    };
    const handleOpenDetailModal = () => {
        setOpensDetail(true);
        handleClose();
        setSearchParams("detail-employee");
    };
    const handleCloseEditModal = () => {
        setOpens(false);
        setTimeout(() => {
            setSearchParams("");
        }, 400);
    };
    const handleCloseDeleteModal = () => {
        setOpensDelete(false);
        setTimeout(() => {
            setSearchParams("");
        }, 400);
    };
    const handleCloseDetailModal = () => {
        setOpensDetail(false);
        setTimeout(() => {
            setSearchParams("");
        }, 400);
    };

    //! Warehouses
    const handleOpenEditItemModal = () => {
        setOpensEditItem(true);
        handleClose();
        setSearchParams("edit-item");
    };
    const handleOpenDetailItemModal = () => {
        setOpensDetailItem(true);
        handleClose();
        setSearchParams("detail-item");
    };
    const handleOpenDeleteItemModal = () => {
        setOpensDeleteItem(true);
        handleClose();
        setSearchParams("delete-item");
    };
    const handleCloseEditItemModal = () => {
        setOpensEditItem(false);
        setTimeout(() => {
            setSearchParams("");
        }, 400);
    };
    const handleCloseDetailItemModal = () => {
        setOpensDetailItem(false);
        setTimeout(() => {
            setSearchParams("");
        }, 400);
    };
    const handleCloseDeleteItemModal = () => {
        setOpensDeleteItem(false);
        setTimeout(() => {
            setSearchParams("");
        }, 400);
    };

    //! Companies & Sales
    const handleOpenEditCompanyModal = () => {
        setOpensEditCompany(true);
        handleClose();
        setSearchParams("edit-company");
    };
    const handleOpenDeleteCompanyModal = () => {
        setOpensDeleteCompany(true);
        handleClose();
        setSearchParams(`delete-company`);
    };
    const handleCloseEditCompanyModal = () => {
        setOpensEditCompany(false);
        setTimeout(() => {
            setSearchParams("");
        }, 400);
    };
    const handleCloseDeleteCompanyModal = () => {
        setOpensDeleteCompany(false);
        setTimeout(() => {
            setSearchParams("");
        }, 400);
    };
    const handleOpenAddSaleModal = () => {
        setOpensAddSale(true);
        handleClose();
        setSearchParams(`add-sale`);
    };
    const handleCloseAddSaleModal = () => {
        setOpensAddSale(false);
        setTimeout(() => {
            setSearchParams(``);
        }, 400);
    };

    const handleOperationsClick = () => {
        setSearchParams(row.id);
        navigate(`/companies/${row.id}`);
    };
    const handleOpenAddAgreementModal = () => {
        setOpensAddAgreement(true);
        handleClose();
        setSearchParams(`add-agreement`);
    };
    const handleCloseAddAgreementModal = () => {
        setOpensAddAgreement(false);
        setTimeout(() => {
            setSearchParams("");
        }, 400);
    };
    const handleOpenDeleteSaleModal = () => {
        setOpensDeleteSale(true);
        handleClose();
        setSearchParams(`delete-sale`);
    };
    const handleCloseDeleteSaleModal = () => {
        setOpensDeleteSale(false);
        setTimeout(() => {
            setSearchParams("");
        }, 400);
    };
    const handleOpenNegotiateModal = () => {
        setOpensNegotiate(true);
        handleClose();
        searchParams.set("modal", "add-negotiate");
        setSearchParams(searchParams);
    };
    const handleCloseNegotiateModal = () => {
        setOpensNegotiate(false);
        setTimeout(() => {
            searchParams.delete("modal");
            setSearchParams(searchParams);
        }, 400);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    sx={{
                        backgroundColor: "transparent!important",
                        color: "inherit!important",
                    }}
                    disabled
                    disableRipple
                >
                    {tableName === "employee" && row?.full_name}
                    {tableName === "warehouse" && row?.itemName}
                    {tableName === "company" && row?.companyName}
                    {tableName === "sales" && row?.saleCreatedAt}
                    {tableName === "accounting" &&
                        `${row?.saleCompanyName} - ${row?.saleCreatedAt}`}
                </MenuItem>
                <Divider sx={{ marginTop: "0!important" }} />

                {tableName === "employee" && (
                    <div>
                        <MenuItem onClick={handleOpenEditModal} disableRipple>
                            <EditIcon />
                            {t("Edit")}
                        </MenuItem>
                        <MenuItem onClick={handleOpenDetailModal} disableRipple>
                            <ReadMoreIcon />
                            {t("Detail")}
                        </MenuItem>
                        <MenuItem onClick={handleOpenDeleteModal} disableRipple>
                            <DeleteOutline />
                            {t("Delete")}
                        </MenuItem>
                    </div>
                )}

                {tableName === "warehouse" && (
                    <div>
                        <MenuItem
                            onClick={handleOpenEditItemModal}
                            disableRipple
                        >
                            <EditIcon />
                            {t("Edit")}
                        </MenuItem>
                        <MenuItem
                            onClick={handleOpenDetailItemModal}
                            disableRipple
                        >
                            <ReadMoreIcon />
                            {t("Detail")}
                        </MenuItem>
                        <MenuItem
                            onClick={handleOpenDeleteItemModal}
                            disableRipple
                        >
                            <DeleteOutline />
                            {t("Delete")}
                        </MenuItem>
                    </div>
                )}

                {tableName === "company" && (
                    <div>
                        <MenuItem
                            onClick={handleOpenEditCompanyModal}
                            disableRipple
                        >
                            <EditIcon />
                            {t("Edit")}
                        </MenuItem>
                        <MenuItem onClick={handleOperationsClick} disableRipple>
                            <SettingsApplicationsIcon />
                            {t("Operations")}
                        </MenuItem>
                        <MenuItem
                            onClick={handleOpenAddSaleModal}
                            disableRipple
                        >
                            <PostAddIcon />
                            {t("Make Sale")}
                        </MenuItem>
                        <MenuItem
                            onClick={handleOpenAddAgreementModal}
                            disableRipple
                        >
                            <HandshakeIcon />
                            {t("Add Agreement")}
                        </MenuItem>
                        <MenuItem
                            onClick={handleOpenNegotiateModal}
                            disableRipple
                        >
                            <MoreTimeIcon />
                            {t("Add Negotiate")}
                        </MenuItem>
                        <MenuItem
                            onClick={handleOpenDeleteCompanyModal}
                            disableRipple
                        >
                            <DeleteOutline />
                            {t("Delete")}
                        </MenuItem>
                    </div>
                )}

                {tableName === "sales" && (
                    <div>
                        <MenuItem disableRipple>
                            <EditIcon />
                            {t("Edit")}
                        </MenuItem>
                        <MenuItem
                            onClick={handleOpenDeleteSaleModal}
                            disableRipple
                        >
                            <DeleteOutline />
                            {t("Delete")}
                        </MenuItem>
                    </div>
                )}
                {tableName === "accounting" && (
                    <div>
                        <MenuItem disableRipple>
                            <EditIcon />
                            {t("Edit")}
                        </MenuItem>
                        <MenuItem disableRipple>
                            <DeleteOutline />
                            {t("Delete")}
                        </MenuItem>
                    </div>
                )}
            </StyledMenu>

            {/* Employees */}
            {searchParams.has("edit-employee") && (
                <EditEmployeeModal
                    open={opens}
                    handleClose={handleCloseEditModal}
                    id={row.id}
                    row={row}
                />
            )}
            {searchParams.has("detail-employee") && (
                <DetailEmployeeModal
                    id={row.id}
                    row={row}
                    open={opensDetail}
                    handleClose={handleCloseDetailModal}
                />
            )}
            {searchParams.has("delete-employee") && (
                <DeleteEmployeeModal
                    open={opensDelete}
                    handleClose={handleCloseDeleteModal}
                    id={row.id}
                    row={row}
                />
            )}

            {/* Warehouses */}
            {searchParams.has("edit-item") && (
                <EditItemModal
                    id={row.id}
                    row={row}
                    open={opensEditItem}
                    handleClose={handleCloseEditItemModal}
                />
            )}
            {searchParams.has("detail-item") && (
                <DetailItemModal
                    id={row.id}
                    row={row}
                    open={opensDetailItem}
                    handleClose={handleCloseDetailItemModal}
                />
            )}
            {searchParams.has("delete-item") && (
                <DeleteItemModal
                    id={row.id}
                    row={row}
                    open={opensDeleteItem}
                    handleClose={handleCloseDeleteItemModal}
                />
            )}

            {/* Companies */}
            {searchParams.has("edit-company") && (
                <EditCompanyModal
                    open={opensEditCompany}
                    handleClose={handleCloseEditCompanyModal}
                    id={row.id}
                    row={row}
                />
            )}
            {searchParams.has("delete-company") && (
                <DeleteCompanyModal
                    open={opensDeleteCompany}
                    handleClose={handleCloseDeleteCompanyModal}
                    id={row.id}
                    row={row}
                />
            )}
            {searchParams.has("add-sale") && (
                <AddSaleModal
                    open={opensAddSale}
                    handleClose={handleCloseAddSaleModal}
                    row={row}
                    tableName={tableName}
                />
            )}
            {searchParams.has("add-agreement") && (
                <AddAgreementModal
                    open={opensAddAgreement}
                    handleClose={handleCloseAddAgreementModal}
                    currentCompany={row}
                />
            )}
            {searchParams.has("delete-sale") && (
                <DeleteSaleModal
                    id={row.id}
                    row={row}
                    open={opensDeleteSale}
                    handleClose={handleCloseDeleteSaleModal}
                />
            )}
            {searchParams.has("modal") && (
                <AddNegotiateModal
                    id={row.id}
                    row={row}
                    open={opensNegotiate}
                    handleClose={handleCloseNegotiateModal}
                />
            )}
        </div>
    );
}

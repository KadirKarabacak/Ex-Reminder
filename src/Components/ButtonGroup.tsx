import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Divider, IconButton } from "@mui/material";
import { DeleteOutline, MoreVert } from "@mui/icons-material";
import EditEmployeeModal from "./Modals/EditEmployeeModal";
import DeleteEmployeeModal from "./Modals/DeleteEmployeeModal";
import { ButtonGroupTypes } from "../Interfaces/User";
import { useTranslation } from "react-i18next";
import DetailEmployeeModal from "./Modals/DetailEmployeeModal";
import EditItemModal from "./Modals/EditItemModal";
import DetailItemModal from "./Modals/DetailItemModal";
import DeleteItemModal from "./Modals/DeleteItemModal";

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
            fontWeight: "bold",
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
    const [opens, setOpens] = React.useState(false);
    const [opensDelete, setOpensDelete] = React.useState(false);
    const [opensDetail, setOpensDetail] = React.useState(false);
    const [opensEditItem, setOpensEditItem] = React.useState(false);
    const [opensDetailItem, setOpensDetailItem] = React.useState(false);
    const [opensDeleteItem, setOpensDeleteItem] = React.useState(false);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenEditModal = () => {
        setOpens(true);
        handleClose();
    };
    const handleOpenDeleteModal = () => {
        setOpensDelete(true);
        handleClose();
    };
    const handleOpenDetailModal = () => {
        setOpensDetail(true);
        handleClose();
    };
    const handleOpenEditItemModal = () => {
        setOpensEditItem(true);
        handleClose();
    };
    const handleOpenDetailItemModal = () => {
        setOpensDetailItem(true);
        handleClose();
    };
    const handleOpenDeleteItemModal = () => {
        setOpensDeleteItem(true);
        handleClose();
    };
    const handleCloseEditModal = () => setOpens(false);
    const handleCloseDeleteModal = () => setOpensDelete(false);
    const handleCloseDetailModal = () => setOpensDetail(false);
    const handleCloseEditItemModal = () => setOpensEditItem(false);
    const handleCloseDetailItemModal = () => setOpensDetailItem(false);
    const handleCloseDeleteItemModal = () => setOpensDeleteItem(false);

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
                </MenuItem>
                <Divider sx={{ marginTop: "0!important" }} />

                {tableName === "employee" && (
                    <>
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
                    </>
                )}
                {tableName === "warehouse" && (
                    <>
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
                    </>
                )}
                {tableName === "company" && <></>}
            </StyledMenu>

            {/* Employees */}
            {opens && (
                <EditEmployeeModal
                    open={opens}
                    handleClose={handleCloseEditModal}
                    id={row.id}
                    row={row}
                />
            )}
            {opensDetail && (
                <DetailEmployeeModal
                    id={row.id}
                    row={row}
                    open={opensDetail}
                    handleClose={handleCloseDetailModal}
                />
            )}
            {opensDelete && (
                <DeleteEmployeeModal
                    open={opensDelete}
                    handleClose={handleCloseDeleteModal}
                    id={row.id}
                    row={row}
                />
            )}

            {/* Warehouses */}
            {opensEditItem && (
                <EditItemModal
                    id={row.id}
                    row={row}
                    open={opensEditItem}
                    handleClose={handleCloseEditItemModal}
                />
            )}
            {opensDetailItem && (
                <DetailItemModal
                    id={row.id}
                    row={row}
                    open={opensDetailItem}
                    handleClose={handleCloseDetailItemModal}
                />
            )}
            {opensDeleteItem && (
                <DeleteItemModal
                    id={row.id}
                    row={row}
                    open={opensDeleteItem}
                    handleClose={handleCloseDeleteItemModal}
                />
            )}

            {/* Companies */}
        </div>
    );
}

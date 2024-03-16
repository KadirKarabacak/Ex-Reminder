import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { DeleteOutline, MoreVert } from "@mui/icons-material";
import EditEmployeeModal from "./Modals/EditEmployeeModal";
import DeleteEmployeeModal from "./Modals/DeleteEmployeeModal";
import { ButtonGroupTypes } from "../Interfaces/User";
import { useTranslation } from "react-i18next";

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

export default function ButtonGroup({ id, row }: ButtonGroupTypes) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [opens, setOpens] = React.useState(false);
    const [opensDelete, setOpensDelete] = React.useState(false);
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
    const handleCloseEditModal = () => setOpens(false);
    const handleOpenDeleteModal = () => {
        setOpensDelete(true);
        handleClose();
    };
    const handleCloseDeleteModal = () => setOpensDelete(false);

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
                <MenuItem disabled disableRipple>
                    {row.full_name}
                </MenuItem>
                <MenuItem onClick={handleOpenEditModal} disableRipple>
                    <EditIcon />
                    {t("Edit")}
                </MenuItem>
                <MenuItem onClick={handleOpenDeleteModal} disableRipple>
                    <DeleteOutline />
                    {t("Delete")}
                </MenuItem>
            </StyledMenu>
            {opens && (
                <EditEmployeeModal
                    open={opens}
                    handleClose={handleCloseEditModal}
                    id={id}
                    row={row}
                />
            )}
            {opensDelete && (
                <DeleteEmployeeModal
                    open={opensDelete}
                    handleClose={handleCloseDeleteModal}
                    id={id}
                    row={row}
                />
            )}
        </div>
    );
}

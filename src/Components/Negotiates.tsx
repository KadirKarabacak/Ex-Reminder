import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import { MoreVert, DeleteOutline } from "@mui/icons-material";
import { Menu, MenuItem, MenuProps } from "@mui/material";
import { alpha, styled as styledMui } from "@mui/material/styles";
import { useGetNegotiates } from "../Api/companyController";
import { auth } from "../Api/firebase";
import { InfinitySpin } from "react-loader-spinner";

const StyledMenu = styledMui((props: MenuProps) => (
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

const StyledHeader = styled.h2`
    color: var(--color-green-lighter);
    font-size: 2.4rem;
    border-bottom: 3px solid var(--color-green-lighter);
    align-self: flex-start;
    margin-left: 2rem;
    margin-bottom: 1rem;
`;

const StyledListItemText = styled(ListItemText)`
    & > span {
        font-size: 1.3rem;
    }
`;

export default function Negotiates() {
    const [checked, setChecked] = React.useState([0]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { currentUser } = auth;
    const userId = currentUser?.uid;
    const open = Boolean(anchorEl);
    const { data, isLoading } = useGetNegotiates(userId);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    return (
        <List
            sx={{
                width: "50%",
                bgcolor: "var(--color-grey-100)",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                flexDirection: "column",
                borderRadius: "5px",
            }}
        >
            <StyledHeader>Past Negotiates</StyledHeader>
            {isLoading ? (
                <InfinitySpin color="var(--color-grey-800)" />
            ) : (
                data?.map(neg => {
                    const labelId = `checkbox-list-label-${neg.negotiateId}`;

                    return (
                        <ListItem
                            key={neg.negotiateId}
                            secondaryAction={
                                <IconButton
                                    onClick={handleClick}
                                    edge="end"
                                    aria-label="comments"
                                >
                                    <MoreVert />
                                </IconButton>
                            }
                            disablePadding
                        >
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
                                        backgroundColor:
                                            "transparent!important",
                                        color: "inherit!important",
                                    }}
                                    disabled
                                    disableRipple
                                >
                                    {neg.companyName}
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        backgroundColor:
                                            "transparent!important",
                                        color: "inherit!important",
                                    }}
                                    disableRipple
                                >
                                    <DeleteOutline /> Delete
                                </MenuItem>
                            </StyledMenu>
                            <ListItemButton
                                role={undefined}
                                onClick={handleToggle(neg.negotiateId)}
                                dense
                            >
                                <ListItemIcon sx={{ minWidth: "max-content" }}>
                                    <Checkbox
                                        edge="start"
                                        checked={
                                            checked.indexOf(neg.negotiateId) !==
                                            -1
                                        }
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            "aria-labelledby": labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <StyledListItemText
                                    id={labelId}
                                    primary={`${neg.negotiateContent}`}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })
            )}
        </List>
    );
}

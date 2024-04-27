import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Tooltip, Grow } from "@mui/material";
import { useTranslation } from "react-i18next";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { WarehouseOutlined } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MapIcon from "@mui/icons-material/Map";

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    border-right: 1px solid var(--color-grey-100);
    padding: 2rem 0;
    text-align: center;
    grid-row: 1 / -1;
    display: flex;
    flex-direction: column;
    z-index: 1001;
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: var(--color-grey-500);
    font-size: 2rem;
    padding: 1rem 0;
    transition: all 0.3s;
    border-left: 3px solid transparent;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 2rem;

    &:not(:last-child) {
        margin-bottom: 1rem;
    }

    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        transform: translateY(-3px);
        color: var(--color-grey-900);
        background-color: var(--color-grey-50);
        border-left: 3px solid var(--color-grey-800);
        border-top-right-radius: var(--border-radius-tiny);
        border-bottom-right-radius: var(--border-radius-tiny);
        box-shadow: var(--shadow-sm);
    }
`;

const StyledImg = styled.img`
    width: 15rem;
    height: 15rem;
    align-self: center;
    margin-bottom: 3rem;
    object-fit: cover;
    /* filter: blur(4px); */
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-500)",
};

function Sidebar() {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    return (
        <StyledSidebar
            style={{
                boxShadow: pathname === "/" ? "var(--shadow-md)" : "none",
            }}
        >
            <StyledImg
                src="../../EX_REMINDER-green.png"
                alt="Ex_REMINDER logo"
            />
            <Tooltip
                TransitionComponent={Grow}
                title={t("Map holds your companies location pins")}
                placement="right"
                arrow={true}
            >
                <StyledNavLink to="/">
                    <MapIcon sx={iconStyle} />
                    {window.innerWidth > 1000 && t("Map")}
                </StyledNavLink>
            </Tooltip>
            <Tooltip
                TransitionComponent={Grow}
                title={t("Accounting displays your all sales")}
                placement="right"
                arrow={true}
            >
                <StyledNavLink to="/accounting">
                    <AccountBalanceWalletIcon sx={iconStyle} />
                    {window.innerWidth > 1000 && t("Accounting")}
                </StyledNavLink>
            </Tooltip>
            <Tooltip
                TransitionComponent={Grow}
                title={t(
                    "Companies holds your companies list and operations about that companies"
                )}
                placement="right"
                arrow={true}
            >
                <StyledNavLink to="/companies">
                    <BusinessIcon sx={iconStyle} />
                    {window.innerWidth > 1000 && t("Companies")}
                </StyledNavLink>
            </Tooltip>
            <Tooltip
                TransitionComponent={Grow}
                title={t("Warehouse holds your items inventory")}
                placement="right"
                arrow={true}
            >
                <StyledNavLink to="/warehouse">
                    <WarehouseOutlined sx={iconStyle} />
                    {window.innerWidth > 1000 && t("Warehouse")}
                </StyledNavLink>
            </Tooltip>
            <Tooltip
                TransitionComponent={Grow}
                title={t("Employees holds your employee list and info")}
                placement="right"
                arrow={true}
            >
                <StyledNavLink to="/employees">
                    <GroupIcon sx={iconStyle} />
                    {window.innerWidth > 1000 && t("Employees")}
                </StyledNavLink>
            </Tooltip>
            <Tooltip
                TransitionComponent={Grow}
                title={t(
                    "Settings allow you to update your login & display settings"
                )}
                placement="right"
                arrow={true}
            >
                <StyledNavLink to="/settings">
                    <SettingsIcon sx={iconStyle} />
                    {window.innerWidth > 1000 && t("Settings")}
                </StyledNavLink>
            </Tooltip>
        </StyledSidebar>
    );
}

export default Sidebar;

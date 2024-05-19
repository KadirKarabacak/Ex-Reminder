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
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

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

    @media (max-width: 1000px) {
        margin-top: 1.5rem;
        margin-left: 5rem;
        margin-bottom: 1.5rem;
    }
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-500)",
};

const DrawerStyle = {
    backgroundColor: "var(--color-grey-0)",
    background: "var(--color-grey-0)",
    width: "26rem",
    zIndex: "30000",
    bottom: "0",
    height: "100dvh",
};

const StyledDrawerContainer = styled.span`
    display: none;
    @media (max-width: 1000px) {
        display: block;
    }
`;

const StyledSideBarContainer = styled.span`
    display: grid;
    grid-row: 1 / -1;
    @media (max-width: 1000px) {
        display: none;
    }
`;

interface DrawerTypes {
    isOpenDrawer: boolean;
    toggleDrawer: () => void;
}

function Sidebar({ isOpenDrawer, toggleDrawer }: DrawerTypes) {
    const { t } = useTranslation();
    const { pathname } = useLocation();

    return (
        <>
            <StyledDrawerContainer>
                <Drawer
                    lockBackgroundScroll
                    open={isOpenDrawer}
                    onClose={toggleDrawer}
                    direction="left"
                    style={DrawerStyle}
                >
                    <StyledImg
                        src="../../EX_REMINDER-green.png"
                        alt="Ex_REMINDER logo"
                    />
                    <StyledNavLink onClick={toggleDrawer} to="/">
                        <MapIcon sx={iconStyle} />
                        {t("Map")}
                    </StyledNavLink>
                    <StyledNavLink onClick={toggleDrawer} to="/accounting">
                        <AccountBalanceWalletIcon sx={iconStyle} />
                        {t("Accounting")}
                    </StyledNavLink>
                    <StyledNavLink onClick={toggleDrawer} to="/companies">
                        <BusinessIcon sx={iconStyle} />
                        {t("Companies")}
                    </StyledNavLink>
                    <StyledNavLink onClick={toggleDrawer} to="/warehouse">
                        <WarehouseOutlined sx={iconStyle} />
                        {t("Warehouse")}
                    </StyledNavLink>
                    <StyledNavLink onClick={toggleDrawer} to="/employees">
                        <GroupIcon sx={iconStyle} />
                        {t("Employees")}
                    </StyledNavLink>
                    <StyledNavLink onClick={toggleDrawer} to="/settings">
                        <SettingsIcon sx={iconStyle} />
                        {t("Settings")}
                    </StyledNavLink>
                </Drawer>
            </StyledDrawerContainer>
            <StyledSideBarContainer>
                <StyledSidebar
                    style={{
                        boxShadow:
                            pathname === "/" ? "var(--shadow-md)" : "none",
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
                        className="map-nav"
                    >
                        <StyledNavLink to="/">
                            <MapIcon sx={iconStyle} />
                            {t("Map")}
                        </StyledNavLink>
                    </Tooltip>
                    <Tooltip
                        TransitionComponent={Grow}
                        title={t("Accounting displays your all sales")}
                        placement="right"
                        arrow={true}
                        className="accounting-nav"
                    >
                        <StyledNavLink to="/accounting">
                            <AccountBalanceWalletIcon sx={iconStyle} />
                            {t("Accounting")}
                        </StyledNavLink>
                    </Tooltip>
                    <Tooltip
                        TransitionComponent={Grow}
                        title={t(
                            "Companies holds your companies list and operations about that companies"
                        )}
                        placement="right"
                        arrow={true}
                        className="companies-nav"
                    >
                        <StyledNavLink to="/companies">
                            <BusinessIcon sx={iconStyle} />
                            {t("Companies")}
                        </StyledNavLink>
                    </Tooltip>
                    <Tooltip
                        TransitionComponent={Grow}
                        title={t("Warehouse holds your items inventory")}
                        placement="right"
                        arrow={true}
                        className="warehouse-nav"
                    >
                        <StyledNavLink to="/warehouse">
                            <WarehouseOutlined sx={iconStyle} />
                            {t("Warehouse")}
                        </StyledNavLink>
                    </Tooltip>
                    <Tooltip
                        TransitionComponent={Grow}
                        title={t("Employees holds your employee list and info")}
                        placement="right"
                        arrow={true}
                        className="employees-nav"
                    >
                        <StyledNavLink to="/employees">
                            <GroupIcon sx={iconStyle} />
                            {t("Employees")}
                        </StyledNavLink>
                    </Tooltip>
                    <Tooltip
                        TransitionComponent={Grow}
                        title={t(
                            "Settings allow you to update your login & display settings"
                        )}
                        placement="right"
                        arrow={true}
                        className="settings-nav"
                    >
                        <StyledNavLink to="/settings">
                            <SettingsIcon sx={iconStyle} />
                            {t("Settings")}
                        </StyledNavLink>
                    </Tooltip>
                </StyledSidebar>
            </StyledSideBarContainer>

            {/* )} */}
        </>
    );
}

export default Sidebar;

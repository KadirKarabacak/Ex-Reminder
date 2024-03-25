import { NavLink } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tooltip, Zoom } from "@mui/material";
import { useTranslation } from "react-i18next";
import { WarehouseOutlined } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    border-right: 1px solid var(--color-grey-100);
    padding: 2rem 0;
    text-align: center;
    grid-row: 1 / -1;
    display: flex;
    flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: var(--color-grey-600);
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
        color: var(--color-brand-500);
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
    return (
        <StyledSidebar>
            {/* <StyledImg src="../../logo-here.png" /> */}
            <StyledImg
                src="../../EX_REMINDER-green.png"
                alt="Ex_REMINDER logo"
            />
            <Tooltip
                TransitionComponent={Zoom}
                title={t("Home")}
                placement="right"
            >
                <StyledNavLink to="/">
                    <HomeIcon sx={iconStyle} />
                    {t("Home")}
                </StyledNavLink>
            </Tooltip>
            <Tooltip
                TransitionComponent={Zoom}
                title={t("Companies")}
                placement="right"
            >
                <StyledNavLink to="/companies">
                    <BusinessIcon sx={iconStyle} />
                    {t("Companies")}
                </StyledNavLink>
            </Tooltip>
            <Tooltip
                TransitionComponent={Zoom}
                title={t("Warehouse")}
                placement="right"
            >
                <StyledNavLink to="/warehouse">
                    <WarehouseOutlined sx={iconStyle} />
                    {t("Warehouse")}
                </StyledNavLink>
            </Tooltip>
            <Tooltip
                TransitionComponent={Zoom}
                title={t("Employees")}
                placement="right"
            >
                <StyledNavLink to="/employees">
                    <GroupIcon sx={iconStyle} />
                    {t("Employees")}
                </StyledNavLink>
            </Tooltip>
            <Tooltip
                TransitionComponent={Zoom}
                title={t("Settings")}
                placement="right"
            >
                <StyledNavLink to="/settings">
                    <SettingsIcon sx={iconStyle} />
                    {t("Settings")}
                </StyledNavLink>
            </Tooltip>
        </StyledSidebar>
    );
}

export default Sidebar;

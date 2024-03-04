import { NavLink } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import InfoIcon from "@mui/icons-material/Info";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tooltip } from "@mui/material";

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
        color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-left: 3px solid var(--color-grey-800);
        border-top-right-radius: var(--border-radius-tiny);
        border-bottom-right-radius: var(--border-radius-tiny);
        box-shadow: var(--shadow-sm);
    }
`;

const StyledImg = styled.img`
    width: 10rem;
    height: 10rem;
    align-self: center;
    margin-bottom: 3rem;
    filter: blur(4px);
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-500)",
};

function Sidebar() {
    return (
        <StyledSidebar>
            <StyledImg src="../../logo-here.png" />
            <Tooltip title="Home" placement="right">
                <StyledNavLink to="/">
                    <HomeIcon sx={iconStyle} />
                    Home
                </StyledNavLink>
            </Tooltip>
            <Tooltip title="About" placement="right">
                <StyledNavLink to="/about">
                    <InfoIcon sx={iconStyle} />
                    About
                </StyledNavLink>
            </Tooltip>
            <Tooltip title="Contact" placement="right">
                <StyledNavLink to="/contact">
                    <QuestionAnswerIcon sx={iconStyle} />
                    Contact
                </StyledNavLink>
            </Tooltip>
            <Tooltip title="Users" placement="right">
                <StyledNavLink to="/users">
                    <GroupIcon sx={iconStyle} />
                    Users
                </StyledNavLink>
            </Tooltip>
            <Tooltip title="Settings" placement="right">
                <StyledNavLink to="/settings">
                    <SettingsIcon sx={iconStyle} />
                    Settings
                </StyledNavLink>
            </Tooltip>
        </StyledSidebar>
    );
}

export default Sidebar;

// import Uploader from "../data/Uploader";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.aside`
    background-color: #6789f3;
    border-right: 1px solid grey;
    padding: 4.4rem 0;
    text-align: center;

    /* Grid features */
    grid-row: 1 / -1;
    display: flex;
    flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: cornsilk;
    font-size: 2rem;
    padding: 1rem 0;
    transition: all 0.3s;
    border-left: 5px solid transparent;

    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: cornsilk;
        background-color: #2d41e3;
        border-left: 5px solid cornsilk;
    }
`;

function Sidebar() {
    return (
        <StyledSidebar>
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/about">About</StyledNavLink>
            <StyledNavLink to="/contact">Contact</StyledNavLink>
        </StyledSidebar>
    );
}

export default Sidebar;

import { Link } from "react-router-dom";

import styled from "styled-components";

const StyledNotFound = styled.main`
    width: 100%;
    height: 100dvh;
    background-color: slateblue;
    text-align: center;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: cornsilk;
    font-size: 2rem;
    margin-right: 1rem;
`;

export default function NotFound() {
    return (
        <StyledNotFound>
            NotFound
            <StyledLink to="/">Go back</StyledLink>
        </StyledNotFound>
    );
}

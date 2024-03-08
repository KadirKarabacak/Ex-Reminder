import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";

const StyledNotFound = styled.main`
    width: 100%;
    height: 100dvh;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--color-indigo-700);
    font-size: 2rem;
    margin-right: 1rem;
    background-color: var(--color-grey-100);
`;

const StyledText = styled.p`
    font-size: 2.5rem;
    font-weight: bold;
`;

export default function NotFound() {
    return (
        <StyledNotFound>
            <StyledText>
                Sorry, the page you are looking for does not exist. 😥
            </StyledText>
            <StyledLink to="/">
                <ArrowBackIcon sx={{ fontSize: "2rem" }} />
                Go back
            </StyledLink>
        </StyledNotFound>
    );
}

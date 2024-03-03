import styled from "styled-components";
// import Logout from "../features/authentication/Logout";

const StyledHeader = styled.header`
    background-color: #6789f3;
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid grey;
    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;
`;

function Header() {
    return <StyledHeader>Header</StyledHeader>;
}

export default Header;

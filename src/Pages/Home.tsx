import styled from "styled-components";

const StyledHome = styled.main`
    width: 100%;
    height: 100dvh;
    background-color: #dce3fd;
    text-align: center;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
`;

const StyledParagraph = styled.p`
    font-size: 6rem;
    color: black;
`;

export default function Home() {
    return (
        <StyledHome>
            <StyledParagraph>HOMEPAGE</StyledParagraph>
        </StyledHome>
    );
}

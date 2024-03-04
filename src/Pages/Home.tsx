import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { springOptions } from "../Constants/constant";

const StyledHome = styled.main`
    width: 100%;
    height: 100dvh;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

const StyledParagraph = styled.p`
    font-size: 6rem;
    color: var(--color-grey-800);
`;

const AnimatedStyledHome = animated(StyledHome);

export default function Home() {
    const animationProps = useSpring(springOptions);

    return (
        <AnimatedStyledHome style={animationProps}>
            <StyledParagraph>HOMEPAGE</StyledParagraph>
        </AnimatedStyledHome>
    );
}

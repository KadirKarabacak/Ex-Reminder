import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { springOptions } from "../Constants/constant";

const StyledAbout = styled.main`
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

const AnimatedStyledAbout = animated(StyledAbout);

export default function About() {
    const animationProps = useSpring(springOptions);

    return (
        <AnimatedStyledAbout style={animationProps}>
            <StyledParagraph>ABOUT</StyledParagraph>
        </AnimatedStyledAbout>
    );
}

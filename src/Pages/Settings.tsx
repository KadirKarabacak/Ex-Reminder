import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { springOptions } from "../Constants/constant";
import SettingForm from "../Components/SettingForm";

const StyledSettings = styled.main`
    width: 100%;
    height: 100dvh;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    flex-direction: column;

    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

const StyledParagraph = styled.p`
    padding: 3rem 0 3rem 3rem;
    font-size: 4rem;
    height: max-content;
    align-self: flex-start;
    display: block;
    color: var(--color-grey-800);
`;

const AnimatedStyledSettings = animated(StyledSettings);

export default function Settings() {
    const animationProps = useSpring(springOptions);

    return (
        <AnimatedStyledSettings style={animationProps}>
            <StyledParagraph>Update user settings</StyledParagraph>
            <SettingForm />
        </AnimatedStyledSettings>
    );
}

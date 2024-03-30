import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { springOptions } from "../Constants/constant";
import SettingForm from "../Components/Forms/SettingForm";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const StyledSettings = styled.main`
    width: 100%;
    min-height: 60rem;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

const AnimatedStyledSettings = animated(StyledSettings);

export default function Settings() {
    const animationProps = useSpring(springOptions);
    const { t } = useTranslation();
    return (
        <AnimatedStyledSettings style={animationProps}>
            <Helmet>
                <title>Ex Reminder | {t("Settings")}</title>
            </Helmet>
            <SettingForm />
        </AnimatedStyledSettings>
    );
}

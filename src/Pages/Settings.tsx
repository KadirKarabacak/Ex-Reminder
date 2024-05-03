import styled from "styled-components";
import { animated, easings, useSpring } from "react-spring";
import SettingForm from "../Components/Forms/SettingForm";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CallBackProps } from "react-joyride";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import JoyrideTitle from "../Components/JoyrideTitle";
import i18n from "../i18n";
import CustomJoyride from "../Components/CustomJoyride";

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

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-300)",
    transition: "all .3s",
};

const settingFormSteps = [
    {
        target: ".update-user",
        content: i18n.t(
            "Here you can update your login information such as Username, Avatar, Email, Password. And you can also delete your own account. But remember that deleted accounts cannot be restored."
        ),
        placement: "top-end",
        title: (
            <JoyrideTitle
                icon={<AccountCircleIcon sx={iconStyle} />}
                title={i18n.t("Update User & Login Credentials")}
            />
        ),
    },
];

const AnimatedStyledSettings = animated(StyledSettings);

export default function Settings() {
    const { t } = useTranslation();
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);
    const [runJoyride, setRunJoyride] = useState(false);
    const animationProps = useSpring({
        from: { opacity: 0, transform: "translateY(50px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: {
            duration: 800,
            easing: easings.easeInOutBack,
        },
        onRest: () => setIsAnimationEnd(true),
    });

    useEffect(() => {
        if (localStorage.getItem("isSettingsJoyrideDisplayed") === "true")
            return;
        else {
            localStorage.setItem("isSettingsJoyrideDisplayed", "false");
            isAnimationEnd && setRunJoyride(true);
        }
    }, [isAnimationEnd]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, lifecycle } = data;
        if (lifecycle === "tooltip") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
        if (status === "finished") {
            localStorage.setItem("isSettingsJoyrideDisplayed", "true");
            setRunJoyride(false);
        }
    };

    return (
        <AnimatedStyledSettings className="update-user" style={animationProps}>
            <CustomJoyride
                pathname={runJoyride}
                callback={handleJoyrideCallback}
                steps={settingFormSteps}
            />
            <Helmet>
                <title>Ex Reminder | {t("Settings")}</title>
            </Helmet>
            <SettingForm />
        </AnimatedStyledSettings>
    );
}

import { useEffect, useState } from "react";
import { animated, easings, useSpring } from "react-spring";
import styled from "styled-components";
import AnimatedPage from "../Components/AnimatedPage";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { OperationsHeader } from "../Components/CompanyOperations/OperationsHeader";
import OperationsBody from "../Components/CompanyOperations/OperationsBody";
import { CallBackProps } from "react-joyride";
import CustomJoyride from "../Components/CustomJoyride";

const StyledOperations = styled.main`
    width: 100%;
    min-height: 60rem;
    background-color: var(--color-grey-100);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 2rem 2rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

const operationSteps = [{}];

const AnimatedStyledOperations = animated(StyledOperations);

export default function CompanyOperations({
    currentCompany,
}: {
    currentCompany: any;
}) {
    const { t } = useTranslation();
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);
    const animationProps = useSpring({
        from: { opacity: 0, transform: "translateY(50px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: {
            duration: 800,
            easing: easings.easeInOutBack,
        },
        onRest: () => setIsAnimationEnd(true),
    });
    const [runJoyride, setRunJoyride] = useState(false);

    useEffect(() => {
        if (
            localStorage.getItem("isCompanyOperationsJoyrideDisplayed") ===
            "true"
        )
            return;
        else {
            localStorage.setItem(
                "isCompanyOperationsJoyrideDisplayed",
                "false"
            );
            isAnimationEnd && setRunJoyride(true);
        }
    }, [isAnimationEnd]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;
        if (status === "finished") {
            localStorage.setItem("isCompanyOperationsJoyrideDisplayed", "true");
            setRunJoyride(false);
        }
    };

    return (
        <AnimatedStyledOperations style={animationProps}>
            <AnimatedPage>
                <>
                    <Helmet>
                        <title>Ex Reminder | {t("Operations")}</title>
                    </Helmet>
                    <OperationsHeader currentCompany={currentCompany} />
                    <OperationsBody currentCompany={currentCompany} />
                </>
            </AnimatedPage>
            <CustomJoyride
                pathname={runJoyride}
                callback={handleJoyrideCallback}
                steps={operationSteps}
            />
        </AnimatedStyledOperations>
    );
}

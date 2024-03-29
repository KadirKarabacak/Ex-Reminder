import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { springOptions } from "../Constants/constant";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const StyledAccounting = styled.main`
    width: 100%;
    min-height: 60rem;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

// const FullPage = styled.div`
//     height: 65rem;
//     background-color: var(--color-grey-50);
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;

const AnimatedStyledAccounting = animated(StyledAccounting);

export default function Accounting() {
    const animationProps = useSpring(springOptions);
    // const [searchText, setSearchText] = useState("");

    const { t } = useTranslation();

    // if (isLoading)
    //     return (
    //         <FullPage>
    //             <InfinitySpin color="var(--color-grey-800)" />
    //         </FullPage>
    //     );

    return (
        <AnimatedStyledAccounting style={animationProps}>
            <Helmet>
                <title>Ex Reminder | {t("Accounting")}</title>
            </Helmet>
            Accounting
        </AnimatedStyledAccounting>
    );
}

import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { springOptions } from "../Constants/constant";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import CustomTable from "../Components/Table";
import { CompaniesToolBar } from "../Components/TableToolBars/CompaniesBar";
import { useGetCompanies } from "../Api/companyController";
import { InfinitySpin } from "react-loader-spinner";

const StyledAbout = styled.main`
    width: 100%;
    min-height: 60rem;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 2rem 2rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

const FullPage = styled.div`
    height: 65rem;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AnimatedStyledAbout = animated(StyledAbout);

export default function Companies() {
    const animationProps = useSpring(springOptions);
    const { t } = useTranslation();
    const { data, isLoading } = useGetCompanies();
    const company = true;

    if (isLoading)
        return (
            <FullPage>
                <InfinitySpin color="var(--color-grey-800)" />
            </FullPage>
        );

    return (
        <AnimatedStyledAbout style={animationProps}>
            <Helmet>
                <title>Ex Reminder | {t("Companies")}</title>
            </Helmet>
            <CustomTable
                CustomToolbar={<CompaniesToolBar />}
                data={data}
                company={company}
            />
        </AnimatedStyledAbout>
    );
}

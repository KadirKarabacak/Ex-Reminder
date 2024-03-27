import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { springOptions } from "../Constants/constant";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import CustomTable from "../Components/Table";
import { CompaniesToolBar } from "../Components/TableToolBars/CompaniesBar";
import { useGetCompanies } from "../Api/companyController";
import { InfinitySpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { OperationsHeader } from "../Components/CompanyOperations/OperationsHeader";
import AnimatedPage from "../Components/AnimatedPage";
import OperationsBody from "../Components/CompanyOperations/OperationsBody";
import { useState } from "react";

const StyledCompany = styled.main`
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

const AnimatedStyledCompany = animated(StyledCompany);
const AnimatedStyledOperations = animated(StyledOperations);

export default function Companies() {
    const animationProps = useSpring(springOptions);
    const { t } = useTranslation();
    const { data, isLoading } = useGetCompanies();
    const [searchText, setSearchText] = useState("");
    const params = useParams();
    const { companyId } = params;

    const currentCompany =
        companyId && data?.find(comp => comp.id === companyId);

    if (isLoading)
        return (
            <FullPage>
                <InfinitySpin color="var(--color-grey-800)" />
            </FullPage>
        );

    if (companyId)
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
            </AnimatedStyledOperations>
        );

    if (!companyId)
        return (
            <AnimatedStyledCompany style={animationProps}>
                <Helmet>
                    <title>Ex Reminder | {t("Companies")}</title>
                </Helmet>
                <AnimatedPage>
                    <CustomTable
                        CustomToolbar={
                            <CompaniesToolBar
                                searchText={searchText}
                                setSearchText={setSearchText}
                            />
                        }
                        data={data}
                        searchText={searchText}
                    />
                </AnimatedPage>
            </AnimatedStyledCompany>
        );
}

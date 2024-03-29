import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { springOptions } from "../Constants/constant";
import CustomTable from "../Components/Table";
import { EmployeeToolBar } from "../Components/TableToolBars/EmployeeBar";
import { InfinitySpin } from "react-loader-spinner";
import { useGetEmployees } from "../Api/employeeController";
import { CustomPieChart } from "../Components/CustomPieChart";
import EmployeeStats from "../Components/EmployeeStats";

import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const StyledEmployees = styled.main`
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

const FullPage = styled.div`
    height: 65rem;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InformationContainer = styled.div`
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
`;

const AnimatedStyledEmployees = animated(StyledEmployees);

export default function Employees() {
    const animationProps = useSpring(springOptions);
    const { data, isLoading } = useGetEmployees();
    const [searchText, setSearchText] = useState("");

    const { t } = useTranslation();

    if (isLoading)
        return (
            <FullPage>
                <InfinitySpin color="var(--color-grey-800)" />
            </FullPage>
        );

    return (
        <AnimatedStyledEmployees style={animationProps}>
            <Helmet>
                <title>Ex Reminder | {t("Employees")}</title>
            </Helmet>
            <CustomTable
                CustomToolbar={
                    <EmployeeToolBar
                        setSearchText={setSearchText}
                        searchText={searchText}
                    />
                }
                data={data}
                searchText={searchText}
            />
            <InformationContainer>
                <CustomPieChart data={data} />
                <EmployeeStats data={data} />
            </InformationContainer>
        </AnimatedStyledEmployees>
    );
}

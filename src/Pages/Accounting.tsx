import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { springOptions } from "../Constants/constant";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useGetAccounting } from "../Api/accountingController";
import CustomTable from "../Components/Table";
import { useState } from "react";
import { AccountingToolBar } from "../Components/TableToolBars/AccountingBar";
import { InfinitySpin } from "react-loader-spinner";
import Chart from "../Components/Chart";
import AccountingDetails from "../Components/AccountingDetails";

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

    @media (max-width: 1000px) {
        border-radius: 0;
        padding: 1rem;
    }
`;

const FullPage = styled.div`
    height: 65rem;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AnimatedStyledAccounting = animated(StyledAccounting);

export default function Accounting() {
    const { t } = useTranslation();
    const animationProps = useSpring(springOptions);
    const [searchText, setSearchText] = useState("");
    const [selected, setSelected] = useState<readonly number[]>([]);

    const { data, isLoading } = useGetAccounting();

    if (isLoading)
        return (
            <FullPage>
                <InfinitySpin color="var(--color-grey-800)" />
            </FullPage>
        );

    return (
        <AnimatedStyledAccounting style={animationProps}>
            <Helmet>
                <title>Ex Reminder | {t("Accounting")}</title>
            </Helmet>
            <CustomTable
                CustomToolbar={
                    <AccountingToolBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />
                }
                data={data}
                searchText={searchText}
                selected={selected}
                setSelected={setSelected}
            />
            {data?.length ? (
                <>
                    <Chart data={data} />
                    <AccountingDetails data={data} />
                </>
            ) : null}
        </AnimatedStyledAccounting>
    );
}

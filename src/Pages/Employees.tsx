import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { springOptions } from "../Constants/constant";
import CustomTable from "../Components/Table";
import { EmployeeToolBar } from "../Components/TableToolBars/EmployeeBar";
import { InfinitySpin } from "react-loader-spinner";
import { useGetEmployees } from "../Api/employeeController";

const StyledEmployees = styled.main`
    width: 100%;
    min-height: 60rem;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
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

const AnimatedStyledEmployees = animated(StyledEmployees);

export default function Employees() {
    const animationProps = useSpring(springOptions);
    const { data, isLoading } = useGetEmployees();
    const employee = true;

    if (isLoading)
        return (
            <FullPage>
                <InfinitySpin color="var(--color-grey-800)" />
            </FullPage>
        );

    return (
        <AnimatedStyledEmployees style={animationProps}>
            <CustomTable
                CustomToolbar={<EmployeeToolBar />}
                data={data}
                employee={employee}
            />
        </AnimatedStyledEmployees>
    );
}

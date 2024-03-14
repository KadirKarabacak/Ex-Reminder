import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { springOptions } from "../Constants/constant";
import { useGetEmployees } from "../Api/userController";
import CustomTable from "../Components/Table";
import { EmployeeToolBar } from "../Components/TableToolBars/EmployeeBar";

const StyledEmployees = styled.main`
    width: 100%;
    height: 100dvh;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

const AnimatedStyledEmployees = animated(StyledEmployees);

export default function Employees() {
    const animationProps = useSpring(springOptions);
    const { data } = useGetEmployees();
    // Columns ve rows objeler dizisi olmalı
    console.log(data);

    return (
        <AnimatedStyledEmployees style={animationProps}>
            <CustomTable CustomToolbar={<EmployeeToolBar />} />
        </AnimatedStyledEmployees>
    );
}

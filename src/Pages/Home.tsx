import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { springOptions } from "../Constants/constant";
import Chart from "../Components/Chart";
import CustomTable from "../Components/Table";
import { HomeToolBar } from "../Components/TableToolBars/HomeBar";

const StyledHome = styled.main`
    width: 100%;
    min-height: 60rem;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 1rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

const AnimatedStyledHome = animated(StyledHome);

export default function Home() {
    const animationProps = useSpring(springOptions);

    return (
        <AnimatedStyledHome style={animationProps}>
            <CustomTable CustomToolbar={<HomeToolBar />} />
            <Chart />
        </AnimatedStyledHome>
    );
}

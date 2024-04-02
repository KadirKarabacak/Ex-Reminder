import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { mapSpringOptions } from "../Constants/constant";
import Map from "../Components/Map/Map";

const StyledHome = styled.main`
    width: 100%;
    min-height: 60rem;
    height: calc(100dvh - 6.5rem);
`;

const AnimatedStyledHome = animated(StyledHome);

export default function Home() {
    const animationProps = useSpring(mapSpringOptions);

    return (
        <AnimatedStyledHome style={animationProps}>
            <Map />
        </AnimatedStyledHome>
    );
}

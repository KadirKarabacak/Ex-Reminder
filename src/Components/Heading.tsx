import styled from "styled-components";
import { HeadingProps } from "../Interfaces/User";

const StyledHeading = styled.h2`
    font-size: 3.5rem;
    color: var(--color-grey-800);
    font-weight: bold;

    @media (max-width: 500px) {
        font-size: 2.5rem;
    }
`;

export default function Heading({ title }: HeadingProps) {
    return <StyledHeading>{title}</StyledHeading>;
}

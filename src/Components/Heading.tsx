import styled from "styled-components";

const StyledHeading = styled.h2`
    font-size: 3.5rem;
    color: var(--color-grey-800);
    font-weight: bold;
`;

interface HeadingProps {
    title: string;
}

export default function Heading({ title }: HeadingProps) {
    return <StyledHeading>{title}</StyledHeading>;
}

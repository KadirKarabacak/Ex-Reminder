import styled from "styled-components";

const StyledTitle = styled.p`
    color: var(--color-green-lighter);
    font-weight: bold;
    border-bottom: 1px solid var(--color-grey-700);
    padding-bottom: 1rem;
`;

export default function JoyrideTitle({ title }: { title: string }) {
    return <StyledTitle>{title}</StyledTitle>;
}

import styled from "styled-components";

const StyledTitle = styled.p`
    color: var(--color-green-lighter);
    font-weight: bold;
    border-bottom: 1px solid var(--color-grey-700);
    padding-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;
    font-size: 2.2rem;
`;

export default function JoyrideTitle({
    title,
    icon,
}: {
    title: string;
    icon?: any;
}) {
    return (
        <StyledTitle>
            {title}
            {icon}
        </StyledTitle>
    );
}

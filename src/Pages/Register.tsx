import styled, { keyframes } from "styled-components";
import RegisterForm from "../Components/RegisterForm";
import { animationDuration } from "../Constants/constant";

export const circleInHesitate = keyframes`
  0% {
    clip-path: circle(0%);
  }
  40% {
    clip-path: circle(40%);
  }
  100% {
    clip-path: circle(125%);
  }
`;

const StyledRegister = styled.main`
    width: 100%;
    height: 100dvh;
    background-color: var(--color-grey-200);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;

    animation: ${animationDuration} cubic-bezier(0.25, 1, 0.3, 1)
        ${circleInHesitate} both;
`;

export default function Login() {
    return (
        <StyledRegister>
            <RegisterForm />
        </StyledRegister>
    );
}

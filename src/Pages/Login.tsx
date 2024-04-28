import styled, { keyframes } from "styled-components";
import LoginForm from "../Components/Forms/LoginForm";
import { animationDuration } from "../Constants/constant";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Background from "../Components/Background";

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

const StyledLogin = styled.main`
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
    const { t } = useTranslation();
    return (
        <StyledLogin>
            <Helmet>
                <title>Ex Reminder | {t("Login")}</title>
            </Helmet>
            {window.innerWidth > 1000 && <Background />}
            <LoginForm />
        </StyledLogin>
    );
}

import styled, { keyframes } from "styled-components";
import ForgotPasswordForm from "../Components/Forms/ForgotPasswordForm";
import { animationDuration } from "../Constants/constant";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

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

const StyledForgotPassword = styled.main`
    width: 100%;
    height: 100dvh;
    background-color: var(--color-grey-300);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    animation: ${animationDuration} cubic-bezier(0.25, 1, 0.3, 1)
        ${circleInHesitate} both;
`;

export default function ForgotPassword() {
    const { t } = useTranslation();
    return (
        <StyledForgotPassword>
            <Helmet>
                <title>Ex Reminder | {t("Forgot Password")}</title>
            </Helmet>
            <ForgotPasswordForm />
        </StyledForgotPassword>
    );
}

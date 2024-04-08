import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import styled, { keyframes } from "styled-components";

const shakeAnimation = keyframes`
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(4px);
    }
`;

const StyledAlarm = styled.div`
    background-color: var(--color-grey-100);
    padding: 1rem 2rem;
    border-radius: 5px;
    box-shadow: var(--shadow-md);
    width: 30%;
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    z-index: 1500;
    animation: ${shakeAnimation} 2s ease-in-out infinite;
    transition: all 0.3s;

    &:hover {
        animation: none;
    }
`;

export function Alarm({
    findNegotiateToAlert,
    handleDismissAlarm,
}: {
    findNegotiateToAlert: any;
    handleDismissAlarm: any;
}) {
    const { t } = useTranslation();

    return (
        <StyledAlarm>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <audio autoPlay>
                    <source src="alarm-sound.mp3" type="audio/mpeg" />
                    {t("Your browser does not support the audio element.")}
                </audio>
                <div
                    style={{
                        fontSize: "1.8rem",
                        color: "var(--color-green-lighter)",
                    }}
                >
                    Negotiate with {findNegotiateToAlert.companyName} in{" "}
                    {findNegotiateToAlert.negotiateAlarmWarningTime} hours!
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    {findNegotiateToAlert.negotiateContent}{" "}
                </div>
                <Button
                    sx={{
                        backgroundColor: "var(--color-grey-600)",
                        color: "var(--color-red-700)",
                        transition: "all .3s",
                        padding: "1rem 3rem",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                        ":hover": {
                            backgroundColor: "var(--color-grey-700)",
                        },
                    }}
                    variant="contained"
                    onClick={() => {
                        handleDismissAlarm(findNegotiateToAlert.negotiateId);
                    }}
                >
                    {t("Close")}{" "}
                    <CloseIcon
                        sx={{
                            fontWeight: "bold",
                            color: "var(--color-red-700)",
                        }}
                    />
                </Button>
            </div>
        </StyledAlarm>
    );
}

export default Alarm;

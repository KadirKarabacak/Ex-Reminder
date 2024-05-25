import { Button, Tooltip, Grow } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import i18n from "../i18n";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { animated, useSpring } from "react-spring";
import { alarmOptions } from "../Constants/constant";

const StyledAlarm = styled.div`
    background-color: var(--color-grey-100);
    padding: 2rem;
    border-radius: 5px;
    box-shadow: var(--shadow-lg);
    width: 30%;
    position: absolute;
    top: 2rem;
    left: 40%;
    z-index: 1000;
    transition: all 0.3s;

    &:hover {
        box-shadow: 0px 2px 25px var(--color-green-lighter);
    }

    @media (max-width: 1300px) {
        width: 40%;
        left: 35%;
    }

    @media (max-width: 900px) {
        width: 55%;
        left: 25%;
    }

    @media (max-width: 700px) {
        width: 70%;
        left: 15%;
    }

    @media (max-width: 550px) {
        width: 90%;
        left: 5%;
    }
`;

const AnimatedStyledAlarm = animated(StyledAlarm);

export function Alarm({
    findNegotiateToAlert,
    handleDismissAlarm,
}: {
    findNegotiateToAlert: any;
    handleDismissAlarm: any;
}) {
    const { t } = useTranslation();
    const currentLanguage = i18n.language;
    const animationProps = useSpring(alarmOptions);

    return (
        <AnimatedStyledAlarm style={animationProps}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >
                <audio autoPlay>
                    <source src="../../ringtone2.mp3" type="audio/mpeg" />
                    {t("Your browser does not support the audio element")}
                </audio>
                {currentLanguage === "en-EN" ? (
                    <div
                        style={{
                            fontSize: "1.8rem",
                            color: "var(--color-green-lighter)",
                        }}
                    >
                        Negotiate with {findNegotiateToAlert.companyName} in{" "}
                        {findNegotiateToAlert.negotiateAlarmWarningTime} hours!
                    </div>
                ) : (
                    <div
                        style={{
                            fontSize: "1.8rem",
                            color: "var(--color-green-lighter)",
                        }}
                    >
                        {findNegotiateToAlert.companyName} şirketi ile
                        görüşmenizin{" "}
                        {findNegotiateToAlert.negotiateAlarmWarningTime} saati
                        kaldı !
                    </div>
                )}
                <div style={{ marginBottom: "1rem" }}>
                    {findNegotiateToAlert.negotiateContent}{" "}
                </div>
                <Tooltip
                    TransitionComponent={Grow}
                    title={t("We never display again this alarm")}
                    placement="bottom"
                >
                    <Button
                        sx={{
                            backgroundColor: "var(--color-green-new)",
                            color: "var(--color-white-soft)",
                            transition: "all .3s",
                            padding: "1rem 2rem",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            cursor: "pointer",
                            alignSelf: "center",
                            ":hover": {
                                backgroundColor: "var(--color-green-lighter)",
                                transform: "translateY(-2px)",
                            },
                        }}
                        variant="contained"
                        onClick={() => {
                            handleDismissAlarm(
                                findNegotiateToAlert.negotiateId
                            );
                        }}
                    >
                        {t("Got it")}
                        <CheckBoxIcon
                            sx={{
                                color: "var(--color-white-soft)",
                            }}
                        />
                    </Button>
                </Tooltip>
            </div>
        </AnimatedStyledAlarm>
    );
}

export default Alarm;

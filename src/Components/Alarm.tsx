import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { NegotiateTypes } from "../Interfaces/User";

export function Alarm({
    findNegotiateToAlert,
    handleDismissAlarm,
}: {
    findNegotiateToAlert: any;
    handleDismissAlarm: any;
}) {
    const { t } = useTranslation();

    return (
        <>
            {findNegotiateToAlert &&
                findNegotiateToAlert.map((neg: NegotiateTypes) => (
                    <div
                        key={neg.negotiateId}
                        style={{
                            backgroundColor: "var(--color-grey-100)",
                            padding: "1rem 2rem",
                            borderRadius: "5px",
                            boxShadow: "var(--shadow-md)",
                            width: "30%",
                        }}
                    >
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <audio autoPlay>
                                <source
                                    src="alarm-sound.mp3"
                                    type="audio/mpeg"
                                />
                                {t(
                                    "Your browser does not support the audio element."
                                )}
                            </audio>
                            <div
                                style={{
                                    fontSize: "1.8rem",
                                    color: "var(--color-green-lighter)",
                                }}
                            >
                                Negotiate with {neg.companyName} in{" "}
                                {neg.negotiateAlarmWarningTime} hours!
                            </div>
                            <div style={{ marginBottom: "1rem" }}>
                                {neg.negotiateContent}{" "}
                            </div>
                            <Button
                                sx={{
                                    backgroundColor: "var(--color-red-700)",
                                    color: "white",
                                    transition: "all .3s",
                                    padding: "1rem 3rem",
                                    fontSize: "1rem",
                                    alignSelf: "center",
                                    fontWeight: "bold",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "0.5rem",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "var(--color-red-800)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                variant="contained"
                                onClick={() => {
                                    handleDismissAlarm(neg.negotiateId);
                                }}
                            >
                                {t("Close")} <CloseIcon />
                            </Button>
                        </div>
                    </div>
                ))}
        </>
    );
}

export default Alarm;

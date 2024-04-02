import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";

export default function FindLocationButton({ onClick }: { onClick: any }) {
    const { t } = useTranslation();
    return (
        <Button
            onClick={onClick}
            sx={{
                color: "var(--color-white-soft)",
                transition: "all .3s",
                padding: "1rem 2rem",
                fontSize: "1.2rem",
                border: "1px solid transparent",
                backgroundColor: "var(--color-green-lighter)",
                boxShadow: "var(--shadow-sm)",
                position: "absolute",
                display: "flex",
                gap: "0.5rem",
                bottom: "1rem",
                left: "50%",
                transform: "translateY(0) translate(-50%, -50%)",
                zIndex: "500",
                fontWeight: "bold",
                "&:hover": {
                    backgroundColor: "var(--color-green-new)",
                    transform: "translateY(-2px) translate(-50%, -50%)",
                    border: "1px solid transparent",
                    boxShadow: "var(--shadow-md)",
                },
                "&:active": {
                    transform: "translateY(0) translate(-50%, -50%)",
                    boxShadow: "var(--shadow-sm)",
                },
            }}
            variant="outlined"
        >
            {t("Find my Location")}{" "}
            <LocationOnIcon
                sx={{
                    fontSize: "1.8rem",
                    color: "var(--color-white-soft)",
                }}
            />
        </Button>
    );
}

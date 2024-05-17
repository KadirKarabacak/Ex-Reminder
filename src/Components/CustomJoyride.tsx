import { memo } from "react";
import { useTranslation } from "react-i18next";
import Joyride, { CallBackProps } from "react-joyride";
import { useLocation } from "react-router-dom";

function CustomJoyride({
    steps,
    pathname,
    callback,
}: {
    steps: any;
    pathname: boolean;
    callback?: (data: CallBackProps) => void;
}) {
    const { t } = useTranslation();
    const { pathname: location } = useLocation();
    return (
        <Joyride
            steps={steps}
            run={pathname}
            continuous
            showProgress
            disableScrolling={
                location === "/employees" || location === "/settings"
            }
            disableOverlayClose
            callback={callback}
            styles={{
                options: {
                    arrowColor: "var(--color-grey-800)",
                    backgroundColor: "var(--color-grey-800)",
                    overlayColor: "rgba(0,0,0,0.3)",
                    primaryColor: "var(--color-green-lighter)",
                    textColor: "var(--color-grey-100)",
                    zIndex: 1000000,
                },
            }}
            locale={{
                back: t("Back"),
                close: t("Close"),
                last: t("Got it"),
                next: t("Next"),
                open: t("Open the instructions"),
                skip: t("Skip"),
            }}
        />
    );
}

export default memo(CustomJoyride);

import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 35%;
    max-height: 100dvh;
    background-color: var(--color-grey-100);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 4rem 4rem 3rem;
    border-radius: 5px;
    overflow-y: scroll;
    width: 65%;

    @media (max-width: 1000px) {
        width: 80%;
    }
    @media (max-width: 650px) {
        width: 100%;
        padding: 3rem 2rem;
        border-radius: 0;
    }
    @media (max-width: 450px) {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 0;
        gap: 0.3rem;
        border-radius: 0;
    }
`;

const StyledSpan = styled.span`
    font-weight: bold;
    color: var(--color-brand-500);
    display: block;
    margin-bottom: 1rem;
    font-size: 2rem;
`;

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 65rem;
`;

const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
    margin-top: 0.5rem;
    justify-content: center;
`;

const TypographyStyle = {
    marginBottom: "2rem",
};

interface ConfidentialityModalTypes {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    setConfidentialityAgreement: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfidentialityAgreementModal({
    handleClose,
    open,
    setConfidentialityAgreement,
}: ConfidentialityModalTypes) {
    const { t } = useTranslation();

    function onCloseModal() {
        handleClose(open);
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onCloseModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <StyledBox>
                    <StyledContent>
                        <Typography
                            id="transition-modal-title"
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: "bold",
                                letterSpacing: "0.80px",
                                mb: "2rem",
                            }}
                        >
                            {t(`Privacy Policy Agreement`)}
                        </Typography>
                        <Typography
                            sx={TypographyStyle}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>{t("Privacy Policy")}</StyledSpan>
                            {t(
                                `This confidentiality agreement aims to protect the privacy of our users in relation to the services operated by “Ex Software & Development” and provided through the website or mobile application called “Ex Reminder” protection. This Agreement describes how our users' personal information is collected, used, protected and disclosed in connection with the use of the Application.`
                            )}
                        </Typography>
                        <Typography
                            sx={TypographyStyle}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>
                                {t(`Collection and Use of User Information`)}
                            </StyledSpan>
                            {t(
                                `The App may collect personal information that Users provide when registering. This information may include name, email address, phone number and other personally identifiable information. The information provided by Users may be used for purposes such as providing the services offered by the Application, managing user accounts, providing technical support and sending notifications regarding the services. Users' personal information will never be shared or sold to third parties, but where required by legal requirements or for the provision of the App services, the information may be shared with authorized institutions. can be shared.`
                            )}
                        </Typography>
                        <Typography
                            sx={TypographyStyle}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>{t("Cookies")}</StyledSpan>
                            {t(
                                `Application, To improve the User experience and deliver our services more effectively may use cookies. Users should note that their browser the use of cookies by changing the settings they can control in any way they want. However, some in cases where this may affect how some features of the App may cause it not to work properly.`
                            )}
                        </Typography>
                        <Typography
                            sx={TypographyStyle}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>{t("Security")}</StyledSpan>
                            {t(
                                `The Company shall ensure the security of User information commercially acceptable for physical, electronic and administrative procedures. However, no method of data transmission or storage Please note that it is not 100% safe.`
                            )}
                        </Typography>
                        <Typography
                            sx={TypographyStyle}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>{t(`Changes and Updates`)}</StyledSpan>
                            {t(
                                `This Privacy Agreement may be updated from time to time for reasons such as the development of the App or changes in legal requirements. When an updated version is published, Users will be notified and may provide their consent prior to the changes taking effect. will be requested.`
                            )}
                        </Typography>
                        <Typography
                            sx={{
                                paddingBottom: "3rem",
                                ...TypographyStyle,
                                display: "flex",
                                flexDirection: "column",
                            }}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>{t("Acceptance")}</StyledSpan>
                            {t(
                                `By using the App, Users agree to this Privacy Agreement. If this Agreement If you do not agree with its provisions, please use the App do not use it.`
                            )}
                            <StyledButtonContainer>
                                <Button
                                    onClick={() => {
                                        onCloseModal();
                                        setConfidentialityAgreement(true);
                                    }}
                                    sx={{
                                        color: "var(--color-white-soft)",
                                        transition: "all .3s",
                                        padding: "1.3rem 3.3rem",
                                        mt: "3rem",
                                        alignSelf: "center",
                                        fontSize: "1.2rem",
                                        border: "1px solid transparent",
                                        backgroundColor:
                                            "var(--color-green-new)",
                                        fontWeight: "bold",
                                        "&:hover": {
                                            backgroundColor:
                                                "var(--color-green-lighter)",
                                            transform: "translateY(-2px)",
                                            border: "1px solid transparent",
                                        },
                                        "&:active": {
                                            transform: "translateY(0)",
                                        },
                                        "@media (max-width: 390px)": {
                                            padding: "1rem 1.5rem",
                                        },
                                    }}
                                    variant="outlined"
                                >
                                    {t("I have read & Approve")}
                                </Button>
                                <Button
                                    onClick={onCloseModal}
                                    sx={{
                                        color: "var(--color-grey-800)",
                                        transition: "all .3s",
                                        padding: "1.3rem 3.3rem",
                                        fontSize: "1.2rem",
                                        border: "1px solid var(--color-grey-800)",
                                        fontWeight: "bold",
                                        mt: "3rem",

                                        "&:hover": {
                                            backgroundColor:
                                                "var(--color-grey-200)",
                                            transform: "translateY(-2px)",
                                            border: "1px solid var(--color-grey-800)",
                                        },
                                        "&:active": {
                                            transform: "translateY(0)",
                                        },
                                        "&.Mui-disabled": {
                                            background: "var(--color-grey-400)",
                                        },
                                        "@media (max-width: 390px)": {
                                            padding: "1rem 2rem",
                                        },
                                    }}
                                    variant="outlined"
                                >
                                    {t("Back")}
                                </Button>
                            </StyledButtonContainer>
                        </Typography>
                    </StyledContent>
                </StyledBox>
            </Fade>
        </Modal>
    );
}

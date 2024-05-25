import {
    Button,
    Grid,
    Menu,
    MenuItem,
    Paper,
    Switch,
    TextField,
    Tooltip,
} from "@mui/material";
import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { auth } from "../../Api/firebase";
import { useUpdateUser } from "../../Api/userController";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { extractFileName } from "../../Utils/utils";
import DeleteUserModal from "../Modals/Users/DeleteUserModal";
import UpdateEmailModal from "../Modals/Users/UpdateEmailModal";
import UpdatePasswordModal from "../Modals/Users/UpdatePasswordModal";
import { useTranslation } from "react-i18next";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";

const StyledTitle = styled.h4`
    color: var(--color-grey-600);
    align-self: flex-start;
    margin-bottom: 1rem;

    @media (max-width: 600px) {
        text-align: left;
        font-weight: 300;
    }
`;

const StyledTextField = styled(TextField)`
    width: 50%;
    margin-bottom: 1rem !important;
    & div + p {
        font-size: 1rem;
    }
    & label {
        color: var(--color-grey-800);
    }

    & div > input {
        color: var(--color-grey-800);
        font-size: 1.3rem;
    }

    & div > fieldset {
        border-color: var(--color-grey-500);
    }

    &:hover > div > fieldset {
        border-color: var(--color-brand-600) !important;
    }

    &.Mui-disabled {
        -webkit-text-fill-color: var(--color-grey-500);
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const VisuallyHiddenInput = muiStyled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const StyledParagraph = styled.h1`
    font-size: 3rem;
    padding-bottom: 1rem;
    align-self: flex-start;
    display: block;
    color: var(--color-grey-800);
    font-weight: bold;
    @media (max-width: 600px) {
        text-align: left;
        font-size: 2.3rem;
    }
`;

const StyledDeleteText = styled.p`
    color: var(--color-grey-800);
    align-self: flex-start;
    text-align: left;
    margin-bottom: 2.5rem;
`;

const StyledSpan = styled.span`
    font-weight: bold;
    font-size: 1.8rem;

    color: var(--color-brand-500);
`;

const StyledFileCont = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    & svg {
        color: #e5e7eb;
    }
`;

const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
    justify-content: flex-start;
`;

const StyledPaper = styled(Paper)`
    @media (max-width: 1000px) {
        padding: 3rem 4rem !important;
        border-bottom: 3px solid var(--color-grey-400);
        margin: 1rem 1rem 0 1rem !important;
    }
    @media (max-width: 680px) {
        padding: 2rem !important;
        border-bottom: 3px solid var(--color-grey-400);
        margin: 1rem 1rem 0 1rem !important;
    }
`;

interface WalkthroughTypes {
    label: string;
    key: string;
}

export default function SettingForm() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [openEmailModal, setOpenEmailModal] = React.useState(false);
    const [openPasswordModal, setOpenPasswordModal] = React.useState(false);
    const { register, handleSubmit, getValues, reset } = useForm();
    const { currentUser } = auth;
    const { mutate: updateUser, isPending } = useUpdateUser();
    const initialPhotoURL = currentUser ? currentUser.photoURL : null;
    const [photoURL, setPhotoURL] = React.useState<any>(initialPhotoURL);

    const allWalkthroughs: WalkthroughTypes[] = [
        {
            label: t("Login page"),
            key: "isLoginJoyrideDisplayed",
        },
        {
            label: t("Map page"),
            key: "isAppJoyrideDisplayed",
        },
        {
            label: t("Companies page"),
            key: "isCompaniesJoyrideDisplayed",
        },
        {
            label: t("Company Operations"),
            key: "isCompanyOperationsJoyrideDisplayed",
        },
        {
            label: t("Warehouse page"),
            key: "isWarehouseJoyrideDisplayed",
        },
        {
            label: t("Employees page"),
            key: "isEmployeesJoyrideDisplayed",
        },
        {
            label: t("Settings page"),
            key: "isSettingsJoyrideDisplayed",
        },
        {
            label: t("Notifications page"),
            key: "isNotificationsJoyrideDisplayed",
        },
    ];

    const [switchStates, setSwitchStates] = React.useState<{
        [key: string]: boolean;
    }>(
        allWalkthroughs.reduce((acc: any, walkthrough: any) => {
            const storedValue = localStorage.getItem(walkthrough.key);
            if (storedValue !== null) {
                acc[walkthrough.key] = JSON.parse(
                    localStorage.getItem(walkthrough.key) as string
                );
            }
            return acc;
        }, {})
    );
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const opensWalkthrough = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSwitchChange = (key: string) => {
        setSwitchStates(prevState => ({
            ...prevState,
            [key]: !prevState[key],
        }));
        localStorage.setItem(key, JSON.stringify(!switchStates[key]));
    };

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const handleOpenEmailModal = () => setOpenEmailModal(true);
    const handleCloseEmailModal = () => setOpenEmailModal(false);
    const handleOpenPasswordModal = () => setOpenPasswordModal(true);
    const handleClosePasswordModal = () => setOpenPasswordModal(false);

    const handleReset = () => {
        reset({
            displayName: "",
        });
        setPhotoURL(null);
    };

    useEffect(() => {
        const { photoURL } = getValues();
        setPhotoURL(photoURL);
    }, [getValues]);

    function onSubmit() {
        const { photoURL, displayName } = getValues();
        if (!photoURL.length && !displayName.length)
            return toast.error(t("There is no value to update user"));
        updateUser({ photoURL, displayName, currentUser });
        reset({
            displayName: "",
            password: "",
        });
        setPhotoURL(null);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <StyledPaper
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: "var(--color-grey-800)",
                        backgroundColor: "transparent",
                        p: "2rem 6rem 2rem",
                        m: "4rem 4rem 0 4rem",
                        boxShadow: "var(--shadow-md)",
                    }}
                >
                    <StyledParagraph>
                        {t("Update username & avatar")}
                    </StyledParagraph>
                    <StyledTitle>{t("Display Name")}</StyledTitle>
                    <StyledTextField
                        disabled={isPending}
                        placeholder={t("Display Name")}
                        variant="outlined"
                        {...register("displayName")}
                    />
                    <StyledTitle>{t("Profile photo")}</StyledTitle>
                    <StyledFileCont>
                        <Button
                            disabled={isPending}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            sx={{
                                backgroundColor: "var(--color-brand-500)",
                                color: "white",
                                transition: "all .3s",
                                padding: "1rem 2rem",
                                "@media (max-width:500px)": {
                                    padding: "1rem 1.2rem",
                                },
                                fontSize: "1.2rem",
                                alignSelf: "flex-start",
                                gap: "1rem",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "var(--color-brand-600)",
                                    transform: "translateY(-2px)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                                "&.Mui-disabled": {
                                    background: "var(--color-grey-400)",
                                },
                            }}
                        >
                            <CloudUploadIcon sx={{ fontSize: "2rem" }} />
                            {t("Select file")}
                            <VisuallyHiddenInput
                                {...register("photoURL")}
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                onChange={e =>
                                    setPhotoURL(e?.target?.files?.[0] || null)
                                }
                            />
                        </Button>
                        <label htmlFor="fileInput">
                            {photoURL?.length !== 0 && photoURL !== null
                                ? extractFileName(photoURL)
                                : t("No file chosen")}
                        </label>
                    </StyledFileCont>
                    <StyledButtonContainer>
                        <Button
                            disabled={isPending}
                            sx={{
                                backgroundColor: "var(--color-green-lighter)",
                                color: "var(--color-white-soft)",
                                transition: "all .3s",
                                padding: "1rem 3rem",
                                "@media (max-width:500px)": {
                                    padding: "1rem 2rem",
                                },
                                fontSize: "1.1rem",
                                alignSelf: "center",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "var(--color-green-new)",
                                    transform: "translateY(-2px)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                                "&:disabled": {
                                    backgroundColor: "var(--color-grey-400)",
                                },
                            }}
                            type="submit"
                            variant="contained"
                        >
                            {t("Save changes")}
                        </Button>
                        <Button
                            onClick={handleReset}
                            disabled={isPending}
                            sx={{
                                color: "var(--color-grey-800)",
                                transition: "all .3s",
                                padding: "1rem 3rem",
                                "@media (max-width:500px)": {
                                    padding: "1rem 2rem",
                                },
                                fontSize: "1.1rem",
                                border: "1px solid var(--color-grey-500)",
                                fontWeight: "bold",
                                backgroundColor: "var(--color-grey-100)",
                                "&:hover": {
                                    backgroundColor: "var(--color-grey-200)",
                                    transform: "translateY(-2px)",
                                    border: "1px solid var(--color-grey-800)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                                "&.Mui-disabled": {
                                    background: "var(--color-grey-400)",
                                },
                            }}
                            variant="outlined"
                        >
                            {t("Clear")}
                        </Button>
                    </StyledButtonContainer>
                </StyledPaper>
            </form>

            {/* UPDATE EMAIL AND PASSWORD */}
            <StyledPaper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: "var(--color-grey-800)",
                    backgroundColor: "transparent",
                    p: "2rem 6rem",
                    m: currentUser?.displayName
                        ? "2rem 4rem 1rem"
                        : "2rem 4rem 4rem",
                    boxShadow: "var(--shadow-md)",
                }}
            >
                <StyledParagraph>
                    {t("Update email & password")}
                </StyledParagraph>
                <StyledTitle>
                    {t("Update your email by sending verification mail")}
                </StyledTitle>
                <Button
                    onClick={handleOpenEmailModal}
                    sx={{
                        backgroundColor: "var(--color-grey-800)",
                        color: "var(--color-grey-50)",
                        transition: "all .3s",
                        padding: "1.1rem 3rem",
                        "@media (max-width:500px)": {
                            padding: "1rem 1.5rem",
                        },
                        fontSize: "1.1rem",
                        alignSelf: "flex-start",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        mb: "1rem",
                        "&:hover": {
                            backgroundColor: "var(--color-grey-600)",
                            color: "var(--color-grey-100)",
                            transform: "translateY(-2px)",
                        },
                        "&:active": {
                            transform: "translateY(0)",
                        },
                        "&:disabled": {
                            backgroundColor: "var(--color-grey-500)",
                        },
                    }}
                    variant="contained"
                >
                    <EmailIcon
                        sx={{
                            color: "var(--color-grey-300)",
                            fontSize: "2rem",
                        }}
                    />{" "}
                    {t("Update Email")}
                </Button>

                <StyledTitle>
                    {t("Update your password by verifying your information")}
                </StyledTitle>
                <Button
                    onClick={handleOpenPasswordModal}
                    sx={{
                        backgroundColor: "var(--color-grey-800)",
                        color: "var(--color-grey-50)",
                        transition: "all .3s",
                        padding: "1.1rem 2rem",
                        "@media (max-width:500px)": {
                            padding: "1rem 1.3rem",
                        },
                        fontSize: "1.1rem",
                        alignSelf: "flex-start",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "0.5rem",
                        mb: "1rem",
                        "&:hover": {
                            backgroundColor: "var(--color-grey-600)",
                            color: "var(--color-grey-100)",
                            transform: "translateY(-2px)",
                        },
                        "&:active": {
                            transform: "translateY(0)",
                        },
                        "&:disabled": {
                            backgroundColor: "var(--color-grey-500)",
                        },
                    }}
                    variant="contained"
                >
                    <LockOpenIcon
                        sx={{
                            color: "var(--color-grey-300)",
                            fontSize: "2rem",
                        }}
                    />{" "}
                    {t("Update password")}
                </Button>
            </StyledPaper>

            {/* UPDATE Walkthroughs */}
            <StyledPaper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: "var(--color-grey-800)",
                    backgroundColor: "transparent",
                    p: "2rem 6rem",
                    m: currentUser?.displayName
                        ? "2rem 4rem 1rem"
                        : "2rem 4rem 4rem",
                    boxShadow: "var(--shadow-md)",
                }}
            >
                <StyledParagraph>
                    {t("Update Displaying Walkthroughs")}
                </StyledParagraph>
                <StyledTitle>
                    {t("Update walkthroughs which you want to display")}
                </StyledTitle>
                <div>
                    <Tooltip
                        title={t(
                            "Walkthroughs automatically closing itself when user sees them for the first time. You can manually open them again from here."
                        )}
                        placement="right"
                    >
                        <Button
                            id="openWalkthroughChanges-btn"
                            aria-controls={
                                opensWalkthrough
                                    ? "openWalkthroughChanges-btn"
                                    : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                                opensWalkthrough ? "true" : undefined
                            }
                            onClick={handleClick}
                            sx={{
                                backgroundColor: "var(--color-grey-800)",
                                color: "var(--color-grey-50)",
                                transition: "all .3s",
                                padding: "1.1rem 2rem",
                                "@media (max-width:500px)": {
                                    padding: "1.1rem 1.2rem",
                                },
                                fontSize: "1.1rem",
                                alignSelf: "flex-start",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                mb: "1rem",
                                "&:hover": {
                                    backgroundColor: "var(--color-grey-600)",
                                    color: "var(--color-grey-100)",
                                    transform: "translateY(-2px)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                                "&:disabled": {
                                    backgroundColor: "var(--color-grey-500)",
                                },
                            }}
                        >
                            <SwapHorizontalCircleIcon
                                sx={{
                                    color: "var(--color-grey-300)",
                                    fontSize: "2rem",
                                }}
                            />{" "}
                            {t("Update Walkthroughs")}
                        </Button>
                    </Tooltip>
                    <Menu
                        id="walkthroughMenu"
                        anchorEl={anchorEl}
                        open={opensWalkthrough}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        MenuListProps={{
                            "aria-labelledby": "openWalkthroughChanges-btn",
                        }}
                        sx={{
                            maxWidth: "85rem",
                            width: "90%",
                            "@media (max-width: 1000px)": {
                                width: "60%",
                            },
                            "@media (max-width: 800px)": {
                                width: "80%",
                            },
                            "@media (max-width: 550px)": {
                                width: "90%",
                            },
                            "@media (max-width: 450px)": {
                                width: "99%",
                            },
                            "& > .MuiPaper-root": {
                                marginTop: "0.5rem",
                            },
                        }}
                    >
                        <Grid container>
                            {allWalkthroughs.map((walk, i) => (
                                <Tooltip
                                    key={i}
                                    placement="left"
                                    arrow
                                    title={t(
                                        "The changes requires reload the page"
                                    )}
                                >
                                    <Grid item xs={6}>
                                        <MenuItem
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                width: "100%",
                                            }}
                                        >
                                            {walk.label}
                                            <Switch
                                                checked={
                                                    !switchStates[walk.key]
                                                }
                                                onChange={() =>
                                                    handleSwitchChange(walk.key)
                                                }
                                            />
                                        </MenuItem>
                                    </Grid>
                                </Tooltip>
                            ))}
                        </Grid>
                    </Menu>
                </div>
            </StyledPaper>

            {/* DELETE USER */}
            {currentUser?.displayName && (
                <StyledPaper
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: "var(--color-grey-800)",
                        backgroundColor: "transparent",
                        p: "2rem 6rem 4rem",
                        m: "1rem 4rem 4rem",
                        boxShadow: "var(--shadow-md)",
                    }}
                >
                    <StyledParagraph>{t("Delete account")}</StyledParagraph>
                    <StyledDeleteText>
                        {t("Are you sure you want to delete this user named")}{" "}
                        &nbsp;
                        <StyledSpan>
                            {currentUser?.displayName}&nbsp;
                        </StyledSpan>
                        ?
                    </StyledDeleteText>
                    <Button
                        sx={{
                            backgroundColor: "var(--color-red-700)",
                            color: "white",
                            transition: "all .3s",
                            padding: "1rem 2rem",
                            "@media (max-width:500px)": {
                                padding: "1rem 1.2rem",
                            },
                            fontSize: "1.1rem",
                            alignSelf: "flex-start",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "flex-end",
                            gap: "0.5rem",

                            "&:hover": {
                                backgroundColor: "var(--color-red-800)",
                                transform: "translateY(-2px)",
                            },
                            "&:active": {
                                transform: "translateY(0)",
                            },
                        }}
                        variant="contained"
                        onClick={handleOpenModal}
                    >
                        <DeleteOutlineIcon
                            sx={{
                                color: "var(--color-white-soft)",
                                fontSize: "2rem",
                            }}
                        />{" "}
                        {t("Delete Account")}
                    </Button>
                </StyledPaper>
            )}
            <UpdateEmailModal
                handleClose={handleCloseEmailModal}
                open={openEmailModal}
            />
            <UpdatePasswordModal
                handleClose={handleClosePasswordModal}
                open={openPasswordModal}
            />
            <DeleteUserModal handleClose={handleCloseModal} open={open} />
        </>
    );
}

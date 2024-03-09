import {
    Button,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Paper,
    TextField,
} from "@mui/material";
import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { auth } from "../Api/firebase";
import { useDeleteUserAccount, useUpdateUser } from "../Api/userController";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { extractFileName } from "../Utils/utils";

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 0.7rem;
`;

const StyledTextField = styled(TextField)`
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
`;

const StyledInput = styled(OutlinedInput)`
    margin-bottom: 0.7rem;
    & > input {
        color: var(--color-grey-800);
        font-size: 1.3rem;
    }

    & > input + div > button {
        color: var(--color-grey-800);
    }

    & > input + div + fieldset {
        border-color: var(--color-grey-500);
    }

    &:hover > input + div + fieldset {
        border-color: var(--color-brand-600) !important;
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
    font-size: 4rem;
    padding-bottom: 1rem;
    align-self: flex-start;
    display: block;
    color: var(--color-grey-800);
    font-weight: bold;
`;

const StyledDeleteText = styled.p`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 2.5rem;
`;

const StyledSpan = styled.span`
    font-weight: bold;
    font-size: 1.8rem;
    padding-bottom: 5px;
    border-bottom: 1px solid var(--color-grey-600);
    color: var(--color-brand-500);
`;

const StyledFileCont = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export default function SettingForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit, getValues } = useForm();
    const { currentUser } = auth;
    const { mutate: updateUser, isPending } = useUpdateUser();
    const { mutate: deleteUser, isPending: isDeleting } =
        useDeleteUserAccount();
    const [photoURL, setPhotoURL] = React.useState(null);

    useEffect(() => {
        const { photoURL } = getValues();
        setPhotoURL(photoURL);
    }, [getValues]);

    function onSubmit() {
        const { photoURL, displayName, password } = getValues();
        if (!photoURL.length && !displayName.length && !password.length)
            return toast.error("There is no value to update");
        updateUser({ photoURL, displayName, password, currentUser });
    }

    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    function onDelete() {
        deleteUser(currentUser);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        // gap: "1rem",
                        color: "var(--color-grey-800)",
                        backgroundColor: "transparent",
                        p: "2rem 6rem 4rem",
                        m: "4rem 4rem 0 4rem",
                        boxShadow: "var(--shadow-md)",
                    }}
                >
                    <StyledParagraph>Update user</StyledParagraph>
                    <StyledTitle>Email</StyledTitle>
                    <StyledTextField
                        disabled
                        defaultValue={currentUser?.email}
                        sx={{ minWidth: "100%", mb: "1rem" }}
                        variant="outlined"
                        {...register("email")}
                    />
                    <StyledTitle>Display Name</StyledTitle>
                    <StyledTextField
                        disabled={isPending}
                        placeholder="Display Name"
                        sx={{ minWidth: "100%", mb: "1rem" }}
                        variant="outlined"
                        {...register("displayName")}
                    />

                    {/* Password */}
                    <StyledTitle>Password</StyledTitle>
                    <StyledInput
                        disabled={isPending}
                        {...register("password")}
                        placeholder="Password"
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    <StyledTitle>Profile photo</StyledTitle>
                    <StyledFileCont>
                        <Button
                            disabled={isPending}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            sx={{
                                backgroundColor: "var(--color-grey-800)",
                                color: "var(--color-grey-50)",
                                transition: "all .3s",
                                padding: "1rem 2rem",
                                fontSize: "1.1rem",
                                alignSelf: "flex-start",
                                gap: "1rem",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "var(--color-grey-600)",
                                    color: "var(--color-grey-100)",
                                    transform: "translateY(-2px)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                            }}
                        >
                            <CloudUploadIcon /> Upload
                            <VisuallyHiddenInput
                                {...register("photoURL")}
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                onChange={e => setPhotoURL(e?.target?.files[0])}
                            />
                        </Button>
                        <label htmlFor="fileInput">
                            {photoURL?.length !== 0
                                ? extractFileName(photoURL)
                                : "No file chosen"}
                        </label>
                    </StyledFileCont>

                    <Button
                        disabled={isPending}
                        sx={{
                            backgroundColor: "var(--color-grey-800)",
                            color: "var(--color-grey-50)",
                            transition: "all .3s",
                            padding: "1rem 3rem",
                            fontSize: "1.1rem",
                            alignSelf: "center",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-600)",
                                color: "var(--color-grey-100)",
                                transform: "translateY(-2px)",
                            },
                            "&:active": {
                                transform: "translateY(0)",
                            },
                        }}
                        type="submit"
                        variant="contained"
                    >
                        Save changes
                    </Button>
                </Paper>
            </form>
            {currentUser?.displayName && (
                <form onSubmit={handleSubmit(onDelete)}>
                    <Paper
                        elevation={0}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            // gap: "1rem",
                            color: "var(--color-grey-800)",
                            backgroundColor: "transparent",
                            p: "2rem 6rem 4rem",
                            m: "4rem",
                            boxShadow: "var(--shadow-md)",
                        }}
                    >
                        <StyledParagraph>Delete account</StyledParagraph>
                        <StyledDeleteText>
                            Are you sure you want to delete this user named
                            &nbsp;
                            <StyledSpan>
                                {currentUser?.displayName}&nbsp;?
                            </StyledSpan>{" "}
                            You lose all your progression by doing this.
                        </StyledDeleteText>
                        <Button
                            disabled={isDeleting}
                            sx={{
                                backgroundColor: "var(--color-red-700)",
                                color: "white",
                                transition: "all .3s",
                                padding: "1rem 3rem",
                                fontSize: "1.1rem",
                                alignSelf: "flex-start",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "var(--color-red-800)",
                                    transform: "translateY(-2px)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Delete Account
                        </Button>
                    </Paper>
                </form>
            )}
        </>
    );
}

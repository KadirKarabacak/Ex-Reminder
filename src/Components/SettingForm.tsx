import { Button, Paper, TextField } from "@mui/material";
import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled as muiStyled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { auth } from "../Api/firebase";
import { useUpdateUser } from "../Api/userController";
import { useEffect, useState } from "react";

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
`;

const StyledTextField = styled(TextField)`
    & label {
        color: var(--color-grey-800);
    }

    & div > input {
        color: var(--color-grey-800);
    }

    & div > fieldset {
        border-color: var(--color-grey-500);
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

export default function SettingForm() {
    const { register, handleSubmit, getValues } = useForm();
    const { currentUser } = auth;
    const { mutate: updateUser, isPending } = useUpdateUser();

    function onSubmit() {
        const { photoURL, displayName } = getValues();
        if (photoURL.length === 0) return;
        updateUser({ photoURL, displayName, currentUser });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    color: "var(--color-grey-800)",
                    backgroundColor: "transparent",
                    p: "6rem",
                    m: "0 4rem",
                    boxShadow: "var(--shadow-md)",
                }}
            >
                <StyledTitle>Email</StyledTitle>
                <StyledTextField
                    disabled
                    value={currentUser?.email}
                    sx={{ minWidth: "100%", mb: "1rem" }}
                    variant="outlined"
                />
                <StyledTitle>Display Name</StyledTitle>
                <StyledTextField
                    disabled={isPending}
                    defaultValue={currentUser?.displayName}
                    label="Display Name"
                    sx={{ minWidth: "100%", mb: "1rem" }}
                    variant="outlined"
                    {...register("displayName")}
                />
                <StyledTitle>Profile photo</StyledTitle>
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
                    <CloudUploadIcon /> Profile photo
                    <VisuallyHiddenInput
                        {...register("photoURL")}
                        type="file"
                        accept="image/*"
                        id="fileInput"
                    />
                </Button>

                <Button
                    disabled={isPending}
                    sx={{
                        backgroundColor: "var(--color-grey-800)",
                        color: "var(--color-grey-50)",
                        transition: "all .3s",
                        padding: "1rem 3rem",
                        fontSize: "1.1rem",
                        alignSelf: "center",
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
    );
}

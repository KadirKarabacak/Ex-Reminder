import {
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    Grid,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ModalTypes } from "../../Interfaces/User";
import { useTranslation } from "react-i18next";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { formatDate } from "../../Utils/utils";
import { min } from "date-fns";
import toast from "react-hot-toast";
import { useAddEmployee } from "../../Api/employeeController";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 35%;
    background-color: var(--color-grey-100);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 4rem 4rem 3rem;
    border-radius: 5px;
`;
const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    justify-content: center;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
    & div + p {
        font-size: 1rem;
    }
    & label {
        color: var(--color-grey-400);
        font-size: 1.2rem;
    }
    & div > input {
        color: var(--color-grey-800);
        font-size: 1.3rem;

        &:disabled {
            background-color: var(--color-grey-300);
        }
    }
    & div > fieldset {
        border-color: var(--color-grey-500);
    }
    &:hover > div > fieldset {
        border-color: var(--color-brand-600) !important;
    }
`;

const minDate = min([new Date(2000, 1, 1)]);

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 0.9rem;
`;

const StyledDatePicker = styled(DatePicker)`
    width: 100%;

    & > div {
        color: var(--color-grey-800);
        font-size: 1.3rem;

        &:hover > fieldset {
            border-color: var(--color-brand-600) !important;
        }

        & > fieldset {
            border-color: var(--color-grey-500);
        }
    }
`;

export default function AddEmployeeModal({ open, handleClose }: ModalTypes) {
    const [hireTime, setHireTime] = useState(new Date());
    const [error, setError] = useState<DateValidationError>(null);
    const { t } = useTranslation();
    const { mutateAsync: addEmployee, isPending } = useAddEmployee();

    const errorMessage = React.useMemo(() => {
        switch (error) {
            case "minDate": {
                return t("Date cannot be before 10/06/2000");
            }
            case "invalidDate": {
                return t("Your date is not valid");
            }

            default: {
                return "";
            }
        }
    }, [error]);

    const {
        handleSubmit,
        register,
        getValues,
        clearErrors,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    async function onSubmit() {
        const { fullName, jobTitle, department, email, age, salary, hireDate } =
            getValues();
        let date;
        hireDate !== undefined
            ? (date = formatDate(hireDate))
            : (date = formatDate(hireTime));
        const newEmployee = {
            full_name: fullName,
            job_title: jobTitle,
            department,
            email,
            age,
            salary,
            hire_date: date,
            createdAt: formatDate(new Date()),
        };
        if (errorMessage)
            return toast.error("Before submit you must enter a valid date");
        await addEmployee(newEmployee);
        onCloseModal();
    }

    function onCloseModal() {
        handleClose(open);
        clearErrors();
        reset();
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <StyledBox>
                        <Typography
                            id="transition-modal-title"
                            variant="h2"
                            component="h1"
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            {t("Add New Employee")}
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: "1rem" }}>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Full Name*")}</StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    placeholder={t("Full Name")}
                                    {...register("fullName", {
                                        required: t("Full Name is required"),
                                    })}
                                    error={Boolean(errors?.fullName)}
                                    helperText={
                                        (errors?.fullName
                                            ?.message as React.ReactNode) || ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Job Title")}</StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    placeholder={t("Job Title*")}
                                    {...register("jobTitle", {
                                        required: t("Job Title is required"),
                                    })}
                                    error={Boolean(errors?.jobTitle)}
                                    helperText={
                                        (errors?.jobTitle
                                            ?.message as React.ReactNode) || ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider
                                    sx={{
                                        borderColor: "var(--color-grey-200)",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Department*")}</StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    placeholder={t("Department")}
                                    {...register("department", {
                                        required: t(
                                            "Department name is required"
                                        ),
                                    })}
                                    error={Boolean(errors?.department)}
                                    helperText={
                                        (errors?.department
                                            ?.message as React.ReactNode) || ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>Email</StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    placeholder="Email"
                                    {...register("email", {
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: t("Invalid email"),
                                        },
                                    })}
                                    error={Boolean(errors?.email)}
                                    helperText={
                                        (errors?.email
                                            ?.message as React.ReactNode) || ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider
                                    sx={{
                                        borderColor: "var(--color-grey-200)",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>{t("Age")}</StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    placeholder={t("Age")}
                                    {...register("age")}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>{t("Salary")}</StyledTitle>
                                <StyledTextField
                                    disabled={isPending}
                                    placeholder={t("Salary")}
                                    {...register("salary")}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>{t("Hire Date*")}</StyledTitle>
                                <StyledDatePicker
                                    format="dd/MM/yyyy"
                                    disabled={isPending}
                                    onChange={(date: any) => {
                                        setValue("hireDate", date);
                                        setHireTime(date);
                                    }}
                                    value={hireTime}
                                    defaultValue={new Date()}
                                    onError={newError => setError(newError)}
                                    slotProps={{
                                        textField: {
                                            helperText: errorMessage,
                                        },
                                    }}
                                    minDate={minDate}
                                />
                            </Grid>
                        </Grid>

                        <StyledButtonContainer>
                            <Button
                                disabled={isPending}
                                sx={{
                                    backgroundColor: "var(--color-grey-800)",
                                    color: "var(--color-grey-50)",
                                    transition: "all .3s",
                                    padding: "1rem 2rem",
                                    fontSize: "1.1rem",
                                    alignSelf: "flex-start",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-700)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                type="submit"
                                variant="contained"
                            >
                                {t("Add Employee")}
                            </Button>
                            <Button
                                disabled={isPending}
                                onClick={onCloseModal}
                                sx={{
                                    color: "var(--color-grey-800)",
                                    transition: "all .3s",
                                    padding: "1rem 3rem",
                                    fontSize: "1.1rem",
                                    border: "1px solid var(--color-grey-500)",
                                    backgroundColor: "var(--color-grey-100)",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-200)",
                                        transform: "translateY(-2px)",
                                        border: "1px solid var(--color-grey-800)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                variant="outlined"
                            >
                                {t("Cancel")}
                            </Button>
                        </StyledButtonContainer>
                    </StyledBox>
                </form>
            </Fade>
        </Modal>
    );
}

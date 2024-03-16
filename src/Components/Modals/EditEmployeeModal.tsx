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
import { useTranslation } from "react-i18next";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { formatDate } from "../../Utils/utils";
import { useUpdateEmployee } from "../../Api/userController";
import { min } from "date-fns";

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
    background-color: var(--color-grey-200);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    & div + p {
        font-size: 1rem;
    }
    & label {
        color: var(--color-grey-400);
        font-size: 1.3rem;
    }

    & div > input {
        color: var(--color-grey-700);
        font-size: 1.3rem;

        &:disabled {
            background-color: var(--color-grey-300);
        }
    }
    & div > input::after {
        border-bottom: 2px solid var(--color-brand-600);
    }

    & div > fieldset {
        border-color: var(--color-grey-500);
    }
    &:hover > div > fieldset {
        border-color: var(--color-brand-600) !important;
    }
`;

const StyledTitle = styled.h4`
    color: var(--color-grey-700);
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

interface EditEmployeeModal {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    row: any;
}

function parseDateFromString(dateString: String) {
    const [day, month, year] = dateString.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

const StyledSpan = styled.span`
    color: var(--color-brand-500);
    margin-left: 6px;
`;

const minDate = min([new Date(2000, 1, 1)]);

export default function EditEmployeeModal({
    open,
    handleClose,
    id,
    row,
}: EditEmployeeModal) {
    const [hireTime, setHireTime] = useState(
        parseDateFromString(row.hire_date)
    );
    const [error, setError] = useState<DateValidationError>(null);
    const { t } = useTranslation();
    const { mutateAsync: updateEmployee, isPending: isUpdating } =
        useUpdateEmployee();

    const errorMessage = React.useMemo(() => {
        switch (error) {
            case "minDate": {
                return t("Date cannot be before 10/06/2000");
            }
            case "invalidDate": {
                return "Your date is not valid";
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

        const employee = {
            full_name: fullName,
            job_title: jobTitle,
            department,
            email,
            age,
            salary,
            hire_date: date,
        };
        if (errorMessage) return;
        await updateEmployee({ employee, id });
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
                            variant="h3"
                            component="h1"
                            sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                        >
                            {t(`Edit Employee`)}
                            <StyledSpan>{row.full_name}</StyledSpan>
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: "1rem" }}>
                            <Grid item xs={6}>
                                <StyledTitle>Full Name</StyledTitle>
                                <StyledTextField
                                    disabled={isUpdating}
                                    variant="filled"
                                    defaultValue={row.full_name}
                                    label="Full Name"
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
                                <StyledTitle>Job Title</StyledTitle>
                                <StyledTextField
                                    disabled={isUpdating}
                                    variant="filled"
                                    defaultValue={row.job_title}
                                    label="Job Title"
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
                                <StyledTitle>Department</StyledTitle>
                                <StyledTextField
                                    disabled={isUpdating}
                                    variant="filled"
                                    defaultValue={row.department}
                                    label="Department"
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
                                    disabled={isUpdating}
                                    variant="filled"
                                    label="Email"
                                    defaultValue={row.email}
                                    {...register("email", {
                                        required: t("Email is required"),
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
                                <StyledTitle>Age</StyledTitle>
                                <StyledTextField
                                    disabled={isUpdating}
                                    variant="filled"
                                    defaultValue={row.age}
                                    label="Age"
                                    {...register("age")}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>Salary</StyledTitle>
                                <StyledTextField
                                    disabled={isUpdating}
                                    variant="filled"
                                    defaultValue={row.salary}
                                    label="Salary"
                                    {...register("salary")}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StyledTitle>Hire Date</StyledTitle>
                                <StyledDatePicker
                                    format="dd/MM/yyyy"
                                    disabled={isUpdating}
                                    onChange={(date: any) => {
                                        setValue("hireDate", date);
                                        setHireTime(date);
                                    }}
                                    value={hireTime}
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
                                disabled={isUpdating}
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
                                {t("Edit Employee")}
                            </Button>
                            <Button
                                disabled={isUpdating}
                                onClick={onCloseModal}
                                sx={{
                                    color: "var(--color-grey-800)",
                                    transition: "all .3s",
                                    padding: "1rem 3rem",
                                    fontSize: "1.1rem",
                                    border: "1px solid var(--color-grey-500)",
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

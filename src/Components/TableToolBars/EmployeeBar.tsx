import { Button, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AddEmployeeModal from "../Modals/Employees/AddEmployeeModal";
import styled from "styled-components";
import SearchInput from "../SearchInput";
import ExportButton from "../ExportButton";
import { Employee } from "../../Interfaces/User";
import { formatCurrency } from "../../Utils/utils";

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

export function EmployeeToolBar({
    searchText,
    setSearchText,
    data,
}: {
    searchText: any;
    setSearchText: any;
    data: any;
}) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ExcelData = data.map((value: Employee) => {
        return {
            full_name: value?.full_name || t("-"),
            job_title: value?.job_title || t("-"),
            department: value?.department || t("-"),
            salary: formatCurrency(value?.salary),
            hire_date: value?.hire_date || t("-"),
            age: value?.age || t("-"),
            email: value?.email || t("-"),
        };
    });

    const PdfBody = data.map((value: Employee) => {
        return [
            value?.full_name || t("-"),
            value?.job_title || t("-"),
            value?.department || t("-"),
            formatCurrency(value?.salary),
            value?.hire_date || t("-"),
            value?.age || t("-"),
            value?.email || t("-"),
        ];
    });

    return (
        <>
            <StyledToolBar
                sx={{
                    pl: { sm: 3 },
                    pr: { xs: 1, sm: 2 },
                    gap: "1.5rem",
                }}
            >
                <Typography
                    sx={{
                        marginRight: "auto",
                        color: "var(--color-green-lighter)",
                        fontSize: "2.4rem",
                        fontWeight: "bold",
                        borderBottom: "3px solid var(--color-green-lighter)",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Employees")}
                </Typography>
                <SearchInput
                    searchText={searchText}
                    setSearchText={setSearchText}
                    label={t("Search Employee by Name")}
                />
                <ExportButton
                    title={t("Employees")}
                    excel={{
                        headers: [
                            {
                                label: t("Full Name"),
                                key: "full_name",
                            },
                            {
                                label: t("Job Title"),
                                key: "job_title",
                            },
                            {
                                label: t("Department"),
                                key: "department",
                            },
                            {
                                label: t("Salary"),
                                key: "salary",
                            },
                            {
                                label: t("Hire Date"),
                                key: "hire_date",
                            },
                            {
                                label: t("Age"),
                                key: "age",
                            },
                            {
                                label: t("Email"),
                                key: "email",
                            },
                        ],
                        data: ExcelData,
                    }}
                    pdf={{
                        head: [
                            [
                                t("Full Name"),
                                t("Job Title"),
                                t("Department"),
                                t("Salary"),
                                t("Hire Date"),
                                t("Age"),
                                t("Email"),
                            ],
                        ],
                        body: PdfBody,
                    }}
                />
                <Button
                    onClick={handleOpen}
                    sx={{
                        backgroundColor: "var(--color-grey-800)",
                        color: "var(--color-grey-50)",
                        transition: "all .3s",
                        padding: "1rem 2rem",
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
                        "&:disabled": {
                            backgroundColor: "var(--color-grey-500)",
                        },
                    }}
                    variant="contained"
                >
                    {t("Add Employee")}
                </Button>
            </StyledToolBar>
            <AddEmployeeModal handleClose={handleClose} open={open} />
        </>
    );
}

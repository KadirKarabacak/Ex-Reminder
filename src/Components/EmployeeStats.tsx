import { Divider, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import { formatCurrency } from "../Utils/utils";
import { Employee } from "../Interfaces/User";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../Contexts/DarkModeContext";

const Stats = styled.div`
    width: 100%;
    background-color: var(--color-grey-100);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    display: flex;
    flex-direction: column;
    padding: 2.4rem 3.2rem;
`;

const StyledTitle = styled.h3`
    color: var(--color-green-lighter);
    align-self: center;
    margin-bottom: 0.9rem;
`;

const StyledDescription = styled.h4`
    color: var(--color-grey-600);
    align-self: center;
    margin-bottom: 0.9rem;
`;

export default function EmployeeStats({
    data,
}: {
    data: Employee[] | undefined;
}) {
    const { t } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const totalEmployee = data?.length;
    const totalSalary = data?.reduce((acc, employee) => {
        return acc + +employee.salary;
    }, 0);
    const averageSalary =
        totalSalary &&
        formatCurrency(+(totalSalary / (totalEmployee || 1)).toFixed(2));
    const totalAge = data?.reduce((acc, employee) => {
        return acc + +employee.age;
    }, 0);
    const averageAge = totalAge && (totalAge / (totalEmployee || 1)).toFixed();

    return (
        <Stats
            style={{
                boxShadow: isDarkMode ? "var(--shadow-md)" : "var(--shadow-lg)",
            }}
        >
            <Typography
                id="transition-modal-title"
                variant="h3"
                component="h1"
                sx={{
                    fontWeight: "bold",
                    letterSpacing: "0.80px",
                    alignSelf: "flex-start",
                    padding: "1rem 0 2rem 0",
                }}
            >
                {t(`Employees Stats`)}
            </Typography>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={4}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <StyledTitle>{t(`Total Employees`)}</StyledTitle>
                    <StyledDescription>{totalEmployee}</StyledDescription>
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <StyledTitle>{t(`Total Salary`)}</StyledTitle>
                    <StyledDescription>
                        {formatCurrency(totalSalary ? totalSalary : 0)}
                    </StyledDescription>
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <StyledTitle>{t(`Average Salary`)}</StyledTitle>
                    <StyledDescription>{averageSalary}</StyledDescription>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <Divider
                        sx={{
                            borderColor: "var(--color-grey-200)",
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <StyledTitle>{t(`Average Age`)}</StyledTitle>
                    <StyledDescription>{averageAge}</StyledDescription>
                </Grid>
            </Grid>
        </Stats>
    );
}

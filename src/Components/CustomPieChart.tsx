/* eslint-disable react/prop-types */
import styled from "styled-components";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { Typography } from "@mui/material";
import { Employee } from "../Interfaces/User";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../Contexts/DarkModeContext";

const ChartBox = styled.div`
    /* Box */
    width: 100%;
    background-color: var(--color-grey-100);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
    & .recharts-pie-label-text {
        font-weight: 600;
    }
`;

const COLORSDARK = [
    "var(--color-green-lighter)",
    "#fab319",
    "#ea5827",
    "#f8f7e9",
    "#32d0d3",
    "#2b4fe0",
    "#8d9c80",
    "#c1121f",
    "#81b29a",
    "",
];

const COLORSLIGHT = [
    "var(--color-green-lighter)",
    "#c98c08",
    "#ea5827",
    "#ec8524",
    "#32d0d3",
    "#2b4fe0",
    "#8d9c80",
    "#c1121f",
    "#81b29a",
    "",
];

export function CustomPieChart({ data }: { data: Employee[] | undefined }) {
    const { t } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const jobTitles = data?.map((employee: Employee) => {
        return employee.job_title;
    });

    //! Make unique job titles
    function transformData(arr: string[] | undefined) {
        const counts = arr?.reduce((acc: any, curr) => {
            if (acc[curr]) {
                acc[curr]++;
            } else {
                acc[curr] = 1;
            }
            return acc;
        }, {});

        const result = Object.entries(counts).map(([title, count]) => {
            return {
                name: title,
                value: count,
            };
        });

        return result;
    }

    const jobs = transformData(jobTitles);

    return (
        <ChartBox
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
                    padding: "1rem 0 2rem 2rem",
                }}
            >
                {t(`Total Employees`)}
            </Typography>
            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                    <Pie
                        data={jobs}
                        nameKey="name"
                        dataKey={`value`}
                        // fill="#8884d8"
                        innerRadius={85}
                        outerRadius={110}
                        cy="50%"
                        cx={
                            window.innerWidth < 600
                                ? "50%"
                                : window.innerWidth < 550
                                ? "70%"
                                : "40%"
                        }
                        paddingAngle={4}
                    >
                        {jobs?.map((_, i) => (
                            <Cell
                                fill={
                                    isDarkMode ? COLORSDARK[i] : COLORSLIGHT[i]
                                }
                                stroke="var(--color-grey-100)"
                                key={`cell${i}`}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    {window.innerWidth > 550 && (
                        <Legend
                            verticalAlign="middle"
                            align="right"
                            layout="vertical"
                            iconSize={15}
                            iconType="triangle"
                            style={{ right: "20px" }}
                        />
                    )}
                </PieChart>
            </ResponsiveContainer>
        </ChartBox>
    );
}

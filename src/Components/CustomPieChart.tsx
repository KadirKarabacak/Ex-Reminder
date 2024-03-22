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

const ChartBox = styled.div`
    /* Box */
    width: 50%;
    background-color: var(--color-grey-100);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;

    padding: 2rem 3rem;

    & .recharts-pie-label-text {
        font-weight: 600;
    }
`;

const COLORSLIGHT = [
    "#4E479F",
    "#716BB0",
    "#4338CA",
    "#3B6F4A",
    "#77768A",
    "#5B898A",
    "#133EE6",
    "#5DAE00",
    "",
    "",
];

export function CustomPieChart({ data }: { data: Employee[] | undefined }) {
    const { t } = useTranslation();
    const jobTitles = data?.map((employee: Employee) => {
        return employee.job_title;
    });

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
        <ChartBox>
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
                        cx="40%"
                        paddingAngle={4}
                    >
                        {jobs?.map((_, i) => (
                            <Cell
                                fill={COLORSLIGHT[i]}
                                stroke="var(--color-grey-100)"
                                key={`cell${i}`}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        verticalAlign="middle"
                        align="right"
                        layout="vertical"
                        iconSize={15}
                        iconType="triangle"
                        style={{ right: "20px" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartBox>
    );
}

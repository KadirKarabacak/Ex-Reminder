import { Box, Paper } from "@mui/material";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import styled from "styled-components";
import { useDarkMode } from "../Contexts/DarkModeContext";
import { useTranslation } from "react-i18next";

const StyledChartTitle = styled.h2`
    font-size: 3rem;
    color: var(--color-grey-800);
    font-weight: bold;
    text-align: left;
    margin-bottom: 3rem;
`;

// export type RandomData = {
//     name: string;
//     sales: string;
//     profit: string;
//     createdAt: string;
// };

// export const data: RandomData[] = [
//     {
//         name: "Nolan Acevedo",
//         sales: "$24.58",
//         profit: "100",
//         createdAt: format(new Date(), "MMM dd"),
//     },
//     {
//         name: "Porter Green",
//         sales: "$49.15",
//         profit: "200",
//         createdAt: format(new Date(), "MMM dd"),
//     },
//     {
//         name: "Russell Benson",
//         sales: "$82.16",
//         profit: "300",
//         createdAt: format(new Date(), "MMM dd"),
//     },
//     {
//         name: "Francesca Lamb",
//         sales: "$73.07",
//         profit: "400",
//         createdAt: format(new Date(), "MMM dd"),
//     },
//     {
//         name: "Marsden Terrell",
//         sales: "$44.25",
//         profit: "700",
//         createdAt: format(new Date(), "MMM dd"),
//     },
//     {
//         name: "Marsden Terrell",
//         sales: "$44.25",
//         profit: "700",
//         createdAt: format(new Date(), "MMM dd"),
//     },
//     {
//         name: "Francesca Lamb",
//         sales: "$73.07",
//         profit: "400",
//         createdAt: format(new Date(), "MMM dd"),
//     },
//     {
//         name: "Marsden Terrell",
//         sales: "$44.25",
//         profit: "700",
//         createdAt: format(new Date(), "MMM dd"),
//     },
// ];

export default function Chart({ data }: any) {
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    const colors = isDarkMode
        ? {
              sales: { stroke: "#4f46e5", fill: "#4f46e5" },
              profit: {
                  stroke: "var(--color-green-lighter)",
                  fill: "var(--color-green-lighter)",
              },
              text: "var(--color-grey-600)",
              background: "var(--color-grey-100)",
          }
        : {
              sales: { stroke: "#4f46e5", fill: "#c7d2fe" },
              profit: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "var(--color-grey-600)",
              background: "var(--color-grey-100)",
          };

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    mb: 2,
                    backgroundColor: "transparent",
                    maxWidth: "100%",
                    height: "max-content",
                    boxShadow: "var(--shadow-md)",
                    p: "2rem",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <StyledChartTitle>{t("Annual Sales")}</StyledChartTitle>
                <ResponsiveContainer height={300} width="100%">
                    {/* Give data to AreaChart Component */}
                    <AreaChart data={data}>
                        <XAxis
                            dataKey="saleCreatedAt"
                            tick={{ fill: colors.text }}
                            tickLine={{ stroke: colors.text }}
                        />
                        <YAxis
                            unit="₺"
                            tick={{ fill: colors.text }}
                            tickLine={{ stroke: colors.text }}
                        />
                        <CartesianGrid strokeDasharray="6" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: colors.background,
                            }}
                        />
                        {/* Changes the tooltip styling */}
                        <Area
                            dataKey="saleItemPrice"
                            type="monotone"
                            stroke={colors.profit?.stroke}
                            fill={colors.profit?.fill}
                            strokeWidth={2}
                            name={t("Sale Price")}
                            unit="₺"
                        />
                        <Area
                            dataKey="saleItemName"
                            type="monotone"
                            stroke={colors.text}
                            fill={colors.text}
                            strokeWidth={2}
                            name={t("Sold Item")}
                        />
                        <Area
                            dataKey="saleItemAmount"
                            type="monotone"
                            stroke={colors.text}
                            fill={colors.text}
                            strokeWidth={2}
                            name={t("Item Amount")}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
}

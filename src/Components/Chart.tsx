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
import { format } from "date-fns";

const StyledChartTitle = styled.h2`
    font-size: 3rem;
    color: var(--color-grey-800);
    font-weight: bold;
    text-align: left;
`;

export type RandomData = {
    name: string;
    currency: string;
    wallet: string;
    createdAt: string;
};

export const data: RandomData[] = [
    {
        name: "Nolan Acevedo",
        currency: "$24.58",
        wallet: "100",
        createdAt: format(new Date(), "MMM dd"),
    },
    {
        name: "Porter Green",
        currency: "$49.15",
        wallet: "200",
        createdAt: format(new Date(), "MMM dd"),
    },
    {
        name: "Russell Benson",
        currency: "$82.16",
        wallet: "300",
        createdAt: format(new Date(), "MMM dd"),
    },
    {
        name: "Francesca Lamb",
        currency: "$73.07",
        wallet: "400",
        createdAt: format(new Date(), "MMM dd"),
    },
    {
        name: "Marsden Terrell",
        currency: "$44.25",
        wallet: "700",
        createdAt: format(new Date(), "MMM dd"),
    },
    {
        name: "Marsden Terrell",
        currency: "$44.25",
        wallet: "700",
        createdAt: format(new Date(), "MMM dd"),
    },
    {
        name: "Francesca Lamb",
        currency: "$73.07",
        wallet: "400",
        createdAt: format(new Date(), "MMM dd"),
    },
    {
        name: "Marsden Terrell",
        currency: "$44.25",
        wallet: "700",
        createdAt: format(new Date(), "MMM dd"),
    },
];

export default function Chart() {
    const { isDarkMode } = useDarkMode();

    const colors = isDarkMode
        ? {
              currency: { stroke: "#4f46e5", fill: "#4f46e5" },
              wallet: { stroke: "#22c55e", fill: "#22c55e" },
              text: "#e5e7eb",
              background: "#18212f",
          }
        : {
              currency: { stroke: "#4f46e5", fill: "#c7d2fe" },
              wallet: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "#374151",
              background: "#fff",
          };

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    mb: 2,
                    backgroundColor: "transparent",
                    maxWidth: "95%",
                    height: "max-content",
                    boxShadow: "var(--shadow-md)",
                    p: "2rem",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <StyledChartTitle>Chart name</StyledChartTitle>
                <ResponsiveContainer height={300} width="100%">
                    {/* Give data to AreaChart Component */}
                    <AreaChart data={data}>
                        <XAxis
                            dataKey="createdAt"
                            tick={{ fill: colors.text }}
                            tickLine={{ stroke: colors.text }}
                        />
                        <YAxis
                            unit="$"
                            tick={{ fill: colors.text }}
                            tickLine={{ stroke: colors.text }}
                        />
                        <CartesianGrid strokeDasharray="4" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: colors.background,
                            }}
                        />
                        {/* Changes the tooltip styling */}
                        <Area
                            dataKey="currency"
                            type="monotone"
                            stroke={colors.currency?.stroke}
                            fill={colors.currency?.fill}
                            strokeWidth={2}
                            name="Currency"
                            unit="$"
                        />
                        <Area
                            dataKey="wallet"
                            type="monotone"
                            stroke={colors.wallet?.stroke}
                            fill={colors.wallet?.fill}
                            strokeWidth={2}
                            name="Wallet"
                            unit="$"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
}

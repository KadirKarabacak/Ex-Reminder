import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Sales } from "../Interfaces/User";
import { formatCurrency } from "../Utils/utils";

const StyledTitle = styled.h3`
    color: var(--color-green-lighter);
    align-self: center;
    margin-bottom: 0.9rem;
    border-bottom: 3px solid var(--color-grey-400);
    padding-bottom: 1rem;
`;

const StyledDescription = styled.h4`
    color: var(--color-grey-600);
    align-self: center;
    margin-bottom: 0.9rem;
`;

export default function AccountingDetails({ data }: { data: any }) {
    const { t } = useTranslation();

    const totalSoldItem =
        data &&
        data.reduce(
            (acc: number, sale: Sales) => (acc += +sale.saleItemAmount),
            0
        );
    const totalSalePrice =
        data &&
        data.reduce(
            (acc: number, sale: Sales) => (acc += sale.totalSalePrice),
            0
        );
    const companiesSoldTo =
        data &&
        [...new Set(data.map((sale: Sales) => sale.saleCompanyName))].join(
            ", "
        );

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
                    maxWidth: "100%",
                    height: "max-content",
                    boxShadow: "var(--shadow-md)",
                    p: "2rem",
                    display: "flex",
                    flexDirection: "column",
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
                        padding: "1rem 0 1rem 0",
                        color: "var(--color-grey-800)",
                        borderBottom: "3px solid var(--color-grey-500)",
                    }}
                >
                    {t(`Accounting Stats`)}
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                    <Grid item xs={6} md={4}>
                        <StyledTitle>{t("Total Sale")}</StyledTitle>
                        <StyledDescription>
                            {data?.length} {t("sale done")}
                        </StyledDescription>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <StyledTitle>{t("Total Sold Item")}</StyledTitle>
                        <StyledDescription>
                            {totalSoldItem} {t("items sold")}
                        </StyledDescription>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <StyledTitle>{t("Total Sale Price")}</StyledTitle>
                        <StyledDescription>
                            {formatCurrency(totalSalePrice)}
                        </StyledDescription>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <StyledTitle>{t("Companies sold to")}</StyledTitle>
                        <StyledDescription>{companiesSoldTo}</StyledDescription>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

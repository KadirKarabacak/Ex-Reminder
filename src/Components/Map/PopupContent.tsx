import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTitle = styled.span`
    font-size: 1.2rem;
    color: var(--color-green-lighter);
    font-weight: bold;
`;

const StyledDescription = styled.span`
    font-size: 1.1rem;
    color: var(--color-grey-800);
    text-transform: capitalize;
`;

export default function PopupContent({ company }: { company: any }) {
    const { t } = useTranslation();

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <StyledTitle>{t("Company Name")} | </StyledTitle>
                <StyledDescription>{company.companyName}</StyledDescription>
            </Grid>
            <Grid item xs={12}>
                <StyledTitle>{t("Phone Number")} | </StyledTitle>
                <StyledDescription>
                    {company.companyPhone || t("Not spesified")}
                </StyledDescription>
            </Grid>
            <Grid item xs={12} sx={{ mb: "0.8rem" }}>
                <StyledTitle>{t("Created At")} | </StyledTitle>
                <StyledDescription>{company.createdAt}</StyledDescription>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Link to={`/companies/${company.id}`}>
                    <Button
                        sx={{
                            backgroundColor: "var(--color-grey-800)",
                            color: "var(--color-grey-50)",
                            transition: "all .3s",
                            padding: "0.5rem 1rem",
                            fontSize: "0.9rem",
                            alignSelf: "center",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-700)",
                            },
                        }}
                    >
                        {t("Move to operations")}
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
}

import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Companies } from "../../Interfaces/User";

const StyledTitle = styled.span`
    font-size: 1.3rem;
    color: var(--color-green-lighter);
    font-weight: bold;
    margin-right: 0.5rem;
`;

const StyledDescription = styled.span`
    font-size: 1.2rem;
    color: var(--color-grey-800);
    text-transform: capitalize;
`;

export function PopupCompanyContent({ company }: { company: Companies }) {
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
            <Grid item xs={12}>
                <StyledTitle>{t("Created At")} | </StyledTitle>
                <StyledDescription>{company.createdAt}</StyledDescription>
            </Grid>
            <Grid item xs={12} sx={{ mb: "0.8rem" }}>
                <StyledTitle>{t("Company Address")} | </StyledTitle>
                <StyledDescription>{`${company.companyAddress.province} / ${company.companyAddress.district} / ${company.companyAddress.neighbourhood}`}</StyledDescription>
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

export function PopupClickedContent({ findAddress }: { findAddress: any }) {
    const { t } = useTranslation();
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <StyledTitle>{t("Province")}</StyledTitle>
                <StyledDescription>
                    {findAddress.city ||
                        findAddress.province ||
                        t("Not spesified")}
                </StyledDescription>
            </Grid>
            <Grid item xs={12}>
                <StyledTitle>{t("District")}</StyledTitle>
                <StyledDescription>
                    {findAddress.town || t("Not spesified")}
                </StyledDescription>
            </Grid>
            <Grid item xs={12}>
                <StyledTitle>{t("Neighbourhood")}</StyledTitle>
                <StyledDescription>
                    {findAddress.suburb || t("Not spesified")}
                </StyledDescription>
            </Grid>
            <Grid item xs={12}>
                <StyledTitle>{t("Road")}</StyledTitle>
                <StyledDescription>
                    {findAddress.road || t("Not spesified")}
                </StyledDescription>
            </Grid>
            <Grid item xs={12}>
                <StyledTitle>{t("Amenity")}</StyledTitle>
                <StyledDescription>
                    {findAddress.amenity || t("Not spesified")}
                </StyledDescription>
            </Grid>
            <Grid item xs={12}>
                <StyledTitle>{t("Post Code")}</StyledTitle>
                <StyledDescription>
                    {findAddress.postcode || t("Not spesified")}
                </StyledDescription>
            </Grid>
        </Grid>
    );
}

export function PopupLocationContent() {
    const { t } = useTranslation();

    return (
        <Grid container spacing={1}>
            <Grid
                item
                xs={12}
                sx={{
                    color: "var(--color-grey-800)",
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                }}
            >
                {t("You are here")} <ArrowDownwardIcon />
            </Grid>
            {/* <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid> */}
        </Grid>
    );
}

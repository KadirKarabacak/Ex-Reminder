import { Divider, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { auth } from "../../Api/firebase";
import { useGetAgreements } from "../../Api/companyController";

const StyledContainer = styled.div`
    width: 100%;
    padding: 1rem 2rem;
`;

const StyledTitle = styled.h3`
    color: var(--color-grey-800);
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.6rem;
`;

const StyledHeader = styled.h2`
    color: var(--color-green-new);
    font-size: 2.5rem;
    font-weight: bold;
`;

const StyledDescription = styled.p`
    color: var(--color-grey-600);
    font-size: 1.4rem;
`;

export default function OperationsBody({
    currentCompany,
}: {
    currentCompany: any;
}) {
    const { t } = useTranslation();
    const { data, isLoading } = useGetAgreements(currentCompany.id);
    console.log(data);

    return (
        <StyledContainer>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Divider
                        sx={{
                            borderColor: "var(--color-grey-200)",
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledHeader>{t("Company Information")}</StyledHeader>
                </Grid>
                <Grid item xs={4}>
                    <StyledTitle>{t("Company Name")}</StyledTitle>
                    <StyledDescription>
                        {currentCompany?.companyName || t("Not Spesified")}
                    </StyledDescription>
                </Grid>
                <Grid item xs={4}>
                    <StyledTitle>{t("Company Address")}</StyledTitle>
                    <StyledDescription>
                        {currentCompany?.companyAddress || t("Not Spesified")}
                    </StyledDescription>
                </Grid>
                <Grid item xs={4}>
                    <StyledTitle>{t("Company Email")}</StyledTitle>
                    <StyledDescription>
                        {currentCompany?.companyEmail || t("Not Spesified")}
                    </StyledDescription>
                </Grid>

                <Grid item xs={4}>
                    <StyledTitle>{t("Company Phone")}</StyledTitle>
                    <StyledDescription>
                        {currentCompany?.companyPhone || t("Not Spesified")}
                    </StyledDescription>
                </Grid>
                <Grid item xs={4}>
                    <StyledTitle>{t("Company Create Date")}</StyledTitle>
                    <StyledDescription>
                        {currentCompany?.createdAt || t("Not Spesified")}
                    </StyledDescription>
                </Grid>
                <Grid item xs={4}>
                    <StyledTitle>{t("Company Website")}</StyledTitle>
                    <StyledDescription>
                        {currentCompany?.companyWebsite || t("Not Spesified")}
                    </StyledDescription>
                </Grid>
                <Grid item xs={12}>
                    <Divider
                        sx={{
                            borderColor: "var(--color-grey-200)",
                            marginTop: "3rem",
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledHeader>{t("Manager Information")}</StyledHeader>
                </Grid>
                <Grid item xs={4}>
                    <StyledTitle>{t("Manager Name")}</StyledTitle>
                    <StyledDescription>
                        {currentCompany?.companyManager?.managerName ||
                            t("Not Spesified")}
                    </StyledDescription>
                </Grid>
                <Grid item xs={4}>
                    <StyledTitle>{t("Manager Phone")}</StyledTitle>
                    <StyledDescription>
                        {currentCompany?.companyManager?.managerPhone ||
                            t("Not Spesified")}
                    </StyledDescription>
                </Grid>
                <Grid item xs={4}>
                    <StyledTitle>{t("Manager Email")}</StyledTitle>
                    <StyledDescription>
                        {currentCompany?.companyManager?.managerEmail ||
                            t("Not Spesified")}
                    </StyledDescription>
                </Grid>
            </Grid>
        </StyledContainer>
    );
}

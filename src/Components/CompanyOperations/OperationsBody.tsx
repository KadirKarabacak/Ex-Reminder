import { Button, Divider, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useGetAgreements, useGetSales } from "../../Api/companyController";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { InfinitySpin } from "react-loader-spinner";
import Agreements from "./Agreements";
import CustomTable from "../Table";
import { SalesToolBar } from "../TableToolBars/SalesBar";
import LinkIcon from "@mui/icons-material/Link";

const StyledContainer = styled.div`
    width: 100%;
    padding: 1rem 2rem;
`;

const StyledTitle = styled.h3`
    color: var(--color-grey-900);
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.6rem;
`;

const StyledHeader = styled.h2`
    color: var(--color-grey-900);
    font-size: 2.5rem;
    font-weight: bold;
`;

const StyledDescription = styled.p`
    color: var(--color-grey-500);
    font-size: 1.4rem;
`;

const FullPage = styled.div`
    height: 65rem;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledLink = styled.a`
    text-decoration: underline;
    display: flex;
    align-items: center;
    gap: 5px;
`;

export default function OperationsBody({
    currentCompany,
}: {
    currentCompany: any;
}) {
    const { t } = useTranslation();
    const { data: agreements, isLoading } = useGetAgreements(currentCompany.id);
    const [isExpanded, setIsExpanded] = useState(false);
    const [items, setItems] = useState(agreements || []);
    const [searchText, setSearchText] = useState("");
    const { data: sales, isLoading: isLoadingSales } = useGetSales(
        currentCompany.id
    );

    useEffect(() => {
        setItems(agreements || []);
        setIsExpanded(true);
    }, [agreements]);

    if (isLoading || isLoadingSales)
        return (
            <FullPage>
                <InfinitySpin color="var(--color-grey-800)" />
            </FullPage>
        );

    return (
        <>
            <StyledContainer>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        width: "100%",
                        marginLeft: "0px",
                        marginBottom: "5rem",
                    }}
                >
                    <Grid item xs={12} sx={{ paddingLeft: "0px!important" }}>
                        <Divider
                            sx={{
                                borderColor: "var(--color-grey-300)",
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            paddingBottom: "1rem",
                            paddingLeft: "0px!important",
                        }}
                    >
                        <StyledHeader>
                            {t("Company & Manager Detail")}
                        </StyledHeader>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: "1px solid var(--color-grey-200)",
                            borderTopLeftRadius: "5px",
                            paddingBottom: "2rem",
                        }}
                    >
                        <StyledTitle>{t("Company Name")}</StyledTitle>
                        <StyledDescription>
                            {currentCompany?.companyName || t("Not spesified")}
                        </StyledDescription>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: "1px solid var(--color-grey-200)",
                            paddingBottom: "2rem",
                        }}
                    >
                        <StyledTitle>{t("Company Address")}</StyledTitle>
                        <StyledDescription>
                            {currentCompany?.companyAddress ||
                                t("Not spesified")}
                        </StyledDescription>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: "1px solid var(--color-grey-200)",
                            paddingBottom: "2rem",
                            borderTopRightRadius: "5px",
                        }}
                    >
                        <StyledTitle>{t("Company Email")}</StyledTitle>
                        <StyledDescription>
                            {currentCompany?.companyEmail || t("Not spesified")}
                        </StyledDescription>
                    </Grid>

                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: "1px solid var(--color-grey-200)",
                            paddingBottom: "2rem",
                        }}
                    >
                        <StyledTitle>{t("Company Phone")}</StyledTitle>
                        <StyledDescription>
                            {currentCompany?.companyPhone || t("Not spesified")}
                        </StyledDescription>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: "1px solid var(--color-grey-200)",
                            paddingBottom: "2rem",
                        }}
                    >
                        <StyledTitle>{t("Company Create Date")}</StyledTitle>
                        <StyledDescription>
                            {currentCompany?.createdAt || t("Not spesified")}
                        </StyledDescription>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: "1px solid var(--color-grey-200)",
                            paddingBottom: "2rem",
                        }}
                    >
                        <StyledTitle>{t("Company Website")}</StyledTitle>
                        <StyledDescription>
                            {(
                                <StyledLink
                                    href={`${
                                        currentCompany?.companyWebsite.startsWith(
                                            "https://"
                                        )
                                            ? ""
                                            : "https://"
                                    }${currentCompany?.companyWebsite}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {" "}
                                    <LinkIcon
                                        sx={{
                                            fontSize: "2rem",
                                            color: "var(--color-grey-500)",
                                        }}
                                    />
                                    {currentCompany?.companyWebsite}{" "}
                                </StyledLink>
                            ) || t("Not spesified")}
                        </StyledDescription>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: "1px solid var(--color-grey-200)",
                            paddingBottom: "2rem",

                            borderBottomLeftRadius: "5px",
                        }}
                    >
                        <StyledTitle>{t("Manager Name")}</StyledTitle>
                        <StyledDescription>
                            {currentCompany?.companyManager?.managerName ||
                                t("Not spesified")}
                        </StyledDescription>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: "1px solid var(--color-grey-200)",
                            paddingBottom: "2rem",
                        }}
                    >
                        <StyledTitle>{t("Manager Phone")}</StyledTitle>
                        <StyledDescription>
                            {currentCompany?.companyManager?.managerPhone ||
                                t("Not spesified")}
                        </StyledDescription>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: "1px solid var(--color-grey-200)",
                            paddingBottom: "2rem",

                            borderBottomRightRadius: "5px",
                        }}
                    >
                        <StyledTitle>{t("Manager Email")}</StyledTitle>
                        <StyledDescription>
                            {currentCompany?.companyManager?.managerEmail ||
                                t("Not spesified")}
                        </StyledDescription>
                    </Grid>
                </Grid>
                {sales?.length ? (
                    <Grid
                        container
                        spacing={2}
                        sx={{ width: "100%", marginLeft: "0px" }}
                    >
                        <CustomTable
                            searchText={searchText}
                            data={sales}
                            CustomToolbar={
                                <SalesToolBar
                                    currentCompany={currentCompany}
                                    searchText={searchText}
                                    setSearchText={setSearchText}
                                />
                            }
                        />
                    </Grid>
                ) : null}

                <Grid
                    container
                    spacing={2}
                    sx={{ width: "100%", marginLeft: "0px" }}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "flex",
                            marginTop: "1rem",
                            paddingLeft: "0px!important",
                        }}
                    >
                        <StyledHeader
                            style={{
                                marginRight: "auto",
                                marginBottom: "2rem",
                                color: "var(--color-green-lighter)",
                                fontSize: "2.4rem",
                                fontWeight: "bold",
                                borderBottom:
                                    "3px solid var(--color-green-new)",
                            }}
                        >
                            {t("Agreements")}
                        </StyledHeader>
                        <Button
                            disabled={!agreements?.length}
                            onClick={() => setIsExpanded(expanded => !expanded)}
                            sx={{
                                backgroundColor: "var(--color-grey-800)",
                                color: "var(--color-grey-50)",
                                transition: "all .3s",
                                padding: "1rem 2rem",
                                fontSize: "1.1rem",
                                alignSelf: "flex-start",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "var(--color-grey-700)",
                                    transform: "translateY(-2px)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                            }}
                            variant="contained"
                        >
                            {agreements &&
                            agreements?.length > 0 &&
                            isExpanded === false
                                ? t("Expand Agreements")
                                : agreements &&
                                  agreements?.length > 0 &&
                                  isExpanded === true
                                ? t("Collapse Agreements")
                                : t("No Agreements Available")}
                        </Button>
                    </Grid>

                    {/* {!items.length &&
                        t("There are no Agreements yet. Try to Add new one.")}
                    {items.length > 0 &&
                        !isExpanded &&
                        t("Expand Agreements to see them")} */}

                    {isExpanded && (
                        <Reorder.Group
                            style={{
                                display: "grid",
                                width: "100%",
                                gridTemplateColumns: "1fr",
                            }}
                            values={items}
                            onReorder={setItems}
                        >
                            {items?.map(agreement => {
                                return (
                                    <Reorder.Item
                                        value={agreement}
                                        key={agreement.agreementId}
                                    >
                                        <Agreements
                                            currentCompany={currentCompany}
                                            agreement={agreement}
                                        />
                                    </Reorder.Item>
                                );
                            })}
                        </Reorder.Group>
                    )}
                </Grid>
            </StyledContainer>
        </>
    );
}

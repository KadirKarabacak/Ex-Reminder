import { Grid } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useTranslation } from "react-i18next";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { WarehouseOutlined } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import HandshakeIcon from "@mui/icons-material/Handshake";
import styled from "styled-components";

const GridStyles = {
    display: "flex",
    gap: "0.6rem",
    justifyContent: "flex-start",
    alignItems: "center",
    "&:not(:last-child)": {
        borderBottom: "1px solid var(--color-grey-300)",
        paddingBottom: "5px",
    },
};

const StyledContainers = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const IconStyles = {
    fontSize: "2.3rem",
    borderRadius: "50%",
    color: "var(--color-grey-900)",
    backgroundColor: "var(--color-grey-300)",
    padding: "4px",
};

export default function NotificationsInfo() {
    const { t } = useTranslation();
    return (
        <Grid
            container
            sx={{ gap: "2rem", alignItems: "baseline", pr: "0.7rem" }}
        >
            <StyledContainers>
                <Grid item xs={12} sx={GridStyles}>
                    <GroupIcon sx={IconStyles} />
                    {t("Stuff with Employees")}
                </Grid>
                <Grid item xs={12} sx={GridStyles}>
                    <SettingsIcon sx={IconStyles} />
                    {t("Stuff with User")}
                </Grid>
                <Grid item xs={12} sx={GridStyles}>
                    <WarehouseOutlined sx={IconStyles} />
                    {t("Stuff with Warehouse")}
                </Grid>
                <Grid item xs={12} sx={GridStyles}>
                    <BusinessIcon sx={IconStyles} />
                    {t("Stuff with Companies")}
                </Grid>
                <Grid item xs={12} sx={GridStyles}>
                    <HandshakeIcon sx={IconStyles} />
                    {t("Stuff with Company Agreements")}
                </Grid>
                <Grid item xs={12} sx={GridStyles}>
                    <MoreTimeIcon sx={IconStyles} />
                    {t("Stuff with Company Negotiates")}
                </Grid>
                <Grid item xs={12} sx={GridStyles}>
                    <PostAddIcon sx={IconStyles} />
                    {t("Stuff with Sales")}
                </Grid>
            </StyledContainers>
            <StyledContainers style={{ height: "max-content" }}>
                <Grid item xs={12} sx={GridStyles}>
                    <CircleIcon sx={{ color: "#2e7d32", fontSize: "1.8rem" }} />
                    {t("Adding stuff")}
                </Grid>
                <Grid item xs={12} sx={GridStyles}>
                    <CircleIcon sx={{ color: "#ed6c02", fontSize: "1.8rem" }} />
                    {t("Updating stuff")}
                </Grid>
                <Grid item xs={12} sx={GridStyles}>
                    <CircleIcon sx={{ color: "#d32f2f", fontSize: "1.8rem" }} />
                    {t("Deleting stuff")}
                </Grid>
            </StyledContainers>
        </Grid>
    );
}

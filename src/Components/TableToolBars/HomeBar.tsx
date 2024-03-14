import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import FilterListIcon from "@mui/icons-material/FilterList";

const StyledIconButton = styled(IconButton)`
    font-size: 1.8rem;
    & svg {
        color: var(--color-grey-800);
    }
`;

export function HomeToolBar() {
    const { t } = useTranslation();
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                gap: "1rem",
            }}
        >
            <Typography
                sx={{
                    marginRight: "auto",
                    color: "var(--color-grey-800)",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                }}
                variant="subtitle1"
                component="div"
            >
                {t("Home Deneme")}
            </Typography>

            <Tooltip title="Filter list">
                <StyledIconButton>
                    <FilterListIcon />
                </StyledIconButton>
            </Tooltip>
        </Toolbar>
    );
}

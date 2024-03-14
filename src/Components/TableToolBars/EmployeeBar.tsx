import {
    Button,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import FilterListIcon from "@mui/icons-material/FilterList";

const StyledIconButton = styled(IconButton)`
    font-size: 1.8rem;
    & svg {
        color: var(--color-grey-800);
    }
`;

export function EmployeeToolBar() {
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
                {t("Employees")}
            </Typography>

            {/* EMPLOYEE BUTTON OPENS MODAL */}
            <Button
                sx={{
                    backgroundColor: "var(--color-grey-800)",
                    color: "var(--color-grey-50)",
                    transition: "all .3s",
                    padding: "1rem 2rem",
                    fontSize: "1rem",
                    alignSelf: "center",
                    fontWeight: "bold",
                    "&:hover": {
                        backgroundColor: "var(--color-grey-600)",
                        color: "var(--color-grey-100)",
                        transform: "translateY(-2px)",
                    },
                    "&:active": {
                        transform: "translateY(0)",
                    },
                    "&:disabled": {
                        backgroundColor: "var(--color-grey-500)",
                    },
                }}
                variant="contained"
            >
                {t("Add Employee")}
            </Button>
            <Tooltip title="Filter list">
                <StyledIconButton>
                    <FilterListIcon />
                </StyledIconButton>
            </Tooltip>
        </Toolbar>
    );
}

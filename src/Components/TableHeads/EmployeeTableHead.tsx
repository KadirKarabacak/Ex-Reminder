import {
    Box,
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import styled from "styled-components";
import { visuallyHidden } from "@mui/utils";
import { useTranslation } from "react-i18next";

interface Data {
    id: number;
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

type Order = "asc" | "desc";

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const StyledBox = styled(Box)`
    transition: all 0.3s;
    & + svg {
        color: var(--color-grey-800) !important;
    }

    &:active,
    &:hover,
    &:focus,
    &:focus-within {
        color: var(--color-grey-800) !important;
    }
`;

const TableCellStyles = {
    color: "var(--color-grey-800)",
    fontSize: "1.2rem",
    textAlign: "left",
    borderBottom: "1px solid var(--color-grey-200)",
};

const TableHeadStyles = {
    transition: "all .3s",
    ":hover": {
        color: "var(--color-grey-700)",
    },
    ":focus": {
        color: "var(--color-grey-700)",
    },
    ":focus-within": {
        color: "var(--color-grey-700)",
    },
    ":active": {
        color: "var(--color-grey-700)",
    },
};

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export function EmployeeTableHead(props: EnhancedTableProps) {
    const { t } = useTranslation();
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    const array = [
        t("Full Name"),
        t("Job Title"),
        t("Department"),
        t("Salary"),
        t("Hire Date"),
        t("Age"),
        t("Email"),
    ];

    return (
        <TableHead>
            <TableRow
                sx={{
                    borderColor: "var(--color-grey-300)",
                }}
            >
                <TableCell padding="checkbox" sx={TableCellStyles}>
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                        sx={{
                            color: "var(--color-grey-800)",
                        }}
                    />
                </TableCell>
                {array?.map((col, i) => (
                    <TableCell
                        key={i}
                        padding={
                            col === "Full Name" || col === "İsim"
                                ? "none"
                                : "normal"
                        }
                        sortDirection={orderBy === String(i) ? order : false}
                        sx={{
                            color: "var(--color-grey-800)",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            textAlign: "left",
                            borderBottom: "1px solid var(--color-grey-200)",
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === String(i)}
                            direction={orderBy === String(i) ? order : "asc"}
                            onClick={createSortHandler(col as keyof Data)}
                            sx={TableHeadStyles}
                        >
                            {col}
                            {orderBy === String(i) ? (
                                <StyledBox component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </StyledBox>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

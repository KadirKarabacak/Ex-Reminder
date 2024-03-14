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

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Dessert (100g serving)",
    },
    {
        id: "calories",
        numeric: true,
        disablePadding: false,
        label: "Calories",
    },
    {
        id: "fat",
        numeric: true,
        disablePadding: false,
        label: "Fat (g)",
    },
    {
        id: "carbs",
        numeric: true,
        disablePadding: false,
        label: "Carbs (g)",
    },
    {
        id: "protein",
        numeric: true,
        disablePadding: false,
        label: "Protein (g)",
    },
];

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
                {/* columns.map */}
                {headCells.map(headCell => (
                    <TableCell
                        // change with index
                        key={headCell.id}
                        // remove for start
                        padding={headCell.disablePadding ? "none" : "normal"}
                        // change with index
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            color: "var(--color-grey-800)",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            textAlign: "left",
                            borderBottom: "1px solid var(--color-grey-200)",
                        }}
                    >
                        <TableSortLabel
                            // change with index
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                            sx={TableHeadStyles}
                        >
                            {/* headCell */}
                            {headCell.label}
                            {/* change with index */}
                            {orderBy === headCell.id ? (
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

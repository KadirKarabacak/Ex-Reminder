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
import { EmployeeData, EnhancedTableProps } from "../../Interfaces/User";

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
    fontSize: "1.4rem",
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

// Change TableHead sort feat by translation
type TranslationMap = {
    [key: string]: keyof EmployeeData;
};

const translationMap: TranslationMap = {
    isim: "full_name",
    meslek: "job_title",
    departman: "department",
    maaş: "salary",
    giriş_tarihi: "hire_date",
    yaş: "age",
    email: "email",
};

export function EmployeeTableHead(props: EnhancedTableProps) {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;

    const tableHeads = [
        t("full_name"),
        t("job_title"),
        t("department"),
        t("salary"),
        t("hire_date"),
        t("age"),
        t("email"),
        "",
    ];

    function translateToTurkish(property: keyof EmployeeData) {
        return translationMap[property];
    }

    const createSortHandler =
        (property: keyof EmployeeData) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(
                event,
                currentLanguage === "tr-TR"
                    ? translateToTurkish(property)
                    : property
            );
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
                {tableHeads?.map((col, i) => {
                    //! Türkçeye geçtiğinde orderBy "full_name" gelirken col "isim" geliyor ve sortlama direction'u düzgün çalışmıyor
                    // console.log(orderBy);
                    // console.log(col);
                    return (
                        <TableCell
                            key={i}
                            padding={
                                col === "full_name" || col === "isim"
                                    ? "none"
                                    : "normal"
                            }
                            sortDirection={
                                orderBy === String(i) ? order : false
                            }
                            sx={{
                                color: "var(--color-grey-800)",
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                textAlign: "left",
                                borderBottom: "1px solid var(--color-grey-200)",
                            }}
                        >
                            <TableSortLabel
                                active={orderBy === col}
                                direction={orderBy === col ? order : "asc"}
                                onClick={createSortHandler(
                                    col as keyof EmployeeData
                                )}
                                sx={TableHeadStyles}
                            >
                                {(
                                    col.slice(0, 1).toUpperCase() +
                                    col.slice(1).toLowerCase()
                                ).replaceAll("_", " ")}
                                {orderBy === col ? (
                                    <StyledBox
                                        component="span"
                                        sx={visuallyHidden}
                                    >
                                        {order === "desc"
                                            ? "sorted_descending"
                                            : "sorted_ascending"}
                                    </StyledBox>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}

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
import { Companies, EnhancedTableProps } from "../../Interfaces/User";

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

const StyledTableSortLabel = styled(TableSortLabel)`
    &:disabled {
        color: var(--color-grey-800) !important;
        cursor: not-allowed;
        -webkit-text-fill-color: var(--color-grey-800) !important;
        background-color: transparent !important;
    }
`;

export function CompanyTableHead(props: EnhancedTableProps) {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;

    const tableHeadsEng = [
        { label: "Company Name", key: "companyName" },
        { label: "Company Address", key: "companyAddress" },
        { label: "Company Phone", key: "companyPhone" },
        { label: "Email", key: "companyEmail" },
        { label: "Manager Name", key: "managerName" },
        "",
    ];

    const tableHeadsTr = [
        { label: "Şirket İsmi", key: "companyName" },
        { label: "Şirket Adres", key: "companyAddress" },
        { label: "Şirket Numarası", key: "companyPhone" },
        { label: "Email", key: "companyEmail" },
        { label: "Yönetici İsmi", key: "managerName" },
        "",
    ];

    const createSortHandler =
        (property: keyof Companies) => (event: React.MouseEvent<unknown>) => {
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
                {currentLanguage === "en-EN"
                    ? tableHeadsEng?.map((col, i) => {
                          if (typeof col === "string") {
                              return (
                                  <TableCell key={i} sx={TableCellStyles}>
                                      {col}
                                  </TableCell>
                              );
                          } else {
                              return (
                                  <TableCell
                                      key={i}
                                      padding={
                                          col.label === "Company Name"
                                              ? "none"
                                              : "normal"
                                      }
                                      sortDirection={
                                          orderBy === col.key ? order : false
                                      }
                                      sx={{
                                          color: "var(--color-grey-800)",
                                          fontSize: "1.2rem",
                                          fontWeight: "bold",
                                          textAlign: "left",
                                          lineHeight: "1.1",
                                          minWidth: "10rem",
                                          borderBottom:
                                              "1px solid var(--color-grey-200)",
                                      }}
                                  >
                                      <StyledTableSortLabel
                                          disabled={col.key !== "companyName"}
                                          hideSortIcon={
                                              col.key !== "companyName"
                                          }
                                          active={orderBy === col.key}
                                          direction={
                                              orderBy === col.key
                                                  ? order
                                                  : "asc"
                                          }
                                          onClick={createSortHandler(
                                              col.key as keyof Companies
                                          )}
                                          sx={TableHeadStyles}
                                      >
                                          {col.label}
                                          {orderBy === col.key ? (
                                              <StyledBox
                                                  component="span"
                                                  sx={visuallyHidden}
                                              >
                                                  {order === "desc"
                                                      ? "sorted_descending"
                                                      : "sorted_ascending"}
                                              </StyledBox>
                                          ) : null}
                                      </StyledTableSortLabel>
                                  </TableCell>
                              );
                          }
                      })
                    : tableHeadsTr?.map((col, i) => {
                          if (typeof col === "string") {
                              return (
                                  <TableCell key={i} sx={TableCellStyles}>
                                      {col}
                                  </TableCell>
                              );
                          } else {
                              return (
                                  <TableCell
                                      key={i}
                                      padding={
                                          col.label === "Şirket İsmi"
                                              ? "none"
                                              : "normal"
                                      }
                                      sortDirection={
                                          orderBy === col.key ? order : false
                                      }
                                      sx={TableCellStyles}
                                  >
                                      <StyledTableSortLabel
                                          disabled={col.key !== "companyName"}
                                          active={orderBy === col.key}
                                          direction={
                                              orderBy === col.key
                                                  ? order
                                                  : "asc"
                                          }
                                          onClick={createSortHandler(
                                              col.key as keyof Companies
                                          )}
                                          sx={TableHeadStyles}
                                      >
                                          {col.label}
                                          {orderBy === col.key ? (
                                              <StyledBox
                                                  component="span"
                                                  sx={visuallyHidden}
                                              >
                                                  {order === "desc"
                                                      ? "sorted_descending"
                                                      : "sorted_ascending"}
                                              </StyledBox>
                                          ) : null}
                                      </StyledTableSortLabel>
                                  </TableCell>
                              );
                          }
                      })}
            </TableRow>
        </TableHead>
    );
}

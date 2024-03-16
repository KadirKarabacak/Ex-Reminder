import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { EmployeeTableHead } from "./TableHeads/EmployeeTableHead";
import styled from "styled-components";
import { formatCurrency } from "../Utils/utils";
import ButtonGroup from "./ButtonGroup";
import { useTranslation } from "react-i18next";

const TableCellStyles = {
    color: "var(--color-grey-800)",
    fontSize: "1.2rem",
    textAlign: "left",
    borderBottom: "1px solid var(--color-grey-200)",
};

export interface Data {
    age: string;
    department: string;
    email: string;
    employee_id: number;
    full_name: string;
    hire_date: string;
    job_title: string;
    salary: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const StyledParagraph = styled.span`
    font-size: 2rem;
    color: var(--color-grey-800);
    width: 100%;
    position: absolute;
    top: 33%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default function CustomTable({
    CustomToolbar,
    data,
    employee,
    ids,
}: {
    CustomToolbar: React.ReactNode;
    data: any;
    employee?: boolean;
    ids?: any[] | undefined;
}) {
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Data>("full_name");
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { t } = useTranslation();

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelected = data.map((n: object, i: string) => i);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(data || [], getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, data]
    );

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
            }}
        >
            {!visibleRows.length && (
                <StyledParagraph>
                    {t("There is no data to display")}
                </StyledParagraph>
            )}
            <Paper
                sx={{
                    width: "100%",
                    mb: 2,
                    backgroundColor: "transparent",
                    maxWidth: "95%",
                    height: "max-content",
                    boxShadow: "var(--shadow-md)",
                }}
            >
                {CustomToolbar}
                <TableContainer
                    sx={{
                        overflowY: "scroll",
                        height: "50rem",
                    }}
                >
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        {employee && (
                            <EmployeeTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data?.length || 0}
                            />
                        )}
                        <TableBody>
                            {visibleRows?.map((row, index) => {
                                const isItemSelected = isSelected(index);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        key={index}
                                        hover
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                    >
                                        <TableCell
                                            onClick={event =>
                                                handleClick(event, index)
                                            }
                                            padding="checkbox"
                                            sx={{
                                                ...TableCellStyles,
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{
                                                    "aria-labelledby": labelId,
                                                }}
                                                sx={{
                                                    color: "var(--color-grey-800)",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            sx={TableCellStyles}
                                        >
                                            {row.full_name || "-"}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={TableCellStyles}
                                        >
                                            {row.job_title || "-"}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={TableCellStyles}
                                        >
                                            {row.department || "-"}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={TableCellStyles}
                                        >
                                            {formatCurrency(
                                                row.salary as string
                                            ) || "-"}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={TableCellStyles}
                                        >
                                            {row.hire_date || "-"}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={TableCellStyles}
                                        >
                                            {row.age || "-"}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={TableCellStyles}
                                        >
                                            {row.email || "-"}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={TableCellStyles}
                                        >
                                            <ButtonGroup
                                                id={ids?.[index]}
                                                name={row.full_name}
                                                row={row}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={TableCellStyles}
                />
            </Paper>
        </Box>
    );
}

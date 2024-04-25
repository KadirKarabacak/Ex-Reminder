import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useLocation, useSearchParams } from "react-router-dom";
import {
    Companies,
    EmployeeData,
    NotificationTypes,
    Sales,
    Warehouses,
} from "../Interfaces/User";
import { EmployeeTableHead } from "./TableHeads/EmployeeTableHead";
import { WarehouseTableHead } from "./TableHeads/WarehouseTableHead";
import { CompanyTableHead } from "./TableHeads/CompanyTableHead";
import { SalesTableHead } from "./TableHeads/SalesTableHead";
import { AccountingTableHead } from "./TableHeads/AccountingTableHead";
import EmployeeTableRow from "./TableRows/EmployeeTableRow";
import WarehouseTableRow from "./TableRows/WarehouseTableRow";
import CompanyTableRow from "./TableRows/CompanyTableRow";
import SalesTableRow from "./TableRows/SalesTableRow";
import AccountingTableRow from "./TableRows/AccountingTableRow";
import { useDarkMode } from "../Contexts/DarkModeContext";
import NoDataTableRow from "./TableRows/NoDataTableRow";
import NoSearchDataTableRow from "./TableRows/NoSearchDataTableRow";
import { formatDate } from "../Utils/utils";
import { NotificationsTableHead } from "./TableHeads/NotificationsTableHead";
import NotificationsTableRow from "./TableRows/NotificationsTableRow";

const TableCellStyles = {
    color: "var(--color-grey-600)",
    fontSize: "1.2rem",
    textAlign: "left",
    borderBottom: "1px solid var(--color-grey-200)",
};

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

export default function CustomTable({
    CustomToolbar,
    data,
    searchText,
    selected,
    setSelected,
}: {
    CustomToolbar: React.ReactNode;
    data: any;
    searchText: string;
    selected: any;
    setSelected: any;
}) {
    const { pathname } = useLocation();
    const { isDarkMode } = useDarkMode();
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<
        keyof EmployeeData | keyof Warehouses | keyof Companies | keyof Sales
    >(
        pathname === "/employees"
            ? "full_name"
            : pathname === "/warehouse"
            ? "itemName"
            : pathname === "/accounting"
            ? "saleCompanyName"
            : "companyName"
    );
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filteredData, setFilteredData] = React.useState([]);
    const [searchParams] = useSearchParams();

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property:
            | keyof EmployeeData
            | keyof Warehouses
            | keyof Companies
            | keyof Sales
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    React.useEffect(() => {
        if (data) setFilteredData(data);
    }, [data]);

    React.useEffect(() => {
        if (
            searchParams.has("action", "not-readed") ||
            searchParams.has("action", "readed")
        )
            setFilteredData(data);
    }, [data, searchParams]);

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            if (pathname === "/accounting") {
                const newSelected = filteredData.map((n: any) => n.id);
                return setSelected(newSelected);
            }
            if (pathname === "/companies") {
                const newSelected = filteredData.map((n: Companies) => n.id);
                return setSelected(newSelected);
            }
            if (pathname.includes("/companies/")) {
                const newSelected = filteredData.map((n: Sales) => n.id);
                return setSelected(newSelected);
            }
            if (pathname === "/warehouse") {
                const newSelected = filteredData.map((n: Warehouses) => n.id);
                return setSelected(newSelected);
            }
            if (pathname === "/employees") {
                const newSelected = filteredData.map((n: EmployeeData) => n.id);
                return setSelected(newSelected);
            }
            if (pathname === "/notifications") {
                const newSelected = filteredData.map(
                    (n: NotificationTypes) => n.id
                );
                return setSelected(newSelected);
            }
        }
        setSelected([]);
    };

    // TODO: Configure this function with paths, use data id's instead of indexes
    const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
        // console.log(selected);
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

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: string | number) => selected.indexOf(id) !== -1;

    React.useEffect(() => {
        if (searchText && pathname === "/employees")
            setFilteredData(
                data.filter((el: any) =>
                    el.full_name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                )
            );
        if (searchText && pathname === "/warehouse")
            setFilteredData(
                data.filter((el: any) =>
                    el.itemName.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        if (searchText && pathname === "/companies")
            setFilteredData(
                data.filter((el: any) =>
                    el.companyName
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                )
            );
        if (searchText && pathname.includes("/companies/"))
            setFilteredData(
                data.filter((el: any) =>
                    el.saleCreatedAt
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                )
            );
        if (searchText && pathname === "/accounting")
            setFilteredData(
                data.filter((el: any) =>
                    el.saleCompanyName
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                )
            );
        if (searchText && pathname === "/notifications")
            setFilteredData(
                data.filter((el: any) =>
                    formatDate(new Date(el.createdAt.seconds * 1000)).includes(
                        searchText
                    )
                )
            );
        if (!searchText.length) setFilteredData(data);
    }, [searchText]);

    const visibleRows = React.useMemo(
        () =>
            stableSort(filteredData || [], getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, filteredData]
    );

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    mb: 2,
                    backgroundColor: "transparent",
                    height: "max-content",
                    boxShadow: isDarkMode
                        ? "var(--shadow-md)"
                        : "var(--shadow-lg)",
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
                        {pathname === "/employees" && (
                            <EmployeeTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredData?.length || 0}
                            />
                        )}
                        {pathname === "/warehouse" && (
                            <WarehouseTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredData?.length || 0}
                            />
                        )}
                        {pathname === "/companies" && (
                            <CompanyTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredData?.length || 0}
                            />
                        )}
                        {pathname.includes("/companies/") && (
                            <SalesTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredData?.length || 0}
                            />
                        )}
                        {pathname === "/accounting" && (
                            <AccountingTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredData?.length || 0}
                            />
                        )}
                        {pathname === "/notifications" && (
                            <NotificationsTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredData?.length || 0}
                            />
                        )}
                        <TableBody>
                            {!visibleRows.length && !searchText && (
                                <NoDataTableRow />
                            )}
                            {!visibleRows.length && searchText && (
                                <NoSearchDataTableRow />
                            )}
                            {pathname === "/employees" &&
                                visibleRows?.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <EmployeeTableRow
                                            isItemSelected={isItemSelected}
                                            handleClick={handleClick}
                                            key={index}
                                            labelId={labelId}
                                            row={row}
                                        />
                                    );
                                })}
                            {pathname === "/warehouse" &&
                                visibleRows?.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <WarehouseTableRow
                                            isItemSelected={isItemSelected}
                                            handleClick={handleClick}
                                            key={index}
                                            labelId={labelId}
                                            row={row}
                                        />
                                    );
                                })}
                            {pathname === "/companies" &&
                                visibleRows?.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <CompanyTableRow
                                            isItemSelected={isItemSelected}
                                            handleClick={handleClick}
                                            key={index}
                                            labelId={labelId}
                                            row={row}
                                        />
                                    );
                                })}
                            {pathname.includes("/companies/") &&
                                visibleRows?.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <SalesTableRow
                                            isItemSelected={isItemSelected}
                                            handleClick={handleClick}
                                            key={index}
                                            labelId={labelId}
                                            row={row}
                                        />
                                    );
                                })}
                            {pathname === "/accounting" &&
                                visibleRows?.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <AccountingTableRow
                                            isItemSelected={isItemSelected}
                                            handleClick={handleClick}
                                            key={index}
                                            labelId={labelId}
                                            row={row}
                                        />
                                    );
                                })}
                            {pathname === "/notifications" &&
                                visibleRows?.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <NotificationsTableRow
                                            isItemSelected={isItemSelected}
                                            handleClick={handleClick}
                                            key={index}
                                            labelId={labelId}
                                            row={row}
                                        />
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={filteredData?.length || 0}
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

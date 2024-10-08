import { Checkbox, TableCell, TableRow } from "@mui/material";
import { formatCurrency, formatTimestampToDate } from "../../Utils/utils";
import ButtonGroup from "../ButtonGroup";
import { TableRowTypes } from "../../Interfaces/User";

const TableCellStyles = {
    color: "var(--color-grey-600)",
    fontSize: "1.2rem",
    textAlign: "left",
    borderBottom: "1px solid var(--color-grey-200)",
};

export default function EmployeeTableRow({
    isItemSelected,
    handleClick,
    // index,
    labelId,
    row,
}: TableRowTypes) {
    return (
        <TableRow
            hover
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
        >
            <TableCell
                onClick={event => handleClick(event, row.id)}
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
            <TableCell align="right" sx={TableCellStyles}>
                {row.job_title || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.department || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {formatCurrency(row.salary as string) || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {formatTimestampToDate(row.hire_date) || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.age || "-"}
            </TableCell>
            <TableCell
                align="right"
                sx={TableCellStyles}
                className="button-group-employees"
            >
                <ButtonGroup tableName="employee" row={row} />
            </TableCell>
        </TableRow>
    );
}

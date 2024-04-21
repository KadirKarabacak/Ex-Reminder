import { Checkbox, TableCell, TableRow } from "@mui/material";
import ButtonGroup from "../ButtonGroup";
import { TableRowTypes } from "../../Interfaces/User";

const TableCellStyles = {
    color: "var(--color-grey-600)",
    fontSize: "1.2rem",
    textAlign: "left",
    borderBottom: "1px solid var(--color-grey-200)",
};

export default function CompanyTableRow({
    isItemSelected,
    handleClick,
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
                {row.companyName || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {`${row.companyAddress.province} / ${
                    row.companyAddress.district
                } / ${row.companyAddress.neighbourhood || ""}` || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.companyPhone || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.companyEmail || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.companyManager?.managerName || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                <ButtonGroup tableName="company" row={row} />
            </TableCell>
        </TableRow>
    );
}

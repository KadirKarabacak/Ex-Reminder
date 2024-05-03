import { Checkbox, TableCell, TableRow } from "@mui/material";
import ButtonGroup from "../ButtonGroup";
import { TableRowTypes } from "../../Interfaces/User";
import { formatCurrency } from "../../Utils/utils";

const TableCellStyles = {
    color: "var(--color-grey-600)",
    fontSize: "1.2rem",
    textAlign: "left",
    borderBottom: "1px solid var(--color-grey-200)",
};

export default function WarehouseTableRow({
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
                {row.itemName || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.itemAmount || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {formatCurrency(row.itemSalePrice) || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {formatCurrency(row.itemPurchasePrice) || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.itemDescription || "-"}
            </TableCell>
            <TableCell
                align="right"
                sx={TableCellStyles}
                className="button-group-warehouses"
            >
                <ButtonGroup tableName="warehouse" row={row} />
            </TableCell>
        </TableRow>
    );
}

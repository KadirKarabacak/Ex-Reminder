import { Checkbox, TableCell, TableRow } from "@mui/material";
import ButtonGroup from "../ButtonGroup";

const TableCellStyles = {
    color: "var(--color-grey-600)",
    fontSize: "1.2rem",
    textAlign: "left",
    borderBottom: "1px solid var(--color-grey-200)",
};

interface WarehouseTableRowTypes {
    isItemSelected: any;
    handleClick: any;
    index: number;
    labelId: string;
    row: any;
}

export default function WarehouseTableRow({
    isItemSelected,
    handleClick,
    index,
    labelId,
    row,
}: WarehouseTableRowTypes) {
    return (
        <TableRow
            hover
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
        >
            <TableCell
                onClick={event => handleClick(event, index)}
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
                {row.itemSalePrice || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.itemPurchasePrice || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.itemDescription || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                <ButtonGroup tableName="warehouse" row={row} />
            </TableCell>
        </TableRow>
    );
}

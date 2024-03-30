import { Checkbox, TableCell, TableRow } from "@mui/material";
import ButtonGroup from "../ButtonGroup";
import { TableRowTypes } from "../../Interfaces/User";
import { useGetWarehouse } from "../../Api/warehouseController";
import { formatCurrency } from "../../Utils/utils";

const TableCellStyles = {
    color: "var(--color-grey-600)",
    fontSize: "1.2rem",
    textAlign: "left",
    borderBottom: "1px solid var(--color-grey-200)",
};

export default function SalesTableRow({
    isItemSelected,
    handleClick,
    index,
    labelId,
    row,
}: TableRowTypes) {
    const { data: items } = useGetWarehouse();
    const itemById = items?.find(item => item.id === row.saleItemId);

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
            <TableCell align="right" sx={TableCellStyles}>
                {row.saleCreatedAt || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {itemById?.itemName || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.saleItemAmount || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {formatCurrency(row.saleItemPrice) || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.saleDescription || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                <ButtonGroup tableName="sales" row={row} />
            </TableCell>
        </TableRow>
    );
}

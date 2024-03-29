import { Checkbox, TableCell, TableRow } from "@mui/material";
import ButtonGroup from "../ButtonGroup";
import { TableRowTypes } from "../../Interfaces/User";
import { useGetCompanies } from "../../Api/companyController";
import { useGetWarehouse } from "../../Api/warehouseController";

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
    const { data: companies } = useGetCompanies();
    const { data: items } = useGetWarehouse();

    const companyNameById = companies?.find(
        company => company.id === row.saleCompanyId
    );

    const itemNameById = items?.find(item => item.id === row.saleItemId);

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
            {/* <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                sx={TableCellStyles}
            >
                {companyNameById?.companyName || "-"}
            </TableCell> */}
            <TableCell align="right" sx={TableCellStyles}>
                {row.saleCreatedAt || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {itemNameById?.itemName || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.saleItemAmount || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.saleItemPrice || "-"}
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

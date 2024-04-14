import { Checkbox, Chip, TableCell, TableRow } from "@mui/material";
import ButtonGroup from "../ButtonGroup";
import { TableRowTypes } from "../../Interfaces/User";
import { formatCurrency } from "../../Utils/utils";
import { useTranslation } from "react-i18next";

const TableCellStyles = {
    color: "var(--color-grey-600)",
    fontSize: "1.2rem",
    textAlign: "left",
    borderBottom: "1px solid var(--color-grey-200)",
};

export default function AccountingTableRow({
    isItemSelected,
    handleClick,
    index,
    labelId,
    row,
}: TableRowTypes) {
    const { t } = useTranslation();
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
                {row?.saleCompanyName || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.saleCreatedAt || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                <Chip
                    sx={{ fontSize: "1.2rem" }}
                    label={row?.saleItemName || "-"}
                    color="success"
                />
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {formatCurrency(row.saleItemPrice) || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                {row.saleGuarantee ? t("Yes") : t("No") || "-"}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                <ButtonGroup tableName="accounting" row={row} />
            </TableCell>
        </TableRow>
    );
}

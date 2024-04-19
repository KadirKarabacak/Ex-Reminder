import { TableCell, TableRow } from "@mui/material";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useTranslation } from "react-i18next";

export default function NoDataTableRow() {
    const { t } = useTranslation();
    return (
        <TableRow
            sx={{
                width: "100%",
                textAlign: "center",
            }}
        >
            <TableCell
                colSpan={10}
                align="center"
                sx={{
                    borderBottom: "none",
                    fontSize: "2rem",
                    color: "var(--color-grey-800)",
                    paddingTop: "19rem",
                }}
            >
                {t("There is no data to display")}{" "}
                <NotInterestedIcon sx={{ marginRight: "0.5rem" }} />{" "}
            </TableCell>
        </TableRow>
    );
}

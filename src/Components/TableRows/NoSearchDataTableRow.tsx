import { TableCell, TableRow } from "@mui/material";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useTranslation } from "react-i18next";

export default function NoSearchDataTableRow() {
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
                {t("No matching results found for your search")}{" "}
                <NotInterestedIcon />
            </TableCell>
        </TableRow>
    );
}

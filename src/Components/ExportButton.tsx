import React from "react";
import { Button, Grow, Menu, MenuItem } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
import myFontForPdf from "./myFontForPdf";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { generateExportButtonClassName } from "../Utils/utils";

type Props = {
    title: string;
    isInSmallContainer?: boolean;
    pdf: {
        head: string[][];
        body: any[];
    };
    excel: {
        headers: {
            label: string;
            key: string;
        }[];
        data: any[];
    };
};

function ExportButton(props: Props) {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const open = Boolean(anchorEl);
    const { pathname } = useLocation();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // PDF EXPORTING
    const exportPdf = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const margin = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.addFileToVFS("Amiri-Regular.ttf", myFontForPdf());
        doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
        doc.setFont("Amiri");
        doc.setFontSize(15);

        const { title } = props;

        doc.text(title, margin, 40);
        autoTable(doc, {
            head: props.pdf.head as any,
            body: props.pdf.body,
            styles: {
                font: "Amiri",
                fontStyle: "normal",
            },
        });
        doc.save(`${props.title}.pdf`);
    };

    return (
        <>
            <Button
                className={generateExportButtonClassName(pathname)}
                onClick={handleClick}
                variant="contained"
                fullWidth={props.isInSmallContainer}
                endIcon={
                    !open ? (
                        <ExpandMore sx={{ color: "var(--color-grey-100)" }} />
                    ) : (
                        <ExpandLess sx={{ color: "var(--color-grey-100)" }} />
                    )
                }
                sx={{
                    padding: "1rem 2rem",
                    fontSize: "1.1rem",
                    color: "var(--color-grey-100)",
                    backgroundColor: "var(--color-grey-800)",
                    transition: "all .3s",
                    ":hover": {
                        backgroundColor: "var(--color-grey-600)",
                        transform: "translateY(-2px)",
                    },
                    "@media (max-width: 1100px)": {
                        padding: "1rem 1.1rem",
                    },
                }}
            >
                {t("Export as")}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                TransitionComponent={Grow}
            >
                <MenuItem>
                    <Button
                        startIcon={
                            <ArrowCircleDownIcon
                                sx={{ color: "var(--color-brand-800)" }}
                            />
                        }
                        variant="outlined"
                        onClick={() => {
                            exportPdf();
                            handleClose();
                            toast.success(t("PDF was successfully downloaded"));
                        }}
                        sx={{
                            color: "var(--color-brand-800)",
                            borderColor: "var(--color-brand-500)",
                            minWidth: "100px",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            ":hover": {
                                borderColor: "var(--color-brand-500)",
                            },
                        }}
                    >
                        PDF
                    </Button>
                </MenuItem>
                <MenuItem>
                    <CSVLink
                        data={props.excel.data}
                        headers={props.excel.headers}
                        separator=";"
                        filename={`${props.title}.csv`}
                    >
                        <Button
                            startIcon={
                                <ArrowCircleDownIcon
                                    sx={{ color: "var(--color-brand-00)" }}
                                />
                            }
                            variant="outlined"
                            onClick={() => {
                                handleClose();
                                toast.success(
                                    t("Excel table was successfully downloaded")
                                );
                            }}
                            sx={{
                                color: "#4CAF50",
                                borderColor: "#4CAF50",
                                minWidth: "100px",
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                ":hover": {
                                    borderColor: "#4CAF50",
                                },
                            }}
                        >
                            Excel
                        </Button>
                    </CSVLink>
                </MenuItem>
            </Menu>
        </>
    );
}

export default ExportButton;

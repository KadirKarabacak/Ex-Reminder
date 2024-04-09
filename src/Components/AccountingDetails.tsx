import { Paper } from "@mui/material";
import { Box } from "@mui/system";

export default function AccountingDetails({ data }: { data: any }) {
    console.log(data);
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    mb: 2,
                    backgroundColor: "transparent",
                    maxWidth: "100%",
                    height: "max-content",
                    boxShadow: "var(--shadow-md)",
                    p: "2rem",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                Accounting Details
            </Paper>
        </Box>
    );
}

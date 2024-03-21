import {
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    Grid,
    Modal,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { formatCurrency, parseCurrency } from "../../Utils/utils";
import { EditEmployeeModalTypes } from "../../Interfaces/User";
import ExportButton from "../ExportButton";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 45%;
    background-color: var(--color-grey-100);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 4rem;
    border-radius: 5px;
`;
const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    justify-content: center;
`;

const StyledTitle = styled.h4`
    color: var(--color-brand-500);
    align-self: flex-start;
    margin-bottom: 0.9rem;
`;

const StyledDescription = styled.h5`
    color: var(--color-grey-600);
    align-self: flex-start;
    margin-bottom: 0.9rem;
`;

const StyledSpan = styled.span`
    color: ${props => props.color};
`;

export default function DetailItemModal({
    open,
    handleClose,
    row,
}: EditEmployeeModalTypes) {
    const { t } = useTranslation();

    function onCloseModal() {
        handleClose(open);
    }

    const data = [{ ...row }];

    const ExcelData = data.map(value => {
        return {
            full_name: value?.full_name,
            job_title: value?.job_title,
            department: value?.department,
            email: value?.email,
            age: value?.age,
            salary: value?.salary,
            hire_date: value?.hire_date,
        };
    });

    const PdfBody = data.map(value => {
        return [
            value?.full_name,
            value?.job_title,
            value?.department,
            value?.email,
            value?.age,
            value?.salary,
            value?.hire_date,
        ];
    });
    console.log(row.itemPurhcasePrice);
    // const isProfit =
    //     row.itemPurhcasePrice !== undefined && row.itemSalePrice !== undefined;

    //! IF THERE IS NO itemSalePrice || itemPurchasePrice it calcualtes NaN
    const profit =
        (parseCurrency(row.itemSalePrice) -
            parseCurrency(row.itemPurchasePrice)) *
        (row.itemAmount || 1);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onCloseModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <StyledBox>
                    <Typography
                        id="transition-modal-title"
                        variant="h4"
                        component="h1"
                        sx={{ fontWeight: "bold", letterSpacing: "0.80px" }}
                    >
                        {t(`Item Detail`) + " " + row.itemName}
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: "2rem" }}>
                        <Grid item xs={4}>
                            <StyledTitle>{t("Name of item")}</StyledTitle>

                            <StyledDescription>
                                {row.itemName || t("Not spesified")}
                            </StyledDescription>
                            <Divider
                                orientation="vertical"
                                variant="fullWidth"
                                flexItem
                                sx={{
                                    borderColor: "var(--color-grey-300)",
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTitle>{t("Item amount")}</StyledTitle>
                            <StyledDescription>
                                {row.itemAmount || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTitle>{t("Sale price")}</StyledTitle>
                            <StyledDescription>
                                {row.itemSalePrice || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider
                                sx={{
                                    borderColor: "var(--color-grey-200)",
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTitle>{t("Purchase price")}</StyledTitle>
                            <StyledDescription>
                                {row.itemPurchasePrice || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTitle>{t("Profit")}</StyledTitle>
                            <StyledDescription>
                                {(
                                    <StyledSpan
                                        color={
                                            profit > 0 ? "#1F994D" : "#CA1212"
                                        }
                                    >
                                        {" "}
                                        {formatCurrency(profit)}
                                    </StyledSpan>
                                ) || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledTitle>Created at</StyledTitle>
                            <StyledDescription>
                                {row.createdAt || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider
                                sx={{
                                    borderColor: "var(--color-grey-200)",
                                }}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <StyledTitle>{t("Item description")}</StyledTitle>
                            <StyledDescription>
                                {row.itemDescription || t("Not spesified")}
                            </StyledDescription>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider
                                sx={{
                                    borderColor: "var(--color-grey-200)",
                                }}
                            />
                        </Grid>
                    </Grid>

                    <StyledButtonContainer>
                        <ExportButton
                            title={t("Employee Details")}
                            excel={{
                                headers: [
                                    {
                                        label: t("Full Name"),
                                        key: "full_name",
                                    },
                                    {
                                        label: t("Job Title"),
                                        key: "job_title",
                                    },
                                    {
                                        label: t("Department"),
                                        key: "department",
                                    },
                                    {
                                        label: t("Email"),
                                        key: "email",
                                    },
                                    {
                                        label: t("Age"),
                                        key: "age",
                                    },
                                    {
                                        label: t("Salary"),
                                        key: "salary",
                                    },
                                    {
                                        label: t("Hire Date"),
                                        key: "hire_date",
                                    },
                                ],
                                data: ExcelData,
                            }}
                            pdf={{
                                head: [
                                    [
                                        t("Full Name"),
                                        t("Job Title"),
                                        t("Department"),
                                        t("Email"),
                                        t("Age"),
                                        t("Salary"),
                                        t("Hire Date"),
                                    ],
                                ],
                                body: PdfBody,
                            }}
                        />{" "}
                        <Button
                            onClick={onCloseModal}
                            sx={{
                                color: "var(--color-grey-800)",
                                transition: "all .3s",
                                padding: "1rem 3rem",
                                fontSize: "1.1rem",
                                border: "1px solid var(--color-grey-500)",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    transform: "translateY(-2px)",
                                    border: "1px solid var(--color-grey-800)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                            }}
                            variant="outlined"
                        >
                            {t("Close")}
                        </Button>
                    </StyledButtonContainer>
                </StyledBox>
            </Fade>
        </Modal>
    );
}

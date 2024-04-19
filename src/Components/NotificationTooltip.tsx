import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { formatCurrency, formatDateAndTime } from "../Utils/utils";

export default function NotificationTooltip({ data }: { data: any }) {
    const { t } = useTranslation();
    if (!data) return;
    const { event } = data;

    function createToolTipContent(event: string) {
        //: Negotiates
        if (event === "Add Negotiate")
            return (
                <Grid container spacing={2} sx={{ width: "35rem" }}>
                    <Grid item xs={12}>
                        {t("Negotiate Company")}: {data.contentObj.companyName}
                    </Grid>
                    <Grid item xs={12}>
                        {t("Negotiate Date & Time")}:{" "}
                        {formatDateAndTime(
                            data.contentObj.negotiateDateAndTime.seconds * 1000
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {t("Negotiate Content")}:{" "}
                        {data.contentObj.negotiateContent}
                    </Grid>
                </Grid>
            );

        //: Employees
        if (
            event === "Add Employee" ||
            event === "Delete Employee" ||
            event === "Update Employee"
        )
            return (
                <Grid container spacing={2} sx={{ width: "35rem" }}>
                    <Grid item xs={12}>
                        {t("Full Name")}: {data.contentObj.full_name}
                    </Grid>
                    <Grid item xs={12}>
                        {t("Job Title")}: {data.contentObj.job_title}
                    </Grid>
                    <Grid item xs={12}>
                        {t("Hire Date")}: {data.contentObj.hire_date}
                    </Grid>
                    <Grid item xs={12}>
                        {t("Department")}: {data.contentObj.department}
                    </Grid>
                    {data.contentObj.age && (
                        <Grid item xs={12}>
                            {t("Age")}: {data.contentObj.age}
                        </Grid>
                    )}
                    {data.contentObj.salary && (
                        <Grid item xs={12}>
                            {t("Salary")}:{" "}
                            {formatCurrency(data.contentObj.salary)}
                        </Grid>
                    )}
                </Grid>
            );

        //: Companies
        if (
            event === "Add Company" ||
            event === "Delete Company" ||
            event === "Update Company"
        )
            return (
                <Grid container spacing={2} sx={{ width: "35rem" }}>
                    <Grid item xs={12}>
                        {t("Company Name")}: {data.contentObj.companyName}
                    </Grid>
                    {data.contentObj.companyManager.managerName && (
                        <Grid item xs={12}>
                            {t("Manager Name")}:{" "}
                            {data.contentObj.companyManager.managerName}
                        </Grid>
                    )}
                    {data.contentObj.companyPhone && (
                        <Grid item xs={12}>
                            {t("Company Phone")}: {data.contentObj.companyPhone}
                        </Grid>
                    )}
                    {data.contentObj.companyEmail && (
                        <Grid item xs={12}>
                            {t("Email")}: {data.contentObj.companyEmail}
                        </Grid>
                    )}
                    {data.contentObj.companyAddress.province && (
                        <Grid item xs={12}>
                            {t("Company Address")}:{" "}
                            {`${data.contentObj.companyAddress.province} / ${data.contentObj.companyAddress.district} / ${data.contentObj.companyAddress.neighbourhood}`}
                        </Grid>
                    )}
                </Grid>
            );

        //: Warehouses
        if (
            event === "Add Item" ||
            event === "Delete Item" ||
            event === "Update Item"
        )
            return (
                <Grid container spacing={2} sx={{ width: "35rem" }}>
                    <Grid item xs={12}>
                        {t("Item Name")}: {data.contentObj.itemName}
                    </Grid>

                    <Grid item xs={12}>
                        {t("Item Sale Price")}:{" "}
                        {formatCurrency(data.contentObj.itemSalePrice)}
                    </Grid>
                    <Grid item xs={12}>
                        {t("Item Amount")}: {data.contentObj.itemAmount}
                    </Grid>
                    {data.contentObj.itemPurchasePrice ? (
                        <Grid item xs={12}>
                            {t("Item Purchase Price")}:{" "}
                            {formatCurrency(data.contentObj.itemPurchasePrice)}
                        </Grid>
                    ) : null}
                    {data.contentObj.itemDescription ? (
                        <Grid item xs={12}>
                            {t("Item Description")}:{" "}
                            {data.contentObj.itemDescription}
                        </Grid>
                    ) : null}
                </Grid>
            );

        //: Sales
        if (event === "Add Sale" || event === "Delete Sale")
            return (
                <Grid container spacing={2} sx={{ width: "35rem" }}>
                    <Grid item xs={12}>
                        {t("Sold Company")}:{" "}
                        {event === "Add Sale"
                            ? data.contentObj.sale.saleCompanyName
                            : data.contentObj.saleCompanyName}
                    </Grid>

                    <Grid item xs={12}>
                        {t("Sold Item Name")}:{" "}
                        {event === "Add Sale"
                            ? data.contentObj.sale.saleItemName
                            : data.contentObj.saleItemName}
                    </Grid>
                    <Grid item xs={12}>
                        {t("Sold Item Amount")}:{" "}
                        {event === "Add Sale"
                            ? data.contentObj.sale.saleItemAmount
                            : data.contentObj.saleItemAmount}
                    </Grid>
                    <Grid item xs={12}>
                        {t("Total Sale Price")}:{" "}
                        {event === "Add Sale"
                            ? formatCurrency(
                                  data.contentObj.sale.totalSalePrice
                              )
                            : formatCurrency(data.contentObj.totalSalePrice)}
                    </Grid>
                </Grid>
            );

        //! Users
        if (event === "Update User Email" || event === "Update User Password")
            return (
                <Grid container spacing={2} sx={{ width: "35rem" }}>
                    <Grid item xs={12}>
                        {t("User Name")}: {data.contentObj.displayName}
                    </Grid>
                    {data.contentObj.email && (
                        <Grid item xs={12}>
                            {t("Email")}: {data.contentObj.email}
                        </Grid>
                    )}
                    {data.contentObj.password && (
                        <Grid item xs={12}>
                            {t("Password")}: {data.contentObj.password}
                        </Grid>
                    )}
                </Grid>
            );

        //! Agreements
        if (
            event === "Add Agreement" ||
            event === "Update Agreement" ||
            event === "Delete Agreement"
        )
            return (
                <Grid container spacing={2} sx={{ width: "35rem" }}>
                    <Grid item xs={12}>
                        {t("Agreement Content")}:{" "}
                        {data.contentObj.agreementContent}
                    </Grid>
                    <Grid item xs={12}>
                        {t("Agreement Start & End Date")}:{" "}
                        {data.contentObj.agreementStartDate +
                            " - " +
                            data.contentObj.agreementEndDate}
                    </Grid>
                    {data.contentObj.agreementBudget && (
                        <Grid item xs={12}>
                            {t("Agreement Budget")}:{" "}
                            {data.contentObj.agreementBudget}
                        </Grid>
                    )}
                    {data.contentObj.agreementParties && (
                        <Grid item xs={12}>
                            {t("Agreement Parties")}:{" "}
                            {data.contentObj.agreementParties}
                        </Grid>
                    )}
                </Grid>
            );
    }
    return <>{createToolTipContent(event)}</>;
}

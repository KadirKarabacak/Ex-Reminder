import { Chip, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
    formatCurrency,
    formatDateAndTime,
    formatTimestampToDate,
} from "../Utils/utils";
import { NotificationTypes } from "../Interfaces/User";

const ChipStyles = {
    fontSize: "1.1rem",
    marginRight: "7px",
    minWidth: "8rem",
    fontWeight: "500",
};

export default function NotificationTooltip({
    data,
}: {
    data: NotificationTypes;
}) {
    const { t } = useTranslation();
    if (!data) return;
    const { event } = data;

    function createToolTipContent(event: string) {
        //: Negotiates
        if (event === "Add Negotiate")
            return (
                <Grid container spacing={2} sx={{ width: "35rem" }}>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Negotiate Company")}
                            color="info"
                        />
                        {data.contentObj.companyName}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Negotiate Date & Time")}
                            color="info"
                        />
                        {formatDateAndTime(
                            data.contentObj.negotiateDateAndTime.seconds * 1000
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Negotiate Content")}
                            color="info"
                        />
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
                <Grid container spacing={1.5} sx={{ width: "35rem" }}>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Full Name")}
                            color="info"
                        />
                        {data.contentObj.full_name}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Job Title")}
                            color="info"
                        />
                        {data.contentObj.job_title}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Hire Date")}
                            color="info"
                        />
                        {formatTimestampToDate(data.contentObj.hire_date)}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Department")}
                            color="info"
                        />
                        {data.contentObj.department}
                    </Grid>
                    {data.contentObj.email && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Email")}
                                color="info"
                            />
                            {data.contentObj.email}
                        </Grid>
                    )}
                    {data.contentObj.age && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Age")}
                                color="info"
                            />
                            {data.contentObj.age}
                        </Grid>
                    )}
                    {data.contentObj.salary && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Salary")}
                                color="info"
                            />
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
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Company Name")}
                            color="info"
                        />
                        {data.contentObj.companyName}
                    </Grid>
                    {data.contentObj.companyManager.managerName && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Manager Name")}
                                color="info"
                            />
                            {data.contentObj.companyManager.managerName}
                        </Grid>
                    )}
                    {data.contentObj.companyPhone && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Company Phone")}
                                color="info"
                            />
                            {data.contentObj.companyPhone}
                        </Grid>
                    )}
                    {data.contentObj.companyEmail && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Company Email")}
                                color="info"
                            />
                            {data.contentObj.companyEmail}
                        </Grid>
                    )}
                    {data.contentObj.companyAddress.province && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Company Address")}
                                color="info"
                            />
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
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Item Name")}
                            color="info"
                        />
                        {data.contentObj.itemName}
                    </Grid>

                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Item Sale Price")}
                            color="info"
                        />
                        {formatCurrency(data.contentObj.itemSalePrice)}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Item Amount")}
                            color="info"
                        />
                        {"x"}
                        {data.contentObj.itemAmount}
                    </Grid>
                    {data.contentObj.itemPurchasePrice ? (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Item Purchase Price")}
                                color="info"
                            />
                            {formatCurrency(data.contentObj.itemPurchasePrice)}
                        </Grid>
                    ) : null}
                    {data.contentObj.itemDescription ? (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Item Description")}
                                color="info"
                            />
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
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Sold Company")}
                            color="info"
                        />
                        {event === "Add Sale"
                            ? data.contentObj.sale.saleCompanyName
                            : data.contentObj.saleCompanyName}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Sold Item Name")}
                            color="info"
                        />
                        {event === "Add Sale"
                            ? data.contentObj.sale.saleItemName
                            : data.contentObj.saleItemName}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Sold Item Amount")}
                            color="info"
                        />
                        {"x"}
                        {event === "Add Sale"
                            ? data.contentObj.sale.saleItemAmount
                            : data.contentObj.saleItemAmount}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Total Sale Price")}
                            color="info"
                        />
                        {event === "Add Sale"
                            ? formatCurrency(
                                  data.contentObj.sale.totalSalePrice
                              )
                            : formatCurrency(data.contentObj.totalSalePrice)}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Sale Date")}
                            color="info"
                        />
                        {event === "Add Sale"
                            ? data.contentObj.sale.saleCreatedAt
                            : data.contentObj.saleCreatedAt}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Sale Guarantee")}
                            color="info"
                        />
                        {event === "Add Sale"
                            ? data.contentObj.sale.saleGuarantee === false
                                ? t("No Guarantee")
                                : t("Guaranteed until") +
                                  " " +
                                  data.contentObj.sale.saleGuaranteeEndTime
                            : data.contentObj.saleGuarantee === false
                            ? t("No Guarantee")
                            : t("Guaranteed until") +
                              " " +
                              data.contentObj.saleGuaranteeEndTime}
                    </Grid>
                </Grid>
            );

        //! Users
        if (event === "Update User Email" || event === "Update User Password")
            return (
                <Grid container spacing={2} sx={{ width: "35rem" }}>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("User Name")}
                            color="info"
                        />
                        {data.contentObj.displayName}
                    </Grid>
                    {data.contentObj.email && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Email")}
                                color="info"
                            />
                            {data.contentObj.email}
                        </Grid>
                    )}
                    {data.contentObj.password && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Old Password")}
                                color="info"
                            />
                            {data.contentObj.password}
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
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Agreement Content")}
                            color="info"
                        />
                        {data.contentObj.agreementContent}
                    </Grid>
                    <Grid item xs={12}>
                        <Chip
                            sx={ChipStyles}
                            size="small"
                            label={t("Agreement Start & End Date")}
                            color="info"
                        />
                        {data.contentObj.agreementStartDate +
                            " - " +
                            data.contentObj.agreementEndDate}
                    </Grid>
                    {data.contentObj.agreementBudget && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Agreement Budget")}
                                color="info"
                            />
                            {data.contentObj.agreementBudget}
                        </Grid>
                    )}
                    {data.contentObj.agreementParties && (
                        <Grid item xs={12}>
                            <Chip
                                sx={ChipStyles}
                                size="small"
                                label={t("Agreement Parties")}
                                color="info"
                            />
                            {data.contentObj.agreementParties}
                        </Grid>
                    )}
                </Grid>
            );
    }
    return <>{createToolTipContent(event)}</>;
}

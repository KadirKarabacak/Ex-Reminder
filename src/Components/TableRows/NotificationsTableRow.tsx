import { Checkbox, Chip, TableCell, TableRow, Tooltip } from "@mui/material";
import ButtonGroup from "../ButtonGroup";
import { TableRowTypes } from "../../Interfaces/User";
import {
    formatCurrency,
    formatDate,
    formatDateAndTime,
} from "../../Utils/utils";
import i18n from "../../i18n";
import { useGetCompanies } from "../../Api/companyController";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { WarehouseOutlined } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import HandshakeIcon from "@mui/icons-material/Handshake";
import NotificationTooltip from "../NotificationTooltip";

const TableCellStyles = {
    color: "var(--color-grey-600)",
    fontSize: "1.3rem",
    textAlign: "left",
    borderBottom: "1px solid var(--color-grey-200)",
};

const IconStyles = {
    fontSize: "1.8rem",
    fill: "var(--color-white-soft)",
};

export default function NotificationsTableRow({
    isItemSelected,
    handleClick,
    // index,
    labelId,
    row,
}: TableRowTypes) {
    const currentLanguage = i18n.language;
    const { data } = useGetCompanies();
    const findCompanyWithId =
        data && data.find(company => company.id === row.contentObj.companyId);

    function createNotificationContent(event: string) {
        //! Warehouse
        if (event === "Add Item")
            return currentLanguage === "en-EN"
                ? `Item ${row.contentObj.itemName} x${row.contentObj.itemAmount} added to warehouse`
                : `${row.contentObj.itemName} isimli malzemeden x${row.contentObj.itemAmount} adet depoya eklendi`;
        if (event === "Update Item")
            return currentLanguage === "en-EN"
                ? `Item ${row.contentObj.itemName} updated in warehouse`
                : `${row.contentObj.itemName} isimli malzeme depoda güncellendi`;
        if (event === "Delete Item")
            return currentLanguage === "en-EN"
                ? `Item ${row.contentObj.itemName} deleted from warehouse`
                : `${row.contentObj.itemName} isimli malzeme depodan silindi`;

        //! Employees
        if (event === "Add Employee")
            return currentLanguage === "en-EN"
                ? `Employee ${row.contentObj.full_name} added to employees as ${row.contentObj.job_title}`
                : `${row.contentObj.full_name} isimli çalışan, ${row.contentObj.job_title} olarak çalışanlar listesine eklendi`;
        if (event === "Update Employee")
            return currentLanguage === "en-EN"
                ? `Employee ${row.contentObj.full_name} updated in employees`
                : `${row.contentObj.full_name} isimli çalışan, çalışanlar listesinde güncellendi`;
        if (event === "Delete Employee")
            return currentLanguage === "en-EN"
                ? `Employee ${row.contentObj.full_name} deleted from employees`
                : `${row.contentObj.full_name} isimli çalışan, çalışanlar listesinden silindi`;

        //! Companies
        if (event === "Add Company")
            return currentLanguage === "en-EN"
                ? `Company ${row.contentObj.companyName} added to companies`
                : `${row.contentObj.companyName} şirketi, şirketler listesine eklendi`;
        if (event === "Update Company")
            return currentLanguage === "en-EN"
                ? `Company ${row.contentObj.companyName} updated in companies`
                : `${row.contentObj.companyName} isimli şirket, şirketler listesinde güncellendi`;
        if (event === "Delete Company")
            return currentLanguage === "en-EN"
                ? `Company ${row.contentObj.companyName} deleted from companies`
                : `${row.contentObj.companyName} isimli şirket, şirketler listesinden silindi`;

        //! Sales
        if (event === "Add Sale")
            return currentLanguage === "en-EN"
                ? `Item ${row.contentObj.sale.saleItemName} x${row.contentObj.sale.saleItemAmount} sold to company ${row.contentObj.sale.saleCompanyName}`
                : `${row.contentObj.sale.saleItemName} isimli malzemeden x${row.contentObj.sale.saleItemAmount} adet ${row.contentObj.sale.saleCompanyName} şirketine satış yapıldı`;
        if (event === "Delete Sale")
            return currentLanguage === "en-EN"
                ? `${formatCurrency(row.contentObj.totalSalePrice)} sale of "${
                      row.contentObj.saleItemName
                  }" x${row.contentObj.saleItemAmount} to ${
                      row.contentObj.saleCompanyName
                  } deleted from sales`
                : `${formatCurrency(
                      row.contentObj.totalSalePrice
                  )} değerindeki ${
                      row.contentObj.saleCompanyName
                  } şirketine yapılan "${row.contentObj.saleItemName}" x${
                      row.contentObj.saleItemAmount
                  } adet malzeme satışı, satışlar listesinden silindi`;

        //! Agreements
        if (event === "Add Agreement")
            return currentLanguage === "en-EN"
                ? `Agreement with the parties of "${
                      row.contentObj.agreementParties
                  }" added to ${
                      findCompanyWithId?.companyName || "Company"
                  }'s agreements`
                : `"${
                      row.contentObj.agreementParties
                  }" taraflarına sahip anlaşma, ${
                      findCompanyWithId?.companyName || "Company"
                  } şirketinin anlaşmalar listesine eklendi`;
        if (event === "Update Agreement")
            return currentLanguage === "en-EN"
                ? `Agreement with the parties of "${row.contentObj.agreementParties}" is updated in ${findCompanyWithId?.companyName}'s agreements`
                : `"${row.contentObj.agreementParties}" taraflarına sahip anlaşma ${findCompanyWithId?.companyName} şirketinin anlaşmalarında güncellendi`;
        if (event === "Delete Agreement")
            return currentLanguage === "en-EN"
                ? `Agreement with the parties of "${row.contentObj.agreementParties}" deleted from ${findCompanyWithId?.companyName}'s agreements`
                : `"${row.contentObj.agreementParties}" taraflarına sahip anlaşma ${findCompanyWithId?.companyName} şirketinin anlaşmalarından silindi`;

        //! User Settings
        if (event === "Update User Password")
            return currentLanguage === "en-EN"
                ? `User ${row.contentObj.displayName}'s password is updated`
                : `${row.contentObj.displayName} isimli kullanıcının şifresi güncellendi`;
        if (event === "Update User Email")
            return currentLanguage === "en-EN"
                ? `User ${row.contentObj.displayName}'s email is updated to ${row.contentObj.email}`
                : `${row.contentObj.displayName} isimli kullanıcının email adresi ${row.contentObj.email} adresine güncellendi`;
        if (event === "Update User Name")
            return currentLanguage === "en-EN"
                ? `User's display name is updated to ${row.contentObj.displayName}`
                : `Kullanıcının ismi ${row.contentObj.displayName} ismine güncellendi`;
        if (event === "Update User Avatar")
            return currentLanguage === "en-EN"
                ? `User's avatar is updated`
                : `Kullanıcının avatarı güncellendi`;
        if (event === "Add Negotiate")
            //! Negotiates
            return currentLanguage === "en-EN"
                ? `Negotiate added to ${
                      findCompanyWithId?.companyName
                  } to do at ${formatDateAndTime(
                      row.contentObj.negotiateDateAndTime.seconds * 1000
                  )}`
                : `${
                      findCompanyWithId?.companyName
                  } isimli şirkete ${formatDateAndTime(
                      row.contentObj.negotiateDateAndTime.seconds * 1000
                  )} tarihinde yapılmak üzere görüşme eklendi`;
        //! Accounting
    }

    function createChipColor(event: string) {
        if (event.includes("Add")) return "success";
        if (event.includes("Update")) return "warning";
        if (event.includes("Delete")) return "error";
        return "primary";
    }

    function createIcon(event: string) {
        if (event.includes("Item"))
            return <WarehouseOutlined sx={IconStyles} />;
        if (event.includes("Company")) return <BusinessIcon sx={IconStyles} />;
        if (event.includes("Employee")) return <GroupIcon sx={IconStyles} />;
        if (event.includes("User")) return <SettingsIcon sx={IconStyles} />;
        if (event.includes("Sale")) return <PostAddIcon sx={IconStyles} />;
        if (event.includes("Negotiate"))
            return <MoreTimeIcon sx={IconStyles} />;
        if (event.includes("Agreement"))
            return <HandshakeIcon sx={IconStyles} />;
    }

    return (
        <TableRow
            hover
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
        >
            <TableCell
                onClick={event => handleClick(event, row.id)}
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
                sx={{
                    ...TableCellStyles,
                    padding: "10px 16px 10px 0px",
                    width: "15%",
                }}
            >
                {formatDate(new Date(row?.createdAt.seconds * 1000)) || "-"}
            </TableCell>

            <TableCell
                align="right"
                sx={{
                    ...TableCellStyles,
                    padding: "10px 16px 10px 0px",
                }}
            >
                {row.event === "Update User Name" ||
                row.event === "Update User Avatar" ? (
                    <Chip
                        label={
                            (
                                <span
                                    style={{
                                        display: "flex",
                                        gap: "0.8rem",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {createNotificationContent(row.event)}{" "}
                                    {createIcon(row.event)}
                                </span>
                            ) || "-"
                        }
                        color={createChipColor(row.event)}
                        sx={{
                            fontSize: "1.2rem",
                            boxShadow: "0 0.6rem 2rem rgba(0,0,0,0.1)",
                        }}
                    />
                ) : (
                    <Tooltip
                        title={<NotificationTooltip data={row} />}
                        placement="top-start"
                        followCursor
                    >
                        <Chip
                            label={
                                (
                                    <span
                                        style={{
                                            display: "flex",
                                            gap: "0.8rem",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {createNotificationContent(row.event)}{" "}
                                        {createIcon(row.event)}
                                    </span>
                                ) || "-"
                            }
                            color={createChipColor(row.event)}
                            sx={{
                                fontSize: "1.2rem",
                                boxShadow: "0 0.6rem 2rem rgba(0,0,0,0.1)",
                            }}
                        />
                    </Tooltip>
                )}
            </TableCell>
            <TableCell align="right" sx={TableCellStyles}>
                <ButtonGroup tableName="notifications" row={row} />
            </TableCell>
        </TableRow>
    );
}

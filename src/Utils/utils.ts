import { differenceInDays } from "date-fns";
import i18n from "../i18n";

export const extractFileName = (file: any) => {
    return file ? file?.name?.slice(0, 25) + "..." : "";
};

export function formatDate(date: any) {
    if (!date) date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatCurrency(value: string | number) {
    return new Intl.NumberFormat("tr", {
        style: "currency",
        currency: "TRY",
    }).format(value as number);
}

export function parseCurrency(value: string) {
    return parseFloat(value.slice(1).replaceAll(".", ""));
}

export function parseDateFromString(dateString: String) {
    const [day, month, year] = dateString.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function remainingTime(endDate: string) {
    // Parse Dates back to Date format
    const parsedEndDate = parseDateFromString(endDate);

    // Calculate the difference between the dates in days
    const difference = differenceInDays(parsedEndDate, new Date());

    // Calculate remaining Years, months and days
    const years = Math.floor(difference / 365);
    const months = Math.floor((difference % 365) / 30);
    const days = difference % 30;

    return `${years > 0 ? years + i18n.t(" years ") : ""}${
        months > 0 ? months + i18n.t(" months ") : ""
    }${days > 0 ? days + i18n.t(" days ") : ""}remaining`;
}

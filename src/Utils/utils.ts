import { addYears, differenceInDays, differenceInHours } from "date-fns";
import i18n from "../i18n";
import { API_KEY } from "../Constants/constant";

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

export function formatDateAndTime(dateString: any = new Date()) {
    const currentLanguage = i18n.language;
    const options: any = {
        year: "numeric",
        day: "2-digit",
        month: "long",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(currentLanguage, options);

    return formattedDate.replaceAll(",", "");
}

export function formatCurrency(value: string | number) {
    return new Intl.NumberFormat("tr", {
        style: "currency",
        currency: "TRY",
    }).format(value as number);
}

export function parseCurrency(value: any) {
    return parseFloat(value.slice(1).replaceAll(".", ""));
}

export function parseDateFromString(dateString: String) {
    const [day, month, year] = dateString.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function remainingTime(endDate: string) {
    const currentLanguage = i18n.language;
    // Parse Dates back to Date format
    const parsedEndDate = parseDateFromString(endDate);

    // Calculate the difference between the dates in days
    const difference = differenceInDays(parsedEndDate, new Date());
    const differenceHours = differenceInHours(parsedEndDate, new Date());

    // Calculate remaining Years, months and days
    const years = Math.floor(difference / 365);
    const months = Math.floor((difference % 365) / 30);
    const days = difference % 30;

    if (years === 0 && months === 0 && days === 0)
        return currentLanguage === "en-EN"
            ? `${differenceHours} hours`
            : `${differenceHours} saat`;
    // return `${differenceHours} hours remaining`;

    if (years === 0 && months === 0 && days === 0 && differenceHours === 0)
        return currentLanguage === "en-EN"
            ? `Agreement is expired`
            : `Anlaşma süresi doldu`;
    // return `Agreement is expired`;

    return `${years > 0 ? years + i18n.t(" years ") : ""}${
        months > 0 ? months + i18n.t(" months ") : ""
    }${days > 0 ? days + i18n.t(" days ") : ""}`;
}

// Start Date : saleCreatedAt --- Guarantee Time : selectedGuaranteeTime (1 Year, 2 Year | 1 Yıl, 2 Yıl)
export function calcGuaranteeExpireDate(
    startDate: Date,
    guaranteeTime: number
) {
    return addYears(startDate, guaranteeTime);
}

export async function reverseGeocode(lat: any, lng: any) {
    try {
        const clickedAddress = await fetch(
            `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${API_KEY}`
        );
        const data = await clickedAddress.json();
        return data.address;
    } catch (err) {
        console.log(err);
    }
}

export async function forwardGeocode(address: any) {
    try {
        const clickedAddress = await fetch(
            `https://geocode.maps.co/search?q=${address}&api_key=${API_KEY}`
        );
        const data = await clickedAddress.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

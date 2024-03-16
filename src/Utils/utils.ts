export const extractFileName = (file: any) => {
    return file ? file?.name?.slice(0, 25) + "..." : "";
};

export function formatDate(date: any) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatCurrency(value: string) {
    return new Intl.NumberFormat("tr", {
        style: "currency",
        currency: "TRY",
    }).format(value);
}

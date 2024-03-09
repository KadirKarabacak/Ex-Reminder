export const extractFileName = (file: any) => {
    return file ? file?.name?.slice(0, 25) + "..." : "";
};

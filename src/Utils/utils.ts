export const extractFileName = (file: { name: any } | null) => {
    return file ? file.name : "";
};

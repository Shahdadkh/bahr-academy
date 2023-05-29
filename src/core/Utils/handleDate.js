export const handleDate = (value) => {
    const date = value.split("-");
    return date[0] + "/" + date[1] + "/" + date[2];
};
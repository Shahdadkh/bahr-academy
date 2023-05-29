export const handleTitle = (value) => {
    const Title = value.split("|");
    return Title[0];
};

export const handleAuthor = (value) => {
    const Autor = value.split("|");
    return Autor[1];
};

export const handleTime = (value) => {
    const Time = value.split("|");
    return Time[2];
};
  

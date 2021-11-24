export const formateDate = (timeStamp) => {
    if (!timeStamp) return '';
    let date = new Date(timeStamp);
    return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
    );
};

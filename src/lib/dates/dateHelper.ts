export function getCurrentPSTDate() {
    const currentDate = new Date();
    const utcOffset = -7; // UTC-7 for Pacific Standard Time (PST)
    const pstDate = new Date(currentDate.getTime() + (utcOffset * 60 * 60 * 1000));
    return pstDate;
};

// returns data object DD-MM-YYYY format for api
export function formatDate(date: Date) {
    const stringDate = date.toISOString().split('T')[0];
    const dateParts = stringDate.split('-');
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
};

export function convertTo12HourTime(time: string) {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${formattedHour}:${minute} ${period}`;
    return formattedTime;
};
export function getCurrentPSTDate() {
    const currentDate = new Date();
    const utcOffset = -7; // UTC-7 for Pacific Standard Time (PST)
    const pstDate = new Date(currentDate.getTime() + (utcOffset * 60 * 60 * 1000));
    return pstDate;
};

// returns data object DD-MM-YYYY format for api
export function formatDate(date: Date) {
    const stringDate = date.toISOString().split('T')[0];
    const [year, month, day] = stringDate.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
};

export function convertToDateWithSlashes(date: string) {
    const [year, month, day] = date.split('-');
    const formattedDate = `${month}/${day}/${year}`;
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

// given a string in 12 hour X:XX AM/PM format, convert to 24 hour format
export function convertTo24HourTime(time: string) {
    const [timePart, period] = time.split(' ');
    const [hour, minute] = timePart.split(':');
    let intHour = parseInt(hour);
    if (period === 'PM' && intHour !== 12) {
        intHour += 12;
    }
    if (period === 'AM' && intHour === 12) {
        intHour = 0;
    }
    const formattedTime = `${intHour.toString().padStart(2, '0')}:${minute}`;
    return formattedTime;
}
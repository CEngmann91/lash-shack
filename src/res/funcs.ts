const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "GBP",
    style: "currency",
    maximumSignificantDigits: 3
})
export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}


export function calculateDaysFromTodayString(date_format: string): number {
    const date_1: Date = new Date(date_format);
    const date_2: Date = new Date();
    return calculateDifferenceInDays(date_1, date_2);
}

export function calculateDaysFromToday(date_1: Date): number {
    const date_2: Date = new Date();
    return calculateDifferenceInDays(date_1, date_2);
}

export function calculateDifferenceInDays(date_1: Date, date_2: Date): number {
    const difference: number = date_1.getTime() - date_2.getTime();
    const TotalDays: number = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}









/*
// https://stackoverflow.com/questions/59089408/how-to-get-weeks-days-hours-minutes-ago-from-custom-date-time-from-now-in
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS_OF_YEAR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const daysBetween = (date1: Date, date2: Date) => {
    const ONE_DAY_ON_SECONDS = 1000 * 60 * 60 * 24;
    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();

    const differenceMs = date2Ms - date1Ms;
    return Math.round(differenceMs / ONE_DAY_ON_SECONDS);
}

export const getHoursFromDate = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

export const dateFromNow = (date: string) => {
    return dateFromNow2(new Date(date));
}

export const dateFromNow2 = (date: Date) => {
    const currentDate = new Date();

    if (date.getUTCDate() === currentDate.getUTCDate() && date.getUTCMonth() === currentDate.getUTCMonth() && date.getUTCFullYear() === currentDate.getUTCFullYear()) {
        const hours = Math.floor(Math.abs(date.getTime() - currentDate.getTime()) / 36e5);

        if (hours === 0) {
            const minutes = Math.round(((Math.abs(date.getTime() - currentDate.getTime()) % 86400000) % 3600000) / 60000);
            return minutes <= 1 ? 'A while ago' : `${minutes} minutes ago.`
        } else {
            return `${Math.floor(hours)} hours ago`;
        }
    } else {
        if (date.getUTCFullYear() < currentDate.getUTCFullYear() || daysBetween(date, currentDate) > 6) {
            return `${date.getDate()}/${MONTHS_OF_YEAR[date.getMonth()]} /${date.getFullYear()}`;
        } else {
            return `${DAYS_OF_WEEK[date.getDay()]} at ${getHoursFromDate(date)}`;
        }
    }
}
*/













// export const addWhiteSpaceElement = () => {
//     return ( <>&nbsp;</> );
// }





export function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}





// FORMS
export function clearFormFields() {
    Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
    );
    Array.from(document.querySelectorAll("textarea")).forEach(
        input => (input.value = "")
    );
}



export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max));
}
export function toggleBodyZoomOut() {
    document.querySelector('body')?.classList.toggle("zoomOut");
}

export function toggleDrawerOpened() {
    toggleBodyZoomOut();
    document.querySelector('body')?.classList.toggle("opened");
}






// function expandClasses(classes: string[]) {
//     if (!classes || typeof classes !== 'object' || Array.isArray(classes)) {
//         return classes;
//     }
//     let mapKey = 's';
//     let map = classes[mapKey];
//     let hasMap = map && typeof map === "object";
//     let list = Object.keys(classes).filter(key => (!hasMap || key !== mapKey) && classes[key]);
//     if (hasMap) {
//         list = list.map(e => map[e] || e);
//     }
//     return list.join(' ');
// }

// export function joinClasses() {
//     return [].concat.apply([], arguments).map(expandClasses).filter(e => e).join(' ');
// }
export function joinClasses(classes: any[]) {
    if (classes.every(x => typeof x === "string"))
        return classes.join(' ');
    return "";
}





const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "GBP",
    style: "currency",
    maximumSignificantDigits: 3
})
export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}


export function calculateDaysFromTodayString(date_format: string): number {

    const splitDate = date_format.split('/');
    const month = Number(splitDate[1]) - 1; //Javascript months are 0-11
    const date_1: Date = new Date(Number(splitDate[2]), month, Number(splitDate[0]));
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


export function currentTimeIsBetweenTimes(startTime: string = '09:10:00', endTime: string = '22:30:00'): boolean {
    // const startTime = '09:10:00';
    // const endTime = '22:30:00';

    const startTimeSplit = startTime.split(":");
    const endTimeSplit = endTime.split(":");

    var currentDate = new Date()

    let startDate = new Date(currentDate.getTime());
    startDate.setHours(+startTimeSplit[0]);
    startDate.setMinutes(+startTimeSplit[1]);
    startDate.setSeconds(+startTimeSplit[2]);

    let endDate = new Date(currentDate.getTime());
    endDate.setHours(+endTimeSplit[0]);
    endDate.setMinutes(+endTimeSplit[1]);
    endDate.setSeconds(+endTimeSplit[2]);

    const valid = startDate < currentDate && endDate > currentDate
    return valid;
}

export function timeConversion(s: string) {
    let time = "";
    let hour = s.slice(0, 2)
    let toD = s.slice(-2)

    if (toD.toUpperCase() === 'AM' && +hour == 12) {
        time = `00${s.slice(2, s.length -2)}`
    } else {
        if (toD.toUpperCase() === 'PM' && +hour < 12) {
            time = `${Number(12 + parseInt(hour))}${s.slice(2, s.length - 2)}`
        } else {
            time = s.slice(0, s.length - 2)
        }
    }
    return time;
}


export const processStringData = (input: string) => {
    return input.replaceAll("\\n", "\n");
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
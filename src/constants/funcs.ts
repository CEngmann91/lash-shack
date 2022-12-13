import moment from "moment";



const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "GBP",
    style: "currency",
    maximumSignificantDigits: 3
})
export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}


export function formatHrsMins(duration: number) {
    return formatTime(timespan(duration));
}
// https://stackoverflow.com/questions/60044966/moment-js-convert-x-minutes-to-y-hours-z-minutes
function formatTime(time: moment.Moment) {
    const minutes = time.minutes();
    const hours = time.hours();
    const hourFormatStr = hours === 1 ? 'hr' : 'hrs';
    const minuteFormatStr = minutes === 1 ? 'min' : 'mins';
    if (!time.minutes())
        return time.format(`h [${hourFormatStr}]`);
    return time.format(`h [${hourFormatStr}], mm [${minuteFormatStr}]`);
}
const timespan = (duration: number) => moment.utc(
    moment.duration(duration, "minutes")
        .asMilliseconds()
)






export function getDateFormatted(date: string): string {
    return getDate(date, 'DD/MM/YYYY');
}
export function getDate(date: string, dateFormat: string): string {
    return moment(date, dateFormat).fromNow();
}

// export function convertToHoursMinutes(value: number) : string
// { 
//   var hours = Math.floor(value / 60);  
//   var minutes = value % 60;
//   return hours + ":" + minutes;         
// }


export function remove(arr: number[], item: number) {
    const newArr = [...arr];
    newArr.splice(newArr.findIndex(i => i === item), 1);
    return newArr;
};

export function arraymove(arr: any[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}


/*export function NewlineText(input : string) {
    const text = input;
    return text.split('\n').map(str => <p>{str}</p>);
}*/
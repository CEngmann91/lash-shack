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
const timespan = (duration: number) => moment.utc (
    moment.duration(duration, "minutes")
        .asMilliseconds()
)

export function replaceAllNewLineChars(data: string) : string {
    return data.replace("\\n", "\n");
}






export function scrollToTop()
{
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


import { useMemo } from "react";

export const useDate = () => {
    /**
     * Convert a date to a relative time string, such as
     * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
     * using Intl.RelativeTimeFormat
     * https://www.builder.io/blog/relative-time
     */
    function getRelativeTimeString(
        date: Date | number,
        lang = navigator.language
    ): string {
        try {
            // Allow dates or times to be passed
            const timeMs = typeof date === "number" ? date : date.getTime();

            // Get the amount of seconds between the given date and now
            const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

            // Array reprsenting one minute, hour, day, week, month, etc in seconds
            const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

            // Array equivalent to the above but in the string representation of the units
            const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

            // Grab the ideal cutoff unit
            const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));

            // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
            // is one day in seconds, so we can divide our seconds by this to get the # of days
            const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

            // Intl.RelativeTimeFormat do its magic
            const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
            return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
        } catch (error) {
            return `${error}`;
        }
    }

    function getLocalDayNames() {
        let d = new Date(2000, 0, 3); // Monday
        let days = [];
        for (let i = 0; i < 7; i++) {
            days.push(d.toLocaleString('default', { weekday: 'long' }));
            d.setDate(d.getDate() + 1);
        }
        return days;
    }

    function getLocalMonthNames() {
        let d = new Date(2000, 0); // January
        let months = [];
        for (let i = 0; i < 12; i++) {
            months.push(d.toLocaleString('default', { month: 'long' }));
            d.setMonth(i + 1);
        }
        return months;
    }

    const date: Date = new Date();

    const dayOfWeekName = useMemo(() => date.toLocaleString('default', { weekday: 'long' }), [date]);

    const dayNumeric = useMemo(() => String(date.getDate()).padStart(2, '0'), [date]);

    const monthNumeric = useMemo(() => String(date.getMonth() + 1).padStart(2, '0'), [date]);

    const fullMonth = useMemo(() => date.toLocaleString('default', { month: 'long' }), [date]);

    const fullYear = useMemo(() => date.getFullYear(), [date]);

    const fullDateUK = useMemo(() => {
        // const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
    }, [date]);


    return {
        getRelativeTimeString,
        getLocalDayNames,
        getLocalMonthNames,
        dayOfWeekName,
        dayNumeric,
        monthNumeric,
        fullMonth,
        fullYear,
        fullDateUK
    }
}
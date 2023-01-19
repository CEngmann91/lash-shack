
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


// const date_1: Date = new Date(date);
// const date_2: Date = new Date();
// let difference = date_1.getTime() - date_2.getTime();
// let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));





// export const addWhiteSpaceElement = () => {
//     return ( <>&nbsp;</> );
// }



// FORMS
export function clearFormFields() {
    Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
    );
    Array.from(document.querySelectorAll("textarea")).forEach(
        input => (input.value = "")
    );
}
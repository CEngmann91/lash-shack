const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "GBP",
    style: "currency",
    maximumSignificantDigits: 3
});

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}
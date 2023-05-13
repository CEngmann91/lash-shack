import { CONTACT } from "../constants/constants";

export function launchTreatwell(location: string) {
    if (location === "Romford")
        openWindow(CONTACT.LOCATIONS[0].TREATWELL);
    if (location === "Hackney")
        openWindow(CONTACT.LOCATIONS[1].TREATWELL);
}
export function openWindow(url: string) {
    window.open(url,'_blank')
}

export function toHoursMins(num: number) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    if (hours > 0)
        return `${hours}hour(s) ${minutes} minute(s)`;
    return `${minutes} minute(s)`;
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
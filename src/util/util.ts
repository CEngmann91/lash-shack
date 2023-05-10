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


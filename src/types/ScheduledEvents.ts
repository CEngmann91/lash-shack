import { DayOfWeek } from "./DayOfWeek";

export type ScheduledEvents = {
    id: string;
    title: string;
    start: string;
    end: string;
    disabeled: boolean;
    colour: string;
}
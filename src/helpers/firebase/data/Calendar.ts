import { Category } from "./Category";

export interface Calendar {
    entries: CalendarEntryEntity[];
}

export interface CalendarEntryEntity {
    date: string;
    time: string;
    jobEntries: JobEntryEntity[];
}

export interface JobEntryEntity {
    date: string;
    time: string;
    user_uid: string;
    category: Category;
    job_uid: string;
}
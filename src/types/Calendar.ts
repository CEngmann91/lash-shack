export type AttendStatus = "Pending" | "Attended" | "Not Attended";
type Appointments = {
    id: string;
    title: string;
    date: string;
    start: string;
    end: string;
    fullDateTime: string;
    disabled: boolean;
    colour: string;
    attendStatus: AttendStatus;
}

export type Calendar = {
    appointments: Appointments[];
}
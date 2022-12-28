import { Calendar } from "./Calendar";

export const ACCOUNT_TYPES = {
    STANDARD: 'Standard',
    SILVER: 'Silver',
    GOLD: 'Gold',
    PLATINUM: 'Platinum',
}





interface InvoiceItemEntity {
    uid: string;
    quantity: number;
    totalAmount: number;
}
export class InvoiceItem {
    constructor({ uid, quantity, totalAmount }: InvoiceItemEntity) {
        Object.assign(this, { uid, quantity, totalAmount });
    }
}


interface InvoiceEntity {
    uid: string;
    items: InvoiceItemEntity[];
    totalAmount: number;
    date: string;
    time: string;
}
export class Invoice {
    constructor({ uid, items, totalAmount, date, time }: InvoiceEntity) {
        Object.assign(this, { uid, items, totalAmount, date, time });
    }
}


interface PurchaseHistoryEntity {
    invoices: InvoiceEntity[];
}
export class PurchaseHistory {
    constructor({ invoices }: PurchaseHistoryEntity) {
        Object.assign(this, { invoices });
    }
}


export interface UserEntity {
    uid: string;
    active: boolean;
    account_type: typeof ACCOUNT_TYPES.STANDARD;
    first_name: string;
    last_name: string;
    display_name: string;
    email_address: string;
    email_verified: boolean;
    photo_URL: string;
    area_code: string;
    phone_number: number;
    location: string;
    last_login: string;
    member_since: string;
    purchases: PurchaseHistoryEntity[];
    // calendar: Calendar;
}
export class UserProfile {
    // profile: UserEntity;

    uid: string = "";
    active: boolean = true;
    account_type = ACCOUNT_TYPES.STANDARD;
    first_name: string = "";
    last_name: string = "";
    display_name: string = "";
    email_address = "example@mail.com";
    email_verified: boolean = false;
    photo_URL: string = "";
    phone_number: string = "";
    location: string = "";
    last_login: string = "";
    member_since: string = "";
    edited_display_name: boolean = false;


    // constructor() {}

    constructor({ uid, active, account_type, first_name, last_name, display_name, email_address, email_verified, photo_URL, phone_number, location, last_login, member_since }: UserEntity) {
        Object.assign(this, { uid, active, account_type, first_name, last_name, display_name, email_address, email_verified, photo_URL, phone_number, location, last_login, member_since });
    }
}
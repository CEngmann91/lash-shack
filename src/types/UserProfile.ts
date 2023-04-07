import { Address } from "./Address";
import { PurchaseOrder } from "./PurchaseOrder";
import { ShopLocations } from "./ShopLocations";

export type AccountType = "Client" | "Manager" | "Staff";
export type UserProfile = {
    uid: string;
    account: AccountType;
    active: boolean
    firstName: string;
    lastName: string;
    displayName: string;
    dob: string; // DD/MM/YYYY
    email: string;
    phoneNumber?: string;
    photoURL: string;
    // calendar: Calendar;
    // wishlist: WishList;
    memberSince: string;
    lastLoggedIn: string;
    // subscribed: boolean;
    billingAddress: Address | null;
    preferredLocation: ShopLocations;


    // Members of the team ONLY
    position: "NA" | "CEO" | "Technician";
    summary: string;
    startDate?: string;
}
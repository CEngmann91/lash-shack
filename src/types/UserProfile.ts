import { Address } from "./Address";
import { PurchaseOrder } from "./PurchaseOrder";
import { ShopLocations } from "./ShopLocations";

export type AccountType = "Client" | "Manager" | "Staff";
export type UserProfile = {
    uid: string;
    account: AccountType;
    accountType?: "Normal" | "Admin" | "Staff";
    position?: "NA" | "CEO" | "Staff";
    active: boolean
    firstName: string;
    lastName: string;
    displayName: string;
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
}
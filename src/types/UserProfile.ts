import { Address } from "./Address";
import { PurchaseOrder } from "./PurchaseOrder";
import { Schedule } from "./Schedule";
import { ShopLocations } from "./ShopLocations";

export type AccountType = "Standard" | "Admin" | "Employee";
export type UserProfile = {
    uid: string;
    account: AccountType;
    active: boolean
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    phoneNumber?: string;
    photoURL: string;
    // schedule: Schedule;
    // orderHistory: PurchaseOrder[];
    memberSince: string;
    lastLoggedIn: string;
    // subscribed: boolean;
    billingAddress: Address | null;
    preferredLocation: ShopLocations;

}
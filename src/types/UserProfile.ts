import { ShopLocations } from "./ShopLocations";

export type AccountType = "Standard" | "Admin";
export type UserProfile = {
    uid: string;
    account: AccountType;
    active: boolean
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    // subscribed: boolean;
    preferredLocation: ShopLocations;
}
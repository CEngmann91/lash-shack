export const ACCOUNT_TYPES = {
    STANDARD: 'Standard',
    SILVER: 'Silver',
    GOLD: 'Gold',
    PLATINUM: 'Platinum',
}

export class UserProfile {
    uid: string = ''
    active: boolean = true;
    account_type = ACCOUNT_TYPES.STANDARD;
    first_name: string = "";
    last_name: string = "";
    display_name: string = "";
    email_address: string = "example@mail.com";
    email_verified: boolean = false;
    photo_URL: string = "";
    phone_number: string = "";
    occupation = { position: '' }
    location: string = "";
    last_login: string = "";
    member_since: string = "";



    
    constructor() {}

    toObject(): object
    {
        return {
            uid: this.uid,
            email_verified: this.email_verified,
            account_type: this.account_type,
            first_name: this.first_name,
            last_name: this.last_name,
            display_name: this.display_name,
            email_address: this.email_address,
            photo_URL: this.photo_URL,
            phone_number: this.phone_number,
            occupation: this.occupation = { position: '' },
            location: this.location,
            last_login: this.last_login,
            member_since: this.member_since,
        }
    }

    // reset() : void
    // {
    //     this.uid = "";
    //     this.account_type = ACCOUNT_TYPES.STANDARD,
    //     this.first_name = "";
    //     this.last_name = "";
    //     this.display_name = "";
    //     this.email_address = "";
    //     this.email_verified = false;
    //     this.photo_URL = "";
    //     this.phone_number = "";
    //     this.occupation = { position: '' }
    //     this.location = 'United Kingdom',
    //     this.last_login = "";
    //     this.member_since = "";
    // }
}
import { ReactNode } from "react";
import { Icon_Dash_Account, Icon_Dash_Calendar, Icon_Dash_Catalog, Icon_Dash_Home, Icon_Dash_Message, Icon_Dash_Orders, Icon_Dash_Settings, Icon_Dash_Users } from "../res/icons"

export type NavType = {
    id: number;
    title: string;
    icon: ReactNode;
    to: string;
    subMenu?: NavType[];
}
export const NAVIGATION = {
    MAIN_ROUTES: [
        {
            id: 0,
            title: "Home",
            to: "/",
        },
        {
            id: 1,
            title: "Services",
            to: "services",
            // subMenu: [
            //     {
            //         id: 0,
            //         title: "Full Set Extensions",
            //         to: "",
            //     },
            //     {
            //         id: 1,
            //         title: "Eyelash Extensions Infills",
            //         to: "",
            //     },
            //     {
            //         id: 2,
            //         title: "Eyebrows",
            //         to: "",
            //     }
            // ]
        },
        {
            id: 2,
            title: "Courses",
            to: "courses",
        },
        {
            id: 3,
            title: "Gallery",
            to: "gallery",
        },
        {
            id: 4,
            title: "Contact",
            to: "contact",
        },
        // {
        //     title: "Latest News",
        //     to: "news",
        // },
        // {
        //     id: 4,
        //     title: "Shop",
        //     to: "shop",
        // }
    ] as NavType[],
    DASHBOARD_ROUTES: [
        {
            id: 0,
            title: "Home",
            icon: typeof Icon_Dash_Home,
            to: "dashboard"
        },
        {
            id: 1,
            title: "Account",
            icon: typeof Icon_Dash_Account,
            to: "dashboard/account"
        },
        {
            id: 2,
            title: "Planner",
            icon: typeof Icon_Dash_Calendar,
            to: "dashboard/planner"
        },
        {
            id: 3,
            title: "Messages",
            icon: typeof Icon_Dash_Message,
            to: "dashboard/messages"
        },
        {
            id: 4,
            title: "Settings",
            icon: typeof Icon_Dash_Settings,
            to: "dashboard/settings"
        }
    ] as NavType[],
    DASHBOARD_ADMIN_ROUTES: [
        {
            id: 0,
            title: "Home",
            icon: typeof Icon_Dash_Home,
            to: "dashboard"
        },
        {
            id: 1,
            title: "Planner",
            icon: typeof Icon_Dash_Calendar,
            to: "dashboard/planner"
        },
        {
            id: 2,
            title: "Messages",
            icon: typeof Icon_Dash_Message,
            to: "dashboard/messages"
        },
        {
            id: 3,
            title: "Orders",
            icon: typeof Icon_Dash_Orders,
            to: "dashboard/orders"
        },
        {
            id: 4,
            title: "Users",
            icon: typeof Icon_Dash_Users,
            to: "dashboard/users"
        },
        {
            id: 5,
            title: "Catalog",
            icon: typeof Icon_Dash_Catalog,
            to: "dashboard/catalog"
        },
        {
            id: 6,
            title: "Account",
            icon: typeof Icon_Dash_Account,
            to: "dashboard/account"
        },
        {
            id: 7,
            title: "Settings",
            icon: typeof Icon_Dash_Settings,
            to: "dashboard/settings"
        }
    ] as NavType[],
}

export const CONTACT = {
    FACEBOOK: '',
    TWITTER: '',
    INSTAGRAM: 'https://www.instagram.com/lashshack.uk/',
    TIKTOK: "https://www.tiktok.com/@lashshack.uk",
    PHONE: "07435252126",
    EMAIL: "lashshackuk@hotmail.com",
    LOCATIONS: [
        {
            id: 'White Hart Lane',
            // ADDRESS: "Lash Shack\n49 White Hart Lane\nRomford\nRM7 8JB",
            ADDRESS: "49 White Hart Lane,\nRomford, RM7 8JB",
            MAP: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d334.69771792999427!2d0.15716902444898748!3d51.591034229478765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a58055d67379%3A0x894bc4901f4b067e!2sLash%20Shack%20UK!5e1!3m2!1sen!2suk!4v1683534308275!5m2!1sen!2suk",
            BOROUGH_SUB: "Romford",
            TREATWELL: "https://www.treatwell.co.uk/place/lash-shack/?utm_source=&utm_medium=performancemax&utm_campaign_id=14041377065&utm_campaign=&utm_source_platform=googleads&utm_marketing_tactic=pro&utm_click_id=Cj0KCQjw_r6hBhDdARIsAMIDhV_A_g7jMSMIQJX0a2weoVKvWH-c-p1mJn-wMFT8DJgjzc-g-lqFHYoaAhjPEALw_wcB&gclid=Cj0KCQjw_r6hBhDdARIsAMIDhV_A_g7jMSMIQJX0a2weoVKvWH-c-p1mJn-wMFT8DJgjzc-g-lqFHYoaAhjPEALw_wcB&gclsrc=aw.ds",
            BOOKSY: "",
            lat: 51.5911545,
            long: 0.154799,
        },
        // {
        //     id: 'Chatsworth Road',
        //     // ADDRESS: "Lash Shack\n49 White Hart Lane\nRomford\nRM7 8JB",
        //     ADDRESS: "78 Chatsworth Road,\nLower Clapton,\nHackney, E5 0LS",
        //     MAP: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.345165883973!2d-0.04500049529118797!3d51.554004951498285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d01ae1fd147%3A0xc9f8c78c5651acae!2s78%20Chatsworth%20Rd%2C%20Lower%20Clapton%2C%20London%20E5%200LS!5e1!3m2!1sen!2suk!4v1683737213970!5m2!1sen!2suk",
        //     BOROUGH_SUB: "Hackney",
        //     TREATWELL: "https://www.treatwell.co.uk/place/lash-shack/?utm_source=&utm_medium=performancemax&utm_campaign_id=14041377065&utm_campaign=&utm_source_platform=googleads&utm_marketing_tactic=pro&utm_click_id=Cj0KCQjw_r6hBhDdARIsAMIDhV_A_g7jMSMIQJX0a2weoVKvWH-c-p1mJn-wMFT8DJgjzc-g-lqFHYoaAhjPEALw_wcB&gclid=Cj0KCQjw_r6hBhDdARIsAMIDhV_A_g7jMSMIQJX0a2weoVKvWH-c-p1mJn-wMFT8DJgjzc-g-lqFHYoaAhjPEALw_wcB&gclsrc=aw.ds",
        //     BOOKSY: "https://lashshackhackney.booksy.com/",
        //     lat: 51.554052,
        //     long: -0.0473541,
        // },
    ]
}

export const BOOKING = {
    DEPOSIT_FEE: 50,
    TERMS: `All courses require a deposit of £50 in order to confirm your time slot.\nThe remaining balance will be requested upon arrival.`,
}
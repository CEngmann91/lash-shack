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
            to: "home",
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
    PHONE: "+447435252126",
    EMAIL: "lashshackuk@hotmail.com",
    LOCATIONS: [
        {
            id: 'White Hart Lane',
            // ADDRESS: "Lash Shack\n49 White Hart Lane\nRomford\nRM7 8JB",
            ADDRESS: "49 White Hart Lane,\nRomford, RM7 8JB",
            MAP: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d679.5204988947316!2d0.15733319970601195!3d51.59129798954456!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a49a4b2a8bd5%3A0x8b08e8d25374186a!2s49%20White%20Hart%20Ln%2C%20Romford%20RM7%208JB!5e1!3m2!1sen!2suk!4v1678780540278!5m2!1sen!2suk",
            BOROUGH_SUB: "Romford",
        },
    ]
}
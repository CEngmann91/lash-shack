import { ReactNode } from "react";
import { Icon_Dash_Account, Icon_Dash_Calendar, Icon_Dash_Catalog, Icon_Dash_Home, Icon_Dash_Message, Icon_Dash_Orders, Icon_Dash_Settings, Icon_Dash_Users } from "../res/icons"

export type NavType = {
    id: number;
    title: string;
    icon: ReactNode;
    to: string;
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
        // {
        //     title: "Latest News",
        //     to: "news",
        // },
        {
            id: 4,
            title: "Shop",
            to: "shop",
        }
    ],
    DASHBOARD_ROUTES: [
        {
            id: 0,
            title: "Home",
            icon: Icon_Dash_Home,
            to: "dashboard"
        },
        {
            id: 1,
            title: "Profile",
            icon: Icon_Dash_Account,
            to: "dashboard/account"
        },
        {
            id: 2,
            title: "Calendar",
            icon: Icon_Dash_Calendar,
            to: "dashboard/schedule"
        },
        {
            id: 3,
            title: "Messages",
            icon: Icon_Dash_Message,
            to: "dashboard/messages"
        },
        {
            id: 4,
            title: "Settings",
            icon: Icon_Dash_Settings,
            to: "dashboard/settings"
        }
    ] as unknown as NavType[],
    DASHBOARD_ADMIN_ROUTES: [
        {
            id: 0,
            title: "Home",
            icon: Icon_Dash_Home,
            to: "dashboard"
        },
        {
            id: 1,
            title: "Calendar",
            icon: Icon_Dash_Calendar,
            to: "dashboard/schedule"
        },
        {
            id: 2,
            title: "Messages",
            icon: Icon_Dash_Message,
            to: "dashboard/messages"
        },
        {
            id: 3,
            title: "Orders",
            icon: Icon_Dash_Orders,
            to: "dashboard/orders"
        },
        {
            id: 4,
            title: "Users",
            icon: Icon_Dash_Users,
            to: "dashboard/users"
        },
        {
            id: 5,
            title: "Catalog",
            icon: Icon_Dash_Catalog,
            to: "dashboard/catalog"
        },
        {
            id: 6,
            title: "Profile",
            icon: Icon_Dash_Account,
            to: "dashboard/account"
        },
        {
            id: 7,
            title: "Settings",
            icon: Icon_Dash_Settings,
            to: "dashboard/settings"
        }
    ] as unknown as NavType[],
}

export const CONTACT = {
    FACEBOOK: '',
    TWITTER: '',
    INSTAGRAM: 'https://www.instagram.com/lashshack.uk/',
    PHONE: "+447435252126",
    EMAIL: "lashshackuk@hotmail.com",
    HOURS: "Monday - Saturday, 9:30am - 6pm",
    LOCATIONS: [
        {
            ADDRESS: "Lash Shack\n49 White Hart Lane\nCollier Row,\nEssex\nRM7 8JB",
            MAP: "https://goo.gl/maps/pZcJw97HJBCo8YVk6",
        },
        // {
        //     ADDRESS: "Sunchasers\n37 Mawney Road\nRomford\nRM7 7HL",
        //     MAP: "https://goo.gl/maps/Y6JbXV9A7pSAwbWs7",
        // }
    ]
}
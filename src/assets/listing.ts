import { ProductItem } from "../types/ProductItem"
import images from "../res/images"

export const catalogListing: ProductItem[] = [];

/*export const productListing: ProductItem[] = [
    // Courses
    {
        id: "cour-01",
        active: true,
        imgUrl: images.TestProduct,
        title: "1:1 Masterclass Course",
        category: "Courses",
        subServiceCategory: "NA",
        price: 500,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "cour-02",
        active: true,
        imgUrl: images.TestProduct,
        title: "Masterclass Course",
        category: "Courses",
        subServiceCategory: "NA",
        price: 425,
        shortDesc: "2 day fast track Masterclass Lash Course.\nIncludes Classic, Classic Xtra, Hybrid and Russian Volume.",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "cour-03",
        active: true,
        imgUrl: images.TestProduct,
        title: "Classic Lash Course",
        category: "Courses",
        subServiceCategory: "NA",
        price: 225,
        shortDesc: "Short Description",
        description: "*Intense Theory Learning* \nPrepping Lashes, isolation and 1:1 Application* \nInfills, removal and aftercare* \nBONUS : Learn our Classic Xtra Technique* \nSocial Media advertising and our fill suppliers list",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: [
            "Jan 9, 2023",
            "Jan 10, 2023",
        ]
    },
    {
        id: "cour-04",
        active: true,
        imgUrl: images.TestProduct,
        title: "Russian Volume Course",
        category: "Courses",
        subServiceCategory: "NA",
        price: 225,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "cour-05",
        active: true,
        imgUrl: images.TestProduct,
        title: "Russian Volume Course",
        category: "Courses",
        subServiceCategory: "NA",
        price: 225,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },





    // Services - Full Sets
    {
        id: "serv-Fs01",
        active: true,
        imgUrl: images.TestProduct,
        title: "Classic Semi-Permanent",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Full Sets",
        price: 45,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-Fs02",
        active: true,
        imgUrl: images.TestProduct,
        title: "YY Express",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Full Sets",
        price: 45,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-Fs03",
        active: true,
        imgUrl: images.TestProduct,
        title: "Classic Xtra Semi-Permanent",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Full Sets",
        price: 55,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-Fs04",
        active: true,
        imgUrl: images.TestProduct,
        title: "Hybrid",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Full Sets",
        price: 55,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-Fs05",
        active: true,
        imgUrl: images.TestProduct,
        title: "Russian Volume",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Full Sets",
        price: 55,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-Fs06",
        active: true,
        imgUrl: images.TestProduct,
        title: "Wispy Volume",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Full Sets",
        price: 70,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-Fs07",
        active: true,
        imgUrl: images.TestProduct,
        title: "Mega Russian Volume",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Full Sets",
        price: 75,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },

    // Services - Infills
    {
        id: "serv-I01",
        active: true,
        imgUrl: images.TestProduct,
        title: "Classic Semi-Permanent",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Infills",
        price: 30,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-I02",
        active: true,
        imgUrl: images.TestProduct,
        title: "YY Express",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Infills",
        price: 35,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-I03",
        active: true,
        imgUrl: images.TestProduct,
        title: "Classic Xtra Semi-Permanent",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Infills",
        price: 35,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-I04",
        active: true,
        imgUrl: images.TestProduct,
        title: "Hybrid",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Infills",
        price: 40,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-I05",
        active: true,
        imgUrl: images.TestProduct,
        title: "Russian Volume",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Infills",
        price: 45,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-I06",
        active: true,
        imgUrl: images.TestProduct,
        title: "Mega Volume",
        category: "Services",
        subServiceCategory: "Eyelash Extensions Infills",
        price: 50,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },

    // Services - Eyebrows
    {
        id: "serv-E01",
        active: true,
        imgUrl: images.TestProduct,
        title: "Eyebrow Tint",
        category: "Services",
        subServiceCategory: "Eyebrows",
        price: 7,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-E02",
        active: true,
        imgUrl: images.TestProduct,
        title: "Eyebrow Wax & Tint",
        category: "Services",
        subServiceCategory: "Eyebrows",
        price: 14,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-E03",
        active: true,
        imgUrl: images.TestProduct,
        title: "Microblading",
        category: "Services",
        subServiceCategory: "Eyebrows",
        price: 18,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-E04",
        active: true,
        imgUrl: images.TestProduct,
        title: "Removal",
        category: "Services",
        subServiceCategory: "Eyebrows",
        price: 10,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },


    // Services - Lips
    {
        id: "serv-L01",
        active: true,
        imgUrl: images.TestProduct,
        title: "0.5ml",
        category: "Services",
        subServiceCategory: "Lips",
        price: 90,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-L02",
        active: true,
        imgUrl: images.TestProduct,
        title: "1.1ml",
        category: "Services",
        subServiceCategory: "Lips",
        price: 140,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-L03",
        active: true,
        imgUrl: images.TestProduct,
        title: "3ml Package",
        category: "Services",
        subServiceCategory: "Lips",
        price: 275,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },

    // Services - SMPU
    {
        id: "serv-SMPU01",
        active: true,
        imgUrl: images.TestProduct,
        title: "Ombre Brows",
        category: "Services",
        subServiceCategory: "Semi-Permanent Makeup",
        price: 0,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-SMPU02",
        active: true,
        imgUrl: images.TestProduct,
        title: "Combo Brows",
        category: "Services",
        subServiceCategory: "Semi-Permanent Makeup",
        price: 0,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-SMPU03",
        active: true,
        imgUrl: images.TestProduct,
        title: "Lip Blush",
        category: "Services",
        subServiceCategory: "Semi-Permanent Makeup",
        price: 0,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
    {
        id: "serv-SMPU04",
        active: true,
        imgUrl: images.TestProduct,
        title: "Lip Liner",
        category: "Services",
        subServiceCategory: "Semi-Permanent Makeup",
        price: 0,
        shortDesc: "Short Description",
        description: "Description",
        duration: -1,
        reviews: [
            {
                name: "Christian Engmann",
                date: "01/01/2023",
                rating: 5,
                message: "Amazing"
            }
        ],
        upcomingDates: []
    },
]*/
export const menuItems =
[
    {
        id: 0,
        title: 'home',
        to: '/',
    },
    {
        id: 1,
        title: 'gallery',
        to: '/gallery'
    },
    {
        id: 2,
        title: 'services',
        to: '/services',
        submenu: [
            {
                id: 0,
                title: 'test1',
                to: '/test1',
            },
            {
                id: 1,
                title: 'test2',
                to: '/test2',
            },
            {
                id: 2,
                title: 'test3',
                to: '/test3',
            },
        ],
    },
    {
        id: 3,
        title: 'courses',
        to: '/courses'
    },
    // {
    //     id: 4,
    //     title: 'contact',
    //     to: '/contact'
    // },
]
export interface NavItem {
    label: string;
    href: string;
}

export const navbarConfig = {
    logo: {
        src: '/assets/logo1.png',
        alt: 'logo',
        width: 100,
        height: 100,
    },
    navItems: [
        // {
        //     label: 'Work',
        //     href: '/work-experience',
        // },
        {
            label: 'Contact',
            href: '/contact'
        },
        {
            label: 'Projects',
            href: '/projects',
        },
        {
            label: 'Blogs',
            href: '/blog',
        },
    ] as NavItem[],
};
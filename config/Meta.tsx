import { about } from "./About";
import { heroconfig } from "./Hero";

export interface PageMeta {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    twitterCard?: 'summary' | 'summary_large_image';
}

export const siteConfig = {
    name: heroconfig.name,
    title: "Beautiful Portfolio",
    discription: "Mordern Portfolio by Om Varma",
    author: {
        name: about.name,
        twitter: '@OmVarma_9',
        github: 'OmVarma18',
        linkedin: 'om-varma',
        email: 'omvarma369@gmail.com',
    },
    keywords: [
        'portfolio',
        'developer',
        'full-stack',
        'react',
        'nextjs',
        'typescript',
        'web development',
        heroconfig.name.toLowerCase(),
    ],
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ogImage: "/assets/logo1.png",
}

export const pageMetadata: Record<string, PageMeta> = {
    '/': {
        title: `${heroconfig.name} - ${heroconfig.title}`,
        description: `${about.description} Explore my projects, experience, and technical expertise.`,
        keywords: [
            'portfolio',
            'developer',
            'full-stack',
            'web development',
            'projects',
        ],
        // ogImage
        twitterCard: `summary`
    },
    // Projects page
    '/projects': {
        title: 'Projects - My Work & Projects Portfolio',
        description:
            'Discover my projects and work across different technologies and domains. From web apps to mobile solutions.',
        keywords: [
            'projects',
            'portfolio',
            'web development',
            'applications',
            'software',
        ],
        ogImage: '/meta/projects.png',
        twitterCard: 'summary',
    },

    // Resume
    '/resume': {
        title: 'Resume - Professional CV',
        description: `View and download ${heroconfig.name}'s professional resume and CV. Technical skills, experience, and qualifications.`,
        keywords: [
            'resume',
            'cv',
            'professional',
            'skills',
            'qualifications',
            'download',
        ],
        ogImage: '/meta/resume.png',
        twitterCard: 'summary',
    },
}

export function getPageMetadata(pathname: string): PageMeta {
    return pageMetadata[pathname] || pageMetadata['/'];
}

// Helper function to generate complete metadata object for Next.js
export function generateMetadata(pathname: string) {
    const pageMeta = getPageMetadata(pathname);

    return {
        metadataBase: new URL(siteConfig.url),
        title: pageMeta.title,
        description: pageMeta.description,
        keywords: pageMeta.keywords?.join(', '),
        authors: [{ name: siteConfig.author.name }],
        creator: siteConfig.author.name,
        icons: {
            icon: '/assets/logo1.png',
            shortcut: '/assets/logo1.png',
            apple: '/assets/logo1.png',
        },
        openGraph: {
            type: 'website',
            url: `${siteConfig.url}${pathname}`,
            title: pageMeta.title,
            description: pageMeta.description,
            siteName: siteConfig.title,
            // images: [
            //     {
            //         url: pageMeta.ogImage || siteConfig.ogImage,
            //         width: 1200,
            //         height: 630,
            //         alt: pageMeta.title,
            //     },
            // ],
        },
        twitter: {
            card: pageMeta.twitterCard || 'summary_large_image',
            title: pageMeta.title,
            description: pageMeta.description,
            creator: siteConfig.author.twitter,
            // images: [pageMeta.ogImage || siteConfig.ogImage],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: `${siteConfig.url}${pathname}`,
        },
    };
}

import React from 'react';
import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { projects } from '@/config/Project';
import { ProjectPageClient } from './ProjectPageClient';

export const metadata: Metadata = {
    ...getMetadata('/projects'),
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
};

const page = () => {
    return <ProjectPageClient projects={projects} />;
}

export default page;
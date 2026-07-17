import { MetadataRoute } from 'next';
import { getProjectCaseStudySlugs } from '@/lib/project';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://omvarma.com';
    const slugs = getProjectCaseStudySlugs();
    
    const projectUrls = slugs.map((slug) => ({
        url: `${baseUrl}/projects/${slug}`,
        lastModified: new Date(),
    }));
    
    return [
        { url: baseUrl, lastModified: new Date() },
        { url: `${baseUrl}/projects`, lastModified: new Date() },
        { url: `${baseUrl}/resume`, lastModified: new Date() },
        { url: `${baseUrl}/contact`, lastModified: new Date() },
        ...projectUrls,
    ];
}

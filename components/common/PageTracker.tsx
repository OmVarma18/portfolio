'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';

export default function PageTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Get existing recent pages
        const recentPagesRaw = getCookie('recent_pages');
        let recentPages: string[] = [];

        try {
            if (recentPagesRaw) {
                recentPages = JSON.parse(recentPagesRaw as string);
            }
        } catch (e) {
            recentPages = [];
        }

        // Add current pathname if it's not already the first one
        if (recentPages[0] !== pathname) {
            // Remove current pathname if it exists elsewhere in the list to move it to front
            recentPages = recentPages.filter(p => p !== pathname);

            // Add to front
            recentPages.unshift(pathname);

            // Limit to 3
            recentPages = recentPages.slice(0, 3);

            // Save back to cookie
            setCookie('recent_pages', JSON.stringify(recentPages), {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
        }
    }, [pathname]);

    return null;
}

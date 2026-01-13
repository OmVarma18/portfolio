'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100); // Slight delay for smoother feel

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div
            className={cn(
                'reveal-hidden',
                isVisible && 'reveal-visible',
                'transition-all duration-1000 ease-out'
            )}
        >
            {children}
        </div>
    );
}

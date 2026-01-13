'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SectionRevealProps {
    children: React.ReactNode;
    className?: string;
    threshold?: number;
    delay?: number;
}

export default function SectionReveal({
    children,
    className,
    threshold = 0.1,
    delay = 0
}: SectionRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkVisibility = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            // Trigger when the top of the element is 85% down the viewport
            if (rect.top <= viewportHeight * 0.85) {
                setTimeout(() => {
                    setIsVisible(true);
                }, delay);
            }
        };

        // Initial check
        checkVisibility();

        window.addEventListener('scroll', checkVisibility);
        return () => window.removeEventListener('scroll', checkVisibility);
    }, [delay]);

    return (
        <div
            ref={sectionRef}
            className={cn(
                'reveal-hidden',
                isVisible && 'reveal-visible',
                className
            )}
        >
            {children}
        </div>
    );
}

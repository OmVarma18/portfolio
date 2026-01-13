'use client';

import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { ArrowUp } from 'lucide-react';
import React from 'react';

import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function BackToTop() {
    const { triggerHaptic, isMobile } = useHapticFeedback();

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Trigger haptic feedback on mobile devices
        if (isMobile()) {
            triggerHaptic('light');
        }
    };

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed right-10 bottom-10 z-50 rounded-full border-gray-200/80 bg-linear-to-b from-white to-gray-50/50 p-2 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] transition-all duration-500 hover:scale-110 hover:border-blue-600/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] active:translate-y-0.5 md:right-20 dark:border-white/10 dark:bg-linear-to-b dark:from-zinc-900/50 dark:to-black/80 dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-blue-600/20"
                    onClick={handleClick}
                >
                    <ArrowUp className="size-4 text-gray-500 transition-colors group-hover:text-blue-600 dark:text-gray-400" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Back to top</p>
            </TooltipContent>
        </Tooltip>
    );
}

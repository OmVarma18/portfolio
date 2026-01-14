
import React from 'react';

export default function BottomBlur() {
    return (
        <div className="pointer-events-none fixed bottom-0 left-0 z-40 h-10 w-full bg-linear-to-t from-background to-transparent backdrop-blur-[2px] dark:from-background" />
    );
}

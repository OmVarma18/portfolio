'use client';

import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Home,
    Search,
    Sun,
    Briefcase,
    BookOpen,
    Folder,
    FileText,
    Phone,
    Laptop,
    Mail,
    Github,
    ArrowUp,
    Keyboard,
} from 'lucide-react';

interface ShortcutHelpProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const shortcuts = [
    { key: 'Ctrl + K', label: 'Command Palette', icon: <Search className="h-4 w-4" /> },
    { key: 'Ctrl + ,', label: 'Show Shortcuts', icon: <Keyboard className="h-4 w-4" /> },
    { key: 'T', label: 'Toggle Theme', icon: <Sun className="h-4 w-4" /> },
    { key: 'H', label: 'Go to Home', icon: <Home className="h-4 w-4" /> },
    { key: 'B', label: 'Go to Blogs', icon: <BookOpen className="h-4 w-4" /> },
    { key: 'P', label: 'Go to Projects', icon: <Folder className="h-4 w-4" /> },
    { key: 'R', label: 'Go to Resume', icon: <FileText className="h-4 w-4" /> },
    { key: 'C', label: 'Go to Contact', icon: <Phone className="h-4 w-4" /> },
    { key: 'S', label: 'Go to Setup', icon: <Laptop className="h-4 w-4" /> },
    { key: 'Shift + E', label: 'Copy Email', icon: <Mail className="h-4 w-4" /> },
    { key: 'Shift + G', label: 'GitHub Profile', icon: <Github className="h-4 w-4" /> },
    { key: 'Shift + ↑', label: 'Scroll to Top', icon: <ArrowUp className="h-4 w-4" /> },
];

export function ShortcutHelp({ open, onOpenChange }: ShortcutHelpProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[380px] p-0 border-gray-200/80 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[85vh]">
                <DialogHeader className="p-4 pb-2">
                    <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                        <Keyboard className="h-5 w-5 text-blue-600" />
                        Shortcuts
                    </DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-2" data-lenis-prevent>
                    {shortcuts.map((shortcut) => (
                        <div
                            key={shortcut.key}
                            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white/50 p-2.5 dark:border-white/5 dark:bg-black/20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-muted-foreground">{shortcut.icon}</div>
                                <span className="text-sm font-medium">{shortcut.label}</span>
                            </div>
                            <kbd className="inline-flex h-6 items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-bold text-muted-foreground shadow-sm">
                                {shortcut.key}
                            </kbd>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

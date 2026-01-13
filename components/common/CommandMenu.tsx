'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import {
    Laptop,
    Moon,
    Sun,
    FileText,
    Home,
    Briefcase,
    Search,
    Code,
    LayoutTemplate,
    BookOpen,
    Folder,
    Settings,
    Phone,
} from 'lucide-react';
import { Project } from '@/types/Project';
import { BlogPostPreview } from '@/types/blog';
import { CommandShortcut } from '@/components/ui/command';

import { useThemeToggle } from './ThemeSwitch';

interface CommandMenuProps {
    projects: Project[];
    posts: BlogPostPreview[];
}

export function CommandMenu({ projects, posts }: CommandMenuProps) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const { setTheme, resolvedTheme } = useTheme();
    const { toggleTheme } = useThemeToggle({ variant: 'circle', start: 'bottom-center' });

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            // Ignore shortcut if user is typing in an input or textarea
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                (e.target as HTMLElement).isContentEditable
            ) {
                return;
            }

            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === 't') {
                e.preventDefault();
                toggleTheme();
            }

            // Global single-key navigation (only when search is closed and no modifiers are pressed)
            if (!open && !e.ctrlKey && !e.metaKey && !e.altKey) {
                if (e.key === 'h') {
                    e.preventDefault();
                    router.push('/');
                }
                if (e.key === 'w') {
                    e.preventDefault();
                    router.push('/work-experience');
                }
                if (e.key === 'b') {
                    e.preventDefault();
                    router.push('/blog');
                }
                if (e.key === 'p') {
                    e.preventDefault();
                    router.push('/projects');
                }
                if (e.key === 'r') {
                    e.preventDefault();
                    router.push('/resume');
                }
            }

            // Smooth scroll to top on Shift + ArrowUp
            if (!open && e.shiftKey && e.key === 'ArrowUp') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [toggleTheme, open, router]);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <Button
                variant="outline"
                className="group relative flex h-9 w-max items-center gap-4 rounded-full border-gray-200/80 bg-linear-to-b from-white to-gray-50/50 px-4 py-2 text-sm font-medium shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55) hover:scale-110 hover:border-blue-600/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] active:translate-y-0.5 dark:border-white/10 dark:bg-linear-to-b dark:from-zinc-900/50 dark:to-black/80 dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] dark:hover:bg-black/60 dark:hover:shadow-blue-600/20"
                onClick={() => setOpen(true)}
            >
                <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gray-400 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-600" />
                    <span className="text-gray-500 transition-colors group-hover:text-blue-600 dark:text-gray-400">Search</span>
                </div>
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded bg-gray-100 px-1.5 font-mono text-[10px] font-bold text-gray-400 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-white/10 dark:text-gray-500 md:inline-flex">
                    <span className="text-[10px]">Ctrl</span>+ K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a Command or Search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Navigation">
                        <CommandItem className="py-4" onSelect={() => runCommand(() => router.push('/'))}>
                            <Home className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Go to Home</span>
                                <span className="text-xs text-muted-foreground">Navigate to the homepage</span>
                            </div>
                            <CommandShortcut>H</CommandShortcut>
                        </CommandItem>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => router.push('/work-experience'))}>
                            <Briefcase className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Go to Work Experience</span>
                                <span className="text-xs text-muted-foreground">View work experience and employment history</span>
                            </div>
                            <CommandShortcut>W</CommandShortcut>
                        </CommandItem>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => router.push('/blog'))}>
                            <BookOpen className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Go to Blogs</span>
                                <span className="text-xs text-muted-foreground">Browse all blog posts</span>
                            </div>
                            <CommandShortcut>B</CommandShortcut>
                        </CommandItem>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => router.push('/projects'))}>
                            <Folder className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Go to Projects</span>
                                <span className="text-xs text-muted-foreground">View all projects and portfolio work</span>
                            </div>
                            <CommandShortcut>P</CommandShortcut>
                        </CommandItem>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => router.push('/resume'))}>
                            <FileText className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Go to Resume</span>
                                <span className="text-xs text-muted-foreground">View and download resume</span>
                            </div>
                            <CommandShortcut>R</CommandShortcut>
                        </CommandItem>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => router.push('/#setup'))}>
                            <Settings className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Go to Setup</span>
                                <span className="text-xs text-muted-foreground">View development setup and tools</span>
                            </div>
                            <CommandShortcut>S</CommandShortcut>
                        </CommandItem>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => router.push('/#contact'))}>
                            <Phone className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Go to Contact</span>
                                <span className="text-xs text-muted-foreground">Send a message and get in touch</span>
                            </div>
                            <CommandShortcut>C</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    {projects.length > 0 && (
                        <>
                            <CommandGroup heading="Projects">
                                {projects.slice(0, 3).map((project) => (
                                    <CommandItem
                                        key={project.projectDetailsPageSlug}
                                        onSelect={() =>
                                            runCommand(() => router.push(`/projects/${project.projectDetailsPageSlug}`))
                                        }
                                    >
                                        <Code className="mr-2 h-4 w-4" />
                                        {project.title}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}
                    {posts.length > 0 && (
                        <>
                            <CommandGroup heading="Posts">
                                {posts.slice(0, 3).map((post) => (
                                    <CommandItem
                                        key={post.slug}
                                        onSelect={() =>
                                            runCommand(() => router.push(`/blog/${post.slug}`))
                                        }
                                    >
                                        <LayoutTemplate className="mr-2 h-4 w-4" />
                                        {post.frontmatter.title}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}
                    <CommandGroup heading="Theme">
                        <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
                            <Sun className="mr-2 h-4 w-4" />
                            Light
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
                            <Moon className="mr-2 h-4 w-4" />
                            Dark
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
                            <Laptop className="mr-2 h-4 w-4" />
                            System
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}

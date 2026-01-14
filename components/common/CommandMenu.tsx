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
    History,
    ArrowUp,
    Github,
    Mail,
    Share2,
    Keyboard,
} from 'lucide-react';
import { Project } from '@/types/Project';
import { BlogPostPreview } from '@/types/blog';
import { CommandShortcut } from '@/components/ui/command';
import { getCookie } from 'cookies-next';

import { toast } from 'sonner';
import { useThemeToggle } from './ThemeSwitch';
import { ShortcutHelp } from './ShortcutHelp';

interface CommandMenuProps {
    projects: Project[];
    posts: BlogPostPreview[];
}

export function CommandMenu({ projects, posts }: CommandMenuProps) {
    const [open, setOpen] = React.useState(false);
    const [showHelp, setShowHelp] = React.useState(false);
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
            if (e.key === ',' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(false);
                setShowHelp((prev) => !prev);
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
                if (e.key === 'c') {
                    e.preventDefault();
                    router.push('/contact');
                }
            }

            // Global Shift shortcuts
            if (!open && e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                if (e.key === 'E') {
                    e.preventDefault();
                    navigator.clipboard.writeText('omvarma369@gmail.com');
                    toast.success('Email copied to clipboard');
                }
                if (e.key === 'G') {
                    e.preventDefault();
                    window.open('https://github.com/OmVarma18', '_blank');
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

    const [recentPages, setRecentPages] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (open) {
            const cookieValue = getCookie('recent_pages');
            if (cookieValue) {
                try {
                    setRecentPages(JSON.parse(cookieValue as string));
                } catch (e) {
                    setRecentPages([]);
                }
            }
        }
    }, [open]);

    const getPageInfo = (path: string) => {
        if (path === '/') return { title: 'Home', description: 'Navigate to the homepage', icon: <Home className="mr-4 h-5 w-5 text-muted-foreground" />, shortcut: 'H' };
        if (path === '/work-experience') return { title: 'Work Experience', description: 'View work experience and history', icon: <Briefcase className="mr-4 h-5 w-5 text-muted-foreground" />, shortcut: 'W' };
        if (path === '/blog') return { title: 'Blog', description: 'Browse all blog posts', icon: <BookOpen className="mr-4 h-5 w-5 text-muted-foreground" />, shortcut: 'B' };
        if (path === '/projects') return { title: 'Projects', description: 'View all projects and work', icon: <Folder className="mr-4 h-5 w-5 text-muted-foreground" />, shortcut: 'P' };
        if (path === '/resume') return { title: 'Resume', description: 'View and download resume', icon: <FileText className="mr-4 h-5 w-5 text-muted-foreground" />, shortcut: 'R' };
        if (path === '/contact') return { title: 'Contact', description: 'Send a message and get in touch', icon: <Phone className="mr-4 h-5 w-5 text-muted-foreground" />, shortcut: 'C' };
        if (path === '/#setup') return { title: 'Setup', description: 'My workspace and tools', icon: <Laptop className="mr-4 h-5 w-5 text-muted-foreground" />, shortcut: 'S' };

        // Check projects
        if (path.startsWith('/projects/')) {
            const slug = path.replace('/projects/', '');
            const project = projects.find(p => p.projectDetailsPageSlug === slug);
            return {
                title: project ? project.title : slug,
                description: 'View project details',
                icon: <Code className="mr-4 h-5 w-5 text-muted-foreground" />
            };
        }

        // Check blog posts
        if (path.startsWith('/blog/')) {
            const slug = path.replace('/blog/', '');
            const post = posts.find(p => p.slug === slug);
            return {
                title: post ? post.frontmatter.title : slug,
                description: 'Read blog post',
                icon: <LayoutTemplate className="mr-4 h-5 w-5 text-muted-foreground" />
            };
        }

        return { title: path, description: 'Recently visited page', icon: <History className="mr-4 h-5 w-5 text-muted-foreground" /> };
    };

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

                    {recentPages.length > 0 && (
                        <>
                            <CommandGroup heading="Recent Pages" className='m-4'>
                                {recentPages.map((path) => {
                                    const pageInfo = getPageInfo(path);
                                    return (
                                        <CommandItem
                                            key={path}
                                            onSelect={() => runCommand(() => router.push(path))}
                                            className="py-4"
                                        >
                                            {pageInfo.icon}
                                            <div className="flex flex-col text-left">
                                                <span className="text-sm font-semibold">{pageInfo.title}</span>
                                                <span className="text-xs text-muted-foreground">{pageInfo.description}</span>
                                            </div>
                                            {pageInfo.shortcut && <CommandShortcut>{pageInfo.shortcut}</CommandShortcut>}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}

                    <CommandGroup heading="Navigation" className='m-4'>
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
                        <CommandItem className="py-4" onSelect={() => runCommand(() => router.push('/contact'))}>
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
                            <CommandGroup heading="Projects" className='m-4'>
                                {projects.slice(0, 3).map((project) => (
                                    <CommandItem
                                        key={project.projectDetailsPageSlug}
                                        className="py-4"
                                        onSelect={() =>
                                            runCommand(() => router.push(`/projects/${project.projectDetailsPageSlug}`))
                                        }
                                    >
                                        <Code className="mr-4 h-5 w-5 text-muted-foreground" />
                                        <div className="flex flex-col text-left">
                                            <span className="text-sm font-semibold">{project.title}</span>
                                            <span className="text-xs text-muted-foreground">View project details</span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}
                    {posts.length > 0 && (
                        <>
                            <CommandGroup heading="Posts" className='m-4'>
                                {posts.slice(0, 3).map((post) => (
                                    <CommandItem
                                        key={post.slug}
                                        className="py-4"
                                        onSelect={() =>
                                            runCommand(() => router.push(`/blog/${post.slug}`))
                                        }
                                    >
                                        <LayoutTemplate className="mr-4 h-5 w-5 text-muted-foreground" />
                                        <div className="flex flex-col text-left">
                                            <span className="text-sm font-semibold">{post.frontmatter.title}</span>
                                            <span className="text-xs text-muted-foreground">Read blog post</span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}
                    <CommandGroup heading="Actions" className='m-4'>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => {
                            navigator.clipboard.writeText('omvarma369@gmail.com');
                            toast.success('Email copied to clipboard');
                        })}>
                            <Mail className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Copy Email</span>
                                <span className="text-xs text-muted-foreground">Copy email address to clipboard</span>
                            </div>
                            <CommandShortcut>Shift+E</CommandShortcut>
                        </CommandItem>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => {
                            window.open('https://github.com/OmVarma18', '_blank');
                        })}>
                            <Github className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">View GitHub Profile</span>
                                <span className="text-xs text-muted-foreground">Open the GitHub profile in a new tab</span>
                            </div>
                            <CommandShortcut>Shift+G</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Features" className='m-4'>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => toggleTheme())}>
                            <Sun className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Toggle Theme</span>
                                <span className="text-xs text-muted-foreground">Switch between light and dark mode</span>
                            </div>
                            <CommandShortcut>T</CommandShortcut>
                        </CommandItem>
                        <CommandItem className="py-4" onSelect={() => setOpen(true)}>
                            <Search className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Command Palette</span>
                                <span className="text-xs text-muted-foreground">Open the command palette</span>
                            </div>
                            <CommandShortcut>Ctrl+K</CommandShortcut>
                        </CommandItem>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}>
                            <ArrowUp className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Scroll to Top</span>
                                <span className="text-xs text-muted-foreground">Scroll to the top of the page</span>
                            </div>
                            <CommandShortcut>Shift+↑</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Help" className='m-4'>
                        <CommandItem className="py-4" onSelect={() => runCommand(() => setShowHelp(true))}>
                            <Keyboard className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold">Show Keyboard Shortcuts</span>
                                <span className="text-xs text-muted-foreground">View all available keyboard shortcuts</span>
                            </div>
                            <CommandShortcut>Ctrl+,</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
            <ShortcutHelp open={showHelp} onOpenChange={setShowHelp} />
        </>
    );
}

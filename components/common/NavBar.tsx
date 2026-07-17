import { navbarConfig } from '@/config/NavBar';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';
import { getValidationImagePath } from "@/lib/utils";

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';
import { CommandMenu } from './CommandMenu';

import { Project } from '@/types/Project';
import { BlogPostPreview } from '@/types/blog';

interface NavbarProps {
    projects: Project[];
    posts: BlogPostPreview[];
}

export default function Navbar({ projects, posts }: NavbarProps) {
    return (
        <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
            <div className="flex items-center justify-between px-6">
                <div className="flex items-baseline gap-4">
                    <Link href="/">

                    </Link>
                    <div className="flex items-center justify-center gap-6">
                        {navbarConfig.navItems.map((item) => (
                            <Link
                                className="relative py-1 text-base font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300 hover:after:scale-x-100"
                                key={item.label}
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <CommandMenu projects={projects} posts={posts} />
                    <ThemeToggleButton variant="circle-blur" start="top-center" blur />
                </div>
            </div>
        </Container>
    );
}
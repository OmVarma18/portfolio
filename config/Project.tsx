import { Project } from "@/types/Project";
import React from 'react';
import TypeScript from "@/components/technology/Typescript";
import ReactIcon from "@/components/technology/ReactIcon";
import NextJs from '@/components/technology/NextJs';
import PostgreSQL from "@/components/technology/PostgreSQL";
import Vercel from "@/components/technology/Vercel";
import MongoDB from "@/components/technology/MongoDB";
import TailwindCss from "@/components/technology/TailwindCss";
import Shadcn from "@/components/technology/Shadcn";
import MDXIcon from "@/components/technology/MDXIcon";

export const projects: Project[] = [
    {
        title: "Slide",
        description: "An AI-powered SaaS for automated Instagram Direct Message replies.",
        // image: "/projects/instagram-dm.png",
        link: "https://example.com/instagram-dm",
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'React', icon: <ReactIcon key="react" /> },
            { name: 'Vercel', icon: <Vercel key="vercel" /> },
            { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
            { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
            { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
            { name: 'MDX', icon: <MDXIcon key="mdx" /> },
        ],
        github: "https://github.com/OmVarma18/instagram-dm",
        live: "https://instagram-dm-demo.com",
        details: "Detailed explanation of the Instagram auto-reply project...",
        projectDetailsPageSlug: "instagram-dm-automation",
        isWorking: true
    },
    {
        title: "Portfolio Website",
        description: "A sleek, modern portfolio built with Next.js and Tailwind CSS.",
        // image: "/projects/portfolio.png",
        link: "https://omvarma.me",
        technologies: [
            { name: "TypeScript", icon: <TypeScript /> },
            { name: "Next.js", icon: <NextJs /> },
            { name: "React", icon: <ReactIcon /> }
        ],
        github: "https://github.com/OmVarma18/portfolio",
        live: "https://omvarma.me",
        details: "The story behind building this high-performance portfolio...",
        projectDetailsPageSlug: "portfolio-website",
        isWorking: false
    },
    {
        title: "OmniStore",
        description: "A high-performance e-commerce platform with Next.js and Stripe.",
        // image: "/projects/portfolio.png",
        link: "https://omvarma.me",
        technologies: [
            { name: "TypeScript", icon: <TypeScript /> },
            { name: "Next.js", icon: <NextJs /> },
            { name: "React", icon: <ReactIcon /> }
        ],
        github: "https://github.com/OmVarma18/portfolio",
        live: "https://omvarma.me",
        details: "The story behind building this high-performance portfolio...",
        projectDetailsPageSlug: "portfolio-website-2",
        isWorking: true
    },
    {
        title: "VibeCheck",
        description: "Real-time sentiment analysis for social media conversations.",
        // image: "/projects/portfolio.png",
        link: "https://omvarma.me",
        technologies: [
            { name: "TypeScript", icon: <TypeScript /> },
            { name: "Next.js", icon: <NextJs /> },
            { name: "React", icon: <ReactIcon /> }
        ],
        github: "https://github.com/OmVarma18/portfolio",
        live: "https://omvarma.me",
        details: "The story behind building this high-performance portfolio...",
        projectDetailsPageSlug: "portfolio-website-3",
        isWorking: true
    },
    {
        title: "ZenTask",
        description: "A minimalist task manager with focus mode and habit tracking.",
        // image: "/projects/portfolio.png",
        link: "https://omvarma.me",
        technologies: [
            { name: "TypeScript", icon: <TypeScript /> },
            { name: "Next.js", icon: <NextJs /> },
            { name: "React", icon: <ReactIcon /> }
        ],
        github: "https://github.com/OmVarma18/portfolio",
        live: "https://omvarma.me",
        details: "The story behind building this high-performance portfolio...",
        projectDetailsPageSlug: "portfolio-website-4",
        isWorking: true
    }
];
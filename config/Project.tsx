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
        title: "Stock-Sense",
        description: "An Stock screening app which help you decided which stock to invest in",
        image: "/projects/dashboard.png",
        link: "https://github.com/OmVarma18/stock-project",
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'React', icon: <ReactIcon key="react" /> },
            { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
            { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
            { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
        ],
        github: "https://github.com/OmVarma18/stock-project",
        live: "https://github.com/OmVarma18/stock-project",
        details: "Detailed explanation of the Instagram auto-reply project...",
        projectDetailsPageSlug: "instagram-dm-automation",
        isWorking: true
    },
    {
        title: "Portfolio Website",
        description: "A sleek, modern portfolio built with Next.js and Tailwind CSS.",
        image: "/projects/portfolio.jpg",
        link: "https://omvarma18.github.io/portfolio",
        technologies: [
            { name: "TypeScript", icon: <TypeScript /> },
            { name: "Next.js", icon: <NextJs /> },
            { name: "React", icon: <ReactIcon /> }
        ],
        github: "https://github.com/OmVarma18/portfolio",
        live: "https://omvarma18.github.io/portfolio",
        details: "The story behind building this high-performance portfolio...",
        projectDetailsPageSlug: "portfolio-website",
        isWorking: false
    },
    {
        title: "DocsChat",
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
];
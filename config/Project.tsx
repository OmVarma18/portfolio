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
        description: "A stock screening application that helps you analyze and decide which stocks to invest in using real-time data.",
        image: "/projects/dashboard.webp",
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
        details: "A comprehensive dashboard for filtering, searching, and analyzing equities based on financial indicators.",
        projectDetailsPageSlug: "stock-sense",
        isWorking: true
    },
    {
        title: "Akora UI",
        description: "A premium, accessible React component library and design system designed for modern, high-performance web applications.",
        image: "/projects/Akora UI.webp",
        link: "https://github.com/OmVarma18/akora-ui",
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'React', icon: <ReactIcon key="react" /> },
            { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
            { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
        ],
        github: "https://github.com/OmVarma18/akora-ui",
        live: "https://akora-ui.vercel.app",
        details: "A design system built from the ground up prioritizing developer experience, accessibility, and sleek motion design.",
        projectDetailsPageSlug: "akora-ui",
        isWorking: true
    },
    {
        title: "Portfolio Website",
        description: "A sleek, modern portfolio built with Next.js and Tailwind CSS.",
        image: "/projects/portfolio.webp",
        link: "https://omvarma.com",
        technologies: [
            { name: "TypeScript", icon: <TypeScript /> },
            { name: "Next.js", icon: <NextJs /> },
            { name: "React", icon: <ReactIcon /> }
        ],
        github: "https://github.com/OmVarma18/portfolio",
        live: "https://omvarma.com",
        details: "The story behind building this high-performance portfolio...",
        projectDetailsPageSlug: "portfolio-website",
        isWorking: false
    },
];
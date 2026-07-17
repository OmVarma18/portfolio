import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import X from '@/components/svgs/X'

import TypeScript from "@/components/technology/Typescript";
import ReactIcon from "@/components/technology/ReactIcon";
import Bun from "@/components/technology/Bun";
import PostgreSQL from "@/components/technology/PostgreSQL";
import NextJs from '@/components/technology/NextJs';
import NodeJs from '@/components/technology/NodeJs';
import MongoDB from '@/components/technology/MongoDB';
import Drizzel from '@/components/technology/Drizzel';
import JavaScript from '@/components/technology/JavaScript';



export const skillComponents = {
    TypeScript: TypeScript,
    ReactIcon: ReactIcon,
    NextJs: NextJs,
    Bun: Bun,
    PostgreSQL: PostgreSQL,
    NodeJs: NodeJs,
    MongoDB: MongoDB,
    Drizzel: Drizzel,
    JavaScript: JavaScript,
};

export const heroconfig = {
    name: "Om Varma",
    title: "Software Engineer",
    avatar: "/assets/logo2.png",
    skills: [
        {
            name: "Typescript",
            href: "https://www.typescriptlang.org/",
            component: "TypeScript"
        },
        {
            name: "NextJS",
            href: "https://nextjs.org/",
            component: "NextJs"
        },
        {
            name: "React",
            href: "https://react.dev/",
            component: "ReactIcon"
        },
        {
            name: "Bun",
            href: "https://bun.sh/",
            component: "Bun"
        },
        {
            name: "PostgreSQL",
            href: "https://www.postgresql.org/",
            component: "PostgreSQL"
        }
    ],
    discription: {
        template: 'Crafted with thoughtful design, persuasive copy, and modern engineering, every page is built to earn attention, build trust, and turn visitors into customers.',
    },
    buttons: [
        {
            variant: 'outline',
            text: 'View my work',
            href: '/projects',
            icon: 'CV',
        },
        {
            variant: 'default',
            text: 'Get in touch',
            href: '/contact',
            icon: 'Chat',
        },
    ],
}


export const socialLinks = [
    {
        name: 'X',
        href: 'https://x.com/OmVarma_9',
        icon: <X />,
    },
    {
        name: 'Github',
        href: 'https://github.com/OmVarma18',
        icon: <Github />,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/om-varma/',
        icon: <LinkedIn />,
    },
    {
        name: 'Email',
        href: 'mailto:omvarma369@gmail.com',
        icon: <Mail />,
    },
];
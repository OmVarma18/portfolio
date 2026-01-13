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
    title: "A Full Stack Web Developer.",
    avatar: "/assets/logo1.png",
    skills: [
        {
            name: "Typescript",
            href: "https://www.typescriptlang.org/",
            component: "TypeScript"
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
        template: 'I build interactive web apps using {skills:0}, {skills:1}, {skills:2} and {skills:3}. With a focus on <b>UI</b> design. Enthusiastic about <b>Product Development</b> , driven by a keen eye for design.',
    },
    buttons: [
        {
            variant: 'outline',
            text: 'Resume / CV',
            href: '/resume',
            icon: 'CV',
        },
        // {
        //     variant: 'default',
        //     text: 'Get in touch',
        //     href: '/contact',
        //     icon: 'Chat',
        // },
    ],
}


export const socialLinks = [
    {
        name: 'X',
        href: 'https://x.com/OmVarma_9',
        icon: <X />,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/om-varma/',
        icon: <LinkedIn />,
    },
    {
        name: 'Github',
        href: 'https://github.com/OmVarma18',
        icon: <Github />,
    },
    {
        name: 'Email',
        href: 'mailto:omvarma369@gmail.com',
        icon: <Mail />,
    },
];
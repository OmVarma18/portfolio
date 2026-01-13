import { heroconfig, skillComponents, socialLinks } from '@/config/Hero'
import { parseTemplate } from '@/lib/hero'
import { cn } from '@/lib/utils'
import Link from 'next/link'


import Skill from '../common/skill'
import Container from '../common/Container'
import Image from 'next/image'
import CV from '../svgs/CV'
import Chat from '../svgs/Chat'
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
import { Button } from '../ui/button'


const buttonIcons = {
    CV: CV,
    Chat: Chat
}

const Hero = () => {
    const { name, title, avatar, skills, discription, buttons } = heroconfig

    const renderDiscription = () => {
        const parts = parseTemplate(discription.template, skills);

        return parts.map((part) => {
            if (part.type === 'skill' && 'skill' in part) {
                const SkillComponent = skillComponents[part.skill.component as keyof typeof skillComponents];
                return (
                    <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
                        <SkillComponent />
                    </Skill>
                );
            }
            else if (part.type === 'bold' && 'text' in part) {
                return (
                    <b key={part.key} className="text-primary whitespace-pre-wrap">
                        {part.text}
                    </b>
                );
            } else if (part.type === 'text' && 'text' in part) {
                return (
                    <span key={part.key} className="whitespace-pre-wrap">
                        {part.text}
                    </span>
                );
            }
            return null;
        });
    };

    return (
        <Container className=''>
            <Image
                src={avatar}
                alt="hero"
                width={100}
                height={100}
                className='size-24 rounded-full bg-blue-300 dark:bg-yellow-300' />

            <div className="mt-8 flex flex-col gap-2">
                <h1 className='text-4xl font-bold'>
                    Hi, I&apos;m {name} - <span className='text-secondary'>{title}</span>
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base whitespace-pre-wrap text-neutral-400 md:text-lg">
                    {renderDiscription()}
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
                {buttons.map((button, index) => {
                    const IconComponent =
                        buttonIcons[button.icon as keyof typeof buttonIcons];
                    return (
                        <Button
                            key={index}
                            variant={button.variant as 'outline' | 'default'}
                            className={cn(
                                button.variant === 'outline' && 'inset-shadow-indigo-500',
                                button.variant === 'default' && 'inset-shadow-indigo-500',
                            )}
                        >
                            {IconComponent && <IconComponent />}
                            <Link href={button.href}>{button.text}</Link>
                        </Button>
                    );
                })}
            </div>

            {/* Socials */}
            <div className="mt-8 flex gap-2">
                {socialLinks.map((link) => (
                    <Tooltip key={link.name} delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Link href={link.href} target="_blank" key={link.name} className='text-secondary hover:text-primary transition-colors'>
                                <div className='size-6 flex items-center justify-center'>
                                    {link.icon}
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{link.name}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </Container>
    )

}
export default Hero
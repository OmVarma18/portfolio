import React from 'react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Image from 'next/image'
import { about, mySkills } from '@/config/About'
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
import { getValidationImagePath } from "@/lib/utils";

const About = () => {
    return (
        <Container className='mt-20'>
            <SectionHeading subHeading="About" Heading="Me" />
            <div className="mt-8 flex flex-col gap-4 md:flex-row">
                <Image
                    src={getValidationImagePath("/assets/logo1.png")}
                    alt='Om Varma'
                    width={100}
                    height={100}
                    className='border-secondary size-60 rounded-md border-2 bg-blue-700 dark:bg-yellow-400'
                />
                <div className="mt-4">
                    <h3 className='text-2xl font-bold'>{about.name}</h3>
                    <p className='text-secondary mt-4'>{about.description}</p>
                    <p className='text-secondary mt-8 font-bold'>Skills</p>
                    <div className="flex flex-wrap gap-3">
                        {mySkills.map((skill) => (
                            <Tooltip key={skill.key}>
                                <TooltipTrigger asChild>
                                    <div className="mt-4 size-6 hover:cursor-pointer">
                                        {skill}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>{skill.key}</TooltipContent>
                            </Tooltip>
                        ))}
                    </div>

                </div>
            </div>
        </Container>
    )
}

export default About
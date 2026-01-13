'use client'
import { projects } from '@/config/Project'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import { ProjectList } from '../Project/ProjectList'
import { Button } from '../ui/button'
import Link from 'next/link'

const Projects = () => {
    return (
        <Container className='mt-24'>
            <SectionHeading subHeading='My Work' Heading='Projects' />
            <ProjectList className="mt-8" projects={projects.slice(0, 4)} />
            <div className="mt-8 flex justify-center">
                <Button className='outline'>
                    <Link href="/projects">Show all Projects</Link>
                </Button>
            </div>
        </Container>
    )
}

export default Projects
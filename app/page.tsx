import Container from "@/components/common/Container"
import About from "@/components/sections/About"
import Hero from "@/components/sections/Hero"
import Project from "@/components/sections/Project"
import Blog from "@/components/sections/Blog"

import SectionReveal from "@/components/common/SectionReveal"
import CTA from "@/components/sections/Cta"

export default function Home() {
  return (
    <Container className="min-h-screen py-16 space-y-32">
      <SectionReveal>
        <Hero />
      </SectionReveal>
      <SectionReveal delay={100}>
        <Project />
      </SectionReveal>
      <SectionReveal delay={200}>
        <About />
      </SectionReveal>
      <SectionReveal delay={300}>
        <Blog />
      </SectionReveal>
      <SectionReveal delay={300}>
        <CTA />
      </SectionReveal>
    </Container>
  )
}
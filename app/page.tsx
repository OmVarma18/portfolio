import Container from "@/components/common/Container"
import About from "@/components/sections/About"
import Hero from "@/components/sections/Hero"
import Project from "@/components/sections/Project"
import Blog from "@/components/sections/Blog"

export default function Home() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Project />
      <About />
      <Blog />
    </Container>
  )
}
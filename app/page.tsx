import { Navbar }     from '@/components/layout/Navbar'
import { Footer }     from '@/components/layout/Footer'
import { Hero }       from '@/components/sections/Hero'
import { About }      from '@/components/sections/About'
import { TechStack }  from '@/components/sections/TechStack'
import { Projects }   from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { GitHub }     from '@/components/sections/GitHub'
import { Contact }    from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto border-x border-[var(--border)] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <GitHub />
      <Contact />
      <Footer />
    </main>
  )
}

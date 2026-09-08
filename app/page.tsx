import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { TechStack } from '@/components/sections/TechStack'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { GitHub } from '@/components/sections/GitHub'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      {/* Keyboard users shouldn't have to tab through the whole nav to
          reach the page. Visible only once focused. */}
      <a
        href="#main"
        className="sr-only rounded-md bg-[var(--purple)] px-4 py-2 font-dm text-[13px] font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]"
      >
        Skip to content
      </a>

      <div className="mx-auto min-h-screen max-w-6xl border-x border-[var(--border)]">
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <GitHub />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

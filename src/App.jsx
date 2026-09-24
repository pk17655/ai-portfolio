import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import { useStore } from '@/store/useStore'
import { applyTheme } from '@/utils/applyTheme'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { useActiveSection } from '@/hooks/useActiveSection'
import { SECTION_IDS } from '@/utils/sections'
import theme from '@/config/theme.json'

import SplashScreen from '@/components/SplashScreen'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import CustomCursor from '@/components/CustomCursor'
import ParticleField from '@/components/ParticleField'

import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Experience from '@/sections/Experience'
import Projects from '@/sections/Projects'
import Education from '@/sections/Education'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

export default function App() {
  const mode = useStore((s) => s.theme)
  const splashDone = useStore((s) => s.splashDone)
  const finishSplash = useStore((s) => s.finishSplash)
  const flags = theme.flags || {}

  // Apply theme tokens from theme.json on mount + whenever the mode changes.
  useEffect(() => {
    applyTheme(mode)
  }, [mode])

  useSmoothScroll(true)
  useActiveSection(SECTION_IDS)

  return (
    <>
      <AnimatePresence>
        {flags.enableSplashScreen && !splashDone && (
          <SplashScreen onComplete={finishSplash} />
        )}
      </AnimatePresence>

      <ParticleField enabled={flags.enableParticles} />
      <CustomCursor enabled={flags.enableCustomCursor} />
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

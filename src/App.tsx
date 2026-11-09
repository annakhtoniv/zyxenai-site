import { useEffect } from 'react'
import { AnnouncementBar } from './components/layout/AnnouncementBar'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { UpcomingSections } from './components/layout/UpcomingSections'
import { Hero } from './components/hero/Hero'
import { Lab } from './components/lab/Lab'
import { useReducedMotion } from './hooks/useReducedMotion'
import { startSmoothScroll } from './lib/scroll'

export default function App() {
  const reduced = useReducedMotion()

  // Smooth scrolling is skipped for visitors who ask for reduced motion.
  useEffect(() => {
    if (reduced) return
    return startSmoothScroll()
  }, [reduced])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-pill focus:bg-cyan focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <Hero />
        <Lab />
        <UpcomingSections />
      </main>
      <Footer />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[55]" />
    </>
  )
}

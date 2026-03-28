import { lazy, Suspense, useEffect } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { LogoBar } from './components/sections/LogoBar'
import { CustomCursor } from './components/ui/CustomCursor'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { NoiseOverlay } from './components/effects/NoiseOverlay'

const Services = lazy(() => import('./components/sections/Services').then(m => ({ default: m.Services })))
const CaseStudies = lazy(() => import('./components/sections/CaseStudies').then(m => ({ default: m.CaseStudies })))
const Process = lazy(() => import('./components/sections/Process').then(m => ({ default: m.Process })))
const Testimonials = lazy(() => import('./components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const TechStack = lazy(() => import('./components/sections/TechStack').then(m => ({ default: m.TechStack })))
const WhyNokYai = lazy(() => import('./components/sections/WhyNokYai').then(m => ({ default: m.WhyNokYai })))
const CTABand = lazy(() => import('./components/sections/CTABand').then(m => ({ default: m.CTABand })))
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })))
const Footer = lazy(() => import('./components/layout/Footer').then(m => ({ default: m.Footer })))

function App() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    import('./lib/animations').then(({ initScrollAnimations, cleanupScrollAnimations }) => {
      initScrollAnimations()
      cleanup = cleanupScrollAnimations
    })

    return () => cleanup?.()
  }, [])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Suspense fallback={null}>
          <Services />
          <CaseStudies />
          <Process />
          <Testimonials />
          <TechStack />
          <WhyNokYai />
          <CTABand />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App

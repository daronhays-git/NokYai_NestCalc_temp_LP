import { lazy, Suspense, useEffect } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { CustomCursor } from './components/ui/CustomCursor'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { NoiseOverlay } from './components/effects/NoiseOverlay'

const Services = lazy(() => import('./components/sections/Services').then(m => ({ default: m.Services })))
const Testimonials = lazy(() => import('./components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const TechStack = lazy(() => import('./components/sections/TechStack').then(m => ({ default: m.TechStack })))
const WhyNestCalc = lazy(() => import('./components/sections/WhyNestCalc').then(m => ({ default: m.WhyNestCalc })))
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
    <LazyMotion features={domAnimation} strict>
      <CustomCursor />
      <ScrollProgress />
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Services />
          <TechStack />
          <WhyNestCalc />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </LazyMotion>
  )
}

export default App

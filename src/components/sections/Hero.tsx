import { useRef } from 'react'
import { m } from 'framer-motion'
import { MagneticButton } from '../ui/MagneticButton'
import { ParticleField } from '../effects/ParticleField'
import { GradientMesh } from '../effects/GradientMesh'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
})

export function Hero() {
  const primaryBtnRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-nok-deep"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <GradientMesh colors={['#F59E0B', '#0d9488', '#0f2920']} className="opacity-40" />
      </div>
      <div className="absolute inset-0 z-0">
        <ParticleField buttonRefs={[primaryBtnRef]} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <m.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-nok-gold/30 bg-nok-gold/5 text-nok-gold text-sm font-medium mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-nok-gold animate-pulse" />
            Building Leading Edge AI Applications - Small Business Focused
          </m.div>

          {/* Headline */}
          <m.h1
            className="font-display text-hero text-nok-gold mb-6 animate-[hero-glow_3s_ease-in-out_infinite]"
            {...fadeUp(0.5)}
          >
            Custom AI Solutions<br />For Your Business
          </m.h1>

          {/* Subheadline */}
          <m.p
            className="text-lg lg:text-xl text-nok-body max-w-3xl mx-auto mb-16 sm:mb-24 lg:mb-40"
            {...fadeUp(0.7)}
          >
            We Handle the Tech So You Can Focus on Your Business
          </m.p>

          {/* CTA */}
          <m.div
            className="flex justify-center mb-12"
            {...fadeUp(0.9)}
          >
            <div ref={primaryBtnRef}>
              <MagneticButton href="#contactus">Start Your Project</MagneticButton>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  )
}
